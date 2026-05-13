// ── Palette ───────────────────────────────────────────────────────────────────
const PALETTE = {
  teal: { dark: "#4ecdc4", light: "#1a8f88" },
  gold: { dark: "#c4a05e", light: "#7a5c18" },
  purple: { dark: "#9b72cf", light: "#5a3e9a" },
};
// Okabe-Ito palette — safe for deuteranopia & protanopia
const PALETTE_CB = {
  teal: { dark: "#56b4e9", light: "#0072b2" },
  gold: { dark: "#e69f00", light: "#c07800" },
  purple: { dark: "#009e73", light: "#007a58" },
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
let colorBlindMode = !!localStorage.getItem("cb-palette");

// ── Data ──────────────────────────────────────────────────────────────────────
const SETUPS = [
  {
    id: "builder",
    name: "הבילדר",
    user: "@buildil",
    time: "3 דק׳",
    level: "מתחיל",
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
    week1: [
      "לנד פייג׳ עם waitlist — בפחות מיום",
      "API REST עם Supabase — ב-2 שעות",
      "בוט Telegram שמשיב אוטומטית",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/builder/install.sh)",
  },
  {
    id: "influencer",
    name: "המשפיען",
    user: "@vibe_content",
    time: "5 דק׳",
    level: "מתחיל",
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
    week1: [
      "לוח תוכן שבועי מתוכנן אוטומטית",
      "3 גרסאות פוסט LinkedIn מוכנות לפרסום",
      "ניוזלטר ראשון שנשלח ל-100 נרשמים",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/influencer/install.sh)",
  },
  {
    id: "trader",
    name: "הסוחר",
    user: "@trade_vibe",
    time: "8 דק׳",
    level: "בינוני",
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
    week1: [
      "סורק RSI שבודק 50 מניות TASE בלחיצה",
      "דשבורד מחירים חי בדפדפן",
      "התראה כשמניה פורצת רמת מחיר",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/trader/install.sh)",
  },
  {
    id: "bizowner",
    name: "בעל העסק",
    user: "@biz_il",
    time: "3 דק׳",
    level: "מתחיל",
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
    week1: [
      "אתר עסקי עם טופס הזמנות — ב-3 שעות",
      "מערכת ניהול תורים ולקוחות פשוטה",
      "עמוד מחירים עם כפתור WhatsApp ישיר",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/bizowner/install.sh)",
  },
  {
    id: "teacher",
    name: "המורה",
    user: "@teacher_builds",
    time: "4 דק׳",
    level: "מתחיל",
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
    week1: [
      "חידון HTML אינטרקטיבי בכל נושא לכיתה",
      "דף עבודה מוכן להדפסה — A4 עברית",
      "מצגת אינטרקטיבית לשיעור הראשון",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/teacher/install.sh)",
  },
  {
    id: "artist",
    name: "האמן",
    user: "@art_vibe",
    time: "5 דק׳",
    level: "מתחיל",
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
    week1: [
      "ויזואל גנרטיבי אינטרקטיבי ב-p5.js",
      "אנימציה לפוסט אינסטגרם",
      "פורטפוליו מינימליסטי חי ב-GitHub Pages",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/artist/install.sh)",
  },
  {
    id: "freelancer",
    name: "הפרילנסר",
    user: "@freelance_il",
    time: "3 דק׳",
    level: "בינוני",
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
    week1: [
      "הצעת מחיר אוטומטית עם VAT בלחיצה",
      "תזכורת תשלום אוטומטית לפי ימי איחור",
      "אתר הצגת שירותים עם טופס יצירת קשר",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/freelancer/install.sh)",
  },
  {
    id: "parent",
    name: "ההורה",
    user: "@parent_builds",
    time: "3 דק׳",
    level: "מתחיל",
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
    week1: [
      "טופס הרשמה לטיול כיתתי — ישר ב-WhatsApp",
      "הודעת ועד הורים מוכנה לשליחה",
      "רשימת נרשמים לאייצוא ל-Excel",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/parent/install.sh)",
  },
  {
    id: "student",
    name: "הסטודנט",
    user: "@student_builds",
    time: "3 דק׳",
    level: "מתחיל",
    description:
      "סטודנט שבונה כלים ללמידה, מחקר ועבודות גמר — Python, סיכומים ובחינות.",
    tags: ["לימודים", "מחקר", "Python"],
    features: [
      "Jupyter Lab מוכן — ניתוח נתונים לקורסים",
      "פקודה /summarize-paper — סיכום מאמר אקדמי ב-5 נקודות",
      "CLAUDE.md עם APA7 referencing אוטומטי",
      "Git workflow לעבודות — commit לכל שלב",
      "Python + matplotlib + seaborn לוויזואליזציה",
      "פקודה /study-quiz — חידון חזרה מהחומר שלך",
    ],
    week1: [
      "סיכום אוטומטי של 10 מאמרים לעבודה סמינרית",
      "ניתוח dataset של הקורס עם גרפים מוכנים",
      "חידון חזרה מוכן לפני הבחינה",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/student/install.sh)",
  },
  {
    id: "startup",
    name: "הסטארטאפר",
    user: "@startup_vibe",
    time: "5 דק׳",
    level: "בינוני",
    description:
      "מייסד שרץ לפגישת משקיעים. בונה MVP, pitch deck ו-metrics dashboard תוך ימים.",
    tags: ["סטארטאפ", "משקיעים", "MVP"],
    features: [
      "פקודה /pitch-deck — מצגת משקיעים מהרעיון תוך דקות",
      "פקודה /runway-calc — מחשבון runway עם תחזיות שרידות",
      "CLAUDE.md עם YC template ו-unit economics",
      "Supabase plugin לאנליטיקה ו-user tracking",
      "Ruflo MCP — בניית features במקביל",
      "פקודה /one-pager — executive summary PDF",
    ],
    week1: [
      "MVP עם auth ו-waitlist רץ בפרודקשן",
      "pitch deck 10 שקפים מוכן לפגישה",
      "metrics dashboard חי בזמן אמת",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/startup/install.sh)",
  },
  {
    id: "gamer",
    name: "הגיימר",
    user: "@game_vibe",
    time: "6 דק׳",
    level: "בינוני",
    description:
      "מפתח משחקים עצמאי שבונה משחקי browser ו-2D — ללא ניסיון קודם.",
    tags: ["גיימינג", "Phaser", "2D"],
    features: [
      "Phaser.js template מוכן — game loop, sprites, sound",
      "פקודה /new-game — scaffold משחק חדש עם physics",
      "CLAUDE.md עם game design patterns ו-mobile touch",
      "itch.io deployment — פרסום ב-3 פקודות",
      "Web Audio API — sound effects מוכנים",
      "leaderboard עם Supabase — ציונים בזמן אמת",
    ],
    week1: [
      "משחק runner בסיסי שרץ בדפדפן",
      "leaderboard חי עם Supabase",
      "פרסום ב-itch.io עם thumbnail",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/gamer/install.sh)",
  },
  {
    id: "podcaster",
    name: "הפודקאסטר",
    user: "@podcast_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מפיק פודקאסט עברי שמאוטומט תמלול, שו נוטס וקטעים לרשתות חברתיות.",
    tags: ["פודקאסט", "תמלול", "תוכן"],
    features: [
      "Whisper API — תמלול עברי אוטומטי",
      "פקודה /show-notes — שו נוטס מוכן מהתמלול",
      "פקודה /clips — 5 קטעים ויראליים לאינסטגרם",
      "CLAUDE.md עם voice ו-tone של הפודקאסט",
      "RSS feed generator — הפצה לכל הפלטפורמות",
      "פקודה /episode-title — 10 כותרות לבחירה",
    ],
    week1: [
      "תמלול פרק קיים + שו נוטס מוכן לפרסום",
      "5 קטעי ריל לאינסטגרם",
      "RSS feed שמוזן ל-Spotify ו-Apple Podcasts",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/podcaster/install.sh)",
  },
  {
    id: "coach",
    name: "המאמן",
    user: "@coach_builds",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מאמן כושר או חיים שבונה מערכת ניהול לקוחות, תוכניות אימון ועקיבת התקדמות.",
    tags: ["כושר", "לקוחות", "תוכניות"],
    features: [
      "פקודה /training-plan — תוכנית אימון ל-8 שבועות",
      "Supabase לניהול לקוחות, מדידות ו-check-ins",
      "פקודה /progress-report — דוח התקדמות ויזואלי",
      "WhatsApp template — עדכון שבועי ללקוח",
      "CLAUDE.md עם כללי תזונה ו-periodization",
      "calendar integration — תזמון אימונים אוטומטי",
    ],
    week1: [
      "פורטל לקוח עם תוכנית אימון ומדידות",
      "3 לקוחות פעילים רשומים במערכת",
      "דוח התקדמות חודשי אוטומטי",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/coach/install.sh)",
  },
  {
    id: "realestate",
    name: "הסוכן",
    user: "@realestate_il",
    time: "5 דק׳",
    level: "מתחיל",
    description:
      'סוכן נדל"ן שבונה כלים לחישוב משכנתאות, ניהול לידים ודפי נכס בעברית.',
    tags: ['נדל"ן', "משכנתא", "לידים"],
    features: [
      "פקודה /mortgage-calc — מחשבון משכנתא ישראלי מלא",
      "פקודה /property-page — דף נכס RTL עם תמונות",
      'CLAUDE.md עם שוק הנדל"ן הישראלי ומסי רכישה',
      "Supabase לניהול לידים ונכסים",
      "מחשבון מס שבח ומס רכישה עדכני",
      "WhatsApp follow-up אוטומטי ללידים",
    ],
    week1: [
      "מחשבון משכנתא עם טבלת החזרים",
      "דף נכס ראשון עם תמונות ו-contact form",
      "CRM לידים עם status tracking",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/realestate/install.sh)",
  },
  {
    id: "musician",
    name: "המוזיקאי",
    user: "@music_builds",
    time: "5 דק׳",
    level: "מתחיל",
    description:
      "מוזיקאי עצמאי שבונה כלים להפצה, ניהול royalties ופרזנטציה מקצועית.",
    tags: ["מוזיקה", "הפצה", "קטלוג"],
    features: [
      "פקודה /release-checklist — רשימת שחרור single/album",
      "CLAUDE.md עם פלטפורמות הפצה ישראליות ובינלאומיות",
      "פקודה /bio — bio מוכן ל-Spotify ו-press kit",
      "royalties tracker עם Supabase",
      "EPK generator — press kit PDF מקצועי",
      "עמוד אמן עם embedded player",
    ],
    week1: [
      "press kit ו-bio מוכן ב-3 שפות",
      "royalties tracking מכל הפלטפורמות",
      "עמוד אמן חי עם player",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/musician/install.sh)",
  },
  {
    id: "engineer",
    name: "המהנדס",
    user: "@eng_builds",
    time: "6 דק׳",
    level: "מתקדם",
    description:
      "מהנדס תוכנה שבונה CLI tools, automations ו-internal dashboards לצוות.",
    tags: ["CLI", "אוטומציה", "צוות"],
    features: [
      "Bun + TypeScript — CLI tools מהירים לצוות",
      "פקודה /new-tool — scaffold CLI חדש עם yargs",
      "CLAUDE.md עם coding standards ו-PR conventions",
      "Ruflo MCP — orchestration של וורקפלואים מורכבים",
      "internal dashboard עם Supabase + React",
      "Prettier + ESLint hooks אוטומטיים",
    ],
    week1: [
      "CLI tool שחוסך 2 שעות שבועיות לצוות",
      "dashboard פנימי עם metrics של הצוות",
      "automation לפרוצס ה-onboarding",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/engineer/install.sh)",
  },
];

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("toast-show"));
  setTimeout(() => {
    t.classList.remove("toast-show");
    t.addEventListener("transitionend", () => t.remove(), { once: true });
  }, 1800);
}

// ── Favorites ─────────────────────────────────────────────────────────────────
function getFavs() {
  try {
    return new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
  } catch {
    return new Set();
  }
}

function toggleFav(id) {
  const favs = getFavs();
  if (favs.has(id)) favs.delete(id);
  else favs.add(id);
  localStorage.setItem("favs", JSON.stringify([...favs]));
  updateFavButtons();
}

function updateFavButtons() {
  const favs = getFavs();
  document.querySelectorAll(".tile-fav").forEach((btn) => {
    const active = favs.has(btn.dataset.id);
    btn.classList.toggle("active", active);
    btn.textContent = active ? "♥" : "♡";
    btn.setAttribute("aria-label", active ? "הסר ממועדפים" : "שמור למועדפים");
    btn.setAttribute("aria-pressed", String(active));
  });
}

// ── Install history ───────────────────────────────────────────────────────────
function getHistory() {
  try {
    return new Set(JSON.parse(localStorage.getItem("install_history") || "[]"));
  } catch {
    return new Set();
  }
}

function markCopied(id) {
  const h = getHistory();
  h.add(id);
  localStorage.setItem("install_history", JSON.stringify([...h]));
  updateHistoryIndicators();
}

function updateHistoryIndicators() {
  const h = getHistory();
  tileEls.forEach((tile, i) => {
    const el = tile.querySelector(".tile-copied");
    if (el) el.hidden = !h.has(SETUPS[i].id);
  });
}

// ── Recently viewed ───────────────────────────────────────────────────────────
function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem("rv") || "[]");
  } catch {
    return [];
  }
}

function trackRecentlyViewed(id) {
  const rv = getRecentlyViewed().filter((x) => x !== id);
  rv.unshift(id);
  localStorage.setItem("rv", JSON.stringify(rv.slice(0, 5)));
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  const container = document.getElementById("recently-viewed");
  if (!container) return;
  const rv = getRecentlyViewed();
  if (rv.length < 2) {
    container.innerHTML = "";
    return;
  }
  const items = rv.map((id) => SETUPS.find((s) => s.id === id)).filter(Boolean);
  container.innerHTML = `
    <div class="rv-strip">
      <span class="rv-label">צפית לאחרונה:</span>
      ${items.map((s) => `<button class="rv-chip" data-id="${s.id}">${s.name}</button>`).join("")}
    </div>
  `;
  container.querySelectorAll(".rv-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = SETUPS.find((x) => x.id === btn.dataset.id);
      if (s) openModal(s);
    });
  });
}

// ── Focus trap ────────────────────────────────────────────────────────────────
let _trapHandler = null;

function enableFocusTrap() {
  _trapHandler = (e) => {
    if (e.key !== "Tab") return;
    const els = [
      ...modalContent.querySelectorAll(
        "button:not([disabled]),[href],input,[tabindex]:not([tabindex='-1'])",
      ),
    ];
    if (!els.length) return;
    const first = els[0],
      last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", _trapHandler);
}

function disableFocusTrap() {
  if (_trapHandler) {
    document.removeEventListener("keydown", _trapHandler);
    _trapHandler = null;
  }
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
let _lastFocused = null;
let currentModalIndex = -1;

function navigateModal(direction) {
  const next = SETUPS[currentModalIndex + direction];
  if (next) openModal(next);
}

async function shareSetup(setup) {
  const url = `${location.origin}${location.pathname}#${setup.id}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: setup.name,
        text: setup.description,
        url,
      });
      return;
    } catch (err) {
      if (err.name === "AbortError") return;
    }
  }
  navigator.clipboard.writeText(url).then(() => showToast("קישור הועתק ✓"));
}

function getSimilarSetups(setup, count = 2) {
  const idx = SETUPS.findIndex((s) => s.id === setup.id);
  return SETUPS.filter((s) => s.id !== setup.id)
    .map((s) => ({
      s,
      score: s.tags.filter((t) => setup.tags.includes(t)).length,
      dist: Math.abs(SETUPS.indexOf(s) - idx),
    }))
    .sort((a, b) => b.score - a.score || a.dist - b.dist)
    .slice(0, count)
    .map((x) => x.s);
}

function openModal(setup) {
  if (modal.classList.contains("open")) {
    disableFocusTrap();
  } else {
    _lastFocused = document.activeElement;
  }
  tileEls.forEach((t) => t.setAttribute("aria-expanded", "false"));
  currentModalIndex = SETUPS.findIndex((s) => s.id === setup.id);
  if (tileEls[currentModalIndex])
    tileEls[currentModalIndex].setAttribute("aria-expanded", "true");
  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex < SETUPS.length - 1;
  const accent = setup.color;
  modalContent.innerHTML = `
    <div class="modal-nav-row">
      <button class="modal-nav-btn" id="modal-prev" ${!hasPrev ? "disabled" : ""} aria-label="הסטאפ הקודם">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        הקודם
      </button>
      <span class="modal-nav-pos">${currentModalIndex + 1} / ${SETUPS.length}</span>
      <button class="modal-nav-btn" id="modal-next" ${!hasNext ? "disabled" : ""} aria-label="הסטאפ הבא">
        הבא
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>
    <button class="modal-close" id="modal-close-btn" aria-label="סגור">✕</button>
    <div class="modal-header">
      <span class="modal-accent" style="color:${accent}">◆</span>
      <div>
        <h2>${setup.name}</h2>
        <span class="modal-user">${setup.user}</span>
        <span class="modal-tags">${setup.tags.map((t) => `<span class="tag" style="border-color:${accent};color:${accent}">${t}</span>`).join("")}</span>
      </div>
    </div>
    <p class="modal-desc">${setup.description}</p>
    <h3>מה כלול</h3>
    <ul class="feature-list">
      ${setup.features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
    ${
      setup.week1
        ? `<h3 class="week1-heading">מה תבנה בשבוע הראשון</h3>
    <ul class="week1-list">
      ${setup.week1.map((p) => `<li class="week1-item"><span class="week1-check" aria-hidden="true">→</span>${p}</li>`).join("")}
    </ul>`
        : ""
    }
    <h3>התקנה</h3>
    <details class="prereqs-details">
      <summary class="prereqs-summary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        דרישות קדם
      </summary>
      <ul class="prereqs-list">
        <li><label class="prereq-item"><input type="checkbox" class="prereq-check"><span>macOS עם Apple Silicon (M1/M2/M3/M4)</span></label></li>
        <li><label class="prereq-item"><input type="checkbox" class="prereq-check"><span>Xcode Command Line Tools — <code class="inline-cmd">xcode-select --install</code></span></label></li>
        <li><label class="prereq-item"><input type="checkbox" class="prereq-check"><span>Terminal פתוח (Terminal.app או iTerm2)</span></label></li>
        <li><label class="prereq-item"><input type="checkbox" class="prereq-check"><span>חיבור לאינטרנט</span></label></li>
      </ul>
    </details>
    <div class="install-block">
      <code id="cmd-${setup.id}">${setup.installCmd}</code>
      <button class="copy-btn" id="copy-btn-${setup.id}" title="העתק">⎘</button>
    </div>
    <div class="modal-footer-row">
      <p class="prereqs" style="display:none"></p>
      <button class="share-btn" id="share-btn-${setup.id}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        שתף
      </button>
    </div>
    <div class="similar-section">
      <h3>אולי גם יעניין אותך</h3>
      <div class="similar-grid">
        ${getSimilarSetups(setup)
          .map(
            (s) => `
          <button class="similar-card" data-id="${s.id}" style="--s-accent:${s.color}">
            <span class="similar-dot" style="background:${s.color}"></span>
            <span class="similar-name">${s.name}</span>
            <span class="similar-tags">${s.tags.slice(0, 2).join(" · ")}</span>
          </button>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

  document
    .getElementById("modal-close-btn")
    .addEventListener("click", closeModal);
  document
    .getElementById(`copy-btn-${setup.id}`)
    .addEventListener("click", () => copyCmd(setup.id));
  document
    .getElementById(`share-btn-${setup.id}`)
    .addEventListener("click", () => shareSetup(setup));
  if (hasPrev)
    document
      .getElementById("modal-prev")
      .addEventListener("click", () => navigateModal(-1));
  if (hasNext)
    document
      .getElementById("modal-next")
      .addEventListener("click", () => navigateModal(1));

  modalContent.querySelectorAll(".similar-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = SETUPS.find((x) => x.id === btn.dataset.id);
      if (s) openModal(s);
    });
  });

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", `#${setup.id}`);
  trackRecentlyViewed(setup.id);
  enableFocusTrap();
  setTimeout(() => document.getElementById("modal-close-btn")?.focus(), 50);
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
  disableFocusTrap();
  if (tileEls[currentModalIndex])
    tileEls[currentModalIndex].setAttribute("aria-expanded", "false");
  if (_lastFocused) {
    _lastFocused.focus();
    _lastFocused = null;
  }
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const colors = [
    "#4ecdc4",
    "#c4a05e",
    "#9b72cf",
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
  ];
  const particles = Array.from({ length: 90 }, () => ({
    x: canvas.width * 0.15 + Math.random() * canvas.width * 0.7,
    y: canvas.height * 0.45,
    vx: (Math.random() - 0.5) * 9,
    vy: -(Math.random() * 8 + 3),
    color: colors[Math.floor(Math.random() * colors.length)],
    w: Math.random() * 9 + 4,
    h: Math.random() * 5 + 3,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.28,
    g: 0.22 + Math.random() * 0.1,
  }));

  const start = performance.now();
  const dur = 2200;

  function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g;
      p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - t / dur);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t < dur) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}

function copyCmd(id) {
  const text = document.getElementById(`cmd-${id}`).textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("הועתק ✓");
    if (navigator.vibrate) navigator.vibrate(50);
    markCopied(id);
    if (!localStorage.getItem("confetti_done")) {
      localStorage.setItem("confetti_done", "1");
      triggerConfetti();
    }
  });
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.target.tagName === "INPUT") return;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    navigateModal(1);
  } // RTL: left = next
  if (e.key === "ArrowRight") {
    e.preventDefault();
    navigateModal(-1);
  } // RTL: right = prev
});

// swipe: down = close, left/right = navigate
let _swipeStartX = 0;
let _swipeStartY = 0;
modal.addEventListener(
  "touchstart",
  (e) => {
    _swipeStartX = e.touches[0].clientX;
    _swipeStartY = e.touches[0].clientY;
  },
  { passive: true },
);
modal.addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - _swipeStartX;
    const dy = e.changedTouches[0].clientY - _swipeStartY;
    if (Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx)) {
      closeModal();
    } else if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      navigateModal(dx < 0 ? 1 : -1); // swipe left = next, swipe right = prev
    }
  },
  { passive: true },
);

// ── Deep link ─────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  renderRecentlyViewed();
  const hash = location.hash.slice(1);
  if (hash) {
    const setup = SETUPS.find((s) => s.id === hash);
    if (setup) openModal(setup);
  }
});

// ── Theme ─────────────────────────────────────────────────────────────────────
let currentTheme = localStorage.getItem("theme") || "dark";

function getAccent(i) {
  const pal = colorBlindMode ? PALETTE_CB : PALETTE;
  return pal[CYCLE[i % CYCLE.length]][
    currentTheme === "light" ? "light" : "dark"
  ];
}

function reapplyAccents() {
  tileEls.forEach((tile, i) =>
    tile.style.setProperty("--accent", getAccent(i)),
  );
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme === "light" ? "light" : "";
  localStorage.setItem("theme", theme);
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = theme === "light" ? "🌙" : "☀️";
  reapplyAccents();
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// ── Tile rendering ────────────────────────────────────────────────────────────
const grid = document.getElementById("grid");
const tileEls = [];

function getGridCols() {
  if (window.innerWidth > 960) return 4;
  if (window.innerWidth > 560) return 2;
  return 1;
}

grid.innerHTML = "";
SETUPS.forEach((setup, i) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.tags = setup.tags.join(",");
  tile.dataset.id = setup.id;
  tile.style.setProperty("--accent", getAccent(i));
  tile.style.setProperty("--i", i);
  tile.setAttribute("tabindex", "0");
  tile.setAttribute("role", "button");
  tile.setAttribute("aria-label", `פתח ${setup.name}`);
  tile.setAttribute("aria-expanded", "false");

  tile.innerHTML = `
    <div class="tile-glow"></div>
    <button class="tile-fav" data-id="${setup.id}" aria-label="שמור למועדפים" aria-pressed="false">♡</button>
    <ul class="tile-tooltip" aria-hidden="true">
      ${setup.features
        .slice(0, 3)
        .map((f) => `<li>${f}</li>`)
        .join("")}
    </ul>
    <div class="tile-body">
      <div class="tile-name">${setup.name}</div>
      <div class="tile-user">${setup.user}</div>
      <div class="tile-meta">
        <span class="badge badge-time">⏱ ${setup.time}</span>
        <span class="badge badge-level">${setup.level}</span>
      </div>
      <div class="tile-desc">${setup.description}</div>
      <div class="tile-tags">
        ${setup.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <span class="tile-copied" hidden>✓ הורדת</span>
    </div>
  `;

  tile.querySelector(".tile-fav").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFav(setup.id);
  });

  tile.addEventListener("click", () => {
    openModal(setup);
  });

  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(setup);
      return;
    }
    const visible = tileEls.filter((t) => !t.classList.contains("hidden"));
    const pos = visible.indexOf(tile);
    if (pos === -1) return;
    const cols = getGridCols();
    let next = pos;
    if (e.key === "ArrowLeft") next = pos + 1;
    else if (e.key === "ArrowRight") next = pos - 1;
    else if (e.key === "ArrowDown") next = pos + cols;
    else if (e.key === "ArrowUp") next = pos - cols;
    else return;
    e.preventDefault();
    next = Math.max(0, Math.min(next, visible.length - 1));
    if (next !== pos) visible[next].focus();
  });

  grid.appendChild(tile);
  tileEls.push(tile);
});

updateFavButtons();
updateHistoryIndicators();

// ── Drag to reorder ───────────────────────────────────────────────────────────
let draggedTile = null;

function saveTileOrder() {
  const ids = [...grid.querySelectorAll(".tile")].map((t) => t.dataset.id);
  localStorage.setItem("tile-order", JSON.stringify(ids));
}

function restoreTileOrder() {
  const saved = JSON.parse(localStorage.getItem("tile-order") || "null");
  if (!saved) return;
  saved.forEach((id) => {
    const tile = tileEls.find((t) => t.dataset.id === id);
    if (tile) grid.appendChild(tile);
  });
}

tileEls.forEach((tile) => {
  tile.setAttribute("draggable", "true");

  tile.addEventListener("dragstart", (e) => {
    draggedTile = tile;
    tile.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  tile.addEventListener("dragend", () => {
    tile.classList.remove("dragging");
    grid
      .querySelectorAll(".drag-over")
      .forEach((t) => t.classList.remove("drag-over"));
    draggedTile = null;
  });

  tile.addEventListener("dragover", (e) => {
    if (!draggedTile || draggedTile === tile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    grid
      .querySelectorAll(".drag-over")
      .forEach((t) => t.classList.remove("drag-over"));
    tile.classList.add("drag-over");
  });

  tile.addEventListener("dragleave", () => {
    tile.classList.remove("drag-over");
  });

  tile.addEventListener("drop", (e) => {
    if (!draggedTile || draggedTile === tile) return;
    e.preventDefault();
    tile.classList.remove("drag-over");
    const rect = tile.getBoundingClientRect();
    const insertBefore =
      e.clientY < rect.top + rect.height / 2 ||
      e.clientX > rect.left + rect.width / 2;
    if (insertBefore) {
      grid.insertBefore(draggedTile, tile);
    } else {
      grid.insertBefore(draggedTile, tile.nextSibling);
    }
    saveTileOrder();
  });
});

restoreTileOrder();

// ── High contrast toggle ──────────────────────────────────────────────────────
const contrastToggle = document.getElementById("contrast-toggle");
function applyContrast(on) {
  document.body.classList.toggle("high-contrast", on);
  localStorage.setItem("high-contrast", on ? "1" : "");
  contrastToggle.setAttribute("aria-pressed", String(on));
}
contrastToggle.addEventListener("click", () =>
  applyContrast(!document.body.classList.contains("high-contrast")),
);
applyContrast(!!localStorage.getItem("high-contrast"));

// ── Color-blind palette toggle ────────────────────────────────────────────────
const cbToggle = document.getElementById("cb-toggle");
function applyCBPalette(on) {
  colorBlindMode = on;
  localStorage.setItem("cb-palette", on ? "1" : "");
  cbToggle.setAttribute("aria-pressed", String(on));
  cbToggle.classList.toggle("active", on);
  reapplyAccents();
}
cbToggle.addEventListener("click", () => applyCBPalette(!colorBlindMode));
applyCBPalette(colorBlindMode);

// ── Quiz ──────────────────────────────────────────────────────────────────────
const QUIZ_STEPS = [
  {
    q: "מה רמת הניסיון שלך בפיתוח?",
    hint: "זה לא משנה — כולם מתאימים",
    options: [
      { text: "מתחיל לגמרי — בלי קוד", value: "beginner" },
      { text: "יש לי בסיס בסיסי", value: "novice" },
      { text: "מפתח / טכנאי מנוסה", value: "dev" },
    ],
  },
  {
    q: "מה הכי מתאר את מה שאתה רוצה לבנות?",
    hint: "בחר את הקרוב ביותר אליך",
    options: [
      { text: "MVP ומוצרים מהירים", value: "builder" },
      { text: "תוכן ופוסטים לרשתות", value: "influencer" },
      { text: "דשבורדים לשוק ההון", value: "trader" },
      { text: "אתר ומערכת לעסק שלי", value: "bizowner" },
      { text: "חומרי לימוד ומערכי שיעור", value: "teacher" },
      { text: "אמנות דיגיטלית וויזואלי", value: "artist" },
      { text: "כלים לעבודה עצמאית", value: "freelancer" },
      { text: "אפליקציות לבית הספר", value: "parent" },
    ],
  },
];

const QUIZ_MAP = {
  builder: "builder",
  influencer: "influencer",
  trader: "trader",
  bizowner: "bizowner",
  teacher: "teacher",
  artist: "artist",
  freelancer: "freelancer",
  parent: "parent",
};

const quizOverlay = document.getElementById("quiz-overlay");
const quizBody = document.getElementById("quiz-body");
let quizAnswers = [];

function openQuiz() {
  quizAnswers = [];
  quizOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  renderQuizStep(0);
}

function closeQuiz() {
  quizOverlay.hidden = true;
  document.body.style.overflow = "";
}

function renderQuizStep(stepIdx) {
  if (stepIdx >= QUIZ_STEPS.length) {
    renderQuizResult();
    return;
  }
  const step = QUIZ_STEPS[stepIdx];
  const total = QUIZ_STEPS.length;
  const dots = Array.from(
    { length: total },
    (_, i) => `<div class="quiz-dot${i < stepIdx ? " done" : ""}"></div>`,
  ).join("");

  quizBody.innerHTML = `
    <div class="quiz-step">
      <div class="quiz-progress">${dots}</div>
      <p class="quiz-q">${step.q}</p>
      ${step.hint ? `<p class="quiz-hint">${step.hint}</p>` : ""}
      <div class="quiz-options" style="grid-template-columns: ${step.options.length <= 3 ? "1fr" : "1fr 1fr"}">
        ${step.options.map((o, i) => `<button class="quiz-option" data-idx="${i}">${o.text}</button>`).join("")}
      </div>
    </div>`;

  quizBody.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = step.options[parseInt(btn.dataset.idx)].value;
      quizAnswers.push(val);
      renderQuizStep(stepIdx + 1);
    });
  });
}

function renderQuizResult() {
  const domainAnswer = quizAnswers[1] || quizAnswers[0];
  const setupId = QUIZ_MAP[domainAnswer] || "builder";
  const setup = SETUPS.find((s) => s.id === setupId);
  if (!setup) return;

  quizBody.innerHTML = `
    <div class="quiz-result">
      <span class="quiz-result-label">ההמלצה שלנו</span>
      <h2 class="quiz-result-name">${setup.name}</h2>
      <p class="quiz-result-desc">${setup.description}</p>
      <div class="quiz-result-actions">
        <button class="quiz-open-btn" id="quiz-open-setup">פתח את הסטאפ ←</button>
        <button class="quiz-retry-btn" id="quiz-retry">נסה שוב</button>
      </div>
    </div>`;

  document.getElementById("quiz-open-setup").addEventListener("click", () => {
    closeQuiz();
    openModal(setup);
  });
  document.getElementById("quiz-retry").addEventListener("click", () => {
    quizAnswers = [];
    renderQuizStep(0);
  });
}

document.getElementById("quiz-btn").addEventListener("click", openQuiz);
document.getElementById("quiz-close").addEventListener("click", closeQuiz);
quizOverlay.addEventListener("click", (e) => {
  if (e.target === quizOverlay) closeQuiz();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !quizOverlay.hidden) closeQuiz();
});

// ── Search ────────────────────────────────────────────────────────────────────
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const searchStatus = document.getElementById("search-status");
let searchQuery = "";

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

// ── Filter bar ────────────────────────────────────────────────────────────────
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
  let visibleIndex = 0,
    visibleCount = 0;

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

  let emptyEl = document.getElementById("no-results");
  if (visibleCount === 0) {
    if (!emptyEl) {
      emptyEl = document.createElement("p");
      emptyEl.id = "no-results";
      emptyEl.className = "no-results";
      grid.appendChild(emptyEl);
    }
    emptyEl.textContent = `אין תוצאות עבור "${searchInput.value}"`;
  } else if (emptyEl) {
    emptyEl.remove();
  }

  if (searchStatus) {
    searchStatus.textContent =
      searchQuery || activeTag ? `נמצאו ${visibleCount} סביבות` : "";
  }
}

renderFilterBar();
applyTheme(currentTheme);
