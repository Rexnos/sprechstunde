import "server-only";
import { z } from "zod";
import { env } from "./env";
import { ServiceUnavailableError } from "./errors";
import { TutorResponseSchema } from "./schemas";
import { readNdjson } from "./services/ndjson";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const TUTOR_JSON_SCHEMA = z.toJSONSchema(TutorResponseSchema);

export async function listModels(timeoutMs = 3000): Promise<string[]> {
  const res = await ollamaFetch("/api/tags", { method: "GET" }, timeoutMs);
  const data = (await res.json()) as { models?: { name: string }[] };
  return (data.models ?? []).map((m) => m.name);
}

export type ChatOptions = {
  /** JSON schema the output must follow. Defaults to the tutor response schema. */
  format?: object;
  /** Hard cap on generated tokens. */
  numPredict?: number;
  temperature?: number;
  /** Overrides OLLAMA_TIMEOUT_MS (long generations such as stories). */
  timeoutMs?: number;
};

export function chatBody(model: string, messages: ChatMessage[], stream: boolean, opts: ChatOptions = {}) {
  return JSON.stringify({
    model,
    messages,
    stream,
    // Thinking models (qwen3.x etc.) otherwise spend minutes reasoning before each short reply.
    think: false,
    format: opts.format ?? TUTOR_JSON_SCHEMA,
    keep_alive: "15m",
    options: {
      temperature: opts.temperature ?? 0.4,
      num_predict: opts.numPredict ?? 500, // hard cap on generation length
      num_ctx: 4096,
    },
  });
}

/**
 * Non-streaming chat call constrained to a JSON schema (the tutor schema by default).
 * Returns the raw content string; callers must validate it.
 */
export async function chatJson(model: string, messages: ChatMessage[], signal?: AbortSignal, opts?: ChatOptions): Promise<string> {
  const res = await ollamaFetch("/api/chat", { method: "POST", body: chatBody(model, messages, false, opts), signal }, opts?.timeoutMs ?? env().OLLAMA_TIMEOUT_MS);
  const data = (await res.json()) as { message?: { content?: string } };
  return data.message?.content ?? "";
}

/** Streaming variant of chatJson: yields raw content deltas as the model writes them. */
export async function* chatJsonStream(model: string, messages: ChatMessage[], signal?: AbortSignal): AsyncGenerator<string> {
  const res = await ollamaFetch("/api/chat", { method: "POST", body: chatBody(model, messages, true), signal }, env().OLLAMA_TIMEOUT_MS);
  if (!res.body) throw new ServiceUnavailableError("llm", "Ollama returned an empty stream.");
  type Chunk = { message?: { content?: string }; error?: string; done?: boolean };
  try {
    for await (const chunk of readNdjson<Chunk>(res.body)) {
      if (chunk.error) throw new ServiceUnavailableError("llm", `Ollama error: ${chunk.error}`);
      if (chunk.message?.content) yield chunk.message.content;
      if (chunk.done) return;
    }
  } catch (err) {
    if (err instanceof ServiceUnavailableError || (err as Error).name === "AbortError") throw err;
    throw new ServiceUnavailableError("llm", `The model stream was interrupted (${(err as Error).message}).`);
  }
}

/** Loads the model into memory so the first real turn doesn't pay the load time. */
export async function warmModel(model: string): Promise<void> {
  await ollamaFetch("/api/generate", { method: "POST", body: JSON.stringify({ model, keep_alive: "15m" }) }, env().OLLAMA_TIMEOUT_MS);
}

/** How a loaded model is split between GPU and system RAM (from /api/ps). */
export async function modelPlacement(model: string): Promise<{ loaded: boolean; gpuPercent: number } | null> {
  const res = await ollamaFetch("/api/ps", { method: "GET" }, 3000);
  const data = (await res.json()) as { models?: { name: string; size: number; size_vram: number }[] };
  const m = data.models?.find((x) => x.name === model || x.name === `${model}:latest`);
  if (!m) return { loaded: false, gpuPercent: 0 };
  return { loaded: true, gpuPercent: m.size ? Math.round((m.size_vram / m.size) * 100) : 0 };
}

async function ollamaFetch(path: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const { OLLAMA_BASE_URL } = env();
  const timeout = AbortSignal.timeout(timeoutMs);
  const signal = init.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
  let res: Response;
  try {
    res = await fetch(new URL(path, OLLAMA_BASE_URL), {
      ...init,
      headers: { "Content-Type": "application/json" },
      signal,
      cache: "no-store",
    });
  } catch (err) {
    if (timeout.aborted) {
      throw new ServiceUnavailableError("llm", `The local model did not answer within ${Math.round(timeoutMs / 1000)}s. Try a smaller model.`);
    }
    throw new ServiceUnavailableError("llm", `Cannot reach Ollama at ${OLLAMA_BASE_URL}. Is Ollama running? (${(err as Error).message})`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const hint = res.status === 404 ? " The model may not be downloaded yet — run `ollama pull <model>`." : "";
    throw new ServiceUnavailableError("llm", `Ollama returned ${res.status}: ${body.slice(0, 200)}${hint}`);
  }
  return res;
}
