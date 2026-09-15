"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_CATEGORY_PLAYBOOK } from "@/lib/content";
import { cn } from "@/lib/utils";

const TILE_GRADIENTS = [
  "from-primary-400 to-primary-600",
  "from-accent-400 to-accent-600",
  "from-purple-400 to-primary-600",
  "from-emerald-400 to-primary-500",
  "from-rose-400 to-accent-600",
  "from-teal-400 to-primary-600",
  "from-fuchsia-400 to-accent-600",
];

export default function CategoryPlaybook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PRODUCT_CATEGORY_PLAYBOOK[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {PRODUCT_CATEGORY_PLAYBOOK.map((cat, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveIndex(i)}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl shadow-card transition-transform",
                  TILE_GRADIENTS[i % TILE_GRADIENTS.length],
                  isActive ? "scale-110 ring-2 ring-primary-500 ring-offset-2 ring-offset-soft" : "opacity-70"
                )}
              >
                {cat.emoji}
              </span>
              <span
                className={cn(
                  "text-center text-[11px] font-semibold leading-tight",
                  isActive ? "text-primary-700" : "text-slate-400"
                )}
              >
                {cat.name.split(" (")[0]}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-2.5"
        >
          <p className="text-sm font-bold text-primary-700">{active.name}</p>
          {active.frameworks.map((fw) => (
            <div key={fw.keyword} className="rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-xs font-bold text-primary-600">{fw.keyword}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                <span className="font-semibold text-accent-500">Vì sao: </span>
                {fw.why}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
