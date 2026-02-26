ALTER POLICY "team_member_insert" ON "team_members" TO public USING (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    ) WITH CHECK (
      team_id IN (
        SELECT team_id
        FROM team_members
        WHERE user_id = auth.uid()
          AND role IN ('owner', 'admin')
      )
    );