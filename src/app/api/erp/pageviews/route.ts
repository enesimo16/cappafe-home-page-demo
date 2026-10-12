import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isAuthorized } from "@/lib/apiAuth";

/** ERP pulls page-view logs from here. Requires Authorization: Bearer <ERP_API_SECRET>. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 200), 1000);
  const since = searchParams.get("since"); // ISO date, optional

  const pool = getPool();
  const params: any[] = [];
  let query =
    "SELECT id, path, referrer, user_agent, ip, lang, session_id, country, city, region, utm_source, utm_medium, utm_campaign, created_at FROM page_views";
  if (since) {
    query += " WHERE created_at >= ?";
    params.push(since);
  }
  query += " ORDER BY id DESC LIMIT ?";
  params.push(limit);

  const [rows] = await pool.query(query, params);
  return NextResponse.json({ ok: true, data: rows });
}
