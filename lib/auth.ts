import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("Production requires JWT_SECRET environment variable.");
}

const COOKIE_NAME = "token";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined. Set it in production environment.");
}
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = "bcr-car-hire";
const JWT_AUDIENCE = "bcr-web";
const JWT_EXPIRES_IN = "7d";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

// For Edge middleware (jose); secret as Uint8Array for jose
const JWT_SECRET_BYTES = new TextEncoder().encode(JWT_SECRET);

export type JWTPayload = {
  userId?: string;
  sub?: string;
  role: string;
  iat?: number;
  exp?: number;
};

export function getCookieName(): string {
  return COOKIE_NAME;
}

/**
 * Sign JWT using jsonwebtoken (Node). Payload: { userId, role }, expires in 7 days.
 * Use for login API response.
 */
export function signTokenWithJWT(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
}

/**
 * Verify JWT in Edge middleware using jose. Accepts tokens signed by signTokenWithJWT.
 */
export async function verifyToken(token: string): Promise<{ user_id: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_BYTES, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    const userId = (payload.userId as string) || (payload.sub as string);
    if (!userId || typeof userId !== "string") return null;
    const role = (payload.role as string) ?? "vendor";
    return { user_id: userId, role };
  } catch {
    return null;
  }
}

/** Get session from request cookie (API routes / server components). */
export async function getSession(): Promise<{ user_id: string; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  return { user_id: payload.user_id, email: "", role: payload.role };
}

/** Get token from request (Edge middleware). */
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
