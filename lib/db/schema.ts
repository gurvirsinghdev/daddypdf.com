import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {} from "drizzle-orm/supabase";

const authSchema = pgSchema("auth");
const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

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
    const selectPolicySQL = sql`
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
      )
    `;
    const updatePolicySQL = sql`
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    `;
    const deletePolicySQL = sql`
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      )
    `;

    return [
      pgPolicy("team_select", {
        for: "select",
        using: selectPolicySQL,
      }),
      pgPolicy("team_update", {
        for: "update",
        using: updatePolicySQL,
        withCheck: updatePolicySQL,
      }),
      pgPolicy("team_delete", {
        for: "delete",
        using: deletePolicySQL,
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
    const selectPolicySQL = sql`
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      ) 
    `;
    const insertAndDeletePolicySQL = sql`
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    `;
    const updatePolicySQL = sql`
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      ) 
    `;

    return [
      pgPolicy("team_member_select", {
        for: "select",
        using: selectPolicySQL,
      }),
      pgPolicy("team_member_insert", {
        for: "insert",
        withCheck: insertAndDeletePolicySQL,
      }),
      pgPolicy("team_member_delete", {
        for: "delete",
        using: insertAndDeletePolicySQL,
      }),
      pgPolicy("team_member_update", {
        for: "update",
        using: updatePolicySQL,
      }),
    ];
  },
).enableRLS();

pgPolicy("team_select", {});
