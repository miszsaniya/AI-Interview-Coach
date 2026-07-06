import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStats, loadSessions } from "../data/store";
import "./Dashboard.css";

const ACTIONS = [
  { to: "/interview",     label: "Start Interview", desc: "Begin a mock session",   icon: "🎤", bg: "#eff6ff", color: "#2563eb" },
  { to: "/resume-upload", label: "Upload Resume",   desc: "Personalise questions",  icon: "📄", bg: "#f0fdf4", color: "#16a34a" },
  { to: "/results",       label: "View Results",    desc: "See detailed feedback",  icon: "📊", bg: "#faf5ff", color: "#7c3aed" },
  { to: "/analytics",     label: "Analytics",       desc: "Track your progress",    icon: "📈", bg: "#fff7ed", color: "#c2410c" },
];

function scoreColor(score) {
  if (score >= 85) return "#16a34a";
  if (score >= 70) return "#d97706";
  return "#ef4444";
}

function typeLabel(type) {
  if (type === "hr")        return "HR";
  if (type === "technical") return "Technical";
  return "Mixed";
}

function typeIcon(type) {
  if (type === "technical") return "💻";
  if (type === "hr")        return "🤝";
  return "⚡";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats,    setStats]    = useState({ sessionsCompleted: 0, avgScore: 0, questionsAnswered: 0, timePracticed: 0 });
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setStats(getStats());
    setSessions(loadSessions().slice(0, 5));
  }, []);

  const readiness   = stats.sessionsCompleted === 0 ? 0 : Math.min(100, Math.round(stats.avgScore * 0.9 + stats.sessionsCompleted * 2));
  const r           = 44;
  const circ        = 2 * Math.PI * r;
  const dashOffset  = circ - (readiness / 100) * circ;

  const STAT_CARDS = [
    { label: "Sessions Completed",  value: stats.sessionsCompleted, icon: "🎯", color: "#2563eb" },
    { label: "Average Score",       value: stats.avgScore > 0 ? stats.avgScore + "%" : "0%",   icon: "📈", color: "#10b981" },
    { label: "Questions Answered",  value: stats.questionsAnswered, icon: "❓", color: "#8b5cf6" },
    { label: "Time Practiced",      value: stats.timePracticed > 0 ? stats.timePracticed + " min" : "0 Hours", icon: "⏱️", color: "#f59e0b" },
  ];

  return (
    <>
      {/* ── Welcome bar ── */}
      <div className="dash-welcome">
        <div className="dash-welcome__text">
          <h1>Welcome, Saniya 👋</h1>
          <p>
            {stats.sessionsCompleted === 0
              ? "Start your first interview session to begin tracking your progress."
              : `You've completed ${stats.sessionsCompleted} session${stats.sessionsCompleted !== 1 ? "s" : ""}. Keep going!`}
          </p>
        </div>
        <button className="dash-start-btn" onClick={() => navigate("/interview")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Start Interview
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="dash-stats">
        {STAT_CARDS.map(({ label, value, icon, color }) => (
          <div className="stat-card" key={label} style={{ "--stat-color": color }}>
            <div className="stat-card__header">
              <span className="stat-card__label">{label}</span>
              <div className="stat-card__icon" style={{ background: color + "18" }}>{icon}</div>
            </div>
            <div className="stat-card__value">{value}</div>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="dash-grid">
        <div>
          {/* Quick actions */}
          <div className="dash-section-title">Quick Actions</div>
          <div className="dash-actions">
            {ACTIONS.map(({ to, label, desc, icon, bg, color }) => (
              <Link to={to} className="action-card" key={label}>
                <div className="action-card__icon" style={{ background: bg, color }}>{icon}</div>
                <div>
                  <div className="action-card__title">{label}</div>
                  <div className="action-card__desc">{desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent sessions */}
          <div className="dash-section-title">
            Recent Sessions
            {sessions.length > 0 && <Link to="/analytics">View all</Link>}
          </div>

          {sessions.length === 0 ? (
            <div className="sessions-empty">
              <div className="sessions-empty__icon">📋</div>
              <div className="sessions-empty__text">No interviews completed yet.</div>
              <div className="sessions-empty__sub">Start your first interview to see your history here.</div>
              <button className="sessions-empty__btn" onClick={() => navigate("/interview")}>
                Start Interview
              </button>
            </div>
          ) : (
            <div className="sessions-list">
              {sessions.map((s) => (
                <div className="session-row" key={s.id}>
                  <div className="session-row__icon">{typeIcon(s.type)}</div>
                  <div className="session-row__info">
                    <div className="session-row__title">{typeLabel(s.type)} Interview</div>
                    <div className="session-row__meta">
                      <span className={`badge badge--${s.type === "technical" ? "indigo" : s.type === "hr" ? "blue" : "green"}`}>
                        {typeLabel(s.type)}
                      </span>
                      <span style={{ marginLeft: 6, color: "var(--gray-500)", fontSize: 13 }}>{formatDate(s.date)}</span>
                    </div>
                  </div>
                  <div className="session-row__score" style={{ color: scoreColor(s.score) }}>
                    {s.score}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="dash-sidebar">
          {/* Readiness ring */}
          <div className="readiness-card">
            <div className="dash-section-title" style={{ margin: 0 }}>Interview Readiness</div>
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle cx="55" cy="55" r={r} fill="none" stroke="#2563eb" strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transformOrigin: "55px 55px", transform: "rotate(-90deg)" }}
              />
              <text x="55" y="55" textAnchor="middle" dy=".35em"
                fontSize="20" fontWeight="800" fill="#111827">
                {readiness}%
              </text>
            </svg>
            <div className="readiness-ring__value">
              {stats.sessionsCompleted === 0
                ? "Complete interviews to track readiness."
                : "Based on your recent sessions. Keep practising!"}
            </div>
          </div>

          {/* Skill breakdown */}
          {stats.sessionsCompleted === 0 ? (
            <div className="skill-empty-card">
              <div className="skill-empty-card__title">Skill Breakdown</div>
              <div className="skill-empty-card__sub">Analytics will appear after you complete interviews.</div>
            </div>
          ) : (
            <div className="skill-card">
              <div className="dash-section-title" style={{ margin: "0 0 14px" }}>Skill Breakdown</div>
              <div className="skill-list">
                <SkillBar label="Communication"   value={Math.min(100, Math.round(stats.avgScore * 0.95))} color="#2563eb" />
                <SkillBar label="Problem Solving" value={Math.min(100, Math.round(stats.avgScore * 0.85))} color="#8b5cf6" />
                <SkillBar label="Confidence"      value={Math.min(100, Math.round(stats.avgScore * 0.90))} color="#10b981" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SkillBar({ label, value, color }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-item__top">
        <span className="skill-bar-item__label">{label}</span>
        <span className="skill-bar-item__val">{value}%</span>
      </div>
      <div className="skill-bar-item__track">
        <div className="skill-bar-item__fill" style={{ width: value + "%", background: color }} />
      </div>
    </div>
  );
}
