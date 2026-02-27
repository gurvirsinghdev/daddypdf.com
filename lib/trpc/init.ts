import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { withRls, type WithRlsCallback } from "../db/drizzle";
import createSupabaseServerClient from "../supabase/server";

export const createTRPCContext = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  return {
    user: user.user,
  };
});
type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  if (!ctx.user || !ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user!,
      withRls: <T>(callback: WithRlsCallback<T>) => withRls(ctx.user!.id, callback),
    },
  });
});
