# Contributing

Thank you for your interest in improving this Claude Code configuration. This guide explains how to add skills, agents, rules, and hooks.

## Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-new-skill`
3. Make your changes (see guides below)
4. Test your changes in a real project
5. Submit a pull request

## Adding a New Skill

### 1. Create the directory

```bash
mkdir -p .claude/skills/my-skill
```

### 2. Create SKILL.md with frontmatter

```markdown
---
name: my-skill
description: "What it does and when to use it. Be specific — Claude uses this to auto-invoke."
argument-hint: "[argument description]"
allowed-tools: Read, Grep, Glob
---

# My Skill

## Context Detection
!`relevant shell command`

---

## Instructions
1. Step one
2. Step two

## Output Format
Describe expected output structure.

## Rules
- Boundaries and constraints
```

### 3. Requirements
- `name` and `description` are required in frontmatter
- Description must be under 150 characters
- Skill must be stack-agnostic (detect, don't assume)
- Include shell injection (`!`command``) for context detection
- Keep SKILL.md under 200 lines
- Include an Output Format section
- Include a Rules section with boundaries

## Adding a New Agent

Create a markdown file in `.claude/agents/`:

```markdown
---
name: agent-name
description: "What this agent specializes in."
tools:
  - Read
  - Grep
  - Glob
  - Bash
---

# Agent Name

## Role
Define the agent's expertise and perspective.

## When to Delegate
- Scenario list

## Approach
Numbered methodology.

## Output Standards
Deliverable format.

## Boundaries
What the agent does NOT do.
```

### Requirements
- `name`, `description`, and `tools` are required
- Tools should follow principle of least privilege
- Agent must have clear boundaries
- Include both positive (what to do) and negative (what not to do) guidance

## Adding a New Rule

Create a markdown file in `.claude/rules/`:

```markdown
# Rule Category Name

## Section
- Imperative rule statement
- Another rule
```

### Requirements
- No YAML frontmatter — rules are plain markdown
- Use imperative voice ("Use X", "Never do Y")
- Keep under 60 lines — rules auto-load into context
- Be concrete and actionable — not vague principles
- Stack-agnostic (no language-specific rules)

## Modifying Hooks

Hooks are in `.claude/hooks/`. The pre-tool-use hook receives JSON on stdin and must output a JSON decision:

```json
{"decision": "allow"}
{"decision": "block", "reason": "Explanation of why"}
```

## Guidelines

- All content must be **stack-agnostic** unless explicitly language-specific
- All content must be **100% original** — no copying from other repositories
- Test in a real project before submitting
- Update `CATALOG.md` when adding skills, agents, or rules
- Update `README.md` skill/agent/rule tables
- Follow existing patterns — consistency matters

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.
