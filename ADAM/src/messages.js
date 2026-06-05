import {
  SCRIPT_NAME,
  COLOR_BG_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_TEXT_DIM,
  COLOR_ACCENT_TEAL,
  COLOR_ACCENT_DARK,
  COLOR_HEADER_LIGHT,
  COLOR_INFO_LIGHT,
  COLOR_INFO_DARK,
  COLOR_ERROR_RED,
  COLOR_ERROR_DARK,
  COLOR_ERROR_LIGHT,
  COLOR_ERROR_BG_LIGHT,
  COLOR_SUCCESS_GREEN,
  COLOR_SUCCESS_DARK,
  COLOR_SUCCESS_LIGHT,
  COLOR_SUCCESS_BG_LIGHT,
} from './constants.js';

/**
 * Escapes HTML-sensitive characters for safe chat rendering.
 *
 * @param {string} value Text to escape.
 * @returns {string} Escaped text.
 */
export function escapeHtml(value) {
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
export function getSafeTokenName(token, fallback) {
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
export function generateStyledMessage(msg, align = 'center', header = '') {
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
export function generateStyledErrorMessage(msg, header = 'Error', align = 'left') {
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
export function generateStyledSuccessMessage(msg, header = 'Success') {
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
export function whisperGM(msg, header = '', align = 'center') {
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
export function whisperSender(msgObj, text, header = '', align = 'center') {
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
export function whisperSenderError(msgObj, text, header = 'Error', align = 'left') {
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
export function whisperSenderSuccess(msgObj, text, header = 'Success') {
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
export function whisperGMSuccess(text, header = 'Success') {
  sendChat(SCRIPT_NAME, `/w GM ${generateStyledSuccessMessage(text, header)}`);
}

/**
 * Whispers an error-styled message card to the GM.
 *
 * @param {string} text Error body as HTML.
 * @param {string} [header="Error"] Optional header label.
 * @param {"left"|"center"|"right"} [align="left"] Content alignment.
 * @returns {void}
 */
export function whisperGMError(text, header = 'Error', align = 'left') {
  sendChat(SCRIPT_NAME, `/w GM ${generateStyledErrorMessage(text, header, align)}`);
}
