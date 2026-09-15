import { BookOpenCheck } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { GUIDE_SECTIONS } from "@/lib/guide";

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Hướng dẫn sử dụng"
        subtitle="Cầm tay chỉ việc — đơn giản, dễ hiểu"
        backHref="/"
        icon={<BookOpenCheck size={20} />}
      />
      <div className="flex flex-col gap-3 px-5">
        <p className="text-xs leading-relaxed text-slate-500">
          App có {GUIDE_SECTIONS.length} khu vực chính. Mỗi mục dưới đây giải thích khu vực đó dùng để làm gì và
          cách dùng theo từng bước — không cần biết trước gì cả.
        </p>
        {GUIDE_SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-xl">
                {s.emoji}
              </div>
              <p className="text-sm font-bold text-primary-700">{s.title}</p>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{s.what}</p>
            <ol className="mt-3 flex flex-col gap-1.5 border-t border-slate-100 pt-3">
              {s.steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-[10px] font-bold text-accent-500">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
