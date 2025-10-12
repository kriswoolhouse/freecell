import {
  CARD_COLORS,
  type CardType,
  type MoveDestination,
  type MoveSource,
} from "@/types";

interface CardProps {
  card: CardType;
  isSelected: boolean;
  handleStackClick: (moveClicked: MoveSource | MoveDestination) => void;
  moveData: MoveSource | MoveDestination;
  isInteractive: boolean;
}

// TODO
// Is card interactive?
// A card being interactive does not mean it can move
// It can be picked up / clicked (might shake)
// If !card then interactive = false
// If card is bottom of stack then interactive = true
// If card is part of sub-stack then interactive = true
export default function Card({
  card,
  isSelected,
  handleStackClick,
  moveData,
  isInteractive,
}: CardProps) {
  const cardColour =
    CARD_COLORS[card.suit] === "red" ? "text-red-400" : "text-black";

  return (
    <button
      type="button"
      onClick={isInteractive ? () => handleStackClick(moveData) : undefined}
      className={`appearance-none border-none p-0 bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 rounded-lg h-fit ${isInteractive ? "cursor-pointer" : ""} ${isSelected ? "-translate-y-2" : ""}`}
      tabIndex={isInteractive ? undefined : -1}
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
