import { getSettings, getTokenState, recordTokenMove } from './state.js';
import {
  getMovementDelta,
  getRotationForDirection,
  getAnimationSetForDirection,
} from './direction.js';
import { applyAnimationSide } from './animation.js';

/**
 * Moves a token one step in the given direction.
 * Also updates token rotation (when autoFace is enabled) and animation side.
 *
 * @param {object} token Roll20 graphic token object.
 * @param {string} direction Canonical direction ('n', 'ne', etc.).
 * @returns {{moved:boolean, moveHistory:string[]}} Result object.
 */
export function moveToken(token, direction) {
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
