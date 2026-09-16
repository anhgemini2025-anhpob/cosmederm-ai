"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SearchX, Search as SearchIcon } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase, Ingredient } from "@/lib/types";
import { cn, safetyTone } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const database = cirData as CirDatabase;

const CATEGORIES = [
  { key: "all", label: "Tất cả", match: () => true },
  {
    key: "surfactant",
    label: "Hoạt động bề mặt",
    match: (i: Ingredient) => /surfactant/i.test(i.chemical_class_function),
  },
  {
    key: "preservative",
    label: "Bảo quản",
    match: (i: Ingredient) => /preservative/i.test(i.chemical_class_function),
  },
  {
    key: "humectant",
    label: "Dưỡng ẩm",
    match: (i: Ingredient) => /humectant/i.test(i.chemical_class_function),
  },
  {
    key: "phospholipid",
    label: "Phospholipid & Chiết xuất",
    match: (i: Ingredient) => /phospholipid|botanical extract/i.test(i.chemical_class_function),
  },
  {
    key: "peptide",
    label: "Peptide & Protein",
    match: (i: Ingredient) => /peptide|protein/i.test(i.chemical_class_function),
  },
  {
    key: "uv",
    label: "Chống nắng",
    match: (i: Ingredient) => /uv filter/i.test(i.chemical_class_function),
  },
  {
    key: "active",
    label: "Hoạt chất trị liệu",
    match: (i: Ingredient) =>
      /acid|active|inhibitor|bioactive/i.test(i.chemical_class_function) &&
      !/surfactant/i.test(i.chemical_class_function),
  },
];

const TONE_LABEL: Record<string, string> = {
  safe: "An toàn",
  caution: "An toàn có điều kiện",
  restricted: "Hạn chế / Cần thận trọng",
};

function ResultCard({ ingredient }: { ingredient: Ingredient }) {
  const [open, setOpen] = useState(false);
  const tone = safetyTone(ingredient.cir_safety_status);

  return (
    <div className="rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03]">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 p-4 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-primary-700">{ingredient.inci_name}</p>
            <Badge tone={tone === "safe" ? "safe" : tone === "caution" ? "caution" : "restricted"}>
              {TONE_LABEL[tone]}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">{ingredient.chemical_class_function}</p>
        </div>
        <ChevronDown
          size={18}
          className={cn("mt-1 shrink-0 text-slate-400 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border-t border-slate-100 p-4 pt-3.5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-surface p-2.5">
                  <p className="font-semibold text-primary-600">Leave-on tối đa</p>
                  <p className="mt-0.5 text-slate-500">{ingredient.max_concentration.leave_on}</p>
                </div>
                <div className="rounded-xl bg-surface p-2.5">
                  <p className="font-semibold text-primary-600">Rinse-off tối đa</p>
                  <p className="mt-0.5 text-slate-500">{ingredient.max_concentration.rinse_off}</p>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-2.5 text-xs">
                <p className="font-semibold text-primary-600">Khoảng pH khuyến nghị</p>
                <p className="mt-0.5 text-slate-500">{ingredient.ph_range}</p>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">{ingredient.toxicology_notes}</p>
              <div className="flex flex-wrap gap-1.5">
                {ingredient.applications.map((app) => (
                  <Badge key={app} tone="primary">
                    {app}
                  </Badge>
                ))}
              </div>
              <p className="text-[12px] italic text-slate-400">
                Nguồn: {ingredient.book_sources.join(" · ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function IngredientSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const activeCategory = CATEGORIES.find((c) => c.key === category) ?? CATEGORIES[0];
    const q = query.trim().toLowerCase();
    return database.ingredients.filter((ing) => {
      if (!activeCategory.match(ing)) return false;
      if (!q) return true;
      return (
        ing.inci_name.toLowerCase().includes(q) ||
        ing.chemical_class_function.toLowerCase().includes(q) ||
        ing.applications.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <SearchIcon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên INCI, ví dụ: Glycolic Acid..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-card focus:border-primary-400 focus:outline-none"
        />
      </div>

      <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              category === c.key ? "bg-primary-500 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">Tìm thấy {results.length} thành phần</p>

      <div className="flex flex-col gap-3">
        {results.map((ing) => (
          <ResultCard key={ing.id} ingredient={ing} />
        ))}
        {results.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-card">
            <SearchX size={28} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-500">Không tìm thấy thành phần phù hợp</p>
            <p className="text-xs text-slate-400">Thử tìm với từ khóa khác hoặc chọn &quot;Tất cả&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
