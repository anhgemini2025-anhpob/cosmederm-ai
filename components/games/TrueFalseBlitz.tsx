"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Flame, X } from "lucide-react";
import { TRUE_FALSE_STATEMENTS } from "@/lib/content";
import { cn } from "@/lib/utils";
import GameResult from "./GameResult";

const ROUND_SECONDS = 6;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TrueFalseBlitz() {
  const [pool, setPool] = useState(TRUE_FALSE_STATEMENTS);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);

  const finished = step >= pool.length;
  const current = pool[step];

  useEffect(() => {
    setPool(shuffle(TRUE_FALSE_STATEMENTS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (finished || answer !== null) return;
    if (timeLeft <= 0) {
      setAnswer(false);
      setStreak(0);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answer, finished]);

  const choose = (choice: boolean) => {
    if (answer !== null || finished) return;
    setAnswer(choice);
    if (choice === current.isTrue) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    setStep((s) => s + 1);
    setAnswer(null);
    setTimeLeft(ROUND_SECONDS);
  };

  const reset = () => {
    setPool(shuffle(TRUE_FALSE_STATEMENTS));
    setStep(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswer(null);
    setTimeLeft(ROUND_SECONDS);
  };

  if (finished) {
    return (
      <GameResult
        title="Hoàn thành Blitz!"
        scoreLine={`${score}/${pool.length} câu đúng`}
        detail={`Chuỗi đúng liên tiếp dài nhất: ${bestStreak}`}
        onReplay={reset}
      />
    );
  }

  const timerPct = (timeLeft / ROUND_SECONDS) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>Câu {step + 1}/{pool.length}</span>
        <span className="flex items-center gap-1 text-accent-500">
          <Flame size={14} /> Chuỗi {streak}
        </span>
        <span>Điểm {score}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className={cn("h-full", timeLeft <= 2 ? "bg-rose-500" : "bg-primary-500")}
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </div>

      <div className="rounded-2xl bg-white p-5 text-center shadow-card ring-1 ring-black/[0.03]">
        <p className="text-sm font-semibold leading-relaxed text-primary-700">{current.statement}</p>
      </div>

      {answer === null ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => choose(true)}
            className="rounded-2xl bg-emerald-500 py-4 text-base font-bold text-white active:scale-[0.97]"
          >
            ĐÚNG
          </button>
          <button
            onClick={() => choose(false)}
            className="rounded-2xl bg-rose-500 py-4 text-base font-bold text-white active:scale-[0.97]"
          >
            SAI
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-2xl p-3.5 text-xs font-semibold",
              answer === current.isTrue ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}
          >
            {answer === current.isTrue ? <Check size={16} /> : <X size={16} />}
            {current.isTrue ? "Đúng" : "Sai"} — {current.explanation}
          </div>
          <button
            onClick={next}
            className="rounded-full bg-primary-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            {step + 1 === pool.length ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        </div>
      )}
    </div>
  );
}
