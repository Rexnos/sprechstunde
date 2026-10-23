"use client";

import { useEffect, useState } from "react";
import { useSpeaker } from "@/components/audio/useSpeaker";
import { UmlautBar } from "@/components/course/UmlautBar";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { SpeakerIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import type { DictEntryDTO } from "@/lib/dictionary/transform";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/schemas";
import { AddToVocabButton, ARTICLE, vocabMeaning, vocabTerm } from "./WordLookup";

type SearchResponse = { items: DictEntryDTO[]; available: boolean };

export function DictionaryBrowser() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0); // bumped by "Try again"
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const speaker = useSpeaker(settings.ttsEngine, settings.speechRate);

  useEffect(() => {
    const ctrl = new AbortController();
    const id = setTimeout(() => {
      setLoading(true);
      setError(null);
      api<SearchResponse>(`/api/dictionary?${new URLSearchParams({ q: q.trim() })}`, { signal: ctrl.signal })
        .then(setResult)
        .catch((err) => !ctrl.signal.aborted && setError(errorMessage(err)))
        .finally(() => !ctrl.signal.aborted && setLoading(false));
    }, 250); // debounce search typing
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [q, attempt]);

  useEffect(() => {
    // Deep link from a tapped word: /dictionary?q=ging
    const fromUrl = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read URL once on mount
    if (fromUrl) setQ(fromUrl);
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
  }, []);

  if (result && !result.available) return <NotImported />;

  return (
    <div className="space-y-4">
      <div className="max-w-md space-y-2">
        <label className="sr-only" htmlFor="dict-search">
          Search the dictionary
        </label>
        <input
          id="dict-search"
          type="search"
          className="input"
          placeholder="z. B. Hund, ging, schön, dog"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <UmlautBar inputId="dict-search" onInsert={(ch) => setQ((v) => v + ch)} />
      </div>

      {speaker.notice && <Notice>{speaker.notice}</Notice>}
      {error && <ErrorBanner message={error} onRetry={() => setAttempt((n) => n + 1)} />}
      {loading && !result && <Loading />}
      {result && q.trim() && !loading && result.items.length === 0 && <p className="text-muted">No entries for “{q.trim()}”.</p>}

      <ul className="space-y-2" aria-busy={loading}>
        {result?.items.map((e) => (
          <li key={e.id} className="card !py-3">
            <div className="flex flex-wrap items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-lg font-semibold" lang="de">
                    {e.gender && <span className="font-normal text-muted">{ARTICLE[e.gender]} </span>}
                    {e.word}
                  </span>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">{e.pos}</span>
                  {e.plural && (
                    <span className="text-sm text-muted" lang="de">
                      plural: die {e.plural}
                    </span>
                  )}
                  {e.ipa && <span className="text-sm text-muted">{e.ipa}</span>}
                </p>
              </div>
              {settings.ttsEngine !== "off" && (
                <button
                  type="button"
                  className="btn-ghost !px-2"
                  aria-label={`Listen to ${e.word}`}
                  onClick={() => speaker.speak(e.id, e.gender ? `${ARTICLE[e.gender]} ${e.word}` : e.word)}
                >
                  <SpeakerIcon />
                </button>
              )}
            </div>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm">
              {e.senses.map((s, i) => (
                <li key={i}>
                  {s.tags && <span className="text-xs text-muted">({s.tags.join(", ")}) </span>}
                  {s.gloss}
                  {s.example && (
                    <p className="text-muted">
                      <span className="italic" lang="de">
                        {s.example.de}
                      </span>
                      {s.example.en && <> — {s.example.en}</>}
                    </p>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-2">
              <AddToVocabButton term={vocabTerm(e)} meaning={vocabMeaning(e)} example={e.senses.find((s) => s.example)?.example?.de} compact />
            </div>
          </li>
        ))}
      </ul>

      <Attribution />
    </div>
  );
}

function NotImported() {
  return (
    <div className="space-y-4">
      <Notice tone="info">
        <p className="font-semibold text-ink">The dictionary hasn’t been imported yet.</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            Download the German extract (about 1 GB) from{" "}
            <a className="underline" href="https://kaikki.org/dictionary/German/" target="_blank" rel="noreferrer">
              kaikki.org/dictionary/German
            </a>{" "}
            into the project’s <code>data</code> folder.
          </li>
          <li>
            Run <code>npm run dict:import -- data/kaikki.org-dictionary-German.jsonl</code>, or with Docker{" "}
            <code>scripts/docker-dictionary.ps1 data/kaikki.org-dictionary-German.jsonl</code>.
          </li>
          <li>Reload this page.</li>
        </ol>
      </Notice>
      <Attribution />
    </div>
  );
}

function Attribution() {
  return (
    <p className="text-xs text-muted">
      Data:{" "}
      <a className="underline" href="https://en.wiktionary.org/" target="_blank" rel="noreferrer">
        Wiktionary
      </a>{" "}
      (via kaikki.org),{" "}
      <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">
        CC BY-SA 4.0
      </a>
      .
    </p>
  );
}
