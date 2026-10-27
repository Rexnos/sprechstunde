"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useConfiguredAudio } from "@/components/audio/useConfiguredAudio";
import { ErrorBanner, Notice } from "@/components/ui/Feedback";
import { api, errorMessage } from "@/lib/client";
import { getUnit, LEVELS, type CourseLevel } from "@/lib/course";
import { buildPlacement, placementLevels, placementResult, shouldStop, unitsBelow, type UnitResult } from "@/lib/course/placement";
import { ExerciseCard } from "./ExerciseCard";

type Phase = "intro" | "test" | "result";

export function PlacementTest() {
  const router = useRouter();
  const audio = useConfiguredAudio();
  // Questions are drawn when the test starts (not during prerendering).
  const [seed, setSeed] = useState<number | null>(null);
  const [from, setFrom] = useState<CourseLevel>("A1");
  const questions = useMemo(() => (seed === null ? [] : buildPlacement(seed, from)), [seed, from]);
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<UnitResult[]>([]);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const q = questions[index];

  function advance(latest: UnitResult[]) {
    if (index + 1 >= questions.length || shouldStop(latest)) setPhase("result");
    else setIndex((i) => i + 1);
  }

  /** Results including one more answer for the current question's unit. */
  function withAnswer(correct: boolean): UnitResult[] {
    const existing = results.find((r) => r.unitId === q.unitId);
    if (existing) return results.map((r) => (r.unitId === q.unitId ? { ...r, asked: r.asked + 1, correct: r.correct + (correct ? 1 : 0) } : r));
    return [...results, { unitId: q.unitId, asked: 1, correct: correct ? 1 : 0 }];
  }

  async function apply() {
    const { passed, startUnitId } = placementResult(results, from);
    setApplying(true);
    setError(null);
    try {
      // Levels below the chosen start were skipped on the learner's word; they count as passed.
      const skipped = unitsBelow(from).map((u) => ({ unitId: u.id, score: 1 }));
      await api("/api/course/placement", {
        method: "POST",
        json: { passed: [...skipped, ...passed.map((p) => ({ unitId: p.unitId, score: p.correct / p.asked }))], startUnitId },
      });
      router.push("/course");
    } catch (err) {
      setError(errorMessage(err));
      setApplying(false);
    }
  }

  if (phase === "intro") {
    return (
      <section className="animate-rise max-w-[65ch] space-y-5">
        <p className="text-lg">
          You&apos;ll get three questions from each unit{placementLevels().length > 1 && ", starting at the level you pick"}. When it gets too hard, the test stops by itself, so
          it usually takes 5–15 minutes.
        </p>
        {placementLevels().length > 1 && (
          <fieldset>
            <legend className="text-sm font-medium">Start the test at</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {LEVELS.filter((l) => placementLevels().includes(l.level)).map((l) => (
                <label key={l.level} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${from === l.level ? "border-accent bg-accent text-accent-ink" : "border-border hover:border-accent/50"}`}>
                  <input type="radio" name="from" value={l.level} checked={from === l.level} onChange={() => setFrom(l.level)} className="sr-only" />
                  {l.level} · {l.title}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">Not sure? Start at A1. Levels below the one you pick are marked as done.</p>
          </fieldset>
        )}
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Don&apos;t guess wildly. Press “I don&apos;t know” instead, so the result is accurate.</li>
          <li>Turn your sound on: some questions are listening questions.</li>
          <li>Units you pass are marked as done, and you start at the first unit that&apos;s new to you.</li>
        </ul>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSeed(Date.now() % 100_000);
              setPhase("test");
            }}
            autoFocus
          >
            Start the test
          </button>
          <Link href="/course" className="btn-ghost">
            Back to the course
          </Link>
        </div>
      </section>
    );
  }

  if (phase === "result") {
    const { passed, startUnitId } = placementResult(results, from);
    const skipped = unitsBelow(from).length;
    const start = getUnit(startUnitId ?? undefined);
    return (
      <section className="animate-rise max-w-[65ch] space-y-6">
        <div>
          <p className="text-sm font-semibold text-ok">Test complete</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            {start ? `Start at Unit ${start.number}: ${start.title}` : "You already know everything in this course!"}
          </h2>
          <p className="mt-2 text-muted">
            {passed.length + skipped === 0
              ? "No problem: the course starts from zero, with the alphabet."
              : `You passed ${passed.length} ${passed.length === 1 ? "unit" : "units"}${skipped ? ` and skipped ${skipped} below ${from}` : ""}. They'll be marked as done; you can still open them any time to review.`}
          </p>
        </div>
        <ul className="divide-y divide-border border-y border-border text-sm">
          {results.map((r) => {
            const unit = getUnit(r.unitId)!;
            const ok = r.correct >= 2;
            return (
              <li key={r.unitId} className="flex justify-between py-2">
                <span>
                  Unit {unit.number}: {unit.title}
                </span>
                <span className={ok ? "text-ok" : "text-warn"}>
                  {r.correct}/{r.asked} {ok ? "passed" : "to learn"}
                </span>
              </li>
            );
          })}
        </ul>
        {error && <ErrorBanner message={error} onRetry={apply} />}
        <div className="flex flex-wrap gap-2">
          {passed.length + skipped > 0 ? (
            <button type="button" className="btn-primary" onClick={apply} disabled={applying}>
              {applying ? "Saving…" : start ? `Skip to Unit ${start.number}` : "Mark the course as done"}
            </button>
          ) : (
            <Link href="/course/u0-1" className="btn-primary">
              Start with the alphabet
            </Link>
          )}
          <Link href="/course" className="btn-ghost">
            Keep my current progress
          </Link>
        </div>
      </section>
    );
  }

  if (!q) {
    // No questions for this level (shouldn't happen: only levels with units are offered).
    return (
      <section className="max-w-[65ch] space-y-4">
        <Notice>There are no units to test at {from} yet.</Notice>
        <button type="button" className="btn-secondary" onClick={() => setPhase("intro")}>
          Pick another level
        </button>
      </section>
    );
  }

  const unitNumbers = [...new Set(questions.map((x) => x.unitNumber))];
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden>
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs text-muted tabular-nums">
          Unit {q.unitNumber} · {unitNumbers.indexOf(q.unitNumber) + 1} of {unitNumbers.length} units
        </span>
      </div>
      {audio.notice && <Notice>{audio.notice}</Notice>}
      <ExerciseCard
        key={index}
        ex={q.exercise}
        audio={audio}
        onAnswered={(correct) => setResults(withAnswer(correct))}
        onNext={() => advance(results)}
        onSkip={() => {
          const next = withAnswer(false);
          setResults(next);
          advance(next);
        }}
      />
    </section>
  );
}
