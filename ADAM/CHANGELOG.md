# A.D.A.M. Changelog

## 1.0.0 — 4 June 2026

Initial release.

### Features

- Directional token movement (`!adam --move <direction>`) for all 8 compass directions.
- Token facing/rotation without movement (`!adam --face <direction>`).
- Token state management (`!adam --state <state>`): idle, combat, walk, dash, sneak, rage, spellcasting, help.
- Action alias (`!adam --action <action>`) maps common action names to states.
- Whispered control deck menu (`!adam --menu`) with clickable direction and state buttons.
- Animated token profile support — maps state + facing direction to rollable token side numbers.
- In-chat profile management: `create`, `edit-side`, `rename`, `delete`, `assign`, `remove`, `list`, `show`.
- Profile creation modes: `gm-only` (default), `gm-approved` (draft/review/approve/reject workflow), `all-users`.
- GM configuration (`!adam --config`) for grid size, move distance, auto-facing, humour, language, and profile creation mode.
- Easter eggs: movement pattern detection, state spam responses, escalating no-token messages.
- SIMON easter egg alias (`!simon says <command>`) with "...and don't call me Simon!" response.
- `!adam --help`, `!adam --version`, `!adam --credits`.
- `!adam --install-macro` creates a shared `ADAM-Menu` macro.
- Journal Command Deck compatible — all commands work from journal buttons.
