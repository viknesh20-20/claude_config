# Catalog

> Complete index of all skills, agents, and rules in this configuration.

## Skills (30)

### Code Quality
| Command | Description |
|---------|-------------|
| `/review-pr` | Comprehensive PR code review — correctness, security, performance, conventions |
| `/refactor` | Safe refactoring with code smell detection and test verification |
| `/explain-code` | Multi-level code explanation with data flow diagrams |

### Testing
| Command | Description |
|---------|-------------|
| `/write-tests` | Generate unit/integration tests — auto-detects framework |
| `/code-coverage` | Analyze coverage gaps and generate tests for critical paths |
| `/tdd` | Test-driven development — strict red-green-refactor cycle |

### Security
| Command | Description |
|---------|-------------|
| `/security-scan` | Vulnerability scan — injection, secrets, auth, OWASP Top 10 |
| `/dependency-audit` | Audit deps for vulnerabilities, outdated packages, license issues |

### Performance
| Command | Description |
|---------|-------------|
| `/optimize` | Performance analysis — algorithmic, database, memory, async |

### Architecture & Design
| Command | Description |
|---------|-------------|
| `/architecture-review` | System architecture review — dependencies, boundaries, scalability |
| `/api-design` | Design REST/GraphQL APIs with schemas and OpenAPI spec |
| `/create-component` | Scaffold modules/components following existing patterns |

### DevOps & Infrastructure
| Command | Description |
|---------|-------------|
| `/deploy-checklist` | Pre-deployment verification checklist |
| `/db-migration` | Database migration helper with safety checks |
| `/git-cleanup` | Clean merged branches, stale refs, repo maintenance |
| `/ci-pipeline` | Generate CI/CD config (GitHub Actions, GitLab CI) |
| `/docker-setup` | Generate Dockerfile, docker-compose, .dockerignore |
| `/env-setup` | Environment setup — .env.example, prerequisites, verification |

### Project Management
| Command | Description |
|---------|-------------|
| `/fix-issue` | Fix GitHub issues by number — fetch, implement, PR |
| `/estimate` | Effort estimation with subtasks and risk assessment |
| `/changelog` | Generate changelog from git history (Keep a Changelog) |
| `/pr-summary` | Generate PR description from branch diff |

### Documentation & Utilities
| Command | Description |
|---------|-------------|
| `/generate-docs` | Generate README, API docs, or inline documentation |
| `/debug` | Structured debugging — reproduce, isolate, fix, prevent |
| `/convert-code` | Convert code between languages preserving idioms |
| `/onboard` | Codebase onboarding guide generator |
| `/migrate-framework` | Framework migration assistant with file-by-file plan |
| `/error-monitor` | Set up error tracking (Sentry/Bugsnag) integration |

### Web Compliance, SEO & Legal
| Command | Description |
|---------|-------------|
| `/web-launch-check` | Pre-launch audit: privacy, ToS, cookies, sitemap, SEO, structured data, WCAG, Core Web Vitals — severity-graded GO/NO-GO |
| `/seo-scaffold` | Per-page meta + OG + Twitter + canonical + JSON-LD + sitemap.xml + robots.txt + security.txt, wired idiomatically |
| `/legal-pages` | Scaffolds Privacy Policy, ToS, Cookie Policy, consent banner, Refund Policy, Contact/Imprint as starting templates |

### Memory & Cross-Session Context
| Command | Description |
|---------|-------------|
| `/memory` | List, search, save, update, delete, dedupe entries in `.claude/memory/` |
| `/memory-import <path>` | Inherit memories from another workspace; auto-imports project + reference, asks before user + feedback |
| `/reference-app <path>` | Analyze a fully-built reference application; store its architecture + conventions in `reference/` for cross-comparison |
| `/handoff` | End-of-session summary written to `handoffs/<date>.md` so the next session resumes cleanly |

### Business Logic (SaaS / ERP / e-commerce / full-stack)
| Command | Description |
|---------|-------------|
| `/business-blueprint` | Walks every domain (auth, billing, multi-tenancy, inventory, GL, audit, compliance) tailored to project type + stage. Outputs a prioritized build plan. |
| `/business-logic-audit` | Severity-graded review of existing business code for invariant violations, race conditions, missing idempotency, currency precision, audit gaps |
| `/competitive-analysis` | Researches how 2–4 mature competitors (Stripe / Linear / NetSuite / Shopify / Auth0 / etc.) solve a specific problem. Side-by-side comparison, cites every source. |

### Design (flows, wireframes, copy, accessibility)
| Command | Description |
|---------|-------------|
| `/design-flow` | Designs an end-to-end user flow before pixels: entry, screens, decisions, branches, edge cases, microcopy hooks. Outputs an engineering-ready spec. |
| `/wireframe` | Pixel-free wireframes (ASCII / Mermaid / outline) for any screen, covering all states (default, loading, empty, error) |
| `/microcopy` | Voice-consistent UX copy for buttons, errors, empty states, success, tooltips, forms. No "Submit" / "Oops!" / dark patterns. |
| `/a11y-audit` | WCAG 2.1 AA audit with code fixes per finding. Walks every criterion that maps to common patterns. |

### Meta
| Command | Description |
|---------|-------------|
| `/write-skill` | Create new Claude Code skills with proper frontmatter |
| `/grill-me` | Stress-test your plan with probing questions until bulletproof |

---

## Agents — Toolkit originals (12)

These are written from scratch for this toolkit. Original IP, no copy-paste from third-party content.

| Agent | Specialty | When to use |
|---|---|---|
| `architect` | System design, ADRs, C4 diagrams, reversibility analysis | Before any structural choice that's expensive to reverse |
| `code-reviewer` | Severity-graded code review with GO / CONDITIONAL / NO-GO verdict | PR review, pre-merge audit |
| `tdd` | Strict red-green-refactor with cycle-by-cycle output | Building features that need correctness |
| `security-auditor` | Threat modeling (STRIDE), OWASP Top 10 walk, CWE-mapped findings | Pre-deploy auth/payment/PII review |
| `devops` | DORA-aligned platform engineering, deploy strategies, rollback plans | Pipelines, IaC, K8s, deployment design |
| `performance` | Profile-first, head-of-distribution focus, before/after measurement | Bottleneck hunt, regression diagnosis |
| `documentation` | Reader-targeted docs, deletes more often than writes | READMEs, API docs, runbooks, ADRs |
| `mentor` | Calibrated teaching, layered explanations | Concept questions, tradeoff explanations |
| `three-d-specialist` | Three.js / R3F / WebGPU / WebGL / TSL / scroll-driven scenes | Premium 3D web experiences |
| `ai-engineer` | LLM apps, RAG, agentic systems, evals, prompt caching, cost tuning | Any feature that calls an LLM |
| `design-system-architect` | Tokens, component APIs, theming, a11y at the component layer | Building or auditing a design system |
| `qa-lead` | Test pyramid, E2E, visual regression, a11y, perf budgets, flake hunting | Test strategy, CI gates, release smoke |
| `business-architect` | Senior business-domain architect for SaaS/ERP/e-commerce/marketplace/fintech. Knows Stripe, Linear, NetSuite, Shopify patterns; thinks in invariants and failure modes. | Designing or reviewing money, multi-tenancy, state machines, audit, billing, refunds, RBAC |
| `ux-designer` | Senior product designer for user flows, IA, wireframes, microcopy, UX review. Owns the user's path through the product. Refuses dark patterns. | Designing flows, reviewing UX, writing microcopy, planning IA |

## Agents — Vendored from third-party sources (376)

Physically present in the repo under `.claude/agents/<vendor>/` with `NOTICE.md` attribution per folder. See [docs/LICENSES.md](docs/LICENSES.md) for the full source register.

| Source | Count | Layout | License |
|---|---|---|---|
| `voltagent/` | 154 | Categorized into 10 domains | MIT |
| `wshobson/` | 185 | Grouped by plugin | MIT |
| `contains-studio/` | 37 | By department (design, engineering, marketing, product, …) | Unspecified — public repo |

---

## Rules (9)

| Rule File | Covers |
|-----------|--------|
| `code-quality.md` | Naming, functions, complexity, file organization |
| `security.md` | Secrets, input validation, injection prevention, auth |
| `testing.md` | Coverage, test structure, naming, mocking |
| `git-workflow.md` | Commits, branching, PRs, safety |
| `error-handling.md` | Error messages, logging, retry, boundaries |
| `performance.md` | Algorithms, database, I/O, caching |
| `documentation.md` | Inline docs, project docs, maintenance |
| `api-design.md` | Endpoints, status codes, pagination, error format |
| `database.md` | Migrations, queries, indexes, naming, integrity |
| `web-compliance.md` | Privacy, cookies, sessions, GDPR/CCPA, sitemap, robots.txt, SEO meta, WCAG, legal pages |
| `no-hallucination.md` | Verify before claiming. Ask before deciding on destructive / visible / ambiguous / costly / locking actions. |
| `memory-discipline.md` | Read `.claude/memory/MEMORY.md` at session start; write deliberately; never duplicate; redact secrets. |
| `business-logic.md` | Cents-as-int for money. UTC + DST-aware time. Append-only ledger. Explicit state-machine transitions. Multi-tenant isolation. Idempotency on every state change. Append-only audit on regulated entities. |
| `design-quality.md` | Four pillars (hierarchy, consistency, feedback, accessibility). 4-pt spacing scale, modular type scale, WCAG AA contrast, semantic HTML, focus visibility, motion principles, microcopy rules. Refuses dark patterns. |

Rules auto-load into every Claude Code session. No manual invocation needed.

---

## Hooks (3)

| Hook | Trigger | Behavior |
|------|---------|----------|
| `pre-tool-use.sh` | Before every tool call | Blocks dangerous ops (rm -rf, force push, .env writes) |
| `post-tool-use.sh` | After every tool call | Extensible passthrough (auto-lint, logging examples) |
| `design-quality-check.sh` | After Edit/Write to UI files (.tsx/.jsx/.vue/.svelte/.html/.astro) | Non-blocking nudge: flags raw hex colors, off-scale pixels, missing alt, empty buttons, `outline:none` without focus-visible, `<div onClick>` |

---

## MCP Servers (30)

### Core (zero config)
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `fetch` | HTTP requests | None |
| `filesystem` | Scoped file access | None |
| `memory` | Persistent knowledge store | None |
| `sequential-thinking` | Structured multi-step reasoning | None |
| `context7` | Up-to-date library documentation | None |

### Code & Semantic Editing
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `serena` | Semantic code retrieval & symbol-level editing | Requires `uvx` (Python) |

### Frontend & Design
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `figma` | Design-to-code, pull variables/components/layout | Set `FIGMA_ACCESS_TOKEN` |

### Browser Automation & Web Scraping
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `playwright` | Full browser automation & testing | None |
| `puppeteer` | Headless Chrome control | None |
| `firecrawl` | Web scraping, crawling, structured extraction | Set `FIRECRAWL_API_KEY` |

### Search & Research
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `brave-search` | Web search | Set `BRAVE_API_KEY` |
| `perplexity` | AI-powered research with citations | Set `PERPLEXITY_API_KEY` |

### Version Control & Code Platforms
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `github` | PR, issue, repo operations | Set `GITHUB_PERSONAL_ACCESS_TOKEN` |
| `gitlab` | Merge requests, issues, CI pipelines | Set `GITLAB_PERSONAL_ACCESS_TOKEN`, `GITLAB_API_URL` |

### Databases
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `postgres` | PostgreSQL operations | Set `POSTGRES_CONNECTION_STRING` |
| `sqlite` | SQLite operations | None |
| `redis` | Redis cache & data store | Set `REDIS_URL` |
| `mongodb` | MongoDB queries & Atlas management | Set `MONGODB_URI` |
| `supabase` | Supabase Postgres, auth, edge functions | Set `SUPABASE_URL`, `SUPABASE_API_KEY` |

### Infrastructure & Deployment
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `kubernetes` | K8s cluster management, pods, Helm | Uses local kubeconfig |
| `cloudflare` | DNS, Workers, R2, Zero Trust | Set `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |

### Payments & Commerce
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `stripe` | Payments, subscriptions, customers | Set `STRIPE_SECRET_KEY` |

### Communication
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `slack` | Team messaging & channels | Set `SLACK_BOT_TOKEN`, `SLACK_TEAM_ID` |
| `twilio` | SMS, voice, communications | Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` |

### Project Management
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `notion` | Knowledge base & docs | Set `NOTION_TOKEN` |
| `linear` | Issue tracking & sprint management | Set `LINEAR_API_KEY` |

### Monitoring & Error Tracking
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `sentry` | Error tracking & monitoring | Set `SENTRY_ACCESS_TOKEN` |

### AI & ML
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `huggingface` | Models, datasets, Spaces, papers | Set `HF_TOKEN` |

### RAG & Vector Databases
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `claude-context` | Semantic codebase RAG (zilliz/Milvus) | Set `OPENAI_API_KEY`, `MILVUS_URI`, `MILVUS_TOKEN` |
| `qdrant` | Vector search for agent memory & RAG | Set `QDRANT_URL`, `QDRANT_API_KEY`, `QDRANT_COLLECTION` |
| `chroma` | Embedding database, persistent or in-memory | Set `CHROMA_HOST`, `CHROMA_PORT` |

### UI Component Generation
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `magic` | 21st.dev Magic — generate UI components via `/ui` | Set `TWENTYFIRST_DEV_API_KEY` |

### Deployment Platforms
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `vercel` | Vercel deploys, projects, env vars | Set `VERCEL_TOKEN` |
| `netlify` | Netlify deploys, sites, functions | Set `NETLIFY_AUTH_TOKEN` |

### Cloud Providers
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `aws` | Official AWS API MCP server | Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` |

### AI Search & Research
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `tavily` | AI-native web search (free 1K/mo) | Set `TAVILY_API_KEY` |
| `exa` | Semantic search (free tier) | Set `EXA_API_KEY` |

### AI-Native Browser Automation
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `browserbase` | Cloud Chrome for agents | Set `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` |

### AI Compute & Model APIs
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `replicate` | Run any open AI model | Set `REPLICATE_API_TOKEN` |
| `elevenlabs` | TTS + voice cloning (freemium) | Set `ELEVENLABS_API_KEY` |
| `e2b` | Cloud sandbox for AI-generated code (free tier) | Set `E2B_API_KEY` |

### Code Quality & Security
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `sonarqube` | Static analysis (free OSS Community edition) | Set `SONARQUBE_TOKEN`, `SONARQUBE_ORG`, `SONARQUBE_URL` |
| `snyk` | Dependency vulnerability scanning (freemium) | Set `SNYK_TOKEN` |

### Observability
| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `grafana` | Grafana queries, dashboards, alerts | Set `GRAFANA_URL`, `GRAFANA_SERVICE_ACCOUNT_TOKEN` |
| `datadog` | Datadog metrics, logs, traces, incidents | Set `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE` |

---

## Bundled marketplaces & plugins

Installed by `node install.mjs` based on archetype. See [docs/ARCHETYPES.md](docs/ARCHETYPES.md) for archetype membership and [docs/LICENSES.md](docs/LICENSES.md) for licensing.

### Plugin marketplaces (6)
| Marketplace | Source | License |
|---|---|---|
| `claude-plugins-official` | Anthropic (auto-available) | Anthropic ToS |
| `obra/superpowers-marketplace` | https://github.com/obra/superpowers-marketplace | MIT |
| `nextlevelbuilder/ui-ux-pro-max-skill` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT |
| `ruvnet/ruflo` | https://github.com/ruvnet/ruflo | MIT |
| `greensock/gsap-skills` | https://github.com/greensock/gsap-skills | MIT |
| `thedotmack/claude-mem` | https://github.com/thedotmack/claude-mem | AGPL-3.0 (opt-in) |

### Native Claude Code plugins (13)
| Plugin | Marketplace | Archetypes |
|---|---|---|
| `frontend-design` | claude-plugins-official | web, saas, all |
| `superpowers` | obra/superpowers-marketplace | saas, ai, all |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | web, saas, all |
| `claude-mem` ⚠️ | thedotmack/claude-mem | saas, ai, all (opt-in, AGPL warning) |
| `ruflo-core` | ruvnet/ruflo | ai, saas, all |
| `ruflo-swarm` | ruvnet/ruflo | ai, saas, all |
| `ruflo-autopilot` | ruvnet/ruflo | ai, all |
| `ruflo-federation` | ruvnet/ruflo | ai, all |
| `ruflo-agentdb` | ruvnet/ruflo | ai, all |
| `ruflo-rag-memory` | ruvnet/ruflo | ai, all |
| `ruflo-knowledge-graph` | ruvnet/ruflo | ai, all |
| `ruflo-testgen` | ruvnet/ruflo | saas, all |
| `ruflo-security-audit` | ruvnet/ruflo | saas, all |
| `ruflo-observability` | ruvnet/ruflo | saas, all |

### Skills via npx (3)
| Source | License |
|---|---|
| `pbakaus/impeccable` (1 skill, 23 commands) | Apache-2.0 |
| `kylezantos/design-motion-principles` (1 skill) | MIT |
| `greensock/gsap-skills` (8 skills) | MIT |

### Agent collections (3 × 100s of agents)
| Collection | Count | License |
|---|---|---|
| `VoltAgent/awesome-claude-code-subagents` | 100+ | MIT |
| `wshobson/agents` | 50 | MIT |
| `contains-studio/agents` | 40 | MIT |

### External clones
| Tool | Where | Commands |
|---|---|---|
| `garrytan/gstack` | `~/.claude/skills/gstack` | ~38 commands (`/office-hours`, `/ship`, `/review`, `/qa`, `/canary`, `/design-review`, `/investigate`, `/retro`, `/browse`, `/codex`, …) |

### CLI bootstrap (one-shot setup)
| Tool | Command | Purpose |
|---|---|---|
| `firecrawl-cli` | `npx -y firecrawl-cli@latest init --all --browser` | Initialize Firecrawl with browser session support — prompts for `FIRECRAWL_API_KEY` at runtime, never stored in config |

### npm package suggestions (web/all archetypes)
`motion`, `framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `lenis`, `leva`
