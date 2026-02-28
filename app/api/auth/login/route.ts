import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { signTokenWithJWT, getCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Cookie options for auth token — production-safe behind reverse proxy; no domain. */
function getCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

/** 24 hours — normal login (no "Remember Me"). */
const MAX_AGE_NORMAL = 60 * 60 * 24;
/** 7 days — "Remember Me" login. */
const MAX_AGE_REMEMBER = 60 * 60 * 24 * 7;

function safeRedirectPath(raw: string | null): string {
  if (!raw || typeof raw !== "string") return "/user";
  const path = raw.trim();
  if (!path.startsWith("/") || path.startsWith("//")) return "/user";
  if (path === "/user" || path.startsWith("/user/") || path === "/agent" || path.startsWith("/agent/")) return path;
  return "/user";
}

function loginRedirectPath(params: { error?: string; from?: string }): string {
  const searchParams = new URLSearchParams();

  if (params.error) searchParams.set("error", params.error);
  if (params.from) searchParams.set("from", params.from);

  const query = searchParams.toString();
  return query ? `/login?${query}` : "/login";
}

/** Base URL for redirects — use public site URL so redirects don't go to localhost behind proxy. */
function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (baseUrl) return baseUrl;
  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for login redirects in production.");
  }
  return "http://localhost:3000";
}

/** Middleware matcher is /user and /agent only — this route /api/auth/login is not run through middleware. */
export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const isForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  let email: string;
  let password: string;
  let rememberMe: boolean;
  let redirectTo: string;

  if (isForm) {
    const form = await request.formData();
    email = (form.get("email") as string)?.trim() ?? "";
    password = (form.get("password") as string) ?? "";
    rememberMe = form.get("rememberMe") === "on" || form.get("rememberMe") === "true";
    redirectTo = safeRedirectPath((form.get("redirectTo") as string) ?? null);
  } else {
    try {
      const body = await request.json();
      email = (body.email ?? "").trim();
      password = body.password ?? "";
      rememberMe = !!body.rememberMe;
      redirectTo = safeRedirectPath(body.redirectTo ?? null);
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
  }

  if (!email || !password) {
    if (isForm) {
      return NextResponse.redirect(
        new URL(loginRedirectPath({ error: "Email and password are required." }), getBaseUrl()),
        302
      );
    }
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const emailTrimmed = email.toLowerCase();
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(
      "SELECT id, full_name, email, password_hash, role FROM users WHERE email = $1 AND is_active = true",
      [emailTrimmed]
    );

    if (result.rows.length === 0) {
      if (isForm) {
        return NextResponse.redirect(
          new URL(loginRedirectPath({ error: "Invalid email or password.", from: redirectTo }), getBaseUrl()),
          302
        );
      }
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    const user = result.rows[0];
    const hash = user.password_hash;

    if (hash == null || typeof hash !== "string") {
      if (isForm) {
        return NextResponse.redirect(
          new URL(loginRedirectPath({ error: "Invalid email or password.", from: redirectTo }), getBaseUrl()),
          302
        );
      }
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    const match = await bcrypt.compare(password, hash);
    if (!match) {
      if (isForm) {
        return NextResponse.redirect(
          new URL(loginRedirectPath({ error: "Invalid email or password.", from: redirectTo }), getBaseUrl()),
          302
        );
      }
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    const userId = String(user.id);
    const role = String(user.role);
    const token = signTokenWithJWT(userId, role);
    const maxAge = rememberMe ? MAX_AGE_REMEMBER : MAX_AGE_NORMAL;
    const cookieOptions = getCookieOptions(maxAge);

    const isAdmin = role === "admin";
    const targetPath =
      (isAdmin && (redirectTo === "/agent" || redirectTo.startsWith("/agent/"))) ||
      (!isAdmin && (redirectTo === "/user" || redirectTo.startsWith("/user/")))
        ? redirectTo
        : isAdmin
          ? "/agent"
          : "/user";

    if (isForm) {
      // Single response object: create once, set cookie on it, return it (no new instance after cookie).
      const redirectUrl = new URL(targetPath, getBaseUrl());
      const response = NextResponse.redirect(redirectUrl, 303);

      response.cookies.set(getCookieName(), token, cookieOptions);

      // Debug: confirm the same response we return has Set-Cookie (check in PM2 logs).
      const setCookieHeader = response.headers.get("set-cookie");
      console.log("[LOGIN] Success redirect: same response object returned. Set-Cookie present:", !!setCookieHeader, "| Headers:", Object.fromEntries(response.headers.entries()));

      return response;
    }

    const response = NextResponse.json(
      { token, userId, role, full_name: user.full_name },
      { status: 200, headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", Pragma: "no-cache" } }
    );
    response.cookies.set(getCookieName(), token, cookieOptions);
    return response;
  } catch (err: unknown) {
    console.error("Login API error:", err);
    if (isForm) {
      return NextResponse.redirect(
        new URL(loginRedirectPath({ error: "Login failed. Please try again." }), getBaseUrl()),
        302
      );
    }
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  } finally {
    client?.release();
  }
}
