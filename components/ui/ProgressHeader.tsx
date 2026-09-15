import { motion } from "framer-motion";

export default function ProgressHeader({ count, total }: { count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  const done = count === total && total > 0;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-primary-700">Tiến độ lộ trình</span>
        <span className={done ? "text-emerald-600" : "text-slate-400"}>
          {count}/{total} bài học
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className={done ? "h-full bg-emerald-500" : "h-full bg-primary-500"}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      {done && <p className="mt-2 text-[13px] font-medium text-emerald-600">🎉 Hoàn thành lộ trình này!</p>}
    </div>
  );
}
