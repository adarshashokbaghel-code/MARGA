"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth-mock";
import {
  clearAssessmentProgress,
  getAssessmentProgress,
  getQuestionsForStage,
  MODULE_META,
  saveAssessmentProgress,
  saveAssessmentResult,
  type AnswerValue,
  type AssessmentAnswers,
  type LifeStage,
  type MargaModule,
} from "@/lib/assessment";
import {
  getDivision,
  getTotalQuestions,
  type AssessmentDivision,
} from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import {
  AssessmentFlowFrame,
  WhatToExpect,
} from "./assessment-nav";
import {
  AssessmentOverviewSidebar,
  AssessmentSidebar,
} from "./assessment-sidebar";
import {
  AssessmentJourneySteps,
  AssessmentTrustStrip,
} from "./assessment-trust";
import {
  AssessmentSplitLayout,
  ghostButtonStyles,
  GlassPanel,
  labelStyles,
  outlineButtonStyles,
  primaryButtonStyles,
  sectionBadgeStyles,
} from "./assessment-shell";
import { QuestionRenderer } from "./question-renderer";
import { StageSelector } from "./stage-selector";

type Phase = "select" | "welcome" | "questions" | "submitting";

function QuestionActions({
  currentIndex,
  isLast,
  hasAnswer,
  onBack,
  onSkip,
  onSubmit,
  onContinue,
  sticky,
}: {
  currentIndex: number;
  isLast: boolean;
  hasAnswer: boolean;
  onBack: () => void;
  onSkip: () => void;
  onSubmit: () => void;
  onContinue: () => void;
  sticky?: boolean;
}) {
  const bar = (
    <div
      className={cn(
        sticky
          ? "fixed inset-x-0 bottom-0 z-40 border-t-2 border-black bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          : "border-t border-black pt-4",
      )}
    >
      <div className="flex items-center justify-between gap-3 pb-3">
        <button type="button" onClick={onSkip} className={ghostButtonStyles}>
          Skip this question
        </button>
        <button type="button" onClick={onSubmit} className={ghostButtonStyles}>
          Finish & see results
        </button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={onBack}
          className={cn(outlineButtonStyles, "h-11 w-11 shrink-0 px-0")}
          aria-label="Previous question"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
        </Button>
        <Button
          className={cn(primaryButtonStyles, "h-11 min-w-0 flex-1 gap-2")}
          onClick={isLast ? onSubmit : onContinue}
        >
          {isLast ? "See my results" : hasAnswer ? "Next question" : "Next (skipped)"}
          <ArrowRight className="size-4 shrink-0" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );

  if (sticky) {
    return (
      <>
        <div className="h-[calc(7.5rem+env(safe-area-inset-bottom))] md:hidden" aria-hidden />
        <div className="md:hidden">{bar}</div>
      </>
    );
  }

  return <div className="hidden md:block">{bar}</div>;
}

function questionHint(type: string) {
  switch (type) {
    case "single_select":
      return "Choose the one option that fits you best.";
    case "multi_select":
      return "Select every option that applies to you.";
    case "likert":
      return "Rate from 1 (strongly disagree) to 5 (strongly agree).";
    case "rank":
      return "Rank each item — 1 is most true for you, 5 is least.";
    default:
      return "Answer honestly — there are no wrong responses.";
  }
}

export function AssessmentFlow() {
  const router = useRouter();
  const profile = getProfile();

  const [division, setDivision] = useState<AssessmentDivision | null>(null);
  const stage: LifeStage = division ? getDivision(division).stage : "mirror";

  const questions = useMemo(
    () => (division ? getQuestionsForStage(stage) : []),
    [division, stage],
  );

  const [phase, setPhase] = useState<Phase>("select");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [savedProgress, setSavedProgress] = useState<ReturnType<
    typeof getAssessmentProgress
  > | null>(null);
  const [moduleBanner, setModuleBanner] = useState<string | null>(null);
  const [prevModule, setPrevModule] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const currentModule = currentQuestion?.module ?? "context";
  const divisionConfig = division ? getDivision(division) : null;
  const answeredCount = Object.keys(answers).length;
  const hasAnswer =
    currentQuestion?.id !== undefined && answers[currentQuestion.id] !== undefined;

  useEffect(() => {
    setSavedProgress(getAssessmentProgress());
  }, []);

  useEffect(() => {
    if (phase === "questions" && division) {
      saveAssessmentProgress(stage, answers, currentIndex);
    }
  }, [answers, currentIndex, phase, stage, division]);

  useEffect(() => {
    if (phase !== "questions" || !prevModule) {
      setPrevModule(currentModule);
      return;
    }
    if (currentModule !== prevModule) {
      const name = MODULE_META[currentModule as MargaModule]?.name ?? currentModule;
      setModuleBanner(name);
      setPrevModule(currentModule);
      const timer = setTimeout(() => setModuleBanner(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentModule, prevModule, phase]);

  const handleSubmit = async () => {
    setPhase("submitting");
    try {
      const res = await fetch("/api/assessment/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage, answers }),
      });
      if (!res.ok) throw new Error("Evaluation failed");
      const result = await res.json();
      saveAssessmentResult(result);
      clearAssessmentProgress();
      router.push("/assessment/results");
    } catch {
      setPhase("questions");
    }
  };

  const handleResume = () => {
    if (!savedProgress) return;
    const div = savedProgress.stage as AssessmentDivision;
    setDivision(div);
    setAnswers(savedProgress.answers);
    setCurrentIndex(savedProgress.currentIndex);
    setPhase("questions");
    setSavedProgress(null);
  };

  const resumeBanner = savedProgress ? (
    <GlassPanel className="flex flex-col gap-3 border-2 border-black bg-[#F5F5F5] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className={labelStyles}>Continue where you left off</p>
        <p className="mt-1 text-sm text-black">
          {getDivision(savedProgress.stage as AssessmentDivision).name} division ·
          Question {savedProgress.currentIndex + 1} ·{" "}
          {Object.keys(savedProgress.answers).length} answered
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className={cn(outlineButtonStyles, "h-10")}
          onClick={() => {
            clearAssessmentProgress();
            setSavedProgress(null);
          }}
        >
          Start fresh
        </Button>
        <Button className={cn(primaryButtonStyles, "h-10")} onClick={handleResume}>
          Resume
        </Button>
      </div>
    </GlassPanel>
  ) : null;

  if (phase === "select") {
    return (
      <StageSelector
        selected={division}
        onSelect={setDivision}
        onContinue={() => setPhase("welcome")}
        userName={profile?.fullName}
        resumeBanner={resumeBanner}
      />
    );
  }

  if (phase === "welcome" && divisionConfig) {
    const total = getTotalQuestions(division!);
    return (
      <AssessmentFlowFrame step={2}>
        <AssessmentSplitLayout
          sidebar={<AssessmentOverviewSidebar division={division!} />}
        >
          <div className="space-y-5">
            <GlassPanel className="p-5 sm:p-8">
              <p className={sectionBadgeStyles}>
                {divisionConfig.name} · {divisionConfig.coreStage}
              </p>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to begin?
                {profile?.fullName ? ` ${profile.fullName.split(" ")[0]}.` : ""}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#525252] md:text-base">
                {divisionConfig.description} You&apos;ll answer {total} questions
                across six sections in about {divisionConfig.minutes} minutes.
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-px border border-black bg-black sm:grid-cols-4">
                {[
                  { label: "Questions", value: String(total) },
                  { label: "Minutes", value: `~${divisionConfig.minutes}` },
                  { label: "Sections", value: "6" },
                  { label: "Archetypes", value: "5" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white px-3 py-3 text-center">
                    <dt className={labelStyles}>{stat.label}</dt>
                    <dd className="text-lg font-semibold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </GlassPanel>

            <GlassPanel className="p-5 sm:p-6">
              <p className={cn(labelStyles, "mb-4")}>Before you start</p>
              <WhatToExpect />
            </GlassPanel>

            <div>
              <p className={cn(labelStyles, "mb-3")}>Your path to results</p>
              <AssessmentJourneySteps compact />
            </div>

            <AssessmentTrustStrip />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className={cn(outlineButtonStyles, "h-11")}
                onClick={() => setPhase("select")}
              >
                <ArrowLeft className="mr-2 size-4" strokeWidth={1.5} />
                Change stage
              </Button>
              <Button
                className={cn(primaryButtonStyles, "h-11 flex-1 gap-2")}
                onClick={() => setPhase("questions")}
              >
                Start questions
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </AssessmentSplitLayout>
      </AssessmentFlowFrame>
    );
  }

  if (phase === "submitting") {
    return (
      <AssessmentFlowFrame step={4}>
        <GlassPanel className="flex w-full flex-col items-center px-6 py-16 text-center">
          <Loader2 className="size-10 animate-spin text-black" strokeWidth={1.5} />
          <h2 className="mt-6 text-xl font-semibold">Building your portrait</h2>
          <p className="mt-2 max-w-md text-sm text-[#525252]">
            Mapping your answers into archetypes, domains, industries, and
            pathways. This takes a few seconds.
          </p>
        </GlassPanel>
      </AssessmentFlowFrame>
    );
  }

  if (!currentQuestion || !divisionConfig) return null;

  const meta = currentModule
    ? MODULE_META[currentModule as MargaModule]
    : undefined;
  const isLast = currentIndex >= questions.length - 1;

  const skipQuestion = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const sidebar = division ? (
    <AssessmentSidebar
      division={division}
      currentModule={currentModule}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      answeredCount={answeredCount}
    />
  ) : null;

  return (
    <AssessmentFlowFrame step={3}>
      <AssessmentSplitLayout sidebar={sidebar}>
        <div className="space-y-3">
          <AssessmentSidebar
            division={division!}
            currentModule={currentModule}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            answeredCount={answeredCount}
            compact
          />

          {moduleBanner ? (
            <p className="border border-black bg-marga-yellow px-4 py-2.5 text-center font-label text-xs uppercase tracking-widest text-black">
              Starting section: {moduleBanner}
            </p>
          ) : null}

          <GlassPanel className="p-4 sm:p-6 lg:p-8">
            <div className="mb-5 space-y-2 border-b border-[#E5E5E5] pb-5">
              <p className={labelStyles}>
                {meta?.name ?? "Question"} · ~{meta?.time ?? "—"}
              </p>
              <h2 className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl">
                {currentQuestion.text}
              </h2>
              {currentQuestion.description ? (
                <p className="text-sm text-[#525252]">{currentQuestion.description}</p>
              ) : null}
              <p className="border-l-4 border-marga-yellow pl-3 text-sm text-[#525252]">
                {questionHint(currentQuestion.type)}
              </p>
            </div>

            <QuestionRenderer
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={(val: AnswerValue) =>
                setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
              }
            />

            <QuestionActions
              currentIndex={currentIndex}
              isLast={isLast}
              hasAnswer={hasAnswer}
              onBack={() => setCurrentIndex((i) => i - 1)}
              onSkip={skipQuestion}
              onSubmit={handleSubmit}
              onContinue={() => setCurrentIndex((i) => i + 1)}
            />
          </GlassPanel>

          <QuestionActions
            currentIndex={currentIndex}
            isLast={isLast}
            hasAnswer={hasAnswer}
            onBack={() => setCurrentIndex((i) => i - 1)}
            onSkip={skipQuestion}
            onSubmit={handleSubmit}
            onContinue={() => setCurrentIndex((i) => i + 1)}
            sticky
          />
        </div>
      </AssessmentSplitLayout>
    </AssessmentFlowFrame>
  );
}
