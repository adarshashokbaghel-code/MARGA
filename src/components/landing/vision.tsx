"use client";

import { MoveRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetStartedButton } from "@/components/ui/get-started-button";

export function Vision() {
  return (
    <section id="vision" className="py-24">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-0 bg-navy-deep text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal/30 via-transparent to-transparent" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />

          <CardHeader className="relative z-10 max-w-3xl pb-2 text-center md:mx-auto md:pt-12">
            <Badge className="mx-auto mb-4 w-fit bg-teal/20 text-white hover:bg-teal/20">
              Our vision
            </Badge>
            <CardTitle className="text-3xl leading-tight font-semibold text-white md:text-4xl">
              A world where no one loses years to the wrong career
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-white/80 md:text-lg">
              For too long, meaningful self-knowledge belonged to those with the
              right mentors, schools, or networks. Every person at a crossroads
              deserves tools to understand themselves deeply — and move forward
              with conviction.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 flex flex-col items-center gap-6 pb-12 text-center">
            <p className="max-w-xl text-lg font-medium text-teal">
              Mission: To make deep career self-knowledge accessible to every
              person, everywhere.
            </p>
            <GetStartedButton
              size="lg"
              className="gap-4 rounded-full bg-teal px-8 text-white hover:bg-teal/90"
            >
              Start with who you are
              <MoveRight className="h-4 w-4" />
            </GetStartedButton>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
