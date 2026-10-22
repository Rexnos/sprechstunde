import type { CourseLesson, Phrase, Unit } from "./types";
import { unit0 } from "./units/u0-alphabet";
import { unit1 } from "./units/u1-hallo";
import { unit2 } from "./units/u2-ich-bin";
import { unit3 } from "./units/u3-zahlen";
import { unit4 } from "./units/u4-cafe";
import { unit5 } from "./units/u5-einkaufen";
import { unit6 } from "./units/u6-familie";
import { unit7 } from "./units/u7-mein-tag";
import { unit8 } from "./units/u8-unterwegs";

export type { CourseLesson, DialogueLine, GrammarNote, LetterCard, Phrase, Unit } from "./types";

/** The beginner course, A0 → A1, starting with the alphabet. Hand-written content; see lib/course/units/. */
export const COURSE: Unit[] = [unit0, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8];

export const ALL_LESSONS: { unit: Unit; lesson: CourseLesson }[] = COURSE.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })));

export function getUnit(id: string | undefined): Unit | undefined {
  return id ? COURSE.find((u) => u.id === id) : undefined;
}

export function getCourseLesson(id: string): { unit: Unit; lesson: CourseLesson; index: number } | undefined {
  const index = ALL_LESSONS.findIndex((x) => x.lesson.id === id);
  return index === -1 ? undefined : { ...ALL_LESSONS[index], index };
}

/** Every phrase taught up to and including the given unit (for the unit review call). */
export function allPhrases(unitId: string): Phrase[] {
  const last = COURSE.findIndex((u) => u.id === unitId);
  return COURSE.slice(0, last + 1).flatMap((u) => u.lessons.flatMap((l) => l.phrases)).filter((ph) => !ph.de.includes("{"));
}
