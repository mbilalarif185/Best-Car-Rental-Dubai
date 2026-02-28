"use client";

import { useState, useCallback } from "react";
import type { PendingCarRow, CarStatusFilter } from "@/lib/agent-approvals";

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

function StatusBadge({ status }: { status: "pending" | "completed" }) {
  const config = {
    pending: { label: "Pending", className: "agent-status-pending" },
    completed: { label: "Approved", className: "agent-status-completed" },
  };
  const { label, className } = config[status];
  return (
    <span className={className}>
      <i className="fi fi-rr-caret-right" style={{ fontSize: "0.65rem" }} />
      {label}
    </span>
  );
}

/** Actions as select dropdown (same style as All/Pending filter) */
function CarActionsSelect({
  car,
  updatingId,
  onAction,
}: {
  car: PendingCarRow;
  updatingId: string | null;
  onAction: (carId: string, is_approved?: boolean) => void;
}) {
  const busy = updatingId === car.id;
  const isApproved = !!car.is_approved;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    e.target.value = ""; // reset to placeholder
    if (value === "approve") onAction(car.id, true);
    else if (value === "reject") onAction(car.id, false);
  };

  return (
    <select
      className="form-select form-select-sm agent-status-dropdown"
      value=""
      onChange={handleChange}
      disabled={busy}
      aria-label="Car actions"
      style={{ minWidth: 120 }}
    >
      <option value="">{busy ? "Updating…" : "Actions"}</option>
      {!isApproved && <option value="approve">Approve</option>}
      <option value="reject">Reject</option>
    </select>
  );
}

const STATUS_OPTIONS: { value: CarStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
];

export type AgentApprovalsCarsInitialData = {
  cars: PendingCarRow[];
  total: number;
  page: number;
  totalPages: number;
  status: CarStatusFilter;
};

export default function AgentApprovalsCarsSection({
  initialData,
}: {
  initialData: AgentApprovalsCarsInitialData;
}) {
  const [cars, setCars] = useState<PendingCarRow[]>(initialData.cars);
  const [total, setTotal] = useState(initialData.total);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [status, setStatus] = useState<CarStatusFilter>(initialData.status);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCars = useCallback(async (newStatus: CarStatusFilter, newPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/agent/cars?status=${newStatus}&page=${newPage}&limit=10`,
        { credentials: "include", cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      setCars(data.cars ?? []);
      setTotal(data.total ?? 0);
      setPage(data.page ?? 1);
      setTotalPages(data.totalPages ?? 1);
      setStatus(newStatus);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCarStatus = useCallback(
    async (carId: string, is_approved?: boolean) => {
      setUpdatingId(carId);
      try {
        const res = await fetch(`/api/agent/cars/${carId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ is_approved }),
        });
        if (res.ok) await fetchCars(status, page);
      } finally {
        setUpdatingId(null);
      }
    },
    [status, page, fetchCars]
  );

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchCars(e.target.value as CarStatusFilter, 1);
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    fetchCars(status, p);
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
            <span className="fw-semibold fs-5 text-dark">Car listings</span>
            <div className="agent-status-dropdown-wrap">
              <select
                className="form-select form-select-sm agent-status-dropdown"
                value={status}
                onChange={onStatusChange}
                disabled={loading}
                aria-label="Filter cars by status"
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
          {loading && cars.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-md-medium neutral-500 mb-0">Loading…</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-md-medium neutral-500 mb-0">No cars found.</p>
            </div>
          ) : (
            <>
              <div className="row g-3 d-md-none">
                {cars.map((c) => (
                  <div key={c.id} className="col-12 col-sm-6 col-lg-4">
                    <div className="card border rounded-3 shadow-sm h-100">
                      <div className="card-body p-3">
                        <div className="d-flex flex-column align-items-center text-center">
                          <CompanyAvatar
                            companyName={c.company_name}
                            avatarUrl={c.company_avatar_url}
                          />
                          <span className="fw-medium text-dark mt-2 text-truncate w-100">
                            {c.title}
                          </span>
                          <span className="small text-body-secondary">{c.company_name ?? "—"}</span>
                          <span className="small text-dark">{c.owner_name ?? "—"}</span>
                          <span className="fw-medium text-primary mt-1">
                            AED {c.price_per_day.toLocaleString()}/day
                          </span>
                          <StatusBadge status={c.is_approved ? "completed" : "pending"} />
                          <div className="mt-2">
                            <CarActionsSelect
                              car={c}
                              updatingId={updatingId}
                              onAction={updateCarStatus}
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
                      <th className="py-2">Car</th>
                      <th className="py-2">Company</th>
                      <th className="py-2">Owner</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Avatar</th>
                      <th className="py-2">Status</th>
                      <th className="py-2 text-end text-nowrap" style={{ minWidth: 90 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <span className="fw-medium text-dark">{c.title}</span>
                        </td>
                        <td>{c.company_name ?? "—"}</td>
                        <td>{c.owner_name ?? "—"}</td>
                        <td>
                          <span className="fw-medium">
                            AED {c.price_per_day.toLocaleString()}/day
                          </span>
                        </td>
                        <td>
                          <CompanyAvatar
                            companyName={c.company_name}
                            avatarUrl={c.company_avatar_url}
                          />
                        </td>
                        <td>
                          <StatusBadge status={c.is_approved ? "completed" : "pending"} />
                        </td>
                        <td className="text-end text-nowrap" style={{ minWidth: 90 }}>
                          <CarActionsSelect
                            car={c}
                            updatingId={updatingId}
                            onAction={updateCarStatus}
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
                    Page {page} of {totalPages} ({total} car{total !== 1 ? "s" : ""})
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
