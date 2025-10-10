import OpenCell from "@/components/OpenCell";
import PlayingCard from "@/components/PlayingCard";
import type { CardType, MoveDestination, MoveSource } from "@/types";

interface CardProps {
  card: CardType | null;
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
  if (card) {
    return (
      <PlayingCard
        isInteractive={isInteractive}
        card={card}
        isSelected={isSelected}
        handleStackClick={handleStackClick}
        moveData={moveData}
      />
    );
  }

  return <OpenCell handleStackClick={handleStackClick} moveData={moveData} />;
}
