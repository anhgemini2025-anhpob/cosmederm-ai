"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Plus, RotateCcw, Trash2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PhaseKey = "oil" | "water" | "emulsifier" | "active";

interface Row {
  id: string;
  name: string;
  percent: number;
}

const PHASE_META: Record<PhaseKey, { label: string; hint: string; color: string; bar: string }> = {
  oil: { label: "Pha Dầu (Oil Phase)", hint: "Dầu, bơ, sáp, ester...", color: "text-accent-500", bar: "bg-accent-400" },
  water: { label: "Pha Nước (Water Phase)", hint: "Nước, glycerin, humectant...", color: "text-primary-500", bar: "bg-primary-400" },
  emulsifier: { label: "Chất nhũ hóa (Emulsifier)", hint: "Surfactant tạo hệ nhũ tương", color: "text-emerald-600", bar: "bg-emerald-400" },
  active: { label: "Hoạt chất (Active)", hint: "Vitamin, peptide, chiết xuất...", color: "text-purple-600", bar: "bg-purple-400" },
};

const DEFAULT_STATE: Record<PhaseKey, Row[]> = {
  oil: [{ id: "o1", name: "Dầu / Bơ dưỡng ẩm", percent: 15 }],
  water: [{ id: "w1", name: "Nước tinh khiết", percent: 70 }],
  emulsifier: [{ id: "e1", name: "Chất nhũ hóa nonionic", percent: 5 }],
  active: [
    { id: "a1", name: "Niacinamide", percent: 5 },
    { id: "a2", name: "Chiết xuất dưỡng ẩm", percent: 5 },
  ],
};

let rowCounter = 0;
function newId() {
  rowCounter += 1;
  return `row-${Date.now()}-${rowCounter}`;
}

interface Message {
  tone: "safe" | "caution" | "restricted";
  text: string;
}

function analyzeStability(totals: Record<PhaseKey, number>): Message[] {
  const { oil, water, emulsifier, active } = totals;
  const total = oil + water + emulsifier + active;
  const messages: Message[] = [];

  if (Math.abs(total - 100) > 0.05) {
    if (total > 100) {
      messages.push({
        tone: "restricted",
        text: `Tổng công thức đang vượt 100% (${total.toFixed(1)}%). Cần giảm bớt ${(total - 100).toFixed(1)}% ở một pha bất kỳ trước khi sản xuất.`,
      });
    } else {
      messages.push({
        tone: "caution",
        text: `Tổng công thức mới đạt ${total.toFixed(1)}%. Cần bổ sung thêm ${(100 - total).toFixed(1)}% — thường thêm vào Pha Nước (q.s. to 100%).`,
      });
    }
  }

  if (oil > 0) {
    const ratio = emulsifier / oil;
    if (ratio < 0.15) {
      messages.push({
        tone: "restricted",
        text: `Tỷ lệ Nhũ hóa/Dầu chỉ đạt ${(ratio * 100).toFixed(0)}% — thấp hơn ngưỡng khuyến nghị 15–20% theo chuẩn nhũ hóa Nhật Bản (Iwata & Shimada). Hệ có nguy cơ TÁCH PHA cao.`,
      });
    } else if (ratio < 0.2) {
      messages.push({
        tone: "caution",
        text: `Tỷ lệ Nhũ hóa/Dầu đạt ${(ratio * 100).toFixed(0)}% — ở ngưỡng tối thiểu. Nên đồng hóa bằng Homomixer tốc độ cao (≥3000 rpm) để đảm bảo hạt nhũ mịn.`,
      });
    } else {
      messages.push({
        tone: "safe",
        text: `Tỷ lệ Nhũ hóa/Dầu đạt ${(ratio * 100).toFixed(0)}% — đạt chuẩn ổn định nhũ tương theo khuyến nghị Iwata & Shimada (≥ 20%).`,
      });
    }
  } else if (emulsifier > 0) {
    messages.push({
      tone: "caution",
      text: "Có chất nhũ hóa nhưng chưa khai báo Pha Dầu — kiểm tra lại vì nhũ hóa chỉ cần thiết khi hệ có hai pha Dầu/Nước không đồng tan.",
    });
  }

  if (oil > water && oil > 0) {
    messages.push({
      tone: "caution",
      text: `Pha Dầu (${oil.toFixed(1)}%) đang nhiều hơn Pha Nước (${water.toFixed(1)}%) — hệ có xu hướng nghiêng W/O (Nước trong Dầu). Cân nhắc chất nhũ hóa chuyên biệt cho W/O (Sorbitan Sesquioleate, PGPR, Diglycerol Dioleate) thay vì hệ O/W thông thường.`,
    });
  }

  if (active > 15) {
    messages.push({
      tone: "caution",
      text: `Tổng hoạt chất (${active.toFixed(1)}%) khá cao — cần đối chiếu nồng độ tối đa cho phép của từng hoạt chất tại mục Tra cứu CIR để tránh vượt ngưỡng an toàn.`,
    });
  }

  if (messages.length === 0) {
    messages.push({ tone: "safe", text: "Công thức cân đối, chưa phát hiện rủi ro rõ rệt." });
  }

  return messages;
}

const TONE_STYLE: Record<Message["tone"], { icon: typeof CheckCircle2; classes: string }> = {
  safe: { icon: CheckCircle2, classes: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  caution: { icon: AlertTriangle, classes: "bg-amber-50 text-amber-700 ring-amber-200" },
  restricted: { icon: XCircle, classes: "bg-rose-50 text-rose-700 ring-rose-200" },
};

function PhaseSection({
  phaseKey,
  rows,
  onChange,
}: {
  phaseKey: PhaseKey;
  rows: Row[];
  onChange: (rows: Row[]) => void;
}) {
  const meta = PHASE_META[phaseKey];
  const total = rows.reduce((sum, r) => sum + (Number.isFinite(r.percent) ? r.percent : 0), 0);
  const inputId = useId();

  const updateRow = (id: string, patch: Partial<Row>) => {
    onChange(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
      <div className="flex items-center justify-between">
        <div>
          <p className={cn("text-sm font-bold", meta.color)}>{meta.label}</p>
          <p className="text-[13px] text-slate-400">{meta.hint}</p>
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", meta.color, "bg-surface")}>
          {total.toFixed(1)}%
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-2">
            <input
              aria-label="Tên nguyên liệu"
              value={row.name}
              onChange={(e) => updateRow(row.id, { name: e.target.value })}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-primary-400 focus:outline-none"
              placeholder="Tên nguyên liệu"
            />
            <div className="flex shrink-0 items-center gap-1">
              <input
                id={`${inputId}-${row.id}`}
                aria-label="Phần trăm"
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={row.percent}
                onChange={(e) => updateRow(row.id, { percent: parseFloat(e.target.value) || 0 })}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-right text-xs focus:border-primary-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
            <button
              onClick={() => onChange(rows.filter((r) => r.id !== row.id))}
              className="shrink-0 rounded-lg p-1.5 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
              aria-label="Xóa dòng"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onChange([...rows, { id: newId(), name: "Nguyên liệu mới", percent: 0 }])}
        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary-500"
      >
        <Plus size={14} /> Thêm nguyên liệu
      </button>
    </div>
  );
}

export default function FormulationCalculator() {
  const [state, setState] = useState(DEFAULT_STATE);

  const totals = useMemo(() => {
    const entries = Object.entries(state) as [PhaseKey, Row[]][];
    return entries.reduce(
      (acc, [key, rows]) => {
        acc[key] = rows.reduce((s, r) => s + (Number.isFinite(r.percent) ? r.percent : 0), 0);
        return acc;
      },
      { oil: 0, water: 0, emulsifier: 0, active: 0 } as Record<PhaseKey, number>
    );
  }, [state]);

  const grandTotal = totals.oil + totals.water + totals.emulsifier + totals.active;
  const messages = useMemo(() => analyzeStability(totals), [totals]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-primary-700">Tổng công thức</p>
          <span
            className={cn(
              "text-lg font-extrabold",
              Math.abs(grandTotal - 100) < 0.05 ? "text-emerald-600" : "text-accent-500"
            )}
          >
            {grandTotal.toFixed(1)}%
          </span>
        </div>
        <div className="mt-3 flex h-3.5 w-full overflow-hidden rounded-full bg-surface">
          {(Object.keys(PHASE_META) as PhaseKey[]).map((key) => {
            const pct = grandTotal > 0 ? (totals[key] / Math.max(grandTotal, 100)) * 100 : 0;
            return (
              <motion.div
                key={key}
                className={PHASE_META[key].bar}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.35 }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {(Object.keys(PHASE_META) as PhaseKey[]).map((key) => (
            <span key={key} className="flex items-center gap-1 text-[12px] text-slate-500">
              <span className={cn("h-2 w-2 rounded-full", PHASE_META[key].bar)} />
              {PHASE_META[key].label.split(" (")[0]}
            </span>
          ))}
        </div>
      </div>

      {(Object.keys(PHASE_META) as PhaseKey[]).map((key) => (
        <PhaseSection
          key={key}
          phaseKey={key}
          rows={state[key]}
          onChange={(rows) => setState((s) => ({ ...s, [key]: rows }))}
        />
      ))}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-primary-700">Phân tích ổn định (Iwata & Shimada)</p>
        {messages.map((m, i) => {
          const Icon = TONE_STYLE[m.tone].icon;
          return (
            <div
              key={i}
              className={cn(
                "flex gap-2.5 rounded-2xl p-3.5 text-xs leading-relaxed ring-1",
                TONE_STYLE[m.tone].classes
              )}
            >
              <Icon size={16} className="mt-0.5 shrink-0" />
              <p>{m.text}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setState(DEFAULT_STATE)}
        className="flex items-center justify-center gap-2 self-center rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-500"
      >
        <RotateCcw size={14} /> Đặt lại công thức mẫu
      </button>
    </div>
  );
}
