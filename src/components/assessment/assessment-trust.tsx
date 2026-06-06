"use client";

import {
  Brain,
  Compass,
  Heart,
  Shield,
  Sparkles,
  Target,
  Timer,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { icon: Shield, label: "Private & safe" },
  { icon: Brain, label: "Science-backed" },
  { icon: Timer, label: "~30 min" },
  { icon: Zap, label: "Skip anytime" },
] as const;

export function AssessmentTrustStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center justify-center gap-1.5 border border-black bg-white px-2 py-2 font-label text-[10px] uppercase tracking-widest text-black transition-colors hover:border-l-4 hover:border-l-marga-yellow"
        >
          <Icon className="size-3 shrink-0 text-marga-yellow" strokeWidth={1.5} />
          {label}
        </span>
      ))}
    </div>
  );
}

export const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Context",
    desc: "Your world, interests & aspirations",
    icon: Compass,
  },
  {
    step: "02",
    title: "MARGA modules",
    desc: "Motivation, ability, resilience, goals, awareness",
    icon: Heart,
  },
  {
    step: "03",
    title: "Signal mapping",
    desc: "Patterns across who you are & how you think",
    icon: Brain,
  },
  {
    step: "04",
    title: "Your portrait",
    desc: "Archetypes, domains & exploration pathways",
    icon: Sparkles,
  },
] as const;

export function AssessmentJourneySteps({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-2",
        compact
          ? "grid-cols-2 min-[480px]:grid-cols-4"
          : "grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {JOURNEY_STEPS.map((item) => (
        <div
          key={item.step}
          className="group border border-black border-l-4 border-l-transparent bg-white p-3 transition-colors duration-100 hover:border-l-marga-yellow hover:bg-black hover:text-white"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-marga-yellow group-hover:text-marga-yellow">
              {item.step}
            </span>
            <item.icon
              className="size-3.5 shrink-0 text-black group-hover:text-marga-yellow"
              strokeWidth={1.5}
            />
          </div>
          <p className="mt-2 font-display text-sm leading-tight">{item.title}</p>
          {!compact ? (
            <p className="mt-1 font-serif text-xs leading-relaxed text-[#525252] group-hover:text-white/70">
              {item.desc}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export const MODULE_JOURNEY = [
  { id: "context", letter: "C", name: "Context", icon: Compass },
  { id: "motivation", letter: "M", name: "Motivation", icon: Heart },
  { id: "ability", letter: "A", name: "Ability", icon: Brain },
  { id: "resilience", letter: "R", name: "Resilience", icon: Sparkles },
  { id: "goals", letter: "G", name: "Goals", icon: Target },
  { id: "awareness", letter: "A", name: "Awareness", icon: Compass },
] as const;
