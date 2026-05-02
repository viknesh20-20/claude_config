#!/usr/bin/env bash
# Claude Code Toolkit — bootstrap.sh
# Detects Node.js >= 18, then exec's install.mjs. Pass-through args.

set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or not on PATH."
  echo "Install Node 18+ from https://nodejs.org/ and re-run this script."
  exit 1
fi

ver="$(node --version)"
major="$(echo "$ver" | sed -n 's/^v\([0-9]\+\).*/\1/p')"
if [ -z "$major" ] || [ "$major" -lt 18 ]; then
  echo "Node $ver is too old. Need Node 18+."
  exit 1
fi

exec node "$here/install.mjs" "$@"
