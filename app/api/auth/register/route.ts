import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

const SALT_ROUNDS = 10;
const ROLE_VENDOR = "vendor";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password } = body;

    if (!full_name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Full name, email and password are required." },
        { status: 400 }
      );
    }

    const emailTrimmed = email.trim().toLowerCase();
    const fullNameTrimmed = full_name.trim();

    const client = await pool.connect();
    try {
      const existing = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [emailTrimmed]
      );
      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 400 }
        );
      }

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      await client.query(
        `INSERT INTO users (full_name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)`,
        [fullNameTrimmed, emailTrimmed, password_hash, ROLE_VENDOR]
      );

      return NextResponse.json({
        success: true,
        message: "Registration successful. You can now log in.",
      });
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    console.error("Register API error:", err);
    const message =
      err && typeof err === "object" && "code" in err && (err as { code: string }).code === "3D000"
        ? "Database is not set up."
        : "Registration failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
