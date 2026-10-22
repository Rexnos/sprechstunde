import "server-only";
import type { ObjectId } from "mongodb";
import { ALL_LESSONS } from "../course";
import { soundRichness } from "../practice/validate";
import { getSoundSet } from "../pronunciation";
import { phonemize } from "../speech-client";
import { STORIES } from "../stories";
import { BadRequestError } from "../errors";
import { listGenerated } from "./repo";

export type SoundSentence = { de: string; en: string; source: "course" | "story" | "ai" };

// Phonemizing is deterministic, so cache it for the life of the server.
const ipaCache = new Map<string, string>();

async function ipaFor(texts: string[]): Promise<Map<string, string>> {
  const missing = [...new Set(texts.filter((t) => !ipaCache.has(t)))];
  for (let i = 0; i < missing.length; i += 40) {
    const batch = missing.slice(i, i + 40);
    const ipa = await phonemize(batch);
    batch.forEach((t, k) => ipaCache.set(t, ipa[k] ?? ""));
  }
  return ipaCache;
}

/**
 * Real sentences from the course, the stories and the learner's AI dictation sentences
 * that are rich in a sound set's harder sound, as the TTS voice pronounces them.
 * Most useful first, with some shuffling; `exclude` skips sentences already shown.
 */
export async function soundSentences(profileId: ObjectId, setId: string, limit: number, exclude: string[]): Promise<SoundSentence[]> {
  const set = getSoundSet(setId);
  if (!set) throw new BadRequestError("Unknown sound set.");
  const ai = await listGenerated(profileId, "sentences", undefined, 50);

  const pool = new Map<string, SoundSentence>();
  const add = (de: string, en: string, source: SoundSentence["source"]) => {
    if (!de.includes("{") && de.split(/\s+/).length >= 2 && !pool.has(de)) pool.set(de, { de, en, source });
  };
  for (const { lesson } of ALL_LESSONS) for (const p of lesson.phrases) add(p.de, p.en, "course");
  for (const st of STORIES) for (const s of st.sentences) add(s.de, s.en, "story");
  for (const d of ai) for (const s of (d.payload as { sentences: { de: string; en: string }[] }).sentences) add(s.de, s.en, "ai");

  const skip = new Set(exclude);
  const candidates = [...pool.values()].filter((s) => !skip.has(s.de));
  const ipa = await ipaFor(candidates.map((s) => s.de));
  return candidates
    .map((s) => ({ s, score: soundRichness(ipa.get(s.de) ?? "", set.targets) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score + Math.random() - (x.score + Math.random()))
    .slice(0, limit)
    .map((x) => x.s);
}
