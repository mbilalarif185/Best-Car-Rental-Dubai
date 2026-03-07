import type { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import UserLayoutClient from "@/components/dashboard/UserLayoutClient";
import { getSession } from "@/lib/auth";
import { getVendorSidebarData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  const initialSidebarData =
    session?.user_id != null
      ? await getVendorSidebarData(session.user_id)
      : null;

  return (
    <Layout footerStyle={1}>
      <UserLayoutClient initialSidebarData={initialSidebarData}>
        {children}
      </UserLayoutClient>
    </Layout>
  );
}
