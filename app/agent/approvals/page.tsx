import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAgentVendorsList } from "@/lib/agent-dashboard";
import { getAgentCarsList } from "@/lib/agent-approvals";
import AgentApprovalsVendorsSection from "@/components/dashboard/AgentApprovalsVendorsSection";
import AgentApprovalsCarsSection from "@/components/dashboard/AgentApprovalsCarsSection";

export const dynamic = "force-dynamic";

export default async function AgentApprovalsPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  const [vendorsResult, carsResult] = await Promise.all([
    getAgentVendorsList({ page: 1, limit: 10, status: "all" }),
    getAgentCarsList({ page: 1, limit: 10, status: "pending" }),
  ]);

  return (
    <>
      <div className="mb-4">
        <h1 className="h3 mb-1 fw-bold text-dark">Approvals</h1>
        <p className="text-body-secondary mb-0 small">Manage vendor and car listing approvals.</p>
      </div>
      <div className="row g-4">
        <div className="col-12">
          <AgentApprovalsVendorsSection
            initialData={{
              vendors: vendorsResult.vendors,
              total: vendorsResult.total,
              page: vendorsResult.page,
              totalPages: vendorsResult.totalPages,
              status: "all",
            }}
          />
        </div>
        <div className="col-12">
          <AgentApprovalsCarsSection
            initialData={{
              cars: carsResult.cars,
              total: carsResult.total,
              page: carsResult.page,
              totalPages: carsResult.totalPages,
              status: "pending",
            }}
          />
        </div>
      </div>
    </>
  );
}
