#!/usr/bin/env node
// Claude Code Toolkit — updater.
// Pulls latest toolkit, updates Claude plugins, refreshes agent collections.

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOME = homedir();

const TTY = process.stdout.isTTY;
const C = TTY
  ? { bold: '\x1b[1m', dim: '\x1b[2m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', reset: '\x1b[0m' }
  : { bold: '', dim: '', green: '', yellow: '', cyan: '', reset: '' };
const ok = (s) => console.log(`  ${C.green}[+]${C.reset} ${s}`);
const warn = (s) => console.log(`  ${C.yellow}[!]${C.reset} ${s}`);
const banner = (s) => console.log(`\n${C.bold}${C.cyan}${s}${C.reset}`);

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, { encoding: 'utf8', shell: false, stdio: ['inherit', 'pipe', 'pipe'], ...opts });
}

banner('1/3 — Pulling latest toolkit');
const r1 = run('git', ['-C', __dirname, 'pull', '--ff-only']);
if (r1.status === 0) ok((r1.stdout || '').trim() || 'up to date');
else warn(`git pull: ${(r1.stderr || r1.stdout).trim()}`);

banner('2/3 — Updating Claude plugins');
if (run('which', ['claude']).status === 0 || run('where', ['claude']).status === 0) {
  const r = run('claude', ['plugin', 'update', '--all']);
  if (r.status === 0) ok('Plugins updated');
  else warn(`Plugin update: ${(r.stderr || r.stdout).trim().slice(0, 200)}`);
} else warn('claude CLI not found — skipping plugin update');

banner('3/3 — Refreshing agent collections');
const agentsRoot = join(HOME, '.claude', 'agents');
if (existsSync(agentsRoot)) {
  for (const d of readdirSync(agentsRoot, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const dir = join(agentsRoot, d.name);
    if (!existsSync(join(dir, '.git'))) continue;
    const r = run('git', ['-C', dir, 'pull', '--ff-only']);
    if (r.status === 0) ok(`Updated agents/${d.name}`);
    else warn(`agents/${d.name}: ${(r.stderr || r.stdout).trim().slice(0, 120)}`);
  }
} else warn('No agent collections to update');

console.log(`\n  ${C.green}${C.bold}Update complete.${C.reset}\n`);
