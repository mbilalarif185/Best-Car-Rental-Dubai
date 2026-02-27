import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Use existing JWT cookie + verification so auth behaviour stays the same.
  const token = getTokenFromRequest(request);
  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = !!payload;

  const isProtected = pathname.startsWith("/user") || pathname.startsWith("/agent");
  const isAuthPage = pathname === LOGIN_PATH || pathname === REGISTER_PATH;

  // Protect user and agent routes
  if (!isAuthenticated && isProtected) {
    url.pathname = LOGIN_PATH;
    url.search = `from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from accessing login/register
  if (isAuthenticated && isAuthPage) {
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/** Only run on dashboard and auth paths so cookies are checked on every navigation. */
export const config = {
  matcher: ["/user", "/user/:path*", "/agent", "/agent/:path*", "/login", "/register"],
};
