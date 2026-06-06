"use client";

import { Check } from "lucide-react";

import { MODULE_META } from "@/lib/assessment";
import type { AssessmentDivision } from "@/lib/assessment/stages";
import { getDivision, getTotalQuestions } from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { GlassPanel, labelStyles } from "./assessment-shell";
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
  compact?: boolean;
}

export function AssessmentProgressSummary({
  division,
  currentIndex,
  totalQuestions,
  answeredCount,
  currentModule,
  className,
}: {
  division: AssessmentDivision;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  currentModule: string;
  className?: string;
}) {
  const config = getDivision(division);
  const pct = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const moduleIdx = MODULE_ORDER.indexOf(
    currentModule as (typeof MODULE_ORDER)[number],
  );
  const moduleName =
    MODULE_JOURNEY.find((m) => m.id === currentModule)?.name ?? "Assessment";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={labelStyles}>{config.name} division</p>
          <p className="text-sm text-black">
            Question <strong>{currentIndex + 1}</strong> of {totalQuestions}
          </p>
        </div>
        <span className="text-lg font-semibold tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden border border-black bg-white">
        <div
          className="h-full bg-marga-yellow transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-[#525252]">
        Section {moduleIdx + 1} of 6 — {moduleName} · {answeredCount} answered
      </p>
    </div>
  );
}

export function AssessmentOverviewSidebar({
  division,
}: {
  division: AssessmentDivision;
}) {
  const config = getDivision(division);
  const total = getTotalQuestions(division);

  return (
    <div className="space-y-3 lg:sticky lg:top-20">
      <GlassPanel className="p-4">
        <p className={labelStyles}>{config.tagline}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{config.name}</h2>
        <p className="mt-1 text-xs text-[#525252]">{config.ageBand}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#525252]">
          {config.experience}
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-px border border-black bg-black">
          {[
            { label: "Questions", value: String(total) },
            { label: "Minutes", value: `~${config.minutes}` },
            { label: "Sections", value: "6" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-2 py-2 text-center">
              <dt className={labelStyles}>{stat.label}</dt>
              <dd className="text-sm font-semibold leading-none">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </GlassPanel>

      <GlassPanel className="p-3">
        <p className={cn(labelStyles, "mb-2")}>Six sections you will complete</p>
        <ul className="space-y-px border border-black bg-black">
          {MODULE_JOURNEY.map((mod) => {
            const meta = MODULE_META[mod.id as keyof typeof MODULE_META];
            return (
              <li
                key={mod.id}
                className="flex items-center justify-between gap-2 bg-white px-3 py-2"
              >
                <span className="text-sm">
                  <span className={labelStyles}>{mod.letter}</span> {mod.name}
                </span>
                <span className={labelStyles}>{meta?.time}</span>
              </li>
            );
          })}
        </ul>
      </GlassPanel>
    </div>
  );
}

export function AssessmentSidebar({
  division,
  currentModule,
  currentIndex,
  totalQuestions,
  answeredCount,
  compact,
}: AssessmentSidebarProps) {
  const config = getDivision(division);
  const currentModuleIdx = MODULE_ORDER.indexOf(
    currentModule as (typeof MODULE_ORDER)[number],
  );

  if (compact) {
    return (
      <GlassPanel className="p-3 lg:hidden">
        <AssessmentProgressSummary
          division={division}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          currentModule={currentModule}
        />
      </GlassPanel>
    );
  }

  return (
    <div className="hidden space-y-3 lg:sticky lg:top-20 lg:block">
      <GlassPanel className="p-4">
        <p className={labelStyles}>{config.tagline}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{config.name}</h2>
        <p className="mt-0.5 text-xs text-[#525252]">{config.ageBand}</p>

        <div className="mt-4">
          <AssessmentProgressSummary
            division={division}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            answeredCount={answeredCount}
            currentModule={currentModule}
          />
        </div>
      </GlassPanel>

      <GlassPanel className="p-3">
        <p className={cn(labelStyles, "mb-2 px-1")}>Your progress by section</p>
        <ul className="space-y-px border border-black bg-black">
          {MODULE_JOURNEY.map((mod, i) => {
            const isActive = mod.id === currentModule;
            const isDone = i < currentModuleIdx;
            const meta = MODULE_META[mod.id as keyof typeof MODULE_META];

            return (
              <li
                key={mod.id}
                className={cn(
                  "flex items-center gap-2 bg-white px-2 py-2 text-sm transition-colors duration-100",
                  isActive && "border-l-4 border-l-marga-yellow bg-black text-white",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center border font-label text-[10px] font-medium",
                    isActive
                      ? "border-white text-white"
                      : isDone
                        ? "border-black bg-black text-white"
                        : "border-black text-black",
                  )}
                >
                  {isDone && !isActive ? (
                    <Check className="size-3" strokeWidth={2} />
                  ) : (
                    mod.letter
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{mod.name}</p>
                  <p
                    className={cn(
                      "font-label text-[10px] uppercase tracking-widest",
                      isActive ? "text-white/60" : "text-[#525252]",
                    )}
                  >
                    {meta?.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </GlassPanel>

      <GlassPanel className="p-3">
        <p className="border-l-4 border-marga-yellow pl-3 text-xs leading-relaxed text-[#525252]">
          <span className="text-sm font-semibold text-black">Tip. </span>
          Answer what feels true today. Skip or go back anytime — your progress
          saves automatically.
        </p>
      </GlassPanel>
    </div>
  );
}
