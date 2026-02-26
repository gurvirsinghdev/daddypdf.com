import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookies) => {
          try {
            cookies.forEach((cookie) =>
              cookieStore.set(cookie.name, cookie.value, {
                ...cookie.options,
                domain:
                  "." + new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname,
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
              }),
            );
          } catch {}
        },
      },
    },
  );

  return supabase;
}
