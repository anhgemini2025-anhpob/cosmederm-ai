import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import Quiz from "@/components/Quiz";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("case-quiz");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <Quiz />
    </GameShell>
  );
}
