"use client";

import Link from "next/link";
import {
  Crown,
  Hammer,
  HeartHandshake,
  Lightbulb,
  MoveRight,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ARCHETYPE_LABELS,
  type ArchetypeId,
  type AssessmentResult,
} from "@/lib/assessment";
import type { ContextSignals } from "@/lib/assessment/types";
import { getDivision } from "@/lib/assessment/stages";
import { cn } from "@/lib/utils";

import { AssessmentFlowFrame } from "./assessment-nav";
import { AssessmentPageShell } from "./assessment-page-shell";
import {
  GlassPanel,
  labelStyles,
  sectionBadgeStyles,
} from "./assessment-shell";

const ARCHETYPE_ICONS: Record<ArchetypeId, LucideIcon> = {
  builder: Hammer,
  thinker: Lightbulb,
  creator: Palette,
  leader: Crown,
  guide: HeartHandshake,
};

const ARCHETYPE_ORDER: ArchetypeId[] = [
  "builder",
  "thinker",
  "creator",
  "leader",
  "guide",
];

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ScoreBar({
  value,
  confidence,
  highlight,
  inverted,
}: {
  value: number;
  confidence?: number;
  highlight?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className={cn("tabular-nums font-semibold", inverted && "text-white")}>
          {value}%
        </span>
        {confidence !== undefined ? (
          <span
            className={cn(
              labelStyles,
              inverted ? "text-white/50" : undefined,
            )}
          >
            {confidence}% confidence
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          "h-2 border border-black",
          inverted ? "border-white/30 bg-white/10" : "bg-white",
        )}
      >
        <div
          className={cn(
            "h-full transition-all",
            highlight
              ? inverted
                ? "bg-marga-yellow"
                : "bg-marga-yellow"
              : inverted
                ? "bg-white/60"
                : "bg-[#525252]",
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

function ArchetypeCard({
  id,
  role,
  score,
  confidence,
}: {
  id: ArchetypeId;
  role: "primary" | "secondary";
  score: number;
  confidence: number;
}) {
  const info = ARCHETYPE_LABELS[id];
  const Icon = ARCHETYPE_ICONS[id];
  const inverted = role === "primary";

  return (
    <div
      className={cn(
        "flex h-full flex-col border border-black p-5 sm:p-6",
        inverted ? "bg-black text-white" : "bg-white",
      )}
    >
      <p
        className={cn(
          labelStyles,
          inverted ? "text-white/60" : undefined,
        )}
      >
        {role === "primary" ? "Lead archetype" : "Secondary strength"}
      </p>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start gap-4">
          <Icon className="size-10 shrink-0" strokeWidth={1.5} />
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{info.name}</h3>
            <p
              className={cn(
                "mt-1 text-sm",
                inverted ? "text-white/70" : "text-[#525252]",
              )}
            >
              {info.tagline}
            </p>
            <p
              className={cn(
                "mt-2 text-xs",
                inverted ? "text-white/50" : "text-[#525252]",
              )}
            >
              Combines: {info.combines}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <ScoreBar
            value={score}
            confidence={confidence}
            highlight
            inverted={inverted}
          />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4 sm:mb-5">
      {eyebrow ? <p className={labelStyles}>{eyebrow}</p> : null}
      <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#525252] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ContextSignalsPanel({ signals }: { signals: ContextSignals }) {
  const rows: { label: string; value: string | string[] | undefined }[] = [
    { label: "Grade / year", value: signals.grade },
    { label: "Career pressure", value: signals.careerPressure },
    { label: "Future clarity", value: signals.futureClarity },
    { label: "Exploration style", value: signals.explorationStyle },
    { label: "MARGA goal", value: signals.margaGoal },
    { label: "Activities you enjoy", value: signals.c3Activities },
    { label: "Future worlds that interest you", value: signals.c4FutureWorlds },
  ];

  const hasContent = rows.some((r) =>
    Array.isArray(r.value) ? r.value.length > 0 : Boolean(r.value),
  );

  if (!hasContent) return null;

  return (
    <GlassPanel className="p-5 sm:p-6">
      <SectionTitle
        eyebrow="From your answers"
        title="Context signals"
        description="Personal details you shared that shaped confidence in your results."
      />
      <dl className="grid gap-px border border-black bg-black sm:grid-cols-2">
        {rows.map((row) => {
          const empty = Array.isArray(row.value)
            ? row.value.length === 0
            : !row.value;
          if (empty) return null;

          return (
            <div key={row.label} className="bg-white p-4">
              <dt className={labelStyles}>{row.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-black">
                {Array.isArray(row.value) ? (
                  <ul className="space-y-1">
                    {row.value.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#525252]">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </GlassPanel>
  );
}

export function AssessmentResults({ result }: { result: AssessmentResult }) {
  const primary = ARCHETYPE_LABELS[result.primaryArchetype];
  const secondary = ARCHETYPE_LABELS[result.secondaryArchetype];
  const division =
    result.stage === "mindset" ? getDivision("mindset") : getDivision("mirror");

  const sortedArchetypes = [...ARCHETYPE_ORDER].sort(
    (a, b) => result.archetypeScores[b] - result.archetypeScores[a],
  );

  return (
    <AssessmentFlowFrame step={4}>
      <div className="w-full space-y-5 sm:space-y-6">
        {/* Hero */}
        <GlassPanel className="border-2 border-black border-l-4 border-l-marga-yellow p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className={sectionBadgeStyles}>
                {division.name} division · Career portrait
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {result.combination.identity}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#525252] sm:text-lg">
                {result.combination.pattern}
              </p>
            </div>
            <div className="shrink-0 border border-black bg-[#F5F5F5] px-4 py-3 text-sm">
              <p className={labelStyles}>Evaluated</p>
              <p className="mt-1 font-medium">{formatDate(result.evaluatedAt)}</p>
            </div>
          </div>
        </GlassPanel>

        {/* Archetypes row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <ArchetypeCard
            id={result.primaryArchetype}
            role="primary"
            score={result.archetypeScores[result.primaryArchetype]}
            confidence={result.archetypeConfidence[result.primaryArchetype]}
          />
          <ArchetypeCard
            id={result.secondaryArchetype}
            role="secondary"
            score={result.archetypeScores[result.secondaryArchetype]}
            confidence={result.archetypeConfidence[result.secondaryArchetype]}
          />
        </div>

        {/* Logic + full scores */}
        <div className="grid gap-4 lg:grid-cols-5">
          <GlassPanel className="p-5 sm:p-6 lg:col-span-2">
            <SectionTitle
              eyebrow="Your blend"
              title="What this combination means"
            />
            <p className="text-sm leading-relaxed text-[#525252] sm:text-base">
              {result.combination.logic}
            </p>
            <div className="mt-5 border-t border-[#E5E5E5] pt-5">
              <p className={labelStyles}>Archetype pairing</p>
              <p className="mt-2 text-sm">
                <strong className="text-black">{primary.name}</strong>
                <span className="text-[#525252]"> — {primary.tagline}</span>
              </p>
              <p className="mt-2 text-sm">
                <strong className="text-black">{secondary.name}</strong>
                <span className="text-[#525252]"> — {secondary.tagline}</span>
              </p>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 sm:p-6 lg:col-span-3">
            <SectionTitle
              eyebrow="All five archetypes"
              title="Your archetype profile"
              description="How strongly each pattern showed up in your answers. Confidence reflects context signals from your responses."
            />
            <div className="space-y-4">
              {sortedArchetypes.map((id) => {
                const isLead =
                  id === result.primaryArchetype ||
                  id === result.secondaryArchetype;
                return (
                  <div key={id}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm",
                          isLead ? "font-semibold text-black" : "text-[#525252]",
                        )}
                      >
                        {ARCHETYPE_LABELS[id].name}
                        {id === result.primaryArchetype ? (
                          <span className="ml-2 border border-marga-yellow bg-marga-yellow-muted px-1.5 py-0.5 font-label text-[9px] uppercase tracking-widest text-black">
                            Lead
                          </span>
                        ) : id === result.secondaryArchetype ? (
                          <span className="ml-2 border border-[#E5E5E5] px-1.5 py-0.5 font-label text-[9px] uppercase tracking-widest text-[#525252]">
                            2nd
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <ScoreBar
                      value={result.archetypeScores[id]}
                      confidence={result.archetypeConfidence[id]}
                      highlight={isLead}
                    />
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </div>

        {/* Domains + Industries */}
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassPanel className="p-5 sm:p-6">
            <SectionTitle
              eyebrow="Where you could thrive"
              title="Domain fit"
              description="Career domains ranked by how well they align with your archetype blend and interests."
            />
            <ul className="space-y-3">
              {result.domains.map((d, i) => (
                <li key={d.domain} className="border border-black p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-label text-[10px] uppercase tracking-widest text-[#525252]">
                        #{i + 1}
                      </span>
                      <p className="mt-1 font-medium">{d.domain}</p>
                    </div>
                    <span className="shrink-0 font-label text-xs tabular-nums">
                      {d.confidence}%
                    </span>
                  </div>
                  <div className="mt-3 h-1 border border-black bg-white">
                    <div
                      className="h-full bg-marga-yellow"
                      style={{ width: `${d.confidence}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="p-5 sm:p-6">
            <SectionTitle
              eyebrow="Ecosystems to explore"
              title="Industry alignment"
              description="Industries where your strengths and domain interests may overlap."
            />
            <ul className="space-y-3">
              {result.industries.map((ind, i) => (
                <li
                  key={ind.industry}
                  className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] pb-3 last:border-0"
                >
                  <span className="text-sm">
                    <span className="mr-2 font-label text-[10px] text-[#525252]">
                      {i + 1}.
                    </span>
                    {ind.industry}
                  </span>
                  <span className="shrink-0 font-label text-xs tabular-nums">
                    {ind.confidence}%
                  </span>
                </li>
              ))}
            </ul>
            {result.combination.industries.length > 0 ? (
              <div className="mt-5 border-t border-[#E5E5E5] pt-4">
                <p className={labelStyles}>From your archetype pairing</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.combination.industries.map((ind) => (
                    <span
                      key={ind}
                      className="border border-black px-2.5 py-1 text-xs"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </GlassPanel>
        </div>

        {/* Exit roles */}
        <GlassPanel className="p-5 sm:p-6">
          <SectionTitle
            eyebrow="Next steps"
            title="Roles & pathways worth exploring"
            description="Starting points — not prescriptions. Use these to research, shadow, or try small projects."
          />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {result.exitRoles.map((role) => (
              <span
                key={role}
                className="border border-black bg-[#F5F5F5] px-3 py-2 text-sm sm:px-4"
              >
                {role}
              </span>
            ))}
          </div>
          {result.combination.exitRoles.length > 0 ? (
            <div className="mt-5 border-t border-[#E5E5E5] pt-4">
              <p className={labelStyles}>Archetype-suggested pathways</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.combination.exitRoles.map((role) => (
                  <span
                    key={role}
                    className="border border-[#E5E5E5] px-2.5 py-1 text-xs text-[#525252]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </GlassPanel>

        {/* MARGA report */}
        <GlassPanel className="p-5 sm:p-6">
          <SectionTitle
            eyebrow="M.A.R.G.A. report"
            title="Module-by-module insights"
            description="A readout across all five modules — motivation, ability, resilience, goals, and awareness."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.margaSections.map((section) => (
              <div
                key={`${section.letter}-${section.name}`}
                className="flex flex-col border border-black p-4 sm:p-5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{section.letter}</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-[#525252]">
                    {section.name}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#525252]">
                  {section.meaning}
                </p>
                <p className="mt-3 flex-1 border-l-2 border-black pl-3 text-sm leading-relaxed">
                  {section.output}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Growth flags */}
        {result.growthFlags.length > 0 ? (
          <GlassPanel className="p-5 sm:p-6">
            <SectionTitle
              eyebrow="Growth edges"
              title="Areas to watch & develop"
              description="Patterns that may need attention — use as conversation starters with mentors or counselors."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {result.growthFlags.map((flag) => (
                <li
                  key={flag.type}
                  className="border border-black bg-[#F5F5F5] p-4"
                >
                  <p className={labelStyles}>{flag.type.replace(/_/g, " ")}</p>
                  <p className="mt-2 text-sm leading-relaxed">{flag.message}</p>
                </li>
              ))}
            </ul>
          </GlassPanel>
        ) : null}

        <ContextSignalsPanel signals={result.contextSignals} />

        {/* CTA */}
        <GlassPanel inverted className="p-8 text-center sm:p-10">
          <p className="text-xl font-semibold italic text-white sm:text-2xl">
            Alignment, not prediction — revisit as you grow.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Your portrait reflects who you are right now. Save these results, share
            them with someone you trust, and retake the assessment as your interests
            evolve.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="outline"
              className="!h-11 !rounded-none !border-2 !border-white !bg-white !px-6 font-label text-xs font-medium uppercase tracking-widest !text-black transition-colors hover:!border-marga-yellow hover:!bg-marga-yellow hover:!text-black"
            >
              <Link href="/assessment" className="inline-flex items-center gap-2">
                Retake assessment
                <MoveRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="!h-11 !rounded-none !border-2 !border-white !bg-transparent !px-6 font-label text-xs font-medium uppercase tracking-widest !text-white transition-colors hover:!border-marga-yellow hover:!bg-marga-yellow hover:!text-black"
            >
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </GlassPanel>

        <p className="pb-4 text-center text-xs text-[#525252]">
          {primary.name} + {secondary.name} · {division.name} division · MARGA
        </p>
      </div>
    </AssessmentFlowFrame>
  );
}

export function AssessmentResultsShell({ children }: { children: React.ReactNode }) {
  return <AssessmentPageShell>{children}</AssessmentPageShell>;
}
