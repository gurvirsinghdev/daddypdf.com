import { db } from "@/lib/db/drizzle";
import { teamMembersTable } from "@/lib/db/schema";
import createSupabaseServerClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const userTeams = await db
    .select()
    .from(teamMembersTable)
    .where(eq(teamMembersTable.userId, data.user.id));

  if (userTeams.length === 0) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const userTeam = userTeams[0];
  return NextResponse.redirect(new URL(`/${userTeam.teamId}`, request.url));
}
