import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Sizes as SizesType } from "../../../types";
import { Button, Form } from "..";
import { Switch } from ".";
import { colors, SwitchInner } from "./switch";

export default {
  title: "UI/Form/Switch",
  component: SwitchInner,
  argTypes: {
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

interface ISizes {
  select_xs: any;
  select_sm: any;
  select_md: any;
  select_lg: any;
  select_xl: any;
}

export const Sizes = ({ ...args }) => {
  const formMethods = useForm<ISizes>();
  const sizes: Array<keyof SizesType> = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size: keyof SizesType) => (
        <Switch
          key={size}
          control={formMethods.control}
          size={size}
          name={`select_${size}`}
          content={size}
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
  const _colors = colors;

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_colors.map((color: any) => (
        <Switch
          key={color}
          control={formMethods.control}
          color={color}
          name={`select_${color}`}
          content={color}
          {...args}
        />
      ))}
    </Form>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
};

export const Order = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Switch
        control={formMethods.control}
        name="select_after"
        content="after"
        {...args}
      />
      <Switch
        control={formMethods.control}
        name="select_before"
        content="before"
        reverse
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
      <Switch
        control={formMethods.control}
        name="select_error"
        content="error"
        required
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
      <Switch
        control={formMethods.control}
        name="select_disabled"
        content="disabled"
        disabled
        {...args}
      />
    </Form>
  );
};
