"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/** Wait until server sees the session cookie (poll /api/auth/session). Max ~4s. */
async function waitForSession(): Promise<void> {
  const maxAttempts = 20;
  const intervalMs = 200;
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch("/api/auth/session", { credentials: "include", cache: "no-store" });
    const data = await res.json().catch(() => ({ user: null }));
    if (data?.user) return;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/user";
  const errorFromUrl = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorFromUrl) {
      setError(decodeURIComponent(errorFromUrl));
    }
  }, [errorFromUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
          redirectTo: from,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const redirectTo = (data.redirectTo as string) || "/user";
        await waitForSession();
        await new Promise((r) => setTimeout(r, 300));
        // Navigate via form GET so the browser sends the cookie on the first load (avoids router/full-URL issues).
        const form = document.createElement("form");
        form.method = "GET";
        form.action = redirectTo.startsWith("http") ? redirectTo : `${window.location.origin}${redirectTo}`;
        document.body.appendChild(form);
        form.submit();
        return;
      }
      setError((data.error as string) ?? "Login failed. Please try again.");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="form-group">
          <p className="text-danger text-sm-medium">{error}</p>
        </div>
      )}
      <div className="form-group">
        <input
          className="form-control username"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control password"
          type="password"
          name="password"
          placeholder="****************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="box-remember-forgot">
          <div className="remeber-me">
            <label className="text-xs-medium neutral-500">
              <input
                className="cb-remember"
                type="checkbox"
                name="rememberMe"
                value="on"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </label>
          </div>
          <div className="forgotpass">
            <Link className="text-xs-medium neutral-500" href="#">Forgot password?</Link>
          </div>
        </div>
      </div>
      <div className="form-group mb-30">
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="text-md-medium neutral-500 text-center mt-70">
        Don&apos;t have an account? <Link className="neutral-1000" href="/register">Register Here !</Link>
      </p>
    </form>
  );
}
