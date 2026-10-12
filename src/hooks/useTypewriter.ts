"use client";

import { useEffect, useState } from "react";

interface TypewriterState {
  lines: string[];
  cursorLine: number | null;
  cursorVisible: boolean;
}

/**
 * Types out `sequence` one line at a time (matching the original prototype's
 * hero animation), then blinks a shared cursor a few times before hiding it.
 */
export function useTypewriter(sequence: string[]): TypewriterState {
  const [state, setState] = useState<TypewriterState>(() => ({
    lines: sequence.map(() => ""),
    cursorLine: 0,
    cursorVisible: true,
  }));

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let typeTimer: ReturnType<typeof setInterval> | null = null;
    let blinkTimer: ReturnType<typeof setInterval> | null = null;

    typeTimer = setInterval(() => {
      charIndex++;
      const current = sequence[lineIndex];
      // Snapshot per tick: the state updater runs asynchronously, after the
      // mutable counters below may have already advanced to the next line.
      const targetLine = lineIndex;
      const text = current.slice(0, charIndex);
      setState((prev) => {
        const lines = [...prev.lines];
        lines[targetLine] = text;
        return { lines, cursorLine: targetLine, cursorVisible: true };
      });

      if (charIndex >= current.length) {
        lineIndex++;
        charIndex = 0;
        if (lineIndex >= sequence.length) {
          if (typeTimer) clearInterval(typeTimer);
          let on = true;
          let blinks = 0;
          blinkTimer = setInterval(() => {
            on = !on;
            blinks++;
            setState((prev) => ({ ...prev, cursorVisible: on }));
            if (blinks > 7) {
              if (blinkTimer) clearInterval(blinkTimer);
              setState((prev) => ({ ...prev, cursorLine: null }));
            }
          }, 400);
        }
      }
    }, 26);

    return () => {
      if (typeTimer) clearInterval(typeTimer);
      if (blinkTimer) clearInterval(blinkTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence.join("|")]);

  return state;
}
