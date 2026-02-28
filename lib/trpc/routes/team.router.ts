import { db } from "@/lib/db/drizzle";
import { createTRPCRouter, protectedProcedure } from "../init";
import { asc, desc, eq, inArray, sql } from "drizzle-orm";
import { teamMembersTable, teamsTable } from "@/lib/db/schema";
import z from "zod";
import { authUsers } from "drizzle-orm/supabase";
import { TRPCError } from "@trpc/server";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    try {
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
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access your teams at the moment.",
      });
    }
  }),

  getTeam: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: teamId }) => {
      try {
        return ctx.withRls(async (tx) => {
          const [team] = await tx
            .select({ name: teamsTable.name })
            .from(teamsTable)
            .where(eq(teamsTable.id, teamId));
          return team;
        });
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this team at the moment.",
        });
      }
    }),

  getTeamMembers: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: teamId }) => {
      try {
        const teamMembers = await ctx.withRls(async (tx) => {
          return tx
            .select({
              id: teamMembersTable.id,
              userId: teamMembersTable.userId,
              role: teamMembersTable.role,
              createdAt: teamMembersTable.createdAt,
              joinedAt: teamMembersTable.joinedAt,
            })
            .from(teamMembersTable)
            .where(eq(teamMembersTable.teamId, teamId))
            .orderBy(asc(teamMembersTable.createdAt));
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
            full_name: sql`auth.users.raw_user_meta_data->>'full_name'`,
          })
          .from(authUsers)
          .where(inArray(authUsers.id, uniqueUserIds));

        const emailByUserId = new Map(
          users.map((user) => [
            user.id,
            { email: user.email, full_name: user.full_name },
          ]),
        );

        return teamMembers.map((teamMember) => ({
          ...teamMember,
          id: teamMember.id,
          role: teamMember.role,
          userId: teamMember.userId,
          joinedAt:
            teamMember.role === "member"
              ? teamMember.joinedAt
              : teamMember.createdAt,
          ...emailByUserId.get(teamMember.userId),
        }));
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You are not authorized to access this team members at the moment.",
        });
      }
    }),

  updateTeamSettings: protectedProcedure
    .input(
      z.object({
        teamId: z.uuid(),
        newTeamName: z
          .string()
          .min(1, "Please enter a team name!")
          .max(63, "Team name must be less than 63 characters!")
          .trim(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return ctx.withRls(async (tx) => {
          await tx
            .update(teamsTable)
            .set({
              name: input.newTeamName,
              updatedAt: new Date(),
            })
            .where(eq(teamsTable.id, input.teamId))
            .returning();
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating your team.",
        });
      }
    }),

  inviteTeamMember: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        email: z.email("Please enter a valid email address."),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.withRls(async (tx) => {
          const [user] = await db
            .select()
            .from(authUsers)
            .where(eq(authUsers.email, input.email));
          if (!user) return;

          await tx.insert(teamMembersTable).values({
            userId: user.id,
            teamId: input.teamId,
            role: "member",
            status: "invited",
            invitedAt: new Date(),
          });
        });
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to invite a member to this team.",
        });
      }
    }),
});
