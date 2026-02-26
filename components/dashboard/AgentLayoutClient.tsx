"use client";

import { usePathname } from "next/navigation";
import AgentDashboardShell from "./AgentDashboardShell";

const TITLES: Record<string, { title: string; breadcrumb: string }> = {
  "/agent": { title: "Agent Dashboard", breadcrumb: "Agent Dashboard" },
  "/agent/approvals": { title: "Approvals", breadcrumb: "Approvals" },
  "/agent/listings": { title: "Listings", breadcrumb: "Listings" },
  "/agent/add-listing": { title: "Add Listing", breadcrumb: "Add Listing" },
  "/agent/earnings": { title: "Earning", breadcrumb: "Earning" },
  "/agent/settings": { title: "Setting", breadcrumb: "Setting" },
};

export default function AgentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { title, breadcrumb } =
    TITLES[pathname] ?? TITLES["/agent"];

  return (
    <AgentDashboardShell title={title} breadcrumbLabel={breadcrumb}>
      {children}
    </AgentDashboardShell>
  );
}
