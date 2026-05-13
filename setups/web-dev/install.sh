#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The Web Dev${RESET}\n${CYAN}@webstudio${RESET}\n\n"

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
for pkg in git gh node deno bun jq; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

info "Installing global npm packages..."
for pkg in @anthropic-ai/claude-code; do
  npm list -g "$pkg" &>/dev/null && success "$pkg already installed" || { npm install -g "$pkg"; success "$pkg installed"; }
done

info "Writing Claude Code config..."
mkdir -p ~/.claude

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
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF
success "settings.json written"

cat > ~/.claude/CLAUDE.md <<'EOF'
# Web Dev Setup

You are working in a frontend/fullstack web development environment.

# Priorities
- Prefer modern JS/TS patterns (ESM, async/await, optional chaining)
- Use Bun for scripts and fast installs; Node for compatibility
- Accessibility matters: flag missing aria labels and contrast issues
- Check bundle size impact when adding dependencies

# Workflow
- Read relevant files before making changes
- Run `bun run typecheck` or equivalent after TypeScript changes
- Prefer small focused components over large monolithic ones
- Ask before upgrading major dependency versions

# Code Style
- Match the existing code style in the file being edited
- No inline styles — use CSS modules or Tailwind classes
- Keep API calls in dedicated service files, not inside components

# Supabase
Supabase plugin is enabled. Use it for auth, database, and storage queries.
EOF
success "CLAUDE.md written"

cat > ~/.claude/keybindings.json <<'EOF'
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [{ "context": "Chat", "bindings": { "ctrl+enter": "chat:submit", "ctrl+g": "chat:externalEditor", "ctrl+s": "chat:stash", "ctrl+r": "history:search" } }]
}
EOF
success "keybindings.json written"

printf "\n${BOLD}${GREEN}The Web Dev is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  claude\n\n"
