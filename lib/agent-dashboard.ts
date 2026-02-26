import pool from "@/lib/db";
import { toPublicUrl } from "@/lib/uploads";

export type AgentDashboardStats = {
  totalCars: number;
  totalVendors: number;
  approvedVendors: number;
  pendingVendors: number;
  totalCarImages: number;
};

export type VendorRow = {
  id: string;
  company_name: string | null;
  created_at: string;
  avatar_url: string | null;
  owner_name: string | null;
  is_approved: boolean;
  is_blocked: boolean;
  listing_limit: number | null;
};

/** For backward compatibility */
export type PendingVendorRow = VendorRow;

export type VendorStatusFilter = "all" | "pending" | "approved" | "canceled";

export type AgentDashboardVendorsResult = {
  vendors: VendorRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AgentDashboardData = {
  stats: AgentDashboardStats;
  vendors: VendorRow[];
  vendorsPagination: AgentDashboardVendorsResult;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

/**
 * Fetches dashboard data for the agent/admin.
 * Caller must ensure session.role === 'admin'.
 * Supports pagination and status filter for the vendors list.
 */
export async function getAgentDashboardData(opts?: {
  page?: number;
  limit?: number;
  status?: VendorStatusFilter;
}): Promise<AgentDashboardData> {
  const page = Math.max(1, opts?.page ?? DEFAULT_PAGE);
  const limit = Math.min(50, Math.max(1, opts?.limit ?? DEFAULT_LIMIT));
  const status = opts?.status ?? "pending";

  const client = await pool.connect();
  try {
    const [carsRow, vendorsRow, imagesRow, countResult, vendorsResult] =
      await Promise.all([
        client.query<{ total: string }>(
          "SELECT COUNT(*)::text AS total FROM cars"
        ),
        client.query<{ total: string; approved: string; pending: string }>(
          `SELECT
            COUNT(*)::text AS total,
            COUNT(*) FILTER (WHERE is_approved = true)::text AS approved,
            COUNT(*) FILTER (WHERE is_approved = false AND (is_blocked = false OR is_blocked IS NULL))::text AS pending
           FROM vendors`
        ),
        client.query<{ total: string }>(
          "SELECT COUNT(*)::text AS total FROM car_images"
        ),
        client.query<{ count: string }>(
          status === "all"
            ? "SELECT COUNT(*)::text AS count FROM vendors"
            : status === "approved"
              ? "SELECT COUNT(*)::text AS count FROM vendors WHERE is_approved = true AND (is_blocked = false OR is_blocked IS NULL)"
              : status === "canceled"
                ? "SELECT COUNT(*)::text AS count FROM vendors WHERE is_blocked = true"
                : "SELECT COUNT(*)::text AS count FROM vendors WHERE is_approved = false AND (is_blocked = false OR is_blocked IS NULL)",
          []
        ),
        client.query<{
          id: string;
          company_name: string | null;
          created_at: string;
          avatar_url: string | null;
          full_name: string | null;
          is_approved: boolean;
          is_blocked: boolean;
          listing_limit: number | null;
        }>(
          `SELECT v.id, v.company_name, v.created_at, v.is_approved, v.is_blocked, v.listing_limit,
                  v.avatar_url,
                  u.full_name
           FROM vendors v
           INNER JOIN users u ON u.id = v.user_id
           ${status === "all" ? "" : status === "approved" ? "WHERE v.is_approved = true AND (v.is_blocked = false OR v.is_blocked IS NULL)" : status === "canceled" ? "WHERE v.is_blocked = true" : "WHERE v.is_approved = false AND (v.is_blocked = false OR v.is_blocked IS NULL)"}
           ORDER BY v.created_at DESC
           LIMIT $1 OFFSET $2`,
          [limit, (page - 1) * limit]
        ),
      ]);

    const stats: AgentDashboardStats = {
      totalCars: parseInt(carsRow.rows[0]?.total ?? "0", 10),
      totalVendors: parseInt(vendorsRow.rows[0]?.total ?? "0", 10),
      approvedVendors: parseInt(vendorsRow.rows[0]?.approved ?? "0", 10),
      pendingVendors: parseInt(vendorsRow.rows[0]?.pending ?? "0", 10),
      totalCarImages: parseInt(imagesRow.rows[0]?.total ?? "0", 10),
    };

    const total = parseInt(countResult.rows[0]?.count ?? "0", 10);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const vendors: VendorRow[] = vendorsResult.rows.map((r) => ({
      id: r.id,
      company_name: r.company_name,
      created_at: r.created_at,
      avatar_url: r.avatar_url ? toPublicUrl(r.avatar_url) : null,
      owner_name: r.full_name ?? null,
      is_approved: r.is_approved ?? false,
      is_blocked: r.is_blocked ?? false,
      listing_limit: r.listing_limit != null ? r.listing_limit : null,
    }));

    const vendorsPagination: AgentDashboardVendorsResult = {
      vendors,
      total,
      page,
      limit,
      totalPages,
    };

    return { stats, vendors, vendorsPagination };
  } finally {
    client.release();
  }
}

/**
 * Fetches only the vendors list (for API route). Caller must ensure session.role === 'admin'.
 */
export async function getAgentVendorsList(opts: {
  page: number;
  limit: number;
  status: VendorStatusFilter;
}): Promise<AgentDashboardVendorsResult> {
  const { page, limit, status } = opts;
  const client = await pool.connect();
  try {
    const [countResult, vendorsResult] = await Promise.all([
      client.query<{ count: string }>(
        status === "all"
          ? "SELECT COUNT(*)::text AS count FROM vendors"
          : status === "approved"
            ? "SELECT COUNT(*)::text AS count FROM vendors WHERE is_approved = true AND (is_blocked = false OR is_blocked IS NULL)"
            : status === "canceled"
              ? "SELECT COUNT(*)::text AS count FROM vendors WHERE is_blocked = true"
              : "SELECT COUNT(*)::text AS count FROM vendors WHERE is_approved = false AND (is_blocked = false OR is_blocked IS NULL)",
        []
      ),
      client.query<{
        id: string;
        company_name: string | null;
        created_at: string;
        avatar_url: string | null;
        full_name: string | null;
        is_approved: boolean;
        is_blocked: boolean;
        listing_limit: number | null;
      }>(
        `SELECT v.id, v.company_name, v.created_at, v.is_approved, v.is_blocked, v.listing_limit,
                v.avatar_url,
                u.full_name
         FROM vendors v
         INNER JOIN users u ON u.id = v.user_id
         ${status === "all" ? "" : status === "approved" ? "WHERE v.is_approved = true AND (v.is_blocked = false OR v.is_blocked IS NULL)" : status === "canceled" ? "WHERE v.is_blocked = true" : "WHERE v.is_approved = false AND (v.is_blocked = false OR v.is_blocked IS NULL)"}
         ORDER BY v.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, (page - 1) * limit]
      ),
    ]);
    const total = parseInt(countResult.rows[0]?.count ?? "0", 10);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const vendors: VendorRow[] = vendorsResult.rows.map((r) => ({
      id: r.id,
      company_name: r.company_name,
      created_at: r.created_at,
      avatar_url: r.avatar_url ? toPublicUrl(r.avatar_url) : null,
      owner_name: r.full_name ?? null,
      is_approved: r.is_approved ?? false,
      is_blocked: r.is_blocked ?? false,
      listing_limit: r.listing_limit != null ? r.listing_limit : null,
    }));
    return { vendors, total, page, limit, totalPages };
  } finally {
    client.release();
  }
}
