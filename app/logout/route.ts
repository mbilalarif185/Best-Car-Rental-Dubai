import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /logout - redirects to API which clears session cookie and redirects to /
 * Route handler (no page) so no static prerender — avoids "Unsupported Server Component type" build error.
 */
export function GET(request: NextRequest) {
  const url = new URL("/api/auth/logout", request.url);
  return NextResponse.redirect(url);
}
