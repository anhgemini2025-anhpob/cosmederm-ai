"use client";

import { useEffect, useState } from "react";
import { Star, Timer } from "lucide-react";
import GameResult from "./GameResult";

const TARGET_SECONDS = 60;

interface Phase {
  key: "oil" | "water" | "emulsifier" | "active";
  label: string;
  value: number;
  color: string;
}

const INITIAL: Phase[] = [
  { key: "oil", label: "Pha Dầu", value: 20, color: "accent-500" },
  { key: "water", label: "Pha Nước", value: 55, color: "primary-500" },
  { key: "emulsifier", label: "Nhũ hóa", value: 10, color: "emerald-500" },
  { key: "active", label: "Hoạt chất", value: 15, color: "purple-500" },
];

function scoreFormula(phases: Phase[]) {
  const get = (k: Phase["key"]) => phases.find((p) => p.key === k)!.value;
  const total = phases.reduce((s, p) => s + p.value, 0);
  let score = 0;
  const notes: string[] = [];

  const totalDelta = Math.abs(total - 100);
  score += Math.max(0, 40 - totalDelta * 4);
  notes.push(totalDelta < 2 ? "✅ Tổng đạt 100%" : `⚠️ Tổng lệch ${totalDelta.toFixed(0)}%`);

  const oil = get("oil");
  const emulsifier = get("emulsifier");
  const ratio = oil > 0 ? emulsifier / oil : 0;
  if (ratio >= 0.2) {
    score += 30;
    notes.push("✅ Tỷ lệ Nhũ hóa/Dầu đạt chuẩn (≥20%)");
  } else if (ratio >= 0.15) {
    score += 18;
    notes.push("⚠️ Tỷ lệ Nhũ hóa/Dầu ở ngưỡng tối thiểu");
  } else {
    notes.push("❌ Tỷ lệ Nhũ hóa/Dầu quá thấp — nguy cơ tách pha");
  }

  const active = get("active");
  if (active >= 8) {
    score += 30;
    notes.push("✅ Hoạt chất đạt mục tiêu (≥8%)");
  } else {
    score += Math.round((active / 8) * 30);
    notes.push("⚠️ Hoạt chất chưa đạt mục tiêu 8%");
  }

  return { score: Math.round(Math.min(100, score)), notes };
}

export default function FormulationChallenge() {
  const [phases, setPhases] = useState<Phase[]>(INITIAL);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TARGET_SECONDS);
  const [result, setResult] = useState<{ score: number; notes: string[] } | null>(null);

  useEffect(() => {
    if (!started || result) return;
    if (timeLeft <= 0) {
      setResult(scoreFormula(phases));
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, started, result]);

  const update = (key: Phase["key"], value: number) => {
    setPhases((ps) => ps.map((p) => (p.key === key ? { ...p, value } : p)));
  };

  const total = phases.reduce((s, p) => s + p.value, 0);

  const submit = () => setResult(scoreFormula(phases));

  const reset = () => {
    setPhases(INITIAL);
    setStarted(false);
    setTimeLeft(TARGET_SECONDS);
    setResult(null);
  };

  if (result) {
    const stars = result.score >= 85 ? 3 : result.score >= 60 ? 2 : result.score >= 35 ? 1 : 0;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-6 text-center shadow-card-lg ring-1 ring-black/[0.03]">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <Star key={i} size={28} className={i < stars ? "fill-accent-400 text-accent-400" : "text-slate-200"} />
            ))}
          </div>
          <p className="text-lg font-bold text-primary-700">{result.score}/100 điểm</p>
          <div className="mt-2 flex flex-col gap-1 text-left text-xs text-slate-600">
            {result.notes.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </div>
        </div>
        <GameResult title="Thử thách kết thúc" scoreLine={`${stars} sao`} onReplay={reset} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <p className="text-xs font-bold text-primary-700">🎯 Mục tiêu</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Tạo công thức kem O/W ổn định: Tổng = 100%, Tỷ lệ Nhũ hóa/Dầu ≥ 20%, Hoạt chất ≥ 8%.
        </p>
      </div>

      {started && (
        <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-700 shadow-card">
          <Timer size={16} /> {timeLeft}s
        </div>
      )}

      <div className="flex flex-col gap-3">
        {phases.map((p) => (
          <div key={p.key} className="rounded-xl bg-white p-3 shadow-card ring-1 ring-black/[0.03]">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">{p.label}</span>
              <span className="text-primary-600">{p.value}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={p.value}
              onChange={(e) => update(p.key, parseInt(e.target.value, 10))}
              className="w-full accent-primary-500"
            />
          </div>
        ))}
      </div>

      <p className={total === 100 ? "text-center text-xs font-semibold text-emerald-600" : "text-center text-xs font-semibold text-accent-500"}>
        Tổng hiện tại: {total}%
      </p>

      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="rounded-full bg-primary-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          Bắt đầu thử thách (60s)
        </button>
      ) : (
        <button
          onClick={submit}
          className="rounded-full bg-accent-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          Chấm điểm ngay
        </button>
      )}
    </div>
  );
}
