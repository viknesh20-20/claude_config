# Memory layer

> Persistent, file-based memory shared across sessions and across agents.
> Every agent reads from here on start. Every session writes back what's worth keeping.

## Subfolders

| Folder | What lives here | When written | Who reads |
|---|---|---|---|
| `project/` | Facts about *this* project: architecture decisions, conventions, gotchas, known issues, why-we-chose-X notes. | When the user reveals something the project's code doesn't already say. | Every agent at start. |
| `user/` | Facts about *the user*: role, expertise, preferences, projects they own. | When the user reveals their context. | Every agent at start. |
| `feedback/` | Corrections + validations: things to do (or not do) based on past sessions. | When the user corrects you, or confirms a non-obvious choice. | Every agent at start. |
| `reference/` | Where to look outside the project: Linear project, Slack channel, dashboard URLs, related repos. | When the user mentions an external resource. | Every agent at start. |
| `handoffs/` | End-of-session summaries: what we did, what's next, what's blocked. Datestamped files. | At end of session via `/handoff`. | Next session at start. |
| `inherited/` | Memories pulled in from another workspace via `/memory-import`. | When the user runs `/memory-import <path>`. | Every agent at start. |

## Index

Every memory file is referenced from `MEMORY.md` at the workspace root (one level up). The index is one line per entry: `- [Title](memory/<type>/file.md) — one-line hook`. No memory content lives directly in the index.

## File format

Each memory file is a markdown document with frontmatter:

```markdown
---
name: <short title>
type: project | user | feedback | reference | handoff | inherited
description: <one-line description for relevance scoring>
created: <YYYY-MM-DD>
last-verified: <YYYY-MM-DD>
source-workspace: <optional, for inherited>
---

<body>
```

For `feedback/` and `project/`, the body should include `**Why:**` and `**How to apply:**` lines so future agents understand context.

## What NOT to put here

- Code patterns and conventions derivable from the current source — read the code, don't memorize it.
- Git history and recent changes — `git log` is authoritative.
- Debugging fix recipes — the fix is in the code; the commit message has the context.
- Things already documented in `CLAUDE.md` files.
- Ephemeral conversation state.

If in doubt: would this still be true and useful in three months? If yes, save. If no, skip.

## Decay

- Re-verify the `last-verified` date when a memory is consulted and still applies.
- If a memory is wrong or stale, fix it or delete it — don't accumulate cruft.
- Files older than 6 months without a `last-verified` update are candidates for review.

## Skills that operate on this layer

- `/memory` — list, search, save, delete, dedupe.
- `/memory-import <path>` — pull memories from another workspace.
- `/reference-app <path>` — read a reference codebase and store its architecture under `reference/`.
- `/handoff` — write end-of-session summary to `handoffs/`.
