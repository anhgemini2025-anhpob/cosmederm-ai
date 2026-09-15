"use client";

import { useEffect, useState } from "react";
import { Heart, HeartCrack } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { cn } from "@/lib/utils";
import GameResult from "./GameResult";

const database = cirData as CirDatabase;
const POOL = database.ingredients.filter((i) => !i.inci_name.includes("/") && !i.inci_name.includes("("));
const MAX_LIVES = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function pick() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export default function WordGuessGame() {
  const [word, setWord] = useState<(typeof POOL)[number] | null>(null);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    setWord(pick());
  }, []);

  if (!word) return null;

  const letters = word.inci_name.toUpperCase().split("");
  const won = letters.every((l) => l === " " || guessed.has(l));
  const lost = wrong >= MAX_LIVES;
  const over = won || lost;

  const guess = (letter: string) => {
    if (over || guessed.has(letter)) return;
    setGuessed((g) => new Set(g).add(letter));
    if (!letters.includes(letter)) setWrong((w) => w + 1);
  };

  const reset = () => {
    setWord(pick());
    setGuessed(new Set());
    setWrong(0);
  };

  if (won) {
    return (
      <GameResult
        title="Chính xác!"
        scoreLine={word.inci_name}
        detail={`Bạn còn ${MAX_LIVES - wrong} lượt sai — quá đỉnh!`}
        onReplay={reset}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">Gợi ý: {word.chemical_class_function}</p>
        <div className="flex gap-1">
          {Array.from({ length: MAX_LIVES }).map((_, i) =>
            i < MAX_LIVES - wrong ? (
              <Heart key={i} size={16} className="fill-rose-500 text-rose-500" />
            ) : (
              <HeartCrack key={i} size={16} className="text-slate-200" />
            )
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/[0.03]">
        {letters.map((l, i) =>
          l === " " ? (
            <span key={i} className="w-3" />
          ) : (
            <span
              key={i}
              className="flex h-9 w-7 items-center justify-center border-b-2 border-primary-300 text-lg font-bold text-primary-700"
            >
              {lost || guessed.has(l) ? l : ""}
            </span>
          )
        )}
      </div>

      {lost && (
        <div className="rounded-xl bg-rose-50 p-3 text-center text-xs text-rose-700 ring-1 ring-rose-200">
          Hết lượt! Đáp án: <span className="font-bold">{word.inci_name}</span>
        </div>
      )}

      {!over ? (
        <div className="grid grid-cols-7 gap-1.5">
          {ALPHABET.map((l) => {
            const used = guessed.has(l);
            const isRight = used && letters.includes(l);
            return (
              <button
                key={l}
                onClick={() => guess(l)}
                disabled={used}
                className={cn(
                  "rounded-lg py-2 text-xs font-bold",
                  !used && "bg-surface text-primary-600 active:scale-95",
                  used && isRight && "bg-emerald-100 text-emerald-600",
                  used && !isRight && "bg-slate-100 text-slate-300"
                )}
              >
                {l}
              </button>
            );
          })}
        </div>
      ) : (
        <button
          onClick={reset}
          className="rounded-full bg-primary-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          Từ khác
        </button>
      )}
    </div>
  );
}
