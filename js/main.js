const SETUPS = [
  {
    id: "full-dev",
    name: "The Full Dev Stack",
    user: "@adamorad",
    color: "#00e5ff",
    description:
      "All-in-one setup: Ruflo multi-agent, 47 dev tools, 15 workflows, Supabase plugin, and a custom statusline.",
    tags: ["Full Stack", "47 tools", "Ruflo"],
    features: [
      "Ruflo MCP — 60+ multi-agent orchestration tools",
      "47 dev tools (TDD, API scaffold, security scan, and more)",
      "15 multi-agent workflows",
      "Supabase plugin",
      "Prettier auto-format hook on every edit",
      "macOS notification hook",
      "Custom statusline (time · model · CTX% · rate limit%)",
      "Sensible keybindings (Ctrl+Enter, Ctrl+R, Ctrl+S)",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/full-dev/install.sh)`,
  },
  {
    id: "ai-builder",
    name: "The AI Builder",
    user: "@aicraft",
    color: "#b400ff",
    description:
      "Built for AI/ML developers. LangChain agent scaffolding, prompt optimization, and Python-first tooling.",
    tags: ["AI/ML", "LangChain", "Python"],
    features: [
      "Python 3.13 + pip",
      "Ruflo MCP for multi-agent orchestration",
      "LangChain/LangGraph agent scaffold tool",
      "Prompt optimization tool",
      "AI/ML code review tool",
      "AI assistant development tool",
      "Data pipeline + data validation tools",
      "CLAUDE.md tuned for AI engineering workflows",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/ai-builder/install.sh)`,
  },
  {
    id: "minimal",
    name: "The Minimalist",
    user: "@tinystack",
    color: "#00ff88",
    description:
      "Zero bloat. Just git, gh, and Claude Code. Fast to install, nothing you don't need.",
    tags: ["Minimal", "Fast", "Clean"],
    features: [
      "git + GitHub CLI only",
      "Claude Code CLI",
      "No MCP servers",
      "No hooks",
      "Bare CLAUDE.md with core principles only",
      "Default keybindings",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/minimal/install.sh)`,
  },
  {
    id: "web-dev",
    name: "The Web Dev",
    user: "@webstudio",
    color: "#ff6b00",
    description:
      "Frontend and fullstack focus. Node, Bun, Deno, Supabase, and deploy tooling ready out of the box.",
    tags: ["Web", "Node", "Supabase"],
    features: [
      "Node.js + Bun + Deno",
      "GitHub CLI",
      "Supabase plugin",
      "Deploy checklist tool",
      "API scaffold + API mock tools",
      "Accessibility audit tool",
      "Docker optimization tool",
      "Prettier auto-format hook",
      "CLAUDE.md tuned for web development",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/web-dev/install.sh)`,
  },
  {
    id: "data-scientist",
    name: "The Data Scientist",
    user: "@datamind",
    color: "#ffd600",
    description:
      "Python-first. Data pipelines, validation, and Jupyter-friendly tooling for analytics and ML work.",
    tags: ["Data", "Python", "Pipelines"],
    features: [
      "Python 3.13 + Jupyter",
      "Data pipeline architecture tool",
      "Data validation pipeline tool",
      "AI/ML code review tool",
      "Cost optimization tool",
      "Database migration tool",
      "CLAUDE.md tuned for data science workflows",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/data-scientist/install.sh)`,
  },
  {
    id: "devops",
    name: "The DevOps Engineer",
    user: "@opsforge",
    color: "#0066ff",
    description:
      "Infrastructure-first. Kubernetes manifests, monitoring setup, SLOs, and deploy checklists in one command.",
    tags: ["DevOps", "K8s", "Monitoring"],
    features: [
      "Docker + kubectl (via Homebrew)",
      "Kubernetes manifest generator",
      "Monitor setup tool",
      "SLO implementation tool",
      "Deploy checklist tool",
      "Cost optimization tool",
      "Error tracking tool",
      "CLAUDE.md tuned for infrastructure work",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/devops/install.sh)`,
  },
  {
    id: "security",
    name: "The Security Researcher",
    user: "@seclab",
    color: "#ff2d55",
    description:
      "Security-first toolchain. Vulnerability scanning, dependency auditing, and compliance checks built in.",
    tags: ["Security", "Audit", "Compliance"],
    features: [
      "Security scan tool",
      "Dependency audit tool",
      "Compliance check tool",
      "Error analysis tool",
      "Multi-agent code review",
      "Tech debt analysis tool",
      "CLAUDE.md tuned for security-conscious development",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/security/install.sh)`,
  },
  {
    id: "content-creator",
    name: "The Content Creator",
    user: "@contentcraft",
    color: "#ff2db0",
    description:
      "Built for technical writers and content teams. Doc generation, standup notes, and bilingual social content skills.",
    tags: ["Content", "Docs", "Social"],
    features: [
      "Doc generation tool",
      "Standup notes generator",
      "Code explanation tool",
      "Israeli LinkedIn strategy skill",
      "Israeli social content skill",
      "PR enhancement tool",
      "CLAUDE.md tuned for content workflows",
    ],
    installCmd: `bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/content-creator/install.sh)`,
  },
];

// ── Modal ──────────────────────────────────────────────────────────────────

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openModal(setup) {
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()" aria-label="Close">✕</button>
    <div class="modal-header">
      <span class="modal-accent" style="color:${setup.color}">◆</span>
      <div>
        <h2>${setup.name}</h2>
        <span class="modal-user">${setup.user}</span>
        <span class="modal-tags">${setup.tags.map((t) => `<span class="tag" style="border-color:${setup.color};color:${setup.color}">${t}</span>`).join("")}</span>
      </div>
    </div>
    <p class="modal-desc">${setup.description}</p>
    <h3>What's included</h3>
    <ul class="feature-list">
      ${setup.features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
    <h3>Install</h3>
    <div class="install-block">
      <code id="cmd-${setup.id}">${setup.installCmd}</code>
      <button class="copy-btn" onclick="copyCmd('${setup.id}')" title="Copy to clipboard">⎘</button>
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
