"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "canceled", label: "Cancelled" },
];

export default function VendorStatusDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "pending";

  return (
    <div className="agent-status-dropdown-wrap">
      <select
        className="form-select form-select-sm agent-status-dropdown"
        value={current}
        onChange={(e) => {
          const val = e.target.value;
          router.push(`/agent?status=${val}&page=1`);
        }}
        aria-label="Filter vendors by status"
      >
        {OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
