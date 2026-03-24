# Claude Code Config

> Universal, stack-agnostic configuration for Claude Code.
> 20 built-in skills, safety hooks, MCP integration, and cross-platform setup.
> Use as a Git submodule or standalone config for any project.

![Skills](https://img.shields.io/badge/skills-20-blue?style=flat-square)
![Stack](https://img.shields.io/badge/stack-agnostic-green?style=flat-square)
![Platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-orange?style=flat-square)

---

## Table of Contents

- [What's Included](#whats-included)
- [Quick Start](#quick-start)
- [Skills Reference](#skills-reference)
- [MCP Servers](#mcp-servers)
- [Hooks](#hooks)
- [Customization Guide](#customization-guide)
- [Adding Your Own Skills](#adding-your-own-skills)
- [Upgrading](#upgrading)
- [Using as a Git Submodule](#using-as-a-git-submodule)
- [Design Philosophy](#design-philosophy)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## What's Included

```
claude-config/
├── CLAUDE.md                              # Universal project instructions
├── .mcp.json                              # MCP server configuration
├── .gitignore                             # Config repo ignores
├── setup.sh                               # Cross-platform project wiring
├── update.sh                              # Pull latest config updates
├── README.md                              # This file
└── .claude/
    ├── settings.json                      # Tool allow/deny permissions
    ├── hooks/
    │   ├── pre-tool-use.sh                # Safety gate (blocks dangerous ops)
    │   └── post-tool-use.sh               # Post-execution (extensible)
    └── skills/
        ├── review-pr/SKILL.md             # /review-pr — PR code review
        ├── write-tests/SKILL.md           # /write-tests — test generation
        ├── optimize/SKILL.md              # /optimize — performance analysis
        ├── security-scan/SKILL.md         # /security-scan — vulnerability scan
        ├── refactor/SKILL.md              # /refactor — safe refactoring
        ├── explain-code/SKILL.md          # /explain-code — code explanation
        ├── fix-issue/SKILL.md             # /fix-issue — fix GitHub issues
        ├── estimate/SKILL.md              # /estimate — effort estimation
        ├── changelog/SKILL.md             # /changelog — generate changelogs
        ├── architecture-review/SKILL.md   # /architecture-review — arch review
        ├── api-design/SKILL.md            # /api-design — API design
        ├── create-component/SKILL.md      # /create-component — scaffold modules
        ├── deploy-checklist/SKILL.md      # /deploy-checklist — pre-deploy checks
        ├── db-migration/SKILL.md          # /db-migration — migration helper
        ├── dependency-audit/SKILL.md      # /dependency-audit — audit deps
        ├── git-cleanup/SKILL.md           # /git-cleanup — repo maintenance
        ├── generate-docs/SKILL.md         # /generate-docs — documentation gen
        ├── code-coverage/SKILL.md         # /code-coverage — coverage analysis
        ├── debug/SKILL.md                 # /debug — structured debugging
        └── convert-code/SKILL.md          # /convert-code — language conversion
```

---

## Quick Start

### Option A: Use in a New or Existing Project

```bash
# Clone this config repo (or download it)
git clone https://github.com/YOUR_USERNAME/claude-config.git

# Wire it into your project
bash claude-config/setup.sh /path/to/your/project

# Start a Claude Code session — all 20 skills are available
cd /path/to/your/project
claude
```

### Option B: Use as a Global Config

```bash
# Clone to a permanent location
git clone https://github.com/YOUR_USERNAME/claude-config.git ~/claude-config

# Wire into any project
bash ~/claude-config/setup.sh /path/to/project-a
bash ~/claude-config/setup.sh /path/to/project-b
bash ~/claude-config/setup.sh /path/to/project-c
```

### Option C: Use as a Git Submodule

```bash
# In your project root
git submodule add https://github.com/YOUR_USERNAME/claude-config.git claude-config
bash claude-config/setup.sh .

# Commit the submodule
git add .gitmodules claude-config .claude/ CLAUDE.md .mcp.json
git commit -m "chore: add claude-config submodule"
```

After setup, customize `CLAUDE.md` in your project with:
- Your technology stack
- Build and test commands
- Architecture notes
- Project-specific conventions

---

## Skills Reference

All 20 skills are **stack-agnostic** — they auto-detect your project's language, framework, and testing tools at runtime.

### Code Quality

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/review-pr` | Comprehensive PR code review covering correctness, security, performance, tests, and conventions | Before merging any branch |
| `/refactor` | Identifies code smells and executes safe refactoring with test verification | When code is hard to read or maintain |
| `/explain-code` | Multi-level code explanation with data flow diagrams and design rationale | Onboarding to unfamiliar code |

### Testing

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/write-tests` | Generates unit and integration tests — auto-detects Jest, pytest, Go testing, etc. | Adding tests to untested code |
| `/code-coverage` | Analyzes test coverage and generates tests for critical uncovered paths | Before releases |

### Security

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/security-scan` | Scans for injection flaws, hardcoded secrets, auth issues, insecure configs | Before deploying, especially auth/API changes |
| `/dependency-audit` | Audits packages for vulnerabilities, outdated versions, unused deps, license issues | Periodic maintenance |

### Performance

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/optimize` | Analyzes algorithmic complexity, N+1 queries, memory leaks, async opportunities | Before shipping performance-critical features |

### Architecture & Design

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/architecture-review` | Reviews project structure, dependency cycles, layer violations, scalability | Periodic health checks |
| `/api-design` | Designs REST/GraphQL APIs with schemas, error codes, and OpenAPI spec | Building new APIs |
| `/create-component` | Scaffolds modules/components following existing project patterns | Starting a new module |

### DevOps & Database

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/deploy-checklist` | Pre-deployment verification: tests, security, migrations, rollback plan | Before staging/production deploys |
| `/db-migration` | Generates migration files with up/down, safety checks, and index recommendations | Schema changes |
| `/git-cleanup` | Cleans merged branches, stale refs, and identifies large files in history | Periodic repo maintenance |

### Project Management

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/fix-issue` | Fetches a GitHub issue, implements the fix, creates branch and PR | Working through the issue backlog |
| `/estimate` | Breaks tasks into subtasks with T-shirt sizing and risk assessment | Sprint planning |
| `/changelog` | Generates changelog from git history in Keep a Changelog format | Before releases |

### Documentation & Utilities

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/generate-docs` | Generates README, API docs, or inline documentation matching project style | When documentation is missing |
| `/debug` | Systematic debugging: reproduce, isolate, identify root cause, fix, prevent | Facing bugs or errors |
| `/convert-code` | Converts code between languages preserving logic and idiomatic patterns | Migrating between languages |

---

## MCP Servers

The `.mcp.json` file configures Model Context Protocol servers that extend Claude's capabilities:

| Server | Purpose | Required Setup |
|--------|---------|---------------|
| **fetch** | Makes HTTP requests — useful for API testing, downloading resources | None |
| **filesystem** | Scoped file system read/write within the project directory | None |

### Adding More MCP Servers

Edit `.mcp.json` in your project (not the shared config) to add project-specific servers:

```json
{
  "mcpServers": {
    "fetch": { "command": "npx", "args": ["-y", "@anthropic-ai/mcp-fetch"] },
    "filesystem": { "command": "npx", "args": ["-y", "@anthropic-ai/mcp-filesystem", "."] },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}" }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

---

## Hooks

### pre-tool-use.sh — Safety Gate

Runs before every tool call. Blocks dangerous operations:

| Blocked Pattern | Reason |
|----------------|--------|
| `rm -rf /` (and system paths) | Prevents accidental system destruction |
| `curl ... \| bash` | Prevents remote code execution |
| `git push --force` | Requires explicit user approval |
| `sudo ...` | Prevents privilege escalation |
| Write to `.env*` files | Prevents secret file overwrites |
| Write to lock files | Lock files should be managed by package managers |
| Write to `.git/` | Git internals should use git commands |

### post-tool-use.sh — Extensible Post-Hook

Runs after every tool call. Currently a passthrough (always allows). Includes commented examples for:
- Auto-linting after file edits (ESLint, ruff, gofmt, rustfmt)
- Audit logging of all file modifications
- Time tracking per tool usage

To enable auto-linting, uncomment the relevant section in the hook file.

---

## Customization Guide

### Shared vs Personal Files

| File | Scope | Committed? | Purpose |
|------|-------|-----------|---------|
| `CLAUDE.md` | Project team | Yes | Project-specific instructions |
| `.mcp.json` | Project team | Yes | MCP server wiring |
| `.claude/settings.json` | Project team | Yes | Tool permissions |
| `CLAUDE.local.md` | You only | No (gitignored) | Personal notes and preferences |
| `.claude/settings.local.json` | You only | No (gitignored) | Personal permission overrides |

### Project-Level Overrides

After running `setup.sh`, customize your project's config:

**1. Edit `CLAUDE.md`** — Add your stack, build commands, architecture:
```markdown
## Stack
- Language: Python 3.12
- Framework: FastAPI
- Database: PostgreSQL with SQLAlchemy
- Test runner: pytest
- Package manager: pip + poetry

## Build & Dev Commands
- Dev server: `uvicorn app.main:app --reload`
- Test: `pytest`
- Lint: `ruff check .`
```

**2. Edit `.mcp.json`** — Add project-specific MCP servers (database, Slack, etc.)

**3. Override a single skill** — Copy and modify:
```bash
# Copy the shared skill to project level
cp -r claude-config/.claude/skills/review-pr .claude/skills/review-pr

# Edit .claude/skills/review-pr/SKILL.md with your customizations
# Project-level skills take precedence over shared ones
```

**4. Add personal preferences** — Create `CLAUDE.local.md`:
```markdown
# Personal Notes
- I prefer verbose explanations
- Always suggest TypeScript strict mode fixes
- My editor is VS Code — reference keyboard shortcuts accordingly
```

---

## Adding Your Own Skills

### Step 1: Create the Skill Directory

```bash
mkdir -p .claude/skills/my-skill
```

### Step 2: Create SKILL.md

```markdown
---
name: my-skill
description: "One-line description of what this skill does and when to use it."
argument-hint: "[optional argument description]"
allowed-tools: Read, Grep, Glob, Bash
---

# My Skill

## Context (auto-detected)
!`ls -1 2>/dev/null | head -10`

## Instructions

1. Step one of what Claude should do
2. Step two...
3. Step three...

## Output Format
Describe the expected output structure.

## Rules
- Rule one
- Rule two
```

### Step 3: Test It

Open a Claude Code session and type `/my-skill` to verify it appears and works.

### Frontmatter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Slash command name (lowercase, hyphens only) |
| `description` | Yes | When Claude should use this skill (be specific!) |
| `argument-hint` | No | Shown in autocomplete, e.g. `[filename]` |
| `allowed-tools` | No | Tools this skill can use without asking |
| `disable-model-invocation` | No | `true` = only manual `/command` invocation |
| `user-invocable` | No | `false` = hide from `/` menu |
| `model` | No | Override model, e.g. `claude-opus-4-6` |
| `effort` | No | `low`, `medium`, `high`, `max` |

### Shell Injection

Use `!`command`` in the SKILL.md body to auto-inject command output:

```markdown
## Current Branch
!`git branch --show-current`

## Changed Files
!`git diff --name-only HEAD~1`
```

---

## Upgrading

### If cloned standalone:
```bash
cd /path/to/claude-config
git pull origin main
```

Then re-run setup on your projects:
```bash
bash /path/to/claude-config/setup.sh /path/to/your/project
```

### If using as a submodule:
```bash
cd /path/to/your/project
bash claude-config/update.sh
git add claude-config && git commit -m "chore: update claude-config"
```

### What happens when you upgrade:
- New skills are added to your project
- Existing skills are updated (if using symlinks on Unix)
- Existing skills are NOT overwritten (if using copy mode on Windows) — re-run setup.sh to update
- Your project-level `CLAUDE.md` and customizations are never touched

---

## Using as a Git Submodule

### Add to a project:
```bash
git submodule add https://github.com/YOUR_USERNAME/claude-config.git claude-config
bash claude-config/setup.sh .
git add .gitmodules claude-config .claude/ CLAUDE.md .mcp.json .gitignore
git commit -m "chore: add claude-config submodule"
```

### Clone a project that uses this submodule:
```bash
git clone --recurse-submodules https://github.com/YOUR_USERNAME/your-project.git
bash claude-config/setup.sh .
```

### If you forgot `--recurse-submodules`:
```bash
git submodule update --init --recursive
bash claude-config/setup.sh .
```

### Update the submodule:
```bash
bash claude-config/update.sh
git add claude-config && git commit -m "chore: update claude-config to latest"
```

---

## Design Philosophy

### Stack-Agnostic by Default
Every skill auto-detects the project's language, framework, and tools at runtime using shell injection. The same `/write-tests` command generates Jest tests for a React project and pytest tests for a FastAPI project — no configuration needed.

### Detect, Don't Prescribe
The `CLAUDE.md` file defines universal engineering principles (error handling, testing, security) rather than language-specific rules. Your project's `CLAUDE.md` adds the specifics. This means upgrading the shared config never conflicts with your project conventions.

### Safety First
The pre-tool-use hook blocks destructive operations by default. The settings.json deny-list prevents writes to sensitive files. This gives you guardrails without requiring manual review of every tool call.

### Composable and Upgradable
Skills are independent — you can override any single skill at the project level without affecting others. The setup script is idempotent (safe to re-run). Updates only add new skills; they never overwrite your customizations.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Skills don't appear in `/` menu | Skills not in `.claude/skills/` | Re-run `setup.sh` |
| `setup.sh` fails on Windows | Git Bash not installed | Install Git for Windows (includes Git Bash) |
| Hook not triggering | Hook not executable | `chmod +x .claude/hooks/*.sh` |
| MCP server fails to connect | npx not in PATH | Install Node.js >= 18 |
| MCP GitHub server 401 error | Token not set | `export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...` |
| `git submodule add` fails | Submodule already exists | `git rm -r --cached claude-config` then retry |
| Skill blocks a safe operation | Overly strict pre-hook | Edit `.claude/hooks/pre-tool-use.sh` to allow |
| Settings not taking effect | Wrong settings file | Check `.claude/settings.json` (not `.local.json`) |
| Symlinks broken after move | Absolute paths in symlinks | Re-run `setup.sh` (uses relative paths on Unix) |

---

## Contributing

### Adding a New Skill

1. Create `.claude/skills/your-skill/SKILL.md` with proper frontmatter
2. Test it in a real project
3. Update this README's Skills Reference table
4. Submit a PR

### Updating an Existing Skill

1. Edit the SKILL.md file
2. Test the changes
3. Describe what changed and why in the PR

### Guidelines

- Skills must be **stack-agnostic** — detect, don't assume
- Skills must have a clear **description** for auto-invocation
- Skills should produce **structured output** (tables, checklists, severity ratings)
- Shell injection (`!`command``) should be used for context detection
- Keep SKILL.md under 500 lines — move reference material to companion files

---

## License

MIT — use this config freely in personal and commercial projects.
