import OpenCell from "@/components/OpenCell";

export default function HoldingCells() {
  return (
    <div className="grid grid-cols-4 gap-2 basis-1/2" data-test="stacks">
      {Array.from({ length: 4 }, () => ({ id: crypto.randomUUID() })).map(
        (item) => (
          <OpenCell key={item.id} id={item.id} type="stack" />
        ),
      )}
    </div>
  );
}
