// Level-up notices and milestone levelling.

import { announce, buildNote } from './chat.js';
import { SCRIPT_NAME } from './constants.js';
import { t } from './i18n.js';
import { controllingPlayers } from './roster.js';
import { getProfile, readProgress } from './sheets.js';
import { getCharacterRecord, getConfig, getSession } from './state.js';
import { levelForXp } from './systems.js';
import { escapeForChat } from './utils.js';

const levelObservers = [];

/**
 * Registers a function called with {character, level, reason} when a character levels.
 *
 * @param {Function} fn Observer.
 * @returns {void}
 */
export function onLevelUp(fn) {
  if (typeof fn === 'function') {
    levelObservers.push(fn);
  }
}

/**
 * Tells observers about a level-up. An observer error never stops the mod.
 *
 * @param {object} event Event.
 * @returns {void}
 */
function notifyObservers(event) {
  for (const fn of levelObservers) {
    try {
      fn(event);
    } catch (err) {
      log(`${SCRIPT_NAME}: a level-up observer failed: ${err?.message || err}`);
    }
  }
}

/**
 * Announces that a character reached a level.
 *
 * @param {object} character Roll20 character.
 * @param {number} level New level.
 * @param {'xp'|'milestone'} reason Why.
 * @returns {void}
 */
export function announceLevel(character, level, reason) {
  const lang = getConfig().language;
  const profile = getProfile(character);
  const name = escapeForChat(character.get('name'));
  const lines = [
    `<div>${t(reason === 'milestone' ? 'levels.milestone' : 'levels.reached', lang, { name: `<strong>${name}</strong>`, level })}</div>`,
  ];
  const hint = { sheetButton: 'levels.sheetButton', pf2: 'levels.pf2', spend: 'levels.spend' }[
    profile.levelUpHint
  ];
  lines.push(buildNote(escapeForChat(t(hint || 'levels.updateSheet', lang))));
  announce(
    getConfig().levelNotice,
    controllingPlayers(character),
    t('titles.levelUp', lang),
    lines
  );
  getSession().levelUps.push({ id: character.id, name: character.get('name'), level, reason });
  notifyObservers({ character, level, reason });
}

/**
 * Checks whether an XP award took a character to a new level, and announces it once.
 *
 * @param {object} character Roll20 character.
 * @param {{after: number, level: number|null, profile: object}} result Result of addXp.
 * @returns {number|null} The new level announced, or null.
 */
export function checkLevelUp(character, result) {
  const rec = getCharacterRecord(character.id);
  if (Number.isFinite(result.level) && result.level > 0) {
    rec.level = result.level;
  }
  const profile = result.profile || {};
  const first = profile.firstLevel ?? 1;
  // A sheet's own "XP for next level" field (or the system's rule for it) comes first,
  // because the GM may have chosen another track; the profile's table is the fallback.
  let reached = null;
  if (Number.isFinite(result.next) && Number.isFinite(result.level)) {
    reached = result.after >= result.next ? result.level + 1 : result.level;
  } else {
    reached = levelForXp(profile.levels, result.after, first);
  }
  if (reached === null) {
    return null;
  }
  const known = Math.max(result.level ?? first, rec.notified ?? first, first);
  if (reached <= known) {
    return null;
  }
  rec.notified = reached;
  announceLevel(character, reached, 'xp');
  return reached;
}

/**
 * Raises the tracked level of characters by one (milestone levelling) and announces it.
 * Sheets are not changed: on many sheets the level comes from class levels.
 *
 * @param {object[]} characters Roll20 characters.
 * @returns {Promise<{name: string, level: number}[]>} New levels.
 */
export async function grantMilestone(characters) {
  const results = [];
  for (const character of characters) {
    const rec = getCharacterRecord(character.id);
    // The tracked level, or the sheet's if the player has levelled up past it.
    const progress = await readProgress(character);
    const current = Math.max(
      Number.isFinite(rec.level) ? rec.level : 0,
      Number.isFinite(progress.level) ? progress.level : 0,
      1
    );
    const level = current + 1;
    rec.level = level;
    rec.notified = level;
    announceLevel(character, level, 'milestone');
    results.push({ name: character.get('name'), level });
  }
  return results;
}
