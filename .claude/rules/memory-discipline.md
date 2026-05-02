# Memory Discipline

> Auto-loads every session. Tells every agent how to use the persistent memory layer at `.claude/memory/`.

## At session start

Every agent, on its first response in a session, must:

1. **Read `.claude/memory/MEMORY.md`** — the index. It's small and lists every memory file. Loading it is non-negotiable.
2. **Skim memories whose `description` is relevant** to the user's request. Do not load everything; load what relates.
3. **Read the most recent file in `.claude/memory/handoffs/`** if it exists — that's where the previous session left off.
4. **Acknowledge what carried over** in your first response, briefly: "Picking up from yesterday's auth migration; the billing flag is still off in prod per your note."

If the user explicitly says "ignore memory" or "fresh start," skip steps 2–4 but still read the index in case they meant a more limited reset.

## When to write a memory

Write a new memory when, and only when, **all four** are true:

1. The fact will likely matter in a future session.
2. It cannot be derived by reading the current code, git log, or `CLAUDE.md`.
3. The user volunteered it, or you made a non-obvious decision the user accepted.
4. It would be costly to re-derive next session.

If any of those are false, don't write. Memory is curated, not a journal.

Examples that pass:
- User says "we're freezing merges Thursday before the mobile release" → `project/`.
- User corrects you: "no, we don't mock the DB in tests, we run against a real Postgres in CI" → `feedback/`.
- User mentions "incident reports live in Linear project ENG" → `reference/`.

Examples that fail:
- "User wants me to add a button" — that's the current task. Tasks belong in plan files, not memory.
- "I just refactored extractToken into auth/utils.ts" — git log is authoritative.
- "I tried X and it didn't work, then Y did" — the commit captures it.

## How to write

Use the schema in `.claude/memory/README.md`. Lead with the fact, then the **Why:** and **How to apply:** lines for `project/` and `feedback/` types. Then update `MEMORY.md` index with one line.

Convert relative dates to absolute: "Thursday" → "2026-05-08." Future you will thank present you.

## When to update vs add

Always check whether an existing memory covers the same topic before adding a new one. Update beats add for related facts. Two memories on "the user prefers vitest over jest" is noise; one is signal.

## When to delete

Delete or archive a memory when:
- The fact has changed (user moved jurisdictions, dropped Stripe, migrated frameworks).
- The decision was reversed.
- It was wrong in the first place.

Don't preserve wrong memories "for historical reference." That's what git log is for.

## Cross-agent communication

The memory layer is shared across all 12 toolkit agents (`architect`, `code-reviewer`, `security-auditor`, `devops`, `performance`, `tdd`, `documentation`, `mentor`, `three-d-specialist`, `ai-engineer`, `design-system-architect`, `qa-lead`).

When delegating to another agent (or being delegated to), do not re-explain everything from scratch. Both agents read the memory layer; both share the same `project/` notes; both see the same handoff. Trust it.

If you, while delegated, learn something the next agent needs:
- Persistent fact → write to memory.
- Conversation-local context → put it in your response so it's in the transcript.

## Inherited memories from another workspace

`.claude/memory/inherited/` holds memories from another project the user explicitly imported via `/memory-import`. Treat them as:

- **Authoritative for the source project** they came from.
- **Suggestive — not authoritative** for the current project. The user inherited them because patterns or conventions might transfer, not because they automatically apply here.

When relying on an inherited memory, cite the source workspace ("from `<other-workspace>` — they used Postgres + Drizzle, similar setup might fit here") so the user can decide if the parallel holds.

## Reference applications

`.claude/memory/reference/` may contain memos written by `/reference-app` summarizing the architecture and conventions of *another* fully-built project the user pointed you at as a reference. Treat these the same way as inherited memories — useful pattern hints, not gospel for the current project.

If the user asks for a code review of the current project and the reference app is loaded, you may compare patterns, but always:
- Cite which project a pattern comes from.
- Don't import a pattern silently from the reference into the current project. Suggest, ask, then act.

## Privacy

Memory files live in the workspace and may be committed to git depending on the user's choice. Treat memory like documentation:

- Do **not** put secrets, API keys, tokens, or PII into memory files.
- If the user shares a value that's a secret, redact when writing memory ("Stripe key set via SETUP_KEY env var" — not the value itself).

## Forbidden behaviors

- Writing a memory the user didn't volunteer.
- Writing a memory about a fix you already made (the commit captures it).
- Writing duplicates instead of updating.
- Loading every memory file when only one is relevant.
- Treating an inherited memory as authoritative for the current project.
- Skipping the index read on session start.
- Writing memory while in a state of disagreement with the user (pause, resolve, then decide what to record).
