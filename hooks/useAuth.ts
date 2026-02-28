"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export type AuthUser = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export function useAuth() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetch("/api/auth/session", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Refetch session on every route change so header shows correct state after login or when leaving dashboard.
  useEffect(() => {
    refresh();
  }, [pathname, refresh]);

  return { user, loading, refresh };
}

/** Dashboard path by role (same as desktop). */
export function getDashboardHref(role: string): string {
  return role === "admin" ? "/agent" : "/user";
}

/** Dashboard label by role for mobile/UI. */
export function getDashboardLabel(role: string): string {
  switch (role) {
    case "admin":
      return "Admin Dashboard";
    case "dealer":
      return "Dealer Dashboard";
    case "customer":
      return "Customer Dashboard";
    default:
      return "Dashboard";
  }
}
