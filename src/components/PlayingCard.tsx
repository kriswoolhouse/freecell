import { moveCard } from "@/lib/game/gameplay";
import type { CardType } from "@/types";

interface PlayingCardProps {
  card: CardType;
  interactive: boolean;
}

export default function PlayingCard({ card, interactive }: PlayingCardProps) {
  const isRed = card.suit === "hearts" || card.suit === "diamonds";
  const cardColour = isRed ? "text-red-400" : "text-black";

  return (
    <button
      type="button"
      onClick={interactive ? () => moveCard() : undefined}
      className={`appearance-none border-none p-0 bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 rounded-lg h-fit ${interactive ? "cursor-pointer" : ""}`}
      tabIndex={interactive ? undefined : -1}
    >
      <div
        className={`aspect-[5/7] rounded-lg bg-white border-gray-400 border flex flex-col justify-between items-center py-1 px-2 shadow-md select-none font-bold text-xl ${cardColour}`}
      >
        {/* Top left */}
        <div className={`w-full flex items-center justify-start text-xl gap-1`}>
          <span>{card.rank}</span>
          <span className="text-2xl">{card.suitSymbol}</span>
        </div>

        {/* Center */}
        <div className={`w-full flex items-center justify-center text-6xl`}>
          <span>{card.suitSymbol}</span>
        </div>

        {/* Bottom right */}
        <div className={`w-full flex items-center justify-end text-xl`}>
          <span>{card.rank}</span>
          <span className="text-2xl">{card.suitSymbol}</span>
        </div>
      </div>
    </button>
  );
}
