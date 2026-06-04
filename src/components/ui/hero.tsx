"use client";

import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { WaitlistDialog } from "@/components/landing/waitlist-dialog";

const meshLayerBase = {
  className: "absolute inset-0 h-full w-full",
  speed: 0.3,
  colors: ["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"],
  backgroundColor: "#000000",
} as const;

const meshLayerWire = {
  className: "absolute inset-0 h-full w-full opacity-60",
  speed: 0.2,
  colors: ["#000000", "#ffffff", "#06b6d4", "#f97316"],
  wireframe: true,
  backgroundColor: "transparent",
} as const;

const pulsingBorderProps = {
  colors: ["#06b6d4", "#0891b2", "#f97316", "#00FF88", "#FFD700", "#ffffff"],
  colorBack: "#00000000",
  speed: 1.5,
  roundness: 1,
  thickness: 0.1,
  softness: 0.2,
  intensity: 5,
  spotsPerColor: 5,
  spotSize: 0.1,
  pulse: 0.1,
  smoke: 0.5,
  smokeSize: 4,
  scale: 0.65,
  rotation: 0,
  frame: 9161408.251009725,
  style: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
} as const;

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [, setIsActive] = useState(false);

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white">
      <div className="relative min-h-screen overflow-hidden bg-black">
        <svg className="absolute inset-0 h-0 w-0" aria-hidden>
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                        0 1 0 0 0.02
                        0 0 1 0 0.05
                        0 0 0 0.9 0"
                result="tint"
              />
            </filter>
            <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
            <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <MeshGradient {...(meshLayerBase as object)} />
        <MeshGradient {...(meshLayerWire as object)} />

        <header className="relative z-20 flex items-center justify-between gap-4 p-4 md:p-6">
          <Link href="/" className="group relative shrink-0">
            <motion.div
              className="flex cursor-pointer items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.svg
                fill="currentColor"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="size-10 text-white transition-all duration-300 group-hover:drop-shadow-lg"
                style={{ filter: "url(#logo-glow)" }}
                whileHover={{
                  fill: "url(#logo-gradient)",
                  rotate: [0, -2, 2, 0],
                  transition: {
                    fill: { duration: 0.3 },
                    rotate: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
              >
                <motion.path
                  d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z"
                  initial={{ pathLength: 1 }}
                  whileHover={{
                    pathLength: [1, 0, 1],
                    transition: { duration: 1.2, ease: "easeInOut" },
                  }}
                />
              </motion.svg>
            </motion.div>
          </Link>

          <div
            id="gooey-btn"
            className="group relative ml-auto flex shrink-0 items-center"
            style={{ filter: "url(#gooey-filter)" }}
          >
            <button
              type="button"
              aria-label="Open waitlist"
              onClick={openWaitlist}
              className="absolute right-0 z-0 flex h-8 -translate-x-10 cursor-pointer items-center justify-center rounded-full bg-white px-2.5 py-2 text-xs font-normal text-black transition-all duration-300 group-hover:-translate-x-19 hover:bg-neutral-100"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={openWaitlist}
              className="z-10 flex h-8 cursor-pointer items-center rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-all duration-300 hover:bg-neutral-100 md:px-6"
            >
              Join waitlist
            </button>
          </div>
        </header>

        <main className="absolute bottom-8 left-4 z-20 max-w-2xl md:left-8">
          <div className="text-left">
            <motion.div
              className="relative mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              style={{ filter: "url(#glass-effect)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-0 right-1 left-1 h-px rounded-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <span className="relative z-10 text-sm font-medium tracking-wide text-white">
                30 min · 45 questions · 8 models
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl leading-none font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="mb-2 block text-3xl font-light tracking-wider text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Know yourself.
              </span>
              <span className="block font-black text-white drop-shadow-2xl">
                Choose your
              </span>
              <span className="block font-light text-white italic">path.</span>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-base leading-relaxed font-light text-white/90 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Deep career self-knowledge for every person, everywhere. Marga combines
              psychometric science, skill assessment, and psychological profiling
              into one honest portrait of who you are — and where you could go.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.button
                type="button"
                onClick={openWaitlist}
                className="cursor-pointer rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-neutral-100 md:px-10 md:py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the waitlist
              </motion.button>
            </motion.div>
          </div>
        </main>

        <div className="absolute right-4 bottom-8 z-30 hidden sm:block md:right-8">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <PulsingBorder {...(pulsingBorderProps as object)} />
            <motion.svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{
                duration: 24,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ transform: "scale(1.6)" }}
            >
              <defs>
                <path
                  id="circle"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text className="text-[9px] font-medium fill-white/90">
                <textPath href="#circle" startOffset="0%">
                  Know yourself · Choose your path · M.A.R.G.A · Early access ·
                </textPath>
              </text>
            </motion.svg>
          </div>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
