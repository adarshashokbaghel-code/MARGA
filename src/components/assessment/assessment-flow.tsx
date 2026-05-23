"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FastForward,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Header } from "@/components/landing/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth-mock";
import {
  clearAssessmentProgress,
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
  AssessmentShell,
  AssessmentSplitLayout,
  GlassPanel,
} from "./assessment-shell";
import { AssessmentMarquee } from "./assessment-marquee";
import { AssessmentSidebar } from "./assessment-sidebar";
import {
  AssessmentJourneySteps,
  AssessmentTrustStrip,
  MODULE_JOURNEY,
} from "./assessment-trust";
import { QuestionRenderer } from "./question-renderer";
import { StageSelector } from "./stage-selector";

const MODULE_ORDER = [
  "context",
  "motivation",
  "ability",
  "resilience",
  "goals",
  "awareness",
] as const;

type Phase = "select" | "welcome" | "questions" | "submitting";

function AssessmentProgress({
  moduleName,
  current,
  total,
  moduleIndex,
  compact,
}: {
  moduleName: string;
  current: number;
  total: number;
  moduleIndex: number;
  compact?: boolean;
}) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={cn("space-y-3", compact ? "mb-4" : "mb-6")}>
      <div className="flex items-center justify-between text-sm">
        <Badge
          variant="outline"
          className="border-teal/30 bg-background/60 text-teal"
        >
          {moduleName}
        </Badge>
        <span className="tabular-nums text-muted-foreground">
          {current} / {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal to-cyan-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="flex gap-1">
        {MODULE_ORDER.map((mod, i) => (
          <div
            key={mod}
            title={MODULE_META[mod].name}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= moduleIndex ? "bg-teal/70" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MobileModulePills({ currentModule }: { currentModule: string }) {
  const currentIdx = MODULE_JOURNEY.findIndex((m) => m.id === currentModule);

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {MODULE_JOURNEY.map((mod, i) => (
        <span
          key={mod.id}
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
            i === currentIdx
              ? "bg-teal text-white"
              : i < currentIdx
                ? "bg-teal/15 text-teal"
                : "bg-muted/80 text-muted-foreground",
          )}
        >
          {mod.letter} · {mod.name}
        </span>
      ))}
    </div>
  );
}

function QuestionActions({
  currentIndex,
  isLast,
  onBack,
  onSkip,
  onSubmit,
  onContinue,
  sticky,
}: {
  currentIndex: number;
  isLast: boolean;
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
          ? "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-3 py-3 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
          : "hidden lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:gap-3",
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="ghost"
          disabled={currentIndex === 0}
          onClick={onBack}
          className="h-10 rounded-full text-sm"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="outline"
          className="h-10 rounded-full text-sm"
          onClick={onSkip}
        >
          <FastForward className="mr-1 h-4 w-4" />
          <span className="sm:hidden">Skip</span>
          <span className="hidden sm:inline">Skip question</span>
        </Button>
      </div>

      <Button
        variant="outline"
        className="mt-2 h-10 w-full rounded-full border-teal/30 text-sm text-teal hover:bg-teal/10 lg:mt-0 lg:ml-auto lg:w-auto"
        onClick={onSubmit}
      >
        Submit
      </Button>

      {!isLast ? (
        <Button
          className="mt-2 h-11 w-full rounded-full bg-teal text-sm text-white hover:bg-teal/90 lg:mt-0 lg:w-auto lg:px-6"
          onClick={onContinue}
        >
          Continue
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );

  if (sticky) {
    return (
      <>
        <div className="h-[calc(9.5rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden />
        {bar}
      </>
    );
  }

  return bar;
}
export function AssessmentFlow() {
  const router = useRouter();
  const profile = getProfile();

  const [division, setDivision] = useState<AssessmentDivision | null>(null);
  const stage: LifeStage = division
    ? getDivision(division).stage
    : "mirror";

  const questions = useMemo(
    () => (division ? getQuestionsForStage(stage) : []),
    [division, stage],
  );

  const [phase, setPhase] = useState<Phase>("select");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  const currentQuestion = questions[currentIndex];
  const currentModule = currentQuestion?.module ?? "context";
  const moduleProgress = MODULE_ORDER.indexOf(
    currentModule as (typeof MODULE_ORDER)[number],
  );
  const divisionConfig = division ? getDivision(division) : null;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (phase === "questions" && division) {
      saveAssessmentProgress(stage, answers, currentIndex);
    }
  }, [answers, currentIndex, phase, stage, division]);

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

  if (phase === "select") {
    return (
      <StageSelector
        selected={division}
        onSelect={setDivision}
        onContinue={() => setPhase("welcome")}
        userName={profile?.fullName}
      />
    );
  }

  const sidebar =
    division && divisionConfig ? (
      <AssessmentSidebar
        division={division}
        currentModule={currentModule}
        currentIndex={phase === "welcome" ? 0 : currentIndex}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
      />
    ) : null;

  if (phase === "welcome" && divisionConfig) {
    const total = getTotalQuestions(division!);
    return (
      <AssessmentSplitLayout sidebar={sidebar}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <GlassPanel glow className="relative overflow-hidden p-5 sm:p-8 md:p-10">
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
                divisionConfig.accent,
              )}
            />
            <div className="relative space-y-6">
              <div>
                <Badge className="mb-3 bg-teal/15 text-teal hover:bg-teal/15">
                  Step 2 of 4 · {divisionConfig.name} division
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Ready when you are
                  {profile?.fullName
                    ? `, ${profile.fullName.split(" ")[0]}`
                    : ""}
                </h1>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  A guided self-discovery journey — not a test. Skip any
                  question you want. Once you begin, submit anytime — even with
                  partial answers.
                </p>
              </div>

              <AssessmentTrustStrip />

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "Questions", value: String(total) },
                  { label: "Minutes", value: `~${divisionConfig.minutes}` },
                  { label: "Modules", value: "6" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-background/50 px-2 py-3 text-center backdrop-blur-sm sm:rounded-2xl sm:px-4 sm:py-4"
                  >
                    <p className="text-lg font-semibold text-teal sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <AssessmentJourneySteps compact />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setPhase("select")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Change division
                </Button>
                <Button
                  size="lg"
                  className="flex-1 rounded-full bg-teal text-white hover:bg-teal/90"
                  onClick={() => setPhase("questions")}
                >
                  Begin {divisionConfig.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </AssessmentSplitLayout>
    );
  }

  if (phase === "submitting") {
    return (
      <GlassPanel className="flex flex-col items-center px-8 py-16 text-center md:py-24">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-teal" />
          <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-teal/60" />
        </div>
        <h2 className="mt-6 text-xl font-semibold md:text-2xl">
          Building your portrait
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Questions → Signals → Archetypes → Domains → Pathways
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Signals", "Archetypes", "Domains", "Report"].map((step, i) => (
            <motion.span
              key={step}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
              className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
            >
              {step}
            </motion.span>
          ))}
        </div>
      </GlassPanel>
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

  return (
    <AssessmentSplitLayout sidebar={sidebar}>
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <AssessmentProgress
          moduleName={meta?.name ?? "Assessment"}
          current={currentIndex + 1}
          total={questions.length}
          moduleIndex={moduleProgress}
        />

        <MobileModulePills currentModule={currentModule} />

        <GlassPanel glow className="p-4 sm:p-6 md:p-8">
          <div className="mb-4 space-y-2 sm:mb-6">
            {meta ? (
              <p className="text-[10px] font-medium uppercase tracking-widest text-teal/80 sm:text-xs">
                {meta.letter} · {meta.name} · {meta.time}
              </p>
            ) : null}
            <h2 className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl">
              {currentQuestion.text}
            </h2>
            {currentQuestion.description ? (
              <p className="text-sm text-muted-foreground">
                {currentQuestion.description}
              </p>
            ) : null}
          </div>

          <QuestionRenderer
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(val: AnswerValue) =>
              setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
            }
          />

          <div className="mt-8 hidden border-t border-border/50 pt-6 lg:block">
            <QuestionActions
              currentIndex={currentIndex}
              isLast={isLast}
              onBack={() => setCurrentIndex((i) => i - 1)}
              onSkip={skipQuestion}
              onSubmit={handleSubmit}
              onContinue={() => setCurrentIndex((i) => i + 1)}
            />
          </div>
        </GlassPanel>

        <QuestionActions
          currentIndex={currentIndex}
          isLast={isLast}
          onBack={() => setCurrentIndex((i) => i - 1)}
          onSkip={skipQuestion}
          onSubmit={handleSubmit}
          onContinue={() => setCurrentIndex((i) => i + 1)}
          sticky
        />
      </motion.div>
    </AssessmentSplitLayout>
  );
}

export function AssessmentPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="pt-[4.75rem] md:pt-[5.5rem]">
        <AssessmentMarquee />
        <main className="pb-[max(4rem,env(safe-area-inset-bottom))] pt-4 sm:pt-6 md:pt-8">
          <AssessmentShell>{children}</AssessmentShell>
        </main>
      </div>
    </div>
  );
}
