import type { CardType, Rank, Suit } from "@/types";
import { suitSymbol } from "@/types";

const suits: Suit[] = ["hearts", "clubs", "diamonds", "spades"];
const ranks: Rank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function createDeck(): CardType[] {
  const deck: CardType[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const card: CardType = {
        id: `${rank}${suit.charAt(0).toUpperCase()}`,
        suit: suit,
        rank: rank,
        suitSymbol: suitSymbol[suit],
      };
      deck.push(card);
    }
  }

  return deck;
}

export function createShuffledDeck(): CardType[] {
  const deck = createDeck();
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
