import type { CourseLesson, CourseLevel, Phrase, Unit } from "./types";
import { A1_UNITS } from "./units/a1";
import { A2_UNITS } from "./units/a2";
import { B1_UNITS } from "./units/b1";
import { B2_UNITS } from "./units/b2";
import { C1_UNITS } from "./units/c1";

export type { CourseLesson, CourseLevel, DialogueLine, GrammarNote, LetterCard, Phrase, Unit } from "./types";

/** The full course, A0 → C1, starting with the alphabet. Hand-written content; see lib/course/units/. */
export const COURSE: Unit[] = [...A1_UNITS, ...A2_UNITS, ...B1_UNITS, ...B2_UNITS, ...C1_UNITS];

export const LEVELS: { level: CourseLevel; title: string; summary: string }[] = [
  { level: "A1", title: "Beginner", summary: "The alphabet, introductions, numbers, shopping, family, daily routine and getting around." },
  { level: "A2", title: "Elementary", summary: "Talk about the past, give reasons, compare, and handle everyday errands and travel." },
  { level: "B1", title: "Intermediate", summary: "Tell stories, give opinions, and get by at work, in education and in society." },
  { level: "B2", title: "Upper intermediate", summary: "Discuss abstract topics fluently, report what others said and write formally." },
  { level: "C1", title: "Advanced", summary: "Precise, idiomatic German for academic, professional and cultural contexts." },
];

/** Course units grouped by CEFR level, in course order (levels with no units are left out). */
export function unitsByLevel(): { level: CourseLevel; title: string; summary: string; units: Unit[] }[] {
  return LEVELS.map((l) => ({ ...l, units: COURSE.filter((u) => u.level === l.level) })).filter((l) => l.units.length > 0);
}

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
