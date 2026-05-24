import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: number;
  name: string | null;
  email: string;
  role: "user" | "admin";
  isPaid: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function apiFetch(path: string, body?: object) {
  const res = await fetch(path, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/me").then(({ ok, data }) => {
      if (ok && data?.user) setUser(data.user);
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const { ok, data } = await apiFetch("/api/auth/login", { email, password });
    if (ok && data?.user) { setUser(data.user); return {}; }
    return { error: data?.error || "Login failed" };
  };

  const register = async (name: string, email: string, password: string) => {
    const { ok, data } = await apiFetch("/api/auth/register", { name, email, password });
    if (ok && data?.user) { setUser(data.user); return {}; }
    return { error: data?.error || "Registration failed" };
  };

  const logout = async () => {
    await apiFetch("/api/auth/logout", {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
