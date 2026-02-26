import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { signTokenWithJWT, getCookieName } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

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

      const response = NextResponse.json(
        {
          token,
          userId,
          role,
          full_name: user.full_name,
        },
        { status: 200 }
      );

      response.cookies.set(getCookieName(), token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });

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
