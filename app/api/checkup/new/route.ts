import { connection } from "next/server";
import { handle } from "@/lib/api";
import { buildCheckup } from "@/lib/checkup/build";
import { checkupPools, getProfile } from "@/lib/services/repo";

const build = handle(async () => {
  const pools = await checkupPools((await getProfile())._id);
  const questions = buildCheckup(pools, Date.now() % 100_000);
  return Response.json({
    questions,
    fromThisWeek: questions.filter((q) => q.source === "week").length,
    aiAvailable: pools.ai.length,
  });
});

/** A fresh set of check-up questions from the learner's own material. */
export async function GET() {
  await connection();
  return build();
}
