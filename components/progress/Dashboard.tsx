"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStartSession } from "@/components/tutor/useStartSession";
import { ErrorBanner, Loading } from "@/components/ui/Feedback";
import { MicIcon } from "@/components/ui/icons";
import { api, formatRelative } from "@/lib/client";
import { LESSONS } from "@/lib/lessons";
import { getCourseLesson } from "@/lib/course";
import { CEFR_LEVELS, type CourseProgressDTO, type Settings, type VocabDTO } from "@/lib/schemas";
import { useProgress } from "./useProgress";

function greeting(hour: number) {
  if (hour < 11) return "Guten Morgen";
  if (hour < 18) return "Guten Tag";
  return "Guten Abend";
}

export function Dashboard() {
  const { data, error, reload } = useProgress();
  const starter = useStartSession();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [due, setDue] = useState<VocabDTO[]>([]);
  const [course, setCourse] = useState<CourseProgressDTO | null>(null);
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client clock, avoids hydration mismatch
    setHour(new Date().getHours());
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
    api<CourseProgressDTO>("/api/course/progress")
      .then(setCourse)
      .catch(() => {});
    api<{ items: VocabDTO[] }>("/api/vocabulary?due=1&limit=6")
      .then((r) => setDue(r.items))
      .catch(() => {});
  }, []);

  if (error) {
    return (
      <div className="space-y-3">
        <ErrorBanner message={error} onRetry={reload} />
        <p className="text-sm text-muted">
          The <Link href="/status" className="underline">Status page</Link> shows which local service needs starting.
        </p>
      </div>
    );
  }
  if (!data) return <Loading />;

  const last = data.recentSessions.find((s) => s.messageCount > 1) ?? null;
  const { minutes, goalMinutes, turns } = data.today;
  const goalPct = Math.min(100, Math.round((minutes / goalMinutes) * 100));
  const goalDone = minutes >= goalMinutes;
  const level = settings?.level ?? "A1";
  const levelIdx = CEFR_LEVELS.indexOf(level);
  const suggested = LESSONS.filter((l) => CEFR_LEVELS.indexOf(l.recommendedLevel) <= levelIdx)
    .sort((a, b) => {
      const pa = data.lessons.find((x) => x.lessonId === a.id)?.completed ?? 0;
      const pb = data.lessons.find((x) => x.lessonId === b.id)?.completed ?? 0;
      return pa - pb;
    })
    .slice(0, 3);
  const focus = data.errorCategories[0];

  return (
    <div className="space-y-12">
      {/* Greeting + today's goal */}
      <section>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {hour === null ? "Hallo" : greeting(hour)}
          {settings?.displayName && settings.displayName !== "Learner" ? `, ${settings.displayName}` : ""}.
        </h1>
        <div className="mt-3 max-w-md">
          <p className="text-muted">
            {goalDone
              ? `Daily goal reached: ${minutes} minutes today. Schön!`
              : minutes === 0
                ? `Your daily goal is ${goalMinutes} minutes of speaking.`
                : `${minutes} of ${goalMinutes} minutes today, ${turns} ${turns === 1 ? "turn" : "turns"} so far.`}
          </p>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-valuenow={goalPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Daily goal"
          >
            <div className={`h-full rounded-full transition-[width] duration-700 ${goalDone ? "bg-ok" : "bg-accent"}`} style={{ width: `${goalPct}%` }} />
          </div>
        </div>
      </section>

      {/* Beginner course */}
      {course?.nextLessonId && <CourseCard course={course} isNew={data.totals.sessions === 0} />}

      {/* Primary actions */}
      <section aria-label="Start practising" className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary h-14 !px-7 text-base"
          onClick={() => starter.start("conversation", undefined, "call")}
          disabled={!!starter.starting}
        >
          <MicIcon />
          {starter.isStarting("conversation", undefined, "call") ? "Connecting…" : "Start a call"}
        </button>
        <button type="button" className="btn-secondary h-14 !px-5" onClick={() => starter.start("conversation")} disabled={!!starter.starting}>
          {starter.isStarting("conversation") ? "Starting…" : "Text chat"}
        </button>
        {last && (
          <Link href={`/tutor?session=${last.id}`} className="btn-secondary h-14 !px-5 text-left">
            <span className="flex flex-col leading-tight">
              <span>Continue</span>
              <span className="max-w-56 truncate text-xs font-normal text-muted">
                {last.title} · {formatRelative(last.lastActivityAt)}
              </span>
            </span>
          </Link>
        )}
        {starter.error && (
          <div className="w-full">
            <ErrorBanner message={starter.error} />
          </div>
        )}
      </section>

      {/* Scenarios */}
      <section aria-labelledby="scenarios-h">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="scenarios-h" className="text-lg font-semibold">
            Practise a situation
          </h2>
          <Link href="/lessons" className="text-sm text-muted hover:text-ink">
            All lessons
          </Link>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {suggested.map((l) => {
            const h = data.lessons.find((x) => x.lessonId === l.id);
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => starter.start("roleplay", l.id, "call")}
                  disabled={!!starter.starting}
                  className="group flex w-full items-center gap-4 py-3.5 text-left disabled:opacity-60"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{l.title}</span>
                    <span className="block truncate text-sm text-muted" lang="de">
                      „{l.starter}“
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">
                    {starter.isStarting("roleplay", l.id, "call") ? "Connecting…" : h?.completed ? `Done ${h.completed}×` : l.recommendedLevel}
                  </span>
                  <span className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden>
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Words due */}
        <section aria-labelledby="words-h">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="words-h" className="text-lg font-semibold">
              Words to review
            </h2>
            <span className="text-sm text-muted tabular-nums">{data.vocabulary.due} due</span>
          </div>
          {due.length === 0 ? (
            <p className="text-sm text-muted">
              {data.vocabulary.total === 0 ? "New words from your conversations will collect here." : "All caught up. Nothing to review right now."}
            </p>
          ) : (
            <>
              <ul className="flex flex-wrap gap-1.5">
                {due.map((v) => (
                  <li key={v.id} className="rounded-full border border-border bg-surface px-3 py-1 text-sm" title={v.meaning} lang="de">
                    {v.term}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/vocabulary?tab=review" className="btn-secondary">
                  Flash cards
                </Link>
                <button type="button" className="btn-ghost" onClick={() => starter.start("vocabulary")} disabled={!!starter.starting}>
                  Use them in conversation
                </button>
              </div>
            </>
          )}
        </section>

        {/* Focus */}
        <section aria-labelledby="focus-h">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="focus-h" className="text-lg font-semibold">
              Worth practising
            </h2>
            <Link href="/progress" className="text-sm text-muted hover:text-ink">
              Progress
            </Link>
          </div>
          {focus?.example ? (
            <div className="text-sm">
              <p>
                Your most frequent correction is <span className="font-semibold">{focus.category}</span> ({focus.count}×). Latest example:
              </p>
              <p className="mt-2 text-muted" lang="de">
                <s>{focus.example.original}</s>
              </p>
              <p className="font-medium" lang="de">
                {focus.example.suggested}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">After a few conversations, the grammar points you trip over most will show up here.</p>
          )}
          <p className="mt-4 text-xs text-muted">
            {data.totals.sessions} sessions · {data.totals.practiceMinutes} min practised · {data.totals.voiceTurns} spoken turns
          </p>
        </section>
      </div>

    </div>
  );
}

function CourseCard({ course, isNew }: { course: CourseProgressDTO; isNew: boolean }) {
  const next = getCourseLesson(course.nextLessonId!);
  if (!next) return null;
  const fresh = course.completed === 0;
  return (
    <section aria-labelledby="course-h" className="rounded-3xl bg-accent-soft p-6">
      <p className="text-xs font-semibold text-accent">{fresh ? "Beginner course" : `Course · ${course.completed} of ${course.total} lessons`}</p>
      <h2 id="course-h" className="mt-1 text-xl font-semibold">
        {fresh && isNew ? "New to German? Start from zero." : `Unit ${next.unit.number}: ${next.lesson.title}`}
      </h2>
      <p className="mt-1 max-w-[60ch] text-sm">
        {fresh
          ? "Begin with the German alphabet and its sounds, then short lessons with audio, exercises and speaking practice. No German needed."
          : `Next up in “${next.unit.title}”: ${next.lesson.phrases
              .slice(0, 2)
              .map((p) => p.de)
              .join(" · ")}`}
      </p>
      {!fresh && (
        <div className="mt-3 h-1.5 max-w-sm overflow-hidden rounded-full bg-surface/70">
          <div className="h-full rounded-full bg-accent" style={{ width: `${(course.completed / course.total) * 100}%` }} />
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link href={`/course/${next.lesson.id}`} className="btn-primary">
          {fresh ? "Start with the alphabet" : "Continue course"}
        </Link>
        {fresh && (
          <Link href="/course/placement" className="text-sm underline-offset-2 hover:underline">
            Know some German? Take the placement test
          </Link>
        )}
      </div>
    </section>
  );
}
