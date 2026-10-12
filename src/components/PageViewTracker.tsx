"use client";

import { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { trackPageview } from "@/lib/track";

/** Logs one page view per load. Renders nothing. */
export default function PageViewTracker() {
  const { lang } = useLanguage();

  useEffect(() => {
    trackPageview(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
