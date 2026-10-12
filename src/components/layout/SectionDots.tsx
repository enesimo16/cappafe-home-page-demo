"use client";

import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useLanguage } from "@/hooks/useLanguage";
import { SECTION_IDS } from "@/lib/constants";

export default function SectionDots() {
  const { activeSection } = useScrollSpy(SECTION_IDS);
  const { t } = useLanguage();

  const labels: Record<string, string> = {
    top: t.nav.home,
    sayilar: t.stats.kicker,
    urunler: t.nav.products,
    akis: t.nav.about,
    grup: t.nav.group,
    ortaklik: t.nav.partner,
    iletisim: t.nav.contact,
  };

  return (
    <div
      className="fixed top-1/2 right-5 z-[55] hidden -translate-y-1/2 flex-col gap-3.5 min-[900px]:flex"
      aria-hidden="true"
    >
      {SECTION_IDS.map((id) => {
        const isActive = id === activeSection;
        return (
          <Link
            key={id}
            href={`#${id}`}
            title={labels[id]}
            tabIndex={-1}
            className={`block h-[9px] w-[9px] rounded-full border transition-transform duration-300 ${
              isActive ? "scale-[1.35] border-accent bg-accent" : "border-soft bg-transparent"
            }`}
          />
        );
      })}
    </div>
  );
}
