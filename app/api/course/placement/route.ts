import { handle, readJson } from "@/lib/api";
import { BadRequestError } from "@/lib/errors";
import { getUnit } from "@/lib/course";
import { PlacementApplySchema } from "@/lib/schemas";
import { applyPlacement, getCourseProgress, getProfile } from "@/lib/services/repo";

export const POST = handle(async (request: Request) => {
  const { passed, startUnitId } = await readJson(request, PlacementApplySchema);
  if (passed.some((p) => !getUnit(p.unitId)) || (startUnitId && !getUnit(startUnitId))) throw new BadRequestError("Unknown course unit.");
  const profile = await getProfile();
  await applyPlacement(profile._id, passed, startUnitId);
  return Response.json(await getCourseProgress(profile._id));
});
