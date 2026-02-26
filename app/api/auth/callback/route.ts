import { NextRequest, NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

function getSafeNextPath(path: string | null) {
  if (!path) return "/templates";
  if (!path.startsWith("/") || path.startsWith("//")) return "/templates";
  return path;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
