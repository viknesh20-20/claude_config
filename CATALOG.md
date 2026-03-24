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

### Meta
| Command | Description |
|---------|-------------|
| `/write-skill` | Create new Claude Code skills with proper frontmatter |
| `/grill-me` | Stress-test your plan with probing questions until bulletproof |

---

## Agents (8)

| Agent | Specialty | When to Use |
|-------|-----------|-------------|
| `code-reviewer` | Autonomous code review | Reviewing any code changes |
| `architect` | System design, ADRs, diagrams | Design decisions, architecture evaluation |
| `tdd` | Test-driven development | Building features test-first |
| `security-auditor` | Threat modeling, OWASP | Security assessments, compliance |
| `devops` | CI/CD, Docker, deployment | Infrastructure and pipeline setup |
| `performance` | Profiling, optimization | Bottleneck identification |
| `documentation` | Docs generation | README, API docs, onboarding guides |
| `mentor` | Teaching, explaining concepts | Learning, understanding unfamiliar code |

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

Rules auto-load into every Claude Code session. No manual invocation needed.

---

## Hooks (2)

| Hook | Trigger | Behavior |
|------|---------|----------|
| `pre-tool-use.sh` | Before every tool call | Blocks dangerous ops (rm -rf, force push, .env writes) |
| `post-tool-use.sh` | After every tool call | Extensible passthrough (auto-lint, logging examples) |

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
