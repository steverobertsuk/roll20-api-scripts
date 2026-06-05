import {
  DIRECTIONS,
  DIRECTION_ALIASES,
  DIRECTION_DELTA,
  DIRECTION_ROTATION,
  DIRECTION_ANIMATION_SET,
} from './constants.js';

/**
 * Normalizes a direction input string to a canonical direction key.
 * Accepts short forms ('n', 'nw') and long forms ('north', 'northwest').
 *
 * @param {string} input Raw direction input.
 * @returns {string|null} Canonical direction or null when unrecognized.
 */
export function normalizeDirection(input) {
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
export function getMovementDelta(direction, pixelsPerMove) {
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
export function getRotationForDirection(direction) {
  return DIRECTION_ROTATION[direction] ?? 0;
}

/**
 * Returns the animation sprite set name for a direction.
 *
 * @param {string} direction Canonical direction.
 * @returns {string} 'north' or 'south'.
 */
export function getAnimationSetForDirection(direction) {
  return DIRECTION_ANIMATION_SET[direction] ?? 'south';
}
