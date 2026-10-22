"use client";

import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "@/lib/client";
import type { HealthDTO } from "@/lib/schemas";

export function useHealth(pollMs = 30_000) {
  const [health, setHealth] = useState<HealthDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const refresh = useCallback(async () => {
    setChecking(true);
    try {
      setHealth(await api<HealthDTO>("/api/health"));
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    void refresh();
    if (!pollMs) return;
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [refresh, pollMs]);

  return { health, error, checking, refresh };
}
