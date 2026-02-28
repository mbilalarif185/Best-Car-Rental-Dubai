import { NextRequest, NextResponse } from "next/server";
import { getCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Same options as login cookie so browser clears the correct cookie; no domain. */
function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) {
    // In production this must be set; in dev fall back to localhost for convenience.
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
    }
    return "http://localhost:3000";
  }
  return baseUrl;
}

/** Return 200 with Set-Cookie clear so the browser actually clears the cookie (302 + Set-Cookie often doesn't persist). */
export async function GET(_request: NextRequest) {
  const baseUrl = getBaseUrl();
  const response = new NextResponse(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0;url=${baseUrl}/"/><script>window.location.href="${baseUrl.replace(/"/g, '\\"')}/";</script></head><body>Signing out…</body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
  response.cookies.set(getCookieName(), "", getCookieOptions());
  return response;
}

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  response.cookies.set(getCookieName(), "", getCookieOptions());
  return response;
}
