import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { signTokenWithJWT, getCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Same cookie options for both login types; only maxAge differs. */
function getCookieOptions(request: NextRequest, maxAgeSeconds: number) {
  const secure =
    process.env.NODE_ENV === "production" ||
    (typeof request.url === "string" && new URL(request.url).protocol === "https:");
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

/** 24 hours — normal login (no "Remember Me"). Still persistent across navigations/refresh. */
const MAX_AGE_NORMAL = 60 * 60 * 24;
/** 7 days — "Remember Me" login. */
const MAX_AGE_REMEMBER = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const emailTrimmed = email.trim().toLowerCase();
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT id, full_name, email, password_hash, role FROM users WHERE email = $1 AND is_active = true",
        [emailTrimmed]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 400 }
        );
      }

      const user = result.rows[0];
      const hash = user.password_hash;

      if (hash == null || typeof hash !== "string") {
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 400 }
        );
      }

      const match = await bcrypt.compare(password, hash);
      if (!match) {
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 400 }
        );
      }

      const userId = String(user.id);
      const role = String(user.role);
      const token = signTokenWithJWT(userId, role);

      const maxAge = rememberMe ? MAX_AGE_REMEMBER : MAX_AGE_NORMAL;
      const cookieOptions = getCookieOptions(request, maxAge);

      const response = NextResponse.json(
        {
          token,
          userId,
          role,
          full_name: user.full_name,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            Pragma: "no-cache",
          },
        }
      );
      response.cookies.set(getCookieName(), token, cookieOptions);

      return response;
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
