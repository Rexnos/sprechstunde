import { ALPHABET, spellOut } from "./alphabet";
import type { CourseLesson, Phrase, Unit } from "./types";

export type Exercise =
  | { kind: "meaning"; id: string; phrase: Phrase; prompt: string; options: string[]; answer: string }
  | { kind: "listen"; id: string; phrase: Phrase; options: string[]; answer: string }
  | { kind: "build"; id: string; phrase: Phrase; tiles: string[]; answer: string }
  | { kind: "gap"; id: string; phrase: Phrase; before: string; after: string; options: string[]; answer: string }
  // Alphabet lessons. `phrase.de` is what gets spoken: the letter, or the word spelled out.
  | { kind: "letter"; id: string; phrase: Phrase; options: string[]; answer: string }
  | { kind: "spell"; id: string; phrase: Phrase; answer: string };

/** Small deterministic PRNG so a lesson's exercises are stable for a given seed. */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

export function shuffle<T>(items: T[], rand: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct: string, pool: string[], n: number, rand: () => number): string[] {
  const unique = [...new Set(pool.filter((p) => p.trim() && p !== correct))];
  return shuffle(unique, rand).slice(0, n);
}

const wordsOf = (s: string) => s.split(/\s+/).filter(Boolean);
const bare = (w: string) => w.replace(/[.,!?;:„“"…]/g, "");
const gapCandidatesOf = (words: string[]) => (words.length >= 2 ? words.map(bare).filter((w) => w.length >= 3) : []);

type PhraseKind = "meaning" | "listen" | "build" | "gap";

/** The phrase exercise kinds that work for this phrase (build needs 3–9 words, gap a word to blank). */
export function kindsFor(phrase: Phrase): PhraseKind[] {
  const words = wordsOf(phrase.de);
  const kinds: PhraseKind[] = ["meaning", "listen"];
  if (words.length >= 3 && words.length <= 9) kinds.push("build");
  if (gapCandidatesOf(words).length > 0) kinds.push("gap");
  return kinds;
}

/** One exercise of the given kind for a phrase, with distractors from `pool`. Check `kindsFor` first. */
export function makeExercise(kind: PhraseKind, phrase: Phrase, pool: Phrase[], rand: () => number): Exercise {
  const id = `${phrase.id}:${kind}`;
  const words = wordsOf(phrase.de);
  if (kind === "meaning") {
    const options = shuffle([phrase.en, ...pickDistractors(phrase.en, pool.map((p) => p.en), 3, rand)], rand);
    return { kind, id, phrase, prompt: phrase.de, options, answer: phrase.en };
  }
  if (kind === "listen") {
    const options = shuffle([phrase.de, ...pickDistractors(phrase.de, pool.map((p) => p.de), 3, rand)], rand);
    return { kind, id, phrase, options, answer: phrase.de };
  }
  if (kind === "build") {
    let tiles = shuffle(words, rand);
    if (tiles.join(" ") === words.join(" ")) tiles = [...tiles.slice(1), tiles[0]];
    return { kind, id, phrase, tiles, answer: words.join(" ") };
  }
  const gapCandidates = gapCandidatesOf(words);
  const target = gapCandidates[Math.floor(rand() * gapCandidates.length)];
  const pos = words.findIndex((w) => bare(w) === target);
  const allWords = pool.flatMap((p) => wordsOf(p.de).map(bare)).filter((w) => w.length >= 2);
  const options = shuffle([target, ...pickDistractors(target, allWords, 3, rand)], rand);
  const w = words[pos];
  const at = w.indexOf(target);
  const rest = words.slice(pos + 1).join(" ");
  return {
    kind,
    id,
    phrase,
    before: [...words.slice(0, pos), w.slice(0, at)].join(" ").trim(),
    after: `${w.slice(at + target.length)}${rest ? ` ${rest}` : ""}`.trim(),
    options,
    answer: target,
  };
}

/**
 * Builds a practice set from a lesson: one or two exercises per phrase, mixing
 * kinds, with distractors drawn from the lesson first and then the rest of the unit.
 */
export function buildExercises(lesson: CourseLesson, unit: Unit, seed = 1): Exercise[] {
  const rand = rng(seed);
  const unitPhrases = unit.lessons.flatMap((l) => l.phrases);
  const pool = [...lesson.phrases, ...unitPhrases.filter((p) => !lesson.phrases.includes(p))];
  const out: Exercise[] = [];

  lesson.phrases.forEach((phrase, idx) => {
    const kinds = kindsFor(phrase);
    // Rotate through kinds so the set feels varied; long lessons get one per phrase.
    const chosen = [kinds[idx % kinds.length]];
    if (lesson.phrases.length <= 6 && !lesson.letters) chosen.push(kinds[(idx + 2) % kinds.length]);
    for (const kind of [...new Set(chosen)]) out.push(makeExercise(kind, phrase, pool, rand));
  });

  // Alphabet: hear a letter name, pick the letter.
  if (lesson.letters?.length) {
    const letters = shuffle(lesson.letters, rand).slice(0, 6);
    for (const card of letters) {
      // Distractors: same lesson first; the four special letters need the whole alphabet.
      const pool = (lesson.letters.length >= 4 ? lesson.letters : ALPHABET).map((c) => c.letter);
      out.push({
        kind: "letter",
        id: `letter:${card.letter}`,
        phrase: { id: `letter-${card.letter}`, de: card.say, en: `the letter ${card.letter} (${card.name})` },
        options: shuffle([card.letter, ...pickDistractors(card.letter, pool, 3, rand)], rand),
        answer: card.letter,
      });
    }
  }

  // Spelling dictation: hear the word letter by letter, type it.
  if (lesson.spellWords?.length) {
    for (const word of shuffle(lesson.spellWords, rand).slice(0, 3)) {
      out.push({ kind: "spell", id: `spell:${word}`, phrase: { id: `spell-${word}`, de: spellOut(word), en: word }, answer: word });
    }
  }
  return shuffle(out, rand);
}

/** Checks a "build the sentence" answer, ignoring spacing. */
export function checkBuild(answer: string, picked: string[]) {
  return picked.join(" ").replace(/\s+/g, " ").trim() === answer.replace(/\s+/g, " ").trim();
}
