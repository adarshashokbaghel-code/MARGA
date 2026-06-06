"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/ui/get-started-button";
import {
  margaBadgeStyles,
  margaOutlineButtonStyles,
  margaPrimaryButtonStyles,
} from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["who you are", "your strengths", "your path", "your purpose", "conviction"],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((current) => (current === titles.length - 1 ? 0 : current + 1));
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="w-full border-b-4 border-black shadow-[inset_0_-4px_0_0_var(--marga-yellow)]">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex w-full flex-col pt-16 pb-12 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16">
          <p className={cn(margaBadgeStyles, "mb-6 px-4 py-2 text-xs")}>
            30 min · 45 questions · 5 archetypes
          </p>

          <MargaSectionRule />

          <div className="flex w-full flex-col gap-8">
            <h1 className="w-full font-display text-4xl leading-[1.15] tracking-tighter  sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-black">Career clarity starts with </span>
              <span
                className="relative inline-block h-[1.10em] overflow-hidden text-marga-yellow align-baseline italic"
                aria-live="polite"
              >
                <span className="invisible whitespace-nowrap " aria-hidden>
                  your strengths
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={titles[titleNumber]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-x-0 top-0 whitespace-nowrap"
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="max-w-4xl font-serif text-lg leading-relaxed tracking-normal text-[#525252] md:text-xl lg:text-2xl">
              Marga combines psychometric science, skill assessment, and
              psychological profiling into one honest portrait of who you are —
              and where you could go. We change the career conversation from
              &ldquo;what should I do?&rdquo; to &ldquo;who am I?&rdquo;
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
            <GetStartedButton
              size="lg"
              className={cn(margaPrimaryButtonStyles, "h-auto gap-3 px-8 py-4")}
            >
              Begin your assessment
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </GetStartedButton>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                margaOutlineButtonStyles,
                "h-auto gap-3 bg-transparent px-8 py-4",
              )}
            >
              How Marga works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
