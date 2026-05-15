// ── Palette ───────────────────────────────────────────────────────────────────
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

// ── i18n ─────────────────────────────────────────────────────────────────────
const I18N = {
  he: {
    dir: "rtl",
    lang: "he",
    searchPlaceholder: "חפש וורקפלואו...",
    searchStatus: (n) => `נמצאו ${n} סביבות`,
    noResults: (q) => `אין תוצאות עבור "${q}"`,
    filterAll: "הכל",
    quizBtn: "✦ מצא את הוורקפלואו שלך",
    whatsIncluded: "מה כלול",
    week1Heading: "מה תבנה בשבוע הראשון",
    installHeading: "התקנה",
    prereqs: "דרישות קדם",
    copyBtn: "⎘",
    copyAriaLabel: "העתק פקודת התקנה",
    runBtn: "▶ הרץ",
    runAriaLabel: "הוראות הרצה",
    shareBtn: "שתף",
    runInstructions: `<strong>איך להריץ:</strong><ol>
      <li>לחץ <kbd>⌘</kbd>+<kbd>Space</kbd> → הקלד <kbd>Terminal</kbd> → <kbd>Enter</kbd></li>
      <li>הפקודה הועתקה — הדבק עם <kbd>⌘</kbd>+<kbd>V</kbd> ולחץ <kbd>Enter</kbd></li>
      <li>חכה שההתקנה תסתיים (כ-5 דקות)</li>
    </ol>`,
    similarHeading: "אולי גם יעניין אותך",
    langToggleLabel: "Switch to English",
    langToggleText: "EN",
    skipLink: "דלג לתוכן",
    navSetups: "סטאפים",
    navTutorials: "טוטוריאלים",
    levelBeginner: "מתחיל",
    levelMid: "בינוני",
    levelAdv: "מתקדם",
    timeLabel: "⏱",
  },
  en: {
    dir: "ltr",
    lang: "en",
    searchPlaceholder: "Search workflows...",
    searchStatus: (n) => `Found ${n} setups`,
    noResults: (q) => `No results for "${q}"`,
    filterAll: "All",
    quizBtn: "✦ Find your workflow",
    whatsIncluded: "What's included",
    week1Heading: "What you'll build in week 1",
    installHeading: "Installation",
    prereqs: "Prerequisites",
    copyBtn: "⎘",
    copyAriaLabel: "Copy install command",
    runBtn: "▶ Run",
    runAriaLabel: "Show run instructions",
    shareBtn: "Share",
    runInstructions: `<strong>How to run:</strong><ol>
      <li>Press <kbd>⌘</kbd>+<kbd>Space</kbd> → type <kbd>Terminal</kbd> → <kbd>Enter</kbd></li>
      <li>Command copied — paste with <kbd>⌘</kbd>+<kbd>V</kbd> and press <kbd>Enter</kbd></li>
      <li>Wait for installation to complete (~5 minutes)</li>
    </ol>`,
    similarHeading: "You might also like",
    langToggleLabel: "עבור לעברית",
    langToggleText: "HE",
    skipLink: "Skip to content",
    navSetups: "Setups",
    navTutorials: "Tutorials",
    levelBeginner: "Beginner",
    levelMid: "Intermediate",
    levelAdv: "Advanced",
    timeLabel: "⏱",
  },
};
let currentLang = localStorage.getItem("lang") || "he";

// ── Data ──────────────────────────────────────────────────────────────────────
const SETUPS = [
  {
    id: "backend",
    name: "הבק-אנד",
    user: "@backend_il",
    time: "5 דק׳",
    level: "בינוני",
    description:
      "מפתח Python/Node שבונה APIs, מיקרוסרביסים ו-DB schemas. קוד נקי, CI שרץ לבד, coverage גבוה.",
    tags: ["API", "Python", "PostgreSQL"],
    features: [
      "GitHub MCP — PR reviews, issues, code search מ-Claude Code",
      "PostgreSQL MCP — query ושינוי schema בלי לעזוב terminal",
      "Context7 MCP — docs של FastAPI/Express תמיד עדכניים",
      "Hook: PostToolUse — ruff auto-fix לכל קובץ Python שנשמר",
      "Hook: PreToolUse — חוסם כתיבה ל-.env ו-secrets/",
      "פקודה /new-endpoint — scaffold endpoint + tests + migration",
    ],
    featureDetails: [
      {
        text: "GitHub MCP מחבר את Claude Code לכל GitHub API. יצירת PRs, סגירת issues, code search — בלי לעזוב terminal.",
        url: "https://github.com/github/github-mcp-server",
      },
      {
        text: "PostgreSQL MCP מאפשר ל-Claude Code לבצע queries, לשנות schemas ולבדוק data ישירות ב-DB שלך.",
        url: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
      },
      {
        text: "Context7 מביא תמיד את ה-docs העדכניים של FastAPI, Express, Django — לא docs שנה שעברה.",
        url: "https://github.com/upstash/context7",
      },
      {
        text: "Hook של PostToolUse שרץ אחרי כל שמירת קובץ Python ומריץ ruff --fix אוטומטית.",
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      },
      {
        text: "Hook של PreToolUse שחוסם כל write לנתיבים רגישים. כשנגיעה ב-.env קורית — Claude Code יקבל שגיאה ויעצור.",
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      },
      {
        text: "פקודה מותאמת שחיה ב-~/.claude/commands/ ומ-scaffold endpoint שלם: route + validation + tests + migration.",
        url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
      },
    ],
    week1: [
      "API מלא עם auth, pagination ו-rate limiting",
      "Schema migration בטוחה עם rollback",
      "CI ב-GitHub Actions שרץ על כל PR",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/backend/install.sh)",
  },
  {
    id: "frontend",
    name: "הפרונטאנד",
    user: "@frontend_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מפתח React/Vue שהופך Figma לקוד עובד. רכיבים נגישים, אנימציות, ו-E2E tests.",
    tags: ["React", "Vue", "Playwright"],
    features: [
      "Playwright MCP — בדיקת UI אוטומטית בדפדפן אמיתי",
      "Context7 MCP — docs React 19 / Vue 3 / Tailwind עדכניים",
      "Hook: PostToolUse — ESLint + Prettier על כל קובץ TSX/Vue",
      "פקודה /new-component — component + props + tests + story",
      "פקודה /a11y-audit — בדיקת נגישות WCAG לכל דף",
      "CLAUDE.md: component structure, naming, CSS conventions",
    ],
    week1: [
      "Design system עם 10 רכיבים ו-Storybook",
      "E2E tests עם Playwright לכל flow קריטי",
      "Lighthouse score 90+ ב-performance ונגישות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/frontend/install.sh)",
  },
  {
    id: "saas",
    name: "בונה ה-SaaS",
    user: "@saas_il",
    time: "5 דק׳",
    level: "מתחיל",
    description:
      "בונה SaaS מ-0 ל-paying customers. Stripe, Supabase, Vercel — כל ה-stack בפקודה אחת.",
    tags: ["SaaS", "Stripe", "Supabase"],
    features: [
      "Stripe MCP — subscriptions, webhooks, invoices מ-Claude Code",
      "Supabase plugin — DB + Auth + Edge Functions בפקודה אחת",
      "Vercel MCP — deploy, domains, analytics ישירות",
      "פקודה /new-saas — scaffold: landing + auth + dashboard + billing",
      "פקודה /deploy-checklist — רשימת בדיקות לפני כל release",
      "CLAUDE.md: pricing, conversion funnels, churn prevention",
    ],
    week1: [
      "Landing עם trial signup מחובר ל-Stripe",
      "Dashboard עם usage metrics ו-billing portal",
      "Email onboarding sequence אוטומטית",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/saas/install.sh)",
  },
  {
    id: "devops",
    name: "ה-DevOps",
    user: "@devops_il",
    time: "7 דק׳",
    level: "מתקדם",
    description:
      "מהנדס שמנהל infra, CI/CD ו-observability. Cloudflare, Docker, GitHub Actions — הכל מאוטמט.",
    tags: ["CI/CD", "Docker", "Cloudflare"],
    features: [
      "Cloudflare MCP — Workers, DNS, KV, R2 מ-Claude Code",
      "GitHub MCP — Actions, secrets, environments, deployments",
      "Hook: PreToolUse — חוסם rm -rf, kubectl delete, DROP TABLE",
      "Hook: PreToolUse — מחייב אישור לכל פעולה ב-production",
      "פקודה /new-pipeline — GitHub Actions workflow מלא",
      "פקודה /incident-runbook — runbook אוטומטי לכל alert",
    ],
    week1: [
      "Pipeline CI/CD מלא עם tests, build, deploy",
      "Monitoring alerts עם Cloudflare Workers",
      "Runbook אוטומטי ל-5 incidents שכיחים",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/devops/install.sh)",
  },
  {
    id: "ai-eng",
    name: "מהנדס ה-AI",
    user: "@llm_build",
    time: "6 דק׳",
    level: "מתקדם",
    description:
      "בונה products על LLMs. Prompt engineering, evals, RAG — בלי לבזבז tokens ובלי hallucinations.",
    tags: ["LLM", "Prompts", "RAG"],
    features: [
      "Context7 MCP — docs של LangChain, LlamaIndex, Anthropic API",
      "Ruflo MCP — multi-agent orchestration ו-swarm patterns",
      "פקודה /eval-suite — evals אוטומטיים על prompt variants",
      "פקודה /prompt-optimize — A/B test על 3 גרסאות prompt",
      "Hook: PostToolUse — token cost estimator לכל generation",
      "CLAUDE.md: RAG architecture, eval metrics, cost limits",
    ],
    week1: [
      "RAG system על ה-docs של הפרויקט",
      "Eval suite שמודד דיוק, latency ועלות",
      "Agent שמבצע task מורכב ב-3 steps",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/ai-eng/install.sh)",
  },
  {
    id: "security",
    name: "מהנדס האבטחה",
    user: "@sec_il",
    time: "6 דק׳",
    level: "מתקדם",
    description:
      "AppSec שסורק, מאתר ומתקן vulnerabilities. Hooks שחוסמים סכנות לפני שהן קורות.",
    tags: ["AppSec", "Hooks", "OWASP"],
    features: [
      "Hook: PreToolUse — חוסם גישה ל-.env, secrets/, .git/",
      "Hook: PreToolUse — מחייב אישור ל-DROP TABLE, DELETE, truncate",
      "Hook: PostToolUse — git diff scanner לפני כל commit",
      "GitHub MCP — CVE search ו-dependency advisory",
      "פקודה /security-audit — סריקת OWASP Top 10 על endpoints",
      "פקודה /deps-audit — npm audit / pip-audit עם תיקון אוטומטי",
    ],
    week1: [
      "Audit מלא של dependencies + תיקון קריטיים",
      "Hooks שחוסמים 10 attack patterns נפוצים",
      "Security checklist אוטומטי לכל PR",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/security/install.sh)",
  },
  {
    id: "data",
    name: "מדען הנתונים",
    user: "@data_il",
    time: "6 דק׳",
    level: "בינוני",
    description:
      "מנתח נתונים, בונה models ו-dashboards. Jupyter, pandas, PostgreSQL — בלי לכתוב boilerplate.",
    tags: ["Python", "Jupyter", "ML"],
    features: [
      "PostgreSQL MCP — query ישיר ל-DB מ-Claude Code",
      "Context7 MCP — pandas, scikit-learn, Polars docs עדכניים",
      "Jupyter Lab עם extensions לניתוח וניפוי שגיאות",
      "פקודה /eda-report — Exploratory Data Analysis אוטומטי",
      "פקודה /train-model — pipeline: load, clean, train, evaluate",
      "CLAUDE.md: data pipeline standards, reproducibility",
    ],
    week1: [
      "EDA מלא על dataset ראשון עם insights",
      "Pipeline ניקוי נתונים שרץ לבד",
      "Dashboard אינטרקטיבי עם Plotly",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/data/install.sh)",
  },
  {
    id: "indie",
    name: "האינדי האקר",
    user: "@indie_il",
    time: "3 דק׳",
    level: "מתחיל",
    description:
      "שולח כל שבוע. אין meetings, אין משקיעים — רק קוד, users ו-MRR שעולה.",
    tags: ["Indie", "MRR", "Stripe"],
    features: [
      "Stripe MCP — תשלומים, subscriptions, revenue analytics",
      "Supabase plugin — backend שלם בלי server",
      "פקודה /launch-day — checklist שיפוץ מלא לפני go-live",
      "פקודה /feature-request — מ-user feedback ל-ticket מוכן",
      "CLAUDE.md: ship fast, no over-engineering, feedback loops",
      "Analytics מובנה: MRR, churn, LTV מהיום הראשון",
    ],
    week1: [
      "Product ראשון live עם Stripe payments פועל",
      "Landing page עם waitlist ו-email capture",
      "MRR dashboard חי בזמן אמת",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/indie/install.sh)",
  },
  {
    id: "mobile",
    name: "מפתח המובייל",
    user: "@mobile_il",
    time: "5 דק׳",
    level: "בינוני",
    description:
      "מפתח React Native / Expo שמוציא אפליקציה לאנדרואיד ו-iOS בזמן אחד — ללא Xcode headaches.",
    tags: ["React Native", "Expo", "iOS/Android"],
    features: [
      "Context7 MCP — Expo SDK / React Native docs עדכניים",
      "Playwright MCP — UI testing על mobile viewport",
      "Hook: PostToolUse — TypeScript type check אחרי כל שמירה",
      "פקודה /new-screen — scaffold screen עם navigation + types",
      "פקודה /ota-update — OTA update עם Expo Updates",
      "CLAUDE.md: Expo conventions, platform-specific patterns",
    ],
    week1: [
      "App עם Tab navigation ו-5 screens",
      "Auth flow מלא עם Supabase",
      "OTA update pipeline — deploy בלי App Store review",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/mobile/install.sh)",
  },
  {
    id: "pm",
    name: "ה-PM שמקודד",
    user: "@pm_builds",
    time: "3 דק׳",
    level: "מתחיל",
    description:
      "PM שכותב specs, מנהל backlog ו-tickets — ועכשיו גם מוסיף features בלי לחכות לדב.",
    tags: ["Product", "Notion", "GitHub"],
    features: [
      "GitHub MCP — opens issues, PRs, milestones מ-Claude Code",
      "Notion MCP — PRDs, roadmaps, meeting notes מסונכרנים",
      "פקודה /prd-to-tickets — הופך PRD ל-GitHub issues",
      "פקודה /spec-generate — spec מלא מ-user story",
      "פקודה /sprint-retro — retrospective מ-git history",
      "CLAUDE.md: user story format, acceptance criteria, OKR alignment",
    ],
    week1: [
      "Backlog מאורגן עם priorities ו-epics",
      "PRD ראשון שהצוות הבין תוך 30 דקות",
      "Metrics dashboard שה-CEO רואה כל בוקר",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/pm/install.sh)",
  },
  {
    id: "creator",
    name: "יוצר התוכן",
    user: "@creator_il",
    time: "3 דק׳",
    level: "מתחיל",
    description:
      "מייצר תוכן ל-LinkedIn, TikTok ו-newsletter. עם AI — כמות x3 בזמן החצי.",
    tags: ["LinkedIn", "תוכן", "SEO"],
    features: [
      "Notion MCP — content calendar, ideas, drafts מסונכרנים",
      "פקודה /post-linkedin — 3 גרסאות post מרעיון אחד",
      "פקודה /newsletter — draft newsletter שבועי מ-highlights",
      "פקודה /seo-brief — keyword research + content brief",
      "CLAUDE.md: Israeli audience tone, LinkedIn algorithm, posting times",
      "Hook: שמירת כל תוכן ב-Notion אוטומטית",
    ],
    week1: [
      "7 פוסטים LinkedIn מוכנים לשבוע הבא",
      "Newsletter ראשון שנשלח ב-Beehiiv/Substack",
      "Content calendar לחודש שלם",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/creator/install.sh)",
  },
  {
    id: "docs",
    name: "כותב התיעוד",
    user: "@docs_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "הופך קוד לתיעוד שאנשים רוצים לקרוא. API docs, guides, changelogs — כתיבה שמוכרת.",
    tags: ["Docs", "API", "Markdown"],
    features: [
      "GitHub MCP — מסנכרן תיעוד עם code changes אוטומטית",
      "Context7 MCP — best practices מ-Stripe, Twilio, MDN",
      "פקודה /api-docs — OpenAPI spec מ-codebase אוטומטית",
      "פקודה /changelog — CHANGELOG.md מ-git log",
      "פקודה /readme-gen — README מלא עם badges ו-examples",
      "CLAUDE.md: docs-as-code, plain language, progressive disclosure",
    ],
    week1: [
      "README שמביא stars ב-GitHub",
      "API reference מלא שנוצר אוטומטית",
      "Changelog workflow אוטומטי לכל release",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/docs/install.sh)",
  },
  {
    id: "freelance",
    name: "הפרילנסר",
    user: "@freelance_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "עובד עם 3-5 לקוחות במקביל. הצעות, handoffs ו-scope — הכל מהיר יותר.",
    tags: ["לקוחות", "Proposals", "Handoff"],
    features: [
      "GitHub MCP — client repos, PRs, code reviews מרוכזים",
      "Notion MCP — client docs, invoices, project status",
      "פקודה /proposal — הצעת מחיר מפורטת ל-scope ספציפי",
      "פקודה /client-handoff — package מסירה מלא עם docs",
      "פקודה /scope-check — גלאי scope creep אוטומטי",
      "CLAUDE.md: client communication, red flags, VAT ישראלי",
    ],
    week1: [
      "Proposal template שסוגר 50% יותר עסקאות",
      "Onboarding checklist ללקוח חדש",
      "Handoff package שחוסך 3 שעות לפרויקט",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/freelance/install.sh)",
  },
  {
    id: "cto",
    name: "ה-CTO",
    user: "@cto_il",
    time: "7 דק׳",
    level: "מתקדם",
    description:
      "ניהול tech team, architecture decisions ו-PR reviews — עם Claude כ-staff engineer.",
    tags: ["Architecture", "Team", "Leadership"],
    features: [
      "GitHub MCP — PR reviews, code search, team metrics, CODEOWNERS",
      "Notion MCP — architecture docs, ADRs, team wiki",
      "פקודה /adr — Architecture Decision Record מפורט",
      "פקודה /pr-review — code review עמוק: security + performance",
      "פקודה /tech-debt-audit — מיפוי tech debt + ROI",
      "CLAUDE.md: engineering principles, on-call, incident severity",
    ],
    week1: [
      "Architecture diagram מעודכן של כל ה-system",
      "PR review checklist שהצוות מסכים עליו",
      "Tech debt backlog עם ROI לכל פריט",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/cto/install.sh)",
  },
  {
    id: "ecommerce",
    name: "האיקומרס",
    user: "@shop_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מנהל חנות Shopify. conversion rate, automation ו-inventory — יותר מכירות, פחות עבודה ידנית.",
    tags: ["Shopify", "Conversion", "אוטומציה"],
    features: [
      "Stripe MCP — revenue analytics, refunds, disputes ישירות",
      "פקודה /product-desc — תיאור מוצר SEO-optimized ב-3 גרסאות",
      "פקודה /email-campaign — קמפיין email ל-segment ספציפי",
      "פקודה /discount-calc — מחשב הנחות ו-margin impact",
      "CLAUDE.md: Israeli consumer behavior, Shopify Liquid templates",
      "Python: daily sales digest אוטומטי ל-Telegram",
    ],
    week1: [
      "50 תיאורי מוצר מחודשים עם SEO",
      "Email automation ל-cart abandonment",
      "Dashboard יומי עם KPIs ל-Telegram",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/ecommerce/install.sh)",
  },
  {
    id: "gamedev",
    name: "מפתח המשחקים",
    user: "@gamedev_il",
    time: "5 דק׳",
    level: "בינוני",
    description:
      "מפתח משחקים indie ב-Godot, Unity או browser — מ-game design doc ל-prototype playable.",
    tags: ["Godot", "Unity", "Gaming"],
    features: [
      "Context7 MCP — Unity API / Godot GDScript docs עדכניים",
      "Playwright MCP — automated playtesting ל-browser games",
      "פקודה /new-game — scaffold Godot/Unity עם folder structure",
      "פקודה /game-loop — core game loop עם state machine",
      "CLAUDE.md: game design principles, juice & feel, monetization",
      "Leaderboard עם Supabase ו-asset pipeline scripts",
    ],
    week1: [
      "Prototype playable ב-browser תוך 3 ימים",
      "Game design doc: mechanics, art style, monetization",
      "Leaderboard חי עם Supabase",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/gamedev/install.sh)",
  },
  {
    id: "student",
    name: "הסטודנט",
    user: "@student_il",
    time: "2 דק׳",
    level: "מתחיל",
    description:
      "לומד לפתח עם AI כ-pair programmer. מגן על קוד, מסביר כל שגיאה, לא עושה שיעורי בית במקומך.",
    tags: ["למידה", "Python", "שגיאות"],
    features: [
      "Context7 MCP — docs Python / JavaScript לתלמידים",
      "Hook: PreToolUse — לא מוחק קבצים בלי אישור מפורש",
      "Hook: PostToolUse — מסביר כל שינוי שנעשה בקוד",
      "פקודה /explain — הסבר מלא של כל שורת קוד",
      "פקודה /debug-guide — walk-through שלבי debugging",
      "CLAUDE.md: Socratic method — מכוון לתשובה, לא נותן אותה",
    ],
    week1: [
      "3 פרויקטים portfolio-worthy מסיימים",
      "ביטחון לפתוח terminal ולהריץ קוד",
      "GitHub profile עם contributions ירוקות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/student/install.sh)",
  },
  {
    id: "teacher",
    name: "המרצה",
    user: "@teach_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מרצה, מנחה bootcamp או יוצר קורסי online. מייצר חומרים, תרגילים ו-quizzes תוך דקות.",
    tags: ["קורסים", "תרגילים", "חינוך"],
    features: [
      "Notion MCP — syllabus, lesson plans, student notes מסונכרנים",
      "פקודה /lesson-plan — תכנית שיעור מפורטת עם timing",
      "פקודה /exercise-gen — 10 תרגילים ברמות קושי שונות",
      "פקודה /quiz-gen — quiz עם 20 שאלות ו-answer key",
      "CLAUDE.md: Bloom's taxonomy, active learning, Hebrew pedagogy",
      "פקודה /code-review-rubric — rubric לבדיקת קוד של תלמידים",
    ],
    week1: [
      "Syllabus מלא ל-8 שבועות קורס",
      "40 תרגילים מוכנים עם הסברים",
      "Quiz bank של 100 שאלות",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/teacher/install.sh)",
  },
  {
    id: "designer",
    name: "מעצב ה-UI",
    user: "@design_il",
    time: "4 דק׳",
    level: "מתחיל",
    description:
      "מפתח שמעצב. Figma לקוד עובד — components נגישים, RTL, responsive. בלי להתפשר על UX.",
    tags: ["Figma", "CSS", "נגישות"],
    features: [
      "Context7 MCP — MDN Web Docs, CSS specs, ARIA patterns עדכניים",
      "Playwright MCP — visual regression testing על כל breakpoint",
      "פקודה /figma-to-code — מ-Figma frame ל-React component RTL",
      "פקודה /a11y-check — WCAG 2.1 AA audit עם תיקון אוטומטי",
      "CLAUDE.md: Hebrew RTL rules, SI 5568 accessibility, design tokens",
      "Hook: PostToolUse — Stylelint + Prettier על כל קובץ CSS/SCSS",
    ],
    week1: [
      "Design system עם 12 רכיבים RTL-ready",
      "Accessibility audit — אפס כשלים WCAG 2.1 AA",
      "Storybook עם dark/light mode ו-RTL toggle",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/designer/install.sh)",
  },
  {
    id: "researcher",
    name: "החוקר",
    user: "@research_il",
    time: "3 דק׳",
    level: "בינוני",
    description:
      "אקדמאי, אנליסט או חוקר שמעבד papers, מנהל ביבליוגרפיה ומייצר insights ממאות מקורות.",
    tags: ["Papers", "Python", "ניתוח"],
    features: [
      "Context7 MCP — arXiv, Semantic Scholar, PubMed docs עדכניים",
      "PostgreSQL MCP — citation database ו-research notes אישי",
      "פקודה /paper-summary — סיכום paper: מסקנות + critique + gaps",
      "פקודה /lit-review — literature review מ-10 papers בפורמט אקדמי",
      "פקודה /citation-gen — APA/MLA/BibTeX מ-URL או DOI",
      "CLAUDE.md: critical thinking, academic tone, Israeli research ethics",
    ],
    week1: [
      "Literature review של 30 מקורות עם gaps map",
      "Citation database מאורגן ב-PostgreSQL",
      "Research brief מוכן לפרסום או פגישה",
    ],
    installCmd:
      "bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/researcher/install.sh)",
  },
];

// ── English content lookup ────────────────────────────────────────────────────
const EN = {
  backend: {
    name: "The Backend Dev",
    level: "Intermediate",
    description:
      "Python/Node developer building APIs, microservices and DB schemas. Clean code, CI that runs itself, high coverage.",
    week1: [
      "Full API with auth, pagination and rate limiting",
      "Safe schema migration with rollback",
      "CI in GitHub Actions running on every PR",
    ],
  },
  frontend: {
    name: "The Frontend Dev",
    level: "Beginner",
    description:
      "React/Vue developer turning Figma into working code. Accessible components, animations and E2E tests.",
    week1: [
      "Design system with 10 components and Storybook",
      "E2E tests with Playwright for every critical flow",
      "Lighthouse score 90+ in performance and accessibility",
    ],
  },
  saas: {
    name: "The SaaS Builder",
    level: "Beginner",
    description:
      "Building SaaS from 0 to paying customers. Stripe, Supabase, Vercel — the full stack in one command.",
    week1: [
      "Landing page with trial signup connected to Stripe",
      "Dashboard with usage metrics and billing portal",
      "Automated email onboarding sequence",
    ],
  },
  devops: {
    name: "The DevOps Engineer",
    level: "Advanced",
    description:
      "Engineer managing infra, CI/CD and observability. Cloudflare, Docker, GitHub Actions — everything automated.",
    week1: [
      "Full CI/CD pipeline with tests, build, deploy",
      "Monitoring alerts with Cloudflare Workers",
      "Automated runbook for 5 common incidents",
    ],
  },
  "ai-eng": {
    name: "The AI Engineer",
    level: "Advanced",
    description:
      "Building products on LLMs. Prompt engineering, evals, RAG — without wasting tokens or hallucinations.",
    week1: [
      "RAG system on your project docs",
      "Eval suite measuring accuracy, latency and cost",
      "Agent completing a complex task in 3 steps",
    ],
  },
  security: {
    name: "The Security Engineer",
    level: "Advanced",
    description:
      "AppSec scanning, detecting and fixing vulnerabilities. Hooks that block dangers before they happen.",
    week1: [
      "Full audit of dependencies + fixing critical ones",
      "Hooks blocking 10 common attack patterns",
      "Automated security checklist for every PR",
    ],
  },
  data: {
    name: "The Data Scientist",
    level: "Intermediate",
    description:
      "Analyzing data, building models and dashboards. Jupyter, pandas, PostgreSQL — without writing boilerplate.",
    week1: [
      "Full EDA on first dataset with insights",
      "Data cleaning pipeline that runs itself",
      "Interactive dashboard with Plotly",
    ],
  },
  indie: {
    name: "The Indie Hacker",
    level: "Beginner",
    description:
      "Shipping every week. No meetings, no investors — just code, users and growing MRR.",
    week1: [
      "First product live with Stripe payments working",
      "Landing page with waitlist and email capture",
      "Live MRR dashboard in real time",
    ],
  },
  mobile: {
    name: "The Mobile Developer",
    level: "Intermediate",
    description:
      "React Native / Expo developer shipping to Android and iOS at once — without Xcode headaches.",
    week1: [
      "App with Tab navigation and 5 screens",
      "Full auth flow with Supabase",
      "OTA update pipeline — deploy without App Store review",
    ],
  },
  pm: {
    name: "The PM Who Codes",
    level: "Beginner",
    description:
      "PM writing specs, managing backlog and tickets — and now adding features without waiting for the dev.",
    week1: [
      "Organized backlog with priorities and epics",
      "First PRD the team understood in 30 minutes",
      "Metrics dashboard the CEO sees every morning",
    ],
  },
  creator: {
    name: "The Content Creator",
    level: "Beginner",
    description:
      "Creating content for LinkedIn, TikTok and newsletters. With AI — 3x output in half the time.",
    week1: [
      "7 LinkedIn posts ready for next week",
      "First newsletter sent on Beehiiv/Substack",
      "Content calendar for a full month",
    ],
  },
  docs: {
    name: "The Docs Writer",
    level: "Beginner",
    description:
      "Turning code into documentation people want to read. API docs, guides, changelogs — writing that sells.",
    week1: [
      "README that brings GitHub stars",
      "Full API reference generated automatically",
      "Automated changelog workflow for every release",
    ],
  },
  freelance: {
    name: "The Freelancer",
    level: "Beginner",
    description:
      "Working with 3–5 clients in parallel. Proposals, handoffs and scope — everything faster.",
    week1: [
      "Proposal template that closes 50% more deals",
      "Onboarding checklist for new clients",
      "Handoff package that saves 3 hours per project",
    ],
  },
  cto: {
    name: "The CTO",
    level: "Advanced",
    description:
      "Managing tech team, architecture decisions and PR reviews — with Claude as staff engineer.",
    week1: [
      "Updated architecture diagram of the full system",
      "PR review checklist the team agrees on",
      "Tech debt backlog with ROI per item",
    ],
  },
  ecommerce: {
    name: "The E-Commerce Owner",
    level: "Beginner",
    description:
      "Managing a Shopify store. Conversion rate, automation and inventory — more sales, less manual work.",
    week1: [
      "50 revamped product descriptions with SEO",
      "Email automation for cart abandonment",
      "Daily KPI dashboard to Telegram",
    ],
  },
  gamedev: {
    name: "The Game Developer",
    level: "Intermediate",
    description:
      "Developing indie games in Godot, Unity or browser — from game design doc to playable prototype.",
    week1: [
      "Playable prototype in browser within 3 days",
      "Game design doc: mechanics, art style, monetization",
      "Live leaderboard with Supabase",
    ],
  },
  student: {
    name: "The Student",
    level: "Beginner",
    description:
      "Learning to code with AI as pair programmer. Protects your code, explains every error, doesn't do homework for you.",
    week1: [
      "3 portfolio-worthy projects completed",
      "Confidence to open terminal and run code",
      "GitHub profile with green contributions",
    ],
  },
  teacher: {
    name: "The Instructor",
    level: "Beginner",
    description:
      "Lecturer, bootcamp mentor or online course creator. Generates materials, exercises and quizzes in minutes.",
    week1: [
      "Full syllabus for an 8-week course",
      "40 exercises ready with explanations",
      "Quiz bank of 100 questions",
    ],
  },
  designer: {
    name: "The UI Designer",
    level: "Beginner",
    description:
      "Developer who designs. Figma to working code — accessible, RTL, responsive components. No UX compromises.",
    week1: [
      "Design system with 12 RTL-ready components",
      "Accessibility audit — zero WCAG 2.1 AA failures",
      "Storybook with dark/light mode and RTL toggle",
    ],
  },
  researcher: {
    name: "The Researcher",
    level: "Intermediate",
    description:
      "Academic, analyst or researcher processing papers, managing bibliography and generating insights from hundreds of sources.",
    week1: [
      "Literature review of 30 sources with gaps map",
      "Organized citation database in PostgreSQL",
      "Research brief ready for publication or meeting",
    ],
  },
};

// ── Feature details lookup ────────────────────────────────────────────────────
const FEATURE_DETAILS = {
  frontend: [
    {
      text: "Playwright MCP מפעיל דפדפן אמיתי (Chromium/Firefox) ומאפשר ל-Claude Code לבדוק UI, למלא טפסים, ולצלם screenshots.",
      url: "https://github.com/microsoft/playwright-mcp",
    },
    {
      text: "Context7 שולף תמיד את ה-docs העדכניים של React 19, Vue 3, Tailwind — לא גרסאות ישנות שהיו ב-training data.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Hook PostToolUse מריץ ESLint + Prettier על כל קובץ TSX/Vue שנשמר, כך שהקוד תמיד עקבי.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "פקודה /new-component מ-scaffold component מלא: props TypeScript, unit tests, Storybook story.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /a11y-audit בודקת WCAG 2.1 AA — contrast, aria-labels, keyboard nav, focus order.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מגדיר naming conventions, CSS methodology (BEM/Tailwind), ו-folder structure שהצוות מסכים עליהם.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  saas: [
    {
      text: "Stripe MCP מחבר לכל Stripe API: subscriptions, one-time payments, webhooks, disputes — ישירות מ-Claude Code.",
      url: "https://github.com/stripe/agent-toolkit",
    },
    {
      text: "Supabase plugin מאפשר ניהול DB, Authentication, ו-Edge Functions ב-Supabase ישירות מהסביבה.",
      url: "https://github.com/supabase/mcp-server-supabase",
    },
    {
      text: "Vercel MCP מנהל deployments, domains, environment variables, ו-analytics — ללא dashboard.",
      url: "https://github.com/vercel/mcp-server",
    },
    {
      text: "פקודה /new-saas יוצרת scaffold SaaS מלא: landing page, auth, dashboard, Stripe checkout בפקודה אחת.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /deploy-checklist עוברת על 20+ סעיפים: security headers, env vars, error pages, analytics, legal pages.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל knowledge על pricing psychology, churn prevention, onboarding flows — Claude יודע לייעץ על product.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  devops: [
    {
      text: "Cloudflare MCP מנהל Workers, KV, R2, DNS, Pages, ו-Tunnels — תשתית מלאה בלי לעזוב terminal.",
      url: "https://github.com/cloudflare/mcp-server-cloudflare",
    },
    {
      text: "GitHub MCP מנהל Actions workflows, secrets, environments, ו-deployment protection rules.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "Hook PreToolUse חוסם פקודות הרסניות: rm -rf, kubectl delete, DROP TABLE — מחייב אישור מפורש.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "Hook PreToolUse נוסף שמחייב confirmation לכל פעולה שמשפיעה על סביבת production.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "פקודה /new-pipeline יוצרת GitHub Actions workflow: build, test, lint, deploy עם matrix strategy.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /incident-runbook מייצרת runbook מותאם לכל alert: diagnosis steps, remediation, escalation path.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
  ],
  "ai-eng": [
    {
      text: "Context7 מביא תמיד docs עדכניים של LangChain, LlamaIndex, Anthropic API — כולל changelog ו-migration guides.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Ruflo MCP מאפשר multi-agent orchestration: spawning sub-agents, hive-mind consensus, cross-session memory.",
      url: "https://github.com/ruvnet/ruflo",
    },
    {
      text: "פקודה /eval-suite יוצרת eval harness שבודק prompt variants על dataset ומדווח accuracy, latency, ועלות.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /prompt-optimize מריצה A/B test על 3 גרסאות prompt ומחזירה ניתוח סטטיסטי.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "Hook PostToolUse מחשב token cost לכל LLM call ומציג summary בסוף כל session.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "CLAUDE.md מכיל RAG architecture patterns, eval metrics definitions, ו-cost limits per experiment.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  security: [
    {
      text: "Hook PreToolUse מיירט כל read/write ל-.env, secrets/, .ssh/, .git/config — ומבטל את הפעולה עם הסבר.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "Hook PreToolUse נוסף שמחייב interactive confirmation לפני כל DROP TABLE, DELETE ללא WHERE, או truncate.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "Hook PostToolUse מריץ git diff על כל commit לפני הדחיפה ומסמן secrets/credentials שנמצאו.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "GitHub MCP מחפש CVEs ב-GitHub Advisory Database ו-NVD ומביא remediation steps.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "פקודה /security-audit עוברת על OWASP Top 10: injection, broken auth, XSS, IDOR, SSRF, ועוד.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /deps-audit מריצה npm audit / pip-audit, מדרגת לפי severity, ומציעה upgrades אוטומטיים.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
  ],
  data: [
    {
      text: "PostgreSQL MCP מחבר לכל DB ישירות: queries, table inspection, index analysis — בלי pgAdmin.",
      url: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    },
    {
      text: "Context7 שולף docs עדכניים של pandas, scikit-learn, Polars, PyTorch — API references ו-examples.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Jupyter Lab עם extensions: variable inspector, git integration, ו-AI completion.",
      url: "https://docs.anthropic.com/en/docs/claude-code/overview",
    },
    {
      text: "פקודה /eda-report מייצרת EDA מלא: distributions, correlations, missing values, outliers — בפורמט HTML.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /train-model מריצה pipeline מלא: load → clean → feature engineering → train → evaluate → report.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מגדיר data pipeline standards: reproducibility, versioning, documentation format.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  indie: [
    {
      text: "Stripe MCP מנהל תשלומים, subscriptions, free trials, coupons, ו-revenue analytics — ב-realtime.",
      url: "https://github.com/stripe/agent-toolkit",
    },
    {
      text: "Supabase plugin: backend שלם ב-minutes — DB, auth, realtime, storage, ו-Edge Functions.",
      url: "https://github.com/supabase/mcp-server-supabase",
    },
    {
      text: "פקודה /launch-day עוברת על כל checklist launch: uptime monitoring, error tracking, analytics, backups.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /feature-request הופכת user feedback לו-ticket מלא: user story, acceptance criteria, priority.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל philosophy of indie building: ship fast, measure, iterate — לא over-engineer.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "Analytics tracking: MRR, churn rate, LTV מחושבים אוטומטית ממערכת Stripe.",
      url: "https://github.com/stripe/agent-toolkit",
    },
  ],
  mobile: [
    {
      text: "Context7 שולף Expo SDK docs, React Native API, ו-platform-specific guides עבור iOS ו-Android.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Playwright MCP בודק UI באמצעות mobile viewport — לא simulator, אלא בדיקת responsive CSS אמיתית.",
      url: "https://github.com/microsoft/playwright-mcp",
    },
    {
      text: "Hook PostToolUse מריץ TypeScript type check אחרי כל שמירה — תופס errors מוקדם.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "פקודה /new-screen מ-scaffold screen: navigation params, TypeScript types, loading state, error boundary.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /ota-update מכינה ו-push OTA update עם Expo Updates — deploy ב-דקות בלי App Store review.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל Expo conventions, platform-specific code patterns, ו-performance tips לאנדרואיד/iOS.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  pm: [
    {
      text: "GitHub MCP פותח issues, יוצר milestones, מנהל labels, ו-assignees — ישירות מה-conversation.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "Notion MCP קורא וכותב לכל Notion page, database, ו-block — syncs PRDs ומeeting notes אוטומטית.",
      url: "https://github.com/makenotion/notion-mcp-server",
    },
    {
      text: "פקודה /prd-to-tickets קוראת PRD מ-Notion ויוצרת GitHub issues מפורטים עם acceptance criteria.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /spec-generate הופכת user story ל-spec מלא: context, requirements, edge cases, success metrics.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /sprint-retro מנתחת git history ומייצרת retrospective: what shipped, blockers, velocity.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל user story format, OKR alignment framework, ו-acceptance criteria templates.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  creator: [
    {
      text: "Notion MCP מסנכרן content calendar, ideas, drafts — כל הכתיבה במקום אחד שמחובר ל-Claude.",
      url: "https://github.com/makenotion/notion-mcp-server",
    },
    {
      text: "פקודה /post-linkedin מייצרת 3 גרסאות שונות לכל post: formal, casual, ו-story-driven.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /newsletter מייצרת draft newsletter שבועי מ-highlights שאתה מספק — format, tone, CTA.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /seo-brief מבצעת keyword research ומייצרת content brief מלא: H1, H2s, word count, meta.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל Israeli audience preferences, LinkedIn algorithm insights, posting time optimization.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "Hook PostToolUse שומר כל תוכן שנוצר ב-Notion database אוטומטית עם timestamp.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
  ],
  docs: [
    {
      text: "GitHub MCP מסנכרן תיעוד עם code changes: כשמדדים PR, Claude מזהה functions שהשתנו ומציע לעדכן docs.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "Context7 מביא best practices ב-technical writing מ-Stripe Docs, Twilio, ו-MDN כ-reference.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "פקודה /api-docs מייצרת OpenAPI 3.0 spec מ-codebase: endpoints, schemas, examples, error codes.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /changelog מייצרת CHANGELOG.md מ-git log עם categorization: Breaking, Features, Fixes.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /readme-gen מייצרת README מלא: badges, installation, quick start, examples, contributing.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל docs-as-code philosophy, plain language guidelines, ו-progressive disclosure patterns.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  freelance: [
    {
      text: "GitHub MCP מרכז כל client repos, PRs, ו-code reviews — dashboard אחד לכל הלקוחות.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "Notion MCP מנהל client docs, invoices, project status, ו-meeting notes — הכל מסונכרן.",
      url: "https://github.com/makenotion/notion-mcp-server",
    },
    {
      text: "פקודה /proposal מייצרת הצעת מחיר מפורטת עם breakdown של שלבים, deliverables, timeline.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /client-handoff מכינה package מסירה: docs, credentials, deployment notes, training materials.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /scope-check משווה את ה-current work לה-original scope ומזהה scope creep באופן אוטומטי.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל red flags recognition, Israeli VAT rules, contract language, ו-client communication templates.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  cto: [
    {
      text: "GitHub MCP מאפשר PR reviews מעמיקים: security vulnerabilities, performance regressions, architecture concerns.",
      url: "https://github.com/github/github-mcp-server",
    },
    {
      text: "Notion MCP שומר ADRs, architecture docs, ו-team wiki מסונכרן עם כל decision שמתקבל.",
      url: "https://github.com/makenotion/notion-mcp-server",
    },
    {
      text: "פקודה /adr מייצרת Architecture Decision Record מלא: context, decision, consequences, alternatives.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /pr-review מבצעת deep review: security (OWASP), performance, test coverage, breaking changes.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /tech-debt-audit ממפה tech debt לפי severity, effort, ו-ROI — backlog מוכן לתכנון.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל engineering principles, on-call rotation, incident severity levels, ו-coding standards.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  ecommerce: [
    {
      text: "Stripe MCP מנהל revenue analytics, refunds, disputes, ו-payout schedules ישירות.",
      url: "https://github.com/stripe/agent-toolkit",
    },
    {
      text: "פקודה /product-desc מייצרת 3 גרסאות תיאור מוצר: SEO-optimized, emotional, ו-feature-focused.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /email-campaign מייצרת email sequence מלא לסגמנט ספציפי עם A/B testing variants.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /discount-calc מחשבת impact של הנחות על margin, LTV, ו-breakeven — לפני שמחליטים.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל Israeli consumer behavior insights, Shopify Liquid template patterns, ו-conversion tips.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "Script Python שמייצר daily sales digest ושולח ל-Telegram: revenue, orders, top products, alerts.",
      url: "https://docs.anthropic.com/en/docs/claude-code/overview",
    },
  ],
  gamedev: [
    {
      text: "Context7 מביא Unity API docs, Godot GDScript reference, ו-game design patterns תמיד עדכניים.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Playwright MCP מריץ automated playtesting ל-browser games: path finding, hitboxes, ו-performance.",
      url: "https://github.com/microsoft/playwright-mcp",
    },
    {
      text: "פקודה /new-game מ-scaffold project structure: scenes, scripts, assets, ו-CI pipeline לפי engine.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /game-loop מייצרת state machine מלא: Idle, Playing, Paused, GameOver עם transitions.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל game feel principles, juice patterns, ו-monetization models לפי genre.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "Supabase leaderboard עם realtime scores, ו-asset pipeline scripts לאוטומציית sprite sheets.",
      url: "https://github.com/supabase/mcp-server-supabase",
    },
  ],
  student: [
    {
      text: "Context7 מביא Python / JavaScript docs לתלמידים — עם examples פשוטים ו-tutorials.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Hook PreToolUse שמחייב אישור לפני כל deletion — מגן על קוד שתלמידים כתבו.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "Hook PostToolUse מסביר כל שינוי שנעשה בקוד בשפה פשוטה — לא רק עושה, גם מלמד.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      text: "פקודה /explain מסבירה כל שורת קוד: מה היא עושה, למה, ואיך היא מתחברת לשאר.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /debug-guide מנחה debugging: breakpoints, print statements, error messages — step by step.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מגדיר Socratic method: Claude מכוון לתשובה בשאלות, לא נותן אותה ישירות.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
  teacher: [
    {
      text: "Notion MCP מסנכרן syllabus, lesson plans, student notes — הכל מתעדכן ב-Notion אוטומטית.",
      url: "https://github.com/makenotion/notion-mcp-server",
    },
    {
      text: "פקודה /lesson-plan מייצרת תכנית שיעור מלאה: objectives, activities, timing, assessments.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /exercise-gen מייצרת 10 תרגילים ב-3 רמות קושי עם hints ו-solutions נסתרות.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /quiz-gen מייצרת 20 שאלות: multiple choice, short answer, ו-code debugging — עם answer key.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל Bloom's taxonomy levels, active learning techniques, ו-Hebrew pedagogy conventions.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "פקודה /code-review-rubric מייצרת rubric להערכת קוד תלמידים: readability, correctness, style.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
  ],
  designer: [
    {
      text: "Context7 מביא MDN Web Docs, CSS specs, ו-ARIA authoring practices — always up to date.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "Playwright MCP בודק visual regressions על כל breakpoint: mobile, tablet, desktop — PNG diff.",
      url: "https://github.com/microsoft/playwright-mcp",
    },
    {
      text: "פקודה /figma-to-code הופכת Figma frame ל-React component RTL-ready עם Tailwind/CSS modules.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /a11y-check מריצה WCAG 2.1 AA audit: contrast ratios, focus order, aria-labels, keyboard traps.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל Hebrew RTL rules, Israeli standard SI 5568, ו-design token conventions.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      text: "Hook PostToolUse מריץ Stylelint + Prettier על כל קובץ CSS/SCSS שנשמר.",
      url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
  ],
  researcher: [
    {
      text: "Context7 מביא arXiv, Semantic Scholar, ו-PubMed API docs — לחיפוש papers ב-real time.",
      url: "https://github.com/upstash/context7",
    },
    {
      text: "PostgreSQL MCP מנהל citation database אישי: papers, authors, tags, notes — searchable.",
      url: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    },
    {
      text: "פקודה /paper-summary מייצרת סיכום מובנה: problem, method, results, limitations, future work.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /lit-review מייצרת literature review בפורמט אקדמי מ-10 papers: themes, gaps, contradictions.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "פקודה /citation-gen מייצרת APA, MLA, ו-BibTeX מ-URL, DOI, או ISBN — עם validation.",
      url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    },
    {
      text: "CLAUDE.md מכיל critical thinking frameworks, academic tone guide, ו-Israeli research ethics standards.",
      url: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
  ],
};

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
  const isEn = currentLang === "en";
  const en = EN[setup.id];
  const displayName = isEn && en ? en.name : setup.name;
  const displayDesc = isEn && en ? en.description : setup.description;
  const displayWeek1 = isEn && en ? en.week1 : setup.week1;
  const prevLabel = isEn ? "Previous" : "הקודם";
  const nextLabel = isEn ? "Next" : "הבא";
  const closeLabel = isEn ? "Close" : "סגור";
  const prereqItems = isEn
    ? [
        "macOS with Apple Silicon (M1/M2/M3/M4)",
        'Xcode Command Line Tools — <code class="inline-cmd">xcode-select --install</code>',
        "Terminal open (Terminal.app or iTerm2)",
        "Internet connection",
      ]
    : [
        "macOS עם Apple Silicon (M1/M2/M3/M4)",
        'Xcode Command Line Tools — <code class="inline-cmd">xcode-select --install</code>',
        "Terminal פתוח (Terminal.app או iTerm2)",
        "חיבור לאינטרנט",
      ];
  modalContent.innerHTML = `
    <div class="modal-nav-row">
      <button class="modal-nav-btn" id="modal-prev" ${!hasPrev ? "disabled" : ""} aria-label="${isEn ? "Previous setup" : "הסטאפ הקודם"}">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        ${prevLabel}
      </button>
      <span class="modal-nav-pos">${currentModalIndex + 1} / ${SETUPS.length}</span>
      <button class="modal-nav-btn" id="modal-next" ${!hasNext ? "disabled" : ""} aria-label="${isEn ? "Next setup" : "הסטאפ הבא"}">
        ${nextLabel}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>
    <button class="modal-close" id="modal-close-btn" aria-label="${closeLabel}">✕</button>
    <div class="modal-header">
      <span class="modal-accent" style="color:${accent}" aria-hidden="true">◆</span>
      <div>
        <h2 id="modal-title">${displayName}</h2>
        <span class="modal-user">${setup.user}</span>
        <span class="modal-tags">${setup.tags.map((t) => `<span class="tag" style="border-color:${accent};color:${accent}">${t}</span>`).join("")}</span>
      </div>
    </div>
    <p class="modal-desc">${displayDesc}</p>
    <h3>${I18N[currentLang].whatsIncluded}</h3>
    <ul class="feature-list">
      ${setup.features
        .map((f, i) => {
          const d =
            setup.featureDetails?.[i] ?? (FEATURE_DETAILS[setup.id] || [])[i];
          return d
            ? `<li><details class="feature-detail"><summary>${f}</summary><div class="feature-detail-body"><p>${d.text}</p>${d.url ? `<a href="${d.url}" target="_blank" rel="noopener noreferrer" class="feature-ref">↗ ${d.url.replace("https://", "")}</a>` : ""}</div></details></li>`
            : `<li>${f}</li>`;
        })
        .join("")}
    </ul>
    ${
      displayWeek1
        ? `<h3 class="week1-heading">${I18N[currentLang].week1Heading}</h3>
    <ul class="week1-list">
      ${displayWeek1.map((p) => `<li class="week1-item"><span class="week1-check" aria-hidden="true">→</span>${p}</li>`).join("")}
    </ul>`
        : ""
    }
    <h3>${I18N[currentLang].installHeading}</h3>
    <details class="prereqs-details">
      <summary class="prereqs-summary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        ${I18N[currentLang].prereqs}
      </summary>
      <ul class="prereqs-list">
        ${prereqItems.map((item) => `<li><label class="prereq-item"><input type="checkbox" class="prereq-check"><span>${item}</span></label></li>`).join("")}
      </ul>
    </details>
    <div class="install-block">
      <code id="cmd-${setup.id}">${setup.installCmd}</code>
      <button class="copy-btn" id="copy-btn-${setup.id}" title="${I18N[currentLang].copyBtn}" aria-label="${I18N[currentLang].copyAriaLabel}">⎘</button>
      <button class="run-btn" id="run-btn-${setup.id}" aria-label="${I18N[currentLang].runAriaLabel}">${I18N[currentLang].runBtn}</button>
    </div>
    <div class="run-instructions" id="run-instructions-${setup.id}" aria-live="polite">
      ${I18N[currentLang].runInstructions}
    </div>
    <div class="modal-footer-row">
      <p class="prereqs" style="display:none"></p>
      <button class="share-btn" id="share-btn-${setup.id}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        ${I18N[currentLang].shareBtn}
      </button>
    </div>
    <div class="similar-section">
      <h3>${I18N[currentLang].similarHeading}</h3>
      <div class="similar-grid">
        ${getSimilarSetups(setup)
          .map(
            (s) => `
          <button class="similar-card" data-id="${s.id}" style="--s-accent:${s.color}">
            <span class="similar-dot" style="background:${s.color}"></span>
            <span class="similar-name">${isEn && EN[s.id] ? EN[s.id].name : s.name}</span>
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
  document
    .getElementById(`run-btn-${setup.id}`)
    .addEventListener("click", () => {
      copyCmd(setup.id);
      const panel = document.getElementById(`run-instructions-${setup.id}`);
      if (panel) panel.classList.toggle("visible");
    });
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
  const hash = location.hash.slice(1);
  if (hash) {
    const setup = SETUPS.find((s) => s.id === hash);
    if (setup) openModal(setup);
  }
});

// ── Theme ─────────────────────────────────────────────────────────────────────
let currentTheme = localStorage.getItem("theme") || "light";

function getAccent(i) {
  return PALETTE[CYCLE[i % CYCLE.length]][
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

// ── Language ──────────────────────────────────────────────────────────────────
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  const t = I18N[lang];
  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;
  document.body.style.direction = t.dir;
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.textContent = t.langToggleText;
    langBtn.setAttribute("aria-label", t.langToggleLabel);
    langBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  }
  const sl = document.querySelector(".skip-link");
  if (sl) sl.textContent = t.skipLink;
  const navSetups = document.getElementById("nav-link-setups");
  if (navSetups) navSetups.textContent = t.navSetups;
  const navTutorials = document.getElementById("nav-link-tutorials");
  if (navTutorials) navTutorials.textContent = t.navTutorials;
  refreshTileLang();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLang(currentLang === "he" ? "en" : "he");
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
  tile.dataset.setupId = setup.id;

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

function refreshTileLang() {
  const isEn = currentLang === "en";
  const levelMap = {
    מתחיל: "Beginner",
    בינוני: "Intermediate",
    מתקדם: "Advanced",
  };
  tileEls.forEach((tile) => {
    const id = tile.dataset.setupId;
    const setup = SETUPS.find((s) => s.id === id);
    if (!setup) return;
    const en = EN[id];
    tile.querySelector(".tile-name").textContent =
      isEn && en ? en.name : setup.name;
    tile.querySelector(".tile-desc").textContent =
      isEn && en ? en.description : setup.description;
    tile.querySelector(".badge-level").textContent = isEn
      ? levelMap[setup.level] || setup.level
      : setup.level;
    const copied = tile.querySelector(".tile-copied");
    if (copied) copied.textContent = isEn ? "✓ Copied" : "✓ הורדת";
    tile.setAttribute(
      "aria-label",
      isEn && en ? `Open ${en.name}` : `פתח ${setup.name}`,
    );
  });
}

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

applyTheme(currentTheme);
applyLang(currentLang);
