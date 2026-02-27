ALTER POLICY "team_member_select" ON "team_members" TO authenticated USING (public.can_select_team_members(team_id));--> statement-breakpoint
ALTER POLICY "team_member_insert" ON "team_members" TO authenticated WITH CHECK (public.can_insert_team_members(team_id));--> statement-breakpoint
ALTER POLICY "team_member_delete" ON "team_members" TO authenticated USING (public.can_delete_team_members(team_id));--> statement-breakpoint
ALTER POLICY "team_member_update" ON "team_members" TO authenticated USING (public.can_update_team_members(team_id));--> statement-breakpoint
ALTER POLICY "team_select" ON "teams" TO authenticated USING (public.can_select_team(id));--> statement-breakpoint
ALTER POLICY "team_update" ON "teams" TO authenticated USING (public.can_update_team(id)) WITH CHECK (public.can_update_team(id));--> statement-breakpoint
ALTER POLICY "team_delete" ON "teams" TO authenticated USING (public.can_delete_team(id));