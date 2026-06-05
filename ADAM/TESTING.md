# A.D.A.M. Testing Checklist

## Baseline

- [ ] Script ready whisper appears in GM chat on sandbox start.
- [ ] `!adam --help` whispers help to sender.
- [ ] `!adam --version` whispers version info.
- [ ] `!adam --credits` whispers credits.

## Movement

- [ ] Select a token, run `!adam --move n` — token moves north by 70px.
- [ ] `!adam --move ne` — token moves northeast (diagonal).
- [ ] `!adam --move south` — long-form direction accepted.
- [ ] `!adam --move northwest` — long-form diagonal accepted.
- [ ] No token selected → error whispered privately; no public chat output.
- [ ] After move, token rotation updates to face direction (auto-face on).
- [ ] `!adam --config auto-face off`, then move — rotation does not change.
- [ ] `!adam --config move-distance 2` — token moves 140px per step.
- [ ] `!adam --config grid-size 100` — token moves 100px per step at distance 1.
- [ ] `!adam --move xyz` — error whispered for invalid direction.

## Facing

- [ ] `!adam --face n` — token rotation set to 0°.
- [ ] `!adam --face se` — token rotation set to 135°.
- [ ] `!adam --face w` — token rotation set to −90°.
- [ ] Facing does not move the token.
- [ ] Confirmation whispered to sender.

## State

- [ ] `!adam --state idle` — state set, confirmation whispered.
- [ ] `!adam --state combat` — state set.
- [ ] `!adam --state rage` — state set.
- [ ] `!adam --state invalid` — error whispered.
- [ ] `!adam --action spellcast` → state `spellcasting` applied.
- [ ] `!adam --action help` → state `help` applied.
- [ ] `!adam --action mage-hand` → state `spellcasting` applied.

## Menu

- [ ] `!adam --menu` whispers the control deck to sender.
- [ ] Menu shows correct token name, state, and facing.
- [ ] Clicking a movement button in the menu moves the token.
- [ ] Current state button is visually highlighted (teal background).

## Configuration

- [ ] `!adam --config` whispers current settings.
- [ ] Player (non-GM) cannot change config — access denied whispered.
- [ ] `!adam --config humour off` then re-test easter eggs — no responses sent.
- [ ] `!adam --config language fr` → confirmation whispered in French; subsequent output uses French.
- [ ] `!adam --config language invalid` → error whispered; language unchanged.
- [ ] `!adam --config profile-creation-mode all-users` → success whispered; setting shown in config card.
- [ ] `!adam --config profile-creation-mode bad-value` → error whispered.
- [ ] `!adam --config reset` restores all defaults, shows updated settings.

## Profiles

**Prerequisites:** Start with `!adam --config profile-creation-mode all-users` so players can also create profiles during these tests. Restore to `gm-only` when done.

### Listing and showing

- [ ] `!adam --profile list` with no profiles → "No profiles configured."
- [ ] `!adam --profile show` with no profile assigned to selected token → "No profile assigned."

### Creating

- [ ] `!adam --profile create rogue Rogue` → success whispered; profile appears in `--profile list`.
- [ ] `!adam --profile create rogue` (again) → "profile already exists" error.
- [ ] `!adam --profile create invalid id!` (ID with spaces/special chars) → invalid ID error.

### Editing sides

- [ ] `!adam --profile edit-side rogue idle north 1` → success whispered.
- [ ] `!adam --profile edit-side rogue idle south 2` → success whispered.
- [ ] `!adam --profile edit-side rogue InvalidState north 1` → invalid state error.
- [ ] `!adam --profile edit-side rogue idle north 0` → invalid side number error.
- [ ] `!adam --profile edit-side nonexistent idle north 1` → profile not found error.

### Renaming and deleting

- [ ] `!adam --profile rename rogue Rogue v2` → success; new name appears in `--profile list`.
- [ ] `!adam --profile delete rogue` → success; profile no longer in `--profile list`.
- [ ] `!adam --profile delete nonexistent` → error whispered.

### Assigning and removing

- [ ] Select a token, `!adam --profile assign rogue` → success whispered; `--profile show` displays profile.
- [ ] `!adam --profile assign nonexistent` → error whispered.
- [ ] `!adam --profile remove` → success whispered; `--profile show` shows no profile.
- [ ] Player (non-GM, `gm-only` mode) cannot assign a global profile — access denied whispered.
- [ ] Player (non-GM) without token control cannot assign — access denied whispered.
- [ ] Profile ID/display name containing HTML characters (e.g. `<script>`) is escaped safely in output.

### Draft workflow (gm-approved mode)

- [ ] Set `!adam --config profile-creation-mode gm-approved`.
- [ ] Player: `!adam --profile draft archer Archer` → success; GM receives draft notification.
- [ ] Player: `!adam --profile draft-side archer idle north 1` → success.
- [ ] Player: `!adam --profile draft archer` again (same player) → updates draft, re-notifies GM.
- [ ] Different player: `!adam --profile draft archer` → "draft conflict" error.
- [ ] GM: `!adam --profile review` → pending drafts listed.
- [ ] GM: `!adam --profile approve archer` → draft becomes active profile; player is set as owner.
- [ ] GM: `!adam --profile approve archer` (already approved) → "profile already exists" error.
- [ ] GM: `!adam --profile reject archer` (on a new draft) → draft deleted; success whispered.
- [ ] Player: `!adam --profile draft` in `gm-only` mode → "not gm-approved mode" error.

### Profile creation mode gating

- [ ] `gm-only` mode: player `!adam --profile create` → access denied.
- [ ] `gm-approved` mode: player `!adam --profile create` → "use draft instead" error.
- [ ] `all-users` mode: player `!adam --profile create` → succeeds.

## Easter Eggs (humour on)

- [ ] Move west twice → "To the left, to the left..." whispered.
- [ ] Move N → E → S → W → "not actually going anywhere" whispered.
- [ ] Move E → W → E → W → "Are we there yet?" whispered.
- [ ] Sneak 10 consecutive times → "Nobody has seen you." × 3 whispered.
- [ ] Help action 3 times → "Who's a good owl?" whispered.
- [ ] Set state to rage twice in a row → "Dorn would approve." whispered.
- [ ] No token selected: first 19 times → standard message.
- [ ] 20th time → "Still no token selected."
- [ ] 100th time → "I admire your persistence."

## SIMON Alias

- [ ] `!simon says move n` — moves token, then "...and don't call me Simon!" whispered.
- [ ] `!simon says state combat` — sets state, then easter egg whispered.
- [ ] `!simon says face sw` — sets facing, then easter egg whispered.
- [ ] `!simon says action rage` — sets state rage, then easter egg whispered.
- [ ] `!simon move n` (without "says") → "Simon says what?" whispered.
- [ ] `!simon` alone → "Simon says what?" whispered.
- [ ] `!simon says xyz` → unknown command error whispered, no easter egg.

## Macro Install

- [ ] `!adam --install-macro` creates `ADAM-Menu` macro visible to all.
- [ ] Running install again → "macro already exists" error.
- [ ] Player (non-GM) cannot install macro — access denied whispered.

## Journal Command Deck Integration

- [ ] Create a journal with `[Move N](!adam --move n)` — clicking it moves selected token.
- [ ] Create a journal with `[Menu](!adam --menu)` — clicking it opens control deck.
- [ ] All direction buttons work from journal.
- [ ] All state buttons work from journal.
