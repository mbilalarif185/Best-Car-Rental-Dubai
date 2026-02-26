"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/agent", label: "Dashboard", icon: "fi-rr-home" },
  { href: "/agent/approvals", label: "Approvals", icon: "fi-rr-time-check" },
  { href: "/agent/settings", label: "Setting", icon: "fi-rr-settings" },
] as const;

export default function AgentSidebar() {
  const pathname = usePathname();

  return (
    <div className="card user-sidebar agent-sidebar mb-4">
      <div className="card-header user-sidebar-header">
        <div className="profile-content rounded-pill">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              <Link href="/agent/listings" className="item-brand me-2">
                <img
                  className="light-mode"
                  src="/assets/imgs/template/best-car-rental-dubai.webp"
                  alt="Best Car Rental Dubai"
                />
                <img
                  className="dark-mode"
                  src="/assets/imgs/template/best-car-rental-dubai.webp"
                  alt="Best Car Rental Dubai"
                />
              </Link>
              <div>
                <p className="fw-bold fs-5 mb-0">Best Car Rental Dubai</p>
                <span className="fs-14 text-gray-6">Since 2016</span>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-center">
                <Link
                  href="/agent/settings"
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
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="py-2">
                <Link href={href} className={isActive ? "active" : ""}>
                  <i className={`fi ${icon} me-1`} /> {label}
                </Link>
              </li>
            );
          })}
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
