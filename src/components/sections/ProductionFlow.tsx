"use client";

import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useFlowProgress } from "@/hooks/useFlowProgress";
import { useLanguage } from "@/hooks/useLanguage";
import { ConveyorVisual, DistributionVisual, ExtrusionVisual, PressVisual } from "./flow-visuals";

const VISUALS = [ExtrusionVisual, PressVisual, ConveyorVisual, DistributionVisual];

export default function ProductionFlow() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { fillPercent, activeStep } = useFlowProgress(containerRef, stepRefs, t.flow.steps.length);
  const [titleLine1, titleLine2] = t.flow.title.split("\n");

  return (
    <section
      id="akis"
      aria-label={t.flow.kicker}
      className="bg-panel py-[clamp(70px,11vw,130px)] text-[#FBFAF8]"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent-light">
          {t.flow.kicker}
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-18 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] uppercase">
            {titleLine1}
            <br />
            {titleLine2}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-16 min-[900px]:grid-cols-2">
          <div ref={containerRef} className="relative pl-11.5">
            <div className="absolute top-2 bottom-2 left-1.5 w-0.5 bg-white/14" />
            <div
              className="absolute top-2 left-1.5 w-0.5 bg-accent shadow-[0_0_12px_rgba(210,35,42,0.8)] transition-[height] duration-200"
              style={{ height: `${fillPercent}%` }}
            />

            {t.flow.steps.map((step, i) => {
              const isActive = i === activeStep;
              const isLast = i === t.flow.steps.length - 1;
              return (
                <div
                  key={step.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`relative transition-opacity duration-500 ${isLast ? "" : "pb-17"} ${
                    isActive ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <div
                    className={`absolute top-1.5 -left-12.5 h-3 w-3 rounded-full border-[3px] ${
                      isActive
                        ? "border-accent bg-accent shadow-[0_0_16px_rgba(210,35,42,0.7)]"
                        : "border-accent bg-panel"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-4.5">
                    <span className="font-mono text-[13px] tracking-[0.14em] text-accent-light">
                      {step.step}
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs tracking-[0.1em] text-[#FBFAF8]/55">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="mt-3.5 mb-2 text-[30px] font-extrabold">{step.title}</h3>
                  <p className="max-w-[480px] text-balance text-base leading-[1.65] text-[#FBFAF8]/66">
                    {step.desc}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/18 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-[#FBFAF8]/60"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky top-27.5 hidden h-[470px] min-[900px]:block">
            {VISUALS.map((Visual, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-[opacity,transform] duration-[650ms]"
                style={{
                  opacity: i === activeStep ? 1 : 0,
                  transform:
                    i === activeStep ? "translateY(0)" : `translateY(${i < activeStep ? -24 : 24}px)`,
                  pointerEvents: i === activeStep ? "auto" : "none",
                }}
              >
                <Visual
                  caption={t.flow.steps[i].caption}
                  highlight={t.flow.steps[i].highlight}
                  regions={i === 3 ? t.flow.steps[3].chips : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
