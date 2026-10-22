"use client";

import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "@/lib/client";
import type { ProgressDTO } from "@/lib/schemas";

export function useProgress() {
  const [data, setData] = useState<ProgressDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setData(await api<ProgressDTO>("/api/progress"));
    } catch (err) {
      setError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  return { data, error, reload: load };
}
