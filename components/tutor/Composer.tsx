"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRecorder } from "@/components/audio/useRecorder";
import { MicIcon, SendIcon, StopIcon } from "@/components/ui/icons";
import { api, errorMessage } from "@/lib/client";

type Props = {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
  onSend: (text: string, inputMethod: "text" | "voice") => Promise<boolean>;
};

type TranscribeResponse = { text: string; duration: number; lowConfidence: boolean };

const BAR_WEIGHTS = [0.45, 0.7, 0.9, 1, 0.85, 0.65, 0.4];

export function Composer({ value, onChange, disabled, onSend }: Props) {
  const [fromVoice, setFromVoice] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [lowConfidence, setLowConfidence] = useState(false);
  const [sttError, setSttError] = useState<string | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const onLevel = useCallback((level: number) => {
    bars.current.forEach((bar, i) => {
      if (bar) bar.style.transform = `scaleY(${Math.max(0.12, level * BAR_WEIGHTS[i])})`;
    });
  }, []);

  const recorder = useRecorder(async (audio) => {
    setTranscribing(true);
    setSttError(null);
    try {
      const form = new FormData();
      form.append("audio", audio, "recording");
      const res = await api<TranscribeResponse>("/api/speech/transcribe", { method: "POST", body: form });
      const prev = valueRef.current.trim();
      // The transcript goes into the box for review; it is never sent automatically.
      onChange(prev ? `${prev} ${res.text}` : res.text);
      setFromVoice(true);
      setLowConfidence(res.lowConfidence);
      requestAnimationFrame(() => textarea.current?.focus());
    } catch (err) {
      setSttError(errorMessage(err));
    } finally {
      setTranscribing(false);
    }
  }, onLevel);

  const recording = recorder.state === "recording";
  const busy = disabled || transcribing;
  const { start, stop } = recorder;

  // Space toggles recording when focus is not in a text field or on a control.
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.code !== "Space" || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.closest("input, textarea, select, button, a, [contenteditable=true], summary") || t.isContentEditable)) return;
      e.preventDefault();
      if (recording) stop();
      else if (!busy) void start();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recording, busy, start, stop]);

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    const message = value.trim();
    if (!message || busy) return;
    const ok = await onSend(message, fromVoice ? "voice" : "text");
    if (ok) {
      setFromVoice(false);
      setLowConfidence(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void submit();
    }
    if (e.key === "Escape") e.currentTarget.blur(); // hand Space back to push-to-talk
  }

  const error = recorder.error ?? sttError;
  const reviewHint = fromVoice && value && !recording && !transcribing;

  return (
    <form onSubmit={submit} className="space-y-2">
      {error && (
        <p role="alert" className="animate-rise rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div
        className={`rounded-3xl border bg-surface p-2 shadow-[0_1px_0_oklch(0_0_0/0.03),0_8px_24px_-12px_oklch(0.3_0.03_50/0.18)] transition-colors ${
          recording ? "border-accent/50" : "border-border focus-within:border-accent/40"
        }`}
      >
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={recording ? stop : start}
            disabled={busy && !recording}
            aria-pressed={recording}
            aria-label={recording ? "Stop recording" : "Start recording"}
            className={`relative grid size-14 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-150 active:scale-95 disabled:opacity-45 ${
              recording ? "bg-ink text-bg" : "bg-accent text-accent-ink hover:brightness-105"
            }`}
          >
            {recording && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" aria-hidden />}
            {recording ? <StopIcon width={22} height={22} /> : <MicIcon width={24} height={24} />}
          </button>

          {recording || transcribing ? (
            <div className="flex min-h-14 flex-1 items-center gap-4 px-2" role="status" aria-live="polite">
              {recording ? (
                <>
                  <span className="flex h-8 items-center gap-1" aria-hidden>
                    {BAR_WEIGHTS.map((_, i) => (
                      <span
                        key={i}
                        ref={(el) => {
                          bars.current[i] = el;
                        }}
                        className="h-full w-1 origin-center rounded-full bg-accent transition-transform duration-75"
                        style={{ transform: "scaleY(0.12)" }}
                      />
                    ))}
                  </span>
                  <span className="text-sm font-medium tabular-nums">
                    {formatSeconds(recorder.seconds)}
                    <span className="text-muted"> / {formatSeconds(recorder.maxSeconds)}</span>
                  </span>
                  <span className="hidden text-sm text-muted sm:inline">Listening. Press Space or the button when you are done.</span>
                  <button type="button" className="btn-ghost ml-auto" onClick={recorder.cancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <span className="flex items-center gap-3 text-sm text-muted">
                  <span className="dot-breathe flex gap-1" aria-hidden>
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="size-1.5 rounded-full bg-muted" />
                  </span>
                  Writing down what you said…
                </span>
              )}
            </div>
          ) : (
            <>
              <label className="sr-only" htmlFor="composer">
                Your message in German
              </label>
              <textarea
                ref={textarea}
                id="composer"
                rows={1}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  if (!e.target.value) setFromVoice(false);
                }}
                onKeyDown={onKeyDown}
                maxLength={1000}
                placeholder="Speak, or type in German"
                className="field-sizing-content max-h-40 min-h-14 flex-1 resize-none bg-transparent px-2 py-4 text-base leading-snug outline-none placeholder:text-muted"
                lang="de"
              />
              <button type="submit" className="btn-primary mb-1.5 size-11 shrink-0 !p-0" disabled={busy || !value.trim()} aria-label="Send">
                <SendIcon width={18} height={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="min-h-5 px-2 text-xs text-muted" aria-live="polite">
        {reviewHint ? (
          <span className={lowConfidence ? "text-warn" : undefined}>
            {lowConfidence
              ? "The recognizer was unsure. Check the text carefully before sending."
              : "Check what was heard, fix anything that's wrong, then press Enter."}
          </span>
        ) : !recording && !transcribing ? (
          <>
            <Kbd>Space</Kbd> to talk · <Kbd>Enter</Kbd> to send · <Kbd>Shift</Kbd>+<Kbd>Enter</Kbd> new line
          </>
        ) : null}
      </p>
    </form>
  );
}

function Kbd({ children }: { children: string }) {
  return <kbd className="rounded border border-border bg-surface-2 px-1 py-px font-sans text-[11px] text-ink">{children}</kbd>;
}

function formatSeconds(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
