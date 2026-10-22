"use client";

import { useState } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import type { CourseLesson, Unit } from "@/lib/course";
import { buildExercises, type Exercise } from "@/lib/course/exercises";
import { ExerciseCard } from "../ExerciseCard";

type Audio = ReturnType<typeof usePhraseAudio>;

export function PracticeStep({ lesson, unit, audio, onDone }: { lesson: CourseLesson; unit: Unit; audio: Audio; onDone: (score: number) => void }) {
  const [queue, setQueue] = useState<Exercise[]>(() => buildExercises(lesson, unit, Date.now() % 100_000));
  const [total] = useState(() => queue.length);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [missed] = useState(() => new Set<string>());
  const [requeued] = useState(() => new Set<string>()); // each missed exercise comes back once
  const [lastCorrect, setLastCorrect] = useState(true);

  const ex = queue[0];
  if (!ex) return null;
  const planned = total + requeued.size;
  const done = planned - queue.length;

  function answered(correct: boolean) {
    if (!ex) return;
    if (correct && !missed.has(ex.id)) setFirstTryCorrect((n) => n + 1);
    if (!correct) missed.add(ex.id);
    setLastCorrect(correct);
  }

  function next() {
    if (!ex) return;
    const requeue = !lastCorrect && !requeued.has(ex.id);
    if (requeue) requeued.add(ex.id);
    const rest = queue.slice(1);
    const nextQueue = requeue ? [...rest, ex] : rest;
    setLastCorrect(true);
    if (nextQueue.length === 0) onDone(total ? firstTryCorrect / total : 1);
    else setQueue(nextQueue);
  }

  return (
    <section className="space-y-6">
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(done / Math.max(planned, 1)) * 100}%` }} />
      </div>
      <ExerciseCard key={`${ex.id}:${done}`} ex={ex} audio={audio} onAnswered={answered} onNext={next} status={`${done + 1} of ${planned}`} />
    </section>
  );
}
