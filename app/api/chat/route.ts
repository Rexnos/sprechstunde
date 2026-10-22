import { handle, readJson, toObjectId } from "@/lib/api";
import { ChatRequestSchema } from "@/lib/schemas";
import { getProfile, getSession, messageDTO } from "@/lib/services/repo";
import { runTutorTurn } from "@/lib/services/tutor";

export const POST = handle(async (request: Request) => {
  const body = await readJson(request, ChatRequestSchema);
  const profile = await getProfile();
  const session = await getSession(profile._id, toObjectId(body.sessionId));

  const result = await runTutorTurn({
    profile,
    session,
    message: body.message,
    inputMethod: body.inputMethod,
    signal: request.signal, // stop generating if the browser cancels
  });

  return Response.json({
    user: messageDTO(result.user),
    assistant: messageDTO(result.assistant),
    newVocabulary: result.newVocabulary,
    latencyMs: result.latencyMs,
  });
});
