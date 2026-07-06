import { useNavigate } from "react-router-dom";
import "./Hero.css";

/* ── SVG icons ────────────────────────────────────── */
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/* ── Component ────────────────────────────────────── */
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      {/* Decorative blobs */}
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__blob hero__blob--3" />

      <div className="hero__inner">
        {/* ── Left: content ── */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            AI-Powered Interview Training
          </div>

          <h1 className="hero__title">
            AI Interview<br />
            <span>Coach</span>
          </h1>

          <p className="hero__subtitle">
            Practice HR and Technical Interviews using AI and improve your confidence.
          </p>

          <div className="hero__actions">
            <button className="hero__btn-start" onClick={() => navigate("/login")}>
              <PlayIcon />
              Start Interview
            </button>
            <button className="hero__btn-upload" onClick={() => navigate("/login")}>
              <UploadIcon />
              Upload Resume
            </button>
          </div>

          {/* Social proof */}
          <div className="hero__proof">
            <div className="hero__proof-item">
              <strong>10K+</strong> Users Coached
            </div>
            <div className="hero__proof-divider" />
            <div className="hero__proof-item">
              <strong>95%</strong> Satisfaction
            </div>
            <div className="hero__proof-divider" />
            <div className="hero__proof-item">
              <strong>300+</strong> Questions
            </div>
          </div>
        </div>

        {/* ── Right: mock interview card ── */}
        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-avatar">🤖</div>
              <div className="hero__card-meta">
                <div className="hero__card-name">AI Interviewer</div>
                <div className="hero__card-role">Senior Engineer @ Google</div>
              </div>
              <div className="hero__card-live">LIVE</div>
            </div>

            <div className="hero__card-question">
              <p>
                <strong>Question 3 / 10</strong>
                "Describe a time you led a project under a tight deadline.
                What was your approach and what did you learn?"
              </p>
            </div>

            <div className="hero__card-metrics">
              <div className="hero__card-metric">
                <div className="hero__card-metric-val">87</div>
                <div className="hero__card-metric-label">Score</div>
              </div>
              <div className="hero__card-metric">
                <div className="hero__card-metric-val">92%</div>
                <div className="hero__card-metric-label">Clarity</div>
              </div>
              <div className="hero__card-metric">
                <div className="hero__card-metric-val">A+</div>
                <div className="hero__card-metric-label">Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
