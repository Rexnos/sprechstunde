"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useConfiguredAudio } from "@/components/audio/useConfiguredAudio";
import { Notice } from "@/components/ui/Feedback";
import { CheckIcon, SpeakerIcon, StopIcon } from "@/components/ui/icons";
import { rng } from "@/lib/course/exercises";
import { savePractice } from "@/lib/practice-client";
import { storyTokens, type Story } from "@/lib/stories";

export function StoryReader({ story }: { story: Story }) {
  const audio = useConfiguredAudio();
  const [current, setCurrent] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [word, setWord] = useState<{ sentence: number; key: string; text: string } | null>(null);
  const [stage, setStage] = useState<"read" | "quiz">("read");
  const run = useRef(0);
  const { play, stop } = audio;

  async function playAll(from = 0) {
    const my = ++run.current;
    setPlayingAll(true);
    for (let i = from; i < story.sentences.length; i++) {
      if (run.current !== my) return;
      setCurrent(i);
      await play(story.sentences[i].de, { key: `s${i}` });
      if (run.current !== my) return;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (run.current === my) {
      setPlayingAll(false);
      setCurrent(null);
    }
  }

  function stopAll() {
    run.current++;
    stop();
    setPlayingAll(false);
    setCurrent(null);
  }

  function playOne(i: number) {
    run.current++;
    setPlayingAll(false);
    setCurrent(i);
    void play(story.sentences[i].de, { key: `s${i}` }).then(() => setCurrent((c) => (c === i ? null : c)));
  }

  if (stage === "quiz") return <StoryQuiz story={story} onBack={() => setStage("read")} />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {audio.notice && <Notice>{audio.notice}</Notice>}
      <div className="flex flex-wrap items-center gap-2">
        {playingAll ? (
          <button type="button" className="btn-secondary" onClick={stopAll}>
            <StopIcon width={16} height={16} /> Stop
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={() => playAll(0)}>
            <SpeakerIcon /> Play the story
          </button>
        )}
        <label className="ml-auto flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={showEnglish} onChange={(e) => setShowEnglish(e.target.checked)} className="size-4" />
          Show English
        </label>
      </div>

      <p className="text-sm text-muted">Tap any word for its meaning. Tap the speaker to hear one sentence.</p>

      <ol className="space-y-4">
        {story.sentences.map((s, i) => (
          <li key={i} className={`rounded-2xl px-3 py-2 transition-colors ${current === i ? "bg-accent-soft" : ""}`}>
            <div className="flex items-start gap-2">
              <button type="button" onClick={() => playOne(i)} className="mt-1 shrink-0 text-muted hover:text-ink" aria-label={`Play sentence ${i + 1}`}>
                <SpeakerIcon width={16} height={16} />
              </button>
              <p className="text-xl leading-relaxed" lang="de">
                {storyTokens(s.de).map((t, k) =>
                  t.key ? (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setWord(word?.sentence === i && word.key === t.key ? null : { sentence: i, key: t.key!, text: t.text })}
                      className={`rounded px-0.5 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent/60 ${
                        word?.sentence === i && word.key === t.key ? "bg-accent-soft decoration-accent" : ""
                      }`}
                    >
                      {t.text}
                    </button>
                  ) : (
                    <span key={k}>{t.text}</span>
                  ),
                )}
              </p>
            </div>
            {word?.sentence === i && (
              <p className="animate-rise mt-1 ml-6 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm" role="status">
                <span className="font-semibold" lang="de">
                  {word.text.replace(/[„“”"'.,!?:;]/g, "")}
                </span>
                <span className="text-muted">{story.glossary[word.key] ?? "(a small, common word)"}</span>
                <button type="button" onClick={() => play(word.key, { key: `w-${word.key}` })} className="text-muted hover:text-ink" aria-label="Listen to the word">
                  <SpeakerIcon width={14} height={14} />
                </button>
              </p>
            )}
            {showEnglish && <p className="mt-1 ml-6 text-sm text-muted">{s.en}</p>}
          </li>
        ))}
      </ol>

      <div className="flex gap-2 border-t border-border pt-6">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            stopAll();
            setStage("quiz");
          }}
        >
          Answer 3 questions
        </button>
        <Link href="/practice/stories" className="btn-ghost">
          All stories
        </Link>
      </div>
    </div>
  );
}

function StoryQuiz({ story, onBack }: { story: Story; onBack: () => void }) {
  const [seed] = useState(() => Date.now() % 100_000);
  // Options are written with the answer first; shuffle them for display.
  const questions = useMemo(() => {
    const rand = rng(seed);
    return story.questions.map((q) => ({ ...q, options: [...q.options].sort(() => rand() - 0.5) }));
  }, [story, seed]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const done = Object.keys(answers).length === questions.length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;

  function answer(i: number, option: string) {
    const next = { ...answers, [i]: option };
    setAnswers(next);
    if (Object.keys(next).length === questions.length) {
      const score = questions.filter((q, k) => next[k] === q.answer).length / questions.length;
      void savePractice("story", story.id, score);
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      {questions.map((q, i) => (
        <div key={i}>
          <p className="font-medium">
            {i + 1}. {q.q}
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {q.options.map((o) => {
              const chosen = answers[i];
              const state = !chosen ? "idle" : o === q.answer ? "right" : o === chosen ? "wrong" : "idle";
              return (
                <li key={o}>
                  <button
                    type="button"
                    disabled={!!chosen}
                    onClick={() => answer(i, o)}
                    className={`flex w-full items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      { idle: "border-border bg-surface hover:border-accent/40", right: "border-ok bg-ok-soft text-ok", wrong: "border-warn bg-warn-soft text-warn" }[state]
                    }`}
                  >
                    <span className="flex-1">{o}</span>
                    {state === "right" && <CheckIcon width={16} height={16} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {done && (
        <div className="animate-rise space-y-4 border-t border-border pt-6">
          <p className="text-xl font-semibold">
            {correct} of {questions.length} correct. {correct === questions.length ? "Super!" : "Read it once more and try again."}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary" onClick={onBack}>
              Read again
            </button>
            <Link href="/practice/stories" className="btn-primary">
              Next story
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
