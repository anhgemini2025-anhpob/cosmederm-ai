import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import Flashcard from "@/components/Flashcard";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("flashcard-safety");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <Flashcard />
    </GameShell>
  );
}
