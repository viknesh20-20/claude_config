# Code Quality Rules

## Naming
- Use descriptive names that reveal intent — avoid abbreviations
- Functions: use verbs (`getUserById`, `calculateTotal`, `validateInput`)
- Variables: use nouns (`userCount`, `activeSession`, `requestPayload`)
- Booleans: use `is`, `has`, `should`, `can` prefixes (`isActive`, `hasPermission`)
- Constants: use UPPER_SNAKE_CASE for true constants
- Follow the naming convention already established in the project

## Functions
- Keep functions under 40 lines — extract when longer
- One responsibility per function — if you need "and" to describe it, split it
- Maximum 4 parameters — use an options object beyond that
- Prefer pure functions where possible — same input always produces same output
- Return early for guard clauses instead of deep nesting

## Complexity
- Maximum nesting depth: 3 levels — use early returns or extract methods
- Avoid nested ternaries — use if/else or a variable
- Prefer simple loops over clever one-liners when readability suffers
- Extract complex conditionals into named boolean variables or functions

## Files
- One primary concept per file (one class, one module, one component)
- Keep files under 400 lines — split when larger
- Group related imports together, separate third-party from local

## General
- No dead code — delete unused functions, variables, and imports
- No commented-out code — version control is for history
- No magic numbers — extract into named constants
- DRY for logic, but don't over-abstract — three similar lines beats a premature abstraction
- Follow existing patterns in the codebase over introducing new ones
