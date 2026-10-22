import { connection } from "next/server";
import { handle, readJson } from "@/lib/api";
import { PracticeResultSchema } from "@/lib/schemas";
import { getPracticeSummary, getProfile, recordPracticeResult } from "@/lib/services/repo";

const getSummary = handle(async () => Response.json(await getPracticeSummary((await getProfile())._id)));

export async function GET() {
  // Must run outside handle() so Next.js can see the request-time signal during build.
  await connection();
  return getSummary();
}

export const POST = handle(async (request: Request) => {
  const { kind, itemId, score } = await readJson(request, PracticeResultSchema);
  const profile = await getProfile();
  await recordPracticeResult(profile._id, kind, itemId, score);
  return Response.json(await getPracticeSummary(profile._id));
});
