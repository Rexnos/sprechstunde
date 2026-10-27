"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStartSession } from "@/components/tutor/useStartSession";
import { ErrorBanner } from "@/components/ui/Feedback";
import { CheckIcon, MicIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import { unitsByLevel, type Unit } from "@/lib/course";
import type { CourseProgressDTO } from "@/lib/schemas";

export function CourseMap() {
  const [progress, setProgress] = useState<CourseProgressDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const starter = useStartSession();

  useEffect(() => {
    api<CourseProgressDTO>("/api/course/progress")
      .then(setProgress)
      // The course works without the database; progress just isn't shown.
      .catch((err) => setError(errorMessage(err)));
  }, []);

  const done = new Set(progress?.lessons.map((l) => l.lessonId) ?? []);
  const next = progress?.nextLessonId ?? "u1-1";

  return (
    <div className="space-y-10">
      {error && <ErrorBanner message={`Progress can't be loaded (${error}). Lessons still work, but won't be saved.`} />}

      <div className="grid overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-[1.2fr_1fr] sm:divide-x sm:divide-border">
        <div className="flex flex-col justify-center gap-3 p-5">
          {progress ? (
            <>
              <p className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums">{progress.completed}</span>
                <span className="text-sm text-muted">of {progress.total} lessons done</span>
              </p>
              {progress.total <= 80 ? (
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: progress.total }, (_, i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full ${i < progress.completed ? "bg-ink" : "bg-surface-2"}`} />
                  ))}
                </div>
              ) : (
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
                  <div className="h-full rounded-full bg-ink" style={{ width: `${(progress.completed / progress.total) * 100}%` }} />
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">Start at Unit 0 with the alphabet, or skip ahead.</p>
          )}
          {(!progress || progress.completed < 3) && (
            <p className="text-sm text-muted">
              Already know some German?{" "}
              <Link href="/course/placement" className="font-medium text-ink underline underline-offset-2 hover:text-accent">
                Take the placement test
              </Link>{" "}
              and skip what you know.
            </p>
          )}
        </div>
        <Link href="/course/alphabet" className="group flex items-center gap-4 border-t border-border p-5 transition-colors hover:bg-surface-2/60 sm:border-t-0">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold" aria-hidden lang="de">
            Aa Ää ß
          </span>
          <span className="min-w-0 flex-1 text-sm">
            <span className="block font-medium">Alphabet chart</span>
            <span className="text-muted">Hear every letter&apos;s German name, any time.</span>
          </span>
          <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
      </div>

      {unitsByLevel().map(({ level, title, summary, units }) => {
        const lessons = units.flatMap((u) => u.lessons);
        const levelDone = lessons.filter((l) => done.has(l.id)).length;
        return (
          <details key={level} open={lessons.some((l) => l.id === next)} className="group/level border-t border-border pt-6">
            <summary className="flex cursor-pointer list-none items-baseline gap-3 [&::-webkit-details-marker]:hidden">
              <span className="font-[family-name:var(--font-display)] text-2xl font-semibold">{level}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{title}</span>
                <span className="block text-sm text-muted">{summary}</span>
              </span>
              <span className="shrink-0 text-xs text-muted tabular-nums">
                {levelDone}/{lessons.length}
              </span>
              <span className="text-muted transition-transform group-open/level:rotate-90" aria-hidden>
                →
              </span>
            </summary>
            <ol className="mt-8 space-y-10">
              {units.map((unit) => (
                <UnitItem
                  key={unit.id}
                  unit={unit}
                  done={done}
                  next={next}
                  progress={progress}
                  onPractise={() => starter.start("conversation", undefined, "call", unit.id)}
                  starting={!!starter.starting}
                />
              ))}
            </ol>
          </details>
        );
      })}
      {starter.error && <ErrorBanner message={starter.error} />}
    </div>
  );
}

function UnitItem(props: { unit: Unit; done: Set<string>; next: string; progress: CourseProgressDTO | null; onPractise: () => void; starting: boolean }) {
  const { unit, done, next, progress, onPractise, starting } = props;
  const unitDone = unit.lessons.every((l) => done.has(l.id));
  return (
    <li key={unit.id} aria-labelledby={`${unit.id}-h`}>
      <div className="flex items-start gap-4">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-full font-[family-name:var(--font-display)] font-semibold ${
            unitDone ? "bg-ok-soft text-ok" : unit.lessons.some((l) => l.id === next) ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted"
          }`}
          aria-hidden
        >
          {unitDone ? <CheckIcon width={18} height={18} /> : unit.number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${unit.id}-h`} className="text-lg font-semibold">
            Unit {unit.number}: {unit.title}
          </h2>
          <p className="text-sm text-muted">{unit.goal}</p>

          <ul className="mt-3 divide-y divide-border border-y border-border">
            {unit.lessons.map((l, i) => {
              const isDone = done.has(l.id);
              const isNext = l.id === next;
              const best = progress?.lessons.find((x) => x.lessonId === l.id)?.bestScore;
              return (
                <li key={l.id}>
                  <Link href={`/course/${l.id}`} className="group flex items-center gap-3 py-3">
                    <span className="w-5 text-xs text-muted tabular-nums">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block ${isNext ? "font-semibold" : ""}`}>{l.title}</span>
                      <span className="block truncate text-xs text-muted" lang="de">
                        {l.phrases
                          .slice(0, 3)
                          .map((ph) => ph.de)
                          .join(" · ")}
                      </span>
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-xs text-ok">
                        <CheckIcon width={14} height={14} />
                        {best !== undefined && `${Math.round(best * 100)}%`}
                      </span>
                    ) : isNext ? (
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">Start</span>
                    ) : null}
                    <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {unitDone && unit.number > 0 && (
            <button
              type="button"
              className="btn-secondary mt-3"
              onClick={onPractise}
              disabled={starting}
            >
              <MicIcon width={16} height={16} /> Practise Unit {unit.number} with the tutor
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
