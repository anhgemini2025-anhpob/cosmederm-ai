import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import SequenceGame from "@/components/games/SequenceGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("sequence");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <SequenceGame />
    </GameShell>
  );
}
