import { describe, expect, it } from "vitest";
import { buildCheckup, CHECKUP_LENGTH, summarize, weekKey, weekStart, type CheckupPools } from "@/lib/checkup/build";
import { ALL_LESSONS } from "@/lib/course";
import type { Phrase } from "@/lib/course/types";

const phrases = (from: number, to: number) => ALL_LESSONS.filter(({ lesson }) => !lesson.letters).slice(from, to).flatMap(({ lesson }) => lesson.phrases);
const ai = (n: number): Phrase[] =>
  Array.from({ length: n }, (_, i) => ({ id: `ai-${i}`, de: `Anna trinkt heute ${["Kaffee", "Tee", "Wasser", "Saft", "Milch"][i % 5]} im Café Nummer ${i}.`, en: `Anna drinks a drink today (${i}).` }));

const POOLS: CheckupPools = { week: phrases(8, 11), review: phrases(0, 8), ai: ai(5) };

describe("buildCheckup", () => {
  it("asks 15 questions in skill order: 4 reading, 4 listening, 4 grammar, 3 speaking", () => {
    const qs = buildCheckup(POOLS, 7);
    expect(qs).toHaveLength(CHECKUP_LENGTH);
    expect(qs.map((q) => q.skill)).toEqual([...Array(4).fill("reading"), ...Array(4).fill("listening"), ...Array(4).fill("grammar"), ...Array(3).fill("speaking")]);
    const kinds = qs.map((q) => (q.kind === "speak" ? "speak" : q.exercise.kind));
    expect(kinds.filter((k) => k === "gap")).toHaveLength(2);
    expect(kinds.filter((k) => k === "build")).toHaveLength(2);
  });

  it("is deterministic per seed and never repeats a phrase", () => {
    expect(buildCheckup(POOLS, 42)).toEqual(buildCheckup(POOLS, 42));
    const de = buildCheckup(POOLS, 42).map((q) => (q.kind === "speak" ? q.phrase.de : q.exercise.phrase.de));
    expect(new Set(de).size).toBe(de.length);
  });

  it("mixes this week, older material and AI sentences about 8 / 4 / 3", () => {
    const count = (s: string) => buildCheckup(POOLS, 3).filter((q) => q.source === s).length;
    expect(count("week")).toBe(8);
    expect(count("review")).toBe(4);
    expect(count("ai")).toBe(3);
  });

  it("fills from older material when nothing was studied this week and there are no AI sentences", () => {
    const qs = buildCheckup({ week: [], review: phrases(0, 10), ai: [] }, 5);
    expect(qs).toHaveLength(CHECKUP_LENGTH);
    expect(qs.every((q) => q.source === "review")).toBe(true);
  });

  it("returns fewer questions when there's little material, and skips {slot} phrases", () => {
    const tiny: Phrase[] = [
      { id: "a", de: "Hallo!", en: "Hello!" },
      { id: "b", de: "Ich heiße {name}.", en: "My name is …" },
    ];
    const qs = buildCheckup({ week: tiny, review: [], ai: [] }, 1);
    expect(qs.length).toBeLessThan(CHECKUP_LENGTH);
    expect(qs.some((q) => (q.kind === "speak" ? q.phrase.de : q.exercise.phrase.de).includes("{"))).toBe(false);
  });
});

describe("summarize", () => {
  it("scores per skill and leaves untested speaking out of the total", () => {
    const s = summarize([
      { skill: "reading", correct: true },
      { skill: "reading", correct: false },
      { skill: "listening", correct: true },
      { skill: "speaking", correct: null },
    ]);
    expect(s.skills).toEqual({ reading: { correct: 1, asked: 2 }, listening: { correct: 1, asked: 1 } });
    expect(s.score).toBeCloseTo(2 / 3);
    expect(summarize([{ skill: "speaking", correct: null }]).score).toBeNull();
  });
});

describe("weeks", () => {
  it("run Monday to Sunday", () => {
    const sunday = new Date(2026, 9, 25, 23, 30); // Sun 25 Oct 2026
    const monday = new Date(2026, 9, 26, 0, 5);
    expect(weekKey(sunday)).toBe("2026-10-19");
    expect(weekKey(monday)).toBe("2026-10-26");
    expect(weekStart(monday).getHours()).toBe(0);
  });
});
