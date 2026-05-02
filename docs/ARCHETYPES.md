# Archetypes

The installer asks one question — *what are you building?* — and your answer drives a tailored bundle. Pick what fits, or pick `all` and get everything.

---

## 1. Premium Web / Landing Page (`web`)

**For:** Agencies, marketing sites, portfolios, design-forward $10K-tier deliverables.

**Installed:**
- Toolkit core (30 skills, 8 agents, 9 rules, 2 hooks)
- Plugins: `frontend-design` (Anthropic), `ui-ux-pro-max`
- npx skills: `pbakaus/impeccable`, `kylezantos/design-motion-principles`, `greensock/gsap-skills`
- MCPs: `magic` (21st.dev), `figma`, `playwright`
- Agent collections: VoltAgent, contains-studio
- npm suggestions: `npm i motion framer-motion gsap three @react-three/fiber @react-three/drei @react-three/postprocessing lenis leva` (motion + 3D scroll stack)
- One-shot CLI bootstrap: `firecrawl-cli init --all --browser` (prompts for `FIRECRAWL_API_KEY` interactively — never written to a config file)

**Secrets prompted:** `FIGMA_ACCESS_TOKEN`, `FIRECRAWL_API_KEY`, `TWENTYFIRST_DEV_API_KEY`

**Sample first task:** `/ui hero with full-bleed gradient and animated underline`

---

## 2. Enterprise SaaS App (`saas`)

**For:** B2B dashboards, multi-tenant apps, $100K-tier products.

**Installed:** everything from `web` plus
- Plugins: `superpowers`, `ruflo-core`, `ruflo-swarm`, `ruflo-testgen`, `ruflo-security-audit`, `ruflo-observability`, `claude-mem` (opt-in with AGPL warning)
- External clones: `gstack`
- MCPs: `claude-context`, `postgres`, `mongodb`, `redis`, `supabase`, `stripe`, `slack`, `sentry`, `github`, `linear`, `kubernetes`, `cloudflare`
- Agent collections: VoltAgent, wshobson, contains-studio (~190 agents)

**Secrets prompted:** GitHub PAT, all DB connection strings, Stripe key, Slack tokens, Sentry token, Linear API key, Cloudflare credentials.

**Sample first task:** `/office-hours add a billing portal that supports per-seat pricing`

---

## 3. AI Agent / RAG / LLM (`ai`)

**For:** Autonomous agents, RAG pipelines, LLM-powered products, vector search.

**Installed:**
- Toolkit core
- Plugins: full ruflo set (`core`, `swarm`, `autopilot`, `federation`, `agentdb`, `rag-memory`, `knowledge-graph`), `superpowers`, `claude-mem` (opt-in)
- MCPs: `claude-context`, `qdrant`, `chroma`, `huggingface`, `perplexity`, `firecrawl`, `brave-search`, `context7`, `sequential-thinking`
- Agent collections: VoltAgent, wshobson (~150 agents)

**Secrets prompted:** `HF_TOKEN`, `PERPLEXITY_API_KEY`, `BRAVE_API_KEY`, `FIRECRAWL_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `CHROMA_URL`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`.

**Sample first task:** `Spin up a research-and-summarize swarm: one agent scrapes, one summarizes, one critiques.`

---

## 4. Install Everything (`all`)

**For:** Solo founders, agencies, "just give me everything." Equivalent to `--all` flag.

**Installed:** Union of `web`, `saas`, and `ai`. Every plugin, every marketplace, every npx skill, every MCP, every agent collection. claude-mem is included (with the AGPL warning prompt).

**Disk + time cost:** Largest. Expect 5–15 minutes depending on network. ~37 MCPs, 13+ plugins, 190+ agents on disk, 80+ slash commands.

---

## 5. Custom (`custom`)

**For:** Power users who want granular control.

Falls through to per-service yes/no prompts (legacy `install.sh` behavior). Pick exactly which marketplaces, plugins, agent collections, skills, and MCPs to install.

---

## 6. Files only (`files-only`)

**For:** Skeptics, offline installs, minimal footprint.

Copies the existing 30 skills, 8 agents, 9 rules, 2 hooks, `.mcp.json`, and `settings.json` template — and exits. No plugin marketplaces touched, no MCPs added, no agent collections cloned, no secrets prompted.

Equivalent to running `bash setup.sh` (the legacy quick installer).

---

## What does NOT change between archetypes

The toolkit's existing 30 skills, 8 agents, and 9 rules ship with every archetype — they're the universal baseline. Archetypes only differ in *what extra things get added on top*.

You can switch archetypes later by re-running `node install.mjs --archetype <new>`. The installer is idempotent — already-installed plugins/skills/agents are skipped.
