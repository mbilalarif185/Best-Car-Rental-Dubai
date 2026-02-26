"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AuthMenuButton({ className = "" }: { className?: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <span className={className} style={{ opacity: 0.7 }}>…</span>;
  }

  if (user) {
    return <Link className={className} href="/api/auth/logout">Logout</Link>;
  }

  return <Link className={className} href="/login">Log in</Link>;
}
