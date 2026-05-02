# Business Logic Discipline

> Auto-loads every session. The defaults every business-touching feature must respect — money, time, state, multi-tenancy, idempotency, audit. Silent on irrelevant categories; strict on the relevant ones.

## Money

- **Store in minor units** (cents, paise, satoshi) as integers. Never floats. Never strings without an explicit format.
- **Every monetary amount has a currency code.** A "100" without a currency is a bug.
- **Round half-to-even (banker's rounding) for taxes.** Document the rule wherever rounding happens.
- **Multi-currency** = snapshot the FX rate at transaction time; don't recompute later.
- **Refunds, adjustments, chargebacks** are always *new rows* — never edit a captured charge. Append-only ledger pattern.
- **Tax** — use Stripe Tax / Avalara / TaxJar. Don't roll your own VAT/GST/sales-tax engine.
- **Invoices** — sequential numbering per legal entity, immutable once issued.

## Time

- **Store UTC timestamps with timezone.** Render in user's local TZ.
- **Compare with the user's TZ when "today" or "this month" matters** (billing periods, daily caps, expiration).
- **DST exists.** Don't rely on `+24h` to mean "tomorrow." Use date math libraries (date-fns-tz, dayjs+timezone, Luxon).
- **Recurring schedules** — store the rule (cron-like or RRULE), not pre-computed instances.
- **"Now" is non-deterministic.** Inject the clock so you can test time-dependent logic.

## State machines

- **Define legal transitions explicitly** in code or DB constraint, not just in the UI.
- **Encode them** with an enum + a guard function: `canTransition(from, to)` returning bool.
- **Every transition is logged** with actor, timestamp, before, after.
- **Race conditions** on transitions are real. Use row locks (`SELECT … FOR UPDATE`) or unique constraints to serialize.
- **Reversible vs one-way transitions** — be explicit. Once an invoice is sent, you don't unsend it; you issue a credit note.

## Multi-tenancy

- **Every query that returns business data filters by `tenant_id`.** No exceptions. Wrap your DB layer so this is the default; raw queries are an audit risk.
- **Lookups that should be tenant-scoped should not 403 on cross-tenant — they should 404.** Returning 403 leaks the existence of the resource.
- **Tenant-scoped uniqueness** — emails, slugs, SKUs are unique within a tenant, not globally.
- **Cross-tenant leakage tests** — at least one integration test runs as tenant A and tries every public endpoint with tenant B's IDs. Should always 404.
- **Tenant export, tenant delete** — both are real product features for B2B SaaS. Design for them at v1, not v2.

## Idempotency

- **Every state-changing API endpoint accepts an `Idempotency-Key` header.** Server stores result per key for 24h+ and replays cached result on retry.
- **Webhooks must be idempotent** on the receiver side. They WILL be delivered twice. Use the event's stable ID to dedupe.
- **Background jobs must be idempotent** at the unit-of-work level. A retried job must not duplicate a side effect.
- **External-system writes** (Stripe, email send, SMS) deduplicate via provider-supported idempotency keys when available, or via your own dedupe table.

## Concurrency

- **Optimistic locking** (version column) for user-facing edits. Update with `WHERE version = $expected; if rows affected = 0, refetch and retry.`
- **Pessimistic locking** (`SELECT … FOR UPDATE`) for inventory, balance, and queue work.
- **Distributed locks** (Redis SET NX, Postgres advisory locks) only when necessary; they fail interestingly under partition.
- **Avoid distributed transactions** across services. Use the outbox pattern: write the side effect to a local table, a worker delivers it.

## Audit & compliance

- **Append-only audit log** for every state change on regulated entities (financial, medical, customer-facing data).
- **Each entry**: actor, timestamp (UTC), entity type + ID, action, before, after, request ID for tracing.
- **Retention by data class:**
  - Financial: 7 years (US/UK), 10 years (DE).
  - Healthcare: 6 years (HIPAA US), 5+ years per state.
  - GDPR consent: 5 years after withdrawal.
  - General app data: per privacy policy.
- **Access controls on the audit log itself.** Whoever can perform the action should not be able to erase their tracks.

## API contracts

- **Idempotency keys** on every state-changing endpoint.
- **Pagination is cursor-based** for large or insert-heavy collections.
- **Errors include a stable error code** in addition to a human message. Code is for clients; message is for humans.
- **Backward compatibility** — adding fields is fine, removing or repurposing fields breaks consumers. Version or sunset; don't surprise.
- **Rate limits** — per-key, per-tenant, per-IP. Return `Retry-After`. Document the budget.

## Webhooks (outgoing)

- **Sign payloads** with HMAC + a secret per consumer. Rotate keys with overlap.
- **Retry on non-2xx** with exponential backoff + jitter, max attempts (typically 8–12 over 24h), dead-letter queue.
- **Each event has a stable ID** so consumers can dedupe.
- **Document delivery semantics** — at-least-once, no ordering guarantees, schema versioning.

## File handling

- **Validate type, size, content** at the edge. Don't trust filenames.
- **Virus-scan** uploaded files (ClamAV, hosted scanners). Quarantine until clean.
- **Signed URLs** for downloads. Never serve user content from your app's domain (cookie / cross-site risk); use a separate cookieless domain or signed CDN.
- **Quotas** — per-tenant, per-plan. Check before accepting upload.

## Forms & PII

- **Validate server-side** even if you also validate client-side.
- **Rate-limit** signup, login, password reset, contact forms.
- **Do not echo PII in URLs.** Logs catch it.
- **Email verification** before granting privileges.

## Background jobs / queues

- **Idempotent** at the job level — duplicate delivery doesn't double an effect.
- **Retries** with exponential backoff. Cap. Move to dead-letter on exceeded.
- **Visibility timeout** longer than the longest expected job to prevent two workers picking the same job.
- **Schedule precisely** — recurring jobs use a job locker (one runner only) or distributed scheduler with leader election.
- **Job priority** — separate queues by priority; don't let a flood of low-priority jobs starve high-priority ones.

## Search

- **Index lag** is real. After write, the search may not reflect it for milliseconds to seconds.
- **Multi-tenant isolation** in the index too. Every query carries `tenant_id`. Or one index per tenant for high-isolation tiers.
- **Privileged content** — make sure private items aren't returned by other-tenant queries.
- **Reindex strategy** — incremental on writes, full reindex on schema change. Run during low-traffic windows.

## When the agent designs anything money-touching, multi-tenant, or regulated

It must produce:
- Named invariants the design protects.
- A failure-mode table (failure → consequence → mitigation).
- Idempotency strategy for every state change.
- Audit-log entries the design produces.
- Comparison to at least one mature competitor's approach (if relevant).

This is what `/business-blueprint`, `/business-logic-audit`, and the `business-architect` agent enforce.

## Forbidden behaviors

- Floats for money.
- Cross-tenant queries without explicit tenant_id filter.
- State transitions enforced only in the UI.
- Webhooks without signing.
- Background jobs without idempotency.
- "We'll add audit logging later" for financial or regulated entities.
- Hand-rolling tax / VAT / GST.
- Trusting the client to send a correct timestamp.
- Hard-deleting a financial record.
