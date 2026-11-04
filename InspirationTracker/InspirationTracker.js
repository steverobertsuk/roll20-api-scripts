/**
 * NOTE: GENERATED FILE - DO NOT EDIT DIRECTLY.
 * NOTE: Source files live under src/ and are bundled with `npm run build`.
 * ------------------------------------------------
 * Name: InspirationTracker
 * Script: InspirationTracker.js
 * Version: 1.0.0
 * Built: 2026-11-04T23:02:24.749Z
 */
const InspirationTrackerMod = (() => {
  'use strict';

  // Build-time placeholders replaced by rollup.config.js inject-build-metadata plugin.
  const SCRIPT_NAME = 'InspirationTracker';
  const SCRIPT_VERSION = '1.0.0';
  const SCRIPT_LAST_UPDATED = '2026-11-04T23:02:24.749Z';

  const DEFAULT_LOCALE$1 = 'en-US';

  const STATE_KEY = 'InspirationTracker';
  const SCHEMA_VERSION = 1;
  const COMMAND = '!inspiration';

  // 0.1.x kept its settings here, including a GM-chosen command name.
  const LEGACY_STATE_KEY = 'INSPIRATIONTRACKER';

  // The player ID Roll20 gives chat messages sent by Mods with sendChat.
  const API_PLAYER_ID = 'API';

  const HANDOUT_HELP_NAME = 'InspirationTracker - Help';
  const HANDOUT_DECK_NAME = 'InspirationTracker - Command Deck';

  // The token action macro players use to spend inspiration.
  const MACRO_NAME = 'Inspiration';

  const AUTHOR_LINKS = {
    original: {
      name: 'Robin Kuiper',
      profile: 'https://app.roll20.net/users/1226016/robin',
      patreon: 'https://www.patreon.com/robinkuiper',
    },
    maintainer: {
      name: 'MidNiteShadow7',
      profile: 'https://app.roll20.net/users/16506286/midniteshadow7',
      github: 'https://github.com/steverobertsuk',
    },
  };

  // Sheet attribute and item names.
  // The 2014 OGL sheet stores a checkbox attribute ("on" when ticked).
  const LEGACY_ATTRIBUTE = 'inspiration';
  // The D&D 2024 (Beacon) sheet exposes a 0/1 sheet item, kept inside the
  // character's `store` attribute.
  const BEACON_ITEM = 'inspiration';
  const BEACON_STORE_ATTRIBUTE = 'store';

  // Rules editions, used for wording and the 2024 pass-on rule.
  const RULES_2014 = '2014';
  const RULES_2024 = '2024';

  // Option lists for settings.
  const WORDING_OPTIONS = ['auto', RULES_2014, RULES_2024];
  const ANNOUNCE_OPTIONS = ['public', 'gm', 'off'];

  // Roll20's built-in coloured dots. They are not listed in the campaign's
  // token marker sets, so they are offered alongside them.
  const COLOUR_MARKERS = ['red', 'blue', 'green', 'brown', 'purple', 'pink', 'yellow'];

  // The D&D 2024 sheet draws its own condition markers; they are left alone.
  const SHEET_MARKER_PREFIX = 'sheet-';

  // Default configuration for new installs. Upgraded 0.1.x games keep their marker
  // and special effect.
  const DEFAULT_CONFIG = {
    language: DEFAULT_LOCALE$1,
    marker: 'black-flag',
    wording: 'auto',
    announce: 'public',
    fx: true,
    fxType: 'nova-holy',
    playerSpend: true,
    playerOverview: false,
    passOn: true,
  };

  // Settings the GM can change on the Mod's page in the API Scripts screen.
  const USEROPTION_KEYS = ['language', 'wording', 'playerOverview'];

  // Settings shown in the settings menu, in order.
  const SETTING_KEYS = [
    'language',
    'marker',
    'wording',
    'announce',
    'fx',
    'fxType',
    'playerSpend',
    'playerOverview',
    'passOn',
  ];

  // Roll20's built-in special effect names ("type-colour").
  const FX_TYPES = [
    'beam',
    'bomb',
    'breath',
    'bubbling',
    'burn',
    'burst',
    'explode',
    'glow',
    'missile',
    'nova',
    'splatter',
  ];
  const FX_COLOURS = [
    'acid',
    'blood',
    'charm',
    'death',
    'fire',
    'frost',
    'holy',
    'magic',
    'slime',
    'smoke',
    'water',
  ];

  // How many spends can be undone, and for how long an offer to pass on
  // Heroic Inspiration stays open.
  const MAX_UNDO = 30;
  const OFFER_LIFETIME_MS = 60 * 60 * 1000;

  // Commands listed by `help` and the Help handout, with their help keys.
  const HELP_COMMANDS = [
    ['', 'menu'],
    ['give', 'give'],
    ['remove', 'remove'],
    ['toggle', 'toggle'],
    ['spend', 'spend'],
    ['party', 'party'],
    ['party add / party remove', 'partyEdit'],
    ['give | remove | toggle | spend --ids <id;id;…>', 'ids'],
    ['undo <id>', 'undo'],
    ['macro', 'macro'],
    ['sync', 'sync'],
    ['set [<setting> <value>]', 'set'],
    ['reset', 'reset'],
    ['status', 'status'],
    ['journal rebuild', 'journal'],
    ['help', 'help'],
  ];

  // Colour palette for chat cards and handouts.
  const COLOR_HEADER_BG = '#2a2140';
  const COLOR_HEADER_TEXT = '#f3eefc';
  const COLOR_CARD_BG_TOP = '#3a2d59';
  const COLOR_CARD_BG_BOTTOM = '#1f1830';
  const COLOR_BORDER = '#5b4a85';
  const COLOR_TEXT = '#ece6f7';
  const COLOR_MUTED = '#b3a8cc';
  const COLOR_ACCENT = '#f2c94c';
  const COLOR_BUTTON_BG = '#6a4fb3';
  const COLOR_BUTTON_TEXT = '#ffffff';
  const COLOR_BUTTON_ALT_BG = '#2f2548';
  const COLOR_BUTTON_ALT_BORDER = '#6d5c99';
  const COLOR_WARNING_BG = '#fef3c7';
  const COLOR_WARNING_BORDER = '#92400e';
  const COLOR_WARNING_TEXT = '#92400e';
  const COLOR_ERROR_BG = '#fee2e2';
  const COLOR_ERROR_BORDER = '#991b1b';
  const COLOR_ERROR_TEXT = '#991b1b';

  // The inspiration icon Robin Kuiper's 0.1.x showed on its chat cards.
  const ICON_URL =
    'https://s3.amazonaws.com/files.d20.io/images/39783029/-w45_4ICV9QnFzijBimwKA/max.png';

  /**
   * Returns true when a value is a plain non-null, non-array object.
   *
   * @param {*} value Value to test.
   * @returns {boolean} True when the value is a record.
   */
  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  /**
   * Converts a value to trimmed text, treating null and undefined as empty.
   *
   * @param {*} value Value to convert.
   * @returns {string} Trimmed string.
   */
  function toText(value) {
    return value === null || value === undefined ? '' : String(value).trim();
  }

  /**
   * Escapes HTML special characters.
   *
   * @param {*} text Text to escape.
   * @returns {string} Escaped text.
   */
  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  /**
   * Parses a yes/no style value.
   *
   * @param {*} raw Raw input.
   * @returns {boolean|null} Parsed boolean, or null when not recognised.
   */
  function parseBoolean(raw) {
    if (typeof raw === 'boolean') {
      return raw;
    }
    const text = toText(raw).toLowerCase();
    if (['on', 'true', 'yes', '1'].includes(text)) {
      return true;
    }
    if (['off', 'false', 'no', '0'].includes(text)) {
      return false;
    }
    return null;
  }

  /**
   * Reads a sheet value as inspired or not. The 2014 OGL sheet stores "on" for a
   * ticked box; the 2024 sheet stores 1. Anything else counts as not inspired.
   *
   * @param {*} value Sheet value.
   * @returns {boolean} True when inspired.
   */
  function isInspiredValue(value) {
    if (typeof value === 'number') {
      return value > 0;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    const text = toText(value).toLowerCase();
    if (['on', 'true', 'yes'].includes(text)) {
      return true;
    }
    const n = Number(text);
    return text !== '' && Number.isFinite(n) && n > 0;
  }

  /**
   * Splits command text into words, keeping "double quoted" phrases together.
   * Quotes are removed; an unterminated quote runs to the end of the text.
   *
   * @param {string} text Command text.
   * @returns {string[]} Words in order.
   */
  function tokenize(text) {
    const words = [];
    const pattern = /"([^"]*)"?|(\S+)/g;
    for (const match of toText(text).matchAll(pattern)) {
      words.push(match[1] === undefined ? match[2] : match[1].trim());
    }
    return words;
  }

  /**
   * Returns true when a graphic is a token (not a card or map image).
   *
   * @param {object} obj Roll20 object.
   * @returns {boolean} True for tokens.
   */
  function isToken(obj) {
    return Boolean(obj) && obj.get('_type') === 'graphic' && obj.get('_subtype') === 'token';
  }

  /**
   * Splits a token's status markers into tags, dropping number badges
   * (`red@2` becomes `red`).
   *
   * @param {*} raw statusmarkers value.
   * @returns {string[]} Marker tags.
   */
  function markerTags(raw) {
    return toText(raw)
      .split(',')
      .map((tag) => tag.split('@')[0].trim())
      .filter(Boolean);
  }

  /**
   * Returns true when a statusmarkers value shows a marker.
   *
   * @param {*} raw statusmarkers value.
   * @param {string} marker Marker tag.
   * @returns {boolean} True when shown.
   */
  function hasMarker(raw, marker) {
    return Boolean(marker) && markerTags(raw).includes(marker);
  }

  /**
   * Adds or removes a status marker, keeping the token's other markers (and
   * their number badges) as they were.
   *
   * @param {object} token Roll20 graphic.
   * @param {string} marker Marker tag.
   * @param {boolean} on Add when true, remove when false.
   * @returns {boolean} True when the token changed.
   */
  function setMarker(token, marker, on) {
    const raw = toText(token.get('statusmarkers'));
    if (!marker || hasMarker(raw, marker) === on) {
      return false;
    }
    const markers = raw.split(',').filter((tag) => tag && tag.split('@')[0] !== marker);
    if (on) {
      markers.push(marker);
    }
    token.set('statusmarkers', markers.join(','));
    return true;
  }

  /**
   * Returns the IDs of every GM in the game.
   *
   * @returns {string[]} GM player IDs.
   */
  function getGmPlayerIds() {
    return findObjs({ _type: 'player' })
      .filter((player) => playerIsGM(player.id))
      .map((player) => player.id);
  }

  /**
   * Returns true when a player may act as GM: a real GM, or another Mod
   * sending commands with sendChat.
   *
   * @param {string} playerId Roll20 player ID.
   * @param {string} apiId The ID Roll20 gives Mod messages.
   * @returns {boolean} True for GMs and Mods.
   */
  function isGmOrMod(playerId, apiId) {
    return playerId === apiId || playerIsGM(playerId);
  }

  /**
   * Makes text safe inside a Roll20 roll query option (`?{Q|label,value}`).
   *
   * @param {string} text Text.
   * @returns {string} Text without the characters that end a query option.
   */
  function queryText(text) {
    return toText(text)
      .replaceAll(/[|,{}]/g, ' ')
      .replaceAll(/\s+/g, ' ')
      .trim();
  }

  /**
   * Returns a short random ID for undo entries and offers.
   *
   * @returns {string} ID.
   */
  function shortId() {
    return Math.random().toString(36).slice(2, 8);
  }

  const CHAT_CARD_STYLE = [
    'width:100%',
    'border-radius:4px',
    'box-shadow:1px 1px 3px rgba(0,0,0,0.4)',
    'text-align:left',
    'margin:2px auto',
    `border:1px solid ${COLOR_BORDER}`,
    `color:${COLOR_TEXT}`,
    `background-image:-webkit-linear-gradient(135deg,${COLOR_CARD_BG_TOP} 0%,${COLOR_CARD_BG_BOTTOM} 100%)`,
    `background-color:${COLOR_CARD_BG_BOTTOM}`,
    'overflow:hidden',
  ].join(';');

  const CHAT_HEADER_STYLE = [
    `background:${COLOR_HEADER_BG}`,
    `color:${COLOR_HEADER_TEXT}`,
    'padding:4px 8px',
    `border-bottom:2px solid ${COLOR_ACCENT}`,
    'font-variant:small-caps',
    'font-weight:bold',
    'font-size:1.05em',
    'text-align:center',
    'letter-spacing:0.05em',
  ].join(';');

  const CHAT_CONTENT_STYLE = 'padding:5px 8px;line-height:1.5';

  const BUTTON_STYLE = [
    `background:${COLOR_BUTTON_BG}`,
    `color:${COLOR_BUTTON_TEXT}`,
    'padding:2px 7px',
    'border-radius:3px',
    'text-decoration:none',
    'font-size:0.9em',
    'display:inline-block',
    'margin:1px 2px',
  ].join(';');

  const BUTTON_SECONDARY_STYLE = [
    `background:${COLOR_BUTTON_ALT_BG}`,
    `color:${COLOR_TEXT}`,
    `border:1px solid ${COLOR_BUTTON_ALT_BORDER}`,
    'padding:2px 7px',
    'border-radius:3px',
    'text-decoration:none',
    'font-size:0.9em',
    'display:inline-block',
    'margin:1px 2px',
  ].join(';');

  const SECTION_LABEL_STYLE = [
    `color:${COLOR_MUTED}`,
    'font-size:0.8em',
    'text-transform:uppercase',
    'letter-spacing:0.08em',
    'margin-top:4px',
    'margin-bottom:2px',
  ].join(';');

  const DIVIDER_STYLE = `border:none;border-top:1px solid ${COLOR_BORDER};margin:4px 0`;

  /**
   * Returns the whisper target for a player, falling back to all GMs.
   *
   * Double quotes are stripped so the name is safe inside /w "name".
   *
   * @param {string} [playerId] Roll20 player ID.
   * @returns {string} Whisper target text.
   */
  function whisperTarget(playerId) {
    const player = playerId ? getObj('player', playerId) : null;
    if (!player) {
      return 'gm';
    }
    return `"${String(player.get('displayname') || playerId).replaceAll('"', '')}"`;
  }

  /**
   * Sends a styled card whispered to a player, or to every GM when no player is given.
   *
   * @param {string|null} playerId Roll20 player ID.
   * @param {string} title Card header text.
   * @param {string|string[]} content HTML body content.
   * @returns {void}
   */
  function whisper(playerId, title, content) {
    const body = Array.isArray(content) ? content.join('') : content;
    sendChat(SCRIPT_NAME, `/w ${whisperTarget(playerId)} ${buildCard(title, body)}`, null, {
      noarchive: true,
    });
  }

  /**
   * Sends the same card to several players, once each.
   *
   * @param {string[]} playerIds Roll20 player IDs.
   * @param {string} title Card header text.
   * @param {string|string[]} content HTML body content.
   * @returns {void}
   */
  function whisperEach(playerIds, title, content) {
    for (const id of new Set(playerIds)) {
      whisper(id, title, content);
    }
  }

  /**
   * Sends a styled card to everyone.
   *
   * @param {string} title Card header text.
   * @param {string} body HTML body content.
   * @returns {void}
   */
  function broadcast(title, body) {
    sendChat(SCRIPT_NAME, buildCard(title, body));
  }

  /**
   * Sends a warning whispered to a player (or every GM).
   *
   * @param {string|null} playerId Roll20 player ID.
   * @param {string} message Warning text.
   * @returns {void}
   */
  function whisperWarning(playerId, message) {
    const style = [
      `background:${COLOR_WARNING_BG}`,
      `color:${COLOR_WARNING_TEXT}`,
      `border:1px solid ${COLOR_WARNING_BORDER}`,
      'padding:4px 8px',
      'border-radius:4px',
      'font-size:0.95em',
    ].join(';');
    const html = `<div style="${style}">${escapeHtml(message)}</div>`;
    sendChat(SCRIPT_NAME, `/w ${whisperTarget(playerId)} ${html}`, null, { noarchive: true });
  }

  /**
   * Sends an error whispered to a player (or every GM).
   *
   * @param {string|null} playerId Roll20 player ID.
   * @param {string} message What went wrong.
   * @param {string} [hint] How to fix it.
   * @returns {void}
   */
  function whisperError(playerId, message, hint) {
    const style = [
      `background:${COLOR_ERROR_BG}`,
      `color:${COLOR_ERROR_TEXT}`,
      `border:1px solid ${COLOR_ERROR_BORDER}`,
      'padding:4px 8px',
      'border-radius:4px',
      'font-size:0.95em',
    ].join(';');
    const hintHtml = hint
      ? `<div style="margin-top:3px;font-size:0.9em">${escapeHtml(hint)}</div>`
      : '';
    const html = `<div style="${style}"><strong>${escapeHtml(message)}</strong>${hintHtml}</div>`;
    sendChat(SCRIPT_NAME, `/w ${whisperTarget(playerId)} ${html}`, null, { noarchive: true });
  }

  /**
   * Builds a styled chat card.
   *
   * @param {string} title Header text (escaped).
   * @param {string} body Body HTML (trusted).
   * @returns {string} HTML string.
   */
  function buildCard(title, body) {
    return [
      `<div style="${CHAT_CARD_STYLE}">`,
      `<div style="${CHAT_HEADER_STYLE}">${escapeHtml(title)}</div>`,
      `<div style="${CHAT_CONTENT_STYLE}">${body}</div>`,
      '</div>',
    ].join('');
  }

  /**
   * Builds a primary action button.
   *
   * @param {string} label Button label.
   * @param {string} command Chat command the button runs.
   * @returns {string} HTML anchor.
   */
  function buildButton(label, command) {
    return `<a href="${escapeHtml(command)}" style="${BUTTON_STYLE}">${escapeHtml(label)}</a>`;
  }

  /**
   * Builds a secondary action button.
   *
   * @param {string} label Button label.
   * @param {string} command Chat command the button runs.
   * @returns {string} HTML anchor.
   */
  function buildSecondaryButton(label, command) {
    return `<a href="${escapeHtml(command)}" style="${BUTTON_SECONDARY_STYLE}">${escapeHtml(label)}</a>`;
  }

  /**
   * Builds a section label.
   *
   * @param {string} text Label text.
   * @returns {string} HTML string.
   */
  function buildSectionLabel(text) {
    return `<div style="${SECTION_LABEL_STYLE}">${escapeHtml(text)}</div>`;
  }

  /**
   * Builds a horizontal divider.
   *
   * @returns {string} HTML string.
   */
  function buildDivider() {
    return `<hr style="${DIVIDER_STYLE}">`;
  }

  /**
   * Builds a label/value row. The value may be trusted HTML (e.g. a button).
   *
   * @param {string} label Label text (escaped).
   * @param {string} valueHtml Value HTML.
   * @returns {string} HTML string.
   */
  function buildRow(label, valueHtml) {
    return [
      '<table style="width:100%;border-collapse:collapse;margin:1px 0"><tr>',
      `<td style="color:${COLOR_MUTED};width:50%;font-size:0.9em">${escapeHtml(label)}</td>`,
      `<td style="text-align:right;width:50%">${valueHtml}</td>`,
      '</tr></table>',
    ].join('');
  }

  const TRANSLATION$n = {};

  const TRANSLATION$m = {};

  const TRANSLATION$l = {};

  const TRANSLATION$k = {};

  const TRANSLATION$j = {};

  const TRANSLATION$i = {};

  const TRANSLATION$h = {
    terms: {
      heroic: 'Heroic Inspiration',
      classic: 'Inspiration',
    },
    titles: {
      ready: 'InspirationTracker is ready.',
      settings: 'InspirationTracker Settings',
      help: 'InspirationTracker Commands',
      party: 'Party Inspiration',
      yours: 'Your Characters',
      status: 'InspirationTracker Status',
    },
    messages: {
      gained: '{name} has {term}!',
      spent: '{name} uses {term}.',
      spentBy: '{player} spent {term} for {name}.',
      spentSheet: '{name} no longer has {term} (changed on the sheet or token).',
      restored: '{name} has {term} back.',
      removed: '{term} taken away from {name}.',
      already: '{name} already has {term}.',
      none: '{name} does not have {term}.',
      busy: '{name} is still being updated. Try again in a moment.',
      passOffer:
        '{name} already has {term} and cannot hold it twice. Give it to a party member who does not have it, or let it go.',
      passNobody: 'Every other party member already has it.',
      passAsked: 'Asked the players of {name} who should get the {term}.',
      passed: '{from} gives {term} to {to}!',
      passAlready: '{to} already has it. Choose someone else.',
      declined: '{name} lets the extra {term} go.',
      undoAlready: '{name} already has it again.',
      synced: 'Sheets read: {checked}. With inspiration: {inspired}.',
      migrated:
        'Settings from version 0.1 were kept: marker, special effect and its type. The new settings start at their defaults.',
      legacyCommand: 'Your old command {command} still works, as well as {main}.',
      macroHint:
        'To give players a Spend button, run {command}. It adds a token action for everyone.',
      macro:
        'The "{name}" macro is ready: players see it as a token action when they select a token they control.',
      journal: 'Help and Command Deck handouts rebuilt.',
      readyHint: 'Type {command} for the menu, or open the Command Deck handout.',
    },
    errors: {
      denied: 'You cannot do that for {name}.',
      gmOnly: 'Only the GM can use that command.',
      gmOnlyHint: 'Players can use spend, party and help.',
      spendOff: 'The GM has turned off spending by players.',
      noCharacter: 'These tokens do not represent a character: {names}.',
      nothingSelected: 'Select a token first.',
      nothingSelectedHint:
        'Select tokens that represent characters, or add --ids with token or character IDs.',
      writeFailed: 'Could not change the sheet of {name}.',
      offerGone: 'That choice has already been made, or it has expired.',
      passInvalid: 'Choose a party member other than the one who has it.',
      undoGone: 'That spend has already been undone, or is too old.',
      unknownMarker: 'There is no token marker called "{value}".',
      unknownMarkerHint: 'Use the Marker button in the settings to pick one from your marker sets.',
      badSetting: 'Cannot set {key} to "{value}".',
      badSettingHint: 'Type !inspiration set to see every setting and its choices.',
      unknownCommand: 'Unknown command: {command}.',
      unknownCommandHint: 'Type !inspiration help for the list of commands.',
    },
    menu: {
      selected: 'Selected tokens',
      party: 'Party',
      tools: 'Tools',
      hint: 'Full instructions are in the "{help}" handout.',
      noSheet: 'no sheet',
      noneYours: 'You do not control any characters with a sheet.',
      partyEmpty: 'You do not control any party members.',
      partyEmptyGm:
        'Nobody is in the party yet. Assign characters to players, or select tokens and click Add to Party.',
      partyCount: '{count} of {total} have {term}.',
    },
    buttons: {
      menu: 'Menu',
      give: 'Give',
      remove: 'Remove',
      toggle: 'Toggle',
      spend: 'Spend',
      party: 'Party',
      partyAdd: 'Add to Party',
      partyRemove: 'Remove from Party',
      settings: 'Settings',
      macro: 'Player Macro',
      sync: 'Sync',
      status: 'Status',
      help: 'Help',
      reset: 'Reset Settings',
      refresh: 'Refresh',
      undo: 'Undo',
      decline: 'Let it go',
    },
    values: {
      on: 'On',
      off: 'Off',
      wording: {
        auto: 'From the sheet',
        2014: 'Inspiration (2014)',
        2024: 'Heroic Inspiration (2024)',
      },
      announce: {
        public: 'Everyone',
        gm: 'GM and owners',
        off: 'Nobody',
      },
    },
    settings: {
      language: {
        label: 'Language',
        desc: 'Language for menus, messages and handouts.',
      },
      marker: {
        label: 'Marker',
        desc: 'Token marker shown while a character has inspiration. Custom marker sets are listed too.',
      },
      wording: {
        label: 'Wording',
        desc: 'Call it Inspiration or Heroic Inspiration. "From the sheet" uses the rules chosen on each D&D 2024 sheet, and Inspiration on the 2014 sheet.',
      },
      announce: {
        label: 'Announce',
        desc: 'Who sees the chat message when inspiration is gained or spent.',
      },
      fx: {
        label: 'Special Effect',
        desc: 'Play a special effect on the token when it gains inspiration.',
      },
      fxType: {
        label: 'Effect Type',
        desc: 'Which effect to play, such as nova-holy, or the ID of a custom effect.',
      },
      playerSpend: {
        label: 'Players Can Spend',
        desc: 'Let players spend inspiration for the characters they control. The GM is told, with an Undo button.',
      },
      playerOverview: {
        label: 'Players See Party',
        desc: 'Let players see who in the party has inspiration.',
      },
      passOn: {
        label: 'Pass On (2024)',
        desc: 'Under the 2024 rules, a character who would gain Heroic Inspiration while having it may give it to another party member.',
      },
    },
    status: {
      version: 'Version',
      beacon: 'D&D 2024 sheets',
      legacy: '2014 sheets',
      none: 'Characters with no inspiration box',
      rules2024: 'Using 2024 rules',
      party: 'Party members',
      marker: 'Marker',
      fx: 'Special effect',
      legacyCommand: 'Old command',
    },
    help: {
      menu: 'Shows the menu. With tokens selected, gives or takes away inspiration, as version 0.1 did.',
      give: 'Gives inspiration to the selected characters.',
      remove: 'Takes inspiration away from the selected characters, without counting it as spent.',
      toggle:
        'Gives inspiration to selected characters without it, and takes it from those with it.',
      spend: 'Spends inspiration for the selected characters and tells the GM.',
      party: 'Shows who in the party has inspiration, with buttons to give, remove or spend it.',
      partyEdit: 'Adds the selected characters to the party, or takes them out.',
      ids: 'Works on the token or character IDs given instead of the selected tokens.',
      undo: 'Gives back inspiration that was spent. The ID comes from the GM message about the spend.',
      macro: 'Adds the "Inspiration" token action, which players click to spend inspiration.',
      sync: 'Reads every sheet again and puts the markers right.',
      set: 'Shows the settings, or changes one.',
      reset: 'Puts every setting back to its default, except the language.',
      status: 'Shows the version, the sheets found and the main settings.',
      journal: 'Rebuilds the Help and Command Deck handouts.',
      help: 'Shows this list.',
    },
    helpPlayer: {
      menu: 'Shows your characters and whether they have inspiration.',
      spend: 'Spends inspiration for the selected character.',
      party: 'Shows the party, if the GM allows it.',
      help: 'Shows this list.',
    },
    handout: {
      versionLabel: 'Version',
      subtitle: 'Inspiration and Heroic Inspiration for the D&D 5e 2014 and 2024 sheets',
      overview: {
        heading: 'Overview',
        body: 'InspirationTracker keeps D&D inspiration on the character sheet, the token and the chat in step. Give it from the menu, the sheet or the token marker, and every token for that character shows the marker. Players can spend it with one click, and the GM is told, with an Undo button. It works with the D&D 2024 sheet, where it is called Heroic Inspiration, and with the 2014 OGL sheet.',
      },
      quickStart: {
        heading: 'Quick Start',
        steps: [
          'Open the Command Deck handout, or type !inspiration for the menu.',
          'Select a token and click Give. The character gains inspiration and its tokens show the marker.',
          'Click Player Macro once, so players get an Inspiration token action to spend it.',
          'Click Party to see who has inspiration.',
        ],
      },
      sheets: {
        heading: 'Character Sheets',
        colSheet: 'Sheet',
        colWhere: 'Where inspiration is kept',
        colSheet2014: 'D&D 5E by Roll20 (2014 OGL)',
        where2014: 'The Inspiration box, attribute "inspiration".',
        colSheet2024: 'D&D Fifth Edition (5E & 5.5E, 2024)',
        where2024:
          'The Heroic Inspiration box, read and written with getSheetItem and setSheetItem.',
        points: [
          'Ticking or clearing the box on a sheet is noticed straight away: the marker follows, and clearing it counts as spending it.',
          'With Wording set to "From the sheet", each D&D 2024 character uses the rules chosen in its sheet settings: 2024 rules say Heroic Inspiration, 2014 rules say Inspiration.',
          'Characters with neither sheet are left alone, so NPC tokens are not changed.',
        ],
      },
      players: {
        heading: 'Players',
        points: [
          'Players can spend inspiration for characters they control: click Spend in chat, or the Inspiration token action.',
          'The GM gets a message saying who spent it, with an Undo button.',
          'Typing !inspiration shows a player their characters and whether they have inspiration.',
          "Turn Players Can Spend off to keep spending in the GM's hands.",
        ],
      },
      passOn: {
        heading: 'Passing It On (2024 Rules)',
        points: [
          'A character cannot have Heroic Inspiration twice. When one who has it would gain it again, their players are asked to give it to another party member who does not have it.',
          'The choice offers every party member without Heroic Inspiration, and Let it go. It expires after an hour.',
          'Under the 2014 rules, the GM is just told that the character already has Inspiration.',
          'Turn Pass On off to always get that message instead.',
        ],
      },
      party: {
        heading: 'The Party',
        points: [
          'The party is every character a player controls. Select tokens and click Add to Party or Remove from Party to change it.',
          "The GM's overview has Give, Remove and Spend buttons for each member.",
          'Turn Players See Party on to let players see the overview too. They get Spend buttons only for their own characters.',
        ],
      },
      markers: {
        heading: 'Token Markers',
        points: [
          "Choose the marker with the Marker setting. Roll20's coloured dots, the default markers and your custom marker sets are listed.",
          'Adding the marker to a token by hand, or with TokenMod, gives the character inspiration. Taking it off spends it.',
          'Changing the marker moves it on every token straight away.',
          "The D&D 2024 sheet's own condition markers are not offered, because the sheet sets them itself.",
        ],
      },
      commands: {
        heading: 'Commands',
        intro:
          'Every command starts with !inspiration. Commands act on the selected tokens unless --ids is given.',
        mods: 'Other Mods can send these commands too, for example from ScriptCards. Other Mods can also call InspirationTracker.give, spend, remove and isInspired.',
        colCommand: 'Command',
        colDesc: 'What it does',
      },
      settings: {
        heading: 'Settings',
        intro: 'Change these with the Settings button, or type !inspiration set <setting> <value>.',
        colKey: 'Setting',
        colName: 'Name',
        colDesc: 'What it does',
      },
      upgrading: {
        heading: 'Upgrading from 0.1',
        points: [
          'The marker, special effect and effect type from version 0.1 are kept.',
          'If you chose your own command in 0.1, it still works alongside !inspiration.',
          '!inspiration with tokens selected still gives or takes away inspiration.',
        ],
      },
      troubleshooting: {
        heading: 'Troubleshooting',
        points: [
          'Marker not showing on a token? Click Sync to read every sheet again.',
          'A token that does not represent a character cannot have inspiration. Link it to a character first.',
          'Nothing happens when a player clicks Spend? Check that the character is assigned to that player.',
          'Errors are written to the API console on the Mod Scripts page.',
        ],
      },
      languages: {
        heading: 'Languages',
        body: 'InspirationTracker is translated into the languages below. Choose one with the Language setting.',
        colCode: 'Code',
        colName: 'Language',
        colNative: 'Native name',
      },
      credits: {
        heading: 'Credits',
        original: 'Original Mod by',
        maintainer: 'Version 1 maintained by',
        support: 'Report bugs and ideas on the Roll20 Mod forum or on GitHub.',
      },
      footer: 'Buttons for every action are in the "{deck}" handout.',
    },
    deck: {
      subtitle: 'Command Deck',
      selectedDesc: 'Select one or more tokens, then click.',
      partyDesc: 'See who has inspiration, and choose who is in the party.',
      toolsDesc: 'Menu, settings, the player macro and help.',
      footer: 'Full instructions are in the "{help}" handout.',
    },
  };

  const TRANSLATION$g = {};

  const TRANSLATION$f = {};

  const TRANSLATION$e = {};

  const TRANSLATION$d = {};

  const TRANSLATION$c = {};

  const TRANSLATION$b = {};

  const TRANSLATION$a = {};

  const TRANSLATION$9 = {};

  const TRANSLATION$8 = {};

  const TRANSLATION$7 = {};

  const TRANSLATION$6 = {};

  const TRANSLATION$5 = {};

  const TRANSLATION$4 = {};

  const TRANSLATION$3 = {};

  const TRANSLATION$2 = {};

  const TRANSLATION$1 = {};

  const TRANSLATION = {};

  const DEFAULT_LOCALE = 'en-US';

  const LOCALE_DEFINITIONS = Object.freeze([
    {
      code: 'af',
      name: 'Afrikaans',
      direction: 'ltr',
      translationFile: 'locale/af.js',
      flag: '🇿🇦',
      flagLabel: 'Flag of South Africa',
    },
    {
      code: 'ca',
      name: 'Catalan',
      nativeName: 'Català',
      direction: 'ltr',
      translationFile: 'locale/ca.js',
      flag: '🇪🇸',
      flagLabel: 'Flag of Spain',
    },
    {
      code: 'zh-TW',
      name: 'Chinese (Traditional)',
      nativeName: '正體中文',
      direction: 'ltr',
      translationFile: 'locale/zh-TW.js',
      aliases: ['zh'],
      flag: '🇹🇼',
      flagLabel: 'Flag of Taiwan',
    },
    {
      code: 'cs',
      name: 'Czech',
      nativeName: 'Čeština',
      direction: 'ltr',
      translationFile: 'locale/cs.js',
      flag: '🇨🇿',
      flagLabel: 'Flag of Czechia',
    },
    {
      code: 'da',
      name: 'Danish',
      nativeName: 'Dansk',
      direction: 'ltr',
      translationFile: 'locale/da.js',
      flag: '🇩🇰',
      flagLabel: 'Flag of Denmark',
    },
    {
      code: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      direction: 'ltr',
      translationFile: 'locale/nl.js',
      flag: '🇳🇱',
      flagLabel: 'Flag of the Netherlands',
    },
    {
      code: 'en-US',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      translationFile: 'locale/en-US.js',
      aliases: ['en'],
      flag: '🇺🇸',
      flagLabel: 'Flag of the United States',
    },
    {
      code: 'fi',
      name: 'Finnish',
      nativeName: 'Suomeksi',
      direction: 'ltr',
      translationFile: 'locale/fi.js',
      flag: '🇫🇮',
      flagLabel: 'Flag of Finland',
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      direction: 'ltr',
      translationFile: 'locale/fr.js',
      flag: '🇫🇷',
      flagLabel: 'Flag of France',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      direction: 'ltr',
      translationFile: 'locale/de.js',
      flag: '🇩🇪',
      flagLabel: 'Flag of Germany',
    },
    {
      code: 'el',
      name: 'Greek',
      nativeName: 'Ελληνικά',
      direction: 'ltr',
      translationFile: 'locale/el.js',
      flag: '🇬🇷',
      flagLabel: 'Flag of Greece',
    },
    {
      code: 'he',
      name: 'Hebrew',
      nativeName: 'עברית',
      direction: 'rtl',
      translationFile: 'locale/he.js',
      flag: '🇮🇱',
      flagLabel: 'Flag of Israel',
    },
    {
      code: 'hu',
      name: 'Hungarian',
      nativeName: 'Magyar',
      direction: 'ltr',
      translationFile: 'locale/hu.js',
      flag: '🇭🇺',
      flagLabel: 'Flag of Hungary',
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      direction: 'ltr',
      translationFile: 'locale/it.js',
      flag: '🇮🇹',
      flagLabel: 'Flag of Italy',
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      direction: 'ltr',
      translationFile: 'locale/ja.js',
      flag: '🇯🇵',
      flagLabel: 'Flag of Japan',
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      direction: 'ltr',
      translationFile: 'locale/ko.js',
      flag: '🇰🇷',
      flagLabel: 'Flag of South Korea',
    },
    {
      code: 'pl',
      name: 'Polish',
      nativeName: 'Polski',
      direction: 'ltr',
      translationFile: 'locale/pl.js',
      flag: '🇵🇱',
      flagLabel: 'Flag of Poland',
    },
    {
      code: 'pt-PT',
      name: 'Portuguese (Portugal)',
      nativeName: 'Português - Portugal',
      direction: 'ltr',
      translationFile: 'locale/pt-PT.js',
      aliases: ['pt'],
      flag: '🇵🇹',
      flagLabel: 'Flag of Portugal',
    },
    {
      code: 'pt-BR',
      name: 'Portuguese (Brazil)',
      nativeName: 'Português - Brasil',
      direction: 'ltr',
      translationFile: 'locale/pt-BR.js',
      flag: '🇧🇷',
      flagLabel: 'Flag of Brazil',
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      direction: 'ltr',
      translationFile: 'locale/ru.js',
      flag: '🇷🇺',
      flagLabel: 'Flag of Russia',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      direction: 'ltr',
      translationFile: 'locale/es.js',
      flag: '🇪🇸',
      flagLabel: 'Flag of Spain',
    },
    {
      code: 'sv',
      name: 'Swedish',
      nativeName: 'Svenska',
      direction: 'ltr',
      translationFile: 'locale/sv.js',
      flag: '🇸🇪',
      flagLabel: 'Flag of Sweden',
    },
    {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      direction: 'ltr',
      translationFile: 'locale/tr.js',
      flag: '🇹🇷',
      flagLabel: 'Flag of Turkey',
    },
    {
      code: 'uk',
      name: 'Ukrainian',
      nativeName: 'Українська',
      direction: 'ltr',
      translationFile: 'locale/uk.js',
      flag: '🇺🇦',
      flagLabel: 'Flag of Ukraine',
    },
  ]);

  const SUPPORTED_LOCALES = Object.freeze(LOCALE_DEFINITIONS.map(({ code }) => code));
  const VALID_LOCALES = new Set(SUPPORTED_LOCALES);
  const LOCALE_ALIASES = Object.freeze(
    LOCALE_DEFINITIONS.reduce((aliases, locale) => {
      for (const alias of locale.aliases || []) {
        aliases[alias] = locale.code;
      }
      return aliases;
    }, {})
  );
  const LOCALE_LABELS = Object.freeze(
    LOCALE_DEFINITIONS.reduce((labels, locale) => {
      const displayName = locale.nativeName
        ? `${locale.code} - ${locale.name} (${locale.nativeName})`
        : `${locale.code} - ${locale.name}`;
      labels[locale.code] = displayName;
      return labels;
    }, {})
  );
  SUPPORTED_LOCALES.map((code) => LOCALE_LABELS[code]).join(' / ');

  const TRANSLATIONS = {
    af: TRANSLATION$n,
    ca: TRANSLATION$m,
    'zh-TW': TRANSLATION$l,
    cs: TRANSLATION$k,
    da: TRANSLATION$j,
    nl: TRANSLATION$i,
    'en-US': TRANSLATION$h,
    fi: TRANSLATION$g,
    fr: TRANSLATION$f,
    de: TRANSLATION$e,
    el: TRANSLATION$d,
    he: TRANSLATION$c,
    hu: TRANSLATION$b,
    it: TRANSLATION$a,
    ja: TRANSLATION$9,
    ko: TRANSLATION$8,
    pl: TRANSLATION$7,
    'pt-PT': TRANSLATION$6,
    'pt-BR': TRANSLATION$5,
    ru: TRANSLATION$4,
    es: TRANSLATION$3,
    sv: TRANSLATION$2,
    tr: TRANSLATION$1,
    uk: TRANSLATION,
  };

  /**
   * Returns the canonical locale for a supported locale string or alias.
   * Matching is case-insensitive after exact matches are checked.
   *
   * @param {string} lang Locale string or alias (e.g. 'en', 'fr', 'zh-TW').
   * @returns {string} Canonical locale code, or an empty string when unsupported.
   */
  function normalizeLocale(lang) {
    const s = typeof lang === 'string' ? lang.trim() : '';
    if (VALID_LOCALES.has(s)) {
      return s;
    }
    if (LOCALE_ALIASES[s]) {
      return LOCALE_ALIASES[s];
    }
    const normalized = s.toLowerCase();
    const found = Array.from(VALID_LOCALES).find((locale) => locale.toLowerCase() === normalized);
    return (
      found ||
      Object.entries(LOCALE_ALIASES).find(([alias]) => alias.toLowerCase() === normalized)?.[1] ||
      ''
    );
  }

  /**
   * Returns a valid canonical locale, falling back to the default when unsupported.
   *
   * @param {string} lang Locale string to validate.
   * @returns {string} Validated canonical locale.
   */
  function getLocale(lang) {
    return normalizeLocale(lang) || DEFAULT_LOCALE;
  }

  /**
   * Navigates a nested object following dot-separated key path segments.
   *
   * @param {object} obj Root object.
   * @param {string[]} parts Key path segments.
   * @returns {*} Value at the path, or undefined.
   */
  function getNestedValue(obj, parts) {
    let current = obj;
    for (const part of parts) {
      if (current == null || typeof current !== 'object') {
        return undefined;
      }
      current = current[part];
    }
    return current;
  }

  /**
   * Returns the raw translated value (string, array or object) for a key,
   * falling back to en-US when the key is missing in the requested locale.
   *
   * @param {string} key Dot-separated translation key.
   * @param {string} locale Locale code.
   * @returns {*} Raw value, or undefined when not found.
   */
  function tRaw(key, locale) {
    const lang = getLocale(locale);
    const parts = key.split('.');
    const value = getNestedValue(TRANSLATIONS[lang], parts);
    return value === undefined && lang !== DEFAULT_LOCALE
      ? getNestedValue(TRANSLATIONS[DEFAULT_LOCALE], parts)
      : value;
  }

  /**
   * Returns the text direction CSS for a locale.
   *
   * @param {string} locale Locale code.
   * @returns {string} CSS declarations, empty for left-to-right locales.
   */
  function getDirectionStyle(locale) {
    const lang = getLocale(locale);
    const def = LOCALE_DEFINITIONS.find((d) => d.code === lang);
    return def?.direction === 'rtl' ? 'direction:rtl;text-align:right;' : '';
  }

  /**
   * Returns the translated string for a dot-separated key, interpolating {placeholder} vars.
   * Falls back to en-US when the key is missing in the requested locale.
   * No HTML escaping is performed — callers must pre-escape HTML-unsafe values.
   *
   * @param {string} key Dot-separated translation key (e.g. 'errors.noTokensSelected').
   * @param {string} locale Locale code.
   * @param {object} [vars] Interpolation variables mapped to {placeholder} names.
   * @returns {string} Translated and interpolated string. Returns the key when not found.
   */
  function t(key, locale, vars = {}) {
    const lang = getLocale(locale);
    const parts = key.split('.');
    let value = getNestedValue(TRANSLATIONS[lang], parts);

    if (value === undefined && lang !== DEFAULT_LOCALE) {
      value = getNestedValue(TRANSLATIONS[DEFAULT_LOCALE], parts);
    }

    if (typeof value !== 'string') {
      return key;
    }

    return value.replaceAll(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  }

  // ---------------------------------------------------------------------------
  // Value validation (pure)
  // ---------------------------------------------------------------------------

  /**
   * Returns true when text names a built-in special effect ("nova-holy") or
   * looks like the ID of a custom one.
   *
   * @param {string} text Effect name.
   * @returns {boolean} True when usable with spawnFx.
   */
  function isFxType(text) {
    const [type, colour, extra] = text.split('-');
    if (extra === undefined && FX_TYPES.includes(type) && FX_COLOURS.includes(colour)) {
      return true;
    }
    // Custom effects are referred to by their custfx object ID.
    return /^-[\w-]{6,}$/.test(text);
  }

  /**
   * Validates one configuration value.
   *
   * @param {string} key Config key.
   * @param {*} raw Raw value.
   * @returns {{valid: boolean, value?: *}} Result; `value` is the normalised value when valid.
   */
  function validateConfigValue(key, raw) {
    const ok = (value) => ({ valid: true, value });
    const bad = { valid: false };
    const option = (list) => {
      const text = toText(raw).toLowerCase();
      const found = list.find((o) => o.toLowerCase() === text);
      return found ? ok(found) : bad;
    };
    const flag = () => {
      const b = parseBoolean(raw);
      return b === null ? bad : ok(b);
    };

    switch (key) {
      case 'language': {
        const lang = normalizeLocale(raw);
        return lang ? ok(lang) : bad;
      }
      case 'marker': {
        const text = toText(raw);
        return /^[^,@\s][^,@]{0,99}$/.test(text) ? ok(text) : bad;
      }
      case 'wording':
        return option(WORDING_OPTIONS);
      case 'announce':
        return option(ANNOUNCE_OPTIONS);
      case 'fxType': {
        const text = toText(raw);
        return isFxType(text) ? ok(text) : bad;
      }
      case 'fx':
      case 'playerSpend':
      case 'playerOverview':
      case 'passOn':
        return flag();
      default:
        return bad;
    }
  }

  /**
   * Merges a possibly incomplete or invalid config with defaults.
   *
   * @param {object} config Config to merge.
   * @returns {object} Complete config.
   */
  function mergeConfig(config) {
    const c = isRecord(config) ? config : {};
    const merged = {};
    for (const key of Object.keys(DEFAULT_CONFIG)) {
      const result = key in c ? validateConfigValue(key, c[key]) : { valid: false };
      merged[key] = result.valid ? result.value : DEFAULT_CONFIG[key];
    }
    return merged;
  }

  /**
   * Converts 0.1.x settings into the new config. Its command name is kept as
   * an extra command, so the GM's macros keep working.
   *
   * @param {object} legacy state.INSPIRATIONTRACKER.
   * @returns {{config: object, command: string}} Converted settings.
   */
  function convertLegacyConfig(legacy) {
    const old = isRecord(legacy?.config) ? legacy.config : {};
    const config = mergeConfig({
      marker: old.statusmarker,
      fx: old.fx,
      fxType: old.fx_type,
    });
    const command = toText(old.command).replace(/^!/, '');
    return {
      config,
      command: /^[\w-]{1,40}$/.test(command) && command !== 'inspiration' ? command : '',
    };
  }

  // ---------------------------------------------------------------------------
  // Persistent state
  // ---------------------------------------------------------------------------

  /**
   * Builds empty state.
   *
   * @returns {object} State.
   */
  function freshState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      version: SCRIPT_VERSION,
      config: { ...DEFAULT_CONFIG },
      legacyCommand: '',
      known: {},
      party: { include: [], exclude: [] },
      undo: [],
      offers: {},
      notices: {},
    };
  }

  /**
   * Returns the Mod's state, creating it when missing.
   *
   * @returns {object} State.
   */
  function getState() {
    if (!isRecord(state[STATE_KEY])) {
      state[STATE_KEY] = freshState();
    }
    return state[STATE_KEY];
  }

  /**
   * Returns the current configuration.
   *
   * @returns {object} Config.
   */
  function getConfig() {
    return getState().config;
  }

  /**
   * Creates, repairs or upgrades the state. 0.1.x settings are copied the first
   * time; the old state is left in place so a downgrade still works.
   *
   * @returns {{migrated: boolean, command: string}} Whether 0.1.x settings were taken over.
   */
  function initialiseState() {
    const existing = state[STATE_KEY];
    let migrated = false;
    if (!isRecord(existing)) {
      const s = freshState();
      if (isRecord(state[LEGACY_STATE_KEY])) {
        const converted = convertLegacyConfig(state[LEGACY_STATE_KEY]);
        s.config = converted.config;
        s.legacyCommand = converted.command;
        migrated = true;
      }
      state[STATE_KEY] = s;
    }
    const s = state[STATE_KEY];
    const base = freshState();
    for (const key of Object.keys(base)) {
      if (key === 'config') {
        continue;
      }
      const wantsArray = Array.isArray(base[key]);
      const ok = wantsArray ? Array.isArray(s[key]) : typeof s[key] === typeof base[key];
      if (!ok || (!wantsArray && typeof base[key] === 'object' && !isRecord(s[key]))) {
        s[key] = base[key];
      }
    }
    if (!Array.isArray(s.party.include)) {
      s.party.include = [];
    }
    if (!Array.isArray(s.party.exclude)) {
      s.party.exclude = [];
    }
    s.config = mergeConfig(s.config);
    s.schemaVersion = SCHEMA_VERSION;
    s.version = SCRIPT_VERSION;
    pruneOffers();
    return { migrated, command: s.legacyCommand };
  }

  /**
   * Sets one configuration value.
   *
   * @param {string} key Config key.
   * @param {*} raw Raw value.
   * @returns {{valid: boolean, value?: *}} Validation result.
   */
  function setConfigValue(key, raw) {
    const result = validateConfigValue(key, raw);
    if (result.valid) {
      getConfig()[key] = result.value;
    }
    return result;
  }

  /**
   * Puts every setting back to its default, keeping the language.
   *
   * @returns {void}
   */
  function resetConfig() {
    const s = getState();
    s.config = { ...DEFAULT_CONFIG, language: s.config.language };
  }

  /**
   * Applies One-Click useroptions that changed since they were last applied, so
   * a GM's later chat changes are not overwritten on every restart.
   *
   * @returns {void}
   */
  function applyGlobalConfig() {
    if (typeof globalconfig === 'undefined' || !isRecord(globalconfig)) {
      return;
    }
    const branch = globalconfig[STATE_KEY.toLowerCase()] || globalconfig[STATE_KEY];
    if (!isRecord(branch)) {
      return;
    }
    const options = isRecord(branch.useroptions) ? branch.useroptions : branch;
    const s = getState();
    const applied = isRecord(s.notices.useroptions) ? s.notices.useroptions : {};
    for (const key of USEROPTION_KEYS) {
      if (key in options && options[key] !== applied[key]) {
        setConfigValue(key, options[key]);
        applied[key] = options[key];
      }
    }
    s.notices.useroptions = applied;
  }

  // ---------------------------------------------------------------------------
  // Last known values. The 2024 sheet's change event already carries the new
  // value as "previous", so changes are found by comparing with these.
  // ---------------------------------------------------------------------------

  /**
   * Returns the last inspiration value seen for a character.
   *
   * @param {string} charId Character ID.
   * @returns {boolean|undefined} Last value, or undefined when not seen yet.
   */
  function getKnown(charId) {
    const value = getState().known[charId];
    return typeof value === 'boolean' ? value : undefined;
  }

  /**
   * Records the inspiration value seen for a character.
   *
   * @param {string} charId Character ID.
   * @param {boolean|undefined} inspired Value, or undefined to forget it.
   * @returns {void}
   */
  function setKnown(charId, inspired) {
    if (inspired === undefined) {
      delete getState().known[charId];
    } else {
      getState().known[charId] = Boolean(inspired);
    }
  }

  /**
   * Forgets everything kept about a character that was deleted.
   *
   * @param {string} charId Character ID.
   * @returns {void}
   */
  function forgetCharacter(charId) {
    const s = getState();
    delete s.known[charId];
    s.party.include = s.party.include.filter((id) => id !== charId);
    s.party.exclude = s.party.exclude.filter((id) => id !== charId);
    for (const [id, offer] of Object.entries(s.offers)) {
      if (offer.charId === charId) {
        delete s.offers[id];
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Party membership chosen by the GM
  // ---------------------------------------------------------------------------

  /**
   * Adds a character to the party, or takes it out.
   *
   * @param {string} charId Character ID.
   * @param {boolean} member True to add.
   * @returns {void}
   */
  function setPartyMember(charId, member) {
    const party = getState().party;
    party.include = party.include.filter((id) => id !== charId);
    party.exclude = party.exclude.filter((id) => id !== charId);
    (member ? party.include : party.exclude).push(charId);
  }

  /**
   * Returns the GM's party choices.
   *
   * @returns {{include: string[], exclude: string[]}} Choices.
   */
  function getPartyChoices() {
    return getState().party;
  }

  // ---------------------------------------------------------------------------
  // Undo for spends
  // ---------------------------------------------------------------------------

  /**
   * Remembers a spend so the GM can undo it.
   *
   * @param {string} charId Character ID.
   * @param {string} playerId Who spent it.
   * @param {number} now Current time.
   * @returns {string} Undo ID.
   */
  function pushUndo(charId, playerId, now) {
    const s = getState();
    const id = shortId();
    s.undo.push({ id, charId, playerId, at: now });
    while (s.undo.length > MAX_UNDO) {
      s.undo.shift();
    }
    return id;
  }

  /**
   * Takes an undo entry, so each can be used once.
   *
   * @param {string} id Undo ID.
   * @returns {object|null} The entry, or null when unknown.
   */
  function takeUndo(id) {
    const s = getState();
    const index = s.undo.findIndex((entry) => entry.id === id);
    return index < 0 ? null : s.undo.splice(index, 1)[0];
  }

  // ---------------------------------------------------------------------------
  // Offers to pass Heroic Inspiration on (2024 rules)
  // ---------------------------------------------------------------------------

  /**
   * Opens an offer for a character's owner to give Heroic Inspiration away.
   *
   * @param {string} charId Character that would have gained it.
   * @param {number} now Current time.
   * @returns {string} Offer ID.
   */
  function createOffer(charId, now) {
    const id = shortId();
    getState().offers[id] = { charId, at: now };
    return id;
  }

  /**
   * Takes an open offer, so each can be used once.
   *
   * @param {string} id Offer ID.
   * @param {number} now Current time.
   * @returns {object|null} The offer, or null when unknown or expired.
   */
  function takeOffer(id, now) {
    const offers = getState().offers;
    const offer = offers[id];
    delete offers[id];
    return offer && now - offer.at <= OFFER_LIFETIME_MS ? offer : null;
  }

  /**
   * Puts back an offer that could not be used yet.
   *
   * @param {string} id Offer ID.
   * @param {object} offer Offer.
   * @returns {void}
   */
  function restoreOffer(id, offer) {
    getState().offers[id] = offer;
  }

  /**
   * Drops expired offers.
   *
   * @param {number} [now] Current time.
   * @returns {void}
   */
  function pruneOffers(now = Date.now()) {
    const offers = getState().offers;
    for (const [id, offer] of Object.entries(offers)) {
      if (!isRecord(offer) || now - offer.at > OFFER_LIFETIME_MS) {
        delete offers[id];
      }
    }
  }

  /**
   * Returns true the first time it is called for a key, so a hint is shown once.
   *
   * @param {string} key Notice key.
   * @returns {boolean} True the first time.
   */
  function takeNoticeOnce(key) {
    const notices = getState().notices;
    if (notices[key]) {
      return false;
    }
    notices[key] = true;
    return true;
  }

  // Who is in the party, and who may act for a character.

  /**
   * Returns the IDs in a character's "Can Be Edited & Controlled By" list.
   *
   * @param {object} character Roll20 character.
   * @returns {string[]} Player IDs, and `all` when everyone controls it.
   */
  function controllerIds(character) {
    return toText(character?.get('controlledby'))
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
  }

  /**
   * Returns true when a player may spend a character's inspiration: a GM, or a
   * player in the character's controlled-by list (or `all`).
   *
   * @param {string} playerId Roll20 player ID.
   * @param {object} character Roll20 character.
   * @returns {boolean} True when allowed.
   */
  function canControl(playerId, character) {
    if (playerIsGM(playerId)) {
      return true;
    }
    const ids = controllerIds(character);
    return ids.includes('all') || ids.includes(playerId);
  }

  /**
   * Returns the non-GM players who control a character. `all` stands for every
   * player.
   *
   * @param {object} character Roll20 character.
   * @returns {string[]} Player IDs.
   */
  function ownerIds(character) {
    const ids = controllerIds(character);
    const players = ids.includes('all')
      ? findObjs({ _type: 'player' }).map((p) => p.id)
      : ids.filter((id) => getObj('player', id));
    return players.filter((id) => !playerIsGM(id));
  }

  /**
   * Returns true for a character a player controls, which is how the party is
   * found unless the GM adds or removes characters.
   *
   * @param {object} character Roll20 character.
   * @returns {boolean} True when controlled by a player.
   */
  function playerControlled(character) {
    return controllerIds(character).some(
      (id) => id !== 'all' && getObj('player', id) && !playerIsGM(id)
    );
  }

  /**
   * Lists the party: player-controlled characters plus those the GM added,
   * minus those the GM removed. Archived characters are left out.
   *
   * @returns {object[]} Roll20 characters, sorted by name.
   */
  function partyMembers() {
    const { include, exclude } = getPartyChoices();
    return findObjs({ _type: 'character' })
      .filter((c) => !c.get('archived'))
      .filter((c) => include.includes(c.id) || (playerControlled(c) && !exclude.includes(c.id)))
      .sort((a, b) => toText(a.get('name')).localeCompare(toText(b.get('name'))));
  }

  /**
   * Finds the characters behind the selected tokens, or behind token and
   * character IDs given with --ids. Duplicates are dropped.
   *
   * @param {object[]} selected msg.selected entries.
   * @param {string[]} ids Token or character IDs.
   * @returns {{characters: object[], skipped: string[]}} Characters, and the tokens or IDs that gave none.
   */
  function resolveCharacters(selected, ids) {
    const characters = [];
    const skipped = [];
    const add = (character, label) => {
      if (!character) {
        skipped.push(label);
      } else if (!characters.some((c) => c.id === character.id)) {
        characters.push(character);
      }
    };
    for (const entry of selected || []) {
      const token = getObj('graphic', entry._id);
      if (token && isToken(token)) {
        add(getObj('character', token.get('represents')), toText(token.get('name')) || token.id);
      }
    }
    for (const id of ids) {
      const token = getObj('graphic', id);
      const character = token
        ? getObj('character', token.get('represents'))
        : getObj('character', id);
      add(character, id);
    }
    return { characters, skipped };
  }

  /**
   * Returns every token, on every page, that stands for a character.
   *
   * @param {string} charId Character ID.
   * @returns {object[]} Roll20 graphics.
   */
  function tokensFor(charId) {
    return findObjs({ _type: 'graphic', _subtype: 'token', represents: charId });
  }

  // Reading and writing inspiration on both D&D 5e sheets.
  //
  // The 2014 OGL sheet keeps a checkbox attribute, `inspiration`, which
  // findObjs can see. The D&D 2024 sheet is a Beacon sheet: its values are not
  // attribute objects, so 0.1.x never found them. Beacon values are read and
  // written with getSheetItem/setSheetItem; the sheet also keeps them in a
  // `store` attribute, which is read when those functions are not available.

  /**
   * Finds a character's attribute by name, whatever its case.
   *
   * @param {string} charId Character ID.
   * @param {string} name Attribute name.
   * @returns {object|undefined} Roll20 attribute.
   */
  function findAttribute(charId, name) {
    const wanted = name.toLowerCase();
    return findObjs({ _type: 'attribute', _characterid: charId }).find(
      (attr) => toText(attr.get('name')).toLowerCase() === wanted
    );
  }

  /**
   * Returns the parsed `store` of a Beacon character, or null for other sheets.
   *
   * @param {string|object} charOrAttr Character ID, or the store attribute itself.
   * @returns {object|null} Store contents.
   */
  function readStore(charOrAttr) {
    const attr =
      typeof charOrAttr === 'string'
        ? findAttribute(charOrAttr, BEACON_STORE_ATTRIBUTE)
        : charOrAttr;
    if (!attr) {
      return null;
    }
    let value = attr.get('current');
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch {
        return null;
      }
    }
    return isRecord(value) ? value : null;
  }

  /**
   * Reads inspiration from a Beacon store.
   *
   * @param {object|null} store Store contents.
   * @returns {boolean|undefined} Value, or undefined when the store has none.
   */
  function inspirationFromStore(store) {
    const value = store?.inspiration?.isInspired;
    return value === undefined ? undefined : isInspiredValue(value);
  }

  /**
   * Says which kind of sheet holds a character's inspiration.
   *
   * @param {string} charId Character ID.
   * @returns {'legacy'|'beacon'|'none'} Sheet kind.
   */
  function sheetKind(charId) {
    if (findAttribute(charId, LEGACY_ATTRIBUTE)) {
      return 'legacy';
    }
    return findAttribute(charId, BEACON_STORE_ATTRIBUTE) ? 'beacon' : 'none';
  }

  /**
   * Reads whether a character has inspiration.
   *
   * @param {string} charId Character ID.
   * @returns {Promise<{kind: string, inspired: boolean}>} Sheet kind and value.
   */
  async function readInspiration(charId) {
    const kind = sheetKind(charId);
    if (kind === 'legacy') {
      return {
        kind,
        inspired: isInspiredValue(findAttribute(charId, LEGACY_ATTRIBUTE).get('current')),
      };
    }
    if (kind === 'beacon') {
      if (typeof getSheetItem === 'function') {
        try {
          const value = await getSheetItem(charId, BEACON_ITEM);
          if (value !== undefined && value !== null) {
            return { kind, inspired: isInspiredValue(value) };
          }
        } catch (err) {
          log(`${SCRIPT_NAME}: getSheetItem failed for ${charId}: ${err?.message || err}`);
        }
      }
      return { kind, inspired: inspirationFromStore(readStore(charId)) === true };
    }
    return { kind, inspired: false };
  }

  /**
   * Sets or clears a character's inspiration.
   *
   * A 2014 sheet only creates its attribute when the box is first ticked, so a
   * character with neither attribute nor store gets the attribute created.
   *
   * @param {string} charId Character ID.
   * @param {boolean} inspired New value.
   * @returns {Promise<{ok: boolean, kind: string, error?: string}>} Result.
   */
  async function writeInspiration(charId, inspired) {
    const kind = sheetKind(charId);
    if (kind === 'beacon') {
      if (typeof setSheetItem !== 'function') {
        return { ok: false, kind, error: 'setSheetItem is not available' };
      }
      try {
        await setSheetItem(charId, BEACON_ITEM, inspired ? 1 : 0, 'current', { allowThrow: true });
        return { ok: true, kind };
      } catch (err) {
        const error = String(err?.message || err);
        log(`${SCRIPT_NAME}: setSheetItem failed for ${charId}: ${error}`);
        return { ok: false, kind, error };
      }
    }
    const value = inspired ? 'on' : '0';
    const attr = findAttribute(charId, LEGACY_ATTRIBUTE);
    if (attr) {
      attr.set('current', value);
    } else {
      createObj('attribute', { characterid: charId, name: LEGACY_ATTRIBUTE, current: value });
    }
    return { ok: true, kind: 'legacy' };
  }

  /**
   * Returns the rules edition used for a character: the GM's choice, or the
   * 2024 sheet's own setting, or 2014 for the 2014 OGL sheet.
   *
   * @param {string} charId Character ID.
   * @returns {string} RULES_2014 or RULES_2024.
   */
  function rulesFor(charId) {
    const wording = getConfig().wording;
    if (wording === RULES_2014 || wording === RULES_2024) {
      return wording;
    }
    const store = readStore(charId);
    if (!store) {
      return RULES_2014;
    }
    return store.settings?.newRules === false ? RULES_2014 : RULES_2024;
  }

  // Giving, removing, spending and passing on inspiration, and keeping token
  // markers and chat in step with the sheets.

  const observers = [];
  const busy = new Set();

  /**
   * Registers a function called with (token, prev) whenever this Mod changes a
   * token's markers, matching TokenMod's ObserveTokenChange.
   *
   * @param {Function} fn Observer.
   * @returns {void}
   */
  function observeTokenChange(fn) {
    if (typeof fn === 'function') {
      observers.push(fn);
    }
  }

  /**
   * Returns the word for inspiration for a character: "Heroic Inspiration"
   * under the 2024 rules, "Inspiration" under the 2014 rules.
   *
   * @param {string} charId Character ID.
   * @param {string} lang Locale code.
   * @returns {string} Translated term.
   */
  function termFor(charId, lang) {
    return t(rulesFor(charId) === RULES_2024 ? 'terms.heroic' : 'terms.classic', lang);
  }

  /**
   * Returns a character's name.
   *
   * @param {object} character Roll20 character.
   * @returns {string} Name.
   */
  function nameOf(character) {
    return toText(character?.get('name')) || toText(character?.id);
  }

  /**
   * Shows or hides the inspiration marker on every token for a character.
   *
   * @param {string} charId Character ID.
   * @param {boolean} inspired Whether to show it.
   * @returns {void}
   */
  function syncTokens(charId, inspired) {
    const marker = getConfig().marker;
    for (const token of tokensFor(charId)) {
      const prev = { ...token.attributes, statusmarkers: token.get('statusmarkers') };
      if (setMarker(token, marker, inspired)) {
        for (const fn of observers) {
          try {
            fn(token, prev);
          } catch (err) {
            log(`${SCRIPT_NAME}: observer failed: ${err?.message || err}`);
          }
        }
      }
    }
  }

  /**
   * Plays the chosen special effect on a character's tokens.
   *
   * @param {string} charId Character ID.
   * @returns {void}
   */
  function playFx(charId) {
    const { fx, fxType } = getConfig();
    if (!fx || typeof spawnFx !== 'function') {
      return;
    }
    for (const token of tokensFor(charId)) {
      if (token.get('layer') === 'gmlayer') {
        continue;
      }
      spawnFx(token.get('left'), token.get('top'), fxType, token.get('_pageid'));
    }
  }

  /**
   * Builds the body of an announcement card.
   *
   * @param {string} text Sentence (escaped).
   * @param {string} [buttons] Button HTML.
   * @returns {string} HTML.
   */
  function announcementBody(text, buttons = '') {
    return [
      '<div style="overflow:hidden">',
      `<img src="${ICON_URL}" alt="" style="float:right;width:36px;height:36px;margin-left:6px">`,
      `<div>${text}</div>`,
      buttons ? `<div style="margin-top:4px">${buttons}</div>` : '',
      '</div>',
    ].join('');
  }

  /**
   * Sends an announcement the way the GM chose: to everyone, to the GM and the
   * character's players, or not at all.
   *
   * @param {object} character Roll20 character.
   * @param {string} title Card title.
   * @param {string} body Card body.
   * @returns {void}
   */
  function announce(character, title, body) {
    const mode = getConfig().announce;
    if (mode === 'public') {
      broadcast(title, body);
    } else if (mode === 'gm') {
      whisperEach([...getGmPlayerIds(), ...ownerIds(character)], title, body);
    }
  }

  /**
   * Runs an action for one character at a time, so a double-clicked button
   * cannot spend the same inspiration twice.
   *
   * @param {string} charId Character ID.
   * @param {Function} fn Async action.
   * @returns {Promise<object>} The action's result, or `{status: 'busy'}`.
   */
  async function exclusive(charId, fn) {
    if (busy.has(charId)) {
      return { status: 'busy' };
    }
    busy.add(charId);
    try {
      return await fn();
    } finally {
      busy.delete(charId);
    }
  }

  /**
   * Writes a new value, recording it first so the sheet's own change event for
   * this write is not taken for a player's change.
   *
   * @param {string} charId Character ID.
   * @param {boolean} inspired New value.
   * @returns {Promise<{ok: boolean, error?: string}>} Result.
   */
  async function store(charId, inspired) {
    const before = getKnown(charId);
    setKnown(charId, inspired);
    const result = await writeInspiration(charId, inspired);
    if (!result.ok) {
      setKnown(charId, before);
    }
    return result;
  }

  /**
   * Announces that a character gained inspiration, with a Spend button.
   *
   * @param {object} character Roll20 character.
   * @returns {void}
   */
  function announceGain(character) {
    const lang = getConfig().language;
    const term = termFor(character.id, lang);
    const text = escapeHtml(t('messages.gained', lang, { name: nameOf(character), term }));
    const button = getConfig().playerSpend
      ? buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${character.id}`)
      : '';
    announce(character, term, announcementBody(text, button));
  }

  /**
   * Announces a spend, and tells the GM with an Undo button.
   *
   * @param {object} character Roll20 character.
   * @param {string|null} playerId Who spent it, or null for a change on the sheet or token.
   * @returns {void}
   */
  function announceSpend(character, playerId) {
    const lang = getConfig().language;
    const term = termFor(character.id, lang);
    const name = nameOf(character);
    announce(
      character,
      term,
      announcementBody(escapeHtml(t('messages.spent', lang, { name, term })))
    );
    const undoId = pushUndo(character.id, playerId || '', Date.now());
    const who = playerId && getObj('player', playerId)?.get('displayname');
    const line = who
      ? t('messages.spentBy', lang, { name, term, player: who })
      : t('messages.spentSheet', lang, { name, term });
    whisper(
      null,
      SCRIPT_NAME,
      `<div>${escapeHtml(line)}</div><div style="margin-top:4px">${buildSecondaryButton(t('buttons.undo', lang), `${COMMAND} undo ${undoId}`)}</div>`
    );
  }

  /**
   * Gives a character inspiration. Under the 2024 rules, a character who
   * already has Heroic Inspiration may give it to another party member instead.
   *
   * @param {object} character Roll20 character.
   * @param {string} actorId Who gave it.
   * @returns {Promise<{status: string, error?: string}>} given | already | offered | failed | busy.
   */
  function give(character, actorId) {
    return exclusive(character.id, async () => {
      const { inspired } = await readInspiration(character.id);
      if (inspired) {
        setKnown(character.id, true);
        syncTokens(character.id, true);
        if (getConfig().passOn && rulesFor(character.id) === RULES_2024) {
          offerPassOn(character, actorId);
          return { status: 'offered' };
        }
        return { status: 'already' };
      }
      const result = await store(character.id, true);
      if (!result.ok) {
        return { status: 'failed', error: result.error };
      }
      syncTokens(character.id, true);
      playFx(character.id);
      announceGain(character);
      return { status: 'given' };
    });
  }

  /**
   * Takes inspiration away without it counting as a spend.
   *
   * @param {object} character Roll20 character.
   * @returns {Promise<{status: string, error?: string}>} removed | none | failed | busy.
   */
  function remove(character) {
    return exclusive(character.id, async () => {
      const { inspired } = await readInspiration(character.id);
      if (!inspired) {
        setKnown(character.id, false);
        syncTokens(character.id, false);
        return { status: 'none' };
      }
      const result = await store(character.id, false);
      if (!result.ok) {
        return { status: 'failed', error: result.error };
      }
      syncTokens(character.id, false);
      return { status: 'removed' };
    });
  }

  /**
   * Spends a character's inspiration.
   *
   * @param {object} character Roll20 character.
   * @param {string} actorId Who is spending it.
   * @returns {Promise<{status: string, error?: string}>} spent | none | denied | failed | busy.
   */
  function spend(character, actorId) {
    const gm = isGmOrMod(actorId, API_PLAYER_ID);
    if (!gm && (!getConfig().playerSpend || !canControl(actorId, character))) {
      return Promise.resolve({ status: 'denied' });
    }
    return exclusive(character.id, async () => {
      const { inspired } = await readInspiration(character.id);
      if (!inspired) {
        setKnown(character.id, false);
        syncTokens(character.id, false);
        return { status: 'none' };
      }
      const result = await store(character.id, false);
      if (!result.ok) {
        return { status: 'failed', error: result.error };
      }
      syncTokens(character.id, false);
      announceSpend(character, actorId === API_PLAYER_ID ? null : actorId);
      return { status: 'spent' };
    });
  }

  /**
   * Gives back inspiration that was spent.
   *
   * @param {string} undoId Undo ID from the GM's spend message.
   * @returns {Promise<{status: string, name?: string, error?: string}>} restored | unknown | already | failed | busy.
   */
  async function undoSpend(undoId) {
    const entry = takeUndo(undoId);
    const character = entry && getObj('character', entry.charId);
    if (!character) {
      return { status: 'unknown' };
    }
    const result = await exclusive(character.id, async () => {
      const { inspired } = await readInspiration(character.id);
      if (inspired) {
        return { status: 'already' };
      }
      const written = await store(character.id, true);
      if (!written.ok) {
        return { status: 'failed', error: written.error };
      }
      syncTokens(character.id, true);
      return { status: 'restored' };
    });
    if (result.status === 'restored') {
      const lang = getConfig().language;
      const term = termFor(character.id, lang);
      const text = t('messages.restored', lang, { name: nameOf(character), term });
      whisperEach(
        [...getGmPlayerIds(), ...ownerIds(character)],
        term,
        announcementBody(escapeHtml(text))
      );
    }
    return { ...result, name: nameOf(character) };
  }

  /**
   * Asks a character's players (or the GM, when nobody controls it) who should
   * get the Heroic Inspiration it cannot hold twice.
   *
   * @param {object} character Roll20 character that already has it.
   * @param {string} actorId Who tried to give it.
   * @returns {void}
   */
  function offerPassOn(character, actorId) {
    const lang = getConfig().language;
    const term = termFor(character.id, lang);
    const offerId = createOffer(character.id, Date.now());
    const candidates = partyMembers().filter(
      (c) => c.id !== character.id && getKnown(c.id) !== true
    );
    const buttons = candidates.map((c) =>
      buildButton(nameOf(c), `${COMMAND} pass ${offerId} ${c.id}`)
    );
    buttons.push(
      buildSecondaryButton(t('buttons.decline', lang), `${COMMAND} pass ${offerId} none`)
    );
    const body = [
      `<div>${escapeHtml(t('messages.passOffer', lang, { name: nameOf(character), term }))}</div>`,
      candidates.length === 0
        ? `<div style="margin-top:3px;font-size:0.9em">${escapeHtml(t('messages.passNobody', lang))}</div>`
        : '',
      `<div style="margin-top:4px">${buttons.join(' ')}</div>`,
    ].join('');
    const owners = ownerIds(character);
    const recipients = owners.length > 0 ? owners : getGmPlayerIds();
    whisperEach(recipients, term, body);
    if (owners.length > 0 && isGmOrMod(actorId, API_PLAYER_ID)) {
      whisper(
        null,
        SCRIPT_NAME,
        escapeHtml(t('messages.passAsked', lang, { name: nameOf(character), term }))
      );
    }
  }

  /**
   * Passes Heroic Inspiration on from an offer, or lets it go.
   *
   * @param {string} offerId Offer ID.
   * @param {string} targetId Character ID, or `none` to let it go.
   * @param {string} actorId Who clicked.
   * @returns {Promise<{status: string, from?: string, to?: string, term?: string, error?: string}>} passed | declined | unknown | denied | invalid | already | failed | busy.
   */
  async function passOn(offerId, targetId, actorId) {
    const now = Date.now();
    const offer = takeOffer(offerId, now);
    const from = offer && getObj('character', offer.charId);
    if (!from) {
      return { status: 'unknown' };
    }
    const putBack = () => restoreOffer(offerId, offer);
    if (!isGmOrMod(actorId, API_PLAYER_ID) && !canControl(actorId, from)) {
      putBack();
      return { status: 'denied' };
    }
    const term = termFor(from.id, getConfig().language);
    if (targetId === 'none') {
      return { status: 'declined', from: nameOf(from), term };
    }
    const target = getObj('character', targetId);
    if (!target || target.id === from.id || !partyMembers().some((c) => c.id === target.id)) {
      putBack();
      return { status: 'invalid' };
    }
    const result = await exclusive(target.id, async () => {
      const { inspired } = await readInspiration(target.id);
      if (inspired) {
        setKnown(target.id, true);
        return { status: 'already' };
      }
      const written = await store(target.id, true);
      return written.ok ? { status: 'passed' } : { status: 'failed', error: written.error };
    });
    if (result.status === 'already' || result.status === 'busy') {
      putBack();
    }
    if (result.status === 'passed') {
      syncTokens(target.id, true);
      playFx(target.id);
      const lang = getConfig().language;
      const term = termFor(target.id, lang);
      const text = t('messages.passed', lang, { from: nameOf(from), to: nameOf(target), term });
      const button = getConfig().playerSpend
        ? buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${target.id}`)
        : '';
      announce(target, term, announcementBody(escapeHtml(text), button));
    }
    return { ...result, from: nameOf(from), to: nameOf(target), term };
  }

  /**
   * Reacts to inspiration changed on a sheet by a person. Ticking it counts as
   * a gain and clearing it as a spend, so the GM can undo it.
   *
   * @param {string} charId Character ID.
   * @param {boolean} inspired New value.
   * @returns {void}
   */
  function handleSheetValue(charId, inspired) {
    if (busy.has(charId) || getKnown(charId) === inspired) {
      return;
    }
    const first = getKnown(charId) === undefined;
    setKnown(charId, inspired);
    syncTokens(charId, inspired);
    const character = getObj('character', charId);
    // The first value seen for a character is only recorded.
    if (!character || first) {
      return;
    }
    if (inspired) {
      playFx(charId);
      announceGain(character);
    } else {
      announceSpend(character, null);
    }
  }

  /**
   * Reacts to the inspiration marker being added to or taken off a token by
   * hand or by another Mod: the sheet follows the marker.
   *
   * @param {object} token Roll20 graphic.
   * @param {boolean} shown Whether the marker is now shown.
   * @returns {Promise<void>}
   */
  async function handleMarkerChange(token, shown) {
    const character = getObj('character', token.get('represents'));
    if (!character) {
      return;
    }
    if (shown) {
      const result = await give(character, API_PLAYER_ID);
      if (result.status === 'offered' || result.status === 'already') {
        syncTokens(character.id, true);
      }
      return;
    }
    const result = await spend(character, API_PLAYER_ID);
    if (result.status === 'none') {
      syncTokens(character.id, false);
    }
  }

  /**
   * Reads every character once, records the values and puts the markers right.
   *
   * @returns {Promise<{checked: number, inspired: number}>} Counts.
   */
  async function syncAll() {
    let checked = 0;
    let inspired = 0;
    for (const character of findObjs({ _type: 'character' })) {
      const value = await readInspiration(character.id);
      if (value.kind === 'none') {
        continue;
      }
      checked += 1;
      if (value.inspired) {
        inspired += 1;
      }
      setKnown(character.id, value.inspired);
      syncTokens(character.id, value.inspired);
    }
    return { checked, inspired };
  }

  // Journal handouts: the Help handout and the Command Deck. Both are GM-only.

  const STYLE = {
    outer: `background:${COLOR_CARD_BG_BOTTOM};color:${COLOR_TEXT};padding:14px 18px;border:1px solid ${COLOR_BORDER};border-radius:6px;font-family:Arial,sans-serif;line-height:1.5;`,
    header: `background:${COLOR_HEADER_BG};padding:12px;border-radius:4px;text-align:center;border-bottom:3px solid ${COLOR_ACCENT};margin-bottom:12px;`,
    h1: `color:${COLOR_HEADER_TEXT};margin:0;font-size:1.8em;letter-spacing:0.05em;`,
    subtitle: `color:${COLOR_MUTED};margin:4px 0 0 0;font-size:0.9em;`,
    h2: `color:${COLOR_ACCENT};border-bottom:1px solid ${COLOR_BORDER};padding-bottom:3px;margin:18px 0 8px 0;font-size:1.25em;`,
    p: `color:${COLOR_TEXT};margin:6px 0;`,
    li: `color:${COLOR_TEXT};margin:3px 0;`,
    table: 'width:100%;border-collapse:collapse;margin:6px 0;font-size:0.92em;',
    th: `background:${COLOR_HEADER_BG};color:${COLOR_HEADER_TEXT};padding:5px 8px;text-align:left;border:1px solid ${COLOR_BORDER};`,
    td: `padding:5px 8px;border:1px solid ${COLOR_BORDER};vertical-align:top;color:${COLOR_TEXT};`,
    code: 'font-family:monospace;color:#ffd58a;white-space:nowrap;',
    link: `color:${COLOR_ACCENT};`,
    footer: `color:${COLOR_MUTED};font-size:0.85em;text-align:center;margin-top:16px;border-top:1px solid ${COLOR_BORDER};padding-top:8px;`,
    btn: `background:${COLOR_BUTTON_BG};color:${COLOR_BUTTON_TEXT};padding:3px 9px;border-radius:3px;text-decoration:none;font-size:0.9em;display:inline-block;margin:2px 3px;font-weight:bold;`,
    btnDark: `background:${COLOR_BUTTON_ALT_BG};color:${COLOR_TEXT};border:1px solid ${COLOR_BUTTON_ALT_BORDER};padding:3px 9px;border-radius:3px;text-decoration:none;font-size:0.9em;display:inline-block;margin:2px 3px;`,
    section: `background:${COLOR_HEADER_BG};color:${COLOR_ACCENT};padding:4px 8px;font-variant:small-caps;font-weight:bold;letter-spacing:0.05em;border-left:3px solid ${COLOR_ACCENT};margin:12px 0 4px 0;`,
    desc: `color:${COLOR_MUTED};font-size:0.85em;margin:0 0 4px 8px;`,
  };

  /**
   * Builds a table.
   *
   * @param {string[]} headings Column headings (escaped).
   * @param {string[][]} rows Row cells (trusted HTML).
   * @returns {string} HTML string.
   */
  function table(headings, rows) {
    const head = headings.map((h) => `<th style="${STYLE.th}">${escapeHtml(h)}</th>`).join('');
    const body = rows
      .map((cells) => `<tr>${cells.map((c) => `<td style="${STYLE.td}">${c}</td>`).join('')}</tr>`)
      .join('');
    return `<table style="${STYLE.table}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  /**
   * Builds a list from a translated array.
   *
   * @param {*} items Translated value (array of strings expected).
   * @param {boolean} [ordered=false] Use a numbered list.
   * @returns {string} HTML string.
   */
  function list(items, ordered = false) {
    const tag = ordered ? 'ol' : 'ul';
    const lis = (Array.isArray(items) ? items : [])
      .map((item) => `<li style="${STYLE.li}">${escapeHtml(item)}</li>`)
      .join('');
    return `<${tag}>${lis}</${tag}>`;
  }

  /**
   * Builds a link.
   *
   * @param {string} url URL.
   * @param {string} label Link text.
   * @returns {string} HTML anchor.
   */
  function link(url, label) {
    return `<a href="${escapeHtml(url)}" style="${STYLE.link}">${escapeHtml(label)}</a>`;
  }

  /**
   * Builds a Twemoji asset URL for a locale flag.
   *
   * @param {string} flag Unicode regional-indicator flag.
   * @returns {string} SVG asset URL or an empty string.
   */
  function flagAssetUrl(flag) {
    const codepoints = Array.from(String(flag || '').trim())
      .map((character) => character.codePointAt(0).toString(16))
      .join('-');
    return codepoints
      ? `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`
      : '';
  }

  /**
   * Builds a flag image for a locale. An image is used because Roll20 on Windows
   * shows emoji flags as letter pairs.
   *
   * @param {object} locale Locale metadata.
   * @returns {string} Trusted locale flag HTML.
   */
  function buildLocaleFlag(locale) {
    const label = escapeHtml(locale.flagLabel || locale.name);
    const url = flagAssetUrl(locale.flag);
    if (!url) {
      return '';
    }
    return `<img src="${escapeHtml(url)}" alt="${label}" title="${label}" style="width:1.1em;height:1.1em;vertical-align:-0.15em;margin-right:4px;" />`;
  }

  /**
   * Builds the Help handout HTML.
   *
   * @param {string} locale Locale code.
   * @returns {string} HTML string.
   */
  function buildHelpHtml(locale) {
    const lang = getLocale(locale);
    const h = (key, vars) => escapeHtml(t(`handout.${key}`, lang, vars));
    const raw = (key) => tRaw(`handout.${key}`, lang);
    const code = (text) => `<span style="${STYLE.code}">${escapeHtml(text)}</span>`;
    const section = (key, body) => `<h2 style="${STYLE.h2}">${h(`${key}.heading`)}</h2>${body}`;

    const commands = HELP_COMMANDS.map(([text, key]) => [
      code(`${COMMAND} ${text}`.trim()),
      escapeHtml(t(`help.${key}`, lang)),
    ]);

    const settings = SETTING_KEYS.map((key) => [
      code(key),
      escapeHtml(t(`settings.${key}.label`, lang)),
      escapeHtml(t(`settings.${key}.desc`, lang)),
    ]);

    const sheets = [
      [h('sheets.colSheet2014'), h('sheets.where2014')],
      [h('sheets.colSheet2024'), h('sheets.where2024')],
    ];

    const locales = LOCALE_DEFINITIONS.map((locale) => [
      `${buildLocaleFlag(locale)}${code(locale.code)}`,
      escapeHtml(locale.name),
      escapeHtml(locale.nativeName || locale.name),
    ]);
    const { original, maintainer } = AUTHOR_LINKS;

    return `<div style="${STYLE.outer}${getDirectionStyle(lang)}">
    <div style="${STYLE.header}">
      <h1 style="${STYLE.h1}">✥ ${SCRIPT_NAME} ✥</h1>
      <p style="${STYLE.subtitle}">${h('versionLabel')} ${SCRIPT_VERSION} • ${h('subtitle')}</p>
    </div>
    ${section('overview', `<p style="${STYLE.p}">${h('overview.body')}</p>`)}
    ${section('quickStart', list(raw('quickStart.steps'), true))}
    ${section('sheets', `${table([t('handout.sheets.colSheet', lang), t('handout.sheets.colWhere', lang)], sheets)}${list(raw('sheets.points'))}`)}
    ${section('players', list(raw('players.points')))}
    ${section('passOn', list(raw('passOn.points')))}
    ${section('party', list(raw('party.points')))}
    ${section('markers', list(raw('markers.points')))}
    ${section('commands', `<p style="${STYLE.p}">${h('commands.intro')}</p><p style="${STYLE.p}">${h('commands.mods')}</p>${table([t('handout.commands.colCommand', lang), t('handout.commands.colDesc', lang)], commands)}`)}
    ${section('settings', `<p style="${STYLE.p}">${h('settings.intro')}</p>${table([t('handout.settings.colKey', lang), t('handout.settings.colName', lang), t('handout.settings.colDesc', lang)], settings)}`)}
    ${section('upgrading', list(raw('upgrading.points')))}
    ${section('troubleshooting', list(raw('troubleshooting.points')))}
    ${section('languages', `<p style="${STYLE.p}">${h('languages.body')}</p>${table([t('handout.languages.colCode', lang), t('handout.languages.colName', lang), t('handout.languages.colNative', lang)], locales)}`)}
    ${section(
      'credits',
      `<p style="${STYLE.p}">${h('credits.original')} ${link(original.profile, original.name)} • ${link(original.patreon, 'Patreon')}</p>
       <p style="${STYLE.p}">${h('credits.maintainer')} ${link(maintainer.profile, maintainer.name)} • ${link(maintainer.github, 'GitHub')}</p>
       <p style="${STYLE.p}">${h('credits.support')}</p>`
    )}
    <div style="${STYLE.footer}">${SCRIPT_NAME} ${SCRIPT_VERSION} • ${h('footer', { deck: HANDOUT_DECK_NAME })}</div>
  </div>`;
  }

  /**
   * Builds the Command Deck handout HTML.
   *
   * @param {string} locale Locale code.
   * @returns {string} HTML string.
   */
  function buildDeckHtml(locale) {
    const lang = getLocale(locale);
    const tr = (key, vars) => t(key, lang, vars);
    const btn = (key, args, dark = false) =>
      `<a href="${escapeHtml(`${COMMAND} ${args}`.trim())}" style="${dark ? STYLE.btnDark : STYLE.btn}">${escapeHtml(tr(`buttons.${key}`))}</a>`;
    const group = (titleKey, descKey, buttons) =>
      `<div style="${STYLE.section}">${escapeHtml(tr(titleKey))}</div><div style="${STYLE.desc}">${escapeHtml(tr(descKey))}</div><div>${buttons.join('')}</div>`;

    return `<div style="${STYLE.outer}${getDirectionStyle(lang)}">
    <div style="${STYLE.header}">
      <h1 style="${STYLE.h1}">✥ ${SCRIPT_NAME} ✥</h1>
      <p style="${STYLE.subtitle}">${escapeHtml(tr('deck.subtitle'))} • v${SCRIPT_VERSION}</p>
    </div>
    ${group('menu.selected', 'deck.selectedDesc', [btn('give', 'give'), btn('remove', 'remove', true), btn('toggle', 'toggle', true), btn('spend', 'spend', true)])}
    ${group('menu.party', 'deck.partyDesc', [btn('party', 'party'), btn('partyAdd', 'party add', true), btn('partyRemove', 'party remove', true)])}
    ${group('menu.tools', 'deck.toolsDesc', [btn('menu', ''), btn('settings', 'set', true), btn('macro', 'macro', true), btn('sync', 'sync', true), btn('status', 'status', true), btn('help', 'help', true)])}
    <div style="${STYLE.footer}">${escapeHtml(tr('deck.footer', { help: HANDOUT_HELP_NAME }))}</div>
  </div>`;
  }

  /**
   * Creates or updates a GM-only handout, removing duplicates with the same name.
   *
   * @param {string} name Handout name.
   * @param {string} html Handout notes HTML.
   * @returns {void}
   */
  function upsertHandout(name, html) {
    const existing = findObjs({ _type: 'handout', name });
    const [primary, ...duplicates] = existing;
    const handout = primary || createObj('handout', { name });
    if (!handout) {
      return;
    }
    handout.set({ inplayerjournals: '', controlledby: '' });
    handout.set('notes', html);
    for (const dup of duplicates) {
      dup.remove();
    }
  }

  /**
   * Creates or refreshes the Help and Command Deck handouts in the current
   * language.
   *
   * @returns {void}
   */
  function installHandouts() {
    const lang = getConfig().language;
    upsertHandout(HANDOUT_HELP_NAME, buildHelpHtml(lang));
    upsertHandout(HANDOUT_DECK_NAME, buildDeckHtml(lang));
  }

  // Token markers: Roll20's coloured dots plus every marker in the game's
  // token marker sets, custom sets included.

  /**
   * Reads the game's token markers. Custom markers have tags like
   * `Heroic::12345`, so they survive being renamed.
   *
   * @returns {{tag: string, name: string, url: string}[]} Markers.
   */
  function readCampaignMarkers() {
    let list = [];
    try {
      list = JSON.parse(Campaign().get('_token_markers') || '[]');
    } catch {
      list = [];
    }
    return (Array.isArray(list) ? list : [])
      .filter((m) => m && typeof m.tag === 'string' && m.tag)
      .map((m) => ({ tag: m.tag, name: toText(m.name) || m.tag, url: toText(m.url) }));
  }

  /**
   * Lists the markers the GM can choose from. The D&D 2024 sheet's own
   * condition markers are left out, because the sheet sets and clears them.
   *
   * @returns {{tag: string, name: string, url: string}[]} Markers.
   */
  function listMarkers() {
    const colours = COLOUR_MARKERS.map((tag) => ({
      tag,
      name: tag.charAt(0).toUpperCase() + tag.slice(1),
      url: '',
    }));
    const seen = new Set(colours.map((m) => m.tag));
    const others = readCampaignMarkers().filter(
      (m) => !m.tag.startsWith(SHEET_MARKER_PREFIX) && !seen.has(m.tag) && seen.add(m.tag)
    );
    return [...colours, ...others];
  }

  /**
   * Finds a marker by its tag or name, whatever its case.
   *
   * @param {string} text Tag or name.
   * @returns {{tag: string, name: string, url: string}|null} Marker, or null when the game has none by that name.
   */
  function resolveMarker(text) {
    const wanted = toText(text);
    if (!wanted) {
      return null;
    }
    const markers = listMarkers();
    const lower = wanted.toLowerCase();
    return (
      markers.find((m) => m.tag === wanted) ||
      markers.find((m) => m.tag.toLowerCase() === lower) ||
      markers.find((m) => m.name.toLowerCase() === lower) ||
      null
    );
  }

  /**
   * Returns a readable name for a marker tag.
   *
   * @param {string} tag Marker tag.
   * @returns {string} Name.
   */
  function markerName(tag) {
    return listMarkers().find((m) => m.tag === tag)?.name || toText(tag).split('::')[0];
  }

  // Chat menus: the GM menu, settings, party overview, the player card,
  // status and help.

  const YES = '✔';
  const NO = '—';

  /**
   * Builds a roll query offering a list of values.
   *
   * @param {string} prompt Prompt text.
   * @param {{label: string, value: string}[]} options Choices.
   * @returns {string} Roll query.
   */
  function query(prompt, options) {
    const choices = options.map((o) => `${queryText(o.label)},${queryText(o.value)}`).join('|');
    return `?{${queryText(prompt)}|${choices}}`;
  }

  /**
   * Returns a translated on/off label.
   *
   * @param {boolean} value Setting.
   * @param {string} lang Locale code.
   * @returns {string} Label.
   */
  function onOff(value, lang) {
    return t(value ? 'values.on' : 'values.off', lang);
  }

  /**
   * Shows the GM menu.
   *
   * @param {string|null} playerId Who asked.
   * @returns {void}
   */
  function showMainMenu(playerId) {
    const lang = getConfig().language;
    const b = (key, args) => buildButton(t(`buttons.${key}`, lang), `${COMMAND} ${args}`.trim());
    const s = (key, args) =>
      buildSecondaryButton(t(`buttons.${key}`, lang), `${COMMAND} ${args}`.trim());
    whisper(playerId, `${SCRIPT_NAME} v${SCRIPT_VERSION}`, [
      buildSectionLabel(t('menu.selected', lang)),
      b('give', 'give'),
      b('remove', 'remove'),
      b('toggle', 'toggle'),
      b('spend', 'spend'),
      buildSectionLabel(t('menu.party', lang)),
      b('party', 'party'),
      s('partyAdd', 'party add'),
      s('partyRemove', 'party remove'),
      buildSectionLabel(t('menu.tools', lang)),
      s('settings', 'set'),
      s('macro', 'macro'),
      s('sync', 'sync'),
      s('status', 'status'),
      s('help', 'help'),
      `<div style="font-size:0.85em;margin-top:4px">${escapeHtml(t('menu.hint', lang, { help: HANDOUT_HELP_NAME }))}</div>`,
    ]);
  }

  /**
   * Builds the value button for one setting.
   *
   * @param {string} key Setting key.
   * @param {string} lang Locale code.
   * @returns {string} Button HTML.
   */
  function settingButton(key, lang) {
    const config = getConfig();
    const value = config[key];
    const set = (label, choices) =>
      buildButton(
        label,
        `${COMMAND} set ${key} ${query(t(`settings.${key}.label`, lang), choices)}`
      );
    switch (key) {
      case 'language':
        return set(
          value,
          LOCALE_DEFINITIONS.map((d) => ({
            label: `${d.nativeName || d.name} (${d.code})`,
            value: d.code,
          }))
        );
      case 'marker':
        return set(
          markerName(value),
          listMarkers().map((m) => ({ label: m.name, value: m.tag }))
        );
      case 'wording':
        return set(
          t(`values.wording.${value}`, lang),
          WORDING_OPTIONS.map((o) => ({ label: t(`values.wording.${o}`, lang), value: o }))
        );
      case 'announce':
        return set(
          t(`values.announce.${value}`, lang),
          ANNOUNCE_OPTIONS.map((o) => ({ label: t(`values.announce.${o}`, lang), value: o }))
        );
      case 'fxType':
        return set(
          value,
          FX_TYPES.flatMap((type) => FX_COLOURS.map((colour) => `${type}-${colour}`)).map((v) => ({
            label: v,
            value: v,
          }))
        );
      default:
        return buildButton(onOff(value, lang), `${COMMAND} set ${key} ${value ? 'off' : 'on'}`);
    }
  }

  /**
   * Shows the settings menu.
   *
   * @param {string|null} playerId Who asked.
   * @returns {void}
   */
  function showSettings(playerId) {
    const lang = getConfig().language;
    const rows = SETTING_KEYS.map((key) =>
      buildRow(t(`settings.${key}.label`, lang), settingButton(key, lang))
    );
    whisper(playerId, t('titles.settings', lang), [
      ...rows,
      buildDivider(),
      buildSecondaryButton(t('buttons.menu', lang), COMMAND),
      buildSecondaryButton(t('buttons.reset', lang), `${COMMAND} reset`),
    ]);
  }

  /**
   * Reads the party's inspiration.
   *
   * @param {object[]} characters Roll20 characters.
   * @returns {Promise<{character: object, inspired: boolean, kind: string}[]>} Rows.
   */
  async function readRows(characters) {
    const rows = [];
    for (const character of characters) {
      const value = await readInspiration(character.id);
      rows.push({ character, ...value });
    }
    return rows;
  }

  /**
   * Builds one overview line.
   *
   * @param {object} row Row from readRows.
   * @param {string} lang Locale code.
   * @param {string} buttons Button HTML.
   * @returns {string} HTML.
   */
  function overviewLine(row, lang, buttons) {
    const name = escapeHtml(toText(row.character.get('name')));
    const mark = row.inspired
      ? `<span style="color:#f2c94c;font-weight:bold">${YES}</span>`
      : `<span style="opacity:0.6">${NO}</span>`;
    const sheet =
      row.kind === 'none'
        ? ` <span style="font-size:0.8em;opacity:0.7">(${escapeHtml(t('menu.noSheet', lang))})</span>`
        : '';
    return [
      '<table style="width:100%;border-collapse:collapse;margin:1px 0"><tr>',
      `<td style="width:1.4em;text-align:center">${mark}</td>`,
      `<td>${name}${sheet}</td>`,
      `<td style="text-align:right;white-space:nowrap">${buttons}</td>`,
      '</tr></table>',
    ].join('');
  }

  /**
   * Shows the party overview. The GM gets Give and Remove buttons; players get
   * a read-only list (when the GM allows it) with Spend for their own
   * characters.
   *
   * @param {string} playerId Who asked.
   * @param {boolean} gm Whether they act as GM.
   * @returns {Promise<void>}
   */
  async function showParty(playerId, gm) {
    const config = getConfig();
    const lang = config.language;
    const members = partyMembers();
    const visible =
      gm || config.playerOverview ? members : members.filter((c) => canControl(playerId, c));
    const rows = await readRows(visible);
    const lines = rows.map((row) => {
      const id = row.character.id;
      let buttons = '';
      if (gm) {
        buttons = row.inspired
          ? buildSecondaryButton(
              t('buttons.remove', lang),
              `${COMMAND} remove --ids ${id} --party`
            ) +
            buildSecondaryButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${id} --party`)
          : buildButton(t('buttons.give', lang), `${COMMAND} give --ids ${id} --party`);
      } else if (row.inspired && config.playerSpend && canControl(playerId, row.character)) {
        buttons = buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${id} --party`);
      }
      return overviewLine(row, lang, buttons);
    });
    const count = rows.filter((r) => r.inspired).length;
    const term = rows.length > 0 ? termFor(rows[0].character.id, lang) : t('terms.heroic', lang);
    const body = [
      lines.length > 0
        ? lines.join('')
        : `<div>${escapeHtml(t(gm ? 'menu.partyEmptyGm' : 'menu.partyEmpty', lang))}</div>`,
      buildDivider(),
      `<div style="font-size:0.9em">${escapeHtml(t('menu.partyCount', lang, { count, total: rows.length, term }))}</div>`,
      buildSecondaryButton(t('buttons.refresh', lang), `${COMMAND} party`),
    ];
    if (gm) {
      body.push(buildSecondaryButton(t('buttons.menu', lang), COMMAND));
    }
    whisper(playerId, t('titles.party', lang), body);
  }

  /**
   * Shows a player the characters they control, with Spend buttons. The GM
   * can turn the party overview on for players instead.
   *
   * @param {string} playerId Who asked.
   * @returns {Promise<void>}
   */
  async function showPlayerCard(playerId) {
    const config = getConfig();
    if (config.playerOverview) {
      await showParty(playerId, false);
      return;
    }
    const lang = config.language;
    const own = findObjs({ _type: 'character' })
      .filter((c) => !c.get('archived') && canControl(playerId, c) && sheetKind(c.id) !== 'none')
      .sort((a, b) => toText(a.get('name')).localeCompare(toText(b.get('name'))));
    const rows = await readRows(own);
    const lines = rows.map((row) =>
      overviewLine(
        row,
        lang,
        row.inspired && config.playerSpend
          ? buildButton(t('buttons.spend', lang), `${COMMAND} spend --ids ${row.character.id}`)
          : ''
      )
    );
    whisper(
      playerId,
      t('titles.yours', lang),
      lines.length > 0 ? lines : [`<div>${escapeHtml(t('menu.noneYours', lang))}</div>`]
    );
  }

  /**
   * Shows the Mod's status.
   *
   * @param {string|null} playerId Who asked.
   * @param {string} legacyCommand 0.1.x command still answered, if any.
   * @returns {void}
   */
  function showStatus(playerId, legacyCommand) {
    const config = getConfig();
    const lang = config.language;
    const characters = findObjs({ _type: 'character' });
    const counts = { legacy: 0, beacon: 0, none: 0 };
    let rules2024 = 0;
    for (const c of characters) {
      const kind = sheetKind(c.id);
      counts[kind] += 1;
      if (kind !== 'none' && rulesFor(c.id) === '2024') {
        rules2024 += 1;
      }
    }
    const row = (key, value) => buildRow(t(`status.${key}`, lang), escapeHtml(String(value)));
    whisper(playerId, t('titles.status', lang), [
      row('version', SCRIPT_VERSION),
      row('beacon', counts.beacon),
      row('legacy', counts.legacy),
      row('none', counts.none),
      row('rules2024', rules2024),
      row('party', partyMembers().length),
      row('marker', markerName(config.marker)),
      row('fx', config.fx ? config.fxType : onOff(false, lang)),
      legacyCommand ? row('legacyCommand', `!${legacyCommand}`) : '',
    ]);
  }

  /**
   * Shows the command list.
   *
   * @param {string|null} playerId Who asked.
   * @param {boolean} gm Whether they act as GM.
   * @returns {void}
   */
  function showHelp(playerId, gm) {
    const lang = getConfig().language;
    const commands = gm
      ? HELP_COMMANDS
      : HELP_COMMANDS.filter(([, key]) => ['menu', 'spend', 'party', 'help'].includes(key));
    const lines = commands.map(
      ([text, key]) =>
        `<div style="margin:2px 0"><code>${escapeHtml(`${COMMAND} ${text}`.trim())}</code><br><span style="font-size:0.9em">${escapeHtml(t(gm ? `help.${key}` : `helpPlayer.${key}`, lang))}</span></div>`
    );
    if (gm) {
      lines.push(
        `<div style="font-size:0.85em;margin-top:4px">${escapeHtml(t('menu.hint', lang, { help: HANDOUT_HELP_NAME }))}</div>`
      );
    }
    whisper(playerId, t('titles.help', lang), lines);
  }

  // Chat command parsing and dispatch.

  /**
   * Splits a chat message into the command word, its arguments and flags.
   *
   * @param {string} content Message text after the command prefix.
   * @returns {{sub: string, args: string[], ids: string[], party: boolean}} Parsed command.
   */
  function parseCommand(content) {
    const words = tokenize(content);
    const args = [];
    const ids = [];
    let party = false;
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      if (word.toLowerCase() === '--ids') {
        const list = words[i + 1] || '';
        i += 1;
        ids.push(
          ...list
            .split(/[;,]/)
            .map((id) => id.trim())
            .filter(Boolean)
        );
      } else if (word.toLowerCase() === '--party') {
        party = true;
      } else {
        args.push(word);
      }
    }
    const sub = (args.shift() || '').toLowerCase();
    return { sub, args, ids, party };
  }

  /**
   * Returns the command prefixes this game answers to: `!inspiration`, plus
   * the command a 0.1.x GM chose.
   *
   * @returns {string[]} Prefixes with the leading "!".
   */
  function prefixes() {
    const legacy = getState().legacyCommand;
    return legacy ? [COMMAND, `!${legacy}`] : [COMMAND];
  }

  /**
   * Tells the GM (or the player who asked) what happened to one character,
   * when the result was not already announced in chat.
   *
   * @param {string} playerId Who asked.
   * @param {object} character Roll20 character.
   * @param {object} result Action result.
   * @returns {void}
   */
  function report(playerId, character, result) {
    const lang = getConfig().language;
    const vars = { name: toText(character.get('name')), term: termFor(character.id, lang) };
    const target = playerId === API_PLAYER_ID ? null : playerId;
    switch (result.status) {
      case 'already':
        whisperWarning(target, t('messages.already', lang, vars));
        break;
      case 'none':
        whisperWarning(target, t('messages.none', lang, vars));
        break;
      case 'removed':
        whisper(target, SCRIPT_NAME, escapeHtml(t('messages.removed', lang, vars)));
        break;
      case 'denied':
        whisperError(target, t('errors.denied', lang, vars));
        break;
      case 'busy':
        whisperWarning(target, t('messages.busy', lang, vars));
        break;
      case 'failed':
        whisperError(target, t('errors.writeFailed', lang, vars), result.error);
        break;
    }
  }

  /**
   * Runs an action on the selected characters (or those given with --ids).
   *
   * @param {object} msg Chat message.
   * @param {object} cmd Parsed command.
   * @param {Function} action Async action taking (character, playerId).
   * @returns {Promise<void>}
   */
  async function forCharacters(msg, cmd, action) {
    const lang = getConfig().language;
    const { characters, skipped } = resolveCharacters(msg.selected, cmd.ids);
    if (skipped.length > 0) {
      whisperWarning(msg.playerid, t('errors.noCharacter', lang, { names: skipped.join(', ') }));
    }
    if (characters.length === 0) {
      if (skipped.length === 0) {
        whisperError(
          msg.playerid,
          t('errors.nothingSelected', lang),
          t('errors.nothingSelectedHint', lang)
        );
      }
      return;
    }
    for (const character of characters) {
      report(msg.playerid, character, await action(character, msg.playerid));
    }
    if (cmd.party) {
      await showParty(msg.playerid, isGmOrMod(msg.playerid, API_PLAYER_ID));
    }
  }

  /**
   * Toggles a character: gives inspiration when it has none, otherwise takes
   * it away (0.1.x's `!inspiration` with tokens selected).
   *
   * @param {object} character Roll20 character.
   * @param {string} playerId Who asked.
   * @returns {Promise<object>} Action result.
   */
  async function toggle(character, playerId) {
    const { inspired } = await readInspiration(character.id);
    return inspired ? remove(character) : give(character, playerId);
  }

  /**
   * Handles `set`: with no arguments shows the settings, otherwise changes one.
   *
   * @param {string} playerId Who asked.
   * @param {string[]} args Setting key and value.
   * @returns {void}
   */
  function handleSet(playerId, args) {
    const lang = getConfig().language;
    if (args.length === 0) {
      showSettings(playerId);
      return;
    }
    const [rawKey, ...rest] = args;
    const key = Object.keys(getConfig()).find((k) => k.toLowerCase() === rawKey.toLowerCase());
    let value = rest.join(' ');
    if (key === 'marker') {
      const marker = resolveMarker(value);
      if (!marker) {
        whisperError(
          playerId,
          t('errors.unknownMarker', lang, { value }),
          t('errors.unknownMarkerHint', lang)
        );
        return;
      }
      value = marker.tag;
    }
    const oldMarker = getConfig().marker;
    const result = key ? setConfigValue(key, value) : { valid: false };
    if (!result.valid) {
      whisperError(
        playerId,
        t('errors.badSetting', lang, { key: rawKey, value }),
        t('errors.badSettingHint', lang)
      );
      return;
    }
    if (key === 'marker' && oldMarker !== result.value) {
      moveMarker(oldMarker);
    }
    if (key === 'language') {
      installHandouts();
    }
    showSettings(playerId);
  }

  /**
   * Takes the old marker off every token and shows the new one where the
   * character has inspiration.
   *
   * @param {string} oldMarker Previous marker tag.
   * @returns {void}
   */
  function moveMarker(oldMarker) {
    const marker = getConfig().marker;
    for (const token of findObjs({ _type: 'graphic', _subtype: 'token' })) {
      const tags = toText(token.get('statusmarkers')).split(',');
      if (tags.some((tag) => tag.split('@')[0] === oldMarker)) {
        token.set(
          'statusmarkers',
          tags.filter((tag) => tag && tag.split('@')[0] !== oldMarker).join(',')
        );
      }
    }
    for (const [charId, inspired] of Object.entries(getState().known)) {
      if (inspired && marker) {
        syncTokens(charId, true);
      }
    }
  }

  /**
   * Creates or updates the token action players click to spend inspiration.
   *
   * @param {string} playerId GM who asked.
   * @returns {void}
   */
  function installMacro(playerId) {
    const lang = getConfig().language;
    const action = `${COMMAND} spend`;
    const creator =
      playerId === API_PLAYER_ID
        ? findObjs({ _type: 'player' }).find((p) => playerIsGM(p.id))?.id
        : playerId;
    const existing = findObjs({ _type: 'macro', name: MACRO_NAME });
    if (existing.length > 0) {
      for (const macro of existing) {
        macro.set({ action, visibleto: 'all', istokenaction: true });
      }
    } else if (creator) {
      createObj('macro', {
        name: MACRO_NAME,
        action,
        visibleto: 'all',
        istokenaction: true,
        playerid: creator,
      });
    }
    whisper(
      playerId === API_PLAYER_ID ? null : playerId,
      SCRIPT_NAME,
      escapeHtml(t('messages.macro', lang, { name: MACRO_NAME }))
    );
  }

  /**
   * Handles commands from players who are not GMs.
   *
   * @param {object} msg Chat message.
   * @param {object} cmd Parsed command.
   * @returns {Promise<void>}
   */
  async function handlePlayer(msg, cmd) {
    const lang = getConfig().language;
    switch (cmd.sub) {
      case '':
      case 'menu':
        await showPlayerCard(msg.playerid);
        return;
      case 'spend':
        if (!getConfig().playerSpend) {
          whisperError(msg.playerid, t('errors.spendOff', lang));
          return;
        }
        await forCharacters(msg, cmd, spend);
        return;
      case 'party':
        await showParty(msg.playerid, false);
        return;
      case 'pass':
        await handlePass(msg, cmd);
        return;
      case 'help':
        showHelp(msg.playerid, false);
        return;
      default:
        whisperError(msg.playerid, t('errors.gmOnly', lang), t('errors.gmOnlyHint', lang));
    }
  }

  /**
   * Handles `pass <offer> <character|none>`.
   *
   * @param {object} msg Chat message.
   * @param {object} cmd Parsed command.
   * @returns {Promise<void>}
   */
  async function handlePass(msg, cmd) {
    const lang = getConfig().language;
    const [offerId = '', targetId = ''] = cmd.args;
    const result = await passOn(offerId, targetId, msg.playerid);
    const target = msg.playerid === API_PLAYER_ID ? null : msg.playerid;
    const vars = { from: result.from, to: result.to, name: result.from, term: result.term };
    switch (result.status) {
      case 'unknown':
        whisperWarning(target, t('errors.offerGone', lang));
        break;
      case 'denied':
        whisperError(target, t('errors.denied', lang, vars));
        break;
      case 'invalid':
        whisperError(target, t('errors.passInvalid', lang));
        break;
      case 'already':
        whisperWarning(target, t('messages.passAlready', lang, vars));
        break;
      case 'declined':
        whisper(target, SCRIPT_NAME, escapeHtml(t('messages.declined', lang, vars)));
        break;
      case 'failed':
        whisperError(target, t('errors.writeFailed', lang, { name: result.to }), result.error);
        break;
    }
  }

  /**
   * Handles commands from GMs and other Mods.
   *
   * @param {object} msg Chat message.
   * @param {object} cmd Parsed command.
   * @returns {Promise<void>}
   */
  async function handleGm(msg, cmd) {
    const lang = getConfig().language;
    const who = msg.playerid === API_PLAYER_ID ? null : msg.playerid;
    switch (cmd.sub) {
      case '':
        if ((msg.selected || []).length > 0 || cmd.ids.length > 0) {
          await forCharacters(msg, cmd, toggle);
        } else {
          showMainMenu(who);
        }
        return;
      case 'menu':
        showMainMenu(who);
        return;
      case 'give':
        await forCharacters(msg, cmd, give);
        return;
      case 'remove':
        await forCharacters(msg, cmd, remove);
        return;
      case 'toggle':
        await forCharacters(msg, cmd, toggle);
        return;
      case 'spend':
        await forCharacters(msg, cmd, spend);
        return;
      case 'party': {
        const action = (cmd.args[0] || '').toLowerCase();
        if (action === 'add' || action === 'remove') {
          const { characters } = resolveCharacters(msg.selected, cmd.ids);
          if (characters.length === 0) {
            whisperError(
              who,
              t('errors.nothingSelected', lang),
              t('errors.nothingSelectedHint', lang)
            );
            return;
          }
          for (const character of characters) {
            setPartyMember(character.id, action === 'add');
          }
        }
        await showParty(who, true);
        return;
      }
      case 'pass':
        await handlePass(msg, cmd);
        return;
      case 'undo': {
        const result = await undoSpend(cmd.args[0] || '');
        if (result.status === 'unknown') {
          whisperWarning(who, t('errors.undoGone', lang));
        } else if (result.status === 'already') {
          whisperWarning(who, t('messages.undoAlready', lang, { name: result.name }));
        } else if (result.status === 'failed') {
          whisperError(who, t('errors.writeFailed', lang, { name: result.name }), result.error);
        }
        return;
      }
      case 'macro':
        installMacro(msg.playerid);
        return;
      case 'sync': {
        const counts = await syncAll();
        whisper(who, SCRIPT_NAME, escapeHtml(t('messages.synced', lang, counts)));
        return;
      }
      case 'set':
      case 'settings':
      case 'config':
        handleSet(who, cmd.sub === 'set' ? cmd.args : []);
        return;
      case 'reset':
        resetConfig();
        showSettings(who);
        return;
      case 'status':
        showStatus(who, getState().legacyCommand);
        return;
      case 'journal':
        installHandouts();
        whisper(who, SCRIPT_NAME, escapeHtml(t('messages.journal', lang)));
        return;
      case 'help':
        showHelp(who, true);
        return;
      default:
        whisperError(
          who,
          t('errors.unknownCommand', lang, { command: cmd.sub }),
          t('errors.unknownCommandHint', lang)
        );
    }
  }

  /**
   * Handles a chat message.
   *
   * @param {object} msg Roll20 chat message.
   * @returns {Promise<void>}
   */
  async function handleInput(msg) {
    if (msg.type !== 'api') {
      return;
    }
    const text = toText(msg.content);
    const prefix = prefixes().find(
      (p) =>
        text.toLowerCase() === p.toLowerCase() ||
        text.toLowerCase().startsWith(`${p.toLowerCase()} `)
    );
    if (!prefix) {
      return;
    }
    const cmd = parseCommand(text.slice(prefix.length));
    if (isGmOrMod(msg.playerid, API_PLAYER_ID)) {
      await handleGm(msg, cmd);
    } else {
      await handlePlayer(msg, cmd);
    }
  }

  let ready = false;

  /**
   * Logs a handler error instead of letting it stop the sandbox.
   *
   * @param {string} label Handler name.
   * @param {*} err Error.
   * @returns {void}
   */
  function logError(label, err) {
    log(`${SCRIPT_NAME} ERROR in ${label}: ${err?.message || err}`);
    if (err?.stack) {
      log(err.stack);
    }
  }

  /**
   * Runs a handler (which may be async) once the Mod is ready, logging errors.
   *
   * @param {string} label Handler name for the log.
   * @param {Function} fn Handler.
   * @returns {Function} Wrapped handler.
   */
  function guarded(label, fn) {
    return (...args) => {
      if (!ready) {
        return;
      }
      try {
        Promise.resolve(fn(...args)).catch((err) => logError(label, err));
      } catch (err) {
        logError(label, err);
      }
    };
  }

  /**
   * Handles a new or changed attribute: the 2014 sheet's `inspiration`, or the
   * 2024 sheet's `store`.
   *
   * @param {object} attr Roll20 attribute.
   * @returns {void}
   */
  function handleAttribute(attr) {
    const name = toText(attr.get('name')).toLowerCase();
    const charId = attr.get('_characterid') || attr.get('characterid');
    if (name === LEGACY_ATTRIBUTE) {
      handleSheetValue(charId, isInspiredValue(attr.get('current')));
    } else if (name === BEACON_STORE_ATTRIBUTE) {
      const value = inspirationFromStore(readStore(attr));
      if (value !== undefined) {
        handleSheetValue(charId, value);
      }
    }
  }

  /**
   * Handles a changed token: the marker added or taken off by hand or by
   * another Mod, or the token linked to a different character.
   *
   * @param {object} token Roll20 graphic.
   * @param {object} prev Previous attributes.
   * @returns {Promise<void>}
   */
  async function handleGraphic(token, prev) {
    if (!isToken(token) || !token.get('represents')) {
      return;
    }
    if (prev && prev.represents !== undefined && prev.represents !== token.get('represents')) {
      await markNewToken(token);
      return;
    }
    const marker = getConfig().marker;
    const now = hasMarker(token.get('statusmarkers'), marker);
    const before = hasMarker(prev?.statusmarkers, marker);
    if (now !== before) {
      await handleMarkerChange(token, now);
    }
  }

  /**
   * Shows the marker on a token that was just placed or relinked, when its
   * character has inspiration.
   *
   * @param {object} token Roll20 graphic.
   * @returns {Promise<void>}
   */
  async function markNewToken(token) {
    const charId = token.get('represents');
    if (!isToken(token) || !charId) {
      return;
    }
    let inspired = getKnown(charId);
    if (inspired === undefined) {
      const value = await readInspiration(charId);
      if (value.kind === 'none') {
        return;
      }
      inspired = value.inspired;
    }
    syncTokens(charId, inspired);
  }

  /**
   * Registers with TokenMod (if installed), because the API raises no change
   * event when another Mod changes a token's markers.
   *
   * @returns {void}
   */
  function observeOtherMods() {
    if (typeof TokenMod !== 'undefined' && typeof TokenMod?.ObserveTokenChange === 'function') {
      TokenMod.ObserveTokenChange(guarded('TokenMod observer', handleGraphic));
    }
  }

  /**
   * Publishes the API other Mods can call. Character IDs or token IDs work.
   *
   * @returns {void}
   */
  function publishApi() {
    const character = (id) => {
      const token = getObj('graphic', id);
      return getObj('character', token ? token.get('represents') : id);
    };
    const run = async (id, fn) => {
      const c = character(id);
      return c ? (await fn(c, API_PLAYER_ID)).status : 'unknown';
    };
    globalThis.InspirationTracker = Object.freeze({
      version: SCRIPT_VERSION,
      /**
       * Registers a function called with (token, prev) whenever this Mod
       * changes a token's markers.
       *
       * @param {Function} fn Observer.
       * @returns {void}
       */
      ObserveTokenChange(fn) {
        observeTokenChange(fn);
      },
      /**
       * Says whether a character has inspiration.
       *
       * @param {string} id Character or token ID.
       * @returns {Promise<boolean>} True when inspired.
       */
      async isInspired(id) {
        const c = character(id);
        return c ? (await readInspiration(c.id)).inspired : false;
      },
      /**
       * Gives inspiration.
       *
       * @param {string} id Character or token ID.
       * @returns {Promise<string>} Result status.
       */
      give: (id) => run(id, give),
      /**
       * Spends inspiration, announcing it as a player's spend would be.
       *
       * @param {string} id Character or token ID.
       * @returns {Promise<string>} Result status.
       */
      spend: (id) => run(id, spend),
      /**
       * Takes inspiration away quietly.
       *
       * @param {string} id Character or token ID.
       * @returns {Promise<string>} Result status.
       */
      remove: (id) => run(id, (c) => remove(c)),
    });
  }

  /**
   * Startup: set up state, handouts and the API, then read every sheet once.
   *
   * @returns {Promise<void>}
   */
  async function checkInstall() {
    const { migrated, command } = initialiseState();
    applyGlobalConfig();
    installHandouts();
    observeOtherMods();
    publishApi();
    ready = true;
    log(`-=> ${SCRIPT_NAME} v${SCRIPT_VERSION} [Updated: ${SCRIPT_LAST_UPDATED}] <=-`);

    const counts = await syncAll();
    const lang = getConfig().language;
    const line = (text) => `<div style="margin-top:3px">${escapeHtml(text)}</div>`;
    const lines = [`<div><strong>${escapeHtml(t('titles.ready', lang))}</strong></div>`];
    lines.push(line(t('messages.synced', lang, counts)));
    if (migrated) {
      lines.push(line(t('messages.migrated', lang)));
      if (command) {
        lines.push(
          line(t('messages.legacyCommand', lang, { command: `!${command}`, main: COMMAND }))
        );
      }
    }
    if (takeNoticeOnce('macroHint')) {
      lines.push(line(t('messages.macroHint', lang, { command: `${COMMAND} macro` })));
    }
    lines.push(
      `<div style="font-size:0.85em;margin-top:3px">${escapeHtml(t('messages.readyHint', lang, { command: COMMAND }))}</div>`
    );
    whisper(null, `${SCRIPT_NAME} v${SCRIPT_VERSION}`, lines);
    if (migrated) {
      showMainMenu(null);
    }
  }

  /**
   * Registers all Roll20 event handlers.
   *
   * @returns {void}
   */
  function registerEventHandlers() {
    on('ready', () => {
      checkInstall().catch((err) => logError('startup', err));
    });
    on('chat:message', guarded('chat:message', handleInput));
    on('change:attribute', guarded('change:attribute', handleAttribute));
    on('add:attribute', guarded('add:attribute', handleAttribute));
    on('change:graphic', guarded('change:graphic', handleGraphic));
    on('add:graphic', guarded('add:graphic', markNewToken));
    on(
      'destroy:character',
      guarded('destroy:character', (obj) => forgetCharacter(obj.id))
    );
  }

  registerEventHandlers();
})();
