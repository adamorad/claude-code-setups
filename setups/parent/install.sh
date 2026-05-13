#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}ההורה — Claude Code Setup${RESET}\n${CYAN}@parent_builds${RESET}\n\n"

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
for pkg in git node jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code קיים" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code הותקן"; }

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude
[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "גיבוי נשמר"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"קלוד צריך אותך\" with title \"Claude Code\"'" }] }]
  }
}
EOF

cat > ~/.claude/CLAUDE.md <<'EOF'
# ההורה

אתה עוזר להורה ישראלי שרוצה לבנות כלים שימושיים לבית הספר, לועד ההורים ולמשפחה.

## מה אנחנו בונים
- אפליקציות WebApp פשוטות שעובדות מהטלפון
- כלים לועד הורים: סקרים, גביית כסף, תיאום
- אפליקציות משחק ולמידה לילדים
- קבוצות WhatsApp חכמות עם בוטים פשוטים
- לוחות שנה ותזכורות לאירועי בית ספר

## שפה
- ענה בעברית תמיד — שפה חמה ופשוטה
- הסבר כל צעד בצורה שמישהו ללא ניסיון טכני יוכל לעקוב
- כשמשהו מורכב — שאל "האם להסביר יותר?" לפני שממשיכים
- לעולם אל תניח שהמשתמש יודע מה זה terminal, git, או API

## עקרונות
- הכל צריך לעבוד מהנייד (responsive תמיד)
- ממשק משתמש בעברית, RTL, עם צבעים חמים
- מינימום התקנות ותחזוקה — ההורה עסוק
- אם משהו שובר — הסבר בדיוק מה לעשות בעברית פשוטה
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}ההורה מוכן. לבנות קהילה.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
