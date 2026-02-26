/**
 * Profile completion calculation for vendor/user profile.
 * Used on profile page (progress bar) and sidebar (show/hide listing options).
 * 80% threshold: listing options (Add Listing, My Listings) only shown when completion >= 80%.
 */

export type ProfileData = {
  full_name?: string | null;
  vendor?: {
    company_name?: string | null;
    business_email?: string | null;
    contact_number?: string | null;
    bio?: string | null;
    country?: string | null;
    city?: string | null;
    address?: string | null;
    avatar_url?: string | null;
    company_logo_url?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
    youtube_url?: string | null;
  } | null;
};

const TOTAL_CRITERIA = 12;
const COMPLETION_THRESHOLD = 80;

function filled(s: string | null | undefined): boolean {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * Returns completion percentage 0–100.
 * Criteria: full_name, company_name, business_email, contact_number, bio,
 * country, city, address, avatar or logo, facebook_url, instagram_url, youtube_url.
 */
export function getProfileCompletionPercent(data: ProfileData): number {
  let count = 0;
  if (filled(data.full_name)) count++;
  const v = data.vendor;
  if (!v) return Math.round((count / TOTAL_CRITERIA) * 100);
  if (filled(v.company_name)) count++;
  if (filled(v.business_email)) count++;
  if (filled(v.contact_number)) count++;
  if (filled(v.bio)) count++;
  if (filled(v.country)) count++;
  if (filled(v.city)) count++;
  if (filled(v.address)) count++;
  if (filled(v.avatar_url) || filled(v.company_logo_url)) count++;
  if (filled(v.facebook_url)) count++;
  if (filled(v.instagram_url)) count++;
  if (filled(v.youtube_url)) count++;
  return Math.min(100, Math.round((count / TOTAL_CRITERIA) * 100));
}

export function isProfileCompleteEnough(data: ProfileData): boolean {
  return getProfileCompletionPercent(data) >= COMPLETION_THRESHOLD;
}

export { COMPLETION_THRESHOLD };
