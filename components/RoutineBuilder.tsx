"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { ROUTINE_CATEGORIES, MAX_CONCERNS, type RoutineCategory } from "@/lib/routineEngine";
import { safetyTone, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const database = cirData as CirDatabase;

function findIngredient(name: string) {
  return database.ingredients.find((i) => i.inci_name === name);
}

function CategoryPanel({ category }: { category: RoutineCategory }) {
  const [concerns, setConcerns] = useState<string[]>([]);

  const toggleConcern = (key: string) => {
    setConcerns((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_CONCERNS) return prev;
      return [...prev, key];
    });
  };

  const selected = category.concerns.filter((c) => concerns.includes(c.key));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]"
    >
      <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
        <span className="text-lg">{category.emoji}</span> {category.label}
        <span className="ml-auto text-[12px] font-normal text-slate-400">chọn tối đa {MAX_CONCERNS}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {category.concerns.map((c) => (
          <button
            key={c.key}
            onClick={() => toggleConcern(c.key)}
            disabled={!concerns.includes(c.key) && concerns.length >= MAX_CONCERNS}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40",
              concerns.includes(c.key) ? "bg-primary-500 text-white" : "bg-surface text-slate-500"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
          {selected.map((concern) => (
            <div key={concern.key}>
              <p className="mb-1.5 text-xs font-bold text-accent-500">{concern.label}</p>
              <ol className="flex flex-col gap-1.5">
                {concern.steps.map((step, i) => (
                  <li key={i} className="rounded-xl bg-surface p-2.5 text-xs text-slate-600">
                    <span className="font-semibold text-primary-700">{step.label}</span>
                    {step.actives.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {step.actives.map((name) => {
                          const ing = findIngredient(name);
                          const tone = ing ? safetyTone(ing.cir_safety_status) : "safe";
                          return (
                            <span key={name} className="inline-flex items-center gap-1">
                              <span className="text-[13px] font-medium text-slate-700">{name}</span>
                              {ing && (
                                <Badge tone={tone === "safe" ? "safe" : tone === "caution" ? "caution" : "restricted"}>
                                  {ing.max_concentration.leave_on}
                                </Badge>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              {concern.commercialTip && (
                <p className="mt-2 rounded-xl bg-primary-50 p-2.5 text-[13px] leading-relaxed text-primary-700">
                  🛍️ {concern.commercialTip}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function RoutineBuilder() {
  const [activeCategory, setActiveCategory] = useState<string>("skin");

  const category = ROUTINE_CATEGORIES.find((c) => c.key === activeCategory)!;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-sm font-bold text-primary-700">Chọn lĩnh vực bạn quan tâm</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {ROUTINE_CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl py-3 ring-1 transition-all",
                  isActive ? "bg-primary-50 ring-primary-400 scale-105" : "bg-white ring-black/[0.05] opacity-70"
                )}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className={cn("text-[13px] font-bold", isActive ? "text-primary-700" : "text-slate-400")}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <CategoryPanel key={category.key} category={category} />
      </AnimatePresence>

      <div className="flex gap-2.5 rounded-2xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
        <p>
          Giới thiệu hoạt chất mới từng loại một, cách nhau 3-5 ngày để theo dõi phản ứng, và luôn
          patch test trước khi dùng toàn mặt/cơ thể. Nếu tình trạng nghiêm trọng hoặc kéo dài, hãy
          tham khảo bác sĩ chuyên khoa thay vì tự điều trị.
        </p>
      </div>
    </div>
  );
}
