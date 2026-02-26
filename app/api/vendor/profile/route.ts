import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { toStoredPath } from "@/lib/uploads";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

const VENDOR_COLUMNS =
  "id, user_id, avatar_url, company_logo_url, company_name, business_email, contact_number, website_url, bio, country, city, address, facebook_url, instagram_url, youtube_url, is_approved, is_blocked, created_at, updated_at";

type VendorRow = {
  id: string;
  user_id: string;
  avatar_url: string | null;
  company_logo_url: string | null;
  company_name: string | null;
  business_email: string | null;
  contact_number: string | null;
  website_url: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  is_approved: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
};

function toVendorPayload(row: VendorRow) {
  return {
    id: row.id,
    user_id: row.user_id,
    avatar_url: row.avatar_url,
    company_logo_url: row.company_logo_url,
    company_name: row.company_name,
    business_email: row.business_email,
    contact_number: row.contact_number,
    website_url: row.website_url,
    bio: row.bio,
    country: row.country,
    city: row.city,
    address: row.address,
    facebook_url: row.facebook_url,
    instagram_url: row.instagram_url,
    youtube_url: row.youtube_url,
    is_approved: row.is_approved,
    is_blocked: row.is_blocked,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * GET /api/vendor/profile
 * Fetch vendor profile and user full_name for the logged-in user.
 * Returns { vendor, full_name } (vendor may be null; full_name from users table).
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const userRow = await client.query<{ full_name: string }>(
        "SELECT full_name FROM users WHERE id = $1 AND is_active = true",
        [session.user_id]
      );
      const full_name = userRow.rows.length > 0 ? userRow.rows[0].full_name : null;

      const result = await client.query<VendorRow>(
        `SELECT ${VENDOR_COLUMNS} FROM vendors WHERE user_id = $1`,
        [session.user_id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ vendor: null, full_name });
      }

      const vendorId = (result.rows[0] as { id: string }).id;
      const limitRow = await client.query<{ listing_limit: number | null }>(
        "SELECT listing_limit FROM vendors WHERE id = $1",
        [vendorId]
      );
      const countRow = await client.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM cars
         WHERE vendor_id = $1 AND is_active = true AND is_approved = true`,
        [vendorId]
      );
      const listing_limit = limitRow.rows[0]?.listing_limit ?? 10;
      const active_car_count = parseInt(countRow.rows[0]?.count ?? "0", 10);
      const can_add_car = active_car_count < listing_limit;

      const payload = toVendorPayload(result.rows[0]);
      return NextResponse.json({
        vendor: { ...payload, listing_limit: limitRow.rows[0]?.listing_limit ?? null },
        full_name,
        active_car_count,
        listing_limit,
        can_add_car,
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Vendor profile GET error:", err);
    return NextResponse.json(
      { error: "Failed to load profile." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendor/profile
 * Create or update vendor profile for the logged-in user.
 * Only allows updating own profile (user_id = session user).
 * Never modifies is_approved or is_blocked.
 * Returns the saved vendor.
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

    const avatar_url =
      typeof body.avatar_url === "string" && body.avatar_url.trim()
        ? toStoredPath(body.avatar_url.trim())
        : null;
    const company_logo_url =
      typeof body.company_logo_url === "string" && body.company_logo_url.trim()
        ? toStoredPath(body.company_logo_url.trim())
        : null;
    const company_name = typeof body.company_name === "string" ? body.company_name.trim() : "";
    const business_email = typeof body.business_email === "string" ? body.business_email.trim() : null;
    const contact_number = typeof body.contact_number === "string" ? body.contact_number.trim() : "";
    const website_url = typeof body.website_url === "string" ? body.website_url.trim() || null : null;
    const bio = typeof body.bio === "string" ? body.bio.trim() || null : null;
    const country = typeof body.country === "string" ? body.country.trim() || null : null;
    const city = typeof body.city === "string" ? body.city.trim() || null : null;
    const address = typeof body.address === "string" ? body.address.trim() || null : null;
    const facebook_url = typeof body.facebook_url === "string" ? body.facebook_url.trim() || null : null;
    const instagram_url = typeof body.instagram_url === "string" ? body.instagram_url.trim() || null : null;
    const youtube_url = typeof body.youtube_url === "string" ? body.youtube_url.trim() || null : null;

    const full_name =
      typeof body.full_name === "string" && body.full_name.trim()
        ? body.full_name.trim().slice(0, 150)
        : null;

    const client = await pool.connect();
    try {
      if (full_name !== null) {
        await client.query(
          "UPDATE users SET full_name = $1, updated_at = NOW() WHERE id = $2",
          [full_name, session.user_id]
        );
      }

      const existing = await client.query<VendorRow>(
        `SELECT ${VENDOR_COLUMNS} FROM vendors WHERE user_id = $1`,
        [session.user_id]
      );

      if (existing.rows.length > 0) {
        const row = await client.query<VendorRow>(
          `UPDATE vendors SET
            avatar_url = $1,
            company_logo_url = $2,
            company_name = $3,
            business_email = $4,
            contact_number = $5,
            website_url = $6,
            bio = $7,
            country = $8,
            city = $9,
            address = $10,
            facebook_url = $11,
            instagram_url = $12,
            youtube_url = $13,
            updated_at = NOW()
          WHERE user_id = $14
          RETURNING ${VENDOR_COLUMNS}`,
          [
            avatar_url,
            company_logo_url,
            company_name,
            business_email,
            contact_number,
            website_url,
            bio,
            country,
            city,
            address,
            facebook_url,
            instagram_url,
            youtube_url,
            session.user_id,
          ]
        );
        return NextResponse.json({
          vendor: toVendorPayload(row.rows[0]),
          full_name: full_name ?? undefined,
        });
      }

      const insert = await client.query<VendorRow>(
        `INSERT INTO vendors (
          user_id, avatar_url, company_logo_url, company_name, business_email,
          contact_number, website_url, bio, country, city, address,
          facebook_url, instagram_url, youtube_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING ${VENDOR_COLUMNS}`,
        [
          session.user_id,
          avatar_url,
          company_logo_url,
          company_name,
          business_email,
          contact_number,
          website_url,
          bio,
          country,
          city,
          address,
          facebook_url,
          instagram_url,
          youtube_url,
        ]
      );
      return NextResponse.json({
        vendor: toVendorPayload(insert.rows[0]),
        full_name: full_name ?? undefined,
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Vendor profile POST error:", err);
    return NextResponse.json(
      { error: "Failed to save profile." },
      { status: 500 }
    );
  }
}
