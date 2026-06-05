# A.D.A.M.

**Animated Direction And Movement**

A Roll20 API mod for directional token movement, token facing, movement states, and optional animated token side switching via rollable table tokens.

---

## Quick Start

1. Select a token on the map.
2. Use a command or click a journal button.

```text
!adam --move n
!adam --move northeast
!adam --face sw
!adam --state combat
!adam --menu
!adam --help
```

---

## Commands

### Movement

```text
!adam --move <direction>
```

Moves the selected token one step in the given direction.

Supported directions: `n`, `ne`, `e`, `se`, `s`, `sw`, `w`, `nw`  
Long forms also accepted: `north`, `northeast`, `east`, etc.

### Facing

```text
!adam --face <direction>
```

Rotates the token to face the given direction without moving it.

### State

```text
!adam --state <state>
```

Sets the token's movement or action state.

Available states: `idle`, `combat`, `walk`, `dash`, `sneak`, `rage`, `spellcasting`, `help`

### Action

```text
!adam --action <action>
```

Alias for `--state`. Accepts additional action names: `spellcast`, `mage-hand`.

### Menu

```text
!adam --menu
```

Opens a whispered control deck for the selected token with clickable movement, facing, and state buttons.

### Info

```text
!adam --help
!adam --version
!adam --credits
```

### Configuration (GM only)

```text
!adam --config
!adam --config grid-size 70
!adam --config move-distance 1
!adam --config auto-face on
!adam --config humour on
!adam --config language en-US
!adam --config profile-creation-mode gm-only
!adam --config reset
```

| Setting                 | Default | Description                                                     |
| ----------------------- | ------- | --------------------------------------------------------------- |
| `grid-size`             | 70      | Pixels per grid square                                          |
| `move-distance`         | 1       | Squares per move step                                           |
| `auto-face`             | on      | Rotate token toward movement direction                          |
| `humour`                | on      | Enable easter egg responses                                     |
| `language`              | en-US   | Chat output locale (see `!adam --help` for list)                |
| `profile-creation-mode` | gm-only | Who can create profiles (`gm-only`, `gm-approved`, `all-users`) |

#### Profile creation modes

| Mode          | Who can create profiles                                   |
| ------------- | --------------------------------------------------------- |
| `gm-only`     | GM only, via `!adam --profile create` or the API console  |
| `gm-approved` | Players submit drafts; GM reviews with `approve`/`reject` |
| `all-users`   | Any player can create and self-assign their own profiles  |

### Animated Token Profiles

A profile maps token states and facing directions to rollable token side numbers. Profiles are managed entirely in-chat.

#### Viewing

```text
!adam --profile list
!adam --profile show
```

#### Creating and editing (GM, or players in `all-users` mode)

```text
!adam --profile create <id> [displayName]
!adam --profile edit-side <id> <state> <north|south> <sideNumber>
!adam --profile rename <id> <newName>
!adam --profile delete <id>
```

**Example — building a rogue profile:**

```text
!adam --profile create rogue Rogue
!adam --profile edit-side rogue idle north 1
!adam --profile edit-side rogue idle south 2
!adam --profile edit-side rogue walk north 3
!adam --profile edit-side rogue walk south 4
```

#### Assigning and removing

```text
!adam --profile assign <id>
!adam --profile remove
```

Select a token first. In `gm-only` and `gm-approved` modes, players may only assign profiles they own. In `all-users` mode, players may also assign global (GM-created) profiles.

#### Draft workflow (`gm-approved` mode only)

Players submit drafts; GMs review and publish them.

```text
!adam --profile draft <id> [displayName]
!adam --profile draft-side <id> <state> <north|south> <sideNumber>
!adam --profile review
!adam --profile approve <id>
!adam --profile reject <id>
```

Side numbers are 1-based (matching Roll20's rollable table display). If A.D.A.M. cannot move a token to a requested side (e.g. because the profile value is out of range or not a whole number), it silently skips the side switch and continues with movement and state tracking.

---

## Journal Command Deck

Use a Roll20 journal entry as a visual control panel. Create a table with buttons:

| NW  | N    | NE  |
| --- | ---- | --- |
| W   | Menu | E   |
| SW  | S    | SE  |

Each button links to an API command:

```text
!adam --move nw
!adam --move n
!adam --move ne
!adam --move w
!adam --menu
!adam --move e
!adam --move sw
!adam --move s
!adam --move se
```

---

## Easter Egg Alias

```text
!simon says move n
!simon says state combat
!simon says face sw
!simon says action rage
```

Executes the equivalent `!adam` command, then whispers:

> ...and don't call me Simon!

Humour responses can be disabled with `!adam --config humour off`.

---

## Design Philosophy

- Journals provide the UI. A.D.A.M. provides the functionality.
- Commands work from journals, chat, macros, token actions, and other mods.
- Animated token support is optional — the mod works with any token.
- Errors and confirmations are whispered privately.
- Public chat output is avoided.
