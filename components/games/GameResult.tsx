"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RotateCcw, Trophy } from "lucide-react";

export default function GameResult({
  title,
  scoreLine,
  detail,
  onReplay,
}: {
  title: string;
  scoreLine: string;
  detail?: string;
  onReplay: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-card-lg ring-1 ring-black/[0.03]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white">
        <Trophy size={26} />
      </div>
      <h3 className="text-lg font-bold text-primary-700">{title}</h3>
      <p className="text-sm font-semibold text-slate-600">{scoreLine}</p>
      {detail && <p className="text-xs text-slate-400">{detail}</p>}
      <div className="mt-1 flex gap-2.5">
        <button
          onClick={onReplay}
          className="flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
        >
          <RotateCcw size={16} /> Chơi lại
        </button>
        <Link
          href="/games"
          className="flex items-center gap-2 rounded-full bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-600 active:scale-[0.98]"
        >
          Trò chơi khác
        </Link>
      </div>
    </motion.div>
  );
}
