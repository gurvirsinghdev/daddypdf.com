import { db } from "@/lib/db/drizzle";
import { teamMembers, teams } from "@/lib/db/schema";
import createSupabaseServerClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const signInUrl = new URL("/sign-in", request.url);

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user || !data.user.id) {
      return NextResponse.redirect(signInUrl);
    }
    const userTeams = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, data.user.id))
      .leftJoin(teams, eq(teamMembers.teamId, teams.id))
      .limit(1);

    const [userTeam] = userTeams;
    if (!userTeam) {
      return NextResponse.redirect(signInUrl);
    }

    const userTeamDashboardPath = `/${userTeam?.teams?.id}/templates`;
    return NextResponse.redirect(
      new URL(userTeamDashboardPath, request.nextUrl),
    );
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(signInUrl);
  }
}
