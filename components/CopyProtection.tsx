"use client";

import { useEffect } from "react";

const isFormField = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable
  );
};

/**
 * Best-effort deterrent against casual copy/paste and right-click saving of
 * proprietary course content. This is a UX friction layer, not real DRM — a
 * technical visitor can always bypass client-side JS.
 */
export default function CopyProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      if (!isFormField(e.target)) e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      if (isFormField(e.target)) return;
      const key = e.key.toLowerCase();
      const isCopyCombo = (e.ctrlKey || e.metaKey) && ["c", "u", "a", "s"].includes(key);
      const isDevTools =
        key === "f12" || ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key));
      if (isCopyCombo || isDevTools) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
