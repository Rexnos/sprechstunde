"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { Notice } from "@/components/ui/Feedback";
import { CheckIcon } from "@/components/ui/icons";
import { api } from "@/lib/client";
import { getCourseLesson } from "@/lib/course";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/schemas";
import { DoneStep, type StepScores } from "./steps/DoneStep";
import { LearnStep } from "./steps/LearnStep";
import { PracticeStep } from "./steps/PracticeStep";
import { RepeatStep } from "./steps/RepeatStep";
import { TalkStep } from "./steps/TalkStep";

const STEPS = [
  { id: "learn", label: "Learn" },
  { id: "practice", label: "Practice" },
  { id: "repeat", label: "Repeat" },
  { id: "talk", label: "Talk" },
  { id: "done", label: "Done" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

export function LessonPlayer({ lessonId }: { lessonId: string }) {
  const found = getCourseLesson(lessonId)!;
  const { unit, lesson } = found;
  const [step, setStep] = useState<StepId>("learn");
  const [scores, setScores] = useState<StepScores>({ practice: 0, repeat: 0, talk: 0 });
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const audio = usePhraseAudio(settings.ttsEngine, settings.speechRate);

  useEffect(() => {
    // Settings only affect the voice; the lesson works with defaults if the database is down.
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
  }, []);

  const { stop } = audio;
  const go = useCallback(
    (to: StepId, patch?: Partial<StepScores>) => {
      stop();
      if (patch) setScores((s) => ({ ...s, ...patch }));
      setStep(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [stop],
  );
  const onPractice = useCallback((score: number) => go("repeat", { practice: score }), [go]);
  const onRepeat = useCallback((score: number) => go("talk", { repeat: score }), [go]);
  const onTalk = useCallback((score: number) => go("done", { talk: score }), [go]);
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-xs text-muted">
          <Link href="/course" className="hover:text-ink">
            Course
          </Link>{" "}
          / Unit {unit.number}: {unit.title}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{lesson.title}</h1>
        <ol className="mt-4 flex gap-1" aria-label="Lesson steps">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex-1">
              <button
                type="button"
                // Earlier steps can be revisited; later ones unlock in order.
                disabled={i > stepIndex || step === "done"}
                onClick={() => go(s.id)}
                aria-current={i === stepIndex ? "step" : undefined}
                className="group w-full text-left disabled:cursor-default"
              >
                <span className={`block h-1 rounded-full transition-colors ${i <= stepIndex ? "bg-accent" : "bg-surface-2"}`} />
                <span className={`mt-1.5 flex items-center gap-1 text-xs ${i === stepIndex ? "font-semibold text-ink" : "text-muted"}`}>
                  {i < stepIndex && <CheckIcon width={12} height={12} />}
                  {s.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </header>

      {audio.notice && (
        <div className="mb-4">
          <Notice>{audio.notice}</Notice>
        </div>
      )}

      {step === "learn" && <LearnStep lesson={lesson} audio={audio} onDone={() => go("practice")} />}
      {step === "practice" && <PracticeStep lesson={lesson} unit={unit} audio={audio} onDone={onPractice} />}
      {step === "repeat" && <RepeatStep lesson={lesson} audio={audio} onDone={onRepeat} />}
      {step === "talk" && <TalkStep lesson={lesson} audio={audio} onDone={onTalk} />}
      {step === "done" && <DoneStep unit={unit} lesson={lesson} scores={scores} onRestart={() => go("learn", { practice: 0, repeat: 0, talk: 0 })} />}
    </div>
  );
}
