import { randomBytes } from "crypto";

/**
 * Generate a URL-friendly slug from arbitrary text.
 * - Lowercase
 * - Replace spaces with hyphens
 * - Remove special characters (keep only a-z, 0-9, hyphen)
 * - Trim duplicate hyphens and leading/trailing hyphens
 */
export function slugify(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "car";
}

/**
 * SEO-friendly car slug format: rent-{car_name}-in-dubai-{company_name}
 * Full URL: /cars/rent-{car_name}-in-dubai-{company_name}
 * Example: rent-audi-rs-q8-in-dubai-best-car-rental
 * "dubai" is hardcoded; vendor cannot manually enter slug.
 */
export function slugifyCarSlug(carName: string, vendorCompany: string): string {
  const carPart = slugify(carName) || "car";
  const vendorPart = slugify(vendorCompany) || "vendor";
  return `rent-${carPart}-in-dubai-${vendorPart}`;
}

/**
 * Generate a short random alphanumeric suffix (e.g. a1b2) for collision handling.
 */
function randomShortSuffix(length = 4): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i]! % chars.length];
  }
  return result;
}

/**
 * Ensure slug is unique against existing slugs. On collision, appends short random suffix (e.g. -a1b2).
 */
export function ensureUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  const set = new Set(existingSlugs.map((s) => s.toLowerCase().trim()));
  const base = baseSlug.toLowerCase().trim();
  if (!set.has(base)) return baseSlug;
  let slug: string;
  let attempts = 0;
  const maxAttempts = 100;
  do {
    slug = `${baseSlug}-${randomShortSuffix(4)}`;
    if (!set.has(slug.toLowerCase())) return slug;
    attempts++;
  } while (attempts < maxAttempts);
  return `${baseSlug}-${randomShortSuffix(4)}`;
}
