import { Meta } from "@storybook/react";
import { IconChevronDown, IconPencil } from "@tabler/icons-react";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

import { extendedBgColors } from "../../../styles";
import { IconButton } from "../Button";
import { UseSortableChange } from "../Sortable";
import { Text } from "../Typography";
import { DataTable, SimpleTable, SortableTable } from ".";

export default {
  title: "UI/Data Display/Table",
  component: DataTable,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const items = [
  {
    _id: "_1",
    id: "1",
    name: "Test 1",
    title: "Titel",
    image: "Bild",
    options: (
      <IconButton
        ariaLabel="Edit"
        size="sm"
        variant="ghost"
        color="primary"
        icon={IconPencil}
      />
    ),
    createdAt: new Date().toDateString(),
  },
  {
    _id: "_2",
    id: "2",
    title: "Test",
    name: 2,
    createdAt: new Date().toDateString(),
  },
  {
    _id: "_3",
    id: "3",
    name: "Test 3",
    image: "Bild",
    options: (
      <IconButton
        ariaLabel="Edit"
        size="sm"
        variant="ghost"
        color="primary"
        icon={IconPencil}
      />
    ),
    createdAt: new Date().toDateString(),
  },
];

export const Simple = ({ ...args }) => (
  <SimpleTable
    cols={[
      { id: "id", title: "Id", shrink: true },
      { id: "name", title: "Name", grow: true },
      { id: "title", title: "Titel", grow: true },
      { id: "image", title: "Bild" },
      { id: "createdAt", title: "Erstellung" },
      { id: "options", title: "", shrink: true },
    ]}
    divideX
    items={items}
    {...args}
  />
);

export const DisabledHead = ({ ...args }) => (
  <SimpleTable
    disableHead
    disabledBorder
    hasStripes
    cols={[
      { id: "id", title: "Id", shrink: true },
      { id: "name", title: "Name", grow: true },
      { id: "title", title: "Titel", grow: true },
      { id: "image", title: "Bild" },
      {
        id: "createdAt",
        title: "Erstellung",
      },
      { id: "options", title: "", shrink: true },
    ]}
    divideY={false}
    items={items}
    {...args}
  />
);

export const Data = ({ ...args }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [sort, setSort] = useState<string>();

  return (
    <DataTable
      cols={[
        { id: "id", title: "Id", sortable: true, shrink: true },
        { id: "name", title: "Name", grow: true },
        { id: "title", title: "Titel", grow: true },
        { id: "image", title: "Bild" },
        { id: "createdAt", title: "Erstellung", sortable: true },
        { id: "options", title: "", shrink: true },
      ]}
      sort={sort}
      setSort={setSort}
      checkable
      checkedValue="id"
      checked={checked}
      setChecked={setChecked}
      divideX
      items={items}
      {...args}
    />
  );
};

export const Disclosure = ({ ...args }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [disclosure, setDisclosure] = useState<string>();
  const [sort, setSort] = useState<string>();

  return (
    <DataTable
      cols={[
        { id: "id", title: "Id", sortable: true, shrink: true },
        { id: "disclosureButton" },
        { id: "name", title: "Name", grow: true },
        { id: "title", title: "Titel", grow: true },
        { id: "image", title: "Bild" },
        { id: "createdAt", title: "Erstellung", sortable: true },
        { id: "options", title: "", shrink: true },
      ]}
      sort={sort}
      setSort={setSort}
      checkable
      checkedValue="id"
      checked={checked}
      disclosureValue="disclosure"
      disclosureClassName={cn(extendedBgColors.subtile)}
      setChecked={setChecked}
      divideX
      items={items.map((item) => ({
        ...item,
        disclosure: disclosure === item._id && "Test",
        disclosureButton: (
          <IconButton
            onClick={() => {
              if (disclosure === item._id) {
                setDisclosure(undefined);
                return;
              }
              setDisclosure(item._id);
            }}
            ariaLabel="open"
            icon={IconChevronDown}
          />
        ),
      }))}
      {...args}
    />
  );
};

export const DataNoItems = ({ ...args }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [sort, setSort] = useState<string>();

  return (
    <DataTable
      cols={[
        { id: "id", title: "Id", sortable: true, shrink: true },
        { id: "name", title: "Name", grow: true },
        { id: "title", title: "Titel", grow: true },
        { id: "image", title: "Bild" },
        { id: "createdAt", title: "Erstellung", sortable: true },
        { id: "options", title: "", shrink: true },
      ]}
      sort={sort}
      setSort={setSort}
      checkable
      checkedValue="id"
      checked={checked}
      setChecked={setChecked}
      disclosureValue="disclosure"
      disclosureClassName="bg-accent-100"
      divideX
      items={[]}
      {...args}
    />
  );
};

export const Data1Item = ({ ...args }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [sort, setSort] = useState<string>();

  return (
    <DataTable
      cols={[
        { id: "id", title: "Id", sortable: true, shrink: true },
        { id: "name", title: "Name", grow: true },
        { id: "title", title: "Titel", grow: true },
        { id: "image", title: "Bild" },
        { id: "createdAt", title: "Erstellung", sortable: true },
        { id: "options", title: "", shrink: true },
      ]}
      sort={sort}
      setSort={setSort}
      checkable
      checkedValue="id"
      checked={checked}
      setChecked={setChecked}
      disclosureClassName="bg-accent-100"
      divideX
      items={[items[0]]}
      {...args}
    />
  );
};

export const Sortable = ({ ...args }) => {
  const initialItems = [
    { _id: "1", name: "Item 1", order: 23 },
    { _id: "2", name: "Item 2", order: 24 },
    { _id: "3", name: "Item 3", order: 25 },
    { _id: "4", name: "Item 4", order: 27 },
    { _id: "5", name: "Item 5", order: 28 },
  ];

  const [items, setItems] = useState<typeof initialItems>([]);
  useEffect(() => {
    setTimeout(() => {
      setItems(initialItems);
    }, 200);
  }, []); // simuliert das asynchrone laden

  const [changed, setChanged] = useState<(typeof items)[number][]>([]);

  const handleChange: UseSortableChange<(typeof items)[number]> = ({
    totalChangedItems,
  }) => {
    setChanged(totalChangedItems);
  };

  return (
    <div className="flex flex-col gap-8">
      <SortableTable
        cols={[
          { id: "_id", title: "Id", shrink: true },
          { id: "name", title: "Name" },
          { id: "order", title: "Order" },
        ]}
        handle
        indicator
        hasStripes
        handleChange={handleChange}
        id="_id"
        items={items}
        order="order"
        {...args}
      />
      <div className="flex flex-col gap-2">
        <Text>Geändert:</Text>
        <div className="flex flex-col">
          {changed.map((item) => (
            <Text key={item._id}>
              {item._id}: {item.order}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};
