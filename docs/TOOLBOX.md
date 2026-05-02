# Toolbox — every tool the Claude Code Toolkit can drive

> Comprehensive register of design references, brainstorming/whiteboard tools, 3D / WebGPU / WebGL stack, testing tools, DevOps tools, and AI MCPs the toolkit can drive. **Open-source / free options listed first; paid alternatives at the end of each section.**

This document is the source of truth for what the toolkit *can* do. The interactive installer (`install.mjs`) wires up the things that need wiring (MCPs, plugins, skills); links and packages here you adopt as needed.

---

## 1. Design references — where to look for inspiration

All free or freemium. Use `firecrawl-mcp` or `playwright-mcp` to scrape inspiration into your project.

| Site | What it's good for | Cost |
|---|---|---|
| [Awwwards](https://www.awwwards.com/) | Award-winning sites, animation showcases, web of the day | Free browse |
| [Dribbble](https://dribbble.com/) | UI shots, color palettes, type, micro-interactions | Free browse, paid Pro |
| [Behance](https://www.behance.net/) | Long-form case studies, brand systems, motion reels | Free (Adobe account) |
| [Mobbin](https://mobbin.com/) | Mobile UI patterns from real apps (iOS / Android) | Free tier, paid Pro |
| [Land-book](https://land-book.com/) | Curated landing pages by industry & style | Free browse |
| [Godly](https://godly.website/) | Animated landing-page gallery with previews | Free |
| [Httpster](https://httpster.net/) | Daily web design picks | Free |
| [SaaS Pages](https://saaspages.xyz/) | SaaS-specific landing & marketing patterns | Free |
| [Page Flows](https://pageflows.com/) | Recorded user flows from real products | Free + paid |
| [SiteInspire](https://www.siteinspire.com/) | Curated portfolio of high-quality sites | Free |
| [UI Garage](https://uigarage.net/) | Tagged daily UI pattern bank | Free + paid |
| [Inspowwwer](https://inspowwwer.com/) | Web inspiration aggregator | Free |
| [Fonts In Use](https://fontsinuse.com/) | Real-world typography examples | Free |
| [Unsplash](https://unsplash.com/) | Free high-res photography | Free |
| [Lummi](https://www.lummi.ai/) | AI-curated stock images | Free + paid |

**Toolkit integration:** ask Claude to pull any of these via firecrawl-mcp. Example: `Scrape the top 10 awwwards.com SaaS-of-the-day picks from this month and summarize the common motion patterns.`

---

## 2. Brainstorming / whiteboarding / ideation — 15 tools ranked by cost

**Free / open-source first. Self-hosting available where noted.**

| # | Tool | Cost | Open source | Why pick it |
|---|---|---|---|---|
| 1 | [Excalidraw](https://excalidraw.com/) | **Free** | **MIT** | Hand-drawn aesthetic, real-time collab, Mermaid → drawing, end-to-end encrypted, self-hostable. Default choice for most ideation. |
| 2 | [tldraw](https://www.tldraw.com/) | **Free** | **Apache-2.0** | Polished collab whiteboard with multi-page; great for diagrams + sketching. Self-hostable. |
| 3 | [Penpot](https://penpot.app/) | **Free** | **MPL-2.0** | Open-source Figma alternative + infinite canvas + design system. Self-hostable. |
| 4 | [diagrams.net](https://app.diagrams.net/) (drawio) | **Free** | **Apache-2.0** | Architecture diagrams, mind maps, flowcharts. Desktop + browser. |
| 5 | [Mermaid](https://mermaid.js.org/) | **Free** | **MIT** | Code-as-diagrams: flowcharts, sequence, ER, gantt. Renders in GitHub, VS Code, Notion. Best for keeping diagrams in source. |
| 6 | [PlantUML](https://plantuml.com/) | **Free** | **GPL** | Code-as-diagrams for UML/architecture. |
| 7 | [AFFiNE](https://affine.pro/) | **Free** | **MIT** | Local-first Notion + Miro hybrid. Self-hostable. |
| 8 | [Microsoft Whiteboard](https://www.microsoft.com/microsoft-365/microsoft-whiteboard/digital-whiteboard-app) | Free w/ M365 | No | If your team already has M365. |
| 9 | [FigJam](https://www.figma.com/figjam/) | Freemium | No | Figma's whiteboard. Up to 3 boards free. Best if your team uses Figma. |
| 10 | [Whimsical](https://whimsical.com/) | Freemium | No | Sticky-notes, flowcharts, wireframes. 4 boards free. |
| 11 | [Miro](https://miro.com/) | Freemium | No | Industry default for big workshops. 3 boards free. Paid for serious use. |
| 12 | [Lucidchart](https://www.lucidchart.com/) | Freemium | No | Great for technical diagrams. |
| 13 | [Stormboard](https://stormboard.com/) | Freemium | No | Grid-based ideation, voting. |
| 14 | [Mural](https://www.mural.com/) | Paid | No | Enterprise alternative to Miro. |
| 15 | [ConceptBoard](https://conceptboard.com/) | Paid | No | EU-hosted (GDPR) Miro alternative. |

**Recommendation hierarchy:** start with **Excalidraw + Mermaid** for 90% of cases. Add **Penpot** for design-system work. Reserve **Miro / FigJam** for cross-team workshops.

**Toolkit integration:** the toolkit has no Miro/Excalidraw MCP server because there isn't a stable open one yet — but Mermaid renders inline in Claude responses and in markdown. Use it freely.

---

## 3. Documentation & architecture tools

| Tool | Cost | Open source | Use for |
|---|---|---|---|
| [Markdown](https://commonmark.org/) | Free | MIT | Default docs format |
| [MkDocs](https://www.mkdocs.org/) | Free | BSD-2 | Static docs sites from markdown |
| [Docusaurus](https://docusaurus.io/) | Free | MIT | React-based docs site |
| [Starlight](https://starlight.astro.build/) | Free | MIT | Astro-based docs site |
| [VitePress](https://vitepress.dev/) | Free | MIT | Vite-based docs site |
| [Mintlify](https://mintlify.com/) | Freemium | No | Polished hosted docs (paid for private) |
| [Notion](https://www.notion.so/) | Freemium | No | Team wiki / planning |
| [Obsidian](https://obsidian.md/) | Free personal | No | Local-first knowledge base |
| [diagrams.net](https://app.diagrams.net/) | Free | Apache-2.0 | Architecture diagrams |
| [Mermaid](https://mermaid.js.org/) | Free | MIT | In-source diagrams |
| [C4 Model](https://c4model.com/) | Free | — | Architecture method (system-container-component-code) |
| [PlantUML](https://plantuml.com/) | Free | GPL | UML in code |

---

## 4. 3D / WebGPU / WebGL stack — skills, npm packages, references

The toolkit's `web` and `all` archetypes install Three.js skills and suggest the relevant npm packages. Listed below.

### 4a. Claude Code skills

| Skill | Source | License | Coverage |
|---|---|---|---|
| **`webgpu-claude-skill`** (dgreenheck) | https://github.com/dgreenheck/webgpu-claude-skill | MIT | WebGPU + Three.js + TSL (Three.js Shading Language). r183+. |
| **`Three.js-Claude-Skill-Package`** (OpenAEC-Foundation) | https://github.com/OpenAEC-Foundation/Three.js-Claude-Skill-Package | MIT | 24 deterministic skills covering WebGL, WebGPU, R3F, Drei, physics, IFC. |
| **`gsap-skills`** (already bundled) | https://github.com/greensock/gsap-skills | MIT | GSAP + ScrollTrigger — pairs with Three.js for scroll-driven 3D scenes. |

These get installed by `install.mjs` for `web`, `saas`, and `all` archetypes via `npx skills add`.

### 4b. npm packages (suggested by installer)

```
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing lenis leva
```

| Package | Purpose | License |
|---|---|---|
| `three` | Three.js — WebGL/WebGPU rendering engine | MIT |
| `@react-three/fiber` | React renderer for Three.js | MIT |
| `@react-three/drei` | Helpers (OrbitControls, useGLTF, Environment, …) | MIT |
| `@react-three/postprocessing` | Bloom, DOF, vignette, SSAO, SSR | MIT |
| `lenis` | Smooth scroll library, syncs perfectly with r3f + ScrollTrigger | MIT |
| `leva` | Runtime GUI for tuning scene values during dev | MIT |
| `cannon-es` | Physics engine (lightweight) | MIT |
| `@react-three/rapier` | Rapier physics for r3f | MIT |
| `troika-three-text` | High-quality text in Three.js | MIT |

### 4c. WebGPU-specific resources

- [WebGPU Samples](https://webgpu.github.io/webgpu-samples/) — official Chrome team samples
- [Three.js WebGPU Examples](https://threejs.org/examples/?q=webgpu) — official three.js
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — tutorial site
- [TSL — Three.js Shading Language docs](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

### 4d. Scroll-driven 3D scenes — recommended stack

For animated landing pages with scroll-driven 3D (Awwwards-tier):

```
three + @react-three/fiber + @react-three/drei + @react-three/postprocessing + lenis + gsap + ScrollTrigger
```

`/build a scroll-driven 3D scene with r3f and lenis` triggers the right skills.

---

## 5. Testing & QA tools

### 5a. Unit & integration testing

| Stack | Tool | Cost | License |
|---|---|---|---|
| JavaScript | [Vitest](https://vitest.dev/) | Free | MIT |
| JavaScript | [Jest](https://jestjs.io/) | Free | MIT |
| Python | [pytest](https://docs.pytest.org/) | Free | MIT |
| Go | `go test` (built-in) | Free | BSD |
| Rust | `cargo test` (built-in) | Free | MIT/Apache |
| .NET | [xUnit](https://xunit.net/) | Free | Apache-2.0 |
| Java | [JUnit 5](https://junit.org/junit5/) | Free | EPL-2.0 |

### 5b. End-to-end browser testing

| Tool | Cost | License | MCP server |
|---|---|---|---|
| **Playwright** | Free | Apache-2.0 | ✅ (bundled `playwright`) |
| Puppeteer | Free | Apache-2.0 | ✅ (bundled `puppeteer`) |
| Cypress | Freemium | MIT | Self-host runner |
| WebdriverIO | Free | MIT | — |
| Selenium | Free | Apache-2.0 | — |
| **Browserbase** | Paid | — | ✅ NEW in this update — cloud Chrome for agents |

### 5c. Visual regression testing

| Tool | Cost | License |
|---|---|---|
| [Playwright visual snapshots](https://playwright.dev/docs/test-snapshots) | Free | Apache-2.0 |
| [Loki](https://loki.js.org/) | Free | MIT |
| [BackstopJS](https://github.com/garris/BackstopJS) | Free | MIT |
| Percy (BrowserStack) | Paid | — |
| Chromatic (Storybook) | Freemium | — |

### 5d. Accessibility testing

| Tool | Cost | License |
|---|---|---|
| [axe-core](https://github.com/dequelabs/axe-core) | Free | MPL-2.0 |
| [pa11y](https://github.com/pa11y/pa11y) | Free | LGPL |
| [Lighthouse a11y audit](https://developer.chrome.com/docs/lighthouse/) | Free | Apache-2.0 |

### 5e. Performance testing

| Tool | Cost | License |
|---|---|---|
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | Free | Apache-2.0 |
| [k6](https://k6.io/) | Free | AGPL |
| [Artillery](https://www.artillery.io/) | Freemium | MPL-2.0 |
| [WebPageTest](https://www.webpagetest.org/) | Free | Polyform Shield |

### 5f. Lint / format / type-check

| Tool | Stack | Cost | License |
|---|---|---|---|
| [Biome](https://biomejs.dev/) | JS/TS — fast Rust-based all-in-one | Free | MIT/Apache |
| [ESLint](https://eslint.org/) | JS/TS | Free | MIT |
| [Prettier](https://prettier.io/) | JS/TS/many | Free | MIT |
| [Ruff](https://docs.astral.sh/ruff/) | Python — Rust-based, very fast | Free | MIT |
| [Black](https://black.readthedocs.io/) | Python | Free | MIT |
| [TypeScript](https://www.typescriptlang.org/) | JS | Free | Apache-2.0 |
| [mypy](https://mypy-lang.org/) | Python | Free | MIT |
| [golangci-lint](https://golangci-lint.run/) | Go | Free | GPL-3 |
| [clippy](https://github.com/rust-lang/rust-clippy) | Rust | Free | MIT/Apache |

---

## 6. DevOps & infrastructure tools

### 6a. Container / orchestration

| Tool | Cost | License | MCP |
|---|---|---|---|
| Docker | Free (Personal) | Apache-2.0 | ✅ NEW (Docker MCP via toolbox) |
| Docker Compose | Free | Apache-2.0 | — |
| Podman | Free | Apache-2.0 | — |
| Kubernetes | Free | Apache-2.0 | ✅ bundled |
| Helm | Free | Apache-2.0 | — |
| Skaffold | Free | Apache-2.0 | — |
| **Kompose** | Free | Apache-2.0 | — |

### 6b. CI/CD

| Tool | Cost | License | MCP |
|---|---|---|---|
| GitHub Actions | Free for public; metered private | — | via `github` MCP |
| GitLab CI/CD | Free | MIT | via `gitlab` MCP |
| Jenkins | Free | MIT | — |
| CircleCI | Freemium | — | — |
| Drone CI | Free (self-host) | Polyform | — |
| Woodpecker CI | Free | Apache-2.0 | — |

### 6c. Infrastructure as code

| Tool | Cost | License |
|---|---|---|
| Terraform | Free (BSL since 1.6) | BSL |
| OpenTofu | Free (Terraform fork) | MPL-2.0 |
| Pulumi | Freemium | Apache-2.0 |
| Ansible | Free | GPL-3 |
| Crossplane | Free | Apache-2.0 |
| AWS CDK / CDK for Terraform | Free | Apache-2.0 |

### 6d. Hosting / deployment

| Platform | Tier | MCP |
|---|---|---|
| Vercel | Free hobby | ✅ NEW (bundled) |
| Netlify | Free hobby | ✅ NEW (bundled) |
| Cloudflare Pages / Workers | Free generous tier | ✅ bundled (`cloudflare`) |
| AWS | Pay-as-you-go | ✅ NEW (bundled — official `aws` MCP) |
| GCP | Pay-as-you-go | — |
| Azure | Pay-as-you-go | — |
| Fly.io | Free tier | — |
| Railway | Trial then paid | — |
| Render | Free tier | — |

### 6e. Monitoring / observability (free-first)

| Tool | Cost | License | MCP |
|---|---|---|---|
| [Grafana](https://grafana.com/) | Free OSS | AGPL-3 | ✅ NEW |
| [Prometheus](https://prometheus.io/) | Free | Apache-2.0 | — |
| [Loki](https://grafana.com/oss/loki/) | Free | AGPL-3 | — |
| [OpenTelemetry](https://opentelemetry.io/) | Free | Apache-2.0 | — |
| [Sentry](https://sentry.io/) | Freemium | BSL | ✅ bundled |
| [Datadog](https://www.datadoghq.com/) | Paid | — | ✅ NEW |
| [New Relic](https://newrelic.com/) | Free 100 GB/mo | — | — |
| [PostHog](https://posthog.com/) | Free OSS | MIT | — |

### 6f. Code quality & security scanning

| Tool | Cost | License | MCP |
|---|---|---|---|
| [SonarQube Community](https://www.sonarsource.com/products/sonarqube/) | Free OSS | LGPL | ✅ NEW |
| [Semgrep](https://semgrep.dev/) | Freemium | LGPL | — |
| [CodeQL](https://codeql.github.com/) | Free for OSS | — | — |
| [Snyk](https://snyk.io/) | Freemium | — | ✅ NEW |
| [Trivy](https://trivy.dev/) | Free | Apache-2.0 | — |
| [Bandit](https://github.com/PyCQA/bandit) | Free | Apache-2.0 | — |
| [gitleaks](https://github.com/gitleaks/gitleaks) | Free | MIT | — |
| [TruffleHog](https://trufflesecurity.com/trufflehog) | Free | AGPL-3 | — |

---

## 7. AI tools — MCPs, plugins, skills, agent platforms

### 7a. Web search / research MCPs (with free tiers)

| MCP | Cost | Notes | Bundled? |
|---|---|---|---|
| **Brave Search** | Free 2K/mo | Privacy-respecting | ✅ |
| **DuckDuckGo** | Free | Open MCP exists | — (suggest) |
| **Exa** | Free tier | Semantic search | ✅ NEW |
| **Tavily** | Free 1K/mo | Built for AI agents | ✅ NEW |
| **Perplexity** | Paid (cheap) | Citation-rich | ✅ |
| **Firecrawl** | Free 500/mo | Scraping + crawling | ✅ |

### 7b. Browser automation for agents

| MCP | Cost | Notes |
|---|---|---|
| **Playwright** | Free | Bundled |
| **Puppeteer** | Free | Bundled |
| **Browserbase** | Paid | Cloud Chrome for agents — great when local browser fails | NEW |
| **Stagehand** | Free | Built on Playwright + LLM | — |

### 7c. Vector DBs for RAG

| MCP | Cost | License | Bundled? |
|---|---|---|---|
| **Qdrant** | Free OSS | Apache-2.0 | ✅ |
| **Chroma** | Free OSS | Apache-2.0 | ✅ |
| **Milvus / claude-context** | Free OSS | Apache-2.0 | ✅ |
| **Weaviate** | Free OSS | BSD-3 | — |
| **Pinecone** | Freemium | — | — |

### 7d. AI compute / sandbox / model APIs

| MCP | Cost | Notes | Bundled? |
|---|---|---|---|
| **Hugging Face** | Free + paid | Models, datasets, Spaces | ✅ |
| **Replicate** | Pay-as-you-go | Run any open model | ✅ NEW |
| **ElevenLabs** | Freemium | TTS + voice cloning | ✅ NEW |
| **E2B Sandbox** | Free tier | Run AI-generated code in cloud sandbox | ✅ NEW |
| **Modal** | Free tier | Cloud compute for AI | — |
| **OpenAI API** | Pay-as-you-go | — | (env-var only) |
| **Anthropic API** | Pay-as-you-go | — | (env-var only) |

### 7e. Agent orchestration / methodology (Claude Code plugins — bundled)

| Plugin | Marketplace | What it adds |
|---|---|---|
| `superpowers` | obra/superpowers-marketplace | TDD, brainstorming, parallel subagents, code review |
| `ruflo-core/swarm/autopilot/federation` | ruvnet/ruflo | 100+ agents, RAG memory, knowledge graph, agent DB |
| `frontend-design` | claude-plugins-official | UI auto-activation |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Design intelligence with palettes, fonts, accessibility |
| `claude-mem` ⚠️ | thedotmack/claude-mem | Persistent memory (AGPL — opt-in) |

### 7f. Agent collections (cloned to `~/.claude/agents/`)

| Collection | Count | License |
|---|---|---|
| VoltAgent/awesome-claude-code-subagents | 100+ | MIT |
| wshobson/agents | 50 | MIT |
| contains-studio/agents | 40 | MIT |

### 7g. Skills via npx (bundled)

| Skill | License |
|---|---|
| pbakaus/impeccable (23 design commands) | Apache-2.0 |
| kylezantos/design-motion-principles | MIT |
| greensock/gsap-skills (8 GSAP skills) | MIT |
| dgreenheck/webgpu-claude-skill | MIT |
| OpenAEC-Foundation/Three.js-Claude-Skill-Package | MIT |

---

## 8. The "use this stack to build X" decision matrix

| Building | Recommended free-first stack |
|---|---|
| **Marketing site / landing page ($10K-tier)** | Astro / Next.js + Tailwind + shadcn/ui + Motion + GSAP + lenis — host on Cloudflare Pages or Vercel free |
| **Animated 3D landing (Awwwards-tier)** | Next.js + R3F + drei + postprocessing + lenis + GSAP ScrollTrigger + Three.js WebGPU |
| **SaaS dashboard ($100K-tier)** | Next.js + Tailwind + shadcn/ui + Postgres (Supabase free tier) + Resend + Stripe + Clerk/Lucia auth |
| **Internal tool** | Next.js + tRPC + Postgres + shadcn/ui + Auth.js |
| **AI chat product** | Next.js + Vercel AI SDK + Postgres + Qdrant + OpenAI / Anthropic |
| **RAG over docs** | LangChain or llamaindex + Qdrant or Chroma + Postgres pgvector + claude-context MCP |
| **Multi-agent system** | ruflo (core+swarm+autopilot+federation) + claude-mem + superpowers |
| **Mobile app** | Expo + React Native + Tamagui or NativeWind |
| **Game / interactive** | Three.js / R3F + Rapier physics + Howler.js audio |

---

## 9. Sources & verification

Tools are tracked from these directories (curated 2026):

- [Awesome MCP Servers (mcpservers.org)](https://mcpservers.org/) — official MCP server index
- [MCP Market](https://mcpmarket.com/) — searchable MCP/skill catalog
- [Awesome Claude Skills (awesome-skills.com / awesomeskills.dev)](https://awesomeskills.dev/) — skills directory
- [Claude Plugin Hub (claudepluginhub.com)](https://www.claudepluginhub.com/) — plugin index
- [Open Alternative](https://openalternative.co/) — open-source SaaS alternatives directory

License facts re-verified at install time by `install.mjs`.
