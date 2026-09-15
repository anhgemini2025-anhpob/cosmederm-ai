"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { TOP_NAV_HEIGHT } from "@/components/ui/TopNav";

export default function PageHeader({
  title,
  subtitle,
  backHref,
  icon,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  icon?: ReactNode;
}) {
  return (
    <div
      className="sticky z-40 bg-soft/95 backdrop-blur-lg px-5 pb-4 pt-6"
      style={{ top: TOP_NAV_HEIGHT }}
    >
      <div className="mx-auto flex max-w-2xl items-center gap-3 lg:max-w-5xl xl:max-w-6xl">
        {backHref && (
          <Link
            href={backHref}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-card text-primary-500"
            aria-label="Quay lại"
          >
            <ChevronLeft size={20} />
          </Link>
        )}
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-card">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-primary-700">{title}</h1>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
