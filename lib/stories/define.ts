// Story types and helpers shared by the per-level story files.

export type StorySentence = { de: string; en: string };
export type StoryQuestion = { q: string; options: string[]; answer: string };
export type Story = {
  id: string;
  unitId: string;
  title: string;
  blurb: string;
  sentences: StorySentence[];
  glossary: Record<string, string>;
  questions: StoryQuestion[];
};

/** Small words learners meet everywhere; they don't need a glossary entry. */
export const FUNCTION_WORDS = new Set(
  "ich du er sie es wir ihr und oder aber der die das den dem ein eine einen ist bin bist sind nicht auch sehr ja nein in im ins mit zu zum zur am an auf aus von bei nach um für so dann noch hier was wie wo".split(" "),
);

export const s = (de: string, en: string): StorySentence => ({ de, en });
export const q = (question: string, answer: string, ...others: string[]): StoryQuestion => ({ q: question, options: [answer, ...others], answer });

