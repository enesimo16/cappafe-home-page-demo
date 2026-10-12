"use client";

import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import IsometricShowcase from "@/components/hero/IsometricShowcase";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";

function Cursor({ visible }: { visible: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block h-[0.78em] w-[0.45ch] translate-y-[0.08em] bg-accent align-baseline"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

/**
 * Typewriter headline. Each visual line reserves its final width/height with an
 * invisible copy of the full text, so typing never shifts the layout and long
 * words wrap identically in every language.
 */
function TypedHeadline({ typed }: { typed: [string, string, string, string] }) {
  const { lines, cursorLine, cursorVisible } = useTypewriter(typed);

  return (
    <h1 className="m-0 text-[clamp(2.4rem,6.2vw,5.75rem)] leading-[0.98] font-black tracking-[-0.02em] uppercase">
      <span className="relative block">
        <span className="invisible">{typed[0]}</span>
        <span className="absolute inset-0">
          {lines[0]}
          {cursorLine === 0 && <Cursor visible={cursorVisible} />}
        </span>
      </span>
      <span className="relative block">
        <span className="invisible">
          {typed[1]} <span>{typed[2]}</span>
        </span>
        <span className="absolute inset-0">
          {lines[1]}
          {cursorLine === 1 && <Cursor visible={cursorVisible} />}{" "}
          <span className="text-accent">
            {lines[2]}
            {cursorLine === 2 && <Cursor visible={cursorVisible} />}
          </span>
        </span>
      </span>
      <span className="relative block text-transparent" style={{ WebkitTextStroke: "2px var(--ink)" }}>
        <span className="invisible">{typed[3]}</span>
        <span className="absolute inset-0">
          {lines[3]}
          {cursorLine === 3 && <Cursor visible={cursorVisible} />}
        </span>
      </span>
    </h1>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const isRtl = t.dir === "rtl";

  return (
    <section
      id="top"
      aria-label={t.nav.home}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[110px] sm:pt-[130px] lg:pt-[140px]"
    >
      {/* isometric product showcase */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-[16%] hidden w-[460px] min-[1360px]:block ${
          isRtl ? "left-8 right-auto" : "right-8 left-auto"
        }`}
      >
        <IsometricShowcase />
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <div className="mb-7 font-mono text-[13px] tracking-[0.22em] text-accent">{t.hero.kicker}</div>

        <div className="max-w-[900px] min-[1360px]:max-w-[calc(100%-540px)]">
          <TypedHeadline key={lang} typed={t.hero.typed} />
        </div>

        <p className="my-9 max-w-[520px] text-[19px] leading-[1.6] text-balance text-muted">{t.hero.sub}</p>

        <div className="flex flex-wrap items-center gap-4 pb-[70px] sm:pb-[90px]">
          <Link
            href="#ortaklik"
            onClick={() => trackEvent("cta_click", { label: "distributor", location: "hero" })}
            className="btn-shimmer-wrap rounded-full bg-accent px-[34px] py-[18px] text-base font-bold text-white no-underline shadow-[0_12px_30px_rgba(210,35,42,0.28)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(210,35,42,0.38)]"
          >
            {t.hero.ctaPrimary}
          </Link>
          <Link
            href="#urunler"
            onClick={() => trackEvent("cta_click", { label: "explore_products", location: "hero" })}
            className="rounded-full border border-line bg-bg2 px-[34px] py-[17px] text-base font-semibold text-ink no-underline transition-[border-color,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="mt-auto overflow-hidden border-t-2 border-accent/60 bg-panel py-4 [transform:rotate(-1.1deg)_scale(1.02)]">
        <Marquee durationSec={30}>
          <span className="flex items-center gap-4 pr-4 font-mono text-sm tracking-[0.16em] whitespace-nowrap text-[#FBFAF8]">
            {t.hero.ticker.map((item) => (
              <span key={item} className="flex items-center gap-4">
                {item}
                <span className="text-accent">●</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
