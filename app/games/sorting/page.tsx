import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import SortingGame from "@/components/games/SortingGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("sorting");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <SortingGame />
    </GameShell>
  );
}
