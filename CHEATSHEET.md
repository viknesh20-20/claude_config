# Claude Code Toolkit — Cheat Sheet

> Single-page intent → command lookup. "I want to do X → run Y."

---

## First time? Install

```
# Recommended — one command, picks the right bundle for your project
node install.mjs

# Or skip the menu and install everything
node install.mjs --all

# Windows
.\bootstrap.ps1

# macOS / Linux
bash bootstrap.sh
```

Pick an archetype when prompted: **web** · **saas** · **ai** · **all** · **custom** · **files-only**.

---

## Memory — persistent context across sessions and across projects

| I want to … | Run | What happens |
|---|---|---|
| See what Claude remembers | `/memory list` | Prints memory grouped by type with last-verified dates |
| Find a memory | `/memory search <query>` | Searches memory body + descriptions |
| Save a fact | `/memory save` | Walks through type, title, description, body — confirms before writing |
| Remove a memory | `/memory delete <name>` | Shows what would be deleted; asks confirmation |
| End-of-session summary | `/handoff` | Writes a structured summary to `.claude/memory/handoffs/<date>.md` so next session picks up cleanly |
| Inherit from another workspace | `/memory-import /path/to/other-workspace` | Pulls another project's memories with provenance tags; asks before importing user/feedback memories |
| Use a reference application | `/reference-app /path/to/full-app` | Reads the reference's architecture and conventions; stores a summary so any later session can compare/borrow patterns |

**The two anti-hallucination rules that auto-load every session:**
- [`no-hallucination`](.claude/rules/no-hallucination.md) — verify before claiming, ask before deciding. No silent decisions on destructive, visible-to-others, or ambiguous actions.
- [`memory-discipline`](.claude/rules/memory-discipline.md) — read the index at session start, write deliberately, never duplicate.

Full guide: [docs/MEMORY.md](docs/MEMORY.md).

---

## Web compliance, SEO & legal pages (every public site needs this)

| I want to … | Run | What happens |
|---|---|---|
| Audit my site before launch | `/web-launch-check` | Full pre-launch audit: privacy, ToS, cookie consent, sitemap, robots, SEO meta, structured data, WCAG, Core Web Vitals — severity-graded findings with GO / NO-GO verdict |
| Add SEO essentials | `/seo-scaffold` | Generates per-page meta + Open Graph + Twitter Cards + canonical + JSON-LD + sitemap.xml + robots.txt + security.txt — wired idiomatically into your framework |
| Add legal pages | `/legal-pages` | Scaffolds Privacy Policy, ToS, Cookie Policy, Cookie consent banner, Refund Policy, Contact / Imprint — clearly marked as templates for lawyer review |
| Verify deploy compliance | `/deploy-checklist` | Now includes a 14-item web-compliance & SEO section gating deploy |

The auto-loading rule [.claude/rules/web-compliance.md](.claude/rules/web-compliance.md) means Claude **always** considers privacy, cookies, sessions, sitemap, robots, SEO, and accessibility when building public sites — even if you don't explicitly ask. Claude will proactively scaffold stub legal pages and footer links when generating new sites.

---

## I want to build a premium landing page ($10K+ tier)

| I want to … | Run | What happens |
|---|---|---|
| Generate a UI component | `/ui pricing card with three tiers` | 21st.dev Magic writes the component into your project |
| Audit my motion design | `Audit the motion design in this codebase` | Three-lens review (Emil Kowalski, Jakub Krehel, Jhey Tompkins) with severity-rated fixes |
| Polish design fluency | `/polish` (impeccable) | Reviews + fixes typography, spacing, contrast, hierarchy |
| Critique the design | `/critique` (impeccable) | Hard-edged review against design principles |
| Add GSAP animation | `Add a scroll-triggered hero animation` | gsap-skills supplies idiomatic GSAP/ScrollTrigger code |
| Build a 3D scroll scene | `Build a scroll-driven 3D scene with r3f and lenis` | three + @react-three/fiber + @react-three/drei + lenis + GSAP ScrollTrigger combine into a smooth-scroll 3D experience |
| Add post-processing effects | `Add bloom and DOF to the r3f scene` | @react-three/postprocessing supplies bloom, depth-of-field, vignette |
| Tune scene values live | `Add leva controls for the camera position` | leva surfaces a runtime GUI for tuning |
| Pull design from Figma | (with FIGMA_ACCESS_TOKEN set) `Get the variables and components from Figma file XYZ` | Figma MCP returns design tokens + component refs |
| Auto-build full UI | `Create a dashboard for a music streaming app` | frontend-design plugin auto-activates |
| Scrape a competitor site | `Scrape https://competitor.com using firecrawl` | Firecrawl MCP returns clean markdown; firecrawl-cli was bootstrapped at install for browser sessions |
| Live-test in a browser | `/qa` (gstack) | Spins up a browser, runs through flow, returns failures |

---

## I want to ship an enterprise SaaS app ($100K+ tier)

| I want to … | Run | What happens |
|---|---|---|
| Plan a feature with forced rigor | `/office-hours <feature>` (gstack) | Surfaces hidden assumptions before any code is written |
| Stress-test my plan | `/grill-me` (toolkit) | Asks probing questions until every edge case is resolved |
| TDD a new module | `/tdd <feature>` or invoke superpowers' test-driven-development | Failing test first, minimal code, refactor |
| Generate tests for untested code | `/write-tests <file>` | Covers happy path, edge cases, errors, async |
| Review a PR | `/review-pr` or `/review` (gstack) | Severity-rated findings + GO/NO-GO verdict |
| Pre-deploy check | `/deploy-checklist` | Tests, security, migrations, env vars, rollback |
| DB migration | `/db-migration` | Up/down migrations, safety checks, index recommendations |
| Architecture review | `/architecture-review` | Dependency map, layer violations, scalability assessment |
| Security audit | `/security-scan` or `/cso` (gstack) | Injection, secrets, auth, OWASP + STRIDE for /cso |
| Generate CI pipeline | `/ci-pipeline` | GitHub Actions / GitLab CI with lint, test, build, deploy |
| Containerize | `/docker-setup` | Multi-stage Dockerfile + docker-compose + .dockerignore |
| Ship the PR | `/ship` (gstack) | Test-first verifiable goal completion + PR |
| Land + deploy | `/land-and-deploy` (gstack) | Merge to main + production deploy workflow |
| Watch the canary | `/canary` (gstack) | Post-deploy monitoring |
| Persistent context across sessions | claude-mem auto-activates | Captures everything; injects relevant context next session |

---

## I want to build an AI agent / RAG / LLM application

| I want to … | Run | What happens |
|---|---|---|
| Boot a multi-agent swarm | Use ruflo-swarm via natural language | Hierarchical or mesh swarm coordinates sub-agents automatically |
| Run autonomously in a loop | Use ruflo-autopilot | Self-paced /loop completion |
| Index codebase for RAG | claude-context auto-activates | Vectorizes the project; only relevant code enters context |
| Vector search | Configure QDRANT_URL / CHROMA_URL, then ask agent to query | qdrant or chroma MCP serves results |
| Brainstorm before coding | `superpowers brainstorming` | Structured idea generation |
| Dispatch parallel subagents | `superpowers dispatching-parallel-agents` | Spawns workers in worktrees, coordinates results |
| TDD an LLM tool | `superpowers test-driven-development` | Strict red-green-refactor for AI features |
| Web research with citations | `Search the web for <topic>` | Perplexity MCP returns sources |
| Scrape a site | `Scrape https://...` | Firecrawl MCP returns clean markdown |
| Pull docs for a library | `Show me the docs for <library>` | context7 MCP returns up-to-date docs |
| Sequential reasoning | `sequential-thinking` MCP | Multi-step structured reasoning for complex problems |
| Build with Anthropic SDK | Invoke the `/claude-api` skill | Caching, thinking, tool-use, batch APIs configured correctly |

---

## Brainstorming & ideation (free-first)

| Tool | Cost | When |
|---|---|---|
| **Excalidraw** | Free / MIT | Default — sketches, architecture chats, hand-drawn diagrams |
| **tldraw** | Free / Apache-2.0 | Multi-page collaborative whiteboard with polish |
| **Penpot** | Free / MPL-2.0 | Design + ideation in one infinite canvas, self-hostable |
| **drawio (diagrams.net)** | Free / Apache-2.0 | Architecture diagrams, mind maps, flowcharts |
| **Mermaid** | Free / MIT | Diagrams-as-code — renders inline in Claude responses, GitHub, VS Code |
| **PlantUML** | Free / GPL | UML in code |
| **AFFiNE** | Free / MIT | Local-first Notion + Miro hybrid |
| FigJam · Whimsical · Miro | Freemium | Cross-team workshops |
| Mural · Lucidchart · Stormboard | Paid | Enterprise |

Full ranked table with 15 tools and self-hosting notes: see [docs/TOOLBOX.md §2](docs/TOOLBOX.md).

---

## 3D / WebGPU / WebGL — premium scroll experiences

| I want to … | Run | What happens |
|---|---|---|
| Build a WebGPU-first scene | Use the `webgpu-claude-skill` | dgreenheck's skill steers Claude through WebGPU + TSL (Three.js Shading Language), r183+ |
| Build any Three.js scene | Use the `Three.js-Claude-Skill-Package` | 24 skills covering WebGL, WebGPU, R3F, Drei, physics, IFC, loaders |
| Build a scroll-driven 3D scene | `Build a scroll-driven 3D scene with r3f and lenis` | three + r3f + drei + postprocessing + lenis + GSAP ScrollTrigger combine for Awwwards-tier scenes |
| Add postprocessing | `Add bloom and DOF` | @react-three/postprocessing supplies bloom, DOF, vignette, SSAO, SSR |
| Tune scene values live | `Add leva controls for the camera` | leva surfaces a runtime GUI |
| Add physics | `Add Rapier physics to the scene` | @react-three/rapier hooks Rapier into r3f |
| Test WebGPU support | `Detect WebGPU and graceful-degrade to WebGL` | Skill guides feature detection with WebGL fallback |

npm packages auto-suggested by the installer for `web` / `all` archetypes:

```
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing lenis leva
```

References: [Three.js examples](https://threejs.org/examples/) · [WebGPU Samples](https://webgpu.github.io/webgpu-samples/) · [WebGPU Fundamentals](https://webgpufundamentals.org/) · [TSL docs](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

---

## Design references — where to look

| Site | For |
|---|---|
| [Awwwards](https://www.awwwards.com/) | Award-winning sites, motion showcases |
| [Dribbble](https://dribbble.com/) | UI shots, palettes, type, micro-interactions |
| [Behance](https://www.behance.net/) | Long-form case studies, brand systems |
| [Mobbin](https://mobbin.com/) | Mobile UI patterns from real apps |
| [Land-Book](https://land-book.com/) | Curated landing pages by industry |
| [Godly](https://godly.website/) | Animated landing-page gallery |
| [Httpster](https://httpster.net/) | Daily web design picks |
| [SaaS Pages](https://saaspages.xyz/) | SaaS-specific landing patterns |
| [Page Flows](https://pageflows.com/) | Recorded user flows from real products |

Pull any of these into your project: `Scrape the top 10 Awwwards sites of the month and summarize common motion patterns` (uses firecrawl-mcp). Full list at [docs/TOOLBOX.md §1](docs/TOOLBOX.md).

---

## AI tools — search, sandbox, vector, audio

| Need | MCP | Cost |
|---|---|---|
| AI-grade web search | `tavily` (free 1K/mo) or `exa` (free tier) | Free tier |
| Cloud Chrome for agents | `browserbase` | Paid |
| Run any open AI model | `replicate` | Pay-as-you-go |
| Text-to-speech / voice | `elevenlabs` | Freemium |
| Cloud sandbox for AI-generated code | `e2b` | Free tier |
| Vector search | `qdrant` / `chroma` | Free OSS |
| Codebase RAG | `claude-context` (zilliz/Milvus) | Free OSS |
| LLM citation research | `perplexity` | Paid (cheap) |

Set the relevant env var (e.g. `TAVILY_API_KEY`) in `.env.local`, restart Claude Code, and it auto-loads.

---

## Daily workflows (cross-archetype)

| Task | Run |
|---|---|
| Commit message for current diff | `/pr-summary` then commit |
| Generate changelog | `/changelog` |
| Onboard to unfamiliar code | `/onboard` |
| Explain a function | `/explain-code <file>` |
| Refactor smelly code | `/refactor` |
| Find perf bottlenecks | `/optimize` |
| Audit dependencies | `/dependency-audit` |
| Fix GitHub issue | `/fix-issue <number>` |
| Estimate a task | `/estimate <task>` |
| Generate docs | `/generate-docs` |
| Set up env | `/env-setup` |
| Migrate framework | `/migrate-framework` |
| Debug an error | `/debug` |
| Convert code between languages | `/convert-code` |

---

## Tool-by-tool quick reference

### gstack (Garry Tan's setup) — `/<command>`
`/office-hours` `/plan-ceo-review` `/plan-eng-review` `/plan-design-review` `/plan-devex-review` `/design-consultation` `/design-review` `/design-shotgun` `/design-html` `/review` `/investigate` `/devex-review` `/qa` `/qa-only` `/pair-agent` `/cso` `/ship` `/land-and-deploy` `/canary` `/benchmark` `/document-release` `/retro` `/autoplan` `/browse` `/codex` `/careful` `/freeze` `/guard` `/unfreeze` `/learn`

### impeccable — design-fluency commands
`craft` `teach` `document` `extract` `shape` `critique` `audit` `polish` `bolder` `quieter` `distill` `harden` `onboard` `animate` `colorize` `typeset` `layout` `delight` `overdrive` `clarify` `adapt` `optimize` `live`

### superpowers — agentic methodology
`test-driven-development` `systematic-debugging` `verification-before-completion` `brainstorming` `writing-plans` `executing-plans` `dispatching-parallel-agents` `requesting-code-review` `receiving-code-review` `using-git-worktrees` `finishing-a-development-branch` `subagent-driven-development` `writing-skills`

### ruflo — agent orchestration
plugins: `ruflo-core` `ruflo-swarm` `ruflo-autopilot` `ruflo-federation` `ruflo-agentdb` `ruflo-rag-memory` `ruflo-knowledge-graph` `ruflo-testgen` `ruflo-security-audit` `ruflo-observability` (plus 22 others installed via the marketplace)

### gsap-skills
`gsap-core` `gsap-timeline` `gsap-scrolltrigger` `gsap-plugins` `gsap-utils` `gsap-react` `gsap-performance` `gsap-frameworks`

### Agent collections (drop into `~/.claude/agents/`)
- **VoltAgent** (~/.claude/agents/voltagent/) — 100+ agents in 10 categories
- **wshobson** (~/.claude/agents/wshobson/) — 50 production-ready subagents
- **contains-studio** (~/.claude/agents/contains-studio/) — 40 agents by department

---

## Configuration cheats

| Need | File |
|---|---|
| Add new MCP server | edit `.mcp.json` |
| Add bundled plugin | edit `.claude/plugins.json` and re-run installer |
| Allow a new shell command | edit `.claude/settings.json` `permissions.allow[]` |
| Personal notes Claude reads | `CLAUDE.local.md` (gitignored) |
| Project-level skill override | drop a `.claude/skills/<name>/SKILL.md` |
| Personal permission override | `.claude/settings.local.json` (gitignored) |

---

## Updating

```
node update.mjs       # pulls toolkit, updates plugins, refreshes agent collections
```

---

## Where to look when something breaks

| Problem | Fix |
|---|---|
| `/<skill>` not in menu | re-run `node install.mjs` — skills go to `.claude/skills/` |
| Plugin missing | `claude plugin list`; reinstall with `claude plugin install <name>@<marketplace>` |
| Agent missing | check `~/.claude/agents/<collection>/` exists; re-run installer |
| MCP server fails | check env var is set in `.env.local`; run `claude mcp list` |
| `/ui` doesn't work | set `TWENTYFIRST_DEV_API_KEY` in `.env.local` |
| Hooks don't fire | `chmod +x .claude/hooks/*.sh` (Linux/macOS) |
| Node-only tools fail | upgrade Node to ≥18 |
| License question | open `docs/LICENSES.md` |
