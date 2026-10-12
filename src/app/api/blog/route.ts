import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isAuthorized } from "@/lib/apiAuth";

/** Public: list published posts. Authorized (ERP): list everything, incl. drafts. */
export async function GET(req: Request) {
  const authed = isAuthorized(req);
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang");

  const pool = getPool();
  const params: any[] = [];
  let query =
    "SELECT id, slug, title, excerpt, cover_image, lang, published, created_at, updated_at FROM blog_posts WHERE 1=1";
  if (!authed) {
    query += " AND published = TRUE";
  }
  if (lang) {
    query += " AND lang = ?";
    params.push(lang);
  }
  query += " ORDER BY created_at DESC";

  const [rows] = await pool.query(query, params);
  return NextResponse.json({ ok: true, data: rows });
}

/** Authorized only (ERP): create a new post. */
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body.slug || !body.title || !body.content) {
    return NextResponse.json({ ok: false, error: "slug, title, content required" }, { status: 400 });
  }

  const pool = getPool();
  try {
    const [result]: any = await pool.query(
      "INSERT INTO blog_posts (slug, title, excerpt, content, cover_image, lang, published) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        String(body.slug).slice(0, 255),
        String(body.title).slice(0, 500),
        body.excerpt ? String(body.excerpt).slice(0, 1000) : null,
        String(body.content),
        body.coverImage ? String(body.coverImage).slice(0, 500) : null,
        body.lang ? String(body.lang).slice(0, 8) : "tr",
        Boolean(body.published),
      ]
    );
    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ ok: false, error: "slug_taken" }, { status: 409 });
    }
    console.error("blog create error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
