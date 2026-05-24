import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid var(--color-border)`,
      padding: "48px 24px 32px",
      marginTop: "auto",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Kotomori</div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "var(--color-accent)", marginBottom: 12 }}>コトモリ</div>
            <p style={{ fontSize: 13, color: "var(--color-foreground-muted)", lineHeight: 1.6 }}>
              Learn Japanese. Grow every day.
            </p>
          </div>

          {/* Learn */}
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 12, color: "var(--color-foreground-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Learn</div>
            {[
              { href: "/hiragana", label: "Hiragana" },
              { href: "/katakana", label: "Katakana" },
              { href: "/vocabulary", label: "Vocabulary" },
              { href: "/kanji", label: "Kanji" },
              { href: "/grammar", label: "Grammar" },
              { href: "/reading", label: "Reading" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: "block", fontSize: 14, color: "var(--color-foreground-muted)", textDecoration: "none", marginBottom: 8 }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 12, color: "var(--color-foreground-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Account</div>
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/login", label: "Log in" },
              { href: "/register", label: "Sign up free" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: "block", fontSize: 14, color: "var(--color-foreground-muted)", textDecoration: "none", marginBottom: 8 }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, paddingTop: 20, borderTop: `1px solid var(--color-border)` }}>
          <p style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
            © 2026 Kotomori. Made with 🌸 for Japanese learners.
          </p>
          <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "var(--color-foreground-subtle)" }}>
            言葉の森へようこそ
          </p>
        </div>
      </div>
    </footer>
  );
}
