import "server-only";
import { z } from "zod";
import { env } from "../env";
import { ALL_LESSONS, getUnit, type CourseLevel } from "../course";
import { chatJson, type ChatMessage } from "../ollama";
import { courseDictionary, withVocabulary } from "../practice/dictionary";
import { knownWords } from "../practice/known-words";
import { GeneratedSentencesSchema, GeneratedStorySchema, STORY_LIMITS, validateSentences, validateStory } from "../practice/validate";
import { BadRequestError, ServiceUnavailableError } from "../errors";
import { FUNCTION_WORDS } from "../stories";
import { listGenerated, type ProfileDoc } from "./repo";

const GENERATION_TIMEOUT_MS = 300_000;
// Keep prompts short: on a GPU-poor machine prompt processing dominates generation time.
const MAX_PROMPT_TERMS = 150;

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function ask(profile: ProfileDoc, messages: ChatMessage[], schema: z.ZodType, numPredict: number, signal?: AbortSignal) {
  const model = profile.model || env().OLLAMA_MODEL;
  const raw = await chatJson(model, messages, signal, { format: z.toJSONSchema(schema), numPredict, temperature: 0.7, timeoutMs: GENERATION_TIMEOUT_MS });
  return { raw, json: parseJson(raw), model };
}

const vocabList = (terms: string[]) => terms.slice(0, MAX_PROMPT_TERMS).join(" | ");

// ---------- stories ----------

/** How hard a generated story may be, by the unit's level. `maxWords` is also the validator's sentence limit. */
const STORY_STYLE: Record<CourseLevel, { reader: string; maxWords: number; style: string }> = {
  A1: { reader: "very easy German reading practice for an adult beginner (CEFR A1)", maxWords: 10, style: "present tense, telling one simple everyday story" },
  A2: { reader: "easy German reading practice for an adult learner (CEFR A2)", maxWords: 12, style: "present tense and Perfekt, simple linked sentences" },
  B1: { reader: "German reading practice for an intermediate adult learner (CEFR B1)", maxWords: 16, style: "past tenses and subordinate clauses are fine" },
  B2: { reader: "German reading practice for an upper-intermediate adult learner (CEFR B2)", maxWords: 20, style: "natural written German with complex sentences" },
  C1: { reader: "German reading practice for an advanced adult learner (CEFR C1)", maxWords: 22, style: "precise, idiomatic written German, e.g. a short report or opinion piece" },
};

export async function generateStory(profile: ProfileDoc, unitId: string, signal?: AbortSignal) {
  const unit = getUnit(unitId);
  if (!unit || unit.number < 1) throw new BadRequestError("Pick a course unit (Unit 1 or later).");
  const style = STORY_STYLE[unit.level];
  const known = await knownWords(profile._id, unitId);
  const dict = withVocabulary(courseDictionary(), known.vocabulary);
  const topics = unit.lessons.map((l) => l.title);
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const previous = (await listGenerated(profile._id, "story", unitId, 10)).map((d) => (d.payload as { title?: string }).title).filter(Boolean);

  const system = `You write ${style.reader}.
The learner only knows these German words and phrases:
${vocabList(known.terms)}

Rules:
- Use ONLY words from that list (any normal form of them is fine), plus people's first names and numbers.
- Exactly 6 to 8 sentences, each at most ${style.maxWords} words, ${style.style}.
- Give an English translation for every sentence.
- "glossary": one entry for EVERY word in the story except these small words: ${[...FUNCTION_WORDS].join(", ")}. Use the word exactly as it appears in the story, with a short English meaning.
- "questions": exactly 3 multiple-choice questions in English about the story, each with exactly 3 different short options; "answer" must be exactly one of the options.
- "title": a short German title. "blurb": one short English sentence describing the story.
Respond ONLY with JSON.`;
  const user = `Write a new story about: ${topic} (Unit ${unit.number}: ${unit.title}).${
    previous.length ? ` Don't repeat these earlier stories: ${previous.join("; ")}.` : ""
  }`;

  const messages: ChatMessage[] = [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
  for (let attempt = 0; attempt < 2; attempt++) {
    const { raw, json, model } = await ask(profile, messages, GeneratedStorySchema, 1100, signal);
    const check = validateStory(json, known.stems, dict, Math.max(STORY_LIMITS.maxWords, style.maxWords + 4));
    if (check.ok) return { story: check.story, model };
    console.warn(`[generate] story attempt ${attempt + 1} rejected: ${check.problems.join(" ")} unknown=${check.unknown.slice(0, 20).join(",")}`);
    messages.push(
      { role: "assistant", content: raw },
      {
        role: "user",
        content: `That story has problems: ${check.problems.join(" ")}${
          check.unknown.length ? ` Replace these words the learner doesn't know: ${check.unknown.slice(0, 15).join(", ")}.` : ""
        } Write the whole story again, following all the rules.`,
      },
    );
  }
  throw new ServiceUnavailableError("llm", "The model couldn't write a story that fits your vocabulary this time. Please try again.");
}

// ---------- dictation sentences ----------

export async function generateSentences(profile: ProfileDoc, signal?: AbortSignal) {
  const known = await knownWords(profile._id);
  const existingGenerated = (await listGenerated(profile._id, "sentences", undefined, 50)).flatMap(
    (d) => (d.payload as { sentences: { de: string }[] }).sentences.map((s) => s.de),
  );
  const existing = new Set([...ALL_LESSONS.flatMap(({ lesson }) => lesson.phrases.map((p) => p.de)), ...existingGenerated]);

  const system = `You write short German sentences for listening and dictation practice for an adult beginner (CEFR A1).
The learner only knows these German words and phrases:
${vocabList(known.terms)}

Rules:
- Use ONLY words from that list (any normal form of them is fine), plus first names and numbers.
- Each sentence: 4 to 8 words, natural everyday German, correct spelling and capitalisation, ending with . ! or ?
- Mix statements and questions. Recombine the known words into NEW sentences; don't copy the list.
- Give an English translation for each.
Respond ONLY with JSON.`;
  const messages: ChatMessage[] = [
    { role: "system", content: system },
    { role: "user", content: "Write 12 different new sentences." },
  ];
  let kept: { de: string; en: string }[] = [];
  let model = "";
  for (let attempt = 0; attempt < 2 && kept.length < 6; attempt++) {
    const r = await ask(profile, messages, GeneratedSentencesSchema, 900, signal);
    model = r.model;
    const check = validateSentences(r.json, known.stems, new Set([...existing, ...kept.map((k) => k.de)]));
    kept = [...kept, ...check.sentences];
    messages.push(
      { role: "assistant", content: r.raw },
      { role: "user", content: `Some sentences used words the learner doesn't know (${check.unknown.slice(0, 15).join(", ")}) or were too long. Write 12 more, following all the rules.` },
    );
  }
  if (kept.length === 0) throw new ServiceUnavailableError("llm", "The model couldn't write sentences that fit your vocabulary this time. Please try again.");
  return { sentences: kept.slice(0, 12), model };
}
