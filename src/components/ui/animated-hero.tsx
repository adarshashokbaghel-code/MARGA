"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/ui/get-started-button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["who you are", "your strengths", "your path", "your purpose", "conviction"],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              30 min · 45 questions ·                 5 Archetypes
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-4xl text-center text-5xl font-regular tracking-tighter md:text-7xl">
              <span className="text-foreground">Career clarity starts with </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-teal"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-3xl text-center font-montserrat text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              Marga combines psychometric science, skill assessment, and
              psychological profiling into one honest portrait of who you are —
              and where you could go. We change the career conversation from
              &ldquo;what should I do?&rdquo; to &ldquo;who am I?&rdquo;
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              size="lg"
              className="gap-4 border-teal/40 hover:bg-teal/10"
              variant="outline"
            >
              How Marga works <Compass className="h-4 w-4" />
            </Button>
            <GetStartedButton
              size="lg"
              className="gap-4 bg-teal text-white hover:bg-teal/90"
            >
              Begin your assessment <MoveRight className="h-4 w-4" />
            </GetStartedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
