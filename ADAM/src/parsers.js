/**
 * Parses a string value following a flag and validates it against an allowed list.
 *
 * @param {string} content Full command content.
 * @param {RegExp} flagRegex Regex for the flag name.
 * @param {string[]} allowedValues Allowed lower-case values.
 * @returns {{found:boolean, valid:boolean, value:(string|null)}} Parse result.
 */
export function parseStringFlag(content, flagRegex, allowedValues) {
  const match = new RegExp(String.raw`${flagRegex.source}\s+(\S+)`, 'i').exec(content);
  if (!match) {
    return { found: false, valid: false, value: null };
  }
  const normalized = match[1]
    .trim()
    .replace(/^(['"])(.*)\1$/, '$2')
    .replace(/[.,;]+$/, '')
    .toLowerCase();
  if (allowedValues.includes(normalized)) {
    return { found: true, valid: true, value: normalized };
  }
  return { found: true, valid: false, value: match[1] };
}

/**
 * Parses a free-form string value following a flag (supports quoted values).
 *
 * @param {string} content Full command content.
 * @param {RegExp} flagRegex Regex for the flag name.
 * @returns {{found:boolean, value:(string|null)}} Parse result.
 */
export function parseFreeStringFlag(content, flagRegex) {
  const match = new RegExp(
    String.raw`${flagRegex.source}\s+(?:"([^"]+)"|'([^']+)'|(\S+))`,
    'i'
  ).exec(content);
  if (!match) {
    return { found: false, value: null };
  }
  const value = (match[1] ?? match[2] ?? match[3]).trim();
  return { found: true, value };
}

/**
 * Parses a boolean value (on/yes/true or off/no/false) following a flag.
 *
 * @param {string} content Full command content.
 * @param {RegExp} flagRegex Regex for the flag name.
 * @returns {{found:boolean, valid:boolean, value:(boolean|null)}} Parse result.
 */
export function parseBooleanFlag(content, flagRegex) {
  const result = parseFreeStringFlag(content, flagRegex);
  if (!result.found) {
    return { found: false, valid: false, value: null };
  }
  const v = result.value.toLowerCase();
  if (v === 'on' || v === 'yes' || v === 'true' || v === '1') {
    return { found: true, valid: true, value: true };
  }
  if (v === 'off' || v === 'no' || v === 'false' || v === '0') {
    return { found: true, valid: true, value: false };
  }
  return { found: true, valid: false, value: result.value };
}

/**
 * Parses an integer value following a flag, validated against an inclusive range.
 *
 * @param {string} content Full command content.
 * @param {RegExp} flagRegex Regex for the flag name.
 * @param {number} min Minimum allowed value.
 * @param {number} max Maximum allowed value.
 * @returns {{found:boolean, valid:boolean, value:(number|null)}} Parse result.
 */
export function parseIntegerFlag(content, flagRegex, min, max) {
  const match = new RegExp(String.raw`${flagRegex.source}\s+(\d+)`, 'i').exec(content);
  if (!match) {
    return { found: false, valid: false, value: null };
  }
  const value = parseInt(match[1], 10);
  if (!Number.isNaN(value) && value >= min && value <= max) {
    return { found: true, valid: true, value };
  }
  return { found: true, valid: false, value: null };
}
