import { connection } from "next/server";
import { handle, readJson } from "@/lib/api";
import { CheckupResultSchema } from "@/lib/schemas";
import { getCheckupStatus, getProfile, saveCheckup } from "@/lib/services/repo";

const getStatus = handle(async () => Response.json(await getCheckupStatus((await getProfile())._id)));

/** This week's check-up status and the weekly history. */
export async function GET() {
  // Must run outside handle() so Next.js can see the request-time signal during build.
  await connection();
  return getStatus();
}

export const POST = handle(async (request: Request) => {
  const result = await readJson(request, CheckupResultSchema);
  const profile = await getProfile();
  await saveCheckup(profile._id, result);
  return Response.json(await getCheckupStatus(profile._id), { status: 201 });
});
