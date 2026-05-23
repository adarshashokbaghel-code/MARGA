import type { LifeStage } from "./types";

export type AssessmentDivision = "mirror" | "mindset";

export interface DivisionConfig {
  id: AssessmentDivision;
  stage: LifeStage;
  name: string;
  tagline: string;
  ageBand: string;
  coreStage: string;
  description: string;
  experience: string;
  questionCount: number;
  contextCount: number;
  minutes: number;
  accent: string;
  available: boolean;
}

export const ASSESSMENT_DIVISIONS: DivisionConfig[] = [
  {
    id: "mirror",
    stage: "mirror",
    name: "Mirror",
    tagline: "Identity discovery",
    ageBand: "Grades 8–10 · 13–16",
    coreStage: "Identity Discovery",
    description:
      "Understand natural strengths, motivations, and personality patterns without rigid career labels.",
    experience:
      "Curiosity, peer comparison, early interests, and growing pressure from parents and society.",
    questionCount: 45,
    contextCount: 8,
    minutes: 30,
    accent: "from-teal/20 via-cyan-500/10 to-transparent",
    available: true,
  },
  {
    id: "mindset",
    stage: "mindset",
    name: "Mindset",
    tagline: "Direction & decisions",
    ageBand: "Grades 11–12 · 16–18",
    coreStage: "Direction & Decision Making",
    description:
      "Identify domains, environments, and pathways aligned to personality, aptitude, and emotional drivers.",
    experience:
      "Stream pressure, career anxiety, entrance exam stress, and fear of making the wrong choice.",
    questionCount: 45,
    contextCount: 9,
    minutes: 30,
    accent: "from-violet-500/15 via-teal/10 to-transparent",
    available: true,
  },
];

export function getDivision(id: AssessmentDivision): DivisionConfig {
  return ASSESSMENT_DIVISIONS.find((d) => d.id === id)!;
}

export function getTotalQuestions(division: AssessmentDivision): number {
  const config = getDivision(division);
  return config.contextCount + config.questionCount;
}
