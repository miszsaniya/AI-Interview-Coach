import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadSessions } from "../data/store";
import "./Results.css";

/* ── Helpers ── */
function gradeOf(s) {
  if (s >= 90) return { letter: "A+", color: "#16a34a", label: "Exceptional" };
  if (s >= 80) return { letter: "A",  color: "#16a34a", label: "Excellent"   };
  if (s >= 70) return { letter: "B",  color: "#d97706", label: "Good"        };
  if (s >= 60) return { letter: "C",  color: "#d97706", label: "Average"     };
  return         { letter: "D",  color: "#ef4444", label: "Needs Work"   };
}

function scoreColor(s) {
  if (s >= 80) return "#16a34a";
  if (s >= 65) return "#d97706";
  return "#ef4444";
}

function typeLabel(t) {
  if (t === "hr")        return "HR";
  if (t === "technical") return "Technical";
  return "Mixed";
}

/* ── Radar chart (pure SVG) ── */
function radarPoint(angle, pct, cx, cy, radius) {
  const r   = (pct / 100) * radius;
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function RadarChart({ axes, cx = 100, cy = 100, radius = 75 }) {
  const n    = axes.length;
  const step = 360 / n;
  const rings = [20, 40, 60, 80, 100];

  const ringPoly = (pct) =>
    axes.map((_, i) => radarPoint(i * step, pct, cx, cy, radius))
        .map(({ x, y }) => `${x},${y}`).join(" ");

  const dataPoly = axes
    .map((ax, i) => radarPoint(i * step, ax.value, cx, cy, radius))
    .map(({ x, y }) => `${x},${y}`).join(" ");

  const axisLines = axes.map((ax, i) => ({
    ...ax,
    tip:   radarPoint(i * step, 100, cx, cy, radius),
    label: radarPoint(i * step, 118, cx, cy, radius),
  }));

  return (
    <div className="rd-radar-wrap">
      <svg className="rd-radar-svg" width="200" height="200" viewBox="0 0 200 200" aria-label="Skill radar chart">
        {rings.map((pct) => (
          <polygon key={pct} points={ringPoly(pct)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {axisLines.map(({ tip }, i) => (
          <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#e5e7eb" strokeWidth="1" />
        ))}
        <polygon points={dataPoly} fill="rgba(37,99,235,.15)" stroke="rgba(37,99,235,.7)" strokeWidth="2" strokeLinejoin="round" />
        {axes.map((ax, i) => {
          const { x, y } = radarPoint(i * step, ax.value, cx, cy, radius);
          return <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" stroke="white" strokeWidth="1.5" />;
        })}
        {axisLines.map(({ label: lbl, tip: _t, label }, i) => (
          <text key={i} x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="#6b7280" fontWeight="600">
            {axes[i].label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ── Answer accordion item ── */
function AnswerItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  const color = scoreColor(item.feedback?.score ?? 0);

  return (
    <div className="rd-answer-item">
      <div className="rd-answer-item__header" onClick={() => setOpen((v) => !v)}>
        <div className="rd-answer-item__num">Q{idx + 1}</div>
        <div className="rd-answer-item__q">{item.question}</div>
        <div className="rd-answer-item__score" style={{ color }}>
          {item.feedback?.score ?? "—"}
        </div>
        <div className="rd-answer-item__chevron">{open ? "▲" : "▼"}</div>
      </div>
      {open && (
        <div className="rd-answer-item__body">
          <div className="rd-answer-item__your-answer">
            <div className="rd-answer-item__label">Your Answer</div>
            <div className="rd-answer-item__text">{item.answer || "(Skipped)"}</div>
          </div>
          {item.feedback && (
            <>
              <div className="rd-answer-item__feedback-text">{item.feedback.comment}</div>
              {item.feedback.strengths?.length > 0 && (
                <div className="rd-answer-item__chips rd-answer-item__chips--good">
                  {item.feedback.strengths.map((s, i) => (
                    <span key={i} className="rd-chip rd-chip--good">✓ {s}</span>
                  ))}
                </div>
              )}
              {item.feedback.improvements?.length > 0 && (
                <div className="rd-answer-item__chips rd-answer-item__chips--improve">
                  {item.feedback.improvements.map((s, i) => (
                    <span key={i} className="rd-chip rd-chip--improve">↑ {s}</span>
                  ))}
                </div>
              )}
              <div className="rd-answer-item__sample">
                <strong>Sample Answer:</strong> {item.feedback.sampleAnswer}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Main Results Page
════════════════════════════════════════════════════════ */
export default function ResultsPage() {
  const navigate  = useNavigate();
  const { state } = useLocation();

  /* If accessed directly (no state), pull last session from store */
  const sessions = loadSessions();
  const lastSession = sessions[0];

  const type    = state?.type    ?? lastSession?.type    ?? "mixed";
  const scores  = state?.scores  ?? lastSession?.answers?.map((a) => a.feedback?.score ?? 50) ?? [];
  const answers = state?.answers ?? lastSession?.answers ?? [];

  if (answers.length === 0) {
    return (
      <div className="rd-empty">
        <div className="rd-empty__icon">📊</div>
        <h2>No Results Yet</h2>
        <p>Complete an interview to see your results here.</p>
        <button className="rd-btn rd-btn--primary" onClick={() => navigate("/interview")}>
          Start Interview
        </button>
      </div>
    );
  }

  const overall    = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const grade      = gradeOf(overall);
  const commScore  = Math.min(100, Math.round(overall * 0.95));
  const confScore  = Math.min(100, Math.round(overall * 0.88));
  const probScore  = Math.min(100, Math.round(overall * 0.90));

  const allStrengths    = [...new Set(answers.flatMap((a) => a.feedback?.strengths ?? []))];
  const allImprovements = [...new Set(answers.flatMap((a) => a.feedback?.improvements ?? []))];

  const RADAR_AXES = [
    { label: "Technical",   value: Math.min(100, Math.round(overall * 0.92)) },
    { label: "Communication", value: commScore },
    { label: "Confidence",  value: confScore },
    { label: "HR / Soft",   value: Math.min(100, Math.round(overall * 0.87)) },
    { label: "Problem Solving", value: probScore },
  ];

  const SCORE_CARDS = [
    { label: "Overall Score",       value: overall,   color: "#2563eb",  icon: "🎯" },
    { label: "Communication",       value: commScore, color: "#10b981",  icon: "🗣️" },
    { label: "Confidence",          value: confScore, color: "#8b5cf6",  icon: "💪" },
    { label: "Problem Solving",     value: probScore, color: "#f59e0b",  icon: "🧠" },
  ];

  return (
    <div className="rd-page">
      {/* ── Hero ── */}
      <div className="rd-hero">
        <div className="rd-hero__left">
          <div className="rd-hero__type">{typeLabel(type)} Interview Results</div>
          <h1 className="rd-hero__score" style={{ color: grade.color }}>
            {overall}<span>/100</span>
          </h1>
          <div className="rd-hero__grade" style={{ background: grade.color + "18", color: grade.color }}>
            Grade {grade.letter} · {grade.label}
          </div>
          <p className="rd-hero__sub">
            {overall >= 80
              ? "Outstanding performance! You are well-prepared for real interviews."
              : overall >= 65
              ? "Good effort! With a bit more practice you will be interview-ready."
              : "Keep practising! Review the feedback below to improve your answers."}
          </p>
          <div className="rd-hero__actions">
            <button className="rd-btn rd-btn--primary" onClick={() => navigate("/interview")}>
              🔄 Retake Interview
            </button>
            <button className="rd-btn rd-btn--secondary" onClick={() => navigate("/dashboard")}>
              ← Go to Dashboard
            </button>
          </div>
        </div>
        <div className="rd-hero__right">
          <RadarChart axes={RADAR_AXES} />
        </div>
      </div>

      {/* ── Score cards ── */}
      <div className="rd-score-cards">
        {SCORE_CARDS.map(({ label, value, color, icon }) => (
          <div className="rd-score-card" key={label}>
            <div className="rd-score-card__icon" style={{ background: color + "18" }}>{icon}</div>
            <div className="rd-score-card__val" style={{ color }}>{value}</div>
            <div className="rd-score-card__label">{label}</div>
            <div className="rd-score-card__bar">
              <div className="rd-score-card__fill" style={{ width: value + "%", background: color }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Strengths & Improvements ── */}
      <div className="rd-si-grid">
        <div className="rd-si-card rd-si-card--strengths">
          <h3>✓ Strengths</h3>
          {allStrengths.length > 0 ? (
            <ul>{allStrengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
          ) : (
            <p className="rd-si-card__empty">Complete more answers for detailed feedback.</p>
          )}
        </div>
        <div className="rd-si-card rd-si-card--improvements">
          <h3>↑ Areas to Improve</h3>
          {allImprovements.length > 0 ? (
            <ul>{allImprovements.map((s, i) => <li key={i}>{s}</li>)}</ul>
          ) : (
            <p className="rd-si-card__empty">Great job! No major improvements noted.</p>
          )}
        </div>
      </div>

      {/* ── Per-question breakdown ── */}
      <div className="rd-section">
        <h2 className="rd-section__title">Question Breakdown</h2>
        <div className="rd-answers">
          {answers.map((item, idx) => (
            <AnswerItem key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* ── Suggestions ── */}
      <div className="rd-suggestions">
        <h2 className="rd-suggestions__title">💡 Suggestions for Next Session</h2>
        <div className="rd-suggestions__list">
          <div className="rd-suggestion-item">
            <div className="rd-suggestion-item__icon">📚</div>
            <div>
              <div className="rd-suggestion-item__title">Use the STAR method</div>
              <div className="rd-suggestion-item__sub">Structure answers with Situation, Task, Action, Result for behavioural questions.</div>
            </div>
          </div>
          <div className="rd-suggestion-item">
            <div className="rd-suggestion-item__icon">📊</div>
            <div>
              <div className="rd-suggestion-item__title">Quantify your achievements</div>
              <div className="rd-suggestion-item__sub">Use numbers and metrics to make your answers more impactful and memorable.</div>
            </div>
          </div>
          <div className="rd-suggestion-item">
            <div className="rd-suggestion-item__icon">🎯</div>
            <div>
              <div className="rd-suggestion-item__title">Expand your answers</div>
              <div className="rd-suggestion-item__sub">Aim for at least 80–120 words per answer. Provide context, action, and outcome.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom actions ── */}
      <div className="rd-bottom-actions">
        <button className="rd-btn rd-btn--primary" onClick={() => navigate("/interview")}>
          🔄 Retake Interview
        </button>
        <button className="rd-btn rd-btn--secondary" onClick={() => navigate("/analytics")}>
          📈 View Analytics
        </button>
        <button className="rd-btn rd-btn--ghost" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </div>
    </div>
  );
}
