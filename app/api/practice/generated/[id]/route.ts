import type { NextRequest } from "next/server";
import { handle, toObjectId } from "@/lib/api";
import { deleteGenerated, generatedDTO, getGenerated, getProfile } from "@/lib/services/repo";

type Ctx = RouteContext<"/api/practice/generated/[id]">;

export const GET = handle(async (_req: NextRequest, ctx: Ctx) => {
  const { id } = await ctx.params;
  const profile = await getProfile();
  return Response.json({ item: generatedDTO(await getGenerated(profile._id, toObjectId(id))) });
});

export const DELETE = handle(async (_req: NextRequest, ctx: Ctx) => {
  const { id } = await ctx.params;
  const profile = await getProfile();
  await deleteGenerated(profile._id, toObjectId(id));
  return new Response(null, { status: 204 });
});
