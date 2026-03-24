# Error Handling Rules

## General
- Never swallow errors silently — always handle or propagate
- Fail fast on unrecoverable errors — don't continue in a broken state
- Recover gracefully from transient failures (network, timeout, rate limit)
- Use the language-idiomatic error pattern (exceptions, Result types, error returns)

## Error Messages
- Include what happened, what was expected, and how to fix it
- Include relevant context (IDs, values, operation name)
- Never expose internal implementation details to end users
- Never include secrets, tokens, or full stack traces in user-facing errors

## Logging
- Log errors with enough context to debug without reproducing
- Use structured logging (JSON) with consistent fields: timestamp, level, message, context
- Log levels: ERROR (broken), WARN (degraded), INFO (significant events), DEBUG (development)
- Never log sensitive data (passwords, tokens, PII)
- Include correlation/request IDs for tracing across services

## API Error Responses
- Use appropriate HTTP status codes (4xx for client errors, 5xx for server errors)
- Return consistent error format: `{ "error": { "code": "...", "message": "..." } }`
- Use machine-readable error codes alongside human-readable messages
- Document all error codes in API documentation

## Retry & Recovery
- Retry only transient failures (network errors, 429, 503)
- Use exponential backoff with jitter
- Set maximum retry attempts (typically 3)
- Implement circuit breaker for repeated failures to external services
- Always have a timeout — never wait indefinitely

## Boundaries
- Catch errors at system boundaries — don't let exceptions leak between layers
- Transform errors at boundaries — database errors become service errors become API errors
- Add context when rethrowing — preserve the original error as cause
