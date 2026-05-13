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

info "מתקין חבילות Python לאנליטיקה..."
python3 -m pip install --quiet --upgrade pip 2>/dev/null || true
python3 -m pip install --quiet requests pandas openpyxl 2>/dev/null \
  && success "חבילות Python הותקנו" \
  || warn "pip נכשל — הרץ ידנית: pip install requests pandas openpyxl"

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude/skills/israeli-linkedin-strategy
mkdir -p ~/.claude/skills/israeli-social-content
mkdir -p ~/.claude/commands/tools
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

אתה עוזר ליוצר תוכן ישראלי. המטרה: פוסטים שמזיזים אנשים, לא פוסטים יפים על הנייר.

## LinkedIn ישראלי (B2B / טק)
**מבנה שעובד:**
1. שורה ראשונה = הוק — שאלה, מספר, טענה נגדית, או סיפור קצר
2. גוף: 3-5 נקודות עם רווח בין שורות — קריאות על מובייל
3. CTA ספציפי: "מה דעתך?" / "תייג מישהו שצריך לשמוע את זה"
4. האשטגים: 3-5 בלבד — #AI #סטארטאפ #טכנולוגיה #ישראל
**זמן אופטימלי:** ראשון-חמישי, 8:00-10:00 בבוקר

## אינסטגרם ישראלי
**מה עובד:**
- Reels: 15-30 שניות, כתובית בעברית, מוזיקה טרנדית
- Carousel: 5-8 שקופיות, שקופית ראשונה = כותרת מושכת
- Caption: 2-3 שורות + אמוג'י + שאלה לסיום
- האשטגים: 10-15, חצי עברית חצי אנגלית
**זמן אופטימלי:** ראשון-חמישי, 19:00-21:00

## TikTok ישראלי
**כלל ראשון:** 3 שניות ראשונות = הוק חזק או פספסת
- דיבור ישיר למצלמה — אותנטי > מקצועי
- כתוביות תמיד (80% צופים בלי קול)
- Trend Sounds + Original content = combination winner
- תגובה לקומנטים בוידאו — מכפיל reach

## פייסבוק / קבוצות
- ארוך ומפורט עובד טוב יותר ב-Facebook groups
- שאלה בסוף = הכפלת תגובות
- תוכן בעברית בלבד לקהל ישראלי

## עקרונות
- תמיד הצע 2-3 גרסאות — ווייב שונה לכל אחת
- אל תשתמש בשפה "מנהלים בכירים" בLI — ישראלים מרגישים את הBS
- אין ימי שישי/שבת — הימנע מפרסום
- 20-22 בערב עובד טוב לתוכן בידורי, בוקר לB2B
EOF

cat > ~/.claude/skills/israeli-linkedin-strategy/SKILL.md <<'EOF'
---
name: israeli-linkedin-strategy
description: LinkedIn content strategy for Israeli tech ecosystem — Hebrew B2B posts that drive engagement
metadata:
  type: skill
---

## Voice
- Hebrew + occasional English tech terms (AI, startup, pivot)
- Direct, no corporate speak — Israelis hate it
- Personal story > company announcement

## Post Templates

**Story Hook:**
"לפני 3 שנים הייתי [מצב A]. היום [מצב B]. מה שינה הכל: [insight אחד]"

**Data Hook:**
"[מספר]% מהסטארטאפים הישראלים [fact מפתיע]. הנה למה זה [חשוב/מדאיג]:"

**Controversy Hook:**
"דעה שנויה במחלוקת: [טענה]. הסיבה שאני מאמין בזה:"

## Hashtag Bank
Hebrew: #טכנולוגיה #סטארטאפ #יזמות #AI #פיתוח #מנהיגות
English: #Israel #TechIsrael #Startup #ProductManagement #AI
EOF

cat > ~/.claude/skills/israeli-social-content/SKILL.md <<'EOF'
---
name: israeli-social-content
description: Platform-specific Hebrew content for Israeli audiences
metadata:
  type: skill
---

## Platform Rules

**Instagram:**
- Caption: hook + value + emoji + שאלה
- Reels description: 50 מילים מקס
- Stories: poll/question stickers = 3x engagement

**TikTok:**
- Script structure: Hook (3s) → Problem (10s) → Solution (30s) → CTA (5s)
- No hashtag spam — 5-7 targeted only
- Duet/Stitch trending content = reach boost

**Facebook Groups:**
- Title as question = more clicks
- List format (1. 2. 3.) = more shares
- Tag relevant people (with permission)

## Never Do
- Post on שבת (Friday sunset - Saturday night)
- Use corporate language
- Post without a clear CTA
- Ignore comments (first hour critical)
EOF

cat > ~/.claude/commands/tools/create-post.md <<'EOF'
# create-post

Generate a social media post for Israeli audience.

Usage: /create-post <platform> <topic> [tone: professional|casual|viral]

Steps:
1. Ask: platform (LinkedIn/Instagram/TikTok/Facebook), topic, target audience
2. Generate 3 variations with different hooks
3. For each: include caption, hashtags, best posting time
4. Label them: גרסה א (אינפורמטיבית), גרסה ב (סיפורית), גרסה ג (פרובוקטיבית)

Platform-specific rules from israeli-social-content skill apply.
Always write in Hebrew unless explicitly asked otherwise.
EOF
success "הגדרות ותוכן נכתבו"

printf "\n${BOLD}${GREEN}המשפיען מוכן. צור תוכן שמזיז.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /create-post linkedin AI-trends professional\n\n"
