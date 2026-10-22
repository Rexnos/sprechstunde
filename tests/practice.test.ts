import { describe, expect, it } from "vitest";
import { COURSE } from "@/lib/course";
import { buildPlacement, placementResult, QUESTIONS_PER_UNIT, shouldStop, type UnitResult } from "@/lib/course/placement";
import { scoreSpoken } from "@/lib/course/scoring";
import { rng } from "@/lib/course/exercises";
import { buildPairRounds, SOUND_SETS } from "@/lib/pronunciation";
import { FUNCTION_WORDS, STORIES, storyTokens } from "@/lib/stories";

describe("placement test", () => {
  it("asks 3 questions for each of Units 1–8, deterministically", () => {
    const qs = buildPlacement(42);
    expect(qs).toEqual(buildPlacement(42));
    for (const unit of COURSE.filter((u) => u.number >= 1)) {
      const forUnit = qs.filter((q) => q.unitId === unit.id);
      expect(forUnit, unit.id).toHaveLength(QUESTIONS_PER_UNIT);
      expect(new Set(forUnit.map((q) => q.exercise.phrase.id)).size, unit.id).toBe(QUESTIONS_PER_UNIT);
      for (const q of forUnit) expect(["meaning", "listen", "gap"]).toContain(q.exercise.kind);
    }
  });

  const r = (unitId: string, correct: number): UnitResult => ({ unitId, correct, asked: 3 });

  it("starts at the first failed unit", () => {
    expect(placementResult([r("u1", 3), r("u2", 2), r("u3", 1)])).toEqual({ passed: [r("u1", 3), r("u2", 2)], startUnitId: "u3" });
    expect(placementResult([r("u1", 0)]).startUnitId).toBe("u1");
  });

  it("finishes the course when everything is passed", () => {
    const all = COURSE.filter((u) => u.number >= 1).map((u) => r(u.id, 3));
    expect(placementResult(all)).toEqual({ passed: all, startUnitId: null });
  });

  it("stops after two failed units in a row", () => {
    expect(shouldStop([r("u1", 3), r("u2", 1)])).toBe(false);
    expect(shouldStop([r("u1", 3), r("u2", 1), r("u3", 0)])).toBe(true);
    expect(shouldStop([r("u1", 1), r("u2", 3), r("u3", 0)])).toBe(false);
  });
});

describe("graded stories", () => {
  it("has one story per unit 1–8 with valid questions", () => {
    expect(STORIES.map((s) => s.unitId)).toEqual(["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8"]);
    for (const st of STORIES) {
      expect(st.questions, st.id).toHaveLength(3);
      for (const q of st.questions) expect(q.options, `${st.id}: ${q.q}`).toContain(q.answer);
    }
  });

  it("glosses every word that isn't a function word, so every tap gets a meaning", () => {
    for (const st of STORIES) {
      for (const sentence of st.sentences) {
        for (const t of storyTokens(sentence.de)) {
          if (!t.key || FUNCTION_WORDS.has(t.key)) continue;
          expect(st.glossary[t.key], `${st.id}: missing gloss for "${t.key}"`).toBeTruthy();
        }
      }
    }
  });
});

describe("pronunciation sets", () => {
  it("have unique, non-empty minimal pairs", () => {
    expect(new Set(SOUND_SETS.map((s) => s.id)).size).toBe(SOUND_SETS.length);
    for (const set of SOUND_SETS) {
      expect(set.pairs.length, set.id).toBeGreaterThanOrEqual(2);
      for (const p of set.pairs) {
        expect(p.a && p.b && p.aEn && p.bEn, set.id).toBeTruthy();
        expect(p.a, set.id).not.toBe(p.b);
      }
    }
  });

  it("builds listen-and-choose rounds covering every pair", () => {
    const set = SOUND_SETS[3];
    const rounds = buildPairRounds(set, 8, rng(3));
    expect(rounds).toHaveLength(8);
    for (const p of set.pairs) expect(rounds.some((r) => r.pair === p)).toBe(true);
  });
});

describe("dictation scoring", () => {
  it("accepts umlauts typed as ae/oe/ue and ß as ss", () => {
    expect(scoreSpoken("Ich moechte einen Kaffee", "Ich möchte einen Kaffee.").passed).toBe(true);
    expect(scoreSpoken("Ich wohne in der Strasse", "Ich wohne in der Straße.").passed).toBe(true);
    expect(scoreSpoken("Gruesse aus Koeln", "Grüße aus Köln").passed).toBe(true);
  });
});
