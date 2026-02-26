"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthMenuButton({ className = "" }: { className?: string }) {
  const [user, setUser] = useState<{ id: string; full_name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <span className={className} style={{ opacity: 0.7 }}>…</span>;
  }

  if (user) {
    return <Link className={className} href="/api/auth/logout">Logout</Link>;
  }

  return <Link className={className} href="/login">Log in</Link>;
}
