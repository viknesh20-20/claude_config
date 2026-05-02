#!/usr/bin/env bash
# Post-tool-use hook: nudges on UI file writes for common design quality issues.
# Reads JSON from stdin: tool_name, tool_input.file_path, tool_output.
# Does NOT block — only emits stderr warnings the model and the user can read.
# Designed to be cheap (single grep per file) so it runs on every UI write
# without slowing things down.

INPUT="$(cat 2>/dev/null)"
[ -z "$INPUT" ] && exit 0

# Extract the tool name and file path. Pure-bash JSON parsing fails on edge
# cases, so we use python3 if available; otherwise fall back to grep.
if command -v python3 >/dev/null 2>&1; then
  TOOL=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))" 2>/dev/null)
  FILE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)
else
  TOOL=$(echo "$INPUT" | grep -oE '"tool_name"\s*:\s*"[^"]+"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')
  FILE=$(echo "$INPUT" | grep -oE '"file_path"\s*:\s*"[^"]+"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')
fi

# Only run on Edit / Write / MultiEdit
case "$TOOL" in
  Edit|Write|MultiEdit) ;;
  *) exit 0 ;;
esac

[ -z "$FILE" ] && exit 0
[ ! -f "$FILE" ] && exit 0

# Only run on UI files
case "$FILE" in
  *.tsx|*.jsx|*.vue|*.svelte|*.html|*.astro) ;;
  *) exit 0 ;;
esac

WARNINGS=()

# Hex colors in component files (suggest design tokens instead)
if grep -qE '#[0-9a-fA-F]{3,8}\b' "$FILE" 2>/dev/null; then
  COUNT=$(grep -cE '#[0-9a-fA-F]{3,8}\b' "$FILE" 2>/dev/null)
  WARNINGS+=("$COUNT raw hex color(s). Consider design tokens (e.g. var(--color-bg-surface)).")
fi

# Inline pixel values that aren't 1px or 2px (common for borders)
PX_COUNT=$(grep -oE '\b([3-9]|[1-9][0-9]+)px\b' "$FILE" 2>/dev/null | grep -v '^1px\|^2px' | wc -l | tr -d ' ')
if [ -n "$PX_COUNT" ] && [ "$PX_COUNT" -gt 5 ]; then
  WARNINGS+=("$PX_COUNT inline pixel values. Consider spacing tokens (4/8/12/16/24/32/48/64).")
fi

# <img> without alt (heuristic — false positives possible)
if grep -qE '<img[^>]*>' "$FILE" 2>/dev/null; then
  TOTAL=$(grep -cE '<img[^>]*>' "$FILE" 2>/dev/null)
  WITH_ALT=$(grep -cE '<img[^>]*\balt\s*=' "$FILE" 2>/dev/null)
  MISSING=$((TOTAL - WITH_ALT))
  if [ "$MISSING" -gt 0 ]; then
    WARNINGS+=("$MISSING <img> without alt= attribute. Required for accessibility (WCAG 1.1.1).")
  fi
fi

# <button> without visible text or aria-label (rough heuristic)
if grep -qE '<button[^>]*>\s*</button>' "$FILE" 2>/dev/null; then
  WARNINGS+=("Empty <button> element(s). Add visible text or aria-label.")
fi

# outline: none / outline-none without focus-visible replacement (focus state required by WCAG 2.4.7)
if grep -qE 'outline\s*:\s*none|outline-none' "$FILE" 2>/dev/null; then
  if ! grep -qE 'focus-visible|focus:|:focus' "$FILE" 2>/dev/null; then
    WARNINGS+=("outline:none/outline-none without focus-visible replacement. Visible focus is required by WCAG 2.4.7.")
  fi
fi

# Inline style with multiple properties (suggest moving to a class / token)
if grep -cE 'style\s*=\s*[`"{]' "$FILE" 2>/dev/null | head -1 | awk '{exit !($1 > 3)}'; then
  WARNINGS+=("Multiple inline style attributes. Consider moving to a class or design token.")
fi

# Plain <div onClick> (should usually be a <button>)
if grep -qE '<div[^>]*\bon[Cc]lick\s*=' "$FILE" 2>/dev/null; then
  WARNINGS+=("<div onClick=...> found. Use <button> for click-to-act elements (keyboard reachable, screen reader sensible — WCAG 2.1.1).")
fi

# Emit warnings to stderr (the model and user see these)
if [ "${#WARNINGS[@]}" -gt 0 ]; then
  echo "" >&2
  echo "[design-quality-check] $FILE" >&2
  for W in "${WARNINGS[@]}"; do
    echo "  • $W" >&2
  done
  echo "  Run /a11y-audit or /design-flow if these matter for this file." >&2
  echo "" >&2
fi

# Never block — these are nudges, not enforcement.
exit 0
