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

/** Actions as select dropdown (same style as All/Pending filter) */
function VendorActionsSelect({
  vendor,
  updatingId,
  onAction,
}: {
  vendor: VendorRow;
  updatingId: string | null;
  onAction: (vendorId: string, is_approved?: boolean, is_blocked?: boolean) => void;
}) {
  const busy = updatingId === vendor.id;
  const isBlocked = !!vendor.is_blocked;
  const isApproved = !!vendor.is_approved;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    e.target.value = ""; // reset to placeholder
    if (value === "approve") onAction(vendor.id, true, false);
    else if (value === "reject") onAction(vendor.id, undefined, true);
    else if (value === "unblock") onAction(vendor.id, undefined, false);
  };

  return (
    <select
      className="form-select form-select-sm agent-status-dropdown"
      value=""
      onChange={handleChange}
      disabled={busy}
      aria-label="Vendor actions"
      style={{ minWidth: 120 }}
    >
      <option value="">{busy ? "Updating…" : "Actions"}</option>
      {!isApproved && <option value="approve">Approve</option>}
      {!isBlocked && <option value="reject">Reject / Block</option>}
      {isBlocked && <option value="unblock">Unblock</option>}
      {isApproved && isBlocked && <option value="approve">Approve</option>}
    </select>
  );
}

const STATUS_OPTIONS: { value: VendorStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "canceled", label: "Cancelled" },
];

export type AgentApprovalsVendorsInitialData = {
  vendors: VendorRow[];
  total: number;
  page: number;
  totalPages: number;
  status: VendorStatusFilter;
};

export default function AgentApprovalsVendorsSection({
  initialData,
}: {
  initialData: AgentApprovalsVendorsInitialData;
}) {
  const [vendors, setVendors] = useState<VendorRow[]>(initialData.vendors);
  const [total, setTotal] = useState(initialData.total);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [status, setStatus] = useState<VendorStatusFilter>(initialData.status);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchVendors = useCallback(
    async (newStatus: VendorStatusFilter, newPage: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/agent/vendors?status=${newStatus}&page=${newPage}&limit=10`,
          { credentials: "include", cache: "no-store" }
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

  const updateVendorStatus = useCallback(
    async (vendorId: string, is_approved?: boolean, is_blocked?: boolean, listing_limit?: number) => {
      setUpdatingId(vendorId);
      try {
        const body: { is_approved?: boolean; is_blocked?: boolean; listing_limit?: number } = {};
        if (is_approved !== undefined) body.is_approved = is_approved;
        if (is_blocked !== undefined) body.is_blocked = is_blocked;
        if (listing_limit !== undefined) body.listing_limit = listing_limit;
        const res = await fetch(`/api/agent/vendors/${vendorId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          const limit = data.listing_limit;
          const limitNum =
            typeof limit === "number" ? limit : typeof limit === "string" ? parseInt(limit, 10) : undefined;
          if (limitNum !== undefined && !Number.isNaN(limitNum)) {
            setVendors((prev) =>
              prev.map((u) => (u.id === vendorId ? { ...u, listing_limit: limitNum } : u))
            );
          }
          await fetchVendors(status, page);
        } else {
          console.error("Failed to update vendor:", (data as { error?: string }).error || res.statusText);
        }
      } finally {
        setUpdatingId(null);
      }
    },
    [status, page, fetchVendors]
  );

  const updateListingLimit = useCallback(
    async (vendorId: string, value: number) => {
      const limit = Math.min(200, Math.max(1, value));
      await updateVendorStatus(vendorId, undefined, undefined, limit);
    },
    [updateVendorStatus]
  );

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchVendors(e.target.value as VendorStatusFilter, 1);
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    fetchVendors(status, p);
  };

  const pageNumbers: (number | "ellip")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("ellip");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pageNumbers.push(i);
    }
    if (page < totalPages - 2) pageNumbers.push("ellip");
    if (totalPages > 1) pageNumbers.push(totalPages);
  }
  const seen = new Set<number>();
  const filteredPages = pageNumbers.filter((p) => {
    if (p === "ellip") return true;
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });

  return (
    <div className="col-12">
      <div className="card border-0 rounded-4 shadow-sm flex-fill overflow-hidden">
        <div className="card-header bg-light border-0 py-3 px-3 px-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <span className="fw-semibold fs-5 text-dark">Vendors</span>
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
        <div className="card-body p-3 p-md-4">
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
              <div className="row g-3 d-md-none">
                {vendors.map((v) => (
                  <div key={v.id} className="col-12 col-sm-6 col-lg-4">
                    <div className="card border rounded-3 shadow-sm h-100">
                      <div className="card-body p-3">
                        <div className="d-flex flex-column align-items-center text-center">
                          <CompanyAvatar companyName={v.company_name} avatarUrl={v.avatar_url} />
                          <span className="fw-medium text-dark mt-2 text-truncate w-100">
                            {v.company_name ?? "—"}
                          </span>
                          <span className="small text-body-secondary">{formatRegDate(v.created_at)}</span>
                          <span className="small text-dark">{v.owner_name ?? "—"}</span>
                          <VendorStatusBadge isApproved={v.is_approved} isBlocked={v.is_blocked} />
                          <div className="d-flex align-items-center gap-1 mt-1 small">
                            <span className="text-body-secondary">Car limit:</span>
                            <input
                              type="number"
                              min={1}
                              max={200}
                              className="form-control form-control-sm text-center"
                              style={{ width: 60 }}
                              value={v.listing_limit ?? 10}
                              disabled={updatingId === v.id}
                              onChange={(e) => {
                                const raw = e.target.value;
                                const n = raw === "" ? null : parseInt(raw, 10);
                                if (n === null || (!Number.isNaN(n) && n >= 1 && n <= 200)) {
                                  setVendors((prev) =>
                                    prev.map((u) => (u.id === v.id ? { ...u, listing_limit: n ?? 10 } : u))
                                  );
                                }
                              }}
                              onBlur={(e) => {
                                const raw = e.target.value.trim();
                                const n = raw === "" ? 10 : parseInt(raw, 10);
                                if (!Number.isNaN(n) && n >= 1 && n <= 200) {
                                  updateListingLimit(v.id, n);
                                }
                              }}
                              aria-label="Car listing limit"
                            />
                          </div>
                          <div className="mt-2">
                            <VendorActionsSelect
                              vendor={v}
                              updatingId={updatingId}
                              onAction={updateVendorStatus}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-none d-md-block w-100 overflow-visible">
                <table className="table table-hover align-middle mb-0 w-100 agent-approvals-table">
                  <thead>
                    <tr className="table-light">
                      <th className="py-2">Company</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Avatar</th>
                      <th className="py-2">Owner</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Car limit</th>
                      <th className="py-2 text-end text-nowrap" style={{ minWidth: 90 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <span className="fw-medium text-dark">{v.company_name ?? "—"}</span>
                        </td>
                        <td className="text-body-secondary">{formatRegDate(v.created_at)}</td>
                        <td>
                          <CompanyAvatar companyName={v.company_name} avatarUrl={v.avatar_url} />
                        </td>
                        <td>{v.owner_name ?? "—"}</td>
                        <td>
                          <VendorStatusBadge isApproved={v.is_approved} isBlocked={v.is_blocked} />
                        </td>
                        <td>
                          <input
                            type="number"
                            min={1}
                            max={200}
                            className="form-control form-control-sm text-center"
                            style={{ width: 72 }}
                            value={v.listing_limit ?? 10}
                            disabled={updatingId === v.id}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const n = raw === "" ? null : parseInt(raw, 10);
                              if (n === null || (!Number.isNaN(n) && n >= 1 && n <= 200)) {
                                setVendors((prev) =>
                                  prev.map((u) => (u.id === v.id ? { ...u, listing_limit: n ?? 10 } : u))
                                );
                              }
                            }}
                            onBlur={(e) => {
                              const raw = e.target.value.trim();
                              const n = raw === "" ? 10 : parseInt(raw, 10);
                              if (!Number.isNaN(n) && n >= 1 && n <= 200) {
                                updateListingLimit(v.id, n);
                              }
                            }}
                            aria-label="Car listing limit"
                          />
                        </td>
                        <td className="text-end text-nowrap" style={{ minWidth: 90 }}>
                          <VendorActionsSelect
                            vendor={v}
                            updatingId={updatingId}
                            onAction={updateVendorStatus}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {total > 0 && (
                <nav className="d-flex flex-column flex-sm-row justify-content-center align-items-center flex-wrap gap-2 mt-4 pt-4 border-top">
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
                        &laquo;
                      </button>
                    </li>
                    {filteredPages.map((p) =>
                      p === "ellip" ? (
                        <li key="ellip" className="page-item disabled">
                          <span className="page-link">…</span>
                        </li>
                      ) : (
                        <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
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
                        &raquo;
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
  );
}
