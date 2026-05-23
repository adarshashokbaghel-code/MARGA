"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import type { AssessmentQuestion, AnswerValue } from "@/lib/assessment";
import { cn } from "@/lib/utils";

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
      <div className="space-y-2.5">
        {question.options.map((opt, i) => {
          const selected = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => onChange(opt.id)}
              className={cn(
                "group flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-4",
                selected
                  ? "border-teal/50 bg-teal/10 shadow-sm shadow-teal/10"
                  : "border-border/60 bg-background/40 hover:border-teal/30 hover:bg-muted/30",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm",
                  selected
                    ? "bg-teal text-white"
                    : "bg-muted text-muted-foreground group-hover:bg-teal/10 group-hover:text-teal",
                )}
              >
                {OPTION_LETTERS[i] ?? i + 1}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed sm:pt-1.5 md:text-base">
                {opt.label}
              </span>
              {selected ? (
                <Check className="ml-auto mt-2 h-4 w-4 shrink-0 text-teal" />
              ) : null}
            </motion.button>
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
          <p className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground w-fit">
            {selected.length} / {question.maxSelect} selected
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">Select all that apply</p>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((opt) => {
            const isOn = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all",
                  isOn
                    ? "border-teal/50 bg-teal/10"
                    : "border-border/60 bg-background/40 hover:border-teal/25",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                    isOn ? "border-teal bg-teal text-white" : "border-border",
                  )}
                >
                  {isOn ? <Check className="h-3 w-3" /> : null}
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
      <div className="space-y-6">
        <div className="flex justify-between gap-1.5 px-0 sm:gap-2 sm:px-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={cn(
                "flex h-10 min-w-0 flex-1 flex-col items-center justify-center rounded-xl border text-xs font-semibold transition-all sm:h-14 sm:w-14 sm:flex-none sm:rounded-2xl sm:text-sm",
                rating === n
                  ? "scale-105 border-teal bg-teal text-white shadow-lg shadow-teal/25"
                  : "border-border/60 bg-background/50 hover:border-teal/40",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between px-0 text-[10px] text-muted-foreground sm:px-1 sm:text-xs">
          <span>{question.likertMinLabel ?? "Strongly disagree"}</span>
          <span>{question.likertMaxLabel ?? "Strongly agree"}</span>
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
        <p className="text-xs text-muted-foreground">
          1 = most · 5 = least — tap a rank for each row
        </p>
        {question.rankItems.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border/60 bg-background/40 p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rank) => (
                <button
                  key={rank}
                  type="button"
                  onClick={() => assignRank(item.id, rank)}
                  disabled={usedRanks.has(rank) && ranks[item.id] !== rank}
                  className={cn(
                    "h-10 flex-1 rounded-xl border text-xs font-semibold transition-all",
                    ranks[item.id] === rank
                      ? "border-teal bg-teal text-white"
                      : usedRanks.has(rank)
                        ? "cursor-not-allowed border-border/40 text-muted-foreground/30"
                        : "border-border/60 hover:border-teal/40",
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
