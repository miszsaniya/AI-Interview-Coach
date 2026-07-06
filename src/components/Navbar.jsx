import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "Features", href: "#features" },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          {/* ── Logo ── */}
          <a href="#home" className="navbar__logo">
            <div className="navbar__logo-badge">AI</div>
            <span className="navbar__logo-text">
              Interview<span>Coach</span>
            </span>
          </a>

          {/* ── Desktop links ── */}
          <nav>
            <ul className="navbar__links">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="navbar__actions">
            <button className="btn-ghost" onClick={() => navigate("/login")}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate("/signup")}>Get Started</button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className={`navbar__hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown ── */}
      {open && (
        <nav className="navbar__mobile">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="btn-primary"
            style={{ marginTop: 8, width:"100%", padding:"11px 0", textAlign:"center", borderRadius:"var(--radius-md)", fontSize:14 }}
            onClick={() => { setOpen(false); navigate("/signup"); }}
          >
            Get Started
          </button>
        </nav>
      )}
    </>
  );
}
