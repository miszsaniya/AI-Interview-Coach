import { useNavigate } from "react-router-dom";
import "./InterviewSelection.css";

const TYPES = [
  {
    id: "hr",
    title: "HR Interview",
    subtitle: "Behavioral Questions",
    description: "Practice behavioral and situational questions that test your soft skills, communication, and cultural fit.",
    topics: ["Tell me about yourself", "Strengths & Weaknesses", "STAR Method", "Leadership", "Conflict Resolution"],
    questions: 5,
    icon: "🤝",
    theme: "blue",
    gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    bg: "#eff6ff",
    border: "#bfdbfe",
    btnColor: "#2563eb",
  },
  {
    id: "technical",
    title: "Technical Interview",
    subtitle: "Coding · DSA · OOP · DB · Networking",
    description: "Challenge yourself with technical questions covering data structures, algorithms, system design, and more.",
    topics: ["Data Structures", "Algorithms (DSA)", "OOP Principles", "Databases", "Networking"],
    questions: 5,
    icon: "💻",
    theme: "purple",
    gradient: "linear-gradient(135deg, #7c3aed, #5b21b6)",
    bg: "#faf5ff",
    border: "#ddd6fe",
    btnColor: "#7c3aed",
  },
  {
    id: "mixed",
    title: "Mixed Interview",
    subtitle: "HR + Technical Combined",
    description: "A balanced combination of behavioral and technical questions to simulate a full real-world interview loop.",
    topics: ["Behavioral + Technical", "Problem Solving", "Communication", "System Design", "Adaptability"],
    questions: 5,
    icon: "⚡",
    theme: "green",
    gradient: "linear-gradient(135deg, #059669, #047857)",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    btnColor: "#059669",
  },
];

export default function InterviewSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="isel-page">
      {/* Header */}
      <div className="isel-header">
        <h1 className="isel-header__title">Choose Interview Type</h1>
        <p className="isel-header__sub">
          Select the type of interview you want to practice. Each session contains 5 carefully curated questions.
        </p>
      </div>

      {/* Cards */}
      <div className="isel-cards">
        {TYPES.map((t) => (
          <div
            className={`isel-card isel-card--${t.theme}`}
            key={t.id}
            style={{
              "--card-gradient": t.gradient,
              "--card-bg": t.bg,
              "--card-border": t.border,
              "--card-btn": t.btnColor,
            }}
          >
            {/* Card top */}
            <div className="isel-card__top" style={{ background: t.gradient }}>
              <div className="isel-card__icon">{t.icon}</div>
              <div className="isel-card__top-info">
                <h2 className="isel-card__title">{t.title}</h2>
                <p className="isel-card__subtitle">{t.subtitle}</p>
              </div>
              <div className="isel-card__badge">{t.questions} Questions</div>
            </div>

            {/* Card body */}
            <div className="isel-card__body">
              <p className="isel-card__desc">{t.description}</p>

              <div className="isel-card__topics-label">Topics Covered</div>
              <div className="isel-card__topics">
                {t.topics.map((topic) => (
                  <span className="isel-card__topic" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>

              <div className="isel-card__meta">
                <div className="isel-card__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  ~15 minutes
                </div>
                <div className="isel-card__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Instant AI Feedback
                </div>
              </div>

              <button
                className="isel-card__btn"
                onClick={() => navigate(`/interview/${t.id}`)}
              >
                Start {t.title}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="isel-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        All questions are stored locally. No internet required. Your results are saved automatically.
      </div>
    </div>
  );
}
