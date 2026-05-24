import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

const FEATURES = [
  { icon: "🈳", title: "Kana Mastery", desc: "Learn all 92 hiragana and katakana characters with interactive charts, quizzes, and spaced repetition.", href: "/hiragana" },
  { icon: "📖", title: "Vocabulary SRS", desc: "N5 and N4 vocabulary with example sentences, audio, and a scientifically-backed spaced repetition system.", href: "/vocabulary" },
  { icon: "🀄", title: "Kanji Explorer", desc: "Learn kanji with stroke order guides, mnemonics, radicals, and common compound words.", href: "/kanji" },
  { icon: "✍️", title: "Grammar Guide", desc: "Clear explanations of Japanese grammar patterns with native examples and common mistake breakdowns.", href: "/grammar" },
  { icon: "📚", title: "Reading Stories", desc: "Graded readers from N5 to N4 with furigana toggle, vocabulary popups, and audio support.", href: "/reading" },
  { icon: "🏆", title: "Progress Tracking", desc: "Visualize your learning journey with streak tracking, mastery stats, and personalized review queues.", href: "/dashboard" },
];

const STEPS = [
  { step: "01", title: "Start with the Basics", desc: "Begin with hiragana and katakana — the foundation of Japanese reading." },
  { step: "02", title: "Build Vocabulary", desc: "Learn words in context with example sentences and spaced repetition." },
  { step: "03", title: "Understand Grammar", desc: "Explore grammar patterns clearly explained with real-world examples." },
  { step: "04", title: "Read Real Japanese", desc: "Practice with graded stories that grow with your skill level." },
];

const TESTIMONIALS = [
  { name: "Sarah K.", level: "6 months in", text: "Kotomori's grammar explanations finally made particles click for me. So much better than any textbook I've tried.", avatar: "S" },
  { name: "Tomás R.", level: "N4 learner", text: "The spaced repetition system is addictive. I've learned more kanji in 2 weeks than in 3 months with other apps.", avatar: "T" },
  { name: "Yuki M.", level: "Beginner", text: "As a complete beginner, the step-by-step structure gave me confidence. I can now read hiragana fluently!", avatar: "Y" },
];

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "80px 24px 100px",
        background: isDark
          ? "linear-gradient(135deg, #0d1117 0%, #1a1f35 50%, #0d1117 100%)"
          : "linear-gradient(135deg, #f5f0e8 0%, #faf7f2 50%, #f0e8d8 100%)",
      }}>
        {/* Background decorations */}
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", top: -100, right: -100, width: 500, height: 500,
            borderRadius: "50%",
            background: isDark ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.08)",
            filter: "blur(80px)",
          }} />
          <div style={{
            position: "absolute", bottom: -100, left: -100, width: 400, height: 400,
            borderRadius: "50%",
            background: isDark ? "rgba(232,160,180,0.05)" : "rgba(232,160,180,0.1)",
            filter: "blur(60px)",
          }} />
          {/* Floating kanji decorations */}
          {["日", "本", "語", "学", "桜"].map((char, i) => (
            <div key={i} style={{
              position: "absolute",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 80 + i * 20,
              opacity: isDark ? 0.03 : 0.04,
              color: "var(--color-accent)",
              top: `${10 + i * 17}%`,
              left: i % 2 === 0 ? `${2 + i * 12}%` : undefined,
              right: i % 2 !== 0 ? `${2 + i * 8}%` : undefined,
              userSelect: "none",
              animation: `float${i} ${8 + i}s ease-in-out infinite`,
            }}>
              {char}
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 9999,
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            marginBottom: 28,
          }}>
            <span style={{ fontSize: 14 }}>🌸</span>
            <span style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 500 }}>
              Learn Japanese. Grow every day.
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            color: "var(--color-foreground)",
            marginBottom: 20,
          }}>
            Japanese Learning
            <br />
            <span style={{
              background: "linear-gradient(135deg, var(--color-accent-light), var(--color-accent), var(--color-accent-dark))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              That Actually Sticks
            </span>
          </h1>

          <p style={{
            fontSize: 18, color: "var(--color-foreground-muted)",
            lineHeight: 1.7, maxWidth: 580, margin: "0 auto 36px",
          }}>
            Build real Japanese confidence with structured lessons, spaced repetition, and immersive reading — from beginner to intermediate.
          </p>

          {/* Japanese subtitle */}
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 15, color: "var(--color-accent)",
            marginBottom: 36, letterSpacing: "0.1em",
          }}>
            日本語の世界へようこそ
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{
              padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600,
              textDecoration: "none",
              background: "var(--color-accent)",
              color: "#1a1a1a",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 24px rgba(201,168,76,0.35)",
            }}>
              Start learning free →
            </Link>
            <Link href="/hiragana" style={{
              padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 500,
              textDecoration: "none",
              background: "transparent",
              color: "var(--color-foreground)",
              border: "1px solid var(--color-border-strong)",
              transition: "all 0.2s ease",
            }}>
              Browse lessons
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 32, justifyContent: "center", marginTop: 48,
            flexWrap: "wrap",
          }}>
            {[
              { number: "92", label: "Kana characters" },
              { number: "200+", label: "Vocabulary words" },
              { number: "15", label: "Kanji covered" },
              { number: "8", label: "Grammar patterns" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "var(--color-accent)" }}>{stat.number}</div>
                <div style={{ fontSize: 12, color: "var(--color-foreground-subtle)", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--color-background)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              Everything you need
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 16 }}>
              A complete Japanese learning system
            </h2>
            <p style={{ fontSize: 16, color: "var(--color-foreground-muted)", maxWidth: 500, margin: "0 auto" }}>
              From your first hiragana to reading authentic Japanese stories — everything in one place.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "28px 24px",
                  borderRadius: 16,
                  background: "var(--color-background-card)",
                  border: "1px solid var(--color-border)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.4)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.6 }}>{f.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 13, color: "var(--color-accent)", fontWeight: 500 }}>
                    Start learning →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 24px",
        background: isDark ? "var(--color-background-secondary)" : "var(--color-background-secondary)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              Your learning path
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.5px" }}>
              From zero to reading Japanese
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 0", borderBottom: i < STEPS.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "var(--color-accent)",
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--color-foreground-muted)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--color-background)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Learners love Kotomori
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                padding: "24px", borderRadius: 16,
                background: "var(--color-background-card)",
                border: "1px solid var(--color-border)",
              }}>
                <div style={{ fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  "{t.text}"
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(201,168,76,0.2)",
                    color: "var(--color-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--color-foreground-subtle)" }}>{t.level}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--color-background-secondary)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: 48, letterSpacing: "-0.5px" }}>
            Frequently asked
          </h2>
          {[
            { q: "Is Kotomori free?", a: "Yes! All core lessons — hiragana, katakana, vocabulary, grammar, and reading — are completely free. Premium features like advanced analytics and AI conversation practice will be available soon." },
            { q: "Do I need any prior Japanese knowledge?", a: "Not at all. Kotomori is designed for complete beginners. Start with the hiragana section and progress at your own pace." },
            { q: "How long until I can read Japanese?", a: "With consistent daily practice, most learners can read hiragana and katakana within 2-4 weeks and start reading simple sentences within a month." },
            { q: "What's the best learning order?", a: "We recommend: Hiragana → Katakana → Basic Vocabulary → Grammar → Reading. The dashboard will guide you through this path." },
          ].map((faq, i) => (
            <div key={i} style={{
              padding: "20px 0",
              borderBottom: "1px solid var(--color-border)",
            }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{faq.q}</div>
              <div style={{ fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 24px",
        background: isDark
          ? "linear-gradient(135deg, #1a1f35, #0d1117)"
          : "linear-gradient(135deg, #1a2340, #2e3d6b)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 36, color: "var(--color-accent)", marginBottom: 16 }}>
            一歩を踏み出そう
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 24, fontFamily: "'Noto Sans JP', sans-serif", letterSpacing: "0.05em" }}>
            Take the first step
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "white", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Your Japanese journey starts today
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of learners building real Japanese skills — free, structured, and designed to stick.
          </p>
          <Link href="/register" style={{
            display: "inline-block",
            padding: "16px 40px", borderRadius: 12, fontSize: 16, fontWeight: 600,
            textDecoration: "none",
            background: "var(--color-accent)",
            color: "#1a1a1a",
            boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
            transition: "all 0.2s ease",
          }}>
            Create your free account →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes float4 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>
    </div>
  );
}
