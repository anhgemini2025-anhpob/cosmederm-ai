"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, MessageCircle, Trash2, X } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryBookCard from "@/components/LibraryBookCard";
import { useBookCart } from "@/components/useBookCart";
import { LIBRARY_BOOKS, AUTHOR } from "@/lib/content";

const ZALO_URL = "https://zalo.me/84908095693";

export default function LibraryPage() {
  const { cart, toggle, clear } = useBookCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cartBooks = LIBRARY_BOOKS.filter((b) => cart.has(b.slug));

  const copyRequest = () => {
    const text = cartBooks.map((b) => `- ${b.title} (${b.authors})`).join("\n");
    navigator.clipboard
      .writeText(`Tôi muốn yêu cầu nhận các tài liệu sau:\n${text}\n\nNgười nhận: ${AUTHOR.name} — ${AUTHOR.phone}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
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
          liệu chuyên sâu sau. Chọn (nhấn dấu +) những cuốn bạn quan tâm rồi gửi một yêu cầu duy nhất.
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
              className="max-h-[75vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 sm:max-w-md sm:rounded-3xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-primary-700">Yêu cầu nhận sách ({cartBooks.length})</p>
                <button onClick={() => setCartOpen(false)} className="text-slate-400">
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {cartBooks.map((b) => (
                  <div key={b.slug} className="flex items-center justify-between gap-2 rounded-xl bg-surface p-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-primary-700">{b.title}</p>
                      <p className="truncate text-[11px] text-slate-400">{b.authors}</p>
                    </div>
                    <button onClick={() => toggle(b.slug)} className="shrink-0 text-slate-400" aria-label="Xóa">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-3 rounded-xl bg-primary-50 p-3 text-[11px] leading-relaxed text-primary-700">
                Người nhận yêu cầu: <strong>{AUTHOR.name}</strong> — {AUTHOR.phone}
              </p>

              <div className="mt-3 flex flex-col gap-2">
                <button onClick={copyRequest} className="rounded-full bg-surface py-2.5 text-xs font-semibold text-primary-600">
                  {copied ? "Đã sao chép danh sách" : "Sao chép danh sách yêu cầu"}
                </button>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white active:scale-[0.98]"
                >
                  <MessageCircle size={14} /> Gửi yêu cầu qua Zalo
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
