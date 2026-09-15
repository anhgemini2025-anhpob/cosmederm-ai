import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import MatchUpGame from "@/components/games/MatchUpGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("match-up");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <MatchUpGame />
    </GameShell>
  );
}
