"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, FileDown, Loader2, MessageCircle, Trash2, X } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryBookCard from "@/components/LibraryBookCard";
import { useBookCart } from "@/components/useBookCart";
import { LIBRARY_BOOKS, AUTHOR } from "@/lib/content";

const ZALO_URL = "https://zalo.me/84908095693";

export default function LibraryPage() {
  const { cart, toggle, clear } = useBookCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const cartBooks = LIBRARY_BOOKS.filter((b) => cart.has(b.slug));

  const printRequest = async () => {
    if (!sheetRef.current) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(sheetRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(imgData, "JPEG", (pageWidth - w) / 2, 10, w, h);
      pdf.save("phieu-yeu-cau-tai-lieu.pdf");
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-24">
      <PageHeader
        title="Phụ lục: Thư viện tri thức"
        subtitle={`${LIBRARY_BOOKS.length} nguồn tài liệu nền tảng`}
        backHref="/learn"
        icon={<BookOpen size={20} />}
      />
      <div className="flex flex-col gap-3 px-5">
        <p className="text-xs leading-relaxed text-slate-500">
          Toàn bộ nội dung trong CosmeDerm AI Academy được tổng hợp và trích dẫn từ 10 nguồn tài
          liệu chuyên sâu sau. Chọn (nhấn dấu +) những cuốn bạn quan tâm, sau đó in phiếu yêu cầu để gửi.
        </p>
        {LIBRARY_BOOKS.map((book) => (
          <LibraryBookCard
            key={book.slug}
            book={book}
            selected={cart.has(book.slug)}
            onToggleSelect={() => toggle(book.slug)}
          />
        ))}
      </div>

      {cart.size > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary-500 px-5 py-3 text-xs font-semibold text-white shadow-card-lg active:scale-[0.98]"
        >
          <BookOpen size={15} /> Xem yêu cầu ({cart.size})
        </button>
      )}

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 sm:max-w-md sm:rounded-3xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-primary-700">Phiếu yêu cầu tài liệu ({cartBooks.length})</p>
                <button onClick={() => setCartOpen(false)} className="text-slate-400">
                  <X size={18} />
                </button>
              </div>

              <div ref={sheetRef} className="mx-auto w-full bg-white p-5 text-slate-800">
                <div className="flex items-center justify-between border-b-2 border-primary-500 pb-3">
                  <div>
                    <p className="text-sm font-black tracking-tight text-primary-700">CosmeDerm AI Academy</p>
                    <p className="text-[11px] text-slate-400">Phiếu yêu cầu nhận tài liệu</p>
                  </div>
                  <p className="text-[11px] text-slate-400">{new Date().toLocaleDateString("vi-VN")}</p>
                </div>

                <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Tài liệu yêu cầu ({cartBooks.length})
                </p>
                <div className="flex flex-col gap-1.5">
                  {cartBooks.map((b) => (
                    <div key={b.slug} className="rounded-lg bg-surface p-2.5">
                      <p className="text-xs font-semibold text-primary-700">{b.title}</p>
                      <p className="text-[11px] text-slate-400">{b.authors}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-slate-200 pt-2.5 text-[11px] text-slate-500">
                  Người nhận yêu cầu: <strong className="text-primary-700">{AUTHOR.name}</strong> — {AUTHOR.phone}
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 px-1">
                <button
                  onClick={printRequest}
                  disabled={exporting}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white active:scale-[0.98] disabled:opacity-60"
                >
                  {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
                  {exporting ? "Đang tạo PDF..." : "In phiếu yêu cầu (PDF)"}
                </button>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-surface py-2.5 text-xs font-semibold text-primary-600"
                >
                  <MessageCircle size={14} /> Gửi trực tiếp qua Zalo
                </a>
                <button onClick={clear} className="text-[11px] font-semibold text-slate-400">
                  Xóa toàn bộ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
