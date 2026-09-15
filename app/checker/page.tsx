"use client";

import { useState } from "react";
import { Camera, Search } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import IngredientSearch from "@/components/IngredientSearch";
import ScanIngredients from "@/components/ScanIngredients";
import { cn } from "@/lib/utils";

export default function CheckerPage() {
  const [mode, setMode] = useState<"search" | "scan">("search");

  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Smart Ingredient Checker"
        subtitle="Tra cứu an toàn thành phần theo chuẩn CIR"
        backHref="/"
        icon={<Search size={20} />}
      />
      <div className="px-5">
        <div className="flex gap-2 rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-black/[0.03]">
          <button
            onClick={() => setMode("search")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors",
              mode === "search" ? "bg-primary-500 text-white" : "text-slate-500"
            )}
          >
            <Search size={14} /> Tìm kiếm
          </button>
          <button
            onClick={() => setMode("scan")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors",
              mode === "scan" ? "bg-primary-500 text-white" : "text-slate-500"
            )}
          >
            <Camera size={14} /> Chụp ảnh
          </button>
        </div>
      </div>
      <section className="px-5">{mode === "search" ? <IngredientSearch /> : <ScanIngredients />}</section>
    </div>
  );
}
