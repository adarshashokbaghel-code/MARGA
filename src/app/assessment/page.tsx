import dynamic from "next/dynamic";

import { AssessmentPageShell } from "@/components/assessment/assessment-flow";
import { AssessmentLoadingSkeleton } from "@/components/assessment/assessment-loading";

const AssessmentFlow = dynamic(
  () =>
    import("@/components/assessment/assessment-flow").then(
      (mod) => mod.AssessmentFlow,
    ),
  {
    loading: () => <AssessmentLoadingSkeleton />,
  },
);

export default function AssessmentPage() {
  return (
    <AssessmentPageShell>
      <AssessmentFlow />
    </AssessmentPageShell>
  );
}
