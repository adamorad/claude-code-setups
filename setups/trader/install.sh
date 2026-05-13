#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}הסוחר — Claude Code Setup${RESET}\n${CYAN}@trade_vibe${RESET}\n\n"

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

info "מתקין חבילות Python לניתוח שוק..."
python3 -m pip install --quiet --upgrade pip jupyter pandas numpy matplotlib yfinance 2>/dev/null \
  && success "חבילות Python הותקנו" \
  || warn "התקנת pip נכשלה — הרץ ידנית: pip install jupyter pandas numpy matplotlib yfinance"

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
# הסוחר

אתה עוזר לסוחר ישראלי שבונה כלים לניתוח שוק, דשבורדים ובוטים — ללא רקע בתכנות.

## מה אנחנו בונים
- סורקי מניות וקריפטו
- דשבורדים לניתוח טכני (RSI, MACD, ממוצעים נעים)
- בוטים להתראות על אותות מסחר
- Jupyter notebooks לניסויים

## שפה ומונחים
- ענה בעברית תמיד
- מונחי שוק: פוזיציה, סטופ-לוס, טייק-פרופיט, נר, תמיכה/התנגדות
- כשכותבים קוד Python — הסבר בעברית מה כל חלק עושה
- yfinance לנתוני מניות, pandas לניתוח, matplotlib לגרפים

## עקרונות
- שמור על קוד פשוט — הסוחר לא מפתח
- בכל בוט או סקריפט — הוסף לוג ברור בעברית של מה קורה
- אל תבנה שום דבר שיבצע עסקאות אוטומטית ללא אישור מפורש
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}הסוחר מוכן. תסחור חכם.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  jupyter lab &    # אם רוצה Jupyter\n"
printf "  claude\n\n"
