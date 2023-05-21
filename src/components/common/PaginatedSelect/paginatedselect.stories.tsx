import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Heading, Icon, Input } from "../../ui";
import { PaginatedSelect } from ".";
import {
  PaginatedSelectItems,
  PaginatedSelectPreview,
} from "./paginatedselect";
import { SearchIcon, TrashIcon } from "../../../theme/icons";

export default {
  title: "COMMON/Paginated Select",
  component: PaginatedSelect,
  argTypes: {},
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
    _id: 1,
    name: "Item 1",
  },
  {
    _id: 2,
    name: "Item 2",
  },
  {
    _id: 3,
    name: "Item 3",
  },
  {
    _id: 4,
    name: "Item 4",
  },
  {
    _id: 5,
    name: "Item 5",
  },
];

const SelectItems: PaginatedSelectItems<(typeof items)[number]> = ({
  items,
  handleSelect,
  isActive,
}) => (
  <div className="flex flex-row gap-4 flex-wrap">
    {items.map((item, i) => (
      <Button
        key={`item_${i}`}
        color={isActive(String(item._id)) ? "primary" : "accent"}
        onClick={() => handleSelect(String(item._id))}
      >
        {item.name}
      </Button>
    ))}
  </div>
);

const Preview: PaginatedSelectPreview<false> = ({ value, setValue }) =>
  value ? (
    <Button
      variant="outline"
      leftIcon={TrashIcon}
      onClick={() => setValue(undefined)}
    >
      {value}
    </Button>
  ) : null;

export const Default = ({ ...args }) => {
  const { control } = useForm();
  const [page, setPage] = useState(1);

  return (
    <PaginatedSelect
      items={items}
      pagination={{ result: 21, activePage: page, setActivePage: setPage }}
      control={control}
      label="Paginated Select"
      name="select"
      SelectItems={SelectItems}
      Preview={Preview}
      {...args}
    />
  );
};

const MultiplePreview: PaginatedSelectPreview<true> = ({ value, setValue }) => (
  <div className="flex flex-col gap-2">
    {value?.map((item, i) => (
      <Button
        variant="outline"
        onClick={() => setValue(value.filter((v) => v !== item))}
        key={i}
        leftIcon={TrashIcon}
      >
        {item}
      </Button>
    ))}
  </div>
);

export const Multiple = ({ ...args }) => {
  const { control } = useForm();
  const [page, setPage] = useState(1);

  return (
    <PaginatedSelect
      items={items}
      multiple
      pagination={{ result: 21, activePage: page, setActivePage: setPage }}
      control={control}
      label="Paginated Select"
      name="select"
      size="lg"
      modalSize="3xl"
      header={
        <div className="flex flex-row items-center justify-between w-full">
          <Heading>Mehrere</Heading>
          <Input
            variant="ghost"
            control={control}
            name="TestSearch"
            value={undefined}
            rightElement={{ children: <Icon icon={SearchIcon} /> }}
            onChange={() => {}}
          />
          <Button size="sm" color="primary">
            Button on Funktion
          </Button>
        </div>
      }
      SelectItems={SelectItems}
      Preview={MultiplePreview}
      {...args}
    />
  );
};
