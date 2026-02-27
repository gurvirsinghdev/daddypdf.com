CREATE POLICY "team_member_select" ON "team_members" AS PERMISSIVE FOR SELECT TO public USING (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      ) 
    );--> statement-breakpoint
CREATE POLICY "team_member_insert" ON "team_members" AS PERMISSIVE FOR INSERT TO public WITH CHECK (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    );--> statement-breakpoint
CREATE POLICY "team_member_delete" ON "team_members" AS PERMISSIVE FOR DELETE TO public USING (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    );--> statement-breakpoint
CREATE POLICY "team_member_update" ON "team_members" AS PERMISSIVE FOR UPDATE TO public USING (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role = 'owner'
      ) 
    );--> statement-breakpoint
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