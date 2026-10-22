import { handle, readJson } from "@/lib/api";
import { GenerateRequestSchema } from "@/lib/schemas";
import { generateSentences, generateStory } from "@/lib/services/generate";
import { generatedDTO, getProfile, saveGenerated } from "@/lib/services/repo";

/** Generates new practice content with the local model, checks it, saves it. Can take a minute. */
export const POST = handle(async (request: Request) => {
  const body = await readJson(request, GenerateRequestSchema);
  const profile = await getProfile();
  const signal = request.signal;

  if (body.kind === "story") {
    const { story, model } = await generateStory(profile, body.unitId, signal);
    return Response.json({ item: generatedDTO(await saveGenerated(profile._id, "story", body.unitId, story, model)) });
  }
  const { sentences, model } = await generateSentences(profile, signal);
  return Response.json({ item: generatedDTO(await saveGenerated(profile._id, "sentences", "all", { sentences }, model)) });
});
