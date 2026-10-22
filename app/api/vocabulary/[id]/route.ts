import type { NextRequest } from "next/server";
import { handle, readJson, toObjectId } from "@/lib/api";
import { VocabPatchSchema } from "@/lib/schemas";
import { deleteVocab, editVocab, getProfile, getVocab, reviewVocab, vocabDTO } from "@/lib/services/repo";

type Ctx = RouteContext<"/api/vocabulary/[id]">;

async function load(ctx: Ctx) {
  const { id } = await ctx.params;
  const profile = await getProfile();
  return getVocab(profile._id, toObjectId(id));
}

export const PATCH = handle(async (req: NextRequest, ctx: Ctx) => {
  const body = await readJson(req, VocabPatchSchema);
  const doc = await load(ctx);
  const updated = "result" in body ? await reviewVocab(doc, body.result) : await editVocab(doc, body);
  return Response.json({ item: vocabDTO(updated) });
});

export const DELETE = handle(async (_req: NextRequest, ctx: Ctx) => {
  await deleteVocab(await load(ctx));
  return new Response(null, { status: 204 });
});
