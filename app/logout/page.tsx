"use client";

import { useEffect } from "react";

/**
 * /logout - client redirect to API which clears session cookie and redirects to /
 * Client component avoids "Unsupported Server Component type" during static generation.
 */
export default function LogoutPage() {
  useEffect(() => {
    window.location.href = "/api/auth/logout";
  }, []);
  return (
    <div className="container py-5 text-center">
      <p className="text-md-medium neutral-500">Signing out…</p>
    </div>
  );
}
