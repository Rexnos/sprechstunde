"use client";

import { useEffect, useState } from "react";
import { useStartSession } from "@/components/tutor/useStartSession";
import { ErrorBanner } from "@/components/ui/Feedback";
import { CheckIcon } from "@/components/ui/icons";
import { api, formatRelative } from "@/lib/client";
import { LESSONS } from "@/lib/lessons";
import type { ProgressDTO } from "@/lib/schemas";

export function LessonGrid() {
  const starter = useStartSession();
  const [history, setHistory] = useState<ProgressDTO["lessons"]>([]);

  useEffect(() => {
    // Completion state is a nice-to-have; the lessons still work without the database summary.
    api<ProgressDTO>("/api/progress")
      .then((p) => setHistory(p.lessons))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      {starter.error && <ErrorBanner message={starter.error} />}
      <ul className="grid gap-4 sm:grid-cols-2">
        {LESSONS.map((lesson) => {
          const h = history.find((x) => x.lessonId === lesson.id);
          return (
            <li key={lesson.id} className="card flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">{lesson.recommendedLevel}+</span>
              </div>
              <p className="mt-1 text-sm text-muted">{lesson.scenario}</p>
              <p className="mt-3 text-sm">
                <span className="font-medium">Objective:</span> {lesson.objective}
              </p>
              <p className="mt-3 rounded-lg bg-tutor px-3 py-2 text-sm">
                <span lang="de" className="font-medium">
                  {lesson.starter}
                </span>
                <span className="block text-xs text-muted">{lesson.starterTranslation}</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key vocabulary">
                {lesson.vocabulary.map((v) => (
                  <li key={v.term} className="rounded-md border border-border px-2 py-0.5 text-xs" title={v.meaning} lang="de">
                    {v.term}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <button type="button" className="btn-primary" onClick={() => starter.start("roleplay", lesson.id, "call")} disabled={!!starter.starting}>
                  {starter.isStarting("roleplay", lesson.id, "call") ? "Connecting…" : "Call"}
                </button>
                <button type="button" className="btn-secondary" onClick={() => starter.start("roleplay", lesson.id)} disabled={!!starter.starting}>
                  {starter.isStarting("roleplay", lesson.id) ? "Starting…" : "Role-play in text"}
                </button>
                {h && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted">
                    {h.completed > 0 && <CheckIcon width={14} height={14} className="text-ok" />}
                    {h.completed > 0 ? `Completed ${h.completed}×` : `${h.sessions} started`} · {formatRelative(h.lastPracticedAt)}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
