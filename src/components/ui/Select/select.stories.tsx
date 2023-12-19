import { Meta } from "@storybook/react";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { inputVariants, sizes } from "../../../types";
import { Button, Form, InputRaw, Popover } from "..";
import { Disclosure } from "../Disclosure";
import { Select, SelectOptionProps } from ".";

export default {
  title: "UI/Form/Select",
  component: Select,
  argTypes: {
    variant: {
      control: { type: "select" },
    },
    size: {
      control: { type: "select" },
    },
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const formClassName = "flex flex-col gap-5";

export const Variants = ({ ...args }) => {
  const { control, handleSubmit } = useForm();

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <div className="flex flex-col items-center">
        <div className="w-32">
          <Select
            allowReset
            control={control}
            name="select"
            label="Default"
            options={[
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        </div>
      </div>
      {inputVariants.map((variant) => (
        <Select
          key={variant}
          allowReset
          label={variant}
          control={control}
          variant={variant}
          name={`select_${variant}`}
          options={[
            { children: "Option 1", value: "option-1" },
            { children: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      ))}
    </Form>
  );
};

Variants.parameters = {
  controls: { exclude: "variant" },
};

export const Sizes = ({ ...args }) => {
  const { control, handleSubmit } = useForm();

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size) => (
        <Select
          key={size}
          allowReset
          control={control}
          size={size}
          name={`select_${size}`}
          options={[
            { children: "Option 1", value: "option-1" },
            { children: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      ))}
    </Form>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const Groups = ({ ...args }) => {
  const { control, handleSubmit } = useForm();

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={control}
        name="select"
        options={[
          {
            type: "group",
            label: "Gruppe 1",
            options: [
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
              { children: "Option 3", value: "option-3" },
            ],
          },
          {
            type: "group",
            label: "Gruppe 2",
            options: [
              { children: "Option 4", value: "option-4" },
              { children: "Option 5", value: "option-5" },
              { children: "Option 6", value: "option-6" },
            ],
          },
          { children: "Option 7", value: "option-7" },
          {
            type: "group",
            label: "Gruppe 3",
            options: [
              { children: "Option 8", value: "option-8" },
              { children: "Option 9", value: "option-9" },
            ],
          },
        ]}
        {...args}
      />
    </Form>
  );
};

export const Checked = ({ ...args }) => {
  const formMethods = useForm();
  const options: SelectOptionProps[] = [
    { children: "Option 1", value: "option-1" },
    { children: "Option 2", value: "option-2" },
    { children: "Option 3", value: "option-3" },
    { children: "Option 4", value: "option-4" },
    { children: "Option 5", value: "option-5" },
    { type: "separator" },
    { children: "Option 6", value: "option-6" },
    { children: "Option 7", value: "option-7" },
    { children: "Option 8", value: "option-8" },
    { children: "Option 9", value: "option-9" },
  ];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="CheckMark"
        {...args}
      />
      <Select
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="Hide active"
        checkedType="hidden"
        {...args}
      />
      <Select
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="Checkbox"
        checkedType="checkbox"
        {...args}
      />
    </Form>
  );
};

export const Error = ({ ...args }) => {
  const formMethods = useForm();
  const options = [
    {
      children: "Option 1",
      value: "option-1",
    },
    {
      children: "Option 2",
      value: "option-2",
    },
  ];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        label="Pflicht"
        control={formMethods.control}
        name="select_error"
        options={options}
        required={{ value: true, message: "Dies ist ein Pflichtfeld." }}
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const Disabled = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={formMethods.control}
        label="Komplett disabled"
        name="select_all_disabled"
        options={[
          {
            children: "Option 1",
            value: "option-1",
          },
          {
            children: "Option 2",
            value: "option-2",
          },
        ]}
        disabled
        {...args}
      />
      <Select
        control={formMethods.control}
        label="Option disabled"
        name="select_all_disabled"
        options={[
          {
            children: "Option 1",
            value: "option-1",
          },
          {
            children: "Option 2",
            value: "option-2",
            disabled: true,
          },
          {
            children: "Option 3",
            value: "option-3",
            disabled: true,
          },
          {
            children: "Option 4",
            value: "option-4",
          },
        ]}
        {...args}
      />
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { default_value: "option-2" },
  });

  const options = [
    {
      children: "Option 1",
      value: "option-1",
    },
    {
      children: "Option 2",
      value: "option-2",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={control}
        name="default_value"
        options={options}
        {...args}
      />
    </Form>
  );
};

export const Overflow = ({ ...args }) => {
  const { control, handleSubmit } = useForm();

  const options = [
    {
      children: "Option 1",
      value: "option-1",
    },
    {
      children: "Option 2",
      value: "option-2",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Disclosure
        content={
          <Select
            control={control}
            name="overflow"
            options={options}
            allowReset
            {...args}
          />
        }
        title="Select"
      />
    </Form>
  );
};

export const BeforeAndAfterChildren = ({ ...args }) => {
  const { control, handleSubmit } = useForm();

  const [filter, setFilter] = useState<string>();

  const options = [
    {
      children: "Option 1",
      value: "option-1",
    },
    {
      children: "Option 2",
      value: "option-2",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        beforeChildren={
          <div>
            <InputRaw
              placeholder="Filtern ..."
              size="sm"
              variant="ghost"
              value={filter}
              onChange={setFilter}
            />
          </div>
        }
        afterChildren={
          <Popover
            content={<div>Test</div>}
            buttonComponent={
              <Button
                size="sm"
                color="primary"
                className="w-full"
                leftIcon={IconPlus}
              >
                Mehr hinzufügen
              </Button>
            }
          />
        }
        control={control}
        name="overflow"
        options={options.filter((v) =>
          filter ? v.value.includes(filter) : true
        )}
        allowReset
        {...args}
      />
    </Form>
  );
};
