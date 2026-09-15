"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, RotateCcw, Upload, X } from "lucide-react";
import cirData from "@/data/cir_ingredients.json";
import type { CirDatabase } from "@/lib/types";
import { matchIngredients, splitIngredientList, type MatchResult } from "@/lib/ingredientMatcher";
import { safetyTone, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import IngredientReport from "@/components/IngredientReport";

const database = cirData as CirDatabase;

type Stage = "idle" | "ocr" | "done" | "error";

export default function ScanIngredients() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [rawText, setRawText] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setImageUrl(null);
    setStage("idle");
    setProgress(0);
    setRawText("");
    setResults([]);
  };

  const onFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStage("ocr");
    setProgress(0);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      setRawText(data.text);
      const tokens = splitIngredientList(data.text);
      setResults(matchIngredients(tokens, database.ingredients));
      setStage("done");
    } catch (err) {
      console.error(err);
      setStage("error");
    }
  };

  const matched = results.filter((r) => r.ingredient);
  const unmatched = results.filter((r) => !r.ingredient);

  return (
    <div className="flex flex-col gap-4">
      {stage === "idle" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-black/[0.03]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-500">
            <Camera size={26} />
          </div>
          <p className="text-sm text-slate-500">
            Chụp hoặc tải ảnh bảng thành phần (INCI) trên bao bì sản phẩm — hệ thống sẽ đọc và đối
            chiếu với cơ sở dữ liệu {database.ingredients.length} thành phần.
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            <Upload size={16} /> Chọn / Chụp ảnh
          </button>
        </div>
      )}

      {imageUrl && (
        <div className="relative overflow-hidden rounded-2xl shadow-card ring-1 ring-black/[0.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Ảnh bảng thành phần" className="max-h-64 w-full object-cover" />
          <button
            onClick={reset}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
            aria-label="Xóa ảnh"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {stage === "ocr" && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/[0.03]">
          <Loader2 size={24} className="animate-spin text-primary-500" />
          <p className="text-xs text-slate-500">Đang nhận diện văn bản... {progress}%</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <motion.div className="h-full bg-primary-500" animate={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {stage === "error" && (
        <div className="rounded-2xl bg-rose-50 p-4 text-xs text-rose-700 ring-1 ring-rose-200">
          Không thể đọc ảnh này. Vui lòng thử ảnh rõ nét hơn.
        </div>
      )}

      {stage === "done" && (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-slate-400">
            Tìm thấy {results.length} thành phần trong ảnh — khớp {matched.length}/{results.length} với cơ sở dữ liệu.
          </p>

          {matched.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-bold text-primary-700">✅ Đã nhận diện</p>
              {matched.map(({ token, ingredient }, i) => {
                const tone = safetyTone(ingredient!.cir_safety_status);
                return (
                  <div key={i} className="rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-black/[0.03]">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-primary-700">{ingredient!.inci_name}</p>
                      <Badge tone={tone === "safe" ? "safe" : tone === "caution" ? "caution" : "restricted"}>
                        {tone === "safe" ? "An toàn" : tone === "caution" ? "Thận trọng" : "Hạn chế"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[13px] text-slate-400">Từ ảnh: &quot;{token}&quot;</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ingredient!.toxicology_notes}</p>
                  </div>
                );
              })}
            </div>
          )}

          {unmatched.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-bold text-primary-700">❔ Chưa có trong cơ sở dữ liệu</p>
              <div className="flex flex-wrap gap-1.5">
                {unmatched.map((r, i) => (
                  <span key={i} className="rounded-full bg-surface px-2.5 py-1 text-[13px] text-slate-500">
                    {r.token}
                  </span>
                ))}
              </div>
            </div>
          )}

          <details className="rounded-xl bg-surface p-3 text-[12px] text-slate-400">
            <summary className="cursor-pointer font-semibold">Xem văn bản OCR gốc</summary>
            <p className="mt-1.5 whitespace-pre-line">{rawText}</p>
          </details>

          <div className="border-t border-dashed border-slate-200 pt-4">
            <p className="mb-3 text-sm font-bold text-primary-700">📋 Tạo báo cáo đầy đủ bằng AI</p>
            <IngredientReport
              imageUrl={imageUrl}
              ocrTokens={unmatched.map((r) => r.token)}
              dbMatches={results}
            />
          </div>

          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 self-center rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-500"
          >
            <RotateCcw size={14} /> Quét ảnh khác
          </button>
        </div>
      )}

      <p className={cn("text-center text-[12px] text-slate-400", stage !== "idle" && "hidden")}>
        Nhận diện chữ (OCR) chạy hoàn toàn trên trình duyệt — ảnh không được tải lên máy chủ nào.
      </p>
    </div>
  );
}
