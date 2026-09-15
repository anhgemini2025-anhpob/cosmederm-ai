import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import type { GameMeta } from "@/lib/games";

export default function GameShell({ game, children }: { game: GameMeta; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className={`bg-gradient-to-br ${game.gradient} px-5 pb-6 pt-6 text-white`}>
        <div className="mx-auto flex max-w-2xl items-center gap-3 lg:max-w-5xl xl:max-w-6xl">
          <Link
            href="/games"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15"
            aria-label="Quay lại"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl">
            {game.emoji}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70">
              {game.genre}
            </p>
            <h1 className="truncate text-lg font-bold">{game.title}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-2xl px-5">{children}</div>
    </div>
  );
}
