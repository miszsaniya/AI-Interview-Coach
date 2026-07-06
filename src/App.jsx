import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import AppLayout from "./layouts/AppLayout";

/* Landing page sections */
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import Features from "./components/Features";
import About    from "./components/About";
import Footer   from "./components/Footer";

/* Pages */
import LoginPage              from "./pages/LoginPage";
import SignupPage             from "./pages/SignupPage";
import DashboardPage          from "./pages/DashboardPage";
import ResumeUploadPage       from "./pages/ResumeUploadPage";
import InterviewSelectionPage from "./pages/InterviewSelectionPage";
import InterviewPage          from "./pages/InterviewPage";
import ResultsPage            from "./pages/ResultsPage";
import AnalyticsPage          from "./pages/AnalyticsPage";

/* ── Landing page wrapper ─────────────────────────── */
function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
      </main>
      <Footer />
    </>
  );
}

/* ── App ──────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"       element={<LandingPage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Authenticated app shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard"          element={<DashboardPage />} />
          <Route path="/resume-upload"      element={<ResumeUploadPage />} />
          <Route path="/interview"          element={<InterviewSelectionPage />} />
          <Route path="/interview/:type"    element={<InterviewPage />} />
          <Route path="/results"            element={<ResultsPage />} />
          <Route path="/analytics"          element={<AnalyticsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
