"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecorder } from "@/components/audio/useRecorder";
import { useSpeechQueue } from "@/components/audio/useSpeechQueue";
import { CorrectionCard } from "@/components/tutor/CorrectionCard";
import { MessageBubble } from "@/components/tutor/MessageBubble";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { MicIcon } from "@/components/ui/icons";
import { api, ApiClientError, errorMessage } from "@/lib/client";
import { getLesson, MODE_LABELS } from "@/lib/lessons";
import { DEFAULT_SETTINGS, type Correction, type MessageDTO, type SessionDTO, type Settings, type VocabItem } from "@/lib/schemas";
import { remainder, takeCompleteSentences } from "@/lib/sentences";

type Phase = "idle" | "recording" | "transcribing" | "thinking" | "replying";
type Turn = {
  userText: string;
  correction?: Correction | null; // undefined = not decided yet
  reply: string;
  replyDone: boolean;
  vocabulary: VocabItem[];
};
type StreamEvent =
  | { type: "correction"; correction: Correction | null }
  | { type: "reply"; text: string; closed: boolean }
  | { type: "done"; user: MessageDTO; assistant: MessageDTO; newVocabulary: number; timings: { firstTokenMs: number; replyStartMs: number; totalMs: number } }
  | { type: "error"; message: string; service?: string };

const HOLD_MS = 300;

export function CallRoom({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [session, setSession] = useState<SessionDTO | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<MessageDTO[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [turn, setTurn] = useState<Turn | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [lastTiming, setLastTiming] = useState<number | null>(null);
  const [ending, setEnding] = useState(false);
  const queue = useSpeechQueue(settings.ttsEngine, settings.speechRate);
  const streamAbort = useRef<AbortController | null>(null);
  const muted = useRef(false); // set when the learner interrupts: the rest of the reply is not spoken
  const pressAt = useRef(0);
  const turnId = useRef(0); // events from an interrupted, older turn must not touch the current one
  const ring = useRef<HTMLSpanElement | null>(null);

  // ---------- load + warm up ----------
  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const [s, cfg] = await Promise.all([api<{ session: SessionDTO; messages: MessageDTO[] }>(`/api/sessions/${sessionId}`), api<{ settings: Settings }>("/api/settings")]);
      setSession(s.session);
      setHistory(s.messages);
      setSettings(cfg.settings);
      void api("/api/call/warmup", { method: "POST" }).catch(() => {});
    } catch (err) {
      setLoadError(errorMessage(err));
    }
  }, [sessionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load on mount
    void load();
    return () => streamAbort.current?.abort();
  }, [load]);

  // Role-play: the tutor opens the scene out loud.
  const openedRef = useRef(false);
  const { enqueue, stop: stopSpeech } = queue;
  useEffect(() => {
    if (openedRef.current || !session) return;
    const userTurns = history.filter((m) => m.role === "user").length;
    const opener = history.find((m) => m.role === "assistant");
    if (userTurns === 0 && opener) {
      openedRef.current = true;
      enqueue(opener.text);
    }
  }, [session, history, enqueue]);

  // ---------- one tutor turn ----------
  const runTurn = useCallback(
    async (text: string) => {
      const id = ++turnId.current;
      const current = () => turnId.current === id;
      setPhase("thinking");
      setTurn({ userText: text, reply: "", replyDone: false, vocabulary: [] });
      muted.current = false;
      const ctrl = new AbortController();
      streamAbort.current = ctrl;
      let consumed = 0;
      let streamed = "";
      try {
        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, message: text, inputMethod: "voice", spoken: true }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) {
          const body = (await res.json().catch(() => null)) as { error?: { message: string; service?: string } } | null;
          throw new ApiClientError(body?.error?.message ?? `Request failed (${res.status})`, res.status, "stream", body?.error?.service);
        }
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += value;
          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            const ev = JSON.parse(line) as StreamEvent;
            if (ev.type === "done") setHistory((h) => [...h, ev.user, ev.assistant]); // always keep the transcript
            if (!current()) continue;
            if (ev.type === "correction") {
              setTurn((t) => (t ? { ...t, correction: ev.correction } : t));
            } else if (ev.type === "reply") {
              streamed = ev.text;
              setPhase((p) => (p === "thinking" ? "replying" : p));
              setTurn((t) => (t ? { ...t, reply: ev.text } : t));
              const next = takeCompleteSentences(ev.text, consumed);
              consumed = next.consumed;
              if (!muted.current) next.sentences.forEach(enqueue);
            } else if (ev.type === "done") {
              const rest = streamed ? remainder(streamed, consumed) : ev.assistant.text;
              if (rest && !muted.current) enqueue(rest);
              setTurn((t) =>
                t ? { ...t, reply: ev.assistant.text, replyDone: true, correction: ev.user.correction ?? null, vocabulary: ev.assistant.vocabulary ?? [] } : t,
              );
              setLastTiming(ev.timings.replyStartMs);
              setPhase((p) => (p === "thinking" ? "replying" : p));
            } else if (ev.type === "error") {
              throw new ApiClientError(ev.message, 503, "stream", ev.service);
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError" || !current()) return;
        setError(errorMessage(err));
        setTurn(null);
        setPhase("idle");
      } finally {
        if (streamAbort.current === ctrl) streamAbort.current = null;
      }
    },
    [sessionId, enqueue],
  );

  // A reply is finished once the stream is done and the last sentence has been spoken.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- derived phase transition
    if (phase === "replying" && turn?.replyDone && !queue.speaking) setPhase("idle");
  }, [phase, turn?.replyDone, queue.speaking]);

  // ---------- recording ----------
  const onLevel = useCallback((level: number) => {
    if (ring.current) ring.current.style.transform = `scale(${1 + level * 0.45})`;
  }, []);

  const recorder = useRecorder(async (audio) => {
    setPhase("transcribing");
    try {
      const form = new FormData();
      form.append("audio", audio, "recording");
      const res = await api<{ text: string }>("/api/speech/transcribe", { method: "POST", body: form });
      await runTurn(res.text);
    } catch (err) {
      const msg = errorMessage(err);
      if (/no speech|too short|empty/i.test(msg)) setHint("Didn't catch that. Hold the button a little longer and try again.");
      else setError(msg);
      setPhase("idle");
    }
  }, onLevel);

  const recording = recorder.state === "recording";
  // eslint-disable-next-line react-hooks/set-state-in-effect -- mirror recorder state into the call phase
  useEffect(() => void (recording && setPhase("recording")), [recording]);

  const pressStart = useCallback(() => {
    if (recording) {
      recorder.stop(); // second tap in toggle mode
      return;
    }
    if (phase === "transcribing" || phase === "thinking" || ending) return;
    setError(null);
    setHint(null);
    if (phase === "replying") {
      muted.current = true; // interrupt: stop talking, let the turn finish saving in the background
      stopSpeech();
    }
    pressAt.current = Date.now();
    void recorder.start();
  }, [recording, recorder, phase, ending, stopSpeech]);

  const pressEnd = useCallback(() => {
    if (recording && Date.now() - pressAt.current >= HOLD_MS) recorder.stop();
  }, [recording, recorder]);

  // Space = talk (hold or tap), Esc = end call.
  useEffect(() => {
    const isField = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.("input, textarea, select, [contenteditable=true]");
    function down(e: KeyboardEvent) {
      if (e.code !== "Space" || e.repeat || isField(e.target)) return;
      e.preventDefault();
      pressStart();
    }
    function up(e: KeyboardEvent) {
      if (e.code !== "Space" || isField(e.target)) return;
      e.preventDefault();
      pressEnd();
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [pressStart, pressEnd]);

  // ---------- timers ----------
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [thinkingSince, setThinkingSince] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start the thinking timer
    if (phase === "thinking") setThinkingSince(Date.now());
  }, [phase]);

  async function endCall() {
    setEnding(true);
    streamAbort.current?.abort();
    stopSpeech();
    recorder.cancel();
    try {
      if (history.some((m) => m.role === "user")) await api(`/api/sessions/${sessionId}`, { method: "PATCH", json: { status: "completed" } });
    } catch {
      /* the transcript is saved either way */
    }
    router.push(`/tutor?session=${sessionId}`);
  }

  // ---------- render ----------
  if (loadError) return <ErrorBanner message={loadError} onRetry={load} />;
  if (!session) return <Loading label="Connecting…" />;

  const lesson = getLesson(session.lessonId);
  const thinkingSeconds = phase === "thinking" ? Math.max(0, Math.floor((now - thinkingSince) / 1000)) : 0;
  const callTime = formatClock(Math.floor((now - startedAt) / 1000));
  const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
  const tutorSpeaking = queue.speaking;

  const status = {
    idle: tutorSpeaking ? "Tutor speaking" : "Your turn",
    recording: "Listening…",
    transcribing: "Writing down what you said…",
    thinking: thinkingSeconds >= 3 ? `Thinking… ${thinkingSeconds}s` : "Thinking…",
    replying: tutorSpeaking ? "Tutor speaking" : "…",
  }[phase];

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-7rem)] max-w-2xl flex-col">
      <header className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            Call · {MODE_LABELS[session.mode]} · {session.level}
          </p>
          <h1 className="truncate text-xl font-semibold tracking-tight">{lesson?.title ?? session.title}</h1>
        </div>
        <span className="text-sm text-muted tabular-nums" aria-label="Call duration">
          {callTime}
        </span>
        <button type="button" className="btn-danger" onClick={endCall} disabled={ending}>
          {ending ? "Ending…" : "End call"}
        </button>
      </header>

      {/* Tutor orb */}
      <div className="flex flex-col items-center pt-10 pb-6" aria-live="polite">
        <div className="relative grid size-36 place-items-center">
          {(tutorSpeaking || phase === "thinking") && (
            <span className={`absolute inset-0 rounded-full bg-accent/25 ${tutorSpeaking ? "animate-swell" : "opacity-40"}`} aria-hidden />
          )}
          <span
            className={`relative grid size-28 place-items-center rounded-full transition-colors duration-300 ${
              tutorSpeaking ? "bg-accent text-accent-ink" : "bg-surface-2 text-ink"
            }`}
          >
            {phase === "thinking" || phase === "transcribing" ? (
              <span className="dot-breathe flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-current" />
                <span className="size-2.5 rounded-full bg-current" />
                <span className="size-2.5 rounded-full bg-current" />
              </span>
            ) : (
              <span className="font-[family-name:var(--font-display)] text-3xl font-semibold" aria-hidden>
                T
              </span>
            )}
          </span>
        </div>
        <p className="mt-4 text-sm font-medium">{status}</p>
      </div>

      {/* Captions */}
      <section aria-label="Live captions" className="flex-1 space-y-4">
        {turn ? (
          <>
            <div className="flex flex-col items-end">
              <p className="max-w-[90%] rounded-3xl rounded-br-lg bg-learner px-4 py-2.5 text-learner-ink" lang="de">
                {turn.userText}
              </p>
              {turn.correction === undefined ? null : turn.correction ? (
                <div className="w-full max-w-[90%]">
                  <CorrectionCard correction={turn.correction} onListen={() => enqueue(turn.correction!.suggested)} />
                </div>
              ) : settings.correctionFrequency !== "off" ? (
                <p className="mt-1 px-2 text-xs text-ok">✓ Looks good</p>
              ) : null}
            </div>
            {turn.reply && (
              <p className={`max-w-[90%] text-lg leading-relaxed ${turn.replyDone ? "" : "caret"}`} lang="de">
                {turn.reply}
              </p>
            )}
            {turn.vocabulary.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="New words">
                {turn.vocabulary.map((v) => (
                  <li key={v.term} className="rounded-full border border-border bg-surface px-3 py-1 text-sm" title={v.example}>
                    <span className="font-semibold" lang="de">
                      {v.term}
                    </span>{" "}
                    <span className="text-muted">{v.meaning}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : lastAssistant ? (
          <p className="max-w-[90%] text-lg leading-relaxed" lang="de">
            {lastAssistant.text}
          </p>
        ) : (
          <p className="text-center text-muted">Say hello to start. Short and imperfect is fine.</p>
        )}
      </section>

      {/* Talk control */}
      <div className="sticky bottom-0 -mx-4 mt-6 bg-gradient-to-t from-bg from-70% to-transparent px-4 pt-6 pb-4 md:-mx-10 md:px-10">
        <div className="space-y-3">
          {queue.notice && <Notice>{queue.notice}</Notice>}
          {error && <ErrorBanner message={error} />}
          {hint && <Notice tone="info">{hint}</Notice>}
          <div className="flex flex-col items-center gap-3">
            <div className="relative grid size-24 place-items-center">
              <span ref={ring} className={`absolute inset-0 rounded-full bg-accent/20 transition-transform duration-75 ${recording ? "" : "hidden"}`} aria-hidden />
              <button
                type="button"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  pressStart();
                }}
                onPointerUp={pressEnd}
                onKeyDown={(e) => {
                  if (e.key === "Enter") pressStart();
                }}
                disabled={ending || (!recording && (phase === "transcribing" || phase === "thinking"))}
                aria-pressed={recording}
                aria-label={recording ? "Stop talking" : "Talk"}
                className={`relative grid size-20 touch-none place-items-center rounded-full transition-[background-color,transform] duration-150 select-none active:scale-95 disabled:opacity-40 ${
                  recording ? "bg-ink text-bg" : "bg-accent text-accent-ink hover:brightness-105"
                }`}
              >
                <MicIcon width={30} height={30} />
              </button>
            </div>
            <p className="text-center text-xs text-muted">
              {recording
                ? `${formatClock(recorder.seconds)} · release to send`
                : phase === "replying" && tutorSpeaking
                  ? "Press to interrupt and answer"
                  : "Hold Space or the button and speak, release to send. Or tap once to start and again to stop."}
            </p>
            {phase === "idle" && !tutorSpeaking && lastAssistant?.nextPrompt && (
              <p className="text-center text-sm text-muted">
                Try answering: <span lang="de" className="font-medium text-ink">{lastAssistant.nextPrompt}</span>
              </p>
            )}
            {recorder.error && <p className="text-center text-sm text-danger">{recorder.error}</p>}
          </div>
          {history.length > 0 && (
            <details className="rounded-2xl border border-border bg-surface px-4 py-2 text-sm">
              <summary className="cursor-pointer text-muted">
                Transcript ({history.filter((m) => m.role === "user").length} turns)
                {lastTiming !== null && <span className="ml-2 text-xs">· last reply started after {(lastTiming / 1000).toFixed(1)}s</span>}
              </summary>
              <ol className="mt-3 max-h-80 space-y-4 overflow-y-auto pb-2">
                {history.map((m) => (
                  <MessageBubble key={m.id} message={m} showOk={settings.correctionFrequency !== "off"} />
                ))}
              </ol>
            </details>
          )}
          <p className="text-center text-xs text-muted">
            <Link href={`/tutor?session=${sessionId}`} className="underline-offset-2 hover:underline">
              Switch to text chat
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function formatClock(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
