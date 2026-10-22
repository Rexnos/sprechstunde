"use client";

import { useCallback, useEffect, useState } from "react";
import { SpeakCheck } from "@/components/course/SpeakCheck";
import { ErrorBanner, Loading } from "@/components/ui/Feedback";
import { SpeakerIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import type { SoundSet } from "@/lib/pronunciation";
import { AiBadge } from "./GenerateButton";

type Sentence = { de: string; en: string; source: "course" | "story" | "ai" };
type Play = (text: string, opts?: { slow?: boolean; key?: string }) => Promise<void>;

/**
 * Real sentences (course, stories, AI dictation sentences) chosen because they're rich
 * in this sound, as checked with the voice's own pronunciation. Listen, then repeat.
 */
export function SoundSentences({ set, play, onFinish }: { set: SoundSet; play: Play; onFinish: () => void }) {
  const [batch, setBatch] = useState<Sentence[] | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (exclude: string[]) => {
      setError(null);
      setBatch(null);
      try {
        const r = await api<{ sentences: Sentence[] }>("/api/practice/sound-sentences", { method: "POST", json: { setId: set.id, n: 5, exclude } });
        setBatch(r.sentences);
        setSeen([...exclude, ...r.sentences.map((s) => s.de)]);
        setIndex(0);
      } catch (err) {
        setError(errorMessage(err));
      }
    },
    [set.id],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load([]);
  }, [load]);

  const current = batch?.[index];
  useEffect(() => {
    if (current) void play(current.de, { key: `sent-${current.de}` });
  }, [current, play]);

  if (error) return <ErrorBanner message={error} onRetry={() => load(seen)} />;
  if (!batch) return <Loading label="Finding sentences with this sound…" />;

  if (!current) {
    return (
      <section className="animate-rise space-y-4">
        <p className="text-lg font-semibold">{batch.length ? "Batch done!" : "No more sentences with this sound yet."}</p>
        <p className="max-w-[60ch] text-sm text-muted">
          {batch.length
            ? "Keep going with another batch, or finish."
            : "New sentences appear here as you finish more lessons and generate new dictation sentences."}
        </p>
        <div className="flex gap-2">
          {batch.length > 0 && (
            <button type="button" className="btn-primary" onClick={() => load(seen)}>
              More sentences
            </button>
          )}
          <button type="button" className="btn-secondary" onClick={onFinish}>
            Finish
          </button>
        </div>
      </section>
    );
  }

  const next = () => setIndex((i) => i + 1);
  return (
    <section key={current.de} className="animate-rise space-y-5">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-muted">Listen, then say the whole sentence. Focus on the {set.title} sound.</p>
        <span className="text-xs text-muted tabular-nums">
          {index + 1} / {batch.length}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn-secondary" onClick={() => play(current.de, { key: `sent-${current.de}` })}>
          <SpeakerIcon width={18} height={18} /> Play
        </button>
        <button type="button" className="btn-secondary" onClick={() => play(current.de, { key: `sent-${current.de}`, slow: true })}>
          <SpeakerIcon width={18} height={18} /> Slow
        </button>
        <span className="text-sm text-muted">{current.en}</span>
        {current.source === "ai" && <AiBadge />}
      </div>
      <SpeakCheck target={current.de} onPass={next} onSkip={next} />
    </section>
  );
}
