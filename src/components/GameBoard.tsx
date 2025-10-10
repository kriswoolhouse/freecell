"use client";

import Foundations from "@/components/Foundations";
import FreeCells from "@/components/FreeCells";
import Tableau from "@/components/Tableau";
import useFreecellGame from "@/hooks/useFreecellGame";

export default function GameBoard() {
  const {
    freeCells,
    foundations,
    tableau,
    alreadySelectedSource,
    handleStackClick,
  } = useFreecellGame();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 items-start">
        <FreeCells
          freeCells={freeCells}
          alreadySelectedSource={alreadySelectedSource}
          handleStackClick={handleStackClick}
        />
        <Foundations
          foundations={foundations}
          handleStackClick={handleStackClick}
        />
      </div>

      <Tableau
        tableau={tableau}
        alreadySelectedSource={alreadySelectedSource}
        handleStackClick={handleStackClick}
      />
    </div>
  );
}
