"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStartSession } from "@/components/tutor/useStartSession";
import { ErrorBanner } from "@/components/ui/Feedback";
import { CheckIcon, MicIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import { COURSE } from "@/lib/course";
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

      <Link href="/course/alphabet" className="flex max-w-md items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3 hover:border-accent/50">
        <span className="font-[family-name:var(--font-display)] text-2xl font-semibold" aria-hidden lang="de">
          Aa Ää ß
        </span>
        <span className="flex-1 text-sm">
          <span className="block font-medium">Alphabet chart</span>
          <span className="text-muted">Hear every letter&apos;s German name, any time.</span>
        </span>
        <span className="text-muted" aria-hidden>
          →
        </span>
      </Link>

      {(!progress || progress.completed < 3) && (
        <p className="text-sm text-muted">
          Already know some German?{" "}
          <Link href="/course/placement" className="font-medium text-accent underline-offset-2 hover:underline">
            Take the 5-minute placement test
          </Link>{" "}
          and skip what you know.
        </p>
      )}

      {progress && (
        <div className="max-w-md">
          <p className="text-sm text-muted">
            {progress.completed} of {progress.total} lessons done
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${(progress.completed / progress.total) * 100}%` }} />
          </div>
        </div>
      )}

      <ol className="space-y-10">
        {COURSE.map((unit) => {
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
                      onClick={() => starter.start("conversation", undefined, "call", unit.id)}
                      disabled={!!starter.starting}
                    >
                      <MicIcon width={16} height={16} /> Practise Unit {unit.number} with the tutor
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      {starter.error && <ErrorBanner message={starter.error} />}
    </div>
  );
}
