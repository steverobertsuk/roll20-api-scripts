import {
  ALLOWED_STATES,
  DIRECTIONS,
  COLOR_BG_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_ACCENT_TEAL,
  COLOR_ACCENT_DARK,
  COLOR_TEXT_DIM,
} from './constants.js';
import { getTokenState, getTokenProfile, getTokenProfileId, getSettings } from './state.js';
import { escapeHtml, getSafeTokenName, whisperSender } from './messages.js';
import { t } from './i18n.js';

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
export function showTokenMenu(msg, token) {
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
