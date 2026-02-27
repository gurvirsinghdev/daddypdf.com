import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";

export const teamsTable = pgTable(
  "teams",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    plan: text("plan").notNull().default("free"),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => authUsers.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  () => {
    return [
      pgPolicy("team_select", {
        for: "select",
        to: authenticatedRole,
        using: sql`public.can_select_team(id)`,
      }),
      pgPolicy("team_update", {
        for: "update",
        to: authenticatedRole,
        using: sql`public.can_update_team(id)`,
        withCheck: sql`public.can_update_team(id)`,
      }),
      pgPolicy("team_delete", {
        for: "delete",
        to: authenticatedRole,
        using: sql`public.can_delete_team(id)`,
      }),
    ];
  },
).enableRLS();

export const teamRoleEnum = pgEnum("team_role", ["owner", "admin", "member"]);
export const teamMembersTable = pgTable(
  "team_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teamsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    role: teamRoleEnum("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  () => {
    return [
      pgPolicy("team_member_select", {
        for: "select",
        to: authenticatedRole,
        using: sql`public.can_select_team_members(team_id)`,
      }),
      pgPolicy("team_member_insert", {
        for: "insert",
        to: authenticatedRole,
        withCheck: sql`public.can_insert_team_members(team_id)`,
      }),
      pgPolicy("team_member_delete", {
        for: "delete",
        to: authenticatedRole,
        using: sql`public.can_delete_team_members(team_id)`,
      }),
      pgPolicy("team_member_update", {
        for: "update",
        to: authenticatedRole,
        using: sql`public.can_update_team_members(team_id)`,
      }),
    ];
  },
).enableRLS();
