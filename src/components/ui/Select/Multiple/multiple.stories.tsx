import { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { inputVariants, sizes } from "../../../../types";
import { Form } from "../..";
import { SelectMultiple } from ".";

export default {
  title: "UI/Form/SelectMultiple",
  component: SelectMultiple,
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
          <SelectMultiple
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
        <SelectMultiple
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
        <SelectMultiple
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

export const Checked = ({ ...args }) => {
  const formMethods = useForm();
  const options = [
    { children: "Option 1", value: "option-1" },
    { children: "Option 2", value: "option-2" },
    { children: "Option 3", value: "option-3" },
    { children: "Option 4", value: "option-4" },
    { children: "Option 5", value: "option-5" },
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
      <SelectMultiple
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="CheckMark"
        {...args}
      />
      <SelectMultiple
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="Hide active"
        checkedType="hide"
        {...args}
      />
    </Form>
  );
};

export const MultipleType = ({ ...args }) => {
  const formMethods = useForm();
  const options = [
    { children: "Option 1", value: "option-1" },
    { children: "Option 2", value: "option-2" },
    { children: "Option 3", value: "option-3" },
    { children: "Option 4", value: "option-4" },
    { children: "Option 5", value: "option-5" },
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
      <SelectMultiple
        control={formMethods.control}
        name="select_multiple"
        options={options}
        label="Indikator"
        {...args}
      />
      <SelectMultiple
        control={formMethods.control}
        name="select_multiple_tags"
        options={options}
        label="Tags"
        multipleType="tags"
        {...args}
      />
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
      <SelectMultiple
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
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { default_value: ["option-2"] },
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
      <SelectMultiple
        control={control}
        name="default_value"
        options={options}
        {...args}
      />
    </Form>
  );
};
