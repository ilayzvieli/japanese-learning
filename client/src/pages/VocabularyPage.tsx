import { useState, useMemo } from "react";
import { VOCABULARY, type VocabWord } from "@/data/japaneseData";

const CATEGORIES = ["all", "verbs", "adjectives", "nouns", "time"];
const LEVELS = ["all", "N5", "N4"];

function FlashCard({ word, onRate }: { word: VocabWord; onRate: (q: number) => void }) {
  const [flipped, setFlipped] = useState(false);

  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(word.word);
      u.lang = "ja-JP"; u.rate = 0.8;
      speechSynthesis.speak(u);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Card */}
      <div
        onClick={() => { if (!flipped) { setFlipped(true); speak(); } }}
        style={{
          padding: "48px 32px", borderRadius: 20, cursor: flipped ? "default" : "pointer",
          background: "var(--color-background-card)",
          border: "1px solid var(--color-border-strong)",
          textAlign: "center", minHeight: 240,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease", marginBottom: 20,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Level badge */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          display: "inline-block",
          padding: "4px 10px", borderRadius: "0 20px 0 8px",
          background: word.level === "N5" ? "rgba(201,168,76,0.15)" : "rgba(44,157,143,0.15)",
          color: word.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
          fontSize: 11, fontWeight: 600,
        }}>
          {word.level}
        </div>

        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 48, fontWeight: 400, color: "var(--color-foreground)", lineHeight: 1, marginBottom: 8,
        }}>
          {word.word}
        </div>

        {flipped ? (
          <>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 16, color: "var(--color-foreground-muted)", marginBottom: 12 }}>
              {word.furigana}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-accent)", marginBottom: 16 }}>
              {word.meaning}
            </div>
            <div style={{
              padding: "10px 16px", borderRadius: 10,
              background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border)",
              textAlign: "left", maxWidth: 360,
            }}>
              <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, marginBottom: 4 }}>{word.example}</div>
              <div style={{ fontSize: 13, color: "var(--color-foreground-muted)" }}>{word.exampleMeaning}</div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); speak(); }}
              style={{
                marginTop: 16, padding: "8px 16px", borderRadius: 8, fontSize: 13,
                background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)",
                color: "var(--color-accent)", cursor: "pointer",
              }}
            >
              🔊 Listen
            </button>
          </>
        ) : (
          <div style={{ fontSize: 14, color: "var(--color-foreground-subtle)", marginTop: 12 }}>
            Tap to reveal
          </div>
        )}
      </div>

      {/* SRS Buttons */}
      {flipped && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { label: "Again", quality: 0, style: "btn-again", sub: "< 1min" },
            { label: "Hard", quality: 2, style: "btn-hard", sub: "~10min" },
            { label: "Good", quality: 4, style: "btn-good", sub: "~1 day" },
            { label: "Easy", quality: 5, style: "btn-easy", sub: "~4 days" },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={() => { setFlipped(false); onRate(btn.quality); }}
              className={btn.style}
              style={{
                padding: "12px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s ease",
              }}
            >
              <div>{btn.label}</div>
              <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>{btn.sub}</div>
            </button>
          ))}
        </div>
      )}

      {!flipped && (
        <button
          onClick={() => { setFlipped(true); speak(); }}
          style={{
            width: "100%", padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            background: "var(--color-accent)", color: "#1a1a1a",
            border: "none", cursor: "pointer",
          }}
        >
          Show answer
        </button>
      )}
    </div>
  );
}

export default function VocabularyPage() {
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [mode, setMode] = useState<"browse" | "flashcards">("browse");
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const filtered = useMemo(() =>
    VOCABULARY.filter(w =>
      (category === "all" || w.category === category) &&
      (level === "all" || w.level === level)
    ), [category, level]);

  const handleRate = (_quality: number) => {
    if (cardIndex + 1 >= filtered.length) { setSessionDone(true); }
    else { setCardIndex(i => i + 1); }
  };

  if (mode === "flashcards") {
    if (sessionDone || filtered.length === 0) {
      return (
        <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎊</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Session complete!</h2>
            <p style={{ color: "var(--color-foreground-muted)", marginBottom: 28 }}>You reviewed {filtered.length} words.</p>
            <button onClick={() => { setMode("browse"); setCardIndex(0); setSessionDone(false); }} style={{
              padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
              background: "var(--color-accent)", color: "#1a1a1a", border: "none", cursor: "pointer",
            }}>
              Back to vocabulary
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: "var(--color-foreground-muted)" }}>
              {cardIndex + 1} / {filtered.length}
            </div>
            <button onClick={() => { setMode("browse"); setCardIndex(0); setSessionDone(false); }} style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              background: "transparent", border: "1px solid var(--color-border)",
              color: "var(--color-foreground-muted)", cursor: "pointer",
            }}>
              Exit
            </button>
          </div>
          <div className="progress-bar" style={{ marginBottom: 32 }}>
            <div className="progress-fill" style={{ width: `${(cardIndex / filtered.length) * 100}%` }} />
          </div>
          <FlashCard word={filtered[cardIndex]} onRate={handleRate} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 6 }}>Vocabulary</h1>
            <p style={{ color: "var(--color-foreground-muted)" }}>{filtered.length} words · N5 & N4 levels</p>
          </div>
          <button
            onClick={() => { setCardIndex(0); setSessionDone(false); setMode("flashcards"); }}
            style={{
              padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              background: "var(--color-accent)", color: "#1a1a1a", border: "none", cursor: "pointer",
            }}
          >
            🃏 Start flashcards ({filtered.length})
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                background: category === cat ? "rgba(201,168,76,0.15)" : "transparent",
                border: `1px solid ${category === cat ? "rgba(201,168,76,0.4)" : "var(--color-border)"}`,
                color: category === cat ? "var(--color-accent)" : "var(--color-foreground-muted)",
                cursor: "pointer", textTransform: "capitalize",
              }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                background: level === l ? "rgba(44,157,143,0.15)" : "transparent",
                border: `1px solid ${level === l ? "rgba(44,157,143,0.4)" : "var(--color-border)"}`,
                color: level === l ? "var(--color-teal)" : "var(--color-foreground-muted)",
                cursor: "pointer",
              }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Word Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {filtered.map(word => (
            <div key={word.id} style={{
              padding: "16px 18px", borderRadius: 12,
              background: "var(--color-background-card)",
              border: "1px solid var(--color-border)",
              transition: "all 0.15s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 24, fontWeight: 400, color: "var(--color-foreground)",
                }}>
                  {word.word}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 6,
                  background: word.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
                  color: word.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
                }}>
                  {word.level}
                </span>
              </div>
              <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "var(--color-foreground-muted)", marginBottom: 4 }}>
                {word.furigana}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-foreground)", marginBottom: 8 }}>
                {word.meaning}
              </div>
              <div style={{
                padding: "8px 10px", borderRadius: 8,
                background: "var(--color-background-secondary)",
                fontSize: 12, color: "var(--color-foreground-muted)", lineHeight: 1.5,
              }}>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{word.example}</span>
                <br />
                {word.exampleMeaning}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
