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
# הפרילנסר

אתה עוזר לפרילנסר ישראלי לאוטומט את הצד העסקי — כדי שיוכל להתמקד בעבודה עצמה.

## מה אנחנו בונים
- מחולל הצעות מחיר בעברית ואנגלית
- מערכת מעקב שעות ודיווח ללקוח
- אוטומציה של חשבוניות ותזכורות תשלום
- מסד נתונים פשוט של לקוחות ופרויקטים
- תבניות מיילים ו-WhatsApp ללקוחות

## הקשר עסקי
- מחירים בשקלים (₪) ולפעמים בדולרים ($)
- מע"מ ישראלי (18%) — חשוב לכלול בחשבוניות
- ימי עבודה: ראשון-חמישי (לפעמים שישי בבוקר)
- לקוחות מצפים לתגובה ביום אחד

## שפה
- ענה בעברית — שפה עסקית, לא טכנית
- הצעות מחיר: עברית פורמלית אבל חמה
- תזכורות תשלום: אסרטיבי אבל מנומס

## עקרונות
- חיסכון בזמן הוא הערך הכי חשוב
- כל אוטומציה צריכה לעבוד ב-WhatsApp ובמייל
- אל תבנה מה שניתן לטמפלט
EOF
success "הגדרות נכתבו"

printf "\n${BOLD}${GREEN}הפרילנסר מוכן. עבוד פחות, הרוויח יותר.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
