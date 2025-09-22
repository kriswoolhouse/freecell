import { useEffect, useState } from "react";
import { createShuffledDeck } from "@/lib/game/createShuffledDeck";
import {
  createFoundations,
  createFreeCells,
  createTableau,
} from "@/lib/game/gameboardSetup";
import type {
  CardType,
  FoundationStack,
  FreeCell,
  TableauStack,
} from "@/types";

export default function useFreecellGame() {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [freeCells, setFreeCells] = useState<FreeCell[]>([]);
  const [foundations, setFoundations] = useState<FoundationStack[]>([]);
  const [tableau, setTableau] = useState<TableauStack[]>([]);

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

  return {
    freeCells,
    foundations,
    tableau,
  };
}
