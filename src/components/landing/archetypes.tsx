import {
  Hammer,
  Lightbulb,
  Palette,
  Crown,
  HeartHandshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

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
  combines,
  Icon,
}: (typeof archetypes)[number]) {
  return (
    <div className="mx-2 w-[280px] shrink-0 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <Icon className="mb-4 h-10 w-10 text-teal" />
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{identity}</p>
      
    </div>
  );
}

export function Archetypes() {
  return (
    <section id="archetypes" className="overflow-hidden border-t bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
            Your portrait
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Five archetypes. One honest story.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not a label — a lens for where you could thrive.
          </p>
        </div>
      </div>

      <Marquee pauseOnHover className="[--duration:50s]">
        {archetypes.map((archetype) => (
          <ArchetypeCard key={archetype.name} {...archetype} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="mt-4 [--duration:55s]">
        {archetypes.map((archetype) => (
          <ArchetypeCard key={`${archetype.name}-rev`} {...archetype} />
        ))}
      </Marquee>
    </section>
  );
}
