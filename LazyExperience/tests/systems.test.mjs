import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createSandbox } from './roll20-stub.mjs';

/**
 * A game where every character uses one legacy sheet, picked by its attributes.
 *
 * @param {string} sheet Sheet name ('' to force attribute detection).
 * @returns {object} Game (not ready yet).
 */
function legacyGame(sheet) {
  return createSandbox({ sheetName: sheet });
}

/**
 * Ends a session after adding XP, with auto kill mode for creatures.
 *
 * @param {object} g Game.
 * @param {number} xp XP.
 * @returns {Promise<void>}
 */
async function award(g, xp) {
  await g.command(`!lazyxp add ${xp}`);
  await g.command('!lazyxp end');
}

test('sheets are recognised by name, and by their own attributes when the name is unknown', async () => {
  const g = legacyGame('');
  const shaped = g.legacyChar('S', '', { xp: '0', xp_next_level: '300', level: '1' });
  const pfc = g.legacyChar('P', '', { experience: '0', 'npc-cr': '', experience_max: '2000' });
  const sf = g.legacyChar('F', 'starfinder', { xp: '0', character_level: '1' });
  await g.ready();
  const api = g.sandbox.LazyExperience;
  assert.equal(api.getSystem(shaped.id), 'shaped5e');
  assert.equal(api.getSystem(pfc.id), 'pf1community');
  assert.equal(api.getSystem(sf.id), 'sf1');
});

test('5e Shaped: XP and the next-level field', async () => {
  const g = legacyGame('5eshaped');
  const hero = g.legacyChar('Hero', '5eshaped', { xp: '200', level: '1', xp_next_level: '300' });
  await g.ready();
  await award(g, 150);
  assert.equal(g.attr(hero.id, 'xp').get('current'), 350);
  assert.match(g.chatText(), /enough XP for level 2/);
});

test('Pathfinder 1E: XP to xp_max and XP by CR', async () => {
  const g = legacyGame('pathfinder');
  const hero = g.legacyChar('Hero', 'pathfinder', { xp: '1900', level: '1', xp_max: '2000' });
  const orc = g.legacyChar(
    'Orc',
    'pathfinder',
    { npc: '1', npc_cr: '1/2', hp: '6' },
    { controlledby: '' }
  );
  const token = g.add('graphic', {
    represents: orc.id,
    bar1_value: '6',
    _subtype: 'token',
    name: 'Orc',
  });
  await g.ready();
  await g.command('!lazyxp set killMode auto');
  await g.edit(token, { bar1_value: '0' });
  assert.equal(g.lx().session.pool, 200);
  await g.command('!lazyxp end');
  assert.equal(g.attr(hero.id, 'xp').get('current'), 2100);
  assert.match(g.chatText(), /enough XP for level 2/);
});

test('Pathfinder 2E: creature XP from the level difference, level-up at 1000', async () => {
  const g = legacyGame('pathfinder2');
  const a = g.legacyChar('A', 'pathfinder2', { xp: '900', level: '3' });
  g.legacyChar('B', 'pathfinder2', { xp: '0', level: '3' }, { controlledby: 'p2' });
  const ogre = g.legacyChar(
    'Ogre',
    'pathfinder2',
    { sheet_type: 'npc', level: '5' },
    { controlledby: '' }
  );
  const token = g.add('graphic', {
    represents: ogre.id,
    bar1_value: '50',
    _subtype: 'token',
    name: 'Ogre',
  });
  await g.ready();
  // Party level is tracked once a sheet has been read.
  await g.command('!lazyxp show');
  await award(g, 0);
  await g.command('!lazyxp set killMode auto');
  g.lx().characters[a.id].level = 3;
  await g.edit(token, { bar1_value: '0' });
  // A creature two levels above the party is worth 80 XP.
  assert.equal(g.lx().session.pool, 80);
  await g.command('!lazyxp add 120');
  await g.command('!lazyxp end');
  assert.equal(g.attr(a.id, 'xp').get('current'), 1000);
  assert.match(g.chatText(), /level 4/);
  assert.match(g.chatText(), /take 1,000 off/);
});

test('Starfinder: XP and CR from character_level', async () => {
  const g = legacyGame('starfinder');
  g.legacyChar('Hero', 'starfinder', { xp: '0', character_level: '1' });
  const bot = g.legacyChar(
    'Bot',
    'starfinder',
    { sheet_type: 'npc', character_level: '1/3' },
    { controlledby: '' }
  );
  const token = g.add('graphic', {
    represents: bot.id,
    bar1_value: '5',
    _subtype: 'token',
    name: 'Bot',
  });
  await g.ready();
  await g.command('!lazyxp set killMode auto');
  await g.edit(token, { bar1_value: '0' });
  assert.equal(g.lx().session.pool, 135);
});

test('Old-School Essentials: upper-case XP and the Next field', async () => {
  const g = legacyGame('ose');
  const hero = g.legacyChar('Hero', 'ose', { XP: '1900', level: '1', Next: '2000' });
  await g.ready();
  await award(g, 100);
  assert.equal(g.attr(hero.id, 'XP').get('current'), 2000);
  assert.match(g.chatText(), /enough XP for level 2/);
});

test('Dungeon Crawl Classics: level 0 funnel to level 1 at 10 XP', async () => {
  const g = legacyGame('dcc');
  g.legacyChar('Peasant', 'dcc', { xp: '5', level: '0', xp_mod: '' });
  await g.ready();
  await award(g, 5);
  assert.match(g.chatText(), /enough XP for level 1/);
});

test('Dungeon World: level up at level + 7', async () => {
  const g = legacyGame('dungeon world');
  g.legacyChar('Hero', 'dungeon world', { xp: '7', level: '1' });
  await g.ready();
  await award(g, 1);
  assert.match(g.chatText(), /enough XP for level 2/);
  assert.match(g.chatText(), /Spend the XP/);
});

test('WFRP 4E: awards become XP ledger rows', async () => {
  const g = legacyGame('wfrp4');
  const hero = g.legacyChar('Hero', 'wfrp4', { current_xp: '100', spent_xp: '0' });
  await g.ready();
  await award(g, 50);
  const rows = g.sandbox
    .findObjs({ _type: 'attribute', _characterid: hero.id })
    .filter((a) => /^repeating_experience_[-\w]{20}_experience_amount$/.test(a.get('name')));
  assert.equal(rows.length, 1);
  assert.equal(rows[0].get('current'), 50);
  assert.equal(g.attr(hero.id, 'current_xp').get('current'), '100', 'the sheet works this out');
});

test('Shadowrun: karma and total karma both go up', async () => {
  const g = legacyGame('shadowrun5thedition');
  const runner = g.legacyChar('Runner', 'shadowrun5thedition', { karma: '3', 'total karma': '20' });
  await g.ready();
  await award(g, 5);
  assert.equal(g.attr(runner.id, 'karma').get('current'), 8);
  assert.equal(g.attr(runner.id, 'total karma').get('current'), 25);
});

test('Savage Worlds and level-only systems refuse XP but work with milestones', async () => {
  const g = legacyGame('savage worlds');
  const hero = g.legacyChar('Hero', 'savage worlds', { xp: '4', rank: '2', manualAdvance: '' });
  await g.ready();
  await award(g, 5);
  assert.equal(g.attr(hero.id, 'xp').get('current'), '4');
  assert.match(g.chatText(), /does not use XP/);

  const c = legacyGame('13th_age_official');
  c.legacyChar('Hero', '13th_age_official', { level: '2' });
  await c.ready();
  await c.command('!lazyxp set mode milestone');
  await c.command('!lazyxp milestone');
  assert.match(c.chatText(), /reaches level 3/);
});

test('custom level table drives notices for custom sheets', async () => {
  const g = legacyGame('homebrew');
  const hero = g.legacyChar('Hero', 'homebrew', { renown: '90', rank: '1' });
  await g.ready();
  await g.command('!lazyxp set system custom');
  await g.command('!lazyxp set customXp renown');
  await g.command('!lazyxp set customLevel rank');
  await g.command('!lazyxp set customLevels 0,100,250');
  await award(g, 20);
  assert.equal(g.attr(hero.id, 'renown').get('current'), 110);
  assert.match(g.chatText(), /enough XP for level 2/);
});
