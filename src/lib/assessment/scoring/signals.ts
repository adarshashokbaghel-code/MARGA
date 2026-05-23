import type {
  ArchetypeId,
  ArchetypeScores,
  AssessmentAnswers,
  AssessmentQuestion,
  ContextSignals,
  LifeStage,
} from "../types";
import { C3_ARCHETYPE_MAP, C4_DOMAIN_MAP } from "../constants";

export const ARCHETYPE_IDS: ArchetypeId[] = [
  "builder",
  "thinker",
  "creator",
  "leader",
  "guide",
];

export function emptyScores(): ArchetypeScores {
  return {
    builder: 0,
    thinker: 0,
    creator: 0,
    leader: 0,
    guide: 0,
  };
}

export function addSignals(
  target: ArchetypeScores,
  signals: Partial<ArchetypeScores>,
) {
  for (const id of ARCHETYPE_IDS) {
    if (signals[id]) {
      target[id] += signals[id]!;
    }
  }
}

export function parseContextSignals(
  answers: AssessmentAnswers,
  stage: LifeStage = "mirror",
): ContextSignals {
  if (stage === "mindset") {
    return {
      grade: answers.MC1 as string | undefined,
      c3Activities: (answers.MC3 as string[]) ?? [],
      c4FutureWorlds: (answers.MC5 as string[]) ?? [],
      careerPressure:
        answers.MC6 === "parents" || answers.MC6 === "prestige"
          ? "strongly"
          : answers.MC6 === "financial"
            ? "sometimes"
            : undefined,
      futureClarity:
        answers.MC8 === "unsure" || answers.MC8 === "wrong_career"
          ? "confused"
          : answers.MC8 === "strengths"
            ? "curious"
            : undefined,
      explorationStyle:
        answers.MC7 === "advice"
          ? "follow_others"
          : answers.MC7 === "overthink"
            ? "discovering"
            : undefined,
      margaGoal: answers.MC9 as string | undefined,
    };
  }

  return {
    grade: answers.C1 as string | undefined,
    c3Activities: (answers.C3 as string[]) ?? [],
    c4FutureWorlds: (answers.C4 as string[]) ?? [],
    careerPressure: answers.C5 as string | undefined,
    futureClarity: answers.C6 as string | undefined,
    explorationStyle: answers.C7 as string | undefined,
    margaGoal: answers.C8 as string | undefined,
  };
}

/** Context layer modifies confidence only — not core archetype raw scores */
export function computeContextConfidenceBoost(
  context: ContextSignals,
  archetype: ArchetypeId,
): number {
  let boost = 0;

  for (const activity of context.c3Activities) {
    const mapped = C3_ARCHETYPE_MAP[activity];
    if (mapped?.includes(archetype)) boost += 1;
  }

  return boost;
}

export function computeDomainConfidenceFromContext(
  context: ContextSignals,
  domain: string,
): number {
  let boost = 0;
  for (const world of context.c4FutureWorlds) {
    const domains = C4_DOMAIN_MAP[world] ?? [];
    if (domains.includes(domain)) boost += 15;
  }
  return boost;
}

export function scoreQuestion(
  question: AssessmentQuestion,
  answer: AssessmentAnswers[string] | undefined,
): { scores: ArchetypeScores; flags: string[] } {
  const scores = emptyScores();
  const flags: string[] = [];

  if (answer === undefined || answer === null) {
    return { scores, flags };
  }

  switch (question.type) {
    case "single_select": {
      const option = question.options?.find((o) => o.id === answer);
      if (option?.signals) addSignals(scores, option.signals);
      if (question.id === "R_Q3" && answer === "d") {
        flags.push("fixed_mindset");
      }
      if (question.id === "R_Q8" && answer === "d") {
        flags.push("low_self_efficacy");
      }
      break;
    }
    case "likert": {
      const rating = Number(answer);
      if (rating >= 1 && rating <= 5 && question.likertSignals) {
        const signals = question.likertSignals[rating - 1];
        if (signals) addSignals(scores, signals);
      }
      break;
    }
    case "rank": {
      const ranks = answer as Record<string, number>;
      if (!question.rankItems) break;
      for (const item of question.rankItems) {
        const rank = ranks[item.id];
        if (rank >= 1 && rank <= 5) {
          const points = 6 - rank; // rank 1 = +5, rank 5 = +1
          scores[item.archetype] += points;
        }
      }
      break;
    }
    case "multi_select":
      // Context questions — no archetype scoring
      break;
  }

  return { scores, flags };
}

export function aggregateScores(
  questions: AssessmentQuestion[],
  answers: AssessmentAnswers,
): { scores: ArchetypeScores; flags: string[] } {
  const total = emptyScores();
  const allFlags: string[] = [];

  for (const question of questions) {
    if (question.module === "context") continue;
    const { scores, flags } = scoreQuestion(question, answers[question.id]);
    addSignals(total, scores);
    allFlags.push(...flags);
  }

  return { scores: total, flags: allFlags };
}

export function normalizeScores(scores: ArchetypeScores): ArchetypeScores {
  const max = Math.max(...ARCHETYPE_IDS.map((id) => scores[id]), 1);
  const normalized = emptyScores();
  for (const id of ARCHETYPE_IDS) {
    normalized[id] = Math.round((scores[id] / max) * 100);
  }
  return normalized;
}

export function resolveArchetypes(scores: ArchetypeScores): {
  primary: ArchetypeId;
  secondary: ArchetypeId;
} {
  const sorted = [...ARCHETYPE_IDS].sort((a, b) => scores[b] - scores[a]);
  return {
    primary: sorted[0],
    secondary: sorted[1] ?? sorted[0],
  };
}

export function applyConfidenceLayer(
  rawScores: ArchetypeScores,
  context: ContextSignals,
): ArchetypeScores {
  const confidence = emptyScores();
  for (const id of ARCHETYPE_IDS) {
    confidence[id] = computeContextConfidenceBoost(context, id);
  }
  return confidence;
}
