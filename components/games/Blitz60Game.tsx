"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { QUIZ_QUESTIONS, TRUE_FALSE_STATEMENTS } from "@/lib/content";
import { safetyTone, cn } from "@/lib/utils";
import GameResult from "./GameResult";

const database = cirData as CirDatabase;
const DURATION = 60;
const HIGH_SCORE_KEY = "cosmederm_blitz60_highscore";

type Item =
  | { kind: "tf"; prompt: string; options: string[]; correct: number }
  | { kind: "mc"; prompt: string; options: string[]; correct: number }
  | { kind: "safety"; prompt: string; options: string[]; correct: number };

function buildPool(): Item[] {
  const tf: Item[] = TRUE_FALSE_STATEMENTS.map((s) => ({
    kind: "tf",
    prompt: s.statement,
    options: ["Đúng", "Sai"],
    correct: s.isTrue ? 0 : 1,
  }));
  const mc: Item[] = QUIZ_QUESTIONS.map((q) => ({
    kind: "mc",
    prompt: q.question,
    options: q.options,
    correct: q.correctIndex,
  }));
  const toneLabel = { safe: "An toàn", caution: "Thận trọng", restricted: "Hạn chế" } as const;
  const safety: Item[] = database.ingredients.map((ing) => {
    const tone = safetyTone(ing.cir_safety_status);
    const opts = ["safe", "caution", "restricted"] as const;
    return {
      kind: "safety",
      prompt: `${ing.inci_name} thuộc nhóm an toàn nào?`,
      options: opts.map((o) => toneLabel[o]),
      correct: opts.indexOf(tone),
    };
  });
  const all = [...tf, ...mc, ...safety];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

export default function Blitz60Game() {
  const [pool] = useState(buildPool);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HIGH_SCORE_KEY);
      if (raw) setHighScore(parseInt(raw, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timeLeft]);

  const finished = started && timeLeft <= 0;

  useEffect(() => {
    if (finished) {
      try {
        const best = Math.max(highScore, score);
        window.localStorage.setItem(HIGH_SCORE_KEY, String(best));
        setHighScore(best);
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const current = pool[index % pool.length];

  const choose = (i: number) => {
    if (finished) return;
    if (i === current.correct) setScore((s) => s + 1);
    setIndex((n) => n + 1);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setStarted(false);
    setTimeLeft(DURATION);
  };

  if (finished) {
    return (
      <GameResult
        title="Hết giờ!"
        scoreLine={`${score} câu đúng`}
        detail={`🏆 Kỷ lục cá nhân: ${highScore}`}
        onReplay={reset}
      />
    );
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-black/[0.03]">
        <Trophy size={32} className="text-accent-500" />
        <p className="text-sm text-slate-500">
          Trộn lẫn câu hỏi Đúng/Sai, trắc nghiệm và phân loại an toàn. Trả lời càng nhiều càng tốt trong 60 giây!
        </p>
        {highScore > 0 && <p className="text-xs font-semibold text-primary-600">Kỷ lục hiện tại: {highScore}</p>}
        <button
          onClick={() => setStarted(true)}
          className="rounded-full bg-gradient-to-br from-accent-500 to-rose-600 px-6 py-3 text-sm font-bold text-white active:scale-[0.97]"
        >
          Bắt đầu đấu trường
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className={cn(timeLeft <= 10 ? "text-rose-500" : "text-primary-600")}>⏱ {timeLeft}s</span>
        <span className="text-slate-500">Điểm: {score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className={cn("h-full", timeLeft <= 10 ? "bg-rose-500" : "bg-accent-500")}
          animate={{ width: `${(timeLeft / DURATION) * 100}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </div>
      <div className="rounded-2xl bg-white p-4 text-sm font-semibold leading-relaxed text-primary-700 shadow-card ring-1 ring-black/[0.03]">
        {current.prompt}
      </div>
      <div className="flex flex-col gap-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className="rounded-xl bg-white px-4 py-3 text-left text-xs font-medium text-slate-600 shadow-card ring-1 ring-black/[0.03] active:scale-[0.98]"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
