import type { ProgressDTO } from "@/lib/schemas";

/** 14-day practice-minutes bar chart, with the numbers available as a table for screen readers. */
export function ActivityChart({ days, goal }: { days: ProgressDTO["daily"]; goal: number }) {
  const max = Math.max(goal, ...days.map((d) => d.minutes), 1);
  const goalPct = (goal / max) * 100;
  const label = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric" });

  return (
    <figure>
      <div className="relative h-40" aria-hidden>
        <div className="absolute inset-x-0 border-t border-dashed border-accent/60" style={{ bottom: `${goalPct}%` }}>
          <span className="absolute -top-5 right-0 text-xs text-accent">goal {goal} min</span>
        </div>
        <div className="flex h-full items-end gap-1.5">
          {days.map((d) => (
            <div key={d.date} className="flex h-full flex-1 flex-col justify-end" title={`${label(d.date)}: ${d.minutes} min, ${d.turns} turns`}>
              <div
                className={`rounded-t-md ${d.minutes >= goal ? "bg-accent" : "bg-accent/45"}`}
                style={{ height: `${Math.max((d.minutes / max) * 100, d.turns ? 3 : 0)}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex gap-1.5 text-[10px] text-muted" aria-hidden>
        {days.map((d, i) => (
          <span key={d.date} className="flex-1 truncate text-center">
            {i % 2 === 1 ? label(d.date) : ""}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-muted">Estimated speaking-practice minutes per day (last 14 days).</figcaption>
      <table className="sr-only">
        <caption>Practice per day</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Minutes</th>
            <th>Turns</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <td>{label(d.date)}</td>
              <td>{d.minutes}</td>
              <td>{d.turns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
