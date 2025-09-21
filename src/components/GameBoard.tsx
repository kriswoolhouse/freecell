import Card from "@/components/Card";
import Foundations from "@/components/Foundations";
import HoldingCells from "@/components/HoldingCells";
import { createShuffledDeck } from "@/lib/deck/createShuffledDeck";

const deck = createShuffledDeck();

export default function GameBoard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 items-start">
        <HoldingCells />
        <Foundations />
      </div>

      <div className="grid grid-cols-8 gap-x-2 auto-rows-[2rem] grid-flow-row">
        {deck.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
