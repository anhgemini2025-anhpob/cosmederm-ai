"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FlaskConical } from "lucide-react";
import formulationData from "@/data/formulations.json";
import type { FormulationDatabase } from "@/lib/types";
import { cn } from "@/lib/utils";

const database = formulationData as FormulationDatabase;

export default function SampleFormulations() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {database.formulations.map((formula) => {
        const isOpen = openId === formula.formula_id;
        return (
          <div
            key={formula.formula_id}
            className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03]"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : formula.formula_id)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                <FlaskConical size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-primary-700">{formula.title}</p>
                <p className="text-[13px] text-slate-400">{formula.target_category}</p>
              </div>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-slate-400 transition-transform", isOpen && "rotate-180")}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 border-t border-slate-100 p-4 pt-4">
                    <p className="text-xs italic leading-relaxed text-slate-500">
                      {formula.sensory_feel_description}
                    </p>

                    {formula.phases.map((phase) => (
                      <div key={phase.phase_name}>
                        <p className="mb-1.5 text-xs font-bold text-accent-500">{phase.phase_name}</p>
                        <div className="flex flex-col gap-1">
                          {phase.ingredients.map((ing, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-[13px]"
                            >
                              <span className="min-w-0 truncate text-slate-600">{ing.inci_name}</span>
                              <span className="shrink-0 text-slate-400">{ing.function}</span>
                              <span className="shrink-0 font-bold text-primary-600">
                                {typeof ing.percentage === "number" ? `${ing.percentage}%` : ing.percentage}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-3 gap-2 text-center text-[13px]">
                      <div className="rounded-xl bg-surface p-2">
                        <p className="font-bold text-primary-600">{formula.specifications.ph_range}</p>
                        <p className="text-slate-400">pH</p>
                      </div>
                      <div className="rounded-xl bg-surface p-2">
                        <p className="font-bold text-primary-600">
                          {formula.specifications.viscosity_cps}
                        </p>
                        <p className="text-slate-400">cps</p>
                      </div>
                      <div className="rounded-xl bg-surface p-2">
                        <p className="truncate font-bold text-primary-600">
                          {formula.specifications.appearance}
                        </p>
                        <p className="text-slate-400">Ngoại quan</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-1.5 text-xs font-bold text-primary-700">Quy trình sản xuất</p>
                      <ol className="flex flex-col gap-1 text-[13px] leading-relaxed text-slate-600">
                        {formula.manufacturing_instructions.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-xl bg-accent-50 p-3 text-[13px] leading-relaxed text-accent-700 ring-1 ring-accent-200">
                      <span className="font-bold">Bí quyết: </span>
                      {formula.formulation_know_how}
                    </div>

                    <p className="text-[12px] italic text-slate-400">
                      Nguồn: {formula.book_sources.join(" · ")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
