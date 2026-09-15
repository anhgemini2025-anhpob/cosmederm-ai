"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = step >= QUIZ_QUESTIONS.length;

  const current = QUIZ_QUESTIONS[step];

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-black/[0.03]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white">
          <Trophy size={26} />
        </div>
        <h3 className="text-lg font-bold text-primary-700">Hoàn thành Case Study Quiz!</h3>
        <p className="text-sm text-slate-500">
          Điểm số: {score}/{QUIZ_QUESTIONS.length}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
        >
          <RotateCcw size={16} /> Làm lại
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-400">
        <span>
          Câu {step + 1}/{QUIZ_QUESTIONS.length}
        </span>
        <span>Điểm: {score}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-bold leading-snug text-primary-700">{current.question}</p>
          <div className="mt-3 flex flex-col gap-2">
            {current.options.map((opt, idx) => {
              const isCorrect = idx === current.correctIndex;
              const isSelected = idx === selected;
              const showState = selected !== null;
              return (
                <button
                  key={idx}
                  onClick={() => choose(idx)}
                  disabled={showState}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition-colors",
                    !showState && "border-slate-200 text-slate-600 active:scale-[0.98]",
                    showState && isCorrect && "border-emerald-300 bg-emerald-50 text-emerald-700",
                    showState && isSelected && !isCorrect && "border-rose-300 bg-rose-50 text-rose-700",
                    showState && !isSelected && !isCorrect && "border-slate-100 text-slate-400"
                  )}
                >
                  {opt}
                  {showState && isCorrect && <CheckCircle2 size={16} className="shrink-0" />}
                  {showState && isSelected && !isCorrect && <XCircle size={16} className="shrink-0" />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 overflow-hidden"
            >
              <p className="rounded-xl bg-surface p-3 text-[13px] leading-relaxed text-slate-600">
                {current.explanation}
              </p>
              <button
                onClick={next}
                className="mt-3 w-full rounded-full bg-primary-500 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
              >
                {step + 1 === QUIZ_QUESTIONS.length ? "Xem kết quả" : "Câu tiếp theo"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
