"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18 }}
          className="rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03]"
        >
          <button
            onClick={() => setOpenIndex(null)}
            className="flex w-full items-center gap-2 border-b border-slate-100 p-4 text-left text-xs font-semibold text-primary-600"
          >
            <ArrowLeft size={15} /> Quay lại danh sách
          </button>
          <div className="p-4">
            <p className="text-base font-bold text-primary-700">{active.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{active.content}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col gap-2.5"
        >
          {items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setOpenIndex(i)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-black/[0.03]"
            >
              <span className="text-sm font-bold text-primary-700">{item.title}</span>
              <ChevronRight size={18} className="shrink-0 text-slate-400" />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
