import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("---- MIDDLEWARE START ----");
  console.log("Path:", request.nextUrl.pathname);
  console.log("All Cookies:", request.cookies.getAll());
  console.log("Token Cookie:", request.cookies.get("token"));

  // No redirects, no JWT verify — allow everything so cookie persists and navigation doesn't log user out.
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/agent/:path*"],
};
