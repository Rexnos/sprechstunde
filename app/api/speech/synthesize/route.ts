import { handle, readJson } from "@/lib/api";
import { SynthesizeRequestSchema } from "@/lib/schemas";
import { getProfile } from "@/lib/services/repo";
import { synthesize } from "@/lib/speech-client";

export const POST = handle(async (request: Request) => {
  const body = await readJson(request, SynthesizeRequestSchema);
  const profile = await getProfile().catch(() => undefined); // TTS still works if MongoDB is down
  const voice = body.voice ?? profile?.ttsVoice ?? "de_DE-thorsten-medium";
  const rate = body.rate ?? profile?.speechRate ?? 1;

  const wav = await synthesize(body.text, voice, rate);
  return new Response(wav, { headers: { "Content-Type": "audio/wav", "Cache-Control": "no-store" } });
});
