import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isAuthorized } from "@/lib/apiAuth";

/** ERP pulls WhatsApp-click / form-submit style events from here. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 200), 1000);
  const since = searchParams.get("since");
  const type = searchParams.get("type"); // e.g. whatsapp_click

  const pool = getPool();
  const params: any[] = [];
  let query = "SELECT id, type, page, meta, session_id, created_at FROM events WHERE 1=1";
  if (since) {
    query += " AND created_at >= ?";
    params.push(since);
  }
  if (type) {
    query += " AND type = ?";
    params.push(type);
  }
  query += " ORDER BY id DESC LIMIT ?";
  params.push(limit);

  const [rows] = await pool.query(query, params);
  return NextResponse.json({ ok: true, data: rows });
}
