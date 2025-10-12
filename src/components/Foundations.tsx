import Card from "@/components/Card";
import OpenCell from "@/components/OpenCell";
import type { FoundationStack, MoveDestination, MoveSource } from "@/types";

interface foundationsProps {
  foundations: FoundationStack[];
  handleStackClick: (moveClicked: MoveSource | MoveDestination) => void;
}

export default function Foundations({
  foundations,
  handleStackClick,
}: foundationsProps) {
  return (
    <div className="grid gap-2 basis-1/2 grid-cols-4" data-test="foundations">
      {foundations.map((foundation, foundationIndex) => {
        return foundation.stack.length === 0 ? (
          <OpenCell
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
            key={foundationIndex}
            handleStackClick={handleStackClick}
            moveData={{
              type: "foundation",
              stackIndex: foundationIndex,
            }}
          />
        ) : (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
            key={foundationIndex}
            isInteractive={true}
            card={foundation.stack[foundation.stack.length - 1]}
            isSelected={false}
            handleStackClick={handleStackClick}
            moveData={{ type: "foundation", stackIndex: foundationIndex }}
          />
        );
      })}
    </div>
  );
}
