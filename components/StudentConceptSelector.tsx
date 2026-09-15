"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BookMarked } from "lucide-react";
import { STUDENT_KEY_CONCEPTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function StudentConceptSelector() {
  const [activeKey, setActiveKey] = useState<(typeof STUDENT_KEY_CONCEPTS)[number]["key"]>("skin");
  const active = STUDENT_KEY_CONCEPTS.find((c) => c.key === activeKey)!;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STUDENT_KEY_CONCEPTS.map((cat) => {
          const isActive = cat.key === activeKey;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveKey(cat.key)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition-colors sm:text-sm",
                isActive ? "bg-primary-500 text-white shadow-card" : "bg-white text-slate-500 ring-1 ring-black/[0.05]"
              )}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-2.5"
        >
          {active.concepts.map((concept) => (
            <div key={concept.keyword} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-sm font-bold text-primary-700">{concept.keyword}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{concept.detail}</p>
              <Link
                href={`/library#${concept.bookSlug}`}
                className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-[12px] font-semibold text-primary-600"
              >
                <BookMarked size={12} className="shrink-0" />
                <span className="truncate">{concept.reference}</span>
              </Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
