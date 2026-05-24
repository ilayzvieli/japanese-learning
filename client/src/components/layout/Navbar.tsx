import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/hiragana", label: "Hiragana" },
  { href: "/katakana", label: "Katakana" },
  { href: "/vocabulary", label: "Vocabulary" },
  { href: "/kanji", label: "Kanji" },
  { href: "/grammar", label: "Grammar" },
  { href: "/reading", label: "Reading" },
];

function ToriiLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top beam */}
      <rect x="2" y="6" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.9"/>
      {/* Second beam */}
      <rect x="5" y="11" width="22" height="2.5" rx="1.25" fill="currentColor" opacity="0.7"/>
      {/* Left pillar */}
      <rect x="8" y="9" width="3" height="19" rx="1.5" fill="currentColor"/>
      {/* Right pillar */}
      <rect x="21" y="9" width="3" height="19" rx="1.5" fill="currentColor"/>
      {/* Top ornament */}
      <circle cx="16" cy="4" r="2" fill="#c9a84c"/>
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: theme === "dark" ? "rgba(13,17,23,0.92)" : "rgba(245,240,232,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid var(--color-border)`,
      transition: "background 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--color-foreground)" }}>
          <div style={{ color: "var(--color-accent)" }}>
            <ToriiLogo size={30} />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: "-0.5px", color: "var(--color-foreground)", lineHeight: 1 }}>
              Kotomori
            </div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 10, color: "var(--color-accent)", letterSpacing: "0.1em", lineHeight: 1, marginTop: 1 }}>
              コトモリ
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                textDecoration: "none",
                color: location === link.href ? "var(--color-accent)" : "var(--color-foreground-muted)",
                background: location === link.href ? "rgba(201,168,76,0.1)" : "transparent",
                transition: "all 0.15s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: "transparent",
              border: `1px solid var(--color-border)`,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "var(--color-foreground-muted)",
              transition: "all 0.15s ease",
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                  background: "transparent",
                  border: `1px solid var(--color-border)`,
                  color: "var(--color-foreground)",
                  transition: "all 0.15s ease",
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-foreground-muted)",
                  transition: "all 0.15s ease",
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                  background: "transparent",
                  border: `1px solid var(--color-border)`,
                  color: "var(--color-foreground)",
                  transition: "all 0.15s ease",
                }}
              >
                Log in
              </Link>
              <Link
                href="/register"
                style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                  background: "var(--color-accent)",
                  color: "#1a1a1a",
                  border: "none",
                  transition: "all 0.15s ease",
                }}
              >
                Start free
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: "transparent",
              border: `1px solid var(--color-border)`,
              cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "var(--color-foreground)",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          padding: "8px 24px 16px",
          borderTop: `1px solid var(--color-border)`,
          background: theme === "dark" ? "rgba(13,17,23,0.98)" : "rgba(245,240,232,0.98)",
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", padding: "10px 0",
                fontSize: 15, fontWeight: 400,
                textDecoration: "none",
                color: location === link.href ? "var(--color-accent)" : "var(--color-foreground)",
                borderBottom: `1px solid var(--color-border)`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
