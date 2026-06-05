import { getTokenState, setTokenState } from './state.js';
import { getAnimationSetForDirection } from './direction.js';
import { applyAnimationSide } from './animation.js';

/**
 * Updates a token's state and triggers animation side switching if a profile is set.
 * Tracks consecutive sneak/help counts and rage-while-raging for easter eggs.
 *
 * @param {string} tokenId Roll20 token ID.
 * @param {object} token Roll20 graphic token object.
 * @param {string} newState New state name ('idle', 'combat', etc.).
 * @returns {{previousState:string, sneakCount:number, helpCount:number, wasAlreadyRaging:boolean}} Result.
 */
export function updateTokenState(tokenId, token, newState) {
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
