"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfileCompletionPercent, COMPLETION_THRESHOLD } from "@/lib/profileCompletion";

const DEFAULT_AVATAR = "/assets/imgs/template/best-car-rental-dubai.webp";

function imageSrc(url: string | null | undefined): string {
  if (!url) return "";
  return url.startsWith("/") ? url : `/${url}`;
}

export default function UserSidebar() {
  const [completionPercent, setCompletionPercent] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/vendor/profile", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        const full_name = typeof data.full_name === "string" ? data.full_name : "";
        const vendor = res.ok ? (data.vendor ?? null) : null;
        setCompanyName(vendor?.company_name?.trim() ?? "");
        setAvatarUrl(vendor?.avatar_url?.trim() ?? "");
        setCompletionPercent(getProfileCompletionPercent({ full_name, vendor }));
      } catch {
        if (!cancelled) setCompletionPercent(0);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const showListingOptions = completionPercent !== null && completionPercent >= COMPLETION_THRESHOLD;
  const avatarSrc = imageSrc(avatarUrl) || DEFAULT_AVATAR;

  return (
    <div className="card user-sidebar user-dashboard-sidebar mb-4">
      <div className="card-header user-sidebar-header">
        <div className="profile-content rounded-pill">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              <img
                src={avatarSrc}
                alt=""
                className="image-avatar-2 user-sidebar-avatar flex-shrink-0 me-2 me-sm-3 rounded-2 overflow-hidden"
              />
              <div className="min-w-0">
                <p className="fw-bold fs-5 mb-0">{companyName || "Best Car Rental Dubai"}</p>
                {completionPercent !== null && (
                  <span className="fs-14 text-gray-6">Profile {completionPercent}% complete</span>
                )}
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-center">
                <Link
                  href="/user/settings"
                  className="p-1 rounded-circle align-items-center justify-content-center btn-edit"
                >
                  <i className="fi fi-rr-pencil fs-7" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body user-sidebar-body">
        <ul className="dashboard-sidebar-menu">
          <li className="py-2">
            <Link href="/user">
              <i className="fi fi-rr-home me-1" /> Dashboard
            </Link>
          </li>
          {showListingOptions && (
            <>
              <li className="py-2">
                <Link href="/user/add-listing">
                  <i className="fi fi-rr-heart me-1" /> Add Listing
                </Link>
              </li>
              <li className="py-2">
                <Link href="/user/listings">
                  <i className="fi fi-rr-money me-1" /> My Listings
                </Link>
              </li>
            </>
          )}
          <li className="py-2">
            <Link href="/user/profile">
              <i className="fi fi-rr-user me-1" /> My Profile
            </Link>
          </li>
          <li className="py-2">
            <Link href="/user/settings">
              <i className="fi fi-rr-settings me-1" /> Setting
            </Link>
          </li>
          <li className="py-2">
            <Link href="/api/auth/logout">
              <i className="fi fi-rr-sign-out me-1" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
