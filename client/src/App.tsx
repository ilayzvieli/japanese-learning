import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import LandingPage from "@/pages/LandingPage";
import { LoginPage, RegisterPage } from "@/pages/AuthPages";
import DashboardPage from "@/pages/DashboardPage";
import { HiraganaPage, KatakanaPage } from "@/pages/KanaPages";
import VocabularyPage from "@/pages/VocabularyPage";
import KanjiPage from "@/pages/KanjiPage";
import GrammarPage from "@/pages/GrammarPage";
import ReadingPage from "@/pages/ReadingPage";

function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 64, color: "var(--color-accent)", marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Page not found</h1>
        <p style={{ color: "var(--color-foreground-muted)", marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
        <a href="/" style={{
          display: "inline-block", padding: "10px 24px", borderRadius: 10,
          background: "var(--color-accent)", color: "#1a1a1a",
          textDecoration: "none", fontWeight: 600,
        }}>
          Go home →
        </a>
      </div>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/hiragana" component={HiraganaPage} />
        <Route path="/katakana" component={KatakanaPage} />
        <Route path="/vocabulary" component={VocabularyPage} />
        <Route path="/kanji" component={KanjiPage} />
        <Route path="/grammar" component={GrammarPage} />
        <Route path="/reading" component={ReadingPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
