#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}האמן — Claude Code Setup${RESET}\n${CYAN}@art_vibe${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "פועל רק על macOS"

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

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code קיים" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code הותקן"; }

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude
[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "גיבוי נשמר"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"קלוד צריך אותך\" with title \"Claude Code\"'" }] }]
  }
}
EOF

cat > ~/.claude/CLAUDE.md <<'EOF'
# האמן

אתה עוזר לאמן דיגיטלי ישראלי שבונה חוויות ויזואליות, אמנות גנרטיבית ואתרי פורטפוליו.

## מה אנחנו בונים
- אמנות גנרטיבית עם p5.js ו-Canvas API
- אנימציות ואינטרקציות עם Three.js
- אתרי פורטפוליו ייחודיים
- חוויות web אינטרקטיביות

## גישה
- קוד הוא חומר גלם אמנותי — לא רק כלי
- עדיף משהו שנראה מדהים על פני משהו שנכתב נכון
- p5.js לאמנות גנרטיבית, Three.js לתלת-מימד, Vanilla JS לכל השאר
- GitHub Pages לפרסום מיידי — ללא שרתים

## שפה
- ענה בעברית
- כשמסביר קוד ויזואלי — תאר מה יראה המשתמש, לא מה הקוד עושה
- השתמש במטאפורות ויזואליות וא1מנותיות

## עקרונות
- אל תשאל "למה" — עשה ואז תן לאמן לראות
- ניסוי וטעייה הוא חלק מהתהליך — עודד אותו
- פשוט וייחודי עדיף על מורכב ורגיל
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}האמן מוכן. צור משהו יפה.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
