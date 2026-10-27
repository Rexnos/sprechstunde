import { COURSE, LEVELS, type CourseLevel, type Unit } from "./index";
import { buildExercises, rng, type Exercise } from "./exercises";

export type PlacementQuestion = { unitId: string; unitNumber: number; exercise: Exercise };

const QUESTION_KINDS = new Set<Exercise["kind"]>(["meaning", "listen", "gap"]);
export const QUESTIONS_PER_UNIT = 3;

const levelIndex = (level: CourseLevel) => LEVELS.findIndex((l) => l.level === level);

/** Units the test covers when it starts at `from` (Unit 0, the alphabet, is never tested). */
export const placementUnits = (from: CourseLevel = "A1"): Unit[] => COURSE.filter((u) => u.number >= 1 && levelIndex(u.level) >= levelIndex(from));

/** Levels the test can start at: only those with units to test. Levels still being written are left out. */
export const placementLevels = (): CourseLevel[] => LEVELS.map((l) => l.level).filter((level) => COURSE.some((u) => u.number >= 1 && u.level === level));

/** Units below the chosen starting level: the learner says they know them, so they count as passed. */
export const unitsBelow = (from: CourseLevel): Unit[] => COURSE.filter((u) => u.number >= 1 && levelIndex(u.level) < levelIndex(from));

/** Three questions per unit from the starting level on, each from a different lesson where possible. */
export function buildPlacement(seed: number, from: CourseLevel = "A1"): PlacementQuestion[] {
  const rand = rng(seed);
  const out: PlacementQuestion[] = [];
  for (const unit of placementUnits(from)) {
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
export function placementResult(results: UnitResult[], from: CourseLevel = "A1"): { passed: UnitResult[]; startUnitId: string | null } {
  const passed: UnitResult[] = [];
  for (const r of results) {
    if (r.asked < QUESTIONS_PER_UNIT || !unitPassed(r)) return { passed, startUnitId: r.unitId };
    passed.push(r);
  }
  const next = placementUnits(from).find((u) => !results.some((r) => r.unitId === u.id));
  return { passed, startUnitId: next?.id ?? null };
}
