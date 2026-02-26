import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user_id || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const body = await request.json().catch(() => ({}));
    const is_approved =
      typeof body.is_approved === "boolean" ? body.is_approved : undefined;
    const is_blocked =
      typeof body.is_blocked === "boolean" ? body.is_blocked : undefined;
    const listing_limit =
      (() => {
        const raw = body.listing_limit;
        if (typeof raw === "number" && !Number.isNaN(raw)) return raw;
        if (typeof raw === "string") {
          const n = parseInt(raw, 10);
          if (!Number.isNaN(n)) return n;
        }
        return undefined;
      })();
    const listing_limitValid =
      listing_limit !== undefined && listing_limit >= 1 && listing_limit <= 200;
    const listing_limitToSave = listing_limitValid ? listing_limit : undefined;
    if (is_approved === undefined && is_blocked === undefined && listing_limitToSave === undefined) {
      return NextResponse.json(
        { error: "Provide is_approved, is_blocked, and/or listing_limit (1-200)" },
        { status: 400 }
      );
    }
    const client = await pool.connect();
    try {
      const updates: string[] = [];
      const values: unknown[] = [];
      let idx = 1;
      if (is_approved !== undefined) {
        updates.push(`is_approved = $${idx++}`);
        values.push(is_approved);
      }
      if (is_blocked !== undefined) {
        updates.push(`is_blocked = $${idx++}`);
        values.push(is_blocked);
      }
      if (listing_limitToSave !== undefined) {
        updates.push(`listing_limit = $${idx++}`);
        values.push(listing_limitToSave);
      }
      values.push(id);
      const result = await client.query(
        `UPDATE vendors SET ${updates.join(", ")}, updated_at = now() WHERE id = $${idx} RETURNING id, listing_limit`,
        values
      );
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
      }
      const row = result.rows[0] as { id: string; listing_limit: number | null };
      return NextResponse.json({ ok: true, listing_limit: row.listing_limit });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("PATCH /api/agent/vendors/[id]/status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
