import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

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

// JWT_SECRET is base64-encoded; decode to raw bytes for HMAC (sign and verify must use same key).
const JWT_SECRET_BUFFER = Buffer.from(JWT_SECRET!, "base64");
const JWT_SECRET_BYTES = new Uint8Array(JWT_SECRET_BUFFER);

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
 * Sign JWT using jsonwebtoken (Node only). Payload: { userId, role }, expires in 7 days.
 * Used by login API route (Node runtime). Middleware does NOT run in Node and does NOT call this.
 */
export function signTokenWithJWT(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    JWT_SECRET_BUFFER,
    {
      expiresIn: JWT_EXPIRES_IN,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
}

/**
 * Verify JWT using jose (Edge-compatible). Accepts tokens signed by signTokenWithJWT.
 * Used by getSession() (RSC/API in Node) and can run in Edge. Does NOT use jsonwebtoken.
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
  } catch (err) {
    console.error("[AUTH] JWT verification failed:", err instanceof Error ? err.message : String(err), "| token length:", token?.length ?? 0);
    return null;
  }
}

/** Get session from request cookie or x-auth-token header (set by middleware). */
export async function getSession(): Promise<{ user_id: string; email: string; role: string } | null> {
  const headersList = await headers();
  const tokenFromHeader = headersList.get("x-auth-token");
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get(COOKIE_NAME)?.value;
  const token = tokenFromHeader ?? tokenFromCookie;
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
