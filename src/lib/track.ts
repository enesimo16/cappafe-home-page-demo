"use client";

let cachedSessionId: string | null = null;

function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  try {
    const stored = sessionStorage.getItem("cappafe_sid");
    if (stored) {
      cachedSessionId = stored;
      return stored;
    }
    const id = crypto.randomUUID();
    sessionStorage.setItem("cappafe_sid", id);
    cachedSessionId = id;
    return id;
  } catch {
    return "unknown";
  }
}

/** Fire-and-forget event log (WhatsApp click, form submit, etc). Never throws. */
export function trackEvent(type: string, meta?: Record<string, unknown>) {
  try {
    const payload = JSON.stringify({
      kind: "event",
      type,
      page: window.location.pathname,
      meta,
      sessionId: getSessionId(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
    }
  } catch {
    // tracking must never break the UI
  }
}

/** Fire-and-forget page view log. Never throws. */
export function trackPageview(lang: string) {
  try {
    const payload = JSON.stringify({
      kind: "pageview",
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      lang,
      sessionId: getSessionId(),
    });
    fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
  } catch {
    // tracking must never break the UI
  }
}
