import {
  Crown,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { Marquee } from "@/components/ui/marquee";
import { margaBadgeStyles } from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const archetypes: {
  name: string;
  identity: string;
  combines: string;
  Icon: LucideIcon;
}[] = [
  {
    name: "The Builder",
    identity: "Creates, improves, solves",
    combines: "Inventor + Architect",
    Icon: Hammer,
  },
  {
    name: "The Thinker",
    identity: "Analyzes, plans, understands",
    combines: "Strategist + Curator",
    Icon: Lightbulb,
  },
  {
    name: "The Creator",
    identity: "Expresses, imagines, communicates",
    combines: "Creator",
    Icon: Palette,
  },
  {
    name: "The Leader",
    identity: "Influences, drives, mobilizes",
    combines: "Catalyst",
    Icon: Crown,
  },
  {
    name: "The Guide",
    identity: "Supports, empathizes, nurtures",
    combines: "Guide",
    Icon: HeartHandshake,
  },
];

function ArchetypeCard({
  name,
  identity,
  Icon,
}: (typeof archetypes)[number]) {
  return (
    <div
      className={cn(
        "group mx-2 w-[280px] shrink-0 border border-black border-l-4 border-l-transparent bg-white p-6",
        "transition-colors duration-100 hover:border-l-marga-yellow hover:bg-black hover:text-white",
      )}
    >
      <Icon
        className="mb-4 size-8 text-black transition-colors duration-100 group-hover:text-marga-yellow"
        strokeWidth={1.5}
      />
      <h3 className="font-display text-xl tracking-tight">{name}</h3>
      <p className="mt-2 font-serif text-sm leading-relaxed text-[#525252] transition-colors duration-100 group-hover:text-white/70">
        {identity}
      </p>
    </div>
  );
}

export function Archetypes() {
  return (
    <section
      id="archetypes"
      className="relative overflow-hidden border-b-4 border-black bg-[#F5F5F5] py-12 text-black md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
        <p className={cn(margaBadgeStyles, "mb-6 px-4 py-2 text-xs")}>
          Your portrait
        </p>

        <MargaSectionRule />

        <div className="mb-10 flex max-w-4xl flex-col gap-6">
          <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl">
            Five archetypes. One honest story.
          </h2>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-[#525252] md:text-xl">
            Not a label — a lens for where you could thrive.
          </p>
        </div>
      </div>

      <Marquee pauseOnHover className="border-y border-black bg-white py-4 [--duration:50s]">
        {archetypes.map((archetype) => (
          <ArchetypeCard key={archetype.name} {...archetype} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="bg-white py-4 [--duration:55s]">
        {archetypes.map((archetype) => (
          <ArchetypeCard key={`${archetype.name}-rev`} {...archetype} />
        ))}
      </Marquee>
    </section>
  );
}
