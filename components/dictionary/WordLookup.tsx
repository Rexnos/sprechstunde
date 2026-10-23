"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon, PlusIcon, SpeakerIcon } from "@/components/ui/icons";
import { api, ApiClientError, errorMessage } from "@/lib/client";
import type { DictEntryDTO, Gender } from "@/lib/dictionary/transform";
import { storyTokens } from "@/lib/stories";

export const ARTICLE: Record<Gender, string> = { m: "der", f: "die", n: "das" };

const PUNCT = /[„“”"'.,!?:;()…–-]/g;

/** How a dictionary entry is saved as a card: nouns with their article ("der Hund"). */
export const vocabTerm = (e: DictEntryDTO) => (e.gender ? `${ARTICLE[e.gender]} ${e.word}` : e.word);
/** The first meaning, short enough for a flash card. */
export const vocabMeaning = (e: DictEntryDTO) => (e.senses[0]?.gloss.split(";")[0] ?? "").trim().slice(0, 160);

type Lookup = { items: DictEntryDTO[]; available: boolean };
// Tapping the same word again (or in the next sentence) shouldn't ask the server twice.
const lookups = new Map<string, Promise<Lookup>>();
function lookUp(word: string): Promise<Lookup> {
  const key = word.toLowerCase();
  let p = lookups.get(key);
  if (!p) {
    p = api<Lookup>(`/api/dictionary?${new URLSearchParams({ q: word, limit: "3" })}`);
    p.catch(() => lookups.delete(key));
    lookups.set(key, p);
  }
  return p;
}

/** Saves one word to Vocabulary; says so if it's already there. */
export function AddToVocabButton({ term, meaning, example = "", compact }: { term: string; meaning: string; example?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "saving" | "added" | "exists">("idle");
  const [error, setError] = useState<string | null>(null);

  async function add() {
    setState("saving");
    setError(null);
    try {
      await api("/api/vocabulary", { method: "POST", json: { term: term.slice(0, 80), meaning: meaning.slice(0, 160), example: example.slice(0, 240) } });
      setState("added");
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 409) setState("exists");
      else {
        setState("idle");
        setError(errorMessage(err));
      }
    }
  }

  if (state === "added" || state === "exists") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-ok" role="status">
        <CheckIcon width={14} height={14} /> {state === "added" ? "Added to Vocabulary" : "Already in Vocabulary"}
      </span>
    );
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button type="button" className={`btn-ghost ${compact ? "!px-2 !py-1 text-xs" : ""}`} onClick={add} disabled={state === "saving"} aria-label={`Add ${term} to Vocabulary`}>
        <PlusIcon width={compact ? 14 : 18} height={compact ? 14 : 18} />
        {state === "saving" ? "Adding…" : "Add to Vocabulary"}
      </button>
      {error && <span className="text-xs text-danger">{error}</span>}
    </span>
  );
}

type PopupProps = {
  /** The word as tapped, without punctuation. */
  word: string;
  /** The sentence it came from; saved as the card's example. */
  sentence: string;
  /** A meaning from the material itself (story glossary, word-by-word gloss), shown first. */
  hint?: string;
  onListen?: (word: string) => void;
};

/** Meaning of a tapped word: the material's own gloss plus the offline dictionary. */
export function WordPopup({ word, sentence, hint, onListen }: PopupProps) {
  const [result, setResult] = useState<Lookup | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    lookUp(word)
      .then((r) => live && setResult(r))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [word]);

  const entries = result?.items ?? [];
  const loading = !result && !failed;
  return (
    <div className="animate-rise mt-2 max-w-md space-y-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink" role="status" aria-live="polite">
      <p className="flex flex-wrap items-center gap-2">
        <span className="font-semibold" lang="de">
          {word}
        </span>
        {hint && <span className="text-muted">{hint}</span>}
        {onListen && (
          <button type="button" onClick={() => onListen(word)} className="text-muted hover:text-ink" aria-label={`Listen to ${word}`}>
            <SpeakerIcon width={14} height={14} />
          </button>
        )}
      </p>

      {loading && <p className="animate-pulse text-xs text-muted">Looking it up…</p>}

      {entries.map((e) => (
        <div key={e.id} className="border-t border-border pt-2">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold" lang="de">
              {vocabTerm(e)}
            </span>
            <span className="text-xs text-muted">{e.pos}</span>
            {e.plural && (
              <span className="text-xs text-muted" lang="de">
                pl. {e.plural}
              </span>
            )}
          </p>
          <p className="text-muted">
            {e.senses
              .slice(0, 2)
              .map((s) => s.gloss)
              .join(" · ")}
          </p>
          <AddToVocabButton term={vocabTerm(e)} meaning={vocabMeaning(e)} example={sentence} compact />
        </div>
      ))}

      {result && entries.length === 0 && hint && <AddToVocabButton term={word} meaning={hint} example={sentence} compact />}
      {result && entries.length === 0 && !hint && <p className="text-xs text-muted">{result.available ? "Not in the dictionary." : "No meaning available here."}</p>}

      {result && (
        <p className="text-xs">
          {result.available ? (
            <Link href={`/dictionary?${new URLSearchParams({ q: word })}`} className="text-muted underline underline-offset-2 hover:text-ink">
              Open in Dictionary
            </Link>
          ) : (
            <Link href="/dictionary" className="text-muted underline underline-offset-2 hover:text-ink">
              Import the dictionary to look up any word
            </Link>
          )}
        </p>
      )}
      {failed && <p className="text-xs text-danger">Couldn&apos;t look that up. Is the app server still running?</p>}
    </div>
  );
}

type TappableProps = {
  text: string;
  /** Classes for the text paragraph. */
  className?: string;
  /** Meanings from the material, keyed by lower-case word without punctuation. */
  glossary?: Record<string, string>;
  onListen?: (word: string) => void;
};

/** German text where every word can be tapped for its meaning; the popup opens below the text. */
export function TappableText({ text, className = "", glossary, onListen }: TappableProps) {
  const [selected, setSelected] = useState<{ index: number; key: string; word: string } | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div>
      <p className={className} lang="de">
        {storyTokens(text).map((t, i) =>
          t.key && !/[{}]/.test(t.key) ? (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(selected?.index === i ? null : { index: i, key: t.key!, word: t.text.replace(PUNCT, "") })}
              aria-expanded={selected?.index === i}
              className={`rounded px-0.5 text-left underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent/60 ${
                selected?.index === i ? "bg-accent-soft decoration-accent" : ""
              }`}
            >
              {t.text}
            </button>
          ) : (
            <span key={i}>{t.text}</span>
          ),
        )}
      </p>
      {selected && <WordPopup key={selected.index} word={selected.word} sentence={text} hint={glossary?.[selected.key]} onListen={onListen} />}
    </div>
  );
}
