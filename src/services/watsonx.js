/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IBM watsonx AI  —  Interview Coach Service
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  HOW TO WIRE UP THE REAL watsonx API
 *  ─────────────────────────────────────
 *  1. Install the SDK (optional — REST calls work too):
 *       npm install @ibm-cloud/watsonx-ai
 *
 *  2. Set the following environment variables in a .env file at the project root:
 *       VITE_WATSONX_API_KEY=<your IAM API key>
 *       VITE_WATSONX_PROJECT_ID=<your watsonx project ID>
 *       VITE_WATSONX_URL=https://us-south.ml.cloud.ibm.com
 *       VITE_WATSONX_MODEL_ID=ibm/granite-13b-chat-v2
 *
 *  3. Replace the three placeholder functions below with real fetch() calls.
 *     Example for generateFeedback():
 *
 *       const res = await fetch(
 *         `${import.meta.env.VITE_WATSONX_URL}/ml/v1/text/generation?version=2023-05-29`,
 *         {
 *           method: "POST",
 *           headers: {
 *             "Content-Type": "application/json",
 *             Authorization: `Bearer ${await getIAMToken()}`,
 *           },
 *           body: JSON.stringify({
 *             model_id: import.meta.env.VITE_WATSONX_MODEL_ID,
 *             project_id: import.meta.env.VITE_WATSONX_PROJECT_ID,
 *             input: buildFeedbackPrompt(question, answer),
 *             parameters: { decoding_method: "greedy", max_new_tokens: 300 },
 *           }),
 *         }
 *       );
 *       const data = await res.json();
 *       return data.results[0].generated_text;
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Watsonx configuration (read from .env) ── */
export const WATSONX_CONFIG = {
  apiKey:    import.meta.env.VITE_WATSONX_API_KEY    ?? "",
  projectId: import.meta.env.VITE_WATSONX_PROJECT_ID ?? "",
  url:       import.meta.env.VITE_WATSONX_URL        ?? "https://us-south.ml.cloud.ibm.com",
  modelId:   import.meta.env.VITE_WATSONX_MODEL_ID   ?? "ibm/granite-13b-chat-v2",
};

/* ── Interview question bank ── */
export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    type: "HR",
    text: "Tell me about yourself and why you are applying for this role.",
    hint: "Structure: current role → past highlights → why this company. Aim for under 90 seconds.",
  },
  {
    id: 2,
    type: "HR",
    text: "Describe a time you faced a significant challenge at work. How did you handle it?",
    hint: "Use the STAR method — Situation, Task, Action, Result. Quantify the outcome.",
  },
  {
    id: 3,
    type: "Technical",
    text: "Explain the difference between a stack and a queue with real-world use cases.",
    hint: "Cover LIFO vs FIFO. Think: undo/redo history (stack), print queue / BFS (queue).",
  },
  {
    id: 4,
    type: "Technical",
    text: "How would you design a URL shortening service like bit.ly at scale?",
    hint: "Cover hashing, database choice, caching layer, load balancing, rate limiting.",
  },
  {
    id: 5,
    type: "HR",
    text: "Where do you see yourself in 5 years, and how does this role fit that vision?",
    hint: "Show genuine ambition aligned with the company roadmap. Be specific about the area of growth.",
  },
];

/* ── Prompt builders ─────────────────────────────────────────────────────── */

/**
 * Build the system prompt used for watsonx text generation.
 * @param {"HR"|"Technical"} type - The interview type for this question.
 * @returns {string}
 */
export function buildSystemPrompt(type) {
  return `You are an expert ${type} interviewer at a top technology company.
Your role is to assess candidates fairly, provide concise and constructive feedback,
and encourage improvement. Keep feedback to 3-4 sentences maximum.`;
}

/**
 * Build the prompt sent to watsonx to generate AI feedback on a candidate's answer.
 * @param {{ id: number, type: string, text: string }} question
 * @param {string} answer - The candidate's typed answer.
 * @returns {string}
 */
export function buildFeedbackPrompt(question, answer) {
  return `${buildSystemPrompt(question.type)}

Interview Question: "${question.text}"

Candidate's Answer: "${answer}"

Provide structured feedback in this exact format:
SCORE: [number 0-100]
SUMMARY: [one sentence overall assessment]
STRENGTHS: [comma-separated list of 2-3 things done well]
IMPROVEMENTS: [comma-separated list of 1-2 specific areas to improve]
COACHING TIP: [one actionable sentence the candidate can apply immediately]`;
}

/* ── Response parser ─────────────────────────────────────────────────────── */

/**
 * Parse the structured text returned by watsonx into a typed object.
 * Tolerates minor formatting differences from the model.
 * @param {string} raw - Raw model output text.
 * @returns {{ score: number, summary: string, strengths: string[], improvements: string[], tip: string }}
 */
export function parseFeedbackResponse(raw) {
  const get = (key) => {
    const match = raw.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, "si"));
    return match ? match[1].trim() : "";
  };

  const scoreStr = get("SCORE");
  const score = parseInt(scoreStr, 10);

  return {
    score:        isNaN(score) ? 75 : Math.min(100, Math.max(0, score)),
    summary:      get("SUMMARY")      || "Good attempt overall.",
    strengths:    get("STRENGTHS").split(",").map((s) => s.trim()).filter(Boolean),
    improvements: get("IMPROVEMENTS").split(",").map((s) => s.trim()).filter(Boolean),
    tip:          get("COACHING TIP") || "Keep practising and focus on quantifying your results.",
  };
}

/* ── Main API functions ──────────────────────────────────────────────────── */

/**
 * Generate AI feedback for a candidate answer.
 *
 * PLACEHOLDER — replace the setTimeout block with a real watsonx REST call.
 * See the HOW TO WIRE UP section at the top of this file.
 *
 * @param {{ id: number, type: string, text: string }} question
 * @param {string} answer
 * @returns {Promise<{ score: number, summary: string, strengths: string[], improvements: string[], tip: string }>}
 */
export async function generateFeedback(question, answer) {
  /* ── PLACEHOLDER: remove this block and replace with real API call ── */
  await new Promise((r) => setTimeout(r, 1600));

  const MOCK_RESPONSES = {
    1: { score: 82, summary: "Strong introduction that linked your background clearly to the role.", strengths: ["Clear narrative structure", "Mentioned specific skills"], improvements: ["Add a quantified achievement"], tip: "Close by naming one specific value you will bring in your first 90 days." },
    2: { score: 74, summary: "Good use of the STAR framework with a clear action plan described.", strengths: ["Showed ownership", "Structured logically"], improvements: ["Outcome lacked metrics", "Situation setup was too long"], tip: "Always end with a measurable result — e.g. 'reduced churn by 18%'." },
    3: { score: 88, summary: "Accurate definitions with excellent real-world examples cited.", strengths: ["Correct LIFO/FIFO explanation", "Relevant use cases", "Concise delivery"], improvements: ["Could mention time complexity"], tip: "Stating O(1) push/pop explicitly shows deeper algorithmic awareness." },
    4: { score: 67, summary: "You covered the core hashing idea but missed critical scalability concerns.", strengths: ["Mentioned caching", "Considered collisions"], improvements: ["No DB sharding strategy", "Rate limiting not discussed"], tip: "Draw the full data flow — client → load balancer → app → cache → DB — before diving into components." },
    5: { score: 79, summary: "Showed genuine ambition well aligned with the company's stated direction.", strengths: ["Company research evident", "Realistic timeline"], improvements: ["Be more specific about target role"], tip: "Name the exact title you aspire to and a skill you will build in this role to get there." },
  };

  return MOCK_RESPONSES[question.id] ?? {
    score: 75,
    summary: "Reasonable answer that covers the key points.",
    strengths: ["Relevant content", "Clear structure"],
    improvements: ["Add more specific examples"],
    tip: "Always support claims with a concrete example or metric.",
  };
  /* ── END PLACEHOLDER ── */
}

/**
 * Generate a follow-up question or transition message from the AI.
 *
 * PLACEHOLDER — replace with real watsonx call when ready.
 *
 * @param {number} nextQuestionIndex - 0-based index of the next question (or -1 if session ended).
 * @returns {Promise<string>}
 */
export async function generateTransition(nextQuestionIndex) {
  await new Promise((r) => setTimeout(r, 400));
  if (nextQuestionIndex < 0) return "Great work completing the session! I'm compiling your full results now…";
  const bridges = [
    "Thanks for that. Let's move on to the next question.",
    "Good answer. Here's your next challenge.",
    "Appreciated. Let's keep the momentum going.",
    "Got it — next question coming up.",
  ];
  return bridges[nextQuestionIndex % bridges.length];
}
