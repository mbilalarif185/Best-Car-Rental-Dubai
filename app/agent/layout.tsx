import type { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import AgentLayoutClient from "@/components/dashboard/AgentLayoutClient";

export const dynamic = "force-dynamic";

export default function AgentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Layout footerStyle={1}>
      <AgentLayoutClient>{children}</AgentLayoutClient>
    </Layout>
  );
}
