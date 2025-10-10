import Card from "@/components/Card";
import type { FoundationStack, MoveDestination, MoveSource } from "@/types";

interface foundationsProps {
  foundations: FoundationStack[];
  handleStackClick: (moveClicked: MoveSource | MoveDestination) => void;
}

export default function Foundations({
  foundations,
  handleStackClick,
}: foundationsProps) {
  // TODO Handle click of empty foundations, empty freecells, open stacks
  return (
    <div className="grid gap-2 basis-1/2 grid-cols-4" data-test="foundations">
      {foundations.map((foundation, foundationIndex) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
          key={foundationIndex}
          isInteractive={false}
          card={foundation.stack[-1] ?? null}
          handleStackClick={handleStackClick}
          moveData={{ type: "foundation", stackIndex: foundationIndex }}
        />
      ))}
    </div>
  );
}
