import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getAgentDashboardData,
  type VendorStatusFilter,
} from "@/lib/agent-dashboard";
import AgentVendorsSection from "@/components/dashboard/AgentVendorsSection";

export default async function AgentDashboardHomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const session = await getSession();
  if (!session?.user_id) {
    redirect("/login");
  }
  if (session.role !== "admin") {
    redirect("/user");
  }

  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);
  const statusParam = params?.status;
  const status: VendorStatusFilter =
    statusParam === "approved" || statusParam === "all" || statusParam === "canceled"
      ? statusParam
      : "pending";
  const limit = 10;

  const { stats, vendors, vendorsPagination } = await getAgentDashboardData({
    page,
    limit,
    status,
  });

  return (
    <>
      {/* Fancy stats - mobile: 2 per row; tablet+: 4 then 1; desktop: all 5 in two rows */}
      <div className="row g-2 g-md-3">
        <div className="col-6 col-xl-3">
          <div
            className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden"
            style={{ borderLeft: "4px solid var(--bs-primary, #0d6efd)" }}
          >
            <div className="card-body py-3 py-md-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(13, 110, 253, 0.12)",
                  }}
                >
                  <i
                    className="fi fi-rr-car text-primary"
                    style={{ fontSize: "1.35rem" }}
                  />
                </div>
                <span className="text-body-secondary small mb-1">
                  Total Cars
                </span>
                <span className="fw-bold fs-4 text-dark lh-1">
                  {stats.totalCars}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div
            className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden"
            style={{ borderLeft: "4px solid var(--bs-success, #198754)" }}
          >
            <div className="card-body py-3 py-md-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(25, 135, 84, 0.12)",
                  }}
                >
                  <i
                    className="fi fi-rr-building text-success"
                    style={{ fontSize: "1.35rem" }}
                  />
                </div>
                <span className="text-body-secondary small mb-1">
                  Total Vendors
                </span>
                <span className="fw-bold fs-4 text-dark lh-1">
                  {stats.totalVendors}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div
            className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden"
            style={{ borderLeft: "4px solid var(--bs-info, #0dcaf0)" }}
          >
            <div className="card-body py-3 py-md-4">
              <div className="d-flex flex-column">
              <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                  }}
                >
                  <i
                    className="fi fi-rr-gallery text-secondary"
                    style={{ fontSize: "1.35rem" }}
                  />
                </div>
                <span className="text-body-secondary small mb-1">
                  Approved Vendors
                </span>
                <span className="fw-bold fs-4 text-dark lh-1">
                  {stats.approvedVendors}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div
            className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden"
            style={{ borderLeft: "4px solid var(--bs-warning, #ffc107)" }}
          >
            <div className="card-body py-3 py-md-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                  }}
                >
                  <i
                    className="fi fi-rr-time-check text-warning"
                    style={{ fontSize: "1.35rem" }}
                  />
                </div>
                <span className="text-body-secondary small mb-1">
                  Pending Approval
                </span>
                <span className="fw-bold fs-4 text-dark lh-1">
                  {stats.pendingVendors}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <AgentVendorsSection
        initialData={{
          vendors,
          total: vendorsPagination.total,
          page: vendorsPagination.page,
          totalPages: vendorsPagination.totalPages,
          status,
        }}
      />
    </>
  );
}
