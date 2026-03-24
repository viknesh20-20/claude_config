#!/usr/bin/env bash
# Post-tool-use hook: runs after every tool execution
# Reads JSON from stdin with: tool_name, tool_input, tool_output
# Does NOT use set -e — this hook must never block Claude

# Currently a passthrough — extend as needed.
#
# Example extensions you could add:
#
# 1. Auto-lint after file edits:
#    if [ "$TOOL" = "Write" ] || [ "$TOOL" = "Edit" ]; then
#      FILE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)
#      case "$FILE" in
#        *.ts|*.tsx|*.js|*.jsx) npx eslint "$FILE" --fix --quiet 2>/dev/null ;;
#        *.py) ruff check "$FILE" --fix --quiet 2>/dev/null ;;
#        *.go) gofmt -w "$FILE" 2>/dev/null ;;
#        *.rs) rustfmt "$FILE" 2>/dev/null ;;
#      esac
#    fi
#
# 2. Log all file modifications:
#    echo "[$(date)] $TOOL: $FILE" >> .claude/audit.log
#
# 3. Track time spent:
#    echo "[$(date)] tool=$TOOL" >> .claude/timing.log

exit 0
