"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_SECONDS = 60;
// Browsers differ: Chrome/Edge → webm/opus, Firefox → ogg/opus or webm, Safari → mp4.
const CANDIDATE_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];

export type RecorderState = "idle" | "requesting" | "recording" | "unsupported";

export function pickMimeType(isSupported: (t: string) => boolean): string | undefined {
  return CANDIDATE_TYPES.find((t) => isSupported(t));
}

type Meter = { ctx: AudioContext; raf: number };

function startMeter(stream: MediaStream, onLevel: (level: number) => void, current: () => Meter | null): Meter | null {
  if (typeof AudioContext === "undefined") return null;
  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  ctx.createMediaStreamSource(stream).connect(analyser);
  const buf = new Uint8Array(analyser.fftSize);
  const m: Meter = { ctx, raf: 0 };
  const tick = () => {
    analyser.getByteTimeDomainData(buf);
    let sum = 0;
    for (const v of buf) sum += ((v - 128) / 128) ** 2;
    // Speech RMS is small; scale so normal talking fills most of the meter.
    onLevel(Math.min(1, Math.sqrt(sum / buf.length) * 4));
    if (current() === m) m.raf = requestAnimationFrame(tick);
  };
  m.raf = requestAnimationFrame(tick);
  return m;
}

/**
 * Push-to-talk recorder. `onLevel` receives the input loudness (0..1) on every
 * animation frame while recording, so callers can drive a meter without re-rendering.
 */
export function useRecorder(onRecorded: (audio: Blob) => void, onLevel?: (level: number) => void) {
  const [state, setState] = useState<RecorderState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelled = useRef(false);
  const meter = useRef<Meter | null>(null);
  const onRecordedRef = useRef(onRecorded);
  const onLevelRef = useRef(onLevel);
  useEffect(() => {
    onRecordedRef.current = onRecorded;
    onLevelRef.current = onLevel;
  }, [onRecorded, onLevel]);

  const cleanup = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    if (meter.current) {
      cancelAnimationFrame(meter.current.raf);
      void meter.current.ctx.close();
      meter.current = null;
    }
    onLevelRef.current?.(0);
    recorder.current?.stream.getTracks().forEach((t) => t.stop());
    recorder.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const stop = useCallback(() => {
    if (recorder.current?.state === "recording") recorder.current.stop();
  }, []);

  const cancel = useCallback(() => {
    cancelled.current = true;
    stop();
  }, [stop]);

  const start = useCallback(async () => {
    setError(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setState("unsupported");
      setError("This browser cannot record audio. Use a current version of Chrome, Edge or Firefox.");
      return;
    }
    if (!window.isSecureContext) {
      setError("Microphone access needs a secure context. Open the app via http://127.0.0.1:3000 or http://localhost:3000 on this PC.");
      return;
    }
    setState("requesting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    } catch (err) {
      setState("idle");
      const name = (err as DOMException).name;
      setError(
        name === "NotAllowedError"
          ? "Microphone permission was denied. Allow it via the lock icon in the address bar, then try again."
          : name === "NotFoundError"
            ? "No microphone was found. Connect one and check Windows sound settings."
            : `Could not start the microphone (${name}).`,
      );
      return;
    }

    const mimeType = pickMimeType((t) => MediaRecorder.isTypeSupported(t));
    const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    chunks.current = [];
    cancelled.current = false;
    rec.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };
    rec.onstop = () => {
      const blob = new Blob(chunks.current, { type: rec.mimeType || mimeType || "audio/webm" });
      cleanup();
      setState("idle");
      setSeconds(0);
      if (!cancelled.current) onRecordedRef.current(blob);
    };
    recorder.current = rec;
    if (onLevelRef.current) meter.current = startMeter(stream, (level) => onLevelRef.current?.(level), () => meter.current);
    rec.start();
    setState("recording");
    setSeconds(0);
    const startedAt = Date.now();
    timer.current = setInterval(() => {
      const s = Math.floor((Date.now() - startedAt) / 1000);
      setSeconds(s);
      if (s >= MAX_SECONDS) rec.stop();
    }, 250);
  }, [cleanup]);

  return { state, error, seconds, maxSeconds: MAX_SECONDS, start, stop, cancel, clearError: () => setError(null) };
}
