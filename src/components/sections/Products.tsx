"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";
import type { ProductItem } from "@/lib/i18n";

function ProductCard({
  product,
  detailLabel,
  onOpen,
}: {
  product: ProductItem;
  detailLabel: string;
  onOpen: (key: string) => void;
}) {
  return (
    <button
      onClick={() => onOpen(product.key)}
      className="group w-[300px] shrink-0 overflow-hidden rounded-[20px] border border-line2 bg-bg2 text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_44px_rgba(20,21,23,0.1)] sm:w-[330px]"
    >
      <div className="relative h-[170px] overflow-hidden">
        <ImageWithFallback
          src={`/products/${product.key}.jpg`}
          alt={product.title}
          sizes="330px"
          className="transition-transform duration-500 group-hover:scale-105"
          fallback={
            <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(-45deg,var(--stripe-a)_0px,var(--stripe-a)_10px,var(--stripe-b)_10px,var(--stripe-b)_20px)]">
              <span className="rounded-full bg-chip-w px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-soft">
                {product.imageLabel}
              </span>
            </div>
          }
        />
      </div>
      <div className="p-6 pt-5.5">
        <div className="mb-2.5 font-mono text-[11px] tracking-[0.16em] text-accent">{product.num}</div>
        <h3 className="mb-2 text-xl font-extrabold">{product.title}</h3>
        <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">{product.cardDesc}</p>
        <span className="font-mono text-[11px] tracking-[0.12em] text-accent">
          {detailLabel}{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}

export default function Products() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);
  const activeProduct = open ? t.products.items.find((p) => p.key === open) : null;
  const [titleLine1, titleLine2] = t.products.title.split("\n");
  const [hintLine1, hintLine2] = t.products.hint.split("\n");

  return (
    <section id="urunler" aria-label={t.products.kicker} className="overflow-hidden py-[clamp(64px,10vw,120px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent">
              {t.products.kicker}
            </Reveal>
            <Reveal delay={80}>
              <h2 className="m-0 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] uppercase">
                {titleLine1}
                <br />
                {titleLine2}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="font-mono text-xs tracking-[0.1em] text-soft sm:text-right">
            {hintLine1}
            <br />
            {hintLine2}
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={120}
        className="[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        <Marquee durationSec={34} paused={open !== null} pauseOnHover className="py-2.5">
          <div className="flex gap-5 pr-5">
            {t.products.items.map((product) => (
              <ProductCard
                key={product.key}
                product={product}
                detailLabel={t.products.detail}
                onOpen={(key) => {
                  trackEvent("product_open", { product: key });
                  setOpen(key);
                }}
              />
            ))}
          </div>
        </Marquee>
      </Reveal>

      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <AnimatePresence initial={false}>
          {activeProduct && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="relative mt-7 rounded-[22px] border border-white/10 bg-panel p-[clamp(26px,4vw,52px)] text-[#FBFAF8]">
                <button
                  onClick={() => setOpen(null)}
                  className="absolute top-5.5 right-6 rounded-full border border-white/25 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-[#FBFAF8] transition-colors hover:border-accent hover:text-accent-light"
                >
                  {t.products.close}
                </button>
                <div className="mb-3.5 font-mono text-xs tracking-[0.2em] text-accent-light">
                  {t.products.category} {activeProduct.num}
                </div>
                <h3 className="mb-4 text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.01em] uppercase">
                  {activeProduct.title}
                </h3>
                <p className="mb-5.5 max-w-[680px] text-balance text-[16.5px] leading-[1.7] text-[#FBFAF8]/75">
                  {activeProduct.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/22 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-[#FBFAF8]/85">
                    {activeProduct.meta}
                  </span>
                  <span className="rounded-full border border-white/22 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-[#FBFAF8]/85">
                    {t.products.b2b}
                  </span>
                  <Link
                    href="#iletisim"
                    onClick={() => trackEvent("cta_click", { label: "request_quote", location: "products" })}
                    className="ml-auto rounded-full bg-accent px-6.5 py-3 text-sm font-bold text-white no-underline transition-colors hover:bg-accent-hover"
                  >
                    {t.products.quote}
                  </Link>
                </div>
                <div className="mt-5 text-[13px] text-[#FBFAF8]/50">{t.products.note}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
