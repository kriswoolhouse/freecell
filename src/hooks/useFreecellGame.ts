import { useEffect, useState } from "react";
import { createShuffledDeck } from "@/lib/game/createShuffledDeck";
import {
  createFoundations,
  createFreeCells,
  createTableau,
} from "@/lib/game/gameboardSetup";
import {
  getStackFromMoveSource,
  isStackSelectable,
  isValidMove,
  moveStack,
} from "@/lib/game/gameplay";
import type {
  CardType,
  FoundationStack,
  FreeCell,
  MoveDestination,
  MoveSource,
  TableauStack,
} from "@/types";

export default function useFreecellGame() {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [freeCells, setFreeCells] = useState<FreeCell[]>([]);
  const [foundations, setFoundations] = useState<FoundationStack[]>([]);
  const [tableau, setTableau] = useState<TableauStack[]>([]);
  const [alreadySelectedSource, setAlreadySelectedSource] =
    useState<MoveSource | null>(null);

  useEffect(() => {
    setDeck(createShuffledDeck());
  }, []);

  useEffect(() => {
    setFreeCells(createFreeCells());
  }, []);

  useEffect(() => {
    setFoundations(createFoundations());
  }, []);

  useEffect(() => {
    if (deck.length > 0) {
      setTableau(createTableau(deck));
    }
  }, [deck]);

  const handleStackClick = (moveClicked: MoveSource | MoveDestination) => {
    if (alreadySelectedSource === null) {
      // Selecting a stack
      const clickedSource = moveClicked as MoveSource;
      const selectedStack = getStackFromMoveSource(
        clickedSource,
        tableau,
        freeCells,
      );

      if (isStackSelectable(clickedSource, selectedStack)) {
        setAlreadySelectedSource(clickedSource);
        return;
      }
    } else {
      // Selecting a destination
      const clickedDestination = moveClicked as MoveDestination;
      const selectedStack = getStackFromMoveSource(
        alreadySelectedSource,
        tableau,
        freeCells,
      );

      if (
        isValidMove(
          selectedStack,
          clickedDestination,
          foundations,
          freeCells,
          tableau,
        )
      ) {
        const { newTableau, newFreeCells, newFoundations } = moveStack(
          selectedStack,
          alreadySelectedSource,
          clickedDestination,
          {
            foundations,
            freeCells,
            tableau,
          },
        );

        setTableau(newTableau);
        setFreeCells(newFreeCells);
        setFoundations(newFoundations);
      }

      setAlreadySelectedSource(null);
      return;
    }
  };

  return {
    freeCells,
    foundations,
    tableau,
    alreadySelectedSource,
    handleStackClick,
  };
}
