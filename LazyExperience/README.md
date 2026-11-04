# LazyExperience

LazyExperience collects the experience points (XP) a party earns during a session, splits them fairly and writes them to the character sheets. It works with the D&D 2024 sheet and many other sheets.

- **Any sheet.** It reads and writes the D&D 5E 2024 (Beacon) sheet, the 2014 sheet, 5e Shaped, Pathfinder 1E and 2E, Starfinder, Old-School Essentials, Dungeon Crawl Classics, Dungeon World, WFRP 4E (XP ledger), Shadowrun (karma) and Cypher. Other sheets work through common field names, or fields you name yourself.
- **Roll20's own party.** Characters ticked as **Party Member** share the XP. Without a party, the characters controlled by players do.
- **Defeated creatures.** A creature dropping to 0 HP, getting the defeated marker, or being marked dead by DeathTracker adds its XP to the session. By default you're asked first. The XP comes from the sheet's XP value or challenge rating.
- **Fair splits.** Absent players can get nothing or part of a share, and characters can have their own share. There's bonus XP for one character and extra shares for companions. XP that doesn't divide evenly carries over to the next session.
- **Two ways to pay.** XP can be paid at the end of the session (the default) or straight away.
- **Level-ups** are announced when a character has enough XP. **Milestone mode** announces levels without tracking XP.
- **Session Log handout.** Every session is recorded, newest first.
- Help and Command Deck handouts, in 24 languages.

## Quick start

1. Install LazyExperience. A **LazyExperience - Help** and a **LazyExperience - Command Deck** handout appear in the journal.
2. In Jumpgate, tick **Party Member** on each player character (open the character, then its settings). You can also select their tokens and use **Add Selected to Party** on the Party card. Without a party, every character controlled by a player shares the XP.
3. Type `!lazyxp` to open the menu.
4. When a creature's HP bar reaches 0, you are asked whether to add its XP. You can also select defeated tokens and press **Defeated: Selected**.
5. Use **Add XP** for anything else (quests, role-play), and **Bonus: Selected** for one character.
6. Mark players who missed the session as **Absent**.
7. Press **End Session**. Each character's XP is written to their sheet, announced, whispered to its player and added to the **LazyExperience - Session Log** handout.

## Commands

Every command starts with `!lazyxp`. `!lazyexperience` also works, and so does `!xp` unless EasyExperience or ExperienceTracker is installed (both use it). Only the GM can use the commands. Other Mods, such as ScriptCards, can send them too.

Commands for characters use the selected tokens, or `--ids` followed by character or token IDs separated by commas.

| Command                               | What it does                                                         |
| ------------------------------------- | -------------------------------------------------------------------- |
| `!lazyxp`                             | Main menu.                                                           |
| `!lazyxp add <xp> [reason]`           | Add XP to the session.                                               |
| `!lazyxp bonus <xp> [reason] [--ids]` | Bonus XP for the selected characters, on top of their share.         |
| `!lazyxp give <xp> [reason] [--ids]`  | Pay XP to the selected characters now. A negative amount corrects.   |
| `!lazyxp kill [--xp <n>]`             | Count the selected tokens as defeated and add their XP.              |
| `!lazyxp kill confirm <token> [xp]`   | Add a defeated creature's XP (the prompt's buttons).                 |
| `!lazyxp absent` / `present`          | Mark the selected characters absent (this session) or present.       |
| `!lazyxp share <n>`                   | Give the selected characters a different share, such as 0.5.         |
| `!lazyxp exclude` / `include`         | Leave characters out of the party, or include them again.            |
| `!lazyxp undo`                        | Take back the last award that hasn't been paid.                      |
| `!lazyxp end`                         | End the session: pay, announce and log.                              |
| `!lazyxp reset session`               | Clear the session XP without paying it.                              |
| `!lazyxp milestone [--ids]`           | Raise the party (or the chosen characters) by one level.             |
| `!lazyxp show`                        | Each party member's XP and level from the sheet, and the next level. |
| `!lazyxp roster`                      | The Party card: who shares, shares, absence.                         |
| `!lazyxp party add` / `remove`        | Tick or untick Roll20's Party Member for the selected characters.    |
| `!lazyxp settings`                    | Settings card.                                                       |
| `!lazyxp set <setting> <value>`       | Change a setting.                                                    |
| `!lazyxp lang [code]`                 | Choose the language.                                                 |
| `!lazyxp status`                      | Sandbox, commands and game systems in use.                           |
| `!lazyxp log`                         | Link to the Session Log handout.                                     |
| `!lazyxp journal`                     | Rebuild the handouts.                                                |
| `!lazyxp help`                        | Short help.                                                          |

## Settings

| Setting            | Default    | What it does                                                                                    |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------- |
| `language`         | `en-US`    | Language for chat cards and handouts.                                                           |
| `mode`             | `xp`       | `xp` or `milestone`. Milestones announce levels and award no XP.                                |
| `payout`           | `end`      | `end`: pay when the session ends. `instant`: split and pay every award at once.                 |
| `updateSheets`     | `true`     | Write XP to the sheets. When off, the totals are only announced.                                |
| `system`           | `auto`     | Game-system profile. `auto` picks one per character from its sheet; `custom` uses your fields.  |
| `roster`           | `auto`     | `auto`, `party` (Roll20 party), `players` (characters controlled by players) or `manual`.       |
| `absentShare`      | `0`        | Part of a share an absent character still gets, from 0 to 1 (or 0% to 100%).                    |
| `extraShares`      | `0`        | Shares for companions not on a sheet. Their XP isn't paid to anyone.                            |
| `killMode`         | `prompt`   | `prompt` asks before adding a defeated creature's XP; `auto` adds it; `off` stops watching.     |
| `killBar`          | `true`     | A creature is defeated when its HP bar drops to 0 or below.                                     |
| `hpBar`            | `1`        | The token bar (1, 2 or 3) that holds hit points.                                                |
| `killMarker`       | `true`     | A creature is defeated when the defeated marker goes on.                                        |
| `marker`           | `dead`     | The defeated marker: a built-in name, or a custom marker's name.                                |
| `killDeathTracker` | `true`     | Use DeathTracker 1.0's dead status.                                                             |
| `announce`         | `public`   | Who sees XP awards and the session summary: `public`, `whisper`, `gm` or `off`.                 |
| `levelNotice`      | `public`   | Who sees level-up notices: `public`, `whisper` (player and GM), `gm` or `off`.                  |
| `customXp` …       | (see Help) | With `system custom`: XP, level, creature XP and challenge fields, and an optional level table. |

All settings can also be set on install from the One-Click options.

## Game systems

| System                                            | XP field(s)               | Level-up notice from         | Creature XP from                   |
| ------------------------------------------------- | ------------------------- | ---------------------------- | ---------------------------------- |
| D&D 5E 2024 (Beacon)                              | `experience`              | 5e table; sheet has Level Up | `npc_xp`, else `npc_challenge`     |
| D&D 5E 2014                                       | `experience`              | 5e table                     | `npc_xp`, else `npc_challenge`     |
| 5e Shaped                                         | `xp`                      | 5e table                     | `xp`, else `challenge`             |
| Pathfinder 1E                                     | `xp`                      | `xp_max`                     | `xp`, else `npc_cr`                |
| Pathfinder 1E Community                           | `experience`              | `experience_max`             | `npc-xp`, else `npc-cr`            |
| Pathfinder 2E                                     | `xp`                      | 1,000 XP                     | creature level vs party level      |
| Starfinder                                        | `xp`                      | `xp_max`                     | `xp`, else CR in `character_level` |
| Old-School Essentials                             | `XP`                      | `Next`                       | `XP`                               |
| Dungeon Crawl Classics                            | `xp`                      | DCC table (level 0 funnel)   | `xp`                               |
| Dungeon World                                     | `xp`                      | level + 7                    | —                                  |
| WFRP 4E                                           | new XP ledger row         | —                            | —                                  |
| Shadowrun 5E / 6E                                 | `karma` and total karma   | —                            | —                                  |
| Cypher System                                     | `xp`                      | —                            | —                                  |
| Savage Worlds, 13th Age, Cosmere, Call of Cthulhu | none (use milestones)     | —                            | —                                  |
| Any other sheet                                   | `experience`, `xp`, `exp` | custom level table           | `npc_xp`, `xp`, CR                 |

The D&D 2024 sheet was tested in Roll20. The others were checked against the sheets' source code. Beacon sheets such as D&D 2024 need **Mod sandbox v1.5** and can't be set to 0 XP by a Mod.

## Upgrading from 0.1

Settings, session XP and each character's extra XP are brought across the first time 1.0 starts. Players or characters that weren't active are left out of the party. A custom command name keeps working, and so do the old subcommands: `add session <xp>`, `add <characterid> <xp>`, `end`, `resetxp`, `config`, `refresh`.

## For other Mods

`LazyExperience.addToPool(xp, reason)`, `award(character, xp, reason)`, `give(character, xp)`, `recordKill(token, xp?)`, `confirmKill(tokenId, xp?)`, `getSession()`, `getSystem(character)`, `onAward(fn)` and `onLevelUp(fn)`.

## Credits

Created by [Robin Kuiper](https://app.roll20.net/users/1226016/robin) ([GitHub](https://github.com/RobinKuiper/Roll20APIScripts), [Patreon](https://www.patreon.com/robinkuiper)), with bug fixes by The Aaron. Rewritten and maintained by [MidNiteShadow7](https://app.roll20.net/users/16506286/midniteshadow7) ([GitHub](https://github.com/steverobertsuk)).
