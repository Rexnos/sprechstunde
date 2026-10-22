"use client";

import Link from "next/link";
import { useHealth } from "./useHealth";

export function StatusIndicator() {
  const { health, error } = useHealth();
  const items = health
    ? [
        { label: "Database", ok: health.database.ok },
        { label: "AI model", ok: health.llm.ok },
        { label: "Speech input", ok: health.stt.ok },
        { label: "Speech output", ok: health.tts.ok },
      ]
    : [];
  const down = items.filter((i) => !i.ok);
  const state = error ? "error" : !health ? "loading" : down.length ? "degraded" : "ok";

  const text = {
    loading: "Checking services…",
    error: "App server unreachable",
    degraded: `${down.map((d) => d.label).join(", ")} unavailable`,
    ok: "All local services ready",
  }[state];
  const dot = { loading: "bg-muted", error: "bg-danger", degraded: "bg-warn", ok: "bg-ok" }[state];

  return (
    <Link href="/status" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted hover:bg-surface-2" aria-live="polite">
      <span className={`inline-block size-2.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      <span>{text}</span>
    </Link>
  );
}
