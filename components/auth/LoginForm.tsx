"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/user";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      });
      let data: { error?: string; role?: string } = {};
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          data = { error: "Invalid response from server." };
        }
      }
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      // Redirect by role: admin → /agent, others → /user (respect "from" when it matches role)
      const role = data.role ?? "vendor";
      const isAdmin = role === "admin";
      const targetPath =
        isAdmin
          ? (from.startsWith("/agent") ? from : "/agent")
          : (from.startsWith("/user") ? from : "/user");
      router.push(targetPath);
      router.refresh();
    } catch (e) {
      console.error("Login request error:", e);
      setError("Login failed. Please try again.");
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
              <input className="cb-remember" type="checkbox" /> Remember me
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
      <p className="text-md-medium neutral-500 text-center">Or connect with your social account</p>
      <div className="box-button-logins">
        <Link className="btn btn-login btn-google mr-10" href="#">
          <img src="/assets/imgs/template/popup/google.svg" alt="Carento" />
          <span className="text-sm-bold">Sign up with Google</span>
        </Link>
        <Link className="btn btn-login mr-10" href="#">
          <img src="/assets/imgs/template/popup/facebook.svg" alt="Carento" />
        </Link>
        <Link className="btn btn-login" href="#">
          <img src="/assets/imgs/template/popup/apple.svg" alt="Carento" />
        </Link>
      </div>
      <p className="text-sm-medium neutral-500 text-center mt-70">
        Don't have an account? <Link className="neutral-1000" href="/register">Register Here !</Link>
      </p>
    </form>
  );
}
