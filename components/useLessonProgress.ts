"use client";

import { useEffect, useState } from "react";

export function useLessonProgress(trackId: string, lessonIds: string[]) {
  const storageKey = `cosmederm_progress_${trackId}`;
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {
      // ignore unavailable storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {
        // ignore unavailable storage
      }
      return next;
    });
  };

  const total = lessonIds.length;
  const count = lessonIds.filter((id) => completed.has(id)).length;

  return { completed, toggle, count, total, hydrated };
}
