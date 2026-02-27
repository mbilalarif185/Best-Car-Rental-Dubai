import { NextRequest, NextResponse } from "next/server";
import { getCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Same options as login cookie (path, secure, sameSite) so browser clears the correct cookie. */
function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
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

export async function GET(_request: NextRequest) {
  const baseUrl = getBaseUrl();
  const response = NextResponse.redirect(new URL("/", baseUrl), 302);
  response.cookies.set(getCookieName(), "", getCookieOptions());
  return response;
}

export async function POST(_request: NextRequest) {
  const baseUrl = getBaseUrl();
  const response = NextResponse.redirect(new URL("/", baseUrl), 302);
  response.cookies.set(getCookieName(), "", getCookieOptions());
  return response;
}
