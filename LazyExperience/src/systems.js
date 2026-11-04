// Game-system profiles: which sheet fields hold XP, level and monster XP, and the
// XP tables each system uses. A profile is picked per character from the name of its
// sheet, so games that mix sheets work.
//
// Field lists are tried in order. On legacy (attribute) sheets every name is looked
// up quietly, so several candidates are fine. On Beacon sheets an unknown name logs a
// sandbox error, so Beacon profiles list only names the sheet is known to have.

import { parseChallenge, splitList, toText } from './utils.js';

// XP needed to reach each level (index 0 = level 1). D&D 5e 2014 and 2024 share it.
export const DND5E_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000,
  195000, 225000, 265000, 305000, 355000,
];

// D&D 5e XP by challenge rating.
const DND5E_CR_XP = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

// Pathfinder 1e XP to reach each level, by advancement track.
export const PF1_LEVELS = {
  slow: [
    0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000, 235000, 330000, 475000,
    665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000,
  ],
  medium: [
    0, 2000, 5000, 9000, 15000, 23000, 35000, 51000, 75000, 105000, 155000, 220000, 315000, 445000,
    635000, 890000, 1300000, 1800000, 2550000, 3600000,
  ],
  fast: [
    0, 1300, 3300, 6000, 10000, 15000, 23000, 34000, 50000, 71000, 105000, 145000, 210000, 295000,
    425000, 600000, 850000, 1200000, 1700000, 2400000,
  ],
};

// Pathfinder 1e XP by CR (also used by Starfinder 1e).
const PF1_CR_XP = {
  0.125: 50,
  0.167: 65,
  0.25: 100,
  0.333: 135,
  0.5: 200,
  1: 400,
  2: 600,
  3: 800,
  4: 1200,
  5: 1600,
  6: 2400,
  7: 3200,
  8: 4800,
  9: 6400,
  10: 9600,
  11: 12800,
  12: 19200,
  13: 25600,
  14: 38400,
  15: 51200,
  16: 76800,
  17: 102400,
  18: 153600,
  19: 204800,
  20: 307200,
  21: 409600,
  22: 614400,
  23: 819200,
  24: 1228800,
  25: 1638400,
};

// Pathfinder 2e XP for a creature, by its level minus the party level (Core Rulebook).
const PF2_CREATURE_XP = {
  '-4': 10,
  '-3': 15,
  '-2': 20,
  '-1': 30,
  0: 40,
  1: 60,
  2: 80,
  3: 120,
  4: 160,
};

/**
 * Looks up XP for a challenge rating in a table, matching fractions loosely.
 *
 * @param {object} table CR → XP.
 * @param {*} raw Challenge rating text.
 * @returns {number|null} XP, or null.
 */
function lookupCr(table, raw) {
  const cr = parseChallenge(raw);
  if (cr === null) {
    return null;
  }
  const key = Object.keys(table).find((k) => Math.abs(Number(k) - cr) < 0.01);
  return key === undefined ? null : table[key];
}

/**
 * Pathfinder 2e creature XP, from its level and the party's level.
 *
 * @param {*} creatureLevel Creature level.
 * @param {number} partyLevel Party level.
 * @returns {number|null} XP for the whole party, or null.
 */
export function pf2CreatureXp(creatureLevel, partyLevel) {
  const level = Number(toText(creatureLevel));
  if (!Number.isFinite(level) || !Number.isFinite(partyLevel)) {
    return null;
  }
  const diff = Math.round(level - partyLevel);
  if (diff < -4) return 0;
  if (diff > 4) return 160;
  return PF2_CREATURE_XP[String(diff)];
}

/**
 * The built-in profiles. `sheets` are the `_charactersheetname` values a profile is
 * picked for; `match` catches renamed copies of community sheets.
 */
export const PROFILES = [
  {
    id: 'dnd2024',
    label: 'D&D 5E (2024 / 5.5E) by Roll20',
    sheets: ['dnd2024byroll20'],
    access: 'beacon',
    pc: { xp: ['experience'], level: ['level'] },
    npc: { xp: ['npc_xp'], cr: ['npc_challenge'] },
    levels: DND5E_LEVELS,
    crXp: (cr) => lookupCr(DND5E_CR_XP, cr),
    levelUpHint: 'sheetButton',
    verified: 'live',
  },
  {
    id: 'dnd2014',
    label: 'D&D 5E (2014) by Roll20',
    sheets: ['ogl5e', 'dnd5e', 'dnd5ebyroll20', '5th edition ogl by roll20'],
    match: /5th ?edition ?legacy|dd5thedition|ogl/,
    fingerprint: ['npc_challenge', 'base_level'],
    access: 'legacy',
    pc: { xp: ['experience'], level: ['level'] },
    npc: { xp: ['npc_xp'], cr: ['npc_challenge'] },
    levels: DND5E_LEVELS,
    crXp: (cr) => lookupCr(DND5E_CR_XP, cr),
    verified: 'source',
  },
  {
    id: 'shaped5e',
    label: 'D&D 5E Shaped',
    sheets: ['5eshaped', '5e shaped'],
    match: /shaped/,
    fingerprint: ['xp_next_level', 'xp_readable'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['level'], next: ['xp_next_level'] },
    npc: { xp: ['xp'], cr: ['challenge'] },
    levels: DND5E_LEVELS,
    crXp: (cr) => lookupCr(DND5E_CR_XP, cr),
    verified: 'source',
  },
  {
    id: 'pf1',
    label: 'Pathfinder (1E) by Roll20',
    sheets: ['pathfinder', 'pathfinderbyroll20', 'pathfinder by roll20'],
    match: /^pathfinder(?!.*(2|second|community))/,
    fingerprint: ['npc_cr', 'class1_level'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['level'], next: ['xp_max'] },
    npc: { xp: ['xp'], cr: ['npc_cr'] },
    levels: null,
    crXp: (cr) => lookupCr(PF1_CR_XP, cr),
    verified: 'source',
  },
  {
    id: 'pf1community',
    label: 'Pathfinder (1E) Community',
    sheets: ['pathfinder community', 'pathfinder_community'],
    match: /pathfinder.*community/,
    fingerprint: ['npc-cr', 'npc-xp', 'experience_max'],
    access: 'legacy',
    pc: { xp: ['experience'], level: ['level'], next: ['experience_max'] },
    npc: { xp: ['npc-xp'], cr: ['npc-cr'] },
    levels: null,
    crXp: (cr) => lookupCr(PF1_CR_XP, cr),
    verified: 'source',
  },
  {
    id: 'pf2',
    label: 'Pathfinder Second Edition by Roll20',
    sheets: ['pathfinder2', 'pf2', 'pathfinder second edition by roll20'],
    match: /pathfinder ?(2|second)|pf2/,
    access: 'legacy',
    pc: { xp: ['xp'], level: ['level'] },
    npc: { level: ['level'] },
    // PF2 characters level at 1000 XP and then take 1000 off; the sheet does not do it.
    nextXp: () => 1000,
    levelUpHint: 'pf2',
    creatureXp: pf2CreatureXp,
    verified: 'source',
  },
  {
    id: 'sf1',
    label: 'Starfinder by Roll20',
    sheets: ['starfinder', 'starfinderbyroll20', 'starfinder by roll20'],
    match: /starfinder/,
    fingerprint: ['character_level'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['character_level'], next: ['xp_max'] },
    npc: { xp: ['xp'], cr: ['character_level'] },
    levels: null,
    crXp: (cr) => lookupCr(PF1_CR_XP, cr),
    verified: 'source',
  },
  {
    id: 'ose',
    label: 'Old-School Essentials',
    sheets: ['ose', 'old school essentials'],
    match: /old.?school|^ose/,
    fingerprint: ['ExpPercentage'],
    access: 'legacy',
    pc: { xp: ['XP'], level: ['level'], next: ['Next'] },
    npc: { xp: ['XP'] },
    levels: null,
    verified: 'source',
  },
  {
    id: 'dcc',
    label: 'Dungeon Crawl Classics',
    sheets: ['dcc', 'dcc_official', 'dungeon crawl classics'],
    match: /dcc|dungeon ?crawl/,
    fingerprint: ['xp_mod'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['level'] },
    npc: { xp: ['xp'] },
    levels: [0, 10, 50, 110, 190, 290, 410, 550, 710, 890, 1090],
    firstLevel: 0,
    verified: 'source',
  },
  {
    id: 'dungeonworld',
    label: 'Dungeon World',
    sheets: ['dungeon world', 'dungeonworld'],
    match: /dungeon ?world/,
    fingerprint: ['isNPC', 'calc_isNPC'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['level'] },
    npc: {},
    // Level up at level + 7 XP, spending the XP.
    nextXp: (level) => level + 7,
    levelUpHint: 'spend',
    verified: 'source',
  },
  {
    id: 'wfrp4',
    label: 'Warhammer Fantasy Roleplay 4E',
    sheets: ['wfrp4', 'warhammer fantasy roleplay 4e'],
    match: /wfrp|warhammer/,
    fingerprint: ['current_xp', 'spent_xp'],
    access: 'legacy',
    pc: { xp: ['current_xp'], level: [] },
    npc: {},
    // The sheet adds up an XP ledger, so awards are new ledger rows.
    write: {
      kind: 'repeatingRow',
      section: 'experience',
      amount: 'experience_amount',
      note: 'experience_desc',
    },
    verified: 'source',
  },
  {
    id: 'shadowrun5',
    label: 'Shadowrun 5E (karma)',
    sheets: ['shadowrun5thedition', 'shadowrun 5th edition'],
    match: /shadowrun ?5/,
    fingerprint: ['total karma'],
    access: 'legacy',
    pc: { xp: ['karma'], level: [] },
    npc: {},
    alsoAdd: ['total karma'],
    unit: 'karma',
    verified: 'source',
  },
  {
    id: 'shadowrun6',
    label: 'Shadowrun 6E (karma)',
    sheets: ['shadowrun6thedition', 'shadowrun sixth world'],
    match: /shadowrun ?(6|sixth)/,
    fingerprint: ['total_karma'],
    access: 'legacy',
    pc: { xp: ['karma'], level: [] },
    npc: {},
    alsoAdd: ['total_karma'],
    unit: 'karma',
    verified: 'source',
  },
  {
    id: 'cypher',
    label: 'Cypher System',
    sheets: ['cypher', 'cypher systems by roll20'],
    match: /cypher/,
    fingerprint: ['sheet_style'],
    access: 'legacy',
    pc: { xp: ['xp'], level: ['tier'] },
    npc: {},
    levels: null,
    verified: 'source',
  },
  {
    id: 'swade',
    label: 'Savage Worlds (advances)',
    sheets: ['savage worlds', 'savageworlds', 'official savage worlds'],
    match: /savage ?worlds|swade/,
    fingerprint: ['manualAdvance', 'setadvance'],
    access: 'legacy',
    pc: { xp: [], level: ['rank'] },
    npc: {},
    // The sheet counts Advances from its Edges list; XP cannot be written.
    xpless: true,
    verified: 'source',
  },
  {
    id: 'levelonly',
    label: '13th Age, Cosmere and other level-only sheets',
    sheets: ['13th age', '13th_age_official', 'cosmere', 'stormlight archives'],
    match: /13th ?age|cosmere|stormlight/,
    fingerprint: ['is_adversary'],
    access: 'legacy',
    pc: { xp: [], level: ['level'] },
    npc: {},
    xpless: true,
    verified: 'source',
  },
  {
    id: 'cthulhu',
    label: 'Call of Cthulhu 7E (no XP)',
    sheets: ['call of cthulhu', 'coc_7th_ed'],
    match: /cthulhu|^coc/,
    access: 'legacy',
    pc: { xp: [], level: [] },
    npc: {},
    xpless: true,
    verified: 'source',
  },
  {
    id: 'generic',
    label: 'Other sheet (common names)',
    sheets: [],
    access: 'legacy',
    pc: {
      xp: ['experience', 'xp', 'exp', 'experience_points'],
      level: ['level', 'lvl', 'character_level'],
    },
    npc: { xp: ['npc_xp', 'xp', 'experience'], cr: ['npc_challenge', 'challenge', 'cr'] },
    levels: null,
    crXp: null,
    verified: 'none',
  },
  {
    id: 'custom',
    label: 'Custom fields',
    sheets: [],
    access: 'auto',
    pc: null,
    npc: null,
    levels: null,
    crXp: null,
    verified: 'none',
  },
];

/**
 * Returns a profile by ID.
 *
 * @param {string} id Profile ID.
 * @returns {object|undefined} Profile.
 */
export function getProfileById(id) {
  return PROFILES.find((p) => p.id === id);
}

/**
 * Lists the IDs a GM can choose for the system setting.
 *
 * @returns {string[]} IDs, auto first.
 */
export function systemIds() {
  return ['auto', ...PROFILES.map((p) => p.id)];
}

/**
 * Parses the custom level table setting ("0,300,900,…").
 *
 * @param {string} text Setting text.
 * @returns {number[]|null} XP to reach each level, or null when blank or invalid.
 */
export function parseLevelTable(text) {
  const items = splitList(text).map((s) => Number(s.replaceAll('_', '')));
  if (items.length < 2 || items.some((n) => !Number.isFinite(n) || n < 0)) {
    return null;
  }
  return items.every((n, i) => i === 0 || n > items[i - 1]) ? items : null;
}

/**
 * Builds the custom profile from the settings.
 *
 * @param {object} config Mod settings.
 * @param {string} access 'beacon' or 'legacy'.
 * @returns {object} Profile.
 */
function customProfile(config, access) {
  const base = getProfileById('custom');
  const list = (v) => splitList(v);
  return {
    ...base,
    access,
    pc: { xp: list(config.customXp), level: list(config.customLevel) },
    npc: { xp: list(config.customNpcXp), cr: list(config.customNpcCr) },
    levels: parseLevelTable(config.customLevels),
  };
}

/**
 * Picks the profile for a sheet name.
 *
 * @param {string} sheetName The character's `_charactersheetname`.
 * @returns {object} Profile (the generic one when nothing matches).
 */
export function detectProfile(sheetName, character = null) {
  const name = toText(sheetName).toLowerCase();
  const byName = PROFILES.find(
    (p) => p.sheets.includes(name) || (p.match instanceof RegExp && name && p.match.test(name))
  );
  if (byName) {
    return byName;
  }
  // Sheet names are not documented, so look for attributes only one sheet has.
  if (character) {
    const names = new Set(
      findObjs({ _type: 'attribute', _characterid: character.id }).map((a) =>
        toText(a.get('name')).toLowerCase()
      )
    );
    const byAttrs = PROFILES.find((p) =>
      (p.fingerprint || []).some((f) => names.has(f.toLowerCase()))
    );
    if (byAttrs) {
      return byAttrs;
    }
  }
  return getProfileById('generic');
}

/**
 * Returns the profile to use for a character.
 *
 * @param {object} character Roll20 character.
 * @param {object} config Mod settings.
 * @param {boolean} beaconAvailable Whether the sandbox can use Beacon sheets.
 * @returns {object} Profile.
 */
export function profileForCharacter(character, config, beaconAvailable) {
  const sheetName =
    toText(character?.get?.('_charactersheetname')) || toText(Campaign()?.sheetName);
  if (config.system === 'custom') {
    const beaconSheet = detectProfile(sheetName, character).access === 'beacon';
    return customProfile(config, beaconSheet && beaconAvailable ? 'beacon' : 'legacy');
  }
  if (config.system && config.system !== 'auto') {
    return getProfileById(config.system) || detectProfile(sheetName, character);
  }
  return detectProfile(sheetName, character);
}

/**
 * Works out the level a total XP reaches on a level table.
 *
 * @param {number[]|null} table XP to reach each level.
 * @param {number} xp Total XP.
 * @returns {number|null} Level, or null without a table.
 */
export function levelForXp(table, xp, firstLevel = 1) {
  if (!Array.isArray(table) || table.length === 0) {
    return null;
  }
  let level = firstLevel;
  for (let i = 0; i < table.length; i++) {
    if (xp >= table[i]) level = i + firstLevel;
  }
  return level;
}

/**
 * XP needed to reach the next level.
 *
 * @param {number[]|null} table XP to reach each level.
 * @param {number} level Current level.
 * @returns {number|null} XP, or null at the top of the table or without one.
 */
export function xpForNextLevel(table, level, firstLevel = 1) {
  const index = level - firstLevel + 1;
  return Array.isArray(table) && index >= 1 && index < table.length ? table[index] : null;
}
