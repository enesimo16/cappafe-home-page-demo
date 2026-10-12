"use client";

import { useEffect, useState, type RefObject } from "react";

interface FlowProgressState {
  fillPercent: number;
  activeStep: number;
}

export function useFlowProgress(
  containerRef: RefObject<HTMLElement | null>,
  stepRefs: RefObject<(HTMLElement | null)[]>,
  stepCount: number
): FlowProgressState {
  const [state, setState] = useState<FlowProgressState>({ fillPercent: 0, activeStep: 0 });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const progress = Math.min(Math.max((vh * 0.7 - rect.top) / rect.height, 0), 1);

      let active = 0;
      for (let i = 0; i < stepCount; i++) {
        const el = stepRefs.current[i];
        if (el && el.getBoundingClientRect().top < vh * 0.55) active = i;
      }

      setState({ fillPercent: progress * 100, activeStep: active });
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
  }, [stepCount]);

  return state;
}
