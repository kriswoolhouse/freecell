import Card from "@/components/Card";
import type { TableauStack } from "@/types";

interface TableauProps {
  tableau: TableauStack[];
}

export default function Tableau({ tableau }: TableauProps) {
  return (
    <div className="grid grid-cols-8 gap-x-2">
      {tableau.map((stack, stackIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
        <div key={stackIndex} className="grid grid-cols-1 auto-rows-[2rem]">
          {stack.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ))}
    </div>
  );
}
