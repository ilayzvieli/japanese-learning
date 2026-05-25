import { useState } from "react";
import { GRAMMAR_POINTS, type GrammarPoint } from "@/data/japaneseData";

function ExampleCard({ jp, furi, en, showFurigana }: { jp: string; furi: string; en: string; showFurigana: boolean }) {
  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(jp); u.lang = "ja-JP"; u.rate = 0.75;
      speechSynthesis.speak(u);
    }
  };
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 10,
      background: "var(--color-background-secondary)",
      border: "1px solid var(--color-border)",
      marginBottom: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          {showFurigana && (
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, color: "var(--color-foreground-muted)", marginBottom: 2 }}>
              {furi}
            </div>
          )}
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 17, color: "var(--color-foreground)", marginBottom: 4 }}>
            {jp}
          </div>
          <div style={{ fontSize: 14, color: "var(--color-foreground-muted)", fontStyle: "italic" }}>{en}</div>
        </div>
        <button onClick={speak} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "2px 6px",
          color: "var(--color-foreground-muted)", flexShrink: 0,
        }}>
          🔊
        </button>
      </div>
    </div>
  );
}

function GrammarCard({ point, expanded, onToggle, showFurigana }: {
  point: GrammarPoint; expanded: boolean; onToggle: () => void; showFurigana: boolean;
}) {
  return (
    <div style={{
      borderRadius: 14,
      background: "var(--color-background-card)",
      border: `1px solid ${expanded ? "rgba(201,168,76,0.3)" : "var(--color-border)"}`,
      overflow: "hidden", transition: "border-color 0.2s ease",
      marginBottom: 12,
    }}>
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", padding: "18px 20px",
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
          <div style={{
            background: "rgba(201,168,76,0.1)", padding: "6px 12px", borderRadius: 8,
            whiteSpace: "nowrap", textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--color-accent)", lineHeight: 1.2 }}>
              {point.pattern}
            </div>
            <div style={{ fontSize: 10, color: "var(--color-accent)", opacity: 0.7, marginTop: 2, letterSpacing: "0.04em" }}>
              {point.pattern
                .replace(/〜/g, "~")
                // long matches first to avoid partial replacements
                .replace(/にもかかわらず/g, "ni mo kakawarazu")
                .replace(/に対して/g, "ni taishite")
                .replace(/かもしれない/g, "kamo shirenai")
                .replace(/てはいけない/g, "te wa ikenai")
                .replace(/ようになる/g, "you ni naru")
                .replace(/ようにする/g, "you ni suru")
                .replace(/てしまう/g, "te shimau")
                .replace(/てもいい/g, "te mo ii")
                .replace(/てから/g, "te kara")
                .replace(/てみる/g, "te miru")
                .replace(/ている/g, "te iru")
                .replace(/ましょう/g, "mashou")
                .replace(/はずだ/g, "hazu da")
                .replace(/わけだ/g, "wake da")
                .replace(/そうだ/g, "sou da")
                .replace(/ために/g, "tame ni")
                .replace(/ばかり/g, "bakari")
                .replace(/ません/g, "masen")
                .replace(/らしい/g, "rashii")
                .replace(/たい/g, "tai")
                .replace(/ない/g, "nai")
                .replace(/ます/g, "masu")
                .replace(/です/g, "desu")
                .replace(/から/g, "kara")
                .replace(/まで/g, "made")
                .replace(/ため/g, "tame")
                .replace(/って/g, "tte")
                .replace(/さえ/g, "sae")
                .replace(/は/g, "wa").replace(/を/g, "wo")
                .replace(/に/g, "ni").replace(/で/g, "de")
                .replace(/が/g, "ga").replace(/も/g, "mo")
                .replace(/の/g, "no").replace(/と/g, "to")
              }
            </div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-foreground)" }}>{point.meaning}</div>
            <div style={{ fontSize: 12, color: "var(--color-foreground-muted)", marginTop: 2 }}>
              Structure: {point.structure}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
            background: point.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
            color: point.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
          }}>
            {point.level}
          </span>
          <span style={{ fontSize: 18, color: "var(--color-foreground-muted)" }}>
            {expanded ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--color-border)" }}>
          {/* Explanation */}
          <div style={{ padding: "16px 0 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-foreground-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Explanation
            </div>
            <p style={{ fontSize: 15, color: "var(--color-foreground)", lineHeight: 1.7 }}>{point.explanation}</p>
          </div>

          {/* Examples */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-foreground-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Examples
            </div>
            {point.examples.map((ex, i) => (
              <ExampleCard key={i} jp={ex.japanese} furi={ex.furigana} en={ex.english} showFurigana={showFurigana} />
            ))}
          </div>

          {/* Notes */}
          <div style={{
            padding: "12px 14px", borderRadius: 10, marginBottom: 8,
            background: "rgba(8,145,178,0.08)", border: "1px solid rgba(8,145,178,0.2)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-cyan)", marginBottom: 6 }}>📝 NOTE</div>
            <div style={{ fontSize: 14, color: "var(--color-foreground)", lineHeight: 1.6 }}>{point.notes}</div>
          </div>

          {/* Common Mistakes */}
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>⚠️ COMMON MISTAKE</div>
            <div style={{ fontSize: 14, color: "var(--color-foreground)", lineHeight: 1.6 }}>{point.commonMistakes}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GrammarPage() {
  const [expandedId, setExpandedId] = useState<string | null>("g001");
  const [levelFilter, setLevelFilter] = useState<"all" | "N5" | "N4">("all");
  const [showFurigana, setShowFurigana] = useState(true);

  const filtered = GRAMMAR_POINTS.filter(g => levelFilter === "all" || g.level === levelFilter);

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "var(--color-accent)", marginBottom: 4 }}>文法</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>Grammar Explorer</h1>
          <p style={{ color: "var(--color-foreground-muted)", fontSize: 15 }}>
            Essential grammar patterns with clear explanations, native examples, and common mistake guides.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {(["all", "N5", "N4"] as const).map(l => (
              <button key={l} onClick={() => setLevelFilter(l)} style={{
                padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                background: levelFilter === l ? "rgba(201,168,76,0.15)" : "transparent",
                border: `1px solid ${levelFilter === l ? "rgba(201,168,76,0.4)" : "var(--color-border)"}`,
                color: levelFilter === l ? "var(--color-accent)" : "var(--color-foreground-muted)",
                cursor: "pointer",
              }}>{l}</button>
            ))}
          </div>
          <button onClick={() => setShowFurigana(v => !v)} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
            background: showFurigana ? "rgba(44,157,143,0.15)" : "transparent",
            border: `1px solid ${showFurigana ? "rgba(44,157,143,0.4)" : "var(--color-border)"}`,
            color: showFurigana ? "var(--color-teal)" : "var(--color-foreground-muted)",
            cursor: "pointer",
          }}>
            {showFurigana ? "Hide furigana" : "Show furigana"}
          </button>
          <span style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
            {filtered.length} patterns
          </span>
        </div>

        {/* Grammar list */}
        <div>
          {filtered.map(point => (
            <GrammarCard
              key={point.id}
              point={point}
              expanded={expandedId === point.id}
              onToggle={() => setExpandedId(expandedId === point.id ? null : point.id)}
              showFurigana={showFurigana}
            />
          ))}
        </div>

        {/* Footer tip */}
        <div style={{
          marginTop: 32, padding: "16px 18px", borderRadius: 12,
          background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
          fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.6,
        }}>
          🌸 <strong>Pro tip:</strong> Don't try to memorize grammar rules — instead, focus on the example sentences. Hearing and using patterns in context is how Japanese grammar really sticks.
        </div>
      </div>
    </div>
  );
}
