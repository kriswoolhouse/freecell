import Card from "@/components/Card";
import OpenCell from "@/components/OpenCell";
import type { MoveDestination, MoveSource, TableauStack } from "@/types";

interface TableauProps {
  tableau: TableauStack[];
  alreadySelectedSource: MoveSource | null;
  handleStackClick: (moveClicked: MoveSource | MoveDestination) => void;
}

export default function Tableau({
  tableau,
  alreadySelectedSource,
  handleStackClick,
}: TableauProps) {
  return (
    <div className="grid grid-cols-8 gap-x-2">
      {tableau.map((stack, stackIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Fixed number of stacks>
        <div key={stackIndex} className="grid grid-cols-1 auto-rows-[2rem]">
          {stack.length ? (
            stack.map((card, cardIndex) => {
              // TODO Work out if card is interactive
              const isInteractive = true;
              const isSelected =
                alreadySelectedSource?.type === "tableau" &&
                alreadySelectedSource?.stackIndex === stackIndex &&
                alreadySelectedSource?.cardIndex <= cardIndex;

              return (
                <Card
                  key={card.id}
                  isInteractive={isInteractive}
                  card={card}
                  isSelected={isSelected}
                  handleStackClick={handleStackClick}
                  moveData={{
                    type: "tableau",
                    stackIndex: stackIndex,
                    cardIndex: cardIndex,
                  }}
                />
              );
            })
          ) : (
            <OpenCell
              handleStackClick={handleStackClick}
              moveData={{ type: "tableau", stackIndex: stackIndex }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
