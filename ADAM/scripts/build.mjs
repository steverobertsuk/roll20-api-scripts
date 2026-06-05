import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup, watch } from 'rollup';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');
const explicitVersion = args.find((a) => !a.startsWith('--')) ?? null;

/**
 * Bumps or sets the version in script.json and syncs package.json.
 * Delegates to bump-version.mjs so version logic stays in one place.
 *
 * @returns {void}
 */
function bumpVersion() {
  const bumpScript = resolve(__dirname, 'bump-version.mjs');
  const versionArg = explicitVersion != null ? ` ${explicitVersion}` : '';
  execSync(`node "${bumpScript}"${versionArg}`, { stdio: 'inherit' });
}

/**
 * Builds the Roll20 bundle once.
 * Bumps (or sets) the version first, then imports the Rollup config so that
 * the banner captures the updated version and build timestamp.
 *
 * @returns {Promise<void>}
 */
async function buildOnce() {
  bumpVersion();
  // Dynamic import after version bump so rollup.config.mjs reads the updated script.json.
  const { default: config } = await import('../rollup.config.mjs');
  const bundle = await rollup(config);
  const outputs = Array.isArray(config.output) ? config.output : [config.output];
  for (const output of outputs) {
    await bundle.write(output);
  }
  await bundle.close();
  const metadata = JSON.parse(readFileSync(resolve(__dirname, '../script.json'), 'utf8'));
  console.log(`Built ${metadata.script} and ${metadata.version}/${metadata.script}`);
}

/**
 * Starts Rollup in watch mode. Does not bump the version — use
 * `npm run build -- <version>` or `npm run set-version -- <version>` first.
 *
 * @returns {Promise<void>}
 */
async function watchBuild() {
  const { default: config } = await import('../rollup.config.mjs');
  const watcher = watch(config);
  watcher.on('event', (event) => {
    if (event.code === 'ERROR') {
      console.error(event.error);
      return;
    }
    if (event.code === 'END') {
      const metadata = JSON.parse(readFileSync(resolve(__dirname, '../script.json'), 'utf8'));
      console.log(`Rebuilt ${metadata.script}`);
    }
  });
}

if (isWatchMode) {
  await watchBuild();
} else {
  await buildOnce();
}
