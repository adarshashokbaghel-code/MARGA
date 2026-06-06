"use client";

import { Marquee } from "@/components/ui/marquee";

const TICKER_ITEMS = [
  "No right or wrong answers",
  "Psychometric science",
  "Skip any question",
  "Submit with partial answers",
  "5 archetypes · domain mapping",
  "Private & judgment-free",
  "~30 minutes on any phone",
  "6 modules · M.A.R.G.A.",
];

export function AssessmentMarquee() {
  return (
    <div
      role="region"
      aria-label="Assessment highlights"
      className="w-full overflow-hidden border-b border-black bg-[#F5F5F5] py-2.5"
    >
      <Marquee pauseOnHover repeat={4} className="[--duration:32s] [--gap:2.5rem]">
        {TICKER_ITEMS.map((item) => (
          <span
            key={item}
            className="font-label flex shrink-0 items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-widest text-[#525252]"
          >
            <span className="size-1.5 shrink-0 bg-black" aria-hidden />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
