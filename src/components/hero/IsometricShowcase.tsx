"use client";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useLanguage } from "@/hooks/useLanguage";

const FLOAT_STAGGER_SEC = -1.15;

/**
 * Isometric 2×2 mosaic of product photo tiles for the hero. Each tile loads
 * /products/<key>.jpg — the same photos the products section uses — and shows
 * the striped placeholder until real images are dropped into /public/products.
 */
export default function IsometricShowcase() {
  const { t } = useLanguage();
  const tiles = t.products.items.slice(0, 4);

  return (
    <div className="relative h-[400px]">
      {/* ground shadow under the cluster */}
      <div className="absolute bottom-8 left-1/2 h-[90px] w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(20,21,23,0.2)_0%,rgba(20,21,23,0)_70%)]" />

      {/* isometric plane */}
      <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-54%)_rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
        {/* accent diamond + dashed outline echoing the brand red / mono style */}
        <div className="absolute -top-10 -left-10 h-[74px] w-[74px] rounded-[12px] bg-accent opacity-90" />
        <div className="absolute -right-8 -bottom-8 h-[64px] w-[64px] rounded-[12px] border-[1.5px] border-dashed border-line" />

        <div className="relative grid grid-cols-2 gap-3.5 [transform-style:preserve-3d]">
          {tiles.map((tile, i) => (
            <div
              key={tile.key}
              className="animate-iso-float"
              style={{ animationDelay: `${i * FLOAT_STAGGER_SEC}s` }}
            >
              <div className="relative h-[150px] w-[150px] overflow-hidden rounded-[14px] border border-line2 bg-bg2 shadow-[-12px_12px_0_-1px_var(--hair),-18px_18px_30px_rgba(20,21,23,0.2)]">
                <ImageWithFallback
                  src={`/products/${tile.key}.jpg`}
                  alt={tile.title}
                  sizes="150px"
                  fallback={
                    <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(-45deg,var(--stripe-a)_0px,var(--stripe-a)_10px,var(--stripe-b)_10px,var(--stripe-b)_20px)] p-3">
                      <span className="rounded-full bg-chip-w px-2.5 py-1 text-center font-mono text-[10px] leading-[1.4] tracking-[0.1em] text-soft">
                        {tile.title}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
