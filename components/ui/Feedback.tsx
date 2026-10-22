import type { ReactNode } from "react";

export function ErrorBanner({ message, onRetry, children }: { message: string; onRetry?: () => void; children?: ReactNode }) {
  return (
    <div role="alert" className="animate-rise flex flex-wrap items-start gap-3 rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
      <p className="min-w-0 flex-1">{message}</p>
      {children}
      {onRetry && (
        <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-2">
          Try again
        </button>
      )}
    </div>
  );
}

export function Notice({ children, tone = "warn" }: { children: ReactNode; tone?: "warn" | "ok" | "info" }) {
  const cls = {
    warn: "border-warn/30 bg-warn-soft text-warn",
    ok: "border-ok/30 bg-ok-soft text-ok",
    info: "border-border bg-surface-2 text-muted",
  }[tone];
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${cls}`}>{children}</div>;
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 max-w-[65ch] text-muted">{description}</p>}
      </div>
      {actions}
    </header>
  );
}

export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <p className="animate-pulse text-sm text-muted" role="status">
      {label}
    </p>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="card">
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
