"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Settings } from "@/lib/schemas";

// Lessons replay the same phrases many times; keep synthesised clips for the session.
const cache = new Map<string, Promise<string | null>>();

/**
 * Plays short phrases at a chosen speed and resolves when playback has finished.
 * Uses Piper through the app; falls back to the browser's offline German voice.
 */
export function usePhraseAudio(engine: Settings["ttsEngine"], baseRate: number) {
  const [playing, setPlaying] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const token = useRef(0);

  const stop = useCallback(() => {
    token.current++;
    if (audio.current) {
      audio.current.onended = audio.current.onerror = null;
      audio.current.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(null);
  }, []);

  useEffect(() => stop, [stop]);

  const play = useCallback(
    async (text: string, opts: { slow?: boolean; key?: string } = {}): Promise<void> => {
      stop();
      if (engine === "off" || !text.trim()) return;
      const my = ++token.current;
      const rate = opts.slow ? Math.max(0.5, baseRate * 0.7) : baseRate;
      const key = opts.key ?? text;
      setPlaying(key + (opts.slow ? ":slow" : ""));

      const finish = () => {
        if (token.current === my) setPlaying(null);
      };

      if (engine === "piper") {
        const cacheKey = `${rate.toFixed(2)}|${text}`;
        if (!cache.has(cacheKey)) {
          cache.set(
            cacheKey,
            fetch("/api/speech/synthesize", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text, rate }),
            })
              .then(async (res) => {
                if (!res.ok) throw new Error((await res.json().catch(() => null))?.error?.message ?? `HTTP ${res.status}`);
                return URL.createObjectURL(await res.blob());
              })
              .catch((err: Error) => {
                cache.delete(cacheKey);
                setNotice(`Local voice unavailable (${err.message}); using the browser voice.`);
                return null;
              }),
          );
        }
        const url = await cache.get(cacheKey)!;
        if (token.current !== my) return;
        if (url) {
          const el = (audio.current ??= new Audio());
          el.src = url;
          await new Promise<void>((resolve) => {
            el.onended = el.onerror = () => resolve();
            el.play().catch(() => resolve());
          });
          return finish();
        }
      }

      // Browser voice (also the fallback when Piper fails).
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return finish();
      await new Promise<void>((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "de-DE";
        u.rate = rate;
        const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("de"));
        if (voice) u.voice = voice;
        u.onend = u.onerror = () => resolve();
        window.speechSynthesis.speak(u);
      });
      finish();
    },
    [engine, baseRate, stop],
  );

  return { play, stop, playing, notice };
}
