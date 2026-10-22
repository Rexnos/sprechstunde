import type { NextRequest } from "next/server";
import { handle, readJson, toObjectId } from "@/lib/api";
import { UpdateSessionSchema } from "@/lib/schemas";
import { deleteSession, getProfile, getSession, listMessages, messageDTO, sessionDTO, setSessionStatus } from "@/lib/services/repo";

type Ctx = RouteContext<"/api/sessions/[sessionId]">;

async function load(ctx: Ctx) {
  const { sessionId } = await ctx.params;
  const profile = await getProfile();
  return getSession(profile._id, toObjectId(sessionId));
}

export const GET = handle(async (_req: NextRequest, ctx: Ctx) => {
  const session = await load(ctx);
  const messages = await listMessages(session._id);
  return Response.json({ session: sessionDTO(session), messages: messages.map(messageDTO) });
});

export const PATCH = handle(async (req: NextRequest, ctx: Ctx) => {
  const { status } = await readJson(req, UpdateSessionSchema);
  const session = await setSessionStatus(await load(ctx), status);
  return Response.json({ session: sessionDTO(session) });
});

export const DELETE = handle(async (_req: NextRequest, ctx: Ctx) => {
  await deleteSession(await load(ctx));
  return new Response(null, { status: 204 });
});
