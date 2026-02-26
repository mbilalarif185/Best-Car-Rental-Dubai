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

const RELATIVE_DIR_AVATARS = "uploads/vendors/avatars";
const RELATIVE_DIR_LOGOS = "uploads/vendors/logos";

type UploadType = "avatar" | "logo";

function getDir(type: UploadType): string {
  return type === "avatar" ? RELATIVE_DIR_AVATARS : RELATIVE_DIR_LOGOS;
}

/**
 * POST /api/vendor/upload
 * FormData: "avatar" (file) OR "logo" (file)
 * Saves to public/uploads/vendors/avatars/ or .../logos/
 * Returns { path: "/uploads/vendors/avatars/uuid.ext" } for img src.
 * DB should store path without leading slash: uploads/vendors/avatars/uuid.ext
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user_id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const avatarFile = formData.get("avatar");
    const logoFile = formData.get("logo");

    let file: File | null = null;
    let type: UploadType | null = null;

    if (avatarFile instanceof File && avatarFile.size > 0) {
      file = avatarFile;
      type = "avatar";
    } else if (logoFile instanceof File && logoFile.size > 0) {
      file = logoFile;
      type = "logo";
    }

    if (!file || !type) {
      return NextResponse.json(
        { error: "Send one file as 'avatar' or 'logo'." },
        { status: 400 }
      );
    }

    const validationError = validateImageFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const ext = getExtension(file);
    const filename = `${randomUUID()}${ext}`;
    const relativeDir = getDir(type);
    const relativePath = `${relativeDir}/${filename}`;

    const absolutePath = resolvePublicPath(relativePath);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(absolutePath, buffer);

    const publicPath = toPublicUrl(relativePath);
    return NextResponse.json({ path: publicPath });
  } catch (err) {
    console.error("Vendor upload error:", err);
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}
