import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color?: string }) {
  return (
    <div style={{
      padding: "20px", borderRadius: 14,
      background: "var(--color-background-card)",
      border: "1px solid var(--color-border)",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: color ? `${color}18` : "rgba(201,168,76,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: color || "var(--color-accent)", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "var(--color-foreground-muted)", marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

function LessonCard({ href, icon, title, subtitle, progress, color }: {
  href: string; icon: string; title: string; subtitle: string; progress: number; color: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        padding: "20px", borderRadius: 14,
        background: "var(--color-background-card)",
        border: "1px solid var(--color-border)",
        transition: "all 0.2s ease", cursor: "pointer",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${color}50`;
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>{icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color, background: `${color}15`, padding: "3px 8px", borderRadius: 6 }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--color-foreground-muted)", marginBottom: 12 }}>{subtitle}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, background: color }} />
        </div>
      </div>
    </Link>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good morning", jp: "おはようございます" };
  if (hour < 17) return { text: "Good afternoon", jp: "こんにちは" };
  return { text: "Good evening", jp: "こんばんは" };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const greeting = getGreeting();

  if (!user) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Sign in to see your dashboard</h2>
          <p style={{ color: "var(--color-foreground-muted)", marginBottom: 24 }}>Track your progress and manage your learning path.</p>
          <Link href="/login" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: 10,
            background: "var(--color-accent)", color: "#1a1a1a",
            textDecoration: "none", fontWeight: 600,
          }}>
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "var(--color-accent)", marginBottom: 6 }}>
            {greeting.jp}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px" }}>
            {greeting.text}, {user.name || "Learner"} 👋
          </h1>
          <p style={{ color: "var(--color-foreground-muted)", marginTop: 4 }}>
            Let's continue building your Japanese skills today.
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 36 }}>
          <StatCard label="Day streak" value="1" icon="🔥" color="#ef4444" />
          <StatCard label="Words learned" value="0" icon="📚" color="var(--color-accent)" />
          <StatCard label="Kana mastered" value="0" icon="🈳" color="var(--color-teal)" />
          <StatCard label="Kanji learned" value="0" icon="🀄" color="var(--color-purple)" />
        </div>

        {/* Learning Path */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Your learning path</h2>
          <p style={{ fontSize: 14, color: "var(--color-foreground-muted)", marginBottom: 20 }}>
            Follow this recommended order for the best results.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            <LessonCard href="/hiragana" icon="🈳" title="Hiragana" subtitle="46 basic characters" progress={0} color="#c9a84c" />
            <LessonCard href="/katakana" icon="カ" title="Katakana" subtitle="46 character set" progress={0} color="#2a9d8f" />
            <LessonCard href="/vocabulary" icon="📖" title="Vocabulary" subtitle="200+ N5/N4 words" progress={0} color="#7c5cbf" />
            <LessonCard href="/kanji" icon="漢" title="Kanji" subtitle="15 essential kanji" progress={0} color="#e8a0b4" />
            <LessonCard href="/grammar" icon="✍️" title="Grammar" subtitle="8 key patterns" progress={0} color="#0891b2" />
            <LessonCard href="/reading" icon="📚" title="Reading" subtitle="3 graded stories" progress={0} color="#c9a84c" />
          </div>
        </div>

        {/* Daily Challenge */}
        <div style={{
          padding: "28px", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(124,92,191,0.08))",
          border: "1px solid rgba(201,168,76,0.25)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-accent)", marginBottom: 4 }}>🌟 Daily word</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 32, fontWeight: 700, color: "var(--color-foreground)" }}>桜</span>
              <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 16, color: "var(--color-foreground-muted)" }}>さくら</span>
              <span style={{ fontSize: 16, color: "var(--color-foreground-muted)" }}>— Cherry blossom</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--color-foreground-muted)", marginTop: 4, fontFamily: "'Noto Sans JP', sans-serif" }}>
              公園に桜が咲いている。<span style={{ color: "var(--color-foreground-subtle)", fontFamily: "inherit" }}> Cherry blossoms are blooming in the park.</span>
            </div>
          </div>
          <Link href="/vocabulary" style={{
            padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            background: "var(--color-accent)", color: "#1a1a1a",
          }}>
            Practice now →
          </Link>
        </div>
      </div>
    </div>
  );
}
