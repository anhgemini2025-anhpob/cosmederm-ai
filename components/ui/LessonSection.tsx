"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function LessonSection({
  number,
  title,
  subtitle,
  done,
  onToggle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  done: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="mb-1 flex items-center gap-2">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold",
            done ? "bg-emerald-500 text-white" : "bg-primary-50 text-primary-500"
          )}
        >
          {done ? <Check size={13} /> : number}
        </span>
        <h2 className="text-base font-bold text-primary-700">{title}</h2>
      </div>
      {subtitle && <p className="mb-3 ml-8 text-xs text-slate-500">{subtitle}</p>}
      <div className={subtitle ? "" : "mt-3"}>{children}</div>
      <button
        onClick={onToggle}
        className={cn(
          "mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
          done ? "bg-emerald-50 text-emerald-600" : "bg-primary-50 text-primary-600"
        )}
      >
        <Check size={14} /> {done ? "Đã hoàn thành bài học" : "Đánh dấu đã học xong"}
      </button>
    </section>
  );
}
