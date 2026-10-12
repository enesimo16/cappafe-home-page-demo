import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isAuthorized } from "@/lib/apiAuth";

/** Public: read one published post by slug. Authorized: read drafts too. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const authed = isAuthorized(req);

  const pool = getPool();
  const query = authed
    ? "SELECT * FROM blog_posts WHERE slug = ? LIMIT 1"
    : "SELECT * FROM blog_posts WHERE slug = ? AND published = TRUE LIMIT 1";
  const [rows]: any = await pool.query(query, [slug]);

  if (!rows.length) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: rows[0] });
}

/** Authorized only (ERP): update a post. */
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, column] of [
    ["title", "title"],
    ["excerpt", "excerpt"],
    ["content", "content"],
    ["coverImage", "cover_image"],
    ["lang", "lang"],
    ["published", "published"],
  ] as const) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }
  if (!fields.length) {
    return NextResponse.json({ ok: false, error: "no_fields" }, { status: 400 });
  }
  values.push(slug);

  const pool = getPool();
  const [result]: any = await pool.query(`UPDATE blog_posts SET ${fields.join(", ")} WHERE slug = ?`, values);
  if (!result.affectedRows) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

/** Authorized only (ERP): delete a post. */
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  const pool = getPool();
  const [result]: any = await pool.query("DELETE FROM blog_posts WHERE slug = ?", [slug]);
  if (!result.affectedRows) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
