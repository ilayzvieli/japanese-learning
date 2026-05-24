import { useState } from "react";
import { STORIES, type Story, type StoryParagraph } from "@/data/japaneseData";

function VocabPopup({ word, reading, meaning, onClose }: { word: string; reading: string; meaning: string; onClose: () => void }) {
  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(word); u.lang = "ja-JP"; u.rate = 0.75;
      speechSynthesis.speak(u);
    }
  };
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 100, padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--color-background-card)",
        border: "1px solid var(--color-border-strong)",
        borderRadius: 16, padding: "28px 24px", textAlign: "center",
        maxWidth: 260, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      }}>
        <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 40, fontWeight: 400, marginBottom: 8 }}>{word}</div>
        <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 16, color: "var(--color-accent)", marginBottom: 8 }}>{reading}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-foreground)", marginBottom: 16 }}>{meaning}</div>
        <button onClick={speak} style={{
          padding: "8px 18px", borderRadius: 8, fontSize: 13,
          background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)",
          color: "var(--color-accent)", cursor: "pointer",
        }}>
          🔊 Listen
        </button>
      </div>
    </div>
  );
}

function ParagraphBlock({ para, showFurigana, showTranslation }: {
  para: StoryParagraph; showFurigana: boolean; showTranslation: boolean;
}) {
  const [popup, setPopup] = useState<{ word: string; reading: string; meaning: string } | null>(null);
  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(para.japanese); u.lang = "ja-JP"; u.rate = 0.75;
      speechSynthesis.speak(u);
    }
  };

  return (
    <div style={{
      padding: "20px 22px", borderRadius: 14,
      background: "var(--color-background-card)",
      border: "1px solid var(--color-border)",
      marginBottom: 12,
    }}>
      {/* Japanese text */}
      <p style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 19, lineHeight: showFurigana ? 2.4 : 1.9,
        color: "var(--color-foreground)", marginBottom: 8,
      }}>
        {showFurigana ? (
          <ruby>
            {para.japanese}
            <rp>(</rp>
            <rt style={{ fontSize: 11, color: "var(--color-accent)" }}>{para.furigana}</rt>
            <rp>)</rp>
          </ruby>
        ) : para.japanese}
      </p>

      {/* Translation */}
      {showTranslation && (
        <p style={{ fontSize: 14, color: "var(--color-foreground-muted)", fontStyle: "italic", marginBottom: 12, lineHeight: 1.6 }}>
          {para.english}
        </p>
      )}

      {/* Bottom bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        paddingTop: 12, borderTop: "1px solid var(--color-border)",
        flexWrap: "wrap",
      }}>
        <button onClick={speak} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 16,
          color: "var(--color-foreground-muted)", padding: "2px 4px",
        }}>🔊</button>
        {para.vocabulary.map((v, i) => (
          <button key={i} onClick={() => setPopup(v)} style={{
            padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
            background: "var(--color-background-secondary)",
            border: "1px solid var(--color-border)",
            color: "var(--color-foreground-muted)", cursor: "pointer",
            fontFamily: "'Noto Sans JP', sans-serif",
            transition: "all 0.15s ease",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.4)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-foreground-muted)";
            }}
          >
            {v.word}
          </button>
        ))}
      </div>

      {popup && <VocabPopup {...popup} onClose={() => setPopup(null)} />}
    </div>
  );
}

function StoryReader({ story, onBack }: { story: Story; onBack: () => void }) {
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [finished, setFinished] = useState(false);

  const speakAll = () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    story.paragraphs.forEach((para, i) => {
      const u = new SpeechSynthesisUtterance(para.japanese);
      u.lang = "ja-JP"; u.rate = 0.75;
      if (i > 0) u.onstart = () => { setTimeout(() => {}, 300); };
      speechSynthesis.speak(u);
    });
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Back */}
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", cursor: "pointer",
        color: "var(--color-foreground-muted)", fontSize: 14, marginBottom: 24, padding: 0,
      }}>
        ← Back to stories
      </button>

      {/* Story header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
            background: story.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
            color: story.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
          }}>
            {story.level}
          </span>
          <span style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
            📖 ~{story.estimatedMinutes} min read
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 26, fontWeight: 700, color: "var(--color-foreground)", marginBottom: 4,
        }}>
          {story.title}
        </h1>
        <p style={{ fontSize: 16, color: "var(--color-foreground-muted)", fontStyle: "italic", marginBottom: 12 }}>
          {story.titleEn}
        </p>
        <p style={{ fontSize: 14, color: "var(--color-foreground-muted)", lineHeight: 1.6 }}>{story.description}</p>
      </div>

      {/* Controls */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap",
        padding: "12px 16px", borderRadius: 10,
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border)",
      }}>
        {[
          { label: showFurigana ? "Hide furigana" : "Show furigana", toggle: () => setShowFurigana(v => !v), active: showFurigana },
          { label: showTranslation ? "Hide translation" : "Show translation", toggle: () => setShowTranslation(v => !v), active: showTranslation },
        ].map(ctrl => (
          <button key={ctrl.label} onClick={ctrl.toggle} style={{
            padding: "6px 14px", borderRadius: 7, fontSize: 13, fontWeight: 500,
            background: ctrl.active ? "rgba(201,168,76,0.15)" : "transparent",
            border: `1px solid ${ctrl.active ? "rgba(201,168,76,0.35)" : "var(--color-border)"}`,
            color: ctrl.active ? "var(--color-accent)" : "var(--color-foreground-muted)",
            cursor: "pointer",
          }}>
            {ctrl.label}
          </button>
        ))}
        <button onClick={speakAll} style={{
          padding: "6px 14px", borderRadius: 7, fontSize: 13, fontWeight: 500,
          background: "transparent", border: "1px solid var(--color-border)",
          color: "var(--color-foreground-muted)", cursor: "pointer",
        }}>
          🔊 Read aloud
        </button>
      </div>

      {/* Paragraphs */}
      {story.paragraphs.map((para, i) => (
        <ParagraphBlock key={i} para={para} showFurigana={showFurigana} showTranslation={showTranslation} />
      ))}

      {/* Completion */}
      {!finished ? (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <button onClick={() => setFinished(true)} style={{
            padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            background: "var(--color-accent)", color: "#1a1a1a", border: "none", cursor: "pointer",
          }}>
            ✅ Mark as complete
          </button>
        </div>
      ) : (
        <div style={{
          textAlign: "center", padding: "28px", borderRadius: 14,
          background: "rgba(44,157,143,0.08)", border: "1px solid rgba(44,157,143,0.25)",
          marginTop: 8,
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "var(--color-teal)", marginBottom: 4 }}>Story complete!</div>
          <div style={{ fontSize: 14, color: "var(--color-foreground-muted)" }}>
            You read {story.paragraphs.length} paragraphs and encountered{" "}
            {story.paragraphs.reduce((acc, p) => acc + p.vocabulary.length, 0)} vocabulary items.
          </div>
          <button onClick={onBack} style={{
            marginTop: 16, padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 500,
            background: "rgba(44,157,143,0.15)", border: "1px solid rgba(44,157,143,0.3)",
            color: "var(--color-teal)", cursor: "pointer",
          }}>
            Read another story →
          </button>
        </div>
      )}
    </div>
  );
}

export default function ReadingPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  if (selectedStory) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
        <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "var(--color-accent)", marginBottom: 4 }}>読む練習</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>Reading Practice</h1>
          <p style={{ color: "var(--color-foreground-muted)", fontSize: 15 }}>
            Graded stories with furigana, vocabulary popups, and audio. Click any word to see its meaning.
          </p>
        </div>

        {/* Features */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 32,
        }}>
          {[
            { icon: "🈳", text: "Furigana toggle" },
            { icon: "📖", text: "Vocab popups" },
            { icon: "🔊", text: "Audio playback" },
            { icon: "🌏", text: "Translation mode" },
          ].map(f => (
            <div key={f.text} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 14px", borderRadius: 8,
              background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border)",
              fontSize: 14, color: "var(--color-foreground-muted)",
            }}>
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Story list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STORIES.map(story => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              style={{
                padding: "22px 24px", borderRadius: 14, cursor: "pointer",
                background: "var(--color-background-card)",
                border: "1px solid var(--color-border)",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                background: story.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 24, fontWeight: 700,
                color: story.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
              }}>
                📖
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18, fontWeight: 600 }}>
                    {story.title}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 6,
                    background: story.level === "N5" ? "rgba(201,168,76,0.12)" : "rgba(44,157,143,0.12)",
                    color: story.level === "N5" ? "var(--color-accent)" : "var(--color-teal)",
                  }}>
                    {story.level}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: "var(--color-foreground-muted)", fontStyle: "italic", marginBottom: 4 }}>
                  {story.titleEn}
                </div>
                <div style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
                  {story.description}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, color: "var(--color-foreground-muted)", marginBottom: 4 }}>
                  ~{story.estimatedMinutes} min
                </div>
                <div style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
                  {story.paragraphs.length} paragraphs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
