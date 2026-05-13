const SETUPS = [
  {
    id: "builder",
    name: "הבילדר",
    user: "@buildil",
    color: "#00e5ff",
    description: "רעיון חדש כל שבוע. בונה MVP תוך יום ומשלח. לא מחכה לאף אחד.",
    tags: ["מהיר", "MVP", "שיחרור"],
    features: [
      "Claude Code + Ruflo לבנייה עם סוכנים מרובים",
      "Supabase לבסיס נתונים ואותנטיקציה מהיר",
      "Bun לריצה מהירה של סקריפטים",
      "GitHub CLI לדחיפה מהירה לגיט",
      "הוק אוטומטי: עיצוב קוד לאחר כל שמירה",
      "CLAUDE.md שמנחה קלוד לבנות מהר ולשאול פחות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/builder/install.sh)",
  },
  {
    id: "influencer",
    name: "המשפיען",
    user: "@vibe_content",
    color: "#b400ff",
    description:
      "יוצר תוכן ישראלי שבונה כלים לקהל שלו. אוטומציה של פוסטים, אנליטיקה, ניוזלטר.",
    tags: ["תוכן", "אוטומציה", "קהילה"],
    features: [
      "כלי יצירת תוכן עברי לLinkedIn, אינסטגרם, טיקטוק",
      "סקריפטים לאוטומציה של פרסום",
      "CLAUDE.md בעברית עם הנחיות לכתיבת תוכן",
      "כלי ניתוח ביצועי תוכן",
      "תבניות לפוסטים ותגובות בעברית",
      "סקיל: אסטרטגיית LinkedIn ישראלית",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/influencer/install.sh)",
  },
  {
    id: "trader",
    name: "הסוחר",
    user: "@trade_vibe",
    color: "#00ff88",
    description:
      "סוחר שבונה דשבורדים, סורקים ובוטים לשוק ההון והקריפטו. ללא רקע בפיתוח.",
    tags: ["שוק ההון", "דשבורד", "בוטים"],
    features: [
      "Python 3.13 + pandas לניתוח נתוני שוק",
      "Jupyter לניסויים ומחקר",
      "כלי בניית דשבורד מהיר",
      "סקריפטים לשליפת נתוני מניות וקריפטו",
      "CLAUDE.md שמבין טרמינולוגיה של שוק הון בעברית",
      "התראות לWhatsApp/טלגרם על אותות מסחר",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/trader/install.sh)",
  },
  {
    id: "bizowner",
    name: "בעל העסק",
    user: "@biz_il",
    color: "#ff6b00",
    description:
      "מסעדן, מאמן, בעל קליניקה — בונה אתר, מערכת הזמנות ו-CRM לעצמו.",
    tags: ["עסק קטן", "אתר", "CRM"],
    features: [
      "תבניות אתר מוכנות לעסקים ישראלים",
      "Supabase לניהול לקוחות ותורים",
      "כלי יצירת דפי נחיתה מהיר",
      "אינטגרציה לWhatsApp Business",
      "CLAUDE.md שמדבר עסקים, לא קוד",
      "אוטומציה של הצעות מחיר ותזכורות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/bizowner/install.sh)",
  },
  {
    id: "teacher",
    name: "המורה",
    user: "@teacher_builds",
    color: "#ffd600",
    description:
      "מורה שבונה חידונים, דפי עבודה ומערכי שיעור אינטרקטיביים — ללא ידע בקוד.",
    tags: ["חינוך", "חידונים", "כיתה"],
    features: [
      "בונה חידונים ומבחנים אוטומטי",
      "יצירת דפי עבודה בPDF",
      "CLAUDE.md עם הקשר חינוכי ישראלי",
      "כלי יצירת מצגות אינטרקטיביות",
      "מחולל תרגילים מותאם לתוכנית לימודים",
      "מינימום טכני — קלוד עושה הכל",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/teacher/install.sh)",
  },
  {
    id: "artist",
    name: "האמן",
    user: "@art_vibe",
    color: "#0066ff",
    description:
      "אמן דיגיטלי שבונה חוויות אינטרקטיביות, גנרטיב ארט ואתרי פורטפוליו.",
    tags: ["גנרטיב", "אינטרקטיב", "פורטפוליו"],
    features: [
      "p5.js + Three.js לאמנות גנרטיבית",
      "Bun לפיתוח מהיר של פרויקטים ויזואליים",
      "כלי בניית פורטפוליו מהיר",
      "CLAUDE.md שמבין שפה ויזואלית ואמנותית",
      "תבניות לאנימציה ואינטרקציה",
      "פריסה מיידית לGitHub Pages",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/artist/install.sh)",
  },
  {
    id: "freelancer",
    name: "הפרילנסר",
    user: "@freelance_il",
    color: "#ff2d55",
    description:
      "פרילנסר ישראלי שמאוטומט הצעות, חשבוניות ותיאום לקוחות — כדי לעבוד פחות.",
    tags: ["אוטומציה", "לקוחות", "חשבוניות"],
    features: [
      "מחולל הצעות מחיר בעברית ואנגלית",
      "אוטומציה של חשבוניות ותזכורות תשלום",
      "CLAUDE.md שמבין עבודה עצמאית ישראלית",
      "כלי ניהול פרויקטים קל",
      "סקריפטים לדיווח שעות ללקוח",
      "תבניות חוזים ותנאי שימוש בעברית",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/freelancer/install.sh)",
  },
  {
    id: "parent",
    name: "ההורה",
    user: "@parent_builds",
    color: "#ff2db0",
    description:
      "הורה שבונה אפליקציות לבית הספר, לועד הורים ולילדים — מהנייד ומהמחשב.",
    tags: ["ילדים", "קהילה", "בית ספר"],
    features: [
      "בונה אפליקציות WhatsApp Group בקלות",
      "כלי ניהול אירועי ועד הורים",
      "CLAUDE.md שמדבר בשפה פשוטה ונגישה",
      "יצירת סקרים וטפסי הרשמה",
      "תזמון תזכורות לאספות והורים",
      "מינימום הגדרות — מתחילים תוך 5 דקות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/parent/install.sh)",
  },
];

// ── Modal ─────────────────────────────────────────────────────────────────

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openModal(setup) {
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()" aria-label="סגור">✕</button>
    <div class="modal-header">
      <span class="modal-accent" style="color:${setup.color}">◆</span>
      <div>
        <h2>${setup.name}</h2>
        <span class="modal-user">${setup.user}</span>
        <span class="modal-tags">${setup.tags.map((t) => `<span class="tag" style="border-color:${setup.color};color:${setup.color}">${t}</span>`).join("")}</span>
      </div>
    </div>
    <p class="modal-desc">${setup.description}</p>
    <h3>מה כלול</h3>
    <ul class="feature-list">
      ${setup.features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
    <h3>התקנה</h3>
    <div class="install-block">
      <code id="cmd-${setup.id}">${setup.installCmd}</code>
      <button class="copy-btn" onclick="copyCmd('${setup.id}')" title="העתק">⎘</button>
    </div>
    <p class="prereqs">Prerequisites: macOS · Apple Silicon · Xcode CLI Tools</p>
  `;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function copyCmd(id) {
  const text = document.getElementById(`cmd-${id}`).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "✓";
    setTimeout(() => (btn.textContent = "⎘"), 1500);
  });
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ── Render tiles ──────────────────────────────────────────────────────────

const grid = document.getElementById("grid");

SETUPS.forEach((setup) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.style.setProperty("--accent", setup.color);
  tile.innerHTML = `
    <div class="tile-glow"></div>
    <div class="tile-body">
      <div class="tile-name">${setup.name}</div>
      <div class="tile-user">${setup.user}</div>
      <div class="tile-desc">${setup.description}</div>
      <div class="tile-tags">
        ${setup.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  `;
  tile.addEventListener("click", () => openModal(setup));
  grid.appendChild(tile);
});
