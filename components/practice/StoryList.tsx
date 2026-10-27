"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/ui/icons";
import { getUnit } from "@/lib/course";
import { STORIES } from "@/lib/stories";
import { AiStories } from "./AiStories";
import { usePracticeSummary } from "./usePracticeSummary";

export function StoryList() {
  const { summary, course } = usePracticeSummary();
  return (
    <div className="space-y-12">
      <BuiltInStories summary={summary} course={course} />
      <AiStories course={course} />
    </div>
  );
}

function BuiltInStories({ summary, course }: ReturnType<typeof usePracticeSummary>) {
  const doneLessons = new Set(course?.lessons.map((l) => l.lessonId) ?? []);
  const unitDone = (unitId: string) => getUnit(unitId)?.lessons.every((l) => doneLessons.has(l.id)) ?? false;
  return (
    <ul className="divide-y divide-border border-y border-border">
      {STORIES.map((st) => {
        const unit = getUnit(st.unitId)!;
        const best = summary?.stories.find((s) => s.storyId === st.id)?.best;
        const recommended = unitDone(st.unitId) && best === undefined;
        return (
          <li key={st.id}>
            <Link href={`/practice/stories/${st.id}`} className="group flex items-center gap-4 py-4">
              <span className="w-14 shrink-0 text-xs text-muted">
                <span className="block font-semibold">{unit.level}</span>
                Unit {unit.number}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold" lang="de">
                  {st.title}
                </span>
                <span className="block text-sm text-muted">{st.blurb}</span>
              </span>
              {best !== undefined ? (
                <span className="flex items-center gap-1 text-xs text-ok">
                  <CheckIcon width={14} height={14} /> {Math.round(best * 3)}/3
                </span>
              ) : recommended ? (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">Recommended</span>
              ) : null}
              <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
