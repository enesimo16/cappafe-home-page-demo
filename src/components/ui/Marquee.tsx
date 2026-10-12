"use client";

import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  durationSec?: number;
  reverse?: boolean;
  paused?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite CSS-driven marquee: renders the content twice back-to-back and
 * animates a translateX(-50%) loop, which is far cheaper than the original
 * prototype's per-frame JS transform updates.
 */
export default function Marquee({
  children,
  durationSec = 28,
  reverse = false,
  paused = false,
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  const style: CSSProperties = {
    animationDuration: `${durationSec}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };
  // Only set play-state inline when forced; otherwise let the hover class win.
  if (paused) style.animationPlayState = "paused";

  return (
    <div className={`group/marquee overflow-hidden ${className}`}>
      <div
        className={`animate-marquee flex w-max whitespace-nowrap ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
        style={style}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
