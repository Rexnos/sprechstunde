"use client";

/** Buttons to insert ä ö ü ß into a text field, for keyboards without German keys. */
export function UmlautBar({ inputId, disabled, onInsert }: { inputId: string; disabled?: boolean; onInsert: (c: string) => void }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-label="Insert special letters">
      {["ä", "ö", "ü", "ß"].map((c) => (
        <button
          key={c}
          type="button"
          disabled={disabled}
          onClick={() => {
            onInsert(c);
            document.getElementById(inputId)?.focus();
          }}
          className="size-9 rounded-lg border border-border bg-surface text-lg hover:bg-surface-2 disabled:opacity-40"
        >
          {c}
        </button>
      ))}
      <span className="ml-2 text-xs text-muted">No German keyboard? ae, oe, ue and ss work too.</span>
    </div>
  );
}
