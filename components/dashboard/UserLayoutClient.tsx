"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserDashboardShell from "./UserDashboardShell";
import { getProfileCompletionPercent, COMPLETION_THRESHOLD } from "@/lib/profileCompletion";
import type { VendorSidebarData } from "@/lib/dashboard";

const TITLES: Record<string, { title: string; breadcrumb: string }> = {
  "/user": { title: "User Dashboard", breadcrumb: "User Dashboard" },
  "/user/profile": { title: "My Profile", breadcrumb: "My Profile" },
  "/user/settings": { title: "Setting", breadcrumb: "Setting" },
  "/user/add-listing": { title: "Add Listing", breadcrumb: "Add Listing" },
  "/user/edit-listing": { title: "Edit Car", breadcrumb: "Edit Car" },
  "/user/listings": { title: "My Listings", breadcrumb: "My Listings" },
};

const LISTING_PATHS = ["/user/add-listing", "/user/listings"];

function isListingPath(path: string) {
  return LISTING_PATHS.includes(path) || path.startsWith("/user/edit-listing/");
}

export default function UserLayoutClient({
  children,
  initialSidebarData,
}: {
  children: React.ReactNode;
  initialSidebarData?: VendorSidebarData | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [guardChecked, setGuardChecked] = useState(false);

  useEffect(() => {
    if (!isListingPath(pathname)) {
      setGuardChecked(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/vendor/profile", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        const full_name = typeof data.full_name === "string" ? data.full_name : "";
        const vendor = res.ok ? (data.vendor ?? null) : null;
        const percent = getProfileCompletionPercent({ full_name, vendor });
        if (percent < COMPLETION_THRESHOLD) {
          router.replace("/user/profile");
          return;
        }
      } catch {
        if (!cancelled) router.replace("/user/profile");
        return;
      }
      if (!cancelled) setGuardChecked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  const titleKey = pathname.startsWith("/user/edit-listing") ? "/user/edit-listing" : pathname;
  const { title, breadcrumb } = TITLES[titleKey] ?? TITLES["/user"];

  if (isListingPath(pathname) && !guardChecked) {
    return (
      <div className="main">
        <section className="box-section background-body pt-80 pb-110 dashboard">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading</span>
                </div>
                <p className="text-muted mt-2 mb-0">Checking profile…</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <UserDashboardShell title={title} breadcrumbLabel={breadcrumb} initialSidebarData={initialSidebarData ?? undefined}>
      {children}
    </UserDashboardShell>
  );
}
