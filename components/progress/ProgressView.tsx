"use client";

import Link from "next/link";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { formatRelative } from "@/lib/client";
import { getLesson, MODE_LABELS } from "@/lib/lessons";
import { ActivityChart } from "./ActivityChart";
import { CheckupHistory } from "./CheckupHistory";
import { useEffect, useState } from "react";
import { api } from "@/lib/client";
import { getCourseLesson } from "@/lib/course";
import { getUnit } from "@/lib/course";
import { SOUND_SETS } from "@/lib/pronunciation";
import type { CourseProgressDTO, PracticeSummaryDTO } from "@/lib/schemas";
import { STORIES } from "@/lib/stories";
import { useProgress } from "./useProgress";

export function ProgressView() {
  const { data, error, reload } = useProgress();
  if (error) return <ErrorBanner message={error} onRetry={reload} />;
  if (!data) return <Loading />;

  const { totals, vocabulary } = data;
  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-y-6 border-y border-border py-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
        <Figure label="Practice time" value={`${totals.practiceMinutes} min`} hint="estimated" />
        <Figure label="Sessions" value={totals.sessions} hint={`${totals.completedSessions} finished`} />
        <Figure label="Your turns" value={totals.userTurns} hint={`${totals.voiceTurns} spoken`} />
        <Figure label="Words" value={vocabulary.total} hint={`${vocabulary.known} known`} />
      </dl>

      <CourseSummary />
      <PracticeSummary />

      <CheckupHistory />

      <section className="card" aria-labelledby="activity-h">
        <h2 id="activity-h" className="mb-4 font-semibold">
          Activity
        </h2>
        <ActivityChart days={data.daily} goal={data.today.goalMinutes} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card" aria-labelledby="errors-h">
          <h2 id="errors-h" className="font-semibold">
            Grammar to practise
          </h2>
          <p className="mb-3 text-xs text-muted">Most frequent correction types the tutor gave you. The AI can be wrong; treat this as a hint, not a grade.</p>
          {data.errorCategories.length === 0 ? (
            <p className="text-sm text-muted">No corrections yet.</p>
          ) : (
            <ul className="space-y-3">
              {data.errorCategories.map((e) => {
                const pct = Math.round((e.count / Math.max(totals.corrections, 1)) * 100);
                return (
                  <li key={e.category}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium capitalize">{e.category}</span>
                      <span className="text-muted tabular-nums">{e.count}×</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-surface-2" aria-hidden>
                      <div className="h-2 rounded-full bg-warn" style={{ width: `${pct}%` }} />
                    </div>
                    {e.example && (
                      <p className="mt-1 text-xs text-muted" lang="de">
                        <s>{e.example.original}</s> → <span className="text-ink">{e.example.suggested}</span>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="card" aria-labelledby="lessons-h">
          <h2 id="lessons-h" className="mb-3 font-semibold">
            Lesson history
          </h2>
          {data.lessons.length === 0 ? (
            <p className="text-sm text-muted">
              No lessons yet. <Link href="/lessons" className="text-accent underline">Pick one</Link>.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {data.lessons.map((l) => (
                <li key={l.lessonId} className="flex justify-between py-2 text-sm">
                  <span className="font-medium">{getLesson(l.lessonId)?.title ?? l.lessonId}</span>
                  <span className="text-muted">
                    {l.completed}/{l.sessions} finished · {formatRelative(l.lastPracticedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <h2 className="mt-6 mb-3 font-semibold">Recent sessions</h2>
          <ul className="divide-y divide-border">
            {data.recentSessions.map((s) => (
              <li key={s.id} className="py-2 text-sm">
                <Link href={`/tutor?session=${s.id}`} className="flex justify-between gap-2 hover:text-accent">
                  <span className="truncate">{s.title}</span>
                  <span className="shrink-0 text-muted">
                    {MODE_LABELS[s.mode]} · {formatRelative(s.lastActivityAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Notice tone="info">
        These numbers are practice statistics from this app, not a certified proficiency assessment. Practice time is estimated from the gaps
        between your turns (long pauses are not counted).
      </Notice>
    </div>
  );
}

function Figure({ label, value, hint }: { label: string; value: React.ReactNode; hint: string }) {
  return (
    <div className="sm:px-6 sm:first:pl-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
      <dd className="text-xs text-muted">{hint}</dd>
    </div>
  );
}

function CourseSummary() {
  const [course, setCourse] = useState<CourseProgressDTO | null>(null);
  useEffect(() => {
    api<CourseProgressDTO>("/api/course/progress")
      .then(setCourse)
      .catch(() => {});
  }, []);
  if (!course) return null;
  const next = course.nextLessonId ? getCourseLesson(course.nextLessonId) : null;
  const avg = course.lessons.length ? course.lessons.reduce((n, l) => n + l.bestScore, 0) / course.lessons.length : null;
  return (
    <section aria-labelledby="course-sum-h" className="flex flex-wrap items-center gap-x-8 gap-y-3">
      <div className="min-w-48 flex-1">
        <h2 id="course-sum-h" className="font-semibold">
          Beginner course
        </h2>
        <p className="text-sm text-muted">
          {course.completed} of {course.total} lessons
          {avg !== null && ` · average ${Math.round(avg * 100)}%`}
          {next ? ` · next: Unit ${next.unit.number}, ${next.lesson.title}` : " · finished!"}
        </p>
        <div className="mt-2 h-1.5 max-w-sm overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-accent" style={{ width: `${(course.completed / course.total) * 100}%` }} />
        </div>
      </div>
      <Link href="/course" className="btn-secondary">
        Open course
      </Link>
    </section>
  );
}

function PracticeSummary() {
  const [p, setP] = useState<PracticeSummaryDTO | null>(null);
  useEffect(() => {
    api<PracticeSummaryDTO>("/api/practice/result")
      .then(setP)
      .catch(() => {});
  }, []);
  if (!p) return null;
  const start = p.placement ? getUnit(p.placement.startUnitId ?? undefined) : null;
  return (
    <section aria-labelledby="practice-sum-h" className="flex flex-wrap items-center gap-x-8 gap-y-3">
      <div className="min-w-48 flex-1">
        <h2 id="practice-sum-h" className="font-semibold">
          Practice
        </h2>
        <p className="text-sm text-muted">
          Listening {p.dictation.average === null ? "not tried yet" : `${Math.round(p.dictation.average * 100)}% (${p.dictation.sessions} rounds)`} ·
          Stories {p.stories.filter((s) => STORIES.some((st) => st.id === s.storyId)).length}/{STORIES.length} · Sounds {p.pronunciation.length}/
          {SOUND_SETS.length}
          {p.placement && ` · Placement: ${start ? `started at Unit ${start.number}` : "all units passed"}`}
        </p>
      </div>
      <Link href="/practice" className="btn-secondary">
        Open practice
      </Link>
    </section>
  );
}
