import { Link } from "react-router-dom";
import "./AuthLayout.css";

const FEATURES = [
  { icon: "🎯", text: "Real-time AI feedback on every answer" },
  { icon: "💻", text: "HR & Technical interview simulations" },
  { icon: "📊", text: "Performance analytics & progress tracking" },
  { icon: "📄", text: "Resume-based personalised questions" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {/* ── Left branding panel ── */}
      <div className="auth-layout__left">
        <Link to="/" className="auth-layout__brand">
          <div className="auth-layout__logo-badge">AI</div>
          <span className="auth-layout__brand-name">InterviewCoach</span>
        </Link>

        <div className="auth-layout__promo">
          <h2>Land your dream job with AI-powered practice</h2>
          <p>
            Join 10,000+ professionals who used AI Interview Coach to prepare
            smarter and get hired faster.
          </p>
          <div className="auth-layout__features">
            {FEATURES.map(({ icon, text }) => (
              <div className="auth-layout__feature" key={text}>
                <div className="auth-layout__feature-icon">{icon}</div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-layout__testimonial">
          <p>
            "I used AI Interview Coach for two weeks before my Google interview.
            The instant feedback on my system design answers was invaluable."
          </p>
          <div className="auth-layout__testimonial-author">
            <div className="auth-layout__testimonial-avatar">SK</div>
            <div>
              <div className="auth-layout__testimonial-name">Sarah Kim</div>
              <div className="auth-layout__testimonial-role">Software Engineer @ Google</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-layout__right">
        <div className="auth-layout__form-wrap">{children}</div>
      </div>
    </div>
  );
}
