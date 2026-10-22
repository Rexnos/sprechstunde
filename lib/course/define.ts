import type { CourseLesson, DialogueLine, GrammarNote, Phrase, Unit } from "./types";

type PhraseInput = Omit<Phrase, "id">;
type LessonInput = Omit<CourseLesson, "id" | "phrases" | "dialogue"> & {
  phrases: PhraseInput[];
  dialogue: DialogueLine[];
  grammar?: GrammarNote;
};

/** Shorthand for a phrase: p("Hallo!", "Hello!", { note: "…" }). */
export const p = (de: string, en: string, extra: Partial<PhraseInput> = {}): PhraseInput => ({ de, en, ...extra });
export const tutor = (de: string, en: string): DialogueLine => ({ speaker: "tutor", de, en });
export const you = (de: string, en: string, accept?: string[]): DialogueLine => ({ speaker: "you", de, en, accept });

/** Assigns stable ids: lesson "u2-3", phrase "u2-3-p4". */
export function defineUnit(number: number, title: string, goal: string, lessons: LessonInput[]): Unit {
  const id = `u${number}`;
  return {
    id,
    number,
    title,
    goal,
    lessons: lessons.map((l, li) => {
      const lessonId = `${id}-${li + 1}`;
      return { ...l, id: lessonId, phrases: l.phrases.map((ph, pi) => ({ ...ph, id: `${lessonId}-p${pi + 1}` })) };
    }),
  };
}
