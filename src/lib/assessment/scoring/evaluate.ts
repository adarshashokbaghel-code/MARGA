import {
  ARCHETYPE_LABELS,
  getCombination,
  MARGA_REPORT_SECTIONS,
} from "../constants";
import { getQuestionsForStage } from "../questions";
import type {
  ArchetypeId,
  AssessmentResult,
  AssessmentSubmission,
  DomainResult,
  GrowthFlag,
  IndustryResult,
  MargaReportSection,
} from "../types";
import {
  aggregateScores,
  applyConfidenceLayer,
  ARCHETYPE_IDS,
  normalizeScores,
  parseContextSignals,
  resolveArchetypes,
} from "./signals";

function mapDomains(
  combinationDomains: string[],
  context: ReturnType<typeof parseContextSignals>,
  primary: ArchetypeId,
): DomainResult[] {
  const domainScores = new Map<string, number>();

  for (const domain of combinationDomains) {
    domainScores.set(domain, 70);
  }

  for (const world of context.c4FutureWorlds) {
    const boostDomains: Record<string, string[]> = {
      technology: ["Technology & AI", "Engineering & Systems"],
      business: ["Business & Entrepreneurship"],
      design: ["Design & Creativity"],
      psychology: ["Psychology & Human Behavior"],
      science: ["Science & Research"],
      media: ["Media & Communication"],
      engineering: ["Engineering & Systems"],
      helping: ["Education & Learning", "Social Impact"],
      sustainability: ["Sustainability & Climate"],
    };
    for (const d of boostDomains[world] ?? []) {
      domainScores.set(d, (domainScores.get(d) ?? 50) + 15);
    }
  }

  const primaryDomainBoost: Partial<Record<ArchetypeId, string[]>> = {
    builder: ["Technology & AI", "Engineering & Systems"],
    thinker: ["Science & Research", "Psychology & Human Behavior"],
    creator: ["Design & Creativity", "Media & Communication"],
    leader: ["Business & Entrepreneurship"],
    guide: ["Education & Learning", "Health & Wellness"],
  };

  for (const d of primaryDomainBoost[primary] ?? []) {
    domainScores.set(d, (domainScores.get(d) ?? 55) + 10);
  }

  return [...domainScores.entries()]
    .map(([domain, confidence]) => ({
      domain,
      confidence: Math.min(confidence, 98),
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 6);
}

function mapIndustries(
  combinationIndustries: string[],
  domains: DomainResult[],
): IndustryResult[] {
  const industryMap: Record<string, string[]> = {
    "Technology & AI": ["AI & Technology"],
    "Engineering & Systems": ["AI & Technology", "Research & Science"],
    "Design & Creativity": ["Design Services", "Gaming & Interactive Media"],
    "Media & Communication": ["Media & Entertainment"],
    "Business & Entrepreneurship": ["Startups & Entrepreneurship", "Finance & Consulting"],
    "Psychology & Human Behavior": ["Healthcare & Wellness", "Education & Learning"],
    "Education & Learning": ["Education & Learning"],
    "Health & Wellness": ["Healthcare & Wellness"],
    "Science & Research": ["Research & Science"],
    "Sustainability & Climate": ["Sustainability & Climate"],
    "Social Impact": ["Social Impact & NGOs"],
  };

  const scores = new Map<string, number>();

  for (const ind of combinationIndustries) {
    scores.set(ind, 75);
  }

  for (const domain of domains.slice(0, 3)) {
    for (const ind of industryMap[domain.domain] ?? []) {
      scores.set(ind, (scores.get(ind) ?? 60) + domain.confidence * 0.15);
    }
  }

  return [...scores.entries()]
    .map(([industry, confidence]) => ({
      industry,
      confidence: Math.min(Math.round(confidence), 98),
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);
}

function buildGrowthFlags(
  flags: string[],
  context: ReturnType<typeof parseContextSignals>,
): GrowthFlag[] {
  const growth: GrowthFlag[] = [];

  if (flags.includes("fixed_mindset")) {
    growth.push({
      type: "growth_mindset",
      message:
        "Setbacks are data, not verdicts. Try reframing challenges as experiments — each attempt teaches you something useful.",
    });
  }
  if (flags.includes("low_self_efficacy")) {
    growth.push({
      type: "self_efficacy",
      message:
        "New skills feel hard at first for everyone. Start with small wins and build confidence through practice, not perfection.",
    });
  }
  if (context.careerPressure === "strongly" || context.careerPressure === "sometimes") {
    growth.push({
      type: "external_pressure",
      message:
        "External expectations are real — but your path should still reflect who you are. Use Marga's insights as a conversation starter, not a verdict.",
    });
  }
  if (context.explorationStyle === "follow_others") {
    growth.push({
      type: "self_direction",
      message:
        "Try keeping a weekly 'energy log' — note which activities leave you curious vs. drained. Patterns will emerge faster than you expect.",
    });
  }
  if (context.futureClarity === "confused" || context.futureClarity === "curious") {
    growth.push({
      type: "exploration",
      message:
        "Confusion at your stage is normal and healthy. Focus on exploration projects — clubs, mini-builds, interviews — rather than locking in a label.",
    });
  }

  if (growth.length === 0) {
    growth.push({
      type: "general",
      message:
        "Keep exploring aligned environments. The best career decisions come from repeated small experiments, not one big choice.",
    });
  }

  return growth;
}

function buildMargaSections(
  primary: ArchetypeId,
  secondary: ArchetypeId,
  domains: DomainResult[],
  growth: GrowthFlag[],
): MargaReportSection[] {
  const primaryLabel = ARCHETYPE_LABELS[primary];
  const secondaryLabel = ARCHETYPE_LABELS[secondary];

  return MARGA_REPORT_SECTIONS.map((section) => {
    let output: string = section.example;

    switch (section.letter) {
      case "M":
        output = `You naturally lean toward ${primaryLabel.tagline.toLowerCase()}, with ${secondaryLabel.tagline.toLowerCase()} as a strong secondary pattern.`;
        break;
      case "A":
        output = `${primaryLabel.name} strengths blend with ${secondaryLabel.name} capabilities — explore domains where both patterns reinforce each other.`;
        break;
      case "R":
        output = domains
          .slice(0, 4)
          .map((d) => d.domain)
          .join(", ");
        break;
      case "G":
        output =
          "Join a club aligned to your top domain, build a small project, interview someone in a field that intrigues you, or start a creative portfolio.";
        break;
      case "A":
        output = growth
          .slice(0, 2)
          .map((g) => g.message.split(".")[0])
          .join("; ");
        break;
    }

    return {
      letter: section.letter,
      name: section.name,
      meaning: section.meaning,
      output,
    };
  });
}

export function evaluateAssessment(
  submission: AssessmentSubmission,
): AssessmentResult {
  const { stage, answers } = submission;
  const questions = getQuestionsForStage(stage);
  const context = parseContextSignals(answers, stage);
  const { scores: rawScores, flags } = aggregateScores(questions, answers);
  const archetypeScores = normalizeScores(rawScores);
  const archetypeConfidence = applyConfidenceLayer(rawScores, context);

  for (const id of ARCHETYPE_IDS) {
    archetypeScores[id] = Math.min(
      100,
      archetypeScores[id] + archetypeConfidence[id] * 2,
    );
  }

  const { primary, secondary } = resolveArchetypes(archetypeScores);
  const combination = getCombination(primary, secondary);
  const domains = mapDomains(combination.domains, context, primary);
  const industries = mapIndustries(combination.industries, domains);
  const growthFlags = buildGrowthFlags(flags, context);
  const margaSections = buildMargaSections(
    primary,
    secondary,
    domains,
    growthFlags,
  );

  return {
    stage,
    primaryArchetype: primary,
    secondaryArchetype: secondary,
    archetypeScores,
    archetypeConfidence,
    combination,
    domains,
    industries,
    exitRoles: combination.exitRoles,
    growthFlags,
    margaSections,
    contextSignals: context,
    evaluatedAt: new Date().toISOString(),
  };
}
