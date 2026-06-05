import { getRotationForDirection, getAnimationSetForDirection } from './direction.js';
import { getTokenState, setTokenState } from './state.js';
import { applyAnimationSide } from './animation.js';

/**
 * Sets a token's facing direction by updating its rotation.
 * Also updates the persisted direction and animation side when configured.
 *
 * @param {object} token Roll20 graphic token object.
 * @param {string} direction Canonical direction ('n', 'ne', etc.).
 * @returns {void}
 */
export function faceToken(token, direction) {
  token.set({ rotation: getRotationForDirection(direction) });

  const tokenId = token.get('_id');
  const tokenState = getTokenState(tokenId);
  setTokenState(tokenId, { currentDirection: direction });

  const animSet = getAnimationSetForDirection(direction);
  applyAnimationSide(tokenId, token, tokenState.currentState, animSet);
}
