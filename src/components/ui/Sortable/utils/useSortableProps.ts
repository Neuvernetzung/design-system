import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { AnySortableItem } from "./handleDragEnd";

type UseSortableProps<TItem extends AnySortableItem> = {
  items: TItem[];
  itemIds: UniqueIdentifier[];
};

export const useSortableProps = <TItem extends AnySortableItem>({
  items,
  itemIds,
}: UseSortableProps<TItem>) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [internalItemIds, setInternalItemIds] =
    useState<UniqueIdentifier[]>(itemIds);
  const [internalItems, setInternalItems] = useState<TItem[]>(items);

  useEffect(() => {
    setInternalItemIds(itemIds);
    setInternalItems(items);
  }, [items]); // Wenn sich die Items von außen verändern, sollen auch die Internen aktualisiert werden. Damit ein asynchrones laden der Items möglich ist.

  const [activeIndex, setActiveIndex] = useState<number>();

  const activeItem =
    activeIndex !== undefined ? internalItems[activeIndex] : undefined;

  return {
    activeIndex,
    setActiveIndex,
    activeItem,
    internalItems,
    setInternalItems,
    internalItemIds,
    setInternalItemIds,
    sensors,
  };
};
