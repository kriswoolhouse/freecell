import type { CardType } from "@/types";

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  const isRed = card.suit === "hearts" || card.suit === "diamonds";
  const cardColour = isRed ? "text-red-400" : "text-black";

  return (
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
  );
}
