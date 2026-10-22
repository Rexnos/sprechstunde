import { handle } from "@/lib/api";
import { BadRequestError } from "@/lib/errors";
import { transcribe } from "@/lib/speech-client";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["audio/webm", "audio/ogg", "audio/wav", "audio/x-wav", "audio/wave", "audio/mp4", "audio/mpeg", "audio/aac"];

export const POST = handle(async (request: Request) => {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES + 64 * 1024) throw new BadRequestError("Recording is too large (max 10 MB).", 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    throw new BadRequestError("Expected a multipart form upload with an 'audio' field.");
  }
  const audio = form.get("audio");
  if (!(audio instanceof Blob)) throw new BadRequestError("Missing 'audio' file.");
  if (audio.size > MAX_BYTES) throw new BadRequestError("Recording is too large (max 10 MB).", 413);
  if (audio.size < 1000) throw new BadRequestError("Recording is empty or too short.");

  // Browsers add codec parameters, e.g. "audio/webm;codecs=opus".
  const baseType = audio.type.split(";")[0].trim().toLowerCase();
  if (!ALLOWED_TYPES.includes(baseType)) throw new BadRequestError(`Unsupported audio format: ${audio.type || "unknown"}.`, 415);

  const ext = baseType.split("/")[1].replace("x-", "").replace("mpeg", "mp3");
  const result = await transcribe(audio, `recording.${ext}`, "de");
  if (!result.text) throw new BadRequestError("No speech was detected. Try again a little closer to the microphone.");

  // Whisper's average log-probability is a rough signal only — it is not a pronunciation score.
  const avg = result.segments.length ? result.segments.reduce((n, s) => n + s.avgLogprob, 0) / result.segments.length : -1;
  return Response.json({ text: result.text, duration: result.duration, lowConfidence: avg < -0.8, segments: result.segments });
});
