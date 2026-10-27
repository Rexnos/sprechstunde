/** A phrase the learner meets in a lesson. */
export type Phrase = {
  id: string;
  de: string;
  en: string;
  /** Word-by-word gloss, shown on demand. */
  words?: [de: string, en: string][];
  /** Short usage note in English. */
  note?: string;
  /** Other spoken forms that count as correct (e.g. digits vs number words). */
  accept?: string[];
};

/** A line in the scripted mini-conversation at the end of a lesson. */
export type DialogueLine = {
  speaker: "tutor" | "you";
  /** German text. On "you" lines, {slot} marks a personal answer (any words match). */
  de: string;
  /** English: the meaning of tutor lines, or the prompt for the learner's line. */
  en: string;
  accept?: string[];
};

/** One letter of the alphabet with its German name and an example word. */
export type LetterCard = {
  letter: string;
  /** How the letter's name is written in German (shown to the learner). */
  name: string;
  /** Text sent to TTS. A single capital letter is read as its German name by Piper. */
  say: string;
  example: string;
  exampleEn: string;
  tip?: string;
};

export type GrammarNote = {
  title: string;
  text: string;
  table?: string[][]; // first row is the header
};

export type CourseLesson = {
  id: string;
  title: string;
  /** 2–4 sentences in English explaining what this lesson is about. */
  intro: string;
  grammar?: GrammarNote;
  phrases: Phrase[];
  dialogue: DialogueLine[];
  /** Alphabet lessons: letters shown as a grid in Learn and used for letter exercises. */
  letters?: LetterCard[];
  /** Words for "listen to the spelling, type the word" exercises. */
  spellWords?: string[];
};

/** CEFR level a unit belongs to. */
export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export type Unit = {
  id: string;
  number: number;
  level: CourseLevel;
  title: string;
  goal: string;
  lessons: CourseLesson[];
};
