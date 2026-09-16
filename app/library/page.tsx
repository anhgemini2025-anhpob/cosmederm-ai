"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryBookCard from "@/components/LibraryBookCard";
import RequestFormModal from "@/components/RequestFormModal";
import { useBookCart } from "@/components/useBookCart";
import { LIBRARY_BOOKS } from "@/lib/content";

export default function LibraryPage() {
  const { cart, toggle, clear } = useBookCart();
  const [cartOpen, setCartOpen] = useState(false);

  const cartBooks = LIBRARY_BOOKS.filter((b) => cart.has(b.slug));

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
          liệu chuyên sâu sau. Chọn (nhấn dấu +) những cuốn bạn quan tâm, sau đó gửi một phiếu yêu cầu duy nhất.
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

      <RequestFormModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartBooks.map((b) => ({ id: b.slug, title: b.title, subtitle: b.authors }))}
        itemsLabel="Tài liệu"
        onRemoveItem={(id) => toggle(id)}
        onClearAll={clear}
      />
    </div>
  );
}
