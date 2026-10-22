"use client";

import { useEffect, useRef, useState } from "react";
import { api, errorMessage } from "@/lib/client";
import type { GeneratedDTO } from "@/lib/schemas";

type Props = {
  body: Record<string, unknown>;
  label: string;
  busyLabel: string;
  onCreated: (item: GeneratedDTO) => void;
  className?: string;
  /** Start generating immediately (e.g. when practice material runs out). */
  autoStart?: boolean;
};

/**
 * Asks the local AI model for new practice content. Generation can take a minute or
 * more on modest hardware, so it shows elapsed time and can be cancelled.
 */
export function GenerateButton({ body, label, busyLabel, onCreated, className = "btn-secondary", autoStart }: Props) {
  const [busySince, setBusySince] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  async function run() {
    if (abort.current) return;
    const ctrl = new AbortController();
    abort.current = ctrl;
    setError(null);
    const started = Date.now();
    setBusySince(started);
    setNow(started);
    try {
      const { item } = await api<{ item: GeneratedDTO }>("/api/practice/generate", { method: "POST", json: body, signal: ctrl.signal });
      onCreated(item);
    } catch (err) {
      if ((err as Error).name !== "AbortError") setError(errorMessage(err));
    } finally {
      abort.current = null;
      setBusySince(null);
    }
  }

  useEffect(() => {
    if (!busySince) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [busySince]);

  const started = useRef(false);
  useEffect(() => {
    if (autoStart && !started.current) {
      started.current = true;
      void run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start once
  }, [autoStart]);

  useEffect(() => () => abort.current?.abort(), []);

  const seconds = busySince ? Math.floor((now - busySince) / 1000) : 0;

  return (
    <div className="space-y-2">
      {busySince ? (
        <div className="flex flex-wrap items-center gap-3 text-sm" role="status">
          <span className="dot-breathe flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-accent" />
            <span className="size-2 rounded-full bg-accent" />
            <span className="size-2 rounded-full bg-accent" />
          </span>
          <span>
            {busyLabel} {seconds}s
          </span>
          {seconds > 30 && <span className="text-xs text-muted">The local model is working; this can take a few minutes on this PC.</span>}
          <button type="button" className="btn-ghost !py-1" onClick={() => abort.current?.abort()}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className={className} onClick={run}>
          {label}
        </button>
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export function AiBadge() {
  return (
    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted uppercase" title="Written by the local AI model; may contain mistakes">
      AI
    </span>
  );
}
