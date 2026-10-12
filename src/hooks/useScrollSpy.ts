"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/lib/constants";

interface ScrollSpyState {
  activeSection: SectionId;
  progress: number;
  scrollY: number;
}

export function useScrollSpy(sectionIds: SectionId[]): ScrollSpyState {
  const [state, setState] = useState<ScrollSpyState>({
    activeSection: sectionIds[0],
    progress: 0,
    scrollY: 0,
  });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;

      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * 0.38) {
          active = id;
        }
      }

      setState({ activeSection: active, progress, scrollY: window.scrollY });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return state;
}
