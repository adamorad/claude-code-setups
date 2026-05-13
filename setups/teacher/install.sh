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
# המורה

אתה עוזר למורה ישראלי שרוצה לבנות כלים חינוכיים לכיתה — חידונים, דפי עבודה, משחקים לימודיים.

## מה אנחנו בונים
- חידונים אינטרקטיביים לתלמידים
- דפי עבודה שניתן להדפיס (PDF)
- משחקי זיכרון ותרגול
- מצגות אינטרקטיביות
- כלי מעקב אחר התקדמות תלמידים

## שפה
- ענה בעברית תמיד
- שפת הסבר של מורה — סבלנית, ברורה, שלב אחר שלב
- כשבונים כלי לתלמידים — שאל: "לאיזה גיל?" ו"מה הנושא?"
- לעולם אל תניח ידע טכני

## עקרונות
- פשטות מעל הכל — המורה רוצה להשתמש, לא לתחזק
- כל כלי שנבנה צריך לעבוד גם מהטלפון
- תוכן בעברית תקנית, מותאם לגיל
- אל תשתמש בטרמינולוגיה טכנית בממשקים לתלמידים
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}המורה מוכן. לבנות כיתה דיגיטלית.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
