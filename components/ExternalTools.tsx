"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Beaker, Droplets, Leaf, Mountain } from "lucide-react";
import { EXTERNAL_TOOLS } from "@/lib/content";

const ICONS = [Beaker, Droplets, Leaf, Mountain];
const TILE_GRADIENTS = [
  "from-primary-400 to-primary-600",
  "from-accent-400 to-accent-600",
  "from-emerald-400 to-primary-500",
  "from-slate-400 to-primary-600",
];

export default function ExternalTools({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "grid grid-cols-1 gap-2.5 lg:grid-cols-2" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
      {EXTERNAL_TOOLS.map((tool, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="group flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03] transition-transform active:scale-[0.98]"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${TILE_GRADIENTS[i % TILE_GRADIENTS.length]} text-white shadow-card`}
            >
              <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-primary-700">{tool.name}</p>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-500"
                />
              </div>
              <p className="mt-0.5 text-[13px] font-medium text-accent-500">{tool.tag}</p>
              {!compact && (
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{tool.description}</p>
              )}
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                {tool.stat}
              </p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
