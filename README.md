# Claude Code Toolkit — Skills, Agents, Plugins, MCP Servers, Rules & Hooks for AI-assisted development

> **The complete production-ready Claude Code configuration.** A one-command installer that gives you 200+ slash commands, ~390 specialized agents, 45+ MCP servers, 14 plugins, design tools, 3D / WebGPU stack, RAG & vector databases, AI agent orchestration, testing, DevOps, and security tooling. Free, open-source, MIT-licensed. Works for vibe coders and senior engineers alike.

**Use cases:** premium landing pages · enterprise SaaS apps · AI agents · RAG pipelines · LLM applications · design systems · scroll-driven 3D websites · autonomous swarms · testing automation · security audits · CI/CD setup.

<!--
SEO keywords (do not remove): Claude Code, Claude Code skills, Claude Code agents, Claude Code subagents, Claude Code plugins, Claude Code MCP, Claude Code marketplace, Anthropic Claude AI development, Claude AI toolkit, AI coding assistant configuration, agent orchestration, RAG MCP, vector database MCP, Three.js Claude skill, WebGPU Claude skill, GSAP skills Claude, design system AI, frontend AI assistant, ui-ux-pro-max, gstack, ruflo, superpowers, impeccable design skill, claude-mem, voltagent agents, wshobson agents, contains-studio agents, AI engineer agent, security auditor agent, devops agent, TDD agent, code reviewer agent, architect agent, qa lead agent, design system architect agent, three-d-specialist agent.
-->

**Quick links:** [CHEATSHEET.md](CHEATSHEET.md) · [docs/FIRST_RUN.md](docs/FIRST_RUN.md) (new to this? start here) · [docs/MEMORY.md](docs/MEMORY.md) · [docs/BUSINESS_LOGIC.md](docs/BUSINESS_LOGIC.md) · [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md) · [docs/TOOLBOX.md](docs/TOOLBOX.md) · [docs/ARCHETYPES.md](docs/ARCHETYPES.md) · [docs/LICENSES.md](docs/LICENSES.md) · [CATALOG.md](CATALOG.md)

---

## At a glance

What you get out-of-the-box (all original, MIT-licensed, in-repo):

- **14 specialist agents** written from scratch — `architect`, `code-reviewer`, `security-auditor`, `devops`, `performance`, `tdd`, `documentation`, `mentor`, `three-d-specialist`, `ai-engineer`, `design-system-architect`, `qa-lead`, `business-architect`, **`ux-designer`** (senior product designer for flows, IA, wireframes, microcopy, UX review).
- **30 baseline slash-command skills** — `/review-pr`, `/security-scan`, `/optimize`, `/tdd`, `/onboard`, `/debug`, `/refactor`, `/explain-code`, `/architecture-review`, `/api-design`, `/ci-pipeline`, `/docker-setup`, `/db-migration`, `/deploy-checklist`, `/write-tests`, `/code-coverage`, `/dependency-audit`, `/changelog`, `/pr-summary`, `/fix-issue`, `/estimate`, `/generate-docs`, `/migrate-framework`, `/error-monitor`, `/env-setup`, `/create-component`, `/git-cleanup`, `/grill-me`, `/write-skill`, `/convert-code`.
- **14 auto-loading coding rules** for security, testing, code quality, performance, error handling, git workflow, API design, database, documentation, **web compliance & SEO** (privacy, cookies, sessions, GDPR/CCPA, sitemap, WCAG), **no-hallucination** (verify before claiming, ask before deciding), **memory-discipline** (persistent context across sessions), **business-logic** (cents-as-int for money, multi-tenancy isolation, idempotency, audit-on-regulated-entities, append-only ledgers), **design-quality** (four pillars: hierarchy, consistency, feedback, accessibility; refuses dark patterns).
- **3 lifecycle hooks** — `pre-tool-use.sh` (blocks dangerous ops), `post-tool-use.sh` (extensible passthrough), `design-quality-check.sh` (post-write nudge on UI files: flags raw hex colors, missing alt, empty buttons, `outline:none` without focus-visible, `<div onClick>`).
- **Persistent memory layer** at `.claude/memory/` — facts about the project, user preferences, corrections, and references survive across sessions. Inherit memories from another workspace via `/memory-import`. Use a fully-built application as a reference via `/reference-app`. End-of-session summaries via `/handoff` so tomorrow's session picks up cleanly.
- **2 safety hooks** that block dangerous operations before they execute.
- **45+ MCP servers** wired up via `.mcp.json` (with `${ENV}` placeholders — no secrets committed).
- **Cross-platform Node.js installer** that asks one friendly question and sets everything up.

What the installer can fetch on demand (open-source, gitignored, never published with your repo):

- **~150 VoltAgent agents** in 10 domains.
- **~185 wshobson agents** grouped by plugin.
- **~38 gstack skills** (Garry Tan's stack: `/office-hours`, `/ship`, `/review`, `/qa`, `/canary`, `/design-review`, etc.).
- **14 superpowers skills** — TDD, brainstorming, parallel subagents, code review.
- **24 Three.js skills** — WebGL, WebGPU, R3F, drei, physics.
- **8 GSAP skills** — core, timeline, ScrollTrigger, plugins, React, performance.
- **23 impeccable commands** — design fluency: polish, audit, critique, typeset, animate.
- **WebGPU + TSL skill**, **design-motion-principles**, **ui-ux-pro-max**.
- **Claude Code plugins**: frontend-design, superpowers, ui-ux-pro-max, ruflo (10 plugins), claude-mem (opt-in).

[![Slash commands](https://img.shields.io/badge/slash--commands-200%2B-blue?style=flat-square)](CHEATSHEET.md)
[![Agents](https://img.shields.io/badge/agents-12_original_%2B_~370_optional-purple?style=flat-square)](docs/ARCHETYPES.md)
[![Vendored](https://img.shields.io/badge/vendored--in--repo-yes-green?style=flat-square)](docs/LICENSES.md)
[![MCP Servers](https://img.shields.io/badge/MCP_servers-45%2B-orange?style=flat-square)](.mcp.json)
[![Plugins](https://img.shields.io/badge/native_plugins-13-red?style=flat-square)](.claude/plugins.json)
[![Rules](https://img.shields.io/badge/rules-9-green?style=flat-square)](CATALOG.md)
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

## Quick Start — one command

```bash
cd your-project
npx github:viknesh20-20/claude-code-tool-kit
```

That's it. The installer asks one question — *what are you building?* — and sets up the matching bundle (plugins, skills, agents, MCPs, secrets) inside the current directory.

To install everything without picking:

```bash
npx github:viknesh20-20/claude-code-tool-kit --all
```

**Windows PowerShell** works the same way:

```powershell
cd your-project
npx github:viknesh20-20/claude-code-tool-kit
```

That's the recommended path. Everything else below is alternatives for specific situations.

---

### Alternative: clone + run

If you'd rather have the toolkit on disk (so you can update it yourself):

```bash
git clone https://github.com/viknesh20-20/claude-code-tool-kit.git ~/claude-code-toolkit
cd /path/to/your/project
node ~/claude-code-toolkit/install.mjs
```

### Alternative: file-only quick install

No archetypes, no prompts, no plugins — just the core skills, agents, rules, hooks:

```bash
npx github:viknesh20-20/claude-code-tool-kit --archetype files-only
```

### Alternative: git submodule (for teams)

```bash
cd your-project
git submodule add https://github.com/viknesh20-20/claude-code-tool-kit.git claude-code-toolkit
node claude-code-toolkit/install.mjs --target .
git add . && git commit -m "chore: add claude-code-toolkit"
```

### What the installer does

1. Detects your toolchain (Node, git, npx, Claude Code, uvx) and tells you what's missing with install links.
2. Asks for an **archetype** (web · saas · ai · all · custom · files-only) — friendly question with examples.
3. Copies skills, agents, rules, hooks, `.mcp.json`, `settings.json` into your project.
4. Adds plugin marketplaces and installs Claude Code plugins matching the archetype.
5. Clones agent collections (VoltAgent, wshobson, optionally contains-studio with consent) into gitignored paths.
6. Adds per-archetype MCP servers and prompts for any API keys you have (skip any to add later).
7. Initializes the persistent memory layer at `.claude/memory/`.
8. Generates a license register (`docs/LICENSES.md`) reflecting what was installed.

Re-running the installer is safe — already-installed items are skipped.

After setup, customize `CLAUDE.md` with your project's stack, then open [CHEATSHEET.md](CHEATSHEET.md) for the intent → command lookup.

---

## Archetypes

The installer asks one question: *what are you building?* Six answers, six bundles.

| Archetype | For | Key adds |
|---|---|---|
| **web** | $10K-tier sites, agencies, marketing | impeccable · ui-ux-pro-max · 21st-dev/magic · frontend-design · gsap-skills · motion-principles · figma + playwright MCP |
| **saas** | $100K-tier B2B / SaaS | everything from `web` + superpowers + ruflo (core, swarm, testgen, security-audit, observability) + gstack + claude-context + DB/payments/comms/monitoring MCPs |
| **ai** | Autonomous agents, RAG, LLM apps | full ruflo (core, swarm, autopilot, federation, agentdb, rag-memory, knowledge-graph) + superpowers + qdrant + chroma + claude-context + huggingface + perplexity + firecrawl |
| **all** | Solo founders, "kitchen sink" | Union of `web` + `saas` + `ai` |
| **custom** | Power users | Granular per-service prompts |
| **files-only** | Skeptics, offline | Just the toolkit's skills/agents/rules/hooks |

See [docs/ARCHETYPES.md](docs/ARCHETYPES.md) for what each one installs in detail.

---

## What this can build

| Tier | Use the toolkit to ship | Provided by |
|---|---|---|
| **Premium websites ($10K+)** | Animated landing pages, design-forward marketing sites, portfolios | impeccable, ui-ux-pro-max, 21st-dev/magic, gsap-skills, motion-principles, frontend-design, figma + playwright MCP |
| **Enterprise SaaS ($100K+)** | Multi-tenant dashboards, B2B products, billing flows, complex backends | superpowers, ruflo, gstack, claude-mem (opt-in), claude-context (RAG over codebase), full DB/payments/monitoring stack, 190+ specialized agents |
| **AI agents / RAG / LLM apps** | Autonomous swarms, vector-search apps, research bots, agentic pipelines | full ruflo plugin set, qdrant + chroma MCPs, claude-context, huggingface, perplexity, tavily, exa, browserbase, e2b, replicate, elevenlabs, sequential-thinking, 150+ AI/data agents |

For the comprehensive register of every tool the toolkit can drive — design references, brainstorming whiteboards (15 ranked free-first), Three.js / WebGPU / WebGL stack, testing, DevOps, AI MCPs — see [docs/TOOLBOX.md](docs/TOOLBOX.md).

---

## What's Included

```
claude-code-toolkit/
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
cp -r claude-code-toolkit/.claude/skills/review-pr .claude/skills/review-pr
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
cd ~/claude-code-toolkit && git pull origin main
bash ~/claude-code-toolkit/setup.sh /path/to/your/project
```

### Git submodule
```bash
bash claude-code-toolkit/update.sh
git add claude-code-toolkit && git commit -m "chore: update claude-code-toolkit"
```

New skills, agents, and rules are added automatically. Your project-level customizations are never overwritten.

---

## Using as a Git Submodule

```bash
# Add to project
git submodule add https://github.com/viknesh20-20/claude-code-tool-kit.git claude-code-toolkit
bash claude-code-toolkit/setup.sh .
git add .gitmodules claude-code-toolkit .claude/ CLAUDE.md .mcp.json .gitignore
git commit -m "chore: add claude-code-toolkit submodule"

# Clone a project that uses it
git clone --recurse-submodules https://github.com/YOUR_USERNAME/your-project.git
bash claude-code-toolkit/setup.sh .

# Forgot --recurse-submodules?
git submodule update --init --recursive
bash claude-code-toolkit/setup.sh .
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

[MIT](LICENSE) — this toolkit (the 12 agents, 30 skills, 9 rules, 2 hooks, installer, docs) is MIT-licensed and is yours to push, fork, modify, and ship.

**Third-party content is never committed to this repo.** The installer fetches it on demand into gitignored paths. Each fetched folder gets a `NOTICE.md` with attribution. You can publish your repo without redistributing third-party code.

The full per-source license register is at [docs/LICENSES.md](docs/LICENSES.md). One source (`contains-studio`) has no LICENSE upstream — the installer requires explicit consent before fetching it and defaults to "no."
