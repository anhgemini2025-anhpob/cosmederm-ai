"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Plus } from "lucide-react";
import type { LibraryBook } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function LibraryBookCard({
  book,
  selected,
  onToggleSelect,
}: {
  book: LibraryBook;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={book.slug}
      className="scroll-mt-24 rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03]"
    >
      <div className="flex w-full items-start gap-3 p-4 text-left">
        <button onClick={() => setOpen((o) => !o)} className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-500">
            {book.order}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-snug text-primary-700">{book.title}</p>
            <p className="mt-0.5 text-xs text-slate-400">{book.authors}</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-wide text-accent-500">
              {book.focus}
            </p>
          </div>
          <ChevronDown
            size={18}
            className={cn("mt-1 shrink-0 text-slate-400 transition-transform", open && "rotate-180")}
          />
        </button>
        <button
          onClick={onToggleSelect}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            selected ? "bg-primary-500 text-white" : "bg-surface text-primary-500"
          )}
          aria-label={selected ? "Bỏ khỏi yêu cầu" : "Thêm vào yêu cầu"}
        >
          {selected ? <Check size={15} /> : <Plus size={15} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border-t border-slate-100 p-4 pt-3.5">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wide text-primary-600">Nội dung</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{book.summary}</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="text-[13px] font-bold uppercase tracking-wide text-primary-600">Ý nghĩa</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{book.significance}</p>
              </div>
              {book.chapters && (
                <div>
                  <p className="mb-1.5 text-[13px] font-bold uppercase tracking-wide text-primary-600">
                    Mục lục tham khảo
                  </p>
                  <ul className="flex flex-col gap-1">
                    {book.chapters.map((ch) => (
                      <li key={ch} className="text-[13px] leading-relaxed text-slate-500">
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={onToggleSelect}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold active:scale-[0.98]",
                  selected ? "bg-primary-50 text-primary-600" : "bg-primary-500 text-white"
                )}
              >
                {selected ? (
                  <>
                    <Check size={14} /> Đã thêm vào yêu cầu
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Thêm vào yêu cầu nhận sách
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
