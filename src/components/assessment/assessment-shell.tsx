"use client";

import type { ReactNode } from "react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import {
  margaBadgeStyles,
  margaGhostLinkStyles,
  margaLabelStyles,
  margaOutlineButtonStyles,
  margaPrimaryButtonStyles,
} from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const primaryButtonStyles = margaPrimaryButtonStyles;
const outlineButtonStyles = margaOutlineButtonStyles;
const ghostButtonStyles = margaGhostLinkStyles;
const labelStyles = margaLabelStyles;
const sectionBadgeStyles = margaBadgeStyles;

function AssessmentShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#00000008 1px, transparent 1px),
            linear-gradient(90deg, #00000008 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.012,
        }}
      />
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
  glow: _glow,
  inverted,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-black bg-white",
        inverted && "bg-black text-white",
        className,
      )}
    >
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
    <div className="grid gap-4 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-6 xl:grid-cols-[minmax(240px,280px)_1fr]">
      {sidebar ? (
        <aside className="order-2 lg:order-1">{sidebar}</aside>
      ) : null}
      <div className="order-1 min-w-0 lg:order-2">{children}</div>
    </div>
  );
}

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className={sectionBadgeStyles}>{badge}</p>
      <MargaSectionRule className="mb-0 mt-4" />
      <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-[#525252] md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export {
  AssessmentShell,
  AssessmentSplitLayout,
  GlassPanel,
  SectionHeader,
  ghostButtonStyles,
  labelStyles,
  outlineButtonStyles,
  primaryButtonStyles,
  sectionBadgeStyles,
};
