#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Claude Code Config — Interactive Installer
# Full setup with optional API key/secret configuration per MCP server.
# Usage: bash claude-config/install.sh [target-project-path]
# Works on: Linux, macOS, Windows (Git Bash / MSYS2 / WSL)
# ============================================================================

CONFIG_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"
mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"

# ---------- Colors & formatting ----------
if [[ -t 1 ]]; then
  BOLD="\033[1m"
  DIM="\033[2m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  CYAN="\033[36m"
  RED="\033[31m"
  RESET="\033[0m"
else
  BOLD="" DIM="" GREEN="" YELLOW="" CYAN="" RED="" RESET=""
fi

header() { echo -e "\n${BOLD}${CYAN}$1${RESET}"; }
success() { echo -e "  ${GREEN}[+]${RESET} $1"; }
warn() { echo -e "  ${YELLOW}[!]${RESET} $1"; }
info() { echo -e "  ${DIM}$1${RESET}"; }
skip_msg() { echo -e "  ${DIM}[=] SKIP: $1${RESET}"; }

# ---------- Banner ----------
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║       Claude Code Config — Interactive Installer        ║${RESET}"
echo -e "${BOLD}║   30 skills · 8 agents · 9 rules · 30 MCP · 2 hooks    ║${RESET}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  Config source : ${CYAN}$CONFIG_DIR${RESET}"
echo -e "  Target project: ${CYAN}$TARGET${RESET}"
echo ""

ACTIONS=()
action() { ACTIONS+=("$1"); success "$1"; }

# ---------- Detect platform ----------
IS_WINDOWS=false
if [[ "${OSTYPE:-}" == "msys" || "${OSTYPE:-}" == "cygwin" || "${OSTYPE:-}" == "win32" ]]; then
  IS_WINDOWS=true
fi

# ---------- Prompt helpers ----------
ask_yes_no() {
  local prompt="$1"
  local default="${2:-y}"
  local hint="Y/n"
  [[ "$default" == "n" ]] && hint="y/N"
  echo -en "  ${BOLD}$prompt${RESET} [$hint]: "
  read -r answer </dev/tty
  answer="${answer:-$default}"
  [[ "$answer" =~ ^[Yy] ]]
}

ask_secret() {
  local var_name="$1"
  local description="$2"
  local current="${!var_name:-}"

  if [[ -n "$current" ]]; then
    local masked="${current:0:4}****${current: -4}"
    echo -en "  ${var_name} ${DIM}(current: $masked)${RESET} — keep existing? [Y/n]: "
    read -r answer </dev/tty
    answer="${answer:-y}"
    if [[ "$answer" =~ ^[Yy] ]]; then
      return 0
    fi
  fi

  echo -en "  ${var_name} ${DIM}($description)${RESET}: "
  read -r value </dev/tty
  if [[ -n "$value" ]]; then
    eval "export $var_name=\"$value\""
    ENV_VARS_SET+=("$var_name=$value")
    return 0
  fi
  return 1
}

# ---------- Install helpers ----------
install_dir() {
  local SRC_DIR="$1" DST_DIR="$2" LABEL="$3"
  if [ -d "$SRC_DIR" ]; then
    for ITEM in "$SRC_DIR"/*/; do
      [ -d "$ITEM" ] || continue
      local NAME=$(basename "$ITEM")
      local DST="$DST_DIR/$NAME"
      if [ -d "$DST" ] || [ -L "$DST" ]; then
        skip_msg "$LABEL: $NAME"
      else
        if $IS_WINDOWS; then cp -r "$ITEM" "$DST"; else ln -s "$ITEM" "$DST"; fi
        action "Installed $LABEL: $NAME"
      fi
    done
  fi
}

install_files() {
  local SRC_DIR="$1" DST_DIR="$2" LABEL="$3" EXT="${4:-md}"
  if [ -d "$SRC_DIR" ]; then
    for ITEM in "$SRC_DIR"/*."$EXT"; do
      [ -f "$ITEM" ] || continue
      local NAME=$(basename "$ITEM")
      local DST="$DST_DIR/$NAME"
      if [ -f "$DST" ] || [ -L "$DST" ]; then
        skip_msg "$LABEL: $NAME"
      else
        if $IS_WINDOWS; then cp "$ITEM" "$DST"; else ln -s "$ITEM" "$DST"; fi
        action "Installed $LABEL: $NAME"
      fi
    done
  fi
}

# ============================================================================
# PHASE 1: Install config files
# ============================================================================
header "Phase 1/3 — Installing config files"

mkdir -p "$TARGET/.claude/skills"
mkdir -p "$TARGET/.claude/hooks"
mkdir -p "$TARGET/.claude/agents"
mkdir -p "$TARGET/.claude/rules"

echo "  Installing skills..."
install_dir "$CONFIG_DIR/.claude/skills" "$TARGET/.claude/skills" "skill"

echo "  Installing agents..."
install_files "$CONFIG_DIR/.claude/agents" "$TARGET/.claude/agents" "agent" "md"

echo "  Installing rules..."
install_files "$CONFIG_DIR/.claude/rules" "$TARGET/.claude/rules" "rule" "md"

echo "  Installing hooks..."
if [ -d "$CONFIG_DIR/.claude/hooks" ]; then
  for HOOK_FILE in "$CONFIG_DIR/.claude/hooks"/*.sh; do
    [ -f "$HOOK_FILE" ] || continue
    HOOK_NAME=$(basename "$HOOK_FILE")
    TARGET_HOOK="$TARGET/.claude/hooks/$HOOK_NAME"
    if [ -f "$TARGET_HOOK" ] || [ -L "$TARGET_HOOK" ]; then
      skip_msg "hook: $HOOK_NAME"
    else
      if $IS_WINDOWS; then cp "$HOOK_FILE" "$TARGET_HOOK"; else ln -s "$HOOK_FILE" "$TARGET_HOOK"; fi
      chmod +x "$HOOK_FILE" 2>/dev/null || true
      action "Installed hook: $HOOK_NAME"
    fi
  done
fi

if [ -f "$CONFIG_DIR/.claude/settings.json" ]; then
  if [ -f "$TARGET/.claude/settings.json" ]; then
    skip_msg "settings.json"
  else
    cp "$CONFIG_DIR/.claude/settings.json" "$TARGET/.claude/settings.json"
    action "Copied settings.json"
  fi
fi

if [ -f "$CONFIG_DIR/.mcp.json" ]; then
  if [ -f "$TARGET/.mcp.json" ]; then
    skip_msg ".mcp.json"
  else
    cp "$CONFIG_DIR/.mcp.json" "$TARGET/.mcp.json"
    action "Copied .mcp.json"
  fi
fi

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
  skip_msg "CLAUDE.md"
fi

# ---------- .gitignore ----------
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
    for ENTRY in "${GITIGNORE_ENTRIES[@]}"; do echo "$ENTRY"; done
  } > "$TARGET/.gitignore"
  action "Created .gitignore with Claude Code entries"
fi

# ============================================================================
# PHASE 2: MCP Server Secrets Configuration
# ============================================================================
header "Phase 2/3 — Configure MCP server API keys & secrets"
echo ""
echo -e "  Each MCP server that needs credentials will be shown below."
echo -e "  Enter the value, or press ${BOLD}Enter${RESET} to skip."
echo -e "  You can always set these later in your shell profile or .env.local"
echo ""

ENV_VARS_SET=()
SKIPPED_VARS=()

configure_service() {
  local service_name="$1"
  local description="$2"
  shift 2
  local vars=("$@")

  echo ""
  echo -e "  ${BOLD}── $service_name${RESET} ${DIM}($description)${RESET}"

  if ! ask_yes_no "Configure $service_name?" "n"; then
    for var in "${vars[@]}"; do
      local var_name="${var%%|*}"
      SKIPPED_VARS+=("$var_name")
    done
    info "Skipped — configure later in .env.local"
    return
  fi

  for var in "${vars[@]}"; do
    local var_name="${var%%|*}"
    local var_desc="${var#*|}"
    if ! ask_secret "$var_name" "$var_desc"; then
      SKIPPED_VARS+=("$var_name")
      info "Skipped $var_name"
    fi
  done
}

# --- Version Control ---
header "  Version Control & Code Platforms"
configure_service "GitHub" "PRs, issues, repo operations" \
  "GITHUB_PERSONAL_ACCESS_TOKEN|GitHub personal access token"

configure_service "GitLab" "merge requests, issues, CI pipelines" \
  "GITLAB_PERSONAL_ACCESS_TOKEN|GitLab personal access token" \
  "GITLAB_API_URL|GitLab API URL, e.g. https://gitlab.com/api/v4"

# --- Frontend & Design ---
header "  Frontend & Design"
configure_service "Figma" "design-to-code, components, layout" \
  "FIGMA_ACCESS_TOKEN|Figma personal access token"

# --- Search & Research ---
header "  Search & Research"
configure_service "Brave Search" "web search from Claude" \
  "BRAVE_API_KEY|Brave Search API key"

configure_service "Perplexity" "AI-powered research with citations" \
  "PERPLEXITY_API_KEY|Perplexity API key"

configure_service "Firecrawl" "web scraping & crawling" \
  "FIRECRAWL_API_KEY|Firecrawl API key"

# --- Databases ---
header "  Databases"
configure_service "PostgreSQL" "database operations" \
  "POSTGRES_CONNECTION_STRING|connection string, e.g. postgresql://user:pass@host:5432/db"

configure_service "MongoDB" "queries & Atlas management" \
  "MONGODB_URI|connection URI, e.g. mongodb+srv://user:pass@cluster.mongodb.net/db"

configure_service "Redis" "cache & data store" \
  "REDIS_URL|Redis URL, e.g. redis://localhost:6379"

configure_service "Supabase" "Postgres, auth, edge functions" \
  "SUPABASE_URL|Supabase project URL" \
  "SUPABASE_API_KEY|Supabase API key (anon or service role)"

# --- Infrastructure ---
header "  Infrastructure & Deployment"
configure_service "Cloudflare" "DNS, Workers, R2, Zero Trust" \
  "CLOUDFLARE_API_TOKEN|Cloudflare API token" \
  "CLOUDFLARE_ACCOUNT_ID|Cloudflare account ID"

# --- Payments ---
header "  Payments & Commerce"
configure_service "Stripe" "payments, subscriptions, customers" \
  "STRIPE_SECRET_KEY|Stripe secret key (sk_live_... or sk_test_...)"

# --- Communication ---
header "  Communication"
configure_service "Slack" "team messaging & channels" \
  "SLACK_BOT_TOKEN|Slack bot token (xoxb-...)" \
  "SLACK_TEAM_ID|Slack workspace/team ID"

configure_service "Twilio" "SMS, voice, communications" \
  "TWILIO_ACCOUNT_SID|Twilio account SID" \
  "TWILIO_AUTH_TOKEN|Twilio auth token"

# --- Project Management ---
header "  Project Management"
configure_service "Notion" "knowledge base & docs" \
  "NOTION_TOKEN|Notion integration token (secret_...)"

configure_service "Linear" "issue tracking & sprints" \
  "LINEAR_API_KEY|Linear API key"

# --- Monitoring ---
header "  Monitoring & Error Tracking"
configure_service "Sentry" "error tracking & crash monitoring" \
  "SENTRY_ACCESS_TOKEN|Sentry auth token"

# --- AI & ML ---
header "  AI & ML"
configure_service "Hugging Face" "models, datasets, Spaces" \
  "HF_TOKEN|Hugging Face access token (hf_...)"

# ============================================================================
# PHASE 3: Save secrets
# ============================================================================
header "Phase 3/3 — Saving configuration"

if [[ ${#ENV_VARS_SET[@]} -gt 0 ]]; then
  echo ""
  echo -e "  ${BOLD}Where should secrets be saved?${RESET}"
  echo ""
  echo "    1) .env.local in project directory  (gitignored, project-scoped)"
  echo "    2) Shell profile (~/.bashrc or ~/.zshrc)  (global, all projects)"
  echo "    3) Both"
  echo "    4) Don't save — I'll set them manually"
  echo ""
  echo -en "  ${BOLD}Choice${RESET} [1]: "
  read -r save_choice </dev/tty
  save_choice="${save_choice:-1}"

  save_to_env_local() {
    local ENV_FILE="$TARGET/.env.local"
    {
      [[ -f "$ENV_FILE" ]] && echo "" # newline separator if appending
      echo "# Claude Code MCP server secrets — generated by install.sh"
      echo "# $(date '+%Y-%m-%d %H:%M:%S')"
      for entry in "${ENV_VARS_SET[@]}"; do
        local key="${entry%%=*}"
        local val="${entry#*=}"
        echo "export $key=\"$val\""
      done
    } >> "$ENV_FILE"
    action "Saved ${#ENV_VARS_SET[@]} secret(s) to .env.local"

    # make sure .env.local is gitignored
    if [ -f "$TARGET/.gitignore" ]; then
      if ! grep -qF ".env.local" "$TARGET/.gitignore" 2>/dev/null; then
        echo ".env.local" >> "$TARGET/.gitignore"
      fi
    fi
  }

  save_to_shell_profile() {
    local PROFILE=""
    if [ -f "$HOME/.zshrc" ]; then
      PROFILE="$HOME/.zshrc"
    elif [ -f "$HOME/.bashrc" ]; then
      PROFILE="$HOME/.bashrc"
    elif [ -f "$HOME/.bash_profile" ]; then
      PROFILE="$HOME/.bash_profile"
    else
      PROFILE="$HOME/.bashrc"
    fi
    {
      echo ""
      echo "# Claude Code MCP server secrets — generated by install.sh"
      echo "# $(date '+%Y-%m-%d %H:%M:%S')"
      for entry in "${ENV_VARS_SET[@]}"; do
        local key="${entry%%=*}"
        local val="${entry#*=}"
        echo "export $key=\"$val\""
      done
    } >> "$PROFILE"
    action "Saved ${#ENV_VARS_SET[@]} secret(s) to $PROFILE"
  }

  case "$save_choice" in
    1) save_to_env_local ;;
    2) save_to_shell_profile ;;
    3) save_to_env_local; save_to_shell_profile ;;
    4) info "Secrets not saved — set them manually before using MCP servers" ;;
    *) save_to_env_local ;;
  esac
else
  info "No secrets entered — skipping save step"
fi

# ---------- Load instructions ----------
if [[ ${#ENV_VARS_SET[@]} -gt 0 && ("${save_choice:-}" == "1" || "${save_choice:-}" == "3") ]]; then
  echo ""
  warn "To load secrets in your current terminal, run:"
  echo -e "    ${CYAN}source $TARGET/.env.local${RESET}"
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
echo -e "${BOLD}══════════════════════════════════════════════════════════${RESET}"
echo -e "  ${GREEN}${BOLD}Setup complete!${RESET} ${#ACTIONS[@]} actions taken."
echo -e "${BOLD}══════════════════════════════════════════════════════════${RESET}"
echo ""
echo "  What was installed:"
echo "    - 30 skills     (type / in Claude Code to see them)"
echo "    - 8 agents      (specialized autonomous agents)"
echo "    - 9 rules       (auto-loaded coding standards)"
echo "    - 2 hooks       (safety gate + post-execution)"
echo "    - 30 MCP servers"
echo ""

if [[ ${#ENV_VARS_SET[@]} -gt 0 ]]; then
  echo -e "  ${GREEN}Configured secrets (${#ENV_VARS_SET[@]}):${RESET}"
  for entry in "${ENV_VARS_SET[@]}"; do
    echo -e "    ${GREEN}✓${RESET} ${entry%%=*}"
  done
  echo ""
fi

if [[ ${#SKIPPED_VARS[@]} -gt 0 ]]; then
  echo -e "  ${YELLOW}Skipped (set later in .env.local or shell profile):${RESET}"
  # deduplicate
  printf '%s\n' "${SKIPPED_VARS[@]}" | sort -u | while read -r var; do
    echo -e "    ${DIM}○${RESET} $var"
  done
  echo ""
fi

echo "  Next steps:"
echo "    1. Edit CLAUDE.md with your project-specific details"
echo "    2. Create CLAUDE.local.md for personal notes (gitignored)"
echo "    3. Run 'claude' to start a session"
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
