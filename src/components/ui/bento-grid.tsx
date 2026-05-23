import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  meta,
  cta,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: LucideIcon;
  description: string;
  meta?: string;
  cta?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_12px_-4px_rgba(15,35,71,0.08)] transition-shadow hover:shadow-[0_8px_30px_-8px_rgba(15,35,71,0.15)]",
        className,
      )}
    >
      <div className="absolute inset-0">{background}</div>
      <div className="pointer-events-none relative z-10 flex flex-col gap-2 p-6">
        <Icon className="h-10 w-10 text-teal" />
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        {meta && (
          <p className="text-xs font-medium uppercase tracking-wide text-teal">
            {meta}
          </p>
        )}
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {cta && (
        <div className="relative z-10 flex p-4 pt-0 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" size="sm" className="pointer-events-auto text-teal">
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
    </div>
  );
}

export { BentoCard, BentoGrid };
