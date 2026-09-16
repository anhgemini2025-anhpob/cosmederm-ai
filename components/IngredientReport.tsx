"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, ExternalLink, FileDown, Loader2, Sparkles } from "lucide-react";
import { buildLabelReadingPrompt, parseAiReport } from "@/lib/aiReportParser";
import type { MatchResult } from "@/lib/ingredientMatcher";
import { safetyTone } from "@/lib/utils";
import { AUTHOR } from "@/lib/content";

const AI_LINKS = [
  { name: "Claude", url: "https://claude.ai/new" },
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Gemini", url: "https://gemini.google.com/app" },
];

export default function IngredientReport({
  imageUrl,
  ocrTokens,
  dbMatches,
}: {
  imageUrl: string | null;
  ocrTokens: string[];
  dbMatches: MatchResult[];
}) {
  const [aiAnswer, setAiAnswer] = useState("");
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(() => buildLabelReadingPrompt(ocrTokens), [ocrTokens]);
  const parsed = useMemo(() => parseAiReport(aiAnswer), [aiAnswer]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const dbIngredientRows = dbMatches
    .filter((r) => r.ingredient)
    .map((r) => ({
      name: r.ingredient!.inci_name,
      function: r.ingredient!.chemical_class_function,
      tone: safetyTone(r.ingredient!.cir_safety_status),
    }));

  const aiIngredientNames = new Set(parsed.ingredients.map((i) => i.name.toLowerCase()));
  const combinedIngredients = [
    ...dbIngredientRows.filter((r) => !aiIngredientNames.has(r.name.toLowerCase())),
    ...parsed.ingredients.map((i) => ({ name: i.name, function: i.function || "Chưa rõ chức năng", tone: null as null })),
  ];

  const hasReport = aiAnswer.trim().length > 0 || dbIngredientRows.length > 0;

  const exportPdf = async () => {
    if (!reportRef.current) return;
    const previewTab = window.open("", "_blank");
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(imgData, "JPEG", (pageWidth - w) / 2, 8, w, h);
      const blobUrl = URL.createObjectURL(pdf.output("blob"));
      if (previewTab) previewTab.location.href = blobUrl;
      else window.open(blobUrl, "_blank");
    } catch (err) {
      console.error(err);
      previewTab?.close();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-primary-50 p-4">
        <p className="flex items-center gap-2 text-xs font-bold text-primary-700">
          <Sparkles size={14} /> Bước 1 — Nhờ AI đọc ảnh chi tiết hơn
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-primary-700/80">
          Sao chép câu lệnh bên dưới, mở một công cụ AI, <strong>đính kèm lại ảnh vừa chụp</strong> rồi dán câu lệnh vào cùng tin nhắn.
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <button
            onClick={copyPrompt}
            className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-primary-600 shadow-card"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Đã sao chép" : "Sao chép câu lệnh"}
          </button>
          {AI_LINKS.map((ai) => (
            <a
              key={ai.name}
              href={ai.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-primary-600 shadow-card"
            >
              {ai.name} <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <p className="text-xs font-bold text-primary-700">Bước 2 — Dán câu trả lời của AI vào đây</p>
        <textarea
          value={aiAnswer}
          onChange={(e) => setAiAnswer(e.target.value)}
          placeholder={"TÊN SẢN PHẨM: ...\nTHƯƠNG HIỆU/NHÀ SẢN XUẤT: ...\nLOẠI BAO BÌ: ...\nTHÀNH PHẦN:\n- ...: ..."}
          rows={6}
          className="mt-2 w-full resize-none rounded-xl bg-surface p-3 text-xs leading-relaxed text-slate-600 outline-none ring-1 ring-black/[0.05] focus:ring-primary-300"
        />
      </div>

      {hasReport && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-primary-700">Bước 3 — Báo cáo tổng hợp</p>

          <div ref={reportRef} className="mx-auto w-full max-w-[560px] bg-white p-6 text-slate-800">
            <div className="flex items-center justify-between border-b-2 border-primary-500 pb-3">
              <div>
                <p className="text-sm font-black tracking-tight text-primary-700">CosmeDerm AI Academy</p>
                <p className="text-[12px] text-slate-400">Báo cáo phân tích thành phần mỹ phẩm</p>
              </div>
              <p className="text-[12px] text-slate-400">{new Date().toLocaleDateString("vi-VN")}</p>
            </div>

            <div className="mt-4 flex gap-4">
              {imageUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imageUrl} alt="Ảnh sản phẩm" className="h-28 w-28 shrink-0 rounded-lg object-cover ring-1 ring-black/10" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-wide text-slate-400">Tên sản phẩm</p>
                <p className="text-sm font-bold text-primary-700">{parsed.productName || "Chưa xác định"}</p>
                <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-400">Thương hiệu / Nhà sản xuất</p>
                <p className="text-xs text-slate-600">{parsed.manufacturer || "Chưa xác định"}</p>
                <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-400">Đóng gói</p>
                <p className="text-xs text-slate-600">{parsed.packaging || "Chưa xác định"}</p>
              </div>
            </div>

            <p className="mb-1.5 mt-4 text-[12px] font-bold uppercase tracking-wide text-slate-400">
              Thành phần &amp; công dụng ({combinedIngredients.length})
            </p>
            <div className="flex flex-col gap-1">
              {combinedIngredients.map((ing, i) => (
                <div key={i} className="flex items-start justify-between gap-3 rounded-md bg-surface px-2.5 py-1.5 text-[10.5px]">
                  <span className="min-w-0 shrink-0 font-semibold text-primary-700">{ing.name}</span>
                  <span className="text-right leading-snug text-slate-500">{ing.function}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-2.5 text-[11px] text-slate-400">
              <span>CosmeDerm AI Academy · {AUTHOR.name} · {AUTHOR.phone}</span>
              <span>Chỉ mang tính tham khảo, không thay thế tư vấn chuyên môn</span>
            </div>
          </div>

          <button
            onClick={exportPdf}
            disabled={exporting}
            className="flex items-center justify-center gap-2 self-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white active:scale-[0.98] disabled:opacity-60"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
            {exporting ? "Đang tạo PDF..." : "Xuất báo cáo PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
