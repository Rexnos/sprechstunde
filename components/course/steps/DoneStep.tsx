"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStartSession } from "@/components/tutor/useStartSession";
import { ErrorBanner } from "@/components/ui/Feedback";
import { MicIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import { ALL_LESSONS, type CourseLesson, type Unit } from "@/lib/course";

export type StepScores = { practice: number; repeat: number; talk: number };

export function DoneStep({ unit, lesson, scores, onRestart }: { unit: Unit; lesson: CourseLesson; scores: StepScores; onRestart: () => void }) {
  const [saved, setSaved] = useState<{ added: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const starter = useStartSession();
  const sent = useRef(false);
  const score = (scores.practice + scores.repeat + scores.talk) / 3;

  const save = async () => {
    setError(null);
    try {
      setSaved(await api<{ added: number }>("/api/course/progress", { method: "POST", json: { lessonId: lesson.id, score } }));
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void save();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- save once on arrival
  }, []);

  const idx = ALL_LESSONS.findIndex((x) => x.lesson.id === lesson.id);
  const next = ALL_LESSONS[idx + 1];
  const lastInUnit = unit.lessons[unit.lessons.length - 1].id === lesson.id;
  const pct = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <section className="animate-rise space-y-8">
      <div>
        <p className="text-sm font-semibold text-ok">Lesson complete</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight">Sehr gut!</h2>
        <p className="mt-2 max-w-[60ch] text-muted">
          You learned {lesson.phrases.length} phrases.
          {saved && saved.added > 0 && ` ${saved.added} new ${saved.added === 1 ? "phrase was" : "phrases were"} added to your words for review.`}
        </p>
      </div>

      <dl className="grid max-w-md grid-cols-3 gap-4 border-y border-border py-4 text-center">
        <div>
          <dt className="text-xs text-muted">Exercises</dt>
          <dd className="text-xl font-semibold tabular-nums">{pct(scores.practice)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Repeat</dt>
          <dd className="text-xl font-semibold tabular-nums">{pct(scores.repeat)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Conversation</dt>
          <dd className="text-xl font-semibold tabular-nums">{pct(scores.talk)}</dd>
        </div>
      </dl>

      {error && (
        <ErrorBanner message={`Couldn't save your progress: ${error}`} onRetry={save} />
      )}

      {/* The AI review call needs real phrases; the alphabet unit doesn't have enough yet. */}
      {lastInUnit && unit.number > 0 && (
        <div className="rounded-3xl bg-accent-soft p-5">
          <p className="font-semibold">Unit {unit.number} finished!</p>
          <p className="mt-1 max-w-[60ch] text-sm">
            Try a short voice call with the AI tutor. It only uses German you have learned so far, and gives English hints if you get stuck.
          </p>
          <button
            type="button"
            className="btn-primary mt-3"
            onClick={() => starter.start("conversation", undefined, "call", unit.id)}
            disabled={!!starter.starting}
          >
            <MicIcon width={18} height={18} /> {starter.starting ? "Connecting…" : "Practise with the tutor"}
          </button>
          {starter.error && <p className="mt-2 text-sm text-danger">{starter.error}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {next && (
          <Link href={`/course/${next.lesson.id}`} className={lastInUnit ? "btn-secondary" : "btn-primary"}>
            Next: {next.lesson.title}
          </Link>
        )}
        <button type="button" className="btn-ghost" onClick={onRestart}>
          Repeat this lesson
        </button>
        <Link href="/course" className="btn-ghost">
          Course overview
        </Link>
      </div>
    </section>
  );
}
