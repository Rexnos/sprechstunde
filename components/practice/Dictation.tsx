"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useConfiguredAudio } from "@/components/audio/useConfiguredAudio";
import { UmlautBar } from "@/components/course/UmlautBar";
import { Loading, Notice } from "@/components/ui/Feedback";
import { SpeakerIcon } from "@/components/ui/icons";
import { api } from "@/lib/client";
import { ALL_LESSONS, type Phrase } from "@/lib/course";
import { rng } from "@/lib/course/exercises";
import { scoreSpoken, type SpokenScore } from "@/lib/course/scoring";
import { savePractice } from "@/lib/practice-client";
import type { CourseProgressDTO, GeneratedDTO } from "@/lib/schemas";
import { AiBadge, GenerateButton } from "./GenerateButton";

const ROUNDS = 10;

type Sentence = Phrase & { ai?: boolean };

/** Every sentence available for dictation: finished lessons (recent units twice) plus AI sentences. */
function sentencePool(done: Set<string>, ai: Sentence[]): Sentence[] {
  const finished = ALL_LESSONS.filter((x) => done.has(x.lesson.id));
  const source = finished.length ? finished : ALL_LESSONS.filter((x) => x.unit.number <= 1);
  const recentUnits = new Set(source.slice(-8).map((x) => x.unit.id));
  const pool: Sentence[] = [];
  for (const { unit, lesson } of source) {
    for (const p of lesson.phrases) {
      if (p.de.includes("{") || p.de.split(/\s+/).length > 9) continue;
      pool.push(p);
      if (recentUnits.has(unit.id)) pool.push(p);
    }
  }
  return [...pool, ...ai, ...ai]; // AI sentences are new, so they count double too
}

/** Ten sentences, preferring ones not yet used in this visit. */
function pickSentences(pool: Sentence[], used: Set<string>, seed: number): Sentence[] {
  const rand = rng(seed);
  const fresh = pool.filter((p) => !used.has(p.id));
  const source = [...(fresh.length >= ROUNDS ? fresh : pool)];
  const picked: Sentence[] = [];
  while (picked.length < ROUNDS && source.length) {
    const p = source.splice(Math.floor(rand() * source.length), 1)[0];
    if (!picked.some((x) => x.id === p.id)) picked.push(p);
  }
  return picked;
}

const unusedCount = (pool: Sentence[], used: Set<string>) => new Set(pool.filter((p) => !used.has(p.id)).map((p) => p.id)).size;

function aiSentences(items: GeneratedDTO[]): Sentence[] {
  return items.flatMap((it) =>
    (it.payload as { sentences: { de: string; en: string }[] }).sentences.map((s, i) => ({ id: `ai-${it.id}-${i}`, de: s.de, en: s.en, ai: true })),
  );
}

type Result = { phrase: Phrase; typed: string; score: SpokenScore; plays: number };

export function Dictation() {
  const audio = useConfiguredAudio();
  const [sentences, setSentences] = useState<Sentence[] | null>(null);
  const [ai, setAi] = useState<Sentence[]>([]);
  const [used, setUsed] = useState<Set<string>>(() => new Set());
  const [added, setAdded] = useState(0);
  const [round, setRound] = useState(0);
  const [typed, setTyped] = useState("");
  const [plays, setPlays] = useState(1); // the automatic first play counts
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const [showEnglish, setShowEnglish] = useState(false);
  const [normalOnly, setNormalOnly] = useState(false);
  const [checked, setChecked] = useState<SpokenScore | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const seed = Date.now() % 100_000;
    Promise.all([
      api<CourseProgressDTO>("/api/course/progress").catch(() => null),
      api<{ items: GeneratedDTO[] }>("/api/practice/generated?kind=sentences").catch(() => ({ items: [] })),
    ]).then(([progress, generated]) => {
      const ids = new Set(progress?.lessons.map((l) => l.lessonId) ?? []);
      const aiList = aiSentences(generated.items);
      setDone(ids);
      setAi(aiList);
      const first = pickSentences(sentencePool(ids, aiList), new Set(), seed);
      setUsed(new Set(first.map((p) => p.id)));
      setSentences(first);
    });
  }, []);

  function newRound(aiList = ai) {
    const next = pickSentences(sentencePool(done, aiList), used, Date.now() % 100_000);
    setUsed((u) => new Set([...u, ...next.map((p) => p.id)]));
    setSentences(next);
    setResults([]);
    setRound(0);
    setPlays(1);
  }

  const phrase = sentences?.[round];
  const { play } = audio;

  useEffect(() => {
    if (!phrase) return;
    void play(phrase.de, { key: phrase.id });
  }, [phrase, play]);

  if (!sentences) return <Loading />;

  if (!phrase) {
    const avg = results.length ? results.reduce((n, r) => n + r.score.ratio, 0) / results.length : 0;
    const missed = [...new Set(results.flatMap((r) => r.score.words.filter((w) => !w.heard).map((w) => w.word.replace(/[.,!?]/g, ""))))];
    return (
      <section className="animate-rise max-w-[65ch] space-y-6">
        <div>
          <p className="text-sm font-semibold text-ok">Round complete</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">{Math.round(avg * 100)}% of words heard correctly</h2>
        </div>
        {missed.length > 0 && (
          <div>
            <p className="text-sm text-muted">Words to listen for next time:</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {missed.map((w) => (
                <li key={w}>
                  <button type="button" className="rounded-full border border-border bg-surface px-3 py-1 text-sm hover:border-accent/50" onClick={() => play(w)} lang="de">
                    {w}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-2xl bg-surface-2 p-4">
          <p className="text-sm">
            {unusedCount(sentencePool(done, ai), used) < ROUNDS
              ? "You've heard almost every sentence available. Generating new ones from your vocabulary…"
              : "Want fresh sentences? The local AI can write new ones using only words you know."}
          </p>
          {added > 0 && <p className="mt-1 text-sm text-ok">{added} new sentences added.</p>}
          <div className="mt-3">
            <GenerateButton
              body={{ kind: "sentences" }}
              label="Generate 10 new sentences"
              busyLabel="Writing new sentences…"
              autoStart={unusedCount(sentencePool(done, ai), used) < ROUNDS}
              onCreated={(item) => {
                const fresh = aiSentences([item]);
                setAi((a) => [...fresh, ...a]);
                setAdded(fresh.length);
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={() => newRound()}>
            Another round
          </button>
          <Link href="/practice" className="btn-ghost">
            Back to practice
          </Link>
        </div>
      </section>
    );
  }

  function check() {
    if (!phrase || checked || !typed.trim()) return;
    const score = scoreSpoken(typed, phrase.de, phrase.accept);
    setChecked(score);
    setResults((r) => [...r, { phrase, typed, score, plays }]);
  }

  function next() {
    const nextRound = round + 1;
    if (nextRound >= sentences!.length) {
      const all = [...results];
      const avg = all.length ? all.reduce((n, r) => n + r.score.ratio, 0) / all.length : 0;
      void savePractice("dictation", "round", avg);
    }
    setTyped("");
    setChecked(null);
    setShowEnglish(false);
    setPlays(1);
    setRound(nextRound);
  }

  const replay = (slow: boolean) => {
    setPlays((n) => n + 1);
    void play(phrase.de, { key: phrase.id, slow });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden>
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(round / sentences.length) * 100}%` }} />
        </div>
        <span className="text-xs text-muted tabular-nums">
          {round + 1} / {sentences.length}
        </span>
      </div>

      {audio.notice && <Notice>{audio.notice}</Notice>}

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn-primary" onClick={() => replay(false)}>
          <SpeakerIcon /> Play
        </button>
        {!normalOnly && (
          <button type="button" className="btn-secondary" onClick={() => replay(true)}>
            <SpeakerIcon /> Slow
          </button>
        )}
        <span className="text-xs text-muted">played {plays}×</span>
        {phrase.ai && <AiBadge />}
      </div>

      {(showEnglish || checked) && <p className="text-muted">{phrase.en}</p>}

      <div>
        <label htmlFor="dictation" className="mb-1 block text-sm text-muted">
          Type what you hear
        </label>
        <input
          id="dictation"
          className="input text-xl"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (checked) next();
            else check();
          }}
          disabled={!!checked}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          lang="de"
          autoFocus
        />
        {!checked && <UmlautBar inputId="dictation" onInsert={(c) => setTyped((t) => t + c)} />}
      </div>

      {checked && (
        <div className="animate-rise space-y-2" aria-live="polite">
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-2xl font-semibold" lang="de">
            {checked.words.map((w, i) => (
              <span key={i} className={`rounded-md px-1 ${w.heard ? "bg-ok-soft text-ok" : "bg-warn-soft text-warn"}`}>
                {w.word}
              </span>
            ))}
          </p>
          <p className="text-sm text-muted">
            {checked.passed ? "Sehr gut!" : "Amber words were missing or misspelled. Listen once more before you continue."}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {checked ? (
          <>
            <button type="button" className="btn-secondary" onClick={() => replay(false)}>
              <SpeakerIcon /> Listen again
            </button>
            <button type="button" className="btn-primary" onClick={next} autoFocus>
              {round + 1 >= sentences.length ? "See results" : "Next"}
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-primary" onClick={check} disabled={!typed.trim()}>
              Check
            </button>
            <button type="button" className="btn-ghost" onClick={() => setShowEnglish(true)} disabled={showEnglish}>
              Show the English
            </button>
          </>
        )}
        <label className="ml-auto flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={normalOnly} onChange={(e) => setNormalOnly(e.target.checked)} className="size-4" />
          Normal speed only (harder)
        </label>
      </div>
    </section>
  );
}
