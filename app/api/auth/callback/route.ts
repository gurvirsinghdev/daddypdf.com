import { NextRequest, NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code)
    return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(
    new URL(error ? "/sign-in" : "/", requestUrl.origin),
  );
}
