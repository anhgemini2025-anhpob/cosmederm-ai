import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import Blitz60Game from "@/components/games/Blitz60Game";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("blitz-60");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <Blitz60Game />
    </GameShell>
  );
}
