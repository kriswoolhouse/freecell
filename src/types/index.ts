export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export const CARD_COLORS: { [key in Suit]: "red" | "black" } = {
  hearts: "red",
  diamonds: "red",
  clubs: "black",
  spades: "black",
};

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

export const RANK_VALUES: { [key in Rank]: number } = {
  A: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
};

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

export type FoundationStack =
  | { suit: null; stack: [] }
  | { suit: Suit; stack: CardType[] };

export type TableauStack = CardType[];
