import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { colors, Sizes as SizesType } from "../../../types";
import { Button, Form } from "..";
import { Radio } from ".";
import { RadioVariants } from "./radio";

export default {
  title: "UI/Form/Radio",
  component: Radio,
  argTypes: {
    variant: {
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

export const Default = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        control={formMethods.control}
        name="radio-1"
        label="Einzelne Option"
        options={[{ label: "Option 1", value: "option-1" }]}
        {...args}
      />
      <Radio
        control={formMethods.control}
        name="radio-2"
        label="Mehrere Optionen"
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
    </Form>
  );
};

export const Variants = ({ ...args }) => {
  const formMethods = useForm();
  const variants: Array<keyof RadioVariants> = ["default", "button"];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {variants.map((variant: any) => (
        <Radio
          key={variant}
          control={formMethods.control}
          name={`radio_${variant}`}
          label={variant}
          variant={variant}
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
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
  const sizes: Array<keyof SizesType> = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size: any) => (
        <Radio
          key={size}
          control={formMethods.control}
          name={`radio_${size}`}
          label={size}
          size={size}
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
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

export const Colors = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {colors.map((color: any) => (
        <Radio
          key={color}
          control={formMethods.control}
          name={`radio_${color}`}
          label={color}
          color={color}
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      ))}
    </Form>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Disabled = ({ ...args }) => {
  const formMethods = useForm<any>({
    defaultValues: { radio_disabled: "option-2" },
  });

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        control={formMethods.control}
        name="radio_disabled"
        label="Alle Disabled"
        disabled
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
      <Radio
        control={formMethods.control}
        name="radio_disabled_single"
        label="Einzelnd Disabled"
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2", disabled: true },
        ]}
        {...args}
      />
      <Radio
        control={formMethods.control}
        name="radio_disabled"
        label="Alle Disabled"
        variant="button"
        disabled
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
      <Radio
        control={formMethods.control}
        name="radio_disabled_single"
        variant="button"
        label="Einzelnd Disabled"
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2", disabled: true },
        ]}
        {...args}
      />
    </Form>
  );
};

export const Error = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        control={formMethods.control}
        name="radio_error"
        label="Alle Error"
        required
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
      <Radio
        control={formMethods.control}
        variant="button"
        name="radio_error"
        label="Alle Error"
        required
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const formMethods = useForm({ defaultValues: { default_value: "option-1" } });

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        control={formMethods.control}
        name="default_value"
        required
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
    </Form>
  );
};
