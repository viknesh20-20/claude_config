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

## MCP Servers (4)

| Server | Purpose | Required Setup |
|--------|---------|---------------|
| `fetch` | HTTP requests | None |
| `filesystem` | Scoped file access | None |
| `github` | PR, issue, repo operations | Set `GITHUB_PERSONAL_ACCESS_TOKEN` |
| `memory` | Persistent knowledge store | None |
