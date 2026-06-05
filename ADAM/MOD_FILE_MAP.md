# A.D.A.M. File Map

## Root

| File                | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `ADAM.js`           | Generated bundle — paste into Roll20         |
| `script.json`       | Script metadata, version, Roll20 useroptions |
| `package.json`      | npm build config                             |
| `rollup.config.mjs` | Rollup build pipeline                        |
| `README.md`         | User-facing documentation                    |
| `DEVELOPERS.md`     | Contributor guide                            |
| `TESTING.md`        | Manual QA checklist                          |
| `CHANGELOG.md`      | Version history                              |
| `MOD_FILE_MAP.md`   | This file                                    |

## src/

| File                  | Purpose                                                                |
| --------------------- | ---------------------------------------------------------------------- |
| `index.js`            | Entry point — registers on('ready') and chat handlers                  |
| `constants.js`        | All constants: colours, directions, states, flags                      |
| `messages.js`         | Styled chat card helpers (whisperSender, whisperGM, etc.)              |
| `parsers.js`          | Flag value parsers (string, boolean, integer)                          |
| `state.js`            | Roll20 state init, settings, token states, profiles, player stats      |
| `token.js`            | Token selection and validation from chat message                       |
| `direction.js`        | Direction normalization, pixel deltas, rotation angles, animation sets |
| `movement.js`         | Token movement (left/top pixel updates + auto-face + animation)        |
| `facing.js`           | Token rotation without position change                                 |
| `tokenState.js`       | Token state transitions (idle/combat/walk/etc.) + easter egg tracking  |
| `animation.js`        | Rollable token side switching via animation profiles                   |
| `menu.js`             | Whispered control deck renderer with clickable buttons                 |
| `easter.js`           | Pattern detection and easter egg whispers                              |
| `help.js`             | Help text, version, credits                                            |
| `commands.js`         | !adam command router and !simon alias handler                          |
| `i18n.js`             | Translation lookup (`t()`), locale normalisation, RTL detection        |
| `locales/metadata.js` | Locale definitions, codes, aliases, labels                             |
| `locales/locale/*.js` | Per-locale translation objects (24 locales)                            |

## scripts/

| File               | Purpose                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| `build.mjs`        | Full build entry point — bumps version, runs Rollup, writes both outputs    |
|                    | `npm run build` — auto-bump patch then build                                |
|                    | `npm run build -- 1.1.0` — set explicit version then build                  |
|                    | `npm run watch` — watch mode (no version bump)                              |
| `bump-version.mjs` | Bumps or sets version in `script.json`; syncs `package.json` to match       |
|                    | Invoked by `build.mjs`; also available standalone via `npm run set-version` |
| `sync-locales.mjs` | Translate missing locale keys via Google Translate free API                 |
|                    | `npm run sync-locales` — fill in new/missing keys only                      |
|                    | `npm run regenerate-locales` — retranslate everything                       |

## Versioned Archives

| Directory | Purpose                            |
| --------- | ---------------------------------- |
| `1.0.0/`  | Generated bundle for version 1.0.0 |
