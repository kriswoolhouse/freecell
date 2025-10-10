import {
  CARD_COLORS,
  type CardType,
  type FoundationStack,
  type FreeCell,
  type MoveDestination,
  type MoveSource,
  RANK_VALUES,
  type TableauStack,
} from "@/types";

export function getStackFromMoveSource(
  moveSource: MoveSource,
  tableau: TableauStack[],
  freeCells: FreeCell[],
): CardType[] {
  let selectedStack: CardType[];

  switch (moveSource.type) {
    case "tableau":
      selectedStack = tableau[moveSource.stackIndex].slice(
        moveSource.cardIndex,
      );
      break;

    case "freecell":
      selectedStack = freeCells[moveSource.stackIndex];
  }

  return selectedStack;
}

export function isValidMove(
  stackToMove: CardType[],
  destination: MoveDestination,
  foundations: FoundationStack[],
  freeCells: FreeCell[],
  tableau: TableauStack[],
): boolean {
  if (stackToMove.length === 0) {
    return false;
  }

  const isMovingSingleCard = stackToMove.length === 1;

  switch (destination.type) {
    case "foundation":
      return (
        isMovingSingleCard &&
        canMoveCardToFoundation(
          stackToMove[0],
          foundations,
          destination.stackIndex,
        )
      );

    case "freecell":
      return (
        isMovingSingleCard && freeCells[destination.stackIndex].length === 0
      );

    case "tableau": {
      const freeCellCount = freeCells.reduce((count, freeCell) => {
        return freeCell.length === 0 ? ++count : count;
      }, 0);

      let availableEmptyStackCount = tableau.reduce((count, tableauStack) => {
        return tableauStack.length === 0 ? ++count : count;
      }, 0);

      if (tableau[destination.stackIndex].length === 0) {
        availableEmptyStackCount--;
      }

      return canMoveStackToTableauStack(
        stackToMove,
        tableau[destination.stackIndex],
        freeCellCount,
        availableEmptyStackCount,
      );
    }

    default:
      console.log("Move was not accounted for...");
      return false;
  }
}

function canMoveCardToFoundation(
  cardToMove: CardType,
  foundations: FoundationStack[],
  destinationIndex: number,
): boolean {
  const targetFoundation = foundations[destinationIndex];
  const targetStack = targetFoundation.stack;
  const foundationTopCard = targetStack[targetStack.length - 1];

  // Moving Ace to free foundation
  // AH -> F:0
  const doesntHaveFoundationForSuit = foundations.every(
    (foundation, foundationIndex) => {
      return (
        destinationIndex !== foundationIndex &&
        cardToMove.suit !== foundation.suit
      );
    },
  );

  const movingAceToEmptyFoundation =
    doesntHaveFoundationForSuit &&
    cardToMove.rank === "A" &&
    targetFoundation.suit === null;

  // Moving non-Ace on top of correct existing foundation
  // 3H -> F:2H
  const cardIsSameSuit = cardToMove.suit === targetFoundation.suit;
  const cardProceedsDestination =
    RANK_VALUES[cardToMove.rank] === RANK_VALUES[foundationTopCard.rank] + 1;
  const correctlyMovingCardToFoundation =
    cardIsSameSuit && cardProceedsDestination;

  return movingAceToEmptyFoundation || correctlyMovingCardToFoundation;
}

function canMoveStackToTableauStack(
  stackToMove: TableauStack,
  destinationStack: TableauStack,
  freecellCount: number,
  availableEmptyStackCount: number,
): boolean {
  // Able to move a stack of this size?
  const maxMovableCards = getMaxMovableCards(
    freecellCount,
    availableEmptyStackCount,
  );
  if (stackToMove.length > maxMovableCards) {
    return false;
  }

  // Is destination stack empty
  if (destinationStack.length === 0) {
    return true;
  }

  const baseMovingCard = stackToMove[0];
  const destinationCard = destinationStack[destinationStack.length - 1];

  const cardsInCorrectOrder =
    RANK_VALUES[destinationCard.rank] === RANK_VALUES[baseMovingCard.rank] + 1;

  const cardsOfOppositeColour =
    CARD_COLORS[baseMovingCard.suit] !== CARD_COLORS[destinationCard.suit];

  return cardsInCorrectOrder && cardsOfOppositeColour;
}

function getMaxMovableCards(
  freeCellCount: number,
  availableEmptyStackCount: number,
): number {
  return (freeCellCount + 1) * 2 ** availableEmptyStackCount;
}

// TODO Cards are moving but it's deleting the whole stack
export function moveStack(
  stackToMove: CardType[],
  source: MoveSource,
  destination: MoveDestination,
  currentState: {
    tableau: TableauStack[];
    freeCells: FreeCell[];
    foundations: FoundationStack[];
  },
) {
  const newTableau = currentState.tableau.map((stack) => [...stack]);
  const newFreeCells = [...currentState.freeCells];
  const newFoundations = currentState.foundations.map(
    (foundation): FoundationStack => {
      if (foundation.suit === null) {
        return { suit: null, stack: [] };
      }
      return { suit: foundation.suit, stack: [...foundation.stack] };
    },
  );

  // 1. Remove stack from source
  if (source.type === "tableau") {
    newTableau[source.stackIndex].splice(
      newTableau[source.stackIndex].length - stackToMove.length,
    );
  } else if (source.type === "freecell") {
    newFreeCells[source.stackIndex].pop();
  }

  // 2. Add stack to bottom of destination
  if (destination.type === "tableau") {
    newTableau[destination.stackIndex].push(...stackToMove);
  } else if (destination.type === "freecell") {
    newFreeCells[destination.stackIndex] = [stackToMove[0]];
  } else if (destination.type === "foundation") {
    const foundation = newFoundations[destination.stackIndex];
    if (foundation.suit === null) {
      newFoundations[destination.stackIndex] = {
        suit: stackToMove[0].suit,
        stack: stackToMove,
      };
    } else {
      foundation.stack.push(...stackToMove);
    }
  }

  return { newTableau, newFreeCells, newFoundations };
}

export function isStackSelectable(
  moveSource: MoveSource,
  selectedStack: CardType[],
): boolean {
  return (
    (moveSource.type === "freecell" && selectedStack.length > 0) ||
    (moveSource.type === "tableau" && isValidSubStack(selectedStack))
  );
}

export function isValidSubStack(subStack: TableauStack): boolean {
  return subStack.every((card, index, stack) => {
    if (index === 0) {
      return true;
    }

    const previousCard = stack[index - 1];
    return (
      RANK_VALUES[previousCard.rank] === RANK_VALUES[card.rank] + 1 &&
      CARD_COLORS[previousCard.suit] !== CARD_COLORS[card.suit]
    );
  });
}
