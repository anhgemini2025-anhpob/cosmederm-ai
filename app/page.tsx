import Link from "next/link";
import {
  BookOpen,
  BookOpenCheck,
  FlaskConical,
  GraduationCap,
  Link2,
  Search,
  Sparkles,
  Gamepad2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import RoleSelector from "@/components/RoleSelector";
import ExternalTools from "@/components/ExternalTools";
import { AUTHOR, LIBRARY_BOOKS } from "@/lib/content";
import { GAMES } from "@/lib/games";

const MODULES = [
  {
    href: "/lab",
    title: "Virtual Lab",
    subtitle: "Phòng lab tạo công thức ảo",
    icon: FlaskConical,
    gradient: "from-primary-400 to-primary-600",
  },
  {
    href: "/checker",
    title: "Safety Checker",
    subtitle: "Tra cứu an toàn thành phần CIR",
    icon: Search,
    gradient: "from-accent-400 to-accent-600",
  },
  {
    href: "/clinical",
    title: "Routine Builder",
    subtitle: "Xây dựng routine chăm sóc da cá nhân hóa",
    icon: Sparkles,
    gradient: "from-rose-400 to-accent-600",
  },
  {
    href: "/learn",
    title: "Lộ trình học",
    subtitle: "3 tiến trình học tập cá nhân hóa",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-primary-600",
  },
  {
    href: "/trends",
    title: "Xu hướng & Ý tưởng",
    subtitle: "Cập nhật xu hướng mỹ phẩm toàn cầu",
    icon: TrendingUp,
    gradient: "from-sky-500 to-primary-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-6">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 px-5 pb-8 pt-10 text-white lg:px-10 lg:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-400/25 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70 lg:text-sm">
            CosmeDerm AI Academy
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-balance lg:text-5xl">
            Học Da Liễu &amp; Làm Mỹ Phẩm bằng AI
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 lg:text-base">
            Tích hợp tri thức từ 10 cuốn sách nền tảng — cá nhân hóa theo đúng mục tiêu học tập của bạn.
          </p>
        </div>
      </section>

      <section className="px-5">
        <Link
          href="/guide"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white shadow-card-lg active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <BookOpenCheck size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold">Hướng dẫn sử dụng</p>
            <p className="text-xs text-white/80">Lần đầu dùng app? Xem hướng dẫn từng bước, dễ hiểu.</p>
          </div>
          <ChevronRight size={20} className="shrink-0" />
        </Link>
      </section>

      <section className="px-5">
        <h2 className="mb-1 text-base font-bold text-primary-700">Bạn muốn bắt đầu từ đâu?</h2>
        <p className="mb-4 text-xs text-slate-500">
          Chọn tiến trình phù hợp — nội dung sẽ được cá nhân hóa theo đúng mục tiêu của bạn.
        </p>
        <RoleSelector />
      </section>

      <section className="px-5">
        <h2 className="mb-4 text-base font-bold text-primary-700">Mô-đun tính năng cốt lõi</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03] transition-transform active:scale-[0.97]"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${m.gradient} text-white shadow-card`}
              >
                <m.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-700">{m.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{m.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5">
        <Link
          href="/games"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-accent-500 to-rose-600 p-4 text-white shadow-card-lg active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Gamepad2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold">Trò chơi kiến thức</p>
            <p className="text-xs text-white/85">
              {GAMES.length} thể loại game — học mà chơi, chơi mà nhớ
            </p>
          </div>
          <ChevronRight size={20} className="shrink-0" />
        </Link>
      </section>

      <section className="px-5">
        <Link
          href="/library"
          className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03] active:scale-[0.98]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-card">
            <BookOpen size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-primary-700">Thư viện tri thức nền tảng</p>
            <p className="text-xs text-slate-500">
              {LIBRARY_BOOKS.length} nguồn tài liệu chuyên sâu — tóm tắt, mục lục & yêu cầu nhận sách
            </p>
          </div>
          <ChevronRight size={20} className="shrink-0 text-slate-300" />
        </Link>
      </section>

      <section className="px-5">
        <h2 className="mb-1 flex items-center gap-2 text-base font-bold text-primary-700">
          <Link2 size={18} /> Đối tác &amp; Công cụ mở rộng
        </h2>
        <p className="mb-4 text-xs text-slate-500">
          Khi cần chọn nguyên liệu thật cho công thức, tra cứu sâu hơn tại các Advisor chuyên biệt sau.
        </p>
        <ExternalTools />
      </section>

      <footer className="mt-2 px-5 text-center">
        <div className="border-t border-black/5 pt-5">
          <p className="text-xs font-semibold tracking-wide text-primary-600">
            {AUTHOR.credit} {AUTHOR.name}
          </p>
          <p className="mt-1 text-[13px] text-slate-400">
            {AUTHOR.phone} · {AUTHOR.date}
          </p>
        </div>
      </footer>
    </div>
  );
}
