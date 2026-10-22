import { handle, readJson } from "@/lib/api";
import { BadRequestError } from "@/lib/errors";
import { ReviewStateSchema, VocabCreateSchema } from "@/lib/schemas";
import { addVocabulary, getProfile, listVocabulary } from "@/lib/services/repo";

export const GET = handle(async (request: Request) => {
  const url = new URL(request.url);
  const stateParam = url.searchParams.get("state");
  const state = stateParam ? ReviewStateSchema.parse(stateParam) : undefined;
  const q = url.searchParams.get("q")?.trim().slice(0, 80) || undefined;
  const due = url.searchParams.get("due") === "1";
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 50, 1), 200);
  const skip = Math.max(Number(url.searchParams.get("skip")) || 0, 0);

  const profile = await getProfile();
  return Response.json(await listVocabulary(profile._id, { q, state, due, limit, skip }));
});

export const POST = handle(async (request: Request) => {
  const item = await readJson(request, VocabCreateSchema);
  const profile = await getProfile();
  const added = await addVocabulary(profile._id, [item]);
  if (!added) throw new BadRequestError("That term is already in your list.", 409);
  return Response.json({ added }, { status: 201 });
});
