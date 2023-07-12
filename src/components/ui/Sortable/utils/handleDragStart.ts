import { DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";

type HandleDragStartProps = {
  setActiveIndex: (index: number) => void;
  internalItemIds: UniqueIdentifier[];
};

export const handleDragStart = (
  event: DragStartEvent,
  { internalItemIds, setActiveIndex }: HandleDragStartProps
) => {
  setActiveIndex(internalItemIds.indexOf(event.active.id));
};
