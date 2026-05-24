import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { users, kanaProgress, quizResults, vocabularySrs, pronunciationAttempts } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Auth / Users ────────────────────────────────────────────────────────────

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  return result[0] ?? undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] ?? undefined;
}

export async function createUser(data: { name: string; email: string; passwordHash: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(users).values({
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash: data.passwordHash,
    lastSignedIn: new Date(),
  });
  return getUserByEmail(data.email);
}

export async function updateLastSignedIn(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, userId));
}

// ─── Kana Progress ───────────────────────────────────────────────────────────

export async function getKanaProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(kanaProgress).where(eq(kanaProgress.userId, userId));
}

export async function upsertKanaProgress(userId: number, character: string, type: "hiragana" | "katakana", correct: boolean) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(kanaProgress)
    .where(and(eq(kanaProgress.userId, userId), eq(kanaProgress.character, character), eq(kanaProgress.type, type)))
    .limit(1);
  if (existing.length > 0) {
    const record = existing[0];
    await db.update(kanaProgress).set({
      correctCount: (record.correctCount || 0) + (correct ? 1 : 0),
      totalAttempts: (record.totalAttempts || 0) + 1,
      lastPracticed: new Date(),
    }).where(eq(kanaProgress.id, record.id));
  } else {
    await db.insert(kanaProgress).values({ userId, character, type, correctCount: correct ? 1 : 0, totalAttempts: 1, lastPracticed: new Date() });
  }
}

// ─── Quiz Results ────────────────────────────────────────────────────────────

export async function saveQuizResult(userId: number, data: { quizType: "hiragana" | "katakana" | "mixed"; mode: "multiple_choice" | "typing"; score: number; totalQuestions: number; timeSpent: number }) {
  const db = await getDb();
  if (!db) return;
  await db.insert(quizResults).values({ userId, ...data });
}

export async function getQuizHistory(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizResults).where(eq(quizResults.userId, userId)).orderBy(desc(quizResults.completedAt)).limit(limit);
}

// ─── Vocabulary SRS ──────────────────────────────────────────────────────────

export async function getVocabSrs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(vocabularySrs).where(eq(vocabularySrs.userId, userId));
}

export async function upsertVocabSrs(userId: number, wordId: string, quality: number) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(vocabularySrs)
    .where(and(eq(vocabularySrs.userId, userId), eq(vocabularySrs.wordId, wordId))).limit(1);

  let easeFactor = 250, interval = 0, repetitions = 0;
  if (existing.length > 0) {
    const r = existing[0];
    easeFactor = r.easeFactor; interval = r.interval; repetitions = r.repetitions;
  }

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * (easeFactor / 100));
    repetitions += 1;
  } else {
    repetitions = 0; interval = 1;
  }
  easeFactor = Math.max(130, easeFactor + (8 - 5 * (5 - quality) - (5 - quality) * (5 - quality)));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  if (existing.length > 0) {
    await db.update(vocabularySrs).set({ easeFactor, interval, repetitions, nextReview, lastReviewed: new Date() }).where(eq(vocabularySrs.id, existing[0].id));
  } else {
    await db.insert(vocabularySrs).values({ userId, wordId, easeFactor, interval, repetitions, nextReview, lastReviewed: new Date() });
  }
}

// ─── Pronunciation ───────────────────────────────────────────────────────────

export async function savePronunciationAttempt(userId: number, data: { targetText: string; transcribedText: string; accuracy: number; feedback: string }) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pronunciationAttempts).values({ userId, ...data });
}
