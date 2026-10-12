"use client";

import { useCallback } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useLanguage } from "@/hooks/useLanguage";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Speedometer / temp-gauge scroll-to-top button.
 * - Needle sweeps counter-clockwise from bottom-right (0%) to top (100%).
 * - When near the bottom of the page (progress ≥ 0.85) the needle enters
 *   the red zone and the ring pulses red like an overheating gauge.
 * - Click scrolls back to top with a smooth ease.
 */
export default function ToTopButton() {
  const { progress, scrollY } = useScrollSpy(SECTION_IDS);
  const { t } = useLanguage();

  const visible = scrollY > 400;

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Gauge arc: needle starts at 220° (bottom-left) and sweeps clockwise to 320° (bottom-right).
  // Total sweep is 280°. We map progress 0→1 to 220°→220°+280°.
  const TOTAL_DEG = 280;
  const START_DEG = 220;
  const needleDeg = START_DEG + progress * TOTAL_DEG; // CSS angle from 12-o'clock

  // Danger zone: top 15% of scroll → needle is red
  const isDanger = progress >= 0.85;
  const accentColor = isDanger ? "#ef4444" : "var(--accent)"; // red on overheat, else brand red

  // SVG circle maths for the progress arc track
  const SIZE = 64;
  const R = 26; // radius of the arc circle
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const CIRC = 2 * Math.PI * R;

  // Arc goes from 220° clockwise. We draw a full conic as a stroke-dasharray on a rotated circle.
  const arcProgress = progress * TOTAL_DEG / 360;
  const dashArray = `${arcProgress * CIRC} ${CIRC}`;
  // Rotation so the arc starts at 220° (SVG circles start at 3-o'clock = 0°, so subtract 90° for 12-o-clock)
  const arcRotation = START_DEG - 90;

  return (
    <div
      className="fixed right-5 bottom-5 z-[60] h-[64px] w-[64px] transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transform: visible ? "scale(1)" : "scale(0.7)" }}
    >
      {/* Outer ring glow on danger — subtle, contained pulse */}
      {isDanger && (
        <span
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          style={{
            border: "2px solid rgba(239,68,68,0.5)",
            animation: "danger-pulse 1.4s ease-in-out infinite",
          }}
        />
      )}

      {/* SVG gauge */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Track (full arc, faint) */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(128,128,128,0.18)"
          strokeWidth="4"
          strokeDasharray={`${(TOTAL_DEG / 360) * CIRC} ${CIRC}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(${arcRotation} ${CX} ${CY})`}
        />

        {/* Progress arc */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeDasharray={dashArray}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(${arcRotation} ${CX} ${CY})`}
          style={{ transition: "stroke-dasharray 0.15s linear, stroke 0.4s" }}
        />

        {/* Tick marks for the gauge (every ~40°) */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const tickDeg = (START_DEG + t * TOTAL_DEG) * (Math.PI / 180);
          const inner = R - 6;
          const outer = R - 2;
          const x1 = CX + inner * Math.cos(tickDeg - Math.PI / 2);
          const y1 = CY + inner * Math.sin(tickDeg - Math.PI / 2);
          const x2 = CX + outer * Math.cos(tickDeg - Math.PI / 2);
          const y2 = CY + outer * Math.sin(tickDeg - Math.PI / 2);
          return (
            <line
              key={t}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={t === 1 ? "#ef4444" : "rgba(128,128,128,0.4)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle */}
        {(() => {
          const needleRad = needleDeg * (Math.PI / 180) - Math.PI / 2;
          const needleLen = R - 8;
          const nx = CX + needleLen * Math.cos(needleRad);
          const ny = CY + needleLen * Math.sin(needleRad);
          return (
            <line
              x1={CX} y1={CY} x2={nx} y2={ny}
              stroke={isDanger ? "#ef4444" : "var(--ink)"}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transition: "all 0.15s linear" }}
            />
          );
        })()}

        {/* Needle pivot dot */}
        <circle cx={CX} cy={CY} r="3" fill={isDanger ? "#ef4444" : "var(--accent)"} style={{ transition: "fill 0.4s" }} />
      </svg>

      {/* Centre button */}
      <button
        onClick={handleClick}
        aria-label={t.toTopAria}
        className="absolute inset-[10px] flex items-center justify-center rounded-full border-none outline-none cursor-pointer"
        style={{
          background: isDanger
            ? "linear-gradient(135deg, #1a0000, #2d0808)"
            : "var(--ink)",
          boxShadow: isDanger
            ? "0 0 16px rgba(239,68,68,0.5), 0 6px 20px rgba(20,21,23,0.3)"
            : "0 6px 20px rgba(20,21,23,0.3)",
          transition: "background 0.4s, box-shadow 0.4s",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{ color: isDanger ? "#ef4444" : "var(--ink-contrast)", transition: "color 0.4s" }}
        >
          <path
            d="M12 19V5M5.5 11.5 12 5l6.5 6.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
