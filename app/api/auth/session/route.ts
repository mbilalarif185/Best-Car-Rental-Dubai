import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { headers: { "Cache-Control": "no-store" } });
  }
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, full_name, email, role FROM users WHERE id = $1 AND is_active = true`,
        [session.user_id]
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ user: null }, { headers: { "Cache-Control": "no-store" } });
      }
      const user = result.rows[0];
      return NextResponse.json(
        {
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    } finally {
      client.release();
    }
  } catch {
    return NextResponse.json({ user: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
