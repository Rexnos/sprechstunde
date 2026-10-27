// Automatic checks for AI-generated practice content. Pure functions; unit-tested.
import { z } from "zod";
import { FUNCTION_WORDS, type Story } from "../stories";

// ---------- vocabulary ----------

const clean = (w: string) => w.toLowerCase().replace(/[„“”"'.,!?:;()–-]/g, "");
export const stemOf = (w: string) => (w.length > 5 ? w.slice(0, 5) : w);

/** Stems of every word in the given phrases/terms, for loose matching of inflected forms. */
export function stemsFrom(texts: string[]): Set<string> {
  const out = new Set<string>();
  for (const t of texts) for (const w of t.split(/\s+/).map(clean)) if (w.length >= 2) out.add(stemOf(w));
  return out;
}

function contentWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map(clean)
    .filter((w) => w && /\p{L}/u.test(w) && !FUNCTION_WORDS.has(w));
}

/** Content words that aren't in the learner's known vocabulary. */
export function unknownWords(texts: string[], stems: Set<string>): string[] {
  return [...new Set(texts.flatMap(contentWords).filter((w) => !stems.has(stemOf(w))))];
}

/** Share of content words (counted with repeats) that aren't known. */
export function unknownRatio(texts: string[], stems: Set<string>): number {
  const words = texts.flatMap(contentWords);
  if (!words.length) return 0;
  return words.filter((w) => !stems.has(stemOf(w))).length / words.length;
}

// ---------- stories ----------

export const GeneratedStorySchema = z.object({
  title: z.string().trim().min(1).max(80),
  blurb: z.string().trim().min(1).max(160),
  // min/max are also enforced by Ollama's grammar when this schema is the output format.
  sentences: z.array(z.object({ de: z.string().trim().min(1).max(200), en: z.string().trim().min(1).max(240) })).min(5).max(10),
  glossary: z.array(z.object({ word: z.string().trim().min(1).max(40), meaning: z.string().trim().min(1).max(80) })).max(40),
  questions: z
    .array(z.object({ q: z.string().trim().min(1).max(160), options: z.array(z.string().trim().min(1).max(80)).min(3).max(3), answer: z.string().trim().min(1).max(80) }))
    .min(3)
    .max(3),
});

export const STORY_LIMITS = { minSentences: 5, maxSentences: 10, maxWords: 14, maxUnknown: 0.25, minGlossCoverage: 0.85 };

export type StoryCheck = { ok: true; story: Omit<Story, "id" | "unitId"> } | { ok: false; problems: string[]; unknown: string[] };

/**
 * Checks a generated story. `dict` (German → English) fills glossary gaps the model
 * left; coverage is measured after filling.
 */
export function validateStory(raw: unknown, stems: Set<string>, dict: Map<string, string> = new Map(), maxWords = STORY_LIMITS.maxWords): StoryCheck {
  const parsed = GeneratedStorySchema.safeParse(raw);
  if (!parsed.success) return { ok: false, problems: ["The output didn't match the story format."], unknown: [] };
  const st = parsed.data;
  const problems: string[] = [];
  const L = { ...STORY_LIMITS, maxWords };

  if (st.sentences.length < L.minSentences || st.sentences.length > L.maxSentences)
    problems.push(`Write ${L.minSentences}–${L.maxSentences} sentences (got ${st.sentences.length}).`);
  const long = st.sentences.filter((s) => s.de.split(/\s+/).length > L.maxWords);
  if (long.length) problems.push(`Keep every sentence under ${L.maxWords} words.`);

  if (st.questions.length !== 3) problems.push("Write exactly 3 questions.");
  for (const q of st.questions) {
    if (q.options.length !== 3 || new Set(q.options).size !== 3) problems.push(`Question "${q.q}" needs 3 different options.`);
    if (!q.options.includes(q.answer)) problems.push(`The answer to "${q.q}" must be one of its options.`);
  }

  const texts = st.sentences.map((s) => s.de);
  const unknown = unknownWords(texts, stems);
  if (unknownRatio(texts, stems) > L.maxUnknown) problems.push(`Too many words the learner doesn't know yet: ${unknown.slice(0, 12).join(", ")}.`);

  const glossary: Record<string, string> = {};
  for (const g of st.glossary) glossary[clean(g.word)] = g.meaning;
  for (const w of texts.flatMap(contentWords)) if (!glossary[w] && dict.has(w)) glossary[w] = dict.get(w)!;
  const needed = [...new Set(texts.flatMap(contentWords))];
  const covered = needed.filter((w) => glossary[w]);
  if (needed.length && covered.length / needed.length < L.minGlossCoverage) problems.push("The glossary must explain the words used in the story.");

  if (problems.length) return { ok: false, problems: [...new Set(problems)], unknown };
  for (const w of needed) glossary[w] ??= "(no gloss)";
  return {
    ok: true,
    story: { title: st.title, blurb: st.blurb, sentences: st.sentences, glossary, questions: st.questions.map((q) => ({ q: q.q, options: q.options, answer: q.answer })) },
  };
}

// ---------- dictation sentences ----------

export const GeneratedSentencesSchema = z.object({
  sentences: z.array(z.object({ de: z.string().trim().min(1).max(160), en: z.string().trim().min(1).max(200) })).max(12),
});

export function validateSentences(raw: unknown, stems: Set<string>, existing: Set<string>) {
  const parsed = GeneratedSentencesSchema.safeParse(raw);
  if (!parsed.success) return { sentences: [], rejected: 0, unknown: [] as string[] };
  const seen = new Set([...existing].map((e) => clean(e)));
  const kept: { de: string; en: string }[] = [];
  const unknown = new Set<string>();
  for (const s of parsed.data.sentences) {
    const n = s.de.split(/\s+/).length;
    const key = s.de.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const u = unknownWords([s.de], stems);
    if (n < 3 || n > 10 || seen.has(clean(key)) || unknownRatio([s.de], stems) > 0.2 || !/[.!?]$/.test(s.de)) {
      u.forEach((w) => unknown.add(w));
      continue;
    }
    seen.add(clean(key));
    kept.push(s);
  }
  return { sentences: kept, rejected: parsed.data.sentences.length - kept.length, unknown: [...unknown] };
}

// ---------- pronunciation sentences ----------

// NFC: Piper writes ç as "c" + combining cedilla; our symbols use the single character.
const stripStress = (ipa: string) => ipa.normalize("NFC").replace(/[ˈˌ]/g, "");

/** How often any of the given IPA symbols occurs (longest symbols first, no double counting). */
export function countSounds(ipa: string, symbols: string[]): number {
  let rest = stripStress(ipa);
  let n = 0;
  for (const sym of symbols.map((s) => s.normalize("NFC")).sort((a, b) => b.length - a.length)) {
    const parts = rest.split(sym);
    n += parts.length - 1;
    rest = parts.join(" ");
  }
  return n;
}

/**
 * How useful a sentence is for practising a sound set, as the TTS voice pronounces it.
 * 0 unless it has the harder sound (targets[0]) and at least 2 target sounds in total;
 * otherwise higher for more of the harder sound (the other side breaks ties).
 */
export function soundRichness(ipa: string, targets: [string[], string[]]): number {
  const a = countSounds(ipa, targets[0]);
  const b = countSounds(ipa, targets[1]);
  return a >= 1 && a + b >= 2 ? a + Math.min(b, 3) / 10 : 0;
}
