"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import clinicalData from "@/data/clinical_cases.json";
import type { ClinicalDatabase, GlogauLevel } from "@/lib/types";
import { GLOGAU_LEVELS, cn, extractGlogauLevels } from "@/lib/utils";
import GameResult from "./GameResult";

const database = clinicalData as ClinicalDatabase;
const ROUND_SECONDS = 10;

interface Round {
  prompt: string;
  answer: GlogauLevel;
}

function baseRounds(): Round[] {
  const fromLevels: Round[] = GLOGAU_LEVELS.map((g) => ({ prompt: g.description, answer: g.level }));
  const fromCases: Round[] = database.clinical_cases.map((c) => ({
    prompt: c.patient_profile.primary_complaints,
    answer: (extractGlogauLevels(c.patient_profile.glogau_classification)[0] as GlogauLevel) ?? "III",
  }));
  return [...fromLevels, ...fromCases];
}

function shuffleRounds(all: Round[]): Round[] {
  const a = [...all];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GlogauSpeedGame() {
  const [rounds, setRounds] = useState(baseRounds);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [picked, setPicked] = useState<GlogauLevel | null>(null);

  useEffect(() => {
    setRounds(shuffleRounds(baseRounds()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finished = step >= rounds.length;
  const current = rounds[step];

  useEffect(() => {
    if (finished || picked) return;
    if (timeLeft <= 0) {
      setPicked("__timeout__" as GlogauLevel);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, picked, finished]);

  const choose = (level: GlogauLevel) => {
    if (picked) return;
    setPicked(level);
    if (level === current.answer) {
      setScore((s) => s + Math.max(10, timeLeft * 10));
    }
  };

  const next = () => {
    setStep((s) => s + 1);
    setPicked(null);
    setTimeLeft(ROUND_SECONDS);
  };

  const reset = () => {
    setRounds(shuffleRounds(baseRounds()));
    setStep(0);
    setScore(0);
    setPicked(null);
    setTimeLeft(ROUND_SECONDS);
  };

  if (finished) {
    return <GameResult title="Chẩn đoán hoàn tất!" scoreLine={`${score} điểm`} onReplay={reset} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>Ca {step + 1}/{rounds.length}</span>
        <span>Điểm {score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className={cn("h-full", timeLeft <= 3 ? "bg-rose-500" : "bg-primary-500")}
          animate={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </div>
      <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-card ring-1 ring-black/[0.03]">
        {current.prompt}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {(["I", "II", "III", "IV"] as GlogauLevel[]).map((level) => {
          const showState = picked !== null;
          const isAnswer = level === current.answer;
          const isPicked = level === picked;
          return (
            <button
              key={level}
              onClick={() => choose(level)}
              disabled={showState}
              className={cn(
                "rounded-xl py-4 text-sm font-bold ring-1 transition-colors",
                !showState && "bg-white text-primary-600 ring-black/[0.05] active:scale-95",
                showState && isAnswer && "bg-emerald-500 text-white ring-emerald-500",
                showState && isPicked && !isAnswer && "bg-rose-500 text-white ring-rose-500",
                showState && !isPicked && !isAnswer && "bg-white text-slate-300 ring-black/[0.05]"
              )}
            >
              {level}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl p-3 text-xs font-semibold",
              picked === current.answer ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}
          >
            {picked === current.answer ? <Check size={14} /> : <X size={14} />}
            Đáp án đúng: Glogau {current.answer}
          </div>
          <button
            onClick={next}
            className="rounded-full bg-primary-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            {step + 1 === rounds.length ? "Xem kết quả" : "Ca tiếp theo"}
          </button>
        </div>
      )}
    </div>
  );
}
