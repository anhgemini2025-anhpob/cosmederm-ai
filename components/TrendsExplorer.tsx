"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Globe2, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";
import { REGIONAL_TRENDS, SUCCESS_STORIES, EXPORT_MARKET_RULES } from "@/lib/trends";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "trends", label: "Xu hướng", icon: TrendingUp },
  { key: "ideas", label: "Case study", icon: Lightbulb },
  { key: "rules", label: "Xuất khẩu", icon: ShieldCheck },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function DrillList<T extends { key: string; label: string }>({
  items,
  renderDetail,
}: {
  items: T[];
  renderDetail: (item: T) => React.ReactNode;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const active = items.find((i) => i.key === openKey) || null;

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
            onClick={() => setOpenKey(null)}
            className="flex w-full items-center gap-2 border-b border-slate-100 p-4 text-left text-xs font-semibold text-primary-600"
          >
            <ArrowLeft size={15} /> Quay lại danh sách
          </button>
          <div className="p-4">
            <p className="mb-3 text-base font-bold text-primary-700">{active.label}</p>
            {renderDetail(active)}
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
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => setOpenKey(item.key)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-black/[0.03]"
            >
              <span className="text-sm font-bold text-primary-700">{item.label}</span>
              <ChevronRight size={18} className="shrink-0 text-slate-400" />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TrendsExplorer() {
  const [tab, setTab] = useState<TabKey>("trends");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-black/[0.03]">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors",
                tab === t.key ? "bg-primary-500 text-white" : "text-slate-500"
              )}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "trends" && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm leading-relaxed text-slate-500">
            Cập nhật xu hướng mỹ phẩm theo khu vực — dùng làm nguồn cảm hứng khi định hướng sản phẩm mới.
          </p>
          <DrillList
            items={REGIONAL_TRENDS.map((r) => ({ key: r.region, label: `${r.flag} ${r.region}`, data: r }))}
            renderDetail={(item) => (
              <div className="flex flex-col gap-2.5">
                {item.data.trends.map((t) => (
                  <div key={t.title} className="rounded-xl bg-surface p-3">
                    <p className="text-sm font-bold text-primary-700">{t.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.detail}</p>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      )}

      {tab === "ideas" && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm leading-relaxed text-slate-500">
            Những sản phẩm thực tế đã thành công trên thị trường — phân tích lý do để rút bài học phát triển sản phẩm mới.
          </p>
          {SUCCESS_STORIES.map((s) => (
            <div key={s.product} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
              <p className="text-sm font-bold text-primary-700">{s.product}</p>
              <p className="mt-0.5 text-[13px] font-semibold text-accent-500">{s.brand}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.why}</p>
            </div>
          ))}
          <p className="rounded-xl bg-primary-50 p-3 text-[13px] leading-relaxed text-primary-700">
            💡 Kết hợp một xu hướng (tab &quot;Xu hướng&quot;) với cơ chế/hoạt chất phù hợp trong{" "}
            <strong>Ý tưởng phát triển sản phẩm mới</strong> (Lộ trình Chuyên gia) để ra một concept cụ thể.
          </p>
        </div>
      )}

      {tab === "rules" && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm leading-relaxed text-slate-500">
            Quy định, chứng chỉ cần lưu ý theo từng thị trường nếu bạn định hướng xuất khẩu.
          </p>
          <DrillList
            items={EXPORT_MARKET_RULES.map((m) => ({ key: m.market, label: `${m.flag} ${m.market}`, data: m }))}
            renderDetail={(item) => (
              <ul className="flex flex-col gap-2.5">
                {item.data.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <Globe2 size={14} className="mt-0.5 shrink-0 text-primary-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
      )}
    </div>
  );
}
