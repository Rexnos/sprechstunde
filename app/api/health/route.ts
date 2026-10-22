import { connection } from "next/server";
import { env } from "@/lib/env";
import { pingDb } from "@/lib/mongodb";
import { listModels, modelPlacement } from "@/lib/ollama";
import { speechHealth } from "@/lib/speech-client";
import { getProfile } from "@/lib/services/repo";
import type { HealthDTO, Settings } from "@/lib/schemas";

export async function GET() {
  await connection();
  const config = env();

  const [db, models, speech] = await Promise.allSettled([pingDb().then(() => getProfile()), listModels(), speechHealth()]);

  const profile = db.status === "fulfilled" ? db.value : undefined;
  const model = profile?.model || config.OLLAMA_MODEL;
  const ttsEngine: Settings["ttsEngine"] = profile?.ttsEngine ?? config.TTS_MODE;
  const modelList = models.status === "fulfilled" ? models.value : [];
  const modelInstalled = modelList.some((m) => m === model || m === `${model}:latest`);
  const placement = modelInstalled ? await modelPlacement(model).catch(() => null) : null;
  const gpuPercent = placement?.loaded ? placement.gpuPercent : null;
  const placementDetail =
    gpuPercent === null
      ? " (not loaded yet; it loads on the first reply)"
      : gpuPercent >= 100
        ? " (100% on GPU)"
        : ` (${gpuPercent}% on GPU, ${100 - gpuPercent}% on CPU: replies will be slower)`;

  const health: HealthDTO = {
    app: { ok: true, detail: "running" },
    database: db.status === "fulfilled" ? { ok: true, detail: "connected" } : { ok: false, detail: reason(db) },
    llm:
      models.status === "rejected"
        ? { ok: false, detail: reason(models), model, models: [], gpuPercent: null }
        : {
            ok: modelInstalled,
            detail: modelInstalled ? `${model} ready${placementDetail}` : `Ollama is running but '${model}' is not downloaded. Run: ollama pull ${model}`,
            model,
            models: modelList,
            gpuPercent,
          },
    stt:
      speech.status === "fulfilled"
        ? { ok: speech.value.stt.ok, detail: `${speech.value.stt.model} on ${speech.value.stt.device}: ${speech.value.stt.detail ?? ""}` }
        : { ok: false, detail: reason(speech) },
    tts:
      ttsEngine === "piper"
        ? speech.status === "fulfilled"
          ? { ok: speech.value.tts.ok, detail: speech.value.tts.detail ?? "", engine: ttsEngine, voices: speech.value.tts.voices }
          : { ok: false, detail: reason(speech), engine: ttsEngine, voices: [] }
        : {
            ok: true,
            detail: ttsEngine === "browser" ? "Using the browser's built-in voices" : "Speech output is turned off",
            engine: ttsEngine,
            voices: [],
          },
    checkedAt: new Date().toISOString(),
  };
  return Response.json(health);
}

function reason(r: PromiseRejectedResult) {
  return r.reason instanceof Error ? r.reason.message : String(r.reason);
}
