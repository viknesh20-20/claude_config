# Documentation Rules

## What to Document
- Document the "why", not the "what" — code explains the what
- Document non-obvious business logic and workarounds
- Document architectural decisions and trade-offs
- Document public APIs (parameters, return values, errors, examples)
- Document setup steps that aren't automated

## What NOT to Document
- Don't document obvious code — `// increment counter` above `counter++`
- Don't document private implementation details that may change
- Don't write comments that restate the function name

## Inline Comments
- Use comments for: workarounds, business logic rationale, performance decisions, TODOs
- Keep comments up to date — stale comments are worse than no comments
- Place comments above the code they describe, not inline

## Code Documentation
- Use the language's standard format: JSDoc, docstrings, GoDoc, Javadoc, XML comments
- Document all exported/public functions with: brief description, parameters, return value
- Include usage examples for complex APIs
- Document exceptions/errors that can be thrown

## Project Documentation
- Every project needs a README with: what it does, how to install, how to run, how to test
- Keep CHANGELOG updated for user-facing changes (Keep a Changelog format)
- Document environment variables in .env.example with descriptions
- Document API endpoints (prefer generated docs from code: OpenAPI, Swagger)

## Maintenance
- Update documentation when changing the behavior it describes
- Delete documentation for removed features
- Review documentation accuracy during code reviews
