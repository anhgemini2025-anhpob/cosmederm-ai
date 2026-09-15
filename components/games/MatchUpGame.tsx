"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Droplet, Flame, Heart, Leaf, Snowflake, Sparkles, Sun, Zap } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { cn } from "@/lib/utils";
import GameResult from "./GameResult";

const database = cirData as CirDatabase;

const CARD_THEMES = [
  { Icon: Droplet, bg: "from-sky-400 to-sky-600" },
  { Icon: Leaf, bg: "from-emerald-400 to-emerald-600" },
  { Icon: Sparkles, bg: "from-accent-400 to-accent-600" },
  { Icon: Sun, bg: "from-amber-400 to-amber-600" },
  { Icon: Heart, bg: "from-rose-400 to-rose-600" },
  { Icon: Snowflake, bg: "from-cyan-400 to-cyan-600" },
  { Icon: Flame, bg: "from-orange-400 to-orange-600" },
  { Icon: Zap, bg: "from-violet-400 to-violet-600" },
];

interface Card {
  cardId: string;
  pairId: string;
  label: string;
  kind: "name" | "fn";
  theme: number;
}

function shortFn(fn: string) {
  return fn.split("/")[0].trim();
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const picked = shuffle(database.ingredients).slice(0, 6);
  const cards: Card[] = [];
  picked.forEach((ing, i) => {
    const theme = i % CARD_THEMES.length;
    cards.push({ cardId: `${ing.id}-a`, pairId: ing.id, label: ing.inci_name, kind: "name", theme });
    cards.push({ cardId: `${ing.id}-b`, pairId: ing.id, label: shortFn(ing.chemical_class_function), kind: "fn", theme });
  });
  return shuffle(cards);
}

export default function MatchUpGame() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setDeck(buildDeck());
  }, []);

  const won = deck.length > 0 && matched.size === 6;

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  };

  const onFlip = (card: Card) => {
    if (locked || matched.has(card.pairId) || flipped.includes(card.cardId)) return;
    const next = [...flipped, card.cardId];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = next;
      const first = deck.find((c) => c.cardId === firstId)!;
      const second = deck.find((c) => c.cardId === secondId)!;
      if (first.pairId === second.pairId) {
        setMatched((m) => new Set(m).add(first.pairId));
        setFlipped([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 700);
      }
    }
  };

  if (deck.length === 0) return null;

  if (won) {
    return (
      <GameResult
        title="Ghép cặp hoàn tất!"
        scoreLine={`${moves} lượt lật`}
        detail={moves <= 8 ? "Trí nhớ siêu đỉnh!" : "Chơi lại để phá kỷ lục nhé!"}
        onReplay={reset}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>Đã ghép {matched.size}/6</span>
        <span>Lượt lật: {moves}</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {deck.map((card) => {
          const isMatched = matched.has(card.pairId);
          const isFlipped = isMatched || flipped.includes(card.cardId);
          const { Icon, bg } = CARD_THEMES[card.theme];
          return (
            <button
              key={card.cardId}
              onClick={() => onFlip(card)}
              disabled={isMatched}
              className="h-24 [perspective:800px]"
            >
              <motion.div
                className="relative h-full w-full [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br shadow-card [backface-visibility:hidden]",
                    bg
                  )}
                >
                  <Icon size={28} className="text-white drop-shadow" />
                </div>
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-xl p-1.5 text-center text-[12px] font-semibold leading-tight [backface-visibility:hidden] [transform:rotateY(180deg)]",
                    isMatched
                      ? "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-300"
                      : "bg-primary-50 text-primary-700 ring-1 ring-primary-200"
                  )}
                >
                  {isMatched && <Check size={12} className="absolute right-1 top-1 text-emerald-500" />}
                  {card.label}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      <p className="text-center text-[13px] text-slate-400">
        Tìm đúng cặp Tên INCI ↔ Chức năng hóa học của cùng một thành phần.
      </p>
    </div>
  );
}
