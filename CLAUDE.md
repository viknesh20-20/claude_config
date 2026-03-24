# Project Instructions

> Universal Claude Code configuration — stack-agnostic, upgradable, shared across all projects.

## Environment Detection

Current directory: !`pwd`
Project files: !`ls -1 2>/dev/null | head -30`
Git branch: !`git branch --show-current 2>/dev/null || echo "not a git repo"`
Git status: !`git status --short 2>/dev/null | head -15`
Language hints: !`ls package.json requirements.txt Pipfile pyproject.toml go.mod Cargo.toml *.csproj *.sln Gemfile build.gradle pom.xml Makefile CMakeLists.txt composer.json mix.exs deno.json bun.lockb 2>/dev/null`

---

## Universal Coding Standards

### Code Quality
- Write clean, readable, self-documenting code
- Follow the existing patterns and conventions already present in THIS project
- Prefer composition over inheritance
- Keep functions/methods focused — one responsibility per function
- Use meaningful, descriptive variable and function names
- Avoid magic numbers and hardcoded strings — use named constants
- DRY (Don't Repeat Yourself) but not at the cost of readability

### Error Handling
- Always handle errors explicitly — never swallow exceptions silently
- Provide meaningful, actionable error messages
- Use the language-appropriate error types (exceptions, Result types, error codes)
- Log errors with enough context to debug without reproducing
- Fail fast on unrecoverable errors; recover gracefully on transient ones

### Testing
- Write tests for all new functionality
- Follow the testing patterns already established in the project
- Cover: happy path, edge cases, error conditions, boundary values
- Tests should be deterministic — no flaky tests
- Use descriptive test names that explain the scenario being tested
- Mock at boundaries (network, filesystem, database), not internal functions

### Git Practices
- Write clear, descriptive commit messages using conventional format when the project uses it
- Keep commits atomic and focused on a single change
- Never commit secrets, credentials, API keys, or .env files
- Review your own diff before committing
- Reference issue numbers in commits when applicable

### Security
- Never hardcode secrets, credentials, tokens, or API keys
- Validate and sanitize all user input at system boundaries
- Use parameterized queries for all database operations — no string concatenation
- Follow the principle of least privilege
- Keep dependencies updated to patch known vulnerabilities
- Escape output appropriately for the context (HTML, SQL, shell, etc.)

### Performance
- Don't optimize prematurely — write correct code first
- Profile before optimizing — measure, don't guess
- Be mindful of algorithmic complexity (O(n²) loops, N+1 queries)
- Use appropriate data structures for the access pattern
- Avoid unnecessary allocations in hot paths
- Consider lazy loading and pagination for large datasets

### Documentation
- Document the "why", not the "what" — code should explain the what
- Add comments for non-obvious business logic or workarounds
- Keep documentation close to the code it describes
- Update docs when changing the behavior they describe

---

## File Operations
- Always verify a directory exists before creating files in it
- Prefer editing specific sections over rewriting entire files
- Back up files before destructive operations
- Respect .gitignore patterns — never create or modify ignored file categories
- When creating new files, follow the naming conventions already in the project

## Communication Style
- Be concise but thorough
- Explain "why" not just "what" when making decisions
- Flag potential issues, risks, or trade-offs proactively
- Ask clarifying questions rather than making assumptions about ambiguous requirements
- When proposing changes, explain the impact radius

## Boundaries
- Do not refactor files outside the scope of the current task
- Do not install new packages/dependencies without confirming with the user
- Do not modify lock files (package-lock.json, yarn.lock, etc.) manually
- Do not overwrite .env files or any secrets
- Do not make architectural changes without discussion
- Do not delete tests, even if they are currently failing

---

## Project-Specific Configuration

> **This section should be customized per project.** When using this config in a new project,
> edit this section (or create a separate CLAUDE.local.md) with your project-specific details:

### Stack
<!-- Define your stack here, e.g.:
- Language: Python 3.12 / TypeScript 5.x / Go 1.22 / Rust 1.75
- Framework: FastAPI / Next.js / Gin / Actix-web
- Database: PostgreSQL / MongoDB / SQLite / Redis
- Test runner: pytest / Jest / go test / cargo test
- Package manager: pip / npm / pnpm / cargo
-->

### Build & Dev Commands
<!-- Define your commands here, e.g.:
- Dev server: npm run dev / python manage.py runserver / go run .
- Build: npm run build / cargo build --release / dotnet build
- Test: npm test / pytest / go test ./...
- Lint: npm run lint / ruff check . / golangci-lint run
- Type check: npx tsc --noEmit / mypy . / go vet ./...
-->

### Architecture Notes
<!-- Brief description of your project architecture, key directories, and patterns -->

### Key Conventions
<!-- Project-specific conventions not covered by the universal standards above -->
