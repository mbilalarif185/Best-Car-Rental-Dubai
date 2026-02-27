import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromRequest(request);
  const payload = token ? await verifyToken(token) : null;

  const isProtected = pathname.startsWith("/user") || pathname.startsWith("/agent");
  const isAuthPage = pathname === LOGIN_PATH || pathname === REGISTER_PATH;

  if (isProtected && !payload) {
    // Use relative path only — do not use request.nextUrl (origin may be localhost behind Nginx).
    const path = `/login?from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(path, 302);
  }

  if (isAuthPage && payload) {
    return NextResponse.redirect("/", 302);
  }

  return NextResponse.next();
}

/** Only run on dashboard and auth paths so cookies are checked on every navigation. */
export const config = {
  matcher: ["/user", "/user/:path*", "/agent", "/agent/:path*", "/login", "/register"],
};
