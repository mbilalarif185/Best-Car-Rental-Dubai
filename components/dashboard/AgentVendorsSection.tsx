"use client";

import { useState, useCallback } from "react";
import type { VendorRow, VendorStatusFilter } from "@/lib/agent-dashboard";

function formatRegDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function CompanyAvatar({
  companyName,
  avatarUrl,
}: {
  companyName: string | null;
  avatarUrl: string | null;
}) {
  const initial = companyName?.trim().charAt(0)?.toUpperCase() ?? "V";
  if (avatarUrl) {
    return (
      <div className="agent-pending-avatar agent-pending-avatar-img">
        <img
          src={avatarUrl}
          alt={companyName ?? "Vendor"}
          className="w-100 h-100 object-fit-cover"
        />
      </div>
    );
  }
  return (
    <span className="agent-pending-avatar d-flex align-items-center justify-content-center bg-primary text-white fw-bold">
      {initial}
    </span>
  );
}

function StatusBadge({ status }: { status: "pending" | "completed" | "canceled" }) {
  const config = {
    pending: { label: "Pending", className: "agent-status-pending" },
    completed: { label: "Approved", className: "agent-status-completed" },
    canceled: { label: "Canceled", className: "agent-status-canceled" },
  };
  const { label, className } = config[status];
  return (
    <span className={className}>
      <i className="fi fi-rr-caret-right" style={{ fontSize: "0.65rem" }} />
      {label}
    </span>
  );
}

function VendorStatusBadge({
  isApproved,
  isBlocked,
}: {
  isApproved: boolean;
  isBlocked?: boolean;
}) {
  if (isBlocked) return <StatusBadge status="canceled" />;
  return <StatusBadge status={isApproved ? "completed" : "pending"} />;
}

const STATUS_OPTIONS: { value: VendorStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "canceled", label: "Cancelled" },
];

export type AgentVendorsSectionInitialData = {
  vendors: VendorRow[];
  total: number;
  page: number;
  totalPages: number;
  status: VendorStatusFilter;
};

export default function AgentVendorsSection({
  initialData,
}: {
  initialData: AgentVendorsSectionInitialData;
}) {
  const [vendors, setVendors] = useState<VendorRow[]>(initialData.vendors);
  const [total, setTotal] = useState(initialData.total);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [status, setStatus] = useState<VendorStatusFilter>(initialData.status);
  const [loading, setLoading] = useState(false);

  const fetchVendors = useCallback(
    async (newStatus: VendorStatusFilter, newPage: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/agent/vendors?status=${newStatus}&page=${newPage}&limit=10`,
          { credentials: "include" }
        );
        if (!res.ok) return;
        const data = await res.json();
        setVendors(data.vendors ?? []);
        setTotal(data.total ?? 0);
        setPage(data.page ?? 1);
        setTotalPages(data.totalPages ?? 1);
        setStatus(newStatus);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as VendorStatusFilter;
    fetchVendors(val, 1);
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    fetchVendors(status, p);
  };

  const show: (number | "ellip")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) show.push(i);
  } else {
    show.push(1);
    if (page > 3) show.push("ellip");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      show.push(i);
    }
    if (page < totalPages - 2) show.push("ellip");
    if (totalPages > 1) show.push(totalPages);
  }
  const seen = new Set<number>();
  const pageNumbers = show.filter((p) => {
    if (p === "ellip") return true;
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });

  return (
    <div className="row mt-3 mt-md-4">
      <div className="col-12">
        <div className="card shadow-none flex-fill">
          <div className="card-header px-2 px-sm-3">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
              <span className="neutral-1000 text-md-bold fs-5">Vendors</span>
              <div className="agent-status-dropdown-wrap">
                <select
                  className="form-select form-select-sm agent-status-dropdown"
                  value={status}
                  onChange={onStatusChange}
                  disabled={loading}
                  aria-label="Filter vendors by status"
                >
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card-body px-2 px-sm-3 overflow-auto">
            {loading && vendors.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-md-medium neutral-500 mb-0">Loading…</p>
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-md-medium neutral-500 mb-0">No vendors found.</p>
              </div>
            ) : (
              <>
                <div className="row g-2 d-md-none">
                  {vendors.map((v) => (
                    <div key={v.id} className="col-6">
                      <div className="card border rounded-2 shadow-sm h-100">
                        <div className="card-body p-2">
                          <div className="d-flex flex-column align-items-center text-center">
                            <CompanyAvatar
                              companyName={v.company_name}
                              avatarUrl={v.avatar_url}
                            />
                            <span className="fw-medium fs-14 text-dark mt-1 text-truncate w-100">
                              {v.company_name ?? "—"}
                            </span>
                            <span className="text-primary-dark fw-medium fs-12">
                              #{v.id.slice(0, 8)}
                            </span>
                            <span className="fs-12 text-body-secondary">
                              {formatRegDate(v.created_at)}
                            </span>
                            <span className="fs-12 neutral-1000">{v.owner_name ?? "—"}</span>
                            <VendorStatusBadge
                              isApproved={v.is_approved}
                              isBlocked={v.is_blocked}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-none d-md-block table-responsive overflow-x-auto">
                  <table
                    className="table datatable table-striped mb-0"
                    style={{ minWidth: 640 }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>ID</th>
                        <th>Company name</th>
                        <th>Reg. date</th>
                        <th>Avatar</th>
                        <th>Owner name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((v) => (
                        <tr key={v.id}>
                          <td>
                            <span className="text-primary-dark fw-medium">
                              #{v.id.slice(0, 8)}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark fw-medium fs-14">
                              {v.company_name ?? "—"}
                            </span>
                          </td>
                          <td className="fs-14 fw-normal neutral-500">
                            {formatRegDate(v.created_at)}
                          </td>
                          <td>
                            <CompanyAvatar
                              companyName={v.company_name}
                              avatarUrl={v.avatar_url}
                            />
                          </td>
                          <td className="neutral-1000">{v.owner_name ?? "—"}</td>
                          <td>
                            <VendorStatusBadge
                              isApproved={v.is_approved}
                              isBlocked={v.is_blocked}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {total > 0 && (
                  <nav className="d-flex flex-column flex-sm-row justify-content-center align-items-center flex-wrap gap-2 mt-3 pt-3 border-top">
                    <span className="fs-14 text-body-secondary">
                      Page {page} of {totalPages} ({total} vendor{total !== 1 ? "s" : ""})
                    </span>
                    <ul className="pagination agent-vendors-pagination mb-0">
                      <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                        <button
                          type="button"
                          className="page-link"
                          aria-label="Previous"
                          onClick={() => goToPage(page - 1)}
                          disabled={page <= 1 || loading}
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      {pageNumbers.map((p) =>
                        p === "ellip" ? (
                          <li key="ellip" className="page-item disabled">
                            <span className="page-link">…</span>
                          </li>
                        ) : (
                          <li
                            key={p}
                            className={`page-item ${p === page ? "active" : ""}`}
                          >
                            <button
                              type="button"
                              className={`page-link ${p === page ? "active" : ""}`}
                              onClick={() => goToPage(p)}
                              disabled={loading}
                            >
                              {p}
                            </button>
                          </li>
                        )
                      )}
                      <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                        <button
                          type="button"
                          className="page-link"
                          aria-label="Next"
                          onClick={() => goToPage(page + 1)}
                          disabled={page >= totalPages || loading}
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
