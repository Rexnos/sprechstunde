"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSpeaker } from "@/components/audio/useSpeaker";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { MicIcon } from "@/components/ui/icons";
import { api, ApiClientError, errorMessage } from "@/lib/client";
import { getLesson, MODE_LABELS, type Lesson } from "@/lib/lessons";
import { DEFAULT_SETTINGS, type MessageDTO, type Mode, type SessionDTO, type Settings } from "@/lib/schemas";
import { Composer } from "./Composer";
import { MessageBubble } from "./MessageBubble";

type SessionResponse = { session: SessionDTO; messages: MessageDTO[] };
type ChatResponse = { user: MessageDTO; assistant: MessageDTO; newVocabulary: number; latencyMs: number };

export function TutorRoom({ sessionId }: { sessionId: string }) {
  const [session, setSession] = useState<SessionDTO | null>(null);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const abort = useRef<AbortController | null>(null);
  const bottom = useRef<HTMLDivElement | null>(null);
  const speaker = useSpeaker(settings.ttsEngine, settings.speechRate);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const [s, cfg] = await Promise.all([
        api<SessionResponse>(`/api/sessions/${sessionId}`),
        api<{ settings: Settings }>("/api/settings"),
      ]);
      setSession(s.session);
      setMessages(s.messages);
      setSettings(cfg.settings);
    } catch (err) {
      setLoadError(errorMessage(err));
    }
  }, [sessionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load on mount / session change
    void load();
    return () => abort.current?.abort();
  }, [load]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pending]);

  async function send(text: string, inputMethod: "text" | "voice"): Promise<boolean> {
    setSendError(null);
    setPending(text);
    setDraft("");
    speaker.stop();
    const ctrl = new AbortController();
    abort.current = ctrl;
    try {
      const res = await api<ChatResponse>("/api/chat", { method: "POST", json: { sessionId, message: text, inputMethod }, signal: ctrl.signal });
      setMessages((prev) => [...prev, res.user, res.assistant]);
      setSession((s) => (s ? { ...s, status: "active", messageCount: s.messageCount + 2 } : s));
      if (settings.autoPlayReplies) void speaker.speak(res.assistant.id, res.assistant.text);
      return true;
    } catch (err) {
      setDraft(text); // never lose what the learner said
      if ((err as Error).name === "AbortError") return false;
      setSendError(
        errorMessage(err) + (err instanceof ApiClientError && err.service === "llm" ? " Your message is back in the box so you can try again." : ""),
      );
      return false;
    } finally {
      setPending(null);
      abort.current = null;
    }
  }

  async function setStatus(status: SessionDTO["status"]) {
    try {
      const res = await api<{ session: SessionDTO }>(`/api/sessions/${sessionId}`, { method: "PATCH", json: { status } });
      setSession(res.session);
    } catch (err) {
      setSendError(errorMessage(err));
    }
  }

  if (loadError) {
    return (
      <ErrorBanner message={loadError} onRetry={load}>
        <Link href="/tutor" className="font-semibold underline underline-offset-2">
          Back to sessions
        </Link>
      </ErrorBanner>
    );
  }
  if (!session) return <Loading label="Opening your conversation…" />;

  const lesson = getLesson(session.lessonId);
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const nextPrompt = lastAssistant?.nextPrompt && !includesLoosely(lastAssistant.text, lastAssistant.nextPrompt) ? lastAssistant.nextPrompt : null;
  const learnerTurns = messages.filter((m) => m.role === "user").length;
  const ended = session.status === "completed";

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-7rem)] max-w-3xl flex-col">
      <header className="mb-6 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted">
            <Link href="/tutor" className="hover:text-ink">
              Sessions
            </Link>{" "}
            / {MODE_LABELS[session.mode]} · {session.level}
          </p>
          <h1 className="mt-0.5 truncate text-2xl font-semibold tracking-tight">{lesson?.title ?? session.title}</h1>
          {lesson && <p className="mt-1 max-w-[65ch] text-sm text-muted">{lesson.objective}</p>}
        </div>
        <Link href={`/call?session=${sessionId}`} className="btn-primary shrink-0">
          <MicIcon width={16} height={16} /> Call
        </Link>
        {!ended && learnerTurns > 0 && (
          <button type="button" className="btn-secondary shrink-0" onClick={() => setStatus("completed")}>
            Finish
          </button>
        )}
      </header>

      {lesson && <PhraseStrip lesson={lesson} onPick={(t) => setDraft((d) => (d.trim() ? `${d.trim()} ${t}` : t))} />}

      <section aria-label="Conversation" className="flex-1">
        {messages.length === 0 && !pending && <EmptyState mode={session.mode} onPick={setDraft} />}
        <ol className="space-y-5" aria-live="polite">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              speaking={speaker.speakingId === m.id}
              loadingAudio={speaker.loadingId === m.id}
              onSpeak={settings.ttsEngine !== "off" ? () => speaker.speak(m.id, m.text) : undefined}
              onSpeakText={settings.ttsEngine !== "off" ? speaker.speak : undefined}
              onStop={speaker.stop}
              showOk={settings.correctionFrequency !== "off"}
            />
          ))}
          {pending && (
            <>
              <MessageBubble message={{ id: "pending", role: "user", text: pending, createdAt: "" }} pending />
              <ThinkingBubble onCancel={() => abort.current?.abort()} />
            </>
          )}
        </ol>
        <div ref={bottom} className="h-4" />
      </section>

      <div className="sticky bottom-0 -mx-4 mt-4 bg-gradient-to-t from-bg from-70% to-transparent px-4 pt-8 pb-3 md:-mx-8 md:px-8">
        <div className="mx-auto max-w-3xl space-y-2">
          {speaker.notice && <Notice>{speaker.notice}</Notice>}
          {sendError && <ErrorBanner message={sendError} />}
          {ended ? (
            <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-border bg-surface p-4">
              <p className="flex-1 text-sm">
                <span className="font-semibold">Session finished.</span>{" "}
                <span className="text-muted">
                  {learnerTurns} {learnerTurns === 1 ? "turn" : "turns"} practised.
                </span>
              </p>
              <button type="button" className="btn-secondary" onClick={() => setStatus("active")}>
                Keep going
              </button>
              <Link href="/tutor" className="btn-primary">
                New session
              </Link>
            </div>
          ) : (
            <>
              {nextPrompt && !pending && (
                <p className="px-2 text-sm text-muted">
                  Answer this: <span lang="de" className="font-medium text-ink">{nextPrompt}</span>
                </p>
              )}
              <Composer value={draft} onChange={setDraft} disabled={!!pending} onSend={send} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ThinkingBubble({ onCancel }: { onCancel: () => void }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <li className="animate-rise flex items-center gap-3" role="status">
      <span className="dot-breathe flex gap-1 rounded-3xl rounded-bl-lg border border-border bg-tutor px-4 py-3.5" aria-label="Tutor is thinking">
        <span className="size-2 rounded-full bg-muted" />
        <span className="size-2 rounded-full bg-muted" />
        <span className="size-2 rounded-full bg-muted" />
      </span>
      {seconds >= 4 && (
        <span className="text-xs text-muted">
          {seconds < 20 ? `Thinking… ${seconds}s` : `Still working (${seconds}s). The local model is slow on this PC.`}{" "}
          <button type="button" className="underline underline-offset-2 hover:text-ink" onClick={onCancel}>
            Cancel
          </button>
        </span>
      )}
    </li>
  );
}

const STARTERS: Record<Mode, { de: string; en: string }[]> = {
  conversation: [
    { de: "Hallo! Wie geht's dir?", en: "Hi! How are you?" },
    { de: "Heute habe ich …", en: "Today I …" },
    { de: "Am Wochenende möchte ich …", en: "At the weekend I'd like to …" },
  ],
  roleplay: [{ de: "Guten Tag!", en: "Hello!" }],
  vocabulary: [
    { de: "Ich bin bereit.", en: "I'm ready." },
    { de: "Kannst du mir ein Wort geben?", en: "Can you give me a word?" },
  ],
};

function EmptyState({ mode, onPick }: { mode: Mode; onPick: (text: string) => void }) {
  return (
    <div className="animate-rise py-10 text-center">
      <p className="text-lg font-semibold">Say something in German.</p>
      <p className="mx-auto mt-1 max-w-[46ch] text-sm text-muted">
        Short and imperfect is fine. The tutor answers, and quietly fixes anything that sounds off.
      </p>
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {STARTERS[mode].map((s) => (
          <li key={s.de}>
            <button type="button" className="btn-secondary !font-normal" onClick={() => onPick(s.de)} title={s.en}>
              <span lang="de">{s.de}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhraseStrip({ lesson, onPick }: { lesson: Lesson; onPick: (text: string) => void }) {
  return (
    <div className="mb-6">
      <p className="mb-1.5 text-xs text-muted">Useful here (tap to add)</p>
      <ul className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {lesson.vocabulary.map((v) => (
          <li key={v.term} className="shrink-0">
            <button
              type="button"
              onClick={() => onPick(v.term.replace(/\s*…$/, ""))}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm transition-colors hover:border-accent/50"
              title={v.meaning}
            >
              <span lang="de">{v.term}</span> <span className="text-muted">{v.meaning}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function includesLoosely(haystack: string, needle: string) {
  const n = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  return n(haystack).includes(n(needle));
}
