import { z } from "zod";
import { handle } from "@/lib/api";
import { getProfile } from "@/lib/services/repo";
import { soundSentences } from "@/lib/services/sound-practice";

const Query = z.object({ setId: z.string().min(1).max(20), n: z.coerce.number().int().min(1).max(20).default(6) });

/** Sentences rich in a sound, for pronunciation practice. POST so the "already seen" list can be long. */
export const POST = handle(async (request: Request) => {
  const body = (await request.json().catch(() => ({}))) as { setId?: string; n?: number; exclude?: string[] };
  const { setId, n } = Query.parse(body);
  const exclude = Array.isArray(body.exclude) ? body.exclude.filter((e): e is string => typeof e === "string").slice(0, 300) : [];
  const profile = await getProfile();
  return Response.json({ sentences: await soundSentences(profile._id, setId, n, exclude) });
});
