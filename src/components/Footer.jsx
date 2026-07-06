import "./Footer.css";

const COLS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Docs", "Community", "Contact", "Status"],
  Legal:   ["Privacy", "Terms", "Cookies"],
};

const SOCIALS = ["X", "in", "GH"];

export default function Footer() {
  return (
    <footer id="contact" className="footer">

      {/* ── Top grid ── */}
      <div className="footer__top">

        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-badge">AI</div>
            <span className="footer__logo-text">InterviewCoach</span>
          </div>
          <p className="footer__tagline">
            Your AI-powered companion for landing your dream job. Practice
            smarter, improve faster, succeed sooner.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <button key={s} className="footer__social-btn" aria-label={s}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(COLS).map(([title, items]) => (
          <div key={title} className="footer__col">
            <h4 className="footer__col-title">{title}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Newsletter ── */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-box">
          <div className="footer__newsletter-copy">
            <h4>Stay in the loop</h4>
            <p>Get interview tips, guides, and product updates delivered to your inbox.</p>
          </div>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="you@example.com"
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>© {new Date().getFullYear()} AI Interview Coach. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
