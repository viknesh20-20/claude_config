#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Claude Code Config — Setup Script
# Wires this config into a target project directory.
# Usage: bash claude-config/setup.sh [target-project-path]
# Works on: Linux, macOS, Windows (Git Bash / MSYS2 / WSL)
# ============================================================================

CONFIG_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"
TARGET="$(cd "$TARGET" && pwd)"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     Claude Code Config — Setup           ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "  Config source : $CONFIG_DIR"
echo "  Target project: $TARGET"
echo ""

ACTIONS=()

# ---------- Helper ----------
action() {
  ACTIONS+=("$1")
  echo "  [+] $1"
}

skip() {
  echo "  [=] SKIP: $1 (already exists)"
}

# ---------- Detect platform ----------
IS_WINDOWS=false
if [[ "${OSTYPE:-}" == "msys" || "${OSTYPE:-}" == "cygwin" || "${OSTYPE:-}" == "win32" ]]; then
  IS_WINDOWS=true
fi

# ---------- Create directory structure ----------
mkdir -p "$TARGET/.claude/skills"
mkdir -p "$TARGET/.claude/hooks"

# ---------- Copy or symlink skills ----------
if [ -d "$CONFIG_DIR/.claude/skills" ]; then
  for SKILL_DIR in "$CONFIG_DIR/.claude/skills"/*/; do
    SKILL_NAME=$(basename "$SKILL_DIR")
    TARGET_SKILL="$TARGET/.claude/skills/$SKILL_NAME"

    if [ -d "$TARGET_SKILL" ] || [ -L "$TARGET_SKILL" ]; then
      skip "skill: $SKILL_NAME"
    else
      if $IS_WINDOWS; then
        cp -r "$SKILL_DIR" "$TARGET_SKILL"
      else
        ln -s "$SKILL_DIR" "$TARGET_SKILL"
      fi
      action "Installed skill: /$SKILL_NAME"
    fi
  done
fi

# ---------- Copy or symlink hooks ----------
if [ -d "$CONFIG_DIR/.claude/hooks" ]; then
  for HOOK_FILE in "$CONFIG_DIR/.claude/hooks"/*.sh; do
    [ -f "$HOOK_FILE" ] || continue
    HOOK_NAME=$(basename "$HOOK_FILE")
    TARGET_HOOK="$TARGET/.claude/hooks/$HOOK_NAME"

    if [ -f "$TARGET_HOOK" ] || [ -L "$TARGET_HOOK" ]; then
      skip "hook: $HOOK_NAME"
    else
      if $IS_WINDOWS; then
        cp "$HOOK_FILE" "$TARGET_HOOK"
      else
        ln -s "$HOOK_FILE" "$TARGET_HOOK"
      fi
      chmod +x "$HOOK_FILE" 2>/dev/null || true
      action "Installed hook: $HOOK_NAME"
    fi
  done
fi

# ---------- Copy settings.json ----------
if [ -f "$CONFIG_DIR/.claude/settings.json" ]; then
  if [ -f "$TARGET/.claude/settings.json" ]; then
    skip "settings.json"
  else
    cp "$CONFIG_DIR/.claude/settings.json" "$TARGET/.claude/settings.json"
    action "Copied settings.json"
  fi
fi

# ---------- Copy .mcp.json ----------
if [ -f "$CONFIG_DIR/.mcp.json" ]; then
  if [ -f "$TARGET/.mcp.json" ]; then
    skip ".mcp.json"
  else
    cp "$CONFIG_DIR/.mcp.json" "$TARGET/.mcp.json"
    action "Copied .mcp.json"
  fi
fi

# ---------- Create project CLAUDE.md if missing ----------
if [ ! -f "$TARGET/CLAUDE.md" ]; then
  cat > "$TARGET/CLAUDE.md" << 'CLAUDE_EOF'
# Project Instructions

> Customize this file with your project-specific configuration.
> The shared Claude Code config provides universal standards.
> This file adds project-specific context.

## Stack
<!-- Define your stack:
- Language:
- Framework:
- Database:
- Test runner:
- Package manager:
-->

## Build & Dev Commands
<!-- Define your commands:
- Dev server:
- Build:
- Test:
- Lint:
- Type check:
-->

## Architecture
<!-- Brief description of project architecture -->

## Key Conventions
<!-- Project-specific conventions -->

## Known Issues / Tech Debt
<!-- Areas to be careful around -->
CLAUDE_EOF
  action "Created project CLAUDE.md template"
else
  skip "CLAUDE.md"
fi

# ---------- Update .gitignore ----------
GITIGNORE_ENTRIES=(
  "CLAUDE.local.md"
  ".claude/settings.local.json"
  ".env.local"
  ".env*.local"
)

if [ -f "$TARGET/.gitignore" ]; then
  for ENTRY in "${GITIGNORE_ENTRIES[@]}"; do
    if ! grep -qF "$ENTRY" "$TARGET/.gitignore" 2>/dev/null; then
      echo "$ENTRY" >> "$TARGET/.gitignore"
      action "Added $ENTRY to .gitignore"
    fi
  done
else
  {
    echo "# Claude Code — personal overrides"
    for ENTRY in "${GITIGNORE_ENTRIES[@]}"; do
      echo "$ENTRY"
    done
  } > "$TARGET/.gitignore"
  action "Created .gitignore with Claude Code entries"
fi

# ---------- Summary ----------
echo ""
echo "──────────────────────────────────────────"
echo "  Setup complete! ${#ACTIONS[@]} actions taken."
echo "──────────────────────────────────────────"
echo ""
echo "  Next steps:"
echo "    1. Edit CLAUDE.md with your project-specific details"
echo "    2. Edit .mcp.json to add project-specific MCP servers"
echo "    3. Create CLAUDE.local.md for personal notes (gitignored)"
echo "    4. Run 'claude' to start a session with all 20 skills"
echo ""
echo "  Available skills:"
echo "    /review-pr    /write-tests    /optimize       /security-scan"
echo "    /refactor     /explain-code   /fix-issue      /estimate"
echo "    /changelog    /architecture-review  /api-design"
echo "    /create-component  /deploy-checklist  /db-migration"
echo "    /dependency-audit  /git-cleanup  /generate-docs"
echo "    /code-coverage     /debug        /convert-code"
echo ""
