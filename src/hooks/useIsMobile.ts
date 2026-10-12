import { useState, useEffect } from "react";

/**
 * Custom React hook that detects if the current viewport width is mobile (< 820px).
 * Uses window.matchMedia for performant event-driven detection.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we are running in browser context
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 820px)");
    
    // Set initial state
    setIsMobile(mql.matches);

    // Setup listener
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return isMobile;
}
