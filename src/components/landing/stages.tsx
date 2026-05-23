"use client";

import Image from "next/image";
import { GraduationCap, Briefcase, Rocket, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <section id="stages" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
            Life stages
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Meet you where you are
          </h2>
          <p className="mt-4 text-muted-foreground">
            From identity discovery in school to reinvention mid-career — Marga
            adapts to your crossroads.
          </p>
        </div>

        <Tabs defaultValue="mirror" className="mx-auto max-w-5xl">
          <TabsList className="mx-auto flex w-full max-w-2xl flex-wrap justify-center">
            {stages.map((stage) => (
              <TabsTrigger key={stage.id} value={stage.id}>
                {stage.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {stages.map((stage) => (
            <TabsContent key={stage.id} value={stage.id}>
              <Card className="overflow-hidden border-border/60 shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="relative min-h-[280px] md:min-h-full">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <stage.icon className="h-5 w-5 text-teal" />
                      <span className="text-sm font-medium text-white">
                        {stage.age}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <CardHeader>
                      <Badge variant="secondary" className="mb-2 w-fit">
                        {stage.stage}
                      </Badge>
                      <CardTitle className="text-foreground">{stage.name}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {stage.experience}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="rounded-xl bg-teal/10 p-4 text-sm leading-relaxed text-foreground dark:bg-teal/20">
                        <span className="font-semibold text-teal">
                          How Marga helps:{" "}
                        </span>
                        {stage.help}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
