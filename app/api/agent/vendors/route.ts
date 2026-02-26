import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAgentVendorsList } from "@/lib/agent-dashboard";
import type { VendorStatusFilter } from "@/lib/agent-dashboard";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user_id || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10) || 10));
    const statusParam = searchParams.get("status");
    const status: VendorStatusFilter =
      statusParam === "all" || statusParam === "approved" || statusParam === "canceled"
        ? statusParam
        : "pending";
    const result = await getAgentVendorsList({ page, limit, status });
    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/agent/vendors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
