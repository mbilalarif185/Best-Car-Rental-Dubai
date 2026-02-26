import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAgentCarsList } from "@/lib/agent-approvals";
import type { CarStatusFilter } from "@/lib/agent-approvals";

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
    const status: CarStatusFilter =
      statusParam === "all" || statusParam === "approved" ? statusParam : "pending";
    const result = await getAgentCarsList({ page, limit, status });
    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/agent/cars error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
