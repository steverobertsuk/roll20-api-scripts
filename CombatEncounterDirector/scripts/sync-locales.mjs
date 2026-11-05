import console from 'node:console';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import https from 'node:https';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import prettier from 'prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LOCALE_DIR = resolve(__dirname, '../src/locales/locale');
const SOURCE_LOCALE = 'en-US';
const GOOGLE_TRANSLATE_HOST = 'translate.googleapis.com';
const GOOGLE_TRANSLATE_PATH = '/translate_a/single?client=gtx';

/**
 * @typedef {{ timeoutMs: number, maxRetries: number, retryDelayMs: number, interRequestDelayMs: number }} TranslateConfig
 */

/** @type {TranslateConfig} */
const SYNC_CONFIG = {
  timeoutMs: 30000,
  maxRetries: 2,
  retryDelayMs: 8000,
  interRequestDelayMs: 2000,
};

/** @type {TranslateConfig} */
const REGENERATE_CONFIG = {
  timeoutMs: 60000,
  maxRetries: 4,
  retryDelayMs: 10000,
  interRequestDelayMs: 3000,
};

// Masked and put back unchanged: {placeholders}, &lt;tags&gt;, --options, !commands and
// code such as rgba(0,0,0,0.8) (the translator turned its decimal point into a comma).
const PLACEHOLDER_SOURCE = String.raw`\{[^{}]+\}|&lt;[^&]+&gt;|--[a-zA-Z0-9_-]+|![a-zA-Z][\w-]*|\b[a-z]+\((?:[^()\s]*\d[^()\s]*)?\)`;
const PLACEHOLDER_PATTERN = new RegExp(`(${PLACEHOLDER_SOURCE})`, 'g');
// The translator sometimes changes the case of mask tokens, so they are matched case-insensitively.
const MASK_TOKEN_PATTERN = /__L10N_PLACEHOLDER_(\d+)__/giu;
// Zero-width characters the translator leaves inside words.
const ZERO_WIDTH_PATTERN = /[​‌‍⁠﻿]/gu;

const GLOSSARY_FILE = resolve(__dirname, 'locale-glossary.json');
/** Names kept in English in every Mod: Roll20 and its editor and sheet names. A Mod adds its own in the glossary. */
const DEFAULT_KEEP = ['Roll20', 'Jumpgate', 'Legacy', 'Beacon'];

/**
 * A word the translator gets wrong without context.
 * - `en`: the English word; its plural (`s`/`es`) is matched too, case-insensitively.
 * - `sendAs`: optional clearer English sent in its place, e.g. "hex tile" for "hex".
 * - `locales`: per locale, `use` lists stems one of which a translation must contain,
 *   and `avoid` lists stems it must not contain (both case-insensitive).
 *
 * @typedef {{ en: string, sendAs?: string, locales?: Record<string, { use?: string[], avoid?: string[] }> }} GlossaryTerm
 * @typedef {{ keep: string[], terms: GlossaryTerm[], keepPattern: RegExp | null }} Glossary
 */

/**
 * Escapes a string for use inside a regular expression.
 *
 * @param {string} text Literal text.
 * @returns {string} Escaped pattern.
 */
function escapeRegExp(text) {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);
}

/**
 * Builds a whole-word pattern for an English glossary word and its plural.
 *
 * @param {string} word English word.
 * @param {string} [flags='giu'] Pattern flags.
 * @returns {RegExp} Pattern capturing the word (1) and its plural ending (2).
 */
function termPattern(word, flags = 'giu') {
  return new RegExp(`(?<![\\p{L}\\p{N}])(${escapeRegExp(word)})(e?s)?(?![\\p{L}\\p{N}])`, flags);
}

/**
 * Loads the Mod's glossary (`scripts/locale-glossary.json`, optional) and adds the
 * names every Mod keeps in English.
 *
 * @returns {Glossary} Glossary with a combined pattern for the kept names.
 */
function loadGlossary() {
  let custom = {};
  try {
    custom = JSON.parse(readFileSync(GLOSSARY_FILE, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`[sync-locales] Cannot read ${GLOSSARY_FILE}: ${error.message}`);
    }
  }
  const keep = [...new Set([...DEFAULT_KEEP, ...(custom.keep ?? [])])].filter(Boolean);
  // Longest first, so "!hexploration set language" wins over "!hexploration".
  const sorted = [...keep].sort((a, b) => b.length - a.length);
  const keepPattern = sorted.length
    ? new RegExp(
        `(?<![\\p{L}\\p{N}])(?:${sorted.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}])`,
        'gu'
      )
    : null;
  return { keep, terms: custom.terms ?? [], keepPattern };
}

/** @type {Glossary} */
let glossary = { keep: [], terms: [], keepPattern: null };

/**
 * Review notes collected during a run: translations that broke a glossary rule.
 *
 * @type {string[]}
 */
const reviewNotes = [];

/**
 * Replaces glossary words with their clearer `sendAs` English, keeping the plural
 * and a leading capital.
 *
 * @param {string} text Masked source string.
 * @returns {string} Text to send to the translator.
 */
function applySendAs(text) {
  return glossary.terms.reduce((result, term) => {
    if (!term.sendAs) {
      return result;
    }
    return result.replaceAll(termPattern(term.en), (match, word, plural) => {
      const replacement = `${term.sendAs}${plural ? 's' : ''}`;
      return /^\p{Lu}/u.test(word)
        ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
        : replacement;
    });
  }, text);
}

/**
 * Lists the glossary rules a translation breaks.
 *
 * @param {string} source English source string.
 * @param {string} translated Translated string.
 * @param {string} localeCode Target locale code.
 * @returns {string[]} Problems found; empty when the translation follows the glossary.
 */
function glossaryProblems(source, translated, localeCode) {
  const problems = [];
  for (const name of glossary.keep) {
    if (termPattern(name, 'u').test(source) && !translated.includes(name)) {
      problems.push(`"${name}" should stay in English`);
    }
  }
  // Kept names such as "Hex (V)" or "Hexploration" contain glossary words; leave them out
  // of the term checks on both sides.
  const withoutKept = (text) =>
    glossary.keepPattern ? text.replaceAll(glossary.keepPattern, ' ') : text;
  const prose = withoutKept(source);
  const lower = withoutKept(translated).toLocaleLowerCase(localeCode);
  for (const term of glossary.terms) {
    const rule = term.locales?.[localeCode];
    if (!rule || !termPattern(term.en).test(prose)) {
      continue;
    }
    const use = rule.use ?? [];
    if (use.length && !use.some((stem) => lower.includes(stem.toLocaleLowerCase(localeCode)))) {
      problems.push(`"${term.en}" should be ${use.map((stem) => `"${stem}…"`).join(' or ')}`);
    }
    for (const stem of rule.avoid ?? []) {
      if (lower.includes(stem.toLocaleLowerCase(localeCode))) {
        problems.push(`"${term.en}" must not be "${stem}…"`);
      }
    }
  }
  return problems;
}

/**
 * Loads a locale module from disk and returns its translation object.
 *
 * @param {string} localeCode Locale code to load from `src/locales/locale`.
 * @returns {Promise<Record<string, unknown>>} Parsed translation object exported by the locale module.
 */
async function loadLocale(localeCode) {
  const filePath = resolve(LOCALE_DIR, `${localeCode}.js`);
  const moduleUrl = pathToFileURL(filePath).href;
  const loaded = await import(moduleUrl);
  return loaded.default;
}

/**
 * Replaces templated tokens with stable placeholders before translation.
 *
 * @param {string} text Source string that may include placeholders like `{name}`.
 * @returns {{ masked: string, placeholders: string[] }} Masked string and placeholder list for later restoration.
 */
function maskPlaceholders(text) {
  const placeholders = [];
  const mask = (match) => {
    const token = `__L10N_PLACEHOLDER_${placeholders.length}__`;
    placeholders.push(match);
    return token;
  };
  // Kept names first, so a kept command such as "!mod set language" is masked whole.
  const kept = glossary.keepPattern ? text.replaceAll(glossary.keepPattern, mask) : text;
  return { masked: kept.replaceAll(PLACEHOLDER_PATTERN, mask), placeholders };
}

/**
 * Restores templated tokens after translation has completed.
 *
 * @param {string} text Translated string containing placeholder tokens.
 * @param {string[]} placeholders Original placeholders captured before translation.
 * @returns {string} Restored string with original placeholders reinserted.
 */
function unmaskPlaceholders(text, placeholders) {
  return placeholders.reduce(
    (restored, placeholder, index) =>
      restored
        .replaceAll(`__L10N_PLACEHOLDER_${index}__`, placeholder)
        .replaceAll(`__L10N_PLACEHOLDER_${index}__`, placeholder),
    text
  );
}

/**
 * Fetches translated payload JSON from Google Translate.
 *
 * @param {string} pathnameWithQuery Request path and query string for the fixed translate host.
 * @param {number} timeoutMs Request timeout in milliseconds.
 * @returns {Promise<unknown>} Parsed JSON payload from the translate endpoint.
 */
function fetchTranslatePayload(pathnameWithQuery, timeoutMs) {
  return new Promise((resolvePayload, rejectPayload) => {
    const request = https.request(
      {
        hostname: GOOGLE_TRANSLATE_HOST,
        method: 'GET',
        path: pathnameWithQuery,
      },
      (response) => {
        const statusCode = response.statusCode ?? 0;
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          if (statusCode < 200 || statusCode >= 300) {
            rejectPayload(new Error(`HTTP ${statusCode}`));
            return;
          }
          try {
            resolvePayload(JSON.parse(body));
          } catch (error) {
            rejectPayload(error);
          }
        });
      }
    );

    request.setTimeout(timeoutMs, () => {
      request.destroy(new Error('Request timed out'));
    });
    request.on('error', (error) => rejectPayload(error));
    request.end();
  });
}

/**
 * Translates a single English string into a target locale with retry logic.
 *
 * @param {string} text English source text to translate.
 * @param {string} targetLocale Destination locale code.
 * @param {Map<string, string>} cache In-memory cache for locale/text translation results.
 * @param {TranslateConfig} config Translation configuration.
 * @param {number} [attempt=0] Current retry attempt number.
 * @returns {Promise<string>} Translated string (or original text if all retries fail).
 */
async function translateSingle(text, targetLocale, cache, config, attempt = 0) {
  if (!text.trim()) {
    return text;
  }

  const cacheKey = `${targetLocale}::${text}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { masked, placeholders } = maskPlaceholders(text);
  const query = `&sl=en&tl=${encodeURIComponent(targetLocale)}&dt=t&q=${encodeURIComponent(applySendAs(masked))}`;
  const requestPath = `${GOOGLE_TRANSLATE_PATH}${query}`;

  // Add inter-request delay to avoid rate limiting.
  await new Promise((resolve) => setTimeout(resolve, config.interRequestDelayMs));

  try {
    const payload = await fetchTranslatePayload(requestPath, config.timeoutMs);
    const translatedMasked = Array.isArray(payload?.[0])
      ? payload[0].map((part) => part?.[0] || '').join('')
      : text;

    const translated = unmaskPlaceholders(translatedMasked, placeholders).replaceAll(
      ZERO_WIDTH_PATTERN,
      ''
    );
    cache.set(cacheKey, translated);
    return translated;
  } catch (error) {
    if (attempt < config.maxRetries && error.message.includes('timed out')) {
      const delayMs = config.retryDelayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return translateSingle(text, targetLocale, cache, config, attempt + 1);
    }

    if (attempt === config.maxRetries) {
      console.error(
        `[sync-locales] Translation failed for ${targetLocale} after ${config.maxRetries} retries: ${error.message}`
      );
    }
    cache.set(cacheKey, text);
    return text;
  }
}

/**
 * Creates a mutable translation placeholder that is finalized later.
 *
 * @param {string} sourceValue English source value that needs translation.
 * @param {Array<{ set: (value: string) => void, text: string }>} translationTasks Task list used to backfill translated values.
 * @returns {{ readonly value: string }} Deferred wrapper whose `value` is set after translation tasks complete.
 */
function createDeferredTranslation(sourceValue, translationTasks) {
  let translatedValue = sourceValue;
  translationTasks.push({
    text: sourceValue,
    set: (value) => {
      translatedValue = value;
    },
  });
  return {
    get value() {
      return translatedValue;
    },
  };
}

/**
 * Counts the number of strings that need translation in a locale.
 *
 * @param {unknown} sourceValue Source locale node from `en-US`.
 * @param {unknown} targetValue Target locale node at the same path.
 * @param {boolean} [forceRetranslate=false] Whether to count already-translated strings.
 * @returns {number} Count of strings needing translation.
 */
function countTranslationNeeds(sourceValue, targetValue, forceRetranslate = false) {
  if (typeof sourceValue === 'string') {
    return forceRetranslate || typeof targetValue !== 'string' || targetValue === sourceValue
      ? 1
      : 0;
  }

  if (Array.isArray(sourceValue)) {
    const targetArray = Array.isArray(targetValue) ? targetValue : [];
    return sourceValue.reduce(
      (sum, item, index) => sum + countTranslationNeeds(item, targetArray[index], forceRetranslate),
      0
    );
  }

  if (sourceValue && typeof sourceValue === 'object') {
    const targetObj =
      targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)
        ? /** @type {Record<string, unknown>} */ (targetValue)
        : {};
    return Object.keys(/** @type {Record<string, unknown>} */ (sourceValue)).reduce(
      (sum, key) =>
        sum +
        countTranslationNeeds(
          /** @type {Record<string, unknown>} */ (sourceValue)[key],
          targetObj[key],
          forceRetranslate
        ),
      0
    );
  }

  return 0;
}

/**
 * Synchronizes array entries recursively against source locale structure.
 *
 * @param {unknown[]} sourceArray Source array from `en-US`.
 * @param {unknown} targetValue Current locale value for the same key path.
 * @param {{ missing: number, translated: number }} stats Mutable counters for reporting sync actions.
 * @param {Array<{ set: (value: string) => void, text: string }>} translationTasks Deferred translation tasks collected during traversal.
 * @param {(sourceValue: unknown, targetValue: unknown, stats: { missing: number, translated: number }, translationTasks: Array<{ set: (value: string) => void, text: string }>) => unknown} syncEntry Recursive sync function used for nested values.
 * @returns {unknown[]} Synchronized array preserving source structure.
 */
function syncArray(sourceArray, targetValue, stats, translationTasks, syncEntry) {
  const targetArray = Array.isArray(targetValue) ? targetValue : [];
  const synced = [];

  for (let index = 0; index < sourceArray.length; index += 1) {
    if (index >= targetArray.length) {
      stats.missing += 1;
    }

    synced.push(syncEntry(sourceArray[index], targetArray[index], stats, translationTasks));
  }

  return synced;
}

/**
 * Synchronizes object keys recursively against the source schema.
 * Keys present in the target but absent from the source are pruned (counted in stats.pruned).
 *
 * @param {Record<string, unknown>} sourceObject Source object from `en-US`.
 * @param {unknown} targetValue Current locale value for the same object path.
 * @param {{ missing: number, translated: number, pruned: number }} stats Mutable counters for reporting sync actions.
 * @param {Array<{ set: (value: string) => void, text: string }>} translationTasks Deferred translation tasks collected during traversal.
 * @param {(sourceValue: unknown, targetValue: unknown, stats: { missing: number, translated: number, pruned: number }, translationTasks: Array<{ set: (value: string) => void, text: string }>) => unknown} syncEntry Recursive sync function used for nested values.
 * @returns {Record<string, unknown>} Synchronized object with schema-only keys retained.
 */
function syncObject(sourceObject, targetValue, stats, translationTasks, syncEntry) {
  const targetObject =
    targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)
      ? /** @type {Record<string, unknown>} */ (targetValue)
      : {};
  const synced = {};

  for (const key of Object.keys(sourceObject)) {
    if (!(key in targetObject)) {
      stats.missing += 1;
    }

    synced[key] = syncEntry(sourceObject[key], targetObject[key], stats, translationTasks);
  }

  for (const key of Object.keys(targetObject)) {
    if (!(key in synced)) {
      stats.pruned += 1;
    }
  }

  return synced;
}

/**
 * Synchronizes a single string value against the English source string.
 *
 * @param {unknown} sourceValue Source locale value expected to be a string.
 * @param {unknown} targetValue Target locale value to compare.
 * @param {{ missing: number, translated: number, forceRetranslate: boolean }} stats Mutable counters for reporting sync actions.
 * @param {Array<{ set: (value: string) => void, text: string }>} translationTasks Deferred translation tasks collected during traversal.
 * @returns {unknown} Existing localized string or deferred translated value wrapper.
 */
function syncStringValue(sourceValue, targetValue, stats, translationTasks) {
  if (typeof targetValue !== 'string') {
    stats.missing += 1;
    stats.translated += 1;
    return createDeferredTranslation(sourceValue, translationTasks);
  }

  if (stats.forceRetranslate || targetValue === sourceValue) {
    stats.translated += 1;
    return createDeferredTranslation(sourceValue, translationTasks);
  }

  return targetValue;
}

/**
 * Recursively synchronizes any translation node (string, array, object, or primitive).
 *
 * @param {unknown} sourceValue Source locale node from `en-US`.
 * @param {unknown} targetValue Target locale node at the same path.
 * @param {{ missing: number, translated: number }} stats Mutable counters for reporting sync actions.
 * @param {Array<{ set: (value: string) => void, text: string }>} translationTasks Deferred translation tasks collected during traversal.
 * @returns {unknown} Synchronized node value.
 */
function syncValue(sourceValue, targetValue, stats, translationTasks) {
  if (typeof sourceValue === 'string') {
    return syncStringValue(sourceValue, targetValue, stats, translationTasks);
  }

  if (Array.isArray(sourceValue)) {
    return syncArray(sourceValue, targetValue, stats, translationTasks, syncValue);
  }

  if (sourceValue && typeof sourceValue === 'object') {
    return syncObject(
      /** @type {Record<string, unknown>} */ (sourceValue),
      targetValue,
      stats,
      translationTasks,
      syncValue
    );
  }

  return targetValue ?? sourceValue;
}

/**
 * Resolves deferred translation placeholders into plain serializable values.
 *
 * @param {unknown} value Node value that may contain deferred translation wrappers.
 * @returns {unknown} Fully materialized value safe for JSON serialization.
 */
function finalizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => finalizeValue(entry));
  }

  if (value && typeof value === 'object') {
    if ('value' in value && Object.keys(value).length === 1) {
      return value.value;
    }

    const finalized = {};
    for (const [key, entryValue] of Object.entries(value)) {
      finalized[key] = finalizeValue(entryValue);
    }
    return finalized;
  }

  return value;
}

/**
 * Writes a locale translation object to its locale module file and formats it with Prettier.
 *
 * @param {string} localeCode Locale code for the output file name.
 * @param {Record<string, unknown>} localeData Synchronized translation data to persist.
 * @returns {Promise<void>} Resolves after the file has been written and formatted.
 */
async function writeLocale(localeCode, localeData) {
  const filePath = resolve(LOCALE_DIR, `${localeCode}.js`);
  const content = `const TRANSLATION = ${JSON.stringify(localeData, null, 2)};\n\nexport default TRANSLATION;\n`;
  writeFileSync(filePath, content, 'utf8');
  const formatted = await prettier.format(content, { filepath: filePath });
  writeFileSync(filePath, formatted, 'utf8');
}

/**
 * Processes translation tasks for a single locale and writes the result to disk.
 *
 * @param {string} localeCode Locale code to process.
 * @param {Record<string, unknown>} source Source locale data from `en-US`.
 * @param {Record<string, unknown>} localeData Current locale data.
 * @param {Map<string, string>} cache In-memory cache for translation results.
 * @param {TranslateConfig} config Translation configuration.
 * @param {boolean} forceRetranslate Whether to re-translate already-translated strings.
 * @returns {Promise<void>}
 */
async function processLocale(localeCode, source, localeData, cache, config, forceRetranslate) {
  const stats = { missing: 0, translated: 0, pruned: 0, forceRetranslate };
  const translationTasks = [];
  const syncedDraft = syncValue(source, localeData, stats, translationTasks);

  if (translationTasks.length === 0 && stats.pruned === 0) {
    console.info(`[sync-locales] ${localeCode}: up to date`);
    return;
  }

  const uniqueTexts = [...new Set(translationTasks.map((task) => task.text))];
  const translatedByText = new Map();

  for (const text of uniqueTexts) {
    const translated = await translateSingle(text, localeCode, cache, config);
    translatedByText.set(text, translated);
  }

  for (const task of translationTasks) {
    const translated = translatedByText.get(task.text) ?? task.text;
    task.set(translated);
    if (translated !== task.text) {
      for (const problem of glossaryProblems(task.text, translated, localeCode)) {
        reviewNotes.push(`${localeCode} ${task.text}: ${problem}`);
      }
    }
  }

  const synced = finalizeValue(syncedDraft);
  await writeLocale(localeCode, synced);

  const prunedNote = stats.pruned > 0 ? `, pruned ${stats.pruned}` : '';
  console.info(
    `[sync-locales] ${localeCode}: missing ${stats.missing}, translated ${stats.translated}${prunedNote}`
  );
}

/**
 * Synchronizes all non-English locale files against `en-US`.
 * Processes locales in order of most strings needing translation first,
 * then oldest by last-modified date, so interrupted runs make the most progress.
 *
 * @param {string} [localeFilter] Optional locale code to limit sync to a single locale.
 * @returns {Promise<void>} Resolves after all targeted locale files have been synchronized and written.
 */
export async function syncLocales(localeFilter) {
  const files = getLocaleCodes();

  if (localeFilter === SOURCE_LOCALE) {
    console.error(
      `[sync-locales] ${SOURCE_LOCALE} is the source locale and cannot be synchronized.`
    );
    process.exitCode = 1;
    return;
  }

  glossary = loadGlossary();
  reviewNotes.length = 0;
  const source = await loadLocale(SOURCE_LOCALE);
  let targetLocaleCodes = files.filter((code) => code !== SOURCE_LOCALE);

  if (localeFilter) {
    targetLocaleCodes = targetLocaleCodes.filter((code) => code === localeFilter);
    if (targetLocaleCodes.length === 0) {
      console.error(`[sync-locales] No locale found matching: ${localeFilter}`);
      process.exitCode = 1;
      return;
    }
  }

  // Pre-scan all locales to determine priority ordering without making any HTTP requests.
  const localeMetadata = await Promise.all(
    targetLocaleCodes.map(async (localeCode) => {
      const filePath = resolve(LOCALE_DIR, `${localeCode}.js`);
      const [localeData, { mtimeMs }] = [await loadLocale(localeCode), statSync(filePath)];
      const needsTranslation = countTranslationNeeds(source, localeData);
      return { localeCode, localeData, mtimeMs, needsTranslation };
    })
  );

  // Sort: most strings needing translation first, then oldest file as tiebreaker.
  localeMetadata.sort((a, b) => {
    if (b.needsTranslation !== a.needsTranslation) {
      return b.needsTranslation - a.needsTranslation;
    }
    return a.mtimeMs - b.mtimeMs;
  });

  const cache = new Map();

  for (const { localeCode, localeData } of localeMetadata) {
    await processLocale(localeCode, source, localeData, cache, SYNC_CONFIG, false);
  }
  reportReviewNotes();
}

/**
 * Prints the translations that broke a glossary rule, so they can be fixed by hand.
 *
 * @returns {void}
 */
function reportReviewNotes() {
  if (reviewNotes.length === 0) {
    return;
  }
  reviewNotes.sort();
  console.warn(
    `[sync-locales] ${reviewNotes.length} translation(s) to review against scripts/locale-glossary.json:`
  );
  for (const note of reviewNotes) {
    console.warn(`  ${note}`);
  }
}

/**
 * Collects every string in a locale tree with its key path.
 *
 * @param {unknown} node Locale node.
 * @param {string} path Key path of the node.
 * @param {Map<string, string>} out Strings by key path.
 * @returns {Map<string, string>} The same map.
 */
function collectStrings(node, path, out) {
  if (typeof node === 'string') {
    out.set(path, node);
  } else if (Array.isArray(node)) {
    node.forEach((item, index) => collectStrings(item, (path ? `${path}.${index}` : String(index)), out));
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      collectStrings(value, (path ? `${path}.${key}` : key), out);
    }
  }
  return out;
}

/**
 * Checks the existing translations against the glossary, without translating anything.
 * Strings still identical to English are skipped.
 *
 * @param {string} [localeFilter] Optional locale code.
 * @returns {Promise<number>} Number of problems found.
 */
export async function checkLocales(localeFilter) {
  let codes = getLocaleCodes().filter((code) => code !== SOURCE_LOCALE);
  if (localeFilter) {
    codes = codes.filter((code) => code === localeFilter);
    if (codes.length === 0) {
      console.error(`[sync-locales] No target locale found matching: ${localeFilter}`);
      process.exitCode = 1;
      return 0;
    }
  }
  if (!codes) {
    return 0;
  }
  glossary = loadGlossary();
  reviewNotes.length = 0;
  const source = collectStrings(await loadLocale(SOURCE_LOCALE), '', new Map());
  for (const localeCode of codes) {
    const target = collectStrings(await loadLocale(localeCode), '', new Map());
    for (const [path, english] of source) {
      const translated = target.get(path);
      if (typeof translated !== 'string' || translated === english) {
        continue;
      }
      if (new RegExp(ZERO_WIDTH_PATTERN.source, 'u').test(translated)) {
        reviewNotes.push(`${localeCode} ${path}: contains zero-width characters`);
      }
      for (const problem of glossaryProblems(english, translated, localeCode)) {
        reviewNotes.push(`${localeCode} ${path}: ${problem}`);
      }
    }
  }
  if (reviewNotes.length === 0) {
    console.info(`[sync-locales] ${codes.length} locale(s) follow the glossary.`);
  }
  reportReviewNotes();
  return reviewNotes.length;
}

/**
 * Regenerates translations for all (or a specific) locale, re-translating every string
 * regardless of whether it already has a translation. Uses longer timeouts.
 *
 * @param {string} [localeFilter] Optional locale code to limit regeneration to a single locale.
 * @returns {Promise<void>} Resolves after all targeted locale files have been regenerated.
 */
export async function regenerateLocales(localeFilter) {
  const files = readdirSync(LOCALE_DIR)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace(/\.js$/u, ''));

  if (localeFilter === SOURCE_LOCALE) {
    console.error(
      `[sync-locales] ${SOURCE_LOCALE} is the source locale and cannot be regenerated.`
    );
    process.exitCode = 1;
    return;
  }

  glossary = loadGlossary();
  reviewNotes.length = 0;
  const source = await loadLocale(SOURCE_LOCALE);
  let targetLocaleCodes = files.filter((code) => code !== SOURCE_LOCALE);

  if (localeFilter) {
    targetLocaleCodes = targetLocaleCodes.filter((code) => code === localeFilter);
    if (targetLocaleCodes.length === 0) {
      console.error(`[sync-locales] No locale found matching: ${localeFilter}`);
      process.exitCode = 1;
      return;
    }
  }

  const cache = new Map();

  for (const localeCode of targetLocaleCodes) {
    const localeData = await loadLocale(localeCode);
    await processLocale(localeCode, source, localeData, cache, REGENERATE_CONFIG, true);
  }
  reportReviewNotes();
}

/**
 * Parses CLI locale filter for regenerate mode.
 * Supports: --locale=<code>, --locale <code>, or a positional locale argument.
 *
 * @param {string[]} args CLI arguments excluding node and script paths.
 * @returns {string | undefined} Parsed locale filter.
 */
function parseLocaleFilter(args) {
  const isFlag = (arg) => arg.startsWith('-');
  const localeEq = args.find((arg) => arg.startsWith('--locale='))?.split('=')[1];
  const localeFlagIndex = args.indexOf('--locale');
  const localeNext =
    localeFlagIndex !== -1 && args[localeFlagIndex + 1] && !isFlag(args[localeFlagIndex + 1])
      ? args[localeFlagIndex + 1]
      : undefined;
  const positional = args.find((arg) => arg !== '--regenerate' && !isFlag(arg));

  const candidates = [localeEq, localeNext, positional].filter(
    (value, index, values) =>
      typeof value === 'string' && value.length > 0 && values.indexOf(value) === index
  );

  if (localeFlagIndex !== -1 && !localeNext && !localeEq) {
    console.error('[sync-locales] Missing locale value after --locale.');
    process.exitCode = 1;
    return undefined;
  }

  if (candidates.length > 1) {
    console.error(
      `[sync-locales] Conflicting locale values provided: ${candidates.join(', ')}. Use a single locale.`
    );
    process.exitCode = 1;
    return undefined;
  }

  return candidates[0];
}

/**
 * Collects locale codes from the locale directory (without `.js` extension).
 *
 * @returns {string[]} Locale codes discovered under `src/locales/locale`.
 */
function getLocaleCodes() {
  return readdirSync(LOCALE_DIR)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace(/\.js$/u, ''));
}

/**
 * Builds a sync timing estimate used for pre-run warnings.
 *
 * Estimated formula:
 * - minimum: 4 minutes × locale count
 * - maximum: 7 minutes × locales needing translation
 *
 * @param {string} [localeFilter] Optional locale code to limit estimate scope.
 * @returns {Promise<{ totalLocales: number, localesNeedingTranslation: number, estimatedMinMinutes: number, estimatedMaxMinutes: number } | null>}
 */
async function estimateSyncTiming(localeFilter) {
  const files = getLocaleCodes();
  const source = await loadLocale(SOURCE_LOCALE);
  let targetLocaleCodes = files.filter((code) => code !== SOURCE_LOCALE);

  if (localeFilter) {
    if (localeFilter === SOURCE_LOCALE) {
      console.error(
        `[sync-locales] ${SOURCE_LOCALE} is the source locale and cannot be synchronized.`
      );
      process.exitCode = 1;
      return null;
    }

    targetLocaleCodes = targetLocaleCodes.filter((code) => code === localeFilter);
    if (targetLocaleCodes.length === 0) {
      console.error(`[sync-locales] No locale found matching: ${localeFilter}`);
      process.exitCode = 1;
      return null;
    }
  }

  const localeMetadata = await Promise.all(
    targetLocaleCodes.map(async (localeCode) => {
      const localeData = await loadLocale(localeCode);
      const needsTranslation = countTranslationNeeds(source, localeData);
      return { localeCode, needsTranslation };
    })
  );

  const localesNeedingTranslation = localeMetadata.filter(
    ({ needsTranslation }) => needsTranslation > 0
  ).length;

  return {
    totalLocales: targetLocaleCodes.length,
    localesNeedingTranslation,
    estimatedMinMinutes: targetLocaleCodes.length * 4,
    estimatedMaxMinutes: localesNeedingTranslation * 7,
  };
}

/**
 * Prompts the user to confirm whether the run should proceed.
 *
 * @param {string[]} args CLI arguments excluding node and script paths.
 * @param {string} message Prompt message shown before confirmation.
 * @returns {Promise<boolean>} True when user confirms, otherwise false.
 */
async function confirmProceed(args, message) {
  if (args.includes('--yes') || args.includes('-y')) {
    return true;
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.warn(
      '[sync-locales] Non-interactive terminal detected; proceeding without confirmation.'
    );
    return true;
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${message}\n[sync-locales] Proceed? (y/N): `);
    return ['y', 'yes'].includes(answer.trim().toLowerCase());
  } finally {
    rl.close();
  }
}

/**
 * If this module is executed directly, run syncLocales or regenerateLocales based on CLI flags.
 * Flags:
 *   --regenerate     Force re-translation of all strings (uses longer timeouts).
 *   --locale=<code>  Limit regeneration to a single locale (only valid with --regenerate).
 *   --check          Check existing translations against the glossary.
 *   --yes / -y       Skip the confirmation prompt.
 */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const isRegenerate = args.includes('--regenerate');
  const localeFilter = parseLocaleFilter(args);

  if (process.exitCode) {
    process.exit(process.exitCode);
  }

  if (args.includes('--check')) {
    const problems = await checkLocales(localeFilter);
    process.exit(process.exitCode || (problems > 0 ? 1 : 0));
  }

  if (isRegenerate) {
    const localeCodes = getLocaleCodes().filter((code) => code !== SOURCE_LOCALE);
    const targetCount = localeFilter ? 1 : localeCodes.length;
    const targetLabel = localeFilter ? `${localeFilter}` : `${targetCount} locales`;
    const totalMin = targetCount * 30;
    const totalMax = targetCount * 60;

    const shouldProceed = await confirmProceed(
      args,
      `[sync-locales] Regenerate mode selected for ${targetLabel}. This can take 30-60 minutes per locale (about ${totalMin}-${totalMax} minutes total).`
    );

    if (!shouldProceed) {
      console.info('[sync-locales] Cancelled by user.');
      process.exit(0);
    }
  } else {
    const syncEstimate = await estimateSyncTiming(localeFilter);
    if (!syncEstimate) {
      process.exit(process.exitCode || 1);
    }
    const shouldProceed = await confirmProceed(
      args,
      `[sync-locales] Sync mode selected. This usually takes several minutes. Estimated minimum: about ${syncEstimate.estimatedMinMinutes} minutes (4 × ${syncEstimate.totalLocales} locales). Estimated maximum: about ${syncEstimate.estimatedMaxMinutes} minutes (7 × ${syncEstimate.localesNeedingTranslation} locales needing translation).`
    );

    if (!shouldProceed) {
      console.info('[sync-locales] Cancelled by user.');
      process.exit(0);
    }
  }

  if (isRegenerate) {
    await regenerateLocales(localeFilter);
  } else {
    await syncLocales(localeFilter);
  }
}
