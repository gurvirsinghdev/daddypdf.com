import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { teamsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const teamRouter = createTRPCRouter({
  getTeam: protectedProcedure
    .input(z.uuid())
    .query(async ({ ctx, input: teamId }) => {
      return ctx.withRls(async (tx) => {
        return await tx
          .select({})
          .from(teamsTable)
          .where(eq(teamsTable.id, teamId))
          .limit(1)
          .then(([team]) => team);
      });
    }),
});
