import { Meta } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconTrash, IconSearch } from "@tabler/icons-react";
import { Button, Form, Heading, Icon, Input } from "../../ui";
import { PaginatedSelect } from ".";
import {
  PaginatedSelectItems,
  PaginatedSelectPreview,
} from "./paginatedselect";

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

type TestItem = { _id: number; name: string };

const items: TestItem[] = [
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

const SelectItems: PaginatedSelectItems<TestItem, boolean> = ({
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
      leftIcon={IconTrash}
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
      pagination={{ result: 21, page, setPage }}
      control={control}
      label="Paginated Select"
      name="select"
      SelectItems={SelectItems}
      Preview={Preview}
      {...args}
    />
  );
};

export const Error = ({ ...args }) => {
  const { control, handleSubmit } = useForm();
  const [page, setPage] = useState(1);

  return (
    <Form handleSubmit={handleSubmit} onSubmit={() => {}}>
      <PaginatedSelect
        required
        items={items}
        pagination={{ result: 21, page, setPage }}
        control={control}
        label="Paginated Select"
        name="select"
        SelectItems={SelectItems}
        Preview={Preview}
        {...args}
      />
      <Button type="submit">Bestätigen</Button>
    </Form>
  );
};

const MultiplePreview: PaginatedSelectPreview<true> = ({ value, setValue }) => (
  <div className="flex flex-col gap-2">
    {value?.map((item, i) => (
      <Button
        variant="outline"
        onClick={() => setValue(value.filter((v) => v !== item))}
        key={i}
        leftIcon={IconTrash}
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
      pagination={{ result: 21, page, setPage }}
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
            rightElement={{ children: <Icon icon={IconSearch} /> }}
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
