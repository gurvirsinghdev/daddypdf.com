CREATE TYPE "public"."tm_status" AS ENUM('invited', 'joined');--> statement-breakpoint
ALTER TYPE "public"."team_role" RENAME TO "tm_role";--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "status" "tm_status" DEFAULT 'invited' NOT NULL;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "invited_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "joined_at" timestamp with time zone;