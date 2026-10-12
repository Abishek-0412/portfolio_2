export const profile = {
  firstName: "ABISHEK",
  lastName: "N",
  role: "Full Stack Developer",
  title: "Developer Lead",
  location: "Coimbatore, India",
  email: "abishekn0412@gmail.com",
  resume: "/Abishek-N-Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Abishek-0412" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abishek-n-487a54218" },
    { label: "X / Twitter", href: "https://x.com/AbishekN0412" },
  ],
  summary:
    "Full Stack Developer with 4+ years designing, developing, and deploying scalable, high-performance web applications across e-commerce, SaaS, and AI-driven platforms — from distributed system design and real-time communication to database optimization, observability, and LLM-powered automation.",
  /** Rotating phrases in the hero: "I build …" */
  builds: [
    "real-time commerce platforms",
    "LLM agent workflows",
    "observable cloud systems",
    "cross-platform apps",
  ],
};

export const stats = [
  { value: 4, suffix: "+", label: "Years building production software" },
  { value: 40, suffix: "%", label: "Faster data retrieval via query tuning" },
  { value: 5, suffix: "", label: "Major platforms shipped" },
  { value: 1, suffix: " mo", label: "Full-stack matrimony MVP, end to end" },
];

export const projects = [
  {
    name: "Corksy",
    tagline: "Multi-Site Wine E-commerce & POS",
    kind: "E-commerce · Real-time",
    accent: "#f0640d",
    file: "inventory.sync.ts",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    points: [
      "Online storefront + offline POS with real-time inventory sync across channels",
      "Cart-hold reservations to prevent overselling under concurrent load",
      "Multiple payment providers, wallets, RBAC and event-driven order updates",
    ],
  },
  {
    name: "Incentive Fox",
    tagline: "Referral, Rewards & B2B Platform",
    kind: "B2B · Integrations",
    accent: "#e8a33d",
    file: "rewards.pipeline.ts",
    tags: ["AngularJS", "MSSQL", "REST APIs"],
    points: [
      "QR-based referrals and loyalty campaigns with automated gift-card fulfillment (SVS, Tango)",
      "FTP batch pipelines with validation and reconciliation of failed transactions",
      "Wufoo + Zapier integrations and a customer rewards dashboard",
    ],
  },
  {
    name: "SpotMI",
    tagline: "Matrimony Platform — Web & Mobile",
    kind: "Cross-platform · GraphQL",
    accent: "#e2557a",
    file: "schema.graphql",
    tags: ["React", "GraphQL", "PostgreSQL", "Flutter"],
    points: [
      "Led delivery of the full platform in 1 month with a small team",
      "Scalable GraphQL APIs plus Android & iOS apps in Flutter",
      "Encrypted chat, privacy controls and intelligent image validation",
    ],
  },
  {
    name: "aRa",
    tagline: "AI Agent Platform",
    kind: "AI · LLM Agents",
    accent: "#9b7bff",
    file: "agent.graph.py",
    tags: ["Python", "LLMs", "LangChain", "LangGraph"],
    points: [
      "Agent system that automates product content and development workflows",
      "Generates SRDs, test cases and structured product descriptions via LLM pipelines",
      "Reusable prompt frameworks for consistent, reliable outputs",
    ],
  },
  {
    name: "Retina Watch",
    tagline: "AI Medical Imaging System",
    kind: "ML · Computer Vision",
    accent: "#3fb8a8",
    file: "train.py",
    tags: ["Python", "PyTorch", "Computer Vision"],
    points: [
      "Models that detect retina-related conditions from medical imaging",
      "Preprocessing and training pipelines with classification & anomaly detection",
      "Predictive models integrated into workflows for real-time analysis",
    ],
  },
];

export const experience = {
  role: "Full Stack Developer / Developer Lead",
  company: "Brightspot Technology Solutions",
  location: "Coimbatore",
  period: "Mar 2022 — Present",
  tabs: [
    {
      label: "Achievements",
      items: [
        "Built scalable full-stack applications for e-commerce and service platforms with React.js and Node.js",
        "Implemented WebSocket-based real-time sync of payment and transaction statuses",
        "Engineered concurrency control to prevent duplicate transactions in high-traffic flows",
        "Optimized queries and indexing, improving data retrieval efficiency by up to 40%",
        "Hardened Node.js + PostgreSQL services against SQL injection and bot attacks",
      ],
    },
    {
      label: "Engineering",
      items: [
        "Distributed tracing across microservices with OpenTelemetry",
        "Centralized logging, monitoring and alerting with Datadog",
        "Controlled rollouts using Flipt feature flags",
        "Caching, API optimization and efficient data-access patterns to cut latency",
        "Resilient systems with retries, fault tolerance and real-time health dashboards",
      ],
    },
    {
      label: "Leadership",
      items: [
        "Led development across multiple projects through the full SDLC",
        "Coordinated product, QA and design to deliver on schedule",
        "Ran sprints and workflows in Linear; active in all Agile ceremonies",
        "Conducted code reviews and mentored junior developers",
        "Resolved critical production issues fast to minimize downtime",
      ],
    },
  ],
};

export const milestones = [
  { title: "AWS Certified Solutions Architect", meta: "Certification", period: "In Progress" },
  { title: "M.Sc B.Ed in Computer Science", meta: "Government College of Arts and Science, Coimbatore", period: "2022" },
];

export const ai = {
  points: [
    { title: "Agentic workflows", body: "LangGraph agents that turn input parameters into SRDs, test cases and structured product descriptions." },
    { title: "Prompt frameworks", body: "Reusable, versioned prompt templates that keep LLM output consistent and reliable." },
    { title: "AI-assisted delivery", body: "Cursor, Claude CLI, Codex CLI and Antigravity in the daily loop — SpotMI shipped in one month." },
  ],
  tools: ["Cursor", "Claude CLI", "Codex CLI", "Cursor CLI", "Antigravity", "LangGraph", "LangChain"],
};

/** Illustrative agent run shown in the animated terminal. */
export const agentRun = [
  { t: "cmd", text: "ara run --input product.json" },
  { t: "dim", text: "› loading prompt framework" },
  { t: "dim", text: "› graph: plan → draft → review → export" },
  { t: "step", text: "planner", status: "requirements outlined" },
  { t: "step", text: "srd_writer", status: "SRD.md generated" },
  { t: "step", text: "test_gen", status: "test cases generated" },
  { t: "step", text: "copywriter", status: "descriptions generated" },
  { t: "ok", text: "✔ run complete — artifacts exported" },
] as const;

export const flow = [
  { name: "Client", tech: "React · Flutter" },
  { name: "API", tech: "Node · Go · GraphQL" },
  { name: "Async", tech: "SQS · Lambda · Step Fn" },
  { name: "Data", tech: "PostgreSQL" },
];

export const reasons = [
  {
    title: "Lead-Driven Delivery",
    body: "I own the full lifecycle — planning sprints in Linear, reviewing code, mentoring juniors, and shipping production-ready platforms on tight timelines.",
  },
  {
    title: "Performance & Precision",
    body: "Concurrency control, caching, indexing and query tuning that keep transaction-heavy systems fast, consistent and duplicate-free.",
  },
  {
    title: "Observable by Default",
    body: "OpenTelemetry tracing, Datadog logging and alerting, and Flipt feature flags so every release is measurable and every incident is found fast.",
  },
];

export const skills = [
  { group: "Frontend", items: ["React.js", "TypeScript", "Redux", "Zustand", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "Go (Golang)", "GraphQL", "Python"] },
  { group: "AI & Agents", items: ["LangGraph", "LangChain", "LLM Pipelines", "PyTorch", "AI Tooling"] },
  { group: "Cloud & DevOps", items: ["AWS Lambda / EC2 / RDS", "SQS & Step Functions", "Terraform", "CI/CD", "PostgreSQL"] },
  { group: "Observability & Security", items: ["OpenTelemetry", "Datadog", "Flipt", "WAF & Rate Limiting", "Bot Mitigation"] },
];

export const tools = [
  "React", "Node.js", "TypeScript", "Go", "GraphQL", "PostgreSQL", "AWS", "Terraform",
  "LangGraph", "OpenTelemetry", "Datadog", "Playwright", "Cursor", "Claude CLI", "Codex CLI", "Linear",
];

export const faqs = [
  {
    q: "What kind of products do you build?",
    a: "Scalable full-stack web applications across e-commerce, SaaS and AI-driven platforms — multi-site storefronts with POS, referral and rewards systems, cross-platform mobile apps, and LLM agent platforms.",
  },
  {
    q: "How do you keep systems reliable under heavy traffic?",
    a: "Concurrency control to prevent duplicate transactions, WebSockets for real-time payment status, retry logic and fault tolerance, plus caching and indexing strategies that improved data retrieval by up to 40%.",
  },
  {
    q: "Do you lead teams or work solo?",
    a: "Both. As Developer Lead at Brightspot I run sprints, coordinate with product, QA and design, review code and mentor juniors — and I stay hands-on in the codebase.",
  },
  {
    q: "How do you use AI in your workflow?",
    a: "I build AI agents with LangGraph and LLM pipelines, and use tools like Cursor, Claude CLI and Codex CLI to accelerate delivery — SpotMI shipped in a month with AI-assisted development.",
  },
];
