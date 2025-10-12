import Card from "@/components/Card";
import OpenCell from "@/components/OpenCell";
import type { FreeCell, MoveDestination, MoveSource } from "@/types";

interface freeCellsProps {
  freeCells: FreeCell[];
  alreadySelectedSource: MoveSource | null;
  handleStackClick: (moveClicked: MoveSource | MoveDestination) => void;
}

export default function FreeCells({
  freeCells,
  alreadySelectedSource,
  handleStackClick,
}: freeCellsProps) {
  return (
    <div className="grid gap-2 basis-1/2 grid-cols-4" data-test="freecells">
      {freeCells.map((freeCell, freeCellIndex) => {
        const isSelected =
          alreadySelectedSource?.type === "freecell" &&
          alreadySelectedSource?.stackIndex === freeCellIndex;

        return freeCell.length ? (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of free cells>
            key={freeCellIndex}
            isInteractive={true}
            card={freeCell[0]}
            isSelected={isSelected}
            handleStackClick={handleStackClick}
            moveData={{ type: "freecell", stackIndex: freeCellIndex }}
          />
        ) : (
          <OpenCell
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of free cells>
            key={freeCellIndex}
            handleStackClick={handleStackClick}
            moveData={{
              type: "freecell",
              stackIndex: freeCellIndex,
            }}
          />
        );
      })}
    </div>
  );
}
