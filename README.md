# Claude Code Config

### The ultimate Claude Code configuration — production-ready, stack-agnostic, endlessly upgradable.

**30 skills, 8 agents, 9 rules, safety hooks, and 30 MCP servers** — everything you need to supercharge Claude Code in any project, any language, any framework.

[![Skills](https://img.shields.io/badge/skills-30-blue?style=flat-square)](CATALOG.md)
[![Agents](https://img.shields.io/badge/agents-8-purple?style=flat-square)](CATALOG.md)
[![Rules](https://img.shields.io/badge/rules-9-green?style=flat-square)](CATALOG.md)
[![MCP Servers](https://img.shields.io/badge/MCP_servers-30-orange?style=flat-square)](.mcp.json)
[![Stack](https://img.shields.io/badge/stack-agnostic-brightgreen?style=flat-square)](#design-philosophy)
[![Platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-lightgrey?style=flat-square)](#quick-start)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)](LICENSE)

---

## Why This Exists

Every time you start a Claude Code session, it starts from zero — no memory of your conventions, no safety guardrails, no reusable workflows. This repository fixes that by providing a shared configuration layer that gives every project:

- **30 slash-command skills** for common workflows (code review, testing, security, deployment, and more)
- **8 specialized agents** that Claude can delegate complex tasks to (architecture, TDD, security auditing, mentoring)
- **9 auto-loading rule files** that enforce coding standards without you having to repeat yourself
- **Safety hooks** that block dangerous operations before they execute
- **30 MCP servers** for web fetching, browser automation, design (Figma), code editing (Serena), GitHub/GitLab, databases, Slack, Stripe, Kubernetes, Cloudflare, AI/ML, and more

All of it is **stack-agnostic** — skills auto-detect your project's language, framework, and tools at runtime.

---

## Table of Contents

- [Quick Start](#quick-start)
- [What's Included](#whats-included)
- [Skills (30)](#skills-30)
- [Agents (8)](#agents-8)
- [Rules (9)](#rules-9)
- [MCP Servers (30)](#mcp-servers-30)
- [Hooks (2)](#hooks-2)
- [Customization](#customization)
- [Adding Your Own](#adding-your-own)
- [Upgrading](#upgrading)
- [Using as a Git Submodule](#using-as-a-git-submodule)
- [Design Philosophy](#design-philosophy)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

### Option A: Interactive install (recommended)

```bash
git clone https://github.com/YOUR_USERNAME/claude-config.git ~/claude-config

# Interactive installer — walks you through API keys & secrets
bash ~/claude-config/install.sh /path/to/your/project

# Start Claude Code — everything is ready
cd /path/to/your/project && claude
```

The interactive installer:
- Installs all skills, agents, rules, hooks, and MCP servers
- Walks you through each MCP server's API keys/secrets one by one
- Lets you **skip** any service you don't use
- Saves secrets to `.env.local` (gitignored) or your shell profile
- Shows a summary of configured vs skipped services

### Option B: Quick install (no prompts)

```bash
# Copies everything with no secret configuration
bash ~/claude-config/setup.sh /path/to/your/project
```

### Option C: Use as a Git submodule

```bash
cd your-project
git submodule add https://github.com/YOUR_USERNAME/claude-config.git claude-config
bash claude-config/install.sh .
git add . && git commit -m "chore: add claude-config"
```

### Option D: Cherry-pick what you need

Copy individual skill/agent/rule files into your project's `.claude/` directory.

After setup, **customize `CLAUDE.md`** with your project's stack, commands, and architecture.

---

## What's Included

```
claude-config/
├── CLAUDE.md                       # Universal project instructions (<100 lines)
├── .mcp.json                       # 30 MCP servers (Figma, Serena, Playwright, Stripe, K8s, etc.)
├── LICENSE                         # MIT
├── CONTRIBUTING.md                 # How to contribute
├── CATALOG.md                      # Full index of everything
├── install.sh                      # Interactive installer with secret config
├── setup.sh                        # Quick setup (no prompts)
├── update.sh                       # Pull latest config
│
└── .claude/
    ├── settings.json               # Tool allow/deny permissions
    │
    ├── agents/                     # 8 specialized agents
    │   ├── architect.md            #   System design & ADRs
    │   ├── code-reviewer.md        #   Autonomous code review
    │   ├── devops.md               #   CI/CD & infrastructure
    │   ├── documentation.md        #   Docs generation
    │   ├── mentor.md               #   Teaching & explaining
    │   ├── performance.md          #   Optimization specialist
    │   ├── security-auditor.md     #   Threat modeling & OWASP
    │   └── tdd.md                  #   Test-driven development
    │
    ├── rules/                      # 9 auto-loading rule files
    │   ├── api-design.md           #   REST conventions & status codes
    │   ├── code-quality.md         #   Naming, complexity, functions
    │   ├── database.md             #   Migrations, queries, indexes
    │   ├── documentation.md        #   Doc standards & maintenance
    │   ├── error-handling.md       #   Errors, logging, retry
    │   ├── git-workflow.md         #   Commits, branching, PRs
    │   ├── performance.md          #   Algorithms, caching, I/O
    │   ├── security.md             #   Secrets, validation, auth
    │   └── testing.md              #   Coverage, structure, mocking
    │
    ├── hooks/                      # 2 lifecycle hooks
    │   ├── pre-tool-use.sh         #   Safety gate (blocks dangerous ops)
    │   └── post-tool-use.sh        #   Post-execution (extensible)
    │
    └── skills/                     # 30 slash-command skills
        ├── api-design/             ├── db-migration/
        ├── architecture-review/    ├── debug/
        ├── changelog/              ├── dependency-audit/
        ├── ci-pipeline/            ├── deploy-checklist/
        ├── code-coverage/          ├── docker-setup/
        ├── convert-code/           ├── env-setup/
        ├── create-component/       ├── error-monitor/
        ├── estimate/               ├── explain-code/
        ├── fix-issue/              ├── generate-docs/
        ├── git-cleanup/            ├── grill-me/
        ├── migrate-framework/      ├── onboard/
        ├── optimize/               ├── pr-summary/
        ├── refactor/               ├── review-pr/
        ├── security-scan/          ├── tdd/
        └── write-tests/            └── write-skill/
```

---

## Skills (30)

All skills are **stack-agnostic** — they auto-detect your project's language and framework at runtime.

### Code Quality

| Command | What It Does |
|---------|-------------|
| `/review-pr` | Full PR review — correctness, security, performance, tests, conventions. Outputs severity-rated findings + GO/NO-GO verdict. |
| `/refactor` | Detects code smells (long methods, deep nesting, duplication), plans safe refactoring, executes with test verification. |
| `/explain-code` | Multi-level explanation — one-sentence summary, high-level overview, detailed walkthrough, ASCII data flow diagram. |

### Testing

| Command | What It Does |
|---------|-------------|
| `/write-tests` | Generates tests auto-detecting Jest/pytest/Go/Rust/etc. Covers happy path, edge cases, errors, async. Ready-to-commit output. |
| `/code-coverage` | Analyzes coverage gaps, identifies untested critical paths, generates tests for the most important uncovered areas. |
| `/tdd` | Strict red-green-refactor. Writes failing test first, minimal implementation, then refactors. Never writes code before tests. |

### Security

| Command | What It Does |
|---------|-------------|
| `/security-scan` | Scans for injection flaws, hardcoded secrets, auth issues, XSS, CSRF, SSRF. Outputs severity-rated findings + security score (0-10). |
| `/dependency-audit` | Audits packages for vulnerabilities, outdated versions, unused deps, and license compliance across any ecosystem. |

### Performance

| Command | What It Does |
|---------|-------------|
| `/optimize` | Finds algorithmic bottlenecks, N+1 queries, memory leaks, missed parallelization. Before/after code with impact ratings. |

### Architecture & Design

| Command | What It Does |
|---------|-------------|
| `/architecture-review` | Maps dependencies, identifies circular deps and layer violations, assesses scalability. ASCII architecture diagram. |
| `/api-design` | Designs REST/GraphQL APIs — endpoints, schemas, error codes, pagination. Outputs OpenAPI spec. |
| `/create-component` | Scaffolds modules following existing project patterns — main file, tests, types, index. |

### DevOps & Infrastructure

| Command | What It Does |
|---------|-------------|
| `/deploy-checklist` | Pre-deployment verification — tests, security, migrations, env vars, rollback plan. GO/NO-GO verdict. |
| `/db-migration` | Generates up/down migrations with safety analysis, index recommendations, and rollback instructions. |
| `/git-cleanup` | Identifies merged branches, stale refs, large files in history. Cleans up with confirmation. |
| `/ci-pipeline` | Generates CI config (GitHub Actions, GitLab CI) with lint, test, build, deploy stages + caching. |
| `/docker-setup` | Creates optimized multi-stage Dockerfile, docker-compose.yml, and .dockerignore. |
| `/env-setup` | Generates .env.example, checks prerequisites, documents setup steps, verifies environment. |

### Project Management

| Command | What It Does |
|---------|-------------|
| `/fix-issue` | Fetches GitHub issue, implements fix, creates branch and PR. References issue in commits. |
| `/estimate` | Breaks tasks into subtasks with T-shirt sizing (S/M/L/XL), risk assessment, and dependency mapping. |
| `/changelog` | Generates changelog from git history in Keep a Changelog format. Auto-categorizes commits. |
| `/pr-summary` | Generates PR title and description from branch diff — summary, changes, test plan, breaking changes. |

### Documentation & Utilities

| Command | What It Does |
|---------|-------------|
| `/generate-docs` | Generates README, API docs, or inline documentation matching existing project style. |
| `/debug` | Structured debugging — gather info, read error, isolate problem, common patterns, fix, prevent recurrence. |
| `/convert-code` | Converts code between languages preserving logic and using idiomatic patterns in the target language. |
| `/onboard` | Scans entire codebase and generates an onboarding guide — stack, architecture, entry points, conventions, gotchas. |
| `/migrate-framework` | Framework migration assistant — maps APIs, creates migration plan, provides file-by-file order. |
| `/error-monitor` | Sets up error tracking (Sentry/Bugsnag) with error boundaries, middleware, and custom error classes. |

### Meta

| Command | What It Does |
|---------|-------------|
| `/write-skill` | Meta-skill that creates new skills — generates SKILL.md with proper frontmatter and structure. |
| `/grill-me` | Interrogates you about your plan until every edge case, failure mode, and assumption is resolved. Questions only — no answers. |

---

## Agents (8)

Agents are specialized personas Claude can delegate to. They provide deeper expertise than skills by maintaining a focused role throughout the task.

| Agent | Specialty | Delegates When |
|-------|-----------|---------------|
| **code-reviewer** | Autonomous code review | Reviewing any code changes for quality, security, performance |
| **architect** | System design, ADRs, Mermaid diagrams | Evaluating architecture, planning features, making design decisions |
| **tdd** | Test-driven development | Building features with strict red-green-refactor discipline |
| **security-auditor** | Threat modeling, OWASP Top 10 | Assessing security, pre-deployment audits, compliance reviews |
| **devops** | CI/CD, Docker, deployment | Setting up pipelines, containerization, infrastructure |
| **performance** | Profiling, bottleneck analysis | Finding and fixing performance issues |
| **documentation** | Docs matching project style | Writing READMEs, API docs, onboarding guides |
| **mentor** | Teaching with analogies and examples | Explaining concepts, learning new technologies, understanding code |

Agents live in `.claude/agents/` and can be invoked with the `/agents` command or auto-delegated by Claude.

---

## Rules (9)

Rules are modular instruction files that **auto-load into every Claude Code session**. They enforce coding standards without you having to repeat yourself.

| Rule | What It Enforces |
|------|-----------------|
| **code-quality** | Naming conventions, function length (<40 lines), nesting depth (<3), no dead code, DRY |
| **security** | No hardcoded secrets, input validation, parameterized queries, auth checks, dependency updates |
| **testing** | >80% coverage on business logic, arrange-act-assert, descriptive test names, deterministic tests |
| **git-workflow** | Conventional commits, atomic commits, branch naming, PR size (<400 lines), no force push to main |
| **error-handling** | Explicit handling, structured logging, meaningful messages, retry with backoff, circuit breakers |
| **performance** | No O(n^2) in production, no N+1 queries, connection pooling, caching strategy, lazy loading |
| **documentation** | Document "why" not "what", JSDoc/docstrings for public APIs, keep docs updated |
| **api-design** | Plural nouns, proper HTTP status codes, consistent error format, pagination, versioning |
| **database** | Migration files for all changes, index foreign keys, parameterized queries, connection pooling |

Rules live in `.claude/rules/` and require no manual invocation — they are always active.

---

## MCP Servers (30)

30 pre-configured MCP servers across 12 categories. Servers using `${ENV_VAR}` references are safe to keep in `.mcp.json` — they resolve at runtime. Set vars in your shell profile or `.env.local`.

### Core (zero config)
| Server | Purpose |
|--------|---------|
| **fetch** | Make HTTP requests from Claude |
| **filesystem** | Scoped file read/write access |
| **memory** | Persistent knowledge across sessions |
| **sequential-thinking** | Structured multi-step reasoning for complex problems |
| **context7** | Up-to-date library documentation (replaces stale training data) |

### Code & Semantic Editing
| Server | Purpose | Setup |
|--------|---------|-------|
| **serena** | Semantic code retrieval, symbol-level editing, multi-language support | Requires `uvx` (Python) |

### Frontend & Design
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **figma** | Design-to-code — pull variables, components, layout from Figma | `FIGMA_ACCESS_TOKEN` |

### Browser Automation & Web Scraping
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **playwright** | Full browser automation — testing, screenshots, form filling | None |
| **puppeteer** | Headless Chrome control | None |
| **firecrawl** | Web scraping, crawling, structured data extraction | `FIRECRAWL_API_KEY` |

### Search & Research
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **brave-search** | Web search | `BRAVE_API_KEY` |
| **perplexity** | AI-powered research with citations (Sonar models) | `PERPLEXITY_API_KEY` |

### Version Control & Code Platforms
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **github** | PR reviews, issues, repo operations | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **gitlab** | Merge requests, issues, CI pipelines | `GITLAB_PERSONAL_ACCESS_TOKEN`, `GITLAB_API_URL` |

### Databases
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **postgres** | PostgreSQL operations | `POSTGRES_CONNECTION_STRING` |
| **sqlite** | SQLite operations | None |
| **redis** | Redis cache & data store | `REDIS_URL` |
| **mongodb** | MongoDB queries & Atlas cluster management | `MONGODB_URI` |
| **supabase** | Supabase Postgres, auth, edge functions | `SUPABASE_URL`, `SUPABASE_API_KEY` |

### Infrastructure & Deployment
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **kubernetes** | K8s cluster management, pods, Helm charts | Uses local kubeconfig |
| **cloudflare** | DNS, Workers, R2, Zero Trust (2,500+ API endpoints) | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |

### Payments & Commerce
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **stripe** | Payments, subscriptions, customers | `STRIPE_SECRET_KEY` |

### Communication
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **slack** | Team messaging & channel operations | `SLACK_BOT_TOKEN`, `SLACK_TEAM_ID` |
| **twilio** | SMS, voice, communications | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` |

### Project Management
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **notion** | Knowledge base & documentation | `NOTION_TOKEN` |
| **linear** | Issue tracking & sprint management | `LINEAR_API_KEY` |

### Monitoring & Error Tracking
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **sentry** | Error tracking & crash monitoring | `SENTRY_ACCESS_TOKEN` |

### AI & ML
| Server | Purpose | Env Vars |
|--------|---------|----------|
| **huggingface** | Models, datasets, Spaces, papers from HF Hub | `HF_TOKEN` |

---

## Hooks (2)

### pre-tool-use.sh — Safety Gate

Blocks dangerous operations before they execute:

| Blocked | Why |
|---------|-----|
| `rm -rf /` (system paths) | Prevents accidental system destruction |
| `curl ... \| bash` | Prevents remote code execution |
| `git push --force` | Requires explicit approval |
| `sudo ...` | Prevents privilege escalation |
| Write to `.env*` | Prevents secret file corruption |
| Write to lock files | Lock files managed by package managers |
| Write to `.git/` | Git internals managed by git commands |

### post-tool-use.sh — Extensible

Currently a passthrough. Uncomment sections to enable auto-linting, audit logging, or time tracking.

---

## Customization

### Shared vs Personal

| File | Scope | Committed? |
|------|-------|-----------|
| `CLAUDE.md` | Team | Yes — project-specific instructions |
| `.claude/rules/*` | Team | Yes — coding standards |
| `.claude/agents/*` | Team | Yes — specialized agents |
| `.claude/skills/*` | Team | Yes — workflow skills |
| `CLAUDE.local.md` | You only | No (gitignored) — personal notes |
| `.claude/settings.local.json` | You only | No (gitignored) — permission overrides |

### Override a Skill for One Project

```bash
# Copy the shared skill to project level
cp -r claude-config/.claude/skills/review-pr .claude/skills/review-pr
# Edit .claude/skills/review-pr/SKILL.md with your customizations
# Project-level skills take precedence
```

### Add Project-Specific Rules

Create `.claude/rules/my-project-rules.md` in your project — it will auto-load alongside the shared rules.

---

## Adding Your Own

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed templates and guidelines. Quick overview:

### New Skill
```bash
mkdir -p .claude/skills/my-skill
# Create .claude/skills/my-skill/SKILL.md with frontmatter
# Or use: /write-skill to generate it automatically
```

### New Agent
```bash
# Create .claude/agents/my-agent.md with name, description, tools frontmatter
```

### New Rule
```bash
# Create .claude/rules/my-rule.md — plain markdown, no frontmatter
# Auto-loads into every session
```

---

## Upgrading

### Standalone clone
```bash
cd ~/claude-config && git pull origin main
bash ~/claude-config/setup.sh /path/to/your/project
```

### Git submodule
```bash
bash claude-config/update.sh
git add claude-config && git commit -m "chore: update claude-config"
```

New skills, agents, and rules are added automatically. Your project-level customizations are never overwritten.

---

## Using as a Git Submodule

```bash
# Add to project
git submodule add https://github.com/YOUR_USERNAME/claude-config.git claude-config
bash claude-config/setup.sh .
git add .gitmodules claude-config .claude/ CLAUDE.md .mcp.json .gitignore
git commit -m "chore: add claude-config submodule"

# Clone a project that uses it
git clone --recurse-submodules https://github.com/YOUR_USERNAME/your-project.git
bash claude-config/setup.sh .

# Forgot --recurse-submodules?
git submodule update --init --recursive
bash claude-config/setup.sh .
```

---

## Design Philosophy

**Stack-agnostic by default.** Every skill auto-detects the project's language, framework, and tools using shell injection. The same `/write-tests` generates Jest tests for React and pytest tests for FastAPI.

**Detect, don't prescribe.** CLAUDE.md defines universal principles. Rules define specific standards. Your project adds the stack-specific details. Upgrading the shared config never conflicts with your project.

**Layered architecture.** Rules (always-active standards) + Skills (on-demand workflows) + Agents (specialized personas) + Hooks (safety gates). Each layer has a clear purpose and doesn't overlap.

**Safety first.** The pre-tool-use hook blocks destructive operations. The settings.json deny-list prevents writes to sensitive files. You get guardrails without manual review of every tool call.

**Composable and upgradable.** Override any single skill, agent, or rule at the project level without affecting others. `git pull` to get new capabilities. Setup is idempotent — safe to re-run.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skills not in `/` menu | Re-run `setup.sh` — skills may not be in `.claude/skills/` |
| Agents not available | Check `.claude/agents/` has `.md` files |
| Rules not loading | Verify `.claude/rules/*.md` exists and has content |
| MCP server connection fails | Check `npx` is in PATH (install Node.js 18+) |
| GitHub MCP 401 error | Set `GITHUB_PERSONAL_ACCESS_TOKEN` env var |
| MCP server "env var not set" | Re-run `install.sh` or set vars manually in `.env.local` / shell profile |
| Hook not triggering | Run `chmod +x .claude/hooks/*.sh` |
| setup.sh fails on Windows | Use Git Bash (installed with Git for Windows) |
| Submodule files missing | Run `git submodule update --init --recursive` |
| Settings not taking effect | Check `.claude/settings.json` format with `python3 -m json.tool` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding skills, agents, rules, and hooks.

---

## License

[MIT](LICENSE) — use freely in personal and commercial projects.
