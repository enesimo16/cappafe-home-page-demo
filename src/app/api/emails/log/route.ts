import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isRateLimited, clientIp } from "@/lib/rateLimit";

/**
 * Public endpoint the site calls right after a form submits successfully,
 * so we keep our own copy of what was sent (web3forms only emails it to us).
 */
export async function POST(req: Request) {
  if (isRateLimited(`email:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const pool = getPool();
  try {
    await pool.query(
      "INSERT INTO emails_sent (form_type, from_name, from_email, company, subject, body_copy, raw_payload) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        String(body.formType ?? "unknown").slice(0, 32),
        body.name ? String(body.name).slice(0, 255) : null,
        body.email ? String(body.email).slice(0, 255) : null,
        body.company ? String(body.company).slice(0, 255) : null,
        body.subject ? String(body.subject).slice(0, 500) : null,
        body.message ? String(body.message) : null,
        JSON.stringify(body),
      ]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("email log error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
