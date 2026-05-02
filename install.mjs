#!/usr/bin/env node
// Claude Code Toolkit — primary cross-platform installer.
// Reads .claude/plugins.json, prompts for an archetype, and provisions the matching bundle.
// Zero npm dependencies; Node 18+ required.

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, appendFileSync, symlinkSync, rmSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { homedir, platform } from 'node:os';
import { createInterface } from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IS_WINDOWS = platform() === 'win32';
const HOME = homedir();

// ---------- ANSI colors (TTY only) ----------
const TTY = process.stdout.isTTY;
const C = TTY
  ? { bold: '\x1b[1m', dim: '\x1b[2m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', reset: '\x1b[0m' }
  : { bold: '', dim: '', red: '', green: '', yellow: '', cyan: '', reset: '' };

const RULE = '─'.repeat(58);
const banner = (s) => console.log(`\n${C.dim}${RULE}${C.reset}\n${C.bold}${C.cyan}  ${s}${C.reset}\n${C.dim}${RULE}${C.reset}`);
const ok = (s) => console.log(`  ${C.green}✓${C.reset} ${s}`);
const warn = (s) => console.log(`  ${C.yellow}!${C.reset} ${s}`);
const skip = (s) => console.log(`  ${C.dim}·${C.reset} ${C.dim}${s}${C.reset}`);
const info = (s) => console.log(`  ${C.dim}${s}${C.reset}`);
const err = (s) => console.error(`  ${C.red}✗${C.reset} ${s}`);

// ---------- Args ----------
const ARGS = process.argv.slice(2);
const flag = (name) => ARGS.includes(name);
const arg = (name, def) => {
  const i = ARGS.indexOf(name);
  return i >= 0 && ARGS[i + 1] ? ARGS[i + 1] : def;
};

const DRY_RUN = flag('--dry-run');
const ALL = flag('--all');
const SKIP_PLUGINS = flag('--skip-plugins');
const SKIP_MCPS = flag('--skip-mcps');
const SKIP_SECRETS = flag('--skip-secrets');
const TARGET_ARG = arg('--target');
const ARCHETYPE_ARG = ALL ? 'all' : arg('--archetype');
const HELP = flag('--help') || flag('-h');

const TARGET = resolve(TARGET_ARG || process.cwd());
const CONFIG_DIR = __dirname;

if (HELP) {
  console.log(`
Claude Code Toolkit installer

Usage:
  node install.mjs [options]

Options:
  --target <path>       Target project directory (default: cwd)
  --archetype <name>    web | saas | ai | all | custom | files-only
  --all                 Shortcut for --archetype all (kitchen sink)
  --dry-run             Print every action; change nothing
  --skip-plugins        Don't run claude plugin / npx skills add
  --skip-mcps           Don't run claude mcp add
  --skip-secrets        Skip API key prompts
  -h, --help            Show this help

Examples:
  node install.mjs                          # interactive
  node install.mjs --all                    # install everything, prompts for secrets
  node install.mjs --archetype web          # premium-web bundle
  node install.mjs --archetype ai --dry-run # preview AI bundle, change nothing
`);
  process.exit(0);
}

// ---------- Readline (single instance, lazy) ----------
let _rl;
function rl() {
  if (!_rl) _rl = createInterface({ input: process.stdin, output: process.stdout });
  return _rl;
}
const askLine = (q) => new Promise((res) => rl().question(q, (a) => res(a)));

const NON_INTERACTIVE = !process.stdin.isTTY || DRY_RUN;

async function askYesNo(question, def = 'y') {
  const hint = def === 'y' ? 'Y/n' : 'y/N';
  if (NON_INTERACTIVE) {
    const choice = def === 'y';
    info(`(non-interactive) ${question} → ${choice ? 'yes' : 'no'} (default)`);
    return choice;
  }
  const a = (await askLine(`  ${C.bold}${question}${C.reset} [${hint}]: `)).trim() || def;
  return /^y/i.test(a);
}

async function askChoice(question, options) {
  console.log(`\n  ${C.bold}${question}${C.reset}`);
  options.forEach((o, i) => console.log(`    ${i + 1}) ${o.label}${o.tagline ? `  ${C.dim}— ${o.tagline}${C.reset}` : ''}`));
  if (NON_INTERACTIVE) {
    info(`(non-interactive) defaulting to: ${options[0].label}`);
    return options[0];
  }
  while (true) {
    const a = (await askLine(`  ${C.bold}Choice${C.reset} [1]: `)).trim() || '1';
    const n = parseInt(a, 10);
    if (n >= 1 && n <= options.length) return options[n - 1];
    warn(`Enter a number 1–${options.length}`);
  }
}

const SECRETS_COLLECTED = {};
const SKIPPED_SECRETS = new Set();

async function askSecret(name, description) {
  if (SKIP_SECRETS || NON_INTERACTIVE) {
    SKIPPED_SECRETS.add(name);
    return null;
  }
  const existing = process.env[name];
  if (existing) {
    const masked = `${existing.slice(0, 4)}****${existing.slice(-4)}`;
    if (await askYesNo(`${name} ${C.dim}(current: ${masked})${C.reset} — keep existing?`, 'y')) {
      SECRETS_COLLECTED[name] = existing;
      return existing;
    }
  }
  const v = (await askLine(`  ${name} ${C.dim}(${description})${C.reset}: `)).trim();
  if (v) {
    SECRETS_COLLECTED[name] = v;
    return v;
  }
  SKIPPED_SECRETS.add(name);
  return null;
}

// ---------- Run shell commands ----------
function run(cmd, args, opts = {}) {
  if (DRY_RUN) {
    info(`(dry-run) ${cmd} ${args.join(' ')}`);
    return { status: 0, stdout: '', stderr: '' };
  }
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: false, ...opts });
  return { status: r.status ?? 1, stdout: r.stdout || '', stderr: r.stderr || '' };
}

function which(cmd) {
  const r = spawnSync(IS_WINDOWS ? 'where' : 'which', [cmd], { encoding: 'utf8', shell: false });
  return r.status === 0 ? (r.stdout || '').split(/\r?\n/)[0].trim() : null;
}

// ---------- Welcome banner ----------
console.log(`
${C.bold}╔══════════════════════════════════════════════════════════╗${C.reset}
${C.bold}║       Welcome — Claude Code Toolkit Installer            ║${C.reset}
${C.bold}╚══════════════════════════════════════════════════════════╝${C.reset}

  ${C.bold}What this does${C.reset}
    Sets up Claude Code in your project with everything you need to build:
    websites, web apps, AI agents — pick what fits your project.

  ${C.bold}How long it takes${C.reset}
    About 2–10 minutes depending on what you pick. You can stop any time.

  ${C.bold}What you'll be asked${C.reset}
    1. What kind of project are you building?
    2. (Optional) API keys for tools you want — you can skip and add later.
    Everything else has a sensible default; pressing Enter is usually right.

  ${C.bold}Where things go${C.reset}
    Project: ${C.cyan}${TARGET}${C.reset}
    Mode:    ${DRY_RUN ? C.yellow + 'PREVIEW (no changes will be saved)' + C.reset : C.green + 'LIVE — changes will be saved' + C.reset}
`);

// ---------- Preflight ----------
banner('Step 1 of 6 — Checking your computer for the tools we need');

const NODE_MAJOR = parseInt(process.versions.node.split('.')[0], 10);
if (NODE_MAJOR < 18) {
  err(`Node.js ${process.versions.node} is too old.`);
  console.log(`
  ${C.bold}How to fix it:${C.reset}
    1. Download a newer Node.js (version 18 or higher) from:
       ${C.cyan}https://nodejs.org/${C.reset}
    2. Install it (just click through the installer).
    3. Close this window, open a new one, and re-run the installer.
`);
  process.exit(1);
}
ok(`Node.js ${process.versions.node}`);

const HAS_GIT = !!which('git');
const HAS_NPX = !!which('npx');
const HAS_CLAUDE = !!which('claude');
const HAS_UVX = !!which('uvx');

const toolStatus = [
  { name: 'Node.js', present: true, why: 'runs the installer (you have it!)', critical: true },
  { name: 'git', present: HAS_GIT, why: 'downloads agent collections from GitHub', install: 'https://git-scm.com/downloads', critical: false },
  { name: 'npx', present: HAS_NPX, why: 'comes with Node.js — handles skill installs', install: 'reinstall Node.js if missing', critical: false },
  { name: 'claude', present: HAS_CLAUDE, why: 'is Claude Code itself — needed for plugins & MCP servers', install: 'https://docs.claude.com/en/docs/claude-code', critical: false },
  { name: 'uvx', present: HAS_UVX, why: 'runs Python-based tools (only some MCP servers need this)', install: 'https://docs.astral.sh/uv/', critical: false, optional: true },
];

console.log('');
for (const t of toolStatus) {
  if (t.present) {
    ok(`${t.name} — ${C.dim}${t.why}${C.reset}`);
  } else if (t.optional) {
    skip(`${t.name} not installed — ${t.why}. (Optional. Install from: ${t.install})`);
  } else {
    warn(`${t.name} not found — ${t.why}.`);
    info(`${C.dim}    Install from: ${t.install}${C.reset}`);
    info(`${C.dim}    Then re-run this installer to enable those features.${C.reset}`);
  }
}

if (!HAS_CLAUDE && !SKIP_PLUGINS) {
  console.log('');
  warn(`Claude Code is not installed.`);
  info(`${C.dim}You can still set up the project files — Claude Code plugins and MCP servers will be skipped.${C.reset}`);
  info(`${C.dim}Install Claude Code from https://docs.claude.com/en/docs/claude-code, then re-run this installer to add them.${C.reset}`);
}

// ---------- Load manifest ----------
const MANIFEST_PATH = join(CONFIG_DIR, '.claude', 'plugins.json');
if (!existsSync(MANIFEST_PATH)) {
  err(`Manifest not found: ${MANIFEST_PATH}`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));

// ---------- Archetype selection ----------
banner('Step 2 of 6 — What are you building?');

console.log(`
  ${C.dim}Pick the option closest to your project. You can change later by re-running.${C.reset}

  ${C.bold}1)${C.reset} ${C.cyan}A website or landing page${C.reset}
     ${C.dim}For: marketing sites, portfolios, agency work, animated landing pages${C.reset}
     ${C.dim}Adds: design tools, motion + 3D libraries, page-builder skills${C.reset}

  ${C.bold}2)${C.reset} ${C.cyan}A web app or SaaS product${C.reset}
     ${C.dim}For: dashboards, B2B tools, multi-page apps with users and data${C.reset}
     ${C.dim}Adds: design + database + payments + monitoring + 100s of agents${C.reset}

  ${C.bold}3)${C.reset} ${C.cyan}An AI agent, chatbot, or RAG app${C.reset}
     ${C.dim}For: agents that take actions, search-over-docs, autonomous workflows${C.reset}
     ${C.dim}Adds: vector databases, search APIs, agent orchestration, RAG tooling${C.reset}

  ${C.bold}4)${C.reset} ${C.cyan}Install everything (recommended for first-timers)${C.reset}
     ${C.dim}Gives you all the tools so you can explore. About 5–10 min, ~80 MB.${C.reset}

  ${C.bold}5)${C.reset} ${C.cyan}Let me pick each tool myself${C.reset}
     ${C.dim}Asks yes/no for every plugin and tool. For users who know what they want.${C.reset}

  ${C.bold}6)${C.reset} ${C.cyan}Just the basics, no extras${C.reset}
     ${C.dim}Only the core toolkit. No plugins, no API key prompts. Quick (under a minute).${C.reset}
`);

const archetypeKeyMap = ['web', 'saas', 'ai', 'all', 'custom', 'files-only'];
let archetypeKey = ARCHETYPE_ARG;
if (!archetypeKey) {
  if (NON_INTERACTIVE) {
    archetypeKey = 'all';
    info(`(non-interactive) defaulting to: Install Everything`);
  } else {
    while (true) {
      const a = (await askLine(`  ${C.bold}Your choice${C.reset} [4 — recommended]: `)).trim() || '4';
      const n = parseInt(a, 10);
      if (n >= 1 && n <= 6) { archetypeKey = archetypeKeyMap[n - 1]; break; }
      warn(`Please enter a number 1–6.`);
    }
  }
}
if (!manifest.archetypes[archetypeKey]) {
  err(`Unknown archetype: ${archetypeKey}. Valid: ${Object.keys(manifest.archetypes).join(', ')}`);
  process.exit(1);
}
const archetype = manifest.archetypes[archetypeKey];
ok(`Got it — setting up: ${C.cyan}${archetype.label}${C.reset}`);

// ---------- Confirmation step ----------
if (!NON_INTERACTIVE) {
  console.log(`
  ${C.bold}About to do the following:${C.reset}
    • Copy the toolkit's core files into ${C.cyan}${TARGET}${C.reset}
    • ${HAS_CLAUDE ? 'Install Claude Code plugins matching your choice' : C.dim + '(Skip plugins — Claude Code not detected)' + C.reset}
    • ${HAS_GIT ? 'Download agent collections from GitHub (gitignored, never published)' : C.dim + '(Skip agent collections — git not detected)' + C.reset}
    • ${HAS_CLAUDE ? 'Set up MCP servers and ask for any API keys you have' : C.dim + '(Skip MCP servers — Claude Code not detected)' + C.reset}
    • Generate a license register and a NOTICE for each downloaded source

  ${C.dim}Nothing risky happens. Files only go inside the project folder. You can stop with Ctrl+C.${C.reset}
`);
  if (!await askYesNo('Ready to proceed?', 'y')) {
    info('No problem — re-run when you are ready. Goodbye.');
    cleanup();
    process.exit(0);
  }
}

// ---------- Phase 1: Core file install (always) ----------
banner('Setting up your project files');
info(`${C.dim}Copying skills, agents, rules, and hooks into your project. Existing files are kept untouched.${C.reset}`);

function ensureDir(p) {
  if (DRY_RUN) { info(`(dry-run) mkdir -p ${p}`); return; }
  mkdirSync(p, { recursive: true });
}

function copyTreeSafe(src, dst, label) {
  if (!existsSync(src)) return;
  ensureDir(dst);
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, entry.name);
    const d = join(dst, entry.name);
    if (entry.isDirectory()) {
      if (existsSync(d)) { skip(`${label}: ${entry.name}`); continue; }
      if (DRY_RUN) { info(`(dry-run) cp -r ${s} ${d}`); continue; }
      // recursive copy
      mkdirSync(d, { recursive: true });
      copyTreeSafe(s, d, `${label}/${entry.name}`);
      ok(`Installed ${label}: ${entry.name}`);
    } else if (entry.isFile()) {
      if (existsSync(d)) { skip(`${label}: ${entry.name}`); continue; }
      if (DRY_RUN) { info(`(dry-run) cp ${s} ${d}`); continue; }
      copyFileSync(s, d);
      ok(`Installed ${label}: ${entry.name}`);
    }
  }
}

if (archetypeKey !== 'files-only' || archetypeKey === 'files-only') {
  // file install runs for ALL archetypes including files-only
  ensureDir(join(TARGET, '.claude', 'skills'));
  ensureDir(join(TARGET, '.claude', 'agents'));
  ensureDir(join(TARGET, '.claude', 'rules'));
  ensureDir(join(TARGET, '.claude', 'hooks'));

  copyTreeSafe(join(CONFIG_DIR, '.claude', 'skills'), join(TARGET, '.claude', 'skills'), 'skill');
  copyTreeSafe(join(CONFIG_DIR, '.claude', 'agents'), join(TARGET, '.claude', 'agents'), 'agent');
  copyTreeSafe(join(CONFIG_DIR, '.claude', 'rules'), join(TARGET, '.claude', 'rules'), 'rule');
  copyTreeSafe(join(CONFIG_DIR, '.claude', 'hooks'), join(TARGET, '.claude', 'hooks'), 'hook');

  for (const f of ['settings.json', 'plugins.json']) {
    const s = join(CONFIG_DIR, '.claude', f);
    const d = join(TARGET, '.claude', f);
    if (existsSync(s) && !existsSync(d)) {
      if (DRY_RUN) info(`(dry-run) cp ${s} ${d}`);
      else { copyFileSync(s, d); ok(`Copied .claude/${f}`); }
    } else if (existsSync(d)) skip(`.claude/${f}`);
  }

  const mcpSrc = join(CONFIG_DIR, '.mcp.json');
  const mcpDst = join(TARGET, '.mcp.json');
  if (existsSync(mcpSrc) && !existsSync(mcpDst)) {
    if (DRY_RUN) info(`(dry-run) cp ${mcpSrc} ${mcpDst}`);
    else { copyFileSync(mcpSrc, mcpDst); ok('Copied .mcp.json'); }
  } else if (existsSync(mcpDst)) skip('.mcp.json');

  const cmdMd = join(TARGET, 'CLAUDE.md');
  if (!existsSync(cmdMd)) {
    const tmpl = `# Project Instructions\n\n> Customize this file with your project-specific configuration.\n> Universal rules auto-load from .claude/rules/.\n\n## Stack\n## Build & Dev Commands\n## Architecture\n## Key Conventions\n## Known Issues / Tech Debt\n`;
    if (DRY_RUN) info(`(dry-run) write ${cmdMd}`);
    else { writeFileSync(cmdMd, tmpl); ok('Created project CLAUDE.md template'); }
  } else skip('CLAUDE.md');

  // .gitignore entries
  const giEntries = ['CLAUDE.local.md', '.claude/settings.local.json', '.env.local', '.env*.local'];
  const giPath = join(TARGET, '.gitignore');
  if (existsSync(giPath)) {
    const cur = readFileSync(giPath, 'utf8');
    const missing = giEntries.filter((e) => !cur.includes(e));
    if (missing.length && !DRY_RUN) {
      appendFileSync(giPath, `\n# Claude Code — personal overrides\n${missing.join('\n')}\n`);
      ok(`Added ${missing.length} entries to .gitignore`);
    } else if (missing.length) info(`(dry-run) append .gitignore: ${missing.join(', ')}`);
  } else {
    if (DRY_RUN) info(`(dry-run) write ${giPath}`);
    else {
      writeFileSync(giPath, `# Claude Code — personal overrides\n${giEntries.join('\n')}\n`);
      ok('Created .gitignore');
    }
  }
}

if (archetypeKey === 'files-only') {
  banner('Files-only archetype — done');
  ok('Core files installed. Skipping plugins, marketplaces, agent collections, MCPs, secrets.');
  if (!DRY_RUN) writeLicensesFile();
  cleanup();
  process.exit(0);
}

// ---------- Helpers for archetype matching ----------
// custom: behaves like 'all' for matching, but every item is forced opt-in (prompted yes/no).
const CUSTOM_MODE = archetypeKey === 'custom';
const matches = (item) => {
  if (!item.archetypes) return false;
  if (archetypeKey === 'custom' || archetypeKey === 'all') return item.archetypes.includes('all');
  return item.archetypes.includes(archetypeKey);
};

// ---------- Phase 2: Marketplaces & Plugins ----------
if (!SKIP_PLUGINS && HAS_CLAUDE) {
  banner('Step 3 of 6 — Adding plugin marketplaces & installing plugins');
  info(`Plugins extend Claude Code with new abilities (design tools, agent orchestration, memory, etc.). They install via Claude Code's official channel — nothing is copied into your project.`);

  const neededMarketplaces = new Set();
  for (const p of manifest.plugins) {
    if (matches(p)) neededMarketplaces.add(p.marketplace);
  }
  for (const slug of neededMarketplaces) {
    const mp = manifest.marketplaces.find((m) => m.slug === slug);
    if (!mp) continue;
    if (mp.auto) { info(`${slug} auto-available (Anthropic official)`); continue; }
    const r = run('claude', ['plugin', 'marketplace', 'add', slug]);
    if (r.status === 0) ok(`Added marketplace: ${slug}`);
    else if ((r.stderr + r.stdout).toLowerCase().includes('already')) skip(`marketplace ${slug} (already added)`);
    else warn(`Marketplace add failed: ${slug} — ${r.stderr.trim() || r.stdout.trim()}`);
  }

  console.log('');
  info('Now installing the plugins themselves...');
  for (const p of manifest.plugins) {
    if (!matches(p)) continue;
    if (p.opt_in) {
      console.log(`\n  ${C.yellow}License notice for ${p.name}:${C.reset} ${p.license_warning}`);
      const proceed = await askYesNo(`Install ${p.name} anyway?`, 'n');
      if (!proceed) { skip(`${p.name} (opt-in declined)`); continue; }
    } else if (CUSTOM_MODE) {
      const proceed = await askYesNo(`Install plugin ${p.name}? ${C.dim}(${p.purpose || ''})${C.reset}`, 'y');
      if (!proceed) { skip(`${p.name} (custom: declined)`); continue; }
    }
    const ref = `${p.name}@${p.marketplace}`;
    const r = run('claude', ['plugin', 'install', ref]);
    if (r.status === 0) ok(`Installed plugin: ${ref}`);
    else if ((r.stderr + r.stdout).toLowerCase().includes('already')) skip(`plugin ${ref} (already installed)`);
    else warn(`Plugin install failed: ${ref} — ${(r.stderr || r.stdout).trim().slice(0, 200)}`);
  }
} else if (!HAS_CLAUDE) {
  warn('Skipping marketplaces/plugins — claude CLI not found.');
}

// ---------- Phase 4: Skills via npx ----------
if (!SKIP_PLUGINS && HAS_NPX) {
  banner('Phase 4 — Skills via npx');
  for (const s of manifest.skills_via_npx) {
    if (!matches(s)) continue;
    if (CUSTOM_MODE) {
      const proceed = await askYesNo(`Install skill ${s.source}? ${C.dim}(${s.purpose || ''})${C.reset}`, 'y');
      if (!proceed) { skip(`${s.source} (custom: declined)`); continue; }
    }
    const parts = s.command.split(' ').filter(Boolean);
    const r = run(parts[0], parts.slice(1));
    if (r.status === 0) ok(`Installed skill: ${s.source}`);
    else warn(`Skill install failed: ${s.source} — ${(r.stderr || r.stdout).trim().slice(0, 200)}`);
  }
} else if (!HAS_NPX) {
  warn('Skipping npx skills — npx not found.');
}

// ---------- cloneSubset: clone a repo to a temp dir, copy a subpath into target, strip .git ----------
async function cloneSubset(item, kind /* 'agents' | 'skills' */) {
  const target = join(TARGET, item.target);
  if (existsSync(target)) { skip(`${kind}/${item.name} (already present at ${item.target})`); return true; }

  // Per-collection consent for unlicensed content
  if (item.requires_consent) {
    console.log(`\n  ${C.yellow}LICENSE WARNING — ${item.name}${C.reset}`);
    console.log(`  ${C.dim}${item.consent_warning}${C.reset}`);
    const proceed = await askYesNo(`Install ${item.name} anyway?`, 'n');
    if (!proceed) { skip(`${item.name} (consent declined)`); return false; }
  } else if (CUSTOM_MODE) {
    const proceed = await askYesNo(`Install ${item.name}? ${C.dim}(${item.purpose || ''})${C.reset}`, 'y');
    if (!proceed) { skip(`${item.name} (custom: declined)`); return false; }
  }

  ensureDir(dirname(target));
  const tmp = join(TARGET, '.tmp-clones', item.name);
  if (DRY_RUN) {
    info(`(dry-run) git clone --depth 1 ${item.repo} ${tmp}`);
    info(`(dry-run) cp ${item.subset || '.'} → ${target}`);
    info(`(dry-run) rm -rf ${tmp}`);
    return true;
  }
  if (existsSync(tmp)) { /* leftover */ if (!DRY_RUN) { try { rmSync(tmp, { recursive: true, force: true }); } catch {} } }
  ensureDir(dirname(tmp));
  const r = run('git', ['clone', '--depth', '1', '--single-branch', item.repo, tmp]);
  if (r.status !== 0) {
    warn(`Clone failed: ${item.name} — ${(r.stderr || r.stdout).trim().slice(0, 200)}`);
    return false;
  }
  // Copy the subset
  const src = item.subset ? join(tmp, item.subset) : tmp;
  if (!existsSync(src)) {
    warn(`${item.name}: expected subset path '${item.subset}' not found in clone — copying full repo`);
    copyTreeSafe(tmp, target, item.name);
  } else if (statSync(src).isDirectory()) {
    copyTreeSafe(src, target, item.name);
  } else {
    ensureDir(target);
    copyFileSync(src, join(target, basename(src)));
  }
  // Write NOTICE.md
  const noticePath = join(target, 'NOTICE.md');
  if (!existsSync(noticePath)) {
    writeFileSync(noticePath, `# ${item.name}\n\n- Source: ${item.repo}\n- License: ${item.license}\n- Installed by: install.mjs on ${new Date().toISOString().slice(0, 10)}\n- Subset: ${item.subset || '(full repo)'}\n\nThis content is gitignored — it never enters the user's repo. Re-run \`node install.mjs\` to refresh.\n`);
  }
  // Strip the temp clone
  try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  ok(`Installed ${kind}/${item.name} (${item.approx_count || 'N'} items) → ${item.target}`);
  if (item.post_install_note) info(`${C.dim}${item.post_install_note}${C.reset}`);
  return true;
}

// ---------- Phase 5: Agent collections (clone to local, gitignored path) ----------
if (!SKIP_PLUGINS && HAS_GIT) {
  banner('Step 4 of 6 — Downloading agent collections from GitHub');
  info(`These are open-source agent packs created by the community. They go into your project locally but ${C.bold}stay out of your git history${C.reset} — gitignored, never published.`);
  for (const a of manifest.agent_collections) {
    if (!matches(a)) continue;
    await cloneSubset(a, 'agents');
  }
} else if (!HAS_GIT) {
  warn('Skipping agent collections — git not installed. Install git from https://git-scm.com/downloads to add ~370 community agents.');
}

// ---------- Phase 6: Skill packs (clone to local, gitignored path) ----------
if (!SKIP_PLUGINS && HAS_GIT) {
  banner('Step 5 of 6 — Downloading skill packs');
  info(`Pre-made workflows for common tasks: design polish, motion audits, 3D scenes, GSAP, etc. Also gitignored — won't be published.`);
  for (const s of manifest.vendored_skills || []) {
    if (!matches(s)) continue;
    await cloneSubset(s, 'skills');
  }
  // Cleanup the temp clones dir
  const tmpRoot = join(TARGET, '.tmp-clones');
  if (!DRY_RUN && existsSync(tmpRoot)) {
    try { rmSync(tmpRoot, { recursive: true, force: true }); } catch {}
  }
}

// ---------- Phase 7: MCPs via CLI ----------
const mcpsToConfigure = manifest.mcps_via_cli.filter(matches);
if (!SKIP_MCPS && HAS_CLAUDE && mcpsToConfigure.length > 0) {
  banner('Step 6 of 6 — Setting up special MCP servers');
  info(`MCP = a connector between Claude and an outside service. We'll only set up the ones for your project type. You can skip any of these and add them later.`);
  for (const m of mcpsToConfigure) {
    console.log(`\n  ${C.bold}── ${m.name}${C.reset} ${C.dim}(${m.purpose || ''})${C.reset}`);
    if (!await askYesNo(`Install ${m.name} MCP?`, 'y')) { skip(`MCP ${m.name}`); continue; }
    let cmdStr = m.command_template;
    for (const sname of m.secrets || []) {
      const v = await askSecret(sname, `secret for ${m.name}`);
      cmdStr = cmdStr.replace(`{{${sname}}}`, v || '');
    }
    const parts = cmdStr.split(' ').filter(Boolean);
    const r = run(parts[0], parts.slice(1));
    if (r.status === 0) ok(`Installed MCP: ${m.name}`);
    else warn(`MCP install failed: ${m.name} — ${(r.stderr || r.stdout).trim().slice(0, 200)}`);
  }
}

// ---------- Phase 7b: CLI bootstrap (firecrawl-cli, etc.) ----------
const cliBootstrapItems = (manifest.cli_bootstrap || []).filter(matches);
if (cliBootstrapItems.length > 0 && !SKIP_PLUGINS) {
  banner('One-time CLI setup');
  info(`A few command-line tools want to introduce themselves on first run. You can skip these.`);
  for (const c of cliBootstrapItems) {
    console.log(`\n  ${C.bold}── ${c.name}${C.reset} ${C.dim}(${c.purpose || ''})${C.reset}`);
    if (!await askYesNo(`Run ${c.name} bootstrap? (\`${c.command}\`)`, 'y')) {
      skip(`${c.name} bootstrap`);
      continue;
    }
    // collect secrets first so they're in env when the bootstrap runs
    for (const sname of c.secrets || []) {
      if (!(sname in SECRETS_COLLECTED)) {
        await askSecret(sname, `secret for ${c.name}`);
      }
    }
    const env = { ...process.env, ...SECRETS_COLLECTED };
    const parts = c.command.split(' ').filter(Boolean);
    if (DRY_RUN) {
      info(`(dry-run) ${c.command}  (with secrets in env: ${(c.secrets || []).join(', ') || 'none'})`);
    } else {
      const r = spawnSync(parts[0], parts.slice(1), {
        encoding: 'utf8',
        shell: false,
        env,
        stdio: c.interactive ? ['inherit', 'inherit', 'inherit'] : 'pipe',
      });
      if (r.status === 0) ok(`${c.name} bootstrap complete`);
      else warn(`${c.name} bootstrap exit ${r.status} — ${(r.stderr || '').toString().trim().slice(0, 200)}`);
    }
  }
}

// ---------- Phase 8: Per-archetype secrets ----------
if (!SKIP_SECRETS && archetype.secrets && archetype.secrets.length > 0) {
  banner('Optional — API keys for the tools you want to use');
  console.log(`
  ${C.dim}This is the only step that asks for sensitive info. A few things to know:${C.reset}
    ${C.dim}• Press Enter on any prompt to skip. You can always add a key later.${C.reset}
    ${C.dim}• Keys are saved to ${C.reset}${C.cyan}.env.local${C.reset}${C.dim} which is gitignored — they never get committed.${C.reset}
    ${C.dim}• If you don't have an API key for a service, just press Enter — that service stays disabled until you add one.${C.reset}
    ${C.dim}• You can paste keys directly. They are masked when shown back.${C.reset}
`);
  const secretDescriptions = {
    GITHUB_PERSONAL_ACCESS_TOKEN: 'GitHub PAT (PRs, issues, repos)',
    POSTGRES_CONNECTION_STRING: 'postgresql://user:pass@host:5432/db',
    MONGODB_URI: 'mongodb+srv://user:pass@cluster.mongodb.net/db',
    REDIS_URL: 'redis://localhost:6379',
    SUPABASE_URL: 'Supabase project URL',
    SUPABASE_API_KEY: 'Supabase anon or service-role key',
    STRIPE_SECRET_KEY: 'sk_live_... or sk_test_...',
    SLACK_BOT_TOKEN: 'xoxb-...',
    SLACK_TEAM_ID: 'Slack workspace ID',
    SENTRY_ACCESS_TOKEN: 'Sentry auth token',
    LINEAR_API_KEY: 'Linear API key',
    CLOUDFLARE_API_TOKEN: 'Cloudflare API token',
    CLOUDFLARE_ACCOUNT_ID: 'Cloudflare account ID',
    FIGMA_ACCESS_TOKEN: 'Figma personal access token',
    FIRECRAWL_API_KEY: 'Firecrawl API key',
    BRAVE_API_KEY: 'Brave Search API key',
    PERPLEXITY_API_KEY: 'Perplexity API key',
    HF_TOKEN: 'Hugging Face access token',
    TWENTYFIRST_DEV_API_KEY: '21st.dev Magic API key',
    QDRANT_URL: 'Qdrant cluster URL',
    QDRANT_API_KEY: 'Qdrant API key',
    CHROMA_URL: 'Chroma server URL',
    OPENAI_API_KEY: 'OpenAI API key',
    ANTHROPIC_API_KEY: 'Anthropic API key',
  };
  for (const sname of archetype.secrets) {
    if (sname in SECRETS_COLLECTED) continue;
    await askSecret(sname, secretDescriptions[sname] || 'value');
  }
}

// ---------- Phase 9: Save secrets ----------
if (Object.keys(SECRETS_COLLECTED).length > 0 && !DRY_RUN) {
  banner('Saving your API keys');
  const envFile = join(TARGET, '.env.local');
  const lines = [
    '',
    `# Claude Code MCP server secrets — generated by install.mjs`,
    `# ${new Date().toISOString()}`,
  ];
  for (const [k, v] of Object.entries(SECRETS_COLLECTED)) lines.push(`${k}="${v}"`);
  appendFileSync(envFile, lines.join('\n') + '\n');
  ok(`Saved ${Object.keys(SECRETS_COLLECTED).length} secret(s) to .env.local`);
  // ensure gitignore
  const giPath = join(TARGET, '.gitignore');
  if (existsSync(giPath) && !readFileSync(giPath, 'utf8').includes('.env.local')) {
    appendFileSync(giPath, '\n.env.local\n');
  }
}

// ---------- npm suggestions ----------
const npmSuggestions = manifest.npm_suggestions.filter(matches);
if (npmSuggestions.length > 0) {
  banner('npm packages to add to your project');
  const pkgs = npmSuggestions.map((p) => p.package).join(' ');
  console.log(`\n  ${C.bold}Run this when you're ready:${C.reset}`);
  console.log(`    ${C.cyan}npm i ${pkgs}${C.reset}\n`);
  console.log(`  ${C.dim}What each one does:${C.reset}`);
  for (const p of npmSuggestions) console.log(`    ${C.dim}• ${p.package} — ${p.purpose}${C.reset}`);
}

// ---------- Regenerate docs/LICENSES.md ----------
function writeLicensesFile() {
  const licensesPath = join(CONFIG_DIR, 'docs', 'LICENSES.md');
  if (DRY_RUN) { info(`(dry-run) regenerate ${licensesPath}`); return; }
  ensureDir(dirname(licensesPath));
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];
  for (const m of manifest.marketplaces || []) rows.push({ name: m.slug, license: m.license, url: m.url || '', kind: 'marketplace' });
  for (const s of manifest.skills_via_npx || []) rows.push({ name: s.source, license: s.license, url: s.source.startsWith('http') ? s.source : `https://github.com/${s.source}`, kind: 'skill (npx)' });
  for (const a of manifest.agent_collections || []) rows.push({ name: a.name, license: a.license, url: a.repo, kind: `agents (${a.approx_count || a.count || ''})` });
  for (const v of manifest.vendored_skills || []) rows.push({ name: v.name, license: v.license, url: v.repo, kind: 'cloned skill pack' });
  for (const m of manifest.mcps_via_cli || []) rows.push({ name: m.name, license: m.license, url: '', kind: 'MCP' });

  const body = [
    '# Bundled-source license register',
    '',
    `> Auto-generated by install.mjs on ${today}. Sources for every external pack the toolkit installs.`,
    '',
    '**Summary:** all sources are open source. 13 are permissive (MIT / Apache-2.0). 1 (claude-mem) is AGPL-3.0 + PolyForm Noncommercial — safe as a local dev tool, not safe to embed in proprietary commercial products. The installer prompts before installing it.',
    '',
    '| Kind | Source | License | URL |',
    '|------|--------|---------|-----|',
    ...rows.map((r) => `| ${r.kind} | ${r.name} | ${r.license || 'unknown'} | ${r.url} |`),
    '',
    '## License-class summary',
    '',
    '- **Permissive (use freely, including commercial):** MIT, Apache-2.0, BSD',
    '- **Anthropic ToS:** free to install + use through the official Claude marketplace',
    '- **Copyleft (AGPL-3.0):** safe as a local dev tool. **Do not embed in proprietary network-deployed software** without offering source.',
    '- **Non-commercial (PolyForm-NC):** the `ragtime/` subdirectory of claude-mem. **Do not use in commercial products.**',
    '',
    'Last verified: ' + today,
    '',
  ].join('\n');
  writeFileSync(licensesPath, body);
  ok(`Regenerated docs/LICENSES.md`);
}
writeLicensesFile();

// ---------- Friendly final summary ----------
banner('You are all set!');

const tryThisFirst = {
  web: [
    'Open Claude Code in your project (run: claude)',
    'Type: /ui a hero section with a gradient and an animated underline',
    'Or try: /design-review then point to your homepage',
  ],
  saas: [
    'Open Claude Code in your project (run: claude)',
    'Type: /office-hours add a billing portal that supports per-seat pricing',
    'Or try: /architecture-review to map your current setup',
  ],
  ai: [
    'Open Claude Code in your project (run: claude)',
    'Type: build a research-and-summarize agent that scrapes a URL and writes a summary',
    'Or try: /create-component for a chat UI scaffold',
  ],
  all: [
    'Open Claude Code in your project (run: claude)',
    'Try a slash command — type / to see your full menu of skills',
    'Or describe what you want to build — Claude picks the right tools',
  ],
  custom: [
    'Open Claude Code in your project (run: claude)',
    'Try / to browse the skills you opted in to',
  ],
  'files-only': [
    'Open Claude Code in your project (run: claude)',
    'Try /review-pr or /security-scan to start with the core skills',
  ],
};

const tips = tryThisFirst[archetypeKey] || tryThisFirst.all;

console.log(`
  ${C.green}${C.bold}✓ Setup complete.${C.reset}  (${DRY_RUN ? C.yellow + 'preview run, nothing changed' + C.reset : C.green + 'live, changes saved' + C.reset})

  ${C.bold}Try this first:${C.reset}
${tips.map((t, i) => `    ${i + 1}. ${t}`).join('\n')}

  ${C.bold}Where things live:${C.reset}
    Project files       ${C.cyan}${TARGET}${C.reset}
    Cheat sheet         ${C.cyan}${join(CONFIG_DIR, 'CHEATSHEET.md')}${C.reset}
    First-run guide     ${C.cyan}${join(CONFIG_DIR, 'docs', 'FIRST_RUN.md')}${C.reset}
    License register    ${C.cyan}${join(CONFIG_DIR, 'docs', 'LICENSES.md')}${C.reset}

  ${C.bold}Need help?${C.reset}
    Inside Claude Code:  type ${C.cyan}/help${C.reset}
    Re-run installer:    ${C.cyan}node ${join(CONFIG_DIR, 'install.mjs')}${C.reset}
    Update everything:   ${C.cyan}node ${join(CONFIG_DIR, 'update.mjs')}${C.reset}
`);

if (SKIPPED_SECRETS.size > 0) {
  console.log(`  ${C.dim}You skipped these API keys (totally fine — services just stay off):${C.reset}`);
  console.log(`    ${C.dim}${[...SKIPPED_SECRETS].join(', ')}${C.reset}`);
  console.log(`  ${C.dim}When you have them, paste into ${C.reset}${C.cyan}${join(TARGET, '.env.local')}${C.reset}${C.dim} as ${C.reset}${C.cyan}KEY="value"${C.reset}${C.dim} on its own line.${C.reset}\n`);
}

if (!HAS_CLAUDE) {
  console.log(`  ${C.yellow}Note:${C.reset} Claude Code itself is not installed yet. Get it from:`);
  console.log(`    ${C.cyan}https://docs.claude.com/en/docs/claude-code${C.reset}`);
  console.log(`  Then come back and you're good to go.\n`);
}

cleanup();
process.exit(0);

function cleanup() {
  if (_rl) _rl.close();
}
