"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** Dashboard path by role: vendor → /user, admin → /agent */
function getDashboardHref(role: string): string {
  return role === "admin" ? "/agent" : "/user";
}

type Props = {
  /** Optional class for the <li> (e.g. "color-white" for header style) */
  liClassName?: string;
  /** Optional class for the Link (e.g. "color-white") */
  linkClassName?: string;
};

/**
 * Renders a "Dashboard" menu item only when user is logged in.
 * Use inside the main nav <ul> alongside Home, About Us, etc.
 */
export default function DashboardNavItem({ liClassName = "", linkClassName = "" }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
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

  if (loading || !user) return null;

  const href = getDashboardHref(user.role);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(href);
  };

  return (
    <li className={liClassName} style={{ position: "relative", zIndex: 99 }}>
      <Link
        className={linkClassName}
        href={href}
        onClick={handleClick}
        style={{ display: "block", pointerEvents: "auto", cursor: "pointer" }}
      >
        Dashboard
      </Link>
    </li>
  );
}
