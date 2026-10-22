import { SpeakerIcon } from "@/components/ui/icons";
import { wordDiff } from "@/lib/diff";
import type { Correction } from "@/lib/schemas";

type Props = { correction: Correction; onListen?: () => void };

export function CorrectionCard({ correction, onListen }: Props) {
  const { before, after } = wordDiff(correction.original, correction.suggested);
  return (
    <aside aria-label="Correction" className="animate-rise mt-2 rounded-2xl bg-warn-soft px-4 py-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-warn">Say it like this · {correction.category}</p>
        {onListen && (
          <button type="button" onClick={onListen} className="btn-ghost -my-1 -mr-2 !px-2 !py-1 text-xs" aria-label="Listen to the corrected sentence">
            <SpeakerIcon width={14} height={14} /> Listen
          </button>
        )}
      </div>
      <p className="mt-1.5 text-base leading-snug font-semibold text-ink" lang="de">
        {after.map((t, i) => (
          <span key={i}>
            {i > 0 && " "}
            {t.changed ? <mark className="rounded bg-transparent text-warn underline decoration-2 underline-offset-4">{t.text}</mark> : t.text}
          </span>
        ))}
      </p>
      <p className="mt-1 text-muted" lang="de">
        <span className="sr-only">You said: </span>
        {before.map((t, i) => (
          <span key={i}>
            {i > 0 && " "}
            {t.changed ? <s className="decoration-warn/70">{t.text}</s> : t.text}
          </span>
        ))}
      </p>
      {correction.explanation && <p className="mt-2 max-w-[65ch] text-ink/85">{correction.explanation}</p>}
    </aside>
  );
}
