"use client";

import { useEffect, useState } from "react";
import { usePhraseAudio } from "@/components/audio/usePhraseAudio";
import { Notice } from "@/components/ui/Feedback";
import { api } from "@/lib/client";
import { LETTERS, SPECIAL_LETTERS } from "@/lib/course/alphabet";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/schemas";
import { AlphabetGrid } from "./AlphabetGrid";

export function AlphabetChart() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const audio = usePhraseAudio(settings.ttsEngine, settings.speechRate);

  useEffect(() => {
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-10">
      {audio.notice && <Notice>{audio.notice}</Notice>}
      <section aria-labelledby="az-h">
        <h2 id="az-h" className="mb-3 text-lg font-semibold">
          A to Z
        </h2>
        <AlphabetGrid letters={LETTERS} audio={audio} />
      </section>
      <section aria-labelledby="special-h">
        <h2 id="special-h" className="mb-1 text-lg font-semibold">
          Ä, Ö, Ü and ß
        </h2>
        <p className="mb-3 max-w-[65ch] text-sm text-muted">
          No German keyboard? Write ae, oe, ue and ss instead. On Windows you can also add the German keyboard layout, or hold Alt and type 0228 (ä),
          0246 (ö), 0252 (ü), 0223 (ß) on the number pad.
        </p>
        <AlphabetGrid letters={SPECIAL_LETTERS} audio={audio} />
      </section>
      <section aria-labelledby="spell-h" className="max-w-[65ch]">
        <h2 id="spell-h" className="mb-2 text-lg font-semibold">
          Spelling your name
        </h2>
        <p className="text-sm">
          When someone asks <span lang="de" className="font-semibold">„Wie schreibt man das?“</span> (How do you spell that?), say each letter&apos;s
          German name: <span lang="de">„M, A, X“</span>. For umlauts say <span lang="de">„A-Umlaut“</span>, <span lang="de">„O-Umlaut“</span>,{" "}
          <span lang="de">„U-Umlaut“</span>. Double letters: <span lang="de">„Doppel-L“</span>. On the phone, people use words:{" "}
          <span lang="de">„M wie Mutter, A wie Apfel, X“</span>.
        </p>
      </section>
    </div>
  );
}
