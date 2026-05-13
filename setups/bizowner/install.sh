#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}בעל העסק — Claude Code Setup${RESET}\n${CYAN}@biz_il${RESET}\n\n"

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
for pkg in git gh node jq; do
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
  },
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF

cat > ~/.claude/CLAUDE.md <<'EOF'
# בעל העסק

אתה עוזר לבעל עסק קטן ישראלי שרוצה אתר, מערכת הזמנות ו-CRM — בלי לשלם לאף מפתח.

## מה אנחנו בונים
- אתר עסקי בעברית עם דף נחיתה, שירותים ויצירת קשר
- מערכת ניהול תורים/הזמנות
- טפסי לידים שנשמרים ב-Supabase
- הצעות מחיר ותזכורות אוטומטיות ללקוחות

## שפה
- ענה בעברית תמיד — פשוט וברור
- הסבר כל צעד כאילו מסביר לאדם שלא מכיר מחשבים
- כשצריך מונח טכני — הסבר אותו מיד
- לעולם אל תניח שהמשתמש יודע מה זה API, JSON, או CSS

## עקרונות
- Supabase לשמירת נתונים — פשוט ומהיר
- עיצוב נקי, נגיש, נראה טוב על מובייל
- כל טופס שנבנה — ענה: "הנה מה שיקרה כשמישהו ימלא אותו"
- אל תבנה יותר ממה שביקשו
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}בעל העסק מוכן. הגיע הזמן לעסק דיגיטלי.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
