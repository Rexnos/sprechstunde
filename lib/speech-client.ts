import "server-only";
import { env } from "./env";
import { ServiceUnavailableError, BadRequestError } from "./errors";

export type SpeechHealth = {
  stt: { ok: boolean; model: string; device: string; detail?: string };
  tts: { ok: boolean; voices: string[]; detail?: string };
};

export type Transcript = {
  text: string;
  language: string;
  languageProbability: number;
  duration: number;
  segments: { start: number; end: number; text: string; avgLogprob: number }[];
};

export async function speechHealth(): Promise<SpeechHealth> {
  const res = await speechFetch("/health", { method: "GET" }, 3000);
  return (await res.json()) as SpeechHealth;
}

export async function transcribe(audio: Blob, filename: string, language = "de"): Promise<Transcript> {
  const form = new FormData();
  form.append("file", audio, filename);
  form.append("language", language);
  const res = await speechFetch("/transcribe", { method: "POST", body: form }, env().SPEECH_TIMEOUT_MS);
  return (await res.json()) as Transcript;
}

export async function synthesize(text: string, voice: string, rate: number): Promise<ArrayBuffer> {
  const res = await speechFetch(
    "/synthesize",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Piper's length_scale is the inverse of speaking rate.
      body: JSON.stringify({ text, voice, length_scale: Number((1 / rate).toFixed(2)) }),
    },
    env().SPEECH_TIMEOUT_MS,
  );
  return res.arrayBuffer();
}

/** IPA for each word, as the TTS voice pronounces it ("" if it couldn't be phonemized). */
export async function phonemize(words: string[], voice = "de_DE-thorsten-medium"): Promise<string[]> {
  const res = await speechFetch(
    "/phonemize",
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ words, voice }) },
    15_000,
  );
  return ((await res.json()) as { ipa: string[] }).ipa;
}

async function speechFetch(path: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const base = env().SPEECH_SERVICE_URL;
  let res: Response;
  try {
    res = await fetch(new URL(path, base), { ...init, signal: AbortSignal.timeout(timeoutMs), cache: "no-store" });
  } catch (err) {
    const timedOut = (err as Error).name === "TimeoutError";
    throw new ServiceUnavailableError(
      "speech",
      timedOut
        ? `The speech service did not answer within ${Math.round(timeoutMs / 1000)}s.`
        : `Cannot reach the speech service at ${base}. Start it with scripts/start-speech.ps1 (see the Status page).`,
    );
  }
  if (res.ok) return res;

  const body = (await res.json().catch(() => ({}))) as { detail?: unknown };
  const detail = typeof body.detail === "string" ? body.detail : `HTTP ${res.status}`;
  if (res.status >= 400 && res.status < 500) throw new BadRequestError(detail, res.status === 413 ? 413 : 400);
  throw new ServiceUnavailableError("speech", `Speech service error: ${detail}`);
}
