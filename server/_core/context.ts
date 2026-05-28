import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { getSessionUser } from "../auth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const cookieHeader = opts.req.headers.cookie;
    if (!cookieHeader) {
      console.log("[tRPC Context] Missing cookie header");
    } else {
      console.log("[tRPC Context] Cookie header present:", cookieHeader.substring(0, 60));
    }
    user = await getSessionUser(opts.req) ?? null;
  } catch {
    user = null;
  }

  return { req: opts.req, res: opts.res, user };
}
