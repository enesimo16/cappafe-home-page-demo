"use client";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { CATALOG_PAGE_COUNT } from "@/lib/constants";

/**
 * Every catalog page rendered as a lazy-loaded image, stacked vertically.
 * Reveal fades each one in as it's scrolled into view - reads like part of
 * the page rather than an embedded PDF viewer.
 */
export default function CatalogGallery() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-[880px] flex-col gap-8 sm:gap-10">
      {Array.from({ length: CATALOG_PAGE_COUNT }, (_, i) => i + 1).map((n) => (
        <Reveal key={n} delay={(n % 5) * 50}>
          <div className="overflow-hidden rounded-[16px] border border-line2 bg-bg2 shadow-[0_20px_44px_rgba(20,21,23,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- plain lazy <img> is enough for a fixed local page-image set */}
            <img
              src={`/catalog/pages/page-${String(n).padStart(2, "0")}.jpg`}
              alt={`${t.catalog.title} — ${t.catalog.pageLabel} ${n}`}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
