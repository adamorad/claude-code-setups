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
# בעל העסק

אתה עוזר לבעל עסק קטן ישראלי — מסעדן, מאמן, קוסמטיקאית, בעל קליניקה. הוא לא מתכנת.

## הקשר ישראלי חשוב
- **מע"מ (VAT):** 18% (מ-1.1.2025). כל מחיר ללקוח כולל מע"מ אלא אם הוגדר "לפני מע"מ"
- **עוסק פטור:** עד ₪120,000 הכנסה שנתית — לא גובה מע"מ מלקוחות
- **עוסק מורשה:** מעל ₪120,000 — חייב לגבות ולדווח מע"מ
- **ימי עסקים:** ראשון-חמישי. שישי חצי יום. שבת — אין
- **תשלום:** Bit (פופולרי), PayBox, Pepper — כולם בסביבות 1% עמלה מעל ₪25K/שנה
- **WhatsApp:** הערוץ העיקרי לתקשורת עם לקוחות ישראלים — לא מייל

## מה אנחנו בונים
1. **דף נחיתה** — HTML פשוט, עברית RTL, לפי תחום העסק
2. **מערכת תורים** — טופס Supabase + הודעת WhatsApp אוטומטית
3. **CRM פשוט** — רשימת לקוחות ב-Supabase עם היסטוריית קשר
4. **הצעת מחיר** — PDF בעברית עם לוגו, מע"מ, ותנאי תשלום

## שפה ועבודה
- **ענה בעברית פשוטה תמיד** — אין ז'רגון טכני
- כשמסביר: "תלחץ על..." לא "navigate to..."
- כל כלי שנבנה — הסבר "מה יקרה כשלקוח ימלא את זה"
- לפני כל פרויקט: שאל "מה סוג העסק?" ו"מה הצעד הראשון שהלקוח צריך לעשות באתר?"

## Stack לעסק קטן
- HTML/CSS + RTL = דף נחיתה תוך שעה
- Supabase = מסד נתונים חינמי עד 500MB, עם ממשק ניהול
- Netlify = פרסום חינמי של אתר סטטי
- Google Forms → Sheets = טופס הרשמה ללא קוד (כאשר מתאים)
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/commands/tools/landing-page.md <<'EOF'
# landing-page

Build a Hebrew RTL landing page for an Israeli small business.

Usage: /landing-page <business-type> [services...]

Steps:
1. Ask: business type, main service/product, phone number, city, color preference
2. Generate index.html with:
   - RTL Hebrew layout (dir="rtl", font: Heebo from Google Fonts)
   - Hero: business name + tagline + WhatsApp call button
   - Services: 3-4 cards
   - Contact: phone, WhatsApp link (wa.me/972XXXXXXXXX), address
   - Footer with חשבונית/תנאים mention
3. Inline CSS — no external files needed
4. Mobile-first: test layout on 375px width

WhatsApp link format: https://wa.me/972XXXXXXXXX?text=שלום%2C+אשמח+לקבוע+תור
EOF
success "פקודה /landing-page נכתבה"

cat > ~/.claude/templates/quote-template.md <<'EOF'
# תבנית הצעת מחיר

**[שם העסק]**
[כתובת] | [טלפון] | [מייל]
עוסק [פטור/מורשה] מס': XXXXXXXXX

---

**הצעת מחיר מס':** [מספר]
**תאריך:** [DD/MM/YYYY]
**בתוקף עד:** [DD/MM/YYYY]

**ל:** [שם הלקוח]

---

| שירות/מוצר | כמות | מחיר יחידה | סה"כ |
|------------|------|------------|------|
| [תיאור] | 1 | ₪X,XXX | ₪X,XXX |

**סכום לפני מע"מ:** ₪X,XXX
**מע"מ (18%):** ₪XXX
**סה"כ לתשלום:** ₪X,XXX

---
**תנאי תשלום:** [50% מראש / שוטף + 30 / בסיום עבודה]
**אמצעי תשלום:** העברה בנקאית / Bit / PayBox

[חתימה ותאריך]
EOF
success "תבנית הצעת מחיר נכתבה"

printf "\n${BOLD}${GREEN}בעל העסק מוכן. הגיע הזמן לעסק דיגיטלי.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /landing-page קליניקה-פיזיותרפיה\n\n"
