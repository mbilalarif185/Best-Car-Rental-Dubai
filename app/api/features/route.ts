import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

/**
 * GET /api/features
 * Returns list of features (id, name) for add-listing checkboxes.
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query<{ id: string; name: string }>(
        "SELECT id, name FROM features ORDER BY name"
      );
      return NextResponse.json({ features: result.rows });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Features GET error:", err);
    return NextResponse.json(
      { error: "Failed to load features." },
      { status: 500 }
    );
  }
}
