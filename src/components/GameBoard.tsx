"use client";

import Foundations from "@/components/Foundations";
import FreeCells from "@/components/FreeCells";
import Tableau from "@/components/Tableau";
import useFreecellGame from "@/hooks/useFreecellGame";

export default function GameBoard() {
  const { freeCells, foundations, tableau } = useFreecellGame();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 items-start">
        <FreeCells freeCells={freeCells} />
        <Foundations foundations={foundations} />
      </div>

      <Tableau tableau={tableau} />
    </div>
  );
}
