import type { ReactNode } from "react";
import { AUTHOR } from "@/lib/content";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary-700 via-primary-600 to-primary-500">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 top-1/2 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
        <div className="my-auto">
          <header className="flex flex-col items-center text-center text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-192.png"
              alt=""
              width={76}
              height={76}
              className="h-[76px] w-[76px] rounded-[20px] shadow-card-lg ring-2 ring-white/30"
            />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">CosmeDerm AI Academy</h1>
            <p className="mt-1 text-sm text-white/80">Học Da Liễu &amp; Làm Mỹ Phẩm bằng AI</p>
          </header>
          <div className="mt-7">{children}</div>
        </div>

        <footer className="pt-6 text-center text-[13px] leading-relaxed text-white/70">
          <p className="font-semibold">
            {AUTHOR.credit} {AUTHOR.name}
          </p>
          <p>
            {AUTHOR.phone} · {AUTHOR.date}
          </p>
        </footer>
      </div>
    </div>
  );
}
