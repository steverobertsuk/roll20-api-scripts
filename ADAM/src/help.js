import { ADAM_VERSION, ADAM_LAST_UPDATED, ALLOWED_STATES, DIRECTIONS } from './constants.js';
import { getSettings } from './state.js';
import { whisperSender } from './messages.js';
import { t } from './i18n.js';

/**
 * Whispers the full help text to the command sender.
 * Help text is in English for all locales — it is technical documentation
 * and command examples that only make sense in English.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
export function showHelp(msg) {
  const { language } = getSettings();

  const helpLines = [
    `<strong>A.D.A.M.</strong> — ${t('info.subtitle', language)} v${ADAM_VERSION}<br>`,
    `<em>${t('info.updatedLabel', language)}: ${ADAM_LAST_UPDATED}</em><br>`,

    '<br><strong>Movement</strong><br>',
    `<code>!adam --move &lt;direction&gt;</code> — Move selected token one step.<br>`,
    `<em>Directions: ${DIRECTIONS.join(', ')} (or full names: north, northeast, etc.)</em><br>`,

    '<br><strong>Facing</strong><br>',
    `<code>!adam --face &lt;direction&gt;</code> — Rotate token without moving.<br>`,

    '<br><strong>State</strong><br>',
    `<code>!adam --state &lt;state&gt;</code> — Set token movement/action state.<br>`,
    `<em>States: ${ALLOWED_STATES.join(', ')}</em><br>`,

    '<br><strong>Action</strong><br>',
    `<code>!adam --action &lt;action&gt;</code> — Alias for state. Also accepts: spellcast, mage-hand.<br>`,

    '<br><strong>Menu</strong><br>',
    `<code>!adam --menu</code> — Open the A.D.A.M. control deck for the selected token.<br>`,

    '<br><strong>Configuration (GM)</strong><br>',
    `<code>!adam --config</code> — Show current settings.<br>`,
    `<code>!adam --config grid-size &lt;n&gt;</code> — Pixels per grid square (default: 70).<br>`,
    `<code>!adam --config move-distance &lt;n&gt;</code> — Squares per move step (default: 1).<br>`,
    `<code>!adam --config auto-face &lt;on|off&gt;</code> — Rotate token on move (default: on).<br>`,
    `<code>!adam --config humour &lt;on|off&gt;</code> — Enable easter egg responses (default: on).<br>`,
    `<code>!adam --config language &lt;locale&gt;</code> — Set output language (e.g. fr, de, ja).<br>`,
    `<code>!adam --config profile-creation-mode &lt;mode&gt;</code> — Set who can create profiles: <code>gm-only</code> (default), <code>gm-approved</code>, <code>all-users</code>.<br>`,
    `<code>!adam --config reset</code> — Reset all settings to factory defaults.<br>`,

    '<br><strong>Animated Token Profiles</strong><br>',
    `<em>Profiles map token state + facing direction to rollable token side numbers.</em><br>`,
    `<code>!adam --profile list</code> — List all configured profiles.<br>`,
    `<code>!adam --profile show</code> — Show profile assigned to selected token.<br>`,
    `<code>!adam --profile create &lt;id&gt; &lt;displayName&gt;</code> — Create a new empty profile.<br>`,
    `<code>!adam --profile edit-side &lt;id&gt; &lt;state&gt; &lt;north|south&gt; &lt;n&gt;</code> — Set a side mapping in a profile.<br>`,
    `<code>!adam --profile rename &lt;id&gt; &lt;name&gt;</code> — Rename a profile.<br>`,
    `<code>!adam --profile delete &lt;id&gt;</code> — Delete a profile.<br>`,
    `<code>!adam --profile assign &lt;id&gt;</code> — Assign profile to selected token.<br>`,
    `<code>!adam --profile remove</code> — Remove profile assignment from selected token.<br>`,
    '<br><em>GM-Approved mode draft workflow:</em><br>',
    `<code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> — Submit a profile draft for GM review.<br>`,
    `<code>!adam --profile draft-side &lt;id&gt; &lt;state&gt; &lt;north|south&gt; &lt;n&gt;</code> — Add a side mapping to a draft.<br>`,
    `<code>!adam --profile review</code> — List pending drafts (GM only).<br>`,
    `<code>!adam --profile approve &lt;id&gt;</code> — Approve a draft (GM only).<br>`,
    `<code>!adam --profile reject &lt;id&gt;</code> — Reject a draft (GM only).<br>`,

    '<br><strong>Info</strong><br>',
    `<code>!adam --version</code> — Show version info.<br>`,
    `<code>!adam --credits</code> — Show credits.<br>`,
    `<code>!adam --help</code> — Show this help message.<br>`,
    `<code>!adam --install-macro</code> — Install the ADAM-Menu macro (GM only).<br>`,

    '<br><strong>Easter Egg Alias</strong><br>',
    `<code>!simon says move &lt;direction&gt;</code> — Equivalent to <code>!adam --move</code>.<br>`,
    `<code>!simon says state &lt;state&gt;</code> — Equivalent to <code>!adam --state</code>.<br>`,
    `<code>!simon says face &lt;direction&gt;</code> — Equivalent to <code>!adam --face</code>.<br>`,
    `<code>!simon says action &lt;action&gt;</code> — Equivalent to <code>!adam --action</code>.<br>`,

    '<br><strong>Journal Command Deck</strong><br>',
    `<em>Use Roll20 journal entries as control panels. Example button commands:</em><br>`,
    `<code>!adam --move n</code><br>`,
    `<code>!adam --move nw</code><br>`,
    `<code>!adam --menu</code><br>`,
  ];

  whisperSender(msg, helpLines.join(''), t('titles.adamsHelp', language), 'left');
}

/**
 * Whispers version information to the command sender.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
export function showVersion(msg) {
  const { language } = getSettings();
  whisperSender(
    msg,
    `<strong>A.D.A.M.</strong> — ${t('info.subtitle', language)}<br><br>${t('info.versionLabel', language)}: ${ADAM_VERSION}<br>${t('info.updatedLabel', language)}: ${ADAM_LAST_UPDATED}`,
    t('titles.versionInfo', language)
  );
}

/**
 * Whispers credits to the command sender.
 *
 * @param {object} msg Roll20 chat message object.
 * @returns {void}
 */
export function showCredits(msg) {
  const { language } = getSettings();
  whisperSender(msg, t('info.creditsBody', language), t('titles.creditsTitle', language));
}
