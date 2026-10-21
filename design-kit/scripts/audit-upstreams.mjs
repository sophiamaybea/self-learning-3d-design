#!/usr/bin/env node
// Live GitHub metadata review; output is not automatically treated as legal or security clearance.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(base, 'catalog.json'), 'utf8'));
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = { 'Accept': 'application/vnd.github+json', 'User-Agent': 'chatgpt-design-toolkit-auditor', 'X-GitHub-Api-Version': '2022-11-28' };
if (token) headers.Authorization = 'Bearer ' + token;
const now = new Date();
const results = [];
for (const entry of data.repositories) {
  try {
    const res = await fetch('https://api.github.com/repos/' + entry.repo, { headers, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error('GitHub status ' + res.status);
    const obj = await res.json();
    const pushed = obj.pushed_at ?? null;
    const days = pushed ? Math.floor((now - new Date(pushed)) / 86400000) : null;
    const detected = obj.license?.spdx_id ?? null;
    const severity = (obj.archived || detected === 'NOASSERTION' || !detected || days > 365) ? 'review' : 'ok';
    const notes = [];
    if (obj.archived) notes.push('archived');
    if (days > 365) notes.push('stale more than one year');
    if (!detected || detected === 'NOASSERTION') notes.push('licence not recognised by API: inspect actual LICENSE/README/package');
    if (obj.full_name?.toLowerCase() !== entry.repo.toLowerCase()) notes.push('repository moved or renamed to ' + obj.full_name);
    results.push({ repo: entry.repo, canonical: obj.full_name, observed_license: entry.license_observed, github_license: detected, archived: obj.archived, last_push: pushed, days_since_push: days, severity, notes });
  } catch (e) {
    results.push({ repo: entry.repo, severity: 'error', error: String(e) });
  }
}
const report = { ran_at: now.toISOString(), warning: 'Metadata and GitHub licence detection only. Not runtime, CVE, source-code or legal certification.', entries: results };
const out = process.argv.includes('--write') ? resolve(base, 'upstream-report.json') : null;
if (out) writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ checked: results.length, ok: results.filter(r => r.severity === 'ok').length, review: results.filter(r => r.severity === 'review').length, errors: results.filter(r => r.severity === 'error').length, findings: results.filter(r => r.severity !== 'ok') }, null, 2));
if (results.some(r => r.severity === 'error')) process.exitCode = 2;
