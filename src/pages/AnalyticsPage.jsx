import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadSessions, getStats } from "../data/store";
import "./Analytics.css";

function typeLabel(t) {
  if (t === "hr")        return "HR";
  if (t === "technical") return "Technical";
  return "Mixed";
}

function typeBadge(t) {
  if (t === "technical") return "badge--indigo";
  if (t === "hr")        return "badge--blue";
  return "badge--green";
}

function scoreColor(s) {
  if (s >= 80) return "#16a34a";
  if (s >= 65) return "#d97706";
  return "#ef4444";
}

function gradeOf(s) {
  if (s >= 90) return "A+";
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  return "D";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDuration(secs) {
  if (!secs) return "—";
  if (secs < 60) return `${secs}s`;
  return `${Math.round(secs / 60)} min`;
}

export default function AnalyticsPage() {
  const navigate  = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [stats,    setStats]    = useState({ sessionsCompleted: 0, avgScore: 0, questionsAnswered: 0, timePracticed: 0 });

  useEffect(() => {
    setSessions(loadSessions());
    setStats(getStats());
  }, []);

  const isEmpty = sessions.length === 0;

  /* Build simple bar chart data */
  const chartSessions = sessions.slice(0, 10).reverse(); // oldest first

  return (
    <div className="an-page">
      <div className="an-header">
        <h1 className="an-header__title">Analytics</h1>
        <p className="an-header__sub">Track your interview performance over time.</p>
      </div>

      {/* ── Summary stats ── */}
      <div className="an-stats">
        {[
          { label: "Total Sessions",     value: stats.sessionsCompleted, icon: "🎯", color: "#2563eb" },
          { label: "Average Score",      value: stats.avgScore > 0 ? stats.avgScore + "%" : "0%", icon: "📈", color: "#10b981" },
          { label: "Questions Answered", value: stats.questionsAnswered, icon: "❓", color: "#8b5cf6" },
          { label: "Time Practiced",     value: stats.timePracticed > 0 ? stats.timePracticed + " min" : "—", icon: "⏱️", color: "#f59e0b" },
        ].map(({ label, value, icon, color }) => (
          <div className="an-stat-card" key={label} style={{ "--an-color": color }}>
            <div className="an-stat-card__header">
              <span className="an-stat-card__label">{label}</span>
              <div className="an-stat-card__icon" style={{ background: color + "18" }}>{icon}</div>
            </div>
            <div className="an-stat-card__value">{value}</div>
          </div>
        ))}
      </div>

      {isEmpty ? (
        <div className="an-empty">
          <div className="an-empty__icon">📊</div>
          <h2 className="an-empty__title">No Interview Data Yet</h2>
          <p className="an-empty__sub">
            Complete your first interview session to see analytics and performance trends here.
          </p>
          <button className="an-empty__btn" onClick={() => navigate("/interview")}>
            Start Your First Interview
          </button>
        </div>
      ) : (
        <>
          {/* ── Score trend chart ── */}
          {chartSessions.length > 0 && (
            <div className="an-chart-card">
              <h2 className="an-chart-card__title">Score Trend</h2>
              <div className="an-chart">
                {chartSessions.map((s, i) => (
                  <div className="an-chart__col" key={s.id}>
                    <div className="an-chart__val" style={{ color: scoreColor(s.score) }}>
                      {s.score}
                    </div>
                    <div className="an-chart__bar-wrap">
                      <div
                        className="an-chart__bar"
                        style={{
                          height: s.score + "%",
                          background: scoreColor(s.score),
                        }}
                        title={`${typeLabel(s.type)} — ${s.score}`}
                      />
                    </div>
                    <div className="an-chart__label">{i + 1}</div>
                  </div>
                ))}
                {/* Y-axis markers */}
                <div className="an-chart__y-axis">
                  {[100, 80, 60, 40, 20].map((v) => (
                    <div key={v} className="an-chart__y-mark" style={{ bottom: v + "%" }}>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="an-chart__legend">Session number (most recent on the right)</div>
            </div>
          )}

          {/* ── Session history table ── */}
          <div className="an-history">
            <h2 className="an-history__title">Session History</h2>
            <div className="an-table">
              <div className="an-table__head">
                <div className="an-table__cell">#</div>
                <div className="an-table__cell">Date</div>
                <div className="an-table__cell">Type</div>
                <div className="an-table__cell">Score</div>
                <div className="an-table__cell">Grade</div>
                <div className="an-table__cell">Duration</div>
                <div className="an-table__cell">Performance</div>
              </div>
              {sessions.map((s, idx) => (
                <div className="an-table__row" key={s.id}>
                  <div className="an-table__cell an-table__cell--muted">{sessions.length - idx}</div>
                  <div className="an-table__cell">{formatDate(s.date)}</div>
                  <div className="an-table__cell">
                    <span className={`badge ${typeBadge(s.type)}`}>{typeLabel(s.type)}</span>
                  </div>
                  <div className="an-table__cell">
                    <span className="an-score" style={{ color: scoreColor(s.score) }}>{s.score}</span>
                  </div>
                  <div className="an-table__cell">
                    <span className="an-grade" style={{ color: scoreColor(s.score) }}>{gradeOf(s.score)}</span>
                  </div>
                  <div className="an-table__cell an-table__cell--muted">
                    {formatDuration(s.duration)}
                  </div>
                  <div className="an-table__cell">
                    <div className="an-perf-bar">
                      <div
                        className="an-perf-bar__fill"
                        style={{ width: s.score + "%", background: scoreColor(s.score) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
