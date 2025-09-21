export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export const suitSymbol: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export interface CardType {
  id: string;
  suit: Suit;
  rank: Rank;
  suitSymbol: string;
}

export type FreeCell = CardType | null;

export type FoundationStack = CardType[];

export type TableauStack = CardType[];
