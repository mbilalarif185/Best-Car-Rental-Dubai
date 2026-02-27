import { NextRequest, NextResponse } from "next/server";
import { getCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Same options as login cookie (path, secure, sameSite) so browser clears the correct cookie. */
function getCookieOptions(request: NextRequest) {
  // In production behind Nginx, do not use request.url — it may be internal (localhost).
  const secure =
    process.env.NODE_ENV === "production" ||
    (typeof request.url === "string" && new URL(request.url).protocol === "https:");
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
  };
}

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect("/", 302);
  response.cookies.set(getCookieName(), "", getCookieOptions(request));
  return response;
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getCookieName(), "", getCookieOptions(request));
  return response;
}
