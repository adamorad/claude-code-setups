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
python3 -m pip install --quiet --upgrade pip 2>/dev/null || true
python3 -m pip install --quiet jupyter pandas numpy matplotlib plotly pandas-ta yfinance requests 2>/dev/null \
  && success "חבילות Python הותקנו (pandas, plotly, pandas-ta, yfinance)" \
  || warn "pip נכשל — הרץ ידנית: pip install jupyter pandas numpy matplotlib plotly pandas-ta yfinance"

info "כותב הגדרות Claude Code..."
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
# הסוחר

אתה עוזר לסוחר ישראלי שבונה כלים לניתוח שוק וסורקים — ללא רקע בתכנות.

## בורסה ישראלית (TASE)
- **שעות מסחר:** ראשון-חמישי 09:45-17:25 (יום ראשון סוגר ב-16:25)
- **טיקר יאהו פיננס:** SYMBOL.TA (למשל: TEVA.TA, NICE.TA, CHKP.TA)
- **מדדים:** ת"א 35 (^TA35), ת"א 90 (^TA90), ת"א-SME60 (^TASME60)
- **מטבע:** שקל (ILS). נסחר גם ב-NASDAQ: TEVA, CHKP, NICE ללא .TA

## כלים ומה הם עושים
- **yfinance:** `yf.download("TEVA.TA", period="6mo")` — נתוני מחיר היסטוריים
- **pandas-ta:** `df.ta.rsi()`, `df.ta.macd()`, `df.ta.bbands()` — אינדיקטורים טכניים
- **plotly:** גרפים אינטרקטיביים ב-browser — עדיף על matplotlib לניתוח
- **Jupyter:** ניסויים ומחקר — `jupyter lab` להפעלה

## מונחים בעברית
| עברית | אנגלית | קוד |
|-------|--------|-----|
| ממוצע נע | Moving Average | df.ta.sma(20) |
| RSI (מדד חוזק יחסי) | RSI | df.ta.rsi(14) |
| MACD | MACD | df.ta.macd() |
| רצועות בולינג'ר | Bollinger Bands | df.ta.bbands() |
| נר יפני | Candlestick | go.Candlestick() |
| תמיכה/התנגדות | Support/Resistance | ידנית |
| סטופ-לוס | Stop Loss | פרמטר בלוגיקה |
| טייק-פרופיט | Take Profit | פרמטר בלוגיקה |

## עקרונות
- קוד פשוט עם הסברים בעברית לכל שלב
- כל סקריפט מדפיס לוג ברור: "בודק TEVA.TA...", "RSI: 72 — קנייתר יתר"
- **לעולם לא** לבצע עסקאות אוטומטיות — רק התראות והמלצות
- לפני כל בנייה: "לאיזו בורסה? ישראל (.TA) / ארה"ב / קריפטו?"

## Template פתיחה לכל סקריפט
```python
import yfinance as yf
import pandas as pd
import pandas_ta as ta

ticker = "TEVA.TA"  # שנה לטיקר שלך
df = yf.download(ticker, period="6mo")
df.ta.rsi(append=True)
df.ta.macd(append=True)
print(df[["Close", "RSI_14", "MACD_12_26_9"]].tail(10))
```
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/commands/tools/stock-scan.md <<'EOF'
# stock-scan

Build a stock scanner for given criteria.

Usage: /stock-scan [market: tase|nasdaq|crypto] [indicator: rsi|macd|volume]

Steps:
1. Ask: which market (TASE = .TA suffix, NASDAQ, Crypto), which signal to scan
2. Generate Python script using yfinance + pandas-ta
3. Script must print results in Hebrew: "מניה X — RSI: 28 — אות קנייה אפשרי"
4. Add a disclaimer comment: "# לצורכי מחקר בלבד — לא המלצת השקעה"
5. Save to ~/scanner.py and print run instructions

Never auto-execute trades. Always add risk disclaimer in Hebrew.
EOF
success "פקודה /stock-scan נכתבה"

printf "\n${BOLD}${GREEN}הסוחר מוכן. תסחור חכם.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  jupyter lab &    # לניסויים\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /stock-scan tase rsi\n\n"
