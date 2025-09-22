import Card from "@/components/Card";
import { FoundationStack } from "@/types";

interface foundationsProps {
  foundations: FoundationStack[];
}

export default function Foundations({ foundations }: foundationsProps) {
  return (
    <div className="grid gap-2 basis-1/2 grid-flow-col" data-test="foundations">
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
  );
}
