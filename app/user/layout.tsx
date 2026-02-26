import type { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import UserLayoutClient from "@/components/dashboard/UserLayoutClient";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Layout footerStyle={1}>
      <UserLayoutClient>{children}</UserLayoutClient>
    </Layout>
  );
}
