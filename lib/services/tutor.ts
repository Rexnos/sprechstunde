import "server-only";
import { env } from "../env";
import { allPhrases, getUnit } from "../course";
import { getLesson } from "../lessons";
import { chatJson, type ChatMessage } from "../ollama";
import { buildTutorSystemPrompt } from "../prompts";
import { addVocabulary, dueVocabulary, listMessages, saveExchange, type ProfileDoc, type SessionDoc } from "./repo";
import { parseTutorOutput } from "./tutor-output";

/** How many previous messages the model sees. Small models degrade with long contexts. */
const HISTORY_MESSAGES = 12;

export type PreparedTurn = {
  profile: ProfileDoc;
  session: SessionDoc;
  message: string;
  model: string;
  messages: ChatMessage[];
  userAt: Date;
};

/** Builds the model input for one learner turn (history, lesson, practice terms). */
export async function prepareTurn(input: { profile: ProfileDoc; session: SessionDoc; message: string; spoken?: boolean }): Promise<PreparedTurn> {
  const { profile, session } = input;
  const userAt = new Date();
  const model = profile.model || env().OLLAMA_MODEL;
  const lesson = getLesson(session.lessonId);
  const unit = getUnit(session.courseUnitId);

  const [history, practice] = await Promise.all([
    listMessages(session._id, HISTORY_MESSAGES),
    session.mode === "vocabulary" ? dueVocabulary(profile._id, 8) : Promise.resolve([]),
  ]);

  const system = buildTutorSystemPrompt({
    settings: { ...profile, level: session.level },
    mode: session.mode,
    lesson,
    practiceTerms: practice.map((v) => ({ term: v.term, meaning: v.meaning })),
    spoken: input.spoken,
    // A1 reviews stick to what has been taught; later units steer towards the unit's material.
    knownPhrases: unit?.level === "A1" ? allPhrases(unit.id).map((ph) => ph.de) : undefined,
    unitFocus:
      unit && unit.level !== "A1"
        ? {
            title: unit.title,
            goal: unit.goal,
            grammar: unit.lessons.flatMap((l) => (l.grammar ? [l.grammar.title] : [])),
            phrases: unit.lessons.flatMap((l) => l.phrases.map((ph) => ph.de)),
          }
        : undefined,
  });

  const messages: ChatMessage[] = [
    { role: "system", content: system },
    // History is replayed as plain text; the JSON wrapper is only for the newest turn.
    ...history.map((m): ChatMessage => ({ role: m.role, content: m.text })),
    { role: "user", content: input.message },
  ];
  return { profile, session, message: input.message, model, messages, userAt };
}

/** Validates the raw model output and saves the exchange and any new vocabulary. */
export async function finishTurn(turn: PreparedTurn, raw: string, inputMethod: "text" | "voice", latencyMs: number) {
  const { response, fallback } = parseTutorOutput(raw, turn.message);
  if (fallback) console.warn(`[tutor] model output failed validation (model=${turn.model}); using fallback`);

  const saved = await saveExchange({
    session: turn.session,
    userText: turn.message,
    inputMethod,
    correction: response.correction,
    reply: response.reply,
    nextPrompt: response.nextPrompt,
    vocabulary: response.vocabulary,
    fallback,
    model: turn.model,
    latencyMs,
    userAt: turn.userAt,
  });
  const newVocabulary = await addVocabulary(turn.profile._id, response.vocabulary, turn.session._id);
  return { ...saved, newVocabulary, latencyMs, model: turn.model };
}

export async function runTutorTurn(input: {
  profile: ProfileDoc;
  session: SessionDoc;
  message: string;
  inputMethod: "text" | "voice";
  signal?: AbortSignal;
}) {
  const turn = await prepareTurn(input);
  const started = Date.now();
  const raw = await chatJson(turn.model, turn.messages, input.signal);
  return finishTurn(turn, raw, input.inputMethod, Date.now() - started);
}
