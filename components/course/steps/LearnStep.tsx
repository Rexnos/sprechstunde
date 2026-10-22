"use client";

import { useEffect, useState } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { SpeakerIcon } from "@/components/ui/icons";
import Link from "next/link";
import type { CourseLesson } from "@/lib/course";
import { AlphabetGrid } from "../AlphabetGrid";

type Audio = ReturnType<typeof usePhraseAudio>;

export function LearnStep({ lesson, audio, onDone }: { lesson: CourseLesson; audio: Audio; onDone: () => void }) {
  // -1 = intro card, then one card per phrase
  const [index, setIndex] = useState(-1);
  const [showWords, setShowWords] = useState(false);
  const [lettersHeard, setLettersHeard] = useState(0);
  const phrase = index >= 0 ? lesson.phrases[index] : null;
  const last = index === lesson.phrases.length - 1;
  const { play } = audio;

  // Play each new phrase automatically.
  useEffect(() => {
    if (phrase) void play(phrase.de, { key: phrase.id });
  }, [phrase, play]);

  const next = () => {
    setShowWords(false);
    if (last) onDone();
    else setIndex((i) => i + 1);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement | null)?.closest("input, textarea")) return;
      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" && index > -1) {
        setIndex((i) => i - 1);
      } else if (e.code === "Space" && phrase && !(e.target as HTMLElement | null)?.closest("button")) {
        e.preventDefault();
        void play(phrase.de, { key: phrase.id });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!phrase) {
    return (
      <section className="animate-rise space-y-6">
        <p className="max-w-[65ch] text-lg leading-relaxed">{lesson.intro}</p>
        {lesson.grammar && (
          <div className="rounded-2xl bg-surface-2 p-5">
            <h3 className="font-semibold">{lesson.grammar.title}</h3>
            <p className="mt-1 max-w-[65ch] text-sm text-muted">{lesson.grammar.text}</p>
            {lesson.grammar.table && (
              <div className="mt-3 overflow-x-auto">
                <table className="text-sm">
                  <tbody>
                    {lesson.grammar.table.map((row, r) => (
                      <tr key={r} className={r === 0 && row[0] === "" ? "text-xs text-muted" : ""}>
                        {row.map((cell, c) => (
                          <td key={c} className={`py-1 pr-6 ${r > 0 && c > 0 ? "font-medium" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {lesson.letters ? (
          <>
            <AlphabetGrid letters={lesson.letters} audio={audio} onVisitedChange={setLettersHeard} />
            <p className="text-sm text-muted">
              {lettersHeard < lesson.letters.length
                ? `${lettersHeard} of ${lesson.letters.length} letters heard. Say each name out loud after the voice.`
                : "All letters heard. Next: some example words."}
            </p>
            <button type="button" className={lettersHeard >= lesson.letters.length ? "btn-primary" : "btn-secondary"} onClick={next}>
              Continue to words
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">{lesson.phrases.length} phrases to learn. Listen, then say each one out loud.</p>
            <div className="flex items-center gap-4">
              <button type="button" className="btn-primary" onClick={next} autoFocus>
                Start
              </button>
              <Link href="/course/alphabet" target="_blank" className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline">
                Alphabet chart
              </Link>
            </div>
          </>
        )}
      </section>
    );
  }

  const isPlaying = audio.playing === phrase.id;
  const isSlow = audio.playing === `${phrase.id}:slow`;

  return (
    <section key={phrase.id} className="animate-rise space-y-6">
      <p className="text-xs text-muted tabular-nums">
        Phrase {index + 1} of {lesson.phrases.length}
      </p>
      <div>
        <p className="font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold tracking-tight" lang="de">
          {phrase.de}
        </p>
        <p className="mt-2 text-lg text-muted">{phrase.en}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={isPlaying ? "btn-primary" : "btn-secondary"} onClick={() => play(phrase.de, { key: phrase.id })}>
          <SpeakerIcon width={18} height={18} /> Play
        </button>
        <button type="button" className={isSlow ? "btn-primary" : "btn-secondary"} onClick={() => play(phrase.de, { key: phrase.id, slow: true })}>
          <SpeakerIcon width={18} height={18} /> Slow
        </button>
        {phrase.words && (
          <button type="button" className="btn-ghost" onClick={() => setShowWords((s) => !s)} aria-expanded={showWords}>
            {showWords ? "Hide" : "Word by word"}
          </button>
        )}
      </div>

      {showWords && phrase.words && (
        <dl className="animate-rise flex flex-wrap gap-2">
          {phrase.words.map(([de, en]) => (
            <div key={de} className="rounded-xl border border-border bg-surface px-3 py-2">
              <dt className="font-semibold" lang="de">
                {de}
              </dt>
              <dd className="text-sm text-muted">{en}</dd>
            </div>
          ))}
        </dl>
      )}

      {phrase.note && <p className="max-w-[60ch] rounded-2xl bg-surface-2 px-4 py-3 text-sm">{phrase.note}</p>}

      <p className="text-sm text-muted">Say it out loud a couple of times, then continue.</p>

      <div className="flex items-center gap-2">
        <button type="button" className="btn-ghost" onClick={() => setIndex((i) => i - 1)}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={next}>
          {last ? "Practice" : "Next"}
        </button>
        <span className="ml-2 hidden text-xs text-muted sm:inline">Space: play again · Enter: next</span>
      </div>
    </section>
  );
}
