"use client";

import { useEffect, useState } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { SpeakerIcon } from "@/components/ui/icons";
import type { CourseLesson } from "@/lib/course";
import { SpeakCheck } from "../SpeakCheck";

type Audio = ReturnType<typeof usePhraseAudio>;

/** Listen & repeat (shadowing): hear each phrase, say it back. */
export function RepeatStep({ lesson, audio, onDone }: { lesson: CourseLesson; audio: Audio; onDone: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [passed, setPassed] = useState(0);
  const phrase = lesson.phrases[index];
  const { play } = audio;

  useEffect(() => {
    if (phrase) void play(phrase.de, { key: phrase.id });
  }, [phrase, play]);

  function advance(ok: boolean) {
    const nextPassed = passed + (ok ? 1 : 0);
    setPassed(nextPassed);
    if (index === lesson.phrases.length - 1) onDone(nextPassed / lesson.phrases.length);
    else setIndex((i) => i + 1);
  }

  return (
    <section key={phrase.id} className="animate-rise space-y-6">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-muted">Listen, then say it the same way.</p>
        <p className="text-xs text-muted tabular-nums">
          {index + 1} / {lesson.phrases.length}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => play(phrase.de, { key: phrase.id })}>
          <SpeakerIcon width={18} height={18} /> Play
        </button>
        <button type="button" className="btn-secondary" onClick={() => play(phrase.de, { key: phrase.id, slow: true })}>
          <SpeakerIcon width={18} height={18} /> Slow
        </button>
        <span className="self-center text-sm text-muted">{phrase.en}</span>
      </div>
      <SpeakCheck target={phrase.de} accept={phrase.accept} onPass={() => advance(true)} onSkip={() => advance(false)} />
    </section>
  );
}
