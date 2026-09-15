"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DiagramLayer } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function LayeredDiagram({
  layers,
  caption,
  illustration,
}: {
  layers: DiagramLayer[];
  caption?: string;
  illustration?: ReactNode;
}) {
  const [activeId, setActiveId] = useState(layers[0]?.id);
  const active = layers.find((l) => l.id === activeId) ?? layers[0];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
      {illustration && (
        <div className="mb-3 overflow-hidden rounded-xl bg-surface p-2">{illustration}</div>
      )}
      <div className="flex overflow-hidden rounded-xl">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveId(layer.id)}
            className={cn(
              "flex h-16 flex-1 items-center justify-center border-2 border-white/60 text-center text-[11px] font-bold uppercase tracking-tight text-primary-800/70 transition-transform",
              layer.color,
              activeId === layer.id && "z-10 scale-y-110 shadow-card-lg"
            )}
          >
            {layer.name.split(" ")[0]}
          </button>
        ))}
      </div>
      {caption && <p className="mt-2 text-center text-[12px] text-slate-400">{caption}</p>}

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-4 rounded-xl bg-surface p-3.5"
        >
          <p className="text-sm font-bold text-primary-700">{active.name}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{active.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
