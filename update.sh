#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Claude Code Config — Update Script
# Pulls the latest config from the remote repository.
# Usage: bash claude-config/update.sh
# ============================================================================

CONFIG_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║     Claude Code Config — Update                     ║"
echo "║     30 skills · 8 agents · 9 rules · 2 hooks       ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Pull latest if this is a git repo
if [ -d "$CONFIG_DIR/.git" ]; then
  echo "  Pulling latest from remote..."
  cd "$CONFIG_DIR"
  git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || echo "  Warning: Could not pull from remote. Are you offline?"
  echo ""
  echo "  Config updated successfully!"
else
  echo "  This is not a git repository."
  echo "  To enable updates, push this config to GitHub and clone it."
fi

echo ""
echo "  Next steps:"
echo "    1. Re-run setup.sh on your projects to sync new skills/agents/rules:"
echo "       bash $CONFIG_DIR/setup.sh /path/to/your/project"
echo ""
echo "    2. If using as a git submodule, commit the pointer update:"
echo "       git add claude-config && git commit -m 'chore: update claude-config'"
echo ""
