import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("---- MIDDLEWARE START ----");
  console.log("Path:", request.nextUrl.pathname);
  console.log("All Cookies:", request.cookies.getAll());
  console.log("Token Cookie:", request.cookies.get("token"));

  // Debug only: allow everything, no redirects, no JWT verify.
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/agent/:path*"],
};
