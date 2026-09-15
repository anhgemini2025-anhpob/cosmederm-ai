import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import WordGuessGame from "@/components/games/WordGuessGame";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("word-guess");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <WordGuessGame />
    </GameShell>
  );
}
