/* ════════════════════════════════════════════════════
   LOCAL QUESTION BANK — no API required
════════════════════════════════════════════════════ */

export const HR_QUESTIONS = [
  {
    id: "hr1",
    type: "HR",
    question: "Tell me about yourself and your professional background.",
    hint: "Structure: current role → past highlights → why this opportunity. Keep it under 2 minutes.",
    sampleAnswer:
      "I am a software engineer with 3 years of experience building scalable web applications. I started my career at a fintech startup where I led front-end development, then moved to a product company focusing on full-stack work. I'm passionate about clean code and user-centred design, which is why this role excites me.",
    keywords: ["experience", "background", "skills", "role", "career"],
  },
  {
    id: "hr2",
    type: "HR",
    question: "Describe a time you faced a significant challenge at work and how you handled it.",
    hint: "Use STAR: Situation, Task, Action, Result. Quantify the outcome wherever possible.",
    sampleAnswer:
      "During a product launch, our lead developer left unexpectedly two weeks before the deadline. I stepped up, redistributed tasks, worked overtime, and coordinated daily standups. We delivered on time and the product received positive user feedback. The experience taught me the value of clear communication under pressure.",
    keywords: ["challenge", "problem", "solution", "result", "team", "overcome"],
  },
  {
    id: "hr3",
    type: "HR",
    question: "Where do you see yourself in five years?",
    hint: "Show ambition aligned with the company's growth. Be specific about the role or impact you're targeting.",
    sampleAnswer:
      "In five years I see myself in a senior engineering or tech lead role, mentoring junior developers and driving architectural decisions. I want to deepen my expertise in distributed systems while growing leadership skills — this role is a perfect stepping stone toward that goal.",
    keywords: ["goal", "growth", "future", "leadership", "ambition"],
  },
  {
    id: "hr4",
    type: "HR",
    question: "How do you handle disagreements with teammates or your manager?",
    hint: "Emphasise empathy, active listening, and constructive resolution. Avoid blaming others.",
    sampleAnswer:
      "I try to understand the other person's perspective first by listening carefully. Then I present my view with data and reasoning rather than emotions. If we still disagree, I suggest involving a third party or trying a small experiment to test both approaches. I believe respectful debate leads to better outcomes.",
    keywords: ["conflict", "communication", "listen", "resolve", "respectful", "disagree"],
  },
  {
    id: "hr5",
    type: "HR",
    question: "What is your greatest professional strength and how have you applied it?",
    hint: "Pick one genuine strength, give a concrete example, and link it to the job requirements.",
    sampleAnswer:
      "My greatest strength is breaking down complex problems into manageable steps. When tasked with migrating a legacy monolith to microservices, I created a phased plan, identified dependencies, and delivered it with zero downtime. This systematic thinking consistently helps my team avoid bottlenecks.",
    keywords: ["strength", "strength", "skill", "example", "apply", "result"],
  },
];

export const TECHNICAL_QUESTIONS = [
  {
    id: "tech1",
    type: "Technical",
    question: "Explain the difference between a stack and a queue. Give a real-world use case for each.",
    hint: "Cover LIFO vs FIFO. Think undo/redo (stack) and print queues or BFS (queue).",
    sampleAnswer:
      "A stack follows Last-In-First-Out (LIFO) — the last element pushed is the first popped, like a pile of plates. Use case: browser back-navigation, undo operations. A queue follows First-In-First-Out (FIFO) — the first element enqueued is the first dequeued. Use case: task scheduling, BFS graph traversal, print spoolers.",
    keywords: ["stack", "queue", "LIFO", "FIFO", "use case", "data structure"],
  },
  {
    id: "tech2",
    type: "Technical",
    question: "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
    hint: "Cover schema, ACID, scalability. Mention CAP theorem briefly.",
    sampleAnswer:
      "SQL databases are relational, schema-based, and ACID-compliant — ideal for structured data with complex queries (e.g. banking). NoSQL databases are flexible, schema-less, and designed for horizontal scaling — ideal for unstructured or semi-structured data, high write throughput, or rapid iteration (e.g. social media feeds). Choose SQL for consistency, NoSQL for scalability and flexibility.",
    keywords: ["SQL", "NoSQL", "relational", "schema", "ACID", "scalability"],
  },
  {
    id: "tech3",
    type: "Technical",
    question: "How does the JavaScript event loop work? Explain the call stack, task queue, and microtask queue.",
    hint: "Walk through a concrete setTimeout vs Promise example to illustrate execution order.",
    sampleAnswer:
      "JavaScript is single-threaded. The event loop continuously checks the call stack; if empty, it processes the microtask queue (Promises, queueMicrotask) first, then the macrotask queue (setTimeout, setInterval). Example: setTimeout(fn, 0) runs after all Promises resolve because microtasks have higher priority. This design allows non-blocking I/O without multiple threads.",
    keywords: ["event loop", "call stack", "microtask", "macrotask", "Promise", "setTimeout"],
  },
  {
    id: "tech4",
    type: "Technical",
    question: "Describe the SOLID principles and give an example of one in practice.",
    hint: "Name all five, then deep-dive on one with a code-level example.",
    sampleAnswer:
      "SOLID: Single Responsibility — a class does one thing; Open/Closed — open for extension, closed for modification; Liskov Substitution — subclasses should be replaceable for their base class; Interface Segregation — prefer small interfaces; Dependency Inversion — depend on abstractions. Example of SRP: instead of a UserService that sends emails AND manages accounts, split into UserService and EmailService.",
    keywords: ["SOLID", "single responsibility", "open closed", "abstraction", "interface"],
  },
  {
    id: "tech5",
    type: "Technical",
    question: "How would you design a URL shortening service like bit.ly at scale?",
    hint: "Cover: hashing, DB choice, caching, load balancing, rate limiting. Mention CAP tradeoffs.",
    sampleAnswer:
      "I would use a base-62 encoding on an auto-increment ID to generate short codes. Store mappings in a relational DB with an index on the short code. Add a Redis cache layer to serve hot links with sub-millisecond latency. Use a CDN for redirect endpoints and a load balancer for horizontally scaled app servers. Rate-limit writes to prevent abuse and use consistent hashing for cache partitioning at scale.",
    keywords: ["URL shortener", "hashing", "cache", "Redis", "load balancer", "scale"],
  },
];

export const MIXED_QUESTIONS = [
  {
    id: "mix1",
    type: "Mixed",
    question: "Tell me about a technical project you are most proud of and explain the architecture.",
    hint: "Combine storytelling (HR) with technical depth. Mention stack choices, challenges, and results.",
    sampleAnswer:
      "I built a real-time collaborative document editor using React, WebSockets, and a Node.js/Redis backend. The challenge was handling concurrent edits using operational transformation. I chose Redis pub/sub for broadcasting changes and PostgreSQL for persisting document state. The result was a product handling 500 concurrent users with sub-100ms sync latency — and zero data loss.",
    keywords: ["project", "architecture", "stack", "technical", "challenge", "result"],
  },
  {
    id: "mix2",
    type: "Mixed",
    question: "How do you prioritise tasks when you have multiple deadlines and limited resources?",
    hint: "Show both analytical thinking (prioritisation frameworks) and soft skills (communication).",
    sampleAnswer:
      "I use an impact-vs-effort matrix: first tackle high-impact, low-effort tasks, then schedule high-effort critical work. I communicate blockers early and re-negotiate deadlines proactively rather than silently missing them. In a recent sprint where two features clashed, I aligned with the PM, cut scope on one feature to a MVP, and delivered both on time.",
    keywords: ["prioritise", "deadline", "matrix", "communication", "scope", "deliver"],
  },
  {
    id: "mix3",
    type: "Mixed",
    question: "Explain REST vs GraphQL and describe a situation where you chose one over the other.",
    hint: "Cover over-fetching, under-fetching, versioning. Tie to a real project decision.",
    sampleAnswer:
      "REST uses fixed endpoints and can lead to over-fetching or under-fetching. GraphQL lets clients request exactly what they need in one call, reducing round trips. I chose GraphQL for a dashboard with 15 different widget types — each needed different data fields. REST would have required 15 endpoints or a bloated response; GraphQL let the front-end own the data shape without backend changes.",
    keywords: ["REST", "GraphQL", "over-fetching", "endpoint", "query", "frontend"],
  },
  {
    id: "mix4",
    type: "Mixed",
    question: "Describe a time you improved the performance of an existing system. What metrics did you use?",
    hint: "Quantify before/after. Mention profiling tools, specific optimisations, and team collaboration.",
    sampleAnswer:
      "I identified that our API's p95 latency was 1.8s — unacceptable for mobile users. I profiled with New Relic, found N+1 DB queries in a loop, replaced them with a single JOIN, and added a Redis cache for repeated lookups. p95 dropped to 180ms — a 10× improvement. I shared the approach in a post-mortem so the team could apply similar patterns elsewhere.",
    keywords: ["performance", "latency", "optimise", "metrics", "cache", "profiling"],
  },
  {
    id: "mix5",
    type: "Mixed",
    question: "How do you ensure code quality in a team environment?",
    hint: "Cover code reviews, testing, CI/CD, documentation, and team culture.",
    sampleAnswer:
      "I advocate for mandatory code reviews with constructive, not critical, comments. We maintain >80% unit test coverage enforced by CI gates. I introduced ESLint and Prettier for style consistency so reviews focus on logic, not formatting. We also hold bi-weekly architecture discussions to align on patterns. Quality is a team culture, not a single person's responsibility.",
    keywords: ["code review", "testing", "CI/CD", "quality", "coverage", "culture"],
  },
];

/* ── Selector by interview type ── */
export function getQuestions(type) {
  if (type === "hr")      return HR_QUESTIONS;
  if (type === "technical") return TECHNICAL_QUESTIONS;
  return MIXED_QUESTIONS;
}

/* ── Local feedback generator (no API) ── */
export function generateLocalFeedback(question, answer) {
  if (!answer || answer.trim().length < 10) {
    return {
      score: 20,
      strengths: [],
      improvements: ["Answer was too short or empty.", "Provide a detailed, structured response."],
      sampleAnswer: question.sampleAnswer,
      comment: "No meaningful answer detected. Please elaborate.",
    };
  }

  const lower   = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).length;
  const keywords  = question.keywords || [];
  const matched   = keywords.filter((k) => lower.includes(k.toLowerCase()));
  const keyScore  = Math.round((matched.length / Math.max(keywords.length, 1)) * 40);
  const lenScore  = Math.min(30, Math.round((wordCount / 150) * 30));
  const baseScore = 30;
  const total     = Math.min(100, baseScore + keyScore + lenScore);

  const strengths = [];
  const improvements = [];

  if (wordCount >= 60)   strengths.push("Well-developed answer with sufficient detail.");
  if (wordCount < 40)    improvements.push("Expand your answer — aim for at least 60 words.");
  if (matched.length >= 3) strengths.push("Good use of relevant terminology and concepts.");
  if (matched.length < 2)  improvements.push("Include more domain-specific keywords in your response.");
  if (lower.includes("example") || lower.includes("for instance") || lower.includes("such as"))
    strengths.push("Used concrete examples to support your answer.");
  else
    improvements.push("Add a specific example or real-world scenario to strengthen your point.");
  if (lower.includes("result") || lower.includes("outcome") || lower.includes("achieved") || lower.includes("improved"))
    strengths.push("Highlighted outcomes or results — great practice.");
  else
    improvements.push("Mention the result or impact of your action.");

  if (strengths.length === 0) strengths.push("Attempted to address the question.");

  const comment =
    total >= 80 ? "Excellent answer — well structured and insightful."
    : total >= 60 ? "Good answer with room for more depth and examples."
    : total >= 40 ? "Adequate response — needs more specificity and detail."
    : "Answer needs significant improvement in content and structure.";

  return { score: total, strengths, improvements, sampleAnswer: question.sampleAnswer, comment };
}
