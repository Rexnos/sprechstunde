import { ALL_LESSONS } from "../course";
import { STORIES } from "../stories";

const clean = (w: string) => w.toLowerCase().replace(/[„“”"'.,!?:;()…–-]/g, "").trim();

let cached: Map<string, string> | null = null;

/**
 * A small German → English word list built from the hand-written content: story
 * glossaries, word-by-word glosses in the course and one-word course phrases.
 * Used to fill gaps in AI-written glossaries.
 */
export function courseDictionary(): Map<string, string> {
  if (cached) return cached;
  const dict = new Map<string, string>();
  const add = (de: string, en: string) => {
    for (const w of de.split(/\s+/).map(clean)) if (w && !dict.has(w) && de.trim().split(/\s+/).length === 1) dict.set(w, en);
  };
  for (const st of STORIES) for (const [w, en] of Object.entries(st.glossary)) if (!dict.has(w)) dict.set(w, en);
  for (const { lesson } of ALL_LESSONS) {
    for (const p of lesson.phrases) {
      for (const [de, en] of p.words ?? []) add(de, en);
      add(p.de, p.en);
    }
  }
  cached = dict;
  return dict;
}

/** Adds entries for single-word vocabulary items the learner saved. */
export function withVocabulary(dict: Map<string, string>, vocab: { term: string; meaning: string }[]): Map<string, string> {
  const out = new Map(dict);
  for (const v of vocab) {
    const w = clean(v.term.replace(/^(der|die|das)\s+/i, ""));
    if (w && !w.includes(" ") && !out.has(w)) out.set(w, v.meaning);
  }
  return out;
}
