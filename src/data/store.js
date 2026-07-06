/* ════════════════════════════════════════════════════
   LOCAL STORAGE HELPERS — interview history store
════════════════════════════════════════════════════ */

const KEY = "aic_sessions";

/** Load all stored sessions from localStorage */
export function loadSessions() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save a completed session to localStorage.
 * @param {{ type, score, answers, feedbacks, durationSecs }} session
 */
export function saveSession(session) {
  const sessions = loadSessions();
  sessions.unshift({
    id:       Date.now(),
    date:     new Date().toISOString(),
    type:     session.type,          // "hr" | "technical" | "mixed"
    score:    session.score,         // 0-100
    answers:  session.answers,       // array of { question, answer, feedback }
    duration: session.durationSecs,  // seconds
  });
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

/** Clear all sessions (used in tests / reset) */
export function clearSessions() {
  localStorage.removeItem(KEY);
}

/** Derive aggregate stats from stored sessions */
export function getStats() {
  const sessions = loadSessions();
  if (sessions.length === 0) {
    return {
      sessionsCompleted: 0,
      avgScore: 0,
      questionsAnswered: 0,
      timePracticed: 0, // minutes
    };
  }
  const sessionsCompleted  = sessions.length;
  const avgScore           = Math.round(sessions.reduce((s, x) => s + x.score, 0) / sessions.length);
  const questionsAnswered  = sessions.reduce((s, x) => s + (x.answers?.length || 5), 0);
  const timePracticed      = Math.round(sessions.reduce((s, x) => s + (x.duration || 300), 0) / 60);
  return { sessionsCompleted, avgScore, questionsAnswered, timePracticed };
}
