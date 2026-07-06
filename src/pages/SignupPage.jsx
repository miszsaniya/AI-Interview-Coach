import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input  from "../components/ui/Input";
import "./Auth.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email)            e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password)         e.password  = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length) { setErrors(e_); return; }
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <AuthLayout>
      <div className="auth-page__logo-mobile">
        <div className="auth-page__logo-mobile-badge">AI</div>
        <span>InterviewCoach</span>
      </div>

      <h1 className="auth-page__heading">Create your account</h1>
      <p className="auth-page__sub">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      {/* Social */}
      <div className="auth-page__social" style={{ marginBottom: 20 }}>
        <button className="auth-page__social-btn">
          <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button className="auth-page__social-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn
        </button>
      </div>

      <div className="auth-page__divider"><span>or sign up with email</span></div>

      <form className="auth-page__form" onSubmit={handleSubmit}>
        <div className="auth-name-row">
          <Input id="firstName" label="First name" placeholder="Alex"
            value={form.firstName} onChange={set("firstName")}
            error={errors.firstName} required />
          <Input id="lastName"  label="Last name"  placeholder="Morgan"
            value={form.lastName}  onChange={set("lastName")}
            error={errors.lastName}  required />
        </div>
        <Input id="reg-email" label="Email address" type="email"
          placeholder="you@example.com" value={form.email}
          onChange={set("email")} error={errors.email} required
          autoComplete="email"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
        />
        <Input id="reg-password" label="Password" type="password"
          placeholder="Min. 8 characters" value={form.password}
          onChange={set("password")} error={errors.password} required
          autoComplete="new-password"
          hint="Use letters, numbers & symbols for a stronger password"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        />
        <Input id="confirm" label="Confirm password" type="password"
          placeholder="Re-enter password" value={form.confirm}
          onChange={set("confirm")} error={errors.confirm} required
          autoComplete="new-password"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        />

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create Account
        </Button>

        <p className="auth-page__terms">
          By creating an account you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>
    </AuthLayout>
  );
}
