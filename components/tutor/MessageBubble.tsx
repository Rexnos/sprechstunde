import type { MessageDTO } from "@/lib/schemas";
import { CheckIcon, MicIcon, SpeakerIcon } from "@/components/ui/icons";
import { CorrectionCard } from "./CorrectionCard";

type Props = {
  message: MessageDTO;
  speaking?: boolean;
  loadingAudio?: boolean;
  onSpeak?: () => void;
  onStop?: () => void;
  /** Speak arbitrary text, e.g. the corrected sentence. */
  onSpeakText?: (id: string, text: string) => void;
  /** Show a "looks good" mark on learner turns without corrections. */
  showOk?: boolean;
  pending?: boolean;
};

export function MessageBubble({ message, speaking, loadingAudio, onSpeak, onStop, onSpeakText, showOk, pending }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <li className="animate-rise flex flex-col items-end">
        <div
          className={`max-w-[min(85%,36rem)] rounded-3xl rounded-br-lg bg-learner px-4 py-2.5 text-[15px] whitespace-pre-wrap text-learner-ink ${pending ? "opacity-70" : ""}`}
          lang="de"
        >
          {message.text}
        </div>
        <p className="mt-1 flex items-center gap-1.5 px-2 text-xs text-muted">
          {message.inputMethod === "voice" && (
            <>
              <MicIcon width={12} height={12} />
              <span>spoken</span>
            </>
          )}
          {showOk && !pending && message.correction === null && (
            <span className="flex items-center gap-1 text-ok">
              <CheckIcon width={12} height={12} /> Looks good
            </span>
          )}
        </p>
        {message.correction && (
          <div className="w-full max-w-[min(85%,36rem)]">
            <CorrectionCard
              correction={message.correction}
              onListen={onSpeakText ? () => onSpeakText(`${message.id}:fix`, message.correction!.suggested) : undefined}
            />
          </div>
        )}
      </li>
    );
  }

  return (
    <li className="animate-rise flex flex-col items-start">
      <div className="group relative max-w-[min(85%,36rem)] rounded-3xl rounded-bl-lg border border-border bg-tutor px-4 py-2.5 pr-12 text-[15px] whitespace-pre-wrap" lang="de">
        {message.text}
        {onSpeak && (
          <button
            type="button"
            onClick={speaking ? onStop : onSpeak}
            className={`absolute top-1.5 right-1.5 grid size-8 place-items-center rounded-full transition-colors ${
              speaking || loadingAudio ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-ink"
            }`}
            aria-label={speaking ? "Stop audio" : "Listen to this reply"}
          >
            {loadingAudio ? (
              <span className="dot-breathe flex gap-0.5" aria-hidden>
                <span className="size-1 rounded-full bg-current" />
                <span className="size-1 rounded-full bg-current" />
                <span className="size-1 rounded-full bg-current" />
              </span>
            ) : speaking ? (
              <span className="flex h-3.5 items-end gap-0.5" aria-hidden>
                <span className="h-full w-0.5 animate-pulse rounded-full bg-current" />
                <span className="h-2/3 w-0.5 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                <span className="h-full w-0.5 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
              </span>
            ) : (
              <SpeakerIcon width={16} height={16} />
            )}
          </button>
        )}
      </div>

      {message.fallback && <p className="mt-1 px-2 text-xs text-warn">The tutor&apos;s answer came back garbled, so this is a simplified reply.</p>}

      {message.vocabulary && message.vocabulary.length > 0 && (
        <div className="mt-2 max-w-[min(85%,36rem)] px-1">
          <p className="mb-1 text-xs text-muted">Added to your words</p>
          <ul className="flex flex-wrap gap-1.5">
            {message.vocabulary.map((v) => (
              <li key={v.term} className="rounded-full border border-border bg-surface px-3 py-1 text-sm" title={v.example}>
                <span className="font-semibold" lang="de">
                  {v.term}
                </span>{" "}
                <span className="text-muted">{v.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
