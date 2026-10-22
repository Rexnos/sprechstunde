"use client";

import { ErrorBanner, Loading } from "@/components/ui/Feedback";
import type { ServiceStatus } from "@/lib/schemas";
import { useHealth } from "./useHealth";

const FIXES: Record<string, string> = {
  database: "Start MongoDB: open Services (services.msc) and start “MongoDB Server”, or run `net start MongoDB` in an admin PowerShell.",
  llm: "Start Ollama from the Start menu, then run `ollama pull <model>` for the model shown in Settings.",
  stt: "Start the speech service from the project folder: `powershell -ExecutionPolicy Bypass -File scripts/start-speech.ps1` (or use scripts/start-all.ps1).",
  tts: "Start the speech service (see above), or switch Speech output to “Browser voice” in Settings.",
};

/** Renders `backtick` segments as inline code. */
function FixText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") ? (
          <code key={i} className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs break-all">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function StatusPanel() {
  const { health, error, checking, refresh } = useHealth(10_000);

  if (error) return <ErrorBanner message={error} onRetry={refresh} />;
  if (!health) return <Loading label="Checking local services…" />;

  const rows: { key: string; name: string; status: ServiceStatus; extra?: string }[] = [
    { key: "app", name: "App server (Next.js)", status: health.app },
    { key: "database", name: "Database (MongoDB)", status: health.database },
    { key: "llm", name: "AI tutor (Ollama)", status: health.llm, extra: health.llm.models.length ? `Installed models: ${health.llm.models.join(", ")}` : undefined },
    { key: "stt", name: "Speech recognition (faster-whisper)", status: health.stt },
    {
      key: "tts",
      name: `Speech output (${health.tts.engine})`,
      status: health.tts,
      extra: health.tts.voices.length ? `Voices: ${health.tts.voices.join(", ")}` : undefined,
    },
  ];

  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.key} className="card flex gap-4">
            <span className={`mt-1.5 inline-block size-3 shrink-0 rounded-full ${r.status.ok ? "bg-ok" : "bg-danger"}`} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {r.name} <span className="sr-only">{r.status.ok ? "ready" : "unavailable"}</span>
              </p>
              <p className="text-sm break-words text-muted">{r.status.detail}</p>
              {r.extra && <p className="mt-1 text-xs break-words text-muted">{r.extra}</p>}
              {r.key === "llm" && health.llm.gpuPercent !== null && health.llm.gpuPercent < 100 && (
                <p className="mt-2 text-sm text-warn">
                  The model doesn&apos;t fit in GPU memory, so part of it runs on the CPU and replies are slower. Close other GPU apps, or choose a
                  smaller model in Settings.
                </p>
              )}
              {!r.status.ok && FIXES[r.key] && (
                <p className="mt-2 text-sm">
                  <FixText text={FIXES[r.key]} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 text-xs text-muted">
        <button type="button" className="btn-secondary" onClick={refresh} disabled={checking}>
          {checking ? "Checking…" : "Check again"}
        </button>
        Last checked {new Date(health.checkedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
