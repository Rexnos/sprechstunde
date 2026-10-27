import { handle, readJson } from "@/lib/api";
import { BadRequestError } from "@/lib/errors";
import { getUnit, LEVELS } from "@/lib/course";
import { getLesson, MODE_LABELS } from "@/lib/lessons";
import { TUTOR_PROMPT_VERSION } from "@/lib/prompts";
import { CreateSessionSchema } from "@/lib/schemas";
import { createSession, getProfile, listSessions, sessionDTO } from "@/lib/services/repo";

export const GET = handle(async (request: Request) => {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 20, 1), 100);
  const beforeParam = url.searchParams.get("before");
  const before = beforeParam ? new Date(beforeParam) : undefined;
  if (before && Number.isNaN(before.getTime())) throw new BadRequestError("Invalid cursor.");

  const profile = await getProfile();
  return Response.json(await listSessions(profile._id, { limit, before }));
});

export const POST = handle(async (request: Request) => {
  const body = await readJson(request, CreateSessionSchema);
  const lesson = getLesson(body.lessonId);
  if (body.lessonId && !lesson) throw new BadRequestError("Unknown lesson.");
  const unit = getUnit(body.courseUnitId);
  if (body.courseUnitId && !unit) throw new BadRequestError("Unknown course unit.");

  const profile = await getProfile();
  const title =
    body.title ||
    (unit ? `Unit ${unit.number} review: ${unit.title}` : lesson ? `${MODE_LABELS[body.mode]}: ${lesson.title}` : MODE_LABELS[body.mode]);
  const session = await createSession({
    profile,
    mode: body.mode,
    title,
    lessonId: lesson?.id,
    courseUnitId: unit?.id,
    // A unit review is pitched at the unit's level, but never below the learner's own.
    level: unit && LEVELS.findIndex((l) => l.level === unit.level) > LEVELS.findIndex((l) => l.level === profile.level) ? unit.level : undefined,
    promptVersion: TUTOR_PROMPT_VERSION,
    // Unit reviews get an opening question so learners never face a blank screen.
    starter:
      body.mode === "roleplay"
        ? lesson?.starter
        : unit
          ? unit.level === "A1"
            ? "Hallo! Wie geht's?"
            : `Hallo! Heute sprechen wir über das Thema „${unit.title}“. Bist du bereit?`
          : undefined,
  });
  return Response.json({ session: sessionDTO(session) }, { status: 201 });
});
