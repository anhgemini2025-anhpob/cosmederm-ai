import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import GlogauSpeedGame from "@/components/games/GlogauSpeedGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("glogau-speed");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <GlogauSpeedGame />
    </GameShell>
  );
}
