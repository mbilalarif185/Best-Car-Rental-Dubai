/**
 * Image upload config and helpers.
 * Store files under public/uploads/; DB stores relative path (no leading slash).
 */

import path from "path";
import fs from "fs/promises";

export const ALLOWED_MIMES = ["image/png", "image/jpeg", "image/webp"] as const;
export const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const EXT_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
};

/**
 * Validate file: MIME and size. Returns error message or null.
 */
export function validateImageFile(file: File): string | null {
  if (!ALLOWED_MIMES.includes(file.type as (typeof ALLOWED_MIMES)[number])) {
    return "Allowed formats: PNG, JPEG, WebP.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "File too large. Max 5MB.";
  }
  return null;
}

/**
 * Get safe file extension from MIME or original name.
 */
export function getExtension(file: File): string {
  const ext = EXT_BY_MIME[file.type];
  if (ext) return ext;
  const name = file.name || "";
  const i = name.lastIndexOf(".");
  if (i >= 0) {
    const e = name.slice(i).toLowerCase();
    if ([".png", ".jpg", ".jpeg", ".webp"].includes(e)) return e;
  }
  return ".webp";
}

/**
 * Resolve absolute filesystem path under project public dir.
 * subpath must be relative (e.g. "uploads/vendors/avatars").
 */
export function resolvePublicPath(...subpath: string[]): string {
  const joined = path.join("public", ...subpath);
  const normalized = path.normalize(joined);
  if (normalized.startsWith("..") || path.isAbsolute(normalized)) {
    throw new Error("Invalid path");
  }
  return path.join(process.cwd(), normalized);
}

/**
 * Ensure directory exists (recursive). Throws on error.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Write buffer to file. Throws on error.
 */
export async function writeFile(filePath: string, buffer: Buffer): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, buffer);
}

/**
 * Normalize stored path: no leading slash, no backslashes.
 * Use when saving to DB.
 */
export function toStoredPath(relativeOrAbsolute: string): string {
  const s = relativeOrAbsolute.replace(/\\/g, "/").trim();
  return s.startsWith("/") ? s.slice(1) : s;
}

/**
 * Path for browser: always has leading slash.
 * Use for API response so frontend can set img src directly.
 */
export function toPublicUrl(storedPath: string): string {
  const s = storedPath.replace(/\\/g, "/").trim();
  return s.startsWith("/") ? s : `/${s}`;
}
