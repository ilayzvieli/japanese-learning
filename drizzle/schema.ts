import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table — email/password auth (replaced Manus OAuth)
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  isPaid: boolean("isPaid").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Kana progress — tracks mastery for each hiragana/katakana character per user
 */
export const kanaProgress = mysqlTable("kana_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  character: varchar("character", { length: 10 }).notNull(),
  type: mysqlEnum("type", ["hiragana", "katakana"]).notNull(),
  correctCount: int("correctCount").default(0).notNull(),
  totalAttempts: int("totalAttempts").default(0).notNull(),
  lastPracticed: timestamp("lastPracticed").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Quiz results — stores each quiz session
 */
export const quizResults = mysqlTable("quiz_results", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizType: mysqlEnum("quizType", ["hiragana", "katakana", "mixed"]).notNull(),
  mode: mysqlEnum("mode", ["multiple_choice", "typing"]).notNull(),
  score: int("score").notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  timeSpent: int("timeSpent").default(0).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

/**
 * Vocabulary SRS — spaced repetition data per user
 */
export const vocabularySrs = mysqlTable("vocabulary_srs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  wordId: varchar("wordId", { length: 64 }).notNull(),
  easeFactor: int("easeFactor").default(250).notNull(),
  interval: int("interval").default(0).notNull(),
  repetitions: int("repetitions").default(0).notNull(),
  nextReview: timestamp("nextReview").defaultNow().notNull(),
  lastReviewed: timestamp("lastReviewed").defaultNow().notNull(),
});

/**
 * Pronunciation attempts — stores AI feedback results
 */
export const pronunciationAttempts = mysqlTable("pronunciation_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  targetText: varchar("targetText", { length: 255 }).notNull(),
  transcribedText: varchar("transcribedText", { length: 255 }),
  accuracy: int("accuracy").default(0).notNull(),
  feedback: text("feedback"),
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

/**
 * Story progress — tracks which stories users have completed
 */
export const storyProgress = mysqlTable("story_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  storyId: varchar("storyId", { length: 64 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});
