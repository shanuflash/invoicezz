import { NextResponse } from "next/server";

// Middleware is disabled for public access - no authentication required
export async function middleware(req) {
  return NextResponse.next();
}
