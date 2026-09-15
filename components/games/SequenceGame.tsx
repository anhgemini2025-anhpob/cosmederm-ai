"use client";

import { useEffect, useMemo, useState } from "react";
import { Reorder } from "framer-motion";
import { CheckCircle2, GripVertical, RotateCcw, XCircle } from "lucide-react";
import formulationData from "@/data/formulations.json";
import type { FormulationDatabase } from "@/lib/types";
import { cn } from "@/lib/utils";
import GameResult from "./GameResult";

const database = formulationData as FormulationDatabase;

function cleanStep(step: string) {
  return step.replace(/^\d+\.\s*/, "");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickFormula() {
  const formula = database.formulations[Math.floor(Math.random() * database.formulations.length)];
  const correct = formula.manufacturing_instructions.map(cleanStep);
  let shuffled = shuffle(correct);
  // avoid trivially starting already-correct
  let guard = 0;
  while (shuffled.join("|") === correct.join("|") && guard < 5) {
    shuffled = shuffle(correct);
    guard++;
  }
  return { title: formula.title, correct, items: shuffled.map((text, i) => ({ id: `${i}-${text.slice(0, 10)}`, text })) };
}

export default function SequenceGame() {
  const [round, setRound] = useState<ReturnType<typeof pickFormula> | null>(null);
  const [items, setItems] = useState<ReturnType<typeof pickFormula>["items"]>([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const r = pickFormula();
    setRound(r);
    setItems(r.items);
  }, []);

  const isRight = useMemo(
    () => (round ? items.map((it) => round.correct.includes(it.text) && round.correct[items.indexOf(it)] === it.text) : []),
    [items, round]
  );

  const check = () => {
    if (!round) return;
    const count = items.filter((it, i) => round.correct[i] === it.text).length;
    setCorrectCount(count);
    setChecked(true);
    if (count === items.length) setTimeout(() => setFinished(true), 900);
  };

  const nextRound = () => {
    const r = pickFormula();
    setRound(r);
    setItems(r.items);
    setChecked(false);
    setFinished(false);
  };

  if (!round) return null;

  if (finished) {
    return (
      <GameResult
        title="Sắp xếp chính xác!"
        scoreLine={round.title}
        detail="Bạn đã nắm đúng quy trình sản xuất chuẩn."
        onReplay={nextRound}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <p className="text-xs font-semibold text-accent-500">{round.title}</p>
        <p className="mt-1 text-xs text-slate-500">
          Kéo thả để sắp xếp các bước sản xuất theo đúng thứ tự chuẩn.
        </p>
      </div>

      <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-2">
        {items.map((item, i) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className={cn(
              "flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs shadow-card ring-1",
              !checked && "ring-black/[0.03]",
              checked && isRight[i] && "ring-2 ring-emerald-300 bg-emerald-50",
              checked && !isRight[i] && "ring-2 ring-rose-300 bg-rose-50"
            )}
          >
            <GripVertical size={16} className="shrink-0 text-slate-300" />
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-[12px] font-bold text-primary-600">
              {i + 1}
            </span>
            <span className="flex-1 leading-snug text-slate-600">{item.text}</span>
            {checked && (isRight[i] ? <CheckCircle2 size={16} className="shrink-0 text-emerald-500" /> : <XCircle size={16} className="shrink-0 text-rose-500" />)}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {!checked ? (
        <button
          onClick={check}
          className="rounded-full bg-primary-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          Kiểm tra thứ tự
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-primary-700">
            Đúng {correctCount}/{items.length} vị trí
          </p>
          <button
            onClick={nextRound}
            className="flex items-center gap-2 rounded-full bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-600 active:scale-[0.98]"
          >
            <RotateCcw size={16} /> Thử công thức khác
          </button>
        </div>
      )}
    </div>
  );
}
