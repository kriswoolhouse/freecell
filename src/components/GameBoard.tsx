"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
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

export default function GameBoard() {
  // Initialise the shuffled game
  const [deck, setDeck] = useState<CardType[]>([]);
  useEffect(() => {
    setDeck(createShuffledDeck());
  }, []);

  // Here:
  // Initialise the FreeCells and Foundations
  const [freeCells, setFreeCells] = useState<FreeCell[]>([]);
  useEffect(() => {
    setFreeCells(createFreeCells());
  }, []);

  const [foundations, setFoundations] = useState<FoundationStack[]>([]);
  useEffect(() => {
    setFoundations(createFoundations());
  }, []);

  // Initialise the Tableau
  const [tableau, setTableau] = useState<TableauStack[]>([]);
  useEffect(() => {
    setTableau(createTableau(deck));
  }, [deck]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 items-start">
        <div
          className="grid gap-2 basis-1/2 grid-flow-col"
          data-test="freecells"
        >
          {freeCells.map((freeCell, freeCellIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of free cells>
            <Card key={freeCellIndex} card={freeCell} />
          ))}
        </div>

        <div
          className="grid gap-2 basis-1/2 grid-flow-col"
          data-test="foundations"
        >
          {foundations.map((foundation, foundationIndex) =>
            foundation.length ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
              <Card key={foundationIndex} card={foundation[-1]} />
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
              <Card key={foundationIndex} card={null} />
            ),
          )}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-x-2">
        {tableau.map((stack, stackIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
          <div key={stackIndex} className="grid grid-cols-1 auto-rows-[2rem]">
            {stack.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
