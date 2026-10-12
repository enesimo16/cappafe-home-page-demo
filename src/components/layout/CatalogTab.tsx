"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";

const FADE_END = 480;

export default function CatalogTab() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, FADE_END], [1, 0]);
  const x = useTransform(scrollY, [0, FADE_END], [0, 24]);
  const pointerEvents = useTransform(scrollY, (v) => (v >= FADE_END ? "none" : "auto"));

  return (
    <motion.div
      style={{ opacity, x, pointerEvents }}
      className="fixed top-[68%] right-0 z-[55] -translate-y-1/2"
    >
      <Link
        href="/catalog"
        onClick={() => trackEvent("catalog_tab_click")}
        className="block no-underline transition-transform duration-300 hover:-translate-x-1.5"
      >
        <span className="btn-shimmer-wrap flex items-center gap-2 rounded-l-2xl bg-ink py-3.5 pr-4 pl-5 text-[12.5px] font-bold whitespace-nowrap text-ink-contrast shadow-[0_14px_34px_rgba(20,21,23,0.35)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <path
              d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M14.5 3.5V8h4.4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 13h8M8 16.5h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="max-w-[80px] leading-[1.25] whitespace-normal sm:max-w-none sm:whitespace-nowrap">
            {t.catalog.tabLabel}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
