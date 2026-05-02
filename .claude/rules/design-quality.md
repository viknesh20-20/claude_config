# Design Quality Discipline

> Auto-loads every session. The defaults that make UI work feel intentional rather than slapped together. Applies whenever you write or review HTML, CSS, JSX, Vue, Svelte, or any user-facing markup.

## The four pillars

Whenever you produce or review a UI, these four are non-negotiable:

1. **Hierarchy** — the user can identify the most important element on the screen in under 1 second.
2. **Consistency** — same kind of thing looks the same across the product. Different things look different.
3. **Feedback** — every user action gets a system response within 100ms (visual ack) and 1s (loading state if work continues).
4. **Accessibility** — WCAG 2.1 AA at minimum. Keyboard-reachable, screen-reader sensible, contrast-sufficient.

If a design fails any of these, it's not done. Don't ship it. Don't approve a PR that ships it.

## Spacing scale

- Use a **4-pt or 8-pt grid**. Common scale: `4, 8, 12, 16, 24, 32, 48, 64`. Outliers (1px borders, 2px gaps) are deliberate exceptions.
- Don't sprinkle off-scale values like `15px` "because it looked right." If 16 is wrong, the scale needs revisiting — not a one-off.
- **Don't mix margin and padding to fake a scale.** Pick the right space; use a token.
- Vertical rhythm: between sibling sections use a larger token (32+); between paragraph and label use a smaller token (8–12).

## Typography

- Pick a **modular type scale** (1.125 / 1.2 / 1.25 / 1.333 / 1.5). Five to seven sizes is enough for almost any product.
- Body text: 16px minimum on the web. 14px is acceptable only for dense data tables and labels.
- Line-height: 1.4–1.6 for body; 1.1–1.25 for headings.
- Line-length: 45–75 characters per line for readable body text.
- Letter-spacing: usually 0. Tighten slightly (-0.01em to -0.02em) at very large sizes; loosen slightly (+0.05em) at all-caps small sizes.
- **Never** use more than two type families on a single product. One is fine.
- **Variable fonts** preferred — they pay for themselves in performance.

## Color

- **Define semantic tokens, not raw colors, in product code.** `color.bg.surface`, not `gray-100`.
- **Contrast (WCAG 2.1 AA):**
  - Body text + background: ≥ **4.5:1**
  - Large text (18pt regular / 14pt bold) + background: ≥ **3:1**
  - UI components and graphical objects: ≥ **3:1**
- **Color is never the only carrier of meaning.** Always pair color with shape, icon, or text. (A red error border + an icon + a text label, not just red.)
- **Dark mode is real.** If the product has a light theme, plan dark from day one — it's easier than retrofitting. Use semantic tokens that swap on theme.
- **Forced-colors mode** (Windows High Contrast): test it. Don't rely on `background-image` for content; it's stripped.

## Hierarchy

- **One primary action per screen.** That button is bolder, larger, or more saturated than everything else.
- **Two or three levels max.** Primary, secondary, tertiary. Beyond that, the user can't read priority.
- **Size, weight, color, position** create hierarchy. Use the lightest tool that works. If size alone signals it, don't also change color.
- **Whitespace is hierarchy too.** A heading with 32px above and 16px below tells the user "this owns the next section."

## Motion

- **Durations**: 100–150ms for micro-interactions, 200–300ms for transitions/modals, 400–600ms for celebratory or onboarding moments. Anything longer feels slow.
- **Easing**: ease-out for enters (the user sees them slow into place), ease-in for exits, ease-in-out for shifts (e.g., layout reflow). Spring for tactile feel.
- **Choreography**: stagger sibling animations 30–80ms; never more than 200ms between items, or it feels broken.
- **`prefers-reduced-motion`**: respect it. Reduce or eliminate non-essential motion. Keep state changes (loading → loaded) visible without movement.
- **No motion for motion's sake.** Every animation answers "did something change?" or "where did it come from?"

## Forms

- **Labels above inputs** for accessibility (placeholder-only labels disappear once typing starts, are unreadable on small screens, and fail screen-reader UX).
- **Inputs have visible focus state** that's distinct from hover.
- **Error message is associated** via `aria-describedby` and shown below the input it relates to.
- **Inline validation** after blur, not on every keystroke (which feels nagging). Show success inline too if the success state matters.
- **Required vs optional**: mark whichever is rarer. If 90% of fields are required, mark optional ones. Avoid "*" without legend.
- **Sensible defaults**: don't ask for data you can derive (currency from locale, country from IP — with consent).
- **Autofill-friendly**: use correct `autocomplete` and `name` attributes so password managers work.
- **Group with logic**: address fields together; not split between sections.

## Buttons & links

- **Buttons do; links go.** A button submits, deletes, opens a modal. A link navigates to a URL. Don't style buttons as links or vice versa.
- **Three states minimum**: default, hover, active/pressed. Plus disabled, loading, focus-visible.
- **Disabled state**: explain why. Tooltip on hover, or inline message. "Save" disabled with no reason is a frustration.
- **Destructive actions** (delete, archive, irreversible): use a different color or pattern. Confirm before executing. Provide undo when possible.

## Empty states

- **Every list, table, search result, and feed has an empty state.** Don't show an empty container.
- **Empty states have three parts**: a clear statement of what's missing, why (if non-obvious), and the next action.
- **First-time-use is different from "I deleted everything."** Distinguish.
- **Illustrations** are nice but optional. The copy and CTA matter more.

## Loading & skeleton states

- **Show feedback within 100ms**: a spinner, a skeleton, anything.
- **For 200ms–1s loads**: skeleton matches the layout shape, prevents layout shift.
- **For >1s loads**: progress indicator if measurable, or a humanized message ("Almost there…") if indeterminate.
- **Don't block input on optimistic operations** when failure is rare and reversible — let the UI update immediately, queue the network call.

## Error states

- **What happened, what to do.** "Couldn't save — check your connection and retry" beats "Error: 500."
- **Inline at the source** if the error is field-specific. Banner at the top if the error is system-wide.
- **Offer recovery**: retry button, undo, link to support.
- **Don't lose the user's data**. If a form fails, preserve what they typed.

## Information architecture

- **Group by user task, not internal team structure.** Settings tabs by "Profile / Notifications / Billing," not by "/api/users vs /api/notifications."
- **Three-click rule is a myth — but the principle (minimize cost-to-find) is real.**
- **Search is faster than browsing** for sufficiently large content. Make it findable on every page.
- **Breadcrumbs** for hierarchies > 2 levels deep.

## Responsive

- **Design mobile-first if the audience is consumer.** Design desktop-first if the audience is power users.
- **Breakpoints by content, not by device.** When a layout breaks, that's a breakpoint.
- **Touch targets ≥ 44px on mobile.** Apple HIG / Material guideline; don't dispute it.
- **Don't hide content responsively.** Re-arrange or progressively disclose, but if mobile users need it, mobile users get it.

## Accessibility (the non-negotiable subset)

- Every image has `alt` (`""` for decorative).
- Every interactive element is keyboard-reachable; Tab order matches reading order.
- Focus state is visible — never `outline: none` without a replacement.
- Labels associated with inputs.
- ARIA when semantic HTML can't express the role; otherwise skip ARIA (semantic HTML is cheaper and more reliable).
- Skip-to-content link as the first focusable element.
- `prefers-reduced-motion` respected.
- Color contrast verified.
- Headings in order; one `<h1>` per page.

## Microcopy

- Verbs on buttons. "Save changes" not "Submit."
- Specific errors. Tell the user what went wrong AND what to do.
- No "simply," "just," "easy," "obviously."
- One voice across the product.
- Localization-ready: no idioms baked in, no concatenated strings, ICU-format for plurals.
- Numbers and dates rendered in user's locale.

## Forbidden patterns

These are user-hostile and Claude should refuse without explicit override:

- Confirmshaming.
- Hidden costs (fees / taxes / shipping revealed only at final step).
- Pre-checked consent (illegal in EU, unethical everywhere).
- Dark-pattern cookie banners (Reject buried).
- Forced account creation when guest works.
- Sneaky auto-renewal.
- Fake urgency / fake stock counts.
- Roach-motel subscriptions (easy sign up, hard cancel).
- Misdirection placing destructive actions where safe ones are expected.
- Multi-step unsubscribe with downsells.

Recognize them, name them, refuse them. Offer the honest alternative.

## When designing or reviewing, the agent must produce

For a new design:
- All four states (default, loading, empty, error) addressed.
- Microcopy specified for every user-facing string.
- Accessibility checked (contrast, keyboard, screen-reader, reduced motion).
- Hierarchy stated: what's the primary action on each screen?
- Responsive plan: how does this scale to mobile / tablet / desktop?

For a review:
- Verdict: GREAT | OK with fixes | RETHINK.
- Issues categorized by the dimensions above (hierarchy / consistency / feedback / accessibility).
- Each issue has a fix, not just a complaint.

This rule pairs with: `ux-designer` agent (flows, IA, microcopy), `design-system-architect` agent (tokens, components), `impeccable` skill (visual fluency review), `web-compliance` rule (legal/SEO/a11y site-wide).
