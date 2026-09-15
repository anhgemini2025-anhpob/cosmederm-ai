import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { GAMES } from "@/lib/games";

export default function GamesHubPage() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Trò Chơi Kiến Thức"
        subtitle={`${GAMES.length} thể loại — học mà chơi, chơi mà nhớ`}
        backHref="/"
        icon={<Gamepad2 size={20} />}
      />
      <div className="grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 xl:grid-cols-3">
        {GAMES.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="group flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03] transition-transform active:scale-[0.98]"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${game.gradient} text-xl shadow-card`}
            >
              {game.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-primary-700">{game.title}</p>
              </div>
              <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-accent-500">
                {game.genre}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
