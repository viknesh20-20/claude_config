# Bundled-source license register

> Sources for every external pack the toolkit can install on your machine. **Nothing third-party is committed to this repo.** Each external pack is git-cloned at install time into a path that is gitignored, so it never enters your published repo.

## Ownership model

| Layer | What it contains | Pushed to your repo? |
|---|---|---|
| **Toolkit originals** (`.claude/agents/*.md`, `.claude/skills/<original>/`, rules, hooks, installer, docs) | 12 agents + 30 skills + 9 rules + 2 hooks + installer + docs, all written from scratch in original prose | **Yes** — this is your work, MIT-licensed under the toolkit's `LICENSE`. |
| **Third-party content** (`.claude/agents/{voltagent,wshobson,contains-studio}/`, `.claude/skills/{gstack,superpowers,impeccable,…}/`) | Cloned from upstream by `install.mjs` based on archetype + interactive consent | **No** — gitignored. Never enters your repo. Each install fetches fresh. |

Result: you can push your repo publicly with no third-party redistribution risk.

## Third-party sources the installer can fetch

All paths below are **gitignored** in `.gitignore`. The installer drops a `NOTICE.md` into each cloned folder with attribution.

| Local path | Source | License | Consent? | Notes |
|---|---|---|---|---|
| `.claude/agents/voltagent/` | https://github.com/VoltAgent/awesome-claude-code-subagents | **MIT** | Archetype-driven | ~150 agents in 10 categories |
| `.claude/agents/wshobson/` | https://github.com/wshobson/agents | **MIT** | Archetype-driven | ~185 agents grouped by plugin |
| `.claude/agents/contains-studio/` | https://github.com/contains-studio/agents | **NO LICENSE** ⚠️ | **Explicit consent required** | The installer prompts and defaults to "no" |
| `.claude/skills/gstack/` | https://github.com/garrytan/gstack | **MIT** | Archetype-driven | 44 skill folders |
| `.claude/skills/superpowers/` | https://github.com/obra/superpowers | **MIT** | Archetype-driven | 14 skills |
| `.claude/skills/impeccable/` | https://github.com/pbakaus/impeccable | **Apache-2.0** | Archetype-driven | 1 skill, 23 commands |
| `.claude/skills/design-motion-principles/` | https://github.com/kylezantos/design-motion-principles | **MIT** | Archetype-driven | 1 skill |
| `.claude/skills/gsap/` | https://github.com/greensock/gsap-skills | **MIT** | Archetype-driven | 8 skills |
| `.claude/skills/ui-ux-pro-max/` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | **MIT** | Archetype-driven | 7 skills |
| `.claude/skills/webgpu-threejs/` | https://github.com/dgreenheck/webgpu-claude-skill | **MIT** | Archetype-driven | 1 skill (WebGPU + TSL) |
| `.claude/skills/threejs-pkg/` | https://github.com/OpenAEC-Foundation/Three.js-Claude-Skill-Package | **MIT** | Archetype-driven | 24 skills |

## Plugins installed via Claude Code's marketplace

These are not vendored at all — they're managed by the Claude Code plugin system (`claude plugin install ...`).

| Plugin | License | Consent? |
|---|---|---|
| `frontend-design` (Anthropic) | Anthropic ToS | Auto |
| `superpowers` (obra) | MIT | Auto |
| `ui-ux-pro-max` (nextlevelbuilder) | MIT | Auto |
| `claude-mem` (thedotmack) | **AGPL-3.0** + `ragtime/` PolyForm-NC | **Explicit consent required** |
| `ruflo-*` (ruvnet) — 10 plugins | MIT | Auto |

## Why the contains-studio collection requires explicit consent

The upstream repo (https://github.com/contains-studio/agents) does **not** ship with a LICENSE file. Default copyright applies. Even though the repo is public, redistribution rights are not granted.

Implications:
- **Cloning to your local machine for personal use** — generally fine (this is what the installer does).
- **Pushing the cloned content to a public repo** — risky. The toolkit's `.gitignore` prevents this by default.
- **Embedding in a commercial product you ship to customers** — risky. Don't do it without an explicit grant from the upstream author.

The installer's behavior:
- Prints a license warning before cloning.
- Defaults to "no."
- Even if you opt in, the cloned content goes to a gitignored path.

If you want to use contains-studio safely long-term, [open an issue](https://github.com/contains-studio/agents/issues) on the upstream repo asking the author to publish a license.

## Why claude-mem requires explicit consent

`claude-mem` is **AGPL-3.0**, with a `ragtime/` subdirectory under **PolyForm Noncommercial 1.0.0**.

- **Local dev tool use** — fine for AGPL; PolyForm-NC blocks commercial use of `ragtime/` specifically.
- **Embedding in a network-deployed proprietary product** — AGPL requires you offer source. Don't do this without legal review.

The installer treats it as opt-in and never vendors it (it's installed via `claude plugin install` only, which doesn't redistribute the source through your repo).

## Verification

After install, verify your repo is clean:

```
cd e:/claude_config
git status              # should not show any third-party folder
git ls-files | grep -E "(voltagent|wshobson|contains-studio|gstack|superpowers|impeccable|design-motion|gsap|ui-ux|webgpu|threejs)"
# Should produce no output. If it does, those files have been accidentally committed —
# remove with: git rm -r --cached <path> && commit
```
