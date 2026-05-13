#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}הבילדר — Claude Code Setup${RESET}\n${CYAN}@buildil${RESET}\n\n"

[[ "$(uname)" != "Darwin" ]] && warn "פועל רק על macOS"
[[ "$(uname -m)" != "arm64" ]] && warn "מותאם ל-Apple Silicon"

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
for pkg in git gh node bun jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

info "מתקין npm packages..."
for pkg in ruflo @anthropic-ai/claude-code; do
  npm list -g "$pkg" &>/dev/null && success "$pkg קיים" || { npm install -g "$pkg"; success "$pkg הותקן"; }
done

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude/commands/tools
[[ -f ~/.claude/settings.json ]] && cp ~/.claude/settings.json ~/.claude/settings.json.bak && warn "גיבוי נשמר ל-settings.json.bak"

cat > ~/.claude/settings.json <<'EOF'
{
  "model": "sonnet",
  "advisorModel": "opus",
  "theme": "dark",
  "hooks": {
    "Notification": [{ "matcher": "", "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"קלוד צריך אותך\" with title \"Claude Code\"'" }] }],
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path // empty' | xargs -I {} sh -c 'npx prettier --write \"{}\" 2>/dev/null || true'" }] }]
  },
  "mcpServers": { "ruflo": { "command": "/opt/homebrew/bin/ruflo", "args": ["mcp", "start"] } },
  "enabledPlugins": { "supabase@claude-plugins-official": true }
}
EOF
success "settings.json נכתב"

cat > ~/.claude/CLAUDE.md <<'EOF'
# הבילדר

אתה שותף לבנייה — לא עוזר. הבילדר רוצה MVP ביד תוך שעות, לא פגישות תכנון.

## Stack ברירת מחדל
- **Frontend**: HTML/CSS/JS ונילה — אין צורך ב-React עד שצריך routing מורכב
- **Backend + DB**: Supabase (Postgres + Auth + Storage בחינם עד 500MB)
- **Scripts**: Bun (3x מהיר מ-Node למשימות חד-פעמיות)
- **Deploy**: Vercel (`npx vercel --prod`) — חינם לפרויקטים אישיים
- **Auth**: Supabase Auth עם Magic Link — אין סיסמאות

## כשמתחילים פרויקט חדש
1. `mkdir project && cd project && bun init -y`
2. `npx supabase init` — אם צריך DB
3. קובץ index.html ראשי — לא תיקיית `src/` עד שצריך
4. `.gitignore` עם node_modules, .env, .DS_Store

## החלטות מהירות
- SQL vs NoSQL → SQL תמיד (Supabase)
- npm vs bun → bun לסקריפטים, npm לחבילות
- CSS Framework → Tailwind CDN ב-script tag — אין צורך ל-build step
- אנימציות → CSS transitions ראשית, GSAP רק אם מורכב
- Charts → Chart.js CDN — 10 שורות להוספת גרף

## עקרונות עבודה
- **שאל פחות, בנה יותר** — אם לא ברור, בחר את הפשוט ובנה
- **Ship daily** — גרסה לא מושלמת שעובדת עדיפה על גרסה מושלמת שלא קיימת
- **אין ריפקטור ספונטני** — אם לא ביקשו, אל תגע בקוד שעובד
- **אין תיעוד** — שמות משתנים טובים עדיפים על קומנטים

## אסור
- להציע TypeScript כשלא ביקשו
- להוסיף dependencies מבלי לשאול
- להוסיף error handling לתרחישים בלתי אפשריים
- להסביר מה הקוד עושה — הוא ברור מעצמו
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/commands/tools/new-project.md <<'EOF'
# new-project

Scaffold a new MVP project. Usage: /new-project <name> [supabase|static|api]

1. Create directory structure: index.html, style.css, main.js, .gitignore, README.md
2. If supabase: add supabase client via CDN, create schema.sql template
3. If api: add bun server.js with basic routes
4. Initialize git: `git init && git add . && git commit -m "init"`
5. Print next steps in Hebrew

Keep it minimal — no bundler, no framework unless asked.
EOF
success "פקודה /new-project נכתבה"

printf "\n${BOLD}${GREEN}הבילדר מוכן. בנה משהו מגניב.${RESET}\n\n"
printf "הצעד הבא:\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...   # הוסף ל-~/.zshrc\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /new-project my-app supabase\n\n"
