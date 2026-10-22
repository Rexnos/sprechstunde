import { TutorResponseSchema, type TutorResponse } from "../schemas";

export type ParsedTutorOutput = { response: TutorResponse; fallback: boolean };

const SAFE_FALLBACK_REPLY = "Entschuldigung, das habe ich nicht ganz verstanden. Kannst du das bitte noch einmal sagen?";

/**
 * Model output is untrusted text. Try hard to get a valid structured response;
 * if that is impossible, return a safe conversational fallback instead of failing.
 */
export function parseTutorOutput(raw: string, learnerMessage: string): ParsedTutorOutput {
  for (const candidate of jsonCandidates(raw)) {
    const normalised = normalise(candidate, learnerMessage);
    const result = TutorResponseSchema.safeParse(normalised);
    if (result.success) return { response: result.data, fallback: false };
  }

  // Not JSON at all: if it looks like plain prose, use it as the reply.
  const prose = raw.trim();
  const looksLikeJson = /[{}]/.test(prose);
  const reply = !looksLikeJson && prose.length > 0 ? prose.slice(0, 1200) : SAFE_FALLBACK_REPLY;
  return {
    response: { reply, correction: null, vocabulary: [], nextPrompt: "" },
    fallback: true,
  };
}

function* jsonCandidates(raw: string): Generator<unknown> {
  const text = raw.trim();
  const tryParse = (s: string) => {
    try {
      return { ok: true as const, value: JSON.parse(s) as unknown };
    } catch {
      return { ok: false as const };
    }
  };
  const direct = tryParse(text);
  if (direct.ok) yield direct.value;

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    const r = tryParse(fenced[1]);
    if (r.ok) yield r.value;
  }

  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last > first) {
    const r = tryParse(text.slice(first, last + 1));
    if (r.ok) yield r.value;
  }
}

/** Repair small, common deviations from the schema before validating. */
function normalise(value: unknown, learnerMessage: string): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const v = { ...(value as Record<string, unknown>) };

  if (typeof v.nextPrompt !== "string") v.nextPrompt = "";
  if (!Array.isArray(v.vocabulary)) v.vocabulary = [];
  v.vocabulary = (v.vocabulary as unknown[])
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item): Record<string, unknown> => ({ ...item, example: typeof item.example === "string" ? item.example : "" }))
    .filter((item) => typeof item.term === "string" && item.term.trim() && typeof item.meaning === "string" && item.meaning.trim())
    .slice(0, 5);

  const c = v.correction;
  if (c && typeof c === "object" && !Array.isArray(c)) {
    const corr = { ...(c as Record<string, unknown>) };
    if (typeof corr.original !== "string" || !corr.original.trim()) corr.original = learnerMessage;
    if (typeof corr.category !== "string" || !corr.category.trim()) corr.category = "other";
    corr.category = String(corr.category).toLowerCase().slice(0, 40);
    if (typeof corr.explanation !== "string") corr.explanation = "";
    // A "correction" that suggests exactly what was said is not a correction.
    if (typeof corr.suggested !== "string" || sameSentence(corr.suggested, String(corr.original))) {
      v.correction = null;
    } else {
      v.correction = corr;
    }
  } else {
    v.correction = null;
  }
  return v;
}

function sameSentence(a: string, b: string) {
  const norm = (s: string) => s.toLowerCase().replace(/[\s.,!?;:„“"'»«]+/g, " ").trim();
  return norm(a) === norm(b);
}
