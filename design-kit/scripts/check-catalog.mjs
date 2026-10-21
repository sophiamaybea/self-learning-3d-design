#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(resolve(root, 'catalog.json'), 'utf8'));
const errors = [];
const seen = new Set();
if (catalog.total !== catalog.repositories.length) errors.push('Catalogue total does not match entries');
if (catalog.repositories.length !== 41) errors.push('Expected original 40 plus Lamina replacement (41)');
for (const item of catalog.repositories) {
  if (!item.id || !item.name || !item.repo || !item.url || !item.license_observed || !item.adoption) {
    errors.push('Missing required field: ' + JSON.stringify(item));
  }
  if (seen.has(item.repo.toLowerCase())) errors.push('Duplicate source: ' + item.repo);
  seen.add(item.repo.toLowerCase());
  if (item.url !== 'https://github.com/' + item.repo) errors.push('Unexpected URL: ' + item.url);
  if (item.adoption === 'runtime' && !['MIT', 'Apache-2.0', 'CUSTOM-GSAP'].includes(item.license_observed)) {
    errors.push('Runtime dependency with unresolved licence: ' + item.repo);
  }
  if (item.license_observed === 'NO-LICENSE-FOUND' && item.adoption !== 'reference-only') {
    errors.push('Unlicensed repository must be reference-only: ' + item.repo);
  }
  if (item.adoption === 'retired' && !item.archived) errors.push('Retired item must be archived: ' + item.repo);
}
if (errors.length) {
  for (const error of errors) console.error('ERROR:', error);
  process.exit(1);
}
console.log('Catalogue valid:', catalog.total, 'entries,', catalog.repositories.filter(r => r.adoption === 'runtime').length, 'runtime candidates');
