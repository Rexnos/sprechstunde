"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ErrorBanner, Loading } from "@/components/ui/Feedback";
import { SpeakerIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import type { VocabDTO } from "@/lib/schemas";

type Props = { onSpeak: (id: string, text: string) => void; canSpeak: boolean };

/** Flash-card review of words whose next review date has passed. */
export function ReviewQueue({ onSpeak, canSpeak }: Props) {
  const [queue, setQueue] = useState<VocabDTO[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await api<{ items: VocabDTO[] }>("/api/vocabulary?due=1&limit=30");
      setQueue(res.items);
      setRevealed(false);
    } catch (err) {
      setError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  async function answer(result: "again" | "good" | "known") {
    const card = queue?.[0];
    if (!card) return;
    setSaving(true);
    try {
      await api(`/api/vocabulary/${card.id}`, { method: "PATCH", json: { result } });
      setQueue((q) => q?.slice(1) ?? null);
      setReviewed((n) => n + 1);
      setRevealed(false);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  // Keyboard flow: Space reveals, 1/2/3 answer.
  const answerRef = useRef(answer);
  useEffect(() => {
    answerRef.current = answer;
  });
  const hasCard = !!queue?.length;
  useEffect(() => {
    if (!hasCard) return;
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select") || e.repeat) return;
      if (!revealed && e.code === "Space") {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && !saving) {
        const result = ({ Digit1: "again", Digit2: "good", Digit3: "known" } as const)[e.code as "Digit1"];
        if (result) void answerRef.current(result);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasCard, revealed, saving]);

  if (error) return <ErrorBanner message={error} onRetry={load} />;
  if (!queue) return <Loading />;

  const card = queue[0];
  if (!card) {
    return (
      <div className="card text-center">
        <p className="text-lg font-semibold">{reviewed ? `Done. ${reviewed} word${reviewed === 1 ? "" : "s"} reviewed.` : "Nothing to review right now."}</p>
        <p className="mt-1 text-sm text-muted">Words come back here on a schedule: sooner when you miss them, later when you know them.</p>
        <button type="button" className="btn-secondary mt-4" onClick={load}>
          Check again
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Review card" className="card mx-auto max-w-lg text-center">
      <p className="eyebrow">
        {queue.length} left · {reviewed} reviewed
      </p>
      <p className="mt-4 text-3xl font-bold" lang="de">
        {card.term}
      </p>
      {canSpeak && (
        <button type="button" className="btn-ghost mt-2" onClick={() => onSpeak(card.id, card.term)}>
          <SpeakerIcon /> Listen
        </button>
      )}

      {revealed ? (
        <div className="mt-4 space-y-1" aria-live="polite">
          <p className="text-lg">{card.meaning}</p>
          {card.example && (
            <p className="text-sm text-muted italic" lang="de">
              {card.example}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button type="button" className="btn-danger" disabled={saving} onClick={() => answer("again")}>
              Didn&apos;t know <kbd className="text-xs opacity-60">1</kbd>
            </button>
            <button type="button" className="btn-secondary" disabled={saving} onClick={() => answer("good")}>
              Got it <kbd className="text-xs opacity-60">2</kbd>
            </button>
            <button type="button" className="btn-primary" disabled={saving} onClick={() => answer("known")}>
              Easy <kbd className="text-xs opacity-60">3</kbd>
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted">Say the meaning out loud, or use it in a sentence, then reveal.</p>
          <button type="button" className="btn-primary mt-3" onClick={() => setRevealed(true)}>
            Show meaning <kbd className="text-xs opacity-70">Space</kbd>
          </button>
        </div>
      )}
    </section>
  );
}
