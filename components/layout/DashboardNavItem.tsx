"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, getDashboardHref } from "@/hooks/useAuth";

type Props = {
  liClassName?: string;
  linkClassName?: string;
};

export default function DashboardNavItem({ liClassName = "", linkClassName = "" }: Props) {
  const router = useRouter();
  const { user, loading } = useAuth();

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
