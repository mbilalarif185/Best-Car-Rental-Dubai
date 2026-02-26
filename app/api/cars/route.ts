import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";
import { randomUUID } from "crypto";
import { slugify, slugifyCarSlug, ensureUniqueSlug } from "@/lib/slug";
import { toStoredPath } from "@/lib/uploads";
import {
  validateImageFile,
  getExtension,
  resolvePublicPath,
  writeFile,
} from "@/lib/uploads";

export const dynamic = "force-dynamic";

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
 * POST /api/cars
 * FormData: title, brand, model, year, car_type, doors, color, luggage_capacity,
 * fuel_type, transmission, seats, price_per_day, description, country, city,
 * feature_ids (optional), feature_names (optional JSON array), and multiple "images" (files).
 * Creates car, saves images to public/uploads/cars/{vendorId}/{carId}/, inserts car_images
 * and car_features in one transaction. Respects vendor listing_limit (default 10 from vendors.listing_limit);
 * slug is auto-generated (rent-{car-name}-in-dubai-{vendor-company}), never read from form.
 * returns inserted car
 * with images and features.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

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
    const featureIdsRaw = formData.get("feature_ids");
    if (typeof featureIdsRaw === "string") {
      try {
        const parsed = JSON.parse(featureIdsRaw);
        feature_ids = Array.isArray(parsed)
          ? parsed.filter((id): id is string => typeof id === "string")
          : [];
      } catch {
        // ignore invalid JSON
      }
    }

    let feature_names: string[] = [];
    const featureNamesRaw = formData.get("feature_names");
    if (typeof featureNamesRaw === "string") {
      try {
        const parsed = JSON.parse(featureNamesRaw);
        feature_names = Array.isArray(parsed)
          ? parsed.filter((n): n is string => typeof n === "string" && n.trim().length > 0)
          : [];
      } catch {
        // ignore invalid JSON
      }
    }

    const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!brand) {
      return NextResponse.json({ error: "Brand is required." }, { status: 400 });
    }
    if (!model) {
      return NextResponse.json({ error: "Model is required." }, { status: 400 });
    }
    if (year === null || year < 1900 || year > 2100) {
      return NextResponse.json({ error: "Valid year (1900-2100) is required." }, { status: 400 });
    }
    if (price_per_day === null || price_per_day < 0) {
      return NextResponse.json({ error: "Valid price per day is required." }, { status: 400 });
    }
    if (!car_type) {
      return NextResponse.json({ error: "Type is required." }, { status: 400 });
    }
    if (doors === null || doors < 1) {
      return NextResponse.json({ error: "Doors is required (at least 1)." }, { status: 400 });
    }
    if (!transmission) {
      return NextResponse.json({ error: "Gear box (transmission) is required." }, { status: 400 });
    }
    if (seats === null || seats < 1) {
      return NextResponse.json({ error: "Seating capacity is required (at least 1)." }, { status: 400 });
    }
    if (!fuel_type) {
      return NextResponse.json({ error: "Fuel type is required." }, { status: 400 });
    }
    if (luggage_capacity === null || luggage_capacity < 0) {
      return NextResponse.json({ error: "Number of bags is required (0 or greater)." }, { status: 400 });
    }
    if (!color) {
      return NextResponse.json({ error: "Color is required." }, { status: 400 });
    }
    if (!country) {
      return NextResponse.json({ error: "Country is required." }, { status: 400 });
    }
    if (!city) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }

    for (const file of imageFiles) {
      const err = validateImageFile(file);
      if (err) return NextResponse.json({ error: err }, { status: 400 });
    }
    if (imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const vendorRow = await client.query<{ id: string; company_name: string | null; is_approved: boolean; is_blocked: boolean; listing_limit: number | null }>(
        "SELECT id, company_name, is_approved, is_blocked, listing_limit FROM vendors WHERE user_id = $1",
        [session.user_id]
      );
      if (vendorRow.rows.length === 0) {
        return NextResponse.json(
          { error: "Vendor profile not found. Complete your profile first." },
          { status: 400 }
        );
      }
      const vendor_id = vendorRow.rows[0].id;
      const vendorApproved = !!vendorRow.rows[0].is_approved;
      const vendorBlocked = !!vendorRow.rows[0].is_blocked;
      if (!vendorApproved || vendorBlocked) {
        return NextResponse.json(
          { error: "Your profile must be approved by an admin before you can add cars. Please complete your profile and wait for approval." },
          { status: 403 }
        );
      }
      const listing_limit = vendorRow.rows[0].listing_limit ?? 10;

      await client.query("BEGIN");

      const countRow = await client.query<{ count: string }>(
        `SELECT COUNT(*) AS count FROM cars
         WHERE vendor_id = $1 AND is_active = true AND is_approved = true`,
        [vendor_id]
      );
      const approvedActiveCount = parseInt(countRow.rows[0].count, 10) || 0;
      const withinLimit = approvedActiveCount < listing_limit;
      const is_active = withinLimit;
      const is_approved = true; // New cars are approved by default; admin can block later

      const company_name = vendorRow.rows[0].company_name ?? "";
      const baseSlug = slugifyCarSlug(title, company_name);
      const slugRow = await client.query<{ slug: string }>(
        "SELECT slug FROM cars WHERE slug = $1 OR slug LIKE $2",
        [baseSlug, `${baseSlug}-%`]
      );
      const existingSlugs = slugRow.rows.map((r) => r.slug);
      const slug = ensureUniqueSlug(baseSlug, existingSlugs);

      const carInsert = await client.query<{ id: string }>(
        `INSERT INTO cars (
          vendor_id, title, slug, brand, model, year, car_type, doors, color,
          luggage_capacity, fuel_type, transmission, seats, price_per_day, description,
          country, city, is_approved, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING id`,
        [
          vendor_id,
          title,
          slug,
          brand,
          model,
          year,
          car_type,
          doors,
          color,
          luggage_capacity,
          fuel_type,
          transmission,
          seats,
          price_per_day,
          description,
          country,
          city,
          is_approved,
          is_active,
        ]
      );
      const car_id = carInsert.rows[0].id;

      const baseDir = `${CAR_UPLOADS_BASE}/${vendor_id}/${car_id}`;
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const ext = getExtension(file);
        const filename = `${randomUUID()}${ext}`;
        const relativePath = `${baseDir}/${filename}`;
        const absolutePath = resolvePublicPath(relativePath);
        const bytes = await file.arrayBuffer();
        await writeFile(absolutePath, Buffer.from(bytes));
        const storedPath = toStoredPath(relativePath);
        await client.query(
          `INSERT INTO car_images (car_id, image_url, is_primary, sort_order)
           VALUES ($1, $2, $3, $4)`,
          [car_id, storedPath, i === 0, i]
        );
      }

      for (const feature_id of feature_ids) {
        if (!feature_id) continue;
        await client.query(
          `INSERT INTO car_features (car_id, feature_id) VALUES ($1, $2)
           ON CONFLICT (car_id, feature_id) DO NOTHING`,
          [car_id, feature_id]
        );
      }

      // Resolve feature names to ids (find or create) and link to car
      const seenIds = new Set<string>(feature_ids);
      for (const name of feature_names) {
        const trimmed = name.trim();
        if (!trimmed) continue;
        let row = await client.query<{ id: string }>(
          "SELECT id FROM features WHERE TRIM(LOWER(name)) = TRIM(LOWER($1))",
          [trimmed]
        );
        if (row.rows.length === 0) {
          await client.query(
            "INSERT INTO features (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
            [trimmed]
          );
          row = await client.query<{ id: string }>(
            "SELECT id FROM features WHERE TRIM(LOWER(name)) = TRIM(LOWER($1))",
            [trimmed]
          );
        }
        if (row.rows.length > 0 && !seenIds.has(row.rows[0].id)) {
          seenIds.add(row.rows[0].id);
          await client.query(
            `INSERT INTO car_features (car_id, feature_id) VALUES ($1, $2)
             ON CONFLICT (car_id, feature_id) DO NOTHING`,
            [car_id, row.rows[0].id]
          );
        }
      }

      await client.query("COMMIT");

      const message = withinLimit
        ? "Car listing created successfully."
        : "Listing submitted for admin approval. You have reached your listing limit.";

      const carRow = await client.query(
        `SELECT id, vendor_id, title, slug, brand, model, year, car_type, doors, color,
                luggage_capacity, fuel_type, transmission, seats, price_per_day, description,
                country, city, is_approved, is_active, created_at, updated_at
         FROM cars WHERE id = $1`,
        [car_id]
      );
      const imagesRow = await client.query<{ id: string; image_url: string; is_primary: boolean; sort_order: number }>(
        "SELECT id, image_url, is_primary, sort_order FROM car_images WHERE car_id = $1 ORDER BY sort_order",
        [car_id]
      );
      const featuresRow = await client.query<{ id: string; name: string }>(
        `SELECT f.id, f.name FROM features f
         INNER JOIN car_features cf ON cf.feature_id = f.id WHERE cf.car_id = $1`,
        [car_id]
      );

      const car = carRow.rows[0]
        ? {
            ...carRow.rows[0],
            images: imagesRow.rows.map((r) => ({
              id: r.id,
              image_url: r.image_url,
              is_primary: r.is_primary,
              sort_order: r.sort_order,
            })),
            features: featuresRow.rows.map((r) => ({ id: r.id, name: r.name })),
          }
        : { id: car_id, images: imagesRow.rows, features: featuresRow.rows };

      return NextResponse.json({ success: true, message, car });
    } catch (err) {
      await client.query("ROLLBACK").catch(() => {});
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Create car error:", err);
    return NextResponse.json(
      { error: "Failed to create listing. Please try again." },
      { status: 500 }
    );
  }
}
