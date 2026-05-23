"use client";

import type { ReactNode } from "react";

import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

function AssessmentShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <GridPattern
          width={48}
          height={48}
          className={cn(
            "fill-teal/[0.07] stroke-teal/10",
            "[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]",
          )}
        />
        <DotPattern
          width={22}
          height={22}
          cr={1}
          className="fill-navy/10 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]"
        />
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-teal/25 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-cyan-400/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function GlassPanel({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/25 bg-background/75 shadow-[0_12px_48px_rgb(0,0,0,0.07)] backdrop-blur-xl md:rounded-3xl dark:border-white/10 dark:bg-background/55 dark:shadow-[0_12px_48px_rgb(0,0,0,0.4)]",
        glow && "ring-1 ring-teal/25 shadow-teal/5",
        className,
      )}
    >
      {glow ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
      ) : null}
      {children}
    </div>
  );
}

function AssessmentSplitLayout({
  sidebar,
  children,
}: {
  sidebar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-8 xl:grid-cols-[minmax(280px,320px)_1fr]">
      {sidebar ? (
        <aside className="order-2 lg:order-1">{sidebar}</aside>
      ) : null}
      <div className="order-1 min-w-0 lg:order-2">{children}</div>
    </div>
  );
}

export { AssessmentShell, GlassPanel, AssessmentSplitLayout };
