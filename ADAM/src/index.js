import { SCRIPT_NAME, ADAM_VERSION, ADAM_LAST_UPDATED } from './constants.js';
import { handleAdam, handleSimon } from './commands.js';
import { whisperGM } from './messages.js';
import { initializeState, getSettings } from './state.js';
import { t } from './i18n.js';

/**
 * Boots A.D.A.M. when Roll20 signals API readiness.
 * Initializes state, logs version, and registers chat handlers.
 *
 * @returns {void}
 */
on('ready', () => {
  initializeState();
  const { language } = getSettings();
  log(`-=> ${SCRIPT_NAME} v${ADAM_VERSION} [Updated: ${ADAM_LAST_UPDATED}] <=-`);
  whisperGM(
    `<strong>${t('info.ready', language)}</strong> (v${ADAM_VERSION})`,
    t('titles.scriptReady', language)
  );
  on('chat:message', handleAdam);
  on('chat:message', handleSimon);
});
