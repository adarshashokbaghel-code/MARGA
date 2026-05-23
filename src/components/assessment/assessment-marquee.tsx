"use client";

import { Marquee } from "@/components/ui/marquee";

const TICKER_ITEMS = [
  "No right or wrong answers",
  "Psychometric science · warm interface",
  "Skip any question anytime",
  "Submit with partial answers",
  "5 archetypes · domain mapping",
  "Built for Indian students",
  "Private & judgment-free",
  "~30 minutes on any phone",
];

export function AssessmentMarquee() {
  return (
    <div
      role="region"
      aria-label="Assessment highlights"
      className="relative w-full overflow-hidden border-b border-teal/20 bg-gradient-to-r from-teal/[0.08] via-teal/[0.12] to-cyan-500/[0.08] py-3 sm:py-3.5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-teal/[0.12] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cyan-500/[0.08] to-transparent sm:w-16" />

      <Marquee
        pauseOnHover
        repeat={5}
        className="[--duration:28s] [--gap:2rem] sm:[--gap:3rem]"
      >
        {TICKER_ITEMS.map((item) => (
          <span
            key={item}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold tracking-wide text-teal sm:text-sm"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
              aria-hidden
            />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
