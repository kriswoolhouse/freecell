import type { MoveDestination, MoveSource } from "@/types";

interface OpenCellProps {
  handleStackClick: (
    moveClicked: MoveSource | MoveDestination,
    topCardIndex?: number,
  ) => void;
  moveData: MoveSource | MoveDestination;
}

export default function OpenCell({
  handleStackClick,
  moveData,
}: OpenCellProps) {
  return (
    <button
      type="button"
      onClick={() => handleStackClick(moveData)}
      className="aspect-[5/7] border-2 border-blue-100/60 bg-blue-100/20 rounded-lg appearance-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200"
    ></button>
  );
}
