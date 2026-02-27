import { createTRPCRouter } from "../init";
import { teamRouter } from "./team.router";

export const appRouter = createTRPCRouter({
  team: teamRouter,
});
export type AppRouter = typeof appRouter;
