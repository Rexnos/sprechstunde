"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecorder } from "@/components/audio/useRecorder";
import { MicIcon, StopIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";
import { scoreSpoken, type SpokenScore } from "@/lib/course/scoring";

type Props = {
  target: string;
  accept?: string[];
  /** Hide the target words until the learner has tried (guided conversation). */
  hideTarget?: boolean;
  /** Called with the score and the text the recognizer heard. */
  onPass: (score: SpokenScore, heard: string) => void;
  onSkip: () => void;
};

/**
 * Record → transcribe → compare with the target. Shows which target words the
 * recognizer heard. This checks words, not pronunciation, and says so.
 */
export function SpeakCheck({ target, accept, hideTarget, onPass, onSkip }: Props) {
  const [result, setResult] = useState<(SpokenScore & { heard: string }) | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const ring = useRef<HTMLSpanElement | null>(null);

  const onLevel = useCallback((level: number) => {
    if (ring.current) ring.current.style.transform = `scale(${1 + level * 0.5})`;
  }, []);

  const recorder = useRecorder(async (audio) => {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("audio", audio, "recording");
      const res = await api<{ text: string }>("/api/speech/transcribe", { method: "POST", body: form });
      const score = scoreSpoken(res.text, target, accept);
      setResult({ ...score, heard: res.text });
      setTries((t) => t + 1);
    } catch (err) {
      const msg = errorMessage(err);
      setError(/no speech|too short|empty/i.test(msg) ? "Didn't hear anything. Try again a little louder and closer to the mic." : msg);
    } finally {
      setBusy(false);
    }
  }, onLevel);

  const recording = recorder.state === "recording";
  const { start, stop } = recorder;

  // Space toggles recording.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space" || e.repeat) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, button, a")) return;
      e.preventDefault();
      if (recording) stop();
      else if (!busy) void start();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recording, busy, start, stop]);

  const passed = result?.passed ?? false;
  const showWords = result || !hideTarget;
  const words = result?.words ?? target.split(/\s+/).map((w) => ({ word: w, heard: false, slot: /\{/.test(w) }));

  return (
    <div className="space-y-4">
      {showWords && (
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-2xl leading-snug font-semibold" lang="de" aria-live="polite">
          {words.map((w, i) => (
            <span
              key={i}
              className={`rounded-md px-1 transition-colors duration-300 ${
                !result ? "" : w.heard ? "bg-ok-soft text-ok" : "bg-warn-soft text-warn"
              } ${w.slot ? "italic opacity-80" : ""}`}
            >
              {w.slot ? `(your ${w.word.replace(/[{}.,!?]/g, "")})` : w.word}
            </span>
          ))}
        </p>
      )}

      {result && (
        <p className="text-sm text-muted">
          Heard: <span lang="de" className="text-ink">“{result.heard}”</span>
          {passed ? (
            <span className="ml-2 font-semibold text-ok">Gut gemacht!</span>
          ) : (
            <span className="ml-2 text-warn">Some words weren&apos;t recognised. Listen again and retry.</span>
          )}
        </p>
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
      {recorder.error && <p className="text-sm text-danger">{recorder.error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <span className="relative grid size-16 place-items-center">
          <span ref={ring} className={`absolute inset-0 rounded-full bg-accent/20 transition-transform duration-75 ${recording ? "" : "hidden"}`} aria-hidden />
          <button
            type="button"
            onClick={recording ? stop : start}
            disabled={busy}
            aria-label={recording ? "Stop recording" : "Record yourself"}
            className={`relative grid size-14 place-items-center rounded-full transition-[background-color,transform] active:scale-95 disabled:opacity-40 ${
              recording ? "bg-ink text-bg" : "bg-accent text-accent-ink hover:brightness-105"
            }`}
          >
            {recording ? <StopIcon width={20} height={20} /> : <MicIcon width={24} height={24} />}
          </button>
        </span>
        <span className="text-sm text-muted">
          {recording ? "Listening… press Space or the button when done" : busy ? "Checking…" : result ? "Press Space to try again" : "Press Space or the button, then speak"}
        </span>
        <span className="ml-auto flex gap-2">
          {passed ? (
            <button type="button" className="btn-primary" onClick={() => onPass(result!, result!.heard)} autoFocus>
              Continue
            </button>
          ) : (
            <button type="button" className="btn-ghost" onClick={onSkip}>
              {tries >= 2 ? "Move on" : "Skip"}
            </button>
          )}
        </span>
      </div>
      <p className="text-xs text-muted">This checks which words the speech recognizer understood. It is not a pronunciation score.</p>
    </div>
  );
}
