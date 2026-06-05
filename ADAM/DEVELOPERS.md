# A.D.A.M. Developer Guide

## What You Need

- Node.js 24.x LTS (recommended)
- npm (comes with Node.js)
- Git
- VS Code (recommended)

## Project Layout

- `src/` — source modules (edit these).
- `ADAM.js` — generated bundle (do not edit directly).
- `1.0.0/ADAM.js` — versioned generated bundle.
- `script.json` — script metadata and version.
- `package.json` — dev dependencies and build scripts.
- `rollup.config.mjs` — Rollup build configuration.

## First-Time Setup

From the `ADAM/` directory:

```bash
npm install
```

## Updating the Version

Update `CHANGELOG.md`, then run the build. Version bumping is part of the build command:

```bash
npm run build              # auto-bump patch (1.0.0 → 1.0.1), then build
npm run build -- 1.1.0    # set explicit version, then build
```

To update the version without building (e.g. to stage a release):

```bash
npm run set-version             # auto-bump patch only
npm run set-version -- 1.1.0   # set explicit version only
```

Both commands keep `script.json` and `package.json` in sync automatically.

## Build Commands

```bash
npm run build              # bump version + one-time build
npm run build -- 1.1.0    # set explicit version + build
npm run watch              # rebuild on file save (no version bump)
```

### Build Notes

- Version is bumped before the Rollup config is loaded, so the banner always reflects the new version.
- Outputs are written to `ADAM.js` and `<version>/ADAM.js`.
- Watch mode does **not** auto-bump the version — run `npm run build` or `npm run set-version` first if needed.
- The build does not regenerate locale files.

## Locale Translations

Run `npm run sync-locales` for incremental locale updates or `npm run regenerate-locales` to retranslate everything. Both commands support targeting a single locale with `-- --locale=<code>` or a positional locale argument (for example `npm run sync-locales -- --locale=es` or `npm run regenerate-locales uk`).

Both commands prompt for confirmation before making translation requests. Use `-- --yes` (or `-y`) to skip the prompt in automated/non-interactive runs.

Estimated timing shown before confirmation:

- Sync mode: usually several minutes. Estimated minimum is `4 x number of targeted locales`; estimated maximum is `7 x targeted locales that still need translation`.
- Regenerate mode: `30-60` minutes per targeted locale.

## Source Modules

| File                | Responsibility                                               |
| ------------------- | ------------------------------------------------------------ |
| `src/constants.js`  | All constants, flags, allowed values, direction tables       |
| `src/messages.js`   | Styled chat helpers (whisperSender, whisperGM, etc.)         |
| `src/parsers.js`    | Flag parsing utilities                                       |
| `src/state.js`      | Roll20 state read/write, token state, profiles, player stats |
| `src/token.js`      | Token selection and validation                               |
| `src/direction.js`  | Direction normalization, movement deltas, rotation values    |
| `src/movement.js`   | Token movement (left/top updates + auto-facing)              |
| `src/facing.js`     | Token rotation without movement                              |
| `src/tokenState.js` | Token state updates (idle/combat/walk/etc.)                  |
| `src/animation.js`  | Animated token side switching via profile mappings           |
| `src/menu.js`       | Whispered control deck renderer                              |
| `src/easter.js`     | Easter egg detection and response whispers                   |
| `src/help.js`       | Help text, version, credits                                  |
| `src/commands.js`   | Main command router (!adam and !simon)                       |
| `src/index.js`      | Entry point — on('ready') boot                               |

## Adding a New State

1. Add it to `ALLOWED_STATES` in `src/constants.js`.
2. Add a label to `STATE_LABELS` in `src/menu.js`.
3. Optionally add an action alias in `ACTION_STATE_MAP` in `src/constants.js`.
4. Run `npm run build`.

## Adding a New Easter Egg

1. Add the detection logic in `src/easter.js`.
2. Call the relevant whisper function from the appropriate command handler in `src/commands.js`.
3. Run `npm run build`.

## Adding an Animated Profile

Profiles are managed in-chat using `!adam --profile` subcommands. No console access or code changes are needed.

**Default mode (`gm-only`) — GM creates directly:**

```text
!adam --profile create rogue Rogue
!adam --profile edit-side rogue idle north 1
!adam --profile edit-side rogue idle south 2
!adam --profile edit-side rogue walk north 3
!adam --profile edit-side rogue walk south 4
!adam --profile assign rogue
```

**`gm-approved` mode — player submits, GM approves:**

```text
# Player:
!adam --profile draft rogue Rogue
!adam --profile draft-side rogue idle north 1

# GM:
!adam --profile review
!adam --profile approve rogue
```

**`all-users` mode — players create and assign their own:**

Same as GM workflow above; no GM approval step needed.

Profile structure stored in `state.ADAM.profiles`:

```json
{
  "displayName": "Rogue",
  "ownerId": "player-id-or-null-for-global",
  "states": {
    "idle": { "north": 1, "south": 2 },
    "walk": { "north": 3, "south": 4 },
    "combat": { "north": 5, "south": 6 }
  }
}
```

Side numbers are 1-based. Profiles without `ownerId` are global (GM-created). Profiles with `ownerId` are personal and can only be modified by that player or a GM.

## Typical Workflow

1. Edit files in `src/`.
2. Run `npm run build`.
3. Open `ADAM.js`, copy full content.
4. Paste into Roll20 Mod (API) Scripts panel.
5. Save and restart sandbox.
6. Test with `!adam --help` and `TESTING.md` checklist.
