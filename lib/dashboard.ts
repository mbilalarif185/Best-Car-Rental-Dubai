import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";
import { toPublicUrl } from "@/lib/uploads";

export type VendorDashboardVendor = {
  id: string;
  company_name: string | null;
  avatar_url: string | null;
  is_approved: boolean;
  is_blocked: boolean;
  /** Max number of active car listings allowed (from admin). */
  listing_limit: number | null;
  /** Owner full name from users.full_name */
  owner_name: string | null;
  /** Business email from vendors.business_email (displayed as Email) */
  email: string | null;
  contact_number: string | null;
  website_url: string | null;
};

export type VendorDashboardStats = {
  totalCars: number;
  activeCars: number;
  inactiveCars: number;
  totalCarImages: number;
};

export type VendorDashboardLatestCar = {
  id: string;
  title: string;
  slug: string;
  price_per_day: number;
  is_active: boolean;
  is_approved: boolean;
  primary_image_url: string | null;
};

export type VendorDashboardData = {
  vendor: VendorDashboardVendor;
  stats: VendorDashboardStats;
  /** All cars for this vendor (for dashboard "My Cars" section). */
  latestCars: VendorDashboardLatestCar[];
  /** True if vendor can add more cars (active count < listing_limit). */
  canAddMoreCars: boolean;
};

/**
 * Fetches dashboard data for the logged-in vendor.
 * Uses vendor_id from vendors table (by user_id). Joins users for owner_name and email.
 * Returns all cars (no limit) for "My Cars" section.
 */
export async function getVendorDashboardData(
  userId: string
): Promise<VendorDashboardData | null> {
  const client = await pool.connect();
  try {
    const vendorRow = await client.query<{
      id: string;
      company_name: string | null;
      is_approved: boolean;
      is_blocked: boolean;
      listing_limit: number | null;
      avatar_url: string | null;
      contact_number: string | null;
      website_url: string | null;
      business_email: string | null;
      full_name: string | null;
    }>(
      `SELECT v.id, v.company_name, v.is_approved, v.is_blocked, v.listing_limit,
              v.avatar_url, v.contact_number, v.website_url, v.business_email,
              u.full_name
       FROM vendors v
       INNER JOIN users u ON u.id = v.user_id
       WHERE v.user_id = $1`,
      [userId]
    );
    if (vendorRow.rows.length === 0) return null;

    const r = vendorRow.rows[0];
    const vendor: VendorDashboardVendor = {
      id: r.id,
      company_name: r.company_name,
      avatar_url: r.avatar_url ? toPublicUrl(r.avatar_url) : null,
      is_approved: r.is_approved ?? false,
      is_blocked: r.is_blocked ?? false,
      listing_limit: r.listing_limit ?? null,
      owner_name: r.full_name ?? null,
      email: r.business_email ?? null,
      contact_number: r.contact_number ?? null,
      website_url: r.website_url ?? null,
    };

    const vendor_id = r.id;

    const statsRow = await client.query<{
      total_cars: string;
      active_cars: string;
      inactive_cars: string;
    }>(
      `SELECT
        COUNT(*)::text AS total_cars,
        COUNT(*) FILTER (WHERE is_approved = true AND is_active = true)::text AS active_cars,
        COUNT(*) FILTER (WHERE is_approved = false OR is_active = false)::text AS inactive_cars
       FROM cars WHERE vendor_id = $1`,
      [vendor_id]
    );

    const imagesRow = await client.query<{ total_images: string }>(
      `SELECT COUNT(*)::text AS total_images
       FROM car_images ci INNER JOIN cars c ON c.id = ci.car_id
       WHERE c.vendor_id = $1 AND c.is_approved = true`,
      [vendor_id]
    );

    const stats: VendorDashboardStats = {
      totalCars: parseInt(statsRow.rows[0]?.total_cars ?? "0", 10),
      activeCars: parseInt(statsRow.rows[0]?.active_cars ?? "0", 10),
      inactiveCars: parseInt(statsRow.rows[0]?.inactive_cars ?? "0", 10),
      totalCarImages: parseInt(imagesRow.rows[0]?.total_images ?? "0", 10),
    };

    const canSeeListings = vendor.is_approved && !vendor.is_blocked;
    if (!canSeeListings) {
      const limit = vendor.listing_limit ?? 10;
      const canAddMoreCars = stats.activeCars < limit;
      return { vendor, stats, latestCars: [], canAddMoreCars };
    }

    const latestRows = await client.query<{
      id: string;
      title: string;
      slug: string;
      price_per_day: string;
      is_active: boolean;
      is_approved: boolean;
      primary_image_url: string | null;
    }>(
      `SELECT c.id, c.title, c.slug, c.price_per_day, c.is_active, c.is_approved,
              ci.image_url AS primary_image_url
       FROM cars c
       LEFT JOIN LATERAL (
         SELECT image_url FROM car_images
         WHERE car_id = c.id
         ORDER BY is_primary DESC NULLS LAST, sort_order ASC
         LIMIT 1
       ) ci ON true
       WHERE c.vendor_id = $1 AND c.is_approved = true
       ORDER BY c.created_at DESC`,
      [vendor_id]
    );

    const latestCars: VendorDashboardLatestCar[] = latestRows.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      price_per_day: Number(r.price_per_day),
      is_active: r.is_active ?? false,
      is_approved: r.is_approved ?? false,
      primary_image_url: r.primary_image_url
        ? toPublicUrl(r.primary_image_url)
        : null,
    }));

    const limit = vendor.listing_limit ?? 10;
    const canAddMoreCars = stats.activeCars < limit;

    return { vendor, stats, latestCars, canAddMoreCars };
  } finally {
    client.release();
  }
}
