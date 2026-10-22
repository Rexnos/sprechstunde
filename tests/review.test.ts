import { describe, expect, it } from "vitest";
import { REVIEW_INTERVAL_DAYS, scheduleReview, termKey } from "@/lib/services/review";

const now = new Date("2026-01-01T12:00:00Z");
const days = (d: Date) => (d.getTime() - now.getTime()) / 86_400_000;

describe("scheduleReview", () => {
  it("'again' resets the streak and schedules a quick retry", () => {
    const r = scheduleReview({ reviewState: "known", streak: 5 }, "again", now);
    expect(r).toMatchObject({ streak: 0, reviewState: "learning" });
    expect(r.nextReviewAt.getTime() - now.getTime()).toBe(10 * 60 * 1000);
  });

  it("'good' climbs the interval ladder", () => {
    let card = { reviewState: "new" as const, streak: 0 } as { reviewState: "new" | "learning" | "known"; streak: number };
    const intervals: number[] = [];
    for (let i = 0; i < 7; i++) {
      const r = scheduleReview(card, "good", now);
      intervals.push(days(r.nextReviewAt));
      card = r;
    }
    expect(intervals).toEqual([...REVIEW_INTERVAL_DAYS, REVIEW_INTERVAL_DAYS.at(-1)]);
    expect(card.reviewState).toBe("known");
  });

  it("'known' jumps straight to the known state", () => {
    const r = scheduleReview({ reviewState: "new", streak: 0 }, "known", now);
    expect(r.reviewState).toBe("known");
    expect(r.streak).toBe(4);
    expect(days(r.nextReviewAt)).toBe(REVIEW_INTERVAL_DAYS[3]);
  });
});

describe("termKey", () => {
  it("normalises case, whitespace and trailing punctuation", () => {
    expect(termKey("  Die   Bestellung. ")).toBe("die bestellung");
    expect(termKey("Ich hätte gern …")).toBe("ich hätte gern");
    expect(termKey("Freut mich!")).toBe(termKey("freut mich"));
  });
});
