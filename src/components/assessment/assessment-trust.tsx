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

const TRUST_ITEMS = [
  { icon: Shield, label: "Private & safe" },
  { icon: Brain, label: "Science-backed" },
  { icon: Timer, label: "~30 min" },
  { icon: Zap, label: "Skip anytime" },
] as const;

export function AssessmentTrustStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-teal/15 bg-background/60 px-2.5 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur-sm sm:gap-2 sm:px-3 sm:text-sm"
        >
          <Icon className="h-3 w-3 shrink-0 text-teal sm:h-3.5 sm:w-3.5" />
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
      className={
        compact
          ? "grid grid-cols-2 gap-2 min-[480px]:grid-cols-4"
          : "grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4"
      }
    >
      {JOURNEY_STEPS.map((item) => (
        <div
          key={item.step}
          className="group rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-muted/30 p-4 transition-colors hover:border-teal/25"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal/70">
              Step {item.step}
            </span>
            <item.icon className="h-4 w-4 text-teal opacity-70" />
          </div>
          {!compact ? (
            <>
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </>
          ) : (
            <p className="mt-1 text-xs font-medium">{item.title}</p>
          )}
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
