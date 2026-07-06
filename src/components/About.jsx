import "./About.css";

const STATS = [
  { value: "10K+", label: "Users Coached"     },
  { value: "95%",  label: "Satisfaction Rate"  },
  { value: "300+", label: "Questions in Bank"  },
  { value: "24/7", label: "Always Available"   },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">

        {/* ── Text column ── */}
        <div className="about__text">
          <div className="section-label">About</div>
          <h2 className="section-title" style={{ marginTop: "12px" }}>
            Built to make interview prep smarter & faster
          </h2>
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            AI Interview Coach combines state-of-the-art large language models
            with real industry expertise to simulate authentic interview
            environments. Whether you're a fresh graduate or a seasoned
            professional, our platform adapts to your role, skill level, and
            target company.
          </p>
          <p className="section-subtitle" style={{ marginTop: "12px" }}>
            Stop practising alone — work with an AI that listens, judges
            fairly, and guides you to continuous improvement session after
            session.
          </p>
          <a href="#features" className="about__cta">
            Explore Features
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* ── Stats grid ── */}
        <div className="about__stats">
          {STATS.map(({ value, label }) => (
            <div className="about__stat" key={label}>
              <div className="about__stat-value">{value}</div>
              <div className="about__stat-label">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
