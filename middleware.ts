import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("bcr_session");

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
