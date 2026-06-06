import type { ReactNode } from "react";

import { Header } from "@/components/landing/header";

import { AssessmentShell } from "./assessment-shell";

export function AssessmentPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <AssessmentShell className="py-4 sm:py-6">{children}</AssessmentShell>
      </main>
    </div>
  );
}
