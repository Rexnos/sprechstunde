"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, errorMessage } from "@/lib/client";
import type { Mode, SessionDTO } from "@/lib/schemas";

export function useStartSession() {
  const router = useRouter();
  const [starting, setStarting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function start(mode: Mode, lessonId?: string, target: "tutor" | "call" = "tutor", courseUnitId?: string) {
    const key = `${mode}:${lessonId ?? ""}:${target}`;
    setStarting(key);
    setError(null);
    try {
      const { session } = await api<{ session: SessionDTO }>("/api/sessions", { method: "POST", json: { mode, lessonId, courseUnitId } });
      router.push(`/${target}?session=${session.id}`);
    } catch (err) {
      setError(errorMessage(err));
      setStarting(null);
    }
  }

  return {
    start,
    starting,
    error,
    isStarting: (mode: Mode, lessonId?: string, target: "tutor" | "call" = "tutor") => starting === `${mode}:${lessonId ?? ""}:${target}`,
  };
}
