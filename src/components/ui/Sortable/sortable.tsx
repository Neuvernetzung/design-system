import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import isFunction from "lodash/isFunction";
import { Children, cloneElement, ReactElement, useState } from "react";

import { typedMemo } from "../../../utils/internal";

export type SortableChangeProps<TItem extends Record<string, any>> = {
  newItems: TItem[];
  changedItems: TItem[];
  totalChangedItems: TItem[];
};

export type UseSortableChange<TItem extends Record<string, any>> = ({
  newItems,
  changedItems,
}: SortableChangeProps<TItem>) => void;

export type SortableProps<TItem extends Record<string, any>> = {
  children: ReactElement[] | ((items: TItem[]) => ReactElement[]);
  items: TItem[];
  itemIds: UniqueIdentifier[];
  handleChange: UseSortableChange<TItem>;
  order?: string;
};

const Sortable = <TItem extends Record<string, any> = Record<string, any>>({
  children,
  items,
  handleChange,
  itemIds,
  order,
}: SortableProps<TItem>) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [initialItems] = useState<TItem[]>(items);

  const [internalItemIds, setInternalItemIds] =
    useState<UniqueIdentifier[]>(itemIds);
  const [internalItems, setInternalItems] = useState<TItem[]>(items);

  const arrayChildren = Children.toArray(
    isFunction(children) ? children(internalItems) : children
  );

  const returnChange = (
    newItems: TItem[],
    changedItems: TItem[],
    totalChangedItems: TItem[],
    newItemIds: UniqueIdentifier[]
  ) => {
    handleChange({ newItems, changedItems, totalChangedItems });
    setInternalItems(newItems);
    setInternalItemIds(newItemIds);
  };

  const [activeIndex, setActiveIndex] = useState<number>();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveIndex(internalItemIds.indexOf(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setActiveIndex(undefined);
      if (!over?.id) return;
      const oldIndex = internalItemIds.indexOf(active.id);
      const newIndex = internalItemIds.indexOf(over.id);

      const newItems = arrayMove(internalItems, oldIndex, newIndex);
      const newItemIds = arrayMove(internalItemIds, oldIndex, newIndex);

      if (order) {
        const orderValues = newItems
          .map((item) => item[order])
          .sort((a, b) => a - b);
        const orderedNewItems = newItems.map((item, i) => ({
          ...item,
          [order]: orderValues[i],
        }));
        const changedItems = orderedNewItems.filter(
          (item) =>
            internalItems.find((_item) => _item.id === item.id)?.[order] !==
            item[order]
        );
        const totalChangedItems = orderedNewItems.filter(
          (item) =>
            initialItems.find((_item) => _item.id === item.id)?.[order] !==
            item[order]
        );
        returnChange(
          orderedNewItems,
          changedItems,
          totalChangedItems,
          newItemIds
        );
        return;
      }

      const changedItems = newItems.filter(
        (item, i) =>
          internalItems.findIndex((_item) => _item.id === item.id) !== i
      );

      const totalChangedItems = newItems.filter(
        (item, i) =>
          initialItems.findIndex((_item) => _item.id === item.id) !== i
      );

      returnChange(newItems, changedItems, totalChangedItems, newItemIds);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={internalItemIds}>{arrayChildren}</SortableContext>
      <DragOverlay>
        {activeIndex !== undefined ? (
          <span className="opacity-50">
            {arrayChildren?.[activeIndex]
              ? cloneElement(arrayChildren[activeIndex] as ReactElement)
              : null}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default typedMemo(Sortable);
