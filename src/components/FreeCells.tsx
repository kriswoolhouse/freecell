import Card from "@/components/Card";
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

        return (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of free cells>
            key={freeCellIndex}
            isInteractive={true}
            card={freeCell[0] ?? null}
            isSelected={isSelected}
            handleStackClick={handleStackClick}
            moveData={{ type: "freecell", stackIndex: freeCellIndex }}
          />
        );
      })}
    </div>
  );
}
