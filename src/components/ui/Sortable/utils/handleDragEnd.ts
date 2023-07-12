import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export type AnySortableItem = Record<string, any>;

export type UseSortableChange<TItem extends AnySortableItem> = ({
  newItems,
  changedItems,
}: SortableChangeProps<TItem>) => void;

export type SortableChangeProps<TItem extends AnySortableItem> = {
  newItems: TItem[];
  changedItems: TItem[];
  totalChangedItems: TItem[];
};

type InternalSortableChangeProps<TItem extends AnySortableItem> =
  SortableChangeProps<TItem> & {
    newItemIds: UniqueIdentifier[];
  };

type ReturnChangeProps<TItem extends AnySortableItem> = {
  handleChange: UseSortableChange<TItem>;
  setInternalItems: (items: TItem[]) => void;
  setInternalItemIds: (itemIds: UniqueIdentifier[]) => void;
};

const returnChange = <TItem extends AnySortableItem>(
  {
    newItems,
    changedItems,
    totalChangedItems,
    newItemIds,
  }: InternalSortableChangeProps<TItem>,
  {
    handleChange,
    setInternalItems,
    setInternalItemIds,
  }: ReturnChangeProps<TItem>
) => {
  handleChange({ newItems, changedItems, totalChangedItems });
  setInternalItems(newItems);
  setInternalItemIds(newItemIds);
};

type HandleDragEndProps<TItem extends AnySortableItem> = {
  id: string;
  order?: string;
  items: TItem[];
  setActiveIndex: (index?: number) => void;
  internalItems: TItem[];
  internalItemIds: UniqueIdentifier[];
} & ReturnChangeProps<TItem>;

export const handleDragEnd = <TItem extends AnySortableItem>(
  event: DragEndEvent,
  {
    id,
    order,
    items,
    setActiveIndex,
    internalItemIds,
    internalItems,
    handleChange,
    setInternalItemIds,
    setInternalItems,
  }: HandleDragEndProps<TItem>
) => {
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
          internalItems.find((_item) => _item[id] === item[id])?.[order] !==
          item[order]
      );
      const totalChangedItems = orderedNewItems.filter(
        (item) =>
          items.find((_item) => _item[id] === item[id])?.[order] !== item[order]
      );
      returnChange<TItem>(
        {
          newItems: orderedNewItems,
          changedItems,
          totalChangedItems,
          newItemIds,
        },
        { handleChange, setInternalItemIds, setInternalItems }
      );
      return;
    }

    const changedItems = newItems.filter(
      (item, i) =>
        internalItems.findIndex((_item) => _item[id] === item[id]) !== i
    );

    const totalChangedItems = newItems.filter(
      (item, i) => items.findIndex((_item) => _item[id] === item[id]) !== i
    );

    returnChange(
      { newItems, changedItems, totalChangedItems, newItemIds },
      { handleChange, setInternalItemIds, setInternalItems }
    );
  }
};
