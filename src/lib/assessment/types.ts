export type ArchetypeId =
  | "builder"
  | "thinker"
  | "creator"
  | "leader"
  | "guide";

export type MargaModule =
  | "context"
  | "motivation"
  | "ability"
  | "resilience"
  | "goals"
  | "awareness";

export type QuestionType =
  | "single_select"
  | "multi_select"
  | "likert"
  | "rank";

export type LifeStage = "mirror" | "mindset" | "motion" | "meaning";

export type ArchetypeScores = Record<ArchetypeId, number>;

export interface QuestionOption {
  id: string;
  label: string;
  signals?: Partial<ArchetypeScores>;
}

export interface RankItem {
  id: string;
  label: string;
  archetype: ArchetypeId;
}

export interface AssessmentQuestion {
  id: string;
  module: MargaModule;
  type: QuestionType;
  text: string;
  description?: string;
  options?: QuestionOption[];
  rankItems?: RankItem[];
  maxSelect?: number;
  likertMinLabel?: string;
  likertMaxLabel?: string;
  /** Likert: maps rating 1–5 to archetype signals (rating 1 = index 0) */
  likertSignals?: Partial<ArchetypeScores>[];
}

export type AnswerValue =
  | string
  | string[]
  | number
  | Record<string, number>;

export type AssessmentAnswers = Record<string, AnswerValue>;

export interface ContextSignals {
  c3Activities: string[];
  c4FutureWorlds: string[];
  grade?: string;
  careerPressure?: string;
  futureClarity?: string;
  explorationStyle?: string;
  margaGoal?: string;
}

export interface DomainResult {
  domain: string;
  confidence: number;
}

export interface IndustryResult {
  industry: string;
  confidence: number;
}

export interface ArchetypeCombination {
  identity: string;
  pattern: string;
  domains: string[];
  industries: string[];
  exitRoles: string[];
  logic: string;
}

export interface GrowthFlag {
  type: string;
  message: string;
}

export interface MargaReportSection {
  letter: string;
  name: string;
  meaning: string;
  output: string;
}

export interface AssessmentResult {
  stage: LifeStage;
  primaryArchetype: ArchetypeId;
  secondaryArchetype: ArchetypeId;
  archetypeScores: ArchetypeScores;
  archetypeConfidence: ArchetypeScores;
  combination: ArchetypeCombination;
  domains: DomainResult[];
  industries: IndustryResult[];
  exitRoles: string[];
  growthFlags: GrowthFlag[];
  margaSections: MargaReportSection[];
  contextSignals: ContextSignals;
  evaluatedAt: string;
}

export interface AssessmentSubmission {
  stage: LifeStage;
  answers: AssessmentAnswers;
}
