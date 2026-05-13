#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The Full Dev Stack${RESET}\n${CYAN}@adamorad${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "Targets macOS only."
[[ "$(uname -m)" != "arm64" ]] && warn "Optimised for Apple Silicon — paths may differ on Intel."

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
for pkg in git gh node deno bun python@3.13 jq; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

info "Installing global npm packages..."
for pkg in ruflo @anthropic-ai/claude-code; do
  npm list -g "$pkg" &>/dev/null && success "$pkg already installed" || { npm install -g "$pkg"; success "$pkg installed"; }
done

info "Writing Claude Code config..."
mkdir -p ~/.claude/commands/tools ~/.claude/commands/workflows ~/.claude/skills

[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "Backed up existing settings.json"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "statusLine": { "type": "command", "command": "bash ~/.claude/statusline.sh" },
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"'" }] }],
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path // empty' | xargs -I {} sh -c 'npx prettier --write \"{}\" 2>/dev/null || true'" }] }]
  },
  "mcpServers": { "ruflo": { "command": "/opt/homebrew/bin/ruflo", "args": ["mcp", "start"] } },
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF
success "settings.json written"

cat > ~/.claude/CLAUDE.md <<'EOF'
# General Preferences
- Be concise and direct
- Prefer editing existing files over creating new ones
- Don't add comments or refactor beyond what was asked

# Workflow
- Read relevant files before making changes
- Run tests after code changes when a test suite exists
- Ask before doing anything destructive

# Code Style
- Match the existing code style in the file being edited
- Avoid over-engineering

# Token Efficiency
- Code first, explanation after only if non-obvious
- Never speculate about a bug without reading the code first

# Ruflo Orchestration
Ruflo MCP tools are available. Use them for:
- Multi-agent tasks: `mcp__ruflo__swarm_*`
- Consensus decisions: `mcp__ruflo__hive-mind_*`
- Cross-session memory: `mcp__ruflo__memory_*`
EOF
success "CLAUDE.md written"

cat > ~/.claude/statusline.sh <<'EOF'
#!/usr/bin/env bash
input=$(cat)
time_str=$(date +%H:%M)
model=$(echo "$input" | jq -r '.model.display_name // "CLAUDE"')
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // ""')
dir=$(basename "$cwd")
ctx_part=""; [ -n "$used_pct" ] && ctx_part="  CTX $(printf '%.0f' "$used_pct")%"
five_pct=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
rate_part=""; [ -n "$five_pct" ] && rate_part="  5H $(printf '%.0f' "$five_pct")%"
dir_part=""; [ -n "$dir" ] && [ "$dir" != "." ] && dir_part="  $dir"
printf "\033[36m⬡ CLAUDE\033[0m  \033[97m%s\033[0m  \033[32m◆ ONLINE\033[0m\033[90m%s%s%s\033[0m" "$time_str" "$dir_part" "$ctx_part" "$rate_part"
EOF
chmod +x ~/.claude/statusline.sh; success "statusline.sh written"

cat > ~/.claude/keybindings.json <<'EOF'
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [{ "context": "Chat", "bindings": { "ctrl+enter": "chat:submit", "ctrl+g": "chat:externalEditor", "ctrl+s": "chat:stash", "ctrl+r": "history:search" } }]
}
EOF
success "keybindings.json written"

printf "\n${BOLD}${GREEN}The Full Dev Stack is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  claude\n\n"
