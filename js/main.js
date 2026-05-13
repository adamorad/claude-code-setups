// accent colors: [dark, light]
const PALETTE = {
  teal: { dark: "#4ecdc4", light: "#1a8f88" },
  gold: { dark: "#c4a05e", light: "#7a5c18" },
  purple: { dark: "#9b72cf", light: "#5a3e9a" },
};
const CYCLE = [
  "teal",
  "gold",
  "purple",
  "teal",
  "gold",
  "purple",
  "teal",
  "gold",
];

const SETUPS = [
  {
    id: "builder",
    name: "הבילדר",
    user: "@buildil",
    color: "#4ecdc4",
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
    color: "#c4a05e",
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
    color: "#9b72cf",
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
    color: "#4ecdc4",
    description:
      "מסעדן, מאמן, בעל קליניקה — בונה אתר, מערכת הזמנות ו-CRM לעצמו.",
    tags: ["עסק קטן", "אתר", "CRM"],
    features: [
      "פקודה /landing-page — דף נחיתה RTL בעברית תוך דקות",
      "תבנית הצעת מחיר עם מע״מ 18% מוכנה",
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
    color: "#c4a05e",
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
    color: "#9b72cf",
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
    color: "#4ecdc4",
    description:
      "פרילנסר ישראלי שמאוטומט הצעות, חשבוניות ותיאום לקוחות — כדי לעבוד פחות.",
    tags: ["אוטומציה", "לקוחות", "חשבוניות"],
    features: [
      "פקודה /generate-quote — הצעת מחיר עם מע״מ 18% נכון",
      "פקודה /payment-reminder — תזכורת תשלום לפי ימי איחור",
      "CLAUDE.md: עוסק פטור/מורשה, Bit/PayBox, ניכוי מס",
      "תבנית הצעת מחיר מוכנה — פרטי עוסק, VAT, תנאים",
      "ידע: ייצוא לחו״ל = פטור ממע״מ (0%)",
      "Supabase plugin לניהול לקוחות ופרויקטים",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/freelancer/install.sh)",
  },
  {
    id: "parent",
    name: "ההורה",
    user: "@parent_builds",
    color: "#c4a05e",
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

// ── Toast ──────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("toast-show"));
  setTimeout(() => {
    t.classList.remove("toast-show");
    t.addEventListener("transitionend", () => t.remove());
  }, 1800);
}

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
  history.replaceState(null, "", `#${setup.id}`);
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
}

function copyCmd(id) {
  const text = document.getElementById(`cmd-${id}`).textContent;
  navigator.clipboard.writeText(text).then(() => showToast("הועתק ✓"));
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ── Deep link on load ─────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  const hash = location.hash.slice(1);
  if (hash) {
    const setup = SETUPS.find((s) => s.id === hash);
    if (setup) openModal(setup);
  }
});

// ── Theme toggle ──────────────────────────────────────────────────────────

let currentTheme = localStorage.getItem("theme") || "dark";

function getAccent(i) {
  const key = CYCLE[i % CYCLE.length];
  return PALETTE[key][currentTheme === "light" ? "light" : "dark"];
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme === "light" ? "light" : "";
  localStorage.setItem("theme", theme);
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = theme === "light" ? "🌙" : "☀️";
  tileEls.forEach((tile, i) =>
    tile.style.setProperty("--accent", getAccent(i)),
  );
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// ── Render tiles ──────────────────────────────────────────────────────────

const grid = document.getElementById("grid");
const tileEls = [];

SETUPS.forEach((setup, i) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.tags = setup.tags.join(",");
  tile.style.setProperty("--accent", getAccent(i));
  tile.style.setProperty("--i", i);
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
  tileEls.push(tile);
});

// ── Search ────────────────────────────────────────────────────────────────

const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
let searchQuery = "";

// Build a searchable text blob per setup for fast matching
const searchIndex = SETUPS.map((s) =>
  [s.name, s.user, s.description, ...s.tags, ...s.features]
    .join(" ")
    .toLowerCase(),
);

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle("visible", searchQuery.length > 0);
  applyFilter();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  searchClear.classList.remove("visible");
  searchInput.focus();
  applyFilter();
});

// ── Filter bar ────────────────────────────────────────────────────────────

const filterBar = document.getElementById("filter-bar");
const allTags = [...new Set(SETUPS.flatMap((s) => s.tags))];
let activeTag = null;

function renderFilterBar() {
  filterBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn" + (activeTag === null ? " active" : "");
  allBtn.textContent = "הכל";
  if (activeTag === null) allBtn.style.setProperty("--active-color", "#fff");
  allBtn.addEventListener("click", () => {
    activeTag = null;
    applyFilter();
  });
  filterBar.appendChild(allBtn);

  allTags.forEach((tag) => {
    const color = SETUPS.find((s) => s.tags.includes(tag))?.color ?? "#fff";
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (activeTag === tag ? " active" : "");
    btn.textContent = tag;
    if (activeTag === tag) btn.style.setProperty("--active-color", color);
    btn.addEventListener("click", () => {
      activeTag = activeTag === tag ? null : tag;
      applyFilter();
    });
    filterBar.appendChild(btn);
  });
}

function applyFilter() {
  renderFilterBar();
  let visibleIndex = 0;
  let visibleCount = 0;

  tileEls.forEach((tile, i) => {
    const tags = tile.dataset.tags.split(",");
    const tagMatch = activeTag === null || tags.includes(activeTag);
    const searchMatch =
      searchQuery === "" || searchIndex[i].includes(searchQuery);
    const show = tagMatch && searchMatch;

    tile.classList.toggle("hidden", !show);
    if (show) {
      visibleCount++;
      tile.style.setProperty("--i", visibleIndex++);
      tile.style.animation = "none";
      tile.offsetHeight;
      tile.style.animation = "";
    }
  });

  // show/hide empty state
  let emptyEl = document.getElementById("no-results");
  if (visibleCount === 0) {
    if (!emptyEl) {
      emptyEl = document.createElement("p");
      emptyEl.id = "no-results";
      emptyEl.className = "no-results";
      emptyEl.textContent = `אין תוצאות עבור "${searchInput.value}"`;
      grid.appendChild(emptyEl);
    } else {
      emptyEl.textContent = `אין תוצאות עבור "${searchInput.value}"`;
    }
  } else if (emptyEl) {
    emptyEl.remove();
  }
}

renderFilterBar();

// apply saved theme after tiles exist
applyTheme(currentTheme);
