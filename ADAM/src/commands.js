import {
  ADAM_VERSION,
  CMD_ADAM,
  CMD_SIMON,
  FLAG_HELP,
  FLAG_VERSION,
  FLAG_CREDITS,
  FLAG_MOVE,
  FLAG_FACE,
  FLAG_STATE,
  FLAG_ACTION,
  FLAG_MENU,
  FLAG_CONFIG,
  FLAG_PROFILE,
  FLAG_INSTALL_MACRO,
  FLAG_SHOW_SETTINGS,
  FLAG_RESET_SETTINGS,
  ALLOWED_STATES,
  ACTION_STATE_MAP,
  ALLOWED_PROFILE_CREATION_MODES,
  ALLOWED_ANIM_SETS,
  PROFILE_ID_PATTERN,
  VERSION_EASTER_EGG_CHANCE,
} from './constants.js';
import { normalizeDirection } from './direction.js';
import { moveToken } from './movement.js';
import { faceToken } from './facing.js';
import { updateTokenState } from './tokenState.js';
import { showHelp, showVersion, showCredits } from './help.js';
import { showTokenMenu } from './menu.js';
import {
  getSettings,
  resetSettings,
  getProfile,
  getTokenProfile,
  getTokenProfileId,
  listProfiles,
  saveProfile,
  deleteProfile,
  assignTokenProfile,
  removeTokenProfile,
  canModifyProfile,
  isGlobalProfile,
  playerControlsToken,
  getDraft,
  saveDraft,
  deleteDraft,
  listDrafts,
  approveDraft,
  getTokenState,
} from './state.js';
import {
  escapeHtml,
  whisperGM,
  whisperGMSuccess,
  whisperSender,
  whisperSenderError,
  whisperSenderSuccess,
  getSafeTokenName,
} from './messages.js';
import { parseFreeStringFlag, parseBooleanFlag, parseIntegerFlag } from './parsers.js';
import { getSelectedToken } from './token.js';
import {
  whisperMovementEasterEgg,
  whisperStateEasterEgg,
  whisperSimonResponse,
  whisperSimonNoSays,
} from './easter.js';
import { t, normalizeLocale, SUPPORTED_LOCALE_LIST } from './i18n.js';

// ─── MOVE ────────────────────────────────────────────────────────────────────

/**
 * Handles !adam --move <direction>.
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @returns {void}
 */
function handleMove(msg, content) {
  const { language } = getSettings();
  const result = parseFreeStringFlag(content, FLAG_MOVE);
  if (!result.found || !result.value) {
    whisperSenderError(
      msg,
      t('errors.missingDirection', language),
      t('titles.missingDirection', language)
    );
    return;
  }

  const direction = normalizeDirection(result.value);
  if (!direction) {
    whisperSenderError(
      msg,
      t('errors.invalidDirection', language, { value: escapeHtml(result.value) }),
      t('titles.invalidDirection', language)
    );
    return;
  }

  const token = getSelectedToken(msg);
  if (!token) return;

  const { moved, moveHistory } = moveToken(token, direction);
  if (!moved) {
    whisperSenderError(msg, t('errors.moveFailed', language), t('titles.moveError', language));
    return;
  }

  whisperMovementEasterEgg(msg, moveHistory);
}

// ─── FACE ────────────────────────────────────────────────────────────────────

/**
 * Handles !adam --face <direction>.
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @returns {void}
 */
function handleFace(msg, content) {
  const { language } = getSettings();
  const result = parseFreeStringFlag(content, FLAG_FACE);
  if (!result.found || !result.value) {
    whisperSenderError(
      msg,
      t('errors.missingDirection', language),
      t('titles.missingDirection', language)
    );
    return;
  }

  const direction = normalizeDirection(result.value);
  if (!direction) {
    whisperSenderError(
      msg,
      t('errors.invalidDirection', language, { value: escapeHtml(result.value) }),
      t('titles.invalidDirection', language)
    );
    return;
  }

  const token = getSelectedToken(msg);
  if (!token) return;

  faceToken(token, direction);

  const tokenName = getSafeTokenName(token, 'Token');
  whisperSender(
    msg,
    t('confirm.facing', language, { token: tokenName, direction: direction.toUpperCase() })
  );
}

// ─── STATE ───────────────────────────────────────────────────────────────────

/**
 * Handles !adam --state <state>.
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @returns {void}
 */
function handleState(msg, content) {
  const { language } = getSettings();
  const result = parseFreeStringFlag(content, FLAG_STATE);
  if (!result.found || !result.value) {
    whisperSenderError(
      msg,
      t('errors.missingState', language, { states: ALLOWED_STATES.join(', ') }),
      t('titles.missingState', language)
    );
    return;
  }

  const normalized = result.value.trim().toLowerCase();
  if (!ALLOWED_STATES.includes(normalized)) {
    whisperSenderError(
      msg,
      t('errors.invalidState', language, {
        value: escapeHtml(result.value),
        states: ALLOWED_STATES.join(', '),
      }),
      t('titles.invalidState', language)
    );
    return;
  }

  const token = getSelectedToken(msg);
  if (!token) return;

  const tokenId = token.get('_id');
  const updateResult = updateTokenState(tokenId, token, normalized);
  const tokenName = getSafeTokenName(token, 'Token');

  whisperSender(msg, t('confirm.stateSet', language, { token: tokenName, state: normalized }));
  whisperStateEasterEgg(msg, normalized, updateResult);
}

// ─── ACTION ──────────────────────────────────────────────────────────────────

/**
 * Handles !adam --action <action>.
 * Actions are aliases to states, resolved through ACTION_STATE_MAP.
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @returns {void}
 */
function handleAction(msg, content) {
  const { language } = getSettings();
  const result = parseFreeStringFlag(content, FLAG_ACTION);
  if (!result.found || !result.value) {
    whisperSenderError(
      msg,
      t('errors.missingAction', language),
      t('titles.missingAction', language)
    );
    return;
  }

  const normalized = result.value.trim().toLowerCase();
  const mappedState = ACTION_STATE_MAP[normalized];

  if (!mappedState) {
    whisperSenderError(
      msg,
      t('errors.invalidAction', language, {
        value: escapeHtml(result.value),
        actions: Object.keys(ACTION_STATE_MAP).join(', '),
      }),
      t('titles.invalidAction', language)
    );
    return;
  }

  const token = getSelectedToken(msg);
  if (!token) return;

  const tokenId = token.get('_id');
  const updateResult = updateTokenState(tokenId, token, mappedState);
  const tokenName = getSafeTokenName(token, 'Token');

  whisperSender(
    msg,
    t('confirm.actionSet', language, { token: tokenName, action: normalized, state: mappedState })
  );
  whisperStateEasterEgg(msg, mappedState, updateResult);
}

// ─── MENU ────────────────────────────────────────────────────────────────────

/**
 * Handles !adam --menu.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
function handleMenu(msg) {
  const token = getSelectedToken(msg);
  if (!token) return;
  showTokenMenu(msg, token);
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const FLAG_CONFIG_GRID_SIZE = /--config\s+grid-size\b/i;
const FLAG_CONFIG_MOVE_DISTANCE = /--config\s+move-distance\b/i;
const FLAG_CONFIG_AUTO_FACE = /--config\s+auto-face\b/i;
const FLAG_CONFIG_HUMOUR = /--config\s+humour\b/i;
const FLAG_CONFIG_LANGUAGE = /--config\s+language\b/i;
const FLAG_CONFIG_PROFILE_MODE = /--config\s+profile-creation-mode\b/i;
const FLAG_CONFIG_RESET = /--config\s+reset\b/i;

const CHANGE_FLAGS_PATTERN =
  /--config\s+(grid-size|move-distance|auto-face|humour|language|profile-creation-mode|reset)\b/i;

/**
 * Handles !adam --config [...].
 * Configuration changes are GM-only; viewing is open to all.
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @param {boolean} isGM Whether the sender is the GM.
 * @returns {void}
 */
function handleConfig(msg, content, isGM) {
  const { language } = getSettings();
  const isChanging = CHANGE_FLAGS_PATTERN.test(content);

  if (isChanging && !isGM) {
    whisperSenderError(
      msg,
      t('errors.accessDeniedConfig', language),
      t('titles.accessDenied', language)
    );
    return;
  }

  if (FLAG_CONFIG_RESET.test(content)) {
    resetSettings();
    // Language is now en-US after reset; use it for the confirmation.
    const resetLang = getSettings().language;
    whisperSenderSuccess(
      msg,
      t('confirm.settingsReset', resetLang),
      t('titles.settingsReset', resetLang)
    );
    showSettingsCard(msg);
    return;
  }

  const settings = getSettings();
  let changed = false;

  if (FLAG_CONFIG_GRID_SIZE.test(content)) {
    const r = parseIntegerFlag(content, /grid-size\b/i, 10, 1000);
    if (r.valid) {
      settings.gridSize = r.value;
      changed = true;
    } else {
      whisperSenderError(
        msg,
        t('errors.gridSizeInvalid', language),
        t('titles.invalidValue', language)
      );
    }
  }

  if (FLAG_CONFIG_MOVE_DISTANCE.test(content)) {
    const r = parseIntegerFlag(content, /move-distance\b/i, 1, 20);
    if (r.valid) {
      settings.moveDistance = r.value;
      changed = true;
    } else {
      whisperSenderError(
        msg,
        t('errors.moveDistanceInvalid', language),
        t('titles.invalidValue', language)
      );
    }
  }

  if (FLAG_CONFIG_AUTO_FACE.test(content)) {
    const r = parseBooleanFlag(content, /auto-face\b/i);
    if (r.valid) {
      settings.autoFace = r.value;
      changed = true;
    } else {
      whisperSenderError(
        msg,
        t('errors.autoFaceInvalid', language),
        t('titles.invalidValue', language)
      );
    }
  }

  if (FLAG_CONFIG_HUMOUR.test(content)) {
    const r = parseBooleanFlag(content, /humour\b/i);
    if (r.valid) {
      settings.humour = r.value;
      changed = true;
    } else {
      whisperSenderError(
        msg,
        t('errors.humourInvalid', language),
        t('titles.invalidValue', language)
      );
    }
  }

  if (FLAG_CONFIG_LANGUAGE.test(content)) {
    const r = parseFreeStringFlag(content, /language\b/i);
    if (r.found && r.value) {
      const canonical = normalizeLocale(r.value);
      if (canonical) {
        settings.language = canonical;
        changed = true;
        // Confirm in the new language
        whisperSenderSuccess(
          msg,
          t('confirm.langSet', canonical, { locale: canonical }),
          t('titles.langSet', canonical)
        );
      } else {
        whisperSenderError(
          msg,
          t('errors.langInvalid', language, { locales: SUPPORTED_LOCALE_LIST }),
          t('titles.langInvalid', language)
        );
      }
      // Settings card shown after language change uses the newly set language
    } else {
      whisperSenderError(
        msg,
        t('errors.langInvalid', language, { locales: SUPPORTED_LOCALE_LIST }),
        t('titles.langInvalid', language)
      );
    }
  }

  if (FLAG_CONFIG_PROFILE_MODE.test(content)) {
    const r = parseFreeStringFlag(content, /profile-creation-mode\b/i);
    if (r.found && r.value && ALLOWED_PROFILE_CREATION_MODES.includes(r.value.toLowerCase())) {
      settings.profileCreationMode = r.value.toLowerCase();
      changed = true;
    } else {
      whisperSenderError(
        msg,
        t('errors.profileCreationModeInvalid', language),
        t('titles.invalidValue', language)
      );
    }
  }

  if (changed) {
    const newLang = getSettings().language;
    if (!FLAG_CONFIG_LANGUAGE.test(content)) {
      whisperSenderSuccess(
        msg,
        t('confirm.configUpdated', newLang),
        t('titles.configuration', newLang)
      );
    }
  }

  showSettingsCard(msg);
}

/**
 * Whispers a summary of current settings to GM chat.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
function showSettingsCard(msg) {
  const s = getSettings();
  const lang = s.language;
  const onOff = (v) => t(v ? 'settings.on' : 'settings.off', lang);

  const lines = [
    `<strong>${t('settings.gridSize', lang)}:</strong> ${t('settings.gridSizeDesc', lang, { size: s.gridSize })}<br>`,
    `<strong>${t('settings.moveDistance', lang)}:</strong> ${t('settings.moveDistanceDesc', lang, { squares: s.moveDistance, pixels: s.gridSize * s.moveDistance })}<br>`,
    `<strong>${t('settings.autoFace', lang)}:</strong> ${onOff(s.autoFace)}<br>`,
    `<strong>${t('settings.humour', lang)}:</strong> ${onOff(s.humour)}<br>`,
    `<strong>${t('settings.language', lang)}:</strong> ${s.language}<br>`,
    `<strong>${t('settings.profileCreationMode', lang)}:</strong> ${s.profileCreationMode}<br>`,
  ].join('');

  whisperSender(msg, lines, t('titles.adamsSettings', lang), 'left');
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────

/**
 * Parses "!adam --profile <sub> <id> <rest...>" from command content.
 * Returns {sub, id, rest} or null when the pattern does not match.
 *
 * @param {string} content Full command content.
 * @returns {{sub:string, id:string|null, rest:string}|null}
 */
function parseProfileArgs(content) {
  const m = /--profile\s+(\S+)(?:\s+(\S+)(?:\s+(.+))?)?/i.exec(content);
  if (!m) return null;
  return {
    sub: m[1].toLowerCase(),
    id: m[2] ?? null,
    rest: m[3]?.trim() ?? '',
  };
}

/**
 * Notifies all online GMs that a draft is awaiting review.
 *
 * @param {string} profileId Profile ID of the submitted draft.
 * @param {string} submitterName Display name of the submitting player.
 * @param {string} language Active locale code.
 * @returns {void}
 */
function notifyGmsOfDraft(profileId, submitterName, language) {
  const body = [
    `<strong>${t('profiles.id', language)}:</strong> ${escapeHtml(profileId)}<br>`,
    `<strong>${t('profiles.submittedBy', language)}:</strong> ${escapeHtml(submitterName)}<br>`,
    `<em>${t('profiles.approveHint', language)}</em>`,
  ].join('');
  sendChat(
    'ADAM',
    `/w GM ${
      // Reuse the styled info card via a raw sendChat so we don't need msg here.
      `<div style="background:#0A1210;color:#C8FFF0;border:1px solid #00C896;border-radius:4px;padding:6px;font-size:12px">` +
      `<div style="color:#00C896;font-weight:bold;font-size:11px;text-transform:uppercase;margin-bottom:4px">` +
      `${t('titles.draftNotification', language)}</div>${body}</div>`
    }`
  );
}

/**
 * Handles !adam --profile <subcommand> [...].
 *
 * Permission model per subcommand:
 *
 *  list / show                → all players
 *  assign / remove            → all players (mode-gated for personal profiles)
 *  create / edit-side / rename / delete → mode-gated
 *  draft / draft-side         → players (gm-approved mode only)
 *  review / approve / reject  → GM only
 *
 * @param {object} msg Roll20 chat message object.
 * @param {string} content Command content string.
 * @param {boolean} isGM Whether the sender is the GM.
 * @returns {void}
 */
function handleProfile(msg, content, isGM) {
  const { language, profileCreationMode } = getSettings();
  const args = parseProfileArgs(content);
  if (!args) {
    whisperSenderError(msg, t('errors.profileUsage', language), t('titles.invalidUsage', language));
    return;
  }

  const { sub, id, rest } = args;

  switch (sub) {
    // ── READ-ONLY ──────────────────────────────────────────────────────────────

    case 'list': {
      const profiles = listProfiles();
      if (profiles.length === 0) {
        whisperSender(msg, t('profiles.none', language), t('titles.profiles', language));
        return;
      }
      const items = profiles
        .map((p) => {
          const ownerTag = p.ownerId ? ` <em>(${t('profiles.personal', language)})</em>` : '';
          return `&bull; <strong>${escapeHtml(p.id)}</strong> — ${escapeHtml(p.displayName)}${ownerTag}`;
        })
        .join('<br>');
      whisperSender(msg, items, t('titles.profiles', language), 'left');
      break;
    }

    case 'show': {
      const token = getSelectedToken(msg);
      if (!token) return;
      const tokenId = token.get('_id');
      const profileId = getTokenProfileId(tokenId);
      const profile = getTokenProfile(tokenId);
      if (!profile) {
        whisperSender(msg, t('profiles.noProfile', language), t('titles.tokenProfile', language));
        return;
      }
      const stateList =
        Object.keys(profile.states || {})
          .map(escapeHtml)
          .join(', ') || t('profiles.noneValue', language);
      const ownerLine = profile.ownerId
        ? `<br><strong>${t('profiles.owner', language)}:</strong> ${escapeHtml(profile.ownerId)}`
        : '';
      whisperSender(
        msg,
        `<strong>${t('profiles.id', language)}:</strong> ${escapeHtml(profileId)}<br>` +
          `<strong>${t('profiles.displayName', language)}:</strong> ${escapeHtml(profile.displayName) || t('profiles.noneValue', language)}<br>` +
          `<strong>${t('profiles.mappedStates', language)}:</strong> ${stateList}${ownerLine}`,
        t('titles.tokenProfile', language),
        'left'
      );
      break;
    }

    // ── CREATE / EDIT / DELETE ─────────────────────────────────────────────────

    case 'create': {
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileCreateUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      if (!PROFILE_ID_PATTERN.test(id)) {
        whisperSenderError(
          msg,
          t('errors.profileIdInvalid', language, { id: escapeHtml(id) }),
          t('titles.invalidValue', language)
        );
        return;
      }
      // Permission checks
      if (profileCreationMode === 'gm-only' && !isGM) {
        whisperSenderError(
          msg,
          t('errors.profileGmOnly', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (profileCreationMode === 'gm-approved' && !isGM) {
        whisperSenderError(
          msg,
          t('errors.profileModeRequiresDraft', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (getProfile(id)) {
        whisperSenderError(
          msg,
          t('errors.profileAlreadyExists', language, { id: escapeHtml(id) }),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const displayName = rest || id;
      const ownerId = isGM ? null : msg.playerid;
      saveProfile(id, { displayName, states: {}, ...(ownerId ? { ownerId } : {}) });
      whisperSenderSuccess(
        msg,
        t('confirm.profileCreated', language, { id: escapeHtml(id) }),
        t('titles.profileCreated', language)
      );
      break;
    }

    case 'edit-side': {
      // !adam --profile edit-side <profileId> <state> <north|south> <number>
      const editMatch = /--profile\s+edit-side\s+(\S+)\s+(\S+)\s+(north|south)\s+(\d+)/i.exec(
        content
      );
      if (!editMatch) {
        whisperSenderError(
          msg,
          t('errors.profileEditSideUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const [, profileId, rawStateName, animSet, sideStr] = editMatch;
      const stateName = rawStateName.toLowerCase();
      const sideNumber = parseInt(sideStr, 10);

      if (!ALLOWED_STATES.includes(stateName)) {
        whisperSenderError(
          msg,
          t('errors.invalidState', language, {
            value: escapeHtml(stateName),
            states: ALLOWED_STATES.join(', '),
          }),
          t('titles.invalidState', language)
        );
        return;
      }
      if (!PROFILE_ID_PATTERN.test(profileId)) {
        whisperSenderError(
          msg,
          t('errors.profileIdInvalid', language, { id: escapeHtml(profileId) }),
          t('titles.invalidValue', language)
        );
        return;
      }
      if (!Number.isInteger(sideNumber) || sideNumber < 1) {
        whisperSenderError(
          msg,
          t('errors.invalidSideNumber', language),
          t('titles.invalidValue', language)
        );
        return;
      }
      const targetProfile = getProfile(profileId);
      if (!targetProfile) {
        whisperSenderError(
          msg,
          t('errors.profileNotFound', language, { id: escapeHtml(profileId) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      if (!canModifyProfile(profileId, msg.playerid, isGM)) {
        whisperSenderError(
          msg,
          isGlobalProfile(profileId)
            ? t('errors.profileGlobalReadOnly', language, { id: escapeHtml(profileId) })
            : t('errors.profileNotOwned', language, { id: escapeHtml(profileId) }),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (!targetProfile.states) targetProfile.states = {};
      if (!targetProfile.states[stateName]) targetProfile.states[stateName] = {};
      targetProfile.states[stateName][animSet] = sideNumber;
      saveProfile(profileId, targetProfile);
      whisperSenderSuccess(
        msg,
        t('confirm.profileSideSet', language, {
          id: escapeHtml(profileId),
          state: escapeHtml(stateName),
          animSet,
          number: sideNumber,
        }),
        t('titles.profileUpdated', language)
      );
      break;
    }

    case 'rename': {
      if (!id || !rest) {
        whisperSenderError(
          msg,
          t('errors.profileRenameUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const targetProfile = getProfile(id);
      if (!targetProfile) {
        whisperSenderError(
          msg,
          t('errors.profileNotFound', language, { id: escapeHtml(id) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      if (!canModifyProfile(id, msg.playerid, isGM)) {
        whisperSenderError(
          msg,
          isGlobalProfile(id)
            ? t('errors.profileGlobalReadOnly', language, { id: escapeHtml(id) })
            : t('errors.profileNotOwned', language, { id: escapeHtml(id) }),
          t('titles.accessDenied', language)
        );
        return;
      }
      saveProfile(id, { ...targetProfile, displayName: rest });
      whisperSenderSuccess(
        msg,
        t('confirm.profileRenamed', language, { id: escapeHtml(id), name: escapeHtml(rest) }),
        t('titles.profileRenamed', language)
      );
      break;
    }

    case 'delete': {
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileDeleteUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      if (!getProfile(id)) {
        whisperSenderError(
          msg,
          t('errors.profileNotFound', language, { id: escapeHtml(id) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      if (!canModifyProfile(id, msg.playerid, isGM)) {
        whisperSenderError(
          msg,
          isGlobalProfile(id)
            ? t('errors.profileGlobalReadOnly', language, { id: escapeHtml(id) })
            : t('errors.profileNotOwned', language, { id: escapeHtml(id) }),
          t('titles.accessDenied', language)
        );
        return;
      }
      deleteProfile(id);
      whisperSenderSuccess(
        msg,
        t('confirm.profileDeleted', language, { id: escapeHtml(id) }),
        t('titles.profileDeleted', language)
      );
      break;
    }

    // ── ASSIGN / REMOVE ────────────────────────────────────────────────────────

    case 'assign': {
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileAssignUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const token = getSelectedToken(msg);
      if (!token) return;

      // Non-GMs must control the token they are assigning to.
      // In all-users mode they may assign both their own personal profiles and
      // global (GM-created) profiles. In gm-only and gm-approved modes they
      // may only assign personal profiles they own.
      if (!isGM) {
        const profile = getProfile(id);
        if (!profile) {
          whisperSenderError(
            msg,
            t('errors.profileUnknown', language, { id: escapeHtml(id) }),
            t('titles.unknownProfile', language)
          );
          return;
        }
        if (!playerControlsToken(token, msg.playerid)) {
          whisperSenderError(
            msg,
            t('errors.profileAssignNoControl', language),
            t('titles.accessDenied', language)
          );
          return;
        }
        if (profile.ownerId && profile.ownerId !== msg.playerid) {
          whisperSenderError(
            msg,
            t('errors.profileAssignNotOwned', language, { id: escapeHtml(id) }),
            t('titles.accessDenied', language)
          );
          return;
        }
        if (!profile.ownerId) {
          // Global profile — only GMs may assign in gm-only / gm-approved modes.
          if (profileCreationMode !== 'all-users') {
            whisperSenderError(
              msg,
              t('errors.accessDeniedProfileAssign', language),
              t('titles.accessDenied', language)
            );
            return;
          }
        }
      }

      const tokenId = token.get('_id');
      if (!assignTokenProfile(tokenId, id)) {
        whisperSenderError(
          msg,
          t('errors.profileUnknown', language, { id: escapeHtml(id) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      const tokenName = getSafeTokenName(token, 'Token');
      whisperSenderSuccess(
        msg,
        t('confirm.profileAssigned', language, { id: escapeHtml(id), token: tokenName }),
        t('titles.profileAssigned', language)
      );
      break;
    }

    case 'remove': {
      const token = getSelectedToken(msg);
      if (!token) return;
      if (!isGM && !playerControlsToken(token, msg.playerid)) {
        whisperSenderError(
          msg,
          t('errors.accessDeniedProfileRemove', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      const tokenId = token.get('_id');
      removeTokenProfile(tokenId);
      const tokenName = getSafeTokenName(token, 'Token');
      whisperSenderSuccess(
        msg,
        t('confirm.profileRemoved', language, { token: tokenName }),
        t('titles.profileRemoved', language)
      );
      break;
    }

    // ── DRAFT WORKFLOW (gm-approved) ───────────────────────────────────────────

    case 'draft': {
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileDraftUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      if (!PROFILE_ID_PATTERN.test(id)) {
        whisperSenderError(
          msg,
          t('errors.profileIdInvalid', language, { id: escapeHtml(id) }),
          t('titles.invalidValue', language)
        );
        return;
      }
      // Fix 4: gate to gm-approved mode only.
      if (profileCreationMode !== 'gm-approved') {
        whisperSenderError(
          msg,
          t('errors.profileDraftNotGmApproved', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (isGM) {
        // GMs can create profiles directly — no need to go through draft workflow.
        whisperSenderError(
          msg,
          t('errors.profileGmOnly', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      // Fix 2a: block if an active profile already uses this ID.
      if (getProfile(id)) {
        whisperSenderError(
          msg,
          t('errors.profileAlreadyExists', language, { id: escapeHtml(id) }),
          t('titles.invalidUsage', language)
        );
        return;
      }
      // Fix 2b: block if another player already owns the pending draft.
      const existingDraft = getDraft(id);
      if (existingDraft && existingDraft.submittedBy !== msg.playerid) {
        whisperSenderError(
          msg,
          t('errors.profileDraftConflict', language, { id: escapeHtml(id) }),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const displayName = rest || id;
      const draft = {
        ...(existingDraft ?? {}),
        displayName,
        states: existingDraft?.states ?? {},
        submittedBy: msg.playerid,
        submittedAt: new Date().toISOString(),
      };
      saveDraft(id, draft);
      const player = getObj('player', msg.playerid);
      const playerName = player ? player.get('_displayname') : msg.who;
      notifyGmsOfDraft(id, playerName, language);
      whisperSenderSuccess(
        msg,
        t('confirm.profileDraftSubmitted', language, { id: escapeHtml(id) }),
        t('titles.draftSubmitted', language)
      );
      break;
    }

    case 'draft-side': {
      // Fix 4: gate to gm-approved mode only.
      if (profileCreationMode !== 'gm-approved') {
        whisperSenderError(
          msg,
          t('errors.profileDraftNotGmApproved', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      // !adam --profile draft-side <profileId> <state> <north|south> <number>
      const draftSideMatch = /--profile\s+draft-side\s+(\S+)\s+(\S+)\s+(north|south)\s+(\d+)/i.exec(
        content
      );
      if (!draftSideMatch) {
        whisperSenderError(
          msg,
          t('errors.profileDraftSideUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const [, draftId, rawStateName, animSet, sideStr] = draftSideMatch;
      const stateName = rawStateName.toLowerCase();
      const sideNumber = parseInt(sideStr, 10);
      if (!ALLOWED_STATES.includes(stateName)) {
        whisperSenderError(
          msg,
          t('errors.invalidState', language, {
            value: escapeHtml(stateName),
            states: ALLOWED_STATES.join(', '),
          }),
          t('titles.invalidState', language)
        );
        return;
      }
      if (!Number.isInteger(sideNumber) || sideNumber < 1) {
        whisperSenderError(
          msg,
          t('errors.invalidSideNumber', language),
          t('titles.invalidValue', language)
        );
        return;
      }
      const draft = getDraft(draftId);
      if (!draft) {
        whisperSenderError(
          msg,
          t('errors.profileDraftNotFound', language, { id: escapeHtml(draftId) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      // Only the submitter or a GM may add sides to a draft.
      if (!isGM && draft.submittedBy !== msg.playerid) {
        whisperSenderError(
          msg,
          t('errors.profileNotOwned', language, { id: escapeHtml(draftId) }),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (!draft.states) draft.states = {};
      if (!draft.states[stateName]) draft.states[stateName] = {};
      draft.states[stateName][animSet] = sideNumber;
      saveDraft(draftId, draft);
      whisperSenderSuccess(
        msg,
        t('confirm.profileSideSet', language, {
          id: escapeHtml(draftId),
          state: escapeHtml(stateName),
          animSet,
          number: sideNumber,
        }),
        t('titles.profileUpdated', language)
      );
      break;
    }

    case 'review': {
      if (!isGM) {
        whisperSenderError(
          msg,
          t('errors.profileReviewGmOnly', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      const drafts = listDrafts();
      if (drafts.length === 0) {
        whisperSender(msg, t('errors.noDrafts', language), t('titles.pendingDrafts', language));
        return;
      }
      const draftItems = drafts
        .map((d) => {
          const submitter = getObj('player', d.submittedBy);
          const submitterName = submitter ? submitter.get('_displayname') : d.submittedBy;
          return (
            `&bull; <strong>${escapeHtml(d.profileId)}</strong> — ${escapeHtml(d.displayName)}` +
            ` <em>(${t('profiles.submittedBy', language)}: ${escapeHtml(submitterName)})</em>`
          );
        })
        .join('<br>');
      whisperSender(msg, draftItems, t('titles.pendingDrafts', language), 'left');
      break;
    }

    case 'approve': {
      if (!isGM) {
        whisperSenderError(
          msg,
          t('errors.profileApproveGmOnly', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileDraftUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      // Fix 3: block if an active profile already uses this ID.
      if (getProfile(id)) {
        whisperSenderError(
          msg,
          t('errors.profileApproveConflict', language, { id: escapeHtml(id) }),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const approved = approveDraft(id);
      if (!approved) {
        whisperSenderError(
          msg,
          t('errors.profileDraftNotFound', language, { id: escapeHtml(id) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      whisperSenderSuccess(
        msg,
        t('confirm.profileDraftApproved', language, { id: escapeHtml(id) }),
        t('titles.draftApproved', language)
      );
      break;
    }

    case 'reject': {
      if (!isGM) {
        whisperSenderError(
          msg,
          t('errors.profileRejectGmOnly', language),
          t('titles.accessDenied', language)
        );
        return;
      }
      if (!id) {
        whisperSenderError(
          msg,
          t('errors.profileDraftUsage', language),
          t('titles.invalidUsage', language)
        );
        return;
      }
      const draft = getDraft(id);
      if (!draft) {
        whisperSenderError(
          msg,
          t('errors.profileDraftNotFound', language, { id: escapeHtml(id) }),
          t('titles.unknownProfile', language)
        );
        return;
      }
      deleteDraft(id);
      whisperSenderSuccess(
        msg,
        t('confirm.profileDraftRejected', language, { id: escapeHtml(id) }),
        t('titles.draftRejected', language)
      );
      break;
    }

    default:
      whisperSenderError(
        msg,
        t('errors.profileUnknownSub', language, { sub: escapeHtml(sub) }),
        t('titles.invalidUsage', language)
      );
  }
}

// ─── MACRO INSTALL ───────────────────────────────────────────────────────────

/**
 * Creates a shared ADAM-Menu macro visible to all players.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
function handleInstallMacro(msg) {
  const { language } = getSettings();
  const macroName = 'ADAM-Menu';
  const existing = findObjs({ type: 'macro', name: macroName });
  if (existing.length > 0) {
    whisperSenderError(
      msg,
      t('errors.macroExists', language, { name: macroName }),
      t('titles.macroExists', language)
    );
    return;
  }
  createObj('macro', {
    name: macroName,
    action: '!adam --menu',
    playerid: msg.playerid,
    isvisibleto: 'all',
  });
  whisperGMSuccess(
    t('confirm.macroInstalled', language, { name: macroName }),
    t('titles.macroInstalled', language)
  );
}

// ─── ADAM ROUTER ─────────────────────────────────────────────────────────────

/**
 * Main command handler for !adam.
 * Routes to the appropriate subcommand handler based on flags.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
export function handleAdam(msg) {
  if (msg.type !== 'api' || !CMD_ADAM.test(msg.content)) return;

  const content = msg.content;
  const isGM = playerIsGM(msg.playerid);
  const { language } = getSettings();

  if (FLAG_HELP.test(content)) {
    showHelp(msg);
    return;
  }
  if (FLAG_VERSION.test(content)) {
    if (Math.random() < VERSION_EASTER_EGG_CHANCE && getSettings().humour) {
      whisperSender(msg, t('easter.versionEgg', 'en-US', { version: ADAM_VERSION }));
    } else {
      showVersion(msg);
    }
    return;
  }
  if (FLAG_CREDITS.test(content)) {
    showCredits(msg);
    return;
  }
  if (FLAG_INSTALL_MACRO.test(content)) {
    if (!isGM) {
      whisperSenderError(
        msg,
        t('errors.accessDeniedMacro', language),
        t('titles.accessDenied', language)
      );
      return;
    }
    handleInstallMacro(msg);
    return;
  }
  if (
    FLAG_SHOW_SETTINGS.test(content) ||
    (FLAG_CONFIG.test(content) && !CHANGE_FLAGS_PATTERN.test(content))
  ) {
    showSettingsCard(msg);
    return;
  }
  if (FLAG_RESET_SETTINGS.test(content)) {
    if (!isGM) {
      whisperSenderError(
        msg,
        t('errors.accessDeniedReset', language),
        t('titles.accessDenied', language)
      );
      return;
    }
    resetSettings();
    const resetLang = getSettings().language;
    whisperSenderSuccess(
      msg,
      t('confirm.settingsReset', resetLang),
      t('titles.settingsReset', resetLang)
    );
    showSettingsCard(msg);
    return;
  }
  if (FLAG_MOVE.test(content)) {
    handleMove(msg, content);
    return;
  }
  if (FLAG_FACE.test(content)) {
    handleFace(msg, content);
    return;
  }
  if (FLAG_STATE.test(content)) {
    handleState(msg, content);
    return;
  }
  if (FLAG_ACTION.test(content)) {
    handleAction(msg, content);
    return;
  }
  if (FLAG_MENU.test(content)) {
    handleMenu(msg);
    return;
  }
  if (FLAG_CONFIG.test(content)) {
    handleConfig(msg, content, isGM);
    return;
  }
  if (FLAG_PROFILE.test(content)) {
    handleProfile(msg, content, isGM);
    return;
  }

  whisperSenderError(
    msg,
    t('errors.unknownCommand', language),
    t('titles.unknownCommand', language)
  );
}

// ─── SIMON ALIAS ─────────────────────────────────────────────────────────────

/**
 * Handles !simon commands.
 * - !simon says <command> → executes the equivalent !adam command, then whispers the easter egg.
 * - !simon <anything without "says"> → whispers "Simon says what?"
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
export function handleSimon(msg) {
  if (msg.type !== 'api' || !CMD_SIMON.test(msg.content)) return;

  const content = msg.content.trim();
  const saysMatch = /^!simon\s+says\s+(.+)$/i.exec(content);

  if (!saysMatch) {
    whisperSimonNoSays(msg);
    return;
  }

  const rest = saysMatch[1].trim();

  // Synthesize an equivalent !adam content string and route through the same handlers.
  const fakeContent = `!adam --${rest}`;
  const fakeMsgObj = { ...msg, content: fakeContent };

  let handled = false;

  if (/^move\s+\S+/i.test(rest)) {
    handleMove(fakeMsgObj, fakeContent);
    handled = true;
  } else if (/^state\s+\S+/i.test(rest)) {
    handleState(fakeMsgObj, fakeContent);
    handled = true;
  } else if (/^action\s+\S+/i.test(rest)) {
    handleAction(fakeMsgObj, fakeContent);
    handled = true;
  } else if (/^face\s+\S+/i.test(rest)) {
    handleFace(fakeMsgObj, fakeContent);
    handled = true;
  } else {
    const { language } = getSettings();
    whisperSenderError(
      msg,
      t('errors.simonUnknown', language, { command: escapeHtml(rest) }),
      t('titles.unknownCommand', language)
    );
  }

  if (handled) {
    whisperSimonResponse(msg);
  }
}
