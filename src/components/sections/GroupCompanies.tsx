"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";
import type { CompanyItem } from "@/lib/i18n";

function CompanyLogo({ company }: { company: CompanyItem }) {
  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="relative h-[84px] w-[150px] shrink-0 overflow-hidden rounded-xl border border-white/25 bg-accent-light/90">
      <ImageWithFallback
        src={`/companies/${company.slug}.png`}
        alt={company.name}
        sizes="150px"
        objectFit="contain"
        className="p-3"
        fallback={
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <span className="text-xl font-black text-white/85">{initials}</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/50">LOGO</span>
          </div>
        }
      />
    </div>
  );
}

function CompanyRow({
  company,
  index,
  isOpen,
  onEnter,
  onLeave,
  onToggle,
}: {
  company: CompanyItem;
  index: number;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={index * 60}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="relative cursor-pointer overflow-hidden border-b border-line outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div
          className="absolute inset-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: isOpen ? "translateY(0%)" : "translateY(101%)" }}
        />
        <div className="relative flex flex-wrap items-baseline gap-5 px-2.5 py-7">
          <span
            className={`font-mono text-[13px] tracking-[0.14em] transition-colors duration-400 ${
              isOpen ? "text-white/75" : "text-accent"
            }`}
          >
            {company.num}
          </span>
          <h3
            className={`m-0 text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.01em] uppercase transition-colors duration-400 ${
              isOpen ? "text-white" : "text-ink"
            }`}
          >
            {company.name}
          </h3>
          <span
            className={`ml-auto font-mono text-[11.5px] tracking-[0.14em] transition-colors duration-400 ${
              isOpen ? "text-white/80" : "text-soft"
            }`}
          >
            {company.role}
          </span>
          <span
            className={`text-[22px] font-extrabold transition-[color,transform] duration-400 ${
              isOpen ? "translate-x-2 rotate-45 text-white" : "text-soft"
            }`}
          >
            →
          </span>
        </div>
        <div
          className="relative grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-6 px-2.5 pb-7.5">
              <CompanyLogo company={company} />
              <p className="m-0 max-w-[560px] flex-1 basis-[280px] text-balance text-[15.5px] leading-[1.65] text-white/92">
                {company.desc}
              </p>
              <Link
                href={company.linkHref}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs tracking-[0.12em] whitespace-nowrap text-white no-underline"
                style={{ borderBottom: "1.5px solid rgba(255,255,255,0.6)", paddingBottom: 3 }}
              >
                {company.linkLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function GroupCompanies() {
  const { t } = useLanguage();
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [titleLine1, titleLine2] = t.group.title.split("\n");

  const isRowOpen = (i: number) => (pinned !== null ? pinned === i : hovered === i);

  return (
    <section
      id="grup"
      aria-label={t.group.kicker}
      className="overflow-hidden py-[clamp(70px,11vw,130px)] pb-[clamp(60px,9vw,110px)]"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent">
          {t.group.kicker}
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-5 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] uppercase">
            {titleLine1}
            <br />
            {titleLine2}
          </h2>
        </Reveal>
        <Reveal delay={140} className="mb-10 font-mono text-xs tracking-[0.1em] text-soft">
          {t.group.hint}
        </Reveal>
      </div>

      <Reveal delay={100} className="mb-2 border-y border-line py-3.5">
        <Marquee durationSec={26} pauseOnHover>
          <span className="flex items-center gap-11 pr-11 font-mono text-[13px] tracking-[0.18em] whitespace-nowrap text-muted">
            {t.group.companies.map((c) => (
              <span key={c.slug} className="flex items-center gap-11 uppercase">
                {c.name}
                <span className="text-accent">●</span>
              </span>
            ))}
          </span>
        </Marquee>
      </Reveal>

      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        {t.group.companies.map((company, i) => (
          <CompanyRow
            key={company.slug}
            company={company}
            index={i}
            isOpen={isRowOpen(i)}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered((h) => (h === i ? null : h))}
            onToggle={() =>
              setPinned((p) => {
                if (p !== i) trackEvent("company_open", { company: company.slug });
                return p === i ? null : i;
              })
            }
          />
        ))}
      </div>
    </section>
  );
}
