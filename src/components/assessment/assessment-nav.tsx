"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { labelStyles } from "./assessment-shell";

const FLOW_STEPS = [
  { id: 1, label: "Choose stage", short: "Stage", hint: "Pick the age group that fits you." },
  { id: 2, label: "Overview", short: "Review", hint: "Confirm your track, then start." },
  { id: 3, label: "Questions", short: "Answer", hint: "One question at a time. No wrong answers." },
  { id: 4, label: "Results", short: "Results", hint: "Your portrait — who you are and where you could go." },
] as const;

export type AssessmentFlowStep = 1 | 2 | 3 | 4;

export function AssessmentFlowStepper({
  currentStep,
  className,
}: {
  currentStep: AssessmentFlowStep;
  className?: string;
}) {
  return (
    <nav aria-label="Assessment steps" className={className}>
      <ol className="grid grid-cols-4 border border-black">
        {FLOW_STEPS.map((step) => {
          const isCurrent = currentStep === step.id;
          const isComplete = currentStep > step.id;

          return (
            <li
              key={step.id}
              className={cn(
                "border-r border-black px-1 py-2 text-center last:border-r-0 sm:px-2 sm:py-2.5",
                isCurrent && "bg-black text-white shadow-[inset_0_3px_0_0_var(--marga-yellow)]",
                isComplete && "bg-[#F5F5F5]",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  labelStyles,
                  "block text-[9px] sm:text-[10px]",
                  isCurrent ? "text-white/60" : undefined,
                )}
              >
                {step.id}
              </span>
              <span className="mt-0.5 block font-display text-[11px] leading-tight sm:text-xs">
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.short}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 font-serif text-sm text-[#525252]">
        {FLOW_STEPS[currentStep - 1].hint}
      </p>
    </nav>
  );
}

export function AssessmentFlowFrame({
  step,
  children,
}: {
  step: AssessmentFlowStep;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <AssessmentFlowStepper currentStep={step} />
      {children}
    </div>
  );
}

export function WhatToExpect() {
  const items = [
    {
      title: "About 30 minutes",
      body: "Six short sections — Context, then the five M.A.R.G.A. modules. Pause anytime; your answers save automatically.",
    },
    {
      title: "No wrong answers",
      body: "This is self-discovery, not an exam. Pick what feels most true right now — honesty beats perfection.",
    },
    {
      title: "Skip or finish early",
      body: "Unsure about a question? Skip it. Need to stop? Submit with partial answers and still get a portrait.",
    },
    {
      title: "Your results",
      body: "Archetypes, domain fit, industries, and exploration pathways — a lens for where you could thrive, not a label.",
    },
  ];

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.title}
          className="border border-black border-l-4 border-l-marga-yellow bg-[#F5F5F5] p-3 text-sm text-[#525252]"
        >
          <p className="font-semibold text-black">{item.title}</p>
          <p className="mt-1 leading-relaxed">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
