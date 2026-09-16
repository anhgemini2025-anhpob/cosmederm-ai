"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, MessageCircle, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import catalogData from "@/data/formulation_catalog.json";
import type { FormulationCatalogDatabase } from "@/lib/types";
import { useFormulationCart } from "@/components/useFormulationCart";
import { cn } from "@/lib/utils";

const database = catalogData as FormulationCatalogDatabase;
const ZALO_URL = "https://zalo.me/84908095693";

const CATEGORY_EMOJI: Record<string, string> = {
  "Chống lão hóa": "✨",
  "Dưỡng ẩm": "💧",
  "Chăm sóc da mặt": "🧴",
  "Chăm sóc cơ thể": "🧖",
  "Tắm & Chăm sóc cơ thể": "🛁",
  "Sữa rửa mặt / Làm sạch": "🫧",
  "Chăm sóc tóc": "💇",
  "Chống nắng": "☀️",
  "Trang điểm màu": "💄",
  "Mặt nạ": "🎭",
  "Chăm sóc răng miệng": "🦷",
  "Chăm sóc em bé": "🍼",
  "Chăm sóc nam giới": "🧔",
  "Cạo râu / Tẩy lông": "🪒",
  "Dược mỹ phẩm (OTC)": "💊",
  "Thiên nhiên / Hữu cơ": "🌿",
  "Công thức nhanh (Instant)": "⚡",
  "Đặc trị & Chăm sóc cá nhân": "🔬",
};

function formulaLabel(f: { name: string; formulaNo?: string }) {
  return f.formulaNo ? `No. ${f.formulaNo} — ${f.name}` : f.name;
}

const categoryCounts = new Map<string, number>();
database.formulations.forEach((f) => {
  f.categories.forEach((c) => categoryCounts.set(c, (categoryCounts.get(c) || 0) + 1));
});
const CATEGORIES = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);

export default function FormulationCatalog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { cart, toggle, clear } = useFormulationCart();

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const filtered = useMemo(() => {
    return database.formulations.filter((f) => {
      if (searching) {
        return (
          f.name.toLowerCase().includes(q) ||
          f.nameVi.toLowerCase().includes(q) ||
          f.categories.some((c) => c.toLowerCase().includes(q)) ||
          f.keyIngredients.some((k) => k.toLowerCase().includes(q)) ||
          f.brandLabel.toLowerCase().includes(q)
        );
      }
      if (activeCategory) return f.categories.includes(activeCategory);
      return false;
    });
  }, [q, searching, activeCategory]);

  const cartItems = database.formulations.filter((f) => cart.has(f.id));

  const copyCartList = () => {
    const text = cartItems.map((f) => `- ${formulaLabel(f)} (${f.brandLabel})`).join("\n");
    navigator.clipboard.writeText(`Tôi muốn yêu cầu chi tiết các công thức sau:\n${text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const showingList = searching || activeCategory;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[13px] leading-relaxed text-slate-400">
        {database.system_metadata.total} công thức tham khảo, tổng hợp theo <strong>mục tiêu bạn muốn phát triển</strong> —
        chọn nhóm bên dưới hoặc gõ thẳng tên/hoạt chất bạn cần.
      </p>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-card ring-1 ring-black/[0.03]">
          <Search size={16} className="text-slate-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, hoạt chất, thương hiệu..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-slate-300"
          />
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-card"
          aria-label="Giỏ công thức"
        >
          <ShoppingBag size={17} />
          {cart.size > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold">
              {cart.size}
            </span>
          )}
        </button>
      </div>

      {!showingList && (
        <div>
          <p className="mb-2 text-xs font-bold text-primary-700">Bạn muốn phát triển sản phẩm cho mục tiêu nào?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-start gap-1 rounded-2xl bg-white p-3.5 text-left shadow-card ring-1 ring-black/[0.03] active:scale-[0.98]"
              >
                <span className="text-xl">{CATEGORY_EMOJI[cat] || "🧪"}</span>
                <span className="text-xs font-bold leading-snug text-primary-700">{cat}</span>
                <span className="text-[12px] text-slate-400">{count} công thức</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showingList && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {activeCategory && !searching ? (
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-600"
              >
                <ArrowLeft size={14} /> {CATEGORY_EMOJI[activeCategory] || "🧪"} {activeCategory}
              </button>
            ) : (
              <p className="text-xs font-semibold text-primary-600">Kết quả tìm kiếm</p>
            )}
            <p className="text-[12px] text-slate-400">{filtered.length} kết quả</p>
          </div>

          <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-0.5">
            {filtered.slice(0, 60).map((f) => {
              const inCart = cart.has(f.id);
              const isOpen = expandedId === f.id;
              return (
                <div
                  key={f.id}
                  className="rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03]"
                >
                  <div className="flex w-full items-start gap-3 p-3.5 text-left">
                    <button
                      onClick={() => setExpandedId(isOpen ? null : f.id)}
                      className="flex min-w-0 flex-1 items-start gap-2 text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold leading-snug text-primary-700">{formulaLabel(f)}</p>
                        <p className="mt-0.5 text-[12px] font-semibold text-accent-500">{f.nameVi}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-500">
                            {f.brandLabel}
                          </span>
                          {searching &&
                            f.categories.map((c) => (
                              <span key={c} className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-slate-500">
                                {c}
                              </span>
                            ))}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={cn("mt-1 shrink-0 text-slate-300 transition-transform", isOpen && "rotate-180")}
                      />
                    </button>
                    <button
                      onClick={() => toggle(f.id)}
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        inCart ? "bg-primary-500 text-white" : "bg-surface text-primary-500"
                      )}
                      aria-label={inCart ? "Bỏ khỏi giỏ" : "Thêm vào giỏ"}
                    >
                      {inCart ? <Check size={15} /> : <Plus size={15} />}
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1.5 border-t border-slate-100 px-3.5 pb-3.5 pt-3">
                          <p className="text-[13px] leading-relaxed text-slate-600">{f.functionVi}</p>
                          {f.keyIngredients.length > 0 && (
                            <p className="text-[12px] leading-relaxed text-slate-400">
                              Hoạt chất/nguyên liệu chính: {f.keyIngredients.join(", ")}
                            </p>
                          )}
                          {!searching && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {f.categories.map((c) => (
                                <span key={c} className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-slate-500">
                                  {c}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="rounded-xl bg-surface p-4 text-center text-xs text-slate-400">Không tìm thấy công thức phù hợp.</p>
            )}
            {filtered.length > 60 && (
              <p className="text-center text-[12px] text-slate-400">
                Hiển thị 60/{filtered.length} kết quả — thu hẹp tìm kiếm để xem thêm.
              </p>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[75vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 sm:max-w-md sm:rounded-3xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-primary-700">Giỏ công thức ({cartItems.length})</p>
                <button onClick={() => setCartOpen(false)} className="text-slate-400">
                  <X size={18} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="rounded-xl bg-surface p-4 text-center text-xs text-slate-400">
                  Chưa có công thức nào trong giỏ. Nhấn dấu + trên danh sách để thêm.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {cartItems.map((f) => (
                    <div key={f.id} className="flex items-center justify-between gap-2 rounded-xl bg-surface p-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-primary-700">{f.name}</p>
                        <p className="text-[12px] text-slate-400">{f.brandLabel}</p>
                      </div>
                      <button onClick={() => toggle(f.id)} className="shrink-0 text-slate-400" aria-label="Xóa">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <div className="mt-2 flex flex-col gap-2">
                    <button
                      onClick={copyCartList}
                      className="rounded-full bg-surface py-2.5 text-xs font-semibold text-primary-600"
                    >
                      {copied ? "Đã sao chép danh sách" : "Sao chép danh sách"}
                    </button>
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white active:scale-[0.98]"
                    >
                      <MessageCircle size={14} /> Gửi yêu cầu qua Zalo
                    </a>
                    <button onClick={clear} className="text-[13px] font-semibold text-slate-400">
                      Xóa toàn bộ giỏ
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
