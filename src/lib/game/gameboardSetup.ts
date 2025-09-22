import type {
  CardType,
  FoundationStack,
  FreeCell,
  TableauStack,
} from "@/types";

export function createFreeCells(): FreeCell[] {
  return [null, null, null, null];
}

function createFoundation(): FoundationStack {
  return { suit: null, stack: [] };
}

export function createFoundations(): FoundationStack[] {
  return Array.from({ length: 4 }, () => createFoundation());
}

export function createTableau(deck: CardType[]): TableauStack[] {
  const tableau: TableauStack[] = Array.from({ length: 8 }, () => []);

  deck.forEach((card, index) => {
    tableau[index % 8].push(card);
  });

  return tableau;
}
