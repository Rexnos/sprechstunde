import { kindsFor, makeExercise, rng, shuffle, type Exercise } from "../course/exercises";
import type { Phrase } from "../course/types";

/**
 * The weekly check-up: 15 questions over four skills, drawn from what the learner
 * studied this week, older material (retention) and checked AI sentences.
 * Pure, so the server can build it and tests can pin it down.
 */

export const SKILLS = ["reading", "listening", "grammar", "speaking"] as const;
export type CheckupSkill = (typeof SKILLS)[number];
export type CheckupSource = "week" | "review" | "ai";

export const SKILL_LABEL: Record<CheckupSkill, string> = {
  reading: "Reading & meaning",
  listening: "Listening",
  grammar: "Grammar & writing",
  speaking: "Speaking",
};

export type CheckupQuestion =
  | { id: string; skill: Exclude<CheckupSkill, "speaking">; source: CheckupSource; kind: "exercise"; exercise: Exercise }
  | { id: string; skill: "speaking"; source: CheckupSource; kind: "speak"; phrase: Phrase };

export type CheckupPools = { week: Phrase[]; review: Phrase[]; ai: Phrase[] };

type Slot = { skill: CheckupSkill; kind: "meaning" | "listen" | "gap" | "build" | "speak" };

const SLOTS: Slot[] = [
  ...Array.from({ length: 4 }, () => ({ skill: "reading", kind: "meaning" }) as const),
  ...Array.from({ length: 4 }, () => ({ skill: "listening", kind: "listen" }) as const),
  ...Array.from({ length: 2 }, () => ({ skill: "grammar", kind: "gap" }) as const),
  ...Array.from({ length: 2 }, () => ({ skill: "grammar", kind: "build" }) as const),
  ...Array.from({ length: 3 }, () => ({ skill: "speaking", kind: "speak" }) as const),
];
export const CHECKUP_LENGTH = SLOTS.length;

// About 50% this week, 30% older material, 20% AI sentences.
const SOURCE_MIX: CheckupSource[] = [...Array<CheckupSource>(8).fill("week"), ...Array<CheckupSource>(4).fill("review"), ...Array<CheckupSource>(3).fill("ai")];
const FALLBACK: Record<CheckupSource, CheckupSource[]> = {
  week: ["week", "review", "ai"],
  review: ["review", "week", "ai"],
  ai: ["ai", "week", "review"],
};

const usable = (p: Phrase) => !p.de.includes("{") && p.de.trim().length > 0 && p.en.trim().length > 0;
const speakable = (p: Phrase) => p.de.split(/\s+/).length <= 10;

export function buildCheckup(pools: CheckupPools, seed: number): CheckupQuestion[] {
  const rand = rng(seed);
  // Each German phrase is used once; "week" wins when the same phrase is in two pools.
  const seen = new Set<string>();
  const left: Record<CheckupSource, Phrase[]> = { week: [], review: [], ai: [] };
  for (const source of ["week", "review", "ai"] as const) {
    for (const p of shuffle(pools[source].filter(usable), rand)) {
      const key = p.de.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      left[source].push(p);
    }
  }
  const distractorPool = [...left.week, ...left.review, ...left.ai];
  const sources = shuffle(SOURCE_MIX, rand);

  const out: CheckupQuestion[] = [];
  SLOTS.forEach((slot, i) => {
    for (const source of FALLBACK[sources[i]]) {
      const fits = (p: Phrase) => (slot.kind === "speak" ? speakable(p) : kindsFor(p).includes(slot.kind as Exclude<Slot["kind"], "speak">));
      const at = left[source].findIndex(fits);
      if (at < 0) continue;
      const [phrase] = left[source].splice(at, 1);
      const id = `${i}:${phrase.id}`;
      if (slot.kind === "speak") out.push({ id, skill: "speaking", source, kind: "speak", phrase });
      else out.push({ id, skill: slot.skill as Exclude<CheckupSkill, "speaking">, source, kind: "exercise", exercise: makeExercise(slot.kind, phrase, distractorPool, rand) });
      return;
    }
  });
  return out;
}

export type SkillScore = { correct: number; asked: number };
export type CheckupSummary = { skills: Partial<Record<CheckupSkill, SkillScore>>; score: number | null };

/** `correct: null` means the question wasn't tested (e.g. speaking skipped); it's left out of the score. */
export function summarize(answers: { skill: CheckupSkill; correct: boolean | null }[]): CheckupSummary {
  const skills: CheckupSummary["skills"] = {};
  for (const a of answers) {
    if (a.correct === null) continue;
    const s = (skills[a.skill] ??= { correct: 0, asked: 0 });
    s.asked++;
    if (a.correct) s.correct++;
  }
  const all = Object.values(skills);
  const asked = all.reduce((n, s) => n + s.asked, 0);
  return { skills, score: asked ? all.reduce((n, s) => n + s.correct, 0) / asked : null };
}

/** Monday 00:00 (server-local time) of the week containing `date`. Weeks run Monday to Sunday. */
export function weekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

/** "YYYY-MM-DD" of the week's Monday, for grouping check-ups by week. */
export function weekKey(date: Date): string {
  const d = weekStart(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
