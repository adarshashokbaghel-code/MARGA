"use client";

import { ArrowRight } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { margaBadgeInvertedStyles, margaPrimaryButtonStyles } from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

export function Vision() {
  return (
    <section id="vision" className="relative border-b-4 border-black bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            #fff 1px,
            #fff 2px
          )`,
          backgroundSize: "4px 100%",
          opacity: 0.03,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at top center, #ffffff, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16">
        <p className={cn(margaBadgeInvertedStyles, "mb-6")}>Our vision</p>

        <MargaSectionRule inverted />

        <div className="flex max-w-4xl flex-col gap-8">
          <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl">
            A world where no one loses years to the wrong career
          </h2>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-white/70 md:text-xl">
            For too long, meaningful self-knowledge belonged to those with the
            right mentors, schools, or networks. Every person at a crossroads
            deserves tools to understand themselves deeply — and move forward
            with conviction.
          </p>
          <p className="font-display max-w-2xl text-xl italic leading-relaxed text-white md:text-2xl">
            <span className="text-marga-yellow">Mission:</span> To make deep career
            self-knowledge accessible to every person, everywhere.
          </p>
        </div>

        <div className="mt-12">
          <GetStartedButton
            size="lg"
            className={cn(
              margaPrimaryButtonStyles,
              "h-auto gap-3 border-white bg-white px-8 py-4 text-black hover:border-marga-yellow hover:bg-marga-yellow",
            )}
          >
            Start with who you are
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </GetStartedButton>
        </div>
      </div>
    </section>
  );
}
