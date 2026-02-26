import pool from "@/lib/db";
import { toPublicUrl } from "@/lib/uploads";
import type { Car } from "@/types/detail_type";
import type { Car as ListingCar } from "@/types/type";

export type CarRow = {
  id: string;
  vendor_id: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
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
  is_approved: boolean;
  is_active: boolean;
};

export type CarWithVendorResult = {
  car: Car;
  vendor: {
    id: string;
    slug: string;
    company_name: string | null;
    contact_number: string | null;
    business_email: string | null;
    city: string | null;
    country: string | null;
  };
};

function slugifyVendor(text: string): string {
  return (text ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "vendor";
}

/** Unique vendor slug for URL: company-name + last 6 chars of id (no dashes). */
export function makeVendorSlug(id: string, companyName: string | null): string {
  const base = slugifyVendor(companyName ?? "vendor");
  const shortId = (id ?? "").replace(/-/g, "").slice(-6);
  return shortId ? `${base}-${shortId}` : base;
}

/**
 * Fetch a single car by slug from the database.
 * Returns null if not found or car is not approved/active (for public page).
 * When found, returns car and vendor info for the listing.
 */
export async function getCarBySlug(slug: string): Promise<CarWithVendorResult | null> {
  if (!slug?.trim()) return null;
  const client = await pool.connect();
  try {
    const carRow = await client.query<CarRow>(
      `SELECT id, vendor_id, title, slug, brand, model, year, car_type, doors, color,
              luggage_capacity, fuel_type, transmission, seats, price_per_day, description,
              country, city, is_approved, is_active
       FROM cars
       WHERE slug = $1 AND is_approved = true AND is_active = true`,
      [slug.trim()]
    );
    if (carRow.rows.length === 0) return null;

    const c = carRow.rows[0]!;
    const [imagesRow, vendorRow] = await Promise.all([
      client.query<{ image_url: string; is_primary: boolean; sort_order: number }>(
        `SELECT image_url, is_primary, sort_order FROM car_images WHERE car_id = $1 ORDER BY is_primary DESC NULLS LAST, sort_order ASC`,
        [c.id]
      ),
      client.query<{ id: string; company_name: string | null; contact_number: string | null; business_email: string | null; city: string | null; country: string | null }>(
        `SELECT id, company_name, contact_number, business_email, city, country FROM vendors WHERE id = $1`,
        [c.vendor_id]
      ),
    ]);
    const images = imagesRow.rows.map((r) => (r.image_url ? toPublicUrl(r.image_url) : ""));
    // First image is primary (ORDER BY is_primary DESC, sort_order ASC); next 4 are gallery
    const primaryImage = images[0] ?? "";
    const imageUrl = primaryImage || "/assets/imgs/cars-listing/cars-listing-6/car-1.png";
    const others = images.slice(1, 5); // up to 4 other images
    const [image2, image3, image4, image5] = others;

    const car: Car = {
      id: 0,
      name: c.title,
      title: c.title,
      slug: c.slug,
      brand: c.brand ?? "",
      type: c.car_type ?? "",
      image: imageUrl,
      ...(image2 && { image2 }),
      ...(image3 && { image3 }),
      ...(image4 && { image4 }),
      ...(image5 && { image5 }),
      price: Number(c.price_per_day),
      doors: c.doors ?? 0,
      gear: c.transmission ?? "",
      fuel: c.fuel_type ?? "",
      seats: c.seats ?? 0,
      location: c.city ?? c.country ?? "",
      rating: 0,
      reviews: 0,
      description: c.description ?? undefined,
      ...(c.luggage_capacity != null && { luggage_capacity: c.luggage_capacity }),
    };
    const v = vendorRow.rows[0];
    const vendor = v
      ? {
          id: v.id,
          slug: makeVendorSlug(v.id, v.company_name),
          company_name: v.company_name,
          contact_number: v.contact_number,
          business_email: v.business_email,
          city: v.city,
          country: v.country,
        }
      : {
          id: c.vendor_id,
          slug: makeVendorSlug(c.vendor_id, null),
          company_name: null,
          contact_number: null,
          business_email: null,
          city: null,
          country: null,
        };
    return { car, vendor };
  } finally {
    client.release();
  }
}

/** Numeric id for DB cars (unique, for listing Car type). */
function hashSlugToId(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 1;
}

/** Deterministic placeholder rating (4.0–5.0) and review count from slug for DB cars. */
function getPlaceholderRatingAndReviews(slug: string): { rating: number; reviews: number } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const rating = 4 + (h % 11) / 10;
  const reviews = 100 + (h % 701);
  return { rating: Math.min(5, Math.round(rating * 100) / 100), reviews };
}

const PLACEHOLDER_CAR_IMAGE = "/assets/imgs/cars-listing/cars-listing-6/car-1.png";

/**
 * Fetch all approved, active cars from the database for public listing (luxury fleet, categories, brands).
 * Returns array in the listing Car shape (types/type).
 */
export async function getPublicCarsForListings(): Promise<ListingCar[]> {
  const client = await pool.connect();
  try {
    const result = await client.query<
      CarRow & { primary_image_url: string | null }
    >(
      `SELECT c.id, c.title, c.slug, c.brand, c.car_type, c.doors, c.transmission, c.fuel_type, c.seats,
              c.price_per_day, c.city, c.country,
              ci.image_url AS primary_image_url
       FROM cars c
       LEFT JOIN LATERAL (
         SELECT image_url FROM car_images WHERE car_id = c.id
         ORDER BY is_primary DESC NULLS LAST, sort_order ASC LIMIT 1
       ) ci ON true
       WHERE c.is_approved = true AND c.is_active = true
       ORDER BY c.created_at DESC`
    );

    return result.rows.map((c) => {
      const { rating, reviews } = getPlaceholderRatingAndReviews(c.slug);
      const imagePath = c.primary_image_url ? toPublicUrl(c.primary_image_url) : PLACEHOLDER_CAR_IMAGE;
      return {
        id: hashSlugToId(c.slug),
        name: c.title,
        brand: c.brand ?? "",
        type: (c.car_type ?? "").trim(),
        image: imagePath,
        price: Number(c.price_per_day),
        rating,
        reviews,
        doors: c.doors ?? 0,
        gear: c.transmission ?? "",
        fuel: c.fuel_type ?? "",
        seats: c.seats ?? 0,
        location: [c.city, c.country].filter(Boolean).join(", ") || "",
        slug: c.slug,
      };
    });
  } finally {
    client.release();
  }
}

/**
 * Fetch all approved, active cars for a single vendor (for "All items by this dealer" page).
 * Returns array in the listing Car shape (types/type).
 */
export async function getPublicCarsForVendor(vendorId: string): Promise<ListingCar[]> {
  if (!vendorId?.trim()) return [];
  const client = await pool.connect();
  try {
    const result = await client.query<
      CarRow & { primary_image_url: string | null }
    >(
      `SELECT c.id, c.title, c.slug, c.brand, c.car_type, c.doors, c.transmission, c.fuel_type, c.seats,
              c.price_per_day, c.city, c.country,
              ci.image_url AS primary_image_url
       FROM cars c
       LEFT JOIN LATERAL (
         SELECT image_url FROM car_images WHERE car_id = c.id
         ORDER BY is_primary DESC NULLS LAST, sort_order ASC LIMIT 1
       ) ci ON true
       WHERE c.vendor_id = $1 AND c.is_approved = true AND c.is_active = true
       ORDER BY c.created_at DESC`,
      [vendorId.trim()]
    );

    return result.rows.map((c) => {
      const { rating, reviews } = getPlaceholderRatingAndReviews(c.slug);
      const imagePath = c.primary_image_url ? toPublicUrl(c.primary_image_url) : PLACEHOLDER_CAR_IMAGE;
      return {
        id: hashSlugToId(c.slug),
        name: c.title,
        brand: c.brand ?? "",
        type: (c.car_type ?? "").trim(),
        image: imagePath,
        price: Number(c.price_per_day),
        rating,
        reviews,
        doors: c.doors ?? 0,
        gear: c.transmission ?? "",
        fuel: c.fuel_type ?? "",
        seats: c.seats ?? 0,
        location: [c.city, c.country].filter(Boolean).join(", ") || "",
        slug: c.slug,
      };
    });
  } finally {
    client.release();
  }
}

/** Fetch vendor public info by id (for vendor page heading). Returns null if not found. */
export async function getVendorById(vendorId: string): Promise<{ id: string; company_name: string | null } | null> {
  if (!vendorId?.trim()) return null;
  const client = await pool.connect();
  try {
    const r = await client.query<{ id: string; company_name: string | null }>(
      "SELECT id, company_name FROM vendors WHERE id = $1",
      [vendorId.trim()]
    );
    if (r.rows.length === 0) return null;
    return r.rows[0];
  } finally {
    client.release();
  }
}

/** Fetch vendor by URL slug (e.g. "legendary-car-rental-dubai-ae39ef2"). Returns null if not found. */
export async function getVendorBySlug(slug: string): Promise<{ id: string; company_name: string | null } | null> {
  if (!slug?.trim()) return null;
  const client = await pool.connect();
  try {
    const r = await client.query<{ id: string; company_name: string | null }>(
      "SELECT id, company_name FROM vendors"
    );
    const match = r.rows.find((row) => makeVendorSlug(row.id, row.company_name) === slug.trim());
    return match ?? null;
  } finally {
    client.release();
  }
}

export type VendorDetailsForDealer = {
  id: string;
  slug: string;
  company_name: string | null;
  address: string;
  avatar_url: string | null;
  company_logo_url: string | null;
  bio: string | null;
  contact_number: string | null;
  business_email: string | null;
  website_url: string | null;
  total_vehicles: number;
};

/** Fetch full vendor profile by slug for dealer-details page. Only approved, non-blocked vendors. */
export async function getVendorDetailsBySlug(slug: string): Promise<VendorDetailsForDealer | null> {
  if (!slug?.trim()) return null;
  const client = await pool.connect();
  try {
    const r = await client.query<{
      id: string;
      company_name: string | null;
      address: string | null;
      city: string | null;
      country: string | null;
      avatar_url: string | null;
      company_logo_url: string | null;
      bio: string | null;
      contact_number: string | null;
      business_email: string | null;
      website_url: string | null;
      total_vehicles: string;
    }>(
      `SELECT v.id, v.company_name, v.address, v.city, v.country, v.avatar_url, v.company_logo_url,
              v.bio, v.contact_number, v.business_email, v.website_url,
              (SELECT COUNT(*)::text FROM cars c WHERE c.vendor_id = v.id AND c.is_approved = true AND c.is_active = true) AS total_vehicles
       FROM vendors v
       WHERE v.is_approved = true AND (v.is_blocked = false OR v.is_blocked IS NULL)`
    );
    const match = r.rows.find((row) => makeVendorSlug(row.id, row.company_name) === slug.trim());
    if (!match) return null;
    return {
      id: match.id,
      slug: makeVendorSlug(match.id, match.company_name),
      company_name: match.company_name,
      address: [match.address, match.city, match.country].filter(Boolean).join(", ") || "—",
      avatar_url: match.avatar_url ? toPublicUrl(match.avatar_url) : null,
      company_logo_url: match.company_logo_url ? toPublicUrl(match.company_logo_url) : null,
      bio: match.bio,
      contact_number: match.contact_number,
      business_email: match.business_email,
      website_url: match.website_url,
      total_vehicles: parseInt(match.total_vehicles, 10) || 0,
    };
  } finally {
    client.release();
  }
}

export type ApprovedVendorListing = {
  id: string;
  slug: string;
  company_name: string | null;
  address: string;
  total_vehicles: number;
  avatar_url: string | null;
};

/** Fetch all approved (and not blocked) vendors for public dealer listing. */
export async function getApprovedVendorsForListing(): Promise<ApprovedVendorListing[]> {
  const client = await pool.connect();
  try {
    const r = await client.query<{
      id: string;
      company_name: string | null;
      address: string | null;
      city: string | null;
      country: string | null;
      avatar_url: string | null;
      total_vehicles: string;
    }>(
      `SELECT v.id, v.company_name, v.address, v.city, v.country, v.avatar_url,
              (SELECT COUNT(*)::text FROM cars c WHERE c.vendor_id = v.id AND c.is_approved = true AND c.is_active = true) AS total_vehicles
       FROM vendors v
       WHERE v.is_approved = true AND (v.is_blocked = false OR v.is_blocked IS NULL)
       ORDER BY v.company_name ASC NULLS LAST`
    );
    return r.rows.map((row) => ({
      id: row.id,
      slug: makeVendorSlug(row.id, row.company_name),
      company_name: row.company_name,
      address: [row.address, row.city, row.country].filter(Boolean).join(", ") || "—",
      total_vehicles: parseInt(row.total_vehicles, 10) || 0,
      avatar_url: row.avatar_url ? toPublicUrl(row.avatar_url) : null,
    }));
  } finally {
    client.release();
  }
}
