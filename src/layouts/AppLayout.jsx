import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import "./AppLayout.css";

/* ── Icons ─────────────────────────────────────────── */
const IcoGrid   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const IcoPlay   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IcoUpload = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IcoChart  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/><line x1="2"  y1="20" x2="22" y2="20"/></svg>;
const IcoStar   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoBell   = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IcoMenu   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcoLogout = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

const NAV = [
  { to: "/dashboard",     label: "Dashboard",      Icon: IcoGrid   },
  { to: "/interview",     label: "Start Interview", Icon: IcoPlay   },
  { to: "/resume-upload", label: "Resume Upload",   Icon: IcoUpload },
  { to: "/results",       label: "Results",         Icon: IcoStar   },
  { to: "/analytics",     label: "Analytics",       Icon: IcoChart  },
];

/* ── Page titles map ── */
const PAGE_TITLE = {
  "/dashboard":     "Dashboard",
  "/interview":     "Start Interview",
  "/resume-upload": "Resume Upload",
  "/results":       "Results",
  "/analytics":     "Analytics",
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  // Handle /interview/:type dynamic routes
  const titleKey = currentPath.startsWith("/interview/") ? "/interview/:type" : currentPath;
  const title = PAGE_TITLE[currentPath] || (currentPath.startsWith("/interview/") ? "Interview Session" : "AI Interview Coach");

  const handleLogout = () => navigate("/login");

  return (
    <>
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo-badge">AI</div>
          <span className="sidebar__brand">
            Interview<span>Coach</span>
          </span>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__section-label">Main</div>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar__link-icon"><Icon /></span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__user">
          <Avatar name="Saniya" size="sm" color="blue" />
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">Saniya</div>
            <div className="sidebar__user-role">Free Plan</div>
          </div>
          <button className="sidebar__logout" onClick={handleLogout} title="Log out">
            <IcoLogout />
          </button>
        </div>
      </aside>

      {/* ── Topbar ── */}
      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="topbar__menu-btn"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <IcoMenu />
          </button>
          <span className="topbar__title">{title}</span>
        </div>

        <div className="topbar__right">
          <button className="topbar__notif" aria-label="Notifications">
            <IcoBell />
            <span className="topbar__notif-dot" />
          </button>
          <Avatar name="Saniya" size="sm" color="blue" />
        </div>
      </header>

      {/* ── Page content ── */}
      <div
        className="app-content"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <div className="page-body">
          <Outlet />
        </div>
      </div>
    </>
  );
}
