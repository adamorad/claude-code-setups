#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The DevOps Engineer${RESET}\n${CYAN}@opsforge${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "Targets macOS only."
[[ "$(uname -m)" != "arm64" ]] && warn "Optimised for Apple Silicon."

info "Checking Xcode CLI tools..."
if ! xcode-select -p &>/dev/null; then
  warn "Xcode CLI tools missing. Launching installer — re-run after."
  xcode-select --install; exit 1
fi; success "Xcode CLI tools present"

info "Checking Homebrew..."
if ! command -v brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
else success "Homebrew $(brew --version | head -1)"; fi

info "Installing Homebrew packages..."
for pkg in git gh node jq kubectl helm terraform; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

info "Installing Claude Code..."
npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code already installed" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code installed"; }

info "Writing Claude Code config..."
mkdir -p ~/.claude

[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "Backed up existing settings.json"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"'" }] }]
  }
}
EOF
success "settings.json written"

cat > ~/.claude/CLAUDE.md <<'EOF'
# DevOps Setup

You are working in an infrastructure and platform engineering environment.

# Priorities
- Immutable infrastructure: prefer replace over mutate
- Everything as code — no manual console changes
- Principle of least privilege on all IAM/RBAC configs
- Changes to production infra require explicit confirmation

# Workflow
- Read existing manifests/configs before making changes
- For Kubernetes: `kubectl diff` before `kubectl apply`
- For Terraform: always plan before apply
- Ask before any destructive infrastructure changes (scale to 0, delete, drain)
- Validate YAML syntax before applying

# Code Style
- YAML: 2-space indent, explicit quotes on strings that look like numbers
- Shell scripts: set -euo pipefail, quote all variables
- Keep secrets in environment variables or secret managers, never in code

# Naming
- Follow existing naming conventions in the cluster/repo
- Label all resources with app, env, and owner tags
EOF
success "CLAUDE.md written"

cat > ~/.claude/keybindings.json <<'EOF'
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [{ "context": "Chat", "bindings": { "ctrl+enter": "chat:submit", "ctrl+r": "history:search" } }]
}
EOF
success "keybindings.json written"

printf "\n${BOLD}${GREEN}The DevOps Engineer is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  kubectl config get-contexts           # verify cluster access\n"
printf "  claude\n\n"
