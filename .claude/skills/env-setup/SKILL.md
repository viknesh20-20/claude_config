---
name: env-setup
description: "Environment setup assistant — detects project requirements, generates .env.example, documents prerequisites, creates setup scripts, and verifies the development environment is ready. Use when setting up a project for the first time."
argument-hint: "[optional: 'verify' to check current environment]"
allowed-tools: Read, Grep, Glob, Bash, Write
---

# Environment Setup

## Detect Requirements
!`ls package.json requirements.txt pyproject.toml go.mod Cargo.toml *.csproj Gemfile composer.json mix.exs 2>/dev/null`
!`ls .env .env.example .env.sample .env.template 2>/dev/null`
!`ls Dockerfile docker-compose* Makefile Procfile 2>/dev/null`

## Current Environment
!`node --version 2>/dev/null || echo "Node.js: not installed"`
!`python3 --version 2>/dev/null || echo "Python: not installed"`
!`go version 2>/dev/null || echo "Go: not installed"`
!`rustc --version 2>/dev/null || echo "Rust: not installed"`
!`docker --version 2>/dev/null || echo "Docker: not installed"`
!`git --version 2>/dev/null`

---

## Setup Process

### Step 1: Identify Requirements
Scan project files to determine:
- Runtime(s) and version(s) needed
- Package manager(s)
- Database(s)
- Cache (Redis, Memcached)
- External services (S3, email, payment, etc.)
- Build tools
- Required CLI tools

### Step 2: Generate .env.example
Scan the codebase for environment variable references:
```bash
grep -rn "process\.env\." --include="*.ts" --include="*.js" | ...
grep -rn "os\.environ\|os\.getenv" --include="*.py" | ...
grep -rn "os\.Getenv" --include="*.go" | ...
```

Generate `.env.example` with:
```
# Application
APP_PORT=3000
APP_ENV=development
APP_SECRET=change-me-to-a-random-string

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# External Services
# API_KEY=your-api-key-here
```

**Include:**
- Comments explaining each variable
- Safe defaults for development
- Placeholder values for secrets (never real values)
- Grouped by category

### Step 3: Check Prerequisites
Verify each requirement is met:
| Requirement | Status | Version | Required |
|-------------|--------|---------|----------|
| Node.js | OK/MISSING | v20.x | >=18 |
| ... | ... | ... | ... |

### Step 4: Generate Setup Instructions
Create or update setup documentation:
1. Prerequisites to install
2. Clone and install steps
3. Environment configuration
4. Database setup (create, migrate, seed)
5. Start development server
6. Verify everything works

### Step 5: Verify
Run a series of checks:
- [ ] All required runtimes installed at correct versions
- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Database accessible (if applicable)
- [ ] Dev server starts without errors
- [ ] Tests pass

## Rules
- Never put real secrets in .env.example
- Use descriptive comments for every variable
- Group variables by service/purpose
- Include both required and optional variables
- Document which variables have safe defaults
