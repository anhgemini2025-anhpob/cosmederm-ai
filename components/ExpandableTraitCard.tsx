"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpandableTraitCard({
  icon,
  name,
  traits,
  tip,
  detail,
}: {
  icon: ReactNode;
  name: string;
  traits: string;
  tip: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="w-full rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-black/[0.03] transition-shadow hover:shadow-card-lg"
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <p className="flex-1 text-sm font-bold text-primary-700">{name}</p>
        <ChevronDown size={16} className={cn("shrink-0 text-slate-300 transition-transform", open && "rotate-180")} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">{traits}</p>
      <p className="mt-2 rounded-xl bg-surface p-2 text-[13px] leading-relaxed text-primary-600">💡 {tip}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && <p className="mt-2 text-[12px] font-semibold text-accent-500">Chạm để xem chi tiết →</p>}
    </button>
  );
}
