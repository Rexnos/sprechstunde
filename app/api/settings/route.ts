import { connection } from "next/server";
import { handle, readJson } from "@/lib/api";
import { env } from "@/lib/env";
import { SettingsPatchSchema } from "@/lib/schemas";
import { getProfile, settingsOf, updateSettings } from "@/lib/services/repo";

const getSettings = handle(async () => {
  const settings = settingsOf(await getProfile());
  return Response.json({ settings, defaultModel: env().OLLAMA_MODEL });
});

export async function GET() {
  // Must run outside handle() so Next.js can see the request-time signal during build.
  await connection();
  return getSettings();
}

export const PATCH = handle(async (request: Request) => {
  const patch = await readJson(request, SettingsPatchSchema);
  const settings = await updateSettings(patch);
  return Response.json({ settings, defaultModel: env().OLLAMA_MODEL });
});
