// Chat menus: the GM menu, settings, party overview, the player card,
// status and help.

import { termFor } from './actions.js';
import {
  buildButton,
  buildDivider,
  buildRow,
  buildSecondaryButton,
  buildSectionLabel,
  whisper,
} from './chat.js';
import {
  ANNOUNCE_OPTIONS,
  COMMAND,
  FX_COLOURS,
  FX_TYPES,
  HANDOUT_HELP_NAME,
  HELP_COMMANDS,
  SCRIPT_NAME,
  SCRIPT_VERSION,
  SETTING_KEYS,
  WORDING_OPTIONS,
} from './constants.js';
import { LOCALE_DEFINITIONS, t } from './i18n.js';
import { listMarkers, markerName } from './markers.js';
import { canControl, partyMembers } from './party.js';
import { readInspiration, rulesFor, sheetKind } from './sheet.js';
import { getConfig } from './state.js';
import { escapeHtml, queryText, toText } from './utils.js';

const YES = '✔';
const NO = '—';

/**
 * Builds a roll query offering a list of values.
 *
 * @param {string} prompt Prompt text.
 * @param {{label: string, value: string}[]} options Choices.
 * @returns {string} Roll query.
 */
function query(prompt, options) {
  const choices = options.map((o) => `${queryText(o.label)},${queryText(o.value)}`).join('|');
  return `?{${queryText(prompt)}|${choices}}`;
}

/**
 * Returns a translated on/off label.
 *
 * @param {boolean} value Setting.
 * @param {string} lang Locale code.
 * @returns {string} Label.
 */
function onOff(value, lang) {
  return t(value ? 'values.on' : 'values.off', lang);
}

/**
 * Shows the GM menu.
 *
 * @param {string|null} playerId Who asked.
 * @returns {void}
 */
export function showMainMenu(playerId) {
  const lang = getConfig().language;
  const b = (key, args) => buildButton(t(`buttons.${key}`, lang), `${COMMAND} ${args}`.trim());
  const s = (key, args) =>
    buildSecondaryButton(t(`buttons.${key}`, lang), `${COMMAND} ${args}`.trim());
  whisper(playerId, `${SCRIPT_NAME} v${SCRIPT_VERSION}`, [
    buildSectionLabel(t('menu.selected', lang)),
    b('give', 'give'),
    b('remove', 'remove'),
    b('toggle', 'toggle'),
    b('spend', 'spend'),
    buildSectionLabel(t('menu.party', lang)),
    b('party', 'party'),
    s('partyAdd', 'party add'),
    s('partyRemove', 'party remove'),
    buildSectionLabel(t('menu.tools', lang)),
    s('settings', 'set'),
    s('macro', 'macro'),
    s('sync', 'sync'),
    s('status', 'status'),
    s('help', 'help'),
    `<div style="font-size:0.85em;margin-top:4px">${escapeHtml(t('menu.hint', lang, { help: HANDOUT_HELP_NAME }))}</div>`,
  ]);
}

/**
 * Builds the value button for one setting.
 *
 * @param {string} key Setting key.
 * @param {string} lang Locale code.
 * @returns {string} Button HTML.
 */
function settingButton(key, lang) {
  const config = getConfig();
  const value = config[key];
  const set = (label, choices) =>
    buildButton(label, `${COMMAND} set ${key} ${query(t(`settings.${key}.label`, lang), choices)}`);
  switch (key) {
    case 'language':
      return set(
        value,
        LOCALE_DEFINITIONS.map((d) => ({
          label: `${d.nativeName || d.name} (${d.code})`,
          value: d.code,
        }))
      );
    case 'marker':
      return set(
        markerName(value),
        listMarkers().map((m) => ({ label: m.name, value: m.tag }))
      );
    case 'wording':
      return set(
        t(`values.wording.${value}`, lang),
        WORDING_OPTIONS.map((o) => ({ label: t(`values.wording.${o}`, lang), value: o }))
      );
    case 'announce':
      return set(
        t(`values.announce.${value}`, lang),
        ANNOUNCE_OPTIONS.map((o) => ({ label: t(`values.announce.${o}`, lang), value: o }))
      );
    case 'fxType':
      return set(
        value,
        FX_TYPES.flatMap((type) => FX_COLOURS.map((colour) => `${type}-${colour}`)).map((v) => ({
          label: v,
          value: v,
        }))
      );
    default:
      return buildButton(onOff(value, lang), `${COMMAND} set ${key} ${value ? 'off' : 'on'}`);
  }
}

/**
 * Shows the settings menu.
 *
 * @param {string|null} playerId Who asked.
 * @returns {void}
 */
export function showSettings(playerId) {
  const lang = getConfig().language;
  const rows = SETTING_KEYS.map((key) =>
    buildRow(t(`settings.${key}.label`, lang), settingButton(key, lang))
  );
  whisper(playerId, t('titles.settings', lang), [
    ...rows,
    buildDivider(),
    buildSecondaryButton(t('buttons.menu', lang), COMMAND),
    buildSecondaryButton(t('buttons.reset', lang), `${COMMAND} reset`),
  ]);
}

/**
 * Reads the party's inspiration.
 *
 * @param {object[]} characters Roll20 characters.
 * @returns {Promise<{character: object, inspired: boolean, kind: string}[]>} Rows.
 */
async function readRows(characters) {
  const rows = [];
  for (const character of characters) {
    const value = await readInspiration(character.id);
    rows.push({ character, ...value });
  }
  return rows;
}

/**
 * Builds one overview line.
 *
 * @param {object} row Row from readRows.
 * @param {string} lang Locale code.
 * @param {string} buttons Button HTML.
 * @returns {string} HTML.
 */
function overviewLine(row, lang, buttons) {
  const name = escapeHtml(toText(row.character.get('name')));
  const mark = row.inspired
    ? `<span style="color:#f2c94c;font-weight:bold">${YES}</span>`
    : `<span style="opacity:0.6">${NO}</span>`;
  const sheet =
    row.kind === 'none'
      ? ` <span style="font-size:0.8em;opacity:0.7">(${escapeHtml(t('menu.noSheet', lang))})</span>`
      : '';
  return [
    '<table style="width:100%;border-collapse:collapse;margin:1px 0"><tr>',
    `<td style="width:1.4em;text-align:center">${mark}</td>`,
    `<td>${name}${sheet}</td>`,
    `<td style="text-align:right;white-space:nowrap">${buttons}</td>`,
    '</tr></table>',
  ].join('');
}

/**
 * Shows the party overview. The GM gets Give and Remove buttons; players get
 * a read-only list (when the GM allows it) with Spend for their own
 * characters.
 *
 * @param {string} playerId Who asked.
 * @param {boolean} gm Whether they act as GM.
 * @returns {Promise<void>}
 */
export async function showParty(playerId, gm) {
  const config = getConfig();
  const lang = config.language;
  const members = partyMembers();
  const visible =
    gm || config.playerOverview ? members : members.filter((c) => canControl(playerId, c));
  const rows = await readRows(visible);
  const lines = rows.map((row) => {
    const id = row.character.id;
    let buttons = '';
    if (gm) {
      buttons = row.inspired
        ? buildSecondaryButton(t('buttons.remove', lang), `${COMMAND} remove --ids ${id} --party`) +
          buildSecondaryButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${id} --party`)
        : buildButton(t('buttons.give', lang), `${COMMAND} give --ids ${id} --party`);
    } else if (row.inspired && config.playerSpend && canControl(playerId, row.character)) {
      buttons = buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${id} --party`);
    }
    return overviewLine(row, lang, buttons);
  });
  const count = rows.filter((r) => r.inspired).length;
  const term = rows.length > 0 ? termFor(rows[0].character.id, lang) : t('terms.heroic', lang);
  const body = [
    lines.length > 0
      ? lines.join('')
      : `<div>${escapeHtml(t(gm ? 'menu.partyEmptyGm' : 'menu.partyEmpty', lang))}</div>`,
    buildDivider(),
    `<div style="font-size:0.9em">${escapeHtml(t('menu.partyCount', lang, { count, total: rows.length, term }))}</div>`,
    buildSecondaryButton(t('buttons.refresh', lang), `${COMMAND} party`),
  ];
  if (gm) {
    body.push(buildSecondaryButton(t('buttons.menu', lang), COMMAND));
  }
  whisper(playerId, t('titles.party', lang), body);
}

/**
 * Shows a player the characters they control, with Spend buttons. The GM
 * can turn the party overview on for players instead.
 *
 * @param {string} playerId Who asked.
 * @returns {Promise<void>}
 */
export async function showPlayerCard(playerId) {
  const config = getConfig();
  if (config.playerOverview) {
    await showParty(playerId, false);
    return;
  }
  const lang = config.language;
  const own = findObjs({ _type: 'character' })
    .filter((c) => !c.get('archived') && canControl(playerId, c) && sheetKind(c.id) !== 'none')
    .sort((a, b) => toText(a.get('name')).localeCompare(toText(b.get('name'))));
  const rows = await readRows(own);
  const lines = rows.map((row) =>
    overviewLine(
      row,
      lang,
      row.inspired && config.playerSpend
        ? buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${row.character.id}`)
        : ''
    )
  );
  whisper(
    playerId,
    t('titles.yours', lang),
    lines.length > 0 ? lines : [`<div>${escapeHtml(t('menu.noneYours', lang))}</div>`]
  );
}

/**
 * Shows the Mod's status.
 *
 * @param {string|null} playerId Who asked.
 * @param {string} legacyCommand 0.1.x command still answered, if any.
 * @returns {void}
 */
export function showStatus(playerId, legacyCommand) {
  const config = getConfig();
  const lang = config.language;
  const characters = findObjs({ _type: 'character' });
  const counts = { legacy: 0, beacon: 0, none: 0 };
  let rules2024 = 0;
  for (const c of characters) {
    const kind = sheetKind(c.id);
    counts[kind] += 1;
    if (kind !== 'none' && rulesFor(c.id) === '2024') {
      rules2024 += 1;
    }
  }
  const row = (key, value) => buildRow(t(`status.${key}`, lang), escapeHtml(String(value)));
  whisper(playerId, t('titles.status', lang), [
    row('version', SCRIPT_VERSION),
    row('beacon', counts.beacon),
    row('legacy', counts.legacy),
    row('none', counts.none),
    row('rules2024', rules2024),
    row('party', partyMembers().length),
    row('marker', markerName(config.marker)),
    row('fx', config.fx ? config.fxType : onOff(false, lang)),
    legacyCommand ? row('legacyCommand', `!${legacyCommand}`) : '',
  ]);
}

/**
 * Shows the command list.
 *
 * @param {string|null} playerId Who asked.
 * @param {boolean} gm Whether they act as GM.
 * @returns {void}
 */
export function showHelp(playerId, gm) {
  const lang = getConfig().language;
  const commands = gm
    ? HELP_COMMANDS
    : HELP_COMMANDS.filter(([, key]) => ['menu', 'spend', 'party', 'help'].includes(key));
  const lines = commands.map(
    ([text, key]) =>
      `<div style="margin:2px 0"><code>${escapeHtml(`${COMMAND} ${text}`.trim())}</code><br><span style="font-size:0.9em">${escapeHtml(t(gm ? `help.${key}` : `helpPlayer.${key}`, lang))}</span></div>`
  );
  if (gm) {
    lines.push(
      `<div style="font-size:0.85em;margin-top:4px">${escapeHtml(t('menu.hint', lang, { help: HANDOUT_HELP_NAME }))}</div>`
    );
  }
  whisper(playerId, t('titles.help', lang), lines);
}
