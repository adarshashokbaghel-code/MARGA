import type { AssessmentAnswers, AssessmentResult, LifeStage } from "./types";

export { evaluateAssessment } from "./scoring/evaluate";
export type {
  AnswerValue,
  ArchetypeId,
  AssessmentAnswers,
  AssessmentQuestion,
  AssessmentResult,
  AssessmentSubmission,
  LifeStage,
  MargaModule,
} from "./types";
export { getQuestionsForStage } from "./questions";
export {
  ARCHETYPE_LABELS,
  MODULE_META,
  getCombination,
} from "./constants";
export { ASSESSMENT_DIVISIONS, getDivision, getTotalQuestions } from "./stages";
export type { AssessmentDivision } from "./stages";

export const ASSESSMENT_RESULT_KEY = "marga_assessment_result";
export const ASSESSMENT_PROGRESS_KEY = "marga_assessment_progress";

export function saveAssessmentResult(result: AssessmentResult): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ASSESSMENT_RESULT_KEY, JSON.stringify(result));
}

export function getAssessmentResult(): AssessmentResult | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ASSESSMENT_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentResult;
  } catch {
    return null;
  }
}

export function saveAssessmentProgress(
  stage: LifeStage,
  answers: AssessmentAnswers,
  currentIndex: number,
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    ASSESSMENT_PROGRESS_KEY,
    JSON.stringify({ stage, answers, currentIndex, savedAt: Date.now() }),
  );
}

export function getAssessmentProgress(): {
  stage: LifeStage;
  answers: AssessmentAnswers;
  currentIndex: number;
} | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ASSESSMENT_PROGRESS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as {
      stage: LifeStage;
      answers: AssessmentAnswers;
      currentIndex: number;
    };
  } catch {
    return null;
  }
}

export function clearAssessmentProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ASSESSMENT_PROGRESS_KEY);
}
