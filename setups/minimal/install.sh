#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The Minimalist${RESET}\n${CYAN}@tinystack${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "Targets macOS only."

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

info "Installing packages..."
for pkg in git gh node; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code already installed" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code installed"; }

info "Writing Claude Code config..."
mkdir -p ~/.claude

[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "Backed up existing settings.json"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "theme": "dark"
}
EOF
success "settings.json written"

cat > ~/.claude/CLAUDE.md <<'EOF'
# Preferences
- Be concise and direct
- Prefer editing existing files over creating new ones
- Read relevant files before making changes
- Ask before doing anything destructive
- Match the existing code style in the file being edited
EOF
success "CLAUDE.md written"

printf "\n${BOLD}${GREEN}The Minimalist is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  claude\n\n"
