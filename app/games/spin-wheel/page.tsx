import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import SpinWheelGame from "@/components/games/SpinWheelGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("spin-wheel");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <SpinWheelGame />
    </GameShell>
  );
}
