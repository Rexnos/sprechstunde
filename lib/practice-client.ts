"use client";

import { api } from "./client";
import type { PracticeKind, PracticeSummaryDTO } from "./schemas";

/** Saves a practice result; failures are ignored so practice never blocks on the database. */
export function savePractice(kind: PracticeKind, itemId: string, score: number) {
  return api<PracticeSummaryDTO>("/api/practice/result", { method: "POST", json: { kind, itemId, score } }).catch(() => null);
}
