import type { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import AgentLayoutClient from "@/components/dashboard/AgentLayoutClient";

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
