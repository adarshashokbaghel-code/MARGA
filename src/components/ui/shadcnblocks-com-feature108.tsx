"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  questions: number;
  formats: string;
  models: string;
  time: string;
  insight?: string;
}

interface Tab {
  value: string;
  icon: ReactNode;
  label: string;
  content: TabContent;
}

interface FrameworkSummary {
  questions: number;
  models: number;
  minutes: number;
  formats: string;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
  summary?: FrameworkSummary;
  className?: string;
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background px-4 py-3 text-center">
      <p className="text-2xl font-semibold text-teal">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ModuleFacts({ content }: { content: TabContent }) {
  const facts = [
    { label: "Questions", value: String(content.questions) },
    { label: "Time", value: content.time },
    { label: "Formats", value: content.formats },
    { label: "Models", value: content.models },
  ];

  return (
    <dl className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-lg border border-border/50 bg-background/80 px-3 py-2.5"
        >
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {fact.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold leading-snug text-foreground">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Feature108({
  badge = "M.A.R.G.A. framework",
  heading = "Rigorous science. One human portrait.",
  description = "Five modules, 45 questions, 5 Archetypes — about 30 minutes on any phone.",
  tabs = [],
  summary = { questions: 45, models: 8, minutes: 30, formats: "3 types mixed" },
  className,
}: Feature108Props) {
  if (tabs.length === 0) return null;

  return (
    <section
      id="modules"
      className={cn(
        "border-t bg-muted/30 py-24 font-montserrat lg:py-32",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="border-teal/30 font-montserrat text-teal"
          >
            {badge}
          </Badge>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <StatPill label="Total questions" value={String(summary.questions)} />
          <StatPill label="Archetypes" value={String(summary.models)} />
          <StatPill label="Assessment time" value={`${summary.minutes} min`} />
          <StatPill label="Question formats" value={summary.formats} />
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-12">
          <TabsList className="container flex h-auto w-full flex-col items-stretch justify-center gap-3 bg-transparent p-0 font-montserrat sm:flex-row sm:flex-wrap sm:gap-3">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center gap-2 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:border-border data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 dark:bg-muted/40 lg:p-12">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 grid place-items-start gap-10 lg:grid-cols-2 lg:gap-12"
              >
                <div className="flex w-full flex-col items-start gap-5">
                  <Badge
                    variant="outline"
                    className="w-fit bg-background font-montserrat"
                  >
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
                    {tab.content.title}
                  </h3>
                  <ModuleFacts content={tab.content} />
                  <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  {tab.content.insight && (
                    <p className="rounded-xl border border-teal/20 bg-teal/5 px-4 py-3 text-sm leading-relaxed text-foreground dark:bg-teal/10">
                      <span className="font-semibold text-teal">
                        Why it matters:{" "}
                      </span>
                      {tab.content.insight}
                    </p>
                  )}
                  <Button
                    className="mt-1 w-fit gap-2 bg-teal font-montserrat text-white hover:bg-teal/90"
                    size="lg"
                  >
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:sticky lg:top-28 lg:aspect-[5/4]">
                  <Image
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Marga combines psychometric science, skill assessment, and psychological
          profiling into one portrait — changing the conversation from{" "}
          <span className="font-medium text-foreground">
            &ldquo;what should I do?&rdquo;
          </span>{" "}
          to{" "}
          <span className="font-medium text-teal">&ldquo;who am I?&rdquo;</span>
        </p>
      </div>
    </section>
  );
}

export { Feature108 };
export type { Feature108Props, Tab, TabContent, FrameworkSummary };
