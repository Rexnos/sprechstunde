import { z } from "zod";
import { handle } from "@/lib/api";
import { generatedDTO, getProfile, listGenerated } from "@/lib/services/repo";

const Query = z.object({ kind: z.enum(["story", "sentences"]), key: z.string().max(20).optional() });

export const GET = handle(async (request: Request) => {
  const url = new URL(request.url);
  const { kind, key } = Query.parse({ kind: url.searchParams.get("kind"), key: url.searchParams.get("key") ?? undefined });
  const profile = await getProfile();
  return Response.json({ items: (await listGenerated(profile._id, kind, key)).map(generatedDTO) });
});
