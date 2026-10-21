#!/usr/bin/env node
// Clone a single admissible reference for local study. Never publish the contents of .references.
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { spawnSync } from 'node:child_process';

const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(base, 'catalog.json'), 'utf8'));
const term = process.argv.slice(2).join(' ').trim().toLowerCase();
if (!term) {
  console.log('Usage: node design-kit/scripts/fetch-reference.mjs <repo-name-or-id>');
  console.log('Example: node design-kit/scripts/fetch-reference.mjs drei');
  process.exit(1);
}
const found = data.repositories.filter(r => String(r.id) === term || r.repo.toLowerCase() === term || r.name.toLowerCase() === term || basename(r.repo).toLowerCase() === term);
if (found.length !== 1) {
  console.error('Expected one unique match; matched', found.length, 'Use full owner/repo or numeric ID.');
  process.exit(1);
}
const entry = found[0];
if (['retired', 'reference-only', 'license-review'].includes(entry.adoption)) {
  console.error('Not auto-cloning ' + entry.repo + ' (' + entry.adoption + '). Read original licensing and obtain permission if needed.');
  process.exit(2);
}
const references = resolve(base, '.references');
mkdirSync(references, { recursive: true });
const target = resolve(references, entry.repo.replace('/', '--'));
if (existsSync(target)) {
  console.log('Already present: ' + target);
  process.exit(0);
}
const git = spawnSync('git', ['clone', '--filter=blob:none', '--depth', '1', '--', entry.url + '.git', target], { stdio: 'inherit' });
if (git.status !== 0) process.exit(git.status || 1);
console.log('Downloaded for local evaluation only. Do not commit third-party source, licence text or assets without authorisation.');
