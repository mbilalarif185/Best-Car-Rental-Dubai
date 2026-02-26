import pool from "@/lib/db";
import { toPublicUrl } from "@/lib/uploads";

export type PendingCarRow = {
  id: string;
  title: string;
  slug: string;
  price_per_day: number;
  is_approved: boolean;
  is_active: boolean;
  company_name: string | null;
  owner_name: string | null;
  company_avatar_url: string | null;
  created_at: string;
};

export type AgentCarsListResult = {
  cars: PendingCarRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CarStatusFilter = "all" | "pending" | "approved";

const DEFAULT_LIMIT = 10;

/**
 * Fetches cars list for agent (with vendor/owner info). Caller must ensure session.role === 'admin'.
 */
export async function getAgentCarsList(opts: {
  page: number;
  limit: number;
  status?: CarStatusFilter;
}): Promise<AgentCarsListResult> {
  const page = Math.max(1, opts.page);
  const limit = Math.min(50, Math.max(1, opts.limit ?? DEFAULT_LIMIT));
  const status = opts.status ?? "pending";

  const client = await pool.connect();
  try {
    const whereClause =
      status === "all"
        ? ""
        : status === "approved"
          ? "WHERE c.is_approved = true"
          : "WHERE c.is_approved = false";

    const countQuery =
      status === "all"
        ? "SELECT COUNT(*)::text AS count FROM cars c"
        : status === "approved"
          ? "SELECT COUNT(*)::text AS count FROM cars c WHERE c.is_approved = true"
          : "SELECT COUNT(*)::text AS count FROM cars c WHERE c.is_approved = false";

    const listQuery = `SELECT c.id, c.title, c.slug, c.price_per_day, c.is_approved, c.is_active, c.created_at,
                v.company_name, v.avatar_url,
                u.full_name
         FROM cars c
         INNER JOIN vendors v ON v.id = c.vendor_id
         INNER JOIN users u ON u.id = v.user_id
         ${whereClause}
         ORDER BY c.created_at DESC
         LIMIT $1 OFFSET $2`;

    const [countResult, listResult] = await Promise.all([
      client.query<{ count: string }>(countQuery, []),
      client.query<{
        id: string;
        title: string;
        slug: string;
        price_per_day: string;
        is_approved: boolean;
        is_active: boolean;
        company_name: string | null;
        full_name: string | null;
        avatar_url: string | null;
        created_at: string;
      }>(listQuery, [limit, (page - 1) * limit]),
    ]);

    const total = parseInt(countResult.rows[0]?.count ?? "0", 10);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const cars: PendingCarRow[] = listResult.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      price_per_day: Number(r.price_per_day),
      is_approved: r.is_approved ?? false,
      is_active: r.is_active ?? true,
      company_name: r.company_name ?? null,
      owner_name: r.full_name ?? null,
      company_avatar_url: r.avatar_url ? toPublicUrl(r.avatar_url) : null,
      created_at: r.created_at,
    }));

    return { cars, total, page, limit, totalPages };
  } finally {
    client.release();
  }
}
