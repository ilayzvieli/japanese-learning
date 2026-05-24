import { useState } from "react";
import { KANJI_DATA, type KanjiEntry } from "@/data/japaneseData";

function KanjiCard({ entry, onClick }: { entry: KanjiEntry; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px", borderRadius: 14, cursor: "pointer",
        background: "var(--color-background-card)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "var(--color-border)"}`,
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(201,168,76,0.1)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 44, fontWeight: 400, color: "var(--color-foreground)", lineHeight: 1,
        }}>
          {entry.kanji}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
          background: entry.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
          color: entry.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
        }}>
          {entry.level}
        </span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{entry.meaning}</div>
      <div style={{ fontSize: 12, color: "var(--color-foreground-muted)", marginBottom: 8 }}>
        <span style={{ marginRight: 8 }}>音: {entry.onyomi}</span>
        <span>訓: {entry.kunyomi}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--color-foreground-subtle)" }}>
          {entry.strokes} strokes
        </span>
        <span style={{ color: "var(--color-border)" }}>·</span>
        <span style={{ fontSize: 11, color: "var(--color-foreground-subtle)" }}>
          {entry.compounds.length} compounds
        </span>
      </div>
    </div>
  );
}

function KanjiModal({ entry, onClose }: { entry: KanjiEntry; onClose: () => void }) {
  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.7;
      speechSynthesis.speak(u);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 100, padding: 24,
        overflowY: "auto",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--color-background-card)",
          border: "1px solid var(--color-border-strong)",
          borderRadius: 20, padding: "32px 28px",
          maxWidth: 480, width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 64, fontWeight: 400, color: "var(--color-foreground)", lineHeight: 1,
            }}>
              {entry.kanji}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{entry.meaning}</div>
              <div style={{ fontSize: 13, color: "var(--color-foreground-muted)" }}>
                {entry.strokes} strokes · {entry.level}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20, cursor: "pointer",
            color: "var(--color-foreground-muted)", padding: 4,
          }}>✕</button>
        </div>

        {/* Readings */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20,
        }}>
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-accent)", marginBottom: 4 }}>ON'YOMI 音読み</div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 16 }}>{entry.onyomi}</div>
          </div>
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: "rgba(44,157,143,0.08)", border: "1px solid rgba(44,157,143,0.2)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-teal)", marginBottom: 4 }}>KUN'YOMI 訓読み</div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 16 }}>{entry.kunyomi}</div>
          </div>
        </div>

        {/* Mnemonic */}
        <div style={{
          padding: "14px 16px", borderRadius: 12, marginBottom: 20,
          background: "rgba(124,92,191,0.08)", border: "1px solid rgba(124,92,191,0.2)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-purple)", marginBottom: 6 }}>💡 MNEMONIC</div>
          <div style={{ fontSize: 14, color: "var(--color-foreground)", lineHeight: 1.6 }}>{entry.mnemonic}</div>
        </div>

        {/* Compounds */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "var(--color-foreground-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Common compounds
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {entry.compounds.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10,
                background: "var(--color-background-secondary)",
                border: "1px solid var(--color-border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18 }}>{c.word}</span>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "var(--color-foreground-muted)" }}>{c.reading}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "var(--color-foreground)" }}>{c.meaning}</span>
                  <button
                    onClick={() => speak(c.word)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: 2 }}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Listen button */}
        <button
          onClick={() => speak(entry.kanji)}
          style={{
            marginTop: 20, width: "100%",
            padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)",
            color: "var(--color-accent)", cursor: "pointer",
          }}
        >
          🔊 Listen to pronunciation
        </button>
      </div>
    </div>
  );
}

export default function KanjiPage() {
  const [selected, setSelected] = useState<KanjiEntry | null>(null);
  const [levelFilter, setLevelFilter] = useState<"all" | "N5" | "N4">("all");

  const filtered = KANJI_DATA.filter(k => levelFilter === "all" || k.level === levelFilter);

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "var(--color-accent)", marginBottom: 4 }}>漢字</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>Kanji Explorer</h1>
            <p style={{ color: "var(--color-foreground-muted)", fontSize: 15 }}>
              {filtered.length} essential kanji with readings, mnemonics, and compounds. Click any card for full details.
            </p>
          </div>
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
        </div>

        {/* Tips */}
        <div style={{
          padding: "14px 18px", borderRadius: 12, marginBottom: 28,
          background: "rgba(124,92,191,0.08)", border: "1px solid rgba(124,92,191,0.2)",
          fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.5,
        }}>
          💡 <strong>Learning tip:</strong> Focus on the meaning and kun'yomi first. Click any kanji to see its mnemonic, which helps you remember it visually.
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {filtered.map(entry => (
            <KanjiCard key={entry.id} entry={entry} onClick={() => setSelected(entry)} />
          ))}
        </div>
      </div>

      {selected && <KanjiModal entry={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
