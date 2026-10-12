import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isAuthorized } from "@/lib/apiAuth";

/** ERP pulls copies of every submitted form (contact + partnership) from here. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 200), 1000);
  const since = searchParams.get("since");

  const pool = getPool();
  const params: any[] = [];
  let query =
    "SELECT id, form_type, from_name, from_email, company, subject, body_copy, raw_payload, created_at FROM emails_sent";
  if (since) {
    query += " WHERE created_at >= ?";
    params.push(since);
  }
  query += " ORDER BY id DESC LIMIT ?";
  params.push(limit);

  const [rows] = await pool.query(query, params);
  return NextResponse.json({ ok: true, data: rows });
}
