import { useState, useEffect, useRef } from "react";
import { HIRAGANA, KATAKANA, type KanaChar } from "@/data/japaneseData";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/contexts/AuthContext";

const BASIC_ROWS = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n2"];
const VOICED_ROWS = ["g", "z", "d", "b", "p"];

function KanaCell({ char, showRomaji, learned, onClick }: {
  char: KanaChar; showRomaji: boolean; learned: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: "1", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        borderRadius: 10, cursor: "pointer",
        border: `1px solid ${learned ? "rgba(44,157,143,0.4)" : hovered ? "rgba(201,168,76,0.5)" : "var(--color-border)"}`,
        background: learned ? "rgba(44,157,143,0.08)" : hovered ? "rgba(201,168,76,0.08)" : "var(--color-background-card)",
        transition: "all 0.15s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        padding: 4,
      }}
    >
      <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 20, fontWeight: 400,
        color: "var(--color-foreground)", lineHeight: 1,
      }}>
        {char.kana}
      </div>
      {showRomaji && (
        <div style={{
          fontSize: 10, marginTop: 3,
          color: "var(--color-foreground-muted)",
          fontWeight: 400, letterSpacing: "0.02em",
        }}>
          {char.romaji}
        </div>
      )}
    </div>
  );
}

function QuizMode({ chars, onExit }: { chars: KanaChar[]; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);
  const shuffled = useState(() => [...chars].sort(() => Math.random() - 0.5).slice(0, 20))[0];
  const current = shuffled[index];
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [index, feedback]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP"; u.rate = 0.8;
      speechSynthesis.speak(u);
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    const correct = input.trim().toLowerCase() === current.romaji.toLowerCase();
    setFeedback(correct ? "correct" : "wrong");
    setScore(s => ({ ...s, [correct ? "correct" : "wrong"]: s[correct ? "correct" : "wrong"] + 1 }));
    if (correct) speak(current.kana);
    setTimeout(() => {
      if (index + 1 >= shuffled.length) { setDone(true); }
      else { setIndex(i => i + 1); setInput(""); setFeedback(null); }
    }, 800);
  };

  if (done) {
    const total = score.correct + score.wrong;
    const pct = Math.round((score.correct / total) * 100);
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📖"}</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Quiz complete!</h2>
        <p style={{ fontSize: 18, color: "var(--color-foreground-muted)", marginBottom: 4 }}>
          {score.correct}/{total} correct ({pct}%)
        </p>
        <p style={{ fontSize: 14, color: "var(--color-foreground-subtle)", marginBottom: 32 }}>
          {pct >= 80 ? "Excellent work! Keep it up!" : "Keep practicing — you'll get there!"}
        </p>
        <button onClick={onExit} style={{
          padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
          background: "var(--color-accent)", color: "#1a1a1a", border: "none", cursor: "pointer",
        }}>
          Back to chart
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440, margin: "0 auto", padding: "40px 24px" }}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "var(--color-foreground-muted)" }}>
        <span>{index + 1} / {shuffled.length}</span>
        <span>✅ {score.correct} | ❌ {score.wrong}</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 36 }}>
        <div className="progress-fill" style={{ width: `${((index) / shuffled.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div style={{
        textAlign: "center", padding: "48px 24px",
        borderRadius: 20, background: "var(--color-background-card)",
        border: `2px solid ${feedback === "correct" ? "rgba(22,163,74,0.4)" : feedback === "wrong" ? "rgba(220,38,38,0.4)" : "var(--color-border)"}`,
        marginBottom: 24, transition: "border-color 0.2s ease",
      }}>
        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontSize: 80, fontWeight: 400,
          color: "var(--color-foreground)", lineHeight: 1, marginBottom: 8,
        }}>
          {current.kana}
        </div>
        <div style={{ fontSize: 13, color: "var(--color-foreground-subtle)" }}>
          What is the romaji for this character?
        </div>
        {feedback === "wrong" && (
          <div style={{ marginTop: 12, fontSize: 14, color: "#dc2626" }}>
            The answer was: <strong>{current.romaji}</strong>
          </div>
        )}
        {feedback === "correct" && (
          <div style={{ marginTop: 12, fontSize: 14, color: "#16a34a", fontWeight: 600 }}>
            Correct! 🎉
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          placeholder="Type romaji..."
          disabled={!!feedback}
          style={{
            flex: 1, padding: "12px 14px", borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-background)",
            color: "var(--color-foreground)",
            fontSize: 16, outline: "none",
          }}
          autoFocus
        />
        <button onClick={handleSubmit} disabled={!!feedback} style={{
          padding: "12px 20px", borderRadius: 10, fontSize: 15, fontWeight: 600,
          background: "var(--color-accent)", color: "#1a1a1a", border: "none", cursor: "pointer",
        }}>
          Check
        </button>
      </div>

      <button onClick={onExit} style={{
        display: "block", margin: "20px auto 0", fontSize: 13,
        color: "var(--color-foreground-muted)", background: "none", border: "none", cursor: "pointer",
      }}>
        Exit quiz
      </button>
    </div>
  );
}

function KanaPage({ type }: { type: "hiragana" | "katakana" }) {
  const chars = type === "hiragana" ? HIRAGANA : KATAKANA;
  const [showRomaji, setShowRomaji] = useState(true);
  const [showDakuten, setShowDakuten] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<KanaChar | null>(null);
  const { user } = useAuth();
  const { data: progressData } = trpc.kana.getProgress.useQuery(undefined, { enabled: !!user });
  const updateProgress = trpc.kana.updateProgress.useMutation();

  useEffect(() => {
    if (progressData) {
      const learnedChars = new Set(
        progressData
          .filter(p => p.type === type && (p.correctCount || 0) >= 1)
          .map(p => p.character)
      );
      setLearned(learnedChars);
    }
  }, [progressData, type]);

  const basicChars = chars.filter(c => BASIC_ROWS.includes(c.row));
  const voicedChars = chars.filter(c => VOICED_ROWS.includes(c.row));
  const displayChars = showDakuten ? [...basicChars, ...voicedChars] : basicChars;

  const toggleLearned = (kana: string) => {
    const wasLearned = learned.has(kana);
    setLearned(prev => {
      const next = new Set(prev);
      if (next.has(kana)) next.delete(kana); else next.add(kana);
      return next;
    });
    if (user && !wasLearned) {
      updateProgress.mutate({ character: kana, type, correct: true });
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.8;
      speechSynthesis.speak(u);
    }
  };

  if (quizMode) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", background: "var(--color-background)" }}>
        <QuizMode chars={basicChars} onExit={() => setQuizMode(false)} />
      </div>
    );
  }

  const title = type === "hiragana" ? "Hiragana" : "Katakana";
  const subtitle = type === "hiragana" ? "ひらがな" : "カタカナ";

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", padding: "40px 24px", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "var(--color-accent)", marginBottom: 4 }}>{subtitle}</div>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>{title}</h1>
              <p style={{ color: "var(--color-foreground-muted)", fontSize: 15 }}>
                {type === "hiragana"
                  ? "The 46 basic hiragana characters used for native Japanese words and grammar."
                  : "The 46 katakana characters used mainly for foreign words and loanwords."}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => setShowRomaji(!showRomaji)}
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  background: showRomaji ? "rgba(201,168,76,0.15)" : "transparent",
                  border: `1px solid ${showRomaji ? "rgba(201,168,76,0.4)" : "var(--color-border)"}`,
                  color: showRomaji ? "var(--color-accent)" : "var(--color-foreground-muted)",
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {showRomaji ? "Hide romaji" : "Show romaji"}
              </button>
              <button
                onClick={() => setShowDakuten(!showDakuten)}
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  background: showDakuten ? "rgba(44,157,143,0.15)" : "transparent",
                  border: `1px solid ${showDakuten ? "rgba(44,157,143,0.4)" : "var(--color-border)"}`,
                  color: showDakuten ? "var(--color-teal)" : "var(--color-foreground-muted)",
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {showDakuten ? "Basic only" : "Show voiced"}
              </button>
              <button
                onClick={() => setQuizMode(true)}
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: "var(--color-accent)", color: "#1a1a1a",
                  border: "none", cursor: "pointer",
                }}
              >
                🎯 Quiz mode
              </button>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div className="progress-bar" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${(learned.size / basicChars.length) * 100}%` }} />
            </div>
            <span style={{ fontSize: 13, color: "var(--color-foreground-muted)", whiteSpace: "nowrap" }}>
              {learned.size} / {basicChars.length} marked learned
            </span>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 8, marginBottom: 32,
        }}>
          {displayChars.map(char => (
            <KanaCell
              key={char.kana}
              char={char}
              showRomaji={showRomaji}
              learned={learned.has(char.kana)}
              onClick={() => {
                setSelected(char);
                speak(char.kana);
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--color-foreground-muted)" }}>
          <span>💡 Click any character to hear it and see details</span>
          <span>✅ Click a character then press "Mark learned" to track progress</span>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--color-background-card)",
              border: "1px solid var(--color-border-strong)",
              borderRadius: 20, padding: "36px 32px",
              textAlign: "center", maxWidth: 280, width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 80, fontWeight: 400, color: "var(--color-foreground)", lineHeight: 1, marginBottom: 12,
            }}>
              {selected.kana}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{selected.romaji}</div>
            <div style={{ fontSize: 13, color: "var(--color-foreground-subtle)", marginBottom: 20 }}>
              Row: {selected.row.toUpperCase()}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                onClick={() => speak(selected.kana)}
                style={{
                  padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--color-accent)", cursor: "pointer",
                }}
              >
                🔊 Listen
              </button>
              <button
                onClick={() => { toggleLearned(selected.kana); setSelected(null); }}
                style={{
                  padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  background: learned.has(selected.kana) ? "rgba(220,38,38,0.1)" : "rgba(44,157,143,0.12)",
                  border: `1px solid ${learned.has(selected.kana) ? "rgba(220,38,38,0.3)" : "rgba(44,157,143,0.3)"}`,
                  color: learned.has(selected.kana) ? "#dc2626" : "var(--color-teal)",
                  cursor: "pointer",
                }}
              >
                {learned.has(selected.kana) ? "Unmark" : "✓ Mark learned"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HiraganaPage() { return <KanaPage type="hiragana" />; }
export function KatakanaPage() { return <KanaPage type="katakana" />; }
