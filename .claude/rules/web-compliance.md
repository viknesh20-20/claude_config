# Web Compliance, Privacy, SEO Rules

> Auto-loads every Claude Code session. When the project is a website or web app, every change must keep these obligations in mind. None of these are optional for a site that goes to production.

## Pre-launch checklist (every public site needs all of these)

A site is not "ready" until every item is true. The `/web-launch-check` skill verifies them.

### Legal pages (linked in the footer, accessible on every page)

- **Privacy Policy** — what data is collected, why, who it's shared with, how to delete. Required globally if you collect *any* user data, including IP/cookies.
- **Terms of Service / Terms of Use** — required for any site that lets users sign up, transact, or upload content.
- **Cookie Policy** (or a section in the privacy policy) — required in EU/UK (GDPR/PECR), strongly recommended elsewhere.
- **Contact / business address** — required by law in many jurisdictions (e.g., German Impressum, EU consumer law). Always include a contact email.
- **Refund/Cancellation Policy** — required if you sell anything.

### Consent and tracking

- **Cookie consent banner** if you use any non-essential cookies (analytics, ads, third-party embeds). Default state must be "no tracking" until the user accepts. Reject must be as easy as accept.
- **No third-party scripts (Google Analytics, Meta Pixel, etc.) load before consent.** Use a tag manager with consent gating, or a consent-mode-aware analytics setup.
- **Server-side analytics (Plausible, Umami, Fathom)** is the safer default — often no banner needed because no PII is processed.
- **Document retention periods** for any logs, sessions, or analytics data.

### Sessions / authentication

- **Cookies marked `Secure`, `HttpOnly`, `SameSite=Lax` (or `Strict` if no cross-site flow).** Never store auth tokens in `localStorage` if they're long-lived.
- **Session expiry** explicit. Refresh-token rotation if applicable. Idle timeout for sensitive flows.
- **Logout invalidates the session server-side** — not just clearing the cookie.
- **CSRF protection** on every state-changing request unless using bearer tokens with strict CORS.

### SEO essentials (every page)

- **`<title>`** unique per page, under ~60 characters.
- **`<meta name="description">`** unique per page, ~150 characters, descriptive (not keyword-stuffed).
- **Canonical URL** (`<link rel="canonical">`) on every page to prevent duplicate-content penalties.
- **Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) for social sharing previews.
- **Twitter Card tags** (`twitter:card`, `twitter:title`, etc.).
- **Structured data** (JSON-LD) for the page type (Article, Product, Organization, BreadcrumbList, FAQPage, etc.) where applicable.
- **`<html lang="…">`** set correctly.
- **Heading hierarchy** — exactly one `<h1>`, descendants in order.
- **Alt text** on every meaningful image; empty `alt=""` on decorative ones.
- **Meaningful link text** — never "click here."

### Site-wide SEO files

- **`robots.txt`** at site root — explicit allow/disallow, sitemap reference.
- **`sitemap.xml`** at site root — all canonical URLs, lastmod dates, ideally generated from the build.
- **`/.well-known/security.txt`** for responsible disclosure (recommended).
- **`humans.txt`** (optional, nice touch).
- **404 page** that returns HTTP 404 (not 200) and helps the user recover.
- **Custom 500 page** for server errors.

### Performance and Core Web Vitals

- **LCP ≤ 2.5s** on 75th percentile mobile.
- **INP ≤ 200ms**.
- **CLS ≤ 0.1**.
- **Total blocking JS ≤ 250 KB gzipped** as a budget target. Justify exceptions.

### Accessibility (WCAG 2.1 AA)

- **Keyboard reachable** — every interactive element via Tab.
- **Focus visible** — no `outline: none` without a replacement.
- **Color contrast** ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components.
- **Form labels** programmatically associated.
- **Error messages** linked via `aria-describedby`.
- **`prefers-reduced-motion`** respected for animation.
- **`prefers-color-scheme`** respected if you have a dark mode.
- **Skip-to-content link** for screen-reader users.

### Compliance frameworks (apply if relevant)

- **GDPR** (EU/UK users) — lawful basis, consent, DSAR (data subject access requests) within 30 days, breach notification within 72 hours.
- **CCPA / CPRA** (California users) — "Do Not Sell or Share My Personal Information" link, opt-out signal (Global Privacy Control) honored.
- **PIPEDA** (Canada) — explicit consent for collection and disclosure.
- **LGPD** (Brazil) — similar to GDPR with local DPO requirements.
- **ePrivacy / PECR** (EU/UK) — cookie consent specifically.
- **HIPAA** (US health data) — BAAs with vendors, encryption at rest and in transit, audit logs.
- **PCI-DSS** (card payments) — never touch raw card numbers; use Stripe/Adyen/Braintree tokenization.
- **SOC 2** (B2B SaaS) — access controls, monitoring, incident response.
- **WCAG / EAA / Section 508** (accessibility) — legal requirement in many jurisdictions for public-facing sites.

### Forms and PII

- **HTTPS only.** No exceptions.
- **Validate server-side** even if you also validate client-side.
- **Rate-limit** every form (brute-force prevention).
- **CAPTCHA** on signup, password reset, and contact forms exposed to public.
- **Don't echo PII back in URLs** (avoid `?email=...` query strings — they end up in logs).
- **Email verification** before granting account privileges.

### Email and outreach

- **Unsubscribe link** in every marketing email (CAN-SPAM, GDPR).
- **Sender identification** with physical address (CAN-SPAM).
- **No purchased lists.** Opt-in only.
- **DMARC / DKIM / SPF** configured correctly to avoid landing in spam.

### Third-party embeds

- **iframes** with `sandbox` attribute when possible.
- **External scripts** with `Subresource Integrity` (SRI) hashes when possible.
- **Privacy-focused alternatives**: Plausible (vs Google Analytics), no-tracking embeds (e.g., privacy-respecting YouTube embed `youtube-nocookie.com`).

---

## When Claude is asked to "build a website" or "build a landing page"

By default, the output should:

1. Include placeholders for the legal pages (`/privacy`, `/terms`, `/cookies`) wired into the footer — even if the content is stub text the user fills in later.
2. Generate `sitemap.xml` and `robots.txt` at the site root or in a build step.
3. Include `<title>`, `<meta description>`, canonical link, and OG/Twitter tags on every page (use a layout component, never hard-code per page).
4. Wire a cookie consent banner if any tracking script is added — and not load the script before consent.
5. Use `Secure`, `HttpOnly`, `SameSite` cookies for any auth.
6. Add a 404 page that returns HTTP 404.
7. Validate WCAG 2.1 AA on the output (alt text, heading order, focus state, color contrast).

Don't surprise the user with these — call them out in the response so they know what's been included and what they still need to write (e.g., "I added a stub Privacy Policy at `/privacy` — replace the placeholder with your actual policy before launch").

---

## When Claude is asked to "deploy this site"

Run `/web-launch-check` first. Treat any failed item as a `NO-GO` until resolved or explicitly waived by the user with reasoning.
