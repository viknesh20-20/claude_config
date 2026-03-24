# Security Rules

## Secrets
- Never hardcode secrets, API keys, tokens, passwords, or connection strings
- Use environment variables for all credentials
- Never commit `.env` files — use `.env.example` with placeholder values
- Never log secrets, tokens, or passwords — even at debug level
- Rotate credentials immediately if accidentally exposed

## Input Validation
- Validate all user input at system boundaries (API endpoints, form handlers, CLI args)
- Use allowlists over denylists when possible
- Sanitize strings before using in HTML, SQL, shell commands, or file paths
- Validate type, length, format, and range — not just presence
- Reject invalid input early with clear error messages

## Injection Prevention
- Always use parameterized queries for database operations — never string concatenation
- Escape output for the target context (HTML entities, URL encoding, shell escaping)
- Never pass user input directly to `eval`, `exec`, `system`, or template engines
- Validate and normalize file paths — block directory traversal (`../`)

## Authentication & Authorization
- Check authentication on every protected endpoint — no exceptions
- Check authorization for every resource access — verify the user owns the resource
- Use constant-time comparison for secrets and tokens
- Enforce rate limiting on authentication endpoints
- Set appropriate session/token expiry

## Data Protection
- Encrypt sensitive data at rest and in transit
- Use HTTPS for all external communication
- Minimize data exposure — return only the fields the consumer needs
- Log access to sensitive data for audit purposes
- Apply principle of least privilege to all service accounts and API keys

## Dependencies
- Keep dependencies updated — check for known vulnerabilities regularly
- Review new dependencies before adding — check maintenance status and license
- Pin dependency versions in production
