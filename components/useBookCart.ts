"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cosmederm_book_cart";

export function useBookCart() {
  const [cart, setCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(new Set(JSON.parse(raw)));
    } catch {
      // ignore unavailable storage
    }
  }, []);

  const persist = (next: Set<string>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // ignore unavailable storage
    }
  };

  const toggle = (slug: string) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      persist(next);
      return next;
    });
  };

  const clear = () => {
    setCart(new Set());
    persist(new Set());
  };

  return { cart, toggle, clear };
}
