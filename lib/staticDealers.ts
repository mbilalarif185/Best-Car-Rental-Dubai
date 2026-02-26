import type { ApprovedVendorListing } from "@/lib/cars";
import type { VendorDetailsForDealer } from "@/lib/cars";
import type { Car } from "@/types/type";

import dealersData from "@/util/dealers.json";
import carsJson from "@/util/cars.json";

type DealerEntry = {
  slug: string;
  company_name: string;
  address: string;
  avatar_url: string | null;
  company_logo_url: string | null;
  bio: string | null;
  contact_number: string | null;
  business_email: string | null;
  website_url: string | null;
  car_slugs: string[];
};

const dealers = dealersData as DealerEntry[];
const carsFromJson = carsJson as (Car & { slug: string })[];

/** Static dealers from JSON for listing (same shape as DB vendors). */
export function getStaticDealers(): ApprovedVendorListing[] {
  return dealers.map((d) => ({
    id: `static-${d.slug}`,
    slug: d.slug,
    company_name: d.company_name,
    address: d.address,
    total_vehicles: d.car_slugs?.length ?? 0,
    avatar_url: d.avatar_url ?? null,
  }));
}

/** Full details for a static dealer by slug. Returns null if not found. */
export function getStaticDealerDetailsBySlug(slug: string): VendorDetailsForDealer | null {
  const d = dealers.find((x) => x.slug === slug?.trim());
  if (!d) return null;
  return {
    id: `static-${d.slug}`,
    slug: d.slug,
    company_name: d.company_name,
    address: d.address,
    avatar_url: d.avatar_url ?? null,
    company_logo_url: d.company_logo_url ?? null,
    bio: d.bio ?? null,
    contact_number: d.contact_number ?? null,
    business_email: d.business_email ?? null,
    website_url: d.website_url ?? null,
    total_vehicles: d.car_slugs?.length ?? 0,
  };
}

/** Cars from cars.json for a static dealer (by car_slugs). Returns Car[] for CarsListing4. */
export function getCarsForStaticDealer(slug: string): Car[] {
  const d = dealers.find((x) => x.slug === slug?.trim());
  if (!d?.car_slugs?.length) return [];
  const slugSet = new Set(d.car_slugs.map((s) => s.trim().toLowerCase()));
  return carsFromJson.filter((c) => slugSet.has((c.slug ?? "").trim().toLowerCase()));
}
