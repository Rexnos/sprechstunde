import { COURSE } from "./index";
import { buildExercises, rng, type Exercise } from "./exercises";

export type PlacementQuestion = { unitId: string; unitNumber: number; exercise: Exercise };

const QUESTION_KINDS = new Set<Exercise["kind"]>(["meaning", "listen", "gap"]);
export const QUESTIONS_PER_UNIT = 3;

/** Three questions per unit (Units 1–8), each from a different lesson where possible. */
export function buildPlacement(seed: number): PlacementQuestion[] {
  const rand = rng(seed);
  const out: PlacementQuestion[] = [];
  for (const unit of COURSE.filter((u) => u.number >= 1)) {
    const lessons = [...unit.lessons].sort(() => rand() - 0.5);
    const picked: Exercise[] = [];
    for (let round = 0; picked.length < QUESTIONS_PER_UNIT && round < 3; round++) {
      for (const lesson of lessons) {
        if (picked.length >= QUESTIONS_PER_UNIT) break;
        const candidates = buildExercises(lesson, unit, seed + lesson.id.length * 31 + round).filter(
          (e) => QUESTION_KINDS.has(e.kind) && !picked.some((p) => p.phrase.id === e.phrase.id),
        );
        if (candidates[round]) picked.push(candidates[round]);
      }
    }
    for (const exercise of picked) out.push({ unitId: unit.id, unitNumber: unit.number, exercise });
  }
  return out;
}

export type UnitResult = { unitId: string; correct: number; asked: number };

/** A unit is passed with at least 2 of 3 correct. */
export const unitPassed = (r: UnitResult) => r.correct >= 2;

/** Stop after two failed units in a row; there's no point testing further. */
export function shouldStop(results: UnitResult[]): boolean {
  const done = results.filter((r) => r.asked >= QUESTIONS_PER_UNIT);
  return done.length >= 2 && !unitPassed(done[done.length - 1]) && !unitPassed(done[done.length - 2]);
}

/** Passed units are the ones before the first failed unit; start there. */
export function placementResult(results: UnitResult[]): { passed: UnitResult[]; startUnitId: string | null } {
  const passed: UnitResult[] = [];
  for (const r of results) {
    if (r.asked < QUESTIONS_PER_UNIT || !unitPassed(r)) return { passed, startUnitId: r.unitId };
    passed.push(r);
  }
  const next = COURSE.find((u) => u.number >= 1 && !results.some((r) => r.unitId === u.id));
  return { passed, startUnitId: next?.id ?? null };
}
