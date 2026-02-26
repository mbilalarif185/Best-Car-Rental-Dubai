import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/change-password
 * Body: { currentPassword, newPassword }
 * Requires session. Verifies current password, then updates users.password_hash.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (body === null || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required." },
        { status: 400 }
      );
    }
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      const result = await client.query<{ password_hash: string }>(
        "SELECT password_hash FROM users WHERE id = $1 AND is_active = true",
        [session.user_id]
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
      const hash = result.rows[0].password_hash;
      const match = await bcrypt.compare(currentPassword, hash);
      if (!match) {
        return NextResponse.json(
          { error: "Current password is incorrect." },
          { status: 400 }
        );
      }
      const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await client.query(
        "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2",
        [newHash, session.user_id]
      );
      return NextResponse.json({ success: true, message: "Password updated successfully." });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Failed to update password. Please try again." },
      { status: 500 }
    );
  }
}
