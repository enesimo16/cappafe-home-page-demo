"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useLanguage } from "@/hooks/useLanguage";

const PHOTO_SLOTS = ["story-1", "story-2", "story-3"] as const;
const PHOTO_TILTS = ["-rotate-2", "rotate-1.5", "-rotate-1"] as const;

interface StoryWord {
  text: string;
  accent: boolean;
}

/** Splits the story body into words, marking those inside [[...]] as accent. */
function parseStoryWords(body: string): StoryWord[] {
  return body
    .split(/\[\[|\]\]/)
    .flatMap((chunk, i) =>
      chunk
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ text, accent: i % 2 === 1 })),
    );
}

function Word({
  word,
  progress,
  range,
}: {
  word: StoryWord;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block">
      <span className="text-ink/15">{word.text}</span>
      <motion.span
        style={{ opacity }}
        className={`absolute inset-0 ${word.accent ? "text-accent" : "text-ink"}`}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

/**
 * "Our story" band: the narrative fills in word by word as the reader scrolls
 * (accent phrases turn red), followed by photo slots that show striped
 * placeholders until real images land in /public/story, and the served-markets
 * chip row.
 */
export default function Story() {
  const { t } = useLanguage();
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = parseStoryWords(t.story.body);

  return (
    <section id="hikaye" aria-label={t.story.kicker} className="py-[clamp(70px,11vw,130px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal className="mb-8 font-mono text-xs tracking-[0.22em] text-accent">
          {t.story.kicker}
        </Reveal>

        <p
          ref={bodyRef}
          className="m-0 max-w-[1050px] text-[clamp(1.5rem,3.4vw,2.9rem)] leading-[1.32] font-extrabold tracking-[-0.015em]"
        >
          {words.map((word, i) => (
            <span key={i}>
              <Word word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />{" "}
            </span>
          ))}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PHOTO_SLOTS.map((slot, i) => (
            <Reveal key={slot} delay={i * 100} className={PHOTO_TILTS[i]}>
              <div className="relative h-[220px] overflow-hidden rounded-[18px] border border-line2 bg-bg2 shadow-[0_16px_36px_rgba(20,21,23,0.1)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0">
                <ImageWithFallback
                  src={`/story/${slot}.jpg`}
                  alt={t.story.photoLabels[i]}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  fallback={
                    <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(-45deg,var(--stripe-a)_0px,var(--stripe-a)_10px,var(--stripe-b)_10px,var(--stripe-b)_20px)]">
                      <span className="rounded-full bg-chip-w px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-soft">
                        {t.story.photoLabels[i]}
                      </span>
                    </div>
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-14">
          <div className="mb-4 font-mono text-xs tracking-[0.22em] text-soft">
            {t.story.marketsLabel}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {t.story.markets.map((market) => (
              <span
                key={market}
                className="rounded-full border border-line bg-bg2 px-4 py-2 font-mono text-xs tracking-[0.1em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {market}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
