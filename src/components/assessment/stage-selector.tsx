"use client";

import type { ReactNode } from "react";
import { ArrowRight, Check, GraduationCap, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ASSESSMENT_DIVISIONS,
  getTotalQuestions,
  type AssessmentDivision,
} from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { AssessmentFlowFrame } from "./assessment-nav";
import {
  GlassPanel,
  labelStyles,
  primaryButtonStyles,
  SectionHeader,
} from "./assessment-shell";
import { AssessmentJourneySteps, AssessmentTrustStrip } from "./assessment-trust";

const DIVISION_ICONS = {
  mirror: Search,
  mindset: GraduationCap,
} as const;

interface StageSelectorProps {
  selected: AssessmentDivision | null;
  onSelect: (division: AssessmentDivision) => void;
  onContinue: () => void;
  userName?: string;
  resumeBanner?: ReactNode;
}

export function StageSelector({
  selected,
  onSelect,
  onContinue,
  userName,
  resumeBanner,
}: StageSelectorProps) {
  return (
    <AssessmentFlowFrame step={1}>
      <div className="space-y-8">
        {resumeBanner}

        <GlassPanel className="p-5 sm:p-8">
          <p className={labelStyles}>Self-discovery · not a test</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
            {userName ? `Welcome, ${userName.split(" ")[0]}. ` : ""}
            Let&apos;s find your stage
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#525252] md:text-base">
            Marga maps your motivations, abilities, resilience, goals, and
            self-awareness into one honest portrait. First, choose the division
            built for your age — questions and context adapt to where you are
            right now.
          </p>
          <div className="mt-5">
            <AssessmentTrustStrip />
          </div>
        </GlassPanel>

        <div>
          <SectionHeader
            badge="Step 1"
            title="Which life stage are you in?"
            description="Select the card that matches your age group. You can review and change this on the next screen."
          />

          <div className="grid gap-3 md:grid-cols-2">
            {ASSESSMENT_DIVISIONS.map((division) => {
              const Icon = DIVISION_ICONS[division.id];
              const isSelected = selected === division.id;
              const total = getTotalQuestions(division.id);

              return (
                <button
                  key={division.id}
                  type="button"
                  disabled={!division.available}
                  onClick={() => onSelect(division.id)}
                  className={cn("text-left", !division.available && "opacity-40")}
                  aria-pressed={isSelected}
                >
                  <GlassPanel
                    className={cn(
                      "h-full p-5 transition-colors duration-100",
                      isSelected
                        ? "border-l-4 border-l-marga-yellow bg-black text-white"
                        : "hover:border-l-4 hover:border-l-marga-yellow hover:bg-[#F5F5F5]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center border",
                            isSelected ? "border-white" : "border-black",
                          )}
                        >
                          <Icon className="size-4" strokeWidth={1.5} />
                        </span>
                        <div>
                          <p className={cn(labelStyles, isSelected && "text-white/60")}>
                            {division.tagline}
                          </p>
                          <h3 className="mt-1 text-xl font-semibold">{division.name}</h3>
                          <p
                            className={cn(
                              "mt-0.5 text-xs",
                              isSelected ? "text-white/70" : "text-[#525252]",
                            )}
                          >
                            {division.ageBand}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="size-4 shrink-0" strokeWidth={2} />
                      ) : null}
                    </div>

                    <p
                      className={cn(
                        "mt-4 text-sm leading-relaxed",
                        isSelected ? "text-white/85" : "text-[#525252]",
                      )}
                    >
                      {division.description}
                    </p>
                    <p
                      className={cn(
                        "mt-3 text-xs leading-relaxed",
                        isSelected ? "text-white/60" : "text-[#525252]",
                      )}
                    >
                      {division.experience}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        `${total} questions`,
                        `~${division.minutes} min`,
                        division.coreStage,
                      ].map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "border px-2 py-1 font-label text-[10px] uppercase tracking-widest",
                            isSelected
                              ? "border-white/40 text-white/80"
                              : "border-black text-[#525252]",
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassPanel>
                </button>
              );
            })}
          </div>

          {!selected ? (
            <p className="mt-4 border border-dashed border-black bg-[#F5F5F5] p-4 text-sm text-[#525252]">
              Select a stage above to continue to the overview.
            </p>
          ) : null}

          <div className="mt-6">
            <Button
              size="lg"
              disabled={!selected}
              className={cn(primaryButtonStyles, "h-11 gap-2 px-8")}
              onClick={onContinue}
            >
              Continue to overview
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        <div className="border-t-2 border-black pt-8">
          <SectionHeader
            badge="The journey"
            title="What happens after you choose"
            description="Four phases — from choosing your stage to receiving your personal portrait."
          />
          <AssessmentJourneySteps />
        </div>
      </div>
    </AssessmentFlowFrame>
  );
}
