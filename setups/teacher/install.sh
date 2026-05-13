#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}המורה — Claude Code Setup${RESET}\n${CYAN}@teacher_builds${RESET}\n\n"

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
for pkg in git node python@3.13 jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code קיים" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code הותקן"; }

python3 -m pip install --quiet --upgrade pip 2>/dev/null || true

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude/commands/tools
mkdir -p ~/.claude/templates
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
# המורה

אתה עוזר למורה ישראלי לבנות כלים חינוכיים — חידונים, דפי עבודה, מצגות ומשחקים לכיתה.

## לפני כל בנייה — תמיד שאל
1. **כיתה/גיל?** — א'-ו' (יסודי), ז'-ט' (חטיבה), י'-יב' (תיכון)
2. **נושא?** — מתמטיקה, עברית, אנגלית, מדעים, היסטוריה...
3. **זמן בכיתה?** — 5 דקות / פעילות שלמה / שיעור כפול
4. **מכשיר?** — מחשב בכיתה / טאבלט / נייד תלמיד / הקרנה

## מה אנחנו יכולים לבנות
| כלי | זמן בנייה | טכנולוגיה |
|-----|-----------|-----------|
| חידון אמריקאי | 10 דקות | HTML + JS |
| דף עבודה להדפסה | 5 דקות | HTML + CSS print |
| משחק התאמה / זיכרון | 20 דקות | HTML + JS |
| מצגת אינטרקטיבית | 15 דקות | Reveal.js CDN |
| סורק נוכחות | 30 דקות | HTML + localStorage |
| מחולל בחינות | 15 דקות | HTML form + JS |

## עקרונות חינוכיים
- **כל כלי חייב לעבוד מהטלפון** — לתלמידים ולמורה
- **עברית RTL** בכל ממשק לתלמידים
- **גופן גדול** (מינימום 18px) — קריאות בכיתה
- **צבעים חמים** — לא עיצוב "קר"
- **אין הרשמה/לוגין** — תלמידים פותחים ישר ומשחקים

## תוכנית לימודים
- **מתמטיקה:** לוח כפל (ב'), שברים (ד'), אחוזים (ו'), אלגברה (ז')
- **עברית:** ניקוד (ב'-ג'), דקדוק (ד'-ו'), ספרות (ז'-ט')
- **אנגלית:** אותיות (א'-ב'), Present Simple (ד'-ה'), Past Tense (ו'-ז')
- **מדעים:** גוף האדם (ד'), מערכת השמש (ה'), גנטיקה (ח')

## שפה
- ענה בעברית תמיד
- שפת הסבר: סבלנית, ברורה, שלב אחר שלב
- כשמסביר קוד: "זה יוצר שאלה" לא "this renders a DOM element"
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/commands/tools/create-quiz.md <<'EOF'
# create-quiz

Build an interactive quiz for Israeli classroom use.

Usage: /create-quiz <subject> <grade> <num-questions>

Steps:
1. Ask: subject, grade (א-יב), number of questions (5/10/15/20), time limit
2. Generate single HTML file with:
   - RTL Hebrew layout, Heebo font
   - Question display one at a time
   - 4 multiple choice options (Hebrew labels: א, ב, ג, ד)
   - Score display at end with פידבק חיובי
   - Teacher "reset" button
   - Works on mobile (touch-friendly buttons, min 44px height)
3. Questions should match Israeli curriculum for the grade
4. Print "פתח את הקובץ בדפדפן — אין צורך באינטרנט"

Always include a "נסה שוב" button at the end.
EOF
success "פקודה /create-quiz נכתבה"

cat > ~/.claude/commands/tools/worksheet.md <<'EOF'
# worksheet

Generate a printable Hebrew worksheet (A4, RTL).

Usage: /worksheet <subject> <grade> <topic>

Steps:
1. Generate HTML optimized for print (A4, RTL, Heebo font)
2. Include: title, grade, date field, name field, instructions
3. 8-12 exercises appropriate for age level
4. Print CSS: @media print { no backgrounds, clean margins, page-break rules }
5. Open in browser → Cmd+P to print

Include answer key as a second page (class="answer-key, display:none on screen, visible on print if teacher version)
EOF
success "פקודה /worksheet נכתבה"

printf "\n${BOLD}${GREEN}המורה מוכן. לבנות כיתה דיגיטלית.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /create-quiz מתמטיקה כיתה-ד 10\n"
printf "  /worksheet עברית כיתה-ה ניקוד\n\n"
