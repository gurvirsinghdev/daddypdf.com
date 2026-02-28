import { db } from "@/lib/db/drizzle";
import { createTRPCRouter, protectedProcedure } from "../init";
import { eq, inArray } from "drizzle-orm";
import { teamMembersTable, teamsTable } from "@/lib/db/schema";
import z from "zod";
import { authUsers } from "drizzle-orm/supabase";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    return ctx.withRls(async (tx) => {
      const teams = await tx
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
    });
  }),

  getTeam: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: teamId }) => {
      return ctx.withRls(async (tx) => {
        const [team] = await tx
          .select({ name: teamsTable.name })
          .from(teamsTable)
          .where(eq(teamsTable.id, teamId));
        return team;
      });
    }),

  getTeamMembers: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: teamId }) => {
      const teamMembers = await ctx.withRls(async (tx) => {
        return tx
          .select({
            id: teamMembersTable.id,
            userId: teamMembersTable.userId,
            role: teamMembersTable.role,
            joinedAt: teamMembersTable.createdAt,
          })
          .from(teamMembersTable)
          .where(eq(teamMembersTable.teamId, teamId));
      });

      if (teamMembers.length === 0) {
        return [];
      }

      const uniqueUserIds = [
        ...new Set(teamMembers.map(({ userId }) => userId)),
      ];
      const users = await db
        .select({
          id: authUsers.id,
          email: authUsers.email,
        })
        .from(authUsers)
        .where(inArray(authUsers.id, uniqueUserIds));

      const emailByUserId = new Map(users.map((user) => [user.id, user.email]));

      return teamMembers.map((teamMember) => ({
        ...teamMember,
        email: emailByUserId.get(teamMember.userId),
      }));
    }),
});
