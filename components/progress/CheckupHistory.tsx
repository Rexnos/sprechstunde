"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SKILL_LABEL, SKILLS, type CheckupSkill } from "@/lib/checkup/build";
import { api } from "@/lib/client";
import type { CheckupDTO, CheckupStatusDTO } from "@/lib/schemas";

const pct = (n: number) => Math.round(n * 100);
const skillPct = (c: CheckupDTO | null | undefined, s: CheckupSkill) => {
  const v = c?.skills[s];
  return v ? v.correct / v.asked : null;
};
export const weekLabel = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" });

/** One meter per skill with the change since the previous check-up. */
export function SkillBars({ current, previous }: { current: CheckupDTO; previous?: CheckupDTO | null }) {
  return (
    <ul className="space-y-3">
      {SKILLS.map((s) => {
        const now = skillPct(current, s);
        const before = skillPct(previous, s);
        const delta = now !== null && before !== null ? pct(now) - pct(before) : null;
        return (
          <li key={s} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-sm">
            <span className="truncate">{SKILL_LABEL[s]}</span>
            {now === null ? (
              <span className="text-xs text-muted">not tested</span>
            ) : (
              <span className="h-2 overflow-hidden rounded-full bg-surface-2" role="meter" aria-valuenow={pct(now)} aria-valuemin={0} aria-valuemax={100} aria-label={SKILL_LABEL[s]}>
                <span className="block h-full rounded-full bg-accent" style={{ width: `${Math.max(pct(now), 2)}%` }} />
              </span>
            )}
            <span className="w-24 text-right tabular-nums">
              {now !== null && `${pct(now)}%`}
              {delta !== null && delta !== 0 && (
                <span className={`ml-2 text-xs ${delta > 0 ? "text-ok" : "text-warn"}`}>
                  {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Overall check-up score per week, with the numbers available as a table for screen readers. */
function WeeklyChart({ history }: { history: CheckupDTO[] }) {
  return (
    <figure>
      <div className="relative h-36" aria-hidden>
        <div className="absolute inset-x-0 bottom-1/2 border-t border-dashed border-border" />
        <div className="flex h-full items-end gap-1.5">
          {history.map((c, i) => (
            <div key={c.id} className="flex h-full flex-1 flex-col justify-end" title={`Week of ${weekLabel(c.weekOf)}: ${pct(c.score)}%`}>
              {i === history.length - 1 && <span className="mb-1 text-center text-xs font-semibold tabular-nums">{pct(c.score)}%</span>}
              <div className={`rounded-t-md ${i === history.length - 1 ? "bg-accent" : "bg-accent/45"}`} style={{ height: `${Math.max(pct(c.score), 3)}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex gap-1.5 text-[10px] text-muted" aria-hidden>
        {history.map((c) => (
          <span key={c.id} className="flex-1 truncate text-center">
            {weekLabel(c.weekOf)}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-muted">Overall check-up score per week. The dashed line is 50%.</figcaption>
      <table className="sr-only">
        <caption>Check-up score per week</caption>
        <thead>
          <tr>
            <th>Week of</th>
            <th>Score</th>
            {SKILLS.map((s) => (
              <th key={s}>{SKILL_LABEL[s]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((c) => (
            <tr key={c.id}>
              <td>{weekLabel(c.weekOf)}</td>
              <td>{pct(c.score)}%</td>
              {SKILLS.map((s) => {
                const v = skillPct(c, s);
                return <td key={s}>{v === null ? "not tested" : `${pct(v)}%`}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** The "Weekly check-ups" section of the Progress page. */
export function CheckupHistory() {
  const [status, setStatus] = useState<CheckupStatusDTO | null>(null);
  useEffect(() => {
    api<CheckupStatusDTO>("/api/checkup")
      .then(setStatus)
      .catch(() => {});
  }, []);
  if (!status) return null;

  const { history, thisWeek } = status;
  const latest = history.at(-1);
  return (
    <section className="card" aria-labelledby="checkup-h">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="checkup-h" className="font-semibold">
          Weekly check-ups
        </h2>
        <Link href="/progress/check-up" className={thisWeek ? "btn-ghost" : "btn-primary"}>
          {thisWeek ? "Retake this week’s check-up" : "Take this week’s check-up"}
        </Link>
      </div>
      {latest ? (
        <div className="grid gap-6 md:grid-cols-2">
          {history.length > 1 ? <WeeklyChart history={history} /> : <p className="text-sm text-muted">Your first result is in. Take a check-up each week to see your trend here.</p>}
          <div>
            <p className="mb-3 text-sm text-muted">Latest: week of {weekLabel(latest.weekOf)}</p>
            <SkillBars current={latest} previous={history.at(-2)} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">
          A 10-minute test once a week on what you studied: reading, listening, grammar and speaking. Your scores show up here so you can see your progress.
        </p>
      )}
    </section>
  );
}
