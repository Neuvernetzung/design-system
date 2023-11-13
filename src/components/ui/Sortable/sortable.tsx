import {
  DndContext,
  DragOverlay,
  Modifiers,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/utils";
import isFunction from "lodash/isFunction";
import { Children, cloneElement, ReactElement } from "react";
import { createPortal } from "react-dom";

import { typedMemo } from "../../../utils/internal";
import {
  AnySortableItem,
  handleDragEnd,
  UseSortableChange,
} from "./utils/handleDragEnd";
import { handleDragStart } from "./utils/handleDragStart";
import { useSortableProps } from "./utils/useSortableProps";

export type SortableProps<TItem extends AnySortableItem> = {
  children: ReactElement[] | ((items: TItem[]) => ReactElement[]);
  items: TItem[];
  itemIds: UniqueIdentifier[];
  id?: string;
  handleChange: UseSortableChange<TItem>;
  order?: string;
  dragOverlayClassName?: string;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
};

const Sortable = <TItem extends AnySortableItem = AnySortableItem>({
  children,
  items,
  handleChange,
  itemIds,
  id = "id",
  order,
  dragOverlayClassName,
  strategy,
  modifiers,
}: SortableProps<TItem>) => {
  const {
    internalItems,
    setInternalItemIds,
    setInternalItems,
    sensors,
    internalItemIds,
    activeIndex,
    setActiveIndex,
  } = useSortableProps({ items, itemIds });

  const arrayChildren = Children.toArray(
    isFunction(children) ? children(internalItems) : children
  );

  return (
    <DndContext
      modifiers={modifiers}
      sensors={sensors}
      onDragStart={(e) =>
        handleDragStart(e, { internalItemIds, setActiveIndex })
      }
      onDragEnd={(e) =>
        handleDragEnd(e, {
          handleChange,
          id,
          internalItemIds,
          internalItems,
          items,
          setActiveIndex,
          setInternalItemIds,
          setInternalItems,
          order,
        })
      }
    >
      <SortableContext
        strategy={strategy || verticalListSortingStrategy}
        items={internalItemIds}
      >
        {arrayChildren}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeIndex !== undefined ? (
            <span className={cn("w-full", dragOverlayClassName)}>
              {arrayChildren?.[activeIndex]
                ? cloneElement(arrayChildren[activeIndex] as ReactElement)
                : null}
            </span>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default typedMemo(Sortable);
