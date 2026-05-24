import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

function AuthLayout({ title, subtitle, children, footer }: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
      background: "var(--color-background)",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 28, color: "var(--color-accent)", marginBottom: 6 }}>
            コトモリ
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 6 }}>{title}</h1>
          <p style={{ fontSize: 14, color: "var(--color-foreground-muted)" }}>{subtitle}</p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--color-background-card)",
          border: "1px solid var(--color-border)",
          borderRadius: 16, padding: "32px 28px",
        }}>
          {children}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--color-foreground-muted)" }}>
          {footer}
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder, error }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; error?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-foreground)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8,
          border: `1px solid ${error ? "#dc2626" : "var(--color-border)"}`,
          background: "var(--color-background)",
          color: "var(--color-foreground)",
          fontSize: 15, outline: "none",
          transition: "border-color 0.15s ease",
          boxSizing: "border-box",
        }}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--color-accent)"; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = error ? "#dc2626" : "var(--color-border)"; }}
      />
      {error && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>{error}</div>}
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.error) { setError(result.error); }
    else { navigate("/dashboard"); }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your Japanese journey"
      footer={<>Don't have an account? <Link href="/register" style={{ color: "var(--color-accent)", textDecoration: "none" }}>Sign up free →</Link></>}
    >
      {error && (
        <div style={{
          padding: "10px 14px", borderRadius: 8, marginBottom: 16,
          background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
          color: "#dc2626", fontSize: 14,
        }}>
          {error}
        </div>
      )}

      <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
      <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 600,
          background: loading ? "rgba(201,168,76,0.5)" : "var(--color-accent)",
          color: "#1a1a1a", border: "none", cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease", marginTop: 4,
        }}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setLoading(true);
    setError("");
    const result = await register(name, email, password);
    setLoading(false);
    if (result.error) { setError(result.error); }
    else { navigate("/dashboard"); }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your Japanese learning journey today — free"
      footer={<>Already have an account? <Link href="/login" style={{ color: "var(--color-accent)", textDecoration: "none" }}>Log in →</Link></>}
    >
      {error && (
        <div style={{
          padding: "10px 14px", borderRadius: 8, marginBottom: 16,
          background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
          color: "#dc2626", fontSize: 14,
        }}>
          {error}
        </div>
      )}

      <InputField label="Your name" type="text" value={name} onChange={setName} placeholder="Ilay" />
      <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
      <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" />
      <InputField label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 600,
          background: loading ? "rgba(201,168,76,0.5)" : "var(--color-accent)",
          color: "#1a1a1a", border: "none", cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease", marginTop: 4,
        }}
      >
        {loading ? "Creating account..." : "Create free account"}
      </button>

      <p style={{ fontSize: 12, color: "var(--color-foreground-subtle)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
        By signing up, you agree to our terms. Your progress is saved automatically.
      </p>
    </AuthLayout>
  );
}
