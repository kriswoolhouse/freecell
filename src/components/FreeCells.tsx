import Card from "@/components/Card";
import type { FreeCell } from "@/types";

interface freeCellsProps {
  freeCells: FreeCell[];
}

export default function FreeCells({ freeCells }: freeCellsProps) {
  return (
    <div className="grid gap-2 basis-1/2 grid-flow-col" data-test="freecells">
      {freeCells.map((freeCell, freeCellIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of free cells>
        <Card key={freeCellIndex} isInteractive={true} card={freeCell} />
      ))}
    </div>
  );
}
