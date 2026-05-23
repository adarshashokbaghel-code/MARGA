"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AssessmentResultsShell,
} from "@/components/assessment/assessment-results";
import { AssessmentLoadingSkeleton } from "@/components/assessment/assessment-loading";
import {
  getAssessmentResult,
  type AssessmentResult,
} from "@/lib/assessment";

const AssessmentResults = dynamic(
  () =>
    import("@/components/assessment/assessment-results").then(
      (mod) => mod.AssessmentResults,
    ),
  {
    loading: () => <AssessmentLoadingSkeleton />,
  },
);

export default function AssessmentResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getAssessmentResult();
    if (!stored) {
      router.replace("/assessment");
      return;
    }
    setResult(stored);
    setLoading(false);
  }, [router]);

  if (loading || !result) {
    return (
      <AssessmentResultsShell>
        <AssessmentLoadingSkeleton />
      </AssessmentResultsShell>
    );
  }

  return (
    <AssessmentResultsShell>
      <AssessmentResults result={result} />
    </AssessmentResultsShell>
  );
}
