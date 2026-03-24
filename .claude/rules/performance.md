# Performance Rules

## Algorithmic
- Avoid O(n^2) or worse in production code — use hash maps/sets for lookups
- Prefer early exit from loops when the result is found
- Sort once, iterate many — don't sort inside loops
- Use appropriate data structures: sets for membership, maps for key-value, arrays for ordered data

## Database
- Never execute queries inside loops — batch or join instead (avoid N+1)
- Always add indexes for columns used in WHERE, JOIN, and ORDER BY
- Use LIMIT/pagination for unbounded queries — never return entire tables
- Use connection pooling — never open/close connections per request
- Prefer selecting specific columns over SELECT *

## I/O & Async
- Run independent I/O operations in parallel (Promise.all, asyncio.gather, goroutines)
- Never block the main thread/event loop with CPU-heavy work
- Use streaming for large data — don't load entire files/responses into memory
- Set timeouts on all external calls — network, database, API

## Caching
- Cache expensive computations and frequently accessed data
- Hierarchy: in-memory > distributed cache > CDN > database
- Always define cache invalidation strategy — TTL at minimum
- Cache at the right level — don't cache mutable data without invalidation

## Frontend (when applicable)
- Lazy load routes, images, and heavy components
- Minimize bundle size — avoid barrel imports that pull entire libraries
- Memoize expensive computations and prevent unnecessary re-renders
- Use pagination or virtual scrolling for large lists

## General
- Measure before optimizing — profile, don't guess
- Optimize the bottleneck, not the fast path
- Set performance budgets: API response <200ms, page load <3s, bundle <250KB
