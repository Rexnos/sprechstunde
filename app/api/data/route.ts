import { z } from "zod";
import { handle, readJson } from "@/lib/api";
import { deleteAllHistory, exportAll, getProfile } from "@/lib/services/repo";

/** Download everything stored for the learner as one JSON file. */
export const GET = handle(async () => {
  const data = await exportAll(await getProfile());
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="language-tutor-export-${stamp}.json"`,
      "Cache-Control": "no-store",
    },
  });
});

const DeleteSchema = z.object({
  sessions: z.boolean(),
  vocabulary: z.boolean(),
  confirm: z.literal("DELETE"),
});

export const DELETE = handle(async (request: Request) => {
  const body = await readJson(request, DeleteSchema);
  const profile = await getProfile();
  await deleteAllHistory(profile._id, body);
  return new Response(null, { status: 204 });
});
