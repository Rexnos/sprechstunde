import type { ReviewState } from "../schemas";

export type ReviewResult = "again" | "good" | "known";

/** Days until the next review after N consecutive successful reviews. */
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 60];
const AGAIN_DELAY_MS = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type ReviewCard = { reviewState: ReviewState; streak: number };

/**
 * Simple Leitner-style scheduling. "again" resets the streak, "good" moves one
 * box up, "known" jumps to the long-interval boxes.
 */
export function scheduleReview(card: ReviewCard, result: ReviewResult, now = new Date()) {
  let streak: number;
  let reviewState: ReviewState;
  let delayMs: number;

  if (result === "again") {
    streak = 0;
    reviewState = "learning";
    delayMs = AGAIN_DELAY_MS;
  } else {
    streak = result === "known" ? Math.max(card.streak + 1, 4) : card.streak + 1;
    reviewState = streak >= 4 ? "known" : "learning";
    const idx = Math.min(streak - 1, REVIEW_INTERVAL_DAYS.length - 1);
    delayMs = REVIEW_INTERVAL_DAYS[idx] * DAY_MS;
  }
  return { streak, reviewState, nextReviewAt: new Date(now.getTime() + delayMs), lastReviewedAt: now };
}

/** Normalised key used to de-duplicate vocabulary cards. */
export function termKey(term: string) {
  return term
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\s.!?…]+$/g, "");
}
