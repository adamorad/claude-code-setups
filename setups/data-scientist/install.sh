#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The Data Scientist${RESET}\n${CYAN}@datamind${RESET}\n\n"

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
for pkg in git gh node python@3.13 jq; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

info "Installing Claude Code..."
npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code already installed" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code installed"; }

info "Installing Python data stack..."
python3 -m pip install --quiet --upgrade pip jupyter pandas numpy matplotlib scikit-learn 2>/dev/null \
  && success "Python data packages installed" \
  || warn "pip install failed — install manually: pip install jupyter pandas numpy matplotlib scikit-learn"

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
# Data Scientist Setup

You are working in a Python-first data science environment.

# Priorities
- Prefer pandas/polars for tabular data, numpy for numerical computation
- Always check data shape and types before processing
- Prefer readable, step-by-step code over one-liners in notebooks
- Document assumptions about input data at the top of each function

# Workflow
- Read relevant files before making changes
- For notebooks: keep cells small and idempotent where possible
- Validate output shapes and ranges after transformations
- Ask before modifying datasets or pipelines in production

# Code Style
- Type hints on all Python functions
- Use f-strings over .format()
- Keep data loading, processing, and visualization in separate cells/functions

# Data Handling
- Never commit raw data files — use .gitignore
- Store credentials in environment variables, never in notebooks
EOF
success "CLAUDE.md written"

printf "\n${BOLD}${GREEN}The Data Scientist is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  jupyter lab &                         # start Jupyter\n"
printf "  claude\n\n"
