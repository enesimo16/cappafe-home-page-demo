import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthorized } from "@/lib/apiAuth";

/**
 * ERP-only: upload a blog cover image, get back a public URL to use as
 * `coverImage` when creating/updating a post via POST/PUT /api/blog.
 *
 * Send as multipart/form-data with a single "file" field. Max 8MB.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { ok: false, error: "send as multipart/form-data with a 'file' field" },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "missing 'file' field" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "file must be an image" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "max file size is 8MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const blob = await put(filename, file, { access: "public" });
    return NextResponse.json({ ok: true, url: blob.url }, { status: 201 });
  } catch (err) {
    console.error("blog upload error", err);
    return NextResponse.json({ ok: false, error: "upload_failed" }, { status: 500 });
  }
}
