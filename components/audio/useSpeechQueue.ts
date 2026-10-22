"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Settings } from "@/lib/schemas";

type Clip = { text: string; audio: Promise<string | null> };

/**
 * Plays sentences in order as they arrive. Each sentence is synthesised as soon as it
 * is enqueued (so the next one is ready while the current one plays). If Piper fails
 * for a clip, that clip falls back to the browser's offline voice.
 */
export function useSpeechQueue(engine: Settings["ttsEngine"], rate: number) {
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const queue = useRef<Clip[]>([]);
  const playing = useRef(false);
  const generation = useRef(0);
  const abort = useRef(new AbortController());
  const audio = useRef<HTMLAudioElement | null>(null);
  const urls = useRef<string[]>([]);

  const speakBrowser = useCallback(
    (text: string) =>
      new Promise<void>((resolve) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "de-DE";
        u.rate = rate;
        const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("de"));
        if (voice) u.voice = voice;
        u.onend = u.onerror = () => resolve();
        window.speechSynthesis.speak(u);
      }),
    [rate],
  );

  const synthesize = useCallback(
    async (text: string, signal: AbortSignal): Promise<string | null> => {
      try {
        const res = await fetch("/api/speech/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.slice(0, 600), rate }),
          signal,
        });
        if (!res.ok) throw new Error((await res.json().catch(() => null))?.error?.message ?? `HTTP ${res.status}`);
        const url = URL.createObjectURL(await res.blob());
        urls.current.push(url);
        return url;
      } catch (err) {
        if ((err as Error).name !== "AbortError") setNotice(`Local voice unavailable (${(err as Error).message}); using the browser voice.`);
        return null;
      }
    },
    [rate],
  );

  const pump = useCallback(async () => {
    if (playing.current) return;
    playing.current = true;
    setSpeaking(true);
    const gen = generation.current;
    while (queue.current.length && gen === generation.current) {
      const clip = queue.current.shift()!;
      const url = await clip.audio;
      if (gen !== generation.current) break;
      if (url) {
        const el = (audio.current ??= new Audio());
        el.src = url;
        await new Promise<void>((resolve) => {
          el.onended = el.onerror = el.onpause = () => resolve();
          el.play().catch(() => resolve());
        });
        URL.revokeObjectURL(url);
        urls.current = urls.current.filter((u) => u !== url);
      } else {
        await speakBrowser(clip.text);
      }
    }
    if (gen === generation.current) {
      playing.current = false;
      setSpeaking(false);
    }
  }, [speakBrowser]);

  const enqueue = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || engine === "off") return;
      const audioUrl = engine === "piper" ? synthesize(t, abort.current.signal) : Promise.resolve(null);
      queue.current.push({ text: t, audio: audioUrl });
      void pump();
    },
    [engine, synthesize, pump],
  );

  const stop = useCallback(() => {
    generation.current++;
    abort.current.abort();
    abort.current = new AbortController();
    queue.current = [];
    playing.current = false;
    if (audio.current) {
      audio.current.onpause = null;
      audio.current.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setSpeaking(false);
  }, []);

  useEffect(() => stop, [stop]);

  return { enqueue, stop, speaking, notice, clearNotice: () => setNotice(null) };
}
