"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { CheckIcon, SpeakerIcon } from "@/components/ui/icons";
import { checkSpelling } from "@/lib/course/alphabet";
import { checkBuild, type Exercise } from "@/lib/course/exercises";
import { UmlautBar } from "./UmlautBar";

type Audio = ReturnType<typeof usePhraseAudio>;

type Props = {
  ex: Exercise;
  audio: Audio;
  /** Called once when the learner checks an answer. */
  onAnswered: (correct: boolean) => void;
  /** Called when the learner continues after feedback. */
  onNext: () => void;
  /** Optional "I don't know" (counts as wrong and moves on). */
  onSkip?: () => void;
  /** Shown left of the Check button, e.g. "3 of 10". */
  status?: ReactNode;
};

/**
 * One exercise of any kind: renders it, checks the answer, shows feedback.
 * Remount it (with a new key) for each exercise.
 * Keys: 1–4 choose an option, Enter checks / continues.
 */
export function ExerciseCard({ ex, audio, onAnswered, onNext, onSkip, status }: Props) {
  const [choice, setChoice] = useState<string | null>(null);
  const [picked, setPicked] = useState<number[]>([]); // tile indexes for "build"
  const [typed, setTyped] = useState(""); // "spell"
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const { play } = audio;

  // Auto-play for listening exercises.
  useEffect(() => {
    if (ex.kind === "listen" || ex.kind === "letter" || ex.kind === "spell") void play(ex.phrase.de, { key: ex.phrase.id });
  }, [ex, play]);

  function check() {
    if (feedback) return;
    let correct: boolean;
    if (ex.kind === "spell") {
      if (!typed.trim()) return;
      correct = checkSpelling(ex.answer, typed);
    } else if (ex.kind === "build") {
      if (picked.length === 0) return;
      correct = checkBuild(ex.answer, picked.map((i) => ex.tiles[i]));
    } else {
      if (choice === null) return;
      correct = choice === ex.answer;
    }
    setFeedback({ correct });
    onAnswered(correct);
    // After answering, hear the German once more (the whole word for spelling exercises).
    void play(ex.kind === "spell" ? ex.answer : ex.phrase.de, { key: ex.phrase.id });
  }

  function next() {
    if (feedback) onNext();
  }

  // Keyboard: 1–4 choose, Enter checks / continues.
  const options = "options" in ex ? ex.options : [];
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement | null)?.closest("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= options.length) {
        if (!feedback) setChoice(options[n - 1]);
      } else if (e.key === "Enter" && !(e.target as HTMLElement | null)?.closest("button")) {
        e.preventDefault();
        if (feedback) next();
        else check();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="animate-rise space-y-6">
        {ex.kind === "meaning" && (
          <>
            <p className="text-sm text-muted">What does this mean?</p>
            <p className="text-3xl font-semibold" lang="de">
              {ex.prompt}{" "}
              <button type="button" className="btn-ghost !p-2 align-middle" onClick={() => play(ex.phrase.de, { key: ex.phrase.id })} aria-label="Listen">
                <SpeakerIcon />
              </button>
            </p>
          </>
        )}
        {ex.kind === "listen" && (
          <>
            <p className="text-sm text-muted">Listen. Which sentence did you hear?</p>
            <div className="flex gap-2">
              <button type="button" className="btn-primary" onClick={() => play(ex.phrase.de, { key: ex.phrase.id })}>
                <SpeakerIcon /> Play
              </button>
              <button type="button" className="btn-secondary" onClick={() => play(ex.phrase.de, { key: ex.phrase.id, slow: true })}>
                <SpeakerIcon /> Slow
              </button>
            </div>
          </>
        )}
        {ex.kind === "gap" && (
          <>
            <p className="text-sm text-muted">Fill the gap. ({ex.phrase.en})</p>
            <p className="text-3xl font-semibold" lang="de">
              {ex.before}{" "}
              <span className={`inline-block min-w-20 border-b-2 text-center ${feedback ? (feedback.correct ? "border-ok text-ok" : "border-warn text-warn") : "border-accent"}`}>
                {feedback ? ex.answer : (choice ?? " ")}
              </span>{" "}
              {ex.after}
            </p>
          </>
        )}
        {ex.kind === "build" && (
          <>
            <p className="text-sm text-muted">Build the sentence: {ex.phrase.en}</p>
            <div className="flex min-h-14 flex-wrap items-center gap-2 border-b-2 border-border pb-3" aria-label="Your sentence">
              {picked.map((ti, k) => (
                <button
                  key={`${ti}-${k}`}
                  type="button"
                  className="rounded-xl bg-learner px-3 py-1.5 text-lg text-learner-ink"
                  onClick={() => !feedback && setPicked((p) => p.filter((_, j) => j !== k))}
                  lang="de"
                >
                  {ex.tiles[ti]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {ex.tiles.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={picked.includes(i) || !!feedback}
                  onClick={() => setPicked((p) => [...p, i])}
                  className="rounded-xl border border-border bg-surface px-3 py-1.5 text-lg transition-opacity disabled:opacity-25"
                  lang="de"
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {ex.kind === "letter" && (
          <>
            <p className="text-sm text-muted">Which letter did you hear?</p>
            <button type="button" className="btn-primary" onClick={() => play(ex.phrase.de, { key: ex.phrase.id })}>
              <SpeakerIcon /> Play again
            </button>
          </>
        )}
        {ex.kind === "spell" && (
          <>
            <p className="text-sm text-muted">Listen to the spelling and type the word.</p>
            <div className="flex gap-2">
              <button type="button" className="btn-primary" onClick={() => play(ex.phrase.de, { key: ex.phrase.id })}>
                <SpeakerIcon /> Play
              </button>
              <button type="button" className="btn-secondary" onClick={() => play(ex.phrase.de, { key: ex.phrase.id, slow: true })}>
                <SpeakerIcon /> Slow
              </button>
            </div>
            <div>
              <label htmlFor="spell-input" className="sr-only">
                The word you heard
              </label>
              <input
                id="spell-input"
                className={`input max-w-xs text-2xl ${feedback ? (feedback.correct ? "border-ok text-ok" : "border-warn text-warn") : ""}`}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (feedback) next();
                    else check();
                  }
                }}
                disabled={!!feedback}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                lang="de"
                autoFocus
              />
              <UmlautBar inputId="spell-input" disabled={!!feedback} onInsert={(c) => setTyped((t) => t + c)} />
            </div>
          </>
        )}

        {"options" in ex && ex.kind === "letter" && (
          <ul className="grid max-w-md grid-cols-4 gap-2">
            {ex.options.map((o, i) => {
              const state = feedback ? (o === ex.answer ? "right" : o === choice ? "wrong" : "idle") : o === choice ? "chosen" : "idle";
              return (
                <li key={o}>
                  <button
                    type="button"
                    disabled={!!feedback}
                    onClick={() => setChoice(o)}
                    className={`relative w-full rounded-2xl border py-4 font-[family-name:var(--font-display)] text-4xl font-semibold transition-colors ${
                      {
                        idle: "border-border bg-surface hover:border-accent/40",
                        chosen: "border-accent bg-accent-soft",
                        right: "border-ok bg-ok-soft text-ok",
                        wrong: "border-warn bg-warn-soft text-warn",
                      }[state]
                    }`}
                  >
                    <kbd className="absolute top-1.5 left-2 font-sans text-xs font-normal text-muted">{i + 1}</kbd>
                    {o}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {"options" in ex && ex.kind !== "letter" && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {ex.options.map((o, i) => {
              const isAnswer = o === ex.answer;
              const isChosen = o === choice;
              const state = feedback ? (isAnswer ? "right" : isChosen ? "wrong" : "idle") : isChosen ? "chosen" : "idle";
              return (
                <li key={o}>
                  <button
                    type="button"
                    disabled={!!feedback}
                    onClick={() => setChoice(o)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      {
                        idle: "border-border bg-surface hover:border-accent/40",
                        chosen: "border-accent bg-accent-soft",
                        right: "border-ok bg-ok-soft text-ok",
                        wrong: "border-warn bg-warn-soft text-warn",
                      }[state]
                    }`}
                    lang={ex.kind === "meaning" ? undefined : "de"}
                  >
                    <kbd className="text-xs text-muted">{i + 1}</kbd>
                    <span className="flex-1">{o}</span>
                    {state === "right" && <CheckIcon width={18} height={18} />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {feedback ? (
            <>
              <p className={`flex-1 font-medium ${feedback.correct ? "text-ok" : "text-warn"}`} aria-live="polite">
                {feedback.correct ? (
                  "Richtig!"
                ) : (
                  <>
                    Not quite. Correct: <span lang="de">{ex.answer}</span>
                    {ex.kind !== "meaning" && ex.kind !== "spell" && <span className="text-muted"> ({ex.phrase.en})</span>}
                  </>
                )}
              </p>
              <button type="button" className="btn-primary" onClick={next} autoFocus>
                Continue
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-xs text-muted">{status}</span>
              {onSkip && (
                <button type="button" className="btn-ghost" onClick={onSkip}>
                  I don&apos;t know
                </button>
              )}
              <button
                type="button"
                className="btn-primary"
                onClick={check}
                disabled={ex.kind === "build" ? picked.length !== ex.tiles.length : ex.kind === "spell" ? !typed.trim() : choice === null}
              >
                Check
              </button>
            </>
          )}
        </div>
    </div>
  );
}
