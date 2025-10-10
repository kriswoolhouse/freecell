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
  return (
    <div className="grid gap-2 basis-1/2 grid-cols-4" data-test="foundations">
      {foundations.map((foundation, foundationIndex) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
          key={foundationIndex}
          isInteractive={true}
          card={foundation.stack.at(-1) ?? null}
          isSelected={false}
          handleStackClick={handleStackClick}
          moveData={{ type: "foundation", stackIndex: foundationIndex }}
        />
      ))}
    </div>
  );
}
