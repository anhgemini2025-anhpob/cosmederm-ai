import Link from "next/link";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import RoleSelector from "@/components/RoleSelector";
import { LIBRARY_BOOKS } from "@/lib/content";

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Lộ trình học tập"
        subtitle="3 tiến trình cá nhân hóa theo mục tiêu"
        backHref="/"
        icon={<GraduationCap size={20} />}
      />
      <div className="px-5">
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          Mỗi tiến trình được thiết kế riêng cho một nhóm người học — từ người mới tìm hiểu chăm sóc da,
          sinh viên chuyên ngành, đến chuyên gia R&amp;D và phát triển sản phẩm mỹ phẩm chuyên nghiệp.
        </p>
        <RoleSelector />
      </div>

      <div className="px-5">
        <Link
          href="/library"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white shadow-card-lg active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <BookOpen size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold">Phụ lục: Thư viện tri thức</p>
            <p className="text-xs text-white/80">
              {LIBRARY_BOOKS.length} quyển sách nguồn (Anh/Việt) — tóm tắt, mục lục & yêu cầu nhận tài liệu
            </p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-white/70" />
        </Link>
      </div>
    </div>
  );
}
