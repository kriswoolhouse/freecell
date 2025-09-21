import OpenCell from "@/components/OpenCell";
import PlayingCard from "@/components/PlayingCard";
import type { CardType } from "@/types";

interface CardProps {
  card: CardType | null;
}

// TODO
// Is card interactive?
// A card being interactive does not mean it can move
// It can be picked up / clicked (might shake)
// If !card then interactive = false
// If card is bottom of stack then interactive = true
// If card is part of sub-stack then interactive = true
export default function Card({ card }: CardProps) {
  if (card) {
    return <PlayingCard interactive={interactive} card={card} />;
  }

  return <OpenCell />;
}
