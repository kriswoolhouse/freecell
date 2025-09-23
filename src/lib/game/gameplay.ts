import {
  CARD_COLORS,
  type CardType,
  type FoundationStack,
  type FreeCell,
  type MoveDestination,
  RANK_VALUES,
  type TableauStack,
} from "@/types";

function isValidMove(
  stackToMove: CardType[],
  destination: MoveDestination,
  foundations: FoundationStack[],
  freecells: FreeCell[],
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
      return isMovingSingleCard && freecells[destination.cellIndex] === null;

    case "tableau": {
      const freeCellCount = freecells.reduce((count, freeCell) => {
        return freeCell === null ? ++count : count;
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
    RANK_VALUES[baseMovingCard.rank] === RANK_VALUES[destinationCard.rank] + 1;

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

export function moveStack(
  stackToMove: CardType[],
  destination: MoveDestination,
  foundations: FoundationStack[],
  freecells: FreeCell[],
  tableau: TableauStack[],
) {
  if (!isValidMove(stackToMove, destination, foundations, freecells, tableau)) {
    // Shake shake time
    return;
  }
}

// TODO
// How can I update the state of tableau, freecells & foundations
