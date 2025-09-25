import Card from "@/components/Card";
import type { FoundationStack } from "@/types";

interface foundationsProps {
  foundations: FoundationStack[];
}

export default function Foundations({ foundations }: foundationsProps) {
  return (
    <div className="grid gap-2 basis-1/2 grid-flow-col" data-test="foundations">
      {foundations.map((foundation, foundationIndex) =>
        foundation.suit ? (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
            key={foundationIndex}
            isInteractive={false}
            card={foundation.stack[-1]}
          />
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
          <Card key={foundationIndex} isInteractive={false} card={null} />
        ),
      )}
    </div>
  );
}
