import { NextResponse } from "next/server";

// Auth middleware disabled - app now works without authentication
export async function middleware(req) {
  return NextResponse.next();
}
