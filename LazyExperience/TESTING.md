# LazyExperience — Testing Guide

## Automated tests

```bash
npm run build -- --no-bump
npm test
```

`tests/lazyexperience.test.mjs` covers:

- commands and aliases
- the split (absent share, bonus, extra shares, remainder)
- payout modes, undo and the Roll20 party
- defeats (bar, linked attribute, marker, TokenMod, DeathTracker, prompt and automatic modes)
- level-ups and milestones
- the D&D 2024 and 2014 sheets, sandbox 1.0, migration from 0.1.14, settings, One-Click options, escaping and every card

`tests/systems.test.mjs` covers each game-system profile.

The tests run against a stubbed Roll20 API. Beacon sheets are faked, so check the live list below in a real game before release.

## Test game

**Mod Test Lab - LazyExperience** (22183309) is a copy of Mod Test Lab: Jumpgate, Mod sandbox v1.5, D&D Fifth Edition (2024) sheet. It has four 2024 PCs, one of them (Seraphina) controlled by Test Player, and 2024 monsters (Goblin Warrior, Ogre, Lich and others). TokenMod is installed. The build is installed as the Mod script "LazyExperience v1 Test".

The tests were driven with the playwright-tests harness on copied browser profiles (GM and Test Player).

## Live results — 4 November 2026, Jumpgate, sandbox v1.5

| #   | Check                                                                                                                  | Result |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Startup line, GM greeting listing `!lazyxp !lazyexperience !xp`, TokenMod observed                                     | Pass   |
| 2   | `!xp` alias active when no other XP Mod is installed                                                                   | Pass   |
| 3   | Roll20 party (Party Member ticked by API and in the character window) is the roster                                    | Pass   |
| 4   | TokenMod `--set bar1_value\|0` on an Ogre: prompt with 450 XP read from the 2024 sheet's `npc_xp`                      | Pass   |
| 5   | HP set to 0 from the client (as a GM bar edit): prompt for Goblin 1 with 50 XP                                         | Pass   |
| 6   | `dead` marker put on from the client: prompt for Goblin 2                                                              | Pass   |
| 7   | Prompt buttons: Add, Other Amount (Roll20 query, answered 75) and Ignore                                               | Pass   |
| 8   | End Session from the menu button (Yes/No query) and by command                                                         | Pass   |
| 9   | 2024 sheets written with `setSheetItem`: Kildrak 1 → 226 → 326 → 393; the sheet shows "Exp: 326/300"                   | Pass   |
| 10  | Level-up notices at 300 XP for both PCs, once each, with the sheet's Level Up hint                                     | Pass   |
| 11  | Absent (Atala unchanged), bonus 30 for Kildrak, Seraphina added with `party add` and paid; 1 XP remainder carried over | Pass   |
| 12  | Session Log handout made and updated, newest session first                                                             | Pass   |
| 13  | Test Player sees the public summary and a whisper with Seraphina's XP and total                                        | Pass   |
| 14  | Milestone mode: `milestone --ids` announces level 2, `add` is refused, the menu shows levels                           | Pass   |
| 15  | Help and Command Deck handouts and the menu, Party, settings and status cards render in the chat panel                 | Pass   |
| 16  | German chat cards and menu; Hebrew Help handout reads right to left                                                    | Pass   |

## Translations

The 23 translations were written by Claude (Google Translate refused the sync with HTTP 429) and checked by script against en-US: same keys and list lengths, every `{placeholder}` and command kept, and no characters that would break a Roll20 query. The few strings still identical to English are words that are the same in that language (Session, Version, Menu, Status) or names kept on purpose (Mod sandbox). They have not been proofread by native speakers.

## Found live and fixed

- The Party card's three buttons wrapped beside each name in the narrow chat panel. They now sit on a line under the name.
- Game-system labels with commas would split the settings card's Roll20 query options. They're now cleaned.

## Platform facts found while testing

- `setSheetItem(id, 'experience', 0)` is ignored by the 2024 sheet, so a Mod can't take a 2024 character back to 0 XP. LazyExperience warns instead.
- `setComputed` didn't change `experience`.
- `npc_xp` on the 2024 sheet can be text ("33000 or 41000 in lair") or "---" on PCs.
- The computed `npc` flag is 0 even for monsters. LazyExperience goes by who controls the character instead.

## Not yet tested live

- D&D 2014, Shaped, Pathfinder, Starfinder and the other legacy-sheet profiles. Field names were checked against the Roll20 sheet sources, and the internal sheet names are matched loosely and by attributes. Each needs a game with that sheet.
- DeathTracker 1.0's `onStatusChange` (DeathTracker 1.0 is still being written).
- Upgrading a live game that has 0.1.14 state (covered by tests only).
- Mod sandbox v1.0 with the 2024 sheet (covered by tests only).
- Legacy (non-Jumpgate) engine.
- One-Click install options.

## Manual checklist for other sheets

1. Make a game with the sheet, two PCs controlled by players and one monster.
2. `!lazyxp status`: the expected game system is listed.
3. `!lazyxp add 100`, `!lazyxp end`: each PC's XP field goes up by 50.
4. Drop the monster's HP bar to 0: the prompt shows its XP (or asks for an amount).
5. Give enough XP to pass a level: one notice per character.
