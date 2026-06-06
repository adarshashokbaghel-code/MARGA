"use client";

import Image from "next/image";
import { Briefcase, GraduationCap, Rocket, Search } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { margaBadgeStyles } from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "mirror",
    name: "Mirror",
    icon: Search,
    age: "Grades 8–10",
    stage: "Identity Discovery",
    experience:
      "Curiosity, confusion, comparison with peers, early interests forming, pressure from parents and society beginning.",
    help: "Understand natural strengths, motivations, learning styles, and personality patterns — without boxing anyone into rigid careers.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    alt: "Students in a classroom",
  },
  {
    id: "mindset",
    name: "Mindset",
    icon: GraduationCap,
    age: "Grades 11–12",
    stage: "Direction & Decision Making",
    experience:
      "Stream pressure, career anxiety, fear of wrong choices, entrance exam stress, and constant peer comparison.",
    help: "Identify suitable domains, environments, and pathways aligned to personality, aptitude, goals, and emotional drivers.",
    image:
      "https://images.unsplash.com/photo-1427504490123-87ce5f9bfe1a?w=1200&q=80",
    alt: "Student studying",
  },
  {
    id: "motion",
    name: "Motion",
    icon: Rocket,
    age: "18–24",
    stage: "Career Building & Transition",
    experience:
      "Placement pressure, identity confusion, skill gaps, uncertainty about roles, and degree vs. career mismatch.",
    help: "Find career fit, workstyle alignment, employability strengths, growth gaps, and future-ready paths.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    alt: "Young professionals collaborating",
  },
  {
    id: "meaning",
    name: "Meaning",
    icon: Briefcase,
    age: "24+",
    stage: "Reinvention & Fulfillment",
    experience:
      "Burnout, stagnation, career drift, desire for meaningful work, mid-career pivots, and AI-era uncertainty.",
    help: "Rediscover strengths, identify misalignment, explore reinvention pathways, and align work with identity and purpose.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    alt: "Professional in conversation",
  },
];

export function Stages() {
  return (
    <section id="stages" className="relative border-b-4 border-black bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            #00000008 40px,
            #00000008 42px
          )`,
          opacity: 0.01,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-12 pb-16 md:px-8 md:pt-14 md:pb-20 lg:px-12 lg:pt-16 lg:pb-24 xl:px-16">
        <p className={cn(margaBadgeStyles, "mb-6 px-4 py-2 text-xs")}>
          Life stages
        </p>

        <MargaSectionRule />

        <div className="mb-12 flex max-w-4xl flex-col gap-6">
          <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl">
            Meet you where you are
          </h2>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-[#525252] md:text-xl">
            From identity discovery in school to reinvention mid-career — Marga
            adapts to your crossroads.
          </p>
        </div>

        <Tabs defaultValue="mirror" className="mx-auto w-full max-w-5xl">
          <TabsList className="!gap-0 !rounded-none !bg-white !p-0 flex h-auto w-full flex-col items-stretch justify-start overflow-hidden border border-black sm:flex-row">
            {stages.map((stage) => (
              <TabsTrigger
                key={stage.id}
                value={stage.id}
                className="font-label flex flex-1 items-center justify-center !rounded-none border-0 border-b border-black bg-transparent px-4 py-3.5 text-xs uppercase tracking-widest text-[#525252] shadow-none ring-0 transition-colors duration-100 last:border-b-0 hover:text-marga-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-[-2px] data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-3px_0_0_var(--marga-yellow)] data-[state=active]:hover:text-white sm:border-b-0 sm:border-r sm:data-[state=active]:shadow-[inset_0_3px_0_0_var(--marga-yellow)] sm:last:border-r-0"
              >
                {stage.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {stages.map((stage) => (
            <TabsContent key={stage.id} value={stage.id} className="mt-0">
              <div className="grid border border-t-0 border-black bg-white md:grid-cols-2">
                <div className="group relative min-h-[280px] border-b border-black md:min-h-[360px] md:border-b-0 md:border-r">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 border border-white bg-black px-3 py-1.5">
                    <stage.icon className="size-4 text-white" strokeWidth={1.5} />
                    <span className="font-label text-[10px] uppercase tracking-widest text-white">
                      {stage.age}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="font-label mb-4 w-fit border border-black px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#525252]">
                    {stage.stage}
                  </p>
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {stage.name}
                  </h3>
                  <p className="mt-4 font-serif text-base leading-relaxed text-[#525252] md:text-lg">
                    {stage.experience}
                  </p>
                  <blockquote className="mt-6 border-l-4 border-black py-1 pl-5">
                    <p className="font-serif text-sm leading-relaxed text-[#525252] md:text-base">
                      <span className="font-display text-base text-black md:text-lg">
                        How Marga helps.{" "}
                      </span>
                      {stage.help}
                    </p>
                  </blockquote>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
