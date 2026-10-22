"use client";

import { useEffect, useRef, useState } from "react";
import type { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import type { LetterCard } from "@/lib/course";

type Audio = ReturnType<typeof usePhraseAudio>;

/**
 * Letter tiles: tap (or type the key) to hear the letter's German name and then
 * the example word. Visited letters are marked so learners can see what's left.
 */
export function AlphabetGrid({ letters, audio, onVisitedChange }: { letters: LetterCard[]; audio: Audio; onVisitedChange?: (count: number) => void }) {
  const [selected, setSelected] = useState<LetterCard | null>(null);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const run = useRef(0);
  const { play } = audio;

  async function choose(card: LetterCard) {
    const my = ++run.current;
    setSelected(card);
    const next = new Set(visited).add(card.letter);
    setVisited(next);
    onVisitedChange?.(next.size);
    await play(card.say, { key: `letter-${card.letter}` });
    if (run.current !== my) return;
    await new Promise((r) => setTimeout(r, 250));
    if (run.current === my) await play(card.example, { key: `word-${card.letter}` });
  }

  // Typing a letter on the keyboard plays that tile.
  const chooseRef = useRef(choose);
  useEffect(() => {
    chooseRef.current = choose;
  });
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea")) return;
      const card = letters.find((l) => l.letter.toLowerCase() === e.key.toLowerCase());
      if (card) void chooseRef.current(card);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [letters]);

  const speaking = (card: LetterCard) => audio.playing === `letter-${card.letter}` || audio.playing === `word-${card.letter}`;

  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7" aria-label="Letters">
        {letters.map((card) => {
          const isSel = selected?.letter === card.letter;
          return (
            <li key={card.letter}>
              <button
                type="button"
                onClick={() => choose(card)}
                aria-label={`${card.letter}, said ${card.name}, as in ${card.example}`}
                aria-pressed={isSel}
                className={`relative flex w-full flex-col items-center rounded-2xl border px-1 py-2.5 transition-[background-color,border-color,transform] duration-150 active:scale-95 ${
                  isSel ? "border-accent bg-accent-soft" : visited.has(card.letter) ? "border-border bg-surface-2" : "border-border bg-surface hover:border-accent/50"
                }`}
              >
                <span className="font-[family-name:var(--font-display)] text-3xl leading-none font-semibold" lang="de">
                  {card.letter === "ß" ? "ß" : (
                    <>
                      {card.letter}
                      <span className="text-xl text-muted">{card.letter.toLowerCase()}</span>
                    </>
                  )}
                </span>
                <span className="mt-1 text-xs text-muted" lang="de">
                  {card.name}
                </span>
                {speaking(card) && <span className="absolute top-1.5 right-1.5 size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="min-h-24 rounded-2xl bg-surface-2 px-5 py-4" aria-live="polite">
        {selected ? (
          <div className="animate-rise" key={selected.letter}>
            <p className="text-lg">
              <span className="font-semibold" lang="de">
                {selected.letter}
              </span>{" "}
              is said <span className="font-semibold" lang="de">„{selected.name}“</span>, as in{" "}
              <span className="font-semibold" lang="de">
                {selected.example}
              </span>{" "}
              <span className="text-muted">({selected.exampleEn})</span>
            </p>
            {selected.tip && <p className="mt-1 max-w-[65ch] text-sm text-muted">{selected.tip}</p>}
          </div>
        ) : (
          <p className="text-sm text-muted">Tap a letter, or type it on your keyboard, to hear its name and an example word.</p>
        )}
      </div>
    </div>
  );
}
