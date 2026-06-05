export const SCRIPT_NAME = '__SCRIPT_NAME__';
export const ADAM_VERSION = '__BUILD_VERSION__';
export const ADAM_LAST_UPDATED = '__BUILD_DATE__';

export const COLOR_BG_DARK = '#0A1210';
export const COLOR_TEXT_LIGHT = '#C8FFF0';
export const COLOR_TEXT_DIM = '#8ABFB0';
export const COLOR_ACCENT_TEAL = '#00C896';
export const COLOR_ACCENT_DARK = '#006B4F';
export const COLOR_HEADER_LIGHT = '#CFFAEE';

export const COLOR_INFO_LIGHT = '#DBEAFE';
export const COLOR_INFO_DARK = '#1E40AF';
export const COLOR_ERROR_RED = '#D32F2F';
export const COLOR_ERROR_DARK = '#B71C1C';
export const COLOR_ERROR_LIGHT = '#FFCDD2';
export const COLOR_ERROR_BG_LIGHT = '#FFEBEE';
export const COLOR_SUCCESS_GREEN = '#2E7D32';
export const COLOR_SUCCESS_DARK = '#1B5E20';
export const COLOR_SUCCESS_LIGHT = '#E8F5E9';
export const COLOR_SUCCESS_BG_LIGHT = '#F1F5FE';

export const DIRECTIONS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

export const DIRECTION_ALIASES = {
  north: 'n',
  northeast: 'ne',
  east: 'e',
  southeast: 'se',
  south: 's',
  southwest: 'sw',
  west: 'w',
  northwest: 'nw',
};

// Grid unit deltas — multiply by pixels-per-move to get pixel offsets.
export const DIRECTION_DELTA = {
  n: { dx: 0, dy: -1 },
  ne: { dx: 1, dy: -1 },
  e: { dx: 1, dy: 0 },
  se: { dx: 1, dy: 1 },
  s: { dx: 0, dy: 1 },
  sw: { dx: -1, dy: 1 },
  w: { dx: -1, dy: 0 },
  nw: { dx: -1, dy: -1 },
};

// Token rotation in degrees (0 = north / facing up on the map).
export const DIRECTION_ROTATION = {
  n: 0,
  ne: 45,
  e: 90,
  se: 135,
  s: 180,
  sw: -135,
  w: -90,
  nw: -45,
};

// Which animation sprite set to use when facing each direction.
// Based on tokens supplied with north-facing and south-facing variants.
export const DIRECTION_ANIMATION_SET = {
  n: 'north',
  ne: 'north',
  e: 'south',
  se: 'south',
  s: 'south',
  sw: 'south',
  w: 'south',
  nw: 'north',
};

export const ALLOWED_STATES = [
  'idle',
  'combat',
  'walk',
  'dash',
  'sneak',
  'rage',
  'spellcasting',
  'help',
];

// Maps action command names to their resolved state values.
export const ACTION_STATE_MAP = {
  help: 'help',
  spellcast: 'spellcasting',
  spellcasting: 'spellcasting',
  'mage-hand': 'spellcasting',
  rage: 'rage',
  dash: 'dash',
  sneak: 'sneak',
  idle: 'idle',
  combat: 'combat',
  walk: 'walk',
};

export const ALLOWED_PROFILE_CREATION_MODES = ['gm-only', 'gm-approved', 'all-users'];

// Profile IDs must be alphanumeric, hyphens, and underscores only (max 50 chars).
export const PROFILE_ID_PATTERN = /^[\w-]{1,50}$/;

export const ALLOWED_ANIM_SETS = ['north', 'south'];

export const FACTORY_DEFAULTS = {
  gridSize: 70,
  moveDistance: 1,
  autoFace: true,
  humour: true,
  language: 'en-US',
  profileCreationMode: 'gm-only',
};

export const MOVE_HISTORY_LENGTH = 6;

export const NO_TOKEN_SELECTED_FUNNY_THRESHOLD_1 = 20;
export const NO_TOKEN_SELECTED_FUNNY_THRESHOLD_2 = 100;
export const SNEAK_SPAM_THRESHOLD = 10;
export const HELP_SPAM_THRESHOLD = 3;
export const VERSION_EASTER_EGG_CHANCE = 0.1;

export const CMD_ADAM = /^!adam\b/i;
export const CMD_SIMON = /^!simon\b/i;

export const FLAG_HELP = /--help\b/i;
export const FLAG_VERSION = /--version\b/i;
export const FLAG_CREDITS = /--credits\b/i;
export const FLAG_MOVE = /--move\b/i;
export const FLAG_FACE = /--face\b/i;
export const FLAG_STATE = /--state\b/i;
export const FLAG_ACTION = /--action\b/i;
export const FLAG_MENU = /--menu\b/i;
export const FLAG_CONFIG = /--config\b/i;
export const FLAG_PROFILE = /--profile\b/i;
export const FLAG_INSTALL_MACRO = /--install-macro\b/i;
export const FLAG_SHOW_SETTINGS = /--show-settings\b/i;
export const FLAG_RESET_SETTINGS = /--reset-settings\b/i;
