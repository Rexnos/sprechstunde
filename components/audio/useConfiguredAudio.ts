"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/client";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/schemas";
import { usePhraseAudio } from "./usePhraseAudio";

/** Phrase audio using the learner's voice settings (falls back to defaults if the database is down). */
export function useConfiguredAudio() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  useEffect(() => {
    api<{ settings: Settings }>("/api/settings")
      .then((r) => setSettings(r.settings))
      .catch(() => {});
  }, []);
  return usePhraseAudio(settings.ttsEngine, settings.speechRate);
}
