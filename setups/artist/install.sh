#!/usr/bin/env bash
set -euo pipefail
BOLD="\033[1m"; GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RESET="\033[0m"
info()    { printf "${CYAN}==> ${RESET}${BOLD}%s${RESET}\n" "$*"; }
success() { printf "${GREEN}✓  ${RESET}%s\n" "$*"; }
warn()    { printf "${YELLOW}⚠  ${RESET}%s\n" "$*"; }

printf "\n${BOLD}האמן — Claude Code Setup${RESET}\n${CYAN}@art_vibe${RESET}\n\n"

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
for pkg in git gh node bun jq; do
  brew list "$pkg" &>/dev/null && success "$pkg קיים" || { brew install "$pkg"; success "$pkg הותקן"; }
done

npm list -g "@anthropic-ai/claude-code" &>/dev/null && success "claude-code קיים" || { npm install -g "@anthropic-ai/claude-code"; success "claude-code הותקן"; }

info "כותב הגדרות Claude Code..."
mkdir -p ~/.claude/commands/tools
mkdir -p ~/.claude/templates/p5-starter
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
# האמן

אתה עוזר לאמן דיגיטלי ישראלי. קוד הוא חומר גלם — לא מטרה. מה שמופיע על המסך חשוב יותר ממה שכתוב בקוד.

## ספריות וכשמשתמשים בהן
| ספרייה | מתי | CDN |
|--------|-----|-----|
| **p5.js** | אמנות גנרטיבית, פרטיקלים, גיאומטריה | `<script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js">` |
| **Three.js** | תלת-מימד, סצנות 3D, shader art | `<script src="https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.min.js">` |
| **GSAP** | אנימציות מורכבות, timeline | `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js">` |
| **Tone.js** | מוזיקה גנרטיבית, Web Audio | `<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js">` |
| **Vanilla JS** | כל השאר — אינטרקציה פשוטה | ––– |

## p5.js — דפוסים שימושיים
```javascript
// פרטיקלים שנעים לעכבר
let particles = [];
function draw() {
  background(0, 20); // trail effect
  particles.forEach(p => { p.update(); p.draw(); });
}

// צבע מ-HSB (יפה יותר מ-RGB)
colorMode(HSB, 360, 100, 100);
fill(frameCount % 360, 80, 90);

// Noise לתנועה אורגנית
x += map(noise(t), 0, 1, -2, 2);
```

## Three.js — התחלה מהירה
```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
// → הוסף mesh, אנימציה ב-requestAnimationFrame
```

## עקרונות
- **תאר מה יראה המשתמש**, לא מה הקוד עושה
  - "עיגולים שנופלים עם זנב של אור" לא "circles with alpha trail"
- **ניסוי וטעייה** הוא חלק מהתהליך — עודד אותו
- **פשוט וייחודי** עדיף על מורכב ורגיל
- כל פרויקט = קובץ HTML בודד — קל לשתף וסבייב ב-GitHub Pages
- צבעי ברירת מחדל: רקע שחור, accent ניאון — אלא אם ביקשו אחרת

## פרסום GitHub Pages
```bash
git init && git add . && git commit -m "artwork"
gh repo create --public my-art && git push -u origin main
gh api repos/USERNAME/my-art/pages --method POST -f 'source[branch]=main' -f 'source[path]=/'
# → https://USERNAME.github.io/my-art/
```
EOF
success "CLAUDE.md נכתב"

cat > ~/.claude/templates/p5-starter/index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Artwork</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js"></script>
  <script>
    function setup() {
      createCanvas(windowWidth, windowHeight);
      colorMode(HSB, 360, 100, 100);
    }

    function draw() {
      background(0, 10);
      // כתוב כאן את האמנות שלך
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }
  </script>
</body>
</html>
EOF
success "תבנית p5.js נכתבה"

cat > ~/.claude/commands/tools/new-artwork.md <<'EOF'
# new-artwork

Scaffold a new creative coding project.

Usage: /new-artwork <idea-description> [p5|three|vanilla]

Steps:
1. Listen to the artistic idea — describe what it should LOOK like
2. Choose library: p5.js for generative/2D, Three.js for 3D, vanilla for interactive
3. Copy the p5-starter template from ~/.claude/templates/p5-starter/
4. Build the initial sketch — focus on visual result, not code elegance
5. Describe what the user will see: "יופיעו עיגולים שנעים לעכבר..."
6. Print: "פתח index.html בדפדפן — לחץ Cmd+Shift+R לרענון"

Iterate fast. First version doesn't need to be perfect.
Always use full-screen canvas (windowWidth/windowHeight).
EOF
success "פקודה /new-artwork נכתבה"

printf "\n${BOLD}${GREEN}האמן מוכן. צור משהו יפה.${RESET}\n\n"
printf "  export ANTHROPIC_API_KEY=sk-ant-...\n"
printf "  claude\n\n"
printf "פקודות מהירות:\n"
printf "  /new-artwork \"פרטיקלים שמגיבים למוזיקה\" p5\n\n"
printf "תבנית p5.js נמצאת ב: ~/.claude/templates/p5-starter/index.html\n\n"
