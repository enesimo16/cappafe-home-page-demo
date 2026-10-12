import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { isRateLimited, clientIp } from "@/lib/rateLimit";

/**
 * Public endpoint the site itself calls to log page views and UI events
 * (WhatsApp click, form submit, etc). Never returns visitor data - write-only.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`track:${ip}`, 60, 60_000)) {
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
    if (body.kind === "pageview") {
      const path = String(body.path ?? "").slice(0, 500);
      let utmSource: string | null = null;
      let utmMedium: string | null = null;
      let utmCampaign: string | null = null;
      try {
        const qs = new URLSearchParams(path.split("?")[1] ?? "");
        utmSource = qs.get("utm_source")?.slice(0, 128) ?? null;
        utmMedium = qs.get("utm_medium")?.slice(0, 128) ?? null;
        utmCampaign = qs.get("utm_campaign")?.slice(0, 128) ?? null;
      } catch {
        // malformed query string - ignore utm parsing
      }

      // Vercel injects these automatically on every request, no external geoip needed
      const country = req.headers.get("x-vercel-ip-country");
      const city = req.headers.get("x-vercel-ip-city");
      const region = req.headers.get("x-vercel-ip-country-region");

      await pool.query(
        `INSERT INTO page_views
          (path, referrer, user_agent, ip, lang, session_id, country, city, region, utm_source, utm_medium, utm_campaign)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          path,
          body.referrer ? String(body.referrer).slice(0, 500) : null,
          req.headers.get("user-agent")?.slice(0, 500) ?? null,
          ip,
          body.lang ? String(body.lang).slice(0, 8) : null,
          body.sessionId ? String(body.sessionId).slice(0, 64) : null,
          country ?? null,
          city ? decodeURIComponent(city).slice(0, 128) : null,
          region ?? null,
          utmSource,
          utmMedium,
          utmCampaign,
        ]
      );
    } else if (body.kind === "event") {
      await pool.query(
        "INSERT INTO events (type, page, meta, session_id) VALUES (?, ?, ?, ?)",
        [
          String(body.type ?? "unknown").slice(0, 64),
          body.page ? String(body.page).slice(0, 500) : null,
          body.meta ? JSON.stringify(body.meta) : null,
          body.sessionId ? String(body.sessionId).slice(0, 64) : null,
        ]
      );
    } else {
      return NextResponse.json({ ok: false, error: "unknown_kind" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
