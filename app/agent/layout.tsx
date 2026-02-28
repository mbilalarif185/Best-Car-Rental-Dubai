import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import AgentLayoutClient from "@/components/dashboard/AgentLayoutClient";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AgentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "admin") {
    redirect("/user");
  }

  return (
    <Layout footerStyle={1}>
      <AgentLayoutClient>{children}</AgentLayoutClient>
    </Layout>
  );
}
