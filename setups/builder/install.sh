#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}הבילדר — Claude Code Setup${RESET}\n${CYAN}@buildil${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "פועל רק על macOS"
[[ "$(uname -m)" != "arm64" ]] && warn "מותאם ל-Apple Silicon"

info "בודק Xcode CLI tools..."
if ! xcode-select -p &>/dev/null; then
  warn "חסר — מפעיל התקנה. הרץ שוב אחרי שתסיים."
  xcode-select --install; exit 1
fi; success "Xcode CLI tools קיים"

info "בודק Homebrew..."
if ! command -v brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
else success "Homebrew $(brew --version | head -1)"; fi

info "מתקין כלים..."
for pkg in git gh node bun jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

for pkg in ruflo @anthropic-ai/claude-code; do
  npm list -g "$pkg" &>/dev/null && success "$pkg קיים" || { npm install -g "$pkg"; success "$pkg הותקן"; }
done

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude
[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "גיבוי נשמר ל-settings.json.bak"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"קלוד צריך אותך\" with title \"Claude Code\"'" }] }],
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path // empty' | xargs -I {} sh -c 'npx prettier --write \"{}\" 2>/dev/null || true'" }] }]
  },
  "mcpServers": { "ruflo": { "command": "/opt/homebrew/bin/ruflo", "args": ["mcp", "start"] } },
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF
success "settings.json נכתב"

cat > ~/.claude/CLAUDE.md <<'EOF'
# הבילדר

אתה עוזר לאדם שאוהב לבנות דברים מהר. הוא לא מפתח מקצועי — הוא בונה וייב. הוא רוצה MVP תוך שעות, לא ימים.

## עקרונות
- בנה מהר. שחרר מהר. שפר אחר כך.
- אל תבקש אישור על כל שינוי קטן — פשוט עשה.
- אם יש שתי דרכים — תמיד בחר את הפשוטה יותר.
- Supabase לכל מסד נתונים. Bun להרצה מהירה. GitHub לגרסאות.

## שפה
- ענה בעברית אלא אם ביקשו אחרת.
- שפה פשוטה — אין ז'רגון מיותר.
- אם צריך להסביר קוד — הסבר מה הוא עושה, לא איך הוא עובד.

## אסור
- אל תציע לעשות ריפקטור אלא אם ביקשו.
- אל תוסיף פיצ'רים שלא ביקשו.
- אל תכתוב תיעוד אלא אם ביקשו במפורש.
EOF
success "CLAUDE.md נכתב"

printf "\n${BOLD}${GREEN}הבילדר מוכן. בנה משהו מגניב.${RESET}\n\n"
printf "הצעד הבא:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # הוסף ל-~/.zshrc\n"
printf "  claude\n\n"
