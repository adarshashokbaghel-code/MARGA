import type { LifeStage } from "../types";
import { mindsetContextQuestions } from "./mindset-context";
import { mirrorContextQuestions } from "./mirror-context";
import { mirrorMargaQuestions } from "./mirror-marga";

export function getQuestionsForStage(stage: LifeStage) {
  switch (stage) {
    case "mindset":
      return [...mindsetContextQuestions, ...mirrorMargaQuestions];
    case "mirror":
    default:
      return [...mirrorContextQuestions, ...mirrorMargaQuestions];
  }
}

export function getQuestionById(id: string, stage: LifeStage = "mirror") {
  return getQuestionsForStage(stage).find((q) => q.id === id);
}

export {
  mirrorContextQuestions,
  mirrorMargaQuestions,
  mindsetContextQuestions,
};
