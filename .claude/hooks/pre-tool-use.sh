#!/usr/bin/env bash
set -e

# Pre-tool-use hook: safety checks before tool execution
# Reads JSON from stdin with: tool_name, tool_input
# Responds with JSON: {"decision": "allow|block", "reason": "..."}

INPUT=$(cat)
TOOL=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null || echo "")
TOOL_INPUT=$(echo "$INPUT" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin).get('tool_input',{})))" 2>/dev/null || echo "{}")

# --- Bash command safety checks ---
if [ "$TOOL" = "Bash" ]; then
  CMD=$(echo "$TOOL_INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null || echo "")

  # Block destructive rm -rf on critical paths
  if echo "$CMD" | grep -qE 'rm\s+-rf\s+(/|/\*|~|\$HOME|/home|/Users|/root|/etc|/var|/usr|C:\\)'; then
    echo '{"decision": "block", "reason": "BLOCKED: Destructive rm -rf on a critical system path. Specify a safe target directory instead."}'
    exit 0
  fi

  # Block piping remote scripts to shell
  if echo "$CMD" | grep -qE '(curl|wget)\s+.*\|\s*(bash|sh|zsh)'; then
    echo '{"decision": "block", "reason": "BLOCKED: Piping remote content to a shell is not permitted. Download the script first, review it, then execute."}'
    exit 0
  fi

  # Block force push without branch specification
  if echo "$CMD" | grep -qE 'git\s+push\s+.*--force\s*$'; then
    echo '{"decision": "block", "reason": "BLOCKED: Force push requires explicit user approval. Use git push --force-with-lease for safer force pushing."}'
    exit 0
  fi

  # Block sudo commands
  if echo "$CMD" | grep -qE '^\s*sudo\s+'; then
    echo '{"decision": "block", "reason": "BLOCKED: sudo commands require explicit user approval. Run without sudo or ask the user."}'
    exit 0
  fi
fi

# --- File write safety checks ---
if [ "$TOOL" = "Write" ] || [ "$TOOL" = "Edit" ] || [ "$TOOL" = "MultiEdit" ]; then
  FILE_PATH=$(echo "$TOOL_INPUT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(d.get('file_path', d.get('path', '')))
" 2>/dev/null || echo "")

  # Block writes to .env files
  if echo "$FILE_PATH" | grep -qE '(^|/)\.env($|\.|/)'; then
    echo '{"decision": "block", "reason": "BLOCKED: Writing to .env files is not permitted. Use .env.example for templates or set environment variables directly."}'
    exit 0
  fi

  # Block writes to lock files
  if echo "$FILE_PATH" | grep -qE '(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Cargo\.lock|poetry\.lock|Gemfile\.lock|go\.sum|composer\.lock)$'; then
    echo '{"decision": "block", "reason": "BLOCKED: Lock files should not be edited manually. Use the package manager to update dependencies."}'
    exit 0
  fi

  # Block writes to .git directory
  if echo "$FILE_PATH" | grep -qE '(^|/)\.git/'; then
    echo '{"decision": "block", "reason": "BLOCKED: Direct writes to .git/ directory are not permitted. Use git commands instead."}'
    exit 0
  fi
fi

# Allow everything else
echo '{"decision": "allow"}'
