import { NextResponse } from "next/server";
import { pageRateLimiter, apiRateLimiter } from "@/lib/rate-limit";

function getClientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.ip ||
    "unknown"
  );
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|css|js|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  const ip = getClientIp(req);
  const isApi = pathname.startsWith("/api");
  const limiter = isApi ? apiRateLimiter : pageRateLimiter;
  const token = `${ip}:${isApi ? "api" : "page"}`;

  const { success, remaining, limit } = limiter.check(token);

  if (!success) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          ...securityHeaders,
        },
      }
    );
  }

  const response = NextResponse.next();

  response.headers.set("X-RateLimit-Limit", String(limit));
  response.headers.set("X-RateLimit-Remaining", String(remaining));

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
