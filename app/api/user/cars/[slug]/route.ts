import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";
import { toPublicUrl, toStoredPath } from "@/lib/uploads";
import {
  validateImageFile,
  getExtension,
  resolvePublicPath,
  writeFile,
} from "@/lib/uploads";

const CAR_UPLOADS_BASE = "uploads/cars";

function parseNum(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseStr(value: unknown, maxLen: number): string {
  const s = typeof value === "string" ? value.trim() : "";
  return s.slice(0, maxLen);
}

/**
 * GET /api/user/cars/[slug]
 * Returns full car details for the logged-in vendor (for edit form).
 * Includes all car fields, images (with public URLs), and feature names.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    if (!slug?.trim()) {
      return NextResponse.json({ error: "Slug required." }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const vendorRow = await client.query<{ id: string }>(
        "SELECT id FROM vendors WHERE user_id = $1",
        [session.user_id]
      );
      if (vendorRow.rows.length === 0) {
        return NextResponse.json({ error: "Vendor not found." }, { status: 404 });
      }
      const vendor_id = vendorRow.rows[0].id;

      const carRow = await client.query<{
        id: string;
        title: string;
        slug: string;
        brand: string | null;
        model: string | null;
        year: number | null;
        car_type: string | null;
        doors: number | null;
        color: string | null;
        luggage_capacity: number | null;
        fuel_type: string | null;
        transmission: string | null;
        seats: number | null;
        price_per_day: string;
        description: string | null;
        country: string | null;
        city: string | null;
        is_active: boolean;
      }>(
        `SELECT id, title, slug, brand, model, year, car_type, doors, color,
                luggage_capacity, fuel_type, transmission, seats, price_per_day,
                description, country, city, is_active
         FROM cars WHERE vendor_id = $1 AND slug = $2`,
        [vendor_id, slug.trim()]
      );

      if (carRow.rows.length === 0) {
        return NextResponse.json({ error: "Car not found." }, { status: 404 });
      }

      const car = carRow.rows[0];
      const car_id = car.id;

      const imagesRow = await client.query<{
        id: string;
        image_url: string;
        is_primary: boolean;
        sort_order: number;
      }>(
        "SELECT id, image_url, is_primary, sort_order FROM car_images WHERE car_id = $1 ORDER BY is_primary DESC NULLS LAST, sort_order ASC",
        [car_id]
      );

      const featuresRow = await client.query<{ id: string; name: string }>(
        `SELECT f.id, f.name FROM features f
         INNER JOIN car_features cf ON cf.feature_id = f.id WHERE cf.car_id = $1
         ORDER BY f.name`,
        [car_id]
      );

      const images = imagesRow.rows.map((r) => ({
        id: r.id,
        image_url: toPublicUrl(r.image_url),
        is_primary: r.is_primary ?? false,
        sort_order: r.sort_order ?? 0,
      }));

      const features = featuresRow.rows.map((r) => ({ id: r.id, name: r.name }));

      return NextResponse.json({
        car: {
          id: car.id,
          title: car.title,
          slug: car.slug,
          brand: car.brand,
          model: car.model,
          year: car.year,
          car_type: car.car_type,
          doors: car.doors,
          color: car.color,
          luggage_capacity: car.luggage_capacity,
          fuel_type: car.fuel_type,
          transmission: car.transmission,
          seats: car.seats,
          price_per_day: Number(car.price_per_day),
          description: car.description,
          country: car.country,
          city: car.city,
          is_active: car.is_active ?? true,
          images,
          features,
        },
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("GET /api/user/cars/[slug] error:", err);
    return NextResponse.json(
      { error: "Failed to load car." },
      { status: 500 }
    );
  }
}

/** PATCH /api/user/cars/[slug] - update car (FormData like POST, optional delete_image_ids, images). */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user_id) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const { slug } = await params;
    if (!slug?.trim()) return NextResponse.json({ error: "Slug required." }, { status: 400 });
    const formData = await request.formData();
    const title = parseStr(formData.get("title"), 200);
    const brand = parseStr(formData.get("brand"), 100);
    const model = parseStr(formData.get("model"), 100);
    const year = parseNum(formData.get("year"));
    const car_type = parseStr(formData.get("car_type"), 100) || null;
    const doors = parseNum(formData.get("doors"));
    const color = parseStr(formData.get("color"), 100) || null;
    const luggage_capacity = parseNum(formData.get("luggage_capacity"));
    const fuel_type = parseStr(formData.get("fuel_type"), 50) || null;
    const transmission = parseStr(formData.get("transmission"), 50) || null;
    const seats = parseNum(formData.get("seats"));
    const price_per_day = parseNum(formData.get("price_per_day"));
    const description = parseStr(formData.get("description"), 10000) || null;
    const country = parseStr(formData.get("country"), 100) || null;
    const city = parseStr(formData.get("city"), 100) || null;
    let feature_ids: string[] = [];
    let feature_names: string[] = [];
    let delete_image_ids: string[] = [];
    try {
      const f = formData.get("feature_ids"); if (typeof f === "string") feature_ids = JSON.parse(f) || [];
    } catch {}
    try {
      const f = formData.get("feature_names"); if (typeof f === "string") feature_names = JSON.parse(f) || [];
    } catch {}
    try {
      const d = formData.get("delete_image_ids"); if (typeof d === "string") delete_image_ids = JSON.parse(d) || [];
    } catch {}
    const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
    const primaryImageFile = formData.get("primary_image");
    const primaryFile = primaryImageFile instanceof File && primaryImageFile.size > 0 ? primaryImageFile : null;
    if (primaryFile) {
      const err = validateImageFile(primaryFile);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
    }
    if (!title || !brand || !model || year === null || year < 1900 || year > 2100 ||
        price_per_day === null || price_per_day < 0 || !car_type || doors === null || doors < 1 ||
        !transmission || seats === null || seats < 1 || !fuel_type || luggage_capacity === null || luggage_capacity < 0 ||
        !color || !country || !city) {
      return NextResponse.json({ error: "All required fields must be valid." }, { status: 400 });
    }
    for (const file of imageFiles) {
      const err = validateImageFile(file); if (err) return NextResponse.json({ error: err }, { status: 400 });
    }
    const client = await pool.connect();
    try {
      const v = await client.query<{ id: string }>("SELECT id FROM vendors WHERE user_id = $1", [session.user_id]);
      if (v.rows.length === 0) return NextResponse.json({ error: "Vendor not found." }, { status: 404 });
      const vendor_id = v.rows[0].id;
      const c = await client.query<{ id: string }>("SELECT id FROM cars WHERE vendor_id = $1 AND slug = $2", [vendor_id, slug.trim()]);
      if (c.rows.length === 0) return NextResponse.json({ error: "Car not found." }, { status: 404 });
      const car_id = c.rows[0].id;
      const cnt = await client.query<{ count: string }>("SELECT COUNT(*) AS count FROM car_images WHERE car_id = $1", [car_id]);
      const n = parseInt(cnt.rows[0]?.count ?? "0", 10) - delete_image_ids.length + (primaryFile ? 1 : 0) + imageFiles.length;
      if (n < 1) return NextResponse.json({ error: "At least one image required." }, { status: 400 });
      await client.query("BEGIN");
      await client.query(
        `UPDATE cars SET title = $1, brand = $2, model = $3, year = $4, car_type = $5, doors = $6, color = $7,
          luggage_capacity = $8, fuel_type = $9, transmission = $10, seats = $11, price_per_day = $12,
          description = $13, country = $14, city = $15, updated_at = NOW() WHERE id = $16`,
        [title, brand, model, year, car_type, doors, color, luggage_capacity, fuel_type, transmission, seats, price_per_day, description, country, city, car_id]
      );
      const fs = await import("fs/promises");
      for (const id of delete_image_ids) {
        const img = await client.query<{ image_url: string }>("SELECT image_url FROM car_images WHERE id = $1 AND car_id = $2", [id, car_id]);
        if (img.rows.length > 0 && !img.rows[0].image_url.includes("..") && !path.isAbsolute(img.rows[0].image_url)) {
          await fs.unlink(path.join(process.cwd(), "public", img.rows[0].image_url)).catch(() => {});
        }
        await client.query("DELETE FROM car_images WHERE id = $1", [id]);
      }
      const base = `${CAR_UPLOADS_BASE}/${vendor_id}/${car_id}`;
      if (primaryFile) {
        await client.query("UPDATE car_images SET is_primary = false WHERE car_id = $1", [car_id]);
        const m0 = await client.query<{ max: number | null }>("SELECT COALESCE(MAX(sort_order), -1) AS max FROM car_images WHERE car_id = $1", [car_id]);
        const sort0 = (m0.rows[0]?.max ?? -1) + 1;
        const ext0 = getExtension(primaryFile);
        const rel0 = `${base}/${randomUUID()}${ext0}`;
        await writeFile(resolvePublicPath(rel0), Buffer.from(await primaryFile.arrayBuffer()));
        await client.query("INSERT INTO car_images (car_id, image_url, is_primary, sort_order) VALUES ($1, $2, true, $3)", [car_id, toStoredPath(rel0), sort0]);
      }
      if (imageFiles.length > 0) {
        const m = await client.query<{ max: number | null }>("SELECT COALESCE(MAX(sort_order), -1) AS max FROM car_images WHERE car_id = $1", [car_id]);
        let so = (m.rows[0]?.max ?? -1) + 1;
        for (const file of imageFiles) {
          const ext = getExtension(file);
          const rel = `${base}/${randomUUID()}${ext}`;
          await writeFile(resolvePublicPath(rel), Buffer.from(await file.arrayBuffer()));
          await client.query("INSERT INTO car_images (car_id, image_url, is_primary, sort_order) VALUES ($1, $2, false, $3)", [car_id, toStoredPath(rel), so++]);
        }
      }
      await client.query("DELETE FROM car_features WHERE car_id = $1", [car_id]);
      for (const fid of feature_ids) { if (fid) await client.query("INSERT INTO car_features (car_id, feature_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [car_id, fid]); }
      const seen = new Set(feature_ids);
      for (const name of feature_names) {
        const t = name.trim(); if (!t) continue;
        let r = await client.query<{ id: string }>("SELECT id FROM features WHERE TRIM(LOWER(name)) = TRIM(LOWER($1))", [t]);
        if (r.rows.length === 0) { await client.query("INSERT INTO features (name) VALUES ($1) ON CONFLICT (name) DO NOTHING", [t]); r = await client.query<{ id: string }>("SELECT id FROM features WHERE TRIM(LOWER(name)) = TRIM(LOWER($1))", [t]); }
        if (r.rows.length > 0 && !seen.has(r.rows[0].id)) { seen.add(r.rows[0].id); await client.query("INSERT INTO car_features (car_id, feature_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [car_id, r.rows[0].id]); }
      }
      await client.query("COMMIT");
      return NextResponse.json({ success: true, message: "Car updated successfully." });
    } catch (e) {
      await client.query("ROLLBACK").catch(() => {});
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("PATCH /api/user/cars/[slug] error:", err);
    return NextResponse.json({ error: "Failed to update car." }, { status: 500 });
  }
}
