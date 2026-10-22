import { handle } from "@/lib/api";
import { env } from "@/lib/env";
import { warmModel } from "@/lib/ollama";
import { getProfile } from "@/lib/services/repo";
import { synthesize } from "@/lib/speech-client";

/** Loads the LLM and the Piper voice before the first call turn. Best effort. */
export const POST = handle(async () => {
  const profile = await getProfile();
  const model = profile.model || env().OLLAMA_MODEL;
  const [llm, tts] = await Promise.allSettled([
    warmModel(model),
    profile.ttsEngine === "piper" ? synthesize("Hallo.", profile.ttsVoice, profile.speechRate) : Promise.resolve(),
  ]);
  return Response.json({
    llm: llm.status === "fulfilled" ? "ready" : String((llm.reason as Error).message),
    tts: tts.status === "fulfilled" ? "ready" : String((tts.reason as Error).message),
  });
});
