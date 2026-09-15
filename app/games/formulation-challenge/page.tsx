import GameShell from "@/components/games/GameShell";
import { getGame } from "@/lib/games";
import FormulationChallenge from "@/components/games/FormulationChallenge";
import { notFound } from "next/navigation";

export default function Page() {
  const game = getGame("formulation-challenge");
  if (!game) return notFound();
  return (
    <GameShell game={game}>
      <FormulationChallenge />
    </GameShell>
  );
}
