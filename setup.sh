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
echo "╔══════════════════════════════════════════════════════╗"
echo "║     Claude Code Config — Setup                      ║"
echo "║     30 skills · 8 agents · 9 rules · 2 hooks       ║"
echo "╚══════════════════════════════════════════════════════╝"
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

install_dir() {
  local SRC_DIR="$1"
  local DST_DIR="$2"
  local LABEL="$3"

  if [ -d "$SRC_DIR" ]; then
    for ITEM in "$SRC_DIR"/*/; do
      [ -d "$ITEM" ] || continue
      local NAME=$(basename "$ITEM")
      local DST="$DST_DIR/$NAME"

      if [ -d "$DST" ] || [ -L "$DST" ]; then
        skip "$LABEL: $NAME"
      else
        if $IS_WINDOWS; then
          cp -r "$ITEM" "$DST"
        else
          ln -s "$ITEM" "$DST"
        fi
        action "Installed $LABEL: $NAME"
      fi
    done
  fi
}

install_files() {
  local SRC_DIR="$1"
  local DST_DIR="$2"
  local LABEL="$3"
  local EXT="${4:-md}"

  if [ -d "$SRC_DIR" ]; then
    for ITEM in "$SRC_DIR"/*."$EXT"; do
      [ -f "$ITEM" ] || continue
      local NAME=$(basename "$ITEM")
      local DST="$DST_DIR/$NAME"

      if [ -f "$DST" ] || [ -L "$DST" ]; then
        skip "$LABEL: $NAME"
      else
        if $IS_WINDOWS; then
          cp "$ITEM" "$DST"
        else
          ln -s "$ITEM" "$DST"
        fi
        action "Installed $LABEL: $NAME"
      fi
    done
  fi
}

# ---------- Create directory structure ----------
mkdir -p "$TARGET/.claude/skills"
mkdir -p "$TARGET/.claude/hooks"
mkdir -p "$TARGET/.claude/agents"
mkdir -p "$TARGET/.claude/rules"

# ---------- Install skills (30 skill directories) ----------
echo "  Installing skills..."
install_dir "$CONFIG_DIR/.claude/skills" "$TARGET/.claude/skills" "skill"

# ---------- Install agents (8 agent files) ----------
echo "  Installing agents..."
install_files "$CONFIG_DIR/.claude/agents" "$TARGET/.claude/agents" "agent" "md"

# ---------- Install rules (9 rule files) ----------
echo "  Installing rules..."
install_files "$CONFIG_DIR/.claude/rules" "$TARGET/.claude/rules" "rule" "md"

# ---------- Install hooks ----------
echo "  Installing hooks..."
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
> Universal rules auto-load from .claude/rules/.

## Stack
<!-- Language, framework, database, test runner, package manager -->

## Build & Dev Commands
<!-- dev server, build, test, lint, type check -->

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
echo "══════════════════════════════════════════════════════"
echo "  Setup complete! ${#ACTIONS[@]} actions taken."
echo "══════════════════════════════════════════════════════"
echo ""
echo "  What was installed:"
echo "    - 30 skills     (type / in Claude Code to see them)"
echo "    - 8 agents      (specialized autonomous agents)"
echo "    - 9 rules       (auto-loaded coding standards)"
echo "    - 2 hooks       (safety gate + post-execution)"
echo "    - 4 MCP servers (fetch, filesystem, github, memory)"
echo ""
echo "  Next steps:"
echo "    1. Edit CLAUDE.md with your project-specific details"
echo "    2. Edit .mcp.json to add project-specific MCP servers"
echo "    3. Set GITHUB_PERSONAL_ACCESS_TOKEN for GitHub MCP"
echo "    4. Create CLAUDE.local.md for personal notes (gitignored)"
echo "    5. Run 'claude' to start a session"
echo ""
echo "  Skill categories:"
echo "    Code Quality : /review-pr /refactor /explain-code"
echo "    Testing      : /write-tests /code-coverage /tdd"
echo "    Security     : /security-scan /dependency-audit"
echo "    Performance  : /optimize"
echo "    Architecture : /architecture-review /api-design /create-component"
echo "    DevOps       : /deploy-checklist /db-migration /git-cleanup"
echo "                   /ci-pipeline /docker-setup /env-setup"
echo "    Project Mgmt : /fix-issue /estimate /changelog /pr-summary"
echo "    Utilities    : /generate-docs /debug /convert-code"
echo "                   /onboard /migrate-framework /error-monitor"
echo "    Meta         : /write-skill /grill-me"
echo ""
