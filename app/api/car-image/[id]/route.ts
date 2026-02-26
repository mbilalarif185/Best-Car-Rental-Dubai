import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";

/**
 * DELETE /api/car-image/:id
 * Deletes a car image: verifies car belongs to current vendor, removes file and DB row.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id: imageId } = await params;
    if (!imageId) {
      return NextResponse.json({ error: "Image ID required." }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const vendorRow = await client.query<{ id: string }>(
        "SELECT id FROM vendors WHERE user_id = $1",
        [session.user_id]
      );
      if (vendorRow.rows.length === 0) {
        return NextResponse.json(
          { error: "Vendor profile not found." },
          { status: 403 }
        );
      }
      const vendor_id = vendorRow.rows[0].id;

      const imageRow = await client.query<{ image_url: string; vendor_id: string }>(
        `SELECT ci.image_url, c.vendor_id
         FROM car_images ci
         JOIN cars c ON c.id = ci.car_id
         WHERE ci.id = $1`,
        [imageId]
      );
      if (imageRow.rows.length === 0) {
        return NextResponse.json({ error: "Image not found." }, { status: 404 });
      }
      if (imageRow.rows[0].vendor_id !== vendor_id) {
        return NextResponse.json({ error: "Forbidden." }, { status: 403 });
      }

      const image_url = imageRow.rows[0].image_url;
      if (image_url.includes("..") || path.isAbsolute(image_url)) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 });
      }

      const absolutePath = path.join(process.cwd(), "public", image_url);
      await fs.unlink(absolutePath).catch(() => {});

      await client.query("DELETE FROM car_images WHERE id = $1", [imageId]);
      return NextResponse.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Delete car image error:", err);
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 }
    );
  }
}
