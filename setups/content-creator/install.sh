#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}Claude Code — The Content Creator${RESET}\n${CYAN}@contentcraft${RESET}\n\n"

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
for pkg in git gh node jq; do
  brew list "$pkg" &>/dev/null && success "$pkg already installed" || { brew install "$pkg"; success "$pkg installed"; }
done

info "Installing Claude Code..."
npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code already installed" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code installed"; }

info "Writing Claude Code config..."
mkdir -p ~/.claude/skills/israeli-linkedin-strategy/references
mkdir -p ~/.claude/skills/israeli-social-content/references

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
# Content Creator Setup

You are working in a content and technical writing environment.

# Priorities
- Clarity over cleverness — write for the reader, not to impress
- Match the brand voice and tone of the existing content
- Hebrew content: use modern, conversational Israeli Hebrew (not formal)
- Always consider the platform context (LinkedIn ≠ Instagram ≠ blog)

# Workflow
- Read existing content samples before drafting new pieces
- Ask about target audience and platform before writing
- For social posts: draft 2-3 variations and let the user choose
- For docs: propose outline first, write after approval

# Content Guidelines
- No jargon unless the audience is clearly technical
- Short paragraphs for social; structured headers for docs
- Bilingual posts: Hebrew-first with English subtitle or vice versa
- Hashtags: 3-5 focused tags, not spam

# Skills Available
- /israeli-linkedin-strategy: Bilingual LinkedIn content for Israeli tech
- /israeli-social-content: Hebrew/English social content for Israeli audiences
EOF
success "CLAUDE.md written"

cat > ~/.claude/skills/israeli-linkedin-strategy/SKILL.md <<'EOF'
---
name: israeli-linkedin-strategy
description: Develop bilingual Hebrew/English LinkedIn content strategies for the Israeli tech ecosystem
metadata:
  type: skill
---

Create LinkedIn content optimized for Israeli tech professionals.

## Post structure
- Hebrew headline (attention-grabbing, conversational)
- English subtitle for international reach
- 3-5 relevant Hebrew hashtags (#טכנולוגיה #סטארטאפ #קוד)
- Post timing: Sun-Thu, 8-10am or 1-2pm Israel time (UTC+3)

## Tone
- Authentic, direct, slightly informal
- Reference Israeli tech culture (8200, Technion, Tel Aviv ecosystem)
- Avoid overly American corporate speak
EOF
success "Israeli LinkedIn strategy skill written"

cat > ~/.claude/skills/israeli-social-content/SKILL.md <<'EOF'
---
name: israeli-social-content
description: Create social media content optimized for Israeli audiences across platforms
metadata:
  type: skill
---

Create Hebrew/English social content for Israeli audiences.

## Platform defaults
- Facebook: longer posts, community groups focus, Hebrew-primary
- Instagram: visual-first, Hebrew caption with English hashtags
- TikTok: conversational Hebrew, trending Israeli audio
- LinkedIn: bilingual, professional tone

## Timing (Israel time, UTC+3)
- Best days: Sun–Thu (Israeli work week)
- Peak hours: 8–10am, 1–2pm, 8–10pm
- Avoid: Shabbat (Fri sunset – Sat night), major Jewish holidays

## Hebrew copywriting
- Use ״ instead of " for Hebrew quotes
- Short sentences, punchy openers
- Emojis: use sparingly, mostly at end of sections
EOF
success "Israeli social content skill written"

printf "\n${BOLD}${GREEN}The Content Creator is ready.${RESET}\n\n"
printf "Next steps:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # add to ~/.zshrc\n"
printf "  gh auth login\n"
printf "  claude\n\n"
