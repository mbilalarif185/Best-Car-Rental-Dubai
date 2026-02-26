import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";
import { toPublicUrl } from "@/lib/uploads";
import { slugifyCarSlug, ensureUniqueSlug } from "@/lib/slug";

export const dynamic = "force-dynamic";

type CarRow = {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  car_type: string | null;
  doors: number | null;
  transmission: string | null;
  fuel_type: string | null;
  seats: number | null;
  price_per_day: string;
  city: string | null;
  country: string | null;
  created_at: string | null;
  primary_image_url: string | null;
};

const NEW_SLUG_PREFIX = "rent-";
const NEW_SLUG_SUFFIX = "-in-dubai-";

function isNewFormatSlug(slug: string): boolean {
  const s = (slug || "").trim().toLowerCase();
  return s.startsWith(NEW_SLUG_PREFIX) && s.includes(NEW_SLUG_SUFFIX);
}

/**
 * GET /api/user/cars
 * Returns active cars for the logged-in vendor with primary image.
 * Only cars where vendor_id = current vendor and is_active = true.
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const vendorRow = await client.query<{ id: string; company_name: string | null; is_approved: boolean; is_blocked: boolean }>(
        "SELECT id, company_name, is_approved, is_blocked FROM vendors WHERE user_id = $1",
        [session.user_id]
      );
      if (vendorRow.rows.length === 0) {
        return NextResponse.json({ cars: [], profileApproved: false });
      }
      const vendor_id = vendorRow.rows[0].id;
      const company_name = vendorRow.rows[0].company_name ?? "";
      const profileApproved = !!vendorRow.rows[0].is_approved && !vendorRow.rows[0].is_blocked;
      if (!profileApproved) {
        return NextResponse.json({ cars: [], profileApproved: false });
      }

      const result = await client.query<CarRow>(
        `SELECT c.id, c.title, c.slug, c.brand, c.car_type, c.doors, c.transmission, c.fuel_type, c.seats,
                c.price_per_day, c.city, c.country, c.created_at,
                ci.image_url AS primary_image_url
         FROM cars c
         LEFT JOIN LATERAL (
           SELECT image_url FROM car_images
           WHERE car_id = c.id
           ORDER BY is_primary DESC NULLS LAST, sort_order ASC
           LIMIT 1
         ) ci ON true
         WHERE c.vendor_id = $1 AND c.is_active = true AND c.is_approved = true
         ORDER BY c.created_at DESC`,
        [vendor_id]
      );

      const allSlugsRow = await client.query<{ slug: string }>("SELECT slug FROM cars");
      const allSlugs = allSlugsRow.rows.map((r) => r.slug);
      const usedSlugs = new Set(allSlugs.map((s) => s.toLowerCase()));

      const cars: Array<{
        id: string;
        title: string;
        slug: string;
        brand: string | null;
        car_type: string | null;
        doors: number | null;
        transmission: string | null;
        fuel_type: string | null;
        seats: number | null;
        price_per_day: number;
        city: string | null;
        country: string | null;
        created_at: string | null;
        primary_image_url: string | null;
      }> = [];
      for (const row of result.rows) {
        let slug = row.slug;
        if (!isNewFormatSlug(slug)) {
          const baseSlug = slugifyCarSlug(row.title, company_name);
          slug = ensureUniqueSlug(baseSlug, [...usedSlugs]);
          usedSlugs.add(slug.toLowerCase());
          await client.query("UPDATE cars SET slug = $1, updated_at = NOW() WHERE id = $2", [slug, row.id]);
        }
        cars.push({
          id: row.id,
          title: row.title,
          slug,
          brand: row.brand,
          car_type: row.car_type,
          doors: row.doors,
          transmission: row.transmission,
          fuel_type: row.fuel_type,
          seats: row.seats,
          price_per_day: Number(row.price_per_day),
          city: row.city,
          country: row.country,
          created_at: row.created_at,
          primary_image_url: row.primary_image_url
            ? toPublicUrl(row.primary_image_url)
            : null,
        });
      }

      return NextResponse.json({ cars, profileApproved: true }, {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("GET /api/user/cars error:", err);
    return NextResponse.json(
      { error: "Failed to load listings." },
      { status: 500 }
    );
  }
}
