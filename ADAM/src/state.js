import { FACTORY_DEFAULTS, MOVE_HISTORY_LENGTH } from './constants.js';

/**
 * Ensures persisted ADAM state exists and backfills missing keys with defaults.
 *
 * @returns {void}
 */
export function initializeState() {
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
export function getSettings() {
  return state.ADAM.settings;
}

/**
 * Resets all settings to factory defaults.
 * The caller is responsible for notifying the user.
 *
 * @returns {void}
 */
export function resetSettings() {
  state.ADAM.settings = { ...FACTORY_DEFAULTS };
}

// ─── TOKEN STATE ─────────────────────────────────────────────────────────────

/**
 * Returns persisted per-token state, creating a default entry when absent.
 *
 * @param {string} tokenId Roll20 token ID.
 * @returns {object} Token state record.
 */
export function getTokenState(tokenId) {
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
export function setTokenState(tokenId, updates) {
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
export function recordTokenMove(tokenId, direction) {
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
export function getProfile(profileId) {
  return state.ADAM.profiles[profileId] ?? null;
}

/**
 * Returns a summary list of all configured profiles.
 *
 * @returns {Array<{id:string, displayName:string, ownerId:string|null}>} Profile summary list.
 */
export function listProfiles() {
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
export function saveProfile(profileId, profile) {
  state.ADAM.profiles[profileId] = profile;
}

/**
 * Deletes a profile and removes all token assignments that reference it.
 * The caller is responsible for permission checks.
 *
 * @param {string} profileId Profile ID.
 * @returns {void}
 */
export function deleteProfile(profileId) {
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
export function canModifyProfile(profileId, playerId, isGM) {
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
export function isGlobalProfile(profileId) {
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
export function getTokenProfile(tokenId) {
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
export function getTokenProfileId(tokenId) {
  return state.ADAM.tokenProfiles[tokenId] ?? null;
}

/**
 * Assigns a profile to a token. Returns false when the profileId does not exist.
 *
 * @param {string} tokenId Roll20 token ID.
 * @param {string} profileId Profile ID to assign.
 * @returns {boolean} True when assignment succeeded.
 */
export function assignTokenProfile(tokenId, profileId) {
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
export function removeTokenProfile(tokenId) {
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
export function playerControlsToken(token, playerId) {
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
export function getDraft(profileId) {
  return state.ADAM.profileDrafts[profileId] ?? null;
}

/**
 * Persists a profile draft. Overwrites any existing draft for the same profileId.
 *
 * @param {string} profileId Profile ID used as the draft key.
 * @param {object} draft Draft data.
 * @returns {void}
 */
export function saveDraft(profileId, draft) {
  state.ADAM.profileDrafts[profileId] = draft;
}

/**
 * Deletes a pending draft.
 *
 * @param {string} profileId Profile ID used as the draft key.
 * @returns {void}
 */
export function deleteDraft(profileId) {
  delete state.ADAM.profileDrafts[profileId];
}

/**
 * Returns a summary list of all pending drafts.
 *
 * @returns {Array<{profileId:string, displayName:string, submittedBy:string, submittedAt:string}>}
 */
export function listDrafts() {
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
export function approveDraft(profileId) {
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
export function getPlayerStats(playerId) {
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
export function incrementNoTokenCount(playerId) {
  const stats = getPlayerStats(playerId);
  stats.noTokenCount += 1;
  state.ADAM.playerStats[playerId] = stats;
  return stats.noTokenCount;
}
