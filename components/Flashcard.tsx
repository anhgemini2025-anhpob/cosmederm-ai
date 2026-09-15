"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Check, RotateCcw, Sparkles } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { safetyTone } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const database = cirData as CirDatabase;

const TONE_LABEL: Record<string, string> = {
  safe: "An toàn khi dùng đúng cách",
  caution: "An toàn có điều kiện",
  restricted: "Cần đặc biệt thận trọng",
};

function SingleCard({
  ingredient,
  active,
  onDecision,
}: {
  ingredient: (typeof database.ingredients)[number];
  active: boolean;
  onDecision: (known: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const knowOpacity = useTransform(x, [20, 120], [0, 1]);
  const reviewOpacity = useTransform(x, [-120, -20], [1, 0]);
  const tone = safetyTone(ingredient.cir_safety_status);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110) onDecision(true);
        else if (info.offset.x < -110) onDecision(false);
      }}
      onTap={() => setFlipped((f) => !f)}
      initial={{ scale: 0.94, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <div className="relative h-full w-full cursor-pointer select-none rounded-3xl bg-white p-6 shadow-card-lg ring-1 ring-black/[0.04]">
        <motion.div
          style={{ opacity: knowOpacity }}
          className="pointer-events-none absolute right-5 top-5 rounded-full border-2 border-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-500"
        >
          Đã biết
        </motion.div>
        <motion.div
          style={{ opacity: reviewOpacity }}
          className="pointer-events-none absolute left-5 top-5 rounded-full border-2 border-rose-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-500"
        >
          Ôn lại
        </motion.div>

        {!flipped ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary-500">
              <Sparkles size={26} />
            </div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-400">
              {ingredient.chemical_class_function}
            </p>
            <h3 className="text-2xl font-bold leading-snug text-primary-700">
              {ingredient.inci_name}
            </h3>
            <div className="flex flex-wrap justify-center gap-1.5">
              {ingredient.applications.slice(0, 3).map((app) => (
                <Badge key={app} tone="neutral">
                  {app}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Chạm để xem đây có phải thành phần an toàn không →
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center gap-3">
            <Badge tone={tone === "safe" ? "safe" : tone === "caution" ? "caution" : "restricted"}>
              {TONE_LABEL[tone]}
            </Badge>
            <p className="text-sm font-semibold text-primary-700">{ingredient.inci_name}</p>
            <p className="text-xs leading-relaxed text-slate-600">{ingredient.toxicology_notes}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-surface p-2.5">
                <p className="font-semibold text-primary-600">Leave-on</p>
                <p className="text-slate-500">{ingredient.max_concentration.leave_on}</p>
              </div>
              <div className="rounded-xl bg-surface p-2.5">
                <p className="font-semibold text-primary-600">Rinse-off</p>
                <p className="text-slate-500">{ingredient.max_concentration.rinse_off}</p>
              </div>
            </div>
            <p className="text-[12px] italic text-slate-400">
              Nguồn: {ingredient.book_sources[0]}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Flashcard() {
  const deck = useMemo(() => database.ingredients, []);
  const [index, setIndex] = useState(0);
  const [stats, setStats] = useState({ known: 0, review: 0 });
  const finished = index >= deck.length;

  const handleDecision = (known: boolean) => {
    setStats((s) => (known ? { ...s, known: s.known + 1 } : { ...s, review: s.review + 1 }));
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setIndex(0);
    setStats({ known: 0, review: 0 });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {!finished && (
        <div className="flex w-full items-center justify-between text-xs font-medium text-slate-400">
          <span>
            Thẻ {index + 1}/{deck.length}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-500">
              <Check size={13} /> {stats.known}
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <BookOpen size={13} /> {stats.review}
            </span>
          </span>
        </div>
      )}

      <div className="relative h-[340px] w-full max-w-sm">
        <AnimatePresence>
          {!finished ? (
            <SingleCard
              key={deck[index].id}
              ingredient={deck[index]}
              active
              onDecision={handleDecision}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-6 text-center shadow-card-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                <Sparkles size={26} />
              </div>
              <h3 className="text-lg font-bold text-primary-700">Hoàn thành bộ thẻ!</h3>
              <p className="text-sm text-slate-500">
                Đã biết {stats.known} · Cần ôn lại {stats.review}
              </p>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
              >
                <RotateCcw size={16} /> Làm lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!finished && (
        <div className="flex gap-4">
          <button
            onClick={() => handleDecision(false)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-amber-600 shadow-card active:scale-95"
            aria-label="Cần ôn lại"
          >
            <BookOpen size={18} /> Cần ôn lại
          </button>
          <button
            onClick={() => handleDecision(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-600 shadow-card active:scale-95"
            aria-label="Đã biết"
          >
            <Check size={18} /> Đã biết
          </button>
        </div>
      )}
      <p className="text-center text-[13px] text-slate-400">
        Vuốt thẻ sang phải nếu bạn đã biết, sang trái nếu cần ôn lại — hoặc chạm để xem đáp án.
      </p>
    </div>
  );
}
