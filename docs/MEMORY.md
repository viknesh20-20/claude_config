# Memory — How Sessions Persist & Inherit Context

> The toolkit's memory layer is the reason Claude remembers what you said yesterday, what your project uses, what you corrected last week, and how another of your projects is built.

---

## What's in the memory layer

`.claude/memory/` lives inside every project that runs the installer. It has six folders:

| Folder | What goes here | Example |
|---|---|---|
| `project/` | Facts about the current project | "We use Drizzle, not Prisma; chose it for raw-SQL ergonomics." |
| `user/` | Facts about you (the human) | "Senior engineer, owns the platform team." |
| `feedback/` | Corrections & validations | "Don't mock the DB in integration tests — we got burned in Q1." |
| `reference/` | External resources | "Linear project ENG tracks pipeline bugs." |
| `handoffs/` | End-of-session summaries | `2026-05-02.md` — what we did today, what's next |
| `inherited/` | Memories pulled from another workspace | Tagged with source, treated as suggestive |

`MEMORY.md` at the root of `.claude/memory/` is a one-line index — Claude loads this every session.

---

## Three rules every session follows

These come from `.claude/rules/memory-discipline.md` and `.claude/rules/no-hallucination.md` — auto-loaded into every session.

**1. Read at start.** Every agent reads `MEMORY.md` and the most recent handoff in its first response. You'll see this acknowledgment up front: "Picking up from yesterday — billing flag still off in prod per your note."

**2. Save deliberately.** Memory is curated, not a journal. Claude only saves a fact when:
- It'll matter in a future session.
- It can't be derived from current code.
- You volunteered it (or accepted a non-obvious decision).

**3. Verify, ask, don't decide.** Before claiming any fact about your code, Claude reads or greps. Before any consequential decision, Claude asks. The rule: confidence comes from evidence; uncertainty triggers a question.

---

## Skills you use to operate the memory layer

### `/memory list`
Print everything in memory, grouped by type, with last-verified dates.

### `/memory search <query>`
Find memories matching a topic.

### `/memory save`
Walk through writing a new memory — type, title, description, body. Confirms before writing.

### `/memory delete <name>`
Remove a memory and its index entry.

### `/memory dedupe`
Surface likely duplicates so you can collapse them.

### `/memory-import <path>`
Pull memories from another workspace. The classic use case: you built `acme-app` and want its accumulated context (architecture decisions, conventions, references) in your new project. Run:

```
/memory-import ../acme-app
```

The skill:
- Validates the path has a memory layer.
- Auto-imports `project/` and `reference/` (most likely to transfer).
- Asks per-item before importing `user/` and `feedback/` (preferences may not transfer).
- Skips `handoffs/` and `inherited/` (session-specific or transitive).
- Tags each imported memory with `source-workspace: <path>` so future agents cite it as "from acme-app, not authoritative for here."

### `/reference-app <path>`
Different from `/memory-import`. This points Claude at a fully-developed application you want to use as a model — the agent reads the architecture, conventions, and patterns; writes a structured summary into `.claude/memory/reference/`. Then in any later session you can ask:

- "Compare auth here vs. acme-app."
- "How does acme-app structure billing? Set up the same here."
- "Review my code against acme-app's conventions."

**Key difference**: `/memory-import` copies pre-existing memories. `/reference-app` analyzes the codebase fresh and produces a memory summary.

The skill always asks first:
- What should I learn — patterns / architecture / specific module / all?
- What's shared with the current project?
- Treat as authoritative or suggestive?

### `/handoff`
End of working session. Writes a structured summary to `.claude/memory/handoffs/<date>.md` capturing:
- Focus today
- What was done
- What's left
- Blockers
- Decisions made
- Decisions awaiting you
- Next concrete action

Next session reads this on start and picks up where you left off.

---

## Cross-agent communication

The 12 toolkit agents (`architect`, `code-reviewer`, `security-auditor`, `devops`, `performance`, `tdd`, `documentation`, `mentor`, `three-d-specialist`, `ai-engineer`, `design-system-architect`, `qa-lead`) all read from the same `.claude/memory/`. When `code-reviewer` flags an architectural concern and hands off to `architect`, the architect doesn't need a re-explanation — both have read the same project memory and the same handoff.

When agents disagree (e.g., performance vs. tdd on a coverage tradeoff), they record the disagreement in the response so you can break the tie. They don't write conflicting memories — only consensus or your decision gets recorded.

---

## "I want Claude to understand my full app even though I'm working in a different folder"

Two-step setup:

```
# 1. Tell Claude about the reference application
/reference-app /path/to/your/full-app

# (Answers questions about authority, what to learn, etc.
#  Then reads the codebase and writes a structured summary to memory.)

# 2. Optionally, also import accumulated memories
/memory-import /path/to/your/full-app

# (Brings in what your team learned in that workspace —
#  conventions, gotchas, references.)
```

After this, every session in the current workspace has the reference loaded. You can do code reviews, architecture comparisons, and pattern-matching against your existing app.

---

## "I gave Claude a code review, and now I want it to use my main app as context"

Same two steps in reverse — you want Claude to **review** the code in front of it, but **understand** another app:

```
# Currently working in: /work/code-review-target/
/reference-app /work/my-main-production-app
```

When you then ask `/review-pr` or `/security-scan`, the reviewer agent reads both the diff *and* the reference memory, and frames findings like:

> "Your main app uses idempotency keys on every payment write (per reference). This webhook handler doesn't — same pattern intended here?"

Pattern transfer is explicit, never silent.

---

## "I don't want Claude making decisions for me"

Two layers protect you:

**Layer 1 — `no-hallucination` rule (auto-loaded).** Every agent must verify before claiming, and ask before deciding on:
- Anything destructive (delete, force-push, drop column).
- Anything visible to others (push, PR, message, notification).
- Anything that costs money or quota.
- Anything where intent is ambiguous.
- Anything that locks in an architecture choice.

**Layer 2 — every skill in this toolkit asks first.** `/reference-app` asks what to learn before reading. `/memory-import` shows the import list before copying. `/handoff` shows the summary before saving. `/legal-pages` asks about jurisdiction. `/seo-scaffold` asks about the framework.

If you ever see Claude take a consequential action without asking, that's a bug to flag — not the intended behavior.

---

## Privacy

- Memory files live in your workspace under `.claude/memory/`.
- They are **not** gitignored by default — you may want to commit some (`project/`, `reference/`) so teammates inherit them.
- They **are** redacted: no API keys, tokens, secrets, or PII written to memory. If a value looks like a secret, the skill substitutes `[REDACTED — was a secret]`.
- If you want to keep memory private, add `.claude/memory/` to your `.gitignore` — your teammates' installs will start with empty memory.

---

## Recommended weekly hygiene

- Run `/memory dedupe` once a week if memory grows past ~30 files.
- Delete `handoffs/` files older than 30 days (or auto-rotate via a cron).
- Re-run `/reference-app` if the reference app evolves significantly.

The goal: a small, sharp set of memories that make every session 30 seconds shorter and 10× more accurate. Not a digital diary.
