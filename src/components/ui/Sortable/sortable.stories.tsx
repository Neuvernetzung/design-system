import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Sortable, SortableChangeProps, SortableItem } from ".";
import { Text, IconButton, Button } from "..";
import { Bars2Icon } from "@heroicons/react/24/outline";
import cn from "classnames";
import { bgColorsInteractive, paddingsEvenly } from "../../../styles";

export default {
  title: "UI/Data Display/Sortable",
  component: Sortable,
  argTypes: {},
} as Meta;

type Item = { id: number; content: string; order: number };

const defaultItems: Item[] = [
  { id: 1, content: "Item 1", order: 23 },
  { id: 2, content: "Item 2", order: 24 },
  { id: 3, content: "Item 3", order: 25 },
  { id: 4, content: "Item 4", order: 28 },
  { id: 5, content: "Item 5", order: 29 },
];

const itemClassName = cn(paddingsEvenly.md, bgColorsInteractive.white);

export const Default = ({ ...args }) => {
  const [items, setItems] = useState<Item[]>(defaultItems);

  const handleChange = ({ newItems }: SortableChangeProps<Item>) => {
    setItems(newItems);
  };

  return (
    <Sortable
      items={items}
      handleChange={handleChange}
      itemIds={items.map((item) => item.id)}
    >
      {items.map((item) => (
        <SortableItem className={itemClassName} id={item.id} key={item.id}>
          <div>{item.content}</div>
        </SortableItem>
      ))}
    </Sortable>
  );
};

export const Controlled = ({ ...args }) => {
  const [changed, setChanged] = useState<Item[]>([]);

  const handleChange = ({ totalChangedItems }: SortableChangeProps<Item>) => {
    setChanged(totalChangedItems);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Sortable
          items={defaultItems}
          handleChange={handleChange}
          itemIds={defaultItems.map((item) => item.id)}
          order="order"
        >
          {(items) =>
            items.map((item) => (
              <SortableItem
                className={itemClassName}
                id={item.id}
                key={item.id}
              >
                <div>{item.content}</div>
              </SortableItem>
            ))
          }
        </Sortable>
      </div>
      <div>
        <Text size="sm"> Geänderte Items:</Text>
        {changed.map((item) => (
          <div key={item.id}>
            {item.content}: {item.order}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WithHandle = ({ ...args }) => {
  const [items, setItems] = useState<Item[]>(defaultItems);

  const handleChange = ({ newItems }: SortableChangeProps<Item>) => {
    setItems(newItems);
  };

  return (
    <Sortable
      items={items}
      handleChange={handleChange}
      itemIds={items.map((item) => item.id)}
    >
      {items.map((item, i) => (
        <SortableItem
          className={itemClassName}
          handle
          id={item.id}
          key={item.id}
        >
          {({ handle }) => (
            <div className="flex flex-row items-center gap-2">
              <IconButton
                {...handle}
                ariaLabel={`drag_handle_${i}`}
                size="sm"
                variant="ghost"
                icon={Bars2Icon}
              />
              <Text>{item.content}</Text>
            </div>
          )}
        </SortableItem>
      ))}
    </Sortable>
  );
};
