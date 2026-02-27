import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("bcr_session");

  // Temporary debug logging for production cookie issues.
  console.log("---- MIDDLEWARE DEBUG ----");
  console.log("URL:", request.nextUrl.href);
  console.log("Host:", request.headers.get("host"));
  console.log("Cookie header:", request.headers.get("cookie"));
  console.log("Forwarded proto:", request.headers.get("x-forwarded-proto"));
  console.log("Token via request.cookies:", token);

  const isProtected =
    pathname.startsWith("/user") ||
    pathname.startsWith("/agent");

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/** Only run on dashboard and auth paths so cookies are checked on every navigation. */
export const config = {
  matcher: ["/user", "/user/:path*", "/agent", "/agent/:path*", "/login", "/register"],
};
