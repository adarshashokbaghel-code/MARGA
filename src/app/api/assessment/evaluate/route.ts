import { NextResponse } from "next/server";

import { evaluateAssessment } from "@/lib/assessment/scoring/evaluate";
import type { AssessmentSubmission } from "@/lib/assessment/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssessmentSubmission;

    if (!body.stage || !body.answers) {
      return NextResponse.json(
        { error: "Missing stage or answers" },
        { status: 400 },
      );
    }

    const result = evaluateAssessment(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to evaluate assessment" },
      { status: 500 },
    );
  }
}
