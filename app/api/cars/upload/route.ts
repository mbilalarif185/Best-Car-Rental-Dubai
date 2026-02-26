import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { randomUUID } from "crypto";
import {
  validateImageFile,
  getExtension,
  resolvePublicPath,
  writeFile,
  toPublicUrl,
} from "@/lib/uploads";

export const dynamic = "force-dynamic";

const CAR_UPLOADS_BASE = "uploads/cars";

/**
 * Sanitize segment for use in path (vendorId, carId). Prevents directory traversal.
 */
function sanitizeSegment(value: string): string | null {
  const s = value.trim();
  if (!s || s.length > 100) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(s)) return null;
  return s;
}

/**
 * POST /api/cars/upload
 * FormData: "image" (file), "carId" (string, required)
 * Saves to public/uploads/cars/{vendorId}/{carId}/image-uuid.ext
 * vendorId = logged-in user_id (vendor can only upload for own cars).
 * Returns { path: "/uploads/cars/vendorId/carId/uuid.ext" }
 * DB should store: uploads/cars/vendorId/carId/uuid.ext
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("image");
    const carIdRaw = formData.get("carId");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Send one file as 'image'." },
        { status: 400 }
      );
    }

    const carId = typeof carIdRaw === "string" ? sanitizeSegment(carIdRaw) : null;
    if (!carId) {
      return NextResponse.json(
        { error: "Valid 'carId' is required (alphanumeric, hyphen, underscore)." },
        { status: 400 }
      );
    }

    const validationError = validateImageFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const vendorId = session.user_id;
    const ext = getExtension(file);
    const filename = `${randomUUID()}${ext}`;
    const relativePath = `${CAR_UPLOADS_BASE}/${vendorId}/${carId}/${filename}`;

    const absolutePath = resolvePublicPath(relativePath);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(absolutePath, buffer);

    const publicPath = toPublicUrl(relativePath);
    return NextResponse.json({ path: publicPath });
  } catch (err) {
    console.error("Car image upload error:", err);
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}
