/**
 * Kotomori Auth Routes
 * Email + password authentication using jose (JWT) + native crypto (password hashing)
 * Replaces Manus OAuth system
 */
import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookies } from "cookie";
import * as crypto from "crypto";
import * as db from "./db";

const COOKIE_NAME = "kotomori_session";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET || "kotomori-dev-secret-please-change";
  return new TextEncoder().encode(secret);
}

function isSecureRequest(req: Request): boolean {
  if (req.protocol === "https") return true;
  const fwd = req.headers["x-forwarded-proto"];
  if (!fwd) return false;
  const protos = Array.isArray(fwd) ? fwd : fwd.split(",");
  return protos.some(p => p.trim().toLowerCase() === "https");
}

function setCookie(res: Response, req: Request, token: string) {
  const secure = isSecureRequest(req);
  const cookieVal = `${COOKIE_NAME}=${token}; Path=/; Max-Age=${ONE_YEAR_MS / 1000}; HttpOnly; SameSite=${secure ? "None" : "Lax"}${secure ? "; Secure" : ""}`;
  res.setHeader("Set-Cookie", cookieVal);
}

function clearCookie(res: Response) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly`);
}

async function createToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("365d")
    .sign(getJwtSecret());
}

async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const userId = payload.userId;
    if (typeof userId !== "number") return null;
    return { userId };
  } catch {
    return null;
  }
}

function getTokenFromRequest(req: Request): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  return parseCookies(cookieHeader)[COOKIE_NAME];
}

// Password hashing using Node crypto (no bcrypt needed)
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const inputHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(inputHash, "hex"));
}

export async function getSessionUser(req: Request) {
  const cookieHeader = req.headers.cookie;
  const token = getTokenFromRequest(req);
  if (!token) {
    console.log("[Auth] No token found. Cookie header:", cookieHeader ? cookieHeader.substring(0, 100) : "none");
    return null;
  }
  const payload = await verifyToken(token);
  if (!payload) {
    console.log("[Auth] Token verification failed");
    return null;
  }
  return db.getUserById(payload.userId);
}

export function registerAuthRoutes(app: Express) {

  // GET /api/auth/me
  app.get("/api/auth/me", async (req, res) => {
    try {
      const user = await getSessionUser(req);
      if (!user) return res.json({ user: null });
      const { passwordHash: _ph, ...safeUser } = user;
      return res.json({ user: safeUser });
    } catch (err) {
      console.error("[Auth] me error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // POST /api/auth/register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password } = req.body ?? {};

      if (!name || !email || !password)
        return res.status(400).json({ error: "Name, email, and password are required." });
      if (typeof email !== "string" || !email.includes("@"))
        return res.status(400).json({ error: "Please enter a valid email address." });
      if (typeof password !== "string" || password.length < 8)
        return res.status(400).json({ error: "Password must be at least 8 characters." });

      const existing = await db.getUserByEmail(email);
      if (existing)
        return res.status(409).json({ error: "An account with this email already exists." });

      const passwordHash = hashPassword(password);
      const user = await db.createUser({ name: (name as string).trim(), email, passwordHash });
      if (!user) return res.status(500).json({ error: "Failed to create account." });

      const token = await createToken(user.id);
      setCookie(res, req, token);
      const { passwordHash: _ph, ...safeUser } = user;
      return res.status(201).json({ user: safeUser });
    } catch (err) {
      console.error("[Auth] register error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // POST /api/auth/login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body ?? {};
      if (!email || !password)
        return res.status(400).json({ error: "Email and password are required." });

      const user = await db.getUserByEmail(email as string);
      if (!user) return res.status(401).json({ error: "Invalid email or password." });

      const valid = verifyPassword(password as string, user.passwordHash);
      if (!valid) return res.status(401).json({ error: "Invalid email or password." });

      await db.updateLastSignedIn(user.id);
      const token = await createToken(user.id);
      setCookie(res, req, token);
      const { passwordHash: _ph, ...safeUser } = user;
      return res.json({ user: safeUser });
    } catch (err) {
      console.error("[Auth] login error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // POST /api/auth/logout
  app.post("/api/auth/logout", (_req, res) => {
    clearCookie(res);
    return res.json({ success: true });
  });
}
