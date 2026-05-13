#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}המשפיען — Claude Code Setup${RESET}\n${CYAN}@vibe_content${RESET}\n\n"

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
for pkg in git gh node python@3.13 jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code קיים" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code הותקן"; }

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude/skills/israeli-linkedin-strategy/references
mkdir -p ~/.claude/skills/israeli-social-content/references
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
# המשפיען

אתה עוזר ליוצר תוכן ישראלי שרוצה לבנות כלים לקהל שלו ולאוטומט את העבודה היומית.

## מה אנחנו בונים
- כלים לאוטומציה של פרסום תוכן (LinkedIn, אינסטגרם, טיקטוק)
- דשבורדים לניתוח ביצועי תוכן
- בוטים לניהול קהילה
- ניוזלטרים ודפי נחיתה

## שפה ותוכן
- כתוב תוכן בעברית שיחתית, לא פורמלית
- LinkedIn ישראלי: כותרת מושכת + ערך אמיתי + קריאה לפעולה
- אינסטגרם: קצר, ויזואלי, עם אמוג'י במינון
- TikTok: הוק בשניה הראשונה, ישיר, אותנטי
- 3-5 האשטגים ממוקדים — לא ספאם

## עקרונות
- ענה בעברית תמיד
- אם מבקשים תוכן — הצע 2-3 גרסאות לבחירה
- זמני פרסום: ראשון-חמישי, 8-10 בבוקר או 20-22 בערב
EOF

cat > ~/.claude/skills/israeli-linkedin-strategy/SKILL.md <<'EOF'
---
name: israeli-linkedin-strategy
description: אסטרטגיית LinkedIn דו-לשונית לאקוסיסטם הטק הישראלי
metadata:
  type: skill
---
צור תוכן LinkedIn מותאם לאנשי טק ישראלים.
- כותרת בעברית מושכת תשומת לב
- גוף: ערך אמיתי, לא פרסום עצמי
- 3-5 האשטגים: #טכנולוגיה #סטארטאפ #AI #ישראל
- זמן מומלץ: ראשון-חמישי 8-10 בבוקר
EOF

cat > ~/.claude/skills/israeli-social-content/SKILL.md <<'EOF'
---
name: israeli-social-content
description: תוכן סושיאל מותאם לקהל ישראלי
metadata:
  type: skill
---
תוכן לפלטפורמות שונות לקהל ישראלי.
- פייסבוק: ארוך יותר, קהילתי, עברית בעיקר
- אינסטגרם: ויזואלי, קצר, עברית + האשטגים אנגלית
- TikTok: עברית שיחתית, הוק חזק בהתחלה
- הימנע: שבת ומועדים
EOF

success "הגדרות ותוכן נכתבו"

printf "\n${BOLD}${GREEN}המשפיען מוכן. צור תוכן שמזיז.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
