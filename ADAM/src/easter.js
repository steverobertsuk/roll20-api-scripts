import { SNEAK_SPAM_THRESHOLD, HELP_SPAM_THRESHOLD } from './constants.js';
import { getSettings } from './state.js';
import { whisperSender } from './messages.js';
import { t } from './i18n.js';

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
export function checkMovementEasterEgg(moveHistory) {
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
export function checkStateEasterEgg(newState, result) {
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
export function whisperMovementEasterEgg(msg, moveHistory) {
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
export function whisperStateEasterEgg(msg, newState, result) {
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
export function whisperSimonResponse(msg) {
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
export function whisperSimonNoSays(msg) {
  whisperSender(msg, t('easter.simonNoSays', 'en-US'));
}
