import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { systemRouter } from "./_core/systemRouter";

export const appRouter = router({
  system: systemRouter,

  // ─── Kana Progress ─────────────────────────────────────────────────────────
  kana: router({
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      return db.getKanaProgress(ctx.user.id);
    }),
    updateProgress: protectedProcedure
      .input(z.object({
        character: z.string(),
        type: z.enum(["hiragana", "katakana"]),
        correct: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertKanaProgress(ctx.user.id, input.character, input.type, input.correct);
        return { success: true };
      }),
  }),

  // ─── Quiz ──────────────────────────────────────────────────────────────────
  quiz: router({
    saveResult: protectedProcedure
      .input(z.object({
        quizType: z.enum(["hiragana", "katakana", "mixed"]),
        mode: z.enum(["multiple_choice", "typing"]),
        score: z.number(),
        totalQuestions: z.number(),
        timeSpent: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.saveQuizResult(ctx.user.id, input);
        return { success: true };
      }),
    getHistory: protectedProcedure.query(async ({ ctx }) => {
      return db.getQuizHistory(ctx.user.id);
    }),
  }),

  // ─── Vocabulary SRS ────────────────────────────────────────────────────────
  vocab: router({
    getSrs: protectedProcedure.query(async ({ ctx }) => {
      return db.getVocabSrs(ctx.user.id);
    }),
    updateSrs: protectedProcedure
      .input(z.object({ wordId: z.string(), quality: z.number().min(0).max(5) }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertVocabSrs(ctx.user.id, input.wordId, input.quality);
        return { success: true };
      }),
  }),
});

  // ─── Stories ───────────────────────────────────────────────────────────────
  stories: router({
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      return db.getStoryProgress(ctx.user.id);
    }),
    markComplete: protectedProcedure
      .input(z.object({ storyId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.markStoryComplete(ctx.user.id, input.storyId);
        return { success: true };
      }),
  }),

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: router({
    getStats: protectedProcedure.query(async ({ ctx }) => {
      return db.getDashboardStats(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
