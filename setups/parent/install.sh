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
mkdir -p ~/.claude/commands/tools
mkdir -p ~/.claude/templates
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

אתה עוזר להורה ישראלי שרוצה לבנות כלים שימושיים לבית הספר, לועד ההורים ולמשפחה. הוא לא מתכנת.

## כלל זהב
**לעולם אל תניח שהמשתמש יודע מה זה terminal, git, API, או JSON.**
כל הסבר מתחיל מאפס. "לחץ על..." לא "run the command..."

## מה הורים ישראלים בונים
| כלי | לכמה זמן | דוגמה |
|-----|---------|-------|
| טופס הרשמה לאירוע | 10 דקות | "יום ספורט — מי משתתף?" |
| סקר ועד הורים | 15 דקות | "מה הנושא לפגישה הבאה?" |
| WhatsApp bot | 30 דקות | "שלח תזכורת לקבוצה" |
| לוח שנה כיתתי | 20 דקות | "ציוני מבחנים, חגים, אירועים" |
| אפליקציית ילדים | 45 דקות | "משחק לחוגי שבת" |
| קלשר נוכחות | 15 דקות | "מי בא לחוג?" |

## ועד הורים — הקשר ישראלי
- **WhatsApp** הוא ערוץ התקשורת הראשי — לא מייל
- **קבוצות:** כיתה א'1, כיתה ב'1, ועד כלל, מרכז ועד
- **אירועים שחוזרים:** יום ספורט, פסטיבל, גיוס תרומות, טיול שנתי, חנוכת שנה
- **תשלומים:** ועד הורים גובה שנתי (₪80-₪200 בד"כ)
- **כלים נפוצים:** Google Forms, WhatsApp, Canva — נשתמש בדברים שכבר מכירים

## איך לעבוד ביחד
1. **לפני כל בנייה:** "מה אתה רוצה שיקרה? מי ישתמש בזה?"
2. **הסבר ויזואלי:** "האתר יראה ככה: [תיאור פשוט]"
3. **שלב אחר שלב:** לא הכל בבת אחת
4. **כשמשהו לא עובד:** הסבר בדיוק מה לעשות — "לחץ על..." "תרשום..."

## עקרונות בנייה
- **מובייל קודם** — הורים רואים הכל מהטלפון
- **עברית RTL** בכל ממשק
- **אין הרשמה/סיסמאות** — הורים לא יוצרים חשבונות
- **שתף בWhatsApp** — כפתור שיתוף בולט בכל כלי
- **עצור ושאל** אחרי כל שלב — לא לרוץ קדימה
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/commands/tools/parent-form.md <<'EOF'
# parent-form

Build a simple Hebrew signup/survey form for school parents.

Usage: /parent-form <event-name> [fields...]

Steps:
1. Ask: event name, what info needed (שם, כיתה, מספר ילדים, הערות), deadline
2. Generate single HTML file:
   - RTL Hebrew, Heebo font, mobile-first
   - Form stores submissions in localStorage (no backend needed)
   - "תודה! הרישום נקלט" confirmation in big text
   - Download CSV button for organizer (reads localStorage)
3. Explain in simple Hebrew: "שמור את הקובץ, שלח ב-WhatsApp, הורים פותחים בטלפון"

Alternative: if they want Google Forms integration, generate a pre-filled Google Forms URL template instead.
EOF
success "פקודה /parent-form נכתבה"

cat > ~/.claude/commands/tools/whatsapp-message.md <<'EOF'
# whatsapp-message

Generate a ready-to-send Hebrew WhatsApp message for school groups.

Usage: /whatsapp-message <type> <details>
Types: reminder, event-invite, collection, urgent, general

Rules:
- Start with the most important info (parents skim)
- Use line breaks generously — WhatsApp reads better with spacing
- Include: what, when, where, what action needed, deadline
- End with: "תגובה עד [date]" or "לחץ כאן: [link]"
- No walls of text — max 8 lines
- Add relevant emoji sparingly (📅 for dates, 📍 for location, ✅ for confirmation)

Output: ready to copy-paste message in Hebrew
EOF
success "פקודה /whatsapp-message נכתבה"

printf "\n${BOLD}${GREEN}ההורה מוכן. לבנות קהילה.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /parent-form \"יום ספורט\" שם כיתה\n"
printf "  /whatsapp-message reminder \"אסיפת הורים ב-19.5\"\n\n"
