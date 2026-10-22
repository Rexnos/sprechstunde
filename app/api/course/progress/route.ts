import { connection } from "next/server";
import { handle, readJson } from "@/lib/api";
import { CourseResultSchema } from "@/lib/schemas";
import { getCourseProgress, getProfile, recordLessonResult } from "@/lib/services/repo";

const getProgressResponse = handle(async () => Response.json(await getCourseProgress((await getProfile())._id)));

export async function GET() {
  // Must run outside handle() so Next.js can see the request-time signal during build.
  await connection();
  return getProgressResponse();
}

export const POST = handle(async (request: Request) => {
  const { lessonId, score } = await readJson(request, CourseResultSchema);
  const profile = await getProfile();
  const result = await recordLessonResult(profile._id, lessonId, score);
  return Response.json({ ...result, progress: await getCourseProgress(profile._id) });
});
