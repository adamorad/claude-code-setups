#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The AI Builder${RESET}\n${CYAN}@aicraft${RESET}\n\n"

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

info "Installing global npm packages..."
for pkg in ruflo @anthropic-ai/claude-code; do
  npm list -g "$pkg" &>/dev/null && success "$pkg already installed" || { npm install -g "$pkg"; success "$pkg installed"; }
done

info "Installing Python AI tooling..."
python3 -m pip install --quiet --upgrade pip jupyter langchain 2>/dev/null && success "Python AI packages installed" || warn "pip install failed — install manually"

info "Writing Claude Code config..."
mkdir -p ~/.claude/commands/tools

[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "Backed up existing settings.json"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"'" }] }],
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path // empty' | xargs -I {} sh -c 'npx prettier --write \"{}\" 2>/dev/null || true'" }] }]
  },
  "mcpServers": { "ruflo": { "command": "/opt/homebrew/bin/ruflo", "args": ["mcp", "start"] } }
}
EOF
success "settings.json written"

cat > ~/.claude/CLAUDE.md <<'EOF'
# AI Builder Setup

You are working in an AI/ML-focused development environment.

# Priorities
- Prefer Python for data processing and model code
- Use LangChain/LangGraph patterns for agent workflows
- Always consider token efficiency in prompt design
- Validate model outputs before using them downstream

# Workflow
- Read relevant files before making changes
- For AI/ML code: explain the architecture choice briefly after writing it
- Test with small inputs before scaling up
- Ask before modifying training data or model configs

# Code Style
- Type hints on all Python functions
- Keep prompts in separate .txt or .md files, not inline strings
- Avoid over-engineering agent pipelines

# Ruflo Orchestration
Ruflo MCP tools are available. Use them for:
- Multi-agent tasks: `mcp__ruflo__swarm_*`
- Cross-session memory: `mcp__ruflo__memory_*`
EOF
success "CLAUDE.md written"

cat > ~/.claude/keybindings.json <<'EOF'
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [{ "context": "Chat", "bindings": { "ctrl+enter": "chat:submit", "ctrl+r": "history:search" } }]
}
EOF
success "keybindings.json written"

printf "\n${BOLD}${GREEN}The AI Builder is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  export OPENAI_API_KEY=sk-...          # if using OpenAI models too\n"
printf "  gh auth login\n"
printf "  claude\n\n"
