"use client";

import { useState } from "react";
import { ErrorBanner, Notice } from "@/components/ui/Feedback";
import { api, errorMessage } from "@/lib/client";

export function DataControls() {
  const [sessions, setSessions] = useState(true);
  const [vocabulary, setVocabulary] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function remove() {
    setError(null);
    setDone(false);
    try {
      await api("/api/data", { method: "DELETE", json: { sessions, vocabulary, confirm } });
      setDone(true);
      setConfirm("");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <section className="card space-y-4" aria-labelledby="data-h">
      <h2 id="data-h" className="font-semibold">
        Your data
      </h2>
      <p className="text-sm text-muted">
        Everything is stored in the local MongoDB database on this PC (database <code>local_language_tutor</code>). Nothing is sent to the internet.
      </p>
      <a href="/api/data" className="btn-secondary" download>
        Export everything (JSON)
      </a>

      <div className="space-y-3 rounded-xl border border-danger/30 p-4">
        <h3 className="font-semibold text-danger">Delete history</h3>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sessions} onChange={(e) => setSessions(e.target.checked)} className="size-4" />
          All sessions and messages
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={vocabulary} onChange={(e) => setVocabulary(e.target.checked)} className="size-4" />
          All vocabulary
        </label>
        <div>
          <label htmlFor="confirm-delete" className="label">
            Type DELETE to confirm
          </label>
          <input id="confirm-delete" className="input max-w-40" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
        </div>
        <button type="button" className="btn-danger" disabled={confirm !== "DELETE" || (!sessions && !vocabulary)} onClick={remove}>
          Delete permanently
        </button>
        {error && <ErrorBanner message={error} />}
        {done && <Notice tone="ok">Deleted. Consider exporting regularly if you want a backup.</Notice>}
      </div>
    </section>
  );
}
