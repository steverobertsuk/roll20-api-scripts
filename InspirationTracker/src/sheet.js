// Reading and writing inspiration on both D&D 5e sheets.
//
// The 2014 OGL sheet keeps a checkbox attribute, `inspiration`, which
// findObjs can see. The D&D 2024 sheet is a Beacon sheet: its values are not
// attribute objects, so 0.1.x never found them. Beacon values are read and
// written with getSheetItem/setSheetItem; the sheet also keeps them in a
// `store` attribute, which is read when those functions are not available.

import {
  BEACON_ITEM,
  BEACON_STORE_ATTRIBUTE,
  LEGACY_ATTRIBUTE,
  RULES_2014,
  RULES_2024,
  SCRIPT_NAME,
} from './constants.js';
import { getConfig } from './state.js';
import { isInspiredValue, isRecord, toText } from './utils.js';

/**
 * Finds a character's attribute by name, whatever its case.
 *
 * @param {string} charId Character ID.
 * @param {string} name Attribute name.
 * @returns {object|undefined} Roll20 attribute.
 */
export function findAttribute(charId, name) {
  const wanted = name.toLowerCase();
  return findObjs({ _type: 'attribute', _characterid: charId }).find(
    (attr) => toText(attr.get('name')).toLowerCase() === wanted
  );
}

/**
 * Returns the parsed `store` of a Beacon character, or null for other sheets.
 *
 * @param {string|object} charOrAttr Character ID, or the store attribute itself.
 * @returns {object|null} Store contents.
 */
export function readStore(charOrAttr) {
  const attr =
    typeof charOrAttr === 'string' ? findAttribute(charOrAttr, BEACON_STORE_ATTRIBUTE) : charOrAttr;
  if (!attr) {
    return null;
  }
  let value = attr.get('current');
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      return null;
    }
  }
  return isRecord(value) ? value : null;
}

/**
 * Reads inspiration from a Beacon store.
 *
 * @param {object|null} store Store contents.
 * @returns {boolean|undefined} Value, or undefined when the store has none.
 */
export function inspirationFromStore(store) {
  const value = store?.inspiration?.isInspired;
  return value === undefined ? undefined : isInspiredValue(value);
}

/**
 * Says which kind of sheet holds a character's inspiration.
 *
 * @param {string} charId Character ID.
 * @returns {'legacy'|'beacon'|'none'} Sheet kind.
 */
export function sheetKind(charId) {
  if (findAttribute(charId, LEGACY_ATTRIBUTE)) {
    return 'legacy';
  }
  return findAttribute(charId, BEACON_STORE_ATTRIBUTE) ? 'beacon' : 'none';
}

/**
 * Reads whether a character has inspiration.
 *
 * @param {string} charId Character ID.
 * @returns {Promise<{kind: string, inspired: boolean}>} Sheet kind and value.
 */
export async function readInspiration(charId) {
  const kind = sheetKind(charId);
  if (kind === 'legacy') {
    return {
      kind,
      inspired: isInspiredValue(findAttribute(charId, LEGACY_ATTRIBUTE).get('current')),
    };
  }
  if (kind === 'beacon') {
    if (typeof getSheetItem === 'function') {
      try {
        const value = await getSheetItem(charId, BEACON_ITEM);
        if (value !== undefined && value !== null) {
          return { kind, inspired: isInspiredValue(value) };
        }
      } catch (err) {
        log(`${SCRIPT_NAME}: getSheetItem failed for ${charId}: ${err?.message || err}`);
      }
    }
    return { kind, inspired: inspirationFromStore(readStore(charId)) === true };
  }
  return { kind, inspired: false };
}

/**
 * Sets or clears a character's inspiration.
 *
 * A 2014 sheet only creates its attribute when the box is first ticked, so a
 * character with neither attribute nor store gets the attribute created.
 *
 * @param {string} charId Character ID.
 * @param {boolean} inspired New value.
 * @returns {Promise<{ok: boolean, kind: string, error?: string}>} Result.
 */
export async function writeInspiration(charId, inspired) {
  const kind = sheetKind(charId);
  if (kind === 'beacon') {
    if (typeof setSheetItem !== 'function') {
      return { ok: false, kind, error: 'setSheetItem is not available' };
    }
    try {
      await setSheetItem(charId, BEACON_ITEM, inspired ? 1 : 0, 'current', { allowThrow: true });
      return { ok: true, kind };
    } catch (err) {
      const error = String(err?.message || err);
      log(`${SCRIPT_NAME}: setSheetItem failed for ${charId}: ${error}`);
      return { ok: false, kind, error };
    }
  }
  const value = inspired ? 'on' : '0';
  const attr = findAttribute(charId, LEGACY_ATTRIBUTE);
  if (attr) {
    attr.set('current', value);
  } else {
    createObj('attribute', { characterid: charId, name: LEGACY_ATTRIBUTE, current: value });
  }
  return { ok: true, kind: 'legacy' };
}

/**
 * Returns the rules edition used for a character: the GM's choice, or the
 * 2024 sheet's own setting, or 2014 for the 2014 OGL sheet.
 *
 * @param {string} charId Character ID.
 * @returns {string} RULES_2014 or RULES_2024.
 */
export function rulesFor(charId) {
  const wording = getConfig().wording;
  if (wording === RULES_2014 || wording === RULES_2024) {
    return wording;
  }
  const store = readStore(charId);
  if (!store) {
    return RULES_2014;
  }
  return store.settings?.newRules === false ? RULES_2014 : RULES_2024;
}
