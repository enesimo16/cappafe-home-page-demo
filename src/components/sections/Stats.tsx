"use client";

import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { useLanguage } from "@/hooks/useLanguage";

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    { value: 30, suffix: "+", label: t.stats.experience },
    { value: 10000, suffix: " m²", label: t.stats.facility },
    { value: 120, suffix: "+", label: t.stats.staff },
    { value: 3000, suffix: "+", label: t.stats.sku },
  ];

  return (
    <section id="sayilar" aria-label={t.stats.kicker} className="py-[clamp(60px,9vw,110px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal className="mb-10 font-mono text-xs tracking-[0.22em] text-accent">
          {t.stats.kicker}
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className="rounded-[18px] border border-line bg-bg2 p-7 transition-[transform,border-color,box-shadow] duration-[350ms] hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_18px_40px_rgba(20,21,23,0.08)]"
            >
              <div className="text-[clamp(2.5rem,3.8vw,3.75rem)] font-black tracking-[-0.03em]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2.5 border-t border-hair pt-3 font-mono text-xs tracking-[0.1em] text-muted">
                {stat.label}
              </div>
            </Reveal>
          ))}
          <Reveal
            delay={stats.length * 80}
            className="rounded-[18px] border border-panel bg-panel p-7 transition-[transform,box-shadow] duration-[350ms] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,21,23,0.2)]"
          >
            <div className="text-[clamp(2.5rem,3.8vw,3.75rem)] font-black tracking-[-0.03em] text-accent">
              ISO
            </div>
            <div className="mt-2.5 border-t border-white/15 pt-3 font-mono text-xs tracking-[0.1em] text-[#FBFAF8]/70">
              9001 / 14001 / 45001
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
