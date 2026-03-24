# Git Workflow Rules

## Commit Messages
- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`, `ci`, `style`
- Description: imperative mood, lowercase, no period at end
- Keep subject line under 72 characters
- Add body for non-obvious changes explaining "why"
- Reference issue numbers: `fix(auth): validate token expiry (#123)`

## Branching
- Branch from latest main/master
- Branch naming: `feat/short-description`, `fix/short-description`, `chore/short-description`
- Keep branches short-lived — merge within days, not weeks
- Delete branches after merge

## Commits
- Keep commits atomic — one logical change per commit
- Never commit generated files (build output, lock files created by tools)
- Never commit secrets, credentials, or `.env` files
- Review your own diff before committing: `git diff --staged`
- Don't amend published commits — create new fix commits instead

## Pull Requests
- Keep PRs under 400 lines of diff when possible
- Write a clear title and description
- Reference the issue being addressed
- Ensure CI passes before requesting review
- Address all review comments before merging
- Prefer squash merge for feature branches

## Safety
- Never force push to main/master/develop
- Never rewrite public history
- Always pull before push to shared branches
- Use `--force-with-lease` instead of `--force` when force push is necessary
- Tag releases with semantic versioning: `vMAJOR.MINOR.PATCH`
