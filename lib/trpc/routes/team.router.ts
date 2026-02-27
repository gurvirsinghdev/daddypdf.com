import { db } from "@/lib/db/drizzle";
import { createTRPCRouter, protectedProcedure } from "../init";
import { eq } from "drizzle-orm";
import { teamMembersTable, teamsTable } from "@/lib/db/schema";
import z from "zod";
import { authUsers } from "drizzle-orm/supabase";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    const teams = await db
      .select({
        teamId: teamsTable.id,
        teamName: teamsTable.name,
        teamPlan: teamsTable.plan,
        teamCreatedAt: teamsTable.createdAt,
        userRole: teamMembersTable.role,
        userJoinedAt: teamMembersTable.createdAt,
      })
      .from(teamMembersTable)
      .where(eq(teamMembersTable.userId, ctx.user.id))
      .leftJoin(teamsTable, eq(teamMembersTable.teamId, teamsTable.id));

    return teams;
  }),

  getTeam: protectedProcedure
    .input(z.string())
    .query(async ({ input: teamId }) => {
      const [team] = await db
        .select({ name: teamsTable.name })
        .from(teamsTable)
        .where(eq(teamsTable.id, teamId));
      return team;
    }),

  getTeamMembers: protectedProcedure
    .input(z.string())
    .query(async ({ input: teamId }) => {
      const teamMembers = await db
        .select({
          id: teamMembersTable.id,
          email: authUsers.email,
          role: teamMembersTable.role,
          joinedAt: teamMembersTable.createdAt,
        })
        .from(teamMembersTable)
        .where(eq(teamMembersTable.teamId, teamId))
        .leftJoin(authUsers, eq(teamMembersTable.userId, authUsers.id));

      return teamMembers;
    }),
});
