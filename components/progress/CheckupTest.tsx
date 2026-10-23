"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useConfiguredAudio } from "@/components/audio/useConfiguredAudio";
import { ExerciseCard } from "@/components/course/ExerciseCard";
import { SpeakCheck } from "@/components/course/SpeakCheck";
import { GenerateButton } from "@/components/practice/GenerateButton";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { SKILL_LABEL, summarize, type CheckupQuestion, type CheckupSkill } from "@/lib/checkup/build";
import type { Phrase } from "@/lib/course/types";
import { api, errorMessage } from "@/lib/client";
import type { CheckupStatusDTO, HealthDTO } from "@/lib/schemas";
import { SkillBars, weekLabel } from "./CheckupHistory";

type Phase = "intro" | "test" | "result";
type NewCheckup = { questions: CheckupQuestion[]; fromThisWeek: number; aiAvailable: number };
type Answer = { skill: CheckupSkill; correct: boolean | null; phrase: Phrase; source: CheckupQuestion["source"] };

/** Fewer than this and the check-up waits until more lessons are done. */
const MIN_QUESTIONS = 8;
const AI_WANTED = 3;

const phraseOf = (q: CheckupQuestion) => (q.kind === "speak" ? q.phrase : q.exercise.phrase);

export function CheckupTest() {
  const audio = useConfiguredAudio();
  const [phase, setPhase] = useState<Phase>("intro");
  const [set, setSet] = useState<NewCheckup | null>(null);
  const [before, setBefore] = useState<CheckupStatusDTO | null>(null);
  const [after, setAfter] = useState<CheckupStatusDTO | null>(null);
  const [llmOk, setLlmOk] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(
    () =>
      api<NewCheckup>("/api/checkup/new")
        .then((s) => {
          setSet(s);
          setError(null);
        })
        .catch((err) => setError(errorMessage(err))),
    [],
  );

  useEffect(() => {
    void loadQuestions();
    api<CheckupStatusDTO>("/api/checkup")
      .then(setBefore)
      .catch(() => {});
    api<HealthDTO>("/api/health")
      .then((h) => setLlmOk(h.llm.ok))
      .catch(() => {});
  }, [loadQuestions]);

  async function finish(all: Answer[]) {
    setPhase("result");
    setSaving(true);
    setError(null);
    const { skills } = summarize(all);
    try {
      const status = await api<CheckupStatusDTO>("/api/checkup", {
        method: "POST",
        json: {
          skills,
          missed: all.filter((a) => a.correct === false).map((a) => ({ de: a.phrase.de, en: a.phrase.en })),
          aiSentences: all.filter((a) => a.source === "ai").map((a) => a.phrase.de),
        },
      });
      setAfter(status);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  function record(correct: boolean | null) {
    const q = set!.questions[index];
    const next = [...answers, { skill: q.skill, correct, phrase: phraseOf(q), source: q.source }];
    setAnswers(next);
    return next;
  }

  function advance(all: Answer[]) {
    if (index + 1 >= set!.questions.length) void finish(all);
    else setIndex((i) => i + 1);
  }

  /** Speaking isn't possible right now: the remaining speaking questions are marked as not tested. */
  function skipSpeaking() {
    const rest = set!.questions.slice(index).map((q) => ({ skill: q.skill, correct: q.skill === "speaking" ? null : false, phrase: phraseOf(q), source: q.source }));
    void finish([...answers, ...rest]);
  }

  if (phase === "intro") {
    if (error && !set) return <ErrorBanner message={error} onRetry={loadQuestions} />;
    if (!set) return <Loading />;
    const enough = set.questions.length >= MIN_QUESTIONS;
    const thisWeek = before?.thisWeek;
    const aiInSet = set.questions.filter((q) => q.source === "ai").length;
    return (
      <section className="animate-rise max-w-[65ch] space-y-5">
        <p className="text-lg">About 10 minutes, {set.questions.length} questions in four parts:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>{SKILL_LABEL.reading}</strong>: choose what a German phrase means.
          </li>
          <li>
            <strong>{SKILL_LABEL.listening}</strong>: hear a sentence, choose what was said. Turn your sound on.
          </li>
          <li>
            <strong>{SKILL_LABEL.grammar}</strong>: fill the gap and put the words in order.
          </li>
          <li>
            <strong>{SKILL_LABEL.speaking}</strong>: read a sentence aloud into the microphone.
          </li>
        </ul>
        <p className="text-sm text-muted">
          Press “I don&apos;t know” instead of guessing, so the result is honest. Phrases you miss go into your review queue.
        </p>

        {!enough && (
          <Notice>
            There isn&apos;t enough to test yet. Finish a few lessons in the{" "}
            <Link href="/course" className="underline">
              course
            </Link>{" "}
            first.
          </Notice>
        )}
        {enough && set.fromThisWeek === 0 && (
          <Notice tone="info">You haven&apos;t finished new lessons this week, so this check-up reviews what you learned before.</Notice>
        )}
        {thisWeek && (
          <Notice tone="info">
            You already took this week&apos;s check-up ({Math.round(thisWeek.score * 100)}%). Your new result will replace it for this week.
          </Notice>
        )}

        {enough && llmOk && set.aiAvailable < AI_WANTED && (
          <div className="text-sm">
            <GenerateButton
              body={{ kind: "sentences" }}
              label="Add fresh AI questions"
              busyLabel="Writing new sentences with your words…"
              autoStart
              className="btn-ghost"
              onCreated={() => void loadQuestions()}
            />
            <p className="mt-1 text-xs text-muted">You can start now; AI questions are added if they&apos;re ready before you begin.</p>
          </div>
        )}
        {aiInSet > 0 && <p className="text-xs text-muted">{aiInSet} questions use new sentences written by the AI and checked against your vocabulary.</p>}

        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={() => setPhase("test")} disabled={!enough} autoFocus>
            Start the check-up
          </button>
          <Link href="/progress" className="btn-ghost">
            Back to progress
          </Link>
        </div>
      </section>
    );
  }

  if (phase === "result") {
    const { skills, score } = summarize(answers);
    const missed = answers.filter((a) => a.correct === false);
    // Compare with the latest earlier week, not with an earlier attempt this week.
    const weekOf = after?.weekOf ?? before?.weekOf;
    const previous = before?.history.filter((c) => c.weekOf !== weekOf).at(-1);
    const current = after?.thisWeek ?? { id: "", weekOf: weekOf ?? "", takenAt: "", score: score ?? 0, skills, missed: [] };
    const change = previous && score !== null ? Math.round(score * 100) - Math.round(previous.score * 100) : null;
    return (
      <section className="animate-rise max-w-2xl space-y-6">
        <div>
          <p className="text-sm font-semibold text-ok">Check-up complete</p>
          <h2 className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{score === null ? "—" : `${Math.round(score * 100)}%`}</h2>
          <p className="mt-1 text-muted">
            {change === null
              ? "Your first check-up. Take one each week to see your progress."
              : change > 0
                ? `Up ${change} points since the week of ${weekLabel(previous!.weekOf)}. Schön!`
                : change < 0
                  ? `Down ${-change} points since the week of ${weekLabel(previous!.weekOf)}. Newer material is harder, so a dip is normal.`
                  : `The same as the week of ${weekLabel(previous!.weekOf)}.`}
          </p>
        </div>

        <SkillBars current={current} previous={previous} />

        {error && <ErrorBanner message={`Your result couldn't be saved: ${error}`} onRetry={() => finish(answers)} />}
        {saving && <Loading label="Saving your result…" />}

        {missed.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">To practise</h3>
            <ul className="divide-y divide-border border-y border-border text-sm">
              {missed.map((a, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-x-4 py-2">
                  <span lang="de" className="font-medium">
                    {a.phrase.de}
                  </span>
                  <span className="text-muted">{a.phrase.en}</span>
                </li>
              ))}
            </ul>
            {after && <p className="mt-2 text-xs text-muted">These are in your review queue now.</p>}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {missed.length > 0 && (
            <Link href="/vocabulary?tab=review" className="btn-primary">
              Review what I missed
            </Link>
          )}
          <Link href="/progress" className={missed.length ? "btn-ghost" : "btn-primary"}>
            See my progress
          </Link>
        </div>
      </section>
    );
  }

  const q = set!.questions[index];
  const sectionStart = set!.questions.findIndex((x) => x.skill === q.skill);
  const sectionSize = set!.questions.filter((x) => x.skill === q.skill).length;
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden>
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(index / set!.questions.length) * 100}%` }} />
        </div>
        <span className="text-xs text-muted tabular-nums">
          {SKILL_LABEL[q.skill]} · {index - sectionStart + 1} of {sectionSize}
        </span>
      </div>
      {audio.notice && <Notice>{audio.notice}</Notice>}
      {q.kind === "speak" ? (
        <div key={q.id} className="card space-y-4">
          <p className="text-sm text-muted">Read this aloud: {q.phrase.en}</p>
          <SpeakCheck target={q.phrase.de} accept={q.phrase.accept} onPass={() => advance(record(true))} onSkip={() => advance(record(false))} />
          <button type="button" className="text-xs text-muted underline underline-offset-2 hover:text-ink" onClick={skipSpeaking}>
            Can&apos;t speak right now? Finish without the speaking part
          </button>
        </div>
      ) : (
        <ExerciseCard
          key={q.id}
          ex={q.exercise}
          audio={audio}
          onAnswered={(correct) => record(correct)}
          onNext={() => advance(answers)}
          onSkip={() => advance(record(false))}
        />
      )}
    </section>
  );
}
