import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Runs in Edge runtime. Does NOT verify JWT (no jsonwebtoken/jose here) — only checks cookie presence. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  // Debug: confirm JWT_SECRET is available in Edge (for comparison with Node login route).
  const secret = process.env.JWT_SECRET;
  console.log("[MIDDLEWARE] JWT_SECRET defined:", !!secret, "| length:", secret ? secret.length : 0);

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/agent/:path*"],
};
