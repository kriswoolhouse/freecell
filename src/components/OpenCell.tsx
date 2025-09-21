interface OpenCellProps {
  id: string;
  type: string;
}

export default function OpenCell({ id, type }: OpenCellProps) {
  return (
    <div
      data-test={`${type}-${id}`}
      className="aspect-[5/7] border-2 border-blue-100/60 bg-blue-100/20 rounded-lg"
    ></div>
  );
}
