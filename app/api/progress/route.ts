import { connection } from "next/server";
import { handle } from "@/lib/api";
import { getProfile, getProgress } from "@/lib/services/repo";

const getProgressResponse = handle(async () => Response.json(await getProgress(await getProfile())));

export async function GET() {
  // Must run outside handle() so Next.js can see the request-time signal during build.
  await connection();
  return getProgressResponse();
}
