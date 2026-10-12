"use client";

/**
 * Shared scroll-reveal transition preset matching the original prototype's
 * IntersectionObserver-driven fade/slide-up reveal (cubic-bezier(0.2,0.7,0.2,1), 0.9s).
 */
export function useRevealTransition(delayMs = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: 0.9,
      delay: delayMs / 1000,
      ease: [0.2, 0.7, 0.2, 1] as const,
    },
  };
}
