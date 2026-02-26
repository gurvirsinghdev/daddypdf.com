CREATE POLICY "team_select" ON "teams" AS PERMISSIVE FOR SELECT TO public USING (
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
      )
    );--> statement-breakpoint
CREATE POLICY "team_update" ON "teams" AS PERMISSIVE FOR UPDATE TO public USING (
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    ) WITH CHECK (
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    );--> statement-breakpoint
CREATE POLICY "team_delete" ON "teams" AS PERMISSIVE FOR DELETE TO public USING (
      id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      )
    );