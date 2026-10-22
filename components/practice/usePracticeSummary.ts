"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/client";
import type { CourseProgressDTO, PracticeSummaryDTO } from "@/lib/schemas";

/** Practice results and course progress, for hub/list pages. Both are optional extras. */
export function usePracticeSummary() {
  const [summary, setSummary] = useState<PracticeSummaryDTO | null>(null);
  const [course, setCourse] = useState<CourseProgressDTO | null>(null);
  useEffect(() => {
    api<PracticeSummaryDTO>("/api/practice/result").then(setSummary).catch(() => {});
    api<CourseProgressDTO>("/api/course/progress").then(setCourse).catch(() => {});
  }, []);
  return { summary, course };
}
