"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { margaBadgeStyles, margaPrimaryButtonStyles } from "@/lib/brand-styles";
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
    <div className="group border border-black border-t-4 border-t-transparent bg-white px-4 py-5 text-center transition-colors duration-100 hover:border-t-marga-yellow hover:bg-black hover:text-white">
      <p className="font-display text-2xl leading-none tracking-tight md:text-3xl">
        {value}
      </p>
      <p className="font-label mt-2 text-[10px] uppercase tracking-widest text-[#525252] transition-colors duration-100 group-hover:text-white/70">
        {label}
      </p>
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
    <dl className="grid w-full grid-cols-2 border border-black sm:grid-cols-4">
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={cn(
            "border-black px-4 py-3",
            index < facts.length - 1 && "border-b sm:border-b-0",
            index % 2 === 0 && "border-r sm:border-r",
            index < 3 && "sm:border-r",
          )}
        >
          <dt className="font-label text-[10px] uppercase tracking-widest text-[#525252]">
            {fact.label}
          </dt>
          <dd className="mt-1 font-display text-base leading-snug text-black md:text-lg">
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
      className={cn("relative border-b-4 border-black bg-white text-black", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#00000008 1px, transparent 1px),
            linear-gradient(90deg, #00000008 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.015,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-12 pb-16 md:px-8 md:pt-14 md:pb-20 lg:px-12 lg:pt-16 lg:pb-24 xl:px-16">
        <p className={cn(margaBadgeStyles, "mb-6 px-4 py-2 text-xs")}>{badge}</p>

        <MargaSectionRule />

        <div className="flex max-w-4xl flex-col gap-6">
          <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-[#525252] md:text-xl">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatPill label="Total questions" value={String(summary.questions)} />
          <StatPill label="Archetypes" value={String(summary.models)} />
          <StatPill label="Assessment time" value={`${summary.minutes} min`} />
          <StatPill label="Question formats" value={summary.formats} />
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-14">
          <TabsList className="!gap-0 !rounded-none !bg-white !p-0 flex h-auto w-full flex-col items-stretch justify-start overflow-hidden border border-black sm:flex-row">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="font-label flex flex-1 items-center justify-center gap-2 !rounded-none border-0 border-b border-black bg-transparent px-4 py-3.5 text-xs uppercase tracking-widest text-[#525252] shadow-none ring-0 transition-colors duration-100 last:border-b-0 hover:text-marga-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-[-2px] data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-3px_0_0_var(--marga-yellow)] data-[state=active]:hover:text-white sm:border-b-0 sm:border-r sm:data-[state=active]:shadow-[inset_0_3px_0_0_var(--marga-yellow)] sm:last:border-r-0"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-0 border border-t-0 border-black bg-white p-6 md:p-10 lg:p-12">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 grid gap-10 lg:grid-cols-2 lg:gap-14"
              >
                <div className="flex w-full flex-col items-start gap-6">
                  <p className="font-label w-fit border border-black px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#525252]">
                    {tab.content.badge}
                  </p>
                  <h3 className="font-display text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
                    {tab.content.title}
                  </h3>
                  <ModuleFacts content={tab.content} />
                  <p className="font-serif text-base leading-relaxed text-[#525252] md:text-lg">
                    {tab.content.description}
                  </p>
                  {tab.content.insight && (
                    <blockquote className="border-l-4 border-marga-yellow py-1 pl-5">
                      <p className="font-serif text-sm leading-relaxed text-[#525252] md:text-base">
                        <span className="font-display text-base text-black md:text-lg">
                          Why it matters.{" "}
                        </span>
                        {tab.content.insight}
                      </p>
                    </blockquote>
                  )}
                  <Button
                    className={cn(margaPrimaryButtonStyles, "mt-1 h-auto w-fit gap-3 px-8 py-4")}
                    size="lg"
                  >
                    {tab.content.buttonText}
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </Button>
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                  <div className="group relative aspect-[4/3] w-full overflow-hidden border-2 border-black transition-all duration-100 hover:border-marga-yellow lg:aspect-[5/4]">
                    <Image
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      fill
                      className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <p className="mx-auto mt-12 max-w-3xl font-serif text-base leading-relaxed text-[#525252] md:text-lg">
          Marga combines psychometric science, skill assessment, and psychological
          profiling into one portrait — changing the conversation from{" "}
          <span className="text-black">&ldquo;what should I do?&rdquo;</span> to{" "}
          <span className="font-display italic text-black">
            &ldquo;who am I?&rdquo;
          </span>
        </p>
      </div>
    </section>
  );
}

export { Feature108 };
export type { Feature108Props, Tab, TabContent, FrameworkSummary };
