"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Hammer,
  HeartHandshake,
  Lightbulb,
  MoveRight,
  Palette,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Header } from "@/components/landing/header";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ARCHETYPE_LABELS,
  type ArchetypeId,
  type AssessmentResult,
} from "@/lib/assessment";
import { getDivision } from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { AssessmentShell, GlassPanel } from "./assessment-shell";
import { AssessmentMarquee } from "./assessment-marquee";
import { AssessmentTrustStrip } from "./assessment-trust";

const ARCHETYPE_ICONS: Record<ArchetypeId, LucideIcon> = {
  builder: Hammer,
  thinker: Lightbulb,
  creator: Palette,
  leader: Crown,
  guide: HeartHandshake,
};

function ScoreBar({
  id,
  score,
  confidence,
  highlight,
}: {
  id: ArchetypeId;
  score: number;
  confidence: number;
  highlight?: "primary" | "secondary";
}) {
  const label = ARCHETYPE_LABELS[id];
  const Icon = ARCHETYPE_ICONS[id];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/10">
            <Icon className="h-4 w-4 text-teal" />
          </span>
          {label.name}
          {highlight === "primary" ? (
            <Badge className="bg-teal/15 text-teal hover:bg-teal/15">Primary</Badge>
          ) : null}
          {highlight === "secondary" ? (
            <Badge variant="outline" className="border-teal/30 text-teal">
              Secondary
            </Badge>
          ) : null}
        </span>
        <span className="tabular-nums text-sm text-muted-foreground">{score}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/80">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-teal to-cyan-500"
        />
      </div>
      {confidence > 0 ? (
        <p className="text-xs text-muted-foreground">
          +{confidence} context alignment
        </p>
      ) : null}
    </div>
  );
}

function SectionBlock({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlassPanel className={cn("p-6 md:p-8", className)}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </GlassPanel>
  );
}

export function AssessmentResults({ result }: { result: AssessmentResult }) {
  const primary = ARCHETYPE_LABELS[result.primaryArchetype];
  const secondary = ARCHETYPE_LABELS[result.secondaryArchetype];
  const PrimaryIcon = ARCHETYPE_ICONS[result.primaryArchetype];
  const division =
    result.stage === "mindset"
      ? getDivision("mindset")
      : getDivision("mirror");

  return (
    <div className="space-y-8 pb-8 md:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-teal/15 bg-gradient-to-br from-teal/[0.08] via-background/80 to-violet-500/[0.06] px-4 py-8 text-center sm:px-6 sm:py-10 md:rounded-3xl md:px-10 md:py-12"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/20 blur-3xl" />
        <Badge className="mb-3 border-teal/20 bg-teal/10 text-teal hover:bg-teal/10">
          {division.name} · Your portrait
        </Badge>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl">
          {result.combination.identity}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {result.combination.pattern}
        </p>
        <div className="mt-6 flex justify-center">
          <AssessmentTrustStrip />
        </div>
      </motion.div>

      <GlassPanel glow className="relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-violet-500/5" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-teal/20 bg-teal/10 shadow-lg shadow-teal/10">
            <PrimaryIcon className="h-10 w-10 text-teal" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-teal">{primary.name} + {secondary.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {result.combination.logic}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {result.combination.domains.slice(0, 3).map((d) => (
              <span
                key={d}
                className="rounded-full border border-teal/20 bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur-sm"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </GlassPanel>

      <SectionBlock
        title="Archetype signal map"
        subtitle="Questions → Signals → Archetypes. Context adjusts confidence, not core identity."
      >
        <div className="space-y-5">
          {(Object.keys(ARCHETYPE_LABELS) as ArchetypeId[]).map((id) => (
            <ScoreBar
              key={id}
              id={id}
              score={result.archetypeScores[id]}
              confidence={result.archetypeConfidence[id]}
              highlight={
                id === result.primaryArchetype
                  ? "primary"
                  : id === result.secondaryArchetype
                    ? "secondary"
                    : undefined
              }
            />
          ))}
        </div>
      </SectionBlock>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionBlock title="Domain affinities">
          <div className="space-y-3">
            {result.domains.map((d, i) => (
              <div
                key={d.domain}
                className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/40 px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-teal">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm">{d.domain}</span>
                <Badge variant="secondary" className="tabular-nums">
                  {d.confidence}%
                </Badge>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Industry alignments">
          <div className="space-y-3">
            {result.industries.map((ind) => (
              <div
                key={ind.industry}
                className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 px-4 py-3"
              >
                <span className="text-sm">{ind.industry}</span>
                <Badge variant="secondary" className="tabular-nums">
                  {ind.confidence}%
                </Badge>
              </div>
            ))}
          </div>
        </SectionBlock>
      </div>

      <SectionBlock
        title="Exploration pathways"
        subtitle="Possibilities worth exploring — not rigid career prescriptions."
      >
        <div className="flex flex-wrap gap-2">
          {result.exitRoles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Growth insights">
        <div className="grid gap-3 md:grid-cols-2">
          {result.growthFlags.map((flag) => (
            <div
              key={flag.type}
              className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/40 to-transparent p-4 text-sm leading-relaxed text-muted-foreground"
            >
              <Sparkles className="mb-2 h-4 w-4 text-teal" />
              {flag.message}
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="MARGA report">
        <div className="grid gap-3 sm:grid-cols-2">
          {result.margaSections.map((section) => (
            <div
              key={`${section.letter}-${section.name}`}
              className="rounded-2xl border border-border/50 bg-background/40 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                {section.letter} — {section.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{section.meaning}</p>
              <p className="mt-3 text-sm font-medium leading-relaxed">{section.output}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <GlassPanel className="relative overflow-hidden border-0 bg-navy-deep p-8 text-center text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal/30 via-transparent to-transparent" />
        <div className="relative space-y-4">
          <h3 className="text-2xl font-semibold">
            The goal is alignment, not prediction.
          </h3>
          <p className="mx-auto max-w-md text-sm text-white/75">
            Revisit as you grow. Your archetypes may evolve — that is the point.
          </p>
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-teal px-8 text-white hover:bg-teal/90"
            >
              <Link href="/assessment">
                Retake assessment
                <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

export function AssessmentResultsShell({ children }: { children: React.ReactNode }) {
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
