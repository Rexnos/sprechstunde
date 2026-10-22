"use client";

import Link from "next/link";
import { SOUND_SETS } from "@/lib/pronunciation";
import { STORIES } from "@/lib/stories";
import { usePracticeSummary } from "./usePracticeSummary";

export function PracticeHub() {
  const { summary } = usePracticeSummary();
  const items = [
    {
      href: "/practice/listen",
      title: "Listening & dictation",
      text: "Hear a sentence from your lessons and type it. Trains your ear for real German.",
      meta: summary?.dictation.sessions
        ? `${summary.dictation.sessions} rounds · average ${Math.round((summary.dictation.average ?? 0) * 100)}%`
        : "10 sentences · about 5 minutes",
    },
    {
      href: "/practice/pronunciation",
      title: "Pronunciation",
      text: "Hear and say the sounds English speakers mix up: ü, ö, ch, long and short vowels.",
      meta: `${summary?.pronunciation.length ?? 0} of ${SOUND_SETS.length} sound sets practised`,
    },
    {
      href: "/practice/stories",
      title: "Stories",
      text: "Short stories read aloud, using words from your units. Tap any word for its meaning.",
      meta: `${summary?.stories.filter((s) => STORIES.some((st) => st.id === s.storyId)).length ?? 0} of ${STORIES.length} stories read, plus new AI stories`,
    },
  ];
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className="group flex items-center gap-4 py-5">
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold">{it.title}</span>
              <span className="block max-w-[60ch] text-sm text-muted">{it.text}</span>
              <span className="mt-1 block text-xs text-muted">{it.meta}</span>
            </span>
            <span className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden>
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
