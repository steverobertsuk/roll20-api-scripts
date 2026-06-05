import {
  NO_TOKEN_SELECTED_FUNNY_THRESHOLD_1,
  NO_TOKEN_SELECTED_FUNNY_THRESHOLD_2,
} from './constants.js';
import { whisperSenderError } from './messages.js';
import { incrementNoTokenCount, getSettings } from './state.js';
import { t } from './i18n.js';

/**
 * Resolves the single selected token from a chat message.
 * Whispers an error and returns null when no valid token is found.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {object|null} Roll20 graphic token or null.
 */
export function getSelectedToken(msg) {
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
    whisperSenderError(msg, t('errors.tokenNotFound', language), t('titles.tokenError', language));
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
