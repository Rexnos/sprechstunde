"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Settings } from "@/lib/schemas";

type Engine = Settings["ttsEngine"];

/**
 * Speaks German text with the configured local engine. If Piper fails, falls back
 * to the browser's built-in (offline, OS-provided) voices; if that is unavailable
 * too, the text stays on screen and a notice is shown.
 */
export function useSpeaker(engine: Engine, rate: number) {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    abort.current?.abort();
    audio.current?.pause();
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setLoadingId(null);
  }, []);

  useEffect(() => stop, [stop]);

  const speakWithBrowser = useCallback(
    (id: string, text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "de-DE";
      utter.rate = rate;
      const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("de") && v.localService);
      if (voice) utter.voice = voice;
      utter.onend = utter.onerror = () => setSpeakingId((cur) => (cur === id ? null : cur));
      setSpeakingId(id);
      window.speechSynthesis.speak(utter);
      return true;
    },
    [rate],
  );

  const speak = useCallback(
    async (id: string, text: string) => {
      stop();
      setNotice(null);
      if (engine === "off") return;
      if (engine === "browser") {
        if (!speakWithBrowser(id, text)) setNotice("This browser has no built-in speech voices. Read the text instead.");
        return;
      }

      const ctrl = new AbortController();
      abort.current = ctrl;
      setLoadingId(id);
      try {
        const res = await fetch("/api/speech/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.slice(0, 600), rate }),
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error((await res.json().catch(() => null))?.error?.message ?? `HTTP ${res.status}`);
        const url = URL.createObjectURL(await res.blob());
        objectUrl.current = url;
        const el = (audio.current ??= new Audio());
        el.src = url;
        el.onended = () => setSpeakingId((cur) => (cur === id ? null : cur));
        setLoadingId(null);
        setSpeakingId(id);
        await el.play();
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setLoadingId(null);
        setSpeakingId(null);
        if ((err as Error).name === "NotAllowedError") {
          setNotice("The browser blocked autoplay. Press the speaker button to listen.");
          return;
        }
        const usedFallback = speakWithBrowser(id, text);
        setNotice(
          usedFallback
            ? `Local voice unavailable (${(err as Error).message}); using the browser voice instead.`
            : `Speech output unavailable: ${(err as Error).message}`,
        );
      }
    },
    [engine, rate, speakWithBrowser, stop],
  );

  return { speak, stop, speakingId, loadingId, notice, clearNotice: () => setNotice(null) };
}
