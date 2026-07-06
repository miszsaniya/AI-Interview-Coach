import "./Features.css";

/* ── Icons ──────────────────────────────────────────── */
const IconHR = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCode = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconMixed = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconFeedback = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </svg>
);

const IconResume = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconAnalytics = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4"  />
    <line x1="6"  y1="20" x2="6"  y2="14" />
    <line x1="2"  y1="20" x2="22" y2="20" />
  </svg>
);

/* ── Data ─────────────────────────────────────────── */
const FEATURES = [
  {
    id: "hr",
    title: "HR Interview",
    description:
      "Master behavioural questions, STAR responses, and soft-skill scenarios coached by an empathetic AI that mirrors real recruiters.",
    icon: <IconHR />,
    iconBg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
  },
  {
    id: "tech",
    title: "Technical Interview",
    description:
      "Tackle live DSA problems, system design challenges, and language-specific questions with step-by-step AI hints and code review.",
    icon: <IconCode />,
    iconBg: "linear-gradient(135deg, #6366f1, #4f46e5)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #818cf8, #4f46e5)",
  },
  {
    id: "mixed",
    title: "Mixed Interview",
    description:
      "Practice a combination of HR and Technical questions in one session — simulating a real full-loop interview experience.",
    icon: <IconMixed />,
    iconBg: "linear-gradient(135deg, #059669, #047857)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #34d399, #047857)",
  },
  {
    id: "feedback",
    title: "AI Feedback",
    description:
      "Receive instant, structured feedback on every answer — covering tone, structure, keyword density, and relevance to the job description.",
    icon: <IconFeedback />,
    iconBg: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #38bdf8, #0284c7)",
  },
  {
    id: "resume",
    title: "Resume Based Questions",
    description:
      "Upload your resume and get interview questions tailored specifically to your skills, projects, and professional experience.",
    icon: <IconResume />,
    iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #fbbf24, #d97706)",
  },
  {
    id: "analytics",
    title: "Performance Analytics",
    description:
      "Track your progress with interactive dashboards — confidence trends, topic coverage, readiness scores, and improvement over time.",
    icon: <IconAnalytics />,
    iconBg: "linear-gradient(135deg, #10b981, #059669)",
    iconColor: "#ffffff",
    accent: "linear-gradient(90deg, #34d399, #059669)",
  },
];

/* ── Feature Card ─────────────────────────────────── */
function FeatureCard({ title, description, icon, iconBg, iconColor, accent }) {
  return (
    <div
      className="feature-card"
      style={{ "--card-accent": accent }}
    >
      <div
        className="feature-card__icon-wrap"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p  className="feature-card__desc">{description}</p>
      <span className="feature-card__link">
        Learn more
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features__inner">
        <div className="section-header">
          <div className="section-label">Features</div>
          <h2 className="section-title">
            Everything you need to ace your interview
          </h2>
          <p className="section-subtitle">
            Our AI platform covers every dimension of modern interview prep —
            from human-centred communication to advanced technical challenges.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.id} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
