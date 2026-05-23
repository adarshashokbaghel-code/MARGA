"use client";

import { Check } from "lucide-react";

import { MODULE_META } from "@/lib/assessment";
import type { AssessmentDivision } from "@/lib/assessment/stages";
import { getDivision, getTotalQuestions } from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { GlassPanel } from "./assessment-shell";
import { MODULE_JOURNEY } from "./assessment-trust";

const MODULE_ORDER = [
  "context",
  "motivation",
  "ability",
  "resilience",
  "goals",
  "awareness",
] as const;

interface AssessmentSidebarProps {
  division: AssessmentDivision;
  currentModule: string;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
}

export function AssessmentSidebar({
  division,
  currentModule,
  currentIndex,
  totalQuestions,
  answeredCount,
}: AssessmentSidebarProps) {
  const config = getDivision(division);
  const pct = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const currentModuleIdx = MODULE_ORDER.indexOf(
    currentModule as (typeof MODULE_ORDER)[number],
  );

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      <GlassPanel className="relative overflow-hidden p-4 sm:p-5">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50",
            config.accent,
          )}
        />
        <div className="relative space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal">
              {config.tagline}
            </p>
            <h2 className="text-xl font-semibold">{config.name}</h2>
            <p className="text-xs text-muted-foreground">{config.ageBand}</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex h-12 w-12 shrink-0 sm:h-16 sm:w-16 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  className="stroke-teal transition-all duration-500"
                  strokeWidth="3"
                  strokeDasharray={`${pct} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-bold tabular-nums text-teal">
                {pct}%
              </span>
            </div>
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
              <p className="text-xs text-muted-foreground">
                {answeredCount} answered · {getTotalQuestions(division)} total
              </p>
            </div>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="hidden p-4 md:block lg:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your journey
        </p>
        <ul className="space-y-1">
          {MODULE_JOURNEY.map((mod, i) => {
            const isActive = mod.id === currentModule;
            const isDone = i < currentModuleIdx;
            const meta = MODULE_META[mod.id as keyof typeof MODULE_META];

            return (
              <li
                key={mod.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive && "bg-teal/10 text-foreground",
                  isDone && !isActive && "text-muted-foreground",
                  !isActive && !isDone && "text-muted-foreground/60",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    isActive
                      ? "bg-teal text-white"
                      : isDone
                        ? "bg-teal/20 text-teal"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {isDone && !isActive ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    mod.letter
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{mod.name}</p>
                  {isActive && meta ? (
                    <p className="text-[10px] text-teal">{meta.time}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </GlassPanel>

      <GlassPanel className="hidden border-dashed border-teal/20 bg-teal/[0.03] p-4 lg:block">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Tip:</span> There are
          no wrong answers. Honest responses create a portrait that feels like
          you — not a career label.
        </p>
      </GlassPanel>
    </div>
  );
}
