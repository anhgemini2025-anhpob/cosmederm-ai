import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "safe" | "caution" | "restricted" | "neutral" | "accent" | "primary";

const toneClasses: Record<Tone, string> = {
  safe: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  caution: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  restricted: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  accent: "bg-accent-50 text-accent-600 ring-1 ring-accent-200",
  primary: "bg-primary-50 text-primary-500 ring-1 ring-primary-100",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
