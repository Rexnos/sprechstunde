"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/client";
import { COURSE, unitsByLevel } from "@/lib/course";
import type { CourseProgressDTO, GeneratedDTO } from "@/lib/schemas";
import { AiBadge, GenerateButton } from "./GenerateButton";

/** "Write a new story" plus the learner's saved AI stories. */
export function AiStories({ course }: { course: CourseProgressDTO | null }) {
  const [items, setItems] = useState<GeneratedDTO[] | null>(null);
  const units = COURSE.filter((u) => u.number >= 1);
  const done = new Set(course?.lessons.map((l) => l.unitId) ?? []);
  const furthest = [...units].reverse().find((u) => done.has(u.id)) ?? units[0];
  const [unitId, setUnitId] = useState<string | null>(null);
  const chosen = unitId ?? furthest.id;

  useEffect(() => {
    api<{ items: GeneratedDTO[] }>("/api/practice/generated?kind=story")
      .then((r) => setItems(r.items))
      .catch(() => setItems([]));
  }, []);

  return (
    <section aria-labelledby="ai-stories-h" className="space-y-4">
      <div>
        <h2 id="ai-stories-h" className="text-lg font-semibold">
          New stories
        </h2>
        <p className="max-w-[65ch] text-sm text-muted">
          The local AI writes a fresh story using only words you&apos;ve learned, then the app checks it before showing it. AI stories may still
          contain small mistakes.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="story-unit" className="label">
            Words up to
          </label>
          <select id="story-unit" className="input w-auto" value={chosen} onChange={(e) => setUnitId(e.target.value)}>
            {unitsByLevel().map(({ level, title, units: inLevel }) => (
              <optgroup key={level} label={`${level} · ${title}`}>
                {inLevel
                  .filter((u) => u.number >= 1)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      Unit {u.number}: {u.title}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
        <GenerateButton
          key={chosen}
          body={{ kind: "story", unitId: chosen }}
          label="Write a new story"
          busyLabel="Writing a story…"
          className="btn-primary"
          onCreated={(item) => setItems((xs) => [item, ...(xs ?? [])])}
        />
      </div>
      {items && items.length > 0 && (
        <ul className="divide-y divide-border border-y border-border">
          {items.map((it) => {
            const p = it.payload as { title: string; blurb: string };
            const unit = COURSE.find((u) => u.id === it.key);
            return (
              <li key={it.id}>
                <Link href={`/practice/stories/ai/${it.id}`} className="group flex items-center gap-4 py-3">
                  <span className="w-14 shrink-0 text-xs text-muted">{unit ? `Unit ${unit.number}` : ""}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold" lang="de">
                      {p.title} <AiBadge />
                    </span>
                    <span className="block text-sm text-muted">{p.blurb}</span>
                  </span>
                  <span className="text-xs text-muted">{new Date(it.createdAt).toLocaleDateString()}</span>
                  <span className="text-muted" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
