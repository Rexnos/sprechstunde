"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/ui/icons";
import { SOUND_SETS } from "@/lib/pronunciation";
import { usePracticeSummary } from "./usePracticeSummary";

export function SoundSetList() {
  const { summary } = usePracticeSummary();
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {SOUND_SETS.map((set) => {
        const best = summary?.pronunciation.find((p) => p.setId === set.id)?.best;
        return (
          <li key={set.id}>
            <Link href={`/practice/pronunciation/${set.id}`} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 hover:border-accent/50">
              <span className="flex items-center justify-between gap-2">
                <span className="text-lg font-semibold">{set.title}</span>
                {best !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-ok">
                    <CheckIcon width={14} height={14} /> {Math.round(best * 100)}%
                  </span>
                )}
              </span>
              <span className="mt-1 text-sm text-muted" lang="de">
                {set.pairs.map((p) => `${p.a} / ${p.b}`).join(" · ")}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
