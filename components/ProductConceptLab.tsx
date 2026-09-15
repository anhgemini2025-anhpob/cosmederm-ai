"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Lightbulb, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase, Ingredient } from "@/lib/types";
import { MECHANISM_CATEGORIES, MAX_MECHANISMS, PRODUCT_TYPES, SUSTAINABILITY_NOTE, type Mechanism } from "@/lib/conceptLab";
import { cn } from "@/lib/utils";

const database = cirData as CirDatabase;

function matchIngredients(mechanism: Mechanism): Ingredient[] {
  if (mechanism.matchTag) {
    return database.ingredients.filter((i) => i.applications.includes(mechanism.matchTag!)).slice(0, 3);
  }
  if (mechanism.matchClass) {
    return database.ingredients.filter((i) => i.chemical_class_function.includes(mechanism.matchClass!)).slice(0, 3);
  }
  if (mechanism.curatedNames) {
    return mechanism.curatedNames
      .map((name) => database.ingredients.find((i) => i.inci_name === name))
      .filter((i): i is Ingredient => Boolean(i));
  }
  return [];
}

export default function ProductConceptLab() {
  const [productKey, setProductKey] = useState<string | null>(null);
  const [categoryKey, setCategoryKey] = useState<"skin" | "hair">("skin");
  const [mechanismKeys, setMechanismKeys] = useState<string[]>([]);

  const product = PRODUCT_TYPES.find((p) => p.key === productKey);
  const category = MECHANISM_CATEGORIES.find((c) => c.key === categoryKey)!;
  const selectedMechanisms = category.mechanisms.filter((m) => mechanismKeys.includes(m.key));

  function toggleMechanism(key: string) {
    setMechanismKeys((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_MECHANISMS) return prev;
      return [...prev, key];
    });
  }

  function switchCategory(key: "skin" | "hair") {
    setCategoryKey(key);
    setMechanismKeys([]);
  }

  const matchedIngredients = useMemo(() => {
    const all = selectedMechanisms.flatMap((m) => matchIngredients(m));
    const seen = new Set<string>();
    return all.filter((ing) => {
      if (seen.has(ing.id)) return false;
      seen.add(ing.id);
      return true;
    });
  }, [selectedMechanisms]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-sm font-bold text-primary-700">1. Chọn dạng sản phẩm</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PRODUCT_TYPES.map((p) => (
            <button
              key={p.key}
              onClick={() => setProductKey(p.key)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl py-3 ring-1 transition-colors",
                productKey === p.key ? "bg-primary-50 ring-primary-400" : "bg-white ring-black/[0.05]"
              )}
            >
              <span className="text-xl">{p.emoji}</span>
              <span className={cn("text-[12px] font-bold", productKey === p.key ? "text-primary-700" : "text-slate-400")}>
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-primary-700">
          2. Chọn lĩnh vực &amp; cơ chế (tối đa {MAX_MECHANISMS}, có thể phối hợp)
        </p>
        <div className="mb-3 flex gap-2">
          {MECHANISM_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => switchCategory(c.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors",
                categoryKey === c.key ? "bg-primary-500 text-white" : "bg-white text-slate-500 ring-1 ring-black/[0.05]"
              )}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {category.mechanisms.map((m) => {
            const active = mechanismKeys.includes(m.key);
            const disabled = !active && mechanismKeys.length >= MAX_MECHANISMS;
            return (
              <button
                key={m.key}
                onClick={() => toggleMechanism(m.key)}
                disabled={disabled}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "bg-accent-500 text-white"
                    : disabled
                    ? "bg-surface text-slate-300"
                    : "bg-white text-slate-500 ring-1 ring-black/[0.05]"
                )}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {product && selectedMechanisms.length > 0 && (
          <motion.div
            key={`${product.key}-${mechanismKeys.join("-")}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white shadow-card-lg">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                <Sparkles size={14} /> Concept đề xuất ({selectedMechanisms.length} cơ chế phối hợp)
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {selectedMechanisms.map((m) => (
                  <p key={m.key} className="text-xs font-bold leading-relaxed">
                    <span className="text-white/70">• {m.label}:</span> {m.angle}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="flex items-center gap-2 text-xs font-bold text-primary-700">
                <Lightbulb size={14} /> Ghi chú công thức cho {product.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{product.note}</p>
            </div>

            {matchedIngredients.length > 0 && (
              <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
                <p className="mb-2 flex items-center gap-2 text-xs font-bold text-primary-700">
                  <Layers size={14} /> Hoạt chất gợi ý (từ cơ sở dữ liệu thực tế)
                </p>
                <div className="flex flex-col gap-1.5">
                  {matchedIngredients.map((ing) => (
                    <div key={ing.id} className="rounded-xl bg-surface p-2.5 text-xs">
                      <span className="font-semibold text-primary-600">{ing.inci_name}</span>
                      <span className="ml-1.5 text-slate-400">— {ing.chemical_class_function.split(" (")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="flex items-center gap-2 text-xs font-bold text-primary-700">
                <ShieldCheck size={14} /> Chứng nhận nên cân nhắc
              </p>
              <div className="mt-1.5 flex flex-col gap-1">
                {selectedMechanisms.map((m) => (
                  <p key={m.key} className="text-xs leading-relaxed text-slate-500">
                    <span className="font-semibold text-primary-600">{m.label}:</span> {m.cert}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-accent-50 p-4 ring-1 ring-accent-200">
              <p className="flex items-center gap-2 text-xs font-bold text-accent-600">
                <Megaphone size={14} /> Gợi ý thông điệp marketing
              </p>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {selectedMechanisms.map((m) => (
                  <p key={m.key} className="text-xs italic leading-relaxed text-accent-700">
                    {m.marketing}
                  </p>
                ))}
              </div>
            </div>

            <p className="rounded-xl bg-surface p-3 text-[12px] leading-relaxed text-slate-400">
              🌱 {SUSTAINABILITY_NOTE}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {mechanismKeys.length === 0 && (
        <p className="rounded-xl bg-surface p-3 text-center text-xs text-slate-400">
          Chọn dạng sản phẩm và ít nhất 1 cơ chế bên trên để xem gợi ý concept.
        </p>
      )}

      <p className="text-center text-[12px] text-slate-400">
        Khung ý tưởng tổng hợp từ ALGAKTIV Blue Biotechnology Framework, LANXESS Scopeblue và hệ
        thống phân loại mục tiêu Lipoid Kosmetik — kiểm chứng lại với nhà cung cấp trước khi triển khai.
      </p>
    </div>
  );
}
