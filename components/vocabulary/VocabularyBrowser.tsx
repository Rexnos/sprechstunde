"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useSpeaker } from "@/components/audio/useSpeaker";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { PlusIcon, SpeakerIcon, TrashIcon } from "@/components/ui/icons";
import { api, errorMessage, formatRelative } from "@/lib/client";
import { DEFAULT_SETTINGS, type ReviewState, type Settings, type VocabDTO } from "@/lib/schemas";
import { ReviewQueue } from "./ReviewQueue";

type ListResponse = { items: VocabDTO[]; total: number };
const PAGE = 50;

const STATE_STYLE: Record<ReviewState, string> = {
  new: "bg-accent-soft text-accent",
  learning: "bg-warn-soft text-warn",
  known: "bg-ok-soft text-ok",
};

export function VocabularyBrowser() {
  const [tab, setTab] = useState<"list" | "review">("list");
  const [q, setQ] = useState("");
  const [state, setState] = useState<ReviewState | "">("");
  const [items, setItems] = useState<VocabDTO[] | null>(null);
  const [total, setTotal] = useState(0);
  const [due, setDue] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const speaker = useSpeaker(settings.ttsEngine, settings.speechRate);

  const load = useCallback(
    async (skip = 0) => {
      setError(null);
      try {
        const params = new URLSearchParams({ limit: String(PAGE), skip: String(skip) });
        if (q.trim()) params.set("q", q.trim());
        if (state) params.set("state", state);
        const [res, dueRes] = await Promise.all([api<ListResponse>(`/api/vocabulary?${params}`), api<ListResponse>("/api/vocabulary?due=1&limit=1")]);
        setItems((prev) => (skip && prev ? [...prev, ...res.items] : res.items));
        setTotal(res.total);
        setDue(dueRes.total);
      } catch (err) {
        setError(errorMessage(err));
      }
    },
    [q, state],
  );

  useEffect(() => {
    const id = setTimeout(() => void load(), 250); // debounce search typing
    return () => clearTimeout(id);
  }, [load]);

  useEffect(() => {
    // Deep link from the dashboard: /vocabulary?tab=review
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read URL once on mount
    if (new URLSearchParams(window.location.search).get("tab") === "review") setTab("review");
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
  }, []);

  async function mark(item: VocabDTO, result: "again" | "known") {
    try {
      const res = await api<{ item: VocabDTO }>(`/api/vocabulary/${item.id}`, { method: "PATCH", json: { result } });
      setItems((prev) => prev?.map((x) => (x.id === item.id ? res.item : x)) ?? null);
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  async function remove(item: VocabDTO) {
    if (!window.confirm(`Remove “${item.term}” from your list?`)) return;
    try {
      await api(`/api/vocabulary/${item.id}`, { method: "DELETE" });
      setItems((prev) => prev?.filter((x) => x.id !== item.id) ?? null);
      setTotal((t) => t - 1);
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Vocabulary view" className="inline-flex rounded-xl border border-border bg-surface p-1">
        {(["list", "review"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => {
              setTab(t);
              if (t === "list") void load();
            }}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium ${tab === t ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}
          >
            {t === "list" ? "All words" : `Review queue${due ? ` (${due})` : ""}`}
          </button>
        ))}
      </div>

      {speaker.notice && <Notice>{speaker.notice}</Notice>}

      {tab === "review" ? (
        <ReviewQueue onSpeak={(id, text) => speaker.speak(id, text)} canSpeak={settings.ttsEngine !== "off"} />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="vocab-search">
              Search vocabulary
            </label>
            <input id="vocab-search" className="input max-w-xs" placeholder="Search words, meanings, examples" value={q} onChange={(e) => setQ(e.target.value)} />
            <label className="sr-only" htmlFor="vocab-state">
              Filter by status
            </label>
            <select id="vocab-state" className="input w-auto" value={state} onChange={(e) => setState(e.target.value as ReviewState | "")}>
              <option value="">All statuses</option>
              <option value="new">New</option>
              <option value="learning">Needs practice</option>
              <option value="known">Known</option>
            </select>
          </div>

          <AddWord onAdded={() => load()} />

          {error && <ErrorBanner message={error} onRetry={() => load()} />}
          {!items && !error && <Loading />}
          {items?.length === 0 && <p className="text-muted">No words yet. New words from your conversations appear here automatically.</p>}

          <ul className="space-y-2">
            {items?.map((v) => (
              <li key={v.id} className="card flex flex-wrap items-start gap-3 !py-3">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold" lang="de">
                      {v.term}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATE_STYLE[v.reviewState]}`}>
                      {v.reviewState === "learning" ? "needs practice" : v.reviewState}
                    </span>
                  </p>
                  <p className="text-sm">{v.meaning}</p>
                  {v.example && (
                    <p className="text-sm text-muted italic" lang="de">
                      {v.example}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted">
                    Added {formatRelative(v.createdAt)}
                    {v.lastReviewedAt && ` · reviewed ${formatRelative(v.lastReviewedAt)}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {settings.ttsEngine !== "off" && (
                    <button type="button" className="btn-ghost !px-2" aria-label={`Listen to ${v.term}`} onClick={() => speaker.speak(v.id, v.example || v.term)}>
                      <SpeakerIcon />
                    </button>
                  )}
                  <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={() => mark(v, "again")}>
                    Needs practice
                  </button>
                  <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={() => mark(v, "known")}>
                    I know it
                  </button>
                  <button type="button" className="btn-ghost !px-2" aria-label={`Delete ${v.term}`} onClick={() => remove(v)}>
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {items && items.length < total && (
            <button type="button" className="btn-secondary" onClick={() => load(items.length)}>
              Load more ({total - items.length} left)
            </button>
          )}
        </>
      )}
    </div>
  );
}

function AddWord({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api("/api/vocabulary", { method: "POST", json: { term, meaning, example } });
      setTerm("");
      setMeaning("");
      setExample("");
      setOpen(false);
      onAdded();
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn-ghost" onClick={() => setOpen(true)}>
        <PlusIcon /> Add a word
      </button>
    );
  }
  return (
    <form onSubmit={submit} className="card grid gap-3 sm:grid-cols-3">
      <div>
        <label className="label" htmlFor="new-term">
          German
        </label>
        <input id="new-term" className="input" required maxLength={80} value={term} onChange={(e) => setTerm(e.target.value)} lang="de" />
      </div>
      <div>
        <label className="label" htmlFor="new-meaning">
          Meaning
        </label>
        <input id="new-meaning" className="input" required maxLength={160} value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="new-example">
          Example (optional)
        </label>
        <input id="new-example" className="input" maxLength={240} value={example} onChange={(e) => setExample(e.target.value)} lang="de" />
      </div>
      {error && <p className="text-sm text-danger sm:col-span-3">{error}</p>}
      <div className="flex gap-2 sm:col-span-3">
        <button type="submit" className="btn-primary">
          Save
        </button>
        <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
