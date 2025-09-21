import OpenCell from "@/components/OpenCell";

export default function Foundations() {
  return (
    <div className="grid grid-cols-4 gap-2 basis-1/2" data-test="holding">
      {Array.from({ length: 4 }, () => ({ id: crypto.randomUUID() })).map(
        (item) => (
          <OpenCell key={item.id} id={item.id} type="foundation" />
        ),
      )}
    </div>
  );
}
