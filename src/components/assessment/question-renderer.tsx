"use client";

import { Check } from "lucide-react";

import type { AssessmentQuestion, AnswerValue } from "@/lib/assessment";
import { cn } from "@/lib/utils";

import { labelStyles } from "./assessment-shell";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: AssessmentQuestion;
  value: AnswerValue | undefined;
  onChange: (val: AnswerValue) => void;
}) {
  if (question.type === "single_select" && question.options) {
    return (
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "flex w-full items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-100",
                selected
                  ? "border-black border-l-4 border-l-marga-yellow bg-black text-white"
                  : "border-black bg-white hover:border-l-4 hover:border-l-marga-yellow hover:bg-[#F5F5F5]",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center border font-label text-xs",
                  selected ? "border-white" : "border-black",
                )}
              >
                {OPTION_LETTERS[i] ?? i + 1}
              </span>
              <span className="flex-1 font-serif text-sm leading-relaxed sm:text-base">
                {opt.label}
              </span>
              {selected ? <Check className="size-4 shrink-0" strokeWidth={1.5} /> : null}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === "multi_select" && question.options) {
    const selected = (value as string[]) ?? [];
    const toggle = (id: string) => {
      if (selected.includes(id)) {
        onChange(selected.filter((s) => s !== id));
      } else if (!question.maxSelect || selected.length < question.maxSelect) {
        onChange([...selected, id]);
      }
    };

    return (
      <div className="space-y-3">
        {question.maxSelect ? (
          <p className={cn(labelStyles, "border border-black px-2 py-1 w-fit")}>
            {selected.length} of {question.maxSelect} picked
          </p>
        ) : null}
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isOn = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className={cn(
                  "flex w-full items-center gap-3 border px-4 py-3 text-left font-serif text-sm transition-colors duration-100",
                  isOn
                    ? "border-black border-l-4 border-l-marga-yellow bg-black text-white"
                    : "border-black bg-white hover:bg-[#F5F5F5]",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center border",
                    isOn ? "border-white bg-white text-black" : "border-black",
                  )}
                >
                  {isOn ? <Check className="size-3" strokeWidth={2} /> : null}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === "likert") {
    const rating = (value as number) ?? 0;
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={cn(
                "flex h-12 items-center justify-center border font-display text-lg transition-colors duration-100",
                rating === n
                  ? "border-black border-l-4 border-l-marga-yellow bg-black text-white"
                  : "border-black bg-white hover:bg-[#F5F5F5]",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between font-serif text-xs text-[#525252]">
          <span>{question.likertMinLabel ?? "Disagree"}</span>
          <span>{question.likertMaxLabel ?? "Agree"}</span>
        </div>
      </div>
    );
  }

  if (question.type === "rank" && question.rankItems) {
    const ranks = (value as Record<string, number>) ?? {};
    const usedRanks = new Set(Object.values(ranks));

    const assignRank = (itemId: string, rank: number) => {
      const next = { ...ranks };
      for (const [id, r] of Object.entries(next)) {
        if (r === rank) delete next[id];
      }
      next[itemId] = rank;
      onChange(next);
    };

    return (
      <div className="space-y-3">
        {question.rankItems.map((item, index) => (
          <div key={item.id} className="border border-black p-3">
            <p className="mb-2 font-serif text-sm">
              <span className="font-label mr-2">{index + 1}.</span>
              {item.label}
            </p>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((rank) => (
                <button
                  key={rank}
                  type="button"
                  onClick={() => assignRank(item.id, rank)}
                  disabled={usedRanks.has(rank) && ranks[item.id] !== rank}
                  className={cn(
                    "h-9 border font-label text-xs transition-colors duration-100",
                    ranks[item.id] === rank
                      ? "border-black border-l-4 border-l-marga-yellow bg-black text-white"
                      : usedRanks.has(rank)
                        ? "cursor-not-allowed border-[#E5E5E5] text-[#E5E5E5]"
                        : "border-black bg-white hover:bg-[#F5F5F5]",
                  )}
                >
                  {rank}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
