import { Meta } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from "..";
import { Select } from ".";
import { sizes, variants } from "./select";
import { Disclosure } from "../Disclosure";

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
  const formMethods = useForm();
  const _variants = Object.keys(variants);

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <div className="flex flex-col items-center">
        <div className="w-32">
          <Select
            removeAll
            control={formMethods.control}
            name="select"
            options={[
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        </div>
      </div>
      {_variants.map((variant: any) => (
        <Select
          key={variant}
          removeAll
          control={formMethods.control}
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
  const formMethods = useForm();
  const _sizes = Object.keys(sizes);

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_sizes.map((size: any) => (
        <Select
          key={size}
          removeAll
          control={formMethods.control}
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

export const Multiple = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={formMethods.control}
        name="select_multiple"
        multipleStyle="indicator"
        options={[
          { children: "Option 1", value: "option-1" },
          { children: "Option 2", value: "option-2" },
          { children: "Option 3", value: "option-3" },
          { children: "Option 4", value: "option-4" },
        ]}
        multiple
        {...args}
      />
    </Form>
  );
};

Multiple.parameters = {
  controls: { exclude: "multiple" },
};

export const Groups = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={formMethods.control}
        name="select_multiple"
        options={[
          {
            children: "Gruppe 1",
            value: "group-1",
            options: [
              { children: "Option 1", value: "option-1" },
              { children: "Option 2", value: "option-2" },
              { children: "Option 3", value: "option-3" },
            ],
          },
          {
            children: "Gruppe 2",
            value: "group-2",
            options: [
              { children: "Option 4", value: "option-4" },
              { children: "Option 5", value: "option-5" },
              { children: "Option 6", value: "option-6" },
            ],
          },
          { children: "Option 7", value: "option-7" },
          {
            children: "Gruppe 3",
            value: "group-3",
            options: [
              { children: "Option 8", value: "option-8" },
              { children: "Option 9", value: "option-9" },
            ],
          },
        ]}
        multiple
        {...args}
      />
    </Form>
  );
};

export const Checked = ({ ...args }) => {
  const formMethods = useForm();
  const options = [
    {
      children: "Gruppe 1",
      value: "group-1",
      options: [
        { children: "Option 1", value: "option-1" },
        { children: "Option 2", value: "option-2" },
        { children: "Option 3", value: "option-3" },
      ],
    },
    {
      children: "Gruppe 2",
      value: "group-2",
      options: [
        { children: "Option 4", value: "option-4" },
        { children: "Option 5", value: "option-5" },
        { children: "Option 6", value: "option-6" },
      ],
    },
    { children: "Option 7", value: "option-7" },
    {
      children: "Gruppe 3",
      value: "group-3",
      options: [
        { children: "Option 8", value: "option-8" },
        { children: "Option 9", value: "option-9" },
      ],
    },
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
        multiple
        label="CheckMark"
        {...args}
      />
      <Select
        control={formMethods.control}
        name="select_multiple"
        options={options}
        multiple
        label="Hide active"
        hideActive
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
        ]}
        {...args}
      />
    </Form>
  );
};

interface OtherValueReturnedProps {
  _id_returned: any;
  _id_returned_multiple;
}

export const OtherValueReturned = ({ ...args }) => {
  const formMethods = useForm<OtherValueReturnedProps>();

  const options = [
    {
      children: "Option 1",
      _id: "option-1",
    },
    {
      children: "Option 2",
      _id: "option-2",
    },
  ];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Select
        control={formMethods.control}
        name="_id_returned"
        returned="_id"
        options={options}
        {...args}
      />
      <Select
        control={formMethods.control}
        name="_id_returned_multiple"
        multiple
        returned="_id"
        options={options}
        {...args}
      />
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const formMethods = useForm({ defaultValues: { default_value: "option-2" } });

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
        control={formMethods.control}
        name="default_value"
        returned="value"
        options={options}
        {...args}
      />
    </Form>
  );
};

export const Overflow = ({ ...args }) => {
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
      <Disclosure
        items={[
          {
            title: "Select",
            content: (
              <Select
                control={formMethods.control}
                name="overflow"
                returned="value"
                options={options}
                {...args}
              />
            ),
          },
        ]}
      />
    </Form>
  );
};
