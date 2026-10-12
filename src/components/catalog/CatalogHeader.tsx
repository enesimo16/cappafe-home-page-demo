"use client";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";
import { CATALOG_PDF_URL } from "@/lib/constants";

export default function CatalogHeader() {
  const { t } = useLanguage();

  return (
    <>
      <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent">{t.catalog.kicker}</Reveal>
      <Reveal delay={80}>
        <div className="mb-5 flex flex-wrap items-center gap-5 sm:gap-7">
          <h1 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] text-ink uppercase">
            {t.catalog.title}
          </h1>
          <a
            href={CATALOG_PDF_URL}
            download
            onClick={() => trackEvent("catalog_download")}
            className="btn-shimmer-wrap rounded-full bg-accent px-8 py-3.5 text-base font-bold whitespace-nowrap text-white no-underline shadow-[0_12px_30px_rgba(210,35,42,0.28)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(210,35,42,0.38)]"
          >
            {t.catalog.download}
          </a>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <p className="max-w-[560px] text-balance text-[15.5px] leading-[1.7] text-muted">{t.catalog.intro}</p>
      </Reveal>
    </>
  );
}
