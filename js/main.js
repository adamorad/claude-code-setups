const SETUPS = [
  {
    id: "builder",
    name: "הבילדר",
    user: "@buildil",
    color: "#00e5ff",
    description: "רעיון חדש כל שבוע. בונה MVP תוך יום ומשלח. לא מחכה לאף אחד.",
    tags: ["מהיר", "MVP", "שיחרור"],
    features: [
      "Ruflo MCP — סוכנים מרובים שעובדים במקביל",
      "Supabase plugin — DB + Auth + Storage בפקודה אחת",
      "Bun מותקן — הרצת סקריפטים 3x מהיר מ-Node",
      "פקודה /new-project — scaffold MVP תוך 10 שניות",
      "Prettier hook אוטומטי — קוד מסודר אחרי כל שמירה",
      "CLAUDE.md עם Stack decisions: Supabase, Vercel, Tailwind CDN",
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
      "פקודה /create-post — 3 גרסאות פוסט לכל פלטפורמה",
      "Skill: LinkedIn ישראלי — voice, hooks, hashtag bank",
      "Skill: Social Content — חוקים לאינסטגרם/TikTok/FB",
      "CLAUDE.md עם זמני פרסום מדויקים לקהל ישראלי",
      "Python + pandas לאנליטיקה בסיסית",
      "אסטרטגיה: מה עובד בכל פלטפורמה בישראל",
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
      "yfinance + pandas-ta — RSI, MACD, Bollinger Bands מוכנים",
      "Jupyter Lab לניסויים ומחקר",
      "plotly לגרפים אינטרקטיביים בדפדפן",
      "פקודה /stock-scan — סורק מניות TASE/NASDAQ",
      "CLAUDE.md עם טיקרים ושעות מסחר TASE מדויקים",
      "כלל ברזל: אין ביצוע עסקאות אוטומטי — רק התראות",
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
      "פקודה /landing-page — דף נחיתה RTL בעברית תוך דקות",
      "תבנית הצעת מחיר עם מע"מ 18% מוכנה",
      "CLAUDE.md: עוסק פטור (₪120k) vs מורשה, Bit/PayBox",
      "Supabase plugin — ניהול לקוחות ותורים",
      "ידע ישראלי: WhatsApp > מייל, ימי עסקים א'-ה'",
      "הסברים בעברית פשוטה — ללא ז'רגון טכני",
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
      "פקודה /create-quiz — חידון HTML RTL בכל נושא",
      "פקודה /worksheet — דף עבודה להדפסה (A4 RTL)",
      "CLAUDE.md עם תוכנית לימודים ישראלית לפי כיתה",
      "Reveal.js למצגות אינטרקטיביות — אין PowerPoint",
      "כל כלי עובד מהטלפון — ללא הרשמה",
      "גופן גדול, עברית, צבעים חמים — מותאם לכיתה",
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
      "תבנית p5.js מוכנה — full-screen canvas, HSB colors",
      "CLAUDE.md: מה CDN להשתמש לכל ספרייה (p5/Three/GSAP)",
      "פקודה /new-artwork — scaffold ויזואלי מהרעיון",
      "Tone.js למוזיקה גנרטיבית, Three.js לתלת-מימד",
      "Bun לפיתוח מהיר ללא build step",
      "GitHub Pages deployment — פרסום ב-3 פקודות",
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
      "פקודה /generate-quote — הצעת מחיר עם מע"מ 18% נכון",
      "פקודה /payment-reminder — תזכורת תשלום לפי ימי איחור",
      "CLAUDE.md: עוסק פטור/מורשה, Bit/PayBox, ניכוי מס",
      "תבנית הצעת מחיר מוכנה — פרטי עוסק, VAT, תנאים",
      "ידע: ייצוא לחו"ל = פטור ממע"מ (0%)",
      "Supabase plugin לניהול לקוחות ופרויקטים",
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
      "פקודה /parent-form — טופס הרשמה לאירוע בית ספר",
      "פקודה /whatsapp-message — הודעת ועד מוכנה לשליחה",
      "CLAUDE.md: ועד הורים, קבוצות WhatsApp, גיוס כספים",
      "אין הרשמה/לוגין — הורים פותחים ישר מהטלפון",
      "CSV export למרשמי נרשמים — פותח באקסל",
      "הסברים בעברית פשוטה — אין צורך ב-terminal ידע",
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
