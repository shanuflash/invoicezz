import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("middleware1");
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}
