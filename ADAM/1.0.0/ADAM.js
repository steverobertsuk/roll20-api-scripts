/**
 * NOTE: GENERATED FILE - DO NOT EDIT DIRECTLY.
 * NOTE: Source files live under src/ and are bundled with `npm run build`.
 * ------------------------------------------------
 * Name: ADAM
 * Script: ADAM.js
 * Version: 1.0.0
 * Built: 2026-06-05T10:45:26.069Z
 */
const ADAMMod = (() => {
  'use strict';

  const SCRIPT_NAME = 'ADAM';
  const ADAM_VERSION = '1.0.0';
  const ADAM_LAST_UPDATED = '2026-06-05T10:45:26.069Z';

  const COLOR_BG_DARK = '#0A1210';
  const COLOR_TEXT_LIGHT = '#C8FFF0';
  const COLOR_TEXT_DIM = '#8ABFB0';
  const COLOR_ACCENT_TEAL = '#00C896';
  const COLOR_ACCENT_DARK = '#006B4F';
  const COLOR_HEADER_LIGHT = '#CFFAEE';

  const COLOR_INFO_LIGHT = '#DBEAFE';
  const COLOR_INFO_DARK = '#1E40AF';
  const COLOR_ERROR_RED = '#D32F2F';
  const COLOR_ERROR_DARK = '#B71C1C';
  const COLOR_ERROR_LIGHT = '#FFCDD2';
  const COLOR_ERROR_BG_LIGHT = '#FFEBEE';
  const COLOR_SUCCESS_GREEN = '#2E7D32';
  const COLOR_SUCCESS_DARK = '#1B5E20';
  const COLOR_SUCCESS_LIGHT = '#E8F5E9';
  const COLOR_SUCCESS_BG_LIGHT = '#F1F5FE';

  const DIRECTIONS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  const DIRECTION_ALIASES = {
    north: 'n',
    northeast: 'ne',
    east: 'e',
    southeast: 'se',
    south: 's',
    southwest: 'sw',
    west: 'w',
    northwest: 'nw',
  };

  // Grid unit deltas — multiply by pixels-per-move to get pixel offsets.
  const DIRECTION_DELTA = {
    n: { dx: 0, dy: -1 },
    ne: { dx: 1, dy: -1 },
    e: { dx: 1, dy: 0 },
    se: { dx: 1, dy: 1 },
    s: { dx: 0, dy: 1 },
    sw: { dx: -1, dy: 1 },
    w: { dx: -1, dy: 0 },
    nw: { dx: -1, dy: -1 },
  };

  // Token rotation in degrees (0 = north / facing up on the map).
  const DIRECTION_ROTATION = {
    n: 0,
    ne: 45,
    e: 90,
    se: 135,
    s: 180,
    sw: -135,
    w: -90,
    nw: -45,
  };

  // Which animation sprite set to use when facing each direction.
  // Based on tokens supplied with north-facing and south-facing variants.
  const DIRECTION_ANIMATION_SET = {
    n: 'north',
    ne: 'north',
    e: 'south',
    se: 'south',
    s: 'south',
    sw: 'south',
    w: 'south',
    nw: 'north',
  };

  const ALLOWED_STATES = [
    'idle',
    'combat',
    'walk',
    'dash',
    'sneak',
    'rage',
    'spellcasting',
    'help',
  ];

  // Maps action command names to their resolved state values.
  const ACTION_STATE_MAP = {
    help: 'help',
    spellcast: 'spellcasting',
    spellcasting: 'spellcasting',
    'mage-hand': 'spellcasting',
    rage: 'rage',
    dash: 'dash',
    sneak: 'sneak',
    idle: 'idle',
    combat: 'combat',
    walk: 'walk',
  };

  const ALLOWED_PROFILE_CREATION_MODES = ['gm-only', 'gm-approved', 'all-users'];

  // Profile IDs must be alphanumeric, hyphens, and underscores only (max 50 chars).
  const PROFILE_ID_PATTERN = /^[\w-]{1,50}$/;

  const FACTORY_DEFAULTS = {
    gridSize: 70,
    moveDistance: 1,
    autoFace: true,
    humour: true,
    language: 'en-US',
    profileCreationMode: 'gm-only',
  };

  const MOVE_HISTORY_LENGTH = 6;

  const NO_TOKEN_SELECTED_FUNNY_THRESHOLD_1 = 20;
  const NO_TOKEN_SELECTED_FUNNY_THRESHOLD_2 = 100;
  const SNEAK_SPAM_THRESHOLD = 10;
  const HELP_SPAM_THRESHOLD = 3;
  const VERSION_EASTER_EGG_CHANCE = 0.1;

  const CMD_ADAM = /^!adam\b/i;
  const CMD_SIMON = /^!simon\b/i;

  const FLAG_HELP = /--help\b/i;
  const FLAG_VERSION = /--version\b/i;
  const FLAG_CREDITS = /--credits\b/i;
  const FLAG_MOVE = /--move\b/i;
  const FLAG_FACE = /--face\b/i;
  const FLAG_STATE = /--state\b/i;
  const FLAG_ACTION = /--action\b/i;
  const FLAG_MENU = /--menu\b/i;
  const FLAG_CONFIG = /--config\b/i;
  const FLAG_PROFILE = /--profile\b/i;
  const FLAG_INSTALL_MACRO = /--install-macro\b/i;
  const FLAG_SHOW_SETTINGS = /--show-settings\b/i;
  const FLAG_RESET_SETTINGS = /--reset-settings\b/i;

  /**
   * Normalizes a direction input string to a canonical direction key.
   * Accepts short forms ('n', 'nw') and long forms ('north', 'northwest').
   *
   * @param {string} input Raw direction input.
   * @returns {string|null} Canonical direction or null when unrecognized.
   */
  function normalizeDirection(input) {
    if (!input) return null;
    const lower = input.trim().toLowerCase();
    if (DIRECTIONS.includes(lower)) return lower;
    return DIRECTION_ALIASES[lower] ?? null;
  }

  /**
   * Calculates the pixel offset for one move step in the given direction.
   *
   * @param {string} direction Canonical direction ('n', 'ne', etc.).
   * @param {number} pixelsPerMove Total pixel distance per move.
   * @returns {{dx:number, dy:number}|null} Pixel offset or null for unknown direction.
   */
  function getMovementDelta(direction, pixelsPerMove) {
    const delta = DIRECTION_DELTA[direction];
    if (!delta) return null;
    return {
      dx: delta.dx * pixelsPerMove,
      dy: delta.dy * pixelsPerMove,
    };
  }

  /**
   * Returns the rotation angle in degrees for facing a given direction.
   * 0° is north (up), increasing clockwise.
   *
   * @param {string} direction Canonical direction.
   * @returns {number} Rotation degrees.
   */
  function getRotationForDirection(direction) {
    return DIRECTION_ROTATION[direction] ?? 0;
  }

  /**
   * Returns the animation sprite set name for a direction.
   *
   * @param {string} direction Canonical direction.
   * @returns {string} 'north' or 'south'.
   */
  function getAnimationSetForDirection(direction) {
    return DIRECTION_ANIMATION_SET[direction] ?? 'south';
  }

  /**
   * Ensures persisted ADAM state exists and backfills missing keys with defaults.
   *
   * @returns {void}
   */
  function initializeState() {
    if (!state.ADAM) {
      state.ADAM = {};
    }
    if (!state.ADAM.settings) {
      state.ADAM.settings = {};
    }
    for (const [key, value] of Object.entries(FACTORY_DEFAULTS)) {
      if (state.ADAM.settings[key] === undefined) {
        state.ADAM.settings[key] = value;
      }
    }
    if (!state.ADAM.tokenStates) {
      state.ADAM.tokenStates = {};
    }
    if (!state.ADAM.profiles) {
      state.ADAM.profiles = {};
    }
    if (!state.ADAM.tokenProfiles) {
      state.ADAM.tokenProfiles = {};
    }
    if (!state.ADAM.profileDrafts) {
      state.ADAM.profileDrafts = {};
    }
    if (!state.ADAM.playerStats) {
      state.ADAM.playerStats = {};
    }
  }

  /**
   * Returns the live settings object from Roll20 state.
   *
   * @returns {object} ADAM settings.
   */
  function getSettings() {
    return state.ADAM.settings;
  }

  /**
   * Resets all settings to factory defaults.
   * The caller is responsible for notifying the user.
   *
   * @returns {void}
   */
  function resetSettings() {
    state.ADAM.settings = { ...FACTORY_DEFAULTS };
  }

  // ─── TOKEN STATE ─────────────────────────────────────────────────────────────

  /**
   * Returns persisted per-token state, creating a default entry when absent.
   *
   * @param {string} tokenId Roll20 token ID.
   * @returns {object} Token state record.
   */
  function getTokenState(tokenId) {
    if (!state.ADAM.tokenStates[tokenId]) {
      state.ADAM.tokenStates[tokenId] = {
        currentState: 'idle',
        currentDirection: 's',
        moveHistory: [],
        sneakCount: 0,
        helpCount: 0,
      };
    }
    return state.ADAM.tokenStates[tokenId];
  }

  /**
   * Merges updates into the persisted token state record.
   *
   * @param {string} tokenId Roll20 token ID.
   * @param {object} updates Partial state to merge.
   * @returns {void}
   */
  function setTokenState(tokenId, updates) {
    const current = getTokenState(tokenId);
    state.ADAM.tokenStates[tokenId] = { ...current, ...updates };
  }

  /**
   * Appends a direction to the token's move history, capping at MOVE_HISTORY_LENGTH.
   * Also updates currentDirection.
   *
   * @param {string} tokenId Roll20 token ID.
   * @param {string} direction Canonical direction ('n', 'ne', etc.).
   * @returns {string[]} Updated move history array.
   */
  function recordTokenMove(tokenId, direction) {
    const ts = getTokenState(tokenId);
    const history = [...(ts.moveHistory || []), direction];
    if (history.length > MOVE_HISTORY_LENGTH) {
      history.shift();
    }
    setTokenState(tokenId, { moveHistory: history, currentDirection: direction });
    return history;
  }

  // ─── PROFILE CRUD ─────────────────────────────────────────────────────────────

  /**
   * Returns a profile by ID, or null when not found.
   *
   * @param {string} profileId Profile ID.
   * @returns {object|null} Profile object or null.
   */
  function getProfile(profileId) {
    return state.ADAM.profiles[profileId] ?? null;
  }

  /**
   * Returns a summary list of all configured profiles.
   *
   * @returns {Array<{id:string, displayName:string, ownerId:string|null}>} Profile summary list.
   */
  function listProfiles() {
    return Object.entries(state.ADAM.profiles).map(([id, p]) => ({
      id,
      displayName: p.displayName || id,
      ownerId: p.ownerId ?? null,
    }));
  }

  /**
   * Saves (creates or replaces) a profile.
   * The caller is responsible for permission checks.
   *
   * @param {string} profileId Profile ID.
   * @param {object} profile Profile data.
   * @returns {void}
   */
  function saveProfile(profileId, profile) {
    state.ADAM.profiles[profileId] = profile;
  }

  /**
   * Deletes a profile and removes all token assignments that reference it.
   * The caller is responsible for permission checks.
   *
   * @param {string} profileId Profile ID.
   * @returns {void}
   */
  function deleteProfile(profileId) {
    delete state.ADAM.profiles[profileId];
    for (const tokenId of Object.keys(state.ADAM.tokenProfiles)) {
      if (state.ADAM.tokenProfiles[tokenId] === profileId) {
        delete state.ADAM.tokenProfiles[tokenId];
      }
    }
  }

  /**
   * Returns true when the profile exists and the player is allowed to modify it.
   *
   * A GM may always modify any profile.
   * A non-GM may only modify profiles that carry their player ID as ownerId.
   *
   * @param {string} profileId Profile ID.
   * @param {string} playerId Roll20 player ID.
   * @param {boolean} isGM Whether the player is a GM.
   * @returns {boolean} True when modification is permitted.
   */
  function canModifyProfile(profileId, playerId, isGM) {
    if (isGM) return true;
    const profile = getProfile(profileId);
    if (!profile) return false;
    return profile.ownerId === playerId;
  }

  /**
   * Returns true when the profile exists and has no ownerId (is a global/GM profile).
   *
   * @param {string} profileId Profile ID.
   * @returns {boolean} True for global profiles.
   */
  function isGlobalProfile(profileId) {
    const profile = getProfile(profileId);
    return profile != null && !profile.ownerId;
  }

  // ─── TOKEN ↔ PROFILE ASSIGNMENT ──────────────────────────────────────────────

  /**
   * Returns the profile assigned to a token, or null if none.
   *
   * @param {string} tokenId Roll20 token ID.
   * @returns {object|null} Profile object or null.
   */
  function getTokenProfile(tokenId) {
    const profileId = state.ADAM.tokenProfiles[tokenId];
    if (!profileId) return null;
    return state.ADAM.profiles[profileId] ?? null;
  }

  /**
   * Returns the profile ID assigned to a token, or null.
   *
   * @param {string} tokenId Roll20 token ID.
   * @returns {string|null} Profile ID or null.
   */
  function getTokenProfileId(tokenId) {
    return state.ADAM.tokenProfiles[tokenId] ?? null;
  }

  /**
   * Assigns a profile to a token. Returns false when the profileId does not exist.
   *
   * @param {string} tokenId Roll20 token ID.
   * @param {string} profileId Profile ID to assign.
   * @returns {boolean} True when assignment succeeded.
   */
  function assignTokenProfile(tokenId, profileId) {
    if (!state.ADAM.profiles[profileId]) return false;
    state.ADAM.tokenProfiles[tokenId] = profileId;
    return true;
  }

  /**
   * Removes the profile assignment from a token.
   *
   * @param {string} tokenId Roll20 token ID.
   * @returns {void}
   */
  function removeTokenProfile(tokenId) {
    delete state.ADAM.tokenProfiles[tokenId];
  }

  /**
   * Parses a Roll20 controlledby string and returns true when it grants access
   * to the given player ID.
   *
   * @param {string} controlledBy Raw controlledby value from a token or character.
   * @param {string} playerId Roll20 player ID to check.
   * @returns {boolean} True when access is granted.
   */
  function isControlledBy(controlledBy, playerId) {
    const value = (controlledBy ?? '').trim();
    if (value === 'all') return true;
    return value
      .split(',')
      .map((s) => s.trim())
      .includes(playerId);
  }

  /**
   * Returns true when a player controls a given token.
   *
   * Checks in order:
   * 1. The token's own controlledby field.
   * 2. The controlledby field of the character the token represents (if any).
   *
   * This covers the common case where control is granted on the character sheet
   * rather than on the token directly.
   *
   * @param {object} token Roll20 graphic token object.
   * @param {string} playerId Roll20 player ID.
   * @returns {boolean} True when the player controls the token.
   */
  function playerControlsToken(token, playerId) {
    if (isControlledBy(token.get('controlledby'), playerId)) return true;

    const characterId = token.get('represents');
    if (!characterId) return false;

    const character = getObj('character', characterId);
    if (!character) return false;

    return isControlledBy(character.get('controlledby'), playerId);
  }

  // ─── DRAFT MANAGEMENT ────────────────────────────────────────────────────────

  /**
   * Returns a pending profile draft by profile ID, or null when not found.
   *
   * @param {string} profileId Profile ID used as the draft key.
   * @returns {object|null} Draft object or null.
   */
  function getDraft(profileId) {
    return state.ADAM.profileDrafts[profileId] ?? null;
  }

  /**
   * Persists a profile draft. Overwrites any existing draft for the same profileId.
   *
   * @param {string} profileId Profile ID used as the draft key.
   * @param {object} draft Draft data.
   * @returns {void}
   */
  function saveDraft(profileId, draft) {
    state.ADAM.profileDrafts[profileId] = draft;
  }

  /**
   * Deletes a pending draft.
   *
   * @param {string} profileId Profile ID used as the draft key.
   * @returns {void}
   */
  function deleteDraft(profileId) {
    delete state.ADAM.profileDrafts[profileId];
  }

  /**
   * Returns a summary list of all pending drafts.
   *
   * @returns {Array<{profileId:string, displayName:string, submittedBy:string, submittedAt:string}>}
   */
  function listDrafts() {
    return Object.entries(state.ADAM.profileDrafts).map(([profileId, d]) => ({
      profileId,
      displayName: d.displayName || profileId,
      submittedBy: d.submittedBy ?? '?',
      submittedAt: d.submittedAt ?? '',
    }));
  }

  /**
   * Promotes a draft into the active profiles store and removes the draft entry.
   * Returns the promoted draft object, or null when the draft does not exist.
   *
   * @param {string} profileId Profile ID used as the draft key.
   * @returns {object|null} The approved profile data, or null.
   */
  function approveDraft(profileId) {
    const draft = getDraft(profileId);
    if (!draft) return null;
    const { submittedBy, submittedAt, ...profileData } = draft;
    // Preserve the submitter as ownerId so the player can assign their approved
    // profile without GM intervention in gm-approved mode.
    const approvedProfile = { ...profileData, ownerId: submittedBy };
    saveProfile(profileId, approvedProfile);
    deleteDraft(profileId);
    return approvedProfile;
  }

  // ─── PLAYER STATS ─────────────────────────────────────────────────────────────

  /**
   * Returns persisted per-player stats, creating defaults when absent.
   *
   * @param {string} playerId Roll20 player ID.
   * @returns {object} Player stats record.
   */
  function getPlayerStats(playerId) {
    if (!state.ADAM.playerStats[playerId]) {
      state.ADAM.playerStats[playerId] = { noTokenCount: 0 };
    }
    return state.ADAM.playerStats[playerId];
  }

  /**
   * Increments and returns the no-token-selected counter for a player.
   *
   * @param {string} playerId Roll20 player ID.
   * @returns {number} Updated count.
   */
  function incrementNoTokenCount(playerId) {
    const stats = getPlayerStats(playerId);
    stats.noTokenCount += 1;
    state.ADAM.playerStats[playerId] = stats;
    return stats.noTokenCount;
  }

  /**
   * Applies a rollable token side based on the configured animation profile,
   * current state and animation set (north/south).
   * Does nothing when the token has no profile or the state is not mapped.
   *
   * @param {string} tokenId Roll20 token ID.
   * @param {object} token Roll20 graphic token object.
   * @param {string} stateName Current token state (e.g. 'idle', 'walk').
   * @param {string} animSet Animation direction set ('north' or 'south').
   * @returns {void}
   */
  function applyAnimationSide(tokenId, token, stateName, animSet) {
    const profile = getTokenProfile(tokenId);
    if (!profile?.states) return;

    const stateMapping = profile.states[stateName];
    if (!stateMapping) return;

    // Profile stores 1-based side numbers; Roll20 currentSide is 0-based.
    const sideNumber = stateMapping[animSet] ?? stateMapping['south'];
    if (!Number.isInteger(sideNumber) || sideNumber < 1) return;

    token.set({ currentSide: sideNumber - 1 });
  }

  /**
   * Moves a token one step in the given direction.
   * Also updates token rotation (when autoFace is enabled) and animation side.
   *
   * @param {object} token Roll20 graphic token object.
   * @param {string} direction Canonical direction ('n', 'ne', etc.).
   * @returns {{moved:boolean, moveHistory:string[]}} Result object.
   */
  function moveToken(token, direction) {
    const settings = getSettings();
    const pixelsPerMove = settings.gridSize * settings.moveDistance;
    const delta = getMovementDelta(direction, pixelsPerMove);
    if (!delta) return { moved: false, moveHistory: [] };

    token.set({
      left: token.get('left') + delta.dx,
      top: token.get('top') + delta.dy,
    });

    if (settings.autoFace) {
      token.set({ rotation: getRotationForDirection(direction) });
    }

    const tokenId = token.get('_id');
    const moveHistory = recordTokenMove(tokenId, direction);

    const tokenState = getTokenState(tokenId);
    const animSet = getAnimationSetForDirection(direction);
    applyAnimationSide(tokenId, token, tokenState.currentState, animSet);

    return { moved: true, moveHistory };
  }

  /**
   * Sets a token's facing direction by updating its rotation.
   * Also updates the persisted direction and animation side when configured.
   *
   * @param {object} token Roll20 graphic token object.
   * @param {string} direction Canonical direction ('n', 'ne', etc.).
   * @returns {void}
   */
  function faceToken(token, direction) {
    token.set({ rotation: getRotationForDirection(direction) });

    const tokenId = token.get('_id');
    const tokenState = getTokenState(tokenId);
    setTokenState(tokenId, { currentDirection: direction });

    const animSet = getAnimationSetForDirection(direction);
    applyAnimationSide(tokenId, token, tokenState.currentState, animSet);
  }

  /**
   * Updates a token's state and triggers animation side switching if a profile is set.
   * Tracks consecutive sneak/help counts and rage-while-raging for easter eggs.
   *
   * @param {string} tokenId Roll20 token ID.
   * @param {object} token Roll20 graphic token object.
   * @param {string} newState New state name ('idle', 'combat', etc.).
   * @returns {{previousState:string, sneakCount:number, helpCount:number, wasAlreadyRaging:boolean}} Result.
   */
  function updateTokenState(tokenId, token, newState) {
    const current = getTokenState(tokenId);
    const wasAlreadyRaging = current.currentState === 'rage' && newState === 'rage';

    const sneakCount = newState === 'sneak' ? (current.sneakCount || 0) + 1 : 0;
    const helpCount = newState === 'help' ? (current.helpCount || 0) + 1 : 0;

    setTokenState(tokenId, {
      currentState: newState,
      sneakCount,
      helpCount,
    });

    const animSet = getAnimationSetForDirection(current.currentDirection || 's');
    applyAnimationSide(tokenId, token, newState, animSet);

    return {
      previousState: current.currentState,
      sneakCount,
      helpCount,
      wasAlreadyRaging,
    };
  }

  /**
   * Escapes HTML-sensitive characters for safe chat rendering.
   *
   * @param {string} value Text to escape.
   * @returns {string} Escaped text.
   */
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  /**
   * Builds a safe display name for a token in chat output.
   *
   * @param {object} token Roll20 graphic token object.
   * @param {string} fallback Fallback label when token has no name.
   * @returns {string} Escaped token display name.
   */
  function getSafeTokenName(token, fallback) {
    const name = token.get('name');
    return escapeHtml(name?.trim() ? name : fallback);
  }

  /**
   * Assembles the outer card wrapper, optional header, and body content into a
   * single HTML string used by all styled message generators.
   *
   * @param {string} bodyHtml Pre-rendered body HTML.
   * @param {"left"|"center"|"right"} align Content alignment.
   * @param {string} headerHtml Pre-rendered header HTML, or an empty string.
   * @param {string} mainStyle Inline CSS string for the outer wrapper element.
   * @returns {string} Complete card HTML string.
   */
  function buildCardHtml(bodyHtml, align, headerHtml, mainStyle) {
    const padding = align === 'center' ? '3px 0px' : '3px 8px';
    const contentHtml = `<div style="padding:${padding}"><strong>${bodyHtml}</strong></div>`;
    return `<div style='${mainStyle}'>${headerHtml}${contentHtml}</div>`;
  }

  /**
   * Builds the standard styled chat message container.
   *
   * @param {string} msg Message body as HTML.
   * @param {"left"|"center"|"right"} [align="center"] Content alignment.
   * @param {string} [header=""] Optional header label.
   * @returns {string} HTML for a styled chat card.
   */
  function generateStyledMessage(msg, align = 'center', header = '') {
    const isScriptReady = header === 'Script Ready';
    const headerBg = isScriptReady ? COLOR_HEADER_LIGHT : COLOR_INFO_LIGHT;
    const headerText = isScriptReady ? COLOR_BG_DARK : COLOR_INFO_DARK;
    const headerLabel = isScriptReady ? `🤖 ${header} 🤖` : `ℹ️ ${header}`;

    const mainStyle = [
      'width:100%',
      'border-radius:4px',
      `box-shadow:1px 1px 1px ${COLOR_TEXT_DIM}`,
      `text-align:${align}`,
      'vertical-align:middle',
      'margin:0px auto',
      `border:1px solid ${COLOR_BG_DARK}`,
      `color:${COLOR_TEXT_LIGHT}`,
      `background-image:-webkit-linear-gradient(-45deg,${COLOR_ACCENT_DARK} 0%,${COLOR_ACCENT_TEAL} 100%)`,
      'overflow:hidden',
    ].join(';');

    const headerHtml = header
      ? `<div style="background:${headerBg}; color:${headerText}; padding:2px 5px; border-bottom:1px solid ${COLOR_BG_DARK}; font-variant:small-caps; font-weight:bold; text-align:center">${headerLabel}</div>`
      : '';

    return buildCardHtml(msg, align, headerHtml, mainStyle);
  }

  /**
   * Builds a red error variant of the styled chat container.
   *
   * @param {string} msg Error body as HTML.
   * @param {string} [header="Error"] Optional header label.
   * @param {"left"|"center"|"right"} [align="left"] Content alignment.
   * @returns {string} HTML for an error-styled chat card.
   */
  function generateStyledErrorMessage(msg, header = 'Error', align = 'left') {
    const mainStyle = [
      'width:100%',
      'border-radius:4px',
      `box-shadow:1px 1px 1px ${COLOR_ERROR_RED}`,
      `text-align:${align}`,
      'vertical-align:middle',
      'margin:0px auto',
      `border:1px solid ${COLOR_ERROR_DARK}`,
      `color:${COLOR_ERROR_LIGHT}`,
      `background-color:${COLOR_ERROR_DARK}`,
      `background-image:-webkit-linear-gradient(-45deg,${COLOR_ERROR_DARK} 0%,${COLOR_ERROR_RED} 100%)`,
      'overflow:hidden',
    ].join(';');

    const headerHtml = `<div style="background:${COLOR_ERROR_BG_LIGHT}; color:${COLOR_ERROR_DARK}; padding:2px 5px; border-bottom:1px solid ${COLOR_ERROR_DARK}; font-variant:small-caps; font-weight:bold; text-align:center">⚠️ ${header}</div>`;
    return buildCardHtml(msg, align, headerHtml, mainStyle);
  }

  /**
   * Builds a green success variant of the styled chat container.
   *
   * @param {string} msg Success body as HTML.
   * @param {string} [header="Success"] Optional header label.
   * @returns {string} HTML for a success-styled chat card.
   */
  function generateStyledSuccessMessage(msg, header = 'Success') {
    const mainStyle = [
      'width:100%',
      'border-radius:4px',
      `box-shadow:1px 1px 1px ${COLOR_SUCCESS_GREEN}`,
      'text-align:center',
      'vertical-align:middle',
      'margin:0px auto',
      `border:1px solid ${COLOR_SUCCESS_DARK}`,
      `color:${COLOR_SUCCESS_LIGHT}`,
      `background-image:-webkit-linear-gradient(-45deg,${COLOR_SUCCESS_DARK} 0%,${COLOR_SUCCESS_GREEN} 100%)`,
      'overflow:hidden',
    ].join(';');

    const headerHtml = `<div style="background:${COLOR_SUCCESS_BG_LIGHT}; color:${COLOR_SUCCESS_DARK}; padding:2px 5px; border-bottom:1px solid ${COLOR_SUCCESS_DARK}; font-variant:small-caps; font-weight:bold; text-align:center">✅ ${header}</div>`;
    return buildCardHtml(msg, 'center', headerHtml, mainStyle);
  }

  /**
   * Returns the Roll20 whisper target string for a player.
   * Replaces double-quotes in the display name with single-quotes so the
   * /w "<name>" command is never broken by a name that contains ".
   *
   * @param {object} msgObj Roll20 chat message object.
   * @returns {string} Safe whisper target string.
   */
  function getWhisperTarget(msgObj) {
    const player = getObj('player', msgObj.playerid);
    const name = player ? player.get('_displayname') : msgObj.who;
    return String(name ?? '').replaceAll('"', "'");
  }

  /**
   * Whispers a styled message card to the GM.
   *
   * @param {string} msg Message body as HTML.
   * @param {string} [header=""] Optional header label.
   * @param {"left"|"center"|"right"} [align="center"] Content alignment.
   * @returns {void}
   */
  function whisperGM(msg, header = '', align = 'center') {
    sendChat(SCRIPT_NAME, `/w GM ${generateStyledMessage(msg, align, header)}`);
  }

  /**
   * Whispers a styled message card to the user that sent the command.
   *
   * @param {object} msgObj Roll20 chat message object.
   * @param {string} text Message body as HTML.
   * @param {string} [header=""] Optional header label.
   * @param {"left"|"center"|"right"} [align="center"] Content alignment.
   * @returns {void}
   */
  function whisperSender(msgObj, text, header = '', align = 'center') {
    sendChat(
      SCRIPT_NAME,
      `/w "${getWhisperTarget(msgObj)}" ${generateStyledMessage(text, align, header)}`
    );
  }

  /**
   * Whispers an error-styled message card to the user that sent the command.
   *
   * @param {object} msgObj Roll20 chat message object.
   * @param {string} text Error body as HTML.
   * @param {string} [header="Error"] Optional header label.
   * @param {"left"|"center"|"right"} [align="left"] Content alignment.
   * @returns {void}
   */
  function whisperSenderError(msgObj, text, header = 'Error', align = 'left') {
    sendChat(
      SCRIPT_NAME,
      `/w "${getWhisperTarget(msgObj)}" ${generateStyledErrorMessage(text, header, align)}`
    );
  }

  /**
   * Whispers a success-styled message card to the user that sent the command.
   *
   * @param {object} msgObj Roll20 chat message object.
   * @param {string} text Success body as HTML.
   * @param {string} [header="Success"] Optional header label.
   * @returns {void}
   */
  function whisperSenderSuccess(msgObj, text, header = 'Success') {
    sendChat(
      SCRIPT_NAME,
      `/w "${getWhisperTarget(msgObj)}" ${generateStyledSuccessMessage(text, header)}`
    );
  }

  /**
   * Whispers a success-styled message card to the GM.
   *
   * @param {string} text Success body as HTML.
   * @param {string} [header="Success"] Optional header label.
   * @returns {void}
   */
  function whisperGMSuccess(text, header = 'Success') {
    sendChat(SCRIPT_NAME, `/w GM ${generateStyledSuccessMessage(text, header)}`);
  }

  const TRANSLATION$n = {
    titles: {
      error: 'Fout',
      noTokenSelected: 'Geen teken gekies nie',
      tokenError: 'Tokenfout',
      missingDirection: 'Ontbrekende rigting',
      invalidDirection: 'Ongeldige rigting',
      missingState: 'Vermiste staat',
      invalidState: 'Ongeldige staat',
      missingAction: 'Ontbrekende aksie',
      invalidAction: 'Ongeldige handeling',
      accessDenied: 'Toegang geweier',
      invalidValue: 'Ongeldige waarde',
      unknownCommand: 'Onbekende bevel',
      moveError: 'Skuiffout',
      macroExists: 'Makro bestaan',
      macroInstalled: 'Makro geïnstalleer',
      invalidUsage: 'Ongeldige gebruik',
      profileAssigned: 'Profiel toegewys',
      profileRemoved: 'Profiel verwyder',
      unknownProfile: 'Onbekende profiel',
      configuration: 'Konfigurasie',
      settingsReset: 'Stel instellings terug',
      scriptReady: 'Skrip gereed',
      versionInfo: 'Weergawe inligting',
      creditsTitle: 'Krediete',
      adamsMenu: 'A.D.A.M. Beheer dek',
      adamsHelp: 'A.D.A.M. Help',
      adamsSettings: 'A.D.A.M. Instellings',
      profiles: 'Gekonfigureerde profiele',
      tokenProfile: 'Tekenprofiel',
      success: 'Sukses',
      langSet: 'Taal Stel',
      langInvalid: 'Ongeldige taal',
      profileCreated: 'Profiel geskep',
      profileUpdated: 'Profiel opgedateer',
      profileDeleted: 'Profiel uitgevee',
      profileRenamed: 'Profiel hernoem',
      draftSubmitted: 'Konsep ingedien',
      draftApproved: 'Konsep goedgekeur',
      draftRejected: 'Konsep afgekeur',
      pendingDrafts: 'Hangende profielkonsepte',
      profileCreationMode: 'Profielskeppingsmodus',
      draftNotification: 'Profielkonsep hangende',
    },
    errors: {
      noTokenSelected:
        "Geen teken gekies nie. Kies asseblief eers 'n teken en klik dan 'n rigtingknoppie.",
      noTokenSelectedStill: 'Nog geen teken gekies nie.',
      noTokenSelectedPersistent: "Ek bewonder jou volharding. Kies eers 'n teken.",
      tokenNotFound: 'Geselekteerde token kon nie gevind word nie.',
      missingDirection:
        "Gee asseblief 'n rigting. Voorbeeld: <code>!adam --move n</code><br><em>Aanwysings: n, ne, e, se, s, sw, w, nw</em>",
      invalidDirection:
        'Onbekende rigting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volle name soos noord, noordoos)',
      missingState: "Verskaf asseblief 'n staat.<br>Geldig: {states}",
      invalidState: 'Onbekende toestand: <strong>{value}</strong><br><br>Geldig: {states}',
      missingAction:
        "Verskaf asseblief 'n aksie. Voorbeelde: hulp, spelling, woede, dash, sluip, ledig, geveg",
      invalidAction:
        'Onbekende handeling: <strong>{value}</strong><br><br>Bekende handelinge: {actions}',
      accessDeniedConfig: 'Konfigurasieveranderinge is beperk tot die GM.',
      accessDeniedProfileAssign: 'Profieltoewysing is beperk tot die GM.',
      accessDeniedProfileRemove: 'Profielverwydering is beperk tot die GM.',
      accessDeniedMacro: 'Makro-installasie is beperk tot die GM.',
      accessDeniedReset: 'Terugstelling van instellings is beperk tot die GM.',
      unknownCommand:
        "Onbekende opdrag. Probeer <code>!adam --help</code> vir 'n lys van beskikbare opdragte.",
      moveFailed: 'Beweging het misluk.',
      gridSizeInvalid: "Roostergrootte moet 'n heelgetal tussen 10 en 1000 (pixels) wees.",
      moveDistanceInvalid: "Beweegafstand moet 'n heelgetal tussen 1 en 20 (vierkante) wees.",
      autoFaceInvalid: 'Outo-sigwaarde moet aan of af wees.',
      humourInvalid: 'Humorwaarde moet wees: aan of af.',
      langInvalid: 'Ongeldige plek. Ondersteun: {locales}',
      profileUsage:
        'Gebruik: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Gebruik: <code>!adam --profile ken &lt;profileId&gt;</code> toe',
      profileUnknown:
        'Profiel <strong>{id}</strong> bestaan ​​nie. Gebruik <code>!adam --profile lys</code> om beskikbare profiele te sien.',
      profileUnknownSub:
        'Onbekende profiel-subopdrag: <strong>{sub}</strong><br><br>Geldig: lys, wys, skep, wysig-kant, hernoem, verwyder, wys toe, verwyder, konsep, konsep-kant, hersien, keur, verwerp',
      profileIdInvalid:
        'Ongeldige profiel-ID: <strong>{id}</strong>. Gebruik slegs letters, syfers, koppeltekens en onderstrepings (maksimum 50 karakters).',
      profileAlreadyExists:
        'Profiel <strong>{id}</strong> bestaan ​​reeds. Gebruik <code>!adam --profile wysig-kant</code> om dit te wysig, of vee dit eers uit.',
      profileNotFound: 'Profiel <strong>{id}</strong> nie gevind nie.',
      profileCreateUsage:
        'Gebruik: <code>!adam --profile skep &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Gebruik: <code>!adam --profile wysig-kant &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Gebruik: <code>!adam --profile hernoem &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Gebruik: <code>!adam --profile verwyder &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Gebruik: <code>!adam --profile konsep &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Gebruik: <code>!adam --profile konsep-kant &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Geen hangende konsep gevind vir <strong>{id}</strong>. Dien een in met <code>!adam --profile konsep</code>.',
      profileGmOnly: 'Profielskepping is beperk tot die GM.',
      profileEditGmOnly: 'Die wysiging van hierdie profiel is beperk tot die GM.',
      profileDeleteGmOnly: 'Die uitvee van hierdie profiel is beperk tot die GM.',
      profileGlobalReadOnly:
        "Profiel <strong>{id}</strong> is 'n globale profiel en kan slegs deur die GM gewysig word.",
      profileNotOwned:
        'Jy besit nie profiel <strong>{id}</strong> nie en kan dit nie verander nie.',
      profileModeRequiresDraft:
        "Profielskepping vereis GM-goedkeuring in hierdie speletjie. Gebruik <code>!adam --profile konsep &lt;id&gt; &lt;name&gt;</code> om 'n konsep in te dien.",
      profileAssignNoControl: 'Jy kan net persoonlike profiele toewys aan tokens wat jy beheer.',
      profileAssignNotOwned:
        "Jy kan net jou eie profiele toewys aan tokens wat jy beheer. Profiel <strong>{id}</strong> behoort aan 'n ander speler.",
      profileCreationModeInvalid:
        'Ongeldige profielskeppingmodus. Geldig: slegs gm, gm-goedgekeurde, alle gebruikers.',
      profileReviewGmOnly: 'Slegs die GM kan hangende konsepte hersien.',
      profileApproveGmOnly: 'Slegs die GM kan profielkonsepte goedkeur.',
      profileRejectGmOnly: 'Slegs die GM kan profielkonsepte verwerp.',
      invalidAnimSet: 'Animasiestel moet wees: noord of suid.',
      invalidSideNumber: "Sygetal moet 'n positiewe heelgetal (1 of groter) wees.",
      noDrafts: 'Geen hangende profielkonsepte nie.',
      profileDraftConflict:
        "'n Hangende konsep vir <strong>{id}</strong> bestaan ​​reeds en behoort aan 'n ander speler.",
      profileDraftNotGmApproved:
        'Konsepvoorleggings is slegs beskikbaar wanneer profielskeppingmodus <code>gm-goedgekeur</code> is.',
      profileApproveConflict:
        "'n Aktiewe profiel genaamd <strong>{id}</strong> bestaan ​​reeds. Vee dit eers uit voordat hierdie konsep goedgekeur word.",
      macroExists: "'n Makro genaamd '<strong>{name}</strong>' bestaan ​​reeds.",
      simonUnknown:
        'Simon weet nie hoe om: <em>{command}</em><br><br>Probeer: <code>!simon sê skuif n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> staar nou <strong>{direction}</strong> in die gesig.',
      stateSet: '<strong>{token}</strong> staat gestel na <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> handeling: <strong>{action}</strong> → meld: <strong>{state}</strong>.',
      profileAssigned: 'Profiel <strong>{id}</strong> is aan <strong>{token}</strong> toegewys.',
      profileRemoved: 'Profiel verwyder van <strong>{token}</strong>.',
      profileCreated: 'Profiel <strong>{id}</strong> geskep.',
      profileSideSet: 'Profiel <strong>{id}</strong>: {state}/{animSet} → kant {number}.',
      profileRenamed: 'Profiel <strong>{id}</strong> hernoem na <strong>{name}</strong>.',
      profileDeleted: 'Profiel <strong>{id}</strong> is uitgevee.',
      profileDraftSubmitted:
        'Konsep vir profiel <strong>{id}</strong> ingedien vir GM-goedkeuring.',
      profileDraftApproved:
        'Profielkonsep <strong>{id}</strong> is goedgekeur en by aktiewe profiele gevoeg.',
      profileDraftRejected: 'Profielkonsep <strong>{id}</strong> is verwerp.',
      macroInstalled:
        "Globale makro '<strong>{name}</strong>' is geskep en is sigbaar vir alle spelers.",
      configUpdated: 'Instellings opgedateer.',
      settingsReset: '<strong>Instellings is teruggestel na fabrieksverstellings.</strong>',
      langSet: 'Taal gestel op {locale}.',
    },
    settings: {
      gridSize: 'Roostergrootte',
      gridSizeDesc: '{size}px per vierkant',
      moveDistance: 'Beweeg afstand',
      moveDistanceDesc: '{squares} vierkant(e) — {pixels}px per beweging',
      autoFace: 'Outo-gesig aan die beweeg',
      humour: 'Humor (Paaseiers)',
      language: 'Taal',
      profileCreationMode: 'Profielskeppingsmodus',
      on: 'Aan',
      off: 'Af',
    },
    profiles: {
      none: 'Geen geanimeerde tekenprofiele is opgestel nie.',
      noProfile: 'Geen profiel is toegewys aan die gekose teken nie.',
      id: 'Profiel ID',
      displayName: 'Vertoon Naam',
      mappedStates: 'Gekarteerde state',
      noneValue: '(geen)',
      personal: 'persoonlik',
      owner: 'Eienaar',
      submittedBy: 'ingedien deur',
      approveHint:
        'Gebruik !adam --profile keur &lt;id&gt; goed te keur of verwerp &lt;id&gt; om te verwerp.',
    },
    menu: {
      title: 'A.D.A.M. Beheer dek',
      movement: 'Beweging',
      facing: 'Gesig',
      state: 'Staat',
      stateLabel: 'Staat',
      facingLabel: 'Gesig',
      profileLabel: 'Profiel',
      noProfile: 'Geen profiel nie',
      help: 'Help',
      config: 'Config',
      states: {
        idle: 'Ledig',
        combat: 'Geveg',
        walk: 'Loop',
        dash: 'Dash',
        sneak: 'Sluip',
        rage: 'Woede',
        spellcasting: 'Spelling',
        help: 'Help',
      },
    },
    info: {
      subtitle: 'Geanimeerde Regie En Beweging',
      versionLabel: 'Weergawe',
      updatedLabel: 'Opgedateer',
      creditsBody:
        'A.D.A.M.<br>Animated Direction And Movement<br><br>Aangedryf deur SIMON.<br>Beslis nie Simon genoem nie.',
      ready: 'MOD GEREED',
    },
    easter: {
      toTheLeft: 'Links, links...',
      notGoingAnywhere: 'A.D.A.M. het vasgestel jy gaan eintlik nêrens heen nie.',
      areWeThereYet: 'Is ons al daar?',
      sneakSpam:
        'Niemand het jou gesien nie.<br>Niemand het jou gesien nie.<br>Niemand het jou gesien nie.',
      helpSpam: "Wie is 'n goeie uil?",
      rageRage: 'Dorn sou goedkeur.',
      simonResponse: '...en moenie my Simon noem nie!',
      simonNoSays: 'Simon sê wat?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Beslis nie SIMON nie.',
    },
  };

  const TRANSLATION$m = {
    titles: {
      error: 'Error',
      noTokenSelected: "No s'ha seleccionat cap testimoni",
      tokenError: 'Error de testimoni',
      missingDirection: 'Falta direcció',
      invalidDirection: 'Direcció no vàlida',
      missingState: 'Estat desaparegut',
      invalidState: 'Estat no vàlid',
      missingAction: 'Falta acció',
      invalidAction: 'Acció no vàlida',
      accessDenied: 'Accés denegat',
      invalidValue: 'Valor no vàlid',
      unknownCommand: 'Comandament desconegut',
      moveError: 'Error de moviment',
      macroExists: 'La macro existeix',
      macroInstalled: 'Macro instal·lada',
      invalidUsage: 'Ús no vàlid',
      profileAssigned: 'Perfil assignat',
      profileRemoved: "S'ha eliminat el perfil",
      unknownProfile: 'Perfil desconegut',
      configuration: 'Configuració',
      settingsReset: 'Restableix la configuració',
      scriptReady: 'Guió llest',
      versionInfo: 'Informació de la versió',
      creditsTitle: 'Crèdits',
      adamsMenu: 'A.D.A.M. Coberta de control',
      adamsHelp: 'A.D.A.M. Ajuda',
      adamsSettings: 'A.D.A.M. Configuració',
      profiles: 'Perfils configurats',
      tokenProfile: 'Perfil de testimoni',
      success: 'Èxit',
      langSet: "Conjunt d'idiomes",
      langInvalid: 'Idioma no vàlid',
      profileCreated: 'Perfil creat',
      profileUpdated: 'Perfil actualitzat',
      profileDeleted: 'Perfil suprimit',
      profileRenamed: 'Perfil canviat de nom',
      draftSubmitted: 'Esborrany enviat',
      draftApproved: 'Esborrany aprovat',
      draftRejected: 'Esborrany rebutjat',
      pendingDrafts: 'Esborranys de perfil pendents',
      profileCreationMode: 'Mode de creació de perfils',
      draftNotification: 'Esborrany del perfil pendent',
    },
    errors: {
      noTokenSelected:
        "No s'ha seleccionat cap testimoni. Seleccioneu primer un testimoni i, a continuació, feu clic a un botó de direcció.",
      noTokenSelectedStill: "Encara no s'ha seleccionat cap testimoni.",
      noTokenSelectedPersistent: 'Admiro la teva persistència. Seleccioneu primer un testimoni.',
      tokenNotFound: "No s'ha pogut trobar el testimoni seleccionat.",
      missingDirection:
        'Si us plau, proporcioneu una direcció. Exemple: <code>!adam --move n</code><br><em>Indicacions: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direcció desconeguda: <strong>{value}</strong><br><br>Vàlid: n, ne, e, se, s, sw, w, nw (o noms complets com ara nord, nord-est)',
      missingState: 'Proporcioneu un estat.<br>Vàlid: {states}',
      invalidState: 'Estat desconegut: <strong>{value}</strong><br><br>Vàlid: {states}',
      missingAction:
        "Proporcioneu una acció. Exemples: ajuda, evocació d'encanteris, ràbia, guió, furtiva, ociosa, combat",
      invalidAction:
        'Acció desconeguda: <strong>{value}</strong><br><br>Accions conegudes: {actions}',
      accessDeniedConfig: 'Els canvis de configuració estan restringits al GM.',
      accessDeniedProfileAssign: "L'assignació del perfil està restringida al director general.",
      accessDeniedProfileRemove: "L'eliminació del perfil està restringida al GM.",
      accessDeniedMacro: 'La instal·lació de macros està restringida al GM.',
      accessDeniedReset: 'El restabliment de la configuració està restringit al GM.',
      unknownCommand:
        "Comandament desconegut. Proveu <code>!adam --help</code> per obtenir una llista d'ordres disponibles.",
      moveFailed: 'El moviment ha fallat.',
      gridSizeInvalid:
        'La mida de la quadrícula ha de ser un nombre enter entre 10 i 1000 (píxels).',
      moveDistanceInvalid:
        'La distància de moviment ha de ser un nombre enter entre 1 i 20 (quadrats).',
      autoFaceInvalid: 'El valor facial automàtic ha de ser: activat o desactivat.',
      humourInvalid: "El valor de l'humor ha de ser: activat o desactivat.",
      langInvalid: 'Localització no vàlida. Admesos: {locales}',
      profileUsage:
        'Ús: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Ús: <code>!adam --profile assignar &lt;profileId&gt;</code>',
      profileUnknown:
        'El perfil <strong>{id}</strong> no existeix. Utilitzeu <code>!adam --profile list</code> per veure els perfils disponibles.',
      profileUnknownSub:
        'Subordre de perfil desconeguda: <strong>{sub}</strong><br><br>Vàlid: llistar, mostrar, crear, editar, canviar el nom, suprimir, assignar, eliminar, esborrany, esborrany, revisar, aprovar, rebutjar',
      profileIdInvalid:
        'Identificador de perfil no vàlid: <strong>{id}</strong>. Utilitzeu només lletres, números, guions i guions baixos (màxim 50 caràcters).',
      profileAlreadyExists:
        "El perfil <strong>{id}</strong> ja existeix. Feu servir <code>!adam --profile al costat d'edició</code> per modificar-lo o suprimir-lo primer.",
      profileNotFound: "No s'ha trobat el perfil <strong>{id}</strong>.",
      profileCreateUsage:
        'Ús: <code>!adam --profile crea &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        "Ús: <code>!adam --profile al costat d'edició &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
      profileRenameUsage:
        'Ús: <code>!adam --profile canviar el nom de &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Ús: <code>!adam --profile suprimeix &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Ús: <code>!adam --profile esborrany &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Ús: <code>!adam --profile esborrany &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        "No s'ha trobat cap esborrany pendent per a <strong>{id}</strong>. Envieu-ne un amb <code>!adam --profile esborrany</code>.",
      profileGmOnly: 'La creació del perfil està restringida al GM.',
      profileEditGmOnly: "La modificació d'aquest perfil està restringida al GM.",
      profileDeleteGmOnly: "L'eliminació d'aquest perfil està restringida al GM.",
      profileGlobalReadOnly:
        'El perfil <strong>{id}</strong> és un perfil global i només el pot modificar el director general.',
      profileNotOwned:
        'No sou propietari del perfil <strong>{id}</strong> i no el podeu modificar.',
      profileModeRequiresDraft:
        "La creació del perfil requereix l'aprovació del GM en aquest joc. Utilitzeu <code>!adam --profile esborrany &lt;id&gt; &lt;name&gt;</code> per enviar un esborrany.",
      profileAssignNoControl: 'Només podeu assignar perfils personals als fitxes que controleu.',
      profileAssignNotOwned:
        'Només podeu assignar els vostres propis perfils als fitxes que controleu. El perfil <strong>{id}</strong> pertany a un altre jugador.',
      profileCreationModeInvalid:
        'El mode de creació de perfil no és vàlid. Vàlid: només gm, aprovat per gm, tots els usuaris.',
      profileReviewGmOnly: 'Només el director general pot revisar els esborranys pendents.',
      profileApproveGmOnly: 'Només el director general pot aprovar els esborranys del perfil.',
      profileRejectGmOnly: 'Només el director general pot rebutjar els esborranys de perfil.',
      invalidAnimSet: "El conjunt d'animació ha de ser: nord o sud.",
      invalidSideNumber: 'El nombre del costat ha de ser un nombre enter positiu (1 o més).',
      noDrafts: 'No hi ha cap esborrany de perfil pendent.',
      profileDraftConflict:
        'Ja existeix un esborrany pendent per a <strong>{id}</strong> i pertany a un altre jugador.',
      profileDraftNotGmApproved:
        'Els esborranys enviats només estan disponibles quan el mode de creació de perfil està <code>aprovat per gm</code>.',
      profileApproveConflict:
        "Ja existeix un perfil actiu anomenat <strong>{id}</strong>. Suprimeix-lo primer abans d'aprovar aquest esborrany.",
      macroExists: 'Ja existeix una macro anomenada "<strong>{name}</strong>".',
      simonUnknown:
        'Simon no sap com: <em>{command}</em><br><br>Provar: <code>!Simon diu mou n</code>',
    },
    confirm: {
      facing: "<strong>{token}</strong> ara s'enfronta a <strong>{direction}</strong>.",
      stateSet: "L'estat <strong>{token}</strong> s'ha definit en <strong>{state}</strong>.",
      actionSet:
        '<strong>{token}</strong> acció: <strong>{action}</strong> → estat: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> assignat a <strong>{token}</strong>.',
      profileRemoved: "S'ha eliminat el perfil de <strong>{token}</strong>.",
      profileCreated: "S'ha creat el perfil <strong>{id}</strong>.",
      profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lateral {number}.',
      profileRenamed: 'Perfil <strong>{id}</strong> canviat de nom a <strong>{name}</strong>.',
      profileDeleted: "S'ha suprimit el perfil <strong>{id}</strong>.",
      profileDraftSubmitted:
        "Esborrany del perfil <strong>{id}</strong> enviat per a l'aprovació de GM.",
      profileDraftApproved:
        'Esborrany de perfil <strong>{id}</strong> aprovat i afegit als perfils actius.',
      profileDraftRejected: "S'ha rebutjat l'esborrany del perfil <strong>{id}</strong>.",
      macroInstalled:
        'La macro global "<strong>{name}</strong>" s\'ha creat i és visible per a tots els jugadors.',
      configUpdated: "S'ha actualitzat la configuració.",
      settingsReset:
        '<strong>La configuració es restableix als valors predeterminats de fàbrica.</strong>',
      langSet: "S'ha definit l'idioma a {locale}.",
    },
    settings: {
      gridSize: 'Mida de la graella',
      gridSizeDesc: '{size}px per quadrat',
      moveDistance: 'Move Distance',
      moveDistanceDesc: '{squares} quadrat(s) — {pixels}px per moviment',
      autoFace: 'Cara automàtica en moviment',
      humour: 'Humor (ous de Pasqua)',
      language: 'Llengua',
      profileCreationMode: 'Mode de creació de perfils',
      on: 'Encès',
      off: 'Apagat',
    },
    profiles: {
      none: "No s'ha configurat cap perfil de testimoni animat.",
      noProfile: 'El testimoni seleccionat no té cap perfil assignat.',
      id: 'ID del perfil',
      displayName: 'Nom de visualització',
      mappedStates: 'Estats cartografiats',
      noneValue: '(cap)',
      personal: 'personals',
      owner: 'Propietari',
      submittedBy: 'presentat per',
      approveHint:
        'Utilitzeu !adam --profile approve &lt;id&gt; per aprovar o rebutjar &lt;id&gt; per rebutjar.',
    },
    menu: {
      title: 'A.D.A.M. Coberta de control',
      movement: 'Moviment',
      facing: 'De cara',
      state: 'Estat',
      stateLabel: 'Estat',
      facingLabel: 'De cara',
      profileLabel: 'Perfil',
      noProfile: 'Sense perfil',
      help: 'Ajuda',
      config: 'Config',
      states: {
        idle: 'Inactiu',
        combat: 'Combat',
        walk: 'Caminar',
        dash: 'Dash',
        sneak: 'Colar',
        rage: 'ràbia',
        spellcasting: 'Encanteri',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Direcció i moviment animats',
      versionLabel: 'Versió',
      updatedLabel: 'Actualitzat',
      creditsBody:
        'A.D.A.M.<br>Direcció i moviment animats<br><br>Impulsat per SIMON.<br>Definitivament, no es diu Simon.',
      ready: 'MOD LEST',
    },
    easter: {
      toTheLeft: "A l'esquerra, a l'esquerra...",
      notGoingAnywhere: 'A.D.A.M. ha determinat que en realitat no vas enlloc.',
      areWeThereYet: 'Ja hi som?',
      sneakSpam: "Ningú t'ha vist.<br>Ningú t'ha vist.<br>Ningú t'ha vist.",
      helpSpam: 'Qui és un bon mussol?',
      rageRage: 'Dorn ho aprovaria.',
      simonResponse: '...i no em digueu Simon!',
      simonNoSays: 'Simon què diu?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Definitivament no SIMON.',
    },
  };

  const TRANSLATION$l = {
    titles: {
      error: '錯誤',
      noTokenSelected: '未選擇代幣',
      tokenError: '令牌錯誤',
      missingDirection: '缺少方向',
      invalidDirection: '方向無效',
      missingState: '失蹤狀態',
      invalidState: '無效狀態',
      missingAction: '缺少行動',
      invalidAction: '無效動作',
      accessDenied: '拒絕訪問',
      invalidValue: '無效值',
      unknownCommand: '未知命令',
      moveError: '移動錯誤',
      macroExists: '宏存在',
      macroInstalled: '已安裝巨集',
      invalidUsage: '無效使用',
      profileAssigned: '已指派設定檔',
      profileRemoved: '個人資料已刪除',
      unknownProfile: '未知的個人資料',
      configuration: '配置',
      settingsReset: '設定重置',
      scriptReady: '腳本就緒',
      versionInfo: '版本資訊',
      creditsTitle: '製作人員',
      adamsMenu: '亞當控制面板',
      adamsHelp: '亞當幫助',
      adamsSettings: '亞當設置',
      profiles: '配置的設定檔',
      tokenProfile: '代幣簡介',
      success: '成功',
      langSet: '語言設定',
      langInvalid: '無效語言',
      profileCreated: '個人資料已建立',
      profileUpdated: '個人資料已更新',
      profileDeleted: '個人資料已刪除',
      profileRenamed: '個人資料已重新命名',
      draftSubmitted: '草稿已提交',
      draftApproved: '草案已獲批准',
      draftRejected: '草案被拒絕',
      pendingDrafts: '待定的個人資料草案',
      profileCreationMode: '檔案建立模式',
      draftNotification: '簡介草案待定',
    },
    errors: {
      noTokenSelected: '未選擇令牌。請先選擇一個令牌，然後點選方向按鈕。',
      noTokenSelectedStill: '仍然沒有選擇令牌。',
      noTokenSelectedPersistent: '我很佩服你的堅持。首先選擇一個令牌。',
      tokenNotFound: '找不到所選令牌。',
      missingDirection:
        '請提供方向。範例：<code>!adam --move n</code><br><em>方向：n、ne、e、se、s、sw、w、nw</em>',
      invalidDirection:
        '未知方向：<strong>{value}</strong><br><br>有效：n、ne、e、se、s、sw、w、nw（或全名，如北、東北）',
      missingState: '請提供狀態。 <br>有效：{states}',
      invalidState: '未知狀態：<strong>{value}</strong><br><br>有效：{states}',
      missingAction: '請提供行動。例：幫助、施法、狂暴、衝刺、潛行、閒置、戰鬥',
      invalidAction: '未知操作：<strong>{value}</strong><br><br>已知操作：{actions}',
      accessDeniedConfig: '配置更改僅限於 GM。',
      accessDeniedProfileAssign: '設定檔分配僅限於 GM。',
      accessDeniedProfileRemove: '設定檔刪除僅限於 GM。',
      accessDeniedMacro: '宏安裝僅限於 GM。',
      accessDeniedReset: '設定重置僅限於 GM。',
      unknownCommand: '未知命令。嘗試 <code>!adam --help</code> 取得可用指令的清單。',
      moveFailed: '運動失敗。',
      gridSizeInvalid: '網格大小必須是 10 到 1000（像素）之間的整數。',
      moveDistanceInvalid: '移動距離必須是 1 到 20（平方）之間的整數。',
      autoFaceInvalid: '自動面值必須為：開或關。',
      humourInvalid: '幽默值必須是：開或關。',
      langInvalid: '區域設定無效。支援：{locales}',
      profileUsage:
        '用法：<code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Usage: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        '設定檔 <strong>{id}</strong> 不存在。使用 <code>!adam --profile list</code> 查看可用的設定檔。',
      profileUnknownSub:
        '未知設定檔子指令：<strong>{sub}</strong><br><br>有效：列出、顯示、建立、編輯端、重新命名、刪除、指派、刪除、草稿、草稿端、稽核、核准、拒絕',
      profileIdInvalid:
        '無效的設定檔 ID：<strong>{id}</strong>。僅使用字母、數字、連字號和底線（最多 50 個字元）。',
      profileAlreadyExists:
        '設定檔 <strong>{id}</strong> 已存在。使用 <code>!adam --profile edit-side</code> 修改它，或先刪除它。',
      profileNotFound: 'Profile <strong>{id}</strong> not found.',
      profileCreateUsage:
        '用法：<code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        '用法： <code>!adam --profile 編輯端 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        '用法：<code>!adam --profile 重新命名 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: '用法：<code>!adam --profile 刪除 &lt;profileId&gt;</code>',
      profileDraftUsage:
        '用法：<code>!adam --profile 草稿 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        '用法：<code>!adam --profile 拔模側 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'No pending draft found for <strong>{id}</strong>. Submit one with <code>!adam --profile draft</code>.',
      profileGmOnly: '設定檔的建立僅限於 GM。',
      profileEditGmOnly: '修改此設定檔僅限於 GM。',
      profileDeleteGmOnly: '刪除此設定檔僅限 GM。',
      profileGlobalReadOnly: '設定檔<strong>{id}</strong>是全域設定文件，只能由GM修改。',
      profileNotOwned: '您不擁有個人資料 <strong>{id}</strong>，並且無法修改它。',
      profileModeRequiresDraft:
        '在此遊戲中，個人資料建立需要 GM 批准。使用 <code>!adam --profile Draft &lt;id&gt; &lt;name&gt;</code> 提交草稿。',
      profileAssignNoControl: '您只能將個人資料指派給您控制的令牌。',
      profileAssignNotOwned:
        '您只能將自己的設定檔指派給您控制的令牌。個人檔案<strong>{id}</strong>屬於其他玩家。',
      profileCreationModeInvalid: '設定檔建立模式無效。有效：僅限 gm、gm 批准、所有使用者。',
      profileReviewGmOnly: '只有總經理可以審查待決草案。',
      profileApproveGmOnly: '只有總經理才能批准簡介草案。',
      profileRejectGmOnly: '只有 GM 可以拒絕個人資料草稿。',
      invalidAnimSet: '動畫集必須是：北或南。',
      invalidSideNumber: '邊數必須是正整數（1 或更大）。',
      noDrafts: '沒有待處理的個人資料草稿。',
      profileDraftConflict: '<strong>{id}</strong> 的待處理選秀已存在且屬於其他球員。',
      profileDraftNotGmApproved:
        '僅當設定檔建立模式為 <code>gm-approved</code> 時，草稿提交才可用。',
      profileApproveConflict:
        '名為 <strong>{id}</strong> 的活動設定檔已存在。請先將其刪除，然後再批准此草案。',
      macroExists: '名為「<strong>{name}</strong>」的巨集已存在。',
      simonUnknown:
        'Simon 不知道如何：<em>{command}</em><br><br>嘗試：<code>!simon 說 move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> 現在面向 <strong>{direction}</strong>。',
      stateSet: '<strong>{token}</strong> 狀態設定為 <strong>{state}</strong>。',
      actionSet:
        '<strong>{token}</strong> 操作：<strong>{action}</strong> → 狀態：<strong>{state}</strong>。',
      profileAssigned: '設定檔<strong>{id}</strong>已指派給<strong>{token}</strong>。',
      profileRemoved: '個人資料已從 <strong>{token}</strong> 中刪除。',
      profileCreated: '已建立設定檔<strong>{id}</strong>。',
      profileSideSet: '輪廓<strong>{id}</strong>：{state}/{animSet} → 側面{number}。',
      profileRenamed: '設定檔<strong>{id}</strong>重新命名為<strong>{name}</strong>。',
      profileDeleted: '個人資料<strong>{id}</strong>已刪除。',
      profileDraftSubmitted: '設定檔草稿<strong>{id}</strong>已提交供總經理批准。',
      profileDraftApproved: '設定檔草稿<strong>{id}</strong>已獲得批准並新增至活動設定檔。',
      profileDraftRejected: '個人資料草稿 <strong>{id}</strong> 已被拒絕。',
      macroInstalled: '全域巨集「<strong>{name}</strong>」已創建，並且對所有玩家可見。',
      configUpdated: '設定已更新。',
      settingsReset: '<strong>設定重設為出廠預設值。 </strong>',
      langSet: '語言設定為 {locale}。',
    },
    settings: {
      gridSize: '網格尺寸',
      gridSizeDesc: '每平方 {size}px',
      moveDistance: '移動距離',
      moveDistanceDesc: '每次移動 {squares} 平方 — {pixels}px',
      autoFace: '移動時自動面對',
      humour: '幽默（復活節彩蛋）',
      language: '語言',
      profileCreationMode: '檔案建立模式',
      on: '在',
      off: '離開',
    },
    profiles: {
      none: '未配置動畫令牌設定檔。',
      noProfile: '所選令牌未分配設定檔。',
      id: '檔案編號',
      displayName: '顯示名稱',
      mappedStates: '映射狀態',
      noneValue: '（沒有任何）',
      personal: '個人的',
      owner: '擁有者',
      submittedBy: '提交者',
      approveHint: '使用 !adam --profileapprove &lt;id&gt; 來批准或拒絕 &lt;id&gt; 來拒絕。',
    },
    menu: {
      title: '亞當控制面板',
      movement: '移動',
      facing: '面向',
      state: '狀態',
      stateLabel: '狀態',
      facingLabel: '面向',
      profileLabel: '輪廓',
      noProfile: '沒有個人資料',
      help: '幫助',
      config: '配置',
      states: {
        idle: '閒置的',
        combat: '戰鬥',
        walk: '走',
        dash: '短跑',
        sneak: '潛行',
        rage: '憤怒',
        spellcasting: '施法',
        help: '幫助',
      },
    },
    info: {
      subtitle: '動畫方向和運動',
      versionLabel: '版本',
      updatedLabel: '已更新',
      creditsBody: 'A.D.A.M.<br>動畫方向和運動<br><br>由 SIMON 提供支援。 <br>絕對不叫西蒙。',
      ready: '模組就緒',
    },
    easter: {
      toTheLeft: '向左，向左…',
      notGoingAnywhere: '亞當已經確定你實際上不會去任何地方。',
      areWeThereYet: '我們到了嗎？',
      sneakSpam: '沒有人見過你。 <br>沒有人見過你。 <br>沒有人見過你。',
      helpSpam: '誰是一隻好貓頭鷹？',
      rageRage: '多恩會同意的。',
      simonResponse: '……別叫我西蒙！',
      simonNoSays: '西蒙說什麼？',
      versionEgg: '亞當v{version}<br><br>絕對不是西蒙。',
    },
  };

  const TRANSLATION$k = {
    titles: {
      error: 'Chyba',
      noTokenSelected: 'Není vybrán žádný token',
      tokenError: 'Chyba tokenu',
      missingDirection: 'Chybějící směr',
      invalidDirection: 'Neplatný směr',
      missingState: 'Chybějící stát',
      invalidState: 'Neplatný stát',
      missingAction: 'Chybějící akce',
      invalidAction: 'Neplatná akce',
      accessDenied: 'Přístup odepřen',
      invalidValue: 'Neplatná hodnota',
      unknownCommand: 'Neznámý příkaz',
      moveError: 'Chyba přesunu',
      macroExists: 'Makro existuje',
      macroInstalled: 'Makro nainstalováno',
      invalidUsage: 'Neplatné použití',
      profileAssigned: 'Profil přiřazen',
      profileRemoved: 'Profil odstraněn',
      unknownProfile: 'Neznámý profil',
      configuration: 'Konfigurace',
      settingsReset: 'Nastavení Resetovat',
      scriptReady: 'Skript připraven',
      versionInfo: 'Informace o verzi',
      creditsTitle: 'Kredity',
      adamsMenu: 'A.D.A.M. Řídicí paluba',
      adamsHelp: 'A.D.A.M. Pomoc',
      adamsSettings: 'A.D.A.M. Nastavení',
      profiles: 'Nakonfigurované profily',
      tokenProfile: 'Profil tokenu',
      success: 'Úspěch',
      langSet: 'Jazyková sada',
      langInvalid: 'Neplatný jazyk',
      profileCreated: 'Profil vytvořen',
      profileUpdated: 'Profil aktualizován',
      profileDeleted: 'Profil smazán',
      profileRenamed: 'Profil přejmenován',
      draftSubmitted: 'Návrh předložen',
      draftApproved: 'Návrh schválen',
      draftRejected: 'Koncept zamítnut',
      pendingDrafts: 'Nevyřízené koncepty profilu',
      profileCreationMode: 'Režim vytváření profilu',
      draftNotification: 'Koncept profilu čeká na vyřízení',
    },
    errors: {
      noTokenSelected:
        'Není vybrán žádný token. Nejprve prosím vyberte token a poté klikněte na směrové tlačítko.',
      noTokenSelectedStill: 'Stále není vybrán žádný token.',
      noTokenSelectedPersistent: 'Obdivuji vaši vytrvalost. Nejprve vyberte token.',
      tokenNotFound: 'Vybraný token nebyl nalezen.',
      missingDirection:
        'Uveďte prosím směr. Příklad: <code>!adam --move n</code><br><em>Směr: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Neznámý směr: <strong>{value}</strong><br><br>Platné: n, ne, e, se, s, sw, w, nw (nebo celé názvy jako sever, severovýchod)',
      missingState: 'Uveďte prosím stát.<br>Platné: {states}',
      invalidState: 'Neznámý stav: <strong>{value}</strong><br><br>Platný: {states}',
      missingAction:
        'Uveďte prosím akci. Příklady: pomoc, kouzlo, vztek, úprk, plížení, nečinnost, boj',
      invalidAction: 'Neznámá akce: <strong>{value}</strong><br><br>Známé akce: {actions}',
      accessDeniedConfig: 'Změny konfigurace jsou omezeny na GM.',
      accessDeniedProfileAssign: 'Přiřazení profilu je omezeno na GM.',
      accessDeniedProfileRemove: 'Odstranění profilu je omezeno na GM.',
      accessDeniedMacro: 'Instalace makra je omezena na GM.',
      accessDeniedReset: 'Obnovení nastavení je omezeno na GM.',
      unknownCommand:
        'Neznámý příkaz. Vyzkoušejte <code>!adam --help</code> pro seznam dostupných příkazů.',
      moveFailed: 'Pohyb se nezdařil.',
      gridSizeInvalid: 'Velikost mřížky musí být celé číslo mezi 10 a 1000 (pixely).',
      moveDistanceInvalid: 'Vzdálenost přesunu musí být celé číslo mezi 1 a 20 (čtverečky).',
      autoFaceInvalid: 'Automatická nominální hodnota musí být: zapnuto nebo vypnuto.',
      humourInvalid: 'Hodnota humoru musí být: zapnuto nebo vypnuto.',
      langInvalid: 'Neplatné národní prostředí. Podporováno: {locales}',
      profileUsage:
        'Použití: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Použití: <code>!adam --profile přiřadit &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> neexistuje. Chcete-li zobrazit dostupné profily, použijte <code>!adam --profile seznam</code>.',
      profileUnknownSub:
        'Neznámý dílčí příkaz profilu: <strong>{sub}</strong><br><br>Platný: seznam, zobrazit, vytvořit, upravit-strana, přejmenovat, odstranit, přiřadit, odstranit, koncept, strana konceptu, zkontrolovat, schválit, zamítnout',
      profileIdInvalid:
        'Neplatné ID profilu: <strong>{id}</strong>. Používejte pouze písmena, čísla, spojovníky a podtržítka (max. 50 znaků).',
      profileAlreadyExists:
        'Profil <strong>{id}</strong> již existuje. Pomocí <code>!adam --profile edit-side</code> jej upravte nebo nejprve odstraňte.',
      profileNotFound: 'Profil <strong>{id}</strong> nebyl nalezen.',
      profileCreateUsage:
        'Použití: <code>!adam --profile vytvořit &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Použití: <code>!adam --profile strana úprav &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Použití: <code>!adam --profile přejmenovat &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Použití: <code>!adam --profile smazat &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Použití: <code>!adam --profile koncept &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Použití: <code>!adam --profile strana návrhu &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Nebyl nalezen žádný nevyřízený koncept pro <strong>{id}</strong>. Odešlete jeden s <code>!adam --profile koncept</code>.',
      profileGmOnly: 'Vytvoření profilu je omezeno na GM.',
      profileEditGmOnly: 'Úprava tohoto profilu je omezena na GM.',
      profileDeleteGmOnly: 'Smazání tohoto profilu je omezeno na GM.',
      profileGlobalReadOnly:
        'Profil <strong>{id}</strong> je globální profil a může být upraven pouze GM.',
      profileNotOwned: 'Nejste vlastníkem profilu <strong>{id}</strong> a nemůžete jej upravovat.',
      profileModeRequiresDraft:
        'Vytvoření profilu vyžaduje v této hře schválení GM. K odeslání konceptu použijte <code>!adam --profile koncept &lt;id&gt; &lt;name&gt;</code>.',
      profileAssignNoControl: 'Osobní profily můžete přiřadit pouze tokenům, které ovládáte.',
      profileAssignNotOwned:
        'Své vlastní profily můžete přiřadit pouze tokenům, které ovládáte. Profil <strong>{id}</strong> patří jinému hráči.',
      profileCreationModeInvalid:
        'Neplatný režim vytváření profilu. Platné: gm-only, gm-approved, all-users.',
      profileReviewGmOnly: 'Pouze GM může přezkoumat nevyřízené koncepty.',
      profileApproveGmOnly: 'Pouze GM může schvalovat koncepty profilu.',
      profileRejectGmOnly: 'Pouze GM může odmítnout koncepty profilu.',
      invalidAnimSet: 'Sada animací musí být: sever nebo jih.',
      invalidSideNumber: 'Číslo strany musí být kladné celé číslo (1 nebo větší).',
      noDrafts: 'Žádné nevyřízené koncepty profilu.',
      profileDraftConflict:
        'Nevyřízený koncept pro <strong>{id}</strong> již existuje a patří jinému hráči.',
      profileDraftNotGmApproved:
        'Odesílání konceptů je k dispozici pouze v případě, že je režim vytváření profilu <code>schválen gm</code>.',
      profileApproveConflict:
        'Aktivní profil s názvem <strong>{id}</strong> již existuje. Před schválením tohoto konceptu jej nejprve smažte.',
      macroExists: 'Makro s názvem „<strong>{name}</strong>“ již existuje.',
      simonUnknown:
        'Simon neví, jak: <em>{command}</em><br><br>Zkuste: <code>!simon říká move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> nyní čelí <strong>{direction}</strong>.',
      stateSet: 'Stav <strong>{token}</strong> nastaven na <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> akce: <strong>{action}</strong> → stav: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> přiřazený uživateli <strong>{token}</strong>.',
      profileRemoved: 'Profil byl odebrán z <strong>{token}</strong>.',
      profileCreated: 'Profil <strong>{id}</strong> byl vytvořen.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → strana {number}.',
      profileRenamed: 'Profil <strong>{id}</strong> byl přejmenován na <strong>{name}</strong>.',
      profileDeleted: 'Profil <strong>{id}</strong> byl smazán.',
      profileDraftSubmitted: 'Koncept profilu <strong>{id}</strong> odeslán ke schválení GM.',
      profileDraftApproved:
        'Koncept profilu <strong>{id}</strong> byl schválen a přidán do aktivních profilů.',
      profileDraftRejected: 'Koncept profilu <strong>{id}</strong> byl zamítnut.',
      macroInstalled:
        "Globální makro '<strong>{name}</strong>' bylo vytvořeno a je viditelné pro všechny hráče.",
      configUpdated: 'Nastavení aktualizováno.',
      settingsReset: '<strong>Nastavení byla resetována na výchozí tovární nastavení.</strong>',
      langSet: 'Jazyk nastaven na {locale}.',
    },
    settings: {
      gridSize: 'Velikost mřížky',
      gridSizeDesc: '{size}px na čtverec',
      moveDistance: 'Vzdálenost pohybu',
      moveDistanceDesc: '{squares} čtverců – {pixels}px na tah',
      autoFace: 'Auto-Face on Move',
      humour: 'Humor (velikonoční vajíčka)',
      language: 'Jazyk',
      profileCreationMode: 'Režim vytváření profilu',
      on: 'Na',
      off: 'Vypnuto',
    },
    profiles: {
      none: 'Nejsou nakonfigurovány žádné profily animovaných tokenů.',
      noProfile: 'Vybranému tokenu není přiřazen žádný profil.',
      id: 'ID profilu',
      displayName: 'Zobrazovaný název',
      mappedStates: 'Mapované státy',
      noneValue: '(žádný)',
      personal: 'osobní',
      owner: 'Majitel',
      submittedBy: 'předkládá',
      approveHint:
        'Použijte !adam --profile schválit &lt;id&gt; ke schválení nebo odmítnout &lt;id&gt; k zamítnutí.',
    },
    menu: {
      title: 'A.D.A.M. Řídicí paluba',
      movement: 'Hnutí',
      facing: 'Tváří v tvář',
      state: 'Stát',
      stateLabel: 'Stát',
      facingLabel: 'Tváří v tvář',
      profileLabel: 'Profil',
      noProfile: 'Žádný profil',
      help: 'Pomoc',
      config: 'Konfigurace',
      states: {
        idle: 'Líný',
        combat: 'Boj',
        walk: 'Chůze',
        dash: 'Pomlčka',
        sneak: 'Žalobníček',
        rage: 'Vztek',
        spellcasting: 'Zaklínadlo',
        help: 'Pomoc',
      },
    },
    info: {
      subtitle: 'Animovaný Směr A Pohyb',
      versionLabel: 'Verze',
      updatedLabel: 'Aktualizováno',
      creditsBody:
        'A.D.A.M.<br>Animovaný směr a pohyb<br><br>Pohání SIMON.<br>Rozhodně se nejmenuje Simon.',
      ready: 'MOD PŘIPRAVEN',
    },
    easter: {
      toTheLeft: 'Doleva, doleva...',
      notGoingAnywhere: 'A.D.A.M. rozhodl, že ve skutečnosti nikam nejdete.',
      areWeThereYet: 'Už jsme tam?',
      sneakSpam: 'Nikdo tě neviděl.<br>Nikdo tě neviděl.<br>Nikdo tě neviděl.',
      helpSpam: 'Kdo je dobrá sova?',
      rageRage: 'Dorn by to schválil.',
      simonResponse: '...a neříkej mi Simono!',
      simonNoSays: 'Simon říká co?',
      versionEgg: 'A.D.A.M. v{version}<br><br>ŠIMON rozhodně ne.',
    },
  };

  const TRANSLATION$j = {
    titles: {
      error: 'Fejl',
      noTokenSelected: 'Intet token valgt',
      tokenError: 'Token fejl',
      missingDirection: 'Manglende retning',
      invalidDirection: 'Ugyldig retning',
      missingState: 'Manglende stat',
      invalidState: 'Ugyldig stat',
      missingAction: 'Manglende handling',
      invalidAction: 'Ugyldig handling',
      accessDenied: 'Adgang nægtet',
      invalidValue: 'Ugyldig værdi',
      unknownCommand: 'Ukendt kommando',
      moveError: 'Flyt fejl',
      macroExists: 'Makro findes',
      macroInstalled: 'Makro installeret',
      invalidUsage: 'Ugyldig brug',
      profileAssigned: 'Profil tildelt',
      profileRemoved: 'Profil fjernet',
      unknownProfile: 'Ukendt profil',
      configuration: 'Konfiguration',
      settingsReset: 'Indstillinger Nulstil',
      scriptReady: 'Script klar',
      versionInfo: 'Version info',
      creditsTitle: 'Credits',
      adamsMenu: 'A.D.A.M. Kontrol Deck',
      adamsHelp: 'A.D.A.M. Hjælp',
      adamsSettings: 'A.D.A.M. Indstillinger',
      profiles: 'Konfigurerede profiler',
      tokenProfile: 'Token profil',
      success: 'Succes',
      langSet: 'Sprog sæt',
      langInvalid: 'Ugyldigt sprog',
      profileCreated: 'Profil oprettet',
      profileUpdated: 'Profil opdateret',
      profileDeleted: 'Profil slettet',
      profileRenamed: 'Profil omdøbt',
      draftSubmitted: 'Udkast indsendt',
      draftApproved: 'Udkast godkendt',
      draftRejected: 'Udkast afvist',
      pendingDrafts: 'Afventende profiludkast',
      profileCreationMode: 'Tilstand til oprettelse af profil',
      draftNotification: 'Profiludkast afventer',
    },
    errors: {
      noTokenSelected:
        'Intet token er valgt. Vælg først et token, og klik derefter på en retningsknap.',
      noTokenSelectedStill: 'Stadig intet token valgt.',
      noTokenSelectedPersistent: 'Jeg beundrer din vedholdenhed. Vælg først et token.',
      tokenNotFound: 'Det valgte token blev ikke fundet.',
      missingDirection:
        'Giv venligst en retning. Eksempel: <code>!adam --move n</code><br><em>Rutevejledning: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Ukendt retning: <strong>{value}</strong><br><br>Gyldig: n, ne, e, se, s, sw, w, nw (eller fulde navne såsom nord, nordøst)',
      missingState: 'Angiv en tilstand.<br>Gyldig: {states}',
      invalidState: 'Ukendt tilstand: <strong>{value}</strong><br><br>Gyldig: {states}',
      missingAction:
        'Angiv en handling. Eksempler: hjælp, trylleformidling, raseri, bindestreg, snige, tomgang, kamp',
      invalidAction:
        'Ukendt handling: <strong>{value}</strong><br><br>Kendte handlinger: {actions}',
      accessDeniedConfig: 'Konfigurationsændringer er begrænset til GM.',
      accessDeniedProfileAssign: 'Profiltildeling er begrænset til GM.',
      accessDeniedProfileRemove: 'Profilfjernelse er begrænset til GM.',
      accessDeniedMacro: 'Makroinstallation er begrænset til GM.',
      accessDeniedReset: 'Indstillingsnulstilling er begrænset til GM.',
      unknownCommand:
        'Ukendt kommando. Prøv <code>!adam --help</code> for at få en liste over tilgængelige kommandoer.',
      moveFailed: 'Bevægelsen mislykkedes.',
      gridSizeInvalid: 'Gitterstørrelsen skal være et heltal mellem 10 og 1000 (pixels).',
      moveDistanceInvalid: 'Bevægelsesafstand skal være et heltal mellem 1 og 20 (kvadrater).',
      autoFaceInvalid: 'Automatisk ansigtsværdi skal være: til eller fra.',
      humourInvalid: 'Humorværdi skal være: til eller fra.',
      langInvalid: 'Ugyldig lokalitet. Understøttet: {locales}',
      profileUsage:
        'Brug: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Brug: <code>!adam --profile tildel &lt;profileId&gt;</code>',
      profileUnknown:
        'Profilen <strong>{id}</strong> eksisterer ikke. Brug <code>!adam --profile liste</code> for at se tilgængelige profiler.',
      profileUnknownSub:
        'Ukendt profilunderkommando: <strong>{sub}</strong><br><br>Gyldig: liste, vis, opret, rediger-side, omdøb, slet, tildel, fjern, udkast, kladde-side, gennemgå, godkend, afvis',
      profileIdInvalid:
        'Ugyldigt profil-id: <strong>{id}</strong>. Brug kun bogstaver, tal, bindestreger og understregninger (maks. 50 tegn).',
      profileAlreadyExists:
        'Profilen <strong>{id}</strong> eksisterer allerede. Brug <code>!adam --profile edit-side</code> til at ændre den, eller slet den først.',
      profileNotFound: 'Profilen <strong>{id}</strong> blev ikke fundet.',
      profileCreateUsage:
        'Brug: <code>!adam --profile opret &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Brug: <code>!adam --profile redigeringsside &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Brug: <code>!adam --profile omdøb &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Brug: <code>!adam --profile slet &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Brug: <code>!adam --profile kladde &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Brug: <code>!adam --profile trækside &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Der blev ikke fundet nogen afventende kladde for <strong>{id}</strong>. Indsend en med <code>!adam --profile kladde</code>.',
      profileGmOnly: 'Profiloprettelse er begrænset til GM.',
      profileEditGmOnly: 'Ændring af denne profil er begrænset til GM.',
      profileDeleteGmOnly: 'Sletning af denne profil er begrænset til GM.',
      profileGlobalReadOnly:
        'Profil <strong>{id}</strong> er en global profil og kan kun ændres af GM.',
      profileNotOwned: 'Du ejer ikke profilen <strong>{id}</strong> og kan ikke ændre den.',
      profileModeRequiresDraft:
        'Profiloprettelse kræver GM-godkendelse i dette spil. Brug <code>!adam --profile kladde &lt;id&gt; &lt;name&gt;</code> til at indsende en kladde.',
      profileAssignNoControl: 'Du kan kun tildele personlige profiler til tokens, du kontrollerer.',
      profileAssignNotOwned:
        'Du kan kun tildele dine egne profiler til tokens, du kontrollerer. Profilen <strong>{id}</strong> tilhører en anden spiller.',
      profileCreationModeInvalid:
        'Ugyldig tilstand for oprettelse af profil. Gyldig: kun gm, gm-godkendt, alle-brugere.',
      profileReviewGmOnly: 'Kun GM kan gennemgå afventende udkast.',
      profileApproveGmOnly: 'Kun GM kan godkende profiludkast.',
      profileRejectGmOnly: 'Kun GM kan afvise profiludkast.',
      invalidAnimSet: 'Animationssættet skal være: nord eller syd.',
      invalidSideNumber: 'Sidetal skal være et positivt heltal (1 eller højere).',
      noDrafts: 'Ingen afventende profiludkast.',
      profileDraftConflict:
        'Et afventende udkast til <strong>{id}</strong> eksisterer allerede og tilhører en anden spiller.',
      profileDraftNotGmApproved:
        'Kladdeindsendelser er kun tilgængelige, når profiloprettelsestilstand er <code>gm-godkendt</code>.',
      profileApproveConflict:
        'En aktiv profil ved navn <strong>{id}</strong> eksisterer allerede. Slet det først, før du godkender dette udkast.',
      macroExists: "En makro med navnet '<strong>{name}</strong>' findes allerede.",
      simonUnknown:
        'Simon ved ikke, hvordan man: <em>{command}</em><br><br>Prøv: <code>!simon siger move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> står nu over for <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> tilstand indstillet til <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> handling: <strong>{action}</strong> → angiv: <strong>{state}</strong>.',
      profileAssigned: 'Profilen <strong>{id}</strong> er tildelt <strong>{token}</strong>.',
      profileRemoved: 'Profil fjernet fra <strong>{token}</strong>.',
      profileCreated: 'Profilen <strong>{id}</strong> er oprettet.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → side {number}.',
      profileRenamed: 'Profil <strong>{id}</strong> omdøbt til <strong>{name}</strong>.',
      profileDeleted: 'Profilen <strong>{id}</strong> er slettet.',
      profileDraftSubmitted:
        'Udkast til profilen <strong>{id}</strong> indsendt til GM-godkendelse.',
      profileDraftApproved:
        'Profiludkast <strong>{id}</strong> godkendt og føjet til aktive profiler.',
      profileDraftRejected: 'Profiludkast <strong>{id}</strong> er blevet afvist.',
      macroInstalled:
        "Den globale makro '<strong>{name}</strong>' er blevet oprettet og er synlig for alle spillere.",
      configUpdated: 'Indstillinger opdateret.',
      settingsReset: '<strong>Indstillinger nulstillet til fabriksindstillinger.</strong>',
      langSet: 'Sproget er indstillet til {locale}.',
    },
    settings: {
      gridSize: 'Gitterstørrelse',
      gridSizeDesc: '{size}px pr. kvadrat',
      moveDistance: 'Flyt afstand',
      moveDistanceDesc: '{squares} kvadrat(er) — {pixels}px pr. træk',
      autoFace: 'Auto-ansigt i bevægelse',
      humour: 'Humor (påskeæg)',
      language: 'Sprog',
      profileCreationMode: 'Tilstand til oprettelse af profil',
      on: 'På',
      off: 'Slukket',
    },
    profiles: {
      none: 'Ingen animerede token-profiler er konfigureret.',
      noProfile: 'Det valgte token har ingen profil tildelt.',
      id: 'Profil-id',
      displayName: 'Vist navn',
      mappedStates: 'Kortlagte stater',
      noneValue: '(ingen)',
      personal: 'personlig',
      owner: 'Ejer',
      submittedBy: 'indsendt af',
      approveHint:
        'Brug !adam --profile godkend &lt;id&gt; for at godkende eller afvise &lt;id&gt; for at afvise.',
    },
    menu: {
      title: 'A.D.A.M. Kontrol Deck',
      movement: 'Bevægelse',
      facing: 'Over',
      state: 'Tilstand',
      stateLabel: 'Tilstand',
      facingLabel: 'Over',
      profileLabel: 'Profil',
      noProfile: 'Ingen profil',
      help: 'Hjælp',
      config: 'Konfig',
      states: {
        idle: 'Ledig',
        combat: 'Bekæmpe',
        walk: 'Gå',
        dash: 'Dash',
        sneak: 'Snige sig',
        rage: 'Raseri',
        spellcasting: 'Spellcast',
        help: 'Hjælp',
      },
    },
    info: {
      subtitle: 'Animeret retning og bevægelse',
      versionLabel: 'Version',
      updatedLabel: 'Opdateret',
      creditsBody:
        'A.D.A.M.<br>Animeret regi og bevægelse<br><br>Drevet af SIMON.<br>Det hedder bestemt ikke Simon.',
      ready: 'MOD KLAR',
    },
    easter: {
      toTheLeft: 'Til venstre, til venstre...',
      notGoingAnywhere: 'A.D.A.M. har bestemt, at du faktisk ikke skal nogen steder.',
      areWeThereYet: 'Er vi der endnu?',
      sneakSpam: 'Ingen har set dig.<br>Ingen har set dig.<br>Ingen har set dig.',
      helpSpam: 'Hvem er en god ugle?',
      rageRage: 'Dorn ville godkende.',
      simonResponse: '...og kald mig ikke Simon!',
      simonNoSays: 'Simon siger hvad?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Absolut ikke SIMON.',
    },
  };

  const TRANSLATION$i = {
    titles: {
      error: 'Fout',
      noTokenSelected: 'Geen token geselecteerd',
      tokenError: 'Tokenfout',
      missingDirection: 'Ontbrekende richting',
      invalidDirection: 'Ongeldige richting',
      missingState: 'Ontbrekende staat',
      invalidState: 'Ongeldige staat',
      missingAction: 'Ontbrekende actie',
      invalidAction: 'Ongeldige actie',
      accessDenied: 'Toegang geweigerd',
      invalidValue: 'Ongeldige waarde',
      unknownCommand: 'Onbekend commando',
      moveError: 'Verplaatsingsfout',
      macroExists: 'Macro bestaat',
      macroInstalled: 'Macro geïnstalleerd',
      invalidUsage: 'Ongeldig gebruik',
      profileAssigned: 'Profiel toegewezen',
      profileRemoved: 'Profiel verwijderd',
      unknownProfile: 'Onbekend profiel',
      configuration: 'Configuratie',
      settingsReset: 'Instellingen Resetten',
      scriptReady: 'Script klaar',
      versionInfo: 'Versie-informatie',
      creditsTitle: 'Kredieten',
      adamsMenu: 'ADAM. Controledek',
      adamsHelp: 'ADAM. Hulp',
      adamsSettings: 'ADAM. Instellingen',
      profiles: 'Geconfigureerde profielen',
      tokenProfile: 'Tokenprofiel',
      success: 'Succes',
      langSet: 'Taal ingesteld',
      langInvalid: 'Ongeldige taal',
      profileCreated: 'Profiel aangemaakt',
      profileUpdated: 'Profiel bijgewerkt',
      profileDeleted: 'Profiel verwijderd',
      profileRenamed: 'Profiel hernoemd',
      draftSubmitted: 'Concept ingediend',
      draftApproved: 'Concept goedgekeurd',
      draftRejected: 'Concept afgewezen',
      pendingDrafts: 'Profielconcepten in behandeling',
      profileCreationMode: 'Modus voor het maken van profielen',
      draftNotification: 'Profielconcept in behandeling',
    },
    errors: {
      noTokenSelected:
        'Geen token geselecteerd. Selecteer eerst een token en klik vervolgens op een richtingsknop.',
      noTokenSelectedStill: 'Er is nog steeds geen token geselecteerd.',
      noTokenSelectedPersistent: 'Ik bewonder je doorzettingsvermogen. Selecteer eerst een token.',
      tokenNotFound: 'Het geselecteerde token kan niet worden gevonden.',
      missingDirection:
        'Geef een richting op. Voorbeeld: <code>!adam --move n</code><br><em>Routebeschrijving: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Onbekende richting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volledige namen zoals noord, noordoost)',
      missingState: 'Geef een staat op.<br>Geldig: {states}',
      invalidState: 'Onbekende staat: <strong>{value}</strong><br><br>Geldig: {states}',
      missingAction:
        'Geef een actie op. Voorbeelden: help, spreuk, woede, sprint, sluipen, inactief, vechten',
      invalidAction: 'Onbekende actie: <strong>{value}</strong><br><br>Bekende acties: {actions}',
      accessDeniedConfig: 'Configuratiewijzigingen zijn beperkt tot de GM.',
      accessDeniedProfileAssign: 'Profieltoewijzing is beperkt tot de GM.',
      accessDeniedProfileRemove: 'Profielverwijdering is beperkt tot de GM.',
      accessDeniedMacro: 'Macro-installatie is beperkt tot de GM.',
      accessDeniedReset: 'Het resetten van instellingen is beperkt tot de GM.',
      unknownCommand:
        'Onbekend commando. Probeer <code>!adam --help</code> voor een lijst met beschikbare opdrachten.',
      moveFailed: 'Beweging mislukt.',
      gridSizeInvalid: 'De rastergrootte moet een geheel getal tussen 10 en 1000 (pixels) zijn.',
      moveDistanceInvalid:
        'De verplaatsingsafstand moet een geheel getal zijn tussen 1 en 20 (vierkantjes).',
      autoFaceInvalid: 'Auto-face-waarde moet: aan of uit zijn.',
      humourInvalid: 'Humorwaarde moet zijn: aan of uit.',
      langInvalid: 'Ongeldige landinstelling. Ondersteund: {locales}',
      profileUsage:
        'Gebruik: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Gebruik: <code>!adam --profile wijs &lt;profileId&gt;</code> toe',
      profileUnknown:
        'Profiel <strong>{id}</strong> bestaat niet. Gebruik <code>!adam --profile lijst</code> om beschikbare profielen te bekijken.',
      profileUnknownSub:
        'Onbekend profielsubcommando: <strong>{sub}</strong><br><br>Geldig: lijst, weergeven, maken, bewerkingszijde, hernoemen, verwijderen, toewijzen, verwijderen, concept, conceptzijde, beoordelen, goedkeuren, afwijzen',
      profileIdInvalid:
        'Ongeldige profiel-ID: <strong>{id}</strong>. Gebruik alleen letters, cijfers, koppeltekens en onderstrepingstekens (max. 50 tekens).',
      profileAlreadyExists:
        'Profiel <strong>{id}</strong> bestaat al. Gebruik <code>!adam --profile edit-side</code> om het te wijzigen, of verwijder het eerst.',
      profileNotFound: 'Profiel <strong>{id}</strong> niet gevonden.',
      profileCreateUsage:
        'Gebruik: <code>!adam --profile maak &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Gebruik: <code>!adam --profile bewerkingszijde &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Gebruik: <code>!adam --profile hernoemen &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Gebruik: <code>!adam --profile verwijder &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Gebruik: <code>!adam --profile concept &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Gebruik: <code>!adam --profile conceptzijde &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Geen concept in behandeling gevonden voor <strong>{id}</strong>. Dien er een in met <code>!adam --profile concept</code>.',
      profileGmOnly: 'Het aanmaken van een profiel is beperkt tot de GM.',
      profileEditGmOnly: 'Het wijzigen van dit profiel is beperkt tot de GM.',
      profileDeleteGmOnly: 'Het verwijderen van dit profiel is beperkt tot de GM.',
      profileGlobalReadOnly:
        'Profiel <strong>{id}</strong> is een globaal profiel en kan alleen worden gewijzigd door de GM.',
      profileNotOwned:
        'Je bent niet de eigenaar van profiel <strong>{id}</strong> en je kunt dit niet wijzigen.',
      profileModeRequiresDraft:
        'Voor het maken van een profiel is goedkeuring van GM vereist in dit spel. Gebruik <code>!adam --profile concept &lt;id&gt; &lt;name&gt;</code> om een ​​concept in te dienen.',
      profileAssignNoControl:
        'U kunt alleen persoonlijke profielen toewijzen aan tokens die u beheert.',
      profileAssignNotOwned:
        'Je kunt alleen je eigen profielen toewijzen aan tokens die jij beheert. Profiel <strong>{id}</strong> is van een andere speler.',
      profileCreationModeInvalid:
        'Ongeldige modus voor het maken van profielen. Geldig: alleen gm, gm-goedgekeurd, alle gebruikers.',
      profileReviewGmOnly: 'Alleen de GM kan hangende concepten beoordelen.',
      profileApproveGmOnly: 'Alleen de GM kan profielconcepten goedkeuren.',
      profileRejectGmOnly: 'Alleen de GM kan profielconcepten afwijzen.',
      invalidAnimSet: 'Animatieset moet zijn: noord of zuid.',
      invalidSideNumber: 'Zijdenummer moet een positief geheel getal zijn (1 of groter).',
      noDrafts: 'Geen lopende profielconcepten.',
      profileDraftConflict:
        'Er bestaat al een in behandeling zijnd concept voor <strong>{id}</strong> en is eigendom van een andere speler.',
      profileDraftNotGmApproved:
        'Conceptinzendingen zijn alleen beschikbaar als de modus voor het maken van profielen <code>gm-approved</code> is.',
      profileApproveConflict:
        'Er bestaat al een actief profiel met de naam <strong>{id}</strong>. Verwijder het eerst voordat u dit concept goedkeurt.',
      macroExists: "Er bestaat al een macro met de naam '<strong>{name}</strong>'.",
      simonUnknown:
        'Simon weet niet hoe hij het volgende moet doen: <em>{command}</em><br><br>Probeer: <code>!simon zegt zet n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> staat nu tegenover <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> status ingesteld op <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> actie: <strong>{action}</strong> → staat: <strong>{state}</strong>.',
      profileAssigned: 'Profiel <strong>{id}</strong> toegewezen aan <strong>{token}</strong>.',
      profileRemoved: 'Profiel verwijderd van <strong>{token}</strong>.',
      profileCreated: 'Profiel <strong>{id}</strong> gemaakt.',
      profileSideSet: 'Profiel <strong>{id}</strong>: {state}/{animSet} → zijkant {number}.',
      profileRenamed: 'Profiel <strong>{id}</strong> hernoemd naar <strong>{name}</strong>.',
      profileDeleted: 'Profiel <strong>{id}</strong> verwijderd.',
      profileDraftSubmitted:
        'Concept voor profiel <strong>{id}</strong> ingediend voor goedkeuring door GM.',
      profileDraftApproved:
        'Profielconcept <strong>{id}</strong> goedgekeurd en toegevoegd aan actieve profielen.',
      profileDraftRejected: 'Profielconcept <strong>{id}</strong> is afgewezen.',
      macroInstalled:
        "De globale macro '<strong>{name}</strong>' is gemaakt en is zichtbaar voor alle spelers.",
      configUpdated: 'Instellingen bijgewerkt.',
      settingsReset: '<strong>Instellingen teruggezet naar fabrieksinstellingen.</strong>',
      langSet: 'Taal ingesteld op {locale}.',
    },
    settings: {
      gridSize: 'Rastergrootte',
      gridSizeDesc: '{size}px per vierkant',
      moveDistance: 'Verplaats afstand',
      moveDistanceDesc: '{squares} vierkant(en) — {pixels}px per zet',
      autoFace: 'Automatisch gezicht bij beweging',
      humour: 'Humor (paaseieren)',
      language: 'Taal',
      profileCreationMode: 'Modus voor het maken van profielen',
      on: 'Op',
      off: 'Uit',
    },
    profiles: {
      none: 'Er zijn geen geanimeerde tokenprofielen geconfigureerd.',
      noProfile: 'Aan het geselecteerde token is geen profiel toegewezen.',
      id: 'Profiel-ID',
      displayName: 'Weergavenaam',
      mappedStates: 'In kaart gebrachte staten',
      noneValue: '(geen)',
      personal: 'persoonlijk',
      owner: 'Eigenaar',
      submittedBy: 'ingediend door',
      approveHint:
        'Gebruik !adam --profile goedkeuren &lt;id&gt; om goed te keuren of af te wijzen &lt;id&gt; om af te wijzen.',
    },
    menu: {
      title: 'ADAM. Controledek',
      movement: 'Beweging',
      facing: 'Geconfronteerd',
      state: 'Staat',
      stateLabel: 'Staat',
      facingLabel: 'Geconfronteerd',
      profileLabel: 'Profiel',
      noProfile: 'Geen profiel',
      help: 'Hulp',
      config: 'Configuratie',
      states: {
        idle: 'Inactief',
        combat: 'Gevecht',
        walk: 'Wandeling',
        dash: 'Streepje',
        sneak: 'Sluip',
        rage: 'Woede',
        spellcasting: 'Spreuken',
        help: 'Hulp',
      },
    },
    info: {
      subtitle: 'Geanimeerde richting en beweging',
      versionLabel: 'Versie',
      updatedLabel: 'Bijgewerkt',
      creditsBody:
        'A.D.A.M.<br>Geanimeerde regie en beweging<br><br>Mogelijk gemaakt door SIMON.<br>Zeker niet Simon genoemd.',
      ready: 'MOD KLAAR',
    },
    easter: {
      toTheLeft: 'Naar links, naar links...',
      notGoingAnywhere: 'ADAM. heeft vastgesteld dat je eigenlijk nergens heen gaat.',
      areWeThereYet: 'Zijn we er al?',
      sneakSpam: 'Niemand heeft je gezien.<br>Niemand heeft je gezien.<br>Niemand heeft je gezien.',
      helpSpam: 'Wie is een goede uil?',
      rageRage: 'Dorn zou het goedkeuren.',
      simonResponse: '...en noem mij geen Simon!',
      simonNoSays: 'Simon zegt wat?',
      versionEgg: 'ADAM. v{version}<br><br>Zeker niet SIMON.',
    },
  };

  const TRANSLATION$h = {
    titles: {
      error: 'Error',
      noTokenSelected: 'No Token Selected',
      tokenError: 'Token Error',
      missingDirection: 'Missing Direction',
      invalidDirection: 'Invalid Direction',
      missingState: 'Missing State',
      invalidState: 'Invalid State',
      missingAction: 'Missing Action',
      invalidAction: 'Invalid Action',
      accessDenied: 'Access Denied',
      invalidValue: 'Invalid Value',
      unknownCommand: 'Unknown Command',
      moveError: 'Move Error',
      macroExists: 'Macro Exists',
      macroInstalled: 'Macro Installed',
      invalidUsage: 'Invalid Usage',
      profileAssigned: 'Profile Assigned',
      profileRemoved: 'Profile Removed',
      unknownProfile: 'Unknown Profile',
      configuration: 'Configuration',
      settingsReset: 'Settings Reset',
      scriptReady: 'Script Ready',
      versionInfo: 'Version Info',
      creditsTitle: 'Credits',
      adamsMenu: 'A.D.A.M. Control Deck',
      adamsHelp: 'A.D.A.M. Help',
      adamsSettings: 'A.D.A.M. Settings',
      profiles: 'Configured Profiles',
      tokenProfile: 'Token Profile',
      success: 'Success',
      langSet: 'Language Set',
      langInvalid: 'Invalid Language',
      profileCreated: 'Profile Created',
      profileUpdated: 'Profile Updated',
      profileDeleted: 'Profile Deleted',
      profileRenamed: 'Profile Renamed',
      draftSubmitted: 'Draft Submitted',
      draftApproved: 'Draft Approved',
      draftRejected: 'Draft Rejected',
      pendingDrafts: 'Pending Profile Drafts',
      profileCreationMode: 'Profile Creation Mode',
      draftNotification: 'Profile Draft Pending',
    },
    errors: {
      noTokenSelected:
        'No token selected. Please select a token first, then click a direction button.',
      noTokenSelectedStill: 'Still no token selected.',
      noTokenSelectedPersistent: 'I admire your persistence. Select a token first.',
      tokenNotFound: 'Selected token could not be found.',
      missingDirection:
        'Please provide a direction. Example: <code>!adam --move n</code><br><em>Directions: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Unknown direction: <strong>{value}</strong><br><br>Valid: n, ne, e, se, s, sw, w, nw (or full names such as north, northeast)',
      missingState: 'Please provide a state.<br>Valid: {states}',
      invalidState: 'Unknown state: <strong>{value}</strong><br><br>Valid: {states}',
      missingAction:
        'Please provide an action. Examples: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Unknown action: <strong>{value}</strong><br><br>Known actions: {actions}',
      accessDeniedConfig: 'Configuration changes are restricted to the GM.',
      accessDeniedProfileAssign: 'Profile assignment is restricted to the GM.',
      accessDeniedProfileRemove: 'Profile removal is restricted to the GM.',
      accessDeniedMacro: 'Macro installation is restricted to the GM.',
      accessDeniedReset: 'Settings reset is restricted to the GM.',
      unknownCommand:
        'Unknown command. Try <code>!adam --help</code> for a list of available commands.',
      moveFailed: 'Movement failed.',
      gridSizeInvalid: 'Grid size must be an integer between 10 and 1000 (pixels).',
      moveDistanceInvalid: 'Move distance must be an integer between 1 and 20 (squares).',
      autoFaceInvalid: 'Auto-face value must be: on or off.',
      humourInvalid: 'Humour value must be: on or off.',
      langInvalid: 'Invalid locale. Supported: {locales}',
      profileUsage:
        'Usage: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Usage: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profile <strong>{id}</strong> does not exist. Use <code>!adam --profile list</code> to see available profiles.',
      profileUnknownSub:
        'Unknown profile subcommand: <strong>{sub}</strong><br><br>Valid: list, show, create, edit-side, rename, delete, assign, remove, draft, draft-side, review, approve, reject',
      profileIdInvalid:
        'Invalid profile ID: <strong>{id}</strong>. Use only letters, numbers, hyphens, and underscores (max 50 characters).',
      profileAlreadyExists:
        'Profile <strong>{id}</strong> already exists. Use <code>!adam --profile edit-side</code> to modify it, or delete it first.',
      profileNotFound: 'Profile <strong>{id}</strong> not found.',
      profileCreateUsage:
        'Usage: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Usage: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Usage: <code>!adam --profile rename &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Usage: <code>!adam --profile delete &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Usage: <code>!adam --profile draft &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Usage: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'No pending draft found for <strong>{id}</strong>. Submit one with <code>!adam --profile draft</code>.',
      profileGmOnly: 'Profile creation is restricted to the GM.',
      profileEditGmOnly: 'Modifying this profile is restricted to the GM.',
      profileDeleteGmOnly: 'Deleting this profile is restricted to the GM.',
      profileGlobalReadOnly:
        'Profile <strong>{id}</strong> is a global profile and can only be modified by the GM.',
      profileNotOwned: 'You do not own profile <strong>{id}</strong> and cannot modify it.',
      profileModeRequiresDraft:
        'Profile creation requires GM approval in this game. Use <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> to submit a draft.',
      profileAssignNoControl: 'You can only assign personal profiles to tokens you control.',
      profileAssignNotOwned:
        'You can only assign your own profiles to tokens you control. Profile <strong>{id}</strong> belongs to another player.',
      profileCreationModeInvalid:
        'Invalid profile creation mode. Valid: gm-only, gm-approved, all-users.',
      profileReviewGmOnly: 'Only the GM can review pending drafts.',
      profileApproveGmOnly: 'Only the GM can approve profile drafts.',
      profileRejectGmOnly: 'Only the GM can reject profile drafts.',
      invalidAnimSet: 'Animation set must be: north or south.',
      invalidSideNumber: 'Side number must be a positive integer (1 or greater).',
      noDrafts: 'No pending profile drafts.',
      profileDraftConflict:
        'A pending draft for <strong>{id}</strong> already exists and belongs to another player.',
      profileDraftNotGmApproved:
        'Draft submissions are only available when profile creation mode is <code>gm-approved</code>.',
      profileApproveConflict:
        'An active profile named <strong>{id}</strong> already exists. Delete it first before approving this draft.',
      macroExists: "A macro named '<strong>{name}</strong>' already exists.",
      simonUnknown:
        "Simon doesn't know how to: <em>{command}</em><br><br>Try: <code>!simon says move n</code>",
    },
    confirm: {
      facing: '<strong>{token}</strong> now faces <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> state set to <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> action: <strong>{action}</strong> → state: <strong>{state}</strong>.',
      profileAssigned: 'Profile <strong>{id}</strong> assigned to <strong>{token}</strong>.',
      profileRemoved: 'Profile removed from <strong>{token}</strong>.',
      profileCreated: 'Profile <strong>{id}</strong> created.',
      profileSideSet: 'Profile <strong>{id}</strong>: {state}/{animSet} → side {number}.',
      profileRenamed: 'Profile <strong>{id}</strong> renamed to <strong>{name}</strong>.',
      profileDeleted: 'Profile <strong>{id}</strong> deleted.',
      profileDraftSubmitted: 'Draft for profile <strong>{id}</strong> submitted for GM approval.',
      profileDraftApproved:
        'Profile draft <strong>{id}</strong> approved and added to active profiles.',
      profileDraftRejected: 'Profile draft <strong>{id}</strong> has been rejected.',
      macroInstalled:
        "Global macro '<strong>{name}</strong>' has been created and is visible to all players.",
      configUpdated: 'Settings updated.',
      settingsReset: '<strong>Settings reset to factory defaults.</strong>',
      langSet: 'Language set to {locale}.',
    },
    settings: {
      gridSize: 'Grid Size',
      gridSizeDesc: '{size}px per square',
      moveDistance: 'Move Distance',
      moveDistanceDesc: '{squares} square(s) — {pixels}px per move',
      autoFace: 'Auto-Face on Move',
      humour: 'Humour (Easter Eggs)',
      language: 'Language',
      profileCreationMode: 'Profile Creation Mode',
      on: 'On',
      off: 'Off',
    },
    profiles: {
      none: 'No animated token profiles are configured.',
      noProfile: 'Selected token has no profile assigned.',
      id: 'Profile ID',
      displayName: 'Display Name',
      mappedStates: 'Mapped States',
      noneValue: '(none)',
      personal: 'personal',
      owner: 'Owner',
      submittedBy: 'submitted by',
      approveHint:
        'Use !adam --profile approve &lt;id&gt; to approve or reject &lt;id&gt; to reject.',
    },
    menu: {
      title: 'A.D.A.M. Control Deck',
      movement: 'Movement',
      facing: 'Facing',
      state: 'State',
      stateLabel: 'State',
      facingLabel: 'Facing',
      profileLabel: 'Profile',
      noProfile: 'No profile',
      help: 'Help',
      config: 'Config',
      states: {
        idle: 'Idle',
        combat: 'Combat',
        walk: 'Walk',
        dash: 'Dash',
        sneak: 'Sneak',
        rage: 'Rage',
        spellcasting: 'Spellcast',
        help: 'Help',
      },
    },
    info: {
      subtitle: 'Animated Direction And Movement',
      versionLabel: 'Version',
      updatedLabel: 'Updated',
      creditsBody:
        'A.D.A.M.<br>Animated Direction And Movement<br><br>Powered by SIMON.<br>Definitely not called Simon.',
      ready: 'MOD READY',
    },
    easter: {
      toTheLeft: 'To the left, to the left...',
      notGoingAnywhere: 'A.D.A.M. has determined you are not actually going anywhere.',
      areWeThereYet: 'Are we there yet?',
      sneakSpam: 'Nobody has seen you.<br>Nobody has seen you.<br>Nobody has seen you.',
      helpSpam: "Who's a good owl?",
      rageRage: 'Dorn would approve.',
      simonResponse: "...and don't call me Simon!",
      simonNoSays: 'Simon says what?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Definitely not SIMON.',
    },
  };

  const TRANSLATION$g = {
    titles: {
      error: 'Virhe',
      noTokenSelected: 'Tunnuksia ei ole valittu',
      tokenError: 'Token Error',
      missingDirection: 'Suunta puuttuu',
      invalidDirection: 'Virheellinen suunta',
      missingState: 'Puuttuva osavaltio',
      invalidState: 'Virheellinen osavaltio',
      missingAction: 'Toiminto puuttuu',
      invalidAction: 'Virheellinen toiminto',
      accessDenied: 'Käyttö estetty',
      invalidValue: 'Virheellinen arvo',
      unknownCommand: 'Tuntematon komento',
      moveError: 'Siirtovirhe',
      macroExists: 'Makro on olemassa',
      macroInstalled: 'Makro asennettu',
      invalidUsage: 'Virheellinen käyttö',
      profileAssigned: 'Profiili määritetty',
      profileRemoved: 'Profiili poistettu',
      unknownProfile: 'Tuntematon profiili',
      configuration: 'Kokoonpano',
      settingsReset: 'Asetukset Reset',
      scriptReady: 'Script valmis',
      versionInfo: 'Versiotiedot',
      creditsTitle: 'Krediitit',
      adamsMenu: 'A.D.A.M. Ohjauslevy',
      adamsHelp: 'A.D.A.M. Auttaa',
      adamsSettings: 'A.D.A.M. Asetukset',
      profiles: 'Määritetyt profiilit',
      tokenProfile: 'Token-profiili',
      success: 'Menestys',
      langSet: 'Kieli asetettu',
      langInvalid: 'Virheellinen kieli',
      profileCreated: 'Profiili luotu',
      profileUpdated: 'Profiili päivitetty',
      profileDeleted: 'Profiili poistettu',
      profileRenamed: 'Profiili nimetty uudelleen',
      draftSubmitted: 'Luonnos lähetetty',
      draftApproved: 'Luonnos hyväksytty',
      draftRejected: 'Luonnos hylätty',
      pendingDrafts: 'Odottavat profiililuonnokset',
      profileCreationMode: 'Profiilin luontitila',
      draftNotification: 'Profiililuonnos odottaa',
    },
    errors: {
      noTokenSelected:
        'Tunnuksia ei ole valittu. Valitse ensin tunnus ja napsauta sitten suuntapainiketta.',
      noTokenSelectedStill: 'Tunnuksia ei vieläkään ole valittu.',
      noTokenSelectedPersistent: 'Ihailen sinnikkyyttäsi. Valitse ensin tunnus.',
      tokenNotFound: 'Valittua merkkiä ei löytynyt.',
      missingDirection:
        'Ole hyvä ja anna suunta. Esimerkki: <code>!adam --move n</code><br><em>Reittiohjeet: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Tuntematon suunta: <strong>{value}</strong><br><br>Voimassa: n, ei, e, se, s, sw, w, nw (tai täydet nimet, kuten pohjoinen, koillinen)',
      missingState: 'Anna tila.<br>Voimassa: {states}',
      invalidState: 'Tuntematon tila: <strong>{value}</strong><br><br>Voimassa: {states}',
      missingAction:
        'Ole hyvä ja toimita. Esimerkkejä: apu, loitsu, raivo, viiva, hiipiminen, tyhjäkäynti, taistelu',
      invalidAction:
        'Tuntematon toiminta: <strong>{value}</strong><br><br>Tunnetut toiminnot: {actions}',
      accessDeniedConfig: 'Kokoonpanon muutokset rajoittuvat GM:ään.',
      accessDeniedProfileAssign: 'Profiilin antaminen on rajoitettu GM:lle.',
      accessDeniedProfileRemove: 'Profiilin poistaminen on rajoitettu GM:ään.',
      accessDeniedMacro: 'Makroasennus on rajoitettu GM:ään.',
      accessDeniedReset: 'Asetusten nollaus on rajoitettu GM:ään.',
      unknownCommand:
        'Tuntematon komento. Kokeile <code>!adam --help</code> luetteloa käytettävissä olevista komennoista.',
      moveFailed: 'Liikkuminen epäonnistui.',
      gridSizeInvalid: 'Ruudukon koon on oltava kokonaisluku välillä 10–1000 (pikseliä).',
      moveDistanceInvalid: 'Siirtoetäisyyden on oltava kokonaisluku väliltä 1–20 (neliöt).',
      autoFaceInvalid: 'Automaattisen arvon on oltava päällä tai pois päältä.',
      humourInvalid: 'Huumorin arvon on oltava päällä tai pois päältä.',
      langInvalid: 'Virheellinen maa-asetus. Tuettu: {locales}',
      profileUsage:
        'Käyttö: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Käyttö: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profile <strong>{id}</strong> does not exist. Use <code>!adam --profile list</code> to see available profiles.',
      profileUnknownSub:
        'Tuntematon profiilin alakomento: <strong>{sub}</strong><br><br>Kelvollinen: luettelo, näytä, luo, muokkaa, nimeä uudelleen, poista, määritä, poista, luonnos, luonnospuoli, tarkista, hyväksy, hylkää',
      profileIdInvalid:
        'Virheellinen profiilitunnus: <strong>{id}</strong>. Käytä vain kirjaimia, numeroita, tavuviivoja ja alaviivoja (enintään 50 merkkiä).',
      profileAlreadyExists:
        'Profiili <strong>{id}</strong> on jo olemassa. Käytä <code>!adam --profile edit-side</code> -komentoa muokataksesi sitä tai poista se ensin.',
      profileNotFound: 'Profiilia <strong>{id}</strong> ei löydy.',
      profileCreateUsage:
        'Käyttö: <code>!adam --profile luo &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Käyttö: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Käyttö: <code>!adam --profile nimeä uudelleen &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Käyttö: <code>!adam --profile poista &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Käyttö: <code>!adam --profile luonnos &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Käyttö: <code>!adam --profile luonnospuoli &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Odottavaa luonnosta ei löytynyt kohteelle <strong>{id}</strong>. Lähetä yksi <code>!adam --profile luonnoksella</code>.',
      profileGmOnly: 'Profiilin luominen on rajoitettu GM:lle.',
      profileEditGmOnly: 'Tämän profiilin muokkaaminen on rajoitettu GM:ään.',
      profileDeleteGmOnly: 'Tämän profiilin poistaminen on rajoitettu GM:ään.',
      profileGlobalReadOnly:
        'Profiili <strong>{id}</strong> on maailmanlaajuinen profiili, ja vain GM voi muokata sitä.',
      profileNotOwned: 'Et omista profiilia <strong>{id}</strong>, etkä voi muokata sitä.',
      profileModeRequiresDraft:
        'Profiilin luominen vaatii GM:n hyväksynnän tässä pelissä. Käytä <code>!adam --profile luonnosta &lt;id&gt; &lt;name&gt;</code> luonnoksen lähettämiseen.',
      profileAssignNoControl:
        'Voit määrittää henkilökohtaisia ​​profiileja vain hallitsemillesi tunnuksille.',
      profileAssignNotOwned:
        'Voit määrittää omat profiilisi vain hallitsemillesi tunnuksille. Profiili <strong>{id}</strong> kuuluu toiselle pelaajalle.',
      profileCreationModeInvalid:
        'Virheellinen profiilin luontitila. Voimassa: vain gm, GM-hyväksytty, kaikki käyttäjät.',
      profileReviewGmOnly: 'Vain GM voi tarkastella vireillä olevia luonnoksia.',
      profileApproveGmOnly: 'Vain GM voi hyväksyä profiililuonnokset.',
      profileRejectGmOnly: 'Vain GM voi hylätä profiililuonnokset.',
      invalidAnimSet: 'Animaatiosarjan tulee olla pohjoinen tai etelä.',
      invalidSideNumber: 'Sivunumeron on oltava positiivinen kokonaisluku (1 tai suurempi).',
      noDrafts: 'Ei odottavia profiililuonnoksia.',
      profileDraftConflict:
        'Odottava luonnos kohteelle <strong>{id}</strong> on jo olemassa ja kuuluu toiselle pelaajalle.',
      profileDraftNotGmApproved:
        'Luonnokset ovat käytettävissä vain, kun profiilin luontitila on <code>gm-hyväksytty</code>.',
      profileApproveConflict:
        'Aktiivinen profiili nimeltä <strong>{id}</strong> on jo olemassa. Poista se ennen tämän luonnoksen hyväksymistä.',
      macroExists: 'Makro nimeltä <strong>{name}</strong> on jo olemassa.',
      simonUnknown:
        'Simon ei osaa: <em>{command}</em><br><br>Kokeile: <code>!simon sanoo liikkua n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> kohtaa nyt <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong>-tilaksi on asetettu <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> toiminto: <strong>{action}</strong> → tila: <strong>{state}</strong>.',
      profileAssigned:
        'Profiili <strong>{id}</strong> on määritetty käyttäjälle <strong>{token}</strong>.',
      profileRemoved: 'Profiili poistettu kohteesta <strong>{token}</strong>.',
      profileCreated: 'Profiili <strong>{id}</strong> luotu.',
      profileSideSet: 'Profiili <strong>{id}</strong>: {state}/{animSet} → sivu {number}.',
      profileRenamed:
        'Profiili <strong>{id}</strong> nimettiin uudelleen muotoon <strong>{name}</strong>.',
      profileDeleted: 'Profiili <strong>{id}</strong> poistettu.',
      profileDraftSubmitted:
        'Profiilin <strong>{id}</strong> luonnos lähetetty GM:n hyväksyntää varten.',
      profileDraftApproved:
        'Profiililuonnos <strong>{id}</strong> hyväksytty ja lisätty aktiivisiin profiileihin.',
      profileDraftRejected: 'Profiililuonnos <strong>{id}</strong> on hylätty.',
      macroInstalled:
        'Maailmanlaajuinen makro <strong>{name}</strong> on luotu ja näkyy kaikille pelaajille.',
      configUpdated: 'Asetukset päivitetty.',
      settingsReset: '<strong>Asetukset palautetaan tehdasasetuksiin.</strong>',
      langSet: 'Kieleksi on asetettu {locale}.',
    },
    settings: {
      gridSize: 'Ruudukon koko',
      gridSizeDesc: '{size}px per neliö',
      moveDistance: 'Siirrä etäisyys',
      moveDistanceDesc: '{squares} neliötä – {pixels}px per liike',
      autoFace: 'Auto-Face on Move',
      humour: 'Huumori (pääsiäismunat)',
      language: 'Kieli',
      profileCreationMode: 'Profiilin luontitila',
      on: 'Päällä',
      off: 'Pois',
    },
    profiles: {
      none: 'Animoituja tunnusprofiileja ei ole määritetty.',
      noProfile: 'Valitulle tunnukselle ei ole määritetty profiilia.',
      id: 'Profiilin tunnus',
      displayName: 'Näyttönimi',
      mappedStates: 'Kartatut osavaltiot',
      noneValue: '(ei mitään)',
      personal: 'henkilökohtainen',
      owner: 'Omistaja',
      submittedBy: 'lähettänyt',
      approveHint:
        'Käytä !adam --profile hyväksy &lt;id&gt; hyväksyäksesi tai hylkää &lt;id&gt; hylkäämiseen.',
    },
    menu: {
      title: 'A.D.A.M. Ohjauslevy',
      movement: 'Liike',
      facing: 'Vastakkain',
      state: 'Osavaltio',
      stateLabel: 'Osavaltio',
      facingLabel: 'Vastakkain',
      profileLabel: 'Profiili',
      noProfile: 'Ei profiilia',
      help: 'Auttaa',
      config: 'Konfig',
      states: {
        idle: 'Tyhjäkäynti',
        combat: 'Taistele',
        walk: 'Kävellä',
        dash: 'Dash',
        sneak: 'Hiipiä',
        rage: 'Raivo',
        spellcasting: 'Spellcast',
        help: 'Auttaa',
      },
    },
    info: {
      subtitle: 'Animoitu suunta ja liike',
      versionLabel: 'Versio',
      updatedLabel: 'Päivitetty',
      creditsBody:
        'A.D.A.M.<br>Animated Direction and Movement<br><br>Tuottajana SIMON.<br>Ei todellakaan Simon.',
      ready: 'MOD VALMIS',
    },
    easter: {
      toTheLeft: 'Vasemmalle, vasemmalle...',
      notGoingAnywhere: 'A.D.A.M. on päättänyt, ettet ole menossa minnekään.',
      areWeThereYet: 'Olemmeko jo perillä?',
      sneakSpam:
        'Kukaan ei ole nähnyt sinua.<br>Kukaan ei ole nähnyt sinua.<br>Kukaan ei ole nähnyt sinua.',
      helpSpam: 'Kuka on hyvä pöllö?',
      rageRage: 'Dorn hyväksyisi.',
      simonResponse: '...äläkä kutsu minua Simoniksi!',
      simonNoSays: 'Simon sanoo mitä?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Ei todellakaan SIMON.',
    },
  };

  const TRANSLATION$f = {
    titles: {
      error: 'Erreur',
      noTokenSelected: 'Aucun jeton sélectionné',
      tokenError: 'Erreur de jeton',
      missingDirection: 'Direction manquante',
      invalidDirection: 'Direction invalide',
      missingState: 'État manquant',
      invalidState: 'État invalide',
      missingAction: 'Action manquante',
      invalidAction: 'Action invalide',
      accessDenied: 'Accès refusé',
      invalidValue: 'Valeur invalide',
      unknownCommand: 'Commande inconnue',
      moveError: 'Erreur de déplacement',
      macroExists: 'La macro existe',
      macroInstalled: 'Macro installée',
      invalidUsage: 'Utilisation invalide',
      profileAssigned: 'Profil attribué',
      profileRemoved: 'Profil supprimé',
      unknownProfile: 'Profil inconnu',
      configuration: 'Configuration',
      settingsReset: 'Réinitialisation des paramètres',
      scriptReady: 'Prêt pour le script',
      versionInfo: 'Informations sur la version',
      creditsTitle: 'Crédits',
      adamsMenu: 'ADAM. Plate-forme de contrôle',
      adamsHelp: 'ADAM. Aide',
      adamsSettings: 'ADAM. Paramètres',
      profiles: 'Profils configurés',
      tokenProfile: 'Profil de jeton',
      success: 'Succès',
      langSet: 'Ensemble de langues',
      langInvalid: 'Langue invalide',
      profileCreated: 'Profil créé',
      profileUpdated: 'Profil mis à jour',
      profileDeleted: 'Profil supprimé',
      profileRenamed: 'Profil renommé',
      draftSubmitted: 'Projet soumis',
      draftApproved: 'Projet approuvé',
      draftRejected: 'Brouillon rejeté',
      pendingDrafts: 'Brouillons de profil en attente',
      profileCreationMode: 'Mode de création de profil',
      draftNotification: 'Brouillon de profil en attente',
    },
    errors: {
      noTokenSelected:
        "Aucun jeton sélectionné. Veuillez d'abord sélectionner un jeton, puis cliquer sur un bouton de direction.",
      noTokenSelectedStill: 'Toujours aucun jeton sélectionné.',
      noTokenSelectedPersistent: "J'admire votre persévérance. Sélectionnez d'abord un jeton.",
      tokenNotFound: 'Le jeton sélectionné est introuvable.',
      missingDirection:
        'Veuillez fournir une direction. Exemple : <code>!adam --move n</code><br><em>Directions : n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direction inconnue : <strong>{value}</strong><br><br>Valide : n, ne, e, se, s, sw, w, nw (ou noms complets tels que nord, nord-est)',
      missingState: 'Veuillez indiquer un état.<br>Valide : {states}',
      invalidState: 'État inconnu : <strong>{value}</strong><br><br>Valide : {states}',
      missingAction:
        'Veuillez fournir une action. Exemples : aide, lancement de sorts, rage, sprint, furtivité, inactivité, combat',
      invalidAction:
        'Action inconnue : <strong>{value}</strong><br><br>Actions connues : {actions}',
      accessDeniedConfig: 'Les modifications de configuration sont limitées au GM.',
      accessDeniedProfileAssign: "L'attribution de profil est limitée au directeur général.",
      accessDeniedProfileRemove: 'La suppression du profil est limitée au directeur général.',
      accessDeniedMacro: "L'installation de macros est réservée au GM.",
      accessDeniedReset: 'La réinitialisation des paramètres est limitée au GM.',
      unknownCommand:
        'Commande inconnue. Essayez <code>!adam --help</code> pour une liste des commandes disponibles.',
      moveFailed: 'Le mouvement a échoué.',
      gridSizeInvalid:
        'La taille de la grille doit être un nombre entier compris entre 10 et 1 000 (pixels).',
      moveDistanceInvalid:
        'La distance de déplacement doit être un nombre entier compris entre 1 et 20 (carrés).',
      autoFaceInvalid: 'La valeur du visage automatique doit être : activée ou désactivée.',
      humourInvalid: "La valeur de l'humour doit être : activée ou désactivée.",
      langInvalid: 'Paramètres régionaux non valides. Pris en charge : {locales}',
      profileUsage:
        'Utilisation : <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Utilisation : <code>!adam --profile assigner &lt;profileId&gt;</code>',
      profileUnknown:
        "Le profil <strong>{id}</strong> n'existe pas. Utilisez la <code>!adam --profile list</code> pour voir les profils disponibles.",
      profileUnknownSub:
        'Sous-commande de profil inconnue : <strong>{sub}</strong><br><br>Valide : répertorier, afficher, créer, modifier, renommer, supprimer, attribuer, supprimer, brouillon, brouillon, réviser, approuver, rejeter',
      profileIdInvalid:
        "ID de profil invalide : <strong>{id}</strong>. Utilisez uniquement des lettres, des chiffres, des traits d'union et des traits de soulignement (50 caractères maximum).",
      profileAlreadyExists:
        "Le profil <strong>{id}</strong> existe déjà. Utilisez <code>!adam --profile edit-side</code> pour le modifier, ou supprimez-le d'abord.",
      profileNotFound: 'Profil <strong>{id}</strong> introuvable.',
      profileCreateUsage:
        'Utilisation : <code>!adam --profile créer &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Utilisation : <code>!adam --profile côté édition &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Utilisation : <code>!adam --profile renommer &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Utilisation : <code>!adam --profile supprimer &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Utilisation : <code>!adam --profile brouillon &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Utilisation : <code>!adam --profile côté brouillon &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Aucun brouillon en attente trouvé pour <strong>{id}</strong>. Soumettez-en un avec <code>!adam --profile brouillon</code>.',
      profileGmOnly: 'La création de profil est réservée au MJ.',
      profileEditGmOnly: 'La modification de ce profil est réservée au GM.',
      profileDeleteGmOnly: 'La suppression de ce profil est réservée au GM.',
      profileGlobalReadOnly:
        'Le profil <strong>{id}</strong> est un profil global et ne peut être modifié que par le MJ.',
      profileNotOwned:
        "Vous n'êtes pas propriétaire du profil <strong>{id}</strong> et ne pouvez pas le modifier.",
      profileModeRequiresDraft:
        "La création de profil nécessite l'approbation du directeur général dans ce jeu. Utilisez <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> pour soumettre un brouillon.",
      profileAssignNoControl:
        "Vous ne pouvez attribuer des profils personnels qu'aux jetons que vous contrôlez.",
      profileAssignNotOwned:
        "Vous ne pouvez attribuer vos propres profils qu'aux jetons que vous contrôlez. Le profil <strong>{id}</strong> appartient à un autre joueur.",
      profileCreationModeInvalid:
        'Mode de création de profil invalide. Valide : gm uniquement, approuvé par gm, tous les utilisateurs.',
      profileReviewGmOnly: 'Seul le MJ peut examiner les brouillons en attente.',
      profileApproveGmOnly: 'Seul le directeur général peut approuver les brouillons de profil.',
      profileRejectGmOnly: 'Seul le MJ peut rejeter les brouillons de profil.',
      invalidAnimSet: 'Le décor d’animation doit être : nord ou sud.',
      invalidSideNumber: 'Le numéro de côté doit être un entier positif (1 ou plus).',
      noDrafts: 'Aucun brouillon de profil en attente.',
      profileDraftConflict:
        'Un draft en attente pour <strong>{id}</strong> existe déjà et appartient à un autre joueur.',
      profileDraftNotGmApproved:
        'Les brouillons de soumissions ne sont disponibles que lorsque le mode de création de profil est <code>approuvé par gm</code>.',
      profileApproveConflict:
        'Un profil actif nommé <strong>{id}</strong> existe déjà. Supprimez-le avant d’approuver ce brouillon.',
      macroExists: 'Une macro nommée « <strong>{name}</strong> » existe déjà.',
      simonUnknown:
        'Simon ne sait pas comment : <em>{command}</em><br><br>Essayez : <code>! Simon dit de bouger n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> fait désormais face à <strong>{direction}</strong>.',
      stateSet: "L'état <strong>{token}</strong> est défini sur <strong>{state}</strong>.",
      actionSet:
        '<strong>{token}</strong> action : <strong>{action}</strong> → état : <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> attribué à <strong>{token}</strong>.',
      profileRemoved: 'Profil supprimé de <strong>{token}</strong>.',
      profileCreated: 'Profil <strong>{id}</strong> créé.',
      profileSideSet: 'Profil <strong>{id}</strong> : {state}/{animSet} → côté {number}.',
      profileRenamed: 'Profil <strong>{id}</strong> renommé <strong>{name}</strong>.',
      profileDeleted: 'Profil <strong>{id}</strong> supprimé.',
      profileDraftSubmitted:
        "Brouillon du profil <strong>{id}</strong> soumis à l'approbation du directeur général.",
      profileDraftApproved:
        'Brouillon de profil <strong>{id}</strong> approuvé et ajouté aux profils actifs.',
      profileDraftRejected: 'Le brouillon du profil <strong>{id}</strong> a été rejeté.',
      macroInstalled:
        "La macro globale '<strong>{name}</strong>' a été créée et est visible par tous les joueurs.",
      configUpdated: 'Paramètres mis à jour.',
      settingsReset: '<strong>Les paramètres sont réinitialisés aux valeurs par défaut.</strong>',
      langSet: 'Langue définie sur {locale}.',
    },
    settings: {
      gridSize: 'Taille de la grille',
      gridSizeDesc: '{size}px par carré',
      moveDistance: 'Distance de déplacement',
      moveDistanceDesc: '{squares} carré(s) — {pixels}px par coup',
      autoFace: 'Face automatique en déplacement',
      humour: 'Humour (œufs de Pâques)',
      language: 'Langue',
      profileCreationMode: 'Mode de création de profil',
      on: 'Sur',
      off: 'Désactivé',
    },
    profiles: {
      none: "Aucun profil de jeton animé n'est configuré.",
      noProfile: "Le jeton sélectionné n'a aucun profil attribué.",
      id: 'Identifiant du profil',
      displayName: "Nom d'affichage",
      mappedStates: 'États mappés',
      noneValue: '(aucun)',
      personal: 'personnel',
      owner: 'Propriétaire',
      submittedBy: 'soumis par',
      approveHint:
        'Utilisez !adam --profile approuver &lt;id&gt; pour approuver ou rejeter &lt;id&gt; pour rejeter.',
    },
    menu: {
      title: 'ADAM. Plate-forme de contrôle',
      movement: 'Mouvement',
      facing: 'Parement',
      state: 'État',
      stateLabel: 'État',
      facingLabel: 'Parement',
      profileLabel: 'Profil',
      noProfile: 'Aucun profil',
      help: 'Aide',
      config: 'Configuration',
      states: {
        idle: 'Inactif',
        combat: 'Combat',
        walk: 'Marcher',
        dash: 'Tiret',
        sneak: 'Mouchard',
        rage: 'Rage',
        spellcasting: 'Lancement de sorts',
        help: 'Aide',
      },
    },
    info: {
      subtitle: 'Direction et mouvement animés',
      versionLabel: 'Version',
      updatedLabel: 'Mis à jour',
      creditsBody:
        'A.D.A.M.<br>Direction et mouvement animés<br><br>Propulsé par SIMON.<br>Certainement pas appelé Simon.',
      ready: 'MODÈLE PRÊT',
    },
    easter: {
      toTheLeft: 'A gauche, à gauche...',
      notGoingAnywhere: 'ADAM. a déterminé que vous n’allez nulle part.',
      areWeThereYet: 'Sommes-nous déjà là ?',
      sneakSpam: 'Personne ne vous a vu.<br>Personne ne vous a vu.<br>Personne ne vous a vu.',
      helpSpam: 'Qui est un bon hibou ?',
      rageRage: 'Dorn approuverait.',
      simonResponse: "...et ne m'appelle pas Simon !",
      simonNoSays: 'Simon dit quoi ?',
      versionEgg: 'ADAM. v{version}<br><br>Certainement pas SIMON.',
    },
  };

  const TRANSLATION$e = {
    titles: {
      error: 'Fehler',
      noTokenSelected: 'Kein Token ausgewählt',
      tokenError: 'Token-Fehler',
      missingDirection: 'Fehlende Richtung',
      invalidDirection: 'Ungültige Richtung',
      missingState: 'Fehlender Staat',
      invalidState: 'Ungültiger Status',
      missingAction: 'Fehlende Aktion',
      invalidAction: 'Ungültige Aktion',
      accessDenied: 'Zugriff verweigert',
      invalidValue: 'Ungültiger Wert',
      unknownCommand: 'Unbekannter Befehl',
      moveError: 'Fehler beim Verschieben',
      macroExists: 'Makro vorhanden',
      macroInstalled: 'Makro installiert',
      invalidUsage: 'Ungültige Nutzung',
      profileAssigned: 'Profil zugewiesen',
      profileRemoved: 'Profil entfernt',
      unknownProfile: 'Unbekanntes Profil',
      configuration: 'Konfiguration',
      settingsReset: 'Einstellungen zurücksetzen',
      scriptReady: 'Skript bereit',
      versionInfo: 'Versionsinformationen',
      creditsTitle: 'Credits',
      adamsMenu: 'ADAM. Kontrolldeck',
      adamsHelp: 'ADAM. Helfen',
      adamsSettings: 'ADAM. Einstellungen',
      profiles: 'Konfigurierte Profile',
      tokenProfile: 'Token-Profil',
      success: 'Erfolg',
      langSet: 'Sprachsatz',
      langInvalid: 'Ungültige Sprache',
      profileCreated: 'Profil erstellt',
      profileUpdated: 'Profil aktualisiert',
      profileDeleted: 'Profil gelöscht',
      profileRenamed: 'Profil umbenannt',
      draftSubmitted: 'Entwurf eingereicht',
      draftApproved: 'Entwurf genehmigt',
      draftRejected: 'Entwurf abgelehnt',
      pendingDrafts: 'Ausstehende Profilentwürfe',
      profileCreationMode: 'Profilerstellungsmodus',
      draftNotification: 'Profilentwurf ausstehend',
    },
    errors: {
      noTokenSelected:
        'Kein Token ausgewählt. Bitte wählen Sie zuerst einen Token aus und klicken Sie dann auf eine Richtungsschaltfläche.',
      noTokenSelectedStill: 'Immer noch kein Token ausgewählt.',
      noTokenSelectedPersistent:
        'Ich bewundere Ihre Beharrlichkeit. Wählen Sie zunächst einen Token aus.',
      tokenNotFound: 'Der ausgewählte Token konnte nicht gefunden werden.',
      missingDirection:
        'Bitte geben Sie eine Richtung an. Beispiel: <code>!adam --move n</code><br><em>Richtungen: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Unbekannte Richtung: <strong>{value}</strong><br><br>Gültig: n, ne, e, se, s, sw, w, nw (oder vollständige Namen wie Norden, Nordosten)',
      missingState: 'Bitte geben Sie einen Bundesstaat an.<br>Gültig: {states}',
      invalidState: 'Unbekannter Status: <strong>{value}</strong><br><br>Gültig: {states}',
      missingAction:
        'Bitte geben Sie eine Aktion an. Beispiele: Hilfe, Zauber, Wut, Sprint, Schleichen, Leerlauf, Kampf',
      invalidAction:
        'Unbekannte Aktion: <strong>{value}</strong><br><br>Bekannte Aktionen: {actions}',
      accessDeniedConfig: 'Konfigurationsänderungen sind auf den GM beschränkt.',
      accessDeniedProfileAssign: 'Die Profilvergabe ist auf den GM beschränkt.',
      accessDeniedProfileRemove: 'Das Entfernen von Profilen ist auf den GM beschränkt.',
      accessDeniedMacro: 'Die Makroinstallation ist auf den GM beschränkt.',
      accessDeniedReset: 'Das Zurücksetzen der Einstellungen ist auf den GM beschränkt.',
      unknownCommand:
        'Unbekannter Befehl. Probieren Sie <code>!adam --help</code> aus, um eine Liste der verfügbaren Befehle zu erhalten.',
      moveFailed: 'Die Bewegung ist gescheitert.',
      gridSizeInvalid: 'Die Rastergröße muss eine Ganzzahl zwischen 10 und 1000 (Pixel) sein.',
      moveDistanceInvalid:
        'Die Bewegungsentfernung muss eine Ganzzahl zwischen 1 und 20 (Quadrate) sein.',
      autoFaceInvalid:
        'Der Wert für die automatische Schriftart muss aktiviert oder deaktiviert sein.',
      humourInvalid: 'Der Humorwert muss sein: an oder aus.',
      langInvalid: 'Ungültiges Gebietsschema. Unterstützt: {locales}',
      profileUsage:
        'Verwendung: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Verwendung: <code>!adam --profile zuweisen &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> existiert nicht. Verwenden Sie <code>!adam --profile list</code>, um verfügbare Profile anzuzeigen.',
      profileUnknownSub:
        'Unbekannter Profil-Unterbefehl: <strong>{sub}</strong><br><br>Gültig: Auflisten, Anzeigen, Erstellen, Bearbeitungsseite, Umbenennen, Löschen, Zuweisen, Entfernen, Entwurf, Entwurfsseite, Überprüfen, Genehmigen, Ablehnen',
      profileIdInvalid:
        'Ungültige Profil-ID: <strong>{id}</strong>. Verwenden Sie nur Buchstaben, Zahlen, Bindestriche und Unterstriche (maximal 50 Zeichen).',
      profileAlreadyExists:
        'Das Profil <strong>{id}</strong> existiert bereits. Verwenden Sie <code>!adam --profile edit-side</code>, um es zu ändern, oder löschen Sie es zuerst.',
      profileNotFound: 'Profil <strong>{id}</strong> nicht gefunden.',
      profileCreateUsage:
        'Verwendung: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Verwendung: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Verwendung: <code>!adam --profile umbenennen &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Verwendung: <code>!adam --profile delete &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Verwendung: <code>!adam --profile Draft &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Verwendung: <code>!adam --profile entwurfsseitig &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Für <strong>{id}</strong> wurde kein ausstehender Entwurf gefunden. Senden Sie einen mit <code>!adam --profile Entwurf</code>.',
      profileGmOnly: 'Die Profilerstellung ist auf den GM beschränkt.',
      profileEditGmOnly: 'Das Ändern dieses Profils ist dem GM vorbehalten.',
      profileDeleteGmOnly: 'Das Löschen dieses Profils ist auf den GM beschränkt.',
      profileGlobalReadOnly:
        'Profil <strong>{id}</strong> ist ein globales Profil und kann nur vom GM geändert werden.',
      profileNotOwned:
        'Sie besitzen das Profil <strong>{id}</strong> nicht und können es nicht ändern.',
      profileModeRequiresDraft:
        'Für die Profilerstellung ist in diesem Spiel die Genehmigung des GM erforderlich. Verwenden Sie <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code>, um einen Entwurf einzureichen.',
      profileAssignNoControl:
        'Sie können nur Tokens, die Sie kontrollieren, persönliche Profile zuweisen.',
      profileAssignNotOwned:
        'Sie können Ihre eigenen Profile nur den von Ihnen kontrollierten Token zuweisen. Profil <strong>{id}</strong> gehört einem anderen Spieler.',
      profileCreationModeInvalid:
        'Ungültiger Profilerstellungsmodus. Gültig: nur für GM, von GM genehmigt, für alle Benutzer.',
      profileReviewGmOnly: 'Nur der GM kann ausstehende Entwürfe überprüfen.',
      profileApproveGmOnly: 'Nur der GM kann Profilentwürfe genehmigen.',
      profileRejectGmOnly: 'Nur der GM kann Profilentwürfe ablehnen.',
      invalidAnimSet: 'Der Animationssatz muss lauten: Norden oder Süden.',
      invalidSideNumber: 'Die Seitenzahl muss eine positive Ganzzahl sein (1 oder größer).',
      noDrafts: 'Keine ausstehenden Profilentwürfe.',
      profileDraftConflict:
        'Ein ausstehender Entwurf für <strong>{id}</strong> existiert bereits und gehört einem anderen Spieler.',
      profileDraftNotGmApproved:
        'Entwurfseinreichungen sind nur verfügbar, wenn der Profilerstellungsmodus <code>gm-approved</code> ist.',
      profileApproveConflict:
        'Ein aktives Profil mit dem Namen <strong>{id}</strong> ist bereits vorhanden. Löschen Sie es zuerst, bevor Sie diesen Entwurf genehmigen.',
      macroExists: 'Ein Makro mit dem Namen „<strong>{name}</strong>“ ist bereits vorhanden.',
      simonUnknown:
        'Simon weiß nicht, wie man: <em>{command}</em><br><br>Versuchen Sie: <code>!simon sagt „Verschieben n“</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> steht nun <strong>{direction}</strong> gegenüber.',
      stateSet:
        'Der Status von <strong>{token}</strong> ist auf <strong>{state}</strong> festgelegt.',
      actionSet:
        '<strong>{token}</strong> Aktion: <strong>{action}</strong> → Status: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> ist <strong>{token}</strong> zugewiesen.',
      profileRemoved: 'Profil aus <strong>{token}</strong> entfernt.',
      profileCreated: 'Profil <strong>{id}</strong> erstellt.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → Seite {number}.',
      profileRenamed: 'Profil <strong>{id}</strong> wurde in <strong>{name}</strong> umbenannt.',
      profileDeleted: 'Profil <strong>{id}</strong> gelöscht.',
      profileDraftSubmitted:
        'Entwurf für Profil <strong>{id}</strong> zur GM-Genehmigung eingereicht.',
      profileDraftApproved:
        'Profilentwurf <strong>{id}</strong> genehmigt und zu aktiven Profilen hinzugefügt.',
      profileDraftRejected: 'Der Profilentwurf <strong>{id}</strong> wurde abgelehnt.',
      macroInstalled:
        'Das globale Makro „<strong>{name}</strong>“ wurde erstellt und ist für alle Spieler sichtbar.',
      configUpdated: 'Einstellungen aktualisiert.',
      settingsReset: '<strong>Einstellungen auf Werkseinstellungen zurückgesetzt.</strong>',
      langSet: 'Die Sprache ist auf {locale} festgelegt.',
    },
    settings: {
      gridSize: 'Rastergröße',
      gridSizeDesc: '{size}px pro Quadrat',
      moveDistance: 'Distanz verschieben',
      moveDistanceDesc: '{squares} Quadrat(e) – {pixels}px pro Zug',
      autoFace: 'Auto-Face bei Bewegung',
      humour: 'Humor (Ostereier)',
      language: 'Sprache',
      profileCreationMode: 'Profilerstellungsmodus',
      on: 'An',
      off: 'Aus',
    },
    profiles: {
      none: 'Es sind keine animierten Tokenprofile konfiguriert.',
      noProfile: 'Dem ausgewählten Token ist kein Profil zugewiesen.',
      id: 'Profil-ID',
      displayName: 'Anzeigename',
      mappedStates: 'Kartierte Staaten',
      noneValue: '(keiner)',
      personal: 'persönlich',
      owner: 'Eigentümer',
      submittedBy: 'eingereicht von',
      approveHint:
        'Verwenden Sie !adam --profile genehmigen &lt;id&gt; zum Genehmigen oder ablehnen &lt;id&gt; zum Ablehnen.',
    },
    menu: {
      title: 'ADAM. Kontrolldeck',
      movement: 'Bewegung',
      facing: 'Gegenüber',
      state: 'Zustand',
      stateLabel: 'Zustand',
      facingLabel: 'Gegenüber',
      profileLabel: 'Profil',
      noProfile: 'Kein Profil',
      help: 'Helfen',
      config: 'Konfig',
      states: {
        idle: 'Leerlauf',
        combat: 'Kampf',
        walk: 'Gehen',
        dash: 'Bindestrich',
        sneak: 'Schleichen',
        rage: 'Wut',
        spellcasting: 'Zauberspruch',
        help: 'Helfen',
      },
    },
    info: {
      subtitle: 'Animierte Richtung und Bewegung',
      versionLabel: 'Version',
      updatedLabel: 'Aktualisiert',
      creditsBody:
        'A.D.A.M.<br>Animierte Richtung und Bewegung<br><br>Unterstützt von SIMON.<br>Auf jeden Fall nicht Simon genannt.',
      ready: 'MOD BEREIT',
    },
    easter: {
      toTheLeft: 'Nach links, nach links...',
      notGoingAnywhere: 'ADAM. hat festgestellt, dass Sie eigentlich nirgendwo hingehen.',
      areWeThereYet: 'Sind wir schon da?',
      sneakSpam:
        'Niemand hat dich gesehen.<br>Niemand hat dich gesehen.<br>Niemand hat dich gesehen.',
      helpSpam: 'Wer ist eine gute Eule?',
      rageRage: 'Dorn würde zustimmen.',
      simonResponse: '...und nenn mich nicht Simon!',
      simonNoSays: 'Simon sagt was?',
      versionEgg: 'ADAM. v{version}<br><br>Definitiv nicht SIMON.',
    },
  };

  const TRANSLATION$d = {
    titles: {
      error: 'Σφάλμα',
      noTokenSelected: 'Δεν έχει επιλεγεί διακριτικό',
      tokenError: 'Σφάλμα διακριτικού',
      missingDirection: 'Λείπει η κατεύθυνση',
      invalidDirection: 'Μη έγκυρη κατεύθυνση',
      missingState: 'Πολιτεία που λείπει',
      invalidState: 'Μη έγκυρη κατάσταση',
      missingAction: 'Δράση που λείπει',
      invalidAction: 'Μη έγκυρη ενέργεια',
      accessDenied: 'Δεν επιτρέπεται η πρόσβαση',
      invalidValue: 'Μη έγκυρη τιμή',
      unknownCommand: 'Άγνωστη Εντολή',
      moveError: 'Σφάλμα μετακίνησης',
      macroExists: 'Μακροεντολή Υπάρχει',
      macroInstalled: 'Εγκατεστημένη μακροεντολή',
      invalidUsage: 'Μη έγκυρη χρήση',
      profileAssigned: 'Εκχωρήθηκε προφίλ',
      profileRemoved: 'Το προφίλ καταργήθηκε',
      unknownProfile: 'Άγνωστο προφίλ',
      configuration: 'Διαμόρφωση',
      settingsReset: 'Επαναφορά ρυθμίσεων',
      scriptReady: 'Έτοιμο σενάριο',
      versionInfo: 'Πληροφορίες έκδοσης',
      creditsTitle: 'Πιστώσεις',
      adamsMenu: 'ΑΔΑΜ. Κατάστρωμα ελέγχου',
      adamsHelp: 'ΑΔΑΜ. Βοήθεια',
      adamsSettings: 'ΑΔΑΜ. Ρυθμίσεις',
      profiles: 'Διαμορφωμένα προφίλ',
      tokenProfile: 'Token Προφίλ',
      success: 'Επιτυχία',
      langSet: 'Σύνολο γλώσσας',
      langInvalid: 'Μη έγκυρη γλώσσα',
      profileCreated: 'Δημιουργήθηκε προφίλ',
      profileUpdated: 'Το προφίλ ενημερώθηκε',
      profileDeleted: 'Το προφίλ διαγράφηκε',
      profileRenamed: 'Το προφίλ μετονομάστηκε',
      draftSubmitted: 'Το προσχέδιο υποβλήθηκε',
      draftApproved: 'Εγκρίθηκε το σχέδιο',
      draftRejected: 'Το σχέδιο απορρίφθηκε',
      pendingDrafts: 'Προσχέδια προφίλ σε εκκρεμότητα',
      profileCreationMode: 'Λειτουργία δημιουργίας προφίλ',
      draftNotification: 'Εκκρεμεί το προσχέδιο προφίλ',
    },
    errors: {
      noTokenSelected:
        'Δεν έχει επιλεγεί διακριτικό. Επιλέξτε πρώτα ένα διακριτικό και μετά κάντε κλικ σε ένα κουμπί κατεύθυνσης.',
      noTokenSelectedStill: 'Ακόμα δεν έχει επιλεγεί διακριτικό.',
      noTokenSelectedPersistent: 'Θαυμάζω την επιμονή σου. Επιλέξτε πρώτα ένα διακριτικό.',
      tokenNotFound: 'Δεν ήταν δυνατή η εύρεση του επιλεγμένου διακριτικού.',
      missingDirection:
        'Δώστε μια κατεύθυνση. Παράδειγμα: <code>!adam --move n</code><br><em>Οδηγίες: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Άγνωστη κατεύθυνση: <strong>{value}</strong><br><br>Ισχύει: n, ne, e, se, s, sw, w, nw (ή πλήρη ονόματα όπως βόρεια, βορειοανατολικά)',
      missingState: 'Καταχωρίστε μια κατάσταση.<br>Ισχύει: {states}',
      invalidState: 'Άγνωστη κατάσταση: <strong>{value}</strong><br><br>Ισχύει: {states}',
      missingAction:
        'Δώστε μια ενέργεια. Παραδείγματα: βοήθεια, ξόρκι, οργή, παύλα, sneak, αδράνεια, μάχη',
      invalidAction:
        'Άγνωστη ενέργεια: <strong>{value}</strong><br><br>Γνωστές ενέργειες: {actions}',
      accessDeniedConfig: 'Οι αλλαγές διαμόρφωσης περιορίζονται στο GM.',
      accessDeniedProfileAssign: 'Η εκχώρηση προφίλ περιορίζεται στο GM.',
      accessDeniedProfileRemove: 'Η αφαίρεση προφίλ περιορίζεται στο GM.',
      accessDeniedMacro: 'Η εγκατάσταση μακροεντολής περιορίζεται στο GM.',
      accessDeniedReset: 'Η επαναφορά ρυθμίσεων περιορίζεται στο GM.',
      unknownCommand:
        'Άγνωστη εντολή. Δοκιμάστε το <code>!adam --help</code> για μια λίστα με τις διαθέσιμες εντολές.',
      moveFailed: 'Η κίνηση απέτυχε.',
      gridSizeInvalid:
        'Το μέγεθος του πλέγματος πρέπει να είναι ένας ακέραιος αριθμός μεταξύ 10 και 1000 (pixel).',
      moveDistanceInvalid:
        'Η απόσταση μετακίνησης πρέπει να είναι ακέραιος μεταξύ 1 και 20 (τετράγωνα).',
      autoFaceInvalid: 'Η αυτόματη ονομαστική τιμή πρέπει να είναι: ενεργοποίηση ή απενεργοποίηση.',
      humourInvalid: 'Η τιμή του χιούμορ πρέπει να είναι: ενεργοποιημένη ή απενεργοποιημένη.',
      langInvalid: 'Μη έγκυρη τοπική ρύθμιση. Υποστηρίζεται: {locales}',
      profileUsage:
        'Χρήση: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Χρήση: <code>!adam --profile εκχώρηση &lt;profileId&gt;</code>',
      profileUnknown:
        'Το προφίλ <strong>{id}</strong> δεν υπάρχει. Χρησιμοποιήστε τη λίστα <code>!adam --profile</code> για να δείτε τα διαθέσιμα προφίλ.',
      profileUnknownSub:
        'Άγνωστη υποεντολή προφίλ: <strong>{sub}</strong><br><br>Ισχύει: λίστα, εμφάνιση, δημιουργία, πλευρά επεξεργασίας, μετονομασία, διαγραφή, εκχώρηση, αφαίρεση, πρόχειρο, σχέδιο, έλεγχος, έγκριση, απόρριψη',
      profileIdInvalid:
        'Μη έγκυρο αναγνωριστικό προφίλ: <strong>{id}</strong>. Χρησιμοποιήστε μόνο γράμματα, αριθμούς, παύλες και κάτω παύλες (έως 50 χαρακτήρες).',
      profileAlreadyExists:
        'Το προφίλ <strong>{id}</strong> υπάρχει ήδη. Χρησιμοποιήστε το <code>!adam --profile edit-side</code> για να το τροποποιήσετε ή να το διαγράψετε πρώτα.',
      profileNotFound: 'Το προφίλ <strong>{id}</strong> δεν βρέθηκε.',
      profileCreateUsage:
        'Χρήση: <code>!adam --profile δημιουργία &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Χρήση: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Χρήση: <code>!adam --profile μετονομασία &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Χρήση: <code>!adam --profile διαγραφή &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Χρήση: <code>!adam --profile πρόχειρο &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Χρήση: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Δεν βρέθηκε πρόχειρο σε εκκρεμότητα για <strong>{id}</strong>. Υποβάλετε ένα με <code>!adam --profile πρόχειρο</code>.',
      profileGmOnly: 'Η δημιουργία προφίλ περιορίζεται στη GM.',
      profileEditGmOnly: 'Η τροποποίηση αυτού του προφίλ περιορίζεται στο GM.',
      profileDeleteGmOnly: 'Η διαγραφή αυτού του προφίλ περιορίζεται στο GM.',
      profileGlobalReadOnly:
        'Το προφίλ <strong>{id}</strong> είναι ένα παγκόσμιο προφίλ και μπορεί να τροποποιηθεί μόνο από την GM.',
      profileNotOwned:
        'Δεν σας ανήκει το προφίλ <strong>{id}</strong> και δεν μπορείτε να το τροποποιήσετε.',
      profileModeRequiresDraft:
        'Η δημιουργία προφίλ απαιτεί έγκριση της GM σε αυτό το παιχνίδι. Χρησιμοποιήστε το <code>!adam --profile πρόχειρο &lt;id&gt; &lt;name&gt;</code> για να υποβάλετε ένα πρόχειρο.',
      profileAssignNoControl:
        'Μπορείτε να εκχωρήσετε προσωπικά προφίλ μόνο σε διακριτικά που ελέγχετε.',
      profileAssignNotOwned:
        'Μπορείτε να εκχωρήσετε τα δικά σας προφίλ μόνο σε διακριτικά που ελέγχετε. Το προφίλ <strong>{id}</strong> ανήκει σε άλλο παίκτη.',
      profileCreationModeInvalid:
        'Μη έγκυρη λειτουργία δημιουργίας προφίλ. Ισχύει: μόνο για gm, εγκεκριμένο από gm, για όλους τους χρήστες.',
      profileReviewGmOnly: 'Μόνο ο GM μπορεί να ελέγξει τα εκκρεμή προσχέδια.',
      profileApproveGmOnly: 'Μόνο ο GM μπορεί να εγκρίνει προσχέδια προφίλ.',
      profileRejectGmOnly: 'Μόνο ο GM μπορεί να απορρίψει προσχέδια προφίλ.',
      invalidAnimSet: 'Το σετ κινουμένων σχεδίων πρέπει να είναι: βόρεια ή νότια.',
      invalidSideNumber: 'Ο πλευρικός αριθμός πρέπει να είναι θετικός ακέραιος (1 ή μεγαλύτερος).',
      noDrafts: 'Δεν υπάρχουν εκκρεμή προσχέδια προφίλ.',
      profileDraftConflict:
        'Ένα εκκρεμές προσχέδιο για το <strong>{id}</strong> υπάρχει ήδη και ανήκει σε άλλον παίκτη.',
      profileDraftNotGmApproved:
        'Οι υποβολές πρόχειρων είναι διαθέσιμες μόνο όταν η λειτουργία δημιουργίας προφίλ είναι <code>εγκεκριμένη από το gm</code>.',
      profileApproveConflict:
        'Υπάρχει ήδη ένα ενεργό προφίλ με το όνομα <strong>{id}</strong>. Διαγράψτε το πρώτα πριν εγκρίνετε αυτό το προσχέδιο.',
      macroExists: 'Υπάρχει ήδη μια μακροεντολή με το όνομα "<strong>{name}</strong>".',
      simonUnknown:
        'Ο Simon δεν ξέρει πώς να: <em>{command}</em><br><br>Δοκιμάστε: <code>!Simon λέει μετακίνηση n</code>',
    },
    confirm: {
      facing: 'Το <strong>{token}</strong> αντιμετωπίζει τώρα το <strong>{direction}</strong>.',
      stateSet: 'Η κατάσταση <strong>{token}</strong> ορίστηκε σε <strong>{state}</strong>.',
      actionSet:
        'Ενέργεια <strong>{token}</strong>: <strong>{action}</strong> → κατάσταση: <strong>{state}</strong>.',
      profileAssigned: 'Το προφίλ <strong>{id}</strong> εκχωρήθηκε σε <strong>{token}</strong>.',
      profileRemoved: 'Το προφίλ καταργήθηκε από το <strong>{token}</strong>.',
      profileCreated: 'Δημιουργήθηκε το προφίλ <strong>{id}</strong>.',
      profileSideSet: 'Προφίλ <strong>{id}</strong>: {state}/{animSet} → πλευρά {number}.',
      profileRenamed: 'Το προφίλ <strong>{id}</strong> μετονομάστηκε σε <strong>{name}</strong>.',
      profileDeleted: 'Το προφίλ <strong>{id}</strong> διαγράφηκε.',
      profileDraftSubmitted:
        'Το προσχέδιο για το προφίλ <strong>{id}</strong> υποβλήθηκε για έγκριση της GM.',
      profileDraftApproved:
        'Το πρόχειρο προφίλ <strong>{id}</strong> εγκρίθηκε και προστέθηκε στα ενεργά προφίλ.',
      profileDraftRejected: 'Το πρόχειρο προφίλ <strong>{id}</strong> απορρίφθηκε.',
      macroInstalled:
        "Η παγκόσμια μακροεντολή '<strong>{name}</strong>' έχει δημιουργηθεί και είναι ορατή σε όλους τους παίκτες.",
      configUpdated: 'Οι ρυθμίσεις ενημερώθηκαν.',
      settingsReset: '<strong>Επαναφορά ρυθμίσεων στις εργοστασιακές προεπιλογές.</strong>',
      langSet: 'Η γλώσσα ορίστηκε σε {locale}.',
    },
    settings: {
      gridSize: 'Μέγεθος Πλέγματος',
      gridSizeDesc: '{size}px ανά τετράγωνο',
      moveDistance: 'Μετακίνηση απόστασης',
      moveDistanceDesc: '{squares} τετράγωνα — {pixels}px ανά κίνηση',
      autoFace: 'Αυτόματο πρόσωπο σε κίνηση',
      humour: 'Χιούμορ (πασχαλινά αυγά)',
      language: 'Γλώσσα',
      profileCreationMode: 'Λειτουργία δημιουργίας προφίλ',
      on: 'Επί',
      off: 'Μακριά από',
    },
    profiles: {
      none: 'Δεν έχουν διαμορφωθεί κινούμενα προφίλ διακριτικών.',
      noProfile: 'Το επιλεγμένο διακριτικό δεν έχει εκχωρηθεί προφίλ.',
      id: 'Αναγνωριστικό προφίλ',
      displayName: 'Εμφανιζόμενο όνομα',
      mappedStates: 'Χαρτογραφημένες Πολιτείες',
      noneValue: '(κανένας)',
      personal: 'προσωπικός',
      owner: 'Ιδιοκτήτης',
      submittedBy: 'υποβλήθηκε από',
      approveHint:
        'Χρησιμοποιήστε το !adam --profile έγκριση &lt;id&gt; για έγκριση ή απόρριψη &lt;id&gt; για απόρριψη.',
    },
    menu: {
      title: 'ΑΔΑΜ. Κατάστρωμα ελέγχου',
      movement: 'Κίνηση',
      facing: 'Αντιμέτωπος',
      state: 'Κατάσταση',
      stateLabel: 'Κατάσταση',
      facingLabel: 'Αντιμέτωπος',
      profileLabel: 'Προφίλ',
      noProfile: 'Χωρίς προφίλ',
      help: 'Βοήθεια',
      config: 'Διαμόρφωση',
      states: {
        idle: 'Αεργος',
        combat: 'Μάχη',
        walk: 'Βόλτα',
        dash: 'Παύλα',
        sneak: 'Ερπω',
        rage: 'Οργή',
        spellcasting: 'Ορθογραφία',
        help: 'Βοήθεια',
      },
    },
    info: {
      subtitle: 'Κινούμενα σχέδια σκηνοθεσίας και κίνησης',
      versionLabel: 'Εκδοχή',
      updatedLabel: 'Ενημερώθηκε',
      creditsBody:
        'A.D.A.M.<br>Animated Direction And Movement<br><br>Powered by SIMON.<br>Σίγουρα δεν ονομάζεται Simon.',
      ready: 'MOD READY',
    },
    easter: {
      toTheLeft: 'Αριστερά, αριστερά...',
      notGoingAnywhere: 'ΑΔΑΜ. έχει αποφασίσει ότι στην πραγματικότητα δεν θα πάτε πουθενά.',
      areWeThereYet: 'Είμαστε ακόμα εκεί;',
      sneakSpam: 'Κανείς δεν σε έχει δει.<br>Κανείς δεν σε έχει δει.<br>Κανείς δεν σε έχει δει.',
      helpSpam: 'Ποιος είναι μια καλή κουκουβάγια;',
      rageRage: 'Ο Ντορν θα το ενέκρινε.',
      simonResponse: '...και μη με λες Σάιμον!',
      simonNoSays: 'Τι λέει ο Σάιμον;',
      versionEgg: 'ΑΔΑΜ. v{version}<br><br>Σίγουρα όχι SIMON.',
    },
  };

  const TRANSLATION$c = {
    titles: {
      error: 'שְׁגִיאָה',
      noTokenSelected: 'לא נבחר אסימון',
      tokenError: 'שגיאת אסימון',
      missingDirection: 'כיוון חסר',
      invalidDirection: 'כיוון לא חוקי',
      missingState: 'מצב חסר',
      invalidState: 'מדינה לא חוקית',
      missingAction: 'פעולה חסרה',
      invalidAction: 'פעולה לא חוקית',
      accessDenied: 'הגִישָׁה נִדחֲתָה',
      invalidValue: 'ערך לא חוקי',
      unknownCommand: 'פקודה לא ידועה',
      moveError: 'שגיאת העברה',
      macroExists: 'מאקרו קיים',
      macroInstalled: 'מאקרו מותקן',
      invalidUsage: 'שימוש לא חוקי',
      profileAssigned: 'פרופיל הוקצה',
      profileRemoved: 'הפרופיל הוסר',
      unknownProfile: 'פרופיל לא ידוע',
      configuration: 'תְצוּרָה',
      settingsReset: 'איפוס הגדרות',
      scriptReady: 'תסריט מוכן',
      versionInfo: 'פרטי גרסה',
      creditsTitle: 'קרדיטים',
      adamsMenu: 'אָדָם רִאשׁוֹן. סיפון בקרה',
      adamsHelp: 'אָדָם רִאשׁוֹן. עֶזרָה',
      adamsSettings: 'אָדָם רִאשׁוֹן. הגדרות',
      profiles: 'פרופילים מוגדרים',
      tokenProfile: 'פרופיל אסימון',
      success: 'הַצלָחָה',
      langSet: 'סט שפה',
      langInvalid: 'שפה לא חוקית',
      profileCreated: 'פרופיל נוצר',
      profileUpdated: 'הפרופיל עודכן',
      profileDeleted: 'הפרופיל נמחק',
      profileRenamed: 'שם הפרופיל שונה',
      draftSubmitted: 'הטיוטה הוגשה',
      draftApproved: 'הטיוטה אושרה',
      draftRejected: 'הטיוטה נדחתה',
      pendingDrafts: 'טיוטות פרופיל ממתינות',
      profileCreationMode: 'מצב יצירת פרופיל',
      draftNotification: 'טיוטת פרופיל בהמתנה',
    },
    errors: {
      noTokenSelected: 'לא נבחר אסימון. אנא בחר תחילה אסימון ולאחר מכן לחץ על לחצן כיוון.',
      noTokenSelectedStill: 'עדיין לא נבחר אסימון.',
      noTokenSelectedPersistent: 'אני מעריץ את ההתמדה שלך. תחילה בחר אסימון.',
      tokenNotFound: 'האסימון שנבחר לא נמצא.',
      missingDirection:
        'אנא ספק כיוון. דוגמה: <code>!adam --move n</code><br><em>כיוונים: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'כיוון לא ידוע: <strong>{value}</strong><br><br>תקף: n, ne, e, se, s, sw, w, nw (או שמות מלאים כגון צפון, צפון מזרח)',
      missingState: 'אנא ספק מצב.<br>תקף: {states}',
      invalidState: 'מצב לא ידוע: <strong>{value}</strong><br><br>תקף: {states}',
      missingAction: 'אנא ספק פעולה. דוגמאות: עזרה, קסם, זעם, מקף, התגנבות, סרק, קרב',
      invalidAction: 'פעולה לא ידועה: <strong>{value}</strong><br><br>פעולות ידועות: {actions}',
      accessDeniedConfig: 'שינויים בתצורה מוגבלים ל-GM.',
      accessDeniedProfileAssign: 'הקצאת פרופיל מוגבלת ל-GM.',
      accessDeniedProfileRemove: 'הסרת פרופיל מוגבלת ל-GM.',
      accessDeniedMacro: 'התקנת מאקרו מוגבלת ל-GM.',
      accessDeniedReset: 'איפוס ההגדרות מוגבל ל-GM.',
      unknownCommand:
        'פקודה לא ידועה. נסה את <code>!adam --help</code> לקבלת רשימה של פקודות זמינות.',
      moveFailed: 'התנועה נכשלה.',
      gridSizeInvalid: 'גודל הרשת חייב להיות מספר שלם בין 10 ל-1000 (פיקסלים).',
      moveDistanceInvalid: 'מרחק התנועה חייב להיות מספר שלם בין 1 ל-20 (ריבועים).',
      autoFaceInvalid: 'ערך הנקוב האוטומטי חייב להיות: מופעל או כבוי.',
      humourInvalid: 'ערך ההומור חייב להיות: מופעל או כבוי.',
      langInvalid: 'מקום לא חוקי. נתמך: {locales}',
      profileUsage:
        'שימוש: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'שימוש: <code>!adam --profile הקצה &lt;profileId&gt;</code>',
      profileUnknown:
        'הפרופיל <strong>{id}</strong> אינו קיים. השתמש ב-<code>!adam --profile list</code> כדי לראות פרופילים זמינים.',
      profileUnknownSub:
        'פקודת משנה של פרופיל לא ידוע: <strong>{sub}</strong><br><br>תקף: רשימה, הצג, צור, צד ערוך, שנה שם, מחק, הקצה, הסר, טיוטה, צד טיוטה, סקירה, אישור, דחה',
      profileIdInvalid:
        'מזהה פרופיל לא חוקי: <strong>{id}</strong>. השתמש רק באותיות, מספרים, מקפים וקווים תחתונים (מקסימום 50 תווים).',
      profileAlreadyExists:
        'הפרופיל <strong>{id}</strong> כבר קיים. השתמש ב-<code>!adam --profile edit-side</code> כדי לשנות אותו, או למחוק אותו תחילה.',
      profileNotFound: 'הפרופיל <strong>{id}</strong> לא נמצא.',
      profileCreateUsage:
        'שימוש: <code>!adam --profile צור &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'שימוש: <code>!adam --profile צד עריכה &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'שימוש: <code>!adam --profile שנה שם &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'שימוש: <code>!adam --profile מחק &lt;profileId&gt;</code>',
      profileDraftUsage:
        'שימוש: <code>!adam --profile טיוטה &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'שימוש: <code>!adam --profile צד הטיוטה &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'לא נמצאה טיוטה ממתינה עבור <strong>{id}</strong>. שלח אחד עם <code>!adam --profile טיוטה</code>.',
      profileGmOnly: 'יצירת פרופיל מוגבלת ל-GM.',
      profileEditGmOnly: 'שינוי פרופיל זה מוגבל ל-GM.',
      profileDeleteGmOnly: 'מחיקת פרופיל זה מוגבלת ל-GM.',
      profileGlobalReadOnly:
        'הפרופיל <strong>{id}</strong> הוא פרופיל גלובלי וניתן לשנותו רק על ידי ה-GM.',
      profileNotOwned: 'אין לך פרופיל <strong>{id}</strong> ואינך יכול לשנות אותו.',
      profileModeRequiresDraft:
        'יצירת פרופיל דורשת אישור GM במשחק הזה. השתמש ב-<code>!adam --profile טיוטה &lt;id&gt; &lt;name&gt;</code> כדי לשלוח טיוטה.',
      profileAssignNoControl: 'אתה יכול להקצות פרופילים אישיים רק לאסימונים שאתה שולט בהם.',
      profileAssignNotOwned:
        'אתה יכול להקצות את הפרופילים שלך רק לאסימונים שאתה שולט בהם. הפרופיל <strong>{id}</strong> שייך לשחקן אחר.',
      profileCreationModeInvalid:
        'מצב יצירת פרופיל לא חוקי. תקף: gm בלבד, gm-approved, כל המשתמשים.',
      profileReviewGmOnly: 'רק ה-GM יכול לבדוק טיוטות ממתינות.',
      profileApproveGmOnly: 'רק ה-GM יכול לאשר טיוטות פרופיל.',
      profileRejectGmOnly: 'רק ה-GM יכול לדחות טיוטות פרופיל.',
      invalidAnimSet: 'סט הנפשה חייב להיות: צפון או דרום.',
      invalidSideNumber: 'מספר צד חייב להיות מספר שלם חיובי (1 או יותר).',
      noDrafts: 'אין טיוטות פרופיל ממתינות.',
      profileDraftConflict: 'טיוטה ממתינה עבור <strong>{id}</strong> כבר קיימת ושייכת לשחקן אחר.',
      profileDraftNotGmApproved:
        'הגשת טיוטות זמינות רק כאשר מצב יצירת הפרופיל <code>מאושר על ידי gm</code>.',
      profileApproveConflict:
        'פרופיל פעיל בשם <strong>{id}</strong> כבר קיים. מחק אותו תחילה לפני אישור הטיוטה הזו.',
      macroExists: "מאקרו בשם '<strong>{name}</strong>' כבר קיים.",
      simonUnknown:
        'סיימון לא יודע איך: <em>{command}</em><br><br>נסה: <code>!סיימון אומר להעביר n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> מתמודד כעת עם <strong>{direction}</strong>.',
      stateSet: 'מצב <strong>{token}</strong> מוגדר ל<strong>{state}</strong>.',
      actionSet:
        'פעולה <strong>{token}</strong>: <strong>{action}</strong> → מצב: <strong>{state}</strong>.',
      profileAssigned: 'הפרופיל <strong>{id}</strong> הוקצה ל-<strong>{token}</strong>.',
      profileRemoved: 'הפרופיל הוסר מ-<strong>{token}</strong>.',
      profileCreated: 'הפרופיל <strong>{id}</strong> נוצר.',
      profileSideSet: 'פרופיל <strong>{id}</strong>: {state}/{animSet} → צד {number}.',
      profileRenamed: 'שם הפרופיל <strong>{id}</strong> שונה ל<strong>{name}</strong>.',
      profileDeleted: 'הפרופיל <strong>{id}</strong> נמחק.',
      profileDraftSubmitted: 'טיוטה לפרופיל <strong>{id}</strong> הוגשה לאישור GM.',
      profileDraftApproved: 'טיוטת הפרופיל <strong>{id}</strong> אושרה ונוספה לפרופילים פעילים.',
      profileDraftRejected: 'טיוטת הפרופיל <strong>{id}</strong> נדחתה.',
      macroInstalled: "המאקרו הגלובלי '<strong>{name}</strong>' נוצר והוא גלוי לכל השחקנים.",
      configUpdated: 'ההגדרות עודכנו.',
      settingsReset: '<strong>ההגדרות אופסו לברירות המחדל של היצרן.</strong>',
      langSet: 'השפה מוגדרת ל-{locale}.',
    },
    settings: {
      gridSize: 'גודל רשת',
      gridSizeDesc: '{size}px לכל ריבוע',
      moveDistance: 'הזז מרחק',
      moveDistanceDesc: '{squares} ריבוע(ים) - {pixels}px לכל מהלך',
      autoFace: 'פנים אוטומטית בתנועה',
      humour: 'הומור (ביצי פסחא)',
      language: 'שָׂפָה',
      profileCreationMode: 'מצב יצירת פרופיל',
      on: 'עַל',
      off: 'כבוי',
    },
    profiles: {
      none: 'לא מוגדרים פרופילי אסימון מונפש.',
      noProfile: 'לאסימון שנבחר לא הוקצה פרופיל.',
      id: 'מזהה פרופיל',
      displayName: 'שם תצוגה',
      mappedStates: 'מדינות ממופות',
      noneValue: '(אַף לֹא אֶחָד)',
      personal: 'אִישִׁי',
      owner: 'בַּעַל',
      submittedBy: 'הוגש על ידי',
      approveHint:
        'השתמש ב-!adam --profile לאשר &lt;id&gt; כדי לאשר או לדחות את &lt;id&gt; כדי לדחות.',
    },
    menu: {
      title: 'אָדָם רִאשׁוֹן. סיפון בקרה',
      movement: 'תְנוּעָה',
      facing: 'מוּל',
      state: 'מְדִינָה',
      stateLabel: 'מְדִינָה',
      facingLabel: 'מוּל',
      profileLabel: 'פּרוֹפִיל',
      noProfile: 'אין פרופיל',
      help: 'עֶזרָה',
      config: 'Config',
      states: {
        idle: 'לְהִתְבַּטֵל',
        combat: 'לְחִימָה',
        walk: 'לָלֶכֶת',
        dash: 'לְזַנֵק',
        sneak: 'לְהִתְגַנֵב',
        rage: 'זַעַם',
        spellcasting: 'יציאת איות',
        help: 'עֶזרָה',
      },
    },
    info: {
      subtitle: 'בימוי ותנועה אנימציה',
      versionLabel: 'גִרְסָה',
      updatedLabel: 'מְעוּדכָּן',
      creditsBody:
        'A.D.A.M.<br>כיוון ותנועה מונפשת<br><br>מופעל על ידי SIMON.<br>בהחלט לא נקרא סיימון.',
      ready: 'MOD מוכן',
    },
    easter: {
      toTheLeft: 'שמאלה, שמאלה...',
      notGoingAnywhere: 'אָדָם רִאשׁוֹן. קבע שאתה לא הולך לשום מקום.',
      areWeThereYet: 'אנחנו כבר שם?',
      sneakSpam: 'אף אחד לא ראה אותך.<br>אף אחד לא ראה אותך.<br>אף אחד לא ראה אותך.',
      helpSpam: 'מי ינשוף טוב?',
      rageRage: 'דורן היה מאשר.',
      simonResponse: '...ואל תקרא לי סיימון!',
      simonNoSays: 'סיימון אומר מה?',
      versionEgg: 'אָדָם רִאשׁוֹן. v{version}<br><br>בהחלט לא SIMON.',
    },
  };

  const TRANSLATION$b = {
    titles: {
      error: 'Hiba',
      noTokenSelected: 'Nincs kiválasztva token',
      tokenError: 'Token hiba',
      missingDirection: 'Hiányzó Irány',
      invalidDirection: 'Érvénytelen irány',
      missingState: 'Hiányzó állam',
      invalidState: 'Érvénytelen állam',
      missingAction: 'Hiányzó akció',
      invalidAction: 'Érvénytelen művelet',
      accessDenied: 'Hozzáférés megtagadva',
      invalidValue: 'Érvénytelen érték',
      unknownCommand: 'Ismeretlen parancs',
      moveError: 'Mozgatási hiba',
      macroExists: 'Makró létezik',
      macroInstalled: 'Makró telepítve',
      invalidUsage: 'Érvénytelen használat',
      profileAssigned: 'Profil hozzárendelve',
      profileRemoved: 'Profil eltávolítva',
      unknownProfile: 'Ismeretlen profil',
      configuration: 'Konfiguráció',
      settingsReset: 'Beállítások visszaállítása',
      scriptReady: 'Szkript kész',
      versionInfo: 'Verzió információ',
      creditsTitle: 'Kredit',
      adamsMenu: 'ÁDÁM. Control Deck',
      adamsHelp: 'ÁDÁM. Segítség',
      adamsSettings: 'ÁDÁM. Beállítások elemre',
      profiles: 'Konfigurált profilok',
      tokenProfile: 'Token profil',
      success: 'Siker',
      langSet: 'Nyelv beállítása',
      langInvalid: 'Érvénytelen nyelv',
      profileCreated: 'Profil létrehozva',
      profileUpdated: 'Profil frissítve',
      profileDeleted: 'Profil törölve',
      profileRenamed: 'Profil átnevezve',
      draftSubmitted: 'Vázlat benyújtva',
      draftApproved: 'Tervezet jóváhagyva',
      draftRejected: 'Tervezet elutasítva',
      pendingDrafts: 'Függőben lévő profilvázlatok',
      profileCreationMode: 'Profil létrehozási mód',
      draftNotification: 'Profilvázlat függőben',
    },
    errors: {
      noTokenSelected:
        'Nincs kiválasztva token. Kérjük, először válasszon ki egy tokent, majd kattintson az irányjelző gombra.',
      noTokenSelectedStill: 'Még mindig nincs kiválasztva token.',
      noTokenSelectedPersistent: 'Csodálom a kitartásodat. Először válasszon ki egy tokent.',
      tokenNotFound: 'A kiválasztott token nem található.',
      missingDirection:
        'Kérjük, adjon irányt. Példa: <code>!adam --move n</code><br><em>Útvonal: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Ismeretlen irány: <strong>{value}</strong><br><br>Érvényes: n, ne, e, se, s, sw, w, nw (vagy teljes nevek, például észak, északkelet)',
      missingState: 'Adjon meg egy állapotot.<br>Érvényes: {states}',
      invalidState: 'Ismeretlen állapot: <strong>{value}</strong><br><br>Érvényes: {states}',
      missingAction:
        'Adjon meg egy műveletet. Példák: segítség, varázslat, düh, csapás, besurranás, tétlenség, harc',
      invalidAction:
        'Ismeretlen művelet: <strong>{value}</strong><br><br>Ismert műveletek: {actions}',
      accessDeniedConfig: 'Configuration changes are restricted to the GM.',
      accessDeniedProfileAssign: 'A profil hozzárendelése a GM-re korlátozódik.',
      accessDeniedProfileRemove: 'A profil eltávolítása a GM-re korlátozódik.',
      accessDeniedMacro: 'A makró telepítése a GM-re korlátozódik.',
      accessDeniedReset: 'A beállítások visszaállítása a GM-re korlátozódik.',
      unknownCommand:
        'Ismeretlen parancs. Az elérhető parancsok listájához próbálja ki az <code>!adam --help</code> parancsot.',
      moveFailed: 'A mozgás nem sikerült.',
      gridSizeInvalid: 'A rács méretének 10 és 1000 (pixel) közötti egész számnak kell lennie.',
      moveDistanceInvalid:
        'A mozgási távolságnak 1 és 20 közötti egész számnak kell lennie (négyzetek).',
      autoFaceInvalid: 'Az automatikus arc értékének a következőnek kell lennie: be vagy ki.',
      humourInvalid: 'A humor értékének a következőnek kell lennie: be vagy off.',
      langInvalid: 'Érvénytelen nyelvi beállítás. Támogatott: {locales}',
      profileUsage:
        'Használat: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage:
        'Használat: <code>!adam --profile hozzárendelése &lt;profileId&gt;</code>',
      profileUnknown:
        'A(z) <strong>{id}</strong> profil nem létezik. Az elérhető profilok megtekintéséhez használja az <code>!adam --profile listát</code>.',
      profileUnknownSub:
        'Ismeretlen profil-alparancs: <strong>{sub}</strong><br><br>Érvényes: listázás, megjelenítés, létrehozás, szerkesztési oldal, átnevezés, törlés, hozzárendelés, eltávolítás, vázlat, vázlatoldal, áttekintés, jóváhagyás, elutasítás',
      profileIdInvalid:
        'Érvénytelen profilazonosító: <strong>{id}</strong>. Csak betűket, számokat, kötőjeleket és aláhúzásjeleket használjon (max. 50 karakter).',
      profileAlreadyExists:
        'A(z) <strong>{id}</strong> profil már létezik. A <code>!adam --profile edit-side</code> használatával módosítsa, vagy először törölje.',
      profileNotFound: 'A(z) <strong>{id}</strong> profil nem található.',
      profileCreateUsage:
        'Használat: <code>!adam --profile létrehozás &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Használat: <code>!adam --profile szerkesztési oldal &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Használat: <code>!adam --profile átnevezés &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Használat: <code>!adam --profile törlés &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Használat: <code>!adam --profile piszkozat &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Használat: <code>!adam --profile piszkozat oldali &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Nem található függőben lévő piszkozat a következőhöz: <strong>{id}</strong>. Küldjön be egyet a <code>!adam --profile piszkozattal</code>.',
      profileGmOnly: 'A profil létrehozása a GM-re korlátozódik.',
      profileEditGmOnly: 'Ennek a profilnak a módosítása a GM-re korlátozódik.',
      profileDeleteGmOnly: 'A profil törlése a GM-re korlátozódik.',
      profileGlobalReadOnly:
        'A <strong>{id}</strong> profil egy globális profil, és csak a GM módosíthatja.',
      profileNotOwned:
        'Nem Ön a(z) <strong>{id}</strong> profil tulajdonosa, és nem módosíthatja azt.',
      profileModeRequiresDraft:
        'A profil létrehozásához a GM jóváhagyása szükséges ebben a játékban. Piszkozat benyújtásához használja a <code>!adam --profile piszkozatot &lt;id&gt; &lt;name&gt;</code>-t.',
      profileAssignNoControl:
        'Csak az Ön által irányított tokenekhez rendelhet személyes profilokat.',
      profileAssignNotOwned:
        'Csak saját profilokat rendelhet hozzá az általa irányított tokenekhez. A <strong>{id}</strong> profil egy másik játékoshoz tartozik.',
      profileCreationModeInvalid:
        'Érvénytelen profillétrehozási mód. Érvényes: csak GM, GM által jóváhagyott, minden felhasználó.',
      profileReviewGmOnly: 'Csak a GM tekintheti át a függőben lévő piszkozatokat.',
      profileApproveGmOnly: 'Csak a főigazgató hagyhatja jóvá a profilvázlatokat.',
      profileRejectGmOnly: 'Csak a GM utasíthatja el a profilvázlatokat.',
      invalidAnimSet: 'Az animációs készletnek északnak vagy délnek kell lennie.',
      invalidSideNumber: 'Az oldalszámnak pozitív egész számnak kell lennie (1 vagy nagyobb).',
      noDrafts: 'Nincsenek függőben lévő profilvázlatok.',
      profileDraftConflict:
        'A(z) <strong>{id}</strong> függőben lévő piszkozata már létezik, és egy másik játékosé.',
      profileDraftNotGmApproved:
        'A beküldött piszkozatok csak akkor érhetők el, ha a profillétrehozási mód <code>gm-jóváhagyott</code>.',
      profileApproveConflict:
        'Már létezik <strong>{id}</strong> nevű aktív profil. A tervezet jóváhagyása előtt törölje azt.',
      macroExists: 'Már létezik „<strong>{name}</strong>” makró.',
      simonUnknown:
        'Simon nem tudja, hogyan kell: <em>{command}</em><br><br>Próbáld meg: <code>!simon azt mondja, hogy mozog n</code>',
    },
    confirm: {
      facing:
        '<strong>{token}</strong> most a következővel néz szembe: <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> állapota <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> művelet: <strong>{action}</strong> → állapot: <strong>{state}</strong>.',
      profileAssigned:
        'A(z) <strong>{id}</strong> profil hozzárendelve a következőhöz: <strong>{token}</strong>.',
      profileRemoved: 'A profil eltávolítva innen: <strong>{token}</strong>.',
      profileCreated: 'A(z) <strong>{id}</strong> profil létrehozva.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → oldal {number}.',
      profileRenamed: 'A(z) <strong>{id}</strong> profil átnevezve erre: <strong>{name}</strong>.',
      profileDeleted: 'A(z) <strong>{id}</strong> profil törölve.',
      profileDraftSubmitted:
        'A(z) <strong>{id}</strong> profil tervezete benyújtva a GM jóváhagyására.',
      profileDraftApproved:
        'A <strong>{id}</strong> profilvázlat jóváhagyva, és hozzáadva az aktív profilokhoz.',
      profileDraftRejected: 'A(z) <strong>{id}</strong> profilvázlat elutasítva.',
      macroInstalled:
        'A globális makró „<strong>{name}</strong>” létrejött, és minden játékos számára látható.',
      configUpdated: 'Beállítások frissítve.',
      settingsReset: '<strong>A beállítások visszaállnak a gyári alapértékekre.</strong>',
      langSet: 'A nyelv beállítása a következőre: {locale}.',
    },
    settings: {
      gridSize: 'Rács mérete',
      gridSizeDesc: '{size}px négyzetenként',
      moveDistance: 'Mozgás távolság',
      moveDistanceDesc: '{squares} négyzet – {pixels}px lépésenként',
      autoFace: 'Automatikus arc mozgás közben',
      humour: 'Humor (húsvéti tojás)',
      language: 'Nyelv',
      profileCreationMode: 'Profil létrehozási mód',
      on: 'On',
      off: 'Le',
    },
    profiles: {
      none: 'Nincsenek animált tokenprofilok konfigurálva.',
      noProfile: 'A kiválasztott tokenhez nincs hozzárendelve profil.',
      id: 'Profilazonosító',
      displayName: 'Megjelenítési név',
      mappedStates: 'Feltérképezett államok',
      noneValue: '(egyik sem)',
      personal: 'személyes',
      owner: 'Tulajdonos',
      submittedBy: 'által benyújtott',
      approveHint:
        'A jóváhagyáshoz használja az !adam --profile jóváhagyása &lt;id&gt; vagy az elutasításhoz az &lt;id&gt; parancsot.',
    },
    menu: {
      title: 'ÁDÁM. Control Deck',
      movement: 'Mozgás',
      facing: 'Szembenézve',
      state: 'Állami',
      stateLabel: 'Állami',
      facingLabel: 'Szembenézve',
      profileLabel: 'Profil',
      noProfile: 'Nincs profil',
      help: 'Segítség',
      config: 'Konfig',
      states: {
        idle: 'Tétlen',
        combat: 'Harc',
        walk: 'Séta',
        dash: 'Gondolatjel',
        sneak: 'Settenkedik',
        rage: 'Harag',
        spellcasting: 'Varázslat',
        help: 'Segítség',
      },
    },
    info: {
      subtitle: 'Animált Irány és Mozgás',
      versionLabel: 'Változat',
      updatedLabel: 'Frissítve',
      creditsBody:
        'A.D.A.M.<br>Animált rendezés és mozgás<br><br>Simon üzemeltetője.<br>Határozottan nem Simonnak hívják.',
      ready: 'MOD KÉSZ',
    },
    easter: {
      toTheLeft: 'Balra, balra...',
      notGoingAnywhere: 'ÁDÁM. megállapította, hogy valójában nem mész sehova.',
      areWeThereYet: 'ott vagyunk már?',
      sneakSpam: 'Senki nem látott téged.<br>Senki nem látott.<br>Senki nem látott.',
      helpSpam: 'Ki a jó bagoly?',
      rageRage: 'Dorn helyeselné.',
      simonResponse: '...és ne hívj Simonnak!',
      simonNoSays: 'Simon mit mond?',
      versionEgg: 'ÁDÁM. v{version}<br><br>Egyértelműen nem SIMON.',
    },
  };

  const TRANSLATION$a = {
    titles: {
      error: 'Errore',
      noTokenSelected: 'Nessun token selezionato',
      tokenError: 'Errore token',
      missingDirection: 'Direzione mancante',
      invalidDirection: 'Direzione non valida',
      missingState: 'Stato mancante',
      invalidState: 'Stato non valido',
      missingAction: 'Azione mancante',
      invalidAction: 'Azione non valida',
      accessDenied: 'Accesso negato',
      invalidValue: 'Valore non valido',
      unknownCommand: 'Comando sconosciuto',
      moveError: 'Errore di spostamento',
      macroExists: 'La macro esiste',
      macroInstalled: 'Macro installata',
      invalidUsage: 'Utilizzo non valido',
      profileAssigned: 'Profilo assegnato',
      profileRemoved: 'Profilo rimosso',
      unknownProfile: 'Profilo sconosciuto',
      configuration: 'Configurazione',
      settingsReset: 'Ripristina impostazioni',
      scriptReady: 'Sceneggiatura pronta',
      versionInfo: 'Informazioni sulla versione',
      creditsTitle: 'Crediti',
      adamsMenu: 'ADAMO. Mazzo di controllo',
      adamsHelp: 'ADAMO. Aiuto',
      adamsSettings: 'ADAMO. Impostazioni',
      profiles: 'Profili configurati',
      tokenProfile: 'Profilo token',
      success: 'Successo',
      langSet: 'Impostazione della lingua',
      langInvalid: 'Lingua non valida',
      profileCreated: 'Profilo creato',
      profileUpdated: 'Profilo aggiornato',
      profileDeleted: 'Profilo eliminato',
      profileRenamed: 'Profilo rinominato',
      draftSubmitted: 'Bozza inviata',
      draftApproved: 'Bozza approvata',
      draftRejected: 'Bozza respinta',
      pendingDrafts: 'Bozze del profilo in sospeso',
      profileCreationMode: 'Modalità di creazione del profilo',
      draftNotification: 'Bozza del profilo in sospeso',
    },
    errors: {
      noTokenSelected:
        'Nessun token selezionato. Seleziona prima un token, quindi fai clic su un pulsante di direzione.',
      noTokenSelectedStill: 'Ancora nessun token selezionato.',
      noTokenSelectedPersistent: 'Ammiro la tua tenacia. Seleziona prima un token.',
      tokenNotFound: 'Impossibile trovare il token selezionato.',
      missingDirection:
        'Si prega di fornire una direzione. Esempio: <code>!adam --move n</code><br><em>Direzioni: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direzione sconosciuta: <strong>{value}</strong><br><br>Valido: n, ne, e, se, s, sw, w, nw (o nomi completi come nord, nord-est)',
      missingState: 'Fornisci uno stato.<br>Valido: {states}',
      invalidState: 'Stato sconosciuto: <strong>{value}</strong><br><br>Valido: {states}',
      missingAction:
        "Fornisci un'azione. Examples: help, spellcast, rage, dash, sneak, idle, combat",
      invalidAction:
        'Azione sconosciuta: <strong>{value}</strong><br><br>Azioni conosciute: {actions}',
      accessDeniedConfig: 'Le modifiche alla configurazione sono limitate al GM.',
      accessDeniedProfileAssign: "L'assegnazione del profilo è limitata al GM.",
      accessDeniedProfileRemove: 'La rimozione del profilo è limitata al GM.',
      accessDeniedMacro: "L'installazione delle macro è limitata al GM.",
      accessDeniedReset: 'Il ripristino delle impostazioni è limitato al GM.',
      unknownCommand:
        'Comando sconosciuto. Prova <code>!adam --help</code> per un elenco dei comandi disponibili.',
      moveFailed: 'Movimento fallito.',
      gridSizeInvalid:
        'La dimensione della griglia deve essere un numero intero compreso tra 10 e 1000 (pixel).',
      moveDistanceInvalid:
        'La distanza di spostamento deve essere un numero intero compreso tra 1 e 20 (quadrati).',
      autoFaceInvalid: 'Il valore facciale automatico deve essere: attivato o disattivato.',
      humourInvalid: "Il valore dell'umorismo deve essere: attivato o disattivato.",
      langInvalid: 'Impostazioni locali non valide. Supportato: {locales}',
      profileUsage:
        'Utilizzo: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Utilizzo: <code>!adam --profile assegna &lt;profileId&gt;</code>',
      profileUnknown:
        'Il profilo <strong>{id}</strong> non esiste. Utilizza <code>!adam --profile list</code> per vedere i profili disponibili.',
      profileUnknownSub:
        'Sottocomando profilo sconosciuto: <strong>{sub}</strong><br><br>Valido: elenca, mostra, crea, modifica, rinomina, elimina, assegna, rimuovi, bozza, bozza, rivedi, approva, rifiuta',
      profileIdInvalid:
        'ID profilo non valido: <strong>{id}</strong>. Utilizza solo lettere, numeri, trattini e trattini bassi (massimo 50 caratteri).',
      profileAlreadyExists:
        'Il profilo <strong>{id}</strong> esiste già. Utilizza <code>!adam --profile edit-side</code> per modificarlo o eliminarlo prima.',
      profileNotFound: 'Profilo <strong>{id}</strong> non trovato.',
      profileCreateUsage:
        'Utilizzo: <code>!adam --profile crea &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Utilizzo: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Utilizzo: <code>!adam --profile rinomina &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Utilizzo: <code>!adam --profile elimina &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Utilizzo: <code>!adam --profile bozza &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Utilizzo: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Nessuna bozza in sospeso trovata per <strong>{id}</strong>. Inviane uno con la <code>!adam --profile bozza</code>.',
      profileGmOnly: 'La creazione del profilo è limitata al GM.',
      profileEditGmOnly: 'La modifica di questo profilo è riservata al GM.',
      profileDeleteGmOnly: "L'eliminazione di questo profilo è riservata al GM.",
      profileGlobalReadOnly:
        'Il profilo <strong>{id}</strong> è un profilo globale e può essere modificato solo dal GM.',
      profileNotOwned: 'Non possiedi il profilo <strong>{id}</strong> e non puoi modificarlo.',
      profileModeRequiresDraft:
        "La creazione del profilo richiede l'approvazione del GM in questo gioco. Utilizza <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> per inviare una bozza.",
      profileAssignNoControl: 'Puoi assegnare profili personali solo ai token che controlli.',
      profileAssignNotOwned:
        'Puoi assegnare i tuoi profili solo ai token che controlli. Il profilo <strong>{id}</strong> appartiene a un altro giocatore.',
      profileCreationModeInvalid:
        'Modalità di creazione del profilo non valida. Valido: solo gm, approvato gm, tutti gli utenti.',
      profileReviewGmOnly: 'Solo il GM può rivedere le bozze in sospeso.',
      profileApproveGmOnly: 'Solo il GM può approvare le bozze del profilo.',
      profileRejectGmOnly: 'Solo il GM può rifiutare le bozze del profilo.',
      invalidAnimSet: "Il set dell'animazione deve essere: nord o sud.",
      invalidSideNumber: 'Il numero laterale deve essere un numero intero positivo (1 o maggiore).',
      noDrafts: 'Nessuna bozza del profilo in sospeso.',
      profileDraftConflict:
        'Una bozza in sospeso per <strong>{id}</strong> esiste già e appartiene a un altro giocatore.',
      profileDraftNotGmApproved:
        'Le bozze inviate sono disponibili solo quando la modalità di creazione del profilo è <code>approvata da gm</code>.',
      profileApproveConflict:
        'Esiste già un profilo attivo denominato <strong>{id}</strong>. Eliminalo prima di approvare questa bozza.',
      macroExists: 'Esiste già una macro denominata "<strong>{name}</strong>".',
      simonUnknown:
        'Simon non sa come: <em>{command}</em><br><br>Prova: <code>!simon dice sposta n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> ora affronta <strong>{direction}</strong>.',
      stateSet: 'Stato <strong>{token}</strong> impostato su <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> azione: <strong>{action}</strong> → stato: <strong>{state}</strong>.',
      profileAssigned: 'Profilo <strong>{id}</strong> assegnato a <strong>{token}</strong>.',
      profileRemoved: 'Profilo rimosso da <strong>{token}</strong>.',
      profileCreated: 'Profilo <strong>{id}</strong> creato.',
      profileSideSet: 'Profilo <strong>{id}</strong>: {state}/{animSet} → lato {number}.',
      profileRenamed: 'Profilo <strong>{id}</strong> rinominato in <strong>{name}</strong>.',
      profileDeleted: 'Profilo <strong>{id}</strong> eliminato.',
      profileDraftSubmitted:
        "Bozza del profilo <strong>{id}</strong> inviata per l'approvazione del GM.",
      profileDraftApproved:
        'Bozza del profilo <strong>{id}</strong> approvata e aggiunta ai profili attivi.',
      profileDraftRejected: 'La bozza del profilo <strong>{id}</strong> è stata rifiutata.',
      macroInstalled:
        "La macro globale '<strong>{name}</strong>' è stata creata ed è visibile a tutti i giocatori.",
      configUpdated: 'Impostazioni aggiornate.',
      settingsReset:
        '<strong>Impostazioni ripristinate ai valori predefiniti di fabbrica.</strong>',
      langSet: 'Lingua impostata su {locale}.',
    },
    settings: {
      gridSize: 'Dimensione della griglia',
      gridSizeDesc: '{size}px per quadrato',
      moveDistance: 'Spostare la distanza',
      moveDistanceDesc: '{squares} quadrato/i — {pixels}px per mossa',
      autoFace: 'Volto automatico in movimento',
      humour: 'Umorismo (Uova di Pasqua)',
      language: 'Lingua',
      profileCreationMode: 'Modalità di creazione del profilo',
      on: 'SU',
      off: 'Spento',
    },
    profiles: {
      none: 'Nessun profilo token animato è configurato.',
      noProfile: 'Al token selezionato non è assegnato alcun profilo.',
      id: 'Identificativo del profilo',
      displayName: 'Nome da visualizzare',
      mappedStates: 'Stati mappati',
      noneValue: '(nessuno)',
      personal: 'personale',
      owner: 'Proprietario',
      submittedBy: 'presentato da',
      approveHint:
        'Utilizza !adam --profile approva &lt;id&gt; per approvare o rifiuta &lt;id&gt; per rifiutare.',
    },
    menu: {
      title: 'ADAMO. Mazzo di controllo',
      movement: 'Movimento',
      facing: 'Di fronte',
      state: 'Stato',
      stateLabel: 'Stato',
      facingLabel: 'Di fronte',
      profileLabel: 'Profilo',
      noProfile: 'Nessun profilo',
      help: 'Aiuto',
      config: 'Configurazione',
      states: {
        idle: 'Oziare',
        combat: 'Combattere',
        walk: 'Camminare',
        dash: 'Trattino',
        sneak: 'Sgattaiolare',
        rage: 'Rabbia',
        spellcasting: 'Incantesimi',
        help: 'Aiuto',
      },
    },
    info: {
      subtitle: 'Direzione e movimento animati',
      versionLabel: 'Versione',
      updatedLabel: 'Aggiornato',
      creditsBody:
        'A.D.A.M.<br>Direzione e movimento animati<br><br>Powered by SIMON.<br>Sicuramente non si chiama Simon.',
      ready: 'MODELLO PRONTO',
    },
    easter: {
      toTheLeft: 'A sinistra, a sinistra...',
      notGoingAnywhere: 'ADAMO. ha stabilito che in realtà non andrai da nessuna parte.',
      areWeThereYet: 'Siamo già arrivati?',
      sneakSpam: 'Nessuno ti ha visto.<br>Nessuno ti ha visto.<br>Nessuno ti ha visto.',
      helpSpam: 'Chi è un bravo gufo?',
      rageRage: 'Dorn approverebbe.',
      simonResponse: '...e non chiamarmi Simon!',
      simonNoSays: 'Simone cosa dice?',
      versionEgg: 'ADAMO. v{version}<br><br>Sicuramente non SIMON.',
    },
  };

  const TRANSLATION$9 = {
    titles: {
      error: 'エラー',
      noTokenSelected: 'トークンが選択されていません',
      tokenError: 'トークンエラー',
      missingDirection: '方向がありません',
      invalidDirection: '無効な方向',
      missingState: '欠落状態',
      invalidState: '無効な状態',
      missingAction: '不足しているアクション',
      invalidAction: '無効なアクション',
      accessDenied: 'アクセスが拒否されました',
      invalidValue: '無効な値',
      unknownCommand: '不明なコマンド',
      moveError: '移動エラー',
      macroExists: 'マクロが存在します',
      macroInstalled: 'マクロがインストールされました',
      invalidUsage: '無効な使用法',
      profileAssigned: 'プロファイルが割り当てられました',
      profileRemoved: 'プロファイルが削除されました',
      unknownProfile: '不明なプロフィール',
      configuration: '構成',
      settingsReset: '設定のリセット',
      scriptReady: 'スクリプトの準備完了',
      versionInfo: 'バージョン情報',
      creditsTitle: 'クレジット',
      adamsMenu: 'アダム。コントロールデッキ',
      adamsHelp: 'アダム。ヘルプ',
      adamsSettings: 'アダム。設定',
      profiles: '設定されたプロファイル',
      tokenProfile: 'トークンプロファイル',
      success: '成功',
      langSet: '言語セット',
      langInvalid: '無効な言語',
      profileCreated: 'プロファイルが作成されました',
      profileUpdated: 'プロフィールが更新されました',
      profileDeleted: 'プロファイルが削除されました',
      profileRenamed: 'プロファイルの名前が変更されました',
      draftSubmitted: '草案が提出されました',
      draftApproved: '草案が承認されました',
      draftRejected: 'ドラフトは拒否されました',
      pendingDrafts: '保留中のプロファイルの下書き',
      profileCreationMode: 'プロファイル作成モード',
      draftNotification: 'プロファイルのドラフトは保留中です',
    },
    errors: {
      noTokenSelected:
        'トークンが選択されていません。最初にトークンを選択してから、方向ボタンをクリックしてください。',
      noTokenSelectedStill: 'まだトークンが選択されていません。',
      noTokenSelectedPersistent: 'あなたの粘り強さに敬意を表します。最初にトークンを選択します。',
      tokenNotFound: '選択されたトークンが見つかりませんでした。',
      missingDirection:
        '方向性を教えてください。例: <code>!adam --move n</code><br><em>方向: n、ne、e、se、s、sw、w、nw</em>',
      invalidDirection:
        '不明な方向: <strong>{value}</strong><br><br>有効: n、ne、e、se、s、sw、w、nw (または北、北東などの完全な名前)',
      missingState: '州を入力してください。<br>有効: {states}',
      invalidState: '不明な状態: <strong>{value}</strong><br><br>有効: {states}',
      missingAction:
        'アクションを提供してください。例: ヘルプ、スペルキャスト、レイジ、ダッシュ、スニーク、アイドル、戦闘',
      invalidAction:
        '不明なアクション: <strong>{value}</strong><br><br>既知のアクション: {actions}',
      accessDeniedConfig: '設定の変更は GM に制限されます。',
      accessDeniedProfileAssign: 'プロファイルの割り当ては GM に限定されます。',
      accessDeniedProfileRemove: 'プロファイルの削除は GM に制限されています。',
      accessDeniedMacro: 'マクロのインストールは GM に限定されます。',
      accessDeniedReset: '設定のリセットはGMに限定されます。',
      unknownCommand:
        '不明なコマンドです。使用可能なコマンドのリストについては、<code>!adam --help</code> を試してください。',
      moveFailed: '移動に失敗しました。',
      gridSizeInvalid: 'グリッド サイズは 10 ～ 1000 (ピクセル) の整数である必要があります。',
      moveDistanceInvalid: '移動距離は 1 ～ 20 (正方形) の整数でなければなりません。',
      autoFaceInvalid: '自動額面値はオンまたはオフでなければなりません。',
      humourInvalid: 'ユーモアの値はオンまたはオフである必要があります。',
      langInvalid: '無効なロケールです。サポートされている: {locales}',
      profileUsage:
        '使用法: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: '使用法: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'プロファイル <strong>{id}</strong> は存在しません。使用可能なプロファイルを確認するには、<code>!adam --profile list</code> を使用します。',
      profileUnknownSub:
        '不明なプロファイル サブコマンド: <strong>{sub}</strong><br><br>有効: リスト、表示、作成、編集側、名前変更、削除、割り当て、削除、下書き、下書き側、レビュー、承認、拒否',
      profileIdInvalid:
        '無効なプロファイル ID: <strong>{id}</strong>。文字、数字、ハイフン、アンダースコアのみを使用してください (最大 50 文字)。',
      profileAlreadyExists:
        'プロファイル <strong>{id}</strong> はすでに存在します。 <code>!adam --profile edit-side</code> を使用して変更するか、最初に削除してください。',
      profileNotFound: 'プロファイル <strong>{id}</strong> が見つかりません。',
      profileCreateUsage:
        '使用法: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        '使用法: <code>!adam --profile 編集側 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        '使用法: <code>!adam --profile 名前を変更 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: '使用法: <code>!adam --profile &lt;profileId&gt; を削除</code>',
      profileDraftUsage:
        '使用法: <code>!adam --profile ドラフト &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        '使用法: <code>!adam --profile ドラフト側 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        '<strong>{id}</strong> の保留中のドラフトは見つかりませんでした。 <code>!adam --profile ドラフト</code> を使用して提出してください。',
      profileGmOnly: 'プロフィールの作成は GM に制限されています。',
      profileEditGmOnly: 'このプロファイルの変更は GM に制限されています。',
      profileDeleteGmOnly: 'このプロファイルの削除は GM に制限されています。',
      profileGlobalReadOnly:
        'プロファイル <strong>{id}</strong> はグローバル プロファイルであり、GM のみが変更できます。',
      profileNotOwned: 'プロファイル <strong>{id}</strong> を所有していないため、変更できません。',
      profileModeRequiresDraft:
        'このゲームではプロフィールの作成には GM の承認が必要です。ドラフトを送信するには、<code>!adam --profile ドラフト &lt;id&gt; &lt;name&gt;</code> を使用します。',
      profileAssignNoControl:
        '個人プロファイルは、自分が管理するトークンにのみ割り当てることができます。',
      profileAssignNotOwned:
        '独自のプロファイルは、自分が管理するトークンにのみ割り当てることができます。プロフィール <strong>{id}</strong> は別のプレイヤーに属しています。',
      profileCreationModeInvalid:
        '無効なプロファイル作成モードです。有効: gm のみ、gm 承認、すべてのユーザー。',
      profileReviewGmOnly: 'GM のみが保留中のドラフトをレビューできます。',
      profileApproveGmOnly: 'プロフィールの下書きを承認できるのは GM だけです。',
      profileRejectGmOnly: 'プロフィール草稿を拒否できるのは GM のみです。',
      invalidAnimSet: 'アニメーション セットは次のとおりである必要があります: 北または南。',
      invalidSideNumber: '辺番号は正の整数 (1 以上) でなければなりません。',
      noDrafts: '保留中のプロファイルの下書きはありません。',
      profileDraftConflict:
        '<strong>{id}</strong> の保留中のドラフトはすでに存在しており、別のプレイヤーに属しています。',
      profileDraftNotGmApproved:
        'ドラフトの送信は、プロファイル作成モードが <code>gm-approved</code> の場合にのみ利用可能です。',
      profileApproveConflict:
        '<strong>{id}</strong> という名前のアクティブなプロファイルはすでに存在します。このドラフトを承認する前に、まず削除してください。',
      macroExists: '「<strong>{name}</strong>」という名前のマクロはすでに存在します。',
      simonUnknown:
        'Simon は方法がわかりません: <em>{command}</em><br><br>試してください: <code>!simon は n を移動と言います</code>',
    },
    confirm: {
      facing:
        '<strong>{token}</strong> は <strong>{direction}</strong> と対戦するようになりました。',
      stateSet: '<strong>{token}</strong> の状態が <strong>{state}</strong> に設定されました。',
      actionSet:
        '<strong>{token}</strong> アクション: <strong>{action}</strong> → 状態: <strong>{state}</strong>。',
      profileAssigned:
        'プロファイル <strong>{id}</strong> が <strong>{token}</strong> に割り当てられました。',
      profileRemoved: 'プロフィールが <strong>{token}</strong> から削除されました。',
      profileCreated: 'プロファイル <strong>{id}</strong> が作成されました。',
      profileSideSet: 'プロフィール <strong>{id}</strong>: {state}/{animSet} → サイド {number}。',
      profileRenamed:
        'プロファイル <strong>{id}</strong> の名前が <strong>{name}</strong> に変更されました。',
      profileDeleted: 'プロフィール <strong>{id}</strong> が削除されました。',
      profileDraftSubmitted:
        'プロフィール <strong>{id}</strong> のドラフトが GM の承認のために送信されました。',
      profileDraftApproved:
        'プロファイルの下書き <strong>{id}</strong> が承認され、アクティブなプロファイルに追加されました。',
      profileDraftRejected: 'プロファイルの下書き <strong>{id}</strong> は拒否されました。',
      macroInstalled:
        "グローバル マクロ '<strong>{name}</strong>' が作成され、すべてのプレイヤーに表示されます。",
      configUpdated: '設定が更新されました。',
      settingsReset: '<strong>設定が工場出荷時のデフォルトにリセットされます。</strong>',
      langSet: '言語は {locale} に設定されました。',
    },
    settings: {
      gridSize: 'グリッドサイズ',
      gridSizeDesc: '{size}px/平方',
      moveDistance: '移動距離',
      moveDistanceDesc: '{squares} 正方形 — 移動ごとに {pixels}px',
      autoFace: '移動中の自動顔調整',
      humour: 'ユーモア (イースターエッグ)',
      language: '言語',
      profileCreationMode: 'プロファイル作成モード',
      on: 'の上',
      off: 'オフ',
    },
    profiles: {
      none: 'アニメーション化されたトークン プロファイルは構成されていません。',
      noProfile: '選択したトークンにはプロファイルが割り当てられていません。',
      id: 'プロフィールID',
      displayName: '表示名',
      mappedStates: 'マップされた州',
      noneValue: '（なし）',
      personal: '個人的',
      owner: '所有者',
      submittedBy: 'によって提出されました',
      approveHint:
        '承認するには !adam --profile を使用し、&lt;id&gt; を承認するか、拒否するには &lt;id&gt; を使用します。',
    },
    menu: {
      title: 'アダム。コントロールデッキ',
      movement: '動き',
      facing: '対面',
      state: '州',
      stateLabel: '州',
      facingLabel: '対面',
      profileLabel: 'プロフィール',
      noProfile: 'プロフィールなし',
      help: 'ヘルプ',
      config: '構成',
      states: {
        idle: 'アイドル状態',
        combat: '戦闘',
        walk: '歩く',
        dash: 'ダッシュ',
        sneak: 'こっそり',
        rage: '怒り',
        spellcasting: 'スペルキャスト',
        help: 'ヘルプ',
      },
    },
    info: {
      subtitle: 'アニメーションの方向と動き',
      versionLabel: 'バージョン',
      updatedLabel: '更新されました',
      creditsBody:
        'A.D.A.M.<br>アニメーションの方向と動き<br><br>SIMON によって提供されています。<br>決して Simon とは呼ばれません。',
      ready: 'MOD対応',
    },
    easter: {
      toTheLeft: '左へ、左へ…',
      notGoingAnywhere: 'アダム。あなたは実際にはどこにも行かないと判断しました。',
      areWeThereYet: 'もう到着しましたか？',
      sneakSpam:
        '誰もあなたを見ていません<br>誰もあなたを見ていません<br>誰もあなたを見ていません。',
      helpSpam: '良いフクロウは誰ですか？',
      rageRage: 'ドーン氏なら同意するだろう。',
      simonResponse: '...サイモンと呼ばないでください!',
      simonNoSays: 'サイモンは何と言っていますか？',
      versionEgg: 'アダム。 v{version}<br><br>決してサイモンではありません。',
    },
  };

  const TRANSLATION$8 = {
    titles: {
      error: '오류',
      noTokenSelected: '토큰을 선택하지 않았습니다.',
      tokenError: '토큰 오류',
      missingDirection: '누락된 방향',
      invalidDirection: '잘못된 방향',
      missingState: '누락된 상태',
      invalidState: '잘못된 상태',
      missingAction: '누락된 작업',
      invalidAction: '잘못된 작업',
      accessDenied: '접근 불가',
      invalidValue: '잘못된 값',
      unknownCommand: '알 수 없는 명령',
      moveError: '이동 오류',
      macroExists: '매크로가 존재함',
      macroInstalled: '매크로가 설치됨',
      invalidUsage: '잘못된 사용법',
      profileAssigned: '프로필이 할당됨',
      profileRemoved: '프로필이 삭제되었습니다.',
      unknownProfile: '알 수 없는 프로필',
      configuration: '구성',
      settingsReset: '설정 재설정',
      scriptReady: '스크립트 준비',
      versionInfo: '버전 정보',
      creditsTitle: '크레딧',
      adamsMenu: '아담. 컨트롤 데크',
      adamsHelp: '아담. 돕다',
      adamsSettings: '아담. 설정',
      profiles: '구성된 프로필',
      tokenProfile: '토큰 프로필',
      success: '성공',
      langSet: '언어 세트',
      langInvalid: '잘못된 언어',
      profileCreated: '프로필이 생성되었습니다.',
      profileUpdated: '프로필이 업데이트되었습니다.',
      profileDeleted: '프로필이 삭제되었습니다.',
      profileRenamed: '프로필 이름이 변경됨',
      draftSubmitted: '초안이 제출됨',
      draftApproved: '초안이 승인됨',
      draftRejected: '초안이 거부됨',
      pendingDrafts: '보류 중인 프로필 초안',
      profileCreationMode: '프로필 생성 모드',
      draftNotification: '프로필 초안 보류 중',
    },
    errors: {
      noTokenSelected: '선택된 토큰이 없습니다. 먼저 토큰을 선택한 후 방향 버튼을 클릭하세요.',
      noTokenSelectedStill: '아직 선택된 토큰이 없습니다.',
      noTokenSelectedPersistent: '나는 당신의 끈기를 존경합니다. 먼저 토큰을 선택하세요.',
      tokenNotFound: '선택한 토큰을 찾을 수 없습니다.',
      missingDirection:
        '방향을 알려주십시오. 예: <code>!adam --move n</code><br><em>길찾기: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        '알 수 없는 방향: <strong>{value}</strong><br><br>유효: n, ne, e, se, s, sw, w, nw(또는 north, northeast와 같은 전체 이름)',
      missingState: '주를 입력하세요.<br>유효: {states}',
      invalidState: '알 수 없는 상태: <strong>{value}</strong><br><br>유효: {states}',
      missingAction: '작업을 제공하십시오. 예: 도움말, 주문 시전, 분노, 돌진, 몰래, 유휴, 전투',
      invalidAction: '알 수 없는 작업: <strong>{value}</strong><br><br>알려진 작업: {actions}',
      accessDeniedConfig: '구성 변경은 GM으로 제한됩니다.',
      accessDeniedProfileAssign: '프로필 할당은 GM으로 제한됩니다.',
      accessDeniedProfileRemove: '프로필 제거는 GM으로 제한됩니다.',
      accessDeniedMacro: '매크로 설치는 GM으로 제한됩니다.',
      accessDeniedReset: '설정 재설정은 GM으로 제한됩니다.',
      unknownCommand:
        '알 수 없는 명령입니다. 사용 가능한 명령 목록을 보려면 <code>!adam --help</code>을 사용해 보세요.',
      moveFailed: '이동에 실패했습니다.',
      gridSizeInvalid: '그리드 크기는 10에서 1000(픽셀) 사이의 정수여야 합니다.',
      moveDistanceInvalid: '이동 거리는 1에서 20(제곱) 사이의 정수여야 합니다.',
      autoFaceInvalid: '자동 얼굴 값은 켜짐 또는 꺼짐이어야 합니다.',
      humourInvalid: '유머 값은 켜짐 또는 꺼짐이어야 합니다.',
      langInvalid: '로캘이 잘못되었습니다. 지원됨: {locales}',
      profileUsage:
        '사용법: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: '사용법: <code>!adam --profile 할당 &lt;profileId&gt;</code>',
      profileUnknown:
        '<strong>{id}</strong> 프로필이 존재하지 않습니다. 사용 가능한 프로필을 보려면 <code>!adam --profile 목록</code>을 사용하세요.',
      profileUnknownSub:
        '알 수 없는 프로필 하위 명령: <strong>{sub}</strong><br><br>유효: 나열, 표시, 생성, 편집측, 이름 바꾸기, 삭제, 할당, 제거, 초안, 초안측, 검토, 승인, 거부',
      profileIdInvalid:
        '잘못된 프로필 ID: <strong>{id}</strong>. 문자, 숫자, 하이픈, 밑줄만 사용하세요(최대 50자).',
      profileAlreadyExists:
        '<strong>{id}</strong> 프로필이 이미 존재합니다. <code>!adam --profile edit-side</code>를 사용하여 수정하거나 먼저 삭제하세요.',
      profileNotFound: '<strong>{id}</strong> 프로필을 찾을 수 없습니다.',
      profileCreateUsage:
        '사용법: <code>!adam --profile 생성 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        '사용법: <code>!adam --profile 편집측 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        '사용법: <code>!adam --profile 이름 바꾸기 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: '사용법: <code>!adam --profile 삭제 &lt;profileId&gt;</code>',
      profileDraftUsage:
        '사용법: <code>!adam --profile 초안 &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        '사용법: <code>!adam --profile 초안 쪽 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        '<strong>{id}</strong>에 대해 대기 중인 초안이 없습니다. <code>!adam --profile 초안</code>을 포함하여 제출하세요.',
      profileGmOnly: '프로필 생성은 GM으로 제한됩니다.',
      profileEditGmOnly: '이 프로필 수정은 GM으로 제한됩니다.',
      profileDeleteGmOnly: '이 프로필 삭제는 GM으로 제한됩니다.',
      profileGlobalReadOnly:
        '프로필 <strong>{id}</strong>은 전역 프로필이며 GM만 수정할 수 있습니다.',
      profileNotOwned:
        '귀하는 <strong>{id}</strong> 프로필을 소유하고 있지 않으며 프로필을 수정할 수 없습니다.',
      profileModeRequiresDraft:
        '이 게임에서는 프로필을 생성하려면 GM 승인이 필요합니다. 초안을 제출하려면 <code>!adam --profile 초안 &lt;id&gt; &lt;name&gt;</code>를 사용하세요.',
      profileAssignNoControl: '귀하가 관리하는 토큰에만 개인 프로필을 할당할 수 있습니다.',
      profileAssignNotOwned:
        '귀하는 귀하가 제어하는 ​​토큰에만 귀하의 프로필을 할당할 수 있습니다. 프로필 <strong>{id}</strong>이(가) 다른 플레이어에 속해 있습니다.',
      profileCreationModeInvalid:
        '프로필 생성 모드가 잘못되었습니다. 유효: GM 전용, GM 승인, 모든 사용자.',
      profileReviewGmOnly: 'GM만이 보류 중인 초안을 검토할 수 있습니다.',
      profileApproveGmOnly: 'GM만이 프로필 초안을 승인할 수 있습니다.',
      profileRejectGmOnly: 'GM만이 프로필 초안을 거부할 수 있습니다.',
      invalidAnimSet: '애니메이션 세트는 북쪽 또는 남쪽이어야 합니다.',
      invalidSideNumber: '변 번호는 양의 정수(1 이상)여야 합니다.',
      noDrafts: '보류 중인 프로필 초안이 없습니다.',
      profileDraftConflict:
        '<strong>{id}</strong>에 대해 대기 중인 초안이 이미 존재하며 다른 플레이어에게 속해 있습니다.',
      profileDraftNotGmApproved:
        '초안 제출은 프로필 생성 모드가 <code>gm 승인</code>인 경우에만 사용할 수 있습니다.',
      profileApproveConflict:
        '이름이 <strong>{id}</strong>인 활성 프로필이 이미 존재합니다. 이 초안을 승인하기 전에 먼저 삭제하세요.',
      macroExists: "'<strong>{name}</strong>'이라는 매크로가 이미 존재합니다.",
      simonUnknown:
        'Simon은 <em>{command}</em><br><br>다음 방법을 모릅니다. <code>!simon이 n 이동이라고 말합니다</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong>은(는) 이제 <strong>{direction}</strong>과 마주하게 됩니다.',
      stateSet: '<strong>{token}</strong> 상태가 <strong>{state}</strong>로 설정되었습니다.',
      actionSet:
        '<strong>{token}</strong> 작업: <strong>{action}</strong> → 상태: <strong>{state}</strong>.',
      profileAssigned: '<strong>{id}</strong> 프로필이 <strong>{token}</strong>에 할당되었습니다.',
      profileRemoved: '<strong>{token}</strong>에서 프로필이 삭제되었습니다.',
      profileCreated: '<strong>{id}</strong> 프로필이 생성되었습니다.',
      profileSideSet: '프로필 <strong>{id}</strong>: {state}/{animSet} → {number} 쪽.',
      profileRenamed:
        '프로필 <strong>{id}</strong>의 이름이 <strong>{name}</strong>로 변경되었습니다.',
      profileDeleted: '<strong>{id}</strong> 프로필이 삭제되었습니다.',
      profileDraftSubmitted: 'GM 승인을 위해 <strong>{id}</strong> 프로필 초안이 제출되었습니다.',
      profileDraftApproved:
        '프로필 초안 <strong>{id}</strong>이(가) 승인되어 활성 프로필에 추가되었습니다.',
      profileDraftRejected: '프로필 초안 <strong>{id}</strong>이 거부되었습니다.',
      macroInstalled:
        "전역 매크로 '<strong>{name}</strong>'이 생성되었으며 모든 플레이어가 볼 수 있습니다.",
      configUpdated: '설정이 업데이트되었습니다.',
      settingsReset: '<strong>설정이 공장 기본값으로 재설정되었습니다.</strong>',
      langSet: '언어가 {locale}로 설정되었습니다.',
    },
    settings: {
      gridSize: '그리드 크기',
      gridSizeDesc: '정사각형당 {size}픽셀',
      moveDistance: '이동 거리',
      moveDistanceDesc: '{squares} 정사각형 — 이동당 {pixels}px',
      autoFace: '이동 시 자동 얼굴 인식',
      humour: '유머(부활절 달걀)',
      language: '언어',
      profileCreationMode: '프로필 생성 모드',
      on: '~에',
      off: '끄다',
    },
    profiles: {
      none: '애니메이션 토큰 프로필이 구성되지 않았습니다.',
      noProfile: '선택한 토큰에는 할당된 프로필이 없습니다.',
      id: '프로필 ID',
      displayName: '표시 이름',
      mappedStates: '매핑된 상태',
      noneValue: '(없음)',
      personal: '개인의',
      owner: '소유자',
      submittedBy: '에 의해 제출됨',
      approveHint:
        '!adam --profile 승인 &lt;id&gt;을 사용하여 승인하거나 거부하려면 &lt;id&gt;을 사용하세요.',
    },
    menu: {
      title: '아담. 컨트롤 데크',
      movement: '움직임',
      facing: '깃 달기',
      state: '상태',
      stateLabel: '상태',
      facingLabel: '깃 달기',
      profileLabel: '윤곽',
      noProfile: '프로필 없음',
      help: '돕다',
      config: '구성',
      states: {
        idle: '게으른',
        combat: '전투',
        walk: '걷다',
        dash: '대시',
        sneak: '좀도둑',
        rage: '격노',
        spellcasting: '주문 시전',
        help: '돕다',
      },
    },
    info: {
      subtitle: '애니메이션 방향 및 이동',
      versionLabel: '버전',
      updatedLabel: '업데이트됨',
      creditsBody:
        'A.D.A.M.<br>방향 및 움직임 애니메이션<br><br>SIMON 제공.<br>물론 Simon이라고 부르지는 않습니다.',
      ready: '모드 준비됨',
    },
    easter: {
      toTheLeft: '왼쪽으로, 왼쪽으로...',
      notGoingAnywhere: '아담. 당신은 실제로 아무데도 가지 않을 것이라고 결정했습니다.',
      areWeThereYet: '아직 도착하지 않았나요?',
      sneakSpam:
        '아무도 당신을 본 적이 없습니다.<br>아무도 당신을 본 적이 없습니다.<br>아무도 당신을 본 적이 없습니다.',
      helpSpam: '좋은 올빼미는 누구입니까?',
      rageRage: '돈은 승인할 것이다.',
      simonResponse: '...그리고 나를 사이먼이라고 부르지 마세요!',
      simonNoSays: '사이먼이 뭐라고 말했어요?',
      versionEgg: '아담. v{version}<br><br>물론 SIMON은 아닙니다.',
    },
  };

  const TRANSLATION$7 = {
    titles: {
      error: 'Błąd',
      noTokenSelected: 'Nie wybrano tokena',
      tokenError: 'Błąd tokena',
      missingDirection: 'Brakujący kierunek',
      invalidDirection: 'Nieprawidłowy kierunek',
      missingState: 'Brakujący stan',
      invalidState: 'Nieprawidłowy stan',
      missingAction: 'Brakujące działanie',
      invalidAction: 'Nieprawidłowa akcja',
      accessDenied: 'Odmowa dostępu',
      invalidValue: 'Nieprawidłowa wartość',
      unknownCommand: 'Nieznane polecenie',
      moveError: 'Błąd przenoszenia',
      macroExists: 'Makro istnieje',
      macroInstalled: 'Makro zainstalowane',
      invalidUsage: 'Nieprawidłowe użycie',
      profileAssigned: 'Profil przypisany',
      profileRemoved: 'Profil usunięty',
      unknownProfile: 'Nieznany profil',
      configuration: 'Konfiguracja',
      settingsReset: 'Reset ustawień',
      scriptReady: 'Skrypt gotowy',
      versionInfo: 'Informacje o wersji',
      creditsTitle: 'Kredyty',
      adamsMenu: 'ADAM. Platforma kontrolna',
      adamsHelp: 'ADAM. Pomoc',
      adamsSettings: 'ADAM. Ustawienia',
      profiles: 'Skonfigurowane profile',
      tokenProfile: 'Profil tokena',
      success: 'Sukces',
      langSet: 'Zestaw językowy',
      langInvalid: 'Nieprawidłowy język',
      profileCreated: 'Profil został utworzony',
      profileUpdated: 'Profil zaktualizowany',
      profileDeleted: 'Profil usunięty',
      profileRenamed: 'Zmieniono nazwę profilu',
      draftSubmitted: 'Wersja robocza przesłana',
      draftApproved: 'Projekt zatwierdzony',
      draftRejected: 'Wersja robocza odrzucona',
      pendingDrafts: 'Oczekujące wersje robocze profilu',
      profileCreationMode: 'Tryb tworzenia profilu',
      draftNotification: 'Wersja robocza profilu w oczekiwaniu',
    },
    errors: {
      noTokenSelected:
        'Nie wybrano tokena. Najpierw wybierz token, a następnie kliknij przycisk kierunkowy.',
      noTokenSelectedStill: 'Nadal nie wybrano tokena.',
      noTokenSelectedPersistent: 'Podziwiam Twoją wytrwałość. Najpierw wybierz token.',
      tokenNotFound: 'Nie można znaleźć wybranego tokena.',
      missingDirection:
        'Proszę o kierunek. Przykład: <code>!adam --move n</code><br><em>Kierunki: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Nieznany kierunek: <strong>{value}</strong><br><br>Prawidłowy: n, ne, e, se, s, sw, w, nw (lub pełne nazwy, takie jak północ, północny wschód)',
      missingState: 'Podaj stan.<br>Prawidłowy: {states}',
      invalidState: 'Nieznany stan: <strong>{value}</strong><br><br>Ważny: {states}',
      missingAction:
        'Proszę podać działanie. Przykłady: pomoc, rzucanie zaklęć, wściekłość, doskok, skradanie się, bezczynność, walka',
      invalidAction:
        'Nieznane działanie: <strong>{value}</strong><br><br>Znane działania: {actions}',
      accessDeniedConfig: 'Zmiany konfiguracji są ograniczone do GM.',
      accessDeniedProfileAssign: "Przypisanie profilu jest ograniczone do GM'a.",
      accessDeniedProfileRemove: "Usuwanie profilu jest zastrzeżone dla GM'a.",
      accessDeniedMacro: 'Instalacja makr jest ograniczona do GM.',
      accessDeniedReset: "Reset ustawień jest zastrzeżony dla GM'a.",
      unknownCommand:
        'Nieznane polecenie. Spróbuj <code>!adam --help</code>, aby wyświetlić listę dostępnych poleceń.',
      moveFailed: 'Ruch nie powiódł się.',
      gridSizeInvalid:
        'Rozmiar siatki musi być liczbą całkowitą z zakresu od 10 do 1000 (pikseli).',
      moveDistanceInvalid:
        'Odległość ruchu musi być liczbą całkowitą z zakresu od 1 do 20 (kwadratów).',
      autoFaceInvalid: 'Wartość automatycznej twarzy musi być: włączona lub wyłączona.',
      humourInvalid: 'Wartość humoru musi być: włączona lub wyłączona.',
      langInvalid: 'Nieprawidłowe ustawienia regionalne. Obsługiwane: {locales}',
      profileUsage:
        'Użycie: <kod>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Użycie: <code>!adam --profile przypisz &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> nie istnieje. Użyj <code>!adam --profile listy</code>, aby zobaczyć dostępne profile.',
      profileUnknownSub:
        'Nieznane polecenie profilu: <strong>{sub}</strong><br><br>Prawidłowe: wyświetlanie, wyświetlanie, tworzenie, edytowanie, zmiana nazwy, usuwanie, przypisywanie, usuwanie, wersja robocza, wersja robocza, przeglądanie, zatwierdzanie, odrzucanie',
      profileIdInvalid:
        'Nieprawidłowy identyfikator profilu: <strong>{id}</strong>. Używaj tylko liter, cyfr, łączników i podkreśleń (maks. 50 znaków).',
      profileAlreadyExists:
        'Profil <strong>{id}</strong> już istnieje. Użyj <code>!adam --profile strony edycyjnej</code>, aby go zmodyfikować lub najpierw go usunąć.',
      profileNotFound: 'Nie znaleziono profilu <strong>{id}</strong>.',
      profileCreateUsage:
        'Użycie: <kod>!adam --profile utwórz &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Użycie: <kod>!adam --profile strona edycji &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Użycie: <kod>!adam --profile zmień nazwę &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Użycie: <kod>!adam --profile usuń &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Użycie: <kod>!adam --profile wersja robocza &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Użycie: <kod>!adam --profile strona zanurzeniowa &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Nie znaleziono oczekującej wersji roboczej dla <strong>{id}</strong>. Prześlij go z <code>!adam --profile wersją roboczą</code>.',
      profileGmOnly: "Tworzenie profilu jest ograniczone do GM'a.",
      profileEditGmOnly: "Modyfikowanie tego profilu jest zastrzeżone dla GM'a.",
      profileDeleteGmOnly: "Usunięcie tego profilu jest zastrzeżone dla GM'a.",
      profileGlobalReadOnly:
        "Profil <strong>{id}</strong> jest profilem globalnym i może być modyfikowany wyłącznie przez GM'a.",
      profileNotOwned:
        'Nie jesteś właścicielem profilu <strong>{id}</strong> i nie możesz go modyfikować.',
      profileModeRequiresDraft:
        'Utworzenie profilu wymaga zgody GM w tej grze. Użyj <code>!adam --profile wersja robocza &lt;id&gt; &lt;name&gt;</code>, aby przesłać wersję roboczą.',
      profileAssignNoControl:
        'Profile osobiste możesz przypisywać wyłącznie do tokenów, które kontrolujesz.',
      profileAssignNotOwned:
        'Możesz przypisywać własne profile tylko do tokenów, które kontrolujesz. Profil <strong>{id}</strong> należy do innego gracza.',
      profileCreationModeInvalid:
        'Nieprawidłowy tryb tworzenia profilu. Ważne: tylko gm, zatwierdzone przez gm, wszyscy użytkownicy.',
      profileReviewGmOnly: 'Tylko GM może przeglądać oczekujące wersje robocze.',
      profileApproveGmOnly: 'Tylko GM może zatwierdzać wersje robocze profili.',
      profileRejectGmOnly: 'Tylko GM może odrzucić wersje robocze profili.',
      invalidAnimSet: 'Zestaw animacji musi być: północ lub południe.',
      invalidSideNumber: 'Numer boczny musi być dodatnią liczbą całkowitą (1 lub większą).',
      noDrafts: 'Brak oczekujących wersji roboczych profili.',
      profileDraftConflict:
        'Oczekująca wersja robocza dla <strong>{id}</strong> już istnieje i należy do innego gracza.',
      profileDraftNotGmApproved:
        'Zgłoszenia wersji roboczej są dostępne tylko wtedy, gdy tryb tworzenia profilu jest <code>zatwierdzony przez gm</code>.',
      profileApproveConflict:
        'Aktywny profil o nazwie <strong>{id}</strong> już istnieje. Usuń go najpierw przed zatwierdzeniem tej wersji roboczej.',
      macroExists: 'Makro o nazwie „<strong>{name}</strong>” już istnieje.',
      simonUnknown:
        'Simon nie wie, jak: <em>{command}</em><br><br>Spróbuj: <code>!simon mówi: przesuń n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> stoi teraz twarzą w twarz z <strong>{direction}</strong>.',
      stateSet: 'Stan <strong>{token}</strong> ustawiony na <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> akcja: <strong>{action}</strong> → stan: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> przypisany do <strong>{token}</strong>.',
      profileRemoved: 'Profil został usunięty z <strong>{token}</strong>.',
      profileCreated: 'Profil <strong>{id}</strong> został utworzony.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → strona {number}.',
      profileRenamed:
        'Nazwa profilu <strong>{id}</strong> została zmieniona na <strong>{name}</strong>.',
      profileDeleted: 'Profil <strong>{id}</strong> został usunięty.',
      profileDraftSubmitted:
        'Wersja robocza profilu <strong>{id}</strong> przesłana do zatwierdzenia przez GM.',
      profileDraftApproved:
        'Wersja robocza profilu <strong>{id}</strong> została zatwierdzona i dodana do aktywnych profili.',
      profileDraftRejected: 'Wersja robocza profilu <strong>{id}</strong> została odrzucona.',
      macroInstalled:
        'Makro globalne „<strong>{name}</strong>” zostało utworzone i jest widoczne dla wszystkich graczy.',
      configUpdated: 'Ustawienia zaktualizowane.',
      settingsReset: '<strong>Ustawienia zostały zresetowane do wartości fabrycznych.</strong>',
      langSet: 'Język ustawiony na {locale}.',
    },
    settings: {
      gridSize: 'Rozmiar siatki',
      gridSizeDesc: '{size}px na kwadrat',
      moveDistance: 'Przesuń odległość',
      moveDistanceDesc: '{squares} kwadratów — {pixels}px na ruch',
      autoFace: 'Automatyczna twarz w ruchu',
      humour: 'Humor (Jajka wielkanocne)',
      language: 'Język',
      profileCreationMode: 'Tryb tworzenia profilu',
      on: 'NA',
      off: 'Wyłączony',
    },
    profiles: {
      none: 'Nie skonfigurowano żadnych animowanych profili tokenów.',
      noProfile: 'Selected token has no profile assigned.',
      id: 'Identyfikator profilu',
      displayName: 'Nazwa wyświetlana',
      mappedStates: 'Mapowane Stany',
      noneValue: '(nic)',
      personal: 'osobisty',
      owner: 'Właściciel',
      submittedBy: 'przesłane przez',
      approveHint:
        'Użyj !adam --profile zatwierdź &lt;id&gt;, aby zatwierdzić lub odrzucić &lt;id&gt;, aby odrzucić.',
    },
    menu: {
      title: 'ADAM. Platforma kontrolna',
      movement: 'Ruch',
      facing: 'Okładzina',
      state: 'Państwo',
      stateLabel: 'Państwo',
      facingLabel: 'Okładzina',
      profileLabel: 'Profil',
      noProfile: 'Brak profilu',
      help: 'Pomoc',
      config: 'Konfig',
      states: {
        idle: 'Bezczynny',
        combat: 'Walka',
        walk: 'Chodzić',
        dash: 'Kropla',
        sneak: 'Donosiciel',
        rage: 'Wściekłość',
        spellcasting: 'Rzucanie zaklęć',
        help: 'Pomoc',
      },
    },
    info: {
      subtitle: 'Animowany kierunek i ruch',
      versionLabel: 'Wersja',
      updatedLabel: 'Zaktualizowano',
      creditsBody:
        'A.D.A.M.<br>Animowana reżyseria i ruch<br><br>Powered by SIMON.<br>Zdecydowanie nie nazywa się Simon.',
      ready: 'MOD GOTOWY',
    },
    easter: {
      toTheLeft: 'W lewo, w lewo...',
      notGoingAnywhere: 'ADAM. ustaliło, że tak naprawdę nigdzie się nie wybierasz.',
      areWeThereYet: 'Czy już tam jesteśmy?',
      sneakSpam: 'Nikt cię nie widział.<br>Nikt cię nie widział.<br>Nikt cię nie widział.',
      helpSpam: 'Kto jest dobrą sową?',
      rageRage: 'Dorn by to zaakceptował.',
      simonResponse: '...i nie mów do mnie Simon!',
      simonNoSays: 'Simon co mówi?',
      versionEgg: 'ADAM. v{version}<br><br>Zdecydowanie nie SIMON.',
    },
  };

  const TRANSLATION$6 = {
    titles: {
      error: 'Erro',
      noTokenSelected: 'Nenhum token selecionado',
      tokenError: 'Erro de token',
      missingDirection: 'Direção ausente',
      invalidDirection: 'Direção inválida',
      missingState: 'Estado ausente',
      invalidState: 'Estado inválido',
      missingAction: 'Ação ausente',
      invalidAction: 'Ação inválida',
      accessDenied: 'Acesso negado',
      invalidValue: 'Valor inválido',
      unknownCommand: 'Comando desconhecido',
      moveError: 'Erro ao mover',
      macroExists: 'Macro existe',
      macroInstalled: 'Macro instalada',
      invalidUsage: 'Uso inválido',
      profileAssigned: 'Perfil atribuído',
      profileRemoved: 'Perfil removido',
      unknownProfile: 'Perfil desconhecido',
      configuration: 'Configuração',
      settingsReset: 'Redefinir as configurações',
      scriptReady: 'Script pronto',
      versionInfo: 'Informações da versão',
      creditsTitle: 'Créditos',
      adamsMenu: 'ADÃO. Plataforma de controlo',
      adamsHelp: 'ADÃO. Ajuda',
      adamsSettings: 'ADÃO. Configurações',
      profiles: 'Perfis configurados',
      tokenProfile: 'Perfil de token',
      success: 'Sucesso',
      langSet: 'Language Set',
      langInvalid: 'Idioma inválido',
      profileCreated: 'Perfil criado',
      profileUpdated: 'Perfil atualizado',
      profileDeleted: 'Perfil excluído',
      profileRenamed: 'Perfil renomeado',
      draftSubmitted: 'Rascunho enviado',
      draftApproved: 'Rascunho aprovado',
      draftRejected: 'Rascunho rejeitado',
      pendingDrafts: 'Rascunhos de perfil pendentes',
      profileCreationMode: 'Modo de criação de perfis',
      draftNotification: 'Rascunho de perfil pendente',
    },
    errors: {
      noTokenSelected:
        'Nenhum token selecionado. Selecione primeiro um token e depois clique num botão de direção.',
      noTokenSelectedStill: 'Ainda nenhum token selecionado.',
      noTokenSelectedPersistent: 'Admiro a sua persistência. Selecione primeiro um token.',
      tokenNotFound: 'O token selecionado não foi encontrado.',
      missingDirection:
        'Por favor, forneça uma orientação. Exemplo: <code>!adam --move n</code><br><em>Percursos: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direção desconhecida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (ou nomes completos, como norte, nordeste)',
      missingState: 'Forneça um estado. <br>Válido: {states}',
      invalidState: 'Estado desconhecido: <strong>{value}</strong><br><br>Válido: {states}',
      missingAction:
        'Forneça uma ação. Exemplos: ajuda, feitiço, raiva, corrida, esgueirar-se, ocioso, combate',
      invalidAction:
        'Acção desconhecida: <strong>{value}</strong><br><br>Acções conhecidas: {actions}',
      accessDeniedConfig: 'As alterações de configuração estão restritas ao GM.',
      accessDeniedProfileAssign: 'A atribuição de perfil é restrita ao GM.',
      accessDeniedProfileRemove: 'A remoção do perfil é restrita ao GM.',
      accessDeniedMacro: 'A instalação da macro está restrita ao GM.',
      accessDeniedReset: 'A reposição das definições é restrita ao GM.',
      unknownCommand:
        'Comando desconhecido. Experimente <code>!adam --help</code> para obter uma lista dos comandos disponíveis.',
      moveFailed: 'O movimento falhou.',
      gridSizeInvalid: 'O tamanho da grelha deve ser um número inteiro entre 10 e 1000 (pixéis).',
      moveDistanceInvalid:
        'A distância do movimento deve ser um número inteiro entre 1 e 20 (quadrados).',
      autoFaceInvalid: 'O valor facial automático deve ser: ativado ou desativado.',
      humourInvalid: 'O valor do humor deve ser: ativado ou desativado.',
      langInvalid: 'Local inválido. Compatível: {locales}',
      profileUsage:
        'Utilização: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Utilização: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'O perfil <strong>{id}</strong> não existe. Utilize <code>!adam --profile list</code> para ver os perfis disponíveis.',
      profileUnknownSub:
        'Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válido: listar, mostrar, criar, editar, renomear, apagar, atribuir, remover, rascunho, rascunho, rever, aprovar, rejeitar',
      profileIdInvalid:
        'ID de perfil inválido: <strong>{id}</strong>. Utilize apenas letras, números, hífens e sublinhados (máximo de 50 caracteres).',
      profileAlreadyExists:
        'O perfil <strong>{id}</strong> já existe. Utilize <code>!adam --profile edit-side</code> para o modificar ou eliminar primeiro.',
      profileNotFound: 'Perfil <strong>{id}</strong> não encontrado.',
      profileCreateUsage:
        'Utilização: <código>!adam --profile criar &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Utilização: <code>!adam --profile lado da edição &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Utilização: <code>!adam --profile renomear &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Utilização: <code>!adam --profile apagar &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Utilização: <code>!adam --profile rascunho &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Utilização: <code>!adam --profile lado do rascunho &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Não foi encontrado nenhum rascunho pendente para <strong>{id}</strong>. Envie um com <code>!adam --profile rascunho</code>.',
      profileGmOnly: 'A criação de perfis é restrita ao GM.',
      profileEditGmOnly: 'A modificação deste perfil restringe-se ao GM.',
      profileDeleteGmOnly: 'A exclusão deste perfil é restrita ao GM.',
      profileGlobalReadOnly:
        'O perfil <strong>{id}</strong> é um perfil global e só pode ser modificado pelo GM.',
      profileNotOwned: 'Não tem o perfil <strong>{id}</strong> e não pode modificá-lo.',
      profileModeRequiresDraft:
        'A criação de perfis requer aprovação do GM neste jogo. Utilize <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> para enviar um rascunho.',
      profileAssignNoControl: 'Só pode atribuir perfis pessoais aos tokens que controla.',
      profileAssignNotOwned:
        'Só pode atribuir os seus próprios perfis aos tokens que controla. O perfil <strong>{id}</strong> pertence a outro jogador.',
      profileCreationModeInvalid:
        'Modo de criação de perfil inválido. Válido: apenas GM, aprovado por GM, todos os utilizadores.',
      profileReviewGmOnly: 'Apenas o GM pode rever rascunhos pendentes.',
      profileApproveGmOnly: 'Apenas o GM pode aprovar os rascunhos de perfil.',
      profileRejectGmOnly: 'Apenas o GM pode rejeitar os rascunhos de perfil.',
      invalidAnimSet: 'O conjunto de animação deve ser: norte ou sul.',
      invalidSideNumber: 'O número lateral deve ser um número inteiro positivo (1 ou superior).',
      noDrafts: 'Sem rascunho de perfil pendente.',
      profileDraftConflict:
        'Um draft pendente para <strong>{id}</strong> já existe e pertence a outro jogador.',
      profileDraftNotGmApproved:
        'Os envios de rascunhos só estão disponíveis quando o modo de criação de perfis é <code>aprovado pela GM</code>.',
      profileApproveConflict:
        'Já existe um perfil ativo chamado <strong>{id}</strong>. Apague-o antes de aprovar este rascunho.',
      macroExists: "Uma macro chamada '<strong>{name}</strong>' já existe.",
      simonUnknown:
        'Simon não sabe como: <em>{command}</em><br><br>Tente: <code>!simon diz para mover n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> enfrenta agora <strong>{direction}</strong>.',
      stateSet: 'Estado <strong>{token}</strong> definido como <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> ação: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> atribuído a <strong>{token}</strong>.',
      profileRemoved: 'Perfil removido de <strong>{token}</strong>.',
      profileCreated: 'Perfil <strong>{id}</strong> criado.',
      profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lado {number}.',
      profileRenamed: 'Perfil <strong>{id}</strong> renomeado para <strong>{name}</strong>.',
      profileDeleted: 'Perfil <strong>{id}</strong> eliminado.',
      profileDraftSubmitted:
        'Rascunho do perfil <strong>{id}</strong> enviado para aprovação do GM.',
      profileDraftApproved:
        'Rascunho de perfil <strong>{id}</strong> aprovado e adicionado aos perfis ativos.',
      profileDraftRejected: 'O rascunho do perfil <strong>{id}</strong> foi rejeitado.',
      macroInstalled:
        "A macro global '<strong>{name}</strong>' foi criada e está visível para todos os jogadores.",
      configUpdated: 'Configurações atualizadas.',
      settingsReset: '<strong>As definições foram repostas para os valores de fábrica.</strong>',
      langSet: 'Idioma definido como {locale}.',
    },
    settings: {
      gridSize: 'Tamanho da grelha',
      gridSizeDesc: '{size}px por quadrado',
      moveDistance: 'Mover distância',
      moveDistanceDesc: '{squares} quadrado(s) — {pixels}px por movimento',
      autoFace: 'Rosto automático em movimento',
      humour: 'Humor (ovos da Páscoa)',
      language: 'Idioma',
      profileCreationMode: 'Modo de criação de perfis',
      on: 'Em',
      off: 'Desligado',
    },
    profiles: {
      none: 'Nenhum perfil de token animado está configurado.',
      noProfile: 'O token selecionado não tem perfil atribuído.',
      id: 'ID do perfil',
      displayName: 'Nome de exibição',
      mappedStates: 'Estados mapeados',
      noneValue: '(nenhum)',
      personal: 'pessoal',
      owner: 'Proprietário',
      submittedBy: 'enviado por',
      approveHint:
        'Utilize !adam --profile aprovar &lt;id&gt; para aprovar ou rejeitar &lt;id&gt; para rejeitar.',
    },
    menu: {
      title: 'ADÃO. Plataforma de controlo',
      movement: 'Movimento',
      facing: 'Enfrentando',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Enfrentando',
      profileLabel: 'Perfil',
      noProfile: 'Sem perfil',
      help: 'Ajuda',
      config: 'Configuração',
      states: {
        idle: 'Ocioso',
        combat: 'Combate',
        walk: 'Caminhada',
        dash: 'Travessão',
        sneak: 'Esgueirar-se',
        rage: 'Raiva',
        spellcasting: 'Feitiço',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Direção e movimento animado',
      versionLabel: 'Versão',
      updatedLabel: 'Atualizado',
      creditsBody:
        'A.D.A.M.<br>Realização e movimento animado<br><br>Desenvolvido por SIMON. <br>Definitivamente não se chama Simon.',
      ready: 'MOD PRONTO',
    },
    easter: {
      toTheLeft: 'Para a esquerda, para a esquerda...',
      notGoingAnywhere: 'ADÃO. determinou que não vai realmente a lado nenhum.',
      areWeThereYet: 'Já chegámos?',
      sneakSpam: 'Ninguém te viu. <br>Ninguém te viu. <br>Ninguém te viu.',
      helpSpam: 'Quem é uma boa coruja?',
      rageRage: 'Dorn aprovaria.',
      simonResponse: '...e não me chame Simon!',
      simonNoSays: 'O Simão diz o quê?',
      versionEgg: 'ADÃO. v{version}<br><br>Definitivamente não é SIMON.',
    },
  };

  const TRANSLATION$5 = {
    titles: {
      error: 'Erro',
      noTokenSelected: 'Nenhum token selecionado',
      tokenError: 'Erro de token',
      missingDirection: 'Direção ausente',
      invalidDirection: 'Direção inválida',
      missingState: 'Estado ausente',
      invalidState: 'Estado inválido',
      missingAction: 'Ação ausente',
      invalidAction: 'Ação inválida',
      accessDenied: 'Acesso negado',
      invalidValue: 'Valor inválido',
      unknownCommand: 'Comando desconhecido',
      moveError: 'Erro ao mover',
      macroExists: 'Macro existe',
      macroInstalled: 'Macro instalada',
      invalidUsage: 'Uso inválido',
      profileAssigned: 'Perfil atribuído',
      profileRemoved: 'Perfil removido',
      unknownProfile: 'Perfil desconhecido',
      configuration: 'Configuração',
      settingsReset: 'Redefinir configurações',
      scriptReady: 'Script pronto',
      versionInfo: 'Informações da versão',
      creditsTitle: 'Créditos',
      adamsMenu: 'ADÃO. Plataforma de controle',
      adamsHelp: 'ADÃO. Ajuda',
      adamsSettings: 'ADÃO. Configurações',
      profiles: 'Perfis configurados',
      tokenProfile: 'Perfil de token',
      success: 'Sucesso',
      langSet: 'Conjunto de idiomas',
      langInvalid: 'Idioma inválido',
      profileCreated: 'Perfil criado',
      profileUpdated: 'Perfil atualizado',
      profileDeleted: 'Perfil excluído',
      profileRenamed: 'Perfil renomeado',
      draftSubmitted: 'Rascunho enviado',
      draftApproved: 'Rascunho aprovado',
      draftRejected: 'Rascunho rejeitado',
      pendingDrafts: 'Rascunhos de perfil pendentes',
      profileCreationMode: 'Modo de criação de perfil',
      draftNotification: 'Rascunho de perfil pendente',
    },
    errors: {
      noTokenSelected:
        'Nenhum token selecionado. Selecione um token primeiro e depois clique em um botão de direção.',
      noTokenSelectedStill: 'Ainda nenhum token selecionado.',
      noTokenSelectedPersistent: 'Admiro sua persistência. Selecione um token primeiro.',
      tokenNotFound: 'O token selecionado não foi encontrado.',
      missingDirection:
        'Por favor, forneça uma orientação. Exemplo: <code>!adam --move n</code><br><em>Rotas: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direção desconhecida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (ou nomes completos, como norte, nordeste)',
      missingState: 'Forneça um estado.<br>Válido: {states}',
      invalidState: 'Estado desconhecido: <strong>{value}</strong><br><br>Válido: {states}',
      missingAction:
        'Forneça uma ação. Exemplos: ajuda, feitiço, raiva, corrida, esgueirar-se, ocioso, combate',
      invalidAction:
        'Ação desconhecida: <strong>{value}</strong><br><br>Ações conhecidas: {actions}',
      accessDeniedConfig: 'As alterações de configuração são restritas ao GM.',
      accessDeniedProfileAssign: 'A atribuição de perfil é restrita ao GM.',
      accessDeniedProfileRemove: 'A remoção do perfil é restrita ao GM.',
      accessDeniedMacro: 'A instalação da macro é restrita ao GM.',
      accessDeniedReset: 'A redefinição das configurações é restrita ao GM.',
      unknownCommand:
        'Comando desconhecido. Experimente <code>!adam --help</code> para obter uma lista de comandos disponíveis.',
      moveFailed: 'O movimento falhou.',
      gridSizeInvalid: 'O tamanho da grade deve ser um número inteiro entre 10 e 1000 (pixels).',
      moveDistanceInvalid:
        'A distância do movimento deve ser um número inteiro entre 1 e 20 (quadrados).',
      autoFaceInvalid: 'O valor facial automático deve ser: ativado ou desativado.',
      humourInvalid: 'O valor do humor deve ser: ativado ou desativado.',
      langInvalid: 'Local inválido. Compatível: {locales}',
      profileUsage:
        'Uso: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Uso: <code>!adam --profile atribuir &lt;profileId&gt;</code>',
      profileUnknown:
        'O perfil <strong>{id}</strong> não existe. Use <code>!adam --profile list</code> para ver os perfis disponíveis.',
      profileUnknownSub:
        'Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válido: listar, mostrar, criar, editar, renomear, excluir, atribuir, remover, rascunho, rascunho, revisar, aprovar, rejeitar',
      profileIdInvalid:
        'ID de perfil inválido: <strong>{id}</strong>. Use apenas letras, números, hífens e sublinhados (máximo de 50 caracteres).',
      profileAlreadyExists:
        'O perfil <strong>{id}</strong> já existe. Use <code>!adam --profile edit-side</code> para modificá-lo ou excluí-lo primeiro.',
      profileNotFound: 'Perfil <strong>{id}</strong> não encontrado.',
      profileCreateUsage:
        'Uso: <código>!adam --profile criar &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Uso: <code>!adam --profile lado da edição &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Uso: <code>!adam --profile renomear &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Uso: <code>!adam --profile deletar &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Uso: <code>!adam --profile rascunho &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Uso: <code>!adam --profile lado do rascunho &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Nenhum rascunho pendente encontrado para <strong>{id}</strong>. Envie um com <code>!adam --profile rascunho</code>.',
      profileGmOnly: 'A criação de perfil é restrita ao GM.',
      profileEditGmOnly: 'A modificação deste perfil é restrita ao GM.',
      profileDeleteGmOnly: 'A exclusão deste perfil é restrita ao GM.',
      profileGlobalReadOnly:
        'O perfil <strong>{id}</strong> é um perfil global e só pode ser modificado pelo GM.',
      profileNotOwned: 'Você não possui o perfil <strong>{id}</strong> e não pode modificá-lo.',
      profileModeRequiresDraft:
        'A criação de perfil requer aprovação do GM neste jogo. Use <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> para enviar um rascunho.',
      profileAssignNoControl: 'Você só pode atribuir perfis pessoais aos tokens que você controla.',
      profileAssignNotOwned:
        'Você só pode atribuir seus próprios perfis aos tokens que você controla. O perfil <strong>{id}</strong> pertence a outro jogador.',
      profileCreationModeInvalid:
        'Modo de criação de perfil inválido. Válido: somente GM, aprovado por GM, todos os usuários.',
      profileReviewGmOnly: 'Somente o GM pode revisar rascunhos pendentes.',
      profileApproveGmOnly: 'Somente o GM pode aprovar rascunhos de perfil.',
      profileRejectGmOnly: 'Somente o GM pode rejeitar rascunhos de perfil.',
      invalidAnimSet: 'O conjunto de animação deve ser: norte ou sul.',
      invalidSideNumber: 'O número lateral deve ser um número inteiro positivo (1 ou maior).',
      noDrafts: 'Nenhum rascunho de perfil pendente.',
      profileDraftConflict:
        'Um draft pendente para <strong>{id}</strong> já existe e pertence a outro jogador.',
      profileDraftNotGmApproved:
        'Os envios de rascunhos só estão disponíveis quando o modo de criação de perfil é <code>aprovado pela GM</code>.',
      profileApproveConflict:
        'Já existe um perfil ativo chamado <strong>{id}</strong>. Exclua-o antes de aprovar este rascunho.',
      macroExists: "Uma macro chamada '<strong>{name}</strong>' já existe.",
      simonUnknown:
        'Simon não sabe como: <em>{command}</em><br><br>Tente: <code>!simon diz para mover n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> agora enfrenta <strong>{direction}</strong>.',
      stateSet: 'Estado <strong>{token}</strong> definido como <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> ação: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> atribuído a <strong>{token}</strong>.',
      profileRemoved: 'Perfil removido de <strong>{token}</strong>.',
      profileCreated: 'Perfil <strong>{id}</strong> criado.',
      profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lado {number}.',
      profileRenamed: 'Perfil <strong>{id}</strong> renomeado para <strong>{name}</strong>.',
      profileDeleted: 'Perfil <strong>{id}</strong> excluído.',
      profileDraftSubmitted:
        'Rascunho do perfil <strong>{id}</strong> enviado para aprovação do GM.',
      profileDraftApproved:
        'Rascunho de perfil <strong>{id}</strong> aprovado e adicionado aos perfis ativos.',
      profileDraftRejected: 'O rascunho do perfil <strong>{id}</strong> foi rejeitado.',
      macroInstalled:
        "A macro global '<strong>{name}</strong>' foi criada e está visível para todos os jogadores.",
      configUpdated: 'Configurações atualizadas.',
      settingsReset:
        '<strong>As configurações foram redefinidas para os padrões de fábrica.</strong>',
      langSet: 'Idioma definido como {locale}.',
    },
    settings: {
      gridSize: 'Tamanho da grade',
      gridSizeDesc: '{size}px por quadrado',
      moveDistance: 'Mover distância',
      moveDistanceDesc: '{squares} quadrado(s) — {pixels}px por movimento',
      autoFace: 'Rosto automático em movimento',
      humour: 'Humor (ovos de Páscoa)',
      language: 'Linguagem',
      profileCreationMode: 'Modo de criação de perfil',
      on: 'Sobre',
      off: 'Desligado',
    },
    profiles: {
      none: 'Nenhum perfil de token animado está configurado.',
      noProfile: 'O token selecionado não possui perfil atribuído.',
      id: 'ID do perfil',
      displayName: 'Nome de exibição',
      mappedStates: 'Estados mapeados',
      noneValue: '(nenhum)',
      personal: 'pessoal',
      owner: 'Proprietário',
      submittedBy: 'enviado por',
      approveHint:
        'Use !adam --profile aprovar &lt;id&gt; para aprovar ou rejeitar &lt;id&gt; para rejeitar.',
    },
    menu: {
      title: 'ADÃO. Plataforma de controle',
      movement: 'Movimento',
      facing: 'Enfrentando',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Enfrentando',
      profileLabel: 'Perfil',
      noProfile: 'Sem perfil',
      help: 'Ajuda',
      config: 'Configuração',
      states: {
        idle: 'Parado',
        combat: 'Combate',
        walk: 'Andar',
        dash: 'Traço',
        sneak: 'Esgueirar-se',
        rage: 'Raiva',
        spellcasting: 'Feitiço',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Direção e movimento animado',
      versionLabel: 'Versão',
      updatedLabel: 'Atualizado',
      creditsBody:
        'A.D.A.M.<br>Direção e movimento animado<br><br>Desenvolvido por SIMON.<br>Definitivamente não se chama Simon.',
      ready: 'MOD PRONTO',
    },
    easter: {
      toTheLeft: 'Para a esquerda, para a esquerda...',
      notGoingAnywhere: 'ADÃO. determinou que você não vai realmente a lugar nenhum.',
      areWeThereYet: 'Já chegamos?',
      sneakSpam: 'Ninguém te viu.<br>Ninguém te viu.<br>Ninguém te viu.',
      helpSpam: 'Quem é uma boa coruja?',
      rageRage: 'Dorn aprovaria.',
      simonResponse: '...e não me chame de Simon!',
      simonNoSays: 'Simão diz o quê?',
      versionEgg: 'ADÃO. v{version}<br><br>Definitivamente não é SIMON.',
    },
  };

  const TRANSLATION$4 = {
    titles: {
      error: 'Ошибка',
      noTokenSelected: 'Токен не выбран',
      tokenError: 'Ошибка токена',
      missingDirection: 'Отсутствует направление',
      invalidDirection: 'Неверное направление',
      missingState: 'Отсутствует государство',
      invalidState: 'Недопустимое состояние',
      missingAction: 'Отсутствует действие',
      invalidAction: 'Неверное действие',
      accessDenied: 'Доступ запрещен',
      invalidValue: 'Неверное значение',
      unknownCommand: 'Неизвестная команда',
      moveError: 'Ошибка перемещения',
      macroExists: 'Макрос существует',
      macroInstalled: 'Макрос установлен',
      invalidUsage: 'Неверное использование',
      profileAssigned: 'Профиль назначен',
      profileRemoved: 'Профиль удален',
      unknownProfile: 'Неизвестный профиль',
      configuration: 'Конфигурация',
      settingsReset: 'Сброс настроек',
      scriptReady: 'Сценарий готов',
      versionInfo: 'Информация о версии',
      creditsTitle: 'Кредиты',
      adamsMenu: 'АДАМ. Панель управления',
      adamsHelp: 'АДАМ. Помощь',
      adamsSettings: 'АДАМ. Настройки',
      profiles: 'Настроенные профили',
      tokenProfile: 'Профиль токена',
      success: 'Успех',
      langSet: 'Языковой набор',
      langInvalid: 'Неверный язык',
      profileCreated: 'Профиль создан',
      profileUpdated: 'Профиль обновлен',
      profileDeleted: 'Профиль удален',
      profileRenamed: 'Профиль переименован',
      draftSubmitted: 'Черновик отправлен',
      draftApproved: 'Проект одобрен',
      draftRejected: 'Черновик отклонен',
      pendingDrafts: 'Ожидаемые черновики профиля',
      profileCreationMode: 'Режим создания профиля',
      draftNotification: 'Проект профиля находится на рассмотрении',
    },
    errors: {
      noTokenSelected:
        'Токен не выбран. Сначала выберите токен, а затем нажмите кнопку направления.',
      noTokenSelectedStill: 'Токен по-прежнему не выбран.',
      noTokenSelectedPersistent: 'Я восхищаюсь вашей настойчивостью. Сначала выберите токен.',
      tokenNotFound: 'Выбранный токен не найден.',
      missingDirection:
        'Пожалуйста, укажите направление. Пример: <code>!adam --move n</code><br><em>Направления: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Неизвестное направление: <strong>{value}</strong><br><br>Действительно: n, ne, e, se, s, sw, w, nw (или полные имена, например север, северо-восток).',
      missingState: 'Укажите штат.<br>Действительно: {states}.',
      invalidState:
        'Неизвестное состояние: <strong>{value}</strong><br><br>Действительно: {states}',
      missingAction:
        'Пожалуйста, укажите действие. Примеры: помощь, произнесение заклинаний, ярость, рывок, подкрадывание, бездействие, бой.',
      invalidAction:
        'Неизвестное действие: <strong>{value}</strong><br><br>Известные действия: {actions}',
      accessDeniedConfig: 'Изменения конфигурации доступны только GM.',
      accessDeniedProfileAssign: 'Назначение профиля доступно только GM.',
      accessDeniedProfileRemove: 'Удаление профиля разрешено только GM.',
      accessDeniedMacro: 'Установка макросов разрешена только GM.',
      accessDeniedReset: 'Сброс настроек доступен только GM.',
      unknownCommand:
        'Неизвестная команда. Попробуйте <code>!adam --help</code> для получения списка доступных команд.',
      moveFailed: 'Движение не удалось.',
      gridSizeInvalid: 'Размер сетки должен быть целым числом от 10 до 1000 (пикселей).',
      moveDistanceInvalid:
        'Расстояние перемещения должно быть целым числом от 1 до 20 (квадратики).',
      autoFaceInvalid: 'Автономинал должен быть включен или выключен.',
      humourInvalid: 'Значение юмора должно быть: включено или выключено.',
      langInvalid: 'Неверная локаль. Поддерживается: {locales}',
      profileUsage:
        'Использование: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Использование: <code>!adam --profile назначить &lt;profileId&gt;</code>',
      profileUnknown:
        'Профиль <strong>{id}</strong> не существует. Используйте <code>!adam --profile list</code>, чтобы просмотреть доступные профили.',
      profileUnknownSub:
        'Подкоманда неизвестного профиля: <strong>{sub}</strong><br><br>Действительно: список, показ, создание, редактирование, переименование, удаление, назначение, удаление, черновик, черновик, просмотр, утверждение, отклонение',
      profileIdInvalid:
        'Неверный идентификатор профиля: <strong>{id}</strong>. Используйте только буквы, цифры, дефисы и символы подчеркивания (максимум 50 символов).',
      profileAlreadyExists:
        'Профиль <strong>{id}</strong> уже существует. Используйте <code>!adam --profile на стороне редактирования</code>, чтобы изменить его или сначала удалить.',
      profileNotFound: 'Профиль <strong>{id}</strong> не найден.',
      profileCreateUsage:
        'Использование: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Использование: <code>!adam --profile на стороне редактирования &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Использование: <code>!adam --profile переименовать &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Использование: <code>!adam --profile удалить &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Использование: <code>!adam --profile черновик &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Использование: <code>!adam --profile черновая сторона &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Не найден черновик для <strong>{id}</strong>. Отправьте его с <code>!adam --profile черновиком</code>.',
      profileGmOnly: 'Создание профиля разрешено только GM.',
      profileEditGmOnly: 'Изменение этого профиля разрешено только GM.',
      profileDeleteGmOnly: 'Удаление этого профиля разрешено только GM.',
      profileGlobalReadOnly:
        'Профиль <strong>{id}</strong> является глобальным и может быть изменен только GM.',
      profileNotOwned:
        'Вы не являетесь владельцем профиля <strong>{id}</strong> и не можете его изменить.',
      profileModeRequiresDraft:
        'Для создания профиля в этой игре требуется одобрение ГМ. Используйте <code>!adam --profile черновик &lt;id&gt; &lt;name&gt;</code>, чтобы отправить черновик.',
      profileAssignNoControl:
        'Вы можете назначать личные профили только тем токенам, которыми вы управляете.',
      profileAssignNotOwned:
        'Вы можете назначать свои собственные профили только тем токенам, которыми вы управляете. Профиль <strong>{id}</strong> принадлежит другому игроку.',
      profileCreationModeInvalid:
        'Неверный режим создания профиля. Допустимо: только для GM, одобрено GM, для всех пользователей.',
      profileReviewGmOnly: 'Только ГМ может просматривать ожидающие проекты.',
      profileApproveGmOnly: 'Только ГМ может утверждать черновики профилей.',
      profileRejectGmOnly: 'Только ГМ может отклонить черновики профиля.',
      invalidAnimSet: 'Набор анимации должен быть: север или юг.',
      invalidSideNumber: 'Боковой номер должен быть положительным целым числом (1 или больше).',
      noDrafts: 'Нет ожидающих черновиков профиля.',
      profileDraftConflict:
        'Ожидаемый проект для <strong>{id}</strong> уже существует и принадлежит другому игроку.',
      profileDraftNotGmApproved:
        'Отправленные черновики доступны только в том случае, если режим создания профиля <code>одобрен gm</code>.',
      profileApproveConflict:
        'Активный профиль с именем <strong>{id}</strong> уже существует. Прежде чем одобрять этот черновик, удалите его.',
      macroExists: 'Макрос с именем «<strong>{name}</strong>» уже существует.',
      simonUnknown:
        'Саймон не знает, как: <em>{command}</em><br><br>Попробуй: <code>!Саймон говорит: двигайся n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> теперь сталкивается с <strong>{direction}</strong>.',
      stateSet:
        'Для состояния <strong>{token}</strong> установлено значение <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> действие: <strong>{action}</strong> → состояние: <strong>{state}</strong>.',
      profileAssigned:
        'Профиль <strong>{id}</strong> назначен пользователю <strong>{token}</strong>.',
      profileRemoved: 'Профиль удален из <strong>{token}</strong>.',
      profileCreated: 'Профиль <strong>{id}</strong> создан.',
      profileSideSet: 'Профиль <strong>{id}</strong>: {state}/{animSet} → сторона {number}.',
      profileRenamed: 'Профиль <strong>{id}</strong> переименован в <strong>{name}</strong>.',
      profileDeleted: 'Профиль <strong>{id}</strong> удален.',
      profileDraftSubmitted: 'Черновик профиля <strong>{id}</strong> отправлен на утверждение GM.',
      profileDraftApproved:
        'Черновик профиля <strong>{id}</strong> одобрен и добавлен в активные профили.',
      profileDraftRejected: 'Черновик профиля <strong>{id}</strong> отклонен.',
      macroInstalled: 'Глобальный макрос «<strong>{name}</strong>» создан и виден всем игрокам.',
      configUpdated: 'Настройки обновлены.',
      settingsReset: '<strong>Настройки сброшены до заводских настроек.</strong>',
      langSet: 'Язык установлен на {locale}.',
    },
    settings: {
      gridSize: 'Размер сетки',
      gridSizeDesc: '{size}px на квадрат',
      moveDistance: 'Расстояние перемещения',
      moveDistanceDesc: '{squares} квадратов — {pixels}px за ход',
      autoFace: 'Автоматическое определение лица при движении',
      humour: 'Юмор (пасхалки)',
      language: 'Язык',
      profileCreationMode: 'Режим создания профиля',
      on: 'На',
      off: 'Выключенный',
    },
    profiles: {
      none: 'Анимированные профили токенов не настроены.',
      noProfile: 'Для выбранного токена не назначен профиль.',
      id: 'Идентификатор профиля',
      displayName: 'Отображаемое имя',
      mappedStates: 'Сопоставленные штаты',
      noneValue: '(никто)',
      personal: 'личный',
      owner: 'Владелец',
      submittedBy: 'представлено',
      approveHint:
        'Используйте !adam --profile утвердить &lt;id&gt;, чтобы одобрить, или отклонить &lt;id&gt;, чтобы отклонить.',
    },
    menu: {
      title: 'АДАМ. Панель управления',
      movement: 'Движение',
      facing: 'Облицовка',
      state: 'Состояние',
      stateLabel: 'Состояние',
      facingLabel: 'Облицовка',
      profileLabel: 'Профиль',
      noProfile: 'Нет профиля',
      help: 'Помощь',
      config: 'Конфигурация',
      states: {
        idle: 'Праздный',
        combat: 'Бой',
        walk: 'Ходить',
        dash: 'Бросаться',
        sneak: 'Красться',
        rage: 'Ярость',
        spellcasting: 'Заклинание',
        help: 'Помощь',
      },
    },
    info: {
      subtitle: 'Анимированное направление и движение',
      versionLabel: 'Версия',
      updatedLabel: 'Обновлено',
      creditsBody:
        'A.D.A.M.<br>Анимированные направления и движения<br><br>При поддержке SIMON.<br>Определенно не по имени Саймон.',
      ready: 'МОД ГОТОВ',
    },
    easter: {
      toTheLeft: 'Налево, налево...',
      notGoingAnywhere: 'АДАМ. определил, что на самом деле вы никуда не собираетесь.',
      areWeThereYet: 'Мы уже там?',
      sneakSpam: 'Никто тебя не видел.<br>Никто тебя не видел.<br>Никто тебя не видел.',
      helpSpam: 'Кто такая добрая сова?',
      rageRage: 'Дорн бы одобрил.',
      simonResponse: '...и не называй меня Саймоном!',
      simonNoSays: 'Саймон что говорит?',
      versionEgg: 'АДАМ. v{version}<br><br>Определенно не САЙМОН.',
    },
  };

  const TRANSLATION$3 = {
    titles: {
      error: 'Error',
      noTokenSelected: 'Ningún token seleccionado',
      tokenError: 'Error de token',
      missingDirection: 'dirección perdida',
      invalidDirection: 'Dirección no válida',
      missingState: 'Estado desaparecido',
      invalidState: 'Estado no válido',
      missingAction: 'Acción faltante',
      invalidAction: 'Acción no válida',
      accessDenied: 'Acceso denegado',
      invalidValue: 'Valor no válido',
      unknownCommand: 'Comando desconocido',
      moveError: 'Error de movimiento',
      macroExists: 'La macro existe',
      macroInstalled: 'Macro instalada',
      invalidUsage: 'Uso no válido',
      profileAssigned: 'Perfil asignado',
      profileRemoved: 'Perfil eliminado',
      unknownProfile: 'Perfil desconocido',
      configuration: 'Configuración',
      settingsReset: 'Restablecer configuración',
      scriptReady: 'Guión listo',
      versionInfo: 'Información de versión',
      creditsTitle: 'Créditos',
      adamsMenu: 'ADÁN. Plataforma de control',
      adamsHelp: 'ADÁN. Ayuda',
      adamsSettings: 'ADÁN. Ajustes',
      profiles: 'Perfiles configurados',
      tokenProfile: 'Perfil de token',
      success: 'Éxito',
      langSet: 'Conjunto de idiomas',
      langInvalid: 'Idioma no válido',
      profileCreated: 'Perfil creado',
      profileUpdated: 'Perfil actualizado',
      profileDeleted: 'Perfil eliminado',
      profileRenamed: 'Perfil renombrado',
      draftSubmitted: 'Borrador enviado',
      draftApproved: 'Borrador aprobado',
      draftRejected: 'Borrador rechazado',
      pendingDrafts: 'Borradores de perfil pendientes',
      profileCreationMode: 'Modo de creación de perfil',
      draftNotification: 'Borrador de perfil pendiente',
    },
    errors: {
      noTokenSelected:
        'No se seleccionó ningún token. Primero seleccione un token y luego haga clic en un botón de dirección.',
      noTokenSelectedStill: 'Aún no se ha seleccionado ningún token.',
      noTokenSelectedPersistent: 'Admiro tu persistencia. Seleccione un token primero.',
      tokenNotFound: 'No se pudo encontrar el token seleccionado.',
      missingDirection:
        'Por favor proporcione una dirección. Ejemplo: <code>!adam --move n</code><br><em>Direcciones: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Dirección desconocida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (o nombres completos como norte, noreste)',
      missingState: 'Proporcione un estado.<br>Válido: {states}',
      invalidState: 'Estado desconocido: <strong>{value}</strong><br><br>Válido: {states}',
      missingAction:
        'Por favor proporcione una acción. Ejemplos: ayuda, lanzamiento de hechizos, rabia, carrera, sigilo, inactivo, combate',
      invalidAction:
        'Acción desconocida: <strong>{value}</strong><br><br>Acciones conocidas: {actions}',
      accessDeniedConfig: 'Los cambios de configuración están restringidos al GM.',
      accessDeniedProfileAssign: 'La asignación de perfil está restringida al GM.',
      accessDeniedProfileRemove: 'La eliminación de perfiles está restringida al GM.',
      accessDeniedMacro: 'La instalación de macros está restringida al GM.',
      accessDeniedReset: 'El restablecimiento de la configuración está restringido al GM.',
      unknownCommand:
        'Comando desconocido. Pruebe <code>!adam --help</code> para obtener una lista de comandos disponibles.',
      moveFailed: 'El movimiento fracasó.',
      gridSizeInvalid:
        'El tamaño de la cuadrícula debe ser un número entero entre 10 y 1000 (píxeles).',
      moveDistanceInvalid:
        'La distancia de movimiento debe ser un número entero entre 1 y 20 (cuadrados).',
      autoFaceInvalid: 'El valor nominal automático debe estar: activado o desactivado.',
      humourInvalid: 'El valor del humor debe estar: activado o desactivado.',
      langInvalid: 'Configuración regional no válida. Compatible: {locales}',
      profileUsage:
        'Uso: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</código>',
      profileAssignUsage: 'Uso: <code>!adam --profile asignar &lt;profileId&gt;</code>',
      profileUnknown:
        'El perfil <strong>{id}</strong> no existe. Utilice <code>!adam --profile list</code> para ver los perfiles disponibles.',
      profileUnknownSub:
        'Subcomando de perfil desconocido: <strong>{sub}</strong><br><br>Válido: enumerar, mostrar, crear, editar, renombrar, eliminar, asignar, eliminar, borrador, borrador, revisar, aprobar, rechazar',
      profileIdInvalid:
        'ID de perfil no válido: <strong>{id}</strong>. Utilice únicamente letras, números, guiones y guiones bajos (máximo 50 caracteres).',
      profileAlreadyExists:
        'El perfil <strong>{id}</strong> ya existe. Utilice <code>!adam --profile edit-side</code> para modificarlo o eliminarlo primero.',
      profileNotFound: 'Perfil <strong>{id}</strong> no encontrado.',
      profileCreateUsage:
        'Uso: <código>!adam --profile crear &lt;profileId&gt; &lt;displayName&gt;</código>',
      profileEditSideUsage:
        'Uso: <code>!adam --profile lado de edición &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Uso: <code>!adam --profile renombrar &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Uso: <code>!adam --profile eliminar &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Uso: <code>!adam --profile borrador &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Uso: <code>!adam --profile lado del borrador &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'No se encontró ningún borrador pendiente para <strong>{id}</strong>. Envíe uno con <code>!adam --profile borrador</code>.',
      profileGmOnly: 'La creación de perfiles está restringida al GM.',
      profileEditGmOnly: 'La modificación de este perfil está restringida al DJ.',
      profileDeleteGmOnly: 'La eliminación de este perfil está restringida al GM.',
      profileGlobalReadOnly:
        'El perfil <strong>{id}</strong> es un perfil global y solo puede ser modificado por el DJ.',
      profileNotOwned:
        'No eres propietario del perfil <strong>{id}</strong> y no puedes modificarlo.',
      profileModeRequiresDraft:
        'La creación de perfiles requiere la aprobación del GM en este juego. Utilice <code>!adam --profile borrador &lt;id&gt; &lt;name&gt;</code> para enviar un borrador.',
      profileAssignNoControl: 'Solo puedes asignar perfiles personales a los tokens que controlas.',
      profileAssignNotOwned:
        'Solo puedes asignar tus propios perfiles a los tokens que controlas. El perfil <strong>{id}</strong> pertenece a otro jugador.',
      profileCreationModeInvalid:
        'Modo de creación de perfil no válido. Válido: solo para GM, aprobado para GM, para todos los usuarios.',
      profileReviewGmOnly: 'Sólo el DJ puede revisar los borradores pendientes.',
      profileApproveGmOnly: 'Sólo el DJ puede aprobar borradores de perfil.',
      profileRejectGmOnly: 'Sólo el DJ puede rechazar borradores de perfil.',
      invalidAnimSet: 'El conjunto de animación debe ser: norte o sur.',
      invalidSideNumber: 'El número lateral debe ser un número entero positivo (1 o mayor).',
      noDrafts: 'No hay borradores de perfil pendientes.',
      profileDraftConflict:
        'Ya existe un borrador pendiente para <strong>{id}</strong> y pertenece a otro jugador.',
      profileDraftNotGmApproved:
        'Los borradores solo están disponibles cuando el modo de creación de perfil está <code>aprobado por gm</code>.',
      profileApproveConflict:
        'Ya existe un perfil activo llamado <strong>{id}</strong>. Bórrelo primero antes de aprobar este borrador.',
      macroExists: "Ya existe una macro denominada '<strong>{name}</strong>'.",
      simonUnknown:
        'Simon no sabe cómo: <em>{command}</em><br><br>Intenta: <code>!simon dice mover n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> ahora se enfrenta a <strong>{direction}</strong>.',
      stateSet: 'Estado <strong>{token}</strong> establecido en <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> acción: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> asignado a <strong>{token}</strong>.',
      profileRemoved: 'Perfil eliminado de <strong>{token}</strong>.',
      profileCreated: 'Perfil <strong>{id}</strong> creado.',
      profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lado {number}.',
      profileRenamed: 'Perfil <strong>{id}</strong> renombrado a <strong>{name}</strong>.',
      profileDeleted: 'Perfil <strong>{id}</strong> eliminado.',
      profileDraftSubmitted:
        'Borrador del perfil <strong>{id}</strong> enviado para la aprobación del GM.',
      profileDraftApproved:
        'Borrador de perfil <strong>{id}</strong> aprobado y agregado a los perfiles activos.',
      profileDraftRejected: 'El borrador del perfil <strong>{id}</strong> ha sido rechazado.',
      macroInstalled:
        "Se ha creado la macro global '<strong>{name}</strong>' y es visible para todos los jugadores.",
      configUpdated: 'Configuración actualizada.',
      settingsReset:
        '<strong>La configuración se restablece a los valores predeterminados de fábrica.</strong>',
      langSet: 'Idioma establecido en {locale}.',
    },
    settings: {
      gridSize: 'Tamaño de cuadrícula',
      gridSizeDesc: '{size}px por cuadrado',
      moveDistance: 'Mover distancia',
      moveDistanceDesc: '{squares} cuadrado(s) — {pixels}px por movimiento',
      autoFace: 'Cara automática en movimiento',
      humour: 'Humor (huevos de Pascua)',
      language: 'Idioma',
      profileCreationMode: 'Modo de creación de perfil',
      on: 'En',
      off: 'Apagado',
    },
    profiles: {
      none: 'No se configuran perfiles de tokens animados.',
      noProfile: 'El token seleccionado no tiene ningún perfil asignado.',
      id: 'ID de perfil',
      displayName: 'Nombre para mostrar',
      mappedStates: 'Estados mapeados',
      noneValue: '(ninguno)',
      personal: 'personal',
      owner: 'Dueño',
      submittedBy: 'presentado por',
      approveHint:
        'Utilice !adam --profile aprobar &lt;id&gt; para aprobar o rechazar &lt;id&gt; para rechazar.',
    },
    menu: {
      title: 'ADÁN. Plataforma de control',
      movement: 'Movimiento',
      facing: 'Frente a',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Frente a',
      profileLabel: 'Perfil',
      noProfile: 'Sin perfil',
      help: 'Ayuda',
      config: 'configuración',
      states: {
        idle: 'Inactivo',
        combat: 'Combatir',
        walk: 'Caminar',
        dash: 'Estrellarse',
        sneak: 'Furtivo',
        rage: 'Furia',
        spellcasting: 'Lanzamiento de hechizos',
        help: 'Ayuda',
      },
    },
    info: {
      subtitle: 'Dirección y movimiento animados.',
      versionLabel: 'Versión',
      updatedLabel: 'Actualizado',
      creditsBody:
        'A.D.A.M.<br>Dirección y movimiento animados<br><br>Desarrollado por SIMON.<br>Definitivamente no se llama Simon.',
      ready: 'MODO LISTO',
    },
    easter: {
      toTheLeft: 'A la izquierda, a la izquierda...',
      notGoingAnywhere: 'ADÁN. ha determinado que en realidad no irás a ninguna parte.',
      areWeThereYet: '¿Ya llegamos?',
      sneakSpam: 'Nadie te ha visto.<br>Nadie te ha visto.<br>Nadie te ha visto.',
      helpSpam: '¿Quién es un buen búho?',
      rageRage: 'Dorn lo aprobaría.',
      simonResponse: '...¡y no me llames Simón!',
      simonNoSays: '¿Simón dice qué?',
      versionEgg: 'ADÁN. v{version}<br><br>Definitivamente no SIMON.',
    },
  };

  const TRANSLATION$2 = {
    titles: {
      error: 'Fel',
      noTokenSelected: 'Ingen token har valts',
      tokenError: 'Tokenfel',
      missingDirection: 'Saknar riktning',
      invalidDirection: 'Ogiltig riktning',
      missingState: 'Saknad stat',
      invalidState: 'Ogiltig stat',
      missingAction: 'Saknad åtgärd',
      invalidAction: 'Ogiltig åtgärd',
      accessDenied: 'Åtkomst nekad',
      invalidValue: 'Ogiltigt värde',
      unknownCommand: 'Okänt kommando',
      moveError: 'Flytta fel',
      macroExists: 'Makro finns',
      macroInstalled: 'Makro installerat',
      invalidUsage: 'Ogiltig användning',
      profileAssigned: 'Profil tilldelad',
      profileRemoved: 'Profil borttagen',
      unknownProfile: 'Okänd profil',
      configuration: 'Konfiguration',
      settingsReset: 'Inställningar Återställ',
      scriptReady: 'Manus redo',
      versionInfo: 'Version info',
      creditsTitle: 'Krediter',
      adamsMenu: 'A.D.A.M. Kontrolldäck',
      adamsHelp: 'A.D.A.M. Hjälp',
      adamsSettings: 'A.D.A.M. Inställningar',
      profiles: 'Konfigurerade profiler',
      tokenProfile: 'Token-profil',
      success: 'Framgång',
      langSet: 'Språkinställning',
      langInvalid: 'Ogiltigt språk',
      profileCreated: 'Profil skapad',
      profileUpdated: 'Profilen uppdaterad',
      profileDeleted: 'Profilen raderad',
      profileRenamed: 'Profil Bytt namn',
      draftSubmitted: 'Utkast inlämnat',
      draftApproved: 'Utkast godkänt',
      draftRejected: 'Utkastet avvisats',
      pendingDrafts: 'Väntande profilutkast',
      profileCreationMode: 'Skapa profilläge',
      draftNotification: 'Profilutkast väntar',
    },
    errors: {
      noTokenSelected:
        'Ingen token har valts. Välj först en token och klicka sedan på en riktningsknapp.',
      noTokenSelectedStill: 'Fortfarande ingen token vald.',
      noTokenSelectedPersistent: 'Jag beundrar din uthållighet. Välj en token först.',
      tokenNotFound: 'Det gick inte att hitta den valda token.',
      missingDirection:
        'Vänligen ange en riktning. Exempel: <code>!adam --move n</code><br><em>Vägbeskrivning: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Okänd riktning: <strong>{value}</strong><br><br>Giltigt: n, ne, e, se, s, sw, w, nw (eller fullständiga namn som north, northeast)',
      missingState: 'Ange ett tillstånd.<br>Giltigt: {states}',
      invalidState: 'Okänd status: <strong>{value}</strong><br><br>Giltigt: {states}',
      missingAction: 'Ange en åtgärd. Exempel: hjälp, spellcast, rage, dash, smyga, tomgång, strid',
      invalidAction: 'Okänd åtgärd: <strong>{value}</strong><br><br>Kända åtgärder: {actions}',
      accessDeniedConfig: 'Konfigurationsändringar är begränsade till GM.',
      accessDeniedProfileAssign: 'Profiltilldelning är begränsad till GM.',
      accessDeniedProfileRemove: 'Borttagning av profil är begränsad till GM.',
      accessDeniedMacro: 'Makroinstallation är begränsad till GM.',
      accessDeniedReset: 'Återställning av inställningar är begränsad till GM.',
      unknownCommand:
        'Okänt kommando. Försök med <code>!adam --help</code> för en lista över tillgängliga kommandon.',
      moveFailed: 'Rörelsen misslyckades.',
      gridSizeInvalid: 'Rutnätsstorleken måste vara ett heltal mellan 10 och 1000 (pixlar).',
      moveDistanceInvalid: 'Flyttavstånd måste vara ett heltal mellan 1 och 20 (kvadrat).',
      autoFaceInvalid: 'Automatiskt ansiktsvärde måste vara: på eller av.',
      humourInvalid: 'Humorvärdet måste vara: på eller av.',
      langInvalid: 'Ogiltigt språk. Stöds: {locales}',
      profileUsage:
        'Användning: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Användning: <code>!adam --profile tilldela &lt;profileId&gt;</code>',
      profileUnknown:
        'Profilen <strong>{id}</strong> finns inte. Använd <code>!adam --profile lista</code> för att se tillgängliga profiler.',
      profileUnknownSub:
        'Okänd profilunderkommando: <strong>{sub}</strong><br><br>Giltigt: lista, visa, skapa, redigera-sida, byt namn på, ta bort, tilldela, ta bort, utkast, utkast-sida, granska, godkänn, avvisa',
      profileIdInvalid:
        'Ogiltigt profil-ID: <strong>{id}</strong>. Använd endast bokstäver, siffror, bindestreck och understreck (max 50 tecken).',
      profileAlreadyExists:
        'Profilen <strong>{id}</strong> finns redan. Använd <code>!adam --profile edit-side</code> för att ändra den, eller ta bort den först.',
      profileNotFound: 'Profilen <strong>{id}</strong> hittades inte.',
      profileCreateUsage:
        'Användning: <code>!adam --profile skapa &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Användning: <code>!adam --profile redigeringssida &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Användning: <code>!adam --profile byt namn på &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Användning: <code>!adam --profile radera &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Användning: <code>!adam --profile utkast &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Användning: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Inget väntande utkast hittades för <strong>{id}</strong>. Skicka in en med <code>!adam --profile utkast</code>.',
      profileGmOnly: 'Skapandet av profil är begränsat till GM.',
      profileEditGmOnly: 'Ändring av denna profil är begränsad till GM.',
      profileDeleteGmOnly: 'Att ta bort denna profil är begränsat till GM.',
      profileGlobalReadOnly:
        'Profilen <strong>{id}</strong> är en global profil och kan endast ändras av GM.',
      profileNotOwned: 'Du äger inte profilen <strong>{id}</strong> och kan inte ändra den.',
      profileModeRequiresDraft:
        'Skapande av profil kräver GM-godkännande i det här spelet. Använd <code>!adam --profile utkast &lt;id&gt; &lt;name&gt;</code> för att skicka ett utkast.',
      profileAssignNoControl:
        'Du kan bara tilldela personliga profiler till tokens som du kontrollerar.',
      profileAssignNotOwned:
        'Du kan bara tilldela dina egna profiler till tokens du kontrollerar. Profilen <strong>{id}</strong> tillhör en annan spelare.',
      profileCreationModeInvalid:
        'Ogiltigt läge för att skapa profil. Giltigt: endast gm, gm-godkänd, alla användare.',
      profileReviewGmOnly: 'Endast GM kan granska väntande utkast.',
      profileApproveGmOnly: 'Endast GM kan godkänna profilutkast.',
      profileRejectGmOnly: 'Endast GM kan avvisa profilutkast.',
      invalidAnimSet: 'Animationsuppsättningen måste vara: norr eller söder.',
      invalidSideNumber: 'Sidnummer måste vara ett positivt heltal (1 eller högre).',
      noDrafts: 'Inga väntande profilutkast.',
      profileDraftConflict:
        'A pending draft for <strong>{id}</strong> already exists and belongs to another player.',
      profileDraftNotGmApproved:
        'Inlämningar av utkast är endast tillgängliga när läget för att skapa profil är <code>gm-godkänt</code>.',
      profileApproveConflict:
        'En aktiv profil med namnet <strong>{id}</strong> finns redan. Ta bort det först innan du godkänner det här utkastet.',
      macroExists: "Ett makro med namnet '<strong>{name}</strong>' finns redan.",
      simonUnknown:
        'Simon vet inte hur man: <em>{command}</em><br><br>Prova: <code>!simon säger flytta n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> står nu inför <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> tillstånd inställt på <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> åtgärd: <strong>{action}</strong> → ange: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> tilldelad <strong>{token}</strong>.',
      profileRemoved: 'Profilen har tagits bort från <strong>{token}</strong>.',
      profileCreated: 'Profilen <strong>{id}</strong> har skapats.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → sida {number}.',
      profileRenamed: 'Profilen <strong>{id}</strong> har bytt namn till <strong>{name}</strong>.',
      profileDeleted: 'Profilen <strong>{id}</strong> har tagits bort.',
      profileDraftSubmitted:
        'Utkast till profilen <strong>{id}</strong> har skickats in för GM-godkännande.',
      profileDraftApproved:
        'Profilutkast <strong>{id}</strong> har godkänts och lagts till i aktiva profiler.',
      profileDraftRejected: 'Profilutkast <strong>{id}</strong> har avvisats.',
      macroInstalled:
        'Det globala makrot "<strong>{name}</strong>" har skapats och är synligt för alla spelare.',
      configUpdated: 'Inställningar uppdaterade.',
      settingsReset:
        '<strong>Inställningarna har återställts till fabriksinställningarna.</strong>',
      langSet: 'Språket är inställt på {locale}.',
    },
    settings: {
      gridSize: 'Rutnätsstorlek',
      gridSizeDesc: '{size}px per kvadrat',
      moveDistance: 'Flytta avstånd',
      moveDistanceDesc: '{squares} kvadrat(ar) — {pixels}px per drag',
      autoFace: 'Auto-ansikte i rörelse',
      humour: 'Humor (påskägg)',
      language: 'Språk',
      profileCreationMode: 'Skapa profilläge',
      on: 'På',
      off: 'Av',
    },
    profiles: {
      none: 'Inga animerade tokenprofiler är konfigurerade.',
      noProfile: 'Den valda token har ingen profil tilldelad.',
      id: 'Profil-ID',
      displayName: 'Visningsnamn',
      mappedStates: 'Kartlagda stater',
      noneValue: '(ingen)',
      personal: 'personlig',
      owner: 'Ägare',
      submittedBy: 'inlämnat av',
      approveHint:
        'Använd !adam --profile godkänn &lt;id&gt; för att godkänna eller avvisa &lt;id&gt; för att avvisa.',
    },
    menu: {
      title: 'A.D.A.M. Kontrolldäck',
      movement: 'Rörelse',
      facing: 'Motstående',
      state: 'Ange',
      stateLabel: 'Ange',
      facingLabel: 'Motstående',
      profileLabel: 'Profil',
      noProfile: 'Ingen profil',
      help: 'Hjälp',
      config: 'Konfig',
      states: {
        idle: 'På tomgång',
        combat: 'Bekämpa',
        walk: 'Promenad',
        dash: 'Rusa',
        sneak: 'Smyga sig',
        rage: 'Rasa',
        spellcasting: 'Spellcast',
        help: 'Hjälp',
      },
    },
    info: {
      subtitle: 'Animerad riktning och rörelse',
      versionLabel: 'Version',
      updatedLabel: 'Uppdaterad',
      creditsBody:
        'A.D.A.M.<br>Animerad regi och rörelse<br><br>Drift av SIMON.<br>Definitivt inte kallad Simon.',
      ready: 'MOD KLART',
    },
    easter: {
      toTheLeft: 'Till vänster, till vänster...',
      notGoingAnywhere: 'A.D.A.M. har bestämt att du faktiskt inte ska någonstans.',
      areWeThereYet: 'Är vi där än?',
      sneakSpam: 'Ingen har sett dig.<br>Ingen har sett dig.<br>Ingen har sett dig.',
      helpSpam: 'Vem är en bra uggla?',
      rageRage: 'Dorn skulle godkänna.',
      simonResponse: '...och kalla mig inte Simon!',
      simonNoSays: 'Simon säger vad?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Definitivt inte SIMON.',
    },
  };

  const TRANSLATION$1 = {
    titles: {
      error: 'Hata',
      noTokenSelected: 'Jeton Seçilmedi',
      tokenError: 'Belirteç Hatası',
      missingDirection: 'Eksik Yön',
      invalidDirection: 'Geçersiz Yön',
      missingState: 'Eksik Durum',
      invalidState: 'Geçersiz Durum',
      missingAction: 'Eksik İşlem',
      invalidAction: 'Geçersiz İşlem',
      accessDenied: 'Erişim engellendi',
      invalidValue: 'Geçersiz Değer',
      unknownCommand: 'Bilinmeyen Komut',
      moveError: 'Taşıma Hatası',
      macroExists: 'Makro Var',
      macroInstalled: 'Makro Yüklendi',
      invalidUsage: 'Geçersiz Kullanım',
      profileAssigned: 'Profil Atandı',
      profileRemoved: 'Profil Kaldırıldı',
      unknownProfile: 'Bilinmeyen Profil',
      configuration: 'Yapılandırma',
      settingsReset: 'Ayarları Sıfırla',
      scriptReady: 'Senaryo Hazır',
      versionInfo: 'Sürüm Bilgisi',
      creditsTitle: 'Kredi',
      adamsMenu: 'A.D.A.M. Kontrol Paneli',
      adamsHelp: 'A.D.A.M. Yardım',
      adamsSettings: 'A.D.A.M. Ayarlar',
      profiles: 'Yapılandırılmış Profiller',
      tokenProfile: 'Jeton Profili',
      success: 'Başarı',
      langSet: 'Dil Seti',
      langInvalid: 'Geçersiz Dil',
      profileCreated: 'Profil Oluşturuldu',
      profileUpdated: 'Profil Güncellendi',
      profileDeleted: 'Profil Silindi',
      profileRenamed: 'Profil Yeniden Adlandırıldı',
      draftSubmitted: 'Taslak Gönderildi',
      draftApproved: 'Taslak Onaylandı',
      draftRejected: 'Taslak Reddedildi',
      pendingDrafts: 'Bekleyen Profil Taslakları',
      profileCreationMode: 'Profil Oluşturma Modu',
      draftNotification: 'Profil Taslağı Bekleniyor',
    },
    errors: {
      noTokenSelected:
        'Belirteç seçilmedi. Lütfen önce bir jeton seçin, ardından bir yön düğmesine tıklayın.',
      noTokenSelectedStill: 'Hala jeton seçilmedi.',
      noTokenSelectedPersistent: 'Azmine hayranım. Önce bir jeton seçin.',
      tokenNotFound: 'Seçilen jeton bulunamadı.',
      missingDirection:
        'Lütfen bir yön belirtin. Örnek: <code>!adam --move n</code><br><em>Yol Tarifi: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Bilinmeyen yön: <strong>{value}</strong><br><br>Geçerli: n, ne, e, se, s, sw, w, nw (veya kuzey, kuzeydoğu gibi tam adlar)',
      missingState: 'Lütfen bir durum belirtin.<br>Geçerli: {states}',
      invalidState: 'Bilinmeyen durum: <strong>{value}</strong><br><br>Geçerli: {states}',
      missingAction:
        'Lütfen bir işlem sağlayın. Örnekler: yardım, büyü yapma, öfke, atılma, gizlice girme, boşta kalma, dövüş',
      invalidAction:
        'Bilinmeyen eylem: <strong>{value}</strong><br><br>Bilinen eylemler: {actions}',
      accessDeniedConfig: 'Konfigürasyon değişiklikleri GM ile sınırlıdır.',
      accessDeniedProfileAssign: 'Profil ataması GM ile sınırlıdır.',
      accessDeniedProfileRemove: 'Profil kaldırma GM ile sınırlıdır.',
      accessDeniedMacro: 'Makro kurulumu GM ile sınırlıdır.',
      accessDeniedReset: 'Ayarların sıfırlanması GM ile sınırlıdır.',
      unknownCommand:
        'Bilinmeyen komut. Kullanılabilir komutların listesi için <code>!adam --help</code> komutunu deneyin.',
      moveFailed: 'Hareket başarısız oldu.',
      gridSizeInvalid: 'Izgara boyutu 10 ile 1000 (piksel) arasında bir tam sayı olmalıdır.',
      moveDistanceInvalid: 'Hareket mesafesi 1 ile 20 arasında bir tam sayı (kareler) olmalıdır.',
      autoFaceInvalid: 'Otomatik yüz değeri şu şekilde olmalıdır: açık veya kapalı.',
      humourInvalid: 'Mizah değeri şu şekilde olmalıdır: açık veya kapalı.',
      langInvalid: 'Geçersiz yerel ayar. Desteklenen: {locales}',
      profileUsage:
        'Kullanım: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Kullanım: <code>!adam --profile atama &lt;profileId&gt;</code>',
      profileUnknown:
        "<strong>{id}</strong> profili mevcut değil. Kullanılabilir profilleri görmek için <code>!adam --profile list</code>'i kullanın.",
      profileUnknownSub:
        'Bilinmeyen profil alt komutu: <strong>{sub}</strong><br><br>Geçerli: listele, göster, oluştur, düzenleme tarafı, yeniden adlandır, sil, atama, kaldır, taslak, taslak tarafı, incele, onayla, reddet',
      profileIdInvalid:
        'Geçersiz profil kimliği: <strong>{id}</strong>. Yalnızca harf, sayı, kısa çizgi ve alt çizgi kullanın (en fazla 50 karakter).',
      profileAlreadyExists:
        "<strong>{id}</strong> profili zaten mevcut. Değiştirmek için <code>!adam --profile düzenleme tarafı</code>'nı kullanın veya önce silin.",
      profileNotFound: '<strong>{id}</strong> profili bulunamadı.',
      profileCreateUsage:
        'Kullanım: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Kullanım: <code>!adam --profile düzenleme tarafı &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Kullanım: <code>!adam --profile yeniden adlandır &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Kullanım: <code>!adam --profile sil &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Kullanım: <code>!adam --profile taslak &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Kullanım: <code>!adam --profile taslak tarafı &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        '<strong>{id}</strong> için bekleyen taslak bulunamadı. <code>!adam --profile taslağını</code> içeren bir tane gönderin.',
      profileGmOnly: 'Profil oluşturma GM ile sınırlıdır.',
      profileEditGmOnly: 'Bu profilin değiştirilmesi GM ile sınırlıdır.',
      profileDeleteGmOnly: 'Bu profilin silinmesi GM ile sınırlıdır.',
      profileGlobalReadOnly:
        '<strong>{id}</strong> profili global bir profildir ve yalnızca GM tarafından değiştirilebilir.',
      profileNotOwned:
        '<strong>{id}</strong> profilinin sahibi değilsiniz ve onu değiştiremezsiniz.',
      profileModeRequiresDraft:
        'Bu oyunda profil oluşturmak GM onayı gerektirir. Taslak göndermek için <code>!adam --profile taslak &lt;id&gt; &lt;name&gt;</code> kullanın.',
      profileAssignNoControl:
        'Kişisel profilleri yalnızca kontrol ettiğiniz tokenlara atayabilirsiniz.',
      profileAssignNotOwned:
        'Kendi profillerinizi yalnızca kontrol ettiğiniz tokenlara atayabilirsiniz. <strong>{id}</strong> profili başka bir oyuncuya ait.',
      profileCreationModeInvalid:
        'Geçersiz profil oluşturma modu. Geçerli: yalnızca gm, gm onaylı, tüm kullanıcılar.',
      profileReviewGmOnly: 'Bekleyen taslakları yalnızca GM inceleyebilir.',
      profileApproveGmOnly: 'Profil taslaklarını yalnızca GM onaylayabilir.',
      profileRejectGmOnly: 'Profil taslaklarını yalnızca GM reddedebilir.',
      invalidAnimSet: 'Animasyon seti şu şekilde olmalıdır: kuzey veya güney.',
      invalidSideNumber: 'Yan numara pozitif bir tamsayı (1 veya daha büyük) olmalıdır.',
      noDrafts: 'Bekleyen profil taslağı yok.',
      profileDraftConflict:
        '<strong>{id}</strong> için beklemede olan bir taslak zaten mevcut ve başka bir oyuncuya ait.',
      profileDraftNotGmApproved:
        'Taslak gönderimleri yalnızca profil oluşturma modu <code>gm onaylı</code> olduğunda kullanılabilir.',
      profileApproveConflict:
        '<strong>{id}</strong> adlı etkin bir profil zaten mevcut. Bu taslağı onaylamadan önce onu silin.',
      macroExists: "'<strong>{name}</strong>' adlı bir makro zaten mevcut.",
      simonUnknown:
        "Simon nasıl yapılacağını bilmiyor: <em>{command}</em><br><br>Dene: <code>!simon n'yi hareket ettir diyor</code>",
    },
    confirm: {
      facing: '<strong>{token}</strong> artık <strong>{direction}</strong> ile karşı karşıya.',
      stateSet: '<strong>{token}</strong> durumu <strong>{state}</strong> olarak ayarlandı.',
      actionSet:
        '<strong>{token}</strong> eylem: <strong>{action}</strong> → durum: <strong>{state}</strong>.',
      profileAssigned: "<strong>{id}</strong> profili <strong>{token}</strong>'e atandı.",
      profileRemoved: 'Profil <strong>{token}</strong> konumundan kaldırıldı.',
      profileCreated: '<strong>{id}</strong> profili oluşturuldu.',
      profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → yan {number}.',
      profileRenamed:
        '<strong>{id}</strong> profili <strong>{name}</strong> olarak yeniden adlandırıldı.',
      profileDeleted: '<strong>{id}</strong> profili silindi.',
      profileDraftSubmitted:
        '<strong>{id}</strong> profiline ilişkin taslak GM onayına gönderildi.',
      profileDraftApproved:
        'Profil taslağı <strong>{id}</strong> onaylandı ve etkin profillere eklendi.',
      profileDraftRejected: '<strong>{id}</strong> profil taslağı reddedildi.',
      macroInstalled:
        "Küresel makro '<strong>{name}</strong>' oluşturuldu ve tüm oyuncular tarafından görülebilir.",
      configUpdated: 'Ayarlar güncellendi.',
      settingsReset: '<strong>Ayarlar fabrika varsayılanlarına sıfırlandı.</strong>',
      langSet: 'Dil {locale} olarak ayarlandı.',
    },
    settings: {
      gridSize: 'Izgara Boyutu',
      gridSizeDesc: 'Kare başına {size}px',
      moveDistance: 'Hareket Mesafesi',
      moveDistanceDesc: '{squares} kareler — hamle başına {pixels}px',
      autoFace: 'Hareket Halinde Otomatik Yüzleşme',
      humour: 'Mizah (Paskalya Yumurtaları)',
      language: 'Dil',
      profileCreationMode: 'Profil Oluşturma Modu',
      on: 'Açık',
      off: 'Kapalı',
    },
    profiles: {
      none: 'Hiçbir animasyonlu belirteç profili yapılandırılmamış.',
      noProfile: 'Seçilen belirtecin atanmış profili yok.',
      id: 'Profil Kimliği',
      displayName: 'Ekran adı',
      mappedStates: 'Haritalanmış Eyaletler',
      noneValue: '(hiçbiri)',
      personal: 'kişisel',
      owner: 'Mal sahibi',
      submittedBy: 'tarafından gönderildi',
      approveHint:
        'Onaylamak için !adam --profile onaylama &lt;id&gt; kullanın veya reddetmek için &lt;id&gt; kullanın.',
    },
    menu: {
      title: 'A.D.A.M. Kontrol Paneli',
      movement: 'Hareket',
      facing: 'bakan',
      state: 'Durum',
      stateLabel: 'Durum',
      facingLabel: 'bakan',
      profileLabel: 'Profil',
      noProfile: 'Profil yok',
      help: 'Yardım',
      config: 'Yapılandırma',
      states: {
        idle: 'Boşta',
        combat: 'Dövüş',
        walk: 'Yürümek',
        dash: 'Çizgi',
        sneak: 'Gizlice',
        rage: 'Öfkelenmek',
        spellcasting: 'Büyü Yayını',
        help: 'Yardım',
      },
    },
    info: {
      subtitle: 'Animasyonlu Yön ve Hareket',
      versionLabel: 'Sürüm',
      updatedLabel: 'Güncellendi',
      creditsBody:
        'A.D.A.M.<br>Animasyonlu Yön ve Hareket<br><br>SIMON Tarafından Desteklenmiştir.<br>Kesinlikle Simon olarak adlandırılmamıştır.',
      ready: 'MOD HAZIR',
    },
    easter: {
      toTheLeft: 'Sola, sola...',
      notGoingAnywhere: 'A.D.A.M. aslında hiçbir yere gitmeyeceğinizi belirledi.',
      areWeThereYet: 'Henüz orada mıyız?',
      sneakSpam: 'Kimse seni görmedi.<br>Kimse seni görmedi.<br>Kimse seni görmedi.',
      helpSpam: 'İyi bir baykuş kimdir?',
      rageRage: 'Dorn bunu onaylardı.',
      simonResponse: '...ve bana Simon deme!',
      simonNoSays: 'Simon ne diyor?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Kesinlikle SIMON değil.',
    },
  };

  const TRANSLATION = {
    titles: {
      error: 'Помилка',
      noTokenSelected: 'Токен не вибрано',
      tokenError: 'Помилка маркера',
      missingDirection: 'Відсутній напрямок',
      invalidDirection: 'Недійсний напрямок',
      missingState: 'Відсутня держава',
      invalidState: 'Недійсний стан',
      missingAction: 'Відсутня дія',
      invalidAction: 'Недійсна дія',
      accessDenied: 'Доступ заборонено',
      invalidValue: 'Недійсне значення',
      unknownCommand: 'Невідома команда',
      moveError: 'Помилка переміщення',
      macroExists: 'Макрос існує',
      macroInstalled: 'Макрос встановлено',
      invalidUsage: 'Недійсне використання',
      profileAssigned: 'Профіль призначено',
      profileRemoved: 'Профіль видалено',
      unknownProfile: 'Невідомий профіль',
      configuration: 'Конфігурація',
      settingsReset: 'Скидання налаштувань',
      scriptReady: 'Сценарій готовий',
      versionInfo: 'Інформація про версію',
      creditsTitle: 'Кредити',
      adamsMenu: 'A.D.A.M. Контрольна колода',
      adamsHelp: 'A.D.A.M. Довідка',
      adamsSettings: 'A.D.A.M. Налаштування',
      profiles: 'Налаштовані профілі',
      tokenProfile: 'Профіль маркера',
      success: 'Успіх',
      langSet: 'Мовний набір',
      langInvalid: 'Недійсна мова',
      profileCreated: 'Профіль створено',
      profileUpdated: 'Профіль оновлено',
      profileDeleted: 'Профіль видалено',
      profileRenamed: 'Профіль перейменовано',
      draftSubmitted: 'Проект надіслано',
      draftApproved: 'Проект схвалено',
      draftRejected: 'Чернетку відхилено',
      pendingDrafts: 'Чернетки профілю, що очікують на розгляд',
      profileCreationMode: 'Режим створення профілю',
      draftNotification: 'Чернетка профілю очікує на розгляд',
    },
    errors: {
      noTokenSelected:
        'Жетон не вибрано. Будь ласка, спочатку виберіть маркер, а потім натисніть кнопку напрямку.',
      noTokenSelectedStill: 'Жетон не вибрано.',
      noTokenSelectedPersistent: 'Я захоплююся вашою наполегливістю. Спочатку виберіть маркер.',
      tokenNotFound: 'Вибраний маркер не знайдено.',
      missingDirection:
        'Будь ласка, дайте напрямок. Приклад: <code>!adam --move n</code><br><em>Напрямки: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Невідомий напрямок: <strong>{value}</strong><br><br>Дійсно: n, ne, e, se, s, sw, w, nw (або повні назви, як-от північ, північний схід)',
      missingState: 'Укажіть стан.<br>Дійсно: {states}',
      invalidState: 'Невідомий стан: <strong>{value}</strong><br><br>Дійсний: {states}',
      missingAction: 'Укажіть дію. Приклади: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Невідома дія: <strong>{value}</strong><br><br>Відомі дії: {actions}',
      accessDeniedConfig: 'Зміни конфігурації обмежені для GM.',
      accessDeniedProfileAssign: 'Призначення профілю обмежується GM.',
      accessDeniedProfileRemove: 'Видалення профілю обмежується GM.',
      accessDeniedMacro: 'Встановлення макросу обмежено GM.',
      accessDeniedReset: 'Скидання налаштувань обмежено для GM.',
      unknownCommand:
        'Невідома команда. Спробуйте <code>!adam --help</code>, щоб переглянути список доступних команд.',
      moveFailed: 'Рух не вдалося.',
      gridSizeInvalid: 'Розмір сітки має бути цілим числом від 10 до 1000 (пікселів).',
      moveDistanceInvalid: 'Відстань переміщення має бути цілим числом від 1 до 20 (квадрати).',
      autoFaceInvalid: 'Автоматичне номінал має бути: увімкнено або вимкнено.',
      humourInvalid: 'Значення гумору має бути: увімкнено або вимкнено.',
      langInvalid: 'Недійсна мова. Підтримується: {locales}',
      profileUsage:
        'Використання: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
      profileAssignUsage: 'Використання: <code>!adam --profile призначити &lt;profileId&gt;</code>',
      profileUnknown:
        'Профіль <strong>{id}</strong> не існує. Використовуйте <code>!adam --profile list</code>, щоб переглянути доступні профілі.',
      profileUnknownSub:
        'Невідома підкоманда профілю: <strong>{sub}</strong><br><br>Дійсна: список, показати, створити, на стороні редагування, перейменувати, видалити, призначити, видалити, чернетка, на стороні чернетки, переглянути, схвалити, відхилити',
      profileIdInvalid:
        'Недійсний ідентифікатор профілю: <strong>{id}</strong>. Використовуйте лише літери, цифри, дефіси та підкреслення (максимум 50 символів).',
      profileAlreadyExists:
        'Профіль <strong>{id}</strong> вже існує. Використовуйте <code>!adam --profile edit-side</code>, щоб змінити його, або спочатку видаліть.',
      profileNotFound: 'Профіль <strong>{id}</strong> не знайдено.',
      profileCreateUsage:
        'Використання: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileEditSideUsage:
        'Використання: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileRenameUsage:
        'Використання: <code>!adam --profile перейменувати &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDeleteUsage: 'Використання: <code>!adam --profile delete &lt;profileId&gt;</code>',
      profileDraftUsage:
        'Використання: <code>!adam --profile чернетка &lt;profileId&gt; &lt;displayName&gt;</code>',
      profileDraftSideUsage:
        'Використання: <code>!adam --profile чернетка &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
      profileDraftNotFound:
        'Для <strong>{id}</strong> не знайдено чернетки, що очікує на розгляд. Надішліть один із <code>!adam --profile чернетка</code>.',
      profileGmOnly: 'Profile creation is restricted to the GM.',
      profileEditGmOnly: 'Змінювати цей профіль може лише GM.',
      profileDeleteGmOnly: 'Видалення цього профілю обмежено для GM.',
      profileGlobalReadOnly:
        'Профіль <strong>{id}</strong> є глобальним профілем і може бути змінений лише GM.',
      profileNotOwned: 'Ви не є власником профілю <strong>{id}</strong> і не можете його змінити.',
      profileModeRequiresDraft:
        'Для створення профілю в цій грі потрібне схвалення GM. Використовуйте <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code>, щоб надіслати чернетку.',
      profileAssignNoControl:
        'Ви можете призначити особисті профілі лише тим маркерам, якими ви керуєте.',
      profileAssignNotOwned:
        'Ви можете призначити власні профілі лише тим маркерам, якими ви керуєте. Профіль <strong>{id}</strong> належить іншому гравцеві.',
      profileCreationModeInvalid:
        'Недійсний режим створення профілю. Дійсний: тільки для gm, схвалено gm, для всіх користувачів.',
      profileReviewGmOnly: 'Лише GM може розглядати проекти, що очікують на розгляд.',
      profileApproveGmOnly: 'Тільки GM може затверджувати проекти профілів.',
      profileRejectGmOnly: 'Лише GM може відхилити чернетки профілю.',
      invalidAnimSet: 'Набір анімації повинен бути: північ або південь.',
      invalidSideNumber: 'Номер сторони має бути додатним цілим числом (1 або більше).',
      noDrafts: 'Немає незавершених чернеток профілю.',
      profileDraftConflict:
        'Чернетка для <strong>{id}</strong> вже існує та належить іншому гравцеві.',
      profileDraftNotGmApproved:
        'Чернетки доступні, лише якщо режим створення профілю <code>схвалено gm</code>.',
      profileApproveConflict:
        'Активний профіль під назвою <strong>{id}</strong> вже існує. Перш ніж затверджувати чернетку, видаліть його.',
      macroExists: 'Макрос під назвою "<strong>{name}</strong>" вже існує.',
      simonUnknown:
        'Саймон не знає, як: <em>{command}</em><br><br>Спробуйте: <code>!Саймон каже рухатися</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> тепер стикається з <strong>{direction}</strong>.',
      stateSet: 'Для <strong>{token}</strong> встановлено <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> дія: <strong>{action}</strong> → стан: <strong>{state}</strong>.',
      profileAssigned: 'Профіль <strong>{id}</strong> призначено для <strong>{token}</strong>.',
      profileRemoved: 'Профіль видалено з <strong>{token}</strong>.',
      profileCreated: 'Профіль <strong>{id}</strong> створено.',
      profileSideSet: 'Профіль <strong>{id}</strong>: {state}/{animSet} → сторона {number}.',
      profileRenamed: 'Профіль <strong>{id}</strong> перейменовано на <strong>{name}</strong>.',
      profileDeleted: 'Профіль <strong>{id}</strong> видалено.',
      profileDraftSubmitted: 'Проект профілю <strong>{id}</strong> подано на затвердження GM.',
      profileDraftApproved:
        'Чернетку профілю <strong>{id}</strong> схвалено та додано до активних профілів.',
      profileDraftRejected: 'Чернетку профілю <strong>{id}</strong> відхилено.',
      macroInstalled:
        'Глобальний макрос "<strong>{name}</strong>" створено, і його бачать усі гравці.',
      configUpdated: 'Налаштування оновлено.',
      settingsReset: '<strong>Скидання налаштувань до заводських значень.</strong>',
      langSet: 'Вибрано мову {locale}.',
    },
    settings: {
      gridSize: 'Розмір сітки',
      gridSizeDesc: '{size}px на квадрат',
      moveDistance: 'Відстань переміщення',
      moveDistanceDesc: '{squares} квадрат(ів) — {pixels}px за хід',
      autoFace: 'Автоматичне обличчя під час руху',
      humour: 'Гумор (пасхальні яйця)',
      language: 'Мова',
      profileCreationMode: 'Режим створення профілю',
      on: 'Увімкнено',
      off: 'Вимкнено',
    },
    profiles: {
      none: 'Профілі анімованих маркерів не налаштовано.',
      noProfile: 'Вибраному маркеру не призначено профіль.',
      id: 'ID профілю',
      displayName: "Відображуване ім'я",
      mappedStates: 'Нанесені на карту держави',
      noneValue: '(жоден)',
      personal: 'особистий',
      owner: 'Власник',
      submittedBy: 'подано',
      approveHint:
        'Використовуйте !adam --profile approve &lt;id&gt;, щоб схвалити, або відхилити &lt;id&gt;, щоб відхилити.',
    },
    menu: {
      title: 'A.D.A.M. Контрольна колода',
      movement: 'Рух',
      facing: 'Облицювання',
      state: 'Держава',
      stateLabel: 'Держава',
      facingLabel: 'Облицювання',
      profileLabel: 'Профіль',
      noProfile: 'Без профілю',
      help: 'Довідка',
      config: 'Конфігурація',
      states: {
        idle: 'Бездіяльність',
        combat: 'Бойовий',
        walk: 'Прогулянка',
        dash: 'Тире',
        sneak: 'Підкрастися',
        rage: 'лють',
        spellcasting: 'Заклинання',
        help: 'Довідка',
      },
    },
    info: {
      subtitle: 'Анімований напрямок і рух',
      versionLabel: 'Версія',
      updatedLabel: 'Оновлено',
      creditsBody:
        'A.D.A.M.<br>Анімаційний напрямок і рух<br><br>На основі SIMON.<br>Звичайно не називається Саймон.',
      ready: 'МОД ГОТОВИЙ',
    },
    easter: {
      toTheLeft: 'Наліво, наліво...',
      notGoingAnywhere: 'A.D.A.M. вирішив, що ти насправді нікуди не збираєшся.',
      areWeThereYet: 'Ми вже там?',
      sneakSpam: 'Вас ніхто не бачив.<br>Вас ніхто не бачив.<br>Вас ніхто не бачив.',
      helpSpam: 'Хто хороша сова?',
      rageRage: 'Дорн схвалив би.',
      simonResponse: '...і не називай мене Саймон!',
      simonNoSays: 'Саймон каже що?',
      versionEgg: 'A.D.A.M. v{version}<br><br>Безумовно не SIMON.',
    },
  };

  const DEFAULT_LOCALE = 'en-US';

  const LOCALE_DEFINITIONS = Object.freeze([
    {
      code: 'af',
      name: 'Afrikaans',
      direction: 'ltr',
      translationFile: 'locale/af.js',
      flag: '🇿🇦',
      flagLabel: 'Flag of South Africa',
    },
    {
      code: 'ca',
      name: 'Catalan',
      nativeName: 'Català',
      direction: 'ltr',
      translationFile: 'locale/ca.js',
      flag: '🇪🇸',
      flagLabel: 'Flag of Spain',
    },
    {
      code: 'zh-TW',
      name: 'Chinese (Traditional)',
      nativeName: '正體中文',
      direction: 'ltr',
      translationFile: 'locale/zh-TW.js',
      aliases: ['zh'],
      flag: '🇹🇼',
      flagLabel: 'Flag of Taiwan',
    },
    {
      code: 'cs',
      name: 'Czech',
      nativeName: 'Čeština',
      direction: 'ltr',
      translationFile: 'locale/cs.js',
      flag: '🇨🇿',
      flagLabel: 'Flag of Czechia',
    },
    {
      code: 'da',
      name: 'Danish',
      nativeName: 'Dansk',
      direction: 'ltr',
      translationFile: 'locale/da.js',
      flag: '🇩🇰',
      flagLabel: 'Flag of Denmark',
    },
    {
      code: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      direction: 'ltr',
      translationFile: 'locale/nl.js',
      flag: '🇳🇱',
      flagLabel: 'Flag of the Netherlands',
    },
    {
      code: 'en-US',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      translationFile: 'locale/en-US.js',
      aliases: ['en'],
      flag: '🇺🇸',
      flagLabel: 'Flag of the United States',
    },
    {
      code: 'fi',
      name: 'Finnish',
      nativeName: 'Suomeksi',
      direction: 'ltr',
      translationFile: 'locale/fi.js',
      flag: '🇫🇮',
      flagLabel: 'Flag of Finland',
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      direction: 'ltr',
      translationFile: 'locale/fr.js',
      flag: '🇫🇷',
      flagLabel: 'Flag of France',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      direction: 'ltr',
      translationFile: 'locale/de.js',
      flag: '🇩🇪',
      flagLabel: 'Flag of Germany',
    },
    {
      code: 'el',
      name: 'Greek',
      nativeName: 'Ελληνικά',
      direction: 'ltr',
      translationFile: 'locale/el.js',
      flag: '🇬🇷',
      flagLabel: 'Flag of Greece',
    },
    {
      code: 'he',
      name: 'Hebrew',
      nativeName: 'עברית',
      direction: 'rtl',
      translationFile: 'locale/he.js',
      flag: '🇮🇱',
      flagLabel: 'Flag of Israel',
    },
    {
      code: 'hu',
      name: 'Hungarian',
      nativeName: 'Magyar',
      direction: 'ltr',
      translationFile: 'locale/hu.js',
      flag: '🇭🇺',
      flagLabel: 'Flag of Hungary',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      direction: 'ltr',
      translationFile: 'locale/it.js',
      flag: '🇮🇹',
      flagLabel: 'Flag of Italy',
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      direction: 'ltr',
      translationFile: 'locale/ja.js',
      flag: '🇯🇵',
      flagLabel: 'Flag of Japan',
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      direction: 'ltr',
      translationFile: 'locale/ko.js',
      flag: '🇰🇷',
      flagLabel: 'Flag of South Korea',
    },
    {
      code: 'pl',
      name: 'Polish',
      nativeName: 'Polski',
      direction: 'ltr',
      translationFile: 'locale/pl.js',
      flag: '🇵🇱',
      flagLabel: 'Flag of Poland',
    },
    {
      code: 'pt-PT',
      name: 'Portuguese (Portugal)',
      nativeName: 'Português - Portugal',
      direction: 'ltr',
      translationFile: 'locale/pt-PT.js',
      aliases: ['pt'],
      flag: '🇵🇹',
      flagLabel: 'Flag of Portugal',
    },
    {
      code: 'pt-BR',
      name: 'Portuguese (Brazil)',
      nativeName: 'Português - Brasil',
      direction: 'ltr',
      translationFile: 'locale/pt-BR.js',
      flag: '🇧🇷',
      flagLabel: 'Flag of Brazil',
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      direction: 'ltr',
      translationFile: 'locale/ru.js',
      flag: '🇷🇺',
      flagLabel: 'Flag of Russia',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      direction: 'ltr',
      translationFile: 'locale/es.js',
      flag: '🇪🇸',
      flagLabel: 'Flag of Spain',
    },
    {
      code: 'sv',
      name: 'Swedish',
      nativeName: 'Svenska',
      direction: 'ltr',
      translationFile: 'locale/sv.js',
      flag: '🇸🇪',
      flagLabel: 'Flag of Sweden',
    },
    {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      direction: 'ltr',
      translationFile: 'locale/tr.js',
      flag: '🇹🇷',
      flagLabel: 'Flag of Turkey',
    },
    {
      code: 'uk',
      name: 'Ukrainian',
      nativeName: 'Українська',
      direction: 'ltr',
      translationFile: 'locale/uk.js',
      flag: '🇺🇦',
      flagLabel: 'Flag of Ukraine',
    },
  ]);

  const SUPPORTED_LOCALES = Object.freeze(LOCALE_DEFINITIONS.map(({ code }) => code));
  const VALID_LOCALES = new Set(SUPPORTED_LOCALES);
  const LOCALE_ALIASES = Object.freeze(
    LOCALE_DEFINITIONS.reduce((aliases, locale) => {
      for (const alias of locale.aliases || []) {
        aliases[alias] = locale.code;
      }
      return aliases;
    }, {})
  );
  const LOCALE_LABELS = Object.freeze(
    LOCALE_DEFINITIONS.reduce((labels, locale) => {
      const displayName = locale.nativeName
        ? `${locale.code} - ${locale.name} (${locale.nativeName})`
        : `${locale.code} - ${locale.name}`;
      labels[locale.code] = displayName;
      return labels;
    }, {})
  );
  const SUPPORTED_LOCALE_LIST = SUPPORTED_LOCALES.map((code) => LOCALE_LABELS[code]).join(' / ');

  const TRANSLATIONS = {
    af: TRANSLATION$n,
    ca: TRANSLATION$m,
    'zh-TW': TRANSLATION$l,
    cs: TRANSLATION$k,
    da: TRANSLATION$j,
    nl: TRANSLATION$i,
    'en-US': TRANSLATION$h,
    fi: TRANSLATION$g,
    fr: TRANSLATION$f,
    de: TRANSLATION$e,
    el: TRANSLATION$d,
    he: TRANSLATION$c,
    hu: TRANSLATION$b,
    it: TRANSLATION$a,
    ja: TRANSLATION$9,
    ko: TRANSLATION$8,
    pl: TRANSLATION$7,
    'pt-PT': TRANSLATION$6,
    'pt-BR': TRANSLATION$5,
    ru: TRANSLATION$4,
    es: TRANSLATION$3,
    sv: TRANSLATION$2,
    tr: TRANSLATION$1,
    uk: TRANSLATION,
  };

  /**
   * Returns the canonical locale for a supported locale string or alias.
   * Matching is case-insensitive after exact matches are checked.
   *
   * @param {string} lang Locale string or alias (e.g. 'en', 'fr', 'zh-TW').
   * @returns {string} Canonical locale code, or an empty string when unsupported.
   */
  function normalizeLocale(lang) {
    const s = typeof lang === 'string' ? lang.trim() : '';
    if (VALID_LOCALES.has(s)) {
      return s;
    }
    if (LOCALE_ALIASES[s]) {
      return LOCALE_ALIASES[s];
    }
    const normalized = s.toLowerCase();
    const found = Array.from(VALID_LOCALES).find((locale) => locale.toLowerCase() === normalized);
    return (
      found ||
      Object.entries(LOCALE_ALIASES).find(([alias]) => alias.toLowerCase() === normalized)?.[1] ||
      ''
    );
  }

  /**
   * Returns a valid canonical locale, falling back to the default when unsupported.
   *
   * @param {string} lang Locale string to validate.
   * @returns {string} Validated canonical locale.
   */
  function getLocale(lang) {
    return normalizeLocale(lang) || DEFAULT_LOCALE;
  }

  /**
   * Navigates a nested object following dot-separated key path segments.
   *
   * @param {object} obj Root object.
   * @param {string[]} parts Key path segments.
   * @returns {*} Value at the path, or undefined.
   */
  function getNestedValue(obj, parts) {
    let current = obj;
    for (const part of parts) {
      if (current == null || typeof current !== 'object') return undefined;
      current = current[part];
    }
    return current;
  }

  /**
   * Returns the translated string for a dot-separated key, interpolating {placeholder} vars.
   * Falls back to en-US when the key is missing in the requested locale.
   * No HTML escaping is performed — callers must pre-escape HTML-unsafe values.
   *
   * @param {string} key Dot-separated translation key (e.g. 'errors.noTokenSelected').
   * @param {string} locale Locale code.
   * @param {object} [vars] Interpolation variables mapped to {placeholder} names.
   * @returns {string} Translated and interpolated string. Returns the key when not found.
   */
  function t(key, locale, vars = {}) {
    const lang = getLocale(locale);
    const parts = key.split('.');
    let value = getNestedValue(TRANSLATIONS[lang], parts);

    if (value === undefined && lang !== DEFAULT_LOCALE) {
      value = getNestedValue(TRANSLATIONS[DEFAULT_LOCALE], parts);
    }

    if (typeof value !== 'string') return key;

    return value.replaceAll(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  }

  /**
   * Whispers the full help text to the command sender.
   * Help text is in English for all locales — it is technical documentation
   * and command examples that only make sense in English.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {void}
   */
  function showHelp(msg) {
    const { language } = getSettings();

    const helpLines = [
      `<strong>A.D.A.M.</strong> — ${t('info.subtitle', language)} v${ADAM_VERSION}<br>`,
      `<em>${t('info.updatedLabel', language)}: ${ADAM_LAST_UPDATED}</em><br>`,

      '<br><strong>Movement</strong><br>',
      `<code>!adam --move &lt;direction&gt;</code> — Move selected token one step.<br>`,
      `<em>Directions: ${DIRECTIONS.join(', ')} (or full names: north, northeast, etc.)</em><br>`,

      '<br><strong>Facing</strong><br>',
      `<code>!adam --face &lt;direction&gt;</code> — Rotate token without moving.<br>`,

      '<br><strong>State</strong><br>',
      `<code>!adam --state &lt;state&gt;</code> — Set token movement/action state.<br>`,
      `<em>States: ${ALLOWED_STATES.join(', ')}</em><br>`,

      '<br><strong>Action</strong><br>',
      `<code>!adam --action &lt;action&gt;</code> — Alias for state. Also accepts: spellcast, mage-hand.<br>`,

      '<br><strong>Menu</strong><br>',
      `<code>!adam --menu</code> — Open the A.D.A.M. control deck for the selected token.<br>`,

      '<br><strong>Configuration (GM)</strong><br>',
      `<code>!adam --config</code> — Show current settings.<br>`,
      `<code>!adam --config grid-size &lt;n&gt;</code> — Pixels per grid square (default: 70).<br>`,
      `<code>!adam --config move-distance &lt;n&gt;</code> — Squares per move step (default: 1).<br>`,
      `<code>!adam --config auto-face &lt;on|off&gt;</code> — Rotate token on move (default: on).<br>`,
      `<code>!adam --config humour &lt;on|off&gt;</code> — Enable easter egg responses (default: on).<br>`,
      `<code>!adam --config language &lt;locale&gt;</code> — Set output language (e.g. fr, de, ja).<br>`,
      `<code>!adam --config profile-creation-mode &lt;mode&gt;</code> — Set who can create profiles: <code>gm-only</code> (default), <code>gm-approved</code>, <code>all-users</code>.<br>`,
      `<code>!adam --config reset</code> — Reset all settings to factory defaults.<br>`,

      '<br><strong>Animated Token Profiles</strong><br>',
      `<em>Profiles map token state + facing direction to rollable token side numbers.</em><br>`,
      `<code>!adam --profile list</code> — List all configured profiles.<br>`,
      `<code>!adam --profile show</code> — Show profile assigned to selected token.<br>`,
      `<code>!adam --profile create &lt;id&gt; &lt;displayName&gt;</code> — Create a new empty profile.<br>`,
      `<code>!adam --profile edit-side &lt;id&gt; &lt;state&gt; &lt;north|south&gt; &lt;n&gt;</code> — Set a side mapping in a profile.<br>`,
      `<code>!adam --profile rename &lt;id&gt; &lt;name&gt;</code> — Rename a profile.<br>`,
      `<code>!adam --profile delete &lt;id&gt;</code> — Delete a profile.<br>`,
      `<code>!adam --profile assign &lt;id&gt;</code> — Assign profile to selected token.<br>`,
      `<code>!adam --profile remove</code> — Remove profile assignment from selected token.<br>`,
      '<br><em>GM-Approved mode draft workflow:</em><br>',
      `<code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> — Submit a profile draft for GM review.<br>`,
      `<code>!adam --profile draft-side &lt;id&gt; &lt;state&gt; &lt;north|south&gt; &lt;n&gt;</code> — Add a side mapping to a draft.<br>`,
      `<code>!adam --profile review</code> — List pending drafts (GM only).<br>`,
      `<code>!adam --profile approve &lt;id&gt;</code> — Approve a draft (GM only).<br>`,
      `<code>!adam --profile reject &lt;id&gt;</code> — Reject a draft (GM only).<br>`,

      '<br><strong>Info</strong><br>',
      `<code>!adam --version</code> — Show version info.<br>`,
      `<code>!adam --credits</code> — Show credits.<br>`,
      `<code>!adam --help</code> — Show this help message.<br>`,
      `<code>!adam --install-macro</code> — Install the ADAM-Menu macro (GM only).<br>`,

      '<br><strong>Easter Egg Alias</strong><br>',
      `<code>!simon says move &lt;direction&gt;</code> — Equivalent to <code>!adam --move</code>.<br>`,
      `<code>!simon says state &lt;state&gt;</code> — Equivalent to <code>!adam --state</code>.<br>`,
      `<code>!simon says face &lt;direction&gt;</code> — Equivalent to <code>!adam --face</code>.<br>`,
      `<code>!simon says action &lt;action&gt;</code> — Equivalent to <code>!adam --action</code>.<br>`,

      '<br><strong>Journal Command Deck</strong><br>',
      `<em>Use Roll20 journal entries as control panels. Example button commands:</em><br>`,
      `<code>!adam --move n</code><br>`,
      `<code>!adam --move nw</code><br>`,
      `<code>!adam --menu</code><br>`,
    ];

    whisperSender(msg, helpLines.join(''), t('titles.adamsHelp', language), 'left');
  }

  /**
   * Whispers version information to the command sender.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {void}
   */
  function showVersion(msg) {
    const { language } = getSettings();
    whisperSender(
      msg,
      `<strong>A.D.A.M.</strong> — ${t('info.subtitle', language)}<br><br>${t('info.versionLabel', language)}: ${ADAM_VERSION}<br>${t('info.updatedLabel', language)}: ${ADAM_LAST_UPDATED}`,
      t('titles.versionInfo', language)
    );
  }

  /**
   * Whispers credits to the command sender.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {void}
   */
  function showCredits(msg) {
    const { language } = getSettings();
    whisperSender(msg, t('info.creditsBody', language), t('titles.creditsTitle', language));
  }

  const BTN_STYLE = [
    `background:${COLOR_ACCENT_DARK}`,
    `color:${COLOR_TEXT_LIGHT}`,
    `border:1px solid ${COLOR_ACCENT_TEAL}`,
    'border-radius:3px',
    'padding:2px 7px',
    'display:inline-block',
    'margin:1px',
    'font-weight:bold',
    'text-decoration:none',
    'font-size:11px',
    'cursor:pointer',
  ].join(';');

  const BTN_ACTIVE_STYLE = [
    `background:${COLOR_ACCENT_TEAL}`,
    `color:${COLOR_BG_DARK}`,
    `border:1px solid ${COLOR_ACCENT_TEAL}`,
    'border-radius:3px',
    'padding:2px 7px',
    'display:inline-block',
    'margin:1px',
    'font-weight:bold',
    'text-decoration:none',
    'font-size:11px',
    'cursor:pointer',
  ].join(';');

  /**
   * Renders a clickable chat-button anchor tag.
   *
   * @param {string} label Button label text (HTML-safe).
   * @param {string} command Roll20 API command executed when clicked.
   * @param {boolean} [active=false] When true, applies the highlighted active style.
   * @returns {string} HTML anchor element string.
   */
  function makeButton(label, command, active = false) {
    return `<a href="${command}" style="${active ? BTN_ACTIVE_STYLE : BTN_STYLE}">${label}</a>`;
  }

  /**
   * Renders a labelled section block wrapping a row of buttons.
   *
   * @param {string} title Section heading text (HTML-safe).
   * @param {string} buttonsHtml Pre-rendered button HTML to place inside the section.
   * @returns {string} HTML string for the section.
   */
  function makeSection(title, buttonsHtml) {
    return [
      `<div style="margin:5px 0 2px; color:${COLOR_ACCENT_TEAL}; font-weight:bold; font-size:10px; text-transform:uppercase; letter-spacing:1px">${title}</div>`,
      `<div style="margin-bottom:2px">${buttonsHtml}</div>`,
    ].join('');
  }

  const DIRECTION_LABELS = {
    n: 'N',
    ne: 'NE',
    e: 'E',
    se: 'SE',
    s: 'S',
    sw: 'SW',
    w: 'W',
    nw: 'NW',
  };

  /**
   * Whispers the A.D.A.M. control deck menu to the command sender for the given token.
   *
   * @param {object} msg Roll20 chat message object.
   * @param {object} token Roll20 graphic token object.
   * @returns {void}
   */
  function showTokenMenu(msg, token) {
    const { language } = getSettings();
    const tokenId = token.get('_id');
    const tokenState = getTokenState(tokenId);
    const profileId = getTokenProfileId(tokenId);
    const profile = getTokenProfile(tokenId);
    const tokenName = getSafeTokenName(token, 'Unknown Token');

    const moveButtons = DIRECTIONS.map((d) =>
      makeButton(DIRECTION_LABELS[d], `!adam --move ${d}`)
    ).join('');

    const faceButtons = DIRECTIONS.map((d) =>
      makeButton(DIRECTION_LABELS[d], `!adam --face ${d}`)
    ).join('');

    const stateButtons = ALLOWED_STATES.map((s) => {
      const isCurrent = tokenState.currentState === s;
      const label = t(`menu.states.${s}`, language);
      return makeButton(label, `!adam --state ${s}`, isCurrent);
    }).join('');

    const profileLine = profileId
      ? `<strong>${t('menu.profileLabel', language)}:</strong> ${escapeHtml(profile?.displayName || profileId)}`
      : `<em>${t('menu.noProfile', language)}</em>`;

    const infoHtml = [
      `<div style="font-size:10px; color:${COLOR_TEXT_DIM}; margin-bottom:6px; border-bottom:1px solid ${COLOR_ACCENT_DARK}; padding-bottom:4px">`,
      `<strong>${tokenName}</strong> &nbsp;|&nbsp; `,
      `${t('menu.stateLabel', language)}: <strong>${tokenState.currentState}</strong> &nbsp;|&nbsp; `,
      `${t('menu.facingLabel', language)}: <strong>${(tokenState.currentDirection || 's').toUpperCase()}</strong> &nbsp;|&nbsp; `,
      profileLine,
      '</div>',
    ].join('');

    const menuHtml = [
      `<div style="background:${COLOR_BG_DARK}; color:${COLOR_TEXT_LIGHT}; border:1px solid ${COLOR_ACCENT_TEAL}; border-radius:6px; padding:8px; font-size:12px">`,
      `<div style="text-align:center; color:${COLOR_ACCENT_TEAL}; font-weight:bold; font-size:13px; margin-bottom:6px">🤖 ${t('menu.title', language)}</div>`,
      infoHtml,
      makeSection(t('menu.movement', language), moveButtons),
      makeSection(t('menu.facing', language), faceButtons),
      makeSection(t('menu.state', language), stateButtons),
      `<div style="margin-top:6px; border-top:1px solid ${COLOR_ACCENT_DARK}; padding-top:4px; text-align:center">`,
      makeButton(t('menu.help', language), '!adam --help'),
      makeButton(t('menu.config', language), '!adam --config'),
      '</div>',
      '</div>',
    ].join('');

    whisperSender(msg, menuHtml, t('titles.adamsMenu', language), 'left');
  }

  /**
   * Parses a string value following a flag and validates it against an allowed list.
   *
   * @param {string} content Full command content.
   * @param {RegExp} flagRegex Regex for the flag name.
   * @param {string[]} allowedValues Allowed lower-case values.
   * @returns {{found:boolean, valid:boolean, value:(string|null)}} Parse result.
   */

  /**
   * Parses a free-form string value following a flag (supports quoted values).
   *
   * @param {string} content Full command content.
   * @param {RegExp} flagRegex Regex for the flag name.
   * @returns {{found:boolean, value:(string|null)}} Parse result.
   */
  function parseFreeStringFlag(content, flagRegex) {
    const match = new RegExp(
      String.raw`${flagRegex.source}\s+(?:"([^"]+)"|'([^']+)'|(\S+))`,
      'i'
    ).exec(content);
    if (!match) {
      return { found: false, value: null };
    }
    const value = (match[1] ?? match[2] ?? match[3]).trim();
    return { found: true, value };
  }

  /**
   * Parses a boolean value (on/yes/true or off/no/false) following a flag.
   *
   * @param {string} content Full command content.
   * @param {RegExp} flagRegex Regex for the flag name.
   * @returns {{found:boolean, valid:boolean, value:(boolean|null)}} Parse result.
   */
  function parseBooleanFlag(content, flagRegex) {
    const result = parseFreeStringFlag(content, flagRegex);
    if (!result.found) {
      return { found: false, valid: false, value: null };
    }
    const v = result.value.toLowerCase();
    if (v === 'on' || v === 'yes' || v === 'true' || v === '1') {
      return { found: true, valid: true, value: true };
    }
    if (v === 'off' || v === 'no' || v === 'false' || v === '0') {
      return { found: true, valid: true, value: false };
    }
    return { found: true, valid: false, value: result.value };
  }

  /**
   * Parses an integer value following a flag, validated against an inclusive range.
   *
   * @param {string} content Full command content.
   * @param {RegExp} flagRegex Regex for the flag name.
   * @param {number} min Minimum allowed value.
   * @param {number} max Maximum allowed value.
   * @returns {{found:boolean, valid:boolean, value:(number|null)}} Parse result.
   */
  function parseIntegerFlag(content, flagRegex, min, max) {
    const match = new RegExp(String.raw`${flagRegex.source}\s+(\d+)`, 'i').exec(content);
    if (!match) {
      return { found: false, valid: false, value: null };
    }
    const value = parseInt(match[1], 10);
    if (!Number.isNaN(value) && value >= min && value <= max) {
      return { found: true, valid: true, value };
    }
    return { found: true, valid: false, value: null };
  }

  /**
   * Resolves the single selected token from a chat message.
   * Whispers an error and returns null when no valid token is found.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {object|null} Roll20 graphic token or null.
   */
  function getSelectedToken(msg) {
    const selected = msg.selected || [];

    if (selected.length === 0) {
      const count = incrementNoTokenCount(msg.playerid);
      const { humour, language } = getSettings();
      const body = buildNoTokenMessage(count, humour, language);
      whisperSenderError(msg, body, t('titles.noTokenSelected', language));
      return null;
    }

    const token = getObj('graphic', selected[0]._id);
    if (!token) {
      const { language } = getSettings();
      whisperSenderError(
        msg,
        t('errors.tokenNotFound', language),
        t('titles.tokenError', language)
      );
      return null;
    }

    return token;
  }

  /**
   * Returns the appropriate no-token error message based on selection attempt count
   * and whether humour is enabled.
   *
   * @param {number} count How many times this player has triggered the error.
   * @param {boolean} humour Whether easter egg responses are enabled.
   * @param {string} language Current locale code.
   * @returns {string} Localised error message HTML.
   */
  function buildNoTokenMessage(count, humour, language) {
    if (!humour) {
      return t('errors.noTokenSelected', language);
    }
    if (count >= NO_TOKEN_SELECTED_FUNNY_THRESHOLD_2) {
      return t('errors.noTokenSelectedPersistent', language);
    }
    if (count >= NO_TOKEN_SELECTED_FUNNY_THRESHOLD_1) {
      return t('errors.noTokenSelectedStill', language);
    }
    return t('errors.noTokenSelected', language);
  }

  /**
   * Inspects move history for recognizable patterns and returns an easter egg
   * message when one matches. Returns null when no pattern triggers.
   *
   * Easter egg messages use the en-US locale intentionally — they are cultural
   * references that do not translate well. Non-English locales fall back to en-US
   * automatically via the t() lookup chain.
   *
   * @param {string[]} moveHistory Array of recent canonical directions.
   * @returns {string|null} Easter egg message HTML or null.
   */
  function checkMovementEasterEgg(moveHistory) {
    if (!moveHistory || moveHistory.length < 2) return null;

    const last2 = moveHistory.slice(-2);
    const last4 = moveHistory.slice(-4);

    // Two consecutive west moves — Beyoncé: Irreplaceable
    if (last2[0] === 'w' && last2[1] === 'w') {
      return t('easter.toTheLeft', 'en-US');
    }

    if (last4.length === 4) {
      // N → E → S → W full circle
      if (last4[0] === 'n' && last4[1] === 'e' && last4[2] === 's' && last4[3] === 'w') {
        return t('easter.notGoingAnywhere', 'en-US');
      }

      // E → W → E → W zigzag
      if (last4[0] === 'e' && last4[1] === 'w' && last4[2] === 'e' && last4[3] === 'w') {
        return t('easter.areWeThereYet', 'en-US');
      }

      // W → E → W → E zigzag (opposite direction)
      if (last4[0] === 'w' && last4[1] === 'e' && last4[2] === 'w' && last4[3] === 'e') {
        return t('easter.areWeThereYet', 'en-US');
      }
    }

    return null;
  }

  /**
   * Checks for state-based easter eggs based on consecutive counts and transitions.
   *
   * @param {string} newState Newly applied state.
   * @param {{sneakCount:number, helpCount:number, wasAlreadyRaging:boolean}} result State update result.
   * @returns {string|null} Easter egg message HTML or null.
   */
  function checkStateEasterEgg(newState, result) {
    if (newState === 'sneak' && result.sneakCount >= SNEAK_SPAM_THRESHOLD) {
      return t('easter.sneakSpam', 'en-US');
    }
    if (newState === 'help' && result.helpCount >= HELP_SPAM_THRESHOLD) {
      return t('easter.helpSpam', 'en-US');
    }
    if (result.wasAlreadyRaging) {
      return t('easter.rageRage', 'en-US');
    }
    return null;
  }

  /**
   * Whispers a movement easter egg to the sender when a pattern is detected
   * and humour is enabled.
   *
   * @param {object} msg Roll20 chat message object.
   * @param {string[]} moveHistory Array of recent canonical directions.
   * @returns {void}
   */
  function whisperMovementEasterEgg(msg, moveHistory) {
    if (!getSettings().humour) return;
    const message = checkMovementEasterEgg(moveHistory);
    if (message) {
      whisperSender(msg, message);
    }
  }

  /**
   * Whispers a state-based easter egg to the sender when triggered
   * and humour is enabled.
   *
   * @param {object} msg Roll20 chat message object.
   * @param {string} newState Newly applied state.
   * @param {{sneakCount:number, helpCount:number, wasAlreadyRaging:boolean}} result State update result.
   * @returns {void}
   */
  function whisperStateEasterEgg(msg, newState, result) {
    if (!getSettings().humour) return;
    const message = checkStateEasterEgg(newState, result);
    if (message) {
      whisperSender(msg, message);
    }
  }

  /**
   * Whispers the SIMON easter egg response after a successful simon-says command.
   * Only whispers when humour is enabled.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {void}
   */
  function whisperSimonResponse(msg) {
    if (!getSettings().humour) return;
    whisperSender(msg, t('easter.simonResponse', 'en-US'));
  }

  /**
   * Whispers the "Simon says what?" response when !simon is used without "says".
   * Sent regardless of humour setting — it is always a harmless prompt.
   *
   * @param {object} msg Roll20 chat message object.
   * @returns {void}
   */
  function whisperSimonNoSays(msg) {
    whisperSender(msg, t('easter.simonNoSays', 'en-US'));
  }

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
      whisperSenderError(
        msg,
        t('errors.profileUsage', language),
        t('titles.invalidUsage', language)
      );
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
        const draftSideMatch =
          /--profile\s+draft-side\s+(\S+)\s+(\S+)\s+(north|south)\s+(\d+)/i.exec(content);
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
  function handleAdam(msg) {
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
  function handleSimon(msg) {
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
    const fakeMsgObj = { ...msg };

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

  /**
   * Boots A.D.A.M. when Roll20 signals API readiness.
   * Initializes state, logs version, and registers chat handlers.
   *
   * @returns {void}
   */
  on('ready', () => {
    initializeState();
    const { language } = getSettings();
    log(`-=> ${SCRIPT_NAME} v${ADAM_VERSION} [Updated: ${ADAM_LAST_UPDATED}] <=-`);
    whisperGM(
      `<strong>${t('info.ready', language)}</strong> (v${ADAM_VERSION})`,
      t('titles.scriptReady', language)
    );
    on('chat:message', handleAdam);
    on('chat:message', handleSimon);
  });
})();
