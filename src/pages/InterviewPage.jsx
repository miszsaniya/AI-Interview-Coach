import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, generateLocalFeedback } from "../data/questions";
import { saveSession } from "../data/store";
import "./Interview.css";

const TOTAL_Q    = 5;
const TOTAL_SECS = 15 * 60; // 15 minutes per session

const fmtTime = (s) => {
  const m   = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

function scoreColor(s) {
  if (s >= 80) return "#16a34a";
  if (s >= 65) return "#d97706";
  return "#ef4444";
}

function scoreBadge(s) {
  if (s >= 80) return "Excellent";
  if (s >= 65) return "Good";
  return "Needs Work";
}

function typeLabel(t) {
  if (t === "hr")        return "HR";
  if (t === "technical") return "Technical";
  return "Mixed";
}

/* ── FeedbackPanel: shown after each answer ─────── */
function FeedbackPanel({ feedback, onNext, isLast }) {
  const { score, strengths, improvements, sampleAnswer, comment } = feedback;
  const color = scoreColor(score);

  return (
    <div className="iv-feedback-panel">
      {/* Score row */}
      <div className="iv-feedback-panel__score-row">
        <div className="iv-feedback-panel__score" style={{ color }}>
          {score}<span>/100</span>
        </div>
        <span className="iv-feedback-panel__badge" style={{ background: color + "18", color }}>
          {scoreBadge(score)}
        </span>
      </div>

      {/* Score bar */}
      <div className="iv-feedback-panel__bar-track">
        <div
          className="iv-feedback-panel__bar-fill"
          style={{ width: score + "%", background: color }}
        />
      </div>

      <p className="iv-feedback-panel__comment">{comment}</p>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="iv-feedback-panel__section">
          <div className="iv-feedback-panel__label iv-feedback-panel__label--good">✓ Strengths</div>
          <ul className="iv-feedback-panel__list">
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {improvements.length > 0 && (
        <div className="iv-feedback-panel__section">
          <div className="iv-feedback-panel__label iv-feedback-panel__label--improve">↑ Improvements</div>
          <ul className="iv-feedback-panel__list iv-feedback-panel__list--improve">
            {improvements.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Sample answer */}
      <div className="iv-feedback-panel__section">
        <div className="iv-feedback-panel__label">💡 Better Sample Answer</div>
        <div className="iv-feedback-panel__sample">{sampleAnswer}</div>
      </div>

      {/* Next button */}
      <button className="iv-feedback-panel__next" onClick={onNext}>
        {isLast ? "See Final Results →" : "Next Question →"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main InterviewPage
───────────────────────────────────────────────────────────── */
export default function InterviewPage() {
  const { type }   = useParams();               // "hr" | "technical" | "mixed"
  const navigate   = useNavigate();
  const textareaRef = useRef(null);
  const startTime   = useRef(Date.now());

  const questions = getQuestions(type).slice(0, TOTAL_Q);

  const [qIndex,    setQIndex]    = useState(0);
  const [answer,    setAnswer]    = useState("");
  const [feedback,  setFeedback]  = useState(null);  // null = answering phase
  const [scores,    setScores]    = useState([]);     // array of scores per question
  const [answers,   setAnswers]   = useState([]);     // stored answers+feedbacks
  const [timeLeft,  setTimeLeft]  = useState(TOTAL_SECS);
  const [skipped,   setSkipped]   = useState(0);

  /* ── Timer ── */
  useEffect(() => {
    const id = setInterval(() =>
      setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Focus textarea when in answer phase ── */
  useEffect(() => {
    if (!feedback) textareaRef.current?.focus();
  }, [feedback, qIndex]);

  const currentQ    = questions[qIndex];
  const isLastQ     = qIndex === TOTAL_Q - 1;
  const progress    = ((qIndex + (feedback ? 1 : 0)) / TOTAL_Q) * 100;
  const timerWarn   = timeLeft < 120;

  /* ── Submit answer ── */
  const handleSubmit = useCallback(() => {
    if (!answer.trim() && !feedback) return;
    const fb = generateLocalFeedback(currentQ, answer);
    setFeedback(fb);
    const newScores  = [...scores, fb.score];
    const newAnswers = [...answers, { question: currentQ.question, answer, feedback: fb }];
    setScores(newScores);
    setAnswers(newAnswers);
  }, [answer, currentQ, scores, answers, feedback]);

  /* ── Skip question ── */
  const handleSkip = useCallback(() => {
    const fb = generateLocalFeedback(currentQ, "");
    setFeedback(fb);
    setSkipped((s) => s + 1);
    const newScores  = [...scores, fb.score];
    const newAnswers = [...answers, { question: currentQ.question, answer: "(Skipped)", feedback: fb }];
    setScores(newScores);
    setAnswers(newAnswers);
  }, [currentQ, scores, answers]);

  /* ── Next question / finish ── */
  const handleNext = useCallback(() => {
    if (isLastQ) {
      /* Save session */
      const durationSecs = Math.round((Date.now() - startTime.current) / 1000);
      const avgScore     = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      saveSession({ type, score: avgScore, answers, durationSecs });
      navigate("/results", { state: { type, scores, answers, durationSecs } });
    } else {
      setQIndex((i) => i + 1);
      setAnswer("");
      setFeedback(null);
    }
  }, [isLastQ, scores, answers, type, navigate]);

  /* Ctrl+Enter submits */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!feedback) handleSubmit();
    }
  };

  return (
    <div className="iv-page">
      {/* ── Top bar ── */}
      <div className="iv-topbar">
        <div className="iv-topbar__left">
          <div className="iv-topbar__type-badge">
            {typeLabel(type)} Interview
          </div>
          <div className="iv-topbar__qnum">
            Question {qIndex + 1} <span>/ {TOTAL_Q}</span>
          </div>
        </div>
        <div className="iv-topbar__right">
          <div className={`iv-topbar__timer ${timerWarn ? "iv-topbar__timer--warn" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {fmtTime(timeLeft)}
          </div>
          <button className="iv-topbar__exit" onClick={() => navigate("/interview")}>
            ✕ Exit
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="iv-progress-track">
        <div className="iv-progress-fill" style={{ width: progress + "%" }} />
      </div>

      {/* ── Step dots ── */}
      <div className="iv-steps">
        {Array.from({ length: TOTAL_Q }, (_, i) => {
          const state = scores[i] !== undefined ? "done" : i === qIndex ? "active" : "pending";
          return (
            <div className="iv-step" key={i}>
              {i > 0 && <div className={`iv-step__line ${scores[i - 1] !== undefined ? "done" : ""}`} />}
              <div className={`iv-step__dot iv-step__dot--${state}`} title={`Q${i + 1}`}>
                {scores[i] !== undefined ? "✓" : i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Question card ── */}
      <div className="iv-question-card">
        <div className="iv-question-card__header">
          <span className="iv-question-card__label">Question {qIndex + 1}</span>
          <span className="iv-question-card__type">{currentQ.type}</span>
        </div>
        <div className="iv-question-card__text">{currentQ.question}</div>
        {currentQ.hint && (
          <HintToggle hint={currentQ.hint} />
        )}
      </div>

      {/* ── Answer area OR Feedback panel ── */}
      {feedback ? (
        <FeedbackPanel
          feedback={feedback}
          onNext={handleNext}
          isLast={isLastQ}
        />
      ) : (
        <div className="iv-answer-area">
          <label className="iv-answer-area__label">
            Your Answer
            <span className="iv-answer-area__hint">Press Ctrl+Enter to submit</span>
          </label>
          <textarea
            ref={textareaRef}
            className="iv-answer-area__textarea"
            placeholder="Type your answer here... Be specific and use examples where possible."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={7}
          />
          <div className="iv-answer-area__meta">
            <span className="iv-answer-area__wordcount">
              {answer.trim() ? answer.trim().split(/\s+/).length : 0} words
            </span>
          </div>

          <div className="iv-answer-area__actions">
            <button
              className="iv-btn iv-btn--skip"
              onClick={handleSkip}
            >
              Skip
            </button>
            {qIndex > 0 && (
              <button
                className="iv-btn iv-btn--prev"
                onClick={() => { setQIndex((i) => Math.max(0, i - 1)); setAnswer(""); setFeedback(null); }}
              >
                ← Previous
              </button>
            )}
            <button
              className="iv-btn iv-btn--submit"
              onClick={handleSubmit}
              disabled={!answer.trim()}
            >
              Submit Answer →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HintToggle({ hint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="iv-hint">
      <button className="iv-hint__btn" onClick={() => setOpen((v) => !v)}>
        💡 {open ? "Hide hint" : "Show hint"}
      </button>
      {open && <div className="iv-hint__text">{hint}</div>}
    </div>
  );
}
