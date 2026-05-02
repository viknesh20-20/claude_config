# Design Principles

> The toolkit's design philosophy and the layered system of agents, rules, skills, and hooks that enforce it. Companion to the auto-loaded `design-quality.md` and `web-compliance.md` rules.

---

## Two-line philosophy

Good design is **invisible**: the user gets what they came for and leaves without thinking about the interface.

Great design is **honest**: it doesn't trick, hide, rush, or shame users into outcomes the user wouldn't pick if they understood.

Everything below serves one or both of those.

---

## The layered design system

The toolkit splits design responsibility across layers — each owns a different altitude of work, each is its own agent or skill.

| Layer | Owner | What it produces |
|---|---|---|
| **Story** — what the user wants | `ux-designer` agent + `/design-flow` skill | A spec'd journey: entry, screens, decisions, branches, edge cases, microcopy hooks |
| **Structure** — where things go | `/wireframe` skill | Pixel-free wireframes for every state of every screen |
| **Words** — what it says | `/microcopy` skill | Voice-consistent, action-led, recovery-oriented copy |
| **System** — what we build with | `design-system-architect` agent | Tokens (color, type, spacing, motion), component APIs, theming |
| **Visual** — how it looks | `impeccable` skill (vendored) | Typography, color, spatial design, polish, critique |
| **Motion** — how it moves | `design-motion-principles` skill (vendored) | Three-lens motion audit (Emil Kowalski / Krehel / Tompkins) |
| **3D** — what's beyond flat | `three-d-specialist` agent + `webgpu-threejs` / `gsap` / `threejs-pkg` skills | Three.js, WebGPU, R3F, scroll-driven scenes |
| **Accessibility** | `/a11y-audit` skill + `design-quality.md` rule | WCAG 2.1 AA verification with code fixes |
| **Compliance** | `web-compliance.md` rule + `/web-launch-check` skill | Privacy, cookies, consent, sitemap, SEO, legal pages |

When you ask for design help, Claude routes to the right layer. Don't try to do everything at every layer in one shot — that's how design ships late and inconsistent.

---

## Auto-loaded design rule (always in context)

[`.claude/rules/design-quality.md`](../.claude/rules/design-quality.md) loads in every session. It enforces the four pillars (hierarchy, consistency, feedback, accessibility) plus typography / spacing / color / motion / forms / buttons / empty states / loading / error / responsive / a11y / microcopy defaults.

**Forbidden patterns** (the rule refuses these by default):

- Confirmshaming (e.g., "No thanks, I don't want to save")
- Hidden costs revealed only at final step
- Pre-checked consent boxes (illegal in EU)
- Dark-pattern cookie banners (Reject buried)
- Forced account creation when guest works
- Sneaky auto-renewal
- Fake urgency / fake stock counts
- Roach-motel subscriptions
- Misdirection on destructive actions
- Multi-step unsubscribe with downsells

If you ask for one, Claude names it and offers the honest alternative.

---

## When to use which command

| You want to … | Run |
|---|---|
| Plan a new feature flow | `/design-flow <feature>` |
| Spec a screen for engineering | `/wireframe <screen>` |
| Write button labels, errors, empty states | `/microcopy <context>` |
| Audit accessibility | `/a11y-audit` |
| Audit visual design quality | `/impeccable polish` (or `/critique`, `/audit`) |
| Audit motion | "Audit the motion design in this codebase" (triggers `design-motion-principles`) |
| Build a component | `/create-component <name>` (engineering scaffold; pair with design system) |
| Plan tokens / themes / theme | Ask the `design-system-architect` agent |
| Build a 3D / WebGPU scene | Ask the `three-d-specialist` agent |
| Run pre-launch design + compliance gate | `/web-launch-check` |
| Get review of UX of an existing flow | Ask the `ux-designer` agent |

---

## The four pillars (deeper)

### 1. Hierarchy

The user can identify the most important element on the screen in under 1 second.

How to test: glance at a screenshot for a moment, then describe what you should do next. If you can't, hierarchy is broken.

How to fix: pick exactly **one** primary action per screen. Bolder, larger, or more saturated than everything else. Demote the others. Use whitespace as much as you use weight.

### 2. Consistency

The same kind of thing looks the same across the product.

How to test: open two unrelated screens. Are buttons the same? Is spacing the same? Is the heading style the same? Is the form-error pattern the same?

How to fix: invest in a design system. `design-system-architect` is the agent for this. The investment pays back the day you ship the second feature.

### 3. Feedback

Every user action gets a system response within 100ms (visual ack) and 1s (loading state if work continues).

How to test: tap, click, drag, submit. Was there an immediate response? Did you know your input registered?

How to fix: skeleton states for slow loads, optimistic updates for fast ones, error toasts for failures. Don't leave a button looking idle while it's working.

### 4. Accessibility

WCAG 2.1 AA at minimum. Every user — including keyboard-only, screen-reader, low-vision, color-blind, low-mobility — can complete the core flows.

How to test: navigate the app with Tab only. Then with VoiceOver / NVDA. Both should make sense.

How to fix: `/a11y-audit` walks every WCAG criterion that maps to common patterns. Most issues have a one-line fix (`alt=`, `<button>` instead of `<div onClick>`, `outline: none` → `focus-visible:`).

---

## Design hook — automated nudges on UI writes

[`.claude/hooks/design-quality-check.sh`](../.claude/hooks/design-quality-check.sh) runs after every Edit / Write to `.tsx / .jsx / .vue / .svelte / .html / .astro` files. It's a lightweight grep-based linter that flags:

- Raw hex colors (suggest tokens)
- Off-scale pixel values (suggest spacing tokens)
- `<img>` without `alt`
- Empty `<button>`
- `outline: none` without `focus-visible:`
- `<div onClick>` (should be `<button>`)

It **never blocks**. It emits warnings to stderr that the model reads, so Claude self-corrects on the next response without you having to flag it. Disable it by removing the hook from `.claude/hooks/` if it's noisy for your project.

---

## What this layer does NOT do

- **Pixel-pushing.** Use Figma for that. Wireframes here are pixel-free on purpose.
- **Brand work.** Brand voice, logo, illustration style — we don't touch those. Talk to a brand designer.
- **Motion prototyping.** Storyboards / Lottie / Rive belong elsewhere; the toolkit reviews motion code, not video.
- **Design research.** User interviews, surveys, JTBD — the toolkit doesn't run these. It uses the output.
- **Design tokens authoring.** Claude can scaffold them, but the actual values are decisions for the design system author.

---

## Reading order if you're new

1. Start: [`docs/FIRST_RUN.md`](FIRST_RUN.md).
2. Cheat sheet: [`CHEATSHEET.md`](../CHEATSHEET.md) — `Design` section.
3. Auto-loaded rules (already in your session): `design-quality.md`, `web-compliance.md`, `no-hallucination.md`, `memory-discipline.md`.
4. When you start a feature: `/design-flow`.
5. When you spec a screen: `/wireframe`.
6. When you write copy: `/microcopy`.
7. Before you ship: `/a11y-audit` + `/web-launch-check`.

---

## Reference: existing visual-design tools

Vendored from upstream (gitignored, fetched on install):

- **`impeccable`** (Apache-2.0, pbakaus/impeccable) — 23 design-fluency commands: polish, audit, critique, typeset, animate, colorize, layout, distill, harden, optimize, …
- **`design-motion-principles`** (MIT, kylezantos) — three-lens motion audit (Emil Kowalski, Jakub Krehel, Jhey Tompkins).
- **`ui-ux-pro-max`** (MIT, nextlevelbuilder) — design intelligence with palettes, font pairings, accessibility checks.
- **`gsap`** (MIT, GreenSock) — 8 GSAP skills (core, timeline, scrolltrigger, plugins, utils, react, performance, frameworks).
- **`webgpu-threejs`** (MIT, dgreenheck) — WebGPU + Three.js + TSL.
- **`threejs-pkg`** (MIT, OpenAEC-Foundation) — 24 Three.js skills covering WebGL, WebGPU, R3F, Drei, physics.

These complement the toolkit's originals; together they cover the full surface from story to polish.
