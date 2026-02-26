import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

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
    const is_active =
      typeof body.is_active === "boolean" ? body.is_active : undefined;
    if (is_approved === undefined && is_active === undefined) {
      return NextResponse.json(
        { error: "Provide is_approved and/or is_active" },
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
      if (is_active !== undefined) {
        updates.push(`is_active = $${idx++}`);
        values.push(is_active);
      }
      values.push(id);
      const result = await client.query(
        `UPDATE cars SET ${updates.join(", ")}, updated_at = now() WHERE id = $${idx} RETURNING id`,
        values
      );
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Car not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("PATCH /api/agent/cars/[id]/status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
