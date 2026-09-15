"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { safetyTone } from "@/lib/utils";
import { cn } from "@/lib/utils";
import GameResult from "./GameResult";

const database = cirData as CirDatabase;

const BINS: { tone: "safe" | "caution" | "restricted"; label: string; classes: string }[] = [
  { tone: "safe", label: "An toàn", classes: "bg-emerald-500" },
  { tone: "caution", label: "Thận trọng", classes: "bg-amber-500" },
  { tone: "restricted", label: "Hạn chế", classes: "bg-rose-500" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SortingGame() {
  const [deck, setDeck] = useState<CirDatabase["ingredients"]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    setDeck(shuffle(database.ingredients).slice(0, 10));
  }, []);

  const finished = deck.length > 0 && index >= deck.length;
  const current = deck[index];

  if (deck.length === 0) return null;

  const choose = (tone: string) => {
    if (feedback) return;
    const correctTone = safetyTone(current.cir_safety_status);
    const isRight = tone === correctTone;
    setFeedback(isRight ? "correct" : "wrong");
    if (isRight) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setFeedback(null);
      setIndex((i) => i + 1);
    }, 700);
  };

  const reset = () => {
    setDeck(shuffle(database.ingredients).slice(0, 10));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
  };

  if (finished) {
    return (
      <GameResult
        title="Phân loại hoàn tất!"
        scoreLine={`${score}/${deck.length} chính xác`}
        detail={score === deck.length ? "Điểm tuyệt đối!" : "Ghé Tra cứu để ôn lại các thành phần nhé."}
        onReplay={reset}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>Thẻ {index + 1}/{deck.length}</span>
        <span>Điểm {score} · Chuỗi {streak}</span>
      </div>

      <div className="relative h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              backgroundColor:
                feedback === "correct" ? "#ECFDF5" : feedback === "wrong" ? "#FFF1F2" : "#FFFFFF",
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center shadow-card ring-1 ring-black/[0.03]"
          >
            {feedback && (
              <div
                className={cn(
                  "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white",
                  feedback === "correct" ? "bg-emerald-500" : "bg-rose-500"
                )}
              >
                {feedback === "correct" ? <Check size={18} /> : <X size={18} />}
              </div>
            )}
            <p className="text-base font-bold text-primary-700">{current.inci_name}</p>
            <p className="text-xs text-slate-500">{current.chemical_class_function}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {BINS.map((bin) => (
          <button
            key={bin.tone}
            onClick={() => choose(bin.tone)}
            disabled={!!feedback}
            className={cn(
              "rounded-xl py-3.5 text-xs font-bold text-white active:scale-[0.96]",
              bin.classes
            )}
          >
            {bin.label}
          </button>
        ))}
      </div>
    </div>
  );
}
