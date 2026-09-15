"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import GameResult from "./GameResult";

const database = cirData as CirDatabase;
const SEGMENTS = database.ingredients.slice(0, 10);
const SEGMENT_ANGLE = 360 / SEGMENTS.length;
const COLORS = ["#0F4C5C", "#E36414", "#3D7D89", "#FB8B24", "#092E38"];

function buildConicGradient() {
  const stops = SEGMENTS.map((_, i) => {
    const color = COLORS[i % COLORS.length];
    return `${color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export default function SpinWheelGame() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<(typeof SEGMENTS)[number] | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());

  const allFound = discovered.size === SEGMENTS.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLanded(null);
    const index = Math.floor(Math.random() * SEGMENTS.length);
    const spins = 5 * 360;
    const targetCenter = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const offset = (360 - targetCenter) % 360;
    const nextRotation = rotation + spins + offset + (360 - (rotation % 360));
    setRotation(nextRotation);
    setTimeout(() => {
      setLanded(SEGMENTS[index]);
      setDiscovered((d) => new Set(d).add(SEGMENTS[index].id));
      setSpinning(false);
    }, 3000);
  };

  const reset = () => {
    setDiscovered(new Set());
    setLanded(null);
  };

  if (allFound && landed) {
    return (
      <GameResult
        title="Khám phá trọn bộ!"
        scoreLine={`${SEGMENTS.length}/${SEGMENTS.length} thành phần`}
        detail="Bạn đã quay trúng toàn bộ vòng quay tri thức."
        onReplay={reset}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-xs text-slate-400">Đã khám phá {discovered.size}/{SEGMENTS.length} thành phần</p>

      <div className="relative h-64 w-64">
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "16px solid #E36414",
          }}
        />
        <motion.div
          className="h-64 w-64 rounded-full shadow-card-lg ring-4 ring-white"
          style={{ background: buildConicGradient() }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.17, 0.67, 0.32, 1] }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
            <Sparkles size={22} className="text-accent-500" />
          </div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="rounded-full bg-gradient-to-br from-accent-400 to-accent-600 px-8 py-3 text-sm font-bold text-white shadow-card-lg active:scale-[0.97] disabled:opacity-60"
      >
        {spinning ? "Đang quay..." : "Quay ngay!"}
      </button>

      {landed && !spinning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]"
        >
          <p className="text-sm font-bold text-primary-700">🎉 {landed.inci_name}</p>
          <p className="mt-1 text-xs text-slate-500">{landed.chemical_class_function}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{landed.toxicology_notes}</p>
        </motion.div>
      )}
    </div>
  );
}
