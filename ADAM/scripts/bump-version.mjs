import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const scriptUrl = new URL('../script.json', import.meta.url);
const pkgUrl = new URL('../package.json', import.meta.url);
const script = JSON.parse(readFileSync(scriptUrl, 'utf8'));

/**
 * Increments the trailing numeric segment of a version string.
 * If the version ends with a build/iteration number (e.g. "1.1.0.beta-3.4"),
 * that number is incremented. Otherwise the semver patch is incremented
 * (e.g. "1.1.0" → "1.1.1").
 *
 * @param {string} version Current version string.
 * @returns {string} Bumped version string.
 */
function bumpTrailingNumber(version) {
  return version.replace(/(\d+)$/, (_, n) => String(Number(n) + 1));
}

/**
 * Syncs the version field in package.json to match script.json.
 * Keeps the two files in agreement so tooling that reads package.json
 * (editors, CI, release scripts) always sees the current version.
 *
 * @param {string} version Version string to write into package.json.
 * @returns {void}
 */
function syncPackageVersion(version) {
  const pkg = JSON.parse(readFileSync(pkgUrl, 'utf8'));
  if (pkg.version !== version) {
    pkg.version = version;
    writeFileSync(pkgUrl, JSON.stringify(pkg, null, 2) + '\n');
    execSync(`npx prettier --write "${pkgUrl.pathname.replace(/^\/([A-Z]:)/, '$1')}"`, {
      stdio: 'inherit',
    });
    console.log(`Synced package.json version to ${version}`);
  }
}

const explicitVersion = process.argv[2];
const previous = script.version;
script.version = explicitVersion ?? bumpTrailingNumber(previous);

writeFileSync(scriptUrl, JSON.stringify(script, null, 2) + '\n');
execSync(`npx prettier --write "${scriptUrl.pathname.replace(/^\/([A-Z]:)/, '$1')}"`, {
  stdio: 'inherit',
});

syncPackageVersion(script.version);

if (explicitVersion) {
  console.log(`Version set: ${previous} → ${script.version}`);
} else {
  console.log(`Version bumped: ${previous} → ${script.version}`);
}
