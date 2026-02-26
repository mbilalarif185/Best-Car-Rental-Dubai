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
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && payload) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
