"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useConfiguredAudio } from "@/components/audio/useConfiguredAudio";
import { SpeakCheck } from "@/components/course/SpeakCheck";
import { Notice } from "@/components/ui/Feedback";
import { CheckIcon, SpeakerIcon } from "@/components/ui/icons";
import { rng } from "@/lib/course/exercises";
import { savePractice } from "@/lib/practice-client";
import { buildPairRounds, type SoundSet } from "@/lib/pronunciation";
import { SoundSentences } from "./SoundSentences";

type Part = "learn" | "listen" | "say" | "done" | "sentences";
const LISTEN_ROUNDS = 8;

export function PronunciationSet({ set }: { set: SoundSet }) {
  const audio = useConfiguredAudio();
  const [part, setPart] = useState<Part>("learn");
  const [listenScore, setListenScore] = useState(0);
  const [sayScore, setSayScore] = useState(0);
  const { play } = audio;

  const parts: { id: Part; label: string }[] = [
    { id: "learn", label: "Learn" },
    { id: "listen", label: "Listen" },
    { id: "say", label: "Say it" },
    { id: "done", label: "Done" },
  ];
  const idx = part === "sentences" ? parts.length - 1 : parts.findIndex((p) => p.id === part);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <ol className="flex gap-1" aria-label="Steps">
        {parts.map((p, i) => (
          <li key={p.id} className="flex-1">
            <span className={`block h-1 rounded-full ${i <= idx ? "bg-accent" : "bg-surface-2"}`} />
            <span className={`mt-1.5 block text-xs ${i === idx ? "font-semibold" : "text-muted"}`}>{p.label}</span>
          </li>
        ))}
      </ol>

      {audio.notice && <Notice>{audio.notice}</Notice>}

      {part === "learn" && (
        <section className="animate-rise space-y-6">
          <p className="max-w-[65ch] text-lg">{set.explain}</p>
          <p className="max-w-[65ch] rounded-2xl bg-surface-2 px-4 py-3 text-sm">
            <span className="font-semibold">How: </span>
            {set.tip}
          </p>
          <ul className="space-y-2">
            {set.pairs.map((p) => (
              <li key={p.a + p.b} className="grid grid-cols-2 gap-2">
                {[
                  { w: p.a, en: p.aEn },
                  { w: p.b, en: p.bEn },
                ].map(({ w, en }) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => play(w, { key: w })}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      audio.playing === w ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-accent/40"
                    }`}
                  >
                    <SpeakerIcon width={18} height={18} className="shrink-0 text-muted" />
                    <span>
                      <span className="block text-xl font-semibold" lang="de">
                        {w}
                      </span>
                      <span className="text-sm text-muted">{en}</span>
                    </span>
                  </button>
                ))}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">Play each pair several times and say both words after the voice.</p>
          <button type="button" className="btn-primary" onClick={() => setPart("listen")}>
            Test my ear
          </button>
        </section>
      )}

      {part === "listen" && (
        <ListenRounds
          set={set}
          play={play}
          onDone={(score) => {
            setListenScore(score);
            setPart("say");
          }}
        />
      )}

      {part === "say" && (
        <SayRounds
          set={set}
          play={play}
          onDone={(score) => {
            setSayScore(score);
            void savePractice("pronunciation", set.id, (listenScore + score) / 2);
            setPart("done");
          }}
        />
      )}

      {part === "sentences" && <SoundSentences set={set} play={play} onFinish={() => setPart("done")} />}

      {part === "done" && (
        <section className="animate-rise space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">Gut gemacht!</h2>
          <dl className="grid max-w-xs grid-cols-2 gap-4 border-y border-border py-4 text-center">
            <div>
              <dt className="text-xs text-muted">Hearing</dt>
              <dd className="text-xl font-semibold tabular-nums">{Math.round(listenScore * 100)}%</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Speaking</dt>
              <dd className="text-xl font-semibold tabular-nums">{Math.round(sayScore * 100)}%</dd>
            </div>
          </dl>
          <p className="max-w-[60ch] text-sm text-muted">
            The speaking check uses speech recognition, which sometimes guesses the right word from context. Trust your ear too: compare yourself with
            the voice.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => setPart("sentences")}>
              Practise in sentences
            </button>
            <button type="button" className="btn-secondary" onClick={() => setPart("learn")}>
              Practise again
            </button>
            <Link href="/practice/pronunciation" className="btn-ghost">
              Other sounds
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

type Play = (text: string, opts?: { slow?: boolean; key?: string }) => Promise<void>;

function ListenRounds({ set, play, onDone }: { set: SoundSet; play: Play; onDone: (score: number) => void }) {
  const [seed] = useState(() => Date.now() % 100_000);
  const rounds = useMemo(() => buildPairRounds(set, LISTEN_ROUNDS, rng(seed)), [set, seed]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  const [correct, setCorrect] = useState(0);
  const round = rounds[i];
  const word = round.played === "a" ? round.pair.a : round.pair.b;

  useEffect(() => {
    void play(word, { key: `round-${i}` });
  }, [word, i, play]);

  function choose(side: "a" | "b") {
    if (picked) return;
    setPicked(side);
    if (side === round.played) setCorrect((n) => n + 1);
  }

  function next() {
    if (i + 1 >= rounds.length) onDone(correct / rounds.length);
    else {
      setPicked(null);
      setI(i + 1);
    }
  }

  return (
    <section key={i} className="animate-rise space-y-6">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-muted">Which word did you hear?</p>
        <span className="text-xs text-muted tabular-nums">
          {i + 1} / {rounds.length}
        </span>
      </div>
      <button type="button" className="btn-primary" onClick={() => play(word, { key: `round-${i}` })}>
        <SpeakerIcon /> Play again
      </button>
      <div className="grid grid-cols-2 gap-3">
        {(["a", "b"] as const).map((side) => {
          const w = side === "a" ? round.pair.a : round.pair.b;
          const en = side === "a" ? round.pair.aEn : round.pair.bEn;
          const state = !picked ? "idle" : side === round.played ? "right" : side === picked ? "wrong" : "idle";
          return (
            <button
              key={side}
              type="button"
              disabled={!!picked}
              onClick={() => choose(side)}
              className={`rounded-2xl border px-4 py-5 text-center transition-colors ${
                { idle: "border-border bg-surface hover:border-accent/40", right: "border-ok bg-ok-soft text-ok", wrong: "border-warn bg-warn-soft text-warn" }[state]
              }`}
            >
              <span className="block text-2xl font-semibold" lang="de">
                {w}
              </span>
              <span className="text-sm opacity-80">{en}</span>
            </button>
          );
        })}
      </div>
      {picked && (
        <div className="flex flex-wrap items-center gap-2">
          <p className={`flex-1 font-medium ${picked === round.played ? "text-ok" : "text-warn"}`}>
            {picked === round.played ? "Richtig!" : `It was „${word}“. Listen to both:`}
          </p>
          <button type="button" className="btn-ghost" onClick={() => play(round.pair.a, { key: "a" }).then(() => play(round.pair.b, { key: "b" }))}>
            <SpeakerIcon width={16} height={16} /> {round.pair.a} / {round.pair.b}
          </button>
          <button type="button" className="btn-primary" onClick={next} autoFocus>
            {i + 1 >= rounds.length ? "Now say them" : "Next"}
          </button>
        </div>
      )}
    </section>
  );
}

function SayRounds({ set, play, onDone }: { set: SoundSet; play: Play; onDone: (score: number) => void }) {
  const words = useMemo(() => set.pairs.flatMap((p) => [{ w: p.a, en: p.aEn }, { w: p.b, en: p.bEn }]), [set]);
  const [i, setI] = useState(0);
  const [passed, setPassed] = useState(0);
  const item = words[i];

  useEffect(() => {
    void play(item.w, { key: `say-${item.w}` });
  }, [item, play]);

  function advance(ok: boolean) {
    const total = passed + (ok ? 1 : 0);
    setPassed(total);
    if (i + 1 >= words.length) onDone(total / words.length);
    else setI(i + 1);
  }

  return (
    <section key={item.w} className="animate-rise space-y-6">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-muted">Listen, then say the word.</p>
        <span className="text-xs text-muted tabular-nums">
          {i + 1} / {words.length}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="btn-secondary" onClick={() => play(item.w, { key: `say-${item.w}` })}>
          <SpeakerIcon width={18} height={18} /> Play
        </button>
        <button type="button" className="btn-secondary" onClick={() => play(item.w, { key: `say-${item.w}`, slow: true })}>
          <SpeakerIcon width={18} height={18} /> Slow
        </button>
        <span className="text-sm text-muted">{item.en}</span>
      </div>
      <SpeakCheck target={item.w} onPass={() => advance(true)} onSkip={() => advance(false)} />
      {passed > 0 && (
        <p className="flex items-center gap-1 text-xs text-ok">
          <CheckIcon width={12} height={12} /> {passed} recognised so far
        </p>
      )}
    </section>
  );
}
