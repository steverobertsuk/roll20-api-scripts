// Chat command parsing and dispatch.

import { give, passOn, remove, spend, syncAll, syncTokens, termFor, undoSpend } from './actions.js';
import { whisper, whisperError, whisperWarning } from './chat.js';
import { API_PLAYER_ID, COMMAND, MACRO_NAME, SCRIPT_NAME } from './constants.js';
import { t } from './i18n.js';
import { installHandouts } from './journals.js';
import { resolveMarker } from './markers.js';
import {
  showHelp,
  showMainMenu,
  showParty,
  showPlayerCard,
  showSettings,
  showStatus,
} from './menu.js';
import { resolveCharacters } from './party.js';
import { readInspiration } from './sheet.js';
import { getConfig, getState, resetConfig, setConfigValue, setPartyMember } from './state.js';
import { escapeHtml, isGmOrMod, tokenize, toText } from './utils.js';

/**
 * Splits a chat message into the command word, its arguments and flags.
 *
 * @param {string} content Message text after the command prefix.
 * @returns {{sub: string, args: string[], ids: string[], party: boolean}} Parsed command.
 */
export function parseCommand(content) {
  const words = tokenize(content);
  const args = [];
  const ids = [];
  let party = false;
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (word.toLowerCase() === '--ids') {
      const list = words[i + 1] || '';
      i += 1;
      ids.push(
        ...list
          .split(/[;,]/)
          .map((id) => id.trim())
          .filter(Boolean)
      );
    } else if (word.toLowerCase() === '--party') {
      party = true;
    } else {
      args.push(word);
    }
  }
  const sub = (args.shift() || '').toLowerCase();
  return { sub, args, ids, party };
}

/**
 * Returns the command prefixes this game answers to: `!inspiration`, plus
 * the command a 0.1.x GM chose.
 *
 * @returns {string[]} Prefixes with the leading "!".
 */
function prefixes() {
  const legacy = getState().legacyCommand;
  return legacy ? [COMMAND, `!${legacy}`] : [COMMAND];
}

/**
 * Tells the GM (or the player who asked) what happened to one character,
 * when the result was not already announced in chat.
 *
 * @param {string} playerId Who asked.
 * @param {object} character Roll20 character.
 * @param {object} result Action result.
 * @returns {void}
 */
function report(playerId, character, result) {
  const lang = getConfig().language;
  const vars = { name: toText(character.get('name')), term: termFor(character.id, lang) };
  const target = playerId === API_PLAYER_ID ? null : playerId;
  switch (result.status) {
    case 'already':
      whisperWarning(target, t('messages.already', lang, vars));
      break;
    case 'none':
      whisperWarning(target, t('messages.none', lang, vars));
      break;
    case 'removed':
      whisper(target, SCRIPT_NAME, escapeHtml(t('messages.removed', lang, vars)));
      break;
    case 'denied':
      whisperError(target, t('errors.denied', lang, vars));
      break;
    case 'busy':
      whisperWarning(target, t('messages.busy', lang, vars));
      break;
    case 'failed':
      whisperError(target, t('errors.writeFailed', lang, vars), result.error);
      break;
    default:
      break;
  }
}

/**
 * Runs an action on the selected characters (or those given with --ids).
 *
 * @param {object} msg Chat message.
 * @param {object} cmd Parsed command.
 * @param {Function} action Async action taking (character, playerId).
 * @returns {Promise<void>}
 */
async function forCharacters(msg, cmd, action) {
  const lang = getConfig().language;
  const { characters, skipped } = resolveCharacters(msg.selected, cmd.ids);
  if (skipped.length > 0) {
    whisperWarning(msg.playerid, t('errors.noCharacter', lang, { names: skipped.join(', ') }));
  }
  if (characters.length === 0) {
    if (skipped.length === 0) {
      whisperError(
        msg.playerid,
        t('errors.nothingSelected', lang),
        t('errors.nothingSelectedHint', lang)
      );
    }
    return;
  }
  for (const character of characters) {
    report(msg.playerid, character, await action(character, msg.playerid));
  }
  if (cmd.party) {
    await showParty(msg.playerid, isGmOrMod(msg.playerid, API_PLAYER_ID));
  }
}

/**
 * Toggles a character: gives inspiration when it has none, otherwise takes
 * it away (0.1.x's `!inspiration` with tokens selected).
 *
 * @param {object} character Roll20 character.
 * @param {string} playerId Who asked.
 * @returns {Promise<object>} Action result.
 */
async function toggle(character, playerId) {
  const { inspired } = await readInspiration(character.id);
  return inspired ? remove(character) : give(character, playerId);
}

/**
 * Handles `set`: with no arguments shows the settings, otherwise changes one.
 *
 * @param {string} playerId Who asked.
 * @param {string[]} args Setting key and value.
 * @returns {void}
 */
function handleSet(playerId, args) {
  const lang = getConfig().language;
  if (args.length === 0) {
    showSettings(playerId);
    return;
  }
  const [rawKey, ...rest] = args;
  const key = Object.keys(getConfig()).find((k) => k.toLowerCase() === rawKey.toLowerCase());
  let value = rest.join(' ');
  if (key === 'marker') {
    const marker = resolveMarker(value);
    if (!marker) {
      whisperError(
        playerId,
        t('errors.unknownMarker', lang, { value }),
        t('errors.unknownMarkerHint', lang)
      );
      return;
    }
    value = marker.tag;
  }
  const oldMarker = getConfig().marker;
  const result = key ? setConfigValue(key, value) : { valid: false };
  if (!result.valid) {
    whisperError(
      playerId,
      t('errors.badSetting', lang, { key: rawKey, value }),
      t('errors.badSettingHint', lang)
    );
    return;
  }
  if (key === 'marker' && oldMarker !== result.value) {
    moveMarker(oldMarker);
  }
  if (key === 'language') {
    installHandouts();
  }
  showSettings(playerId);
}

/**
 * Takes the old marker off every token and shows the new one where the
 * character has inspiration.
 *
 * @param {string} oldMarker Previous marker tag.
 * @returns {void}
 */
function moveMarker(oldMarker) {
  const marker = getConfig().marker;
  for (const token of findObjs({ _type: 'graphic', _subtype: 'token' })) {
    const tags = toText(token.get('statusmarkers')).split(',');
    if (tags.some((tag) => tag.split('@')[0] === oldMarker)) {
      token.set(
        'statusmarkers',
        tags.filter((tag) => tag && tag.split('@')[0] !== oldMarker).join(',')
      );
    }
  }
  for (const [charId, inspired] of Object.entries(getState().known)) {
    if (inspired && marker) {
      syncTokens(charId, true);
    }
  }
}

/**
 * Creates or updates the token action players click to spend inspiration.
 *
 * @param {string} playerId GM who asked.
 * @returns {void}
 */
function installMacro(playerId) {
  const lang = getConfig().language;
  const action = `${COMMAND} spend`;
  const creator =
    playerId === API_PLAYER_ID
      ? findObjs({ _type: 'player' }).find((p) => playerIsGM(p.id))?.id
      : playerId;
  const existing = findObjs({ _type: 'macro', name: MACRO_NAME });
  if (existing.length > 0) {
    for (const macro of existing) {
      macro.set({ action, visibleto: 'all', istokenaction: true });
    }
  } else if (creator) {
    createObj('macro', {
      name: MACRO_NAME,
      action,
      visibleto: 'all',
      istokenaction: true,
      playerid: creator,
    });
  }
  whisper(
    playerId === API_PLAYER_ID ? null : playerId,
    SCRIPT_NAME,
    escapeHtml(t('messages.macro', lang, { name: MACRO_NAME }))
  );
}

/**
 * Handles commands from players who are not GMs.
 *
 * @param {object} msg Chat message.
 * @param {object} cmd Parsed command.
 * @returns {Promise<void>}
 */
async function handlePlayer(msg, cmd) {
  const lang = getConfig().language;
  switch (cmd.sub) {
    case '':
    case 'menu':
      await showPlayerCard(msg.playerid);
      return;
    case 'spend':
      if (!getConfig().playerSpend) {
        whisperError(msg.playerid, t('errors.spendOff', lang));
        return;
      }
      await forCharacters(msg, cmd, spend);
      return;
    case 'party':
      await showParty(msg.playerid, false);
      return;
    case 'pass':
      await handlePass(msg, cmd);
      return;
    case 'help':
      showHelp(msg.playerid, false);
      return;
    default:
      whisperError(msg.playerid, t('errors.gmOnly', lang), t('errors.gmOnlyHint', lang));
  }
}

/**
 * Handles `pass <offer> <character|none>`.
 *
 * @param {object} msg Chat message.
 * @param {object} cmd Parsed command.
 * @returns {Promise<void>}
 */
async function handlePass(msg, cmd) {
  const lang = getConfig().language;
  const [offerId = '', targetId = ''] = cmd.args;
  const result = await passOn(offerId, targetId, msg.playerid);
  const target = msg.playerid === API_PLAYER_ID ? null : msg.playerid;
  const vars = { from: result.from, to: result.to, name: result.from, term: result.term };
  switch (result.status) {
    case 'unknown':
      whisperWarning(target, t('errors.offerGone', lang));
      break;
    case 'denied':
      whisperError(target, t('errors.denied', lang, vars));
      break;
    case 'invalid':
      whisperError(target, t('errors.passInvalid', lang));
      break;
    case 'already':
      whisperWarning(target, t('messages.passAlready', lang, vars));
      break;
    case 'declined':
      whisper(target, SCRIPT_NAME, escapeHtml(t('messages.declined', lang, vars)));
      break;
    case 'failed':
      whisperError(target, t('errors.writeFailed', lang, { name: result.to }), result.error);
      break;
    default:
      break;
  }
}

/**
 * Handles commands from GMs and other Mods.
 *
 * @param {object} msg Chat message.
 * @param {object} cmd Parsed command.
 * @returns {Promise<void>}
 */
async function handleGm(msg, cmd) {
  const lang = getConfig().language;
  const who = msg.playerid === API_PLAYER_ID ? null : msg.playerid;
  switch (cmd.sub) {
    case '':
      if ((msg.selected || []).length > 0 || cmd.ids.length > 0) {
        await forCharacters(msg, cmd, toggle);
      } else {
        showMainMenu(who);
      }
      return;
    case 'menu':
      showMainMenu(who);
      return;
    case 'give':
      await forCharacters(msg, cmd, give);
      return;
    case 'remove':
      await forCharacters(msg, cmd, remove);
      return;
    case 'toggle':
      await forCharacters(msg, cmd, toggle);
      return;
    case 'spend':
      await forCharacters(msg, cmd, spend);
      return;
    case 'party': {
      const action = (cmd.args[0] || '').toLowerCase();
      if (action === 'add' || action === 'remove') {
        const { characters } = resolveCharacters(msg.selected, cmd.ids);
        if (characters.length === 0) {
          whisperError(
            who,
            t('errors.nothingSelected', lang),
            t('errors.nothingSelectedHint', lang)
          );
          return;
        }
        for (const character of characters) {
          setPartyMember(character.id, action === 'add');
        }
      }
      await showParty(who, true);
      return;
    }
    case 'pass':
      await handlePass(msg, cmd);
      return;
    case 'undo': {
      const result = await undoSpend(cmd.args[0] || '');
      if (result.status === 'unknown') {
        whisperWarning(who, t('errors.undoGone', lang));
      } else if (result.status === 'already') {
        whisperWarning(who, t('messages.undoAlready', lang, { name: result.name }));
      } else if (result.status === 'failed') {
        whisperError(who, t('errors.writeFailed', lang, { name: result.name }), result.error);
      }
      return;
    }
    case 'macro':
      installMacro(msg.playerid);
      return;
    case 'sync': {
      const counts = await syncAll();
      whisper(who, SCRIPT_NAME, escapeHtml(t('messages.synced', lang, counts)));
      return;
    }
    case 'set':
    case 'settings':
    case 'config':
      handleSet(who, cmd.sub === 'set' ? cmd.args : []);
      return;
    case 'reset':
      resetConfig();
      showSettings(who);
      return;
    case 'status':
      showStatus(who, getState().legacyCommand);
      return;
    case 'journal':
      installHandouts();
      whisper(who, SCRIPT_NAME, escapeHtml(t('messages.journal', lang)));
      return;
    case 'help':
      showHelp(who, true);
      return;
    default:
      whisperError(
        who,
        t('errors.unknownCommand', lang, { command: cmd.sub }),
        t('errors.unknownCommandHint', lang)
      );
  }
}

/**
 * Handles a chat message.
 *
 * @param {object} msg Roll20 chat message.
 * @returns {Promise<void>}
 */
export async function handleInput(msg) {
  if (msg.type !== 'api') {
    return;
  }
  const text = toText(msg.content);
  const prefix = prefixes().find(
    (p) =>
      text.toLowerCase() === p.toLowerCase() || text.toLowerCase().startsWith(`${p.toLowerCase()} `)
  );
  if (!prefix) {
    return;
  }
  const cmd = parseCommand(text.slice(prefix.length));
  if (isGmOrMod(msg.playerid, API_PLAYER_ID)) {
    await handleGm(msg, cmd);
  } else {
    await handlePlayer(msg, cmd);
  }
}
