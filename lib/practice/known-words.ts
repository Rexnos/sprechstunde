import "server-only";
import type { ObjectId } from "mongodb";
import { ALL_LESSONS, COURSE } from "../course";
import { getCourseProgress, listVocabulary } from "../services/repo";
import { stemsFrom } from "./validate";

export type KnownWords = {
  /** German phrases/terms the learner has met, most recent first (for prompts). */
  terms: string[];
  /** Stems for checking generated text. */
  stems: Set<string>;
  /** The furthest unit the learner has fully or partly completed. */
  latestUnitId: string;
  /** The learner's saved vocabulary (for glossary lookups). */
  vocabulary: { term: string; meaning: string }[];
};

/**
 * Everything the learner has been taught: phrases from finished course lessons
 * (optionally only up to a given unit) plus their Vocabulary list.
 */
export async function knownWords(profileId: ObjectId, upToUnitId?: string): Promise<KnownWords> {
  const [progress, vocab] = await Promise.all([getCourseProgress(profileId), listVocabulary(profileId, { limit: 400, skip: 0 })]);
  const done = new Set(progress.lessons.map((l) => l.lessonId));
  const limit = upToUnitId ? COURSE.findIndex((u) => u.id === upToUnitId) : COURSE.length - 1;

  let lessons = ALL_LESSONS.filter(({ unit, lesson }) => done.has(lesson.id) && COURSE.indexOf(unit) <= limit);
  // Nothing finished yet (or a unit chosen beyond progress): use the course up to that unit.
  if (lessons.length === 0 || upToUnitId) lessons = ALL_LESSONS.filter(({ unit }) => COURSE.indexOf(unit) <= Math.max(limit, 1));

  const phrases = lessons
    .slice()
    .reverse()
    .flatMap(({ lesson }) => lesson.phrases.map((p) => p.de))
    .filter((t) => !t.includes("{"));
  const terms = [...new Set([...phrases, ...vocab.items.map((v) => v.term)])];
  const latest = ALL_LESSONS.filter(({ lesson }) => done.has(lesson.id)).at(-1)?.unit.id ?? "u1";
  return { terms, stems: stemsFrom(terms), latestUnitId: latest, vocabulary: vocab.items.map((v) => ({ term: v.term, meaning: v.meaning })) };
}
