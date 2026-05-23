"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, GraduationCap, Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ASSESSMENT_DIVISIONS,
  getTotalQuestions,
  type AssessmentDivision,
} from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { GlassPanel } from "./assessment-shell";
import {
  AssessmentJourneySteps,
  AssessmentTrustStrip,
} from "./assessment-trust";

const DIVISION_ICONS = {
  mirror: Search,
  mindset: GraduationCap,
} as const;

interface StageSelectorProps {
  selected: AssessmentDivision | null;
  onSelect: (division: AssessmentDivision) => void;
  onContinue: () => void;
  userName?: string;
}

export function StageSelector({
  selected,
  onSelect,
  onContinue,
  userName,
}: StageSelectorProps) {
  return (
    <div className="space-y-8 pb-4 sm:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl border border-teal/15 bg-gradient-to-br from-teal/[0.08] via-background/80 to-violet-500/[0.06] px-4 py-8 text-center sm:px-6 sm:py-10 md:rounded-3xl md:px-12 md:py-14"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative space-y-5">
          <Badge className="border-teal/20 bg-teal/10 text-teal hover:bg-teal/10">
            <Sparkles className="mr-1.5 h-3 w-3" />
            Self-discovery · not a test
          </Badge>

          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Discover who you are
            <span className="block bg-gradient-to-r from-teal to-cyan-500 bg-clip-text text-transparent">
              before you choose what to do
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {userName ? `Welcome, ${userName.split(" ")[0]}. ` : ""}
            Marga maps your motivations, abilities, and aspirations into a
            personal portrait — built for where you are in life right now.
          </p>

          <AssessmentTrustStrip />
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-teal">
            Step 1 of 4
          </p>
          <h2 className="mt-2 text-xl font-semibold sm:text-2xl md:text-3xl">
            Which stage are you in?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Pick the division designed for your age band. You can change this
            before you begin.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ASSESSMENT_DIVISIONS.map((division, index) => {
            const Icon = DIVISION_ICONS[division.id];
            const isSelected = selected === division.id;
            const total = getTotalQuestions(division.id);

            return (
              <motion.button
                key={division.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                disabled={!division.available}
                onClick={() => onSelect(division.id)}
                className="text-left"
              >
                <GlassPanel
                  glow={isSelected}
                  className={cn(
                    "h-full p-4 transition-all duration-300 sm:p-6 md:p-7",
                    isSelected
                      ? "border-teal/40 bg-teal/[0.04] shadow-lg shadow-teal/10"
                      : "hover:border-teal/25 hover:bg-background/80",
                    !division.available && "opacity-50",
                  )}
// comment
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br",
                      division.accent,
                      "border border-white/20",
                    )}
                  >
                    <Icon className="h-6 w-6 text-teal" />
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-teal">
                        {division.tagline}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold md:text-2xl">
                        {division.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {division.ageBand}
                      </p>
                    </div>
                    {isSelected ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {division.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium">
                      {total} questions
                    </span>
                    <span className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium">
                      ~{division.minutes} min
                    </span>
                    <span className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium">
                      {division.coreStage}
                    </span>
                  </div>
                </GlassPanel>
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            disabled={!selected}
            className="w-full rounded-full bg-teal px-10 text-white hover:bg-teal/90 sm:w-auto"
            onClick={onContinue}
          >
            Continue to overview
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 border-t border-border/40 pt-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-teal">
            How it works
          </p>
          <h3 className="mt-2 text-xl font-semibold md:text-2xl">
            From questions to your portrait
          </h3>
        </div>
        <AssessmentJourneySteps />
      </div>
    </div>
  );
}
