"use client";

import { useEffect, useRef, useState } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { SpeakerIcon } from "@/components/ui/icons";
import type { CourseLesson } from "@/lib/course";
import { SpeakCheck } from "../SpeakCheck";

type Audio = ReturnType<typeof usePhraseAudio>;
type Said = { line: number; text: string; skipped?: boolean };

/** Guided conversation: tutor lines are spoken, the learner answers each "you" line. */
export function TalkStep({ lesson, audio, onDone }: { lesson: CourseLesson; audio: Audio; onDone: (score: number) => void }) {
  const [line, setLine] = useState(0);
  const [said, setSaid] = useState<Said[]>([]);
  const [hint, setHint] = useState(false);
  const [passed, setPassed] = useState(0);
  const bottom = useRef<HTMLDivElement | null>(null);
  const dialogue = lesson.dialogue;
  const current = dialogue[line];
  const youLines = dialogue.filter((d) => d.speaker === "you").length;
  const { play } = audio;

  // Tutor lines play, then the conversation moves on by itself.
  useEffect(() => {
    if (!current) return;
    if (current.speaker !== "tutor") return;
    let cancelled = false;
    void play(current.de, { key: `talk-${line}` }).then(() => {
      if (!cancelled) setTimeout(() => !cancelled && setLine((l) => l + 1), 350);
    });
    return () => {
      cancelled = true;
    };
  }, [current, line, play]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [line]);

  // Finished: report how many of the learner's lines were said successfully.
  const finished = line >= dialogue.length;
  const reported = useRef(false);
  useEffect(() => {
    if (finished && !reported.current) {
      reported.current = true;
      setTimeout(() => onDone(youLines ? passed / youLines : 1), 600);
    }
  }, [finished, passed, youLines, onDone]);

  function answer(text: string, ok: boolean) {
    setSaid((s) => [...s, { line, text, skipped: !ok }]);
    if (ok) setPassed((n) => n + 1);
    setHint(false);
    setLine((l) => l + 1);
  }

  return (
    <section className="space-y-6">
      <p className="text-sm text-muted">A short conversation. Answer each prompt out loud.</p>
      <ol className="space-y-4">
        {dialogue.slice(0, Math.min(line + 1, dialogue.length)).map((d, i) => {
          if (d.speaker === "tutor") {
            return (
              <li key={i} className="animate-rise flex flex-col items-start">
                <div className="flex max-w-[85%] items-start gap-2 rounded-3xl rounded-bl-lg border border-border bg-tutor px-4 py-2.5">
                  <span lang="de">{d.de}</span>
                  <button type="button" className="-my-1 text-muted hover:text-ink" onClick={() => play(d.de, { key: `talk-${i}` })} aria-label="Listen again">
                    <SpeakerIcon width={16} height={16} />
                  </button>
                </div>
                <p className="mt-1 px-2 text-xs text-muted">{d.en}</p>
              </li>
            );
          }
          const mine = said.find((s) => s.line === i);
          if (mine) {
            return (
              <li key={i} className="animate-rise flex flex-col items-end">
                <p className="max-w-[85%] rounded-3xl rounded-br-lg bg-learner px-4 py-2.5 text-learner-ink" lang="de">
                  {mine.text}
                </p>
                {mine.skipped && <p className="mt-1 px-2 text-xs text-muted">skipped</p>}
              </li>
            );
          }
          return null;
        })}
      </ol>

      {current?.speaker === "you" && (
        <div className="animate-rise rounded-3xl border border-accent/40 bg-surface p-5">
          <p className="text-xs font-semibold text-accent">Your turn</p>
          <p className="mt-1 text-lg">{current.en}</p>
          <button type="button" className="mt-2 text-sm text-muted underline underline-offset-2 hover:text-ink" onClick={() => setHint((h) => !h)}>
            {hint ? "Hide the German" : "Show me how to say it"}
          </button>
          <div className="mt-4">
            <SpeakCheck
              key={line}
              target={current.de}
              accept={current.accept}
              hideTarget={!hint}
              onPass={(_, heard) => answer(heard, true)}
              onSkip={() => answer(current.de.replace(/\{[a-z]+\}/g, "…"), false)}
            />
          </div>
        </div>
      )}
      {finished && <p className="text-center text-sm text-muted">Gut gemacht! Wrapping up…</p>}
      <div ref={bottom} />
    </section>
  );
}
