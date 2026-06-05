/**
 * NOTE: GENERATED FILE - DO NOT EDIT DIRECTLY.
 * NOTE: Source files live under src/ and are bundled with `npm run build`.
 * ------------------------------------------------
 * Name: ADAM
 * Script: ADAM.js
 * Version: 1.0.0
 * Built: 2026-06-04T23:45:40.541Z
 */
const ADAMMod = (() => {
  'use strict';

  const SCRIPT_NAME = 'ADAM';
  const ADAM_VERSION = '1.0.0';
  const ADAM_LAST_UPDATED = '2026-06-04T23:45:40.541Z';

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
      noTokenSelected: 'Geen Token Gekies',
      tokenError: 'Token Fout',
      missingDirection: 'Rigting Ontbreek',
      invalidDirection: 'Ongeldige Rigting',
      missingState: 'Toestand Ontbreek',
      invalidState: 'Ongeldige Toestand',
      missingAction: 'Aksie Ontbreek',
      invalidAction: 'Ongeldige Aksie',
      accessDenied: 'Toegang Geweier',
      invalidValue: 'Ongeldige Waarde',
      unknownCommand: 'Onbekende Opdrag',
      moveError: 'Beweeg Fout',
      macroExists: 'Makro Bestaan Al',
      macroInstalled: 'Makro Geïnstalleer',
      invalidUsage: 'Ongeldige Gebruik',
      profileAssigned: 'Profiel Toegewys',
      profileRemoved: 'Profiel Verwyder',
      unknownProfile: 'Onbekende Profiel',
      configuration: 'Konfigurasie',
      settingsReset: 'Instellings Herstel',
      scriptReady: 'Skrip Gereed',
      versionInfo: 'Weergawe Info',
      creditsTitle: 'Erkennings',
      adamsMenu: 'A.D.A.M. Beheerdek',
      adamsHelp: 'A.D.A.M. Hulp',
      adamsSettings: 'A.D.A.M. Instellings',
      profiles: 'Gekonfigureerde Profiele',
      tokenProfile: 'Token Profiel',
      success: 'Sukses',
      langSet: 'Taal Gestel',
      langInvalid: 'Ongeldige Taal',
    },
    errors: {
      noTokenSelected:
        "Geen token gekies nie. Kies eers 'n token en klik dan op 'n rigtingknoppie.",
      noTokenSelectedStill: 'Nog steeds geen token gekies nie.',
      noTokenSelectedPersistent: "Ek bewonder jou volharding. Kies eers 'n token.",
      tokenNotFound: 'Gekose token kon nie gevind word nie.',
      missingDirection:
        "Verskaf asseblief 'n rigting. Voorbeeld: <code>!adam --move n</code><br><em>Rigtings: n, ne, e, se, s, sw, w, nw</em>",
      invalidDirection:
        'Onbekende rigting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volname soos north, northeast)',
      missingState: "Verskaf asseblief 'n toestand.<br>Geldig: {states}",
      invalidState: 'Onbekende toestand: <strong>{value}</strong><br><br>Geldig: {states}',
      missingAction:
        "Verskaf asseblief 'n aksie. Voorbeelde: help, spellcast, rage, dash, sneak, idle, combat",
      invalidAction: 'Onbekende aksie: <strong>{value}</strong><br><br>Bekende aksies: {actions}',
      accessDeniedConfig: 'Konfigurasieveanderings is beperk tot die GM.',
      accessDeniedProfileAssign: 'Profieltoewyging is beperk tot die GM.',
      accessDeniedProfileRemove: 'Profielverwydering is beperk tot die GM.',
      accessDeniedMacro: 'Makro-installasie is beperk tot die GM.',
      accessDeniedReset: 'Instellingsherstel is beperk tot die GM.',
      unknownCommand:
        "Onbekende opdrag. Probeer <code>!adam --help</code> vir 'n lys van beskikbare opdragte.",
      moveFailed: 'Beweging het misluk.',
      gridSizeInvalid: "Roostergrootte moet 'n heelgetal tussen 10 en 1000 wees (pixels).",
      moveDistanceInvalid: "Beweegafstand moet 'n heelgetal tussen 1 en 20 wees (vierkante).",
      autoFaceInvalid: 'Outo-gesig waarde moet: aan of af wees.',
      humourInvalid: 'Humor waarde moet: aan of af wees.',
      langInvalid: 'Ongeldige taalinstelling. Ondersteun: {locales}',
      profileUsage:
        'Gebruik: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Gebruik: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profiel <strong>{id}</strong> bestaan nie. Gebruik <code>!adam --profile list</code> om beskikbare profiele te sien.',
      profileUnknownSub:
        'Onbekende profiel-subopdrag: <strong>{sub}</strong><br><br>Geldig: list, show, assign, remove',
      macroExists: "\'n Makro met die naam \'<strong>{name}</strong>\' bestaan reeds.",
      simonUnknown:
        'Simon weet nie hoe om te doen nie: <em>{command}</em><br><br>Probeer: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> kyk nou na <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> toestand gestel na <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> aksie: <strong>{action}</strong> → toestand: <strong>{state}</strong>.',
      profileAssigned: 'Profiel <strong>{id}</strong> toegewys aan <strong>{token}</strong>.',
      profileRemoved: 'Profiel verwyder van <strong>{token}</strong>.',
      macroInstalled:
        "Globale makro \'<strong>{name}</strong>\' is geskep en sigbaar vir alle spelers.",
      configUpdated: 'Instellings opgedateer.',
      settingsReset: '<strong>Instellings herstel na fabriekverstek.</strong>',
      langSet: 'Taal gestel na {locale}.',
    },
    settings: {
      gridSize: 'Roostergrootte',
      gridSizeDesc: '{size}px per vierkant',
      moveDistance: 'Beweegafstand',
      moveDistanceDesc: '{squares} vierkant(e) — {pixels}px per beweging',
      autoFace: 'Outo-Gesig by Beweging',
      humour: "Humor (Paasei's)",
      language: 'Taal',
      on: 'Aan',
      off: 'Af',
    },
    profiles: {
      none: 'Geen geanimeerde token-profiele is gekonfigureer nie.',
      noProfile: 'Gekose token het geen profiel toegewys nie.',
      id: 'Profiel ID',
      displayName: 'Vertoonnaam',
      mappedStates: 'Gemaapte Toestande',
      noneValue: '(geen)',
    },
    menu: {
      title: 'A.D.A.M. Beheerdek',
      movement: 'Beweging',
      facing: 'Rigting',
      state: 'Toestand',
      stateLabel: 'Toestand',
      facingLabel: 'Rigting',
      profileLabel: 'Profiel',
      noProfile: 'Geen profiel',
      help: 'Hulp',
      config: 'Konfig',
      states: {
        idle: 'Ledig',
        combat: 'Geveg',
        walk: 'Loop',
        dash: 'Hardloop',
        sneak: 'Sluip',
        rage: 'Woede',
        spellcasting: 'Towerkuns',
        help: 'Hulp',
      },
    },
    info: {
      subtitle: 'Geanimeerde Rigting en Beweging',
      versionLabel: 'Weergawe',
      updatedLabel: 'Opgedateer',
      creditsBody:
        'A.D.A.M.<br>Geanimeerde Rigting en Beweging<br><br>Aangedryf deur SIMON.<br>Definitief nie Simon genoem nie.',
      ready: 'MOD GEREED',
    },
  };

  const TRANSLATION$m = {
    titles: {
      error: 'Error',
      noTokenSelected: 'Cap Fitxa Seleccionada',
      tokenError: 'Error de Fitxa',
      missingDirection: 'Direcció Mancant',
      invalidDirection: 'Direcció No Vàlida',
      missingState: 'Estat Mancant',
      invalidState: 'Estat No Vàlid',
      missingAction: 'Acció Mancant',
      invalidAction: 'Acció No Vàlida',
      accessDenied: 'Accés Denegat',
      invalidValue: 'Valor No Vàlid',
      unknownCommand: 'Ordre Desconeguda',
      moveError: 'Error de Moviment',
      macroExists: 'La Macro Ja Existeix',
      macroInstalled: 'Macro Instal·lada',
      invalidUsage: 'Ús No Vàlid',
      profileAssigned: 'Perfil Assignat',
      profileRemoved: 'Perfil Eliminat',
      unknownProfile: 'Perfil Desconegut',
      configuration: 'Configuració',
      settingsReset: 'Configuració Restablerta',
      scriptReady: 'Script a Punt',
      versionInfo: 'Informació de Versió',
      creditsTitle: 'Crèdits',
      adamsMenu: 'Tauler de Control A.D.A.M.',
      adamsHelp: 'Ajuda A.D.A.M.',
      adamsSettings: 'Configuració A.D.A.M.',
      profiles: 'Perfils Configurats',
      tokenProfile: 'Perfil de Fitxa',
      success: 'Èxit',
      langSet: 'Idioma Establert',
      langInvalid: 'Idioma No Vàlid',
    },
    errors: {
      noTokenSelected:
        'Cap fitxa seleccionada. Seleccioneu una fitxa primer i feu clic a un botó de direcció.',
      noTokenSelectedStill: 'Encara cap fitxa seleccionada.',
      noTokenSelectedPersistent: 'Admiro la vostra persistència. Seleccioneu una fitxa primer.',
      tokenNotFound: "No s'ha pogut trobar la fitxa seleccionada.",
      missingDirection:
        'Proporcioneu una direcció. Exemple: <code>!adam --move n</code><br><em>Direccions: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direcció desconeguda: <strong>{value}</strong><br><br>Vàlides: n, ne, e, se, s, sw, w, nw (o noms complets com north, northeast)',
      missingState: 'Proporcioneu un estat.<br>Vàlids: {states}',
      invalidState: 'Estat desconegut: <strong>{value}</strong><br><br>Vàlids: {states}',
      missingAction:
        'Proporcioneu una acció. Exemples: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Acció desconeguda: <strong>{value}</strong><br><br>Accions conegudes: {actions}',
      accessDeniedConfig: 'Els canvis de configuració estan restringits al GM.',
      accessDeniedProfileAssign: "L'assignació de perfils està restringida al GM.",
      accessDeniedProfileRemove: "L'eliminació de perfils està restringida al GM.",
      accessDeniedMacro: 'La instal·lació de macros està restringida al GM.',
      accessDeniedReset: 'El restabliment de la configuració està restringit al GM.',
      unknownCommand:
        "Ordre desconeguda. Proveu <code>!adam --help</code> per obtenir una llista d'ordres disponibles.",
      moveFailed: 'El moviment ha fallat.',
      gridSizeInvalid: 'La mida de la quadrícula ha de ser un enter entre 10 i 1000 (píxels).',
      moveDistanceInvalid: 'La distància de moviment ha de ser un enter entre 1 i 20 (caselles).',
      autoFaceInvalid: "El valor d'autogirar ha de ser: on o off.",
      humourInvalid: "El valor d'humor ha de ser: on o off.",
      langInvalid: 'Configuració regional no vàlida. Suportades: {locales}',
      profileUsage: 'Ús: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Ús: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'El perfil <strong>{id}</strong> no existeix. Useu <code>!adam --profile list</code> per veure els perfils disponibles.',
      profileUnknownSub:
        'Subordre de perfil desconeguda: <strong>{sub}</strong><br><br>Vàlides: list, show, assign, remove',
      macroExists: "Ja existeix una macro anomenada \'<strong>{name}</strong>\'.",
      simonUnknown:
        'Simon no sap com fer: <em>{command}</em><br><br>Proveu: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> ara mira cap a <strong>{direction}</strong>.',
      stateSet: 'Estat de <strong>{token}</strong> establert a <strong>{state}</strong>.',
      actionSet:
        'Acció de <strong>{token}</strong>: <strong>{action}</strong> → estat: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> assignat a <strong>{token}</strong>.',
      profileRemoved: 'Perfil eliminat de <strong>{token}</strong>.',
      macroInstalled:
        "La macro global \'<strong>{name}</strong>\' s\'ha creat i és visible per a tots els jugadors.",
      configUpdated: 'Configuració actualitzada.',
      settingsReset: '<strong>Configuració restablerta als valors de fàbrica.</strong>',
      langSet: 'Idioma establert a {locale}.',
    },
    settings: {
      gridSize: 'Mida de la Quadrícula',
      gridSizeDesc: '{size}px per casella',
      moveDistance: 'Distància de Moviment',
      moveDistanceDesc: '{squares} casella(es) — {pixels}px per moviment',
      autoFace: "Autogirar en Moure's",
      humour: 'Humor (Ous de Pasqua)',
      language: 'Idioma',
      on: 'Activat',
      off: 'Desactivat',
    },
    profiles: {
      none: 'No hi ha perfils de fitxa animada configurats.',
      noProfile: 'La fitxa seleccionada no té cap perfil assignat.',
      id: 'ID de Perfil',
      displayName: 'Nom Visible',
      mappedStates: 'Estats Assignats',
      noneValue: '(cap)',
    },
    menu: {
      title: 'Tauler de Control A.D.A.M.',
      movement: 'Moviment',
      facing: 'Orientació',
      state: 'Estat',
      stateLabel: 'Estat',
      facingLabel: 'Orientació',
      profileLabel: 'Perfil',
      noProfile: 'Sense perfil',
      help: 'Ajuda',
      config: 'Config',
      states: {
        idle: 'En Repòs',
        combat: 'Combat',
        walk: 'Caminar',
        dash: 'Córrer',
        sneak: 'Sigil',
        rage: 'Fúria',
        spellcasting: 'Màgia',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Moviment i Direcció Animats',
      versionLabel: 'Versió',
      updatedLabel: 'Actualitzat',
      creditsBody:
        "A.D.A.M.<br>Moviment i Direcció Animats<br><br>Impulsat per SIMON.<br>Definitivament no s'anomena Simon.",
      ready: 'MOD A PUNT',
    },
  };

  const TRANSLATION$l = {
    titles: {
      error: '錯誤',
      noTokenSelected: '未選擇標記',
      tokenError: '標記錯誤',
      missingDirection: '缺少方向',
      invalidDirection: '無效方向',
      missingState: '缺少狀態',
      invalidState: '無效狀態',
      missingAction: '缺少動作',
      invalidAction: '無效動作',
      accessDenied: '拒絕存取',
      invalidValue: '無效值',
      unknownCommand: '未知指令',
      moveError: '移動錯誤',
      macroExists: '巨集已存在',
      macroInstalled: '巨集已安裝',
      invalidUsage: '無效用法',
      profileAssigned: '已指派配置文件',
      profileRemoved: '已移除配置文件',
      unknownProfile: '未知配置文件',
      configuration: '設定',
      settingsReset: '設定已重置',
      scriptReady: '腳本就緒',
      versionInfo: '版本資訊',
      creditsTitle: '製作名單',
      adamsMenu: 'A.D.A.M. 控制台',
      adamsHelp: 'A.D.A.M. 說明',
      adamsSettings: 'A.D.A.M. 設定',
      profiles: '已設定配置文件',
      tokenProfile: '標記配置文件',
      success: '成功',
      langSet: '語言已設定',
      langInvalid: '無效語言',
    },
    errors: {
      noTokenSelected: '未選擇標記。請先選擇一個標記，然後點擊方向按鈕。',
      noTokenSelectedStill: '仍未選擇標記。',
      noTokenSelectedPersistent: '我欣賞您的堅持。請先選擇一個標記。',
      tokenNotFound: '找不到所選標記。',
      missingDirection:
        '請提供方向。範例：<code>!adam --move n</code><br><em>方向：n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        '未知方向：<strong>{value}</strong><br><br>有效值：n, ne, e, se, s, sw, w, nw（或全名如 north、northeast）',
      missingState: '請提供狀態。<br>有效值：{states}',
      invalidState: '未知狀態：<strong>{value}</strong><br><br>有效值：{states}',
      missingAction: '請提供動作。範例：help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: '未知動作：<strong>{value}</strong><br><br>已知動作：{actions}',
      accessDeniedConfig: '設定變更僅限 GM。',
      accessDeniedProfileAssign: '配置文件指派僅限 GM。',
      accessDeniedProfileRemove: '配置文件移除僅限 GM。',
      accessDeniedMacro: '巨集安裝僅限 GM。',
      accessDeniedReset: '設定重置僅限 GM。',
      unknownCommand: '未知指令。請嘗試 <code>!adam --help</code> 查看可用指令清單。',
      moveFailed: '移動失敗。',
      gridSizeInvalid: '格線大小必須為 10 到 1000 之間的整數（像素）。',
      moveDistanceInvalid: '移動距離必須為 1 到 20 之間的整數（格）。',
      autoFaceInvalid: '自動面向值必須為：on 或 off。',
      humourInvalid: '幽默值必須為：on 或 off。',
      langInvalid: '無效的語言設定。支援：{locales}',
      profileUsage: '用法：<code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: '用法：<code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        '配置文件 <strong>{id}</strong> 不存在。使用 <code>!adam --profile list</code> 查看可用配置文件。',
      profileUnknownSub:
        '未知配置文件子指令：<strong>{sub}</strong><br><br>有效值：list, show, assign, remove',
      macroExists: "名為 \'<strong>{name}</strong>\' 的巨集已存在。",
      simonUnknown:
        'Simon 不知道如何執行：<em>{command}</em><br><br>請嘗試：<code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> 現在面向 <strong>{direction}</strong>。',
      stateSet: '<strong>{token}</strong> 狀態設定為 <strong>{state}</strong>。',
      actionSet:
        '<strong>{token}</strong> 動作：<strong>{action}</strong> → 狀態：<strong>{state}</strong>。',
      profileAssigned: '配置文件 <strong>{id}</strong> 已指派給 <strong>{token}</strong>。',
      profileRemoved: '已從 <strong>{token}</strong> 移除配置文件。',
      macroInstalled: "全域巨集 \'<strong>{name}</strong>\' 已建立，所有玩家均可見。",
      configUpdated: '設定已更新。',
      settingsReset: '<strong>設定已重置為出廠預設值。</strong>',
      langSet: '語言已設定為 {locale}。',
    },
    settings: {
      gridSize: '格線大小',
      gridSizeDesc: '每格 {size}px',
      moveDistance: '移動距離',
      moveDistanceDesc: '{squares} 格 — 每次移動 {pixels}px',
      autoFace: '移動時自動面向',
      humour: '幽默（彩蛋）',
      language: '語言',
      on: '開啟',
      off: '關閉',
    },
    profiles: {
      none: '尚未設定任何動態標記配置文件。',
      noProfile: '所選標記未指派配置文件。',
      id: '配置文件 ID',
      displayName: '顯示名稱',
      mappedStates: '對應狀態',
      noneValue: '（無）',
    },
    menu: {
      title: 'A.D.A.M. 控制台',
      movement: '移動',
      facing: '面向',
      state: '狀態',
      stateLabel: '狀態',
      facingLabel: '面向',
      profileLabel: '配置文件',
      noProfile: '無配置文件',
      help: '說明',
      config: '設定',
      states: {
        idle: '待機',
        combat: '戰鬥',
        walk: '步行',
        dash: '衝刺',
        sneak: '潛行',
        rage: '狂暴',
        spellcasting: '施法',
        help: '說明',
      },
    },
    info: {
      subtitle: '動態方向與移動',
      versionLabel: '版本',
      updatedLabel: '更新日期',
      creditsBody: 'A.D.A.M.<br>動態方向與移動<br><br>由 SIMON 驅動。<br>絕對不叫 Simon。',
      ready: 'MOD 就緒',
    },
  };

  const TRANSLATION$k = {
    titles: {
      error: 'Chyba',
      noTokenSelected: 'Žádný Token Nevybrán',
      tokenError: 'Chyba Tokenu',
      missingDirection: 'Chybí Směr',
      invalidDirection: 'Neplatný Směr',
      missingState: 'Chybí Stav',
      invalidState: 'Neplatný Stav',
      missingAction: 'Chybí Akce',
      invalidAction: 'Neplatná Akce',
      accessDenied: 'Přístup Odepřen',
      invalidValue: 'Neplatná Hodnota',
      unknownCommand: 'Neznámý Příkaz',
      moveError: 'Chyba Pohybu',
      macroExists: 'Makro Již Existuje',
      macroInstalled: 'Makro Nainstalováno',
      invalidUsage: 'Neplatné Použití',
      profileAssigned: 'Profil Přiřazen',
      profileRemoved: 'Profil Odebrán',
      unknownProfile: 'Neznámý Profil',
      configuration: 'Konfigurace',
      settingsReset: 'Nastavení Obnoveno',
      scriptReady: 'Skript Připraven',
      versionInfo: 'Informace o Verzi',
      creditsTitle: 'Poděkování',
      adamsMenu: 'Ovládací Panel A.D.A.M.',
      adamsHelp: 'Nápověda A.D.A.M.',
      adamsSettings: 'Nastavení A.D.A.M.',
      profiles: 'Nakonfigurované Profily',
      tokenProfile: 'Profil Tokenu',
      success: 'Úspěch',
      langSet: 'Jazyk Nastaven',
      langInvalid: 'Neplatný Jazyk',
    },
    errors: {
      noTokenSelected:
        'Žádný token není vybrán. Nejprve vyberte token a poté klikněte na tlačítko směru.',
      noTokenSelectedStill: 'Stále žádný token nevybrán.',
      noTokenSelectedPersistent: 'Obdivuji vaši vytrvalost. Nejprve vyberte token.',
      tokenNotFound: 'Vybraný token nelze najít.',
      missingDirection:
        'Zadejte prosím směr. Příklad: <code>!adam --move n</code><br><em>Směry: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Neznámý směr: <strong>{value}</strong><br><br>Platné: n, ne, e, se, s, sw, w, nw (nebo celá jména jako north, northeast)',
      missingState: 'Zadejte prosím stav.<br>Platné: {states}',
      invalidState: 'Neznámý stav: <strong>{value}</strong><br><br>Platné: {states}',
      missingAction:
        'Zadejte prosím akci. Příklady: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Neznámá akce: <strong>{value}</strong><br><br>Známé akce: {actions}',
      accessDeniedConfig: 'Změny konfigurace jsou vyhrazeny pro GM.',
      accessDeniedProfileAssign: 'Přiřazení profilu je vyhrazeno pro GM.',
      accessDeniedProfileRemove: 'Odebrání profilu je vyhrazeno pro GM.',
      accessDeniedMacro: 'Instalace maker je vyhrazena pro GM.',
      accessDeniedReset: 'Obnovení nastavení je vyhrazeno pro GM.',
      unknownCommand:
        'Neznámý příkaz. Zkuste <code>!adam --help</code> pro seznam dostupných příkazů.',
      moveFailed: 'Pohyb se nezdařil.',
      gridSizeInvalid: 'Velikost mřížky musí být celé číslo mezi 10 a 1000 (pixely).',
      moveDistanceInvalid: 'Vzdálenost pohybu musí být celé číslo mezi 1 a 20 (čtverce).',
      autoFaceInvalid: 'Hodnota automatického otočení musí být: on nebo off.',
      humourInvalid: 'Hodnota humoru musí být: on nebo off.',
      langInvalid: 'Neplatné jazykové nastavení. Podporované: {locales}',
      profileUsage:
        'Použití: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Použití: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> neexistuje. Použijte <code>!adam --profile list</code> pro zobrazení dostupných profilů.',
      profileUnknownSub:
        'Neznámý podpříkaz profilu: <strong>{sub}</strong><br><br>Platné: list, show, assign, remove',
      macroExists: "Makro s názvem \'<strong>{name}</strong>\' již existuje.",
      simonUnknown:
        'Simon neví jak provést: <em>{command}</em><br><br>Zkuste: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> nyní čelí <strong>{direction}</strong>.',
      stateSet: 'Stav <strong>{token}</strong> nastaven na <strong>{state}</strong>.',
      actionSet:
        'Akce <strong>{token}</strong>: <strong>{action}</strong> → stav: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> přiřazen k <strong>{token}</strong>.',
      profileRemoved: 'Profil odebrán z <strong>{token}</strong>.',
      macroInstalled:
        "Globální makro \'<strong>{name}</strong>\' bylo vytvořeno a je viditelné pro všechny hráče.",
      configUpdated: 'Nastavení aktualizováno.',
      settingsReset: '<strong>Nastavení obnoveno na výchozí hodnoty.</strong>',
      langSet: 'Jazyk nastaven na {locale}.',
    },
    settings: {
      gridSize: 'Velikost Mřížky',
      gridSizeDesc: '{size}px na čtverec',
      moveDistance: 'Vzdálenost Pohybu',
      moveDistanceDesc: '{squares} čtverec/čtverce — {pixels}px na pohyb',
      autoFace: 'Automatické Otočení při Pohybu',
      humour: 'Humor (Velikonoční Vajíčka)',
      language: 'Jazyk',
      on: 'Zapnuto',
      off: 'Vypnuto',
    },
    profiles: {
      none: 'Žádné profily animovaných tokenů nejsou nakonfigurovány.',
      noProfile: 'Vybraný token nemá přiřazen žádný profil.',
      id: 'ID Profilu',
      displayName: 'Zobrazovaný Název',
      mappedStates: 'Mapované Stavy',
      noneValue: '(žádný)',
    },
    menu: {
      title: 'Ovládací Panel A.D.A.M.',
      movement: 'Pohyb',
      facing: 'Orientace',
      state: 'Stav',
      stateLabel: 'Stav',
      facingLabel: 'Orientace',
      profileLabel: 'Profil',
      noProfile: 'Žádný profil',
      help: 'Nápověda',
      config: 'Konfig',
      states: {
        idle: 'Nečinný',
        combat: 'Boj',
        walk: 'Chůze',
        dash: 'Sprint',
        sneak: 'Plížení',
        rage: 'Zuřivost',
        spellcasting: 'Kouzlení',
        help: 'Nápověda',
      },
    },
    info: {
      subtitle: 'Animovaný Směr a Pohyb',
      versionLabel: 'Verze',
      updatedLabel: 'Aktualizováno',
      creditsBody:
        'A.D.A.M.<br>Animovaný Směr a Pohyb<br><br>Poháněno SIMONEM.<br>Rozhodně se nejmenuje Simon.',
      ready: 'MOD PŘIPRAVEN',
    },
  };

  const TRANSLATION$j = {
    titles: {
      error: 'Fejl',
      noTokenSelected: 'Ingen Brik Valgt',
      tokenError: 'Brik Fejl',
      missingDirection: 'Manglende Retning',
      invalidDirection: 'Ugyldig Retning',
      missingState: 'Manglende Tilstand',
      invalidState: 'Ugyldig Tilstand',
      missingAction: 'Manglende Handling',
      invalidAction: 'Ugyldig Handling',
      accessDenied: 'Adgang Nægtet',
      invalidValue: 'Ugyldig Værdi',
      unknownCommand: 'Ukendt Kommando',
      moveError: 'Bevægelsesfejl',
      macroExists: 'Makro Findes Allerede',
      macroInstalled: 'Makro Installeret',
      invalidUsage: 'Ugyldig Brug',
      profileAssigned: 'Profil Tildelt',
      profileRemoved: 'Profil Fjernet',
      unknownProfile: 'Ukendt Profil',
      configuration: 'Konfiguration',
      settingsReset: 'Indstillinger Nulstillet',
      scriptReady: 'Script Klar',
      versionInfo: 'Versionsoplysninger',
      creditsTitle: 'Tak Til',
      adamsMenu: 'A.D.A.M. Kontrolpanel',
      adamsHelp: 'A.D.A.M. Hjælp',
      adamsSettings: 'A.D.A.M. Indstillinger',
      profiles: 'Konfigurerede Profiler',
      tokenProfile: 'Brik Profil',
      success: 'Succes',
      langSet: 'Sprog Indstillet',
      langInvalid: 'Ugyldigt Sprog',
    },
    errors: {
      noTokenSelected: 'Ingen brik valgt. Vælg en brik først, og klik derefter på en retningsknap.',
      noTokenSelectedStill: 'Stadig ingen brik valgt.',
      noTokenSelectedPersistent: 'Jeg beundrer din vedholdenhed. Vælg en brik først.',
      tokenNotFound: 'Den valgte brik kunne ikke findes.',
      missingDirection:
        'Angiv venligst en retning. Eksempel: <code>!adam --move n</code><br><em>Retninger: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Ukendt retning: <strong>{value}</strong><br><br>Gyldige: n, ne, e, se, s, sw, w, nw (eller fulde navne som north, northeast)',
      missingState: 'Angiv venligst en tilstand.<br>Gyldige: {states}',
      invalidState: 'Ukendt tilstand: <strong>{value}</strong><br><br>Gyldige: {states}',
      missingAction:
        'Angiv venligst en handling. Eksempler: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Ukendt handling: <strong>{value}</strong><br><br>Kendte handlinger: {actions}',
      accessDeniedConfig: 'Konfigurationsændringer er forbeholdt GM.',
      accessDeniedProfileAssign: '"Profiltildeling er forbeholdt GM.',
      accessDeniedProfileRemove: 'Profilfjernelse er forbeholdt GM.',
      accessDeniedMacro: 'Makroinstallation er forbeholdt GM.',
      accessDeniedReset: 'Nulstilling af indstillinger er forbeholdt GM.',
      unknownCommand:
        'Ukendt kommando. Prøv <code>!adam --help</code> for en liste over tilgængelige kommandoer.',
      moveFailed: 'Bevægelse mislykkedes.',
      gridSizeInvalid: 'Gitterstørrelse skal være et heltal mellem 10 og 1000 (pixels).',
      moveDistanceInvalid: 'Bevægelsesafstand skal være et heltal mellem 1 og 20 (felter).',
      autoFaceInvalid: 'Autoretningsværdi skal være: on eller off.',
      humourInvalid: 'Humorværdi skal være: on eller off.',
      langInvalid: 'Ugyldig sprogindstilling. Understøttede: {locales}',
      profileUsage: 'Brug: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Brug: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> findes ikke. Brug <code>!adam --profile list</code> for at se tilgængelige profiler.',
      profileUnknownSub:
        'Ukendt profil-underkommando: <strong>{sub}</strong><br><br>Gyldige: list, show, assign, remove',
      macroExists: "En makro med navnet \'<strong>{name}</strong>\' findes allerede.",
      simonUnknown:
        'Simon ved ikke hvordan: <em>{command}</em><br><br>Prøv: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> vender nu mod <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> tilstand sat til <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> handling: <strong>{action}</strong> → tilstand: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> tildelt til <strong>{token}</strong>.',
      profileRemoved: 'Profil fjernet fra <strong>{token}</strong>.',
      macroInstalled:
        "Global makro \'<strong>{name}</strong>\' er oprettet og synlig for alle spillere.",
      configUpdated: 'Indstillinger opdateret.',
      settingsReset: '<strong>Indstillinger nulstillet til fabriksstandard.</strong>',
      langSet: 'Sprog sat til {locale}.',
    },
    settings: {
      gridSize: 'Gitterstørrelse',
      gridSizeDesc: '{size}px pr. felt',
      moveDistance: 'Bevægelsesafstand',
      moveDistanceDesc: '{squares} felt(er) — {pixels}px pr. bevægelse',
      autoFace: 'Autoretning ved Bevægelse',
      humour: 'Humor (Påskeæg)',
      language: 'Sprog',
      on: 'Til',
      off: 'Fra',
    },
    profiles: {
      none: 'Ingen animerede brik-profiler er konfigureret.',
      noProfile: 'Valgte brik har ingen profil tildelt.',
      id: 'Profil-ID',
      displayName: 'Vist Navn',
      mappedStates: 'Tilknyttede Tilstande',
      noneValue: '(ingen)',
    },
    menu: {
      title: 'A.D.A.M. Kontrolpanel',
      movement: 'Bevægelse',
      facing: 'Retning',
      state: 'Tilstand',
      stateLabel: 'Tilstand',
      facingLabel: 'Retning',
      profileLabel: 'Profil',
      noProfile: 'Ingen profil',
      help: 'Hjælp',
      config: 'Konfig',
      states: {
        idle: 'Inaktiv',
        combat: 'Kamp',
        walk: 'Gå',
        dash: 'Sprint',
        sneak: 'Snige',
        rage: 'Raseri',
        spellcasting: 'Trylleformular',
        help: 'Hjælp',
      },
    },
    info: {
      subtitle: 'Animeret Retning og Bevægelse',
      versionLabel: 'Version',
      updatedLabel: 'Opdateret',
      creditsBody:
        'A.D.A.M.<br>Animeret Retning og Bevægelse<br><br>Drevet af SIMON.<br>Hedder bestemt ikke Simon.',
      ready: 'MOD KLAR',
    },
  };

  const TRANSLATION$i = {
    titles: {
      error: 'Fout',
      noTokenSelected: 'Geen Token Geselecteerd',
      tokenError: 'Token Fout',
      missingDirection: 'Richting Ontbreekt',
      invalidDirection: 'Ongeldige Richting',
      missingState: 'Status Ontbreekt',
      invalidState: 'Ongeldige Status',
      missingAction: 'Actie Ontbreekt',
      invalidAction: 'Ongeldige Actie',
      accessDenied: 'Toegang Geweigerd',
      invalidValue: 'Ongeldige Waarde',
      unknownCommand: 'Onbekend Commando',
      moveError: 'Bewegingsfout',
      macroExists: 'Macro Bestaat Al',
      macroInstalled: 'Macro Geïnstalleerd',
      invalidUsage: 'Ongeldig Gebruik',
      profileAssigned: 'Profiel Toegewezen',
      profileRemoved: 'Profiel Verwijderd',
      unknownProfile: 'Onbekend Profiel',
      configuration: 'Configuratie',
      settingsReset: 'Instellingen Hersteld',
      scriptReady: 'Script Gereed',
      versionInfo: 'Versie-informatie',
      creditsTitle: 'Credits',
      adamsMenu: 'A.D.A.M. Bedieningspaneel',
      adamsHelp: 'A.D.A.M. Hulp',
      adamsSettings: 'A.D.A.M. Instellingen',
      profiles: 'Geconfigureerde Profielen',
      tokenProfile: 'Token Profiel',
      success: 'Succes',
      langSet: 'Taal Ingesteld',
      langInvalid: 'Ongeldige Taal',
    },
    errors: {
      noTokenSelected:
        'Geen token geselecteerd. Selecteer eerst een token en klik daarna op een richtingsknop.',
      noTokenSelectedStill: 'Nog steeds geen token geselecteerd.',
      noTokenSelectedPersistent: 'Ik bewonder uw doorzettingsvermogen. Selecteer eerst een token.',
      tokenNotFound: 'Het geselecteerde token kon niet worden gevonden.',
      missingDirection:
        'Geef een richting op. Voorbeeld: <code>!adam --move n</code><br><em>Richtingen: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Onbekende richting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volledige namen zoals north, northeast)',
      missingState: 'Geef een status op.<br>Geldig: {states}',
      invalidState: 'Onbekende status: <strong>{value}</strong><br><br>Geldig: {states}',
      missingAction:
        'Geef een actie op. Voorbeelden: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Onbekende actie: <strong>{value}</strong><br><br>Bekende acties: {actions}',
      accessDeniedConfig: 'Configuratiewijzigingen zijn voorbehouden aan de GM.',
      accessDeniedProfileAssign: 'Profieltoewijzing is voorbehouden aan de GM.',
      accessDeniedProfileRemove: 'Profielverwijdering is voorbehouden aan de GM.',
      accessDeniedMacro: 'Macro-installatie is voorbehouden aan de GM.',
      accessDeniedReset: 'Instellingen herstellen is voorbehouden aan de GM.',
      unknownCommand:
        "Onbekend commando. Probeer <code>!adam --help</code> voor een lijst van beschikbare commando's.",
      moveFailed: 'Beweging mislukt.',
      gridSizeInvalid: 'Rastergrootte moet een geheel getal zijn tussen 10 en 1000 (pixels).',
      moveDistanceInvalid: 'Bewegingsafstand moet een geheel getal zijn tussen 1 en 20 (vakjes).',
      autoFaceInvalid: 'Autorichting waarde moet: on of off zijn.',
      humourInvalid: 'Humor waarde moet: on of off zijn.',
      langInvalid: 'Ongeldige taalinstelling. Ondersteund: {locales}',
      profileUsage:
        'Gebruik: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Gebruik: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profiel <strong>{id}</strong> bestaat niet. Gebruik <code>!adam --profile list</code> om beschikbare profielen te bekijken.',
      profileUnknownSub:
        'Onbekend profiel-subcommando: <strong>{sub}</strong><br><br>Geldig: list, show, assign, remove',
      macroExists: "Een macro met de naam \'<strong>{name}</strong>\' bestaat al.",
      simonUnknown:
        'Simon weet niet hoe: <em>{command}</em><br><br>Probeer: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> kijkt nu naar <strong>{direction}</strong>.',
      stateSet: 'Status van <strong>{token}</strong> ingesteld op <strong>{state}</strong>.',
      actionSet:
        'Actie van <strong>{token}</strong>: <strong>{action}</strong> → status: <strong>{state}</strong>.',
      profileAssigned: 'Profiel <strong>{id}</strong> toegewezen aan <strong>{token}</strong>.',
      profileRemoved: 'Profiel verwijderd van <strong>{token}</strong>.',
      macroInstalled:
        "Globale macro \'<strong>{name}</strong>\' is aangemaakt en zichtbaar voor alle spelers.",
      configUpdated: 'Instellingen bijgewerkt.',
      settingsReset: '<strong>Instellingen hersteld naar fabrieksinstellingen.</strong>',
      langSet: 'Taal ingesteld op {locale}.',
    },
    settings: {
      gridSize: 'Rastergrootte',
      gridSizeDesc: '{size}px per vakje',
      moveDistance: 'Bewegingsafstand',
      moveDistanceDesc: '{squares} vakje(s) — {pixels}px per beweging',
      autoFace: 'Automatisch Richten bij Beweging',
      humour: 'Humor (Verborgen Grapjes)',
      language: 'Taal',
      on: 'Aan',
      off: 'Uit',
    },
    profiles: {
      none: 'Er zijn geen geanimeerde token-profielen geconfigureerd.',
      noProfile: 'Geselecteerde token heeft geen profiel toegewezen.',
      id: 'Profiel-ID',
      displayName: 'Weergavenaam',
      mappedStates: 'Toegewezen Statussen',
      noneValue: '(geen)',
    },
    menu: {
      title: 'A.D.A.M. Bedieningspaneel',
      movement: 'Beweging',
      facing: 'Richting',
      state: 'Status',
      stateLabel: 'Status',
      facingLabel: 'Richting',
      profileLabel: 'Profiel',
      noProfile: 'Geen profiel',
      help: 'Hulp',
      config: 'Config',
      states: {
        idle: 'Inactief',
        combat: 'Gevecht',
        walk: 'Lopen',
        dash: 'Rennen',
        sneak: 'Sluipen',
        rage: 'Woede',
        spellcasting: 'Toveren',
        help: 'Hulp',
      },
    },
    info: {
      subtitle: 'Geanimeerde Richting en Beweging',
      versionLabel: 'Versie',
      updatedLabel: 'Bijgewerkt',
      creditsBody:
        'A.D.A.M.<br>Geanimeerde Richting en Beweging<br><br>Aangedreven door SIMON.<br>Heet beslist niet Simon.',
      ready: 'MOD GEREED',
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
      noTokenSelected: 'Ei Valittua Merkkiä',
      tokenError: 'Merkkivirhe',
      missingDirection: 'Suunta Puuttuu',
      invalidDirection: 'Virheellinen Suunta',
      missingState: 'Tila Puuttuu',
      invalidState: 'Virheellinen Tila',
      missingAction: 'Toiminto Puuttuu',
      invalidAction: 'Virheellinen Toiminto',
      accessDenied: 'Pääsy Evätty',
      invalidValue: 'Virheellinen Arvo',
      unknownCommand: 'Tuntematon Komento',
      moveError: 'Liikevirhe',
      macroExists: 'Makro On Jo Olemassa',
      macroInstalled: 'Makro Asennettu',
      invalidUsage: 'Virheellinen Käyttö',
      profileAssigned: 'Profiili Määritetty',
      profileRemoved: 'Profiili Poistettu',
      unknownProfile: 'Tuntematon Profiili',
      configuration: 'Asetukset',
      settingsReset: 'Asetukset Palautettu',
      scriptReady: 'Skripti Valmis',
      versionInfo: 'Versiotiedot',
      creditsTitle: 'Tekijät',
      adamsMenu: 'A.D.A.M. Ohjauspaneeli',
      adamsHelp: 'A.D.A.M. Ohje',
      adamsSettings: 'A.D.A.M. Asetukset',
      profiles: 'Määritetyt Profiilit',
      tokenProfile: 'Merkin Profiili',
      success: 'Onnistui',
      langSet: 'Kieli Asetettu',
      langInvalid: 'Virheellinen Kieli',
    },
    errors: {
      noTokenSelected:
        'Ei valittua merkkiä. Valitse ensin merkki ja napsauta sitten suuntapainiketta.',
      noTokenSelectedStill: 'Edelleen ei valittua merkkiä.',
      noTokenSelectedPersistent: 'Ihailen sinnikkyyttäsi. Valitse ensin merkki.',
      tokenNotFound: 'Valittua merkkiä ei löydy.',
      missingDirection:
        'Anna suunta. Esimerkki: <code>!adam --move n</code><br><em>Suunnat: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Tuntematon suunta: <strong>{value}</strong><br><br>Kelvolliset: n, ne, e, se, s, sw, w, nw (tai täydet nimet kuten north, northeast)',
      missingState: 'Anna tila.<br>Kelvolliset: {states}',
      invalidState: 'Tuntematon tila: <strong>{value}</strong><br><br>Kelvolliset: {states}',
      missingAction: 'Anna toiminto. Esimerkit: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Tuntematon toiminto: <strong>{value}</strong><br><br>Tunnetut toiminnot: {actions}',
      accessDeniedConfig: 'Asetusten muuttaminen on rajoitettu GM:lle.',
      accessDeniedProfileAssign: 'Profiilin määrittäminen on rajoitettu GM:lle.',
      accessDeniedProfileRemove: 'Profiilin poistaminen on rajoitettu GM:lle.',
      accessDeniedMacro: 'Makron asentaminen on rajoitettu GM:lle.',
      accessDeniedReset: 'Asetusten palauttaminen on rajoitettu GM:lle.',
      unknownCommand:
        'Tuntematon komento. Kokeile <code>!adam --help</code> saadaksesi luettelon käytettävissä olevista komennoista.',
      moveFailed: 'Liike epäonnistui.',
      gridSizeInvalid: 'Ruudukon koon on oltava kokonaisluku välillä 10–1000 (pikseliä).',
      moveDistanceInvalid: 'Liikematkan on oltava kokonaisluku välillä 1–20 (ruutuja).',
      autoFaceInvalid: 'Automaattisen suuntauksen arvon on oltava: on tai off.',
      humourInvalid: 'Huumorin arvon on oltava: on tai off.',
      langInvalid: 'Virheellinen kielimääritys. Tuetut: {locales}',
      profileUsage:
        'Käyttö: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Käyttö: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profiilia <strong>{id}</strong> ei ole olemassa. Käytä <code>!adam --profile list</code> nähdäksesi käytettävissä olevat profiilit.',
      profileUnknownSub:
        'Tuntematon profiilin alikomento: <strong>{sub}</strong><br><br>Kelvolliset: list, show, assign, remove',
      macroExists: "Makro nimeltä \'<strong>{name}</strong>\' on jo olemassa.",
      simonUnknown:
        'Simon ei tiedä miten: <em>{command}</em><br><br>Kokeile: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> katsoo nyt suuntaan <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong> tila asetettu: <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong> toiminto: <strong>{action}</strong> → tila: <strong>{state}</strong>.',
      profileAssigned:
        'Profiili <strong>{id}</strong> määritetty kohteelle <strong>{token}</strong>.',
      profileRemoved: 'Profiili poistettu kohteelta <strong>{token}</strong>.',
      macroInstalled:
        "Globaali makro \'<strong>{name}</strong>\' on luotu ja näkyy kaikille pelaajille.",
      configUpdated: 'Asetukset päivitetty.',
      settingsReset: '<strong>Asetukset palautettu tehdasasetuksiin.</strong>',
      langSet: 'Kieli asetettu: {locale}.',
    },
    settings: {
      gridSize: 'Ruudukon Koko',
      gridSizeDesc: '{size}px per ruutu',
      moveDistance: 'Liikematka',
      moveDistanceDesc: '{squares} ruutu(a) — {pixels}px per liike',
      autoFace: 'Automaattinen Suuntaus Liikkuessa',
      humour: 'Huumori (Pääsiäismunat)',
      language: 'Kieli',
      on: 'Päällä',
      off: 'Pois',
    },
    profiles: {
      none: 'Animoituja merkkiprofiileja ei ole määritetty.',
      noProfile: 'Valitulle merkille ei ole määritetty profiilia.',
      id: 'Profiilin ID',
      displayName: 'Näyttönimi',
      mappedStates: 'Määritetyt Tilat',
      noneValue: '(ei mitään)',
    },
    menu: {
      title: 'A.D.A.M. Ohjauspaneeli',
      movement: 'Liike',
      facing: 'Suunta',
      state: 'Tila',
      stateLabel: 'Tila',
      facingLabel: 'Suunta',
      profileLabel: 'Profiili',
      noProfile: 'Ei profiilia',
      help: 'Ohje',
      config: 'Asetukset',
      states: {
        idle: 'Lepotila',
        combat: 'Taistelu',
        walk: 'Kävely',
        dash: 'Juoksu',
        sneak: 'Hiipiä',
        rage: 'Raivo',
        spellcasting: 'Loitsu',
        help: 'Ohje',
      },
    },
    info: {
      subtitle: 'Animoitu Suunta ja Liike',
      versionLabel: 'Versio',
      updatedLabel: 'Päivitetty',
      creditsBody:
        'A.D.A.M.<br>Animoitu Suunta ja Liike<br><br>Toimii SIMONin avulla.<br>Ei suinkaan nimeltä Simon.',
      ready: 'MOD VALMIS',
    },
  };

  const TRANSLATION$f = {
    titles: {
      error: 'Erreur',
      noTokenSelected: 'Aucun Pion Sélectionné',
      tokenError: 'Erreur de Pion',
      missingDirection: 'Direction Manquante',
      invalidDirection: 'Direction Invalide',
      missingState: 'État Manquant',
      invalidState: 'État Invalide',
      missingAction: 'Action Manquante',
      invalidAction: 'Action Invalide',
      accessDenied: 'Accès Refusé',
      invalidValue: 'Valeur Invalide',
      unknownCommand: 'Commande Inconnue',
      moveError: 'Erreur de Déplacement',
      macroExists: 'La Macro Existe Déjà',
      macroInstalled: 'Macro Installée',
      invalidUsage: 'Utilisation Invalide',
      profileAssigned: 'Profil Attribué',
      profileRemoved: 'Profil Supprimé',
      unknownProfile: 'Profil Inconnu',
      configuration: 'Configuration',
      settingsReset: 'Paramètres Réinitialisés',
      scriptReady: 'Script Prêt',
      versionInfo: 'Informations de Version',
      creditsTitle: 'Crédits',
      adamsMenu: 'Panneau de Contrôle A.D.A.M.',
      adamsHelp: 'Aide A.D.A.M.',
      adamsSettings: 'Paramètres A.D.A.M.',
      profiles: 'Profils Configurés',
      tokenProfile: 'Profil du Pion',
      success: 'Succès',
      langSet: 'Langue Définie',
      langInvalid: 'Langue Invalide',
    },
    errors: {
      noTokenSelected:
        "Aucun pion sélectionné. Veuillez d'abord sélectionner un pion, puis cliquer sur un bouton de direction.",
      noTokenSelectedStill: 'Toujours aucun pion sélectionné.',
      noTokenSelectedPersistent: "J'admire votre persévérance. Sélectionnez d'abord un pion.",
      tokenNotFound: 'Le pion sélectionné est introuvable.',
      missingDirection:
        'Veuillez indiquer une direction. Exemple : <code>!adam --move n</code><br><em>Directions : n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direction inconnue : <strong>{value}</strong><br><br>Valides : n, ne, e, se, s, sw, w, nw (ou noms complets comme north, northeast)',
      missingState: 'Veuillez indiquer un état.<br>Valides : {states}',
      invalidState: 'État inconnu : <strong>{value}</strong><br><br>Valides : {states}',
      missingAction:
        'Veuillez indiquer une action. Exemples : help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Action inconnue : <strong>{value}</strong><br><br>Actions connues : {actions}',
      accessDeniedConfig: 'Les modifications de configuration sont réservées au MJ.',
      accessDeniedProfileAssign: "L'attribution de profil est réservée au MJ.",
      accessDeniedProfileRemove: 'La suppression de profil est réservée au MJ.',
      accessDeniedMacro: "L'installation de macros est réservée au MJ.",
      accessDeniedReset: 'La réinitialisation des paramètres est réservée au MJ.',
      unknownCommand:
        'Commande inconnue. Essayez <code>!adam --help</code> pour obtenir la liste des commandes disponibles.',
      moveFailed: 'Le déplacement a échoué.',
      gridSizeInvalid: 'La taille de la grille doit être un entier entre 10 et 1000 (pixels).',
      moveDistanceInvalid: 'La distance de déplacement doit être un entier entre 1 et 20 (cases).',
      autoFaceInvalid: "La valeur d'orientation automatique doit être : on ou off.",
      humourInvalid: "La valeur d'humour doit être : on ou off.",
      langInvalid: 'Paramètre régional invalide. Pris en charge : {locales}',
      profileUsage:
        'Utilisation : <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Utilisation : <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        "Le profil <strong>{id}</strong> n'existe pas. Utilisez <code>!adam --profile list</code> pour voir les profils disponibles.",
      profileUnknownSub:
        'Sous-commande de profil inconnue : <strong>{sub}</strong><br><br>Valides : list, show, assign, remove',
      macroExists: "Une macro nommée \'<strong>{name}</strong>\' existe déjà.",
      simonUnknown:
        'Simon ne sait pas comment faire : <em>{command}</em><br><br>Essayez : <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> fait maintenant face à <strong>{direction}</strong>.',
      stateSet: 'État de <strong>{token}</strong> défini sur <strong>{state}</strong>.',
      actionSet:
        'Action de <strong>{token}</strong> : <strong>{action}</strong> → état : <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> attribué à <strong>{token}</strong>.',
      profileRemoved: 'Profil supprimé de <strong>{token}</strong>.',
      macroInstalled:
        "La macro globale \'<strong>{name}</strong>\' a été créée et est visible par tous les joueurs.",
      configUpdated: 'Paramètres mis à jour.',
      settingsReset: "<strong>Paramètres réinitialisés aux valeurs d'usine.</strong>",
      langSet: 'Langue définie sur {locale}.',
    },
    settings: {
      gridSize: 'Taille de la Grille',
      gridSizeDesc: '{size}px par case',
      moveDistance: 'Distance de Déplacement',
      moveDistanceDesc: '{squares} case(s) — {pixels}px par déplacement',
      autoFace: 'Orientation Automatique au Déplacement',
      humour: 'Humour (Œufs de Pâques)',
      language: 'Langue',
      on: 'Activé',
      off: 'Désactivé',
    },
    profiles: {
      none: "Aucun profil de pion animé n'est configuré.",
      noProfile: "Le pion sélectionné n'a aucun profil attribué.",
      id: 'ID de Profil',
      displayName: 'Nom Affiché',
      mappedStates: 'États Associés',
      noneValue: '(aucun)',
    },
    menu: {
      title: 'Panneau de Contrôle A.D.A.M.',
      movement: 'Déplacement',
      facing: 'Orientation',
      state: 'État',
      stateLabel: 'État',
      facingLabel: 'Orientation',
      profileLabel: 'Profil',
      noProfile: 'Aucun profil',
      help: 'Aide',
      config: 'Config',
      states: {
        idle: 'Inactif',
        combat: 'Combat',
        walk: 'Marche',
        dash: 'Sprint',
        sneak: 'Discrétion',
        rage: 'Rage',
        spellcasting: 'Incantation',
        help: 'Aide',
      },
    },
    info: {
      subtitle: 'Direction et Mouvement Animés',
      versionLabel: 'Version',
      updatedLabel: 'Mis à jour',
      creditsBody:
        "A.D.A.M.<br>Direction et Mouvement Animés<br><br>Propulsé par SIMON.<br>Ne s'appelle définitivement pas Simon.",
      ready: 'MOD PRÊT',
    },
  };

  const TRANSLATION$e = {
    titles: {
      error: 'Fehler',
      noTokenSelected: 'Kein Token Ausgewählt',
      tokenError: 'Token-Fehler',
      missingDirection: 'Richtung Fehlt',
      invalidDirection: 'Ungültige Richtung',
      missingState: 'Zustand Fehlt',
      invalidState: 'Ungültiger Zustand',
      missingAction: 'Aktion Fehlt',
      invalidAction: 'Ungültige Aktion',
      accessDenied: 'Zugriff Verweigert',
      invalidValue: 'Ungültiger Wert',
      unknownCommand: 'Unbekannter Befehl',
      moveError: 'Bewegungsfehler',
      macroExists: 'Makro Existiert Bereits',
      macroInstalled: 'Makro Installiert',
      invalidUsage: 'Ungültige Verwendung',
      profileAssigned: 'Profil Zugewiesen',
      profileRemoved: 'Profil Entfernt',
      unknownProfile: 'Unbekanntes Profil',
      configuration: 'Konfiguration',
      settingsReset: 'Einstellungen Zurückgesetzt',
      scriptReady: 'Skript Bereit',
      versionInfo: 'Versionsinformationen',
      creditsTitle: 'Mitwirkende',
      adamsMenu: 'A.D.A.M. Steuerpult',
      adamsHelp: 'A.D.A.M. Hilfe',
      adamsSettings: 'A.D.A.M. Einstellungen',
      profiles: 'Konfigurierte Profile',
      tokenProfile: 'Token-Profil',
      success: 'Erfolg',
      langSet: 'Sprache Festgelegt',
      langInvalid: 'Ungültige Sprache',
    },
    errors: {
      noTokenSelected:
        'Kein Token ausgewählt. Bitte zuerst einen Token auswählen und dann auf eine Richtungsschaltfläche klicken.',
      noTokenSelectedStill: 'Immer noch kein Token ausgewählt.',
      noTokenSelectedPersistent:
        'Ich bewundere Ihre Beharrlichkeit. Bitte zuerst einen Token auswählen.',
      tokenNotFound: 'Der ausgewählte Token konnte nicht gefunden werden.',
      missingDirection:
        'Bitte eine Richtung angeben. Beispiel: <code>!adam --move n</code><br><em>Richtungen: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Unbekannte Richtung: <strong>{value}</strong><br><br>Gültig: n, ne, e, se, s, sw, w, nw (oder vollständige Namen wie north, northeast)',
      missingState: 'Bitte einen Zustand angeben.<br>Gültig: {states}',
      invalidState: 'Unbekannter Zustand: <strong>{value}</strong><br><br>Gültig: {states}',
      missingAction:
        'Bitte eine Aktion angeben. Beispiele: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Unbekannte Aktion: <strong>{value}</strong><br><br>Bekannte Aktionen: {actions}',
      accessDeniedConfig: 'Konfigurationsänderungen sind dem GM vorbehalten.',
      accessDeniedProfileAssign: 'Die Profilzuweisung ist dem GM vorbehalten.',
      accessDeniedProfileRemove: 'Das Entfernen von Profilen ist dem GM vorbehalten.',
      accessDeniedMacro: 'Die Makro-Installation ist dem GM vorbehalten.',
      accessDeniedReset: 'Das Zurücksetzen der Einstellungen ist dem GM vorbehalten.',
      unknownCommand:
        'Unbekannter Befehl. Versuchen Sie <code>!adam --help</code> für eine Liste der verfügbaren Befehle.',
      moveFailed: 'Bewegung fehlgeschlagen.',
      gridSizeInvalid: 'Die Rastergröße muss eine ganze Zahl zwischen 10 und 1000 sein (Pixel).',
      moveDistanceInvalid:
        'Die Bewegungsweite muss eine ganze Zahl zwischen 1 und 20 sein (Felder).',
      autoFaceInvalid: 'Der Wert für automatische Ausrichtung muss: on oder off sein.',
      humourInvalid: 'Der Humorwert muss: on oder off sein.',
      langInvalid: 'Ungültige Spracheinstellung. Unterstützt: {locales}',
      profileUsage:
        'Verwendung: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Verwendung: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> existiert nicht. Verwenden Sie <code>!adam --profile list</code>, um verfügbare Profile anzuzeigen.',
      profileUnknownSub:
        'Unbekannter Profil-Unterbefehl: <strong>{sub}</strong><br><br>Gültig: list, show, assign, remove',
      macroExists: "Ein Makro mit dem Namen \'<strong>{name}</strong>\' existiert bereits.",
      simonUnknown:
        'Simon weiß nicht, wie das geht: <em>{command}</em><br><br>Versuchen Sie: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> blickt jetzt in Richtung <strong>{direction}</strong>.',
      stateSet: 'Zustand von <strong>{token}</strong> auf <strong>{state}</strong> gesetzt.',
      actionSet:
        'Aktion von <strong>{token}</strong>: <strong>{action}</strong> → Zustand: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> wurde <strong>{token}</strong> zugewiesen.',
      profileRemoved: 'Profil von <strong>{token}</strong> entfernt.',
      macroInstalled:
        "Globales Makro \'<strong>{name}</strong>\' wurde erstellt und ist für alle Spieler sichtbar.",
      configUpdated: 'Einstellungen aktualisiert.',
      settingsReset: '<strong>Einstellungen auf Werksstandard zurückgesetzt.</strong>',
      langSet: 'Sprache auf {locale} festgelegt.',
    },
    settings: {
      gridSize: 'Rastergröße',
      gridSizeDesc: '{size}px pro Feld',
      moveDistance: 'Bewegungsweite',
      moveDistanceDesc: '{squares} Feld(er) — {pixels}px pro Bewegung',
      autoFace: 'Automatische Ausrichtung bei Bewegung',
      humour: 'Humor (Ostereier)',
      language: 'Sprache',
      on: 'Ein',
      off: 'Aus',
    },
    profiles: {
      none: 'Es sind keine animierten Token-Profile konfiguriert.',
      noProfile: 'Dem ausgewählten Token ist kein Profil zugewiesen.',
      id: 'Profil-ID',
      displayName: 'Anzeigename',
      mappedStates: 'Zugewiesene Zustände',
      noneValue: '(keiner)',
    },
    menu: {
      title: 'A.D.A.M. Steuerpult',
      movement: 'Bewegung',
      facing: 'Ausrichtung',
      state: 'Zustand',
      stateLabel: 'Zustand',
      facingLabel: 'Ausrichtung',
      profileLabel: 'Profil',
      noProfile: 'Kein Profil',
      help: 'Hilfe',
      config: 'Konfig',
      states: {
        idle: 'Untätig',
        combat: 'Kampf',
        walk: 'Gehen',
        dash: 'Sprint',
        sneak: 'Schleichen',
        rage: 'Raserei',
        spellcasting: 'Zaubern',
        help: 'Hilfe',
      },
    },
    info: {
      subtitle: 'Animierte Richtung und Bewegung',
      versionLabel: 'Version',
      updatedLabel: 'Aktualisiert',
      creditsBody:
        'A.D.A.M.<br>Animierte Richtung und Bewegung<br><br>Betrieben von SIMON.<br>Heißt definitiv nicht Simon.',
      ready: 'MOD BEREIT',
    },
  };

  const TRANSLATION$d = {
    titles: {
      error: 'Σφάλμα',
      noTokenSelected: 'Δεν Επιλέχθηκε Μάρκα',
      tokenError: 'Σφάλμα Μάρκας',
      missingDirection: 'Λείπει Κατεύθυνση',
      invalidDirection: 'Μη Έγκυρη Κατεύθυνση',
      missingState: 'Λείπει Κατάσταση',
      invalidState: 'Μη Έγκυρη Κατάσταση',
      missingAction: 'Λείπει Ενέργεια',
      invalidAction: 'Μη Έγκυρη Ενέργεια',
      accessDenied: 'Η Πρόσβαση Απορρίφθηκε',
      invalidValue: 'Μη Έγκυρη Τιμή',
      unknownCommand: 'Άγνωστη Εντολή',
      moveError: 'Σφάλμα Κίνησης',
      macroExists: 'Η Μακροεντολή Υπάρχει Ήδη',
      macroInstalled: 'Η Μακροεντολή Εγκαταστάθηκε',
      invalidUsage: 'Μη Έγκυρη Χρήση',
      profileAssigned: 'Προφίλ Ανατέθηκε',
      profileRemoved: 'Προφίλ Αφαιρέθηκε',
      unknownProfile: 'Άγνωστο Προφίλ',
      configuration: 'Διαμόρφωση',
      settingsReset: 'Επαναφορά Ρυθμίσεων',
      scriptReady: 'Το Σενάριο Είναι Έτοιμο',
      versionInfo: 'Πληροφορίες Έκδοσης',
      creditsTitle: 'Χρεώσεις',
      adamsMenu: 'Πίνακας Ελέγχου A.D.A.M.',
      adamsHelp: 'Βοήθεια A.D.A.M.',
      adamsSettings: 'Ρυθμίσεις A.D.A.M.',
      profiles: 'Διαμορφωμένα Προφίλ',
      tokenProfile: 'Προφίλ Μάρκας',
      success: 'Επιτυχία',
      langSet: 'Γλώσσα Ορίστηκε',
      langInvalid: 'Μη Έγκυρη Γλώσσα',
    },
    errors: {
      noTokenSelected:
        'Δεν έχει επιλεχθεί μάρκα. Επιλέξτε πρώτα μια μάρκα και μετά κάντε κλικ σε κουμπί κατεύθυνσης.',
      noTokenSelectedStill: 'Ακόμα δεν έχει επιλεχθεί μάρκα.',
      noTokenSelectedPersistent: 'Θαυμάζω την επιμονή σας. Επιλέξτε πρώτα μια μάρκα.',
      tokenNotFound: 'Η επιλεγμένη μάρκα δεν βρέθηκε.',
      missingDirection:
        'Δώστε μια κατεύθυνση. Παράδειγμα: <code>!adam --move n</code><br><em>Κατευθύνσεις: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Άγνωστη κατεύθυνση: <strong>{value}</strong><br><br>Έγκυρες: n, ne, e, se, s, sw, w, nw (ή πλήρη ονόματα όπως north, northeast)',
      missingState: 'Δώστε μια κατάσταση.<br>Έγκυρες: {states}',
      invalidState: 'Άγνωστη κατάσταση: <strong>{value}</strong><br><br>Έγκυρες: {states}',
      missingAction:
        'Δώστε μια ενέργεια. Παραδείγματα: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Άγνωστη ενέργεια: <strong>{value}</strong><br><br>Γνωστές ενέργειες: {actions}',
      accessDeniedConfig: 'Οι αλλαγές διαμόρφωσης επιτρέπονται μόνο στον GM.',
      accessDeniedProfileAssign: 'Η ανάθεση προφίλ επιτρέπεται μόνο στον GM.',
      accessDeniedProfileRemove: 'Η αφαίρεση προφίλ επιτρέπεται μόνο στον GM.',
      accessDeniedMacro: 'Η εγκατάσταση μακροεντολής επιτρέπεται μόνο στον GM.',
      accessDeniedReset: 'Η επαναφορά ρυθμίσεων επιτρέπεται μόνο στον GM.',
      unknownCommand:
        'Άγνωστη εντολή. Δοκιμάστε <code>!adam --help</code> για λίστα διαθέσιμων εντολών.',
      moveFailed: 'Η κίνηση απέτυχε.',
      gridSizeInvalid: 'Το μέγεθος πλέγματος πρέπει να είναι ακέραιος μεταξύ 10 και 1000 (pixel).',
      moveDistanceInvalid:
        'Η απόσταση κίνησης πρέπει να είναι ακέραιος μεταξύ 1 και 20 (τετράγωνα).',
      autoFaceInvalid: 'Η τιμή αυτόματης κατεύθυνσης πρέπει να είναι: on ή off.',
      humourInvalid: 'Η τιμή χιούμορ πρέπει να είναι: on ή off.',
      langInvalid: 'Μη έγκυρη γλώσσα. Υποστηριζόμενες: {locales}',
      profileUsage:
        'Χρήση: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Χρήση: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Το προφίλ <strong>{id}</strong> δεν υπάρχει. Χρησιμοποιήστε <code>!adam --profile list</code> για να δείτε τα διαθέσιμα προφίλ.',
      profileUnknownSub:
        'Άγνωστη εντολή προφίλ: <strong>{sub}</strong><br><br>Έγκυρες: list, show, assign, remove',
      macroExists: "Μια μακροεντολή με όνομα \'<strong>{name}</strong>\' υπάρχει ήδη.",
      simonUnknown:
        'Ο Simon δεν ξέρει πώς: <em>{command}</em><br><br>Δοκιμάστε: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> κοιτάει τώρα προς <strong>{direction}</strong>.',
      stateSet: 'Κατάσταση του <strong>{token}</strong> ορίστηκε σε <strong>{state}</strong>.',
      actionSet:
        'Ενέργεια του <strong>{token}</strong>: <strong>{action}</strong> → κατάσταση: <strong>{state}</strong>.',
      profileAssigned: 'Το προφίλ <strong>{id}</strong> ανατέθηκε στο <strong>{token}</strong>.',
      profileRemoved: 'Το προφίλ αφαιρέθηκε από το <strong>{token}</strong>.',
      macroInstalled:
        "Η καθολική μακροεντολή \'<strong>{name}</strong>\' δημιουργήθηκε και είναι ορατή σε όλους τους παίκτες.",
      configUpdated: 'Οι ρυθμίσεις ενημερώθηκαν.',
      settingsReset: '<strong>Οι ρυθμίσεις επαναφέρθηκαν στις εργοστασιακές προεπιλογές.</strong>',
      langSet: 'Η γλώσσα ορίστηκε σε {locale}.',
    },
    settings: {
      gridSize: 'Μέγεθος Πλέγματος',
      gridSizeDesc: '{size}px ανά τετράγωνο',
      moveDistance: 'Απόσταση Κίνησης',
      moveDistanceDesc: '{squares} τετράγωνο(-α) — {pixels}px ανά κίνηση',
      autoFace: 'Αυτόματη Κατεύθυνση κατά Κίνηση',
      humour: 'Χιούμορ (Πασχαλινά Αυγά)',
      language: 'Γλώσσα',
      on: 'Ενεργό',
      off: 'Ανενεργό',
    },
    profiles: {
      none: 'Δεν έχουν διαμορφωθεί προφίλ κινούμενης μάρκας.',
      noProfile: 'Η επιλεγμένη μάρκα δεν έχει προφίλ.',
      id: 'ID Προφίλ',
      displayName: 'Εμφανιζόμενο Όνομα',
      mappedStates: 'Αντιστοιχισμένες Καταστάσεις',
      noneValue: '(καμία)',
    },
    menu: {
      title: 'Πίνακας Ελέγχου A.D.A.M.',
      movement: 'Κίνηση',
      facing: 'Κατεύθυνση',
      state: 'Κατάσταση',
      stateLabel: 'Κατάσταση',
      facingLabel: 'Κατεύθυνση',
      profileLabel: 'Προφίλ',
      noProfile: 'Χωρίς προφίλ',
      help: 'Βοήθεια',
      config: 'Ρυθμίσεις',
      states: {
        idle: 'Αδρανής',
        combat: 'Μάχη',
        walk: 'Βάδισμα',
        dash: 'Τρέξιμο',
        sneak: 'Υποκλοπή',
        rage: 'Μανία',
        spellcasting: 'Μαγεία',
        help: 'Βοήθεια',
      },
    },
    info: {
      subtitle: 'Κινούμενη Κατεύθυνση και Κίνηση',
      versionLabel: 'Έκδοση',
      updatedLabel: 'Ενημερώθηκε',
      creditsBody:
        'A.D.A.M.<br>Κινούμενη Κατεύθυνση και Κίνηση<br><br>Τροφοδοτείται από τον SIMON.<br>Σίγουρα δεν λέγεται Simon.',
      ready: 'ΤΟ MOD ΕΙΝΑΙ ΕΤΟΙΜΟ',
    },
  };

  const TRANSLATION$c = {
    titles: {
      error: 'שגיאה',
      noTokenSelected: 'לא נבחר אסימון',
      tokenError: 'שגיאת אסימון',
      missingDirection: 'כיוון חסר',
      invalidDirection: 'כיוון לא חוקי',
      missingState: 'מצב חסר',
      invalidState: 'מצב לא חוקי',
      missingAction: 'פעולה חסרה',
      invalidAction: 'פעולה לא חוקית',
      accessDenied: 'הגישה נדחתה',
      invalidValue: 'ערך לא חוקי',
      unknownCommand: 'פקודה לא מוכרת',
      moveError: 'שגיאת תנועה',
      macroExists: 'המאקרו כבר קיים',
      macroInstalled: 'המאקרו הותקן',
      invalidUsage: 'שימוש לא חוקי',
      profileAssigned: 'פרופיל הוקצה',
      profileRemoved: 'פרופיל הוסר',
      unknownProfile: 'פרופיל לא מוכר',
      configuration: 'הגדרות',
      settingsReset: 'ההגדרות אופסו',
      scriptReady: 'הסקריפט מוכן',
      versionInfo: 'מידע גרסה',
      creditsTitle: 'קרדיטים',
      adamsMenu: 'לוח הבקרה של A.D.A.M.',
      adamsHelp: 'עזרה A.D.A.M.',
      adamsSettings: 'הגדרות A.D.A.M.',
      profiles: 'פרופילים מוגדרים',
      tokenProfile: 'פרופיל אסימון',
      success: 'הצלחה',
      langSet: 'שפה הוגדרה',
      langInvalid: 'שפה לא חוקית',
    },
    errors: {
      noTokenSelected: 'לא נבחר אסימון. יש לבחור אסימון תחילה ואז ללחוץ על כפתור כיוון.',
      noTokenSelectedStill: 'עדיין לא נבחר אסימון.',
      noTokenSelectedPersistent: 'אני מעריץ את התמדתך. יש לבחור אסימון תחילה.',
      tokenNotFound: 'האסימון הנבחר לא נמצא.',
      missingDirection:
        'יש לספק כיוון. דוגמה: <code>!adam --move n</code><br><em>כיוונים: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'כיוון לא מוכר: <strong>{value}</strong><br><br>חוקיים: n, ne, e, se, s, sw, w, nw (או שמות מלאים כגון north, northeast)',
      missingState: 'יש לספק מצב.<br>חוקיים: {states}',
      invalidState: 'מצב לא מוכר: <strong>{value}</strong><br><br>חוקיים: {states}',
      missingAction: 'יש לספק פעולה. דוגמאות: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'פעולה לא מוכרת: <strong>{value}</strong><br><br>פעולות מוכרות: {actions}',
      accessDeniedConfig: 'שינויי הגדרות מוגבלים ל-GM.',
      accessDeniedProfileAssign: 'הקצאת פרופיל מוגבלת ל-GM.',
      accessDeniedProfileRemove: 'הסרת פרופיל מוגבלת ל-GM.',
      accessDeniedMacro: 'התקנת מאקרו מוגבלת ל-GM.',
      accessDeniedReset: 'איפוס הגדרות מוגבל ל-GM.',
      unknownCommand: 'פקודה לא מוכרת. נסה <code>!adam --help</code> לרשימת פקודות זמינות.',
      moveFailed: 'התנועה נכשלה.',
      gridSizeInvalid: 'גודל הרשת חייב להיות מספר שלם בין 10 ל-1000 (פיקסלים).',
      moveDistanceInvalid: 'מרחק התנועה חייב להיות מספר שלם בין 1 ל-20 (ריבועים).',
      autoFaceInvalid: 'ערך פנייה אוטומטית חייב להיות: on או off.',
      humourInvalid: 'ערך הומור חייב להיות: on או off.',
      langInvalid: 'הגדרת שפה לא חוקית. נתמכות: {locales}',
      profileUsage:
        'שימוש: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'שימוש: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'פרופיל <strong>{id}</strong> אינו קיים. השתמש ב-<code>!adam --profile list</code> לצפייה בפרופילים זמינים.',
      profileUnknownSub:
        'תת-פקודת פרופיל לא מוכרת: <strong>{sub}</strong><br><br>חוקיות: list, show, assign, remove',
      macroExists: "מאקרו בשם \'<strong>{name}</strong>\' כבר קיים.",
      simonUnknown:
        'סיימון לא יודע איך לבצע: <em>{command}</em><br><br>נסה: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> פונה עכשיו ל-<strong>{direction}</strong>.',
      stateSet: 'מצב <strong>{token}</strong> הוגדר ל-<strong>{state}</strong>.',
      actionSet:
        'פעולת <strong>{token}</strong>: <strong>{action}</strong> → מצב: <strong>{state}</strong>.',
      profileAssigned: 'פרופיל <strong>{id}</strong> הוקצה ל-<strong>{token}</strong>.',
      profileRemoved: 'הפרופיל הוסר מ-<strong>{token}</strong>.',
      macroInstalled: "המאקרו הגלובלי \'<strong>{name}</strong>\' נוצר וגלוי לכל השחקנים.",
      configUpdated: 'ההגדרות עודכנו.',
      settingsReset: '<strong>ההגדרות אופסו לברירות המחדל של היצרן.</strong>',
      langSet: 'השפה הוגדרה ל-{locale}.',
    },
    settings: {
      gridSize: 'גודל רשת',
      gridSizeDesc: '{size}px לריבוע',
      moveDistance: 'מרחק תנועה',
      moveDistanceDesc: '{squares} ריבוע/ריבועים — {pixels}px לתנועה',
      autoFace: 'פנייה אוטומטית בתנועה',
      humour: 'הומור (ביצי פסחא)',
      language: 'שפה',
      on: 'פועל',
      off: 'כבוי',
    },
    profiles: {
      none: 'לא הוגדרו פרופילי אסימון מונפשים.',
      noProfile: 'לאסימון הנבחר לא הוקצה פרופיל.',
      id: 'מזהה פרופיל',
      displayName: 'שם תצוגה',
      mappedStates: 'מצבים ממופים',
      noneValue: '(אין)',
    },
    menu: {
      title: 'לוח הבקרה של A.D.A.M.',
      movement: 'תנועה',
      facing: 'כיוון',
      state: 'מצב',
      stateLabel: 'מצב',
      facingLabel: 'כיוון',
      profileLabel: 'פרופיל',
      noProfile: 'ללא פרופיל',
      help: 'עזרה',
      config: 'הגדרות',
      states: {
        idle: 'סרק',
        combat: 'קרב',
        walk: 'הליכה',
        dash: 'ריצה',
        sneak: 'התגנבות',
        rage: 'זעם',
        spellcasting: 'לחש',
        help: 'עזרה',
      },
    },
    info: {
      subtitle: 'כיוון ותנועה מונפשים',
      versionLabel: 'גרסה',
      updatedLabel: 'עודכן',
      creditsBody:
        'A.D.A.M.<br>כיוון ותנועה מונפשים<br><br>מופעל על ידי SIMON.<br>בהחלט לא נקרא סיימון.',
      ready: 'ה-MOD מוכן',
    },
  };

  const TRANSLATION$b = {
    titles: {
      error: 'Hiba',
      noTokenSelected: 'Nincs Token Kiválasztva',
      tokenError: 'Token Hiba',
      missingDirection: 'Hiányzó Irány',
      invalidDirection: 'Érvénytelen Irány',
      missingState: 'Hiányzó Állapot',
      invalidState: 'Érvénytelen Állapot',
      missingAction: 'Hiányzó Művelet',
      invalidAction: 'Érvénytelen Művelet',
      accessDenied: 'Hozzáférés Megtagadva',
      invalidValue: 'Érvénytelen Érték',
      unknownCommand: 'Ismeretlen Parancs',
      moveError: 'Mozgási Hiba',
      macroExists: 'A Makró Már Létezik',
      macroInstalled: 'Makró Telepítve',
      invalidUsage: 'Érvénytelen Használat',
      profileAssigned: 'Profil Hozzárendelve',
      profileRemoved: 'Profil Eltávolítva',
      unknownProfile: 'Ismeretlen Profil',
      configuration: 'Konfiguráció',
      settingsReset: 'Beállítások Visszaállítva',
      scriptReady: 'Szkript Kész',
      versionInfo: 'Verzióinformáció',
      creditsTitle: 'Köszönetnyilvánítás',
      adamsMenu: 'A.D.A.M. Vezérlőpult',
      adamsHelp: 'A.D.A.M. Súgó',
      adamsSettings: 'A.D.A.M. Beállítások',
      profiles: 'Konfigurált Profilok',
      tokenProfile: 'Token Profil',
      success: 'Siker',
      langSet: 'Nyelv Beállítva',
      langInvalid: 'Érvénytelen Nyelv',
    },
    errors: {
      noTokenSelected:
        'Nincs token kiválasztva. Először válasszon ki egy tokent, majd kattintson egy irány gombra.',
      noTokenSelectedStill: 'Még mindig nincs token kiválasztva.',
      noTokenSelectedPersistent: 'Csodálom a kitartását. Először válasszon ki egy tokent.',
      tokenNotFound: 'A kiválasztott token nem található.',
      missingDirection:
        'Adjon meg egy irányt. Példa: <code>!adam --move n</code><br><em>Irányok: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Ismeretlen irány: <strong>{value}</strong><br><br>Érvényes: n, ne, e, se, s, sw, w, nw (vagy teljes nevek, pl. north, northeast)',
      missingState: 'Adjon meg egy állapotot.<br>Érvényes: {states}',
      invalidState: 'Ismeretlen állapot: <strong>{value}</strong><br><br>Érvényes: {states}',
      missingAction:
        'Adjon meg egy műveletet. Példák: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Ismeretlen művelet: <strong>{value}</strong><br><br>Ismert műveletek: {actions}',
      accessDeniedConfig: 'A konfiguráció módosítása csak a GM számára engedélyezett.',
      accessDeniedProfileAssign: 'A profil hozzárendelése csak a GM számára engedélyezett.',
      accessDeniedProfileRemove: 'A profil eltávolítása csak a GM számára engedélyezett.',
      accessDeniedMacro: 'A makró telepítése csak a GM számára engedélyezett.',
      accessDeniedReset: 'A beállítások visszaállítása csak a GM számára engedélyezett.',
      unknownCommand:
        'Ismeretlen parancs. Próbálja: <code>!adam --help</code> az elérhető parancsok listájáért.',
      moveFailed: 'A mozgás meghiúsult.',
      gridSizeInvalid: 'A rácsméretek egész számnak kell lennie 10 és 1000 között (képpont).',
      moveDistanceInvalid:
        'A mozgási távolságnak egész számnak kell lennie 1 és 20 között (mezők).',
      autoFaceInvalid: 'Az automatikus arcirány értéke: on vagy off lehet.',
      humourInvalid: 'A humor értéke: on vagy off lehet.',
      langInvalid: 'Érvénytelen területi beállítás. Támogatott: {locales}',
      profileUsage:
        'Használat: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Használat: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'A <strong>{id}</strong> profil nem létezik. Használja a <code>!adam --profile list</code> parancsot az elérhető profilok megtekintéséhez.',
      profileUnknownSub:
        'Ismeretlen profil alparancs: <strong>{sub}</strong><br><br>Érvényes: list, show, assign, remove',
      macroExists: "Már létezik \'<strong>{name}</strong>\' nevű makró.",
      simonUnknown:
        'Simon nem tudja, hogyan kell: <em>{command}</em><br><br>Próbálja: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> most <strong>{direction}</strong> felé néz.',
      stateSet: '<strong>{token}</strong> állapota <strong>{state}</strong> lett.',
      actionSet:
        '<strong>{token}</strong> művelete: <strong>{action}</strong> → állapot: <strong>{state}</strong>.',
      profileAssigned: '<strong>{id}</strong> profil hozzárendelve: <strong>{token}</strong>.',
      profileRemoved: 'Profil eltávolítva innen: <strong>{token}</strong>.',
      macroInstalled:
        "\'<strong>{name}</strong>\' globális makró létrehozva és látható az összes játékos számára.",
      configUpdated: 'Beállítások frissítve.',
      settingsReset: '<strong>Beállítások visszaállítva gyári alapértékekre.</strong>',
      langSet: 'Nyelv beállítva: {locale}.',
    },
    settings: {
      gridSize: 'Rácsméretek',
      gridSizeDesc: '{size}px per mező',
      moveDistance: 'Mozgási Távolság',
      moveDistanceDesc: '{squares} mező — {pixels}px per mozgás',
      autoFace: 'Automatikus Arcirány Mozgáskor',
      humour: 'Humor (Húsvéti Tojások)',
      language: 'Nyelv',
      on: 'Be',
      off: 'Ki',
    },
    profiles: {
      none: 'Nincsenek konfigurált animált token profilok.',
      noProfile: 'A kiválasztott tokenhez nincs profil hozzárendelve.',
      id: 'Profil azonosító',
      displayName: 'Megjelenített Név',
      mappedStates: 'Leképezett Állapotok',
      noneValue: '(nincs)',
    },
    menu: {
      title: 'A.D.A.M. Vezérlőpult',
      movement: 'Mozgás',
      facing: 'Irány',
      state: 'Állapot',
      stateLabel: 'Állapot',
      facingLabel: 'Irány',
      profileLabel: 'Profil',
      noProfile: 'Nincs profil',
      help: 'Súgó',
      config: 'Beállít',
      states: {
        idle: 'Tétlen',
        combat: 'Harc',
        walk: 'Séta',
        dash: 'Roham',
        sneak: 'Lopakodás',
        rage: 'Düh',
        spellcasting: 'Varázslat',
        help: 'Súgó',
      },
    },
    info: {
      subtitle: 'Animált Irány és Mozgás',
      versionLabel: 'Verzió',
      updatedLabel: 'Frissítve',
      creditsBody:
        'A.D.A.M.<br>Animált Irány és Mozgás<br><br>SIMON által működtetve.<br>Határozottan nem Simon a neve.',
      ready: 'MOD KÉSZ',
    },
  };

  const TRANSLATION$a = {
    titles: {
      error: 'Errore',
      noTokenSelected: 'Nessun Token Selezionato',
      tokenError: 'Errore Token',
      missingDirection: 'Direzione Mancante',
      invalidDirection: 'Direzione Non Valida',
      missingState: 'Stato Mancante',
      invalidState: 'Stato Non Valido',
      missingAction: 'Azione Mancante',
      invalidAction: 'Azione Non Valida',
      accessDenied: 'Accesso Negato',
      invalidValue: 'Valore Non Valido',
      unknownCommand: 'Comando Sconosciuto',
      moveError: 'Errore di Movimento',
      macroExists: 'La Macro Esiste Già',
      macroInstalled: 'Macro Installata',
      invalidUsage: 'Utilizzo Non Valido',
      profileAssigned: 'Profilo Assegnato',
      profileRemoved: 'Profilo Rimosso',
      unknownProfile: 'Profilo Sconosciuto',
      configuration: 'Configurazione',
      settingsReset: 'Impostazioni Ripristinate',
      scriptReady: 'Script Pronto',
      versionInfo: 'Informazioni Versione',
      creditsTitle: 'Crediti',
      adamsMenu: 'Pannello di Controllo A.D.A.M.',
      adamsHelp: 'Guida A.D.A.M.',
      adamsSettings: 'Impostazioni A.D.A.M.',
      profiles: 'Profili Configurati',
      tokenProfile: 'Profilo Token',
      success: 'Operazione Riuscita',
      langSet: 'Lingua Impostata',
      langInvalid: 'Lingua Non Valida',
    },
    errors: {
      noTokenSelected:
        'Nessun token selezionato. Seleziona prima un token, poi fai clic su un pulsante di direzione.',
      noTokenSelectedStill: 'Ancora nessun token selezionato.',
      noTokenSelectedPersistent: 'Ammiro la tua perseveranza. Seleziona prima un token.',
      tokenNotFound: 'Il token selezionato non è stato trovato.',
      missingDirection:
        'Fornisci una direzione. Esempio: <code>!adam --move n</code><br><em>Direzioni: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direzione sconosciuta: <strong>{value}</strong><br><br>Valide: n, ne, e, se, s, sw, w, nw (o nomi completi come north, northeast)',
      missingState: 'Fornisci uno stato.<br>Validi: {states}',
      invalidState: 'Stato sconosciuto: <strong>{value}</strong><br><br>Validi: {states}',
      missingAction: "Fornisci un'azione. Esempi: help, spellcast, rage, dash, sneak, idle, combat",
      invalidAction:
        'Azione sconosciuta: <strong>{value}</strong><br><br>Azioni conosciute: {actions}',
      accessDeniedConfig: 'Le modifiche alla configurazione sono riservate al GM.',
      accessDeniedProfileAssign: "L'assegnazione del profilo è riservata al GM.",
      accessDeniedProfileRemove: 'La rimozione del profilo è riservata al GM.',
      accessDeniedMacro: "L'installazione di macro è riservata al GM.",
      accessDeniedReset: 'Il ripristino delle impostazioni è riservato al GM.',
      unknownCommand:
        'Comando sconosciuto. Prova <code>!adam --help</code> per un elenco dei comandi disponibili.',
      moveFailed: 'Il movimento è fallito.',
      gridSizeInvalid: 'La dimensione della griglia deve essere un intero tra 10 e 1000 (pixel).',
      moveDistanceInvalid: 'La distanza di movimento deve essere un intero tra 1 e 20 (caselle).',
      autoFaceInvalid: 'Il valore di orientamento automatico deve essere: on o off.',
      humourInvalid: 'Il valore umorismo deve essere: on o off.',
      langInvalid: 'Impostazione della lingua non valida. Supportate: {locales}',
      profileUsage:
        'Utilizzo: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Utilizzo: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Il profilo <strong>{id}</strong> non esiste. Usa <code>!adam --profile list</code> per vedere i profili disponibili.',
      profileUnknownSub:
        'Sottocomando profilo sconosciuto: <strong>{sub}</strong><br><br>Validi: list, show, assign, remove',
      macroExists: "Esiste già una macro di nome \'<strong>{name}</strong>\'.",
      simonUnknown:
        'Simon non sa come fare: <em>{command}</em><br><br>Prova: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> ora guarda verso <strong>{direction}</strong>.',
      stateSet: 'Stato di <strong>{token}</strong> impostato su <strong>{state}</strong>.',
      actionSet:
        'Azione di <strong>{token}</strong>: <strong>{action}</strong> → stato: <strong>{state}</strong>.',
      profileAssigned: 'Profilo <strong>{id}</strong> assegnato a <strong>{token}</strong>.',
      profileRemoved: 'Profilo rimosso da <strong>{token}</strong>.',
      macroInstalled:
        "La macro globale \'<strong>{name}</strong>\' è stata creata ed è visibile a tutti i giocatori.",
      configUpdated: 'Impostazioni aggiornate.',
      settingsReset: '<strong>Impostazioni ripristinate ai valori di fabbrica.</strong>',
      langSet: 'Lingua impostata su {locale}.',
    },
    settings: {
      gridSize: 'Dimensione Griglia',
      gridSizeDesc: '{size}px per casella',
      moveDistance: 'Distanza di Movimento',
      moveDistanceDesc: '{squares} casella/e — {pixels}px per movimento',
      autoFace: 'Orientamento Automatico al Movimento',
      humour: 'Umorismo (Uova di Pasqua)',
      language: 'Lingua',
      on: 'Attivo',
      off: 'Inattivo',
    },
    profiles: {
      none: 'Nessun profilo token animato è configurato.',
      noProfile: 'Il token selezionato non ha un profilo assegnato.',
      id: 'ID Profilo',
      displayName: 'Nome Visualizzato',
      mappedStates: 'Stati Mappati',
      noneValue: '(nessuno)',
    },
    menu: {
      title: 'Pannello di Controllo A.D.A.M.',
      movement: 'Movimento',
      facing: 'Orientamento',
      state: 'Stato',
      stateLabel: 'Stato',
      facingLabel: 'Orientamento',
      profileLabel: 'Profilo',
      noProfile: 'Nessun profilo',
      help: 'Guida',
      config: 'Config',
      states: {
        idle: 'Inattivo',
        combat: 'Combattimento',
        walk: 'Camminata',
        dash: 'Scatto',
        sneak: 'Furtività',
        rage: 'Furia',
        spellcasting: 'Incantesimo',
        help: 'Guida',
      },
    },
    info: {
      subtitle: 'Direzione e Movimento Animati',
      versionLabel: 'Versione',
      updatedLabel: 'Aggiornato',
      creditsBody:
        'A.D.A.M.<br>Direzione e Movimento Animati<br><br>Alimentato da SIMON.<br>Che di certo non si chiama Simon.',
      ready: 'MOD PRONTO',
    },
  };

  const TRANSLATION$9 = {
    titles: {
      error: 'エラー',
      noTokenSelected: 'トークン未選択',
      tokenError: 'トークンエラー',
      missingDirection: '方向が指定されていません',
      invalidDirection: '無効な方向',
      missingState: '状態が指定されていません',
      invalidState: '無効な状態',
      missingAction: 'アクションが指定されていません',
      invalidAction: '無効なアクション',
      accessDenied: 'アクセス拒否',
      invalidValue: '無効な値',
      unknownCommand: '不明なコマンド',
      moveError: '移動エラー',
      macroExists: 'マクロは既に存在します',
      macroInstalled: 'マクロがインストールされました',
      invalidUsage: '無効な使用方法',
      profileAssigned: 'プロファイルが割り当てられました',
      profileRemoved: 'プロファイルが削除されました',
      unknownProfile: '不明なプロファイル',
      configuration: '設定',
      settingsReset: '設定がリセットされました',
      scriptReady: 'スクリプト準備完了',
      versionInfo: 'バージョン情報',
      creditsTitle: 'クレジット',
      adamsMenu: 'A.D.A.M. コントロールデッキ',
      adamsHelp: 'A.D.A.M. ヘルプ',
      adamsSettings: 'A.D.A.M. 設定',
      profiles: '設定済みプロファイル',
      tokenProfile: 'トークンプロファイル',
      success: '成功',
      langSet: '言語が設定されました',
      langInvalid: '無効な言語',
    },
    errors: {
      noTokenSelected:
        'トークンが選択されていません。まずトークンを選択してから、方向ボタンをクリックしてください。',
      noTokenSelectedStill: 'まだトークンが選択されていません。',
      noTokenSelectedPersistent: 'その粘り強さには感心します。まずトークンを選択してください。',
      tokenNotFound: '選択したトークンが見つかりませんでした。',
      missingDirection:
        '方向を指定してください。例: <code>!adam --move n</code><br><em>方向: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        '不明な方向: <strong>{value}</strong><br><br>有効: n, ne, e, se, s, sw, w, nw（north、northeastなどのフルネームも可）',
      missingState: '状態を指定してください。<br>有効: {states}',
      invalidState: '不明な状態: <strong>{value}</strong><br><br>有効: {states}',
      missingAction:
        'アクションを指定してください。例: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        '不明なアクション: <strong>{value}</strong><br><br>既知のアクション: {actions}',
      accessDeniedConfig: '設定の変更はGMのみに制限されています。',
      accessDeniedProfileAssign: 'プロファイルの割り当てはGMのみに制限されています。',
      accessDeniedProfileRemove: 'プロファイルの削除はGMのみに制限されています。',
      accessDeniedMacro: 'マクロのインストールはGMのみに制限されています。',
      accessDeniedReset: '設定のリセットはGMのみに制限されています。',
      unknownCommand:
        '不明なコマンドです。利用可能なコマンドの一覧は <code>!adam --help</code> を試してください。',
      moveFailed: '移動に失敗しました。',
      gridSizeInvalid: 'グリッドサイズは10〜1000の整数（ピクセル）で指定してください。',
      moveDistanceInvalid: '移動距離は1〜20の整数（マス）で指定してください。',
      autoFaceInvalid: '自動方向の値は: on または off にしてください。',
      humourInvalid: 'ユーモアの値は: on または off にしてください。',
      langInvalid: '無効な言語設定です。サポート: {locales}',
      profileUsage:
        '使い方: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: '使い方: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'プロファイル <strong>{id}</strong> は存在しません。<code>!adam --profile list</code> で利用可能なプロファイルを確認してください。',
      profileUnknownSub:
        '不明なプロファイルのサブコマンド: <strong>{sub}</strong><br><br>有効: list, show, assign, remove',
      macroExists: "\'<strong>{name}</strong>\' という名前のマクロは既に存在します。",
      simonUnknown:
        'Simonはこの操作の方法を知りません: <em>{command}</em><br><br>試してください: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> は <strong>{direction}</strong> を向いています。',
      stateSet: '<strong>{token}</strong> の状態が <strong>{state}</strong> に設定されました。',
      actionSet:
        '<strong>{token}</strong> のアクション: <strong>{action}</strong> → 状態: <strong>{state}</strong>。',
      profileAssigned:
        'プロファイル <strong>{id}</strong> が <strong>{token}</strong> に割り当てられました。',
      profileRemoved: '<strong>{token}</strong> からプロファイルが削除されました。',
      macroInstalled:
        "グローバルマクロ \'<strong>{name}</strong>\' が作成され、全プレイヤーに表示されます。",
      configUpdated: '設定が更新されました。',
      settingsReset: '<strong>設定が工場出荷時のデフォルトにリセットされました。</strong>',
      langSet: '言語が {locale} に設定されました。',
    },
    settings: {
      gridSize: 'グリッドサイズ',
      gridSizeDesc: '1マス {size}px',
      moveDistance: '移動距離',
      moveDistanceDesc: '{squares} マス — 1回 {pixels}px',
      autoFace: '移動時の自動方向転換',
      humour: 'ユーモア（隠しネタ）',
      language: '言語',
      on: 'オン',
      off: 'オフ',
    },
    profiles: {
      none: 'アニメーションのトークンプロファイルは設定されていません。',
      noProfile: '選択したトークンにはプロファイルが割り当てられていません。',
      id: 'プロファイルID',
      displayName: '表示名',
      mappedStates: 'マッピングされた状態',
      noneValue: '（なし）',
    },
    menu: {
      title: 'A.D.A.M. コントロールデッキ',
      movement: '移動',
      facing: '方向',
      state: '状態',
      stateLabel: '状態',
      facingLabel: '方向',
      profileLabel: 'プロファイル',
      noProfile: 'プロファイルなし',
      help: 'ヘルプ',
      config: '設定',
      states: {
        idle: '待機',
        combat: '戦闘',
        walk: '歩行',
        dash: '走行',
        sneak: '隠密',
        rage: '激怒',
        spellcasting: '詠唱',
        help: 'ヘルプ',
      },
    },
    info: {
      subtitle: 'アニメーション方向と移動',
      versionLabel: 'バージョン',
      updatedLabel: '更新日',
      creditsBody:
        'A.D.A.M.<br>アニメーション方向と移動<br><br>SIMONによって動作。<br>Simonという名前ではありません。',
      ready: 'MOD 準備完了',
    },
  };

  const TRANSLATION$8 = {
    titles: {
      error: '오류',
      noTokenSelected: '토큰이 선택되지 않음',
      tokenError: '토큰 오류',
      missingDirection: '방향 누락',
      invalidDirection: '유효하지 않은 방향',
      missingState: '상태 누락',
      invalidState: '유효하지 않은 상태',
      missingAction: '액션 누락',
      invalidAction: '유효하지 않은 액션',
      accessDenied: '접근 거부',
      invalidValue: '유효하지 않은 값',
      unknownCommand: '알 수 없는 명령어',
      moveError: '이동 오류',
      macroExists: '매크로가 이미 존재함',
      macroInstalled: '매크로 설치됨',
      invalidUsage: '유효하지 않은 사용법',
      profileAssigned: '프로필 지정됨',
      profileRemoved: '프로필 제거됨',
      unknownProfile: '알 수 없는 프로필',
      configuration: '설정',
      settingsReset: '설정 초기화됨',
      scriptReady: '스크립트 준비 완료',
      versionInfo: '버전 정보',
      creditsTitle: '크레딧',
      adamsMenu: 'A.D.A.M. 컨트롤 덱',
      adamsHelp: 'A.D.A.M. 도움말',
      adamsSettings: 'A.D.A.M. 설정',
      profiles: '구성된 프로필',
      tokenProfile: '토큰 프로필',
      success: '성공',
      langSet: '언어 설정됨',
      langInvalid: '유효하지 않은 언어',
    },
    errors: {
      noTokenSelected: '선택된 토큰이 없습니다. 먼저 토큰을 선택한 후 방향 버튼을 클릭하세요.',
      noTokenSelectedStill: '아직 토큰이 선택되지 않았습니다.',
      noTokenSelectedPersistent: '집요함이 인상적입니다. 먼저 토큰을 선택하세요.',
      tokenNotFound: '선택한 토큰을 찾을 수 없습니다.',
      missingDirection:
        '방향을 입력하세요. 예시: <code>!adam --move n</code><br><em>방향: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        '알 수 없는 방향: <strong>{value}</strong><br><br>유효: n, ne, e, se, s, sw, w, nw (또는 north, northeast 같은 전체 이름)',
      missingState: '상태를 입력하세요.<br>유효: {states}',
      invalidState: '알 수 없는 상태: <strong>{value}</strong><br><br>유효: {states}',
      missingAction: '액션을 입력하세요. 예시: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: '알 수 없는 액션: <strong>{value}</strong><br><br>알려진 액션: {actions}',
      accessDeniedConfig: '설정 변경은 GM에게만 허용됩니다.',
      accessDeniedProfileAssign: '프로필 지정은 GM에게만 허용됩니다.',
      accessDeniedProfileRemove: '프로필 제거는 GM에게만 허용됩니다.',
      accessDeniedMacro: '매크로 설치는 GM에게만 허용됩니다.',
      accessDeniedReset: '설정 초기화는 GM에게만 허용됩니다.',
      unknownCommand:
        '알 수 없는 명령어입니다. 사용 가능한 명령어 목록은 <code>!adam --help</code>를 시도하세요.',
      moveFailed: '이동에 실패했습니다.',
      gridSizeInvalid: '그리드 크기는 10에서 1000 사이의 정수(픽셀)여야 합니다.',
      moveDistanceInvalid: '이동 거리는 1에서 20 사이의 정수(칸)여야 합니다.',
      autoFaceInvalid: '자동 방향 값은 on 또는 off여야 합니다.',
      humourInvalid: '유머 값은 on 또는 off여야 합니다.',
      langInvalid: '유효하지 않은 언어 설정입니다. 지원: {locales}',
      profileUsage:
        '사용법: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: '사용법: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        '프로필 <strong>{id}</strong>이(가) 존재하지 않습니다. 사용 가능한 프로필을 보려면 <code>!adam --profile list</code>를 사용하세요.',
      profileUnknownSub:
        '알 수 없는 프로필 하위 명령어: <strong>{sub}</strong><br><br>유효: list, show, assign, remove',
      macroExists: "\'<strong>{name}</strong>\'이라는 이름의 매크로가 이미 존재합니다.",
      simonUnknown:
        'Simon은 이 방법을 모릅니다: <em>{command}</em><br><br>시도해보세요: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong>이(가) 이제 <strong>{direction}</strong>을 향합니다.',
      stateSet: '<strong>{token}</strong> 상태가 <strong>{state}</strong>으로 설정되었습니다.',
      actionSet:
        '<strong>{token}</strong> 액션: <strong>{action}</strong> → 상태: <strong>{state}</strong>.',
      profileAssigned:
        '프로필 <strong>{id}</strong>이(가) <strong>{token}</strong>에 지정되었습니다.',
      profileRemoved: '<strong>{token}</strong>에서 프로필이 제거되었습니다.',
      macroInstalled:
        "전역 매크로 \'<strong>{name}</strong>\'이(가) 생성되어 모든 플레이어에게 표시됩니다.",
      configUpdated: '설정이 업데이트되었습니다.',
      settingsReset: '<strong>설정이 공장 초기값으로 재설정되었습니다.</strong>',
      langSet: '언어가 {locale}(으)로 설정되었습니다.',
    },
    settings: {
      gridSize: '그리드 크기',
      gridSizeDesc: '칸당 {size}px',
      moveDistance: '이동 거리',
      moveDistanceDesc: '{squares} 칸 — 이동당 {pixels}px',
      autoFace: '이동 시 자동 방향 전환',
      humour: '유머 (이스터 에그)',
      language: '언어',
      on: '켜짐',
      off: '꺼짐',
    },
    profiles: {
      none: '구성된 애니메이션 토큰 프로필이 없습니다.',
      noProfile: '선택한 토큰에 지정된 프로필이 없습니다.',
      id: '프로필 ID',
      displayName: '표시 이름',
      mappedStates: '매핑된 상태',
      noneValue: '(없음)',
    },
    menu: {
      title: 'A.D.A.M. 컨트롤 덱',
      movement: '이동',
      facing: '방향',
      state: '상태',
      stateLabel: '상태',
      facingLabel: '방향',
      profileLabel: '프로필',
      noProfile: '프로필 없음',
      help: '도움말',
      config: '설정',
      states: {
        idle: '대기',
        combat: '전투',
        walk: '걷기',
        dash: '질주',
        sneak: '은신',
        rage: '분노',
        spellcasting: '주문 시전',
        help: '도움말',
      },
    },
    info: {
      subtitle: '애니메이션 방향 및 이동',
      versionLabel: '버전',
      updatedLabel: '업데이트',
      creditsBody:
        'A.D.A.M.<br>애니메이션 방향 및 이동<br><br>SIMON에 의해 구동됩니다.<br>Simon이라는 이름이 아닙니다.',
      ready: 'MOD 준비 완료',
    },
  };

  const TRANSLATION$7 = {
    titles: {
      error: 'Błąd',
      noTokenSelected: 'Nie Wybrano Żetonu',
      tokenError: 'Błąd Żetonu',
      missingDirection: 'Brakujący Kierunek',
      invalidDirection: 'Nieprawidłowy Kierunek',
      missingState: 'Brakujący Stan',
      invalidState: 'Nieprawidłowy Stan',
      missingAction: 'Brakująca Akcja',
      invalidAction: 'Nieprawidłowa Akcja',
      accessDenied: 'Dostęp Odmówiony',
      invalidValue: 'Nieprawidłowa Wartość',
      unknownCommand: 'Nieznane Polecenie',
      moveError: 'Błąd Ruchu',
      macroExists: 'Makro Już Istnieje',
      macroInstalled: 'Makro Zainstalowane',
      invalidUsage: 'Nieprawidłowe Użycie',
      profileAssigned: 'Profil Przypisany',
      profileRemoved: 'Profil Usunięty',
      unknownProfile: 'Nieznany Profil',
      configuration: 'Konfiguracja',
      settingsReset: 'Ustawienia Zresetowane',
      scriptReady: 'Skrypt Gotowy',
      versionInfo: 'Informacje o Wersji',
      creditsTitle: 'Podziękowania',
      adamsMenu: 'Panel Sterowania A.D.A.M.',
      adamsHelp: 'Pomoc A.D.A.M.',
      adamsSettings: 'Ustawienia A.D.A.M.',
      profiles: 'Skonfigurowane Profile',
      tokenProfile: 'Profil Żetonu',
      success: 'Sukces',
      langSet: 'Język Ustawiony',
      langInvalid: 'Nieprawidłowy Język',
    },
    errors: {
      noTokenSelected:
        'Nie wybrano żetonu. Wybierz najpierw żeton, a następnie kliknij przycisk kierunku.',
      noTokenSelectedStill: 'Nadal nie wybrano żetonu.',
      noTokenSelectedPersistent: 'Podziwiam Twoją wytrwałość. Wybierz najpierw żeton.',
      tokenNotFound: 'Nie można znaleźć wybranego żetonu.',
      missingDirection:
        'Podaj kierunek. Przykład: <code>!adam --move n</code><br><em>Kierunki: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Nieznany kierunek: <strong>{value}</strong><br><br>Prawidłowe: n, ne, e, se, s, sw, w, nw (lub pełne nazwy jak north, northeast)',
      missingState: 'Podaj stan.<br>Prawidłowe: {states}',
      invalidState: 'Nieznany stan: <strong>{value}</strong><br><br>Prawidłowe: {states}',
      missingAction: 'Podaj akcję. Przykłady: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Nieznana akcja: <strong>{value}</strong><br><br>Znane akcje: {actions}',
      accessDeniedConfig: 'Zmiany konfiguracji są zarezerwowane dla GM.',
      accessDeniedProfileAssign: 'Przypisanie profilu jest zarezerwowane dla GM.',
      accessDeniedProfileRemove: 'Usunięcie profilu jest zarezerwowane dla GM.',
      accessDeniedMacro: 'Instalacja makra jest zarezerwowana dla GM.',
      accessDeniedReset: 'Resetowanie ustawień jest zarezerwowane dla GM.',
      unknownCommand:
        'Nieznane polecenie. Spróbuj <code>!adam --help</code>, aby zobaczyć listę dostępnych poleceń.',
      moveFailed: 'Ruch nie powiódł się.',
      gridSizeInvalid: 'Rozmiar siatki musi być liczbą całkowitą od 10 do 1000 (piksele).',
      moveDistanceInvalid: 'Odległość ruchu musi być liczbą całkowitą od 1 do 20 (pola).',
      autoFaceInvalid: 'Wartość automatycznego obrotu musi być: on lub off.',
      humourInvalid: 'Wartość humoru musi być: on lub off.',
      langInvalid: 'Nieprawidłowe ustawienie języka. Obsługiwane: {locales}',
      profileUsage:
        'Użycie: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Użycie: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profil <strong>{id}</strong> nie istnieje. Użyj <code>!adam --profile list</code>, aby zobaczyć dostępne profile.',
      profileUnknownSub:
        'Nieznane podpolecenie profilu: <strong>{sub}</strong><br><br>Prawidłowe: list, show, assign, remove',
      macroExists: "Makro o nazwie \'<strong>{name}</strong>\' już istnieje.",
      simonUnknown:
        'Simon nie wie jak to zrobić: <em>{command}</em><br><br>Spróbuj: <code>!simon says move n</code>',
    },
    confirm: {
      facing:
        '<strong>{token}</strong> teraz jest zwrócony w kierunku <strong>{direction}</strong>.',
      stateSet: 'Stan <strong>{token}</strong> ustawiony na <strong>{state}</strong>.',
      actionSet:
        'Akcja <strong>{token}</strong>: <strong>{action}</strong> → stan: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> przypisany do <strong>{token}</strong>.',
      profileRemoved: 'Profil usunięty z <strong>{token}</strong>.',
      macroInstalled:
        "Globalne makro \'<strong>{name}</strong>\' zostało utworzone i jest widoczne dla wszystkich graczy.",
      configUpdated: 'Ustawienia zaktualizowane.',
      settingsReset: '<strong>Ustawienia zresetowane do wartości fabrycznych.</strong>',
      langSet: 'Język ustawiony na {locale}.',
    },
    settings: {
      gridSize: 'Rozmiar Siatki',
      gridSizeDesc: '{size}px na pole',
      moveDistance: 'Odległość Ruchu',
      moveDistanceDesc: '{squares} pole/pola — {pixels}px na ruch',
      autoFace: 'Automatyczny Obrót przy Ruchu',
      humour: 'Humor (Jajka Wielkanocne)',
      language: 'Język',
      on: 'Włączone',
      off: 'Wyłączone',
    },
    profiles: {
      none: 'Nie skonfigurowano żadnych profili animowanych żetonów.',
      noProfile: 'Wybrany żeton nie ma przypisanego profilu.',
      id: 'ID Profilu',
      displayName: 'Wyświetlana Nazwa',
      mappedStates: 'Przypisane Stany',
      noneValue: '(brak)',
    },
    menu: {
      title: 'Panel Sterowania A.D.A.M.',
      movement: 'Ruch',
      facing: 'Kierunek',
      state: 'Stan',
      stateLabel: 'Stan',
      facingLabel: 'Kierunek',
      profileLabel: 'Profil',
      noProfile: 'Brak profilu',
      help: 'Pomoc',
      config: 'Ustawienia',
      states: {
        idle: 'Bezczynny',
        combat: 'Walka',
        walk: 'Chód',
        dash: 'Sprint',
        sneak: 'Skradanie',
        rage: 'Szał',
        spellcasting: 'Zaklęcie',
        help: 'Pomoc',
      },
    },
    info: {
      subtitle: 'Animowany Kierunek i Ruch',
      versionLabel: 'Wersja',
      updatedLabel: 'Zaktualizowano',
      creditsBody:
        'A.D.A.M.<br>Animowany Kierunek i Ruch<br><br>Napędzany przez SIMONA.<br>Na pewno nie nazywa się Simon.',
      ready: 'MOD GOTOWY',
    },
  };

  const TRANSLATION$6 = {
    titles: {
      error: 'Erro',
      noTokenSelected: 'Nenhum Token Selecionado',
      tokenError: 'Erro de Token',
      missingDirection: 'Direção em Falta',
      invalidDirection: 'Direção Inválida',
      missingState: 'Estado em Falta',
      invalidState: 'Estado Inválido',
      missingAction: 'Ação em Falta',
      invalidAction: 'Ação Inválida',
      accessDenied: 'Acesso Negado',
      invalidValue: 'Valor Inválido',
      unknownCommand: 'Comando Desconhecido',
      moveError: 'Erro de Movimento',
      macroExists: 'A Macro Já Existe',
      macroInstalled: 'Macro Instalada',
      invalidUsage: 'Utilização Inválida',
      profileAssigned: 'Perfil Atribuído',
      profileRemoved: 'Perfil Removido',
      unknownProfile: 'Perfil Desconhecido',
      configuration: 'Configuração',
      settingsReset: 'Definições Reposta',
      scriptReady: 'Script Pronto',
      versionInfo: 'Informações de Versão',
      creditsTitle: 'Créditos',
      adamsMenu: 'Painel de Controlo A.D.A.M.',
      adamsHelp: 'Ajuda A.D.A.M.',
      adamsSettings: 'Definições A.D.A.M.',
      profiles: 'Perfis Configurados',
      tokenProfile: 'Perfil do Token',
      success: 'Sucesso',
      langSet: 'Idioma Definido',
      langInvalid: 'Idioma Inválido',
    },
    errors: {
      noTokenSelected:
        'Nenhum token selecionado. Selecione primeiro um token e depois clique num botão de direção.',
      noTokenSelectedStill: 'Ainda nenhum token selecionado.',
      noTokenSelectedPersistent: 'Admiro a sua persistência. Selecione primeiro um token.',
      tokenNotFound: 'O token selecionado não foi encontrado.',
      missingDirection:
        'Por favor, indique uma direção. Exemplo: <code>!adam --move n</code><br><em>Direções: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direção desconhecida: <strong>{value}</strong><br><br>Válidas: n, ne, e, se, s, sw, w, nw (ou nomes completos como north, northeast)',
      missingState: 'Por favor, indique um estado.<br>Válidos: {states}',
      invalidState: 'Estado desconhecido: <strong>{value}</strong><br><br>Válidos: {states}',
      missingAction:
        'Por favor, indique uma ação. Exemplos: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Ação desconhecida: <strong>{value}</strong><br><br>Ações conhecidas: {actions}',
      accessDeniedConfig: 'As alterações de configuração estão restritas ao GM.',
      accessDeniedProfileAssign: 'A atribuição de perfil está restrita ao GM.',
      accessDeniedProfileRemove: 'A remoção de perfil está restrita ao GM.',
      accessDeniedMacro: 'A instalação de macros está restrita ao GM.',
      accessDeniedReset: 'O reposicionamento das definições está restrito ao GM.',
      unknownCommand:
        'Comando desconhecido. Tente <code>!adam --help</code> para uma lista de comandos disponíveis.',
      moveFailed: 'O movimento falhou.',
      gridSizeInvalid: 'O tamanho da grelha tem de ser um número inteiro entre 10 e 1000 (píxeis).',
      moveDistanceInvalid:
        'A distância de movimento tem de ser um número inteiro entre 1 e 20 (casas).',
      autoFaceInvalid: 'O valor de orientação automática tem de ser: on ou off.',
      humourInvalid: 'O valor de humor tem de ser: on ou off.',
      langInvalid: 'Definição de idioma inválida. Suportados: {locales}',
      profileUsage:
        'Utilização: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Utilização: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'O perfil <strong>{id}</strong> não existe. Utilize <code>!adam --profile list</code> para ver os perfis disponíveis.',
      profileUnknownSub:
        'Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válidos: list, show, assign, remove',
      macroExists: "Já existe uma macro com o nome \'<strong>{name}</strong>\'.",
      simonUnknown:
        'Simon não sabe como fazer: <em>{command}</em><br><br>Tente: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> está agora voltado para <strong>{direction}</strong>.',
      stateSet: 'Estado de <strong>{token}</strong> definido como <strong>{state}</strong>.',
      actionSet:
        'Ação de <strong>{token}</strong>: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> atribuído a <strong>{token}</strong>.',
      profileRemoved: 'Perfil removido de <strong>{token}</strong>.',
      macroInstalled:
        "A macro global \'<strong>{name}</strong>\' foi criada e é visível para todos os jogadores.",
      configUpdated: 'Definições atualizadas.',
      settingsReset: '<strong>Definições repostas para os valores de fábrica.</strong>',
      langSet: 'Idioma definido como {locale}.',
    },
    settings: {
      gridSize: 'Tamanho da Grelha',
      gridSizeDesc: '{size}px por casa',
      moveDistance: 'Distância de Movimento',
      moveDistanceDesc: '{squares} casa(s) — {pixels}px por movimento',
      autoFace: 'Orientação Automática no Movimento',
      humour: 'Humor (Ovos de Páscoa)',
      language: 'Idioma',
      on: 'Ligado',
      off: 'Desligado',
    },
    profiles: {
      none: 'Não existem perfis de token animado configurados.',
      noProfile: 'O token selecionado não tem perfil atribuído.',
      id: 'ID do Perfil',
      displayName: 'Nome de Exibição',
      mappedStates: 'Estados Mapeados',
      noneValue: '(nenhum)',
    },
    menu: {
      title: 'Painel de Controlo A.D.A.M.',
      movement: 'Movimento',
      facing: 'Orientação',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Orientação',
      profileLabel: 'Perfil',
      noProfile: 'Sem perfil',
      help: 'Ajuda',
      config: 'Config',
      states: {
        idle: 'Inativo',
        combat: 'Combate',
        walk: 'Andar',
        dash: 'Corrida',
        sneak: 'Furtividade',
        rage: 'Fúria',
        spellcasting: 'Feitiço',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Direção e Movimento Animados',
      versionLabel: 'Versão',
      updatedLabel: 'Atualizado',
      creditsBody:
        'A.D.A.M.<br>Direção e Movimento Animados<br><br>Alimentado por SIMON.<br>Definitivamente não se chama Simon.',
      ready: 'MOD PRONTO',
    },
  };

  const TRANSLATION$5 = {
    titles: {
      error: 'Erro',
      noTokenSelected: 'Nenhum Token Selecionado',
      tokenError: 'Erro de Token',
      missingDirection: 'Direção Ausente',
      invalidDirection: 'Direção Inválida',
      missingState: 'Estado Ausente',
      invalidState: 'Estado Inválido',
      missingAction: 'Ação Ausente',
      invalidAction: 'Ação Inválida',
      accessDenied: 'Acesso Negado',
      invalidValue: 'Valor Inválido',
      unknownCommand: 'Comando Desconhecido',
      moveError: 'Erro de Movimento',
      macroExists: 'A Macro Já Existe',
      macroInstalled: 'Macro Instalada',
      invalidUsage: 'Uso Inválido',
      profileAssigned: 'Perfil Atribuído',
      profileRemoved: 'Perfil Removido',
      unknownProfile: 'Perfil Desconhecido',
      configuration: 'Configuração',
      settingsReset: 'Configurações Redefinidas',
      scriptReady: 'Script Pronto',
      versionInfo: 'Informações de Versão',
      creditsTitle: 'Créditos',
      adamsMenu: 'Painel de Controle A.D.A.M.',
      adamsHelp: 'Ajuda A.D.A.M.',
      adamsSettings: 'Configurações A.D.A.M.',
      profiles: 'Perfis Configurados',
      tokenProfile: 'Perfil do Token',
      success: 'Sucesso',
      langSet: 'Idioma Definido',
      langInvalid: 'Idioma Inválido',
    },
    errors: {
      noTokenSelected:
        'Nenhum token selecionado. Selecione primeiro um token e depois clique em um botão de direção.',
      noTokenSelectedStill: 'Ainda nenhum token selecionado.',
      noTokenSelectedPersistent: 'Admiro sua persistência. Selecione primeiro um token.',
      tokenNotFound: 'O token selecionado não foi encontrado.',
      missingDirection:
        'Forneça uma direção. Exemplo: <code>!adam --move n</code><br><em>Direções: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Direção desconhecida: <strong>{value}</strong><br><br>Válidas: n, ne, e, se, s, sw, w, nw (ou nomes completos como north, northeast)',
      missingState: 'Forneça um estado.<br>Válidos: {states}',
      invalidState: 'Estado desconhecido: <strong>{value}</strong><br><br>Válidos: {states}',
      missingAction: 'Forneça uma ação. Exemplos: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Ação desconhecida: <strong>{value}</strong><br><br>Ações conhecidas: {actions}',
      accessDeniedConfig: 'Alterações de configuração são restritas ao GM.',
      accessDeniedProfileAssign: 'A atribuição de perfil é restrita ao GM.',
      accessDeniedProfileRemove: 'A remoção de perfil é restrita ao GM.',
      accessDeniedMacro: 'A instalação de macros é restrita ao GM.',
      accessDeniedReset: 'A redefinição de configurações é restrita ao GM.',
      unknownCommand:
        'Comando desconhecido. Tente <code>!adam --help</code> para uma lista de comandos disponíveis.',
      moveFailed: 'O movimento falhou.',
      gridSizeInvalid: 'O tamanho da grade deve ser um número inteiro entre 10 e 1000 (pixels).',
      moveDistanceInvalid:
        'A distância de movimento deve ser um número inteiro entre 1 e 20 (quadrados).',
      autoFaceInvalid: 'O valor de orientação automática deve ser: on ou off.',
      humourInvalid: 'O valor de humor deve ser: on ou off.',
      langInvalid: 'Configuração de idioma inválida. Suportados: {locales}',
      profileUsage: 'Uso: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Uso: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'O perfil <strong>{id}</strong> não existe. Use <code>!adam --profile list</code> para ver os perfis disponíveis.',
      profileUnknownSub:
        'Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válidos: list, show, assign, remove',
      macroExists: "Já existe uma macro com o nome \'<strong>{name}</strong>\'.",
      simonUnknown:
        'Simon não sabe como fazer: <em>{command}</em><br><br>Tente: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> agora está voltado para <strong>{direction}</strong>.',
      stateSet: 'Estado de <strong>{token}</strong> definido como <strong>{state}</strong>.',
      actionSet:
        'Ação de <strong>{token}</strong>: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> atribuído a <strong>{token}</strong>.',
      profileRemoved: 'Perfil removido de <strong>{token}</strong>.',
      macroInstalled:
        "A macro global \'<strong>{name}</strong>\' foi criada e está visível para todos os jogadores.",
      configUpdated: 'Configurações atualizadas.',
      settingsReset: '<strong>Configurações redefinidas para os padrões de fábrica.</strong>',
      langSet: 'Idioma definido como {locale}.',
    },
    settings: {
      gridSize: 'Tamanho da Grade',
      gridSizeDesc: '{size}px por quadrado',
      moveDistance: 'Distância de Movimento',
      moveDistanceDesc: '{squares} quadrado(s) — {pixels}px por movimento',
      autoFace: 'Orientação Automática no Movimento',
      humour: 'Humor (Easter Eggs)',
      language: 'Idioma',
      on: 'Ligado',
      off: 'Desligado',
    },
    profiles: {
      none: 'Nenhum perfil de token animado está configurado.',
      noProfile: 'O token selecionado não tem perfil atribuído.',
      id: 'ID do Perfil',
      displayName: 'Nome de Exibição',
      mappedStates: 'Estados Mapeados',
      noneValue: '(nenhum)',
    },
    menu: {
      title: 'Painel de Controle A.D.A.M.',
      movement: 'Movimento',
      facing: 'Orientação',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Orientação',
      profileLabel: 'Perfil',
      noProfile: 'Sem perfil',
      help: 'Ajuda',
      config: 'Config',
      states: {
        idle: 'Parado',
        combat: 'Combate',
        walk: 'Andar',
        dash: 'Correr',
        sneak: 'Furtividade',
        rage: 'Fúria',
        spellcasting: 'Magia',
        help: 'Ajuda',
      },
    },
    info: {
      subtitle: 'Direção e Movimento Animados',
      versionLabel: 'Versão',
      updatedLabel: 'Atualizado',
      creditsBody:
        'A.D.A.M.<br>Direção e Movimento Animados<br><br>Alimentado por SIMON.<br>Definitivamente não se chama Simon.',
      ready: 'MOD PRONTO',
    },
  };

  const TRANSLATION$4 = {
    titles: {
      error: 'Ошибка',
      noTokenSelected: 'Жетон Не Выбран',
      tokenError: 'Ошибка Жетона',
      missingDirection: 'Отсутствует Направление',
      invalidDirection: 'Неверное Направление',
      missingState: 'Отсутствует Состояние',
      invalidState: 'Неверное Состояние',
      missingAction: 'Отсутствует Действие',
      invalidAction: 'Неверное Действие',
      accessDenied: 'Доступ Запрещён',
      invalidValue: 'Неверное Значение',
      unknownCommand: 'Неизвестная Команда',
      moveError: 'Ошибка Движения',
      macroExists: 'Макрос Уже Существует',
      macroInstalled: 'Макрос Установлен',
      invalidUsage: 'Неверное Использование',
      profileAssigned: 'Профиль Назначен',
      profileRemoved: 'Профиль Удалён',
      unknownProfile: 'Неизвестный Профиль',
      configuration: 'Конфигурация',
      settingsReset: 'Настройки Сброшены',
      scriptReady: 'Скрипт Готов',
      versionInfo: 'Информация о Версии',
      creditsTitle: 'Авторы',
      adamsMenu: 'Панель Управления A.D.A.M.',
      adamsHelp: 'Справка A.D.A.M.',
      adamsSettings: 'Настройки A.D.A.M.',
      profiles: 'Настроенные Профили',
      tokenProfile: 'Профиль Жетона',
      success: 'Успех',
      langSet: 'Язык Установлен',
      langInvalid: 'Неверный Язык',
    },
    errors: {
      noTokenSelected: 'Жетон не выбран. Выберите жетон, а затем нажмите кнопку направления.',
      noTokenSelectedStill: 'Жетон по-прежнему не выбран.',
      noTokenSelectedPersistent: 'Восхищаюсь вашей настойчивостью. Сначала выберите жетон.',
      tokenNotFound: 'Выбранный жетон не найден.',
      missingDirection:
        'Укажите направление. Пример: <code>!adam --move n</code><br><em>Направления: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Неизвестное направление: <strong>{value}</strong><br><br>Допустимые: n, ne, e, se, s, sw, w, nw (или полные названия, например north, northeast)',
      missingState: 'Укажите состояние.<br>Допустимые: {states}',
      invalidState: 'Неизвестное состояние: <strong>{value}</strong><br><br>Допустимые: {states}',
      missingAction: 'Укажите действие. Примеры: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Неизвестное действие: <strong>{value}</strong><br><br>Известные действия: {actions}',
      accessDeniedConfig: 'Изменение конфигурации доступно только Мастеру.',
      accessDeniedProfileAssign: 'Назначение профиля доступно только Мастеру.',
      accessDeniedProfileRemove: 'Удаление профиля доступно только Мастеру.',
      accessDeniedMacro: 'Установка макроса доступна только Мастеру.',
      accessDeniedReset: 'Сброс настроек доступен только Мастеру.',
      unknownCommand:
        'Неизвестная команда. Попробуйте <code>!adam --help</code> для просмотра списка доступных команд.',
      moveFailed: 'Движение не удалось.',
      gridSizeInvalid: 'Размер сетки должен быть целым числом от 10 до 1000 (пиксели).',
      moveDistanceInvalid: 'Дистанция движения должна быть целым числом от 1 до 20 (клетки).',
      autoFaceInvalid: 'Значение автоповорота должно быть: on или off.',
      humourInvalid: 'Значение юмора должно быть: on или off.',
      langInvalid: 'Неверная настройка языка. Поддерживаемые: {locales}',
      profileUsage:
        'Использование: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Использование: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Профиль <strong>{id}</strong> не существует. Используйте <code>!adam --profile list</code>, чтобы увидеть доступные профили.',
      profileUnknownSub:
        'Неизвестная подкоманда профиля: <strong>{sub}</strong><br><br>Допустимые: list, show, assign, remove',
      macroExists: "Макрос с именем \'<strong>{name}</strong>\' уже существует.",
      simonUnknown:
        'Simon не знает как выполнить: <em>{command}</em><br><br>Попробуйте: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> теперь смотрит в направлении <strong>{direction}</strong>.',
      stateSet: 'Состояние <strong>{token}</strong> установлено на <strong>{state}</strong>.',
      actionSet:
        'Действие <strong>{token}</strong>: <strong>{action}</strong> → состояние: <strong>{state}</strong>.',
      profileAssigned: 'Профиль <strong>{id}</strong> назначен <strong>{token}</strong>.',
      profileRemoved: 'Профиль удалён у <strong>{token}</strong>.',
      macroInstalled: "Глобальный макрос \'<strong>{name}</strong>\' создан и виден всем игрокам.",
      configUpdated: 'Настройки обновлены.',
      settingsReset: '<strong>Настройки сброшены до заводских значений.</strong>',
      langSet: 'Язык установлен на {locale}.',
    },
    settings: {
      gridSize: 'Размер Сетки',
      gridSizeDesc: '{size}px на клетку',
      moveDistance: 'Дистанция Движения',
      moveDistanceDesc: '{squares} клетка/клеток — {pixels}px за движение',
      autoFace: 'Автоповорот при Движении',
      humour: 'Юмор (Пасхальные Яйца)',
      language: 'Язык',
      on: 'Вкл',
      off: 'Выкл',
    },
    profiles: {
      none: 'Профили анимированных жетонов не настроены.',
      noProfile: 'У выбранного жетона нет назначенного профиля.',
      id: 'ID Профиля',
      displayName: 'Отображаемое Имя',
      mappedStates: 'Назначенные Состояния',
      noneValue: '(нет)',
    },
    menu: {
      title: 'Панель Управления A.D.A.M.',
      movement: 'Движение',
      facing: 'Направление',
      state: 'Состояние',
      stateLabel: 'Состояние',
      facingLabel: 'Направление',
      profileLabel: 'Профиль',
      noProfile: 'Нет профиля',
      help: 'Справка',
      config: 'Настройки',
      states: {
        idle: 'Бездействие',
        combat: 'Бой',
        walk: 'Ходьба',
        dash: 'Рывок',
        sneak: 'Скрытность',
        rage: 'Ярость',
        spellcasting: 'Заклинание',
        help: 'Справка',
      },
    },
    info: {
      subtitle: 'Анимированное Направление и Движение',
      versionLabel: 'Версия',
      updatedLabel: 'Обновлено',
      creditsBody:
        'A.D.A.M.<br>Анимированное Направление и Движение<br><br>Работает на SIMON.<br>Его точно не зовут Саймон.',
      ready: 'МОД ГОТОВ',
    },
  };

  const TRANSLATION$3 = {
    titles: {
      error: 'Error',
      noTokenSelected: 'Ningún Token Seleccionado',
      tokenError: 'Error de Token',
      missingDirection: 'Dirección Faltante',
      invalidDirection: 'Dirección Inválida',
      missingState: 'Estado Faltante',
      invalidState: 'Estado Inválido',
      missingAction: 'Acción Faltante',
      invalidAction: 'Acción Inválida',
      accessDenied: 'Acceso Denegado',
      invalidValue: 'Valor Inválido',
      unknownCommand: 'Comando Desconocido',
      moveError: 'Error de Movimiento',
      macroExists: 'La Macro Ya Existe',
      macroInstalled: 'Macro Instalada',
      invalidUsage: 'Uso Inválido',
      profileAssigned: 'Perfil Asignado',
      profileRemoved: 'Perfil Eliminado',
      unknownProfile: 'Perfil Desconocido',
      configuration: 'Configuración',
      settingsReset: 'Configuración Restablecida',
      scriptReady: 'Script Listo',
      versionInfo: 'Información de Versión',
      creditsTitle: 'Créditos',
      adamsMenu: 'Panel de Control A.D.A.M.',
      adamsHelp: 'Ayuda A.D.A.M.',
      adamsSettings: 'Configuración A.D.A.M.',
      profiles: 'Perfiles Configurados',
      tokenProfile: 'Perfil del Token',
      success: 'Éxito',
      langSet: 'Idioma Establecido',
      langInvalid: 'Idioma Inválido',
    },
    errors: {
      noTokenSelected:
        'Ningún token seleccionado. Seleccione primero un token y luego haga clic en un botón de dirección.',
      noTokenSelectedStill: 'Todavía ningún token seleccionado.',
      noTokenSelectedPersistent: 'Admiro su persistencia. Seleccione primero un token.',
      tokenNotFound: 'No se pudo encontrar el token seleccionado.',
      missingDirection:
        'Proporcione una dirección. Ejemplo: <code>!adam --move n</code><br><em>Direcciones: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Dirección desconocida: <strong>{value}</strong><br><br>Válidas: n, ne, e, se, s, sw, w, nw (o nombres completos como north, northeast)',
      missingState: 'Proporcione un estado.<br>Válidos: {states}',
      invalidState: 'Estado desconocido: <strong>{value}</strong><br><br>Válidos: {states}',
      missingAction:
        'Proporcione una acción. Ejemplos: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Acción desconocida: <strong>{value}</strong><br><br>Acciones conocidas: {actions}',
      accessDeniedConfig: 'Los cambios de configuración están restringidos al GM.',
      accessDeniedProfileAssign: 'La asignación de perfiles está restringida al GM.',
      accessDeniedProfileRemove: 'La eliminación de perfiles está restringida al GM.',
      accessDeniedMacro: 'La instalación de macros está restringida al GM.',
      accessDeniedReset: 'El restablecimiento de configuración está restringido al GM.',
      unknownCommand:
        'Comando desconocido. Pruebe <code>!adam --help</code> para obtener una lista de comandos disponibles.',
      moveFailed: 'El movimiento falló.',
      gridSizeInvalid: 'El tamaño de la cuadrícula debe ser un entero entre 10 y 1000 (píxeles).',
      moveDistanceInvalid: 'La distancia de movimiento debe ser un entero entre 1 y 20 (casillas).',
      autoFaceInvalid: 'El valor de orientación automática debe ser: on u off.',
      humourInvalid: 'El valor de humor debe ser: on u off.',
      langInvalid: 'Configuración de idioma inválida. Compatible: {locales}',
      profileUsage: 'Uso: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Uso: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'El perfil <strong>{id}</strong> no existe. Use <code>!adam --profile list</code> para ver los perfiles disponibles.',
      profileUnknownSub:
        'Subcomando de perfil desconocido: <strong>{sub}</strong><br><br>Válidos: list, show, assign, remove',
      macroExists: "Ya existe una macro con el nombre \'<strong>{name}</strong>\'.",
      simonUnknown:
        'Simon no sabe cómo hacer: <em>{command}</em><br><br>Pruebe: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> ahora mira hacia <strong>{direction}</strong>.',
      stateSet: 'Estado de <strong>{token}</strong> establecido en <strong>{state}</strong>.',
      actionSet:
        'Acción de <strong>{token}</strong>: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
      profileAssigned: 'Perfil <strong>{id}</strong> asignado a <strong>{token}</strong>.',
      profileRemoved: 'Perfil eliminado de <strong>{token}</strong>.',
      macroInstalled:
        "La macro global \'<strong>{name}</strong>\' ha sido creada y es visible para todos los jugadores.",
      configUpdated: 'Configuración actualizada.',
      settingsReset: '<strong>Configuración restablecida a los valores de fábrica.</strong>',
      langSet: 'Idioma establecido en {locale}.',
    },
    settings: {
      gridSize: 'Tamaño de Cuadrícula',
      gridSizeDesc: '{size}px por casilla',
      moveDistance: 'Distancia de Movimiento',
      moveDistanceDesc: '{squares} casilla(s) — {pixels}px por movimiento',
      autoFace: 'Orientación Automática al Mover',
      humour: 'Humor (Huevos de Pascua)',
      language: 'Idioma',
      on: 'Activado',
      off: 'Desactivado',
    },
    profiles: {
      none: 'No hay perfiles de token animado configurados.',
      noProfile: 'El token seleccionado no tiene perfil asignado.',
      id: 'ID de Perfil',
      displayName: 'Nombre Visible',
      mappedStates: 'Estados Asignados',
      noneValue: '(ninguno)',
    },
    menu: {
      title: 'Panel de Control A.D.A.M.',
      movement: 'Movimiento',
      facing: 'Orientación',
      state: 'Estado',
      stateLabel: 'Estado',
      facingLabel: 'Orientación',
      profileLabel: 'Perfil',
      noProfile: 'Sin perfil',
      help: 'Ayuda',
      config: 'Config',
      states: {
        idle: 'Inactivo',
        combat: 'Combate',
        walk: 'Caminar',
        dash: 'Correr',
        sneak: 'Sigilo',
        rage: 'Rabia',
        spellcasting: 'Conjuro',
        help: 'Ayuda',
      },
    },
    info: {
      subtitle: 'Dirección y Movimiento Animados',
      versionLabel: 'Versión',
      updatedLabel: 'Actualizado',
      creditsBody:
        'A.D.A.M.<br>Dirección y Movimiento Animados<br><br>Impulsado por SIMON.<br>Definitivamente no se llama Simon.',
      ready: 'MOD LISTO',
    },
  };

  const TRANSLATION$2 = {
    titles: {
      error: 'Fel',
      noTokenSelected: 'Ingen Bricka Vald',
      tokenError: 'Brickfel',
      missingDirection: 'Saknar Riktning',
      invalidDirection: 'Ogiltig Riktning',
      missingState: 'Saknar Tillstånd',
      invalidState: 'Ogiltigt Tillstånd',
      missingAction: 'Saknar Handling',
      invalidAction: 'Ogiltig Handling',
      accessDenied: 'Åtkomst Nekad',
      invalidValue: 'Ogiltigt Värde',
      unknownCommand: 'Okänt Kommando',
      moveError: 'Rörelsefel',
      macroExists: 'Makrot Finns Redan',
      macroInstalled: 'Makro Installerat',
      invalidUsage: 'Ogiltig Användning',
      profileAssigned: 'Profil Tilldelad',
      profileRemoved: 'Profil Borttagen',
      unknownProfile: 'Okänd Profil',
      configuration: 'Konfiguration',
      settingsReset: 'Inställningar Återställda',
      scriptReady: 'Skript Klart',
      versionInfo: 'Versionsinformation',
      creditsTitle: 'Tack Till',
      adamsMenu: 'A.D.A.M. Kontrollpanel',
      adamsHelp: 'A.D.A.M. Hjälp',
      adamsSettings: 'A.D.A.M. Inställningar',
      profiles: 'Konfigurerade Profiler',
      tokenProfile: 'Brickprofil',
      success: 'Lyckades',
      langSet: 'Språk Inställt',
      langInvalid: 'Ogiltigt Språk',
    },
    errors: {
      noTokenSelected:
        'Ingen bricka vald. Välj först en bricka och klicka sedan på en riktningsknapp.',
      noTokenSelectedStill: 'Fortfarande ingen bricka vald.',
      noTokenSelectedPersistent: 'Jag beundrar din envishet. Välj en bricka först.',
      tokenNotFound: 'Den valda brickan kunde inte hittas.',
      missingDirection:
        'Ange en riktning. Exempel: <code>!adam --move n</code><br><em>Riktningar: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Okänd riktning: <strong>{value}</strong><br><br>Giltiga: n, ne, e, se, s, sw, w, nw (eller fullständiga namn som north, northeast)',
      missingState: 'Ange ett tillstånd.<br>Giltiga: {states}',
      invalidState: 'Okänt tillstånd: <strong>{value}</strong><br><br>Giltiga: {states}',
      missingAction: 'Ange en handling. Exempel: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Okänd handling: <strong>{value}</strong><br><br>Kända handlingar: {actions}',
      accessDeniedConfig: 'Konfigurationsändringar är begränsade till GM.',
      accessDeniedProfileAssign: 'Profiltilldelning är begränsad till GM.',
      accessDeniedProfileRemove: 'Borttagning av profil är begränsad till GM.',
      accessDeniedMacro: 'Makroinstallation är begränsad till GM.',
      accessDeniedReset: 'Återställning av inställningar är begränsad till GM.',
      unknownCommand:
        'Okänt kommando. Prova <code>!adam --help</code> för en lista över tillgängliga kommandon.',
      moveFailed: 'Rörelsen misslyckades.',
      gridSizeInvalid: 'Rutnätsstorleken måste vara ett heltal mellan 10 och 1000 (pixlar).',
      moveDistanceInvalid: 'Rörelseavståndet måste vara ett heltal mellan 1 och 20 (rutor).',
      autoFaceInvalid: 'Värdet för automatisk riktning måste vara: on eller off.',
      humourInvalid: 'Humörvärdet måste vara: on eller off.',
      langInvalid: 'Ogiltig språkinställning. Stöds: {locales}',
      profileUsage:
        'Användning: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Användning: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Profilen <strong>{id}</strong> finns inte. Använd <code>!adam --profile list</code> för att se tillgängliga profiler.',
      profileUnknownSub:
        'Okänt underkommando för profil: <strong>{sub}</strong><br><br>Giltiga: list, show, assign, remove',
      macroExists: "Ett makro med namnet \'<strong>{name}</strong>\' finns redan.",
      simonUnknown:
        'Simon vet inte hur man gör: <em>{command}</em><br><br>Prova: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> vänder sig nu mot <strong>{direction}</strong>.',
      stateSet: '<strong>{token}</strong>s tillstånd satt till <strong>{state}</strong>.',
      actionSet:
        '<strong>{token}</strong>s handling: <strong>{action}</strong> → tillstånd: <strong>{state}</strong>.',
      profileAssigned: 'Profil <strong>{id}</strong> tilldelad till <strong>{token}</strong>.',
      profileRemoved: 'Profil borttagen från <strong>{token}</strong>.',
      macroInstalled:
        "Globalt makro \'<strong>{name}</strong>\' har skapats och är synligt för alla spelare.",
      configUpdated: 'Inställningar uppdaterade.',
      settingsReset: '<strong>Inställningar återställda till fabriksinställningar.</strong>',
      langSet: 'Språk inställt till {locale}.',
    },
    settings: {
      gridSize: 'Rutnätsstorlek',
      gridSizeDesc: '{size}px per ruta',
      moveDistance: 'Rörelseavstånd',
      moveDistanceDesc: '{squares} ruta/rutor — {pixels}px per rörelse',
      autoFace: 'Automatisk Riktning vid Rörelse',
      humour: 'Humor (Påskägg)',
      language: 'Språk',
      on: 'På',
      off: 'Av',
    },
    profiles: {
      none: 'Inga animerade brickprofiler är konfigurerade.',
      noProfile: 'Den valda brickan har ingen profil tilldelad.',
      id: 'Profil-ID',
      displayName: 'Visningsnamn',
      mappedStates: 'Mappade Tillstånd',
      noneValue: '(ingen)',
    },
    menu: {
      title: 'A.D.A.M. Kontrollpanel',
      movement: 'Rörelse',
      facing: 'Riktning',
      state: 'Tillstånd',
      stateLabel: 'Tillstånd',
      facingLabel: 'Riktning',
      profileLabel: 'Profil',
      noProfile: 'Ingen profil',
      help: 'Hjälp',
      config: 'Inställn.',
      states: {
        idle: 'Overksam',
        combat: 'Strid',
        walk: 'Gå',
        dash: 'Sprint',
        sneak: 'Smyga',
        rage: 'Raseri',
        spellcasting: 'Besvärjelse',
        help: 'Hjälp',
      },
    },
    info: {
      subtitle: 'Animerad Riktning och Rörelse',
      versionLabel: 'Version',
      updatedLabel: 'Uppdaterad',
      creditsBody:
        'A.D.A.M.<br>Animerad Riktning och Rörelse<br><br>Drivs av SIMON.<br>Heter definitivt inte Simon.',
      ready: 'MOD KLART',
    },
  };

  const TRANSLATION$1 = {
    titles: {
      error: 'Hata',
      noTokenSelected: 'Hiçbir Jeton Seçilmedi',
      tokenError: 'Jeton Hatası',
      missingDirection: 'Yön Eksik',
      invalidDirection: 'Geçersiz Yön',
      missingState: 'Durum Eksik',
      invalidState: 'Geçersiz Durum',
      missingAction: 'Eylem Eksik',
      invalidAction: 'Geçersiz Eylem',
      accessDenied: 'Erişim Reddedildi',
      invalidValue: 'Geçersiz Değer',
      unknownCommand: 'Bilinmeyen Komut',
      moveError: 'Hareket Hatası',
      macroExists: 'Makro Zaten Mevcut',
      macroInstalled: 'Makro Yüklendi',
      invalidUsage: 'Geçersiz Kullanım',
      profileAssigned: 'Profil Atandı',
      profileRemoved: 'Profil Kaldırıldı',
      unknownProfile: 'Bilinmeyen Profil',
      configuration: 'Yapılandırma',
      settingsReset: 'Ayarlar Sıfırlandı',
      scriptReady: 'Betik Hazır',
      versionInfo: 'Sürüm Bilgisi',
      creditsTitle: 'Katkıda Bulunanlar',
      adamsMenu: 'A.D.A.M. Kontrol Paneli',
      adamsHelp: 'A.D.A.M. Yardım',
      adamsSettings: 'A.D.A.M. Ayarlar',
      profiles: 'Yapılandırılmış Profiller',
      tokenProfile: 'Jeton Profili',
      success: 'Başarılı',
      langSet: 'Dil Ayarlandı',
      langInvalid: 'Geçersiz Dil',
    },
    errors: {
      noTokenSelected:
        'Hiçbir jeton seçilmedi. Önce bir jeton seçin, ardından bir yön düğmesine tıklayın.',
      noTokenSelectedStill: 'Hâlâ hiçbir jeton seçilmedi.',
      noTokenSelectedPersistent: 'Azminize hayranım. Önce bir jeton seçin.',
      tokenNotFound: 'Seçilen jeton bulunamadı.',
      missingDirection:
        'Lütfen bir yön belirtin. Örnek: <code>!adam --move n</code><br><em>Yönler: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Bilinmeyen yön: <strong>{value}</strong><br><br>Geçerli: n, ne, e, se, s, sw, w, nw (veya north, northeast gibi tam adlar)',
      missingState: 'Lütfen bir durum belirtin.<br>Geçerli: {states}',
      invalidState: 'Bilinmeyen durum: <strong>{value}</strong><br><br>Geçerli: {states}',
      missingAction:
        'Lütfen bir eylem belirtin. Örnekler: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction:
        'Bilinmeyen eylem: <strong>{value}</strong><br><br>Bilinen eylemler: {actions}',
      accessDeniedConfig: 'Yapılandırma değişiklikleri yalnızca GM ile sınırlıdır.',
      accessDeniedProfileAssign: 'Profil atama yalnızca GM ile sınırlıdır.',
      accessDeniedProfileRemove: 'Profil kaldırma yalnızca GM ile sınırlıdır.',
      accessDeniedMacro: 'Makro yükleme yalnızca GM ile sınırlıdır.',
      accessDeniedReset: 'Ayarları sıfırlama yalnızca GM ile sınırlıdır.',
      unknownCommand:
        'Bilinmeyen komut. Mevcut komutların listesi için <code>!adam --help</code> komutunu deneyin.',
      moveFailed: 'Hareket başarısız oldu.',
      gridSizeInvalid: 'Izgara boyutu 10 ile 1000 arasında bir tam sayı olmalıdır (piksel).',
      moveDistanceInvalid: 'Hareket mesafesi 1 ile 20 arasında bir tam sayı olmalıdır (kare).',
      autoFaceInvalid: 'Otomatik yön değeri: on veya off olmalıdır.',
      humourInvalid: 'Mizah değeri: on veya off olmalıdır.',
      langInvalid: 'Geçersiz dil ayarı. Desteklenen: {locales}',
      profileUsage:
        'Kullanım: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Kullanım: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        '<strong>{id}</strong> profili mevcut değil. Mevcut profilleri görmek için <code>!adam --profile list</code> kullanın.',
      profileUnknownSub:
        'Bilinmeyen profil alt komutu: <strong>{sub}</strong><br><br>Geçerli: list, show, assign, remove',
      macroExists: "\'<strong>{name}</strong>\' adlı bir makro zaten mevcut.",
      simonUnknown:
        'Simon nasıl yapacağını bilmiyor: <em>{command}</em><br><br>Deneyin: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> artık <strong>{direction}</strong> yönüne bakıyor.',
      stateSet: '<strong>{token}</strong> durumu <strong>{state}</strong> olarak ayarlandı.',
      actionSet:
        '<strong>{token}</strong> eylemi: <strong>{action}</strong> → durum: <strong>{state}</strong>.',
      profileAssigned: '<strong>{id}</strong> profili <strong>{token}</strong> öğesine atandı.',
      profileRemoved: '<strong>{token}</strong> öğesinden profil kaldırıldı.',
      macroInstalled:
        "\'<strong>{name}</strong>\' genel makrosu oluşturuldu ve tüm oyuncular tarafından görülebilir.",
      configUpdated: 'Ayarlar güncellendi.',
      settingsReset: '<strong>Ayarlar fabrika varsayılanlarına sıfırlandı.</strong>',
      langSet: 'Dil {locale} olarak ayarlandı.',
    },
    settings: {
      gridSize: 'Izgara Boyutu',
      gridSizeDesc: 'Kare başına {size}px',
      moveDistance: 'Hareket Mesafesi',
      moveDistanceDesc: '{squares} kare — hareket başına {pixels}px',
      autoFace: 'Harekette Otomatik Yön',
      humour: 'Mizah (Paskalya Yumurtaları)',
      language: 'Dil',
      on: 'Açık',
      off: 'Kapalı',
    },
    profiles: {
      none: 'Hiçbir animasyonlu jeton profili yapılandırılmadı.',
      noProfile: 'Seçilen jetona atanmış profil yok.',
      id: 'Profil Kimliği',
      displayName: 'Görünen Ad',
      mappedStates: 'Eşlenmiş Durumlar',
      noneValue: '(yok)',
    },
    menu: {
      title: 'A.D.A.M. Kontrol Paneli',
      movement: 'Hareket',
      facing: 'Yön',
      state: 'Durum',
      stateLabel: 'Durum',
      facingLabel: 'Yön',
      profileLabel: 'Profil',
      noProfile: 'Profil yok',
      help: 'Yardım',
      config: 'Ayarlar',
      states: {
        idle: 'Boşta',
        combat: 'Savaş',
        walk: 'Yürüyüş',
        dash: 'Koşu',
        sneak: 'Gizlilik',
        rage: 'Öfke',
        spellcasting: 'Büyü',
        help: 'Yardım',
      },
    },
    info: {
      subtitle: 'Animasyonlu Yön ve Hareket',
      versionLabel: 'Sürüm',
      updatedLabel: 'Güncellendi',
      creditsBody:
        'A.D.A.M.<br>Animasyonlu Yön ve Hareket<br><br>SIMON tarafından desteklenmektedir.<br>Kesinlikle Simon adı değil.',
      ready: 'MOD HAZIR',
    },
  };

  const TRANSLATION = {
    titles: {
      error: 'Помилка',
      noTokenSelected: 'Жетон Не Вибраний',
      tokenError: 'Помилка Жетона',
      missingDirection: 'Відсутній Напрямок',
      invalidDirection: 'Невірний Напрямок',
      missingState: 'Відсутній Стан',
      invalidState: 'Невірний Стан',
      missingAction: 'Відсутня Дія',
      invalidAction: 'Невірна Дія',
      accessDenied: 'Доступ Заборонено',
      invalidValue: 'Невірне Значення',
      unknownCommand: 'Невідома Команда',
      moveError: 'Помилка Руху',
      macroExists: 'Макрос Вже Існує',
      macroInstalled: 'Макрос Встановлено',
      invalidUsage: 'Невірне Використання',
      profileAssigned: 'Профіль Призначено',
      profileRemoved: 'Профіль Видалено',
      unknownProfile: 'Невідомий Профіль',
      configuration: 'Конфігурація',
      settingsReset: 'Налаштування Скинуто',
      scriptReady: 'Скрипт Готовий',
      versionInfo: 'Інформація про Версію',
      creditsTitle: 'Автори',
      adamsMenu: 'Панель Керування A.D.A.M.',
      adamsHelp: 'Довідка A.D.A.M.',
      adamsSettings: 'Налаштування A.D.A.M.',
      profiles: 'Налаштовані Профілі',
      tokenProfile: 'Профіль Жетона',
      success: 'Успіх',
      langSet: 'Мову Встановлено',
      langInvalid: 'Невірна Мова',
    },
    errors: {
      noTokenSelected: 'Жетон не вибрано. Виберіть жетон, а потім натисніть кнопку напрямку.',
      noTokenSelectedStill: 'Жетон досі не вибрано.',
      noTokenSelectedPersistent: 'Захоплююся вашою наполегливістю. Спочатку виберіть жетон.',
      tokenNotFound: 'Вибраний жетон не знайдено.',
      missingDirection:
        'Вкажіть напрямок. Приклад: <code>!adam --move n</code><br><em>Напрямки: n, ne, e, se, s, sw, w, nw</em>',
      invalidDirection:
        'Невідомий напрямок: <strong>{value}</strong><br><br>Допустимі: n, ne, e, se, s, sw, w, nw (або повні назви, наприклад north, northeast)',
      missingState: 'Вкажіть стан.<br>Допустимі: {states}',
      invalidState: 'Невідомий стан: <strong>{value}</strong><br><br>Допустимі: {states}',
      missingAction: 'Вкажіть дію. Приклади: help, spellcast, rage, dash, sneak, idle, combat',
      invalidAction: 'Невідома дія: <strong>{value}</strong><br><br>Відомі дії: {actions}',
      accessDeniedConfig: 'Зміна конфігурації доступна лише Майстру.',
      accessDeniedProfileAssign: 'Призначення профілю доступне лише Майстру.',
      accessDeniedProfileRemove: 'Видалення профілю доступне лише Майстру.',
      accessDeniedMacro: 'Встановлення макросу доступне лише Майстру.',
      accessDeniedReset: 'Скидання налаштувань доступне лише Майстру.',
      unknownCommand:
        'Невідома команда. Спробуйте <code>!adam --help</code>, щоб переглянути список доступних команд.',
      moveFailed: 'Рух не вдався.',
      gridSizeInvalid: 'Розмір сітки має бути цілим числом від 10 до 1000 (пікселі).',
      moveDistanceInvalid: 'Відстань руху має бути цілим числом від 1 до 20 (клітини).',
      autoFaceInvalid: 'Значення автоповороту має бути: on або off.',
      humourInvalid: 'Значення гумору має бути: on або off.',
      langInvalid: 'Невірне налаштування мови. Підтримувані: {locales}',
      profileUsage:
        'Використання: <code>!adam --profile &lt;list|show|assign &lt;id&gt;|remove&gt;</code>',
      profileAssignUsage: 'Використання: <code>!adam --profile assign &lt;profileId&gt;</code>',
      profileUnknown:
        'Профіль <strong>{id}</strong> не існує. Використовуйте <code>!adam --profile list</code>, щоб побачити доступні профілі.',
      profileUnknownSub:
        'Невідома підкоманда профілю: <strong>{sub}</strong><br><br>Допустимі: list, show, assign, remove',
      macroExists: "Макрос з іменем \'<strong>{name}</strong>\' вже існує.",
      simonUnknown:
        'Simon не знає, як виконати: <em>{command}</em><br><br>Спробуйте: <code>!simon says move n</code>',
    },
    confirm: {
      facing: '<strong>{token}</strong> тепер дивиться у напрямку <strong>{direction}</strong>.',
      stateSet: 'Стан <strong>{token}</strong> встановлено на <strong>{state}</strong>.',
      actionSet:
        'Дія <strong>{token}</strong>: <strong>{action}</strong> → стан: <strong>{state}</strong>.',
      profileAssigned: 'Профіль <strong>{id}</strong> призначено <strong>{token}</strong>.',
      profileRemoved: 'Профіль видалено з <strong>{token}</strong>.',
      macroInstalled:
        "Глобальний макрос \'<strong>{name}</strong>\' створено і видно всім гравцям.",
      configUpdated: 'Налаштування оновлено.',
      settingsReset: '<strong>Налаштування скинуто до заводських значень.</strong>',
      langSet: 'Мову встановлено на {locale}.',
    },
    settings: {
      gridSize: 'Розмір Сітки',
      gridSizeDesc: '{size}px на клітину',
      moveDistance: 'Відстань Руху',
      moveDistanceDesc: '{squares} клітина/клітин — {pixels}px за рух',
      autoFace: 'Автоповорот при Русі',
      humour: 'Гумор (Пасхальні Яйця)',
      language: 'Мова',
      on: 'Увімк.',
      off: 'Вимк.',
    },
    profiles: {
      none: 'Профілі анімованих жетонів не налаштовані.',
      noProfile: 'У вибраного жетона немає призначеного профілю.',
      id: 'ID Профілю',
      displayName: "Відображуване Ім'я",
      mappedStates: 'Призначені Стани',
      noneValue: '(немає)',
    },
    menu: {
      title: 'Панель Керування A.D.A.M.',
      movement: 'Рух',
      facing: 'Напрямок',
      state: 'Стан',
      stateLabel: 'Стан',
      facingLabel: 'Напрямок',
      profileLabel: 'Профіль',
      noProfile: 'Немає профілю',
      help: 'Довідка',
      config: 'Налаштув.',
      states: {
        idle: 'Бездіяльність',
        combat: 'Бій',
        walk: 'Хода',
        dash: 'Ривок',
        sneak: 'Скритність',
        rage: 'Лють',
        spellcasting: 'Закляття',
        help: 'Довідка',
      },
    },
    info: {
      subtitle: 'Анімований Напрямок і Рух',
      versionLabel: 'Версія',
      updatedLabel: 'Оновлено',
      creditsBody:
        'A.D.A.M.<br>Анімований Напрямок і Рух<br><br>Працює на SIMON.<br>Точно не зветься Саймоном.',
      ready: 'МОД ГОТОВИЙ',
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
