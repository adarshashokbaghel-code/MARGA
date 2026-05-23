import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    vision:
      "A world where no one loses years of their life to the wrong career.",
    mission:
      "To make deep career self-knowledge accessible to every person, everywhere.",
    headline: "Career clarity starts with",
    rotatingWords: [
      "who you are",
      "your strengths",
      "your path",
      "your purpose",
      "conviction",
    ],
    tagline:
      "Marga combines psychometric science, skill assessment, and psychological profiling into one honest portrait of who you are — and where you could go.",
    framework: {
      name: "M.A.R.G.A.",
      modules: ["Motivation", "Ability", "Resilience", "Goals", "Awareness"],
      totalQuestions: 45,
      totalTime: "30 min",
    },
    stages: ["Mirror", "Mindset", "Motion", "Meaning"],
    archetypes: [
      "The Builder",
      "The Thinker",
      "The Creator",
      "The Leader",
      "The Guide",
    ],
    cta: {
      primary: "Begin your assessment",
      secondary: "How Marga works",
    },
  });
}
