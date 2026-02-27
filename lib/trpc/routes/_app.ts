import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure.query(() => "Hello, world!"),
});
export type AppRouter = typeof appRouter;
