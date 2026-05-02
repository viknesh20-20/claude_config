# First-Run Guide

> Never used Claude Code? Read this. Five minutes, plain English, no jargon.

---

## What is this?

This is a **toolkit** that adds a bunch of useful capabilities to **Claude Code** — Anthropic's AI coding assistant. Think of it as a starter kit that gives Claude:

- Pre-made workflows for common tasks ("review my code", "build a UI", "deploy this")
- A team of specialized assistants (a designer, an architect, a security reviewer, etc.)
- Connections to outside tools (GitHub, your database, payment systems, vector search)

After installing, you talk to Claude in your terminal. Claude reads your project, picks the right tool for the job, and does the work.

---

## Before you start

You need three things on your computer:

| What | Why | Get it from |
|---|---|---|
| **Node.js 18+** | Runs the installer | https://nodejs.org/ — pick "LTS" |
| **Git** | Downloads add-ons from GitHub | https://git-scm.com/downloads |
| **Claude Code** | The thing that does the work | https://docs.claude.com/en/docs/claude-code |

If any are missing, the installer will tell you exactly which one and where to get it. You can install them in any order.

---

## Step-by-step: from zero to working

### 1. Open a terminal

- **Windows:** Start menu → "PowerShell" → click PowerShell.
- **Mac:** Spotlight (Cmd+Space) → "Terminal" → Enter.
- **Linux:** Whatever terminal you usually use.

### 2. Go to your project folder

If you have a project already:

```
cd path/to/your/project
```

If you don't, make one first:

```
mkdir my-first-project
cd my-first-project
```

### 3. Run the installer

```
node /path/to/claude_config/install.mjs
```

(Or double-click `bootstrap.ps1` on Windows / `bootstrap.sh` on Mac/Linux if you don't want to type the command.)

### 4. Answer one question

The installer asks: **"What are you building?"**

Pick the number that fits:
- **1** — a website or landing page
- **2** — a web app or SaaS
- **3** — an AI agent or chatbot
- **4** — install everything (recommended for first-timers — explore!)
- **5** — let me pick each piece (advanced)
- **6** — just the basics

If you're unsure, pick **4**.

### 5. (Optional) Paste API keys

The installer asks for keys to outside services (Stripe, GitHub, etc.). Two important things:

- **You can skip every single one.** Just press Enter. Services without keys are simply turned off; everything else still works.
- **Keys are saved to a file (`.env.local`) that's automatically excluded from git.** They never get committed or pushed.

### 6. Wait

You'll see progress messages. Takes 2–10 minutes depending on your choice. Don't worry if it pauses for a moment during downloads — it's just talking to GitHub.

### 7. Open Claude Code

```
claude
```

That's it. You're in. Try typing `/` to see all the commands available, or just describe what you want in plain English — Claude figures out the rest.

---

## Your first 30 minutes — try these

Pick three to try:

| Type this | What happens |
|---|---|
| `/onboard` | Claude scans your project and writes a summary of how it works |
| `/review-pr` | Claude reviews the changes in your current git branch |
| `/security-scan` | Claude looks for security issues in your code |
| `/optimize` | Claude finds slow code and suggests fixes |
| `/explain-code path/to/file.ts` | Claude explains what a file does, line by line |
| `Build a landing page hero section` | Claude designs and writes the code |
| `/ui a pricing card with three tiers` | The 21st.dev Magic plugin generates the component |
| `/qa` | If gstack is installed, opens a browser and tests your app |
| `/help` | Lists every available command |

---

## Common questions

**"Will Claude break my code?"**
Claude shows you what it's about to do and asks before changing files. You can always say no, undo with git, or ctrl+C to stop.

**"Will Claude push my code or my keys to anyone?"**
No. Claude only does what you ask. The installer specifically gitignores the `.env.local` (keys) file and the third-party download folders so they never get pushed.

**"Does this cost money?"**
- Claude Code itself has a paid plan via Anthropic — usage-based.
- The toolkit is free (MIT licensed).
- The plugins and skills are free.
- API services (OpenAI, Stripe, etc.) cost what they cost — usually with free tiers.

**"Can I use this for client work?"**
Yes — most of the toolkit is MIT-licensed (use freely commercially). One package (claude-mem) is AGPL — the installer warns and defaults to "no" before installing it. See [docs/LICENSES.md](LICENSES.md) for the full breakdown.

**"What if I make a mistake?"**
- Re-run the installer — it's idempotent (safe to run multiple times). Nothing breaks.
- Delete the `.claude/` folder in your project to start over.
- The installer never modifies files outside your project folder.

**"How do I update everything later?"**
```
node /path/to/claude_config/update.mjs
```

This pulls the latest toolkit, refreshes plugins, and re-downloads agent collections.

**"Help, the installer crashed!"**
Read the error message — it usually says exactly what's missing (`git not found`, `claude not found`, etc.) and where to install it. Then re-run the installer.

If it's something else, check `docs/LICENSES.md` and `CHEATSHEET.md` in this folder for clues, or open an issue.

---

## What's where

After install, your project folder has:

```
your-project/
├── .claude/
│   ├── agents/        ← The team of specialists Claude can call on
│   ├── skills/        ← Pre-made workflows (slash commands)
│   ├── rules/         ← Coding standards Claude follows automatically
│   └── settings.json  ← What commands Claude can/can't run
├── .env.local         ← Your API keys (gitignored — never published)
├── .gitignore         ← Already updated to keep secrets and downloads out of git
├── .mcp.json          ← Connections to outside services
└── CLAUDE.md          ← Your project's "about" page that Claude reads first
```

The most important file to edit yourself is **`CLAUDE.md`** — write 3–5 lines about your project (what it does, what tech, any gotchas). Claude reads this every session.

---

## Where to go next

- **[CHEATSHEET.md](../CHEATSHEET.md)** — every command, organized by what you want to do
- **[docs/ARCHETYPES.md](ARCHETYPES.md)** — what each install option includes
- **[docs/TOOLBOX.md](TOOLBOX.md)** — every tool the toolkit can drive (free-first)
- **[docs/LICENSES.md](LICENSES.md)** — what each downloaded source is licensed under

Don't read all of them. Skim the cheat sheet, type `/` in Claude Code, and learn by doing.
