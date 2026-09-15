import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import TrueFalseBlitz from "@/components/games/TrueFalseBlitz";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("true-false");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <TrueFalseBlitz />
    </GameShell>
  );
}
