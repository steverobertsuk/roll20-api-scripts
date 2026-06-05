import { getTokenProfile } from './state.js';

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
export function applyAnimationSide(tokenId, token, stateName, animSet) {
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
 * Returns the side number (1-based) for a profile state and animation set.
 * Used for display and validation.
 *
 * @param {object} profile Animated token profile.
 * @param {string} stateName State name to look up.
 * @param {string} animSet 'north' or 'south'.
 * @returns {number|null} Side number or null when not mapped.
 */
export function getSideForState(profile, stateName, animSet) {
  if (!profile?.states) return null;
  const stateMapping = profile.states[stateName];
  if (!stateMapping) return null;
  return stateMapping[animSet] ?? stateMapping['south'] ?? null;
}
