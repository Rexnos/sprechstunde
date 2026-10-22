"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ErrorBanner, Loading } from "@/components/ui/Feedback";
import { TrashIcon } from "@/components/ui/icons";
import { api, errorMessage, formatRelative } from "@/lib/client";
import { MODE_LABELS } from "@/lib/lessons";
import type { SessionDTO } from "@/lib/schemas";
import { useStartSession } from "./useStartSession";

type Page = { sessions: SessionDTO[]; nextCursor: string | null };

export function SessionList() {
  const [sessions, setSessions] = useState<SessionDTO[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const starter = useStartSession();

  const load = useCallback(async (before?: string) => {
    setError(null);
    try {
      const page = await api<Page>(`/api/sessions?limit=20${before ? `&before=${encodeURIComponent(before)}` : ""}`);
      setSessions((prev) => (before && prev ? [...prev, ...page.sessions] : page.sessions));
      setCursor(page.nextCursor);
    } catch (err) {
      setError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  async function remove(s: SessionDTO) {
    if (!window.confirm(`Delete “${s.title}” and all its messages? Vocabulary you collected is kept.`)) return;
    try {
      await api(`/api/sessions/${s.id}`, { method: "DELETE" });
      setSessions((prev) => prev?.filter((x) => x.id !== s.id) ?? null);
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="space-y-6">
      <section aria-labelledby="start-heading" className="card">
        <h2 id="start-heading" className="font-semibold">
          Start something new
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={() => starter.start("conversation")} disabled={!!starter.starting}>
            {starter.isStarting("conversation") ? "Starting…" : "Free conversation"}
          </button>
          <button type="button" className="btn-secondary" onClick={() => starter.start("vocabulary")} disabled={!!starter.starting}>
            {starter.isStarting("vocabulary") ? "Starting…" : "Vocabulary practice"}
          </button>
          <Link href="/lessons" className="btn-secondary">
            Choose a role-play…
          </Link>
        </div>
        {starter.error && (
          <div className="mt-3">
            <ErrorBanner message={starter.error} />
          </div>
        )}
      </section>

      <section aria-labelledby="history-heading">
        <h2 id="history-heading" className="mb-3 font-semibold">
          Your sessions
        </h2>
        {error && <ErrorBanner message={error} onRetry={() => load()} />}
        {!sessions && !error && <Loading />}
        {sessions?.length === 0 && <p className="text-muted">No sessions yet. Start one above.</p>}
        <ul className="space-y-2">
          {sessions?.map((s) => (
            <li key={s.id} className="card flex items-center gap-3 !py-3">
              <Link href={`/tutor?session=${s.id}`} className="min-w-0 flex-1">
                <p className="truncate font-medium">{s.title}</p>
                <p className="text-xs text-muted">
                  {MODE_LABELS[s.mode]} · {s.level} · {s.messageCount} messages · {formatRelative(s.lastActivityAt)}
                  {s.status === "completed" && " · finished"}
                </p>
              </Link>
              <Link href={`/tutor?session=${s.id}`} className="btn-secondary">
                {s.status === "completed" ? "Review" : "Continue"}
              </Link>
              <button type="button" className="btn-ghost !px-2" onClick={() => remove(s)} aria-label={`Delete ${s.title}`}>
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
        {cursor && (
          <button
            type="button"
            className="btn-secondary mt-3"
            disabled={loadingMore}
            onClick={async () => {
              setLoadingMore(true);
              await load(cursor);
              setLoadingMore(false);
            }}
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        )}
      </section>
    </div>
  );
}
