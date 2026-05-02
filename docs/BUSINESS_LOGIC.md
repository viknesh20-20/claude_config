# Business Logic Catalog

> Real-world edge cases, variations, and competitor patterns for SaaS, ERP, e-commerce, marketplace, and fintech applications.
> Companion to `business-architect` agent, `/business-blueprint`, `/business-logic-audit`, and `/competitive-analysis`.

This catalog is descriptive, not prescriptive. It enumerates what *can* go wrong, the dimensions decisions split on, and how mature companies have solved each. The skills and agent above use this as their reference; you can also read it directly.

---

## 1. Money & billing

### What can go wrong

- **Float precision loss.** `0.1 + 0.2 != 0.3` in JS/Python defaults. Rounding accumulates over thousands of transactions.
- **Currency mixing.** A USD value compared to an EUR value as if they were the same.
- **Tax rate stale.** Tax rates change quarterly in many jurisdictions. Hardcoded rates go wrong.
- **Proration math wrong.** User upgrades on day 17 of a 30-day cycle and gets billed for either too much or too little.
- **Double-charge on retry.** User clicks Pay twice, network blips, both go through.
- **Trial abuse.** Same user signs up 10 times for trials with `+1, +2, +3` Gmail aliases.
- **Refund timing.** Card was used; refund authorized; original card cancelled; refund needs to go to a new method.
- **Chargeback storm.** A bad release causes 30 customers to chargeback in 24h, putting your processor account at risk.
- **Failed retry loop.** 4 retries × 100K customers = 400K failed charges hammering Stripe and your DB.
- **VAT MOSS confusion.** EU customer, B2C, digital goods: you owe VAT in their country, not yours.
- **Dunning email failures.** Past-due notices bounce; account suspended without user knowing.

### Decision dimensions

| Dimension | Options | Notes |
|---|---|---|
| Money storage | minor units (int) / decimal (Postgres `NUMERIC(15,2)`) | minor units almost always; NUMERIC for high-precision |
| Currency model | single / multi | multi is much harder; defer until you need it |
| Trial length | 7 / 14 / 30 days | 14 is the SMB SaaS default |
| Trial requires card | yes / no | no = better top-of-funnel; yes = better quality |
| Failed-payment retries | 3 / 4 / 5 attempts | Stripe Smart Retries default is 4 / 15 days |
| Past-due behavior | readonly / fully featured / suspended | depends on revenue per failed customer |
| Cancel policy | immediate / end-of-period / both | offer both; default end-of-period |
| Refund authority | self-serve / support / finance | tier by amount |
| Tax engine | Stripe Tax / Avalara / TaxJar / hand-rolled | never hand-rolled in production |
| Invoice numbers | sequential / random | sequential is required in many jurisdictions |
| Plan changes | proration / no proration | proration is the default for trust |

### Competitor approaches (cite when borrowing)

- **Stripe Smart Retries**: ML-optimized retry timing, 4 retries / 15 days default, customizable. Excellent prior art for self-serve SaaS.
- **Recurly**: configurable 1–5 retries, 21-day default window. More dunning email touchpoints than Stripe by default.
- **Chargebee**: most flexible — full custom retry configuration, multi-currency native.
- **Paddle**: merchant-of-record — they handle global tax for you. Trade-off: less flexibility, higher per-tx fee.
- **Apple/Google Play subscriptions**: in-app purchase, very different (15–30% take rate, store handles refunds). For mobile-first apps.

---

## 2. Multi-tenancy

### What can go wrong

- **Cross-tenant leak.** A query without `tenant_id` returns rows from every tenant.
- **Cross-tenant existence-leak.** 403 instead of 404 reveals tenant B's resource exists.
- **Tenant context lost on background job.** Queue worker picks up a job, no tenant context attached, processes against wrong tenant.
- **Email collision.** "Enterprise Acme" and "Startup Acme" both want `admin@acme.com`. Globally unique vs tenant-scoped.
- **Subdomain collision.** `acme.yourapp.com` already taken by another customer named Acme.
- **Tenant deletion incomplete.** User row deleted; audit log still references them; integration breaks.
- **Performance per tenant.** One tenant's huge dataset slows queries for all tenants.
- **Tier-skipping.** Free-tier user finds an undocumented param that grants paid features.

### Decision dimensions

| Dimension | Options | Notes |
|---|---|---|
| Isolation | shared DB + tenant_id / schema-per-tenant / DB-per-tenant | shared DB up to ~10K tenants; DB-per-tenant for enterprise |
| Tenant key | UUID / shortid / slug | UUID is safest; slugs are user-facing |
| URL structure | path (`/t/acme/...`) / subdomain (`acme.app.com`) / both | subdomains feel premium, path is simpler |
| Cross-tenant search | not allowed / allowed for admin / allowed always | rare; security-heavy |
| Tenant deletion timing | immediate / 30-day window / never (anonymize only) | 30-day window is friendliest |

### Competitor approaches

- **Linear**: workspace-scoped; subdomain-style URLs (`linear.app/team/...`); strict isolation.
- **Notion**: workspace-per-tenant; users can belong to multiple workspaces; switching UI.
- **Slack**: workspace-per-tenant; account merging across workspaces is non-trivial UX.
- **Atlassian**: tenant-per-product; cross-tenant via Atlassian Account.
- **Salesforce**: shared DB, very heavy permission system; scales to enterprise.

---

## 3. Auth, identity, RBAC

### What can go wrong

- **Account takeover via email change.** Attacker steals session, changes email, locks owner out.
- **Stale permissions cached.** User demoted; cached perms still grant access for 5 minutes.
- **MFA bypass via account recovery.** Recovery flow doesn't require MFA.
- **SAML JIT user creation grants too much.** New SSO user auto-becomes admin.
- **Service account leak.** Long-lived API key in client-side code or logs.
- **Impersonation no audit.** Support staff impersonate users without logging.
- **Logout doesn't actually log out.** Token still valid server-side; only cookie cleared.
- **Permission system race.** Owner removes admin's role mid-action; action completes anyway.

### Decision dimensions

| Dimension | Options | Notes |
|---|---|---|
| Auth provider | Auth0 / Clerk / Cognito / WorkOS / build own | Clerk for self-serve, WorkOS for SAML-heavy |
| Methods | password / magic link / OAuth / SSO / passkey | minimum: magic link + OAuth |
| MFA | TOTP / WebAuthn / SMS / none | WebAuthn future, TOTP today, never SMS for high-value |
| Roles | flat / hierarchical / matrix | flat (Owner/Admin/Member) for v1 |
| Permission model | RBAC / ABAC / ReBAC | RBAC for v1, ABAC/ReBAC if domain demands |
| API auth | bearer / OAuth client-credentials / mTLS | bearer is fine; client-credentials for B2B integrations |
| Session storage | cookie (HttpOnly Secure SameSite) / localStorage / both | cookie always; localStorage only for non-sensitive |

### Competitor approaches

- **Linear**: 4 roles (Owner, Admin, Member, Guest); workspace-scoped; SAML on top tier.
- **Notion**: per-page permissions on top of workspace roles. ReBAC-ish.
- **GitHub**: Org > Team > Repo permissions, with custom roles since 2023. Complex but well-modeled.
- **Auth0**: full identity-as-a-service; most expensive but most robust.
- **Clerk**: developer-focused, great DX, opinionated UI, ~$0.02/MAU on the paid plan.
- **WorkOS**: best-in-class SAML/SCIM for enterprise tier.

---

## 4. State machines (orders, subscriptions, tickets, fulfillment)

### What can go wrong

- **Impossible state reachable.** Order in `paid` state but `payment_id` is null due to a bug.
- **Race-condition double-fulfill.** Two workers see "paid" status, both try to fulfill.
- **Stuck states.** Order in `processing` for 6 days because the worker died.
- **Reverse-time transitions.** Cancelled order becomes "paid" again somehow.
- **State machine in UI only.** API allows direct status updates; UI's guards are bypassable.

### Patterns

- **Encode states as enum + transition guard.** `canTransition(from, to)` returns bool.
- **Persist transition events** alongside the current state. The state is derivable from the events.
- **Run a "stuck-state" job** every N minutes. Find rows in `processing` for > X minutes; alert or auto-rollback.
- **Optimistic locking on status changes.** `UPDATE … SET status = 'paid' WHERE id = X AND status = 'processing'`. Affected-rows = 0 ⇒ retry/abort.

### Competitor approaches

- **Stripe Subscriptions**: `incomplete → active → past_due → canceled / unpaid`. Each transition has its own webhook.
- **Shopify Orders**: `pending → paid → fulfilled → completed`, with `cancelled / refunded` branches. Customer-visible state.
- **Linear Issues**: workflow states are customizable per workspace; transitions are unconstrained (it's an issue tracker, not a regulated domain).

---

## 5. Inventory (e-commerce / ERP)

### What can go wrong

- **Overselling.** Two simultaneous purchases for last unit; both succeed; one customer is disappointed.
- **Reserved-but-not-released.** User adds to cart, abandons; stock never released.
- **FIFO vs LIFO error.** Wrong cost-of-goods-sold posted to GL; period close affected.
- **Backorder UX missing.** "Available" shown when item is actually out, customer order fails at fulfillment.
- **Multi-warehouse confusion.** UI shows total stock; fulfillment can't ship from any single warehouse with the full quantity.
- **Drift between source-of-truth and replicas.** Orders ship from cached counts; cache is wrong.

### Patterns

- **Pessimistic lock on stock decrement.** `SELECT FOR UPDATE; check available; decrement; commit.`
- **Reservation TTL.** Cart items reserve stock for 15 min; auto-release if not purchased.
- **Available = on_hand − reserved − allocated.** Compute every read; never store the derived value.
- **Cycle count automation.** Schedule small inventory recounts, auto-flag variances.

### Competitor approaches

- **Shopify**: oversell prevention via Inventory Policy = `deny`; `continue` allows overselling intentionally. Multi-location native.
- **NetSuite**: lot/serial tracking, multi-warehouse, transfer orders, sophisticated reorder points. Heavy.
- **Amazon FBA**: outsources inventory entirely; you ship to them, they handle the rest.
- **Cin7 / Brightpearl**: mid-market alternatives to NetSuite for inventory-heavy businesses.

---

## 6. Idempotency & webhooks

### What can go wrong

- **Double-charge from network retry.** Client times out mid-charge; retries; both succeed.
- **Webhook delivered twice.** Receiver inserts row twice; duplicate side effect.
- **Webhook dropped silently.** Receiver returns 200 but threw before processing; sender thinks it's done.
- **Out-of-order webhook delivery.** "Charge succeeded" arrives after "Charge refunded."
- **Replay attack.** Old webhook payload replayed by attacker who learned the signing key.

### Patterns

- **Idempotency-Key header** on every state-changing endpoint. Server stores result for 24h+.
- **Webhook event ID for receiver dedupe.** Receiver checks "have I seen event_id X?" before processing.
- **Out-of-order tolerance.** Each webhook references the entity's current state version; receiver fetches fresh state if version mismatches.
- **HMAC signing + timestamp tolerance.** Reject payloads whose timestamp is more than 5 minutes old (replay window).

### Competitor approaches

- **Stripe webhooks**: HMAC-SHA256 signing with secret per endpoint, timestamp verification, retry up to 3 days, dashboard for replay.
- **GitHub webhooks**: HMAC-SHA256, no timestamp verification (rely on TLS); retry only on 5xx for ~24h.
- **Segment**: at-least-once delivery, ordering not guaranteed, batching for efficiency.

---

## 7. Audit, compliance, retention

### What can go wrong

- **Audit log forgeable.** Admin can edit log to hide actions.
- **Audit gaps.** Some entities aren't logged; regulator finds out.
- **Retention insufficient.** Deleted data after 1 year; regulator wants 7.
- **GDPR DSAR untestable.** No automated process to export one user's data.
- **Right-to-erasure incomplete.** User deleted; backups still hold their data; restore brings them back.

### Patterns

- **Append-only audit log** in a table whose update / delete is denied at DB level (RLS or trigger).
- **Per-row provenance**: `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at` on every regulated row.
- **DSAR endpoint** returning a JSON archive of everything tied to a user_id.
- **Erasure cascade**: delete from primary, mark for deletion in backups, redact in audit log (replace identifiers with `[ERASED]`).
- **Retention jobs**: scheduled hard-delete of rows past retention, with logging.

### Competitor approaches

- **Stripe**: audit log API (Connect platforms), 90-day retention free, longer with paid plans.
- **Salesforce**: comprehensive audit trail; retention configurable per object.
- **AWS CloudTrail**: append-only, multi-region, queryable via Athena/CloudWatch.
- **Datadog Audit Logs**: SOC 2 / HIPAA compliant, queryable, retention up to 15 months.

---

## 8. ERP-specific

### Financial

- **Period close lock**: once May 2026 is closed, no entries can post to May. Adjustments via journal entry, not by reopening.
- **Trial balance must balance**: sum(debits) = sum(credits). Run nightly; alert on mismatch.
- **FX gains/losses**: realized (when transaction settles) vs unrealized (open AR/AP at month-end).

### Inventory

- **Valuation methods**: FIFO (default for goods), weighted-average (default for commodities), specific identification (high-value).
- **Standard cost vs actual cost**: standard for predictability, actual for accuracy.
- **Variance accounts**: when actual cost ≠ standard cost, the difference posts to a variance account.

### Procurement

- **3-way match**: PO ($X for N units) + GRN (received N units in good condition) + invoice ($X for N units) → approve payment. Mismatch holds.
- **Approval matrices**: $0–$1K self-approve, $1K–$10K manager, $10K–$100K director, $100K+ CFO.

### Compliance

- **SOX (US public)**: segregation of duties — no one approves their own POs, posts their own JEs, or releases their own checks.
- **GDPR**: applies to ERPs that hold EU employee or customer data.
- **HIPAA**: only if the ERP holds PHI (rare; usually a separate EHR system).

### Competitor approaches

- **NetSuite**: dominant cloud ERP, all the above, expensive.
- **SAP S/4HANA**: enterprise, heavy customization, expensive.
- **Odoo**: open-source ERP, modular, much cheaper, less industry depth.
- **Microsoft Dynamics 365**: strong in mid-market, integrates with M365.
- **Sage Intacct**: financial-focused mid-market.

---

## 9. Notifications

### What can go wrong

- **Notification storm.** A bug fires 50K notifications in 5 minutes.
- **Channel preference ignored.** User opted out of email; gets emailed anyway.
- **Localization missing.** Notification in English to a Japanese user with English-not-set.
- **Quiet hours violated.** Notification at 3am local time.
- **Email bounces; user account suspended for non-payment.** Cycle.
- **In-app notification accumulates forever.** UI shows "9999+" unread.

### Patterns

- **Per-channel per-category preferences.** Comments via in-app + email; product updates email only.
- **Digest mode.** Bundle low-priority into daily/weekly emails.
- **Suppression list.** Bounced emails go to suppression; no further sends. Hard-bounces immediately, soft-bounces after N attempts.
- **Localization at render time**, not at queue time.
- **Quiet hours.** Per-user, per-tenant, holiday-aware.

### Competitor approaches

- **Linear**: in-app + email + Slack; digest mode for low-priority; per-project notifications.
- **GitHub**: customizable per-repo per-event; participating-only mode; mobile push.
- **Customer.io / Braze / Iterable**: marketing automation platforms — handle preferences, sends, deliverability.
- **Knock**: developer-focused notifications; multi-channel; preferences API.

---

## 10. Marketplace & fintech-specific

### Marketplace

- **KYC at seller onboarding.** ID verification (Stripe Identity, Persona, Sumsub).
- **Connected accounts.** Stripe Connect Express (light KYC, easy onboarding) or Custom (full control, full liability).
- **Split payments.** Application fee taken from each transaction; rest to seller.
- **Payout schedule.** Daily / weekly / monthly. First-time sellers usually 7–14 day hold.
- **Disputes triangle.** Buyer ↔ Seller ↔ Platform. Who decides? Platform mediates with rules.
- **1099-K reporting (US).** Threshold $600 (was $20K pre-2022); platform issues form.

### Fintech

- **AML / sanctions screening.** Every transaction checked against OFAC / EU / UN lists.
- **PSD2 SCA (EU).** Strong Customer Authentication for €30+ payments.
- **Reserves / capital.** Per-regulator requirements.
- **Reconciliation.** Nightly job comparing your ledger against partner-bank statements.
- **PCI-DSS Level 1.** If you process > 6M card transactions/year. Mostly avoided by tokenizing through Stripe.

### Competitor approaches

- **Stripe Connect**: dominant for marketplaces; Express vs Custom tradeoff.
- **Adyen MarketPay**: enterprise alternative to Stripe Connect.
- **Plaid + Dwolla**: ACH-focused alternative for bank-transfer marketplaces.
- **Increase / Modern Treasury**: programmable banking primitives for fintech.

---

## How to use this catalog

1. Open it when you're starting a feature in a domain you haven't built before.
2. Find the relevant sections.
3. Pick the dimensions you need to decide on; ignore the rest.
4. Run `/competitive-analysis` to look at how 2–3 competitors solve the specific problem.
5. Run `/business-blueprint` for a holistic walkthrough of the project type.
6. Run `/business-logic-audit` after the feature is built to catch what was missed.
7. Save the resulting decisions in `.claude/memory/project/` so the next session inherits them.
