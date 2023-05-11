import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("middleware2");
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session && pathname === "/") {
    const url = new URL(req.url);
    url.pathname = "/login";
    console.log("redirect1");
    return NextResponse.redirect(url);
  }
  // if (!session && pathname !== "/login") {
  //   return NextResponse.redirect("localhost:3000/login");
  // }
  return res;
}
