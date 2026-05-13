#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}הפרילנסר — Claude Code Setup${RESET}\n${CYAN}@freelance_il${RESET}\n\n"

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
  },
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF

cat > ~/.claude/CLAUDE.md <<'EOF'
# הפרילנסר

אתה עוזר לפרילנסר ישראלי לנהל את הצד העסקי — כדי שיוכל להתמקד בעבודה עצמה.

## מע"מ ומיסוי ישראלי (2025)
- **מע"מ:** 18% (עלה מ-17% ב-1.1.2025)
- **עוסק פטור:** הכנסה עד ₪120,000/שנה — לא גובה מע"מ, לא מגיש דוחות מע"מ
- **עוסק מורשה:** מעל ₪120,000 — חייב לגבות 18% מע"מ ולדווח כל 2 חודשים
- **ניכוי מס במקור:** לקוחות חדשים מנכים 30% אלא אם יש אישור ניכוי מס מרשות המיסים

## תשלומים
- **Bit** (Bank Hapoalim) — הנפוץ ביותר, עובד עד ₪7,500 לעסקה
- **PayBox** (Discount Bank) — טוב לקבוצות
- **Pepper Pay** (Leumi) — אפשרויות עסקיות
- **העברה בנקאית** — לסכומים גדולים, 1-2 ימי עסקים
- מעל ₪25,000/שנה בכל אחד מהאפליקציות — ~1% עמלה

## ימי עבודה ותגובה
- **ימי עסקים:** ראשון-חמישי (שישי חצי יום)
- **ציפיות לקוח:** תגובה תוך יום עסקים
- **שיחת תיאום:** WhatsApp קודם, מייל אם פורמלי

## מה אנחנו בונים
1. **הצעת מחיר** — בעברית ואנגלית, כולל מע"מ, תנאי תשלום
2. **חשבונית** — לפי דרישות רשות המיסים (מספר, תאריך, פרטי עוסק)
3. **מעקב שעות** — Google Sheets / Notion / CSV פשוט
4. **תזכורת תשלום** — הודעת WhatsApp/מייל מנומסת אבל אסרטיבית

## שפה
- ענה בעברית — שפה עסקית, חמה, לא טכנית
- הצעות מחיר: עברית פורמלית אבל לא קרה
- תזכורות תשלום: "רק תזכורת ידידותית..." → אסרטיבי אבל מנומס
- חוזים: ברור, ספציפי, מגן על שני הצדדים
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/templates/quote-template.md <<'EOF'
# הצעת מחיר — תבנית

**[שם / שם החברה]**
[כתובת] | [טלפון] | [מייל]
ח.פ. / ע.מ.: XXXXXXXXX

---
**הצעת מחיר מס':** [מספר עוקב]
**תאריך:** [DD/MM/YYYY]
**בתוקף עד:** [30 יום מהתאריך]

**ל:** [שם הלקוח]
**נושא:** [תיאור קצר של הפרויקט]

---
## פירוט השירותים

| שירות | זמן משוער | מחיר |
|-------|-----------|------|
| [שירות 1] | [X שעות] | ₪X,XXX |
| [שירות 2] | [X שעות] | ₪X,XXX |

**סכום לפני מע"מ:** ₪X,XXX
**מע"מ 18%:** ₪XXX
**סה"כ לתשלום:** ₪X,XXX

*(אם עוסק פטור: אין חיוב מע"מ — עוסק פטור ע"פ חוק)*

---
## תנאים
- **מקדמה:** X% בחתימה
- **יתרה:** בסיום עבודה / שוטף+30
- **שינויים:** עד X סבבי תיקונים כלולים
- **זכויות:** עוברות ללקוח לאחר תשלום מלא

[חתימה]                    [תאריך]
EOF
success "תבנית הצעת מחיר נכתבה"

cat > ~/.claude/commands/tools/generate-quote.md <<'EOF'
# generate-quote

Generate a professional Hebrew quote/proposal.

Usage: /generate-quote <client-name> <project-type> <budget-range>

Steps:
1. Ask: client name, project description, deliverables, timeline, budget range
2. Ask: is client B2B or private? Israeli or foreign? (affects VAT treatment)
3. Generate quote using ~/.claude/templates/quote-template.md
4. Fill in: sequential quote number, 30-day validity, VAT calculation (18%)
5. If client is foreign (export): note "פטור ממע"מ — שירות לתושב חוץ"
6. Generate WhatsApp message to send quote: "שלום [שם], מצרף הצעת מחיר ל[פרויקט]..."

Output: filled quote in Markdown + WhatsApp intro message
EOF
success "פקודה /generate-quote נכתבה"

cat > ~/.claude/commands/tools/payment-reminder.md <<'EOF'
# payment-reminder

Generate a polite but assertive Hebrew payment reminder.

Usage: /payment-reminder <client> <amount> <days-overdue>

Tone scale by days overdue:
- 1-7 days: ידידותי — "רק לוודא שהכל הגיע"
- 8-21 days: אסרטיבי — "אשמח לסגור את הנושא"
- 22+ days: פורמלי — "נדרשת פעולה מיידית"

Generate: WhatsApp message + email version
Include: invoice number, amount (with ILS symbol), due date, payment options (Bit/PayBox/bank transfer)
EOF
success "פקודה /payment-reminder נכתבה"

printf "\n${BOLD}${GREEN}הפרילנסר מוכן. עבוד פחות, הרוויח יותר.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /generate-quote \"חברת ABC\" פיתוח-אתר 5000-8000\n"
printf "  /payment-reminder \"לקוח X\" 3500 14\n\n"
