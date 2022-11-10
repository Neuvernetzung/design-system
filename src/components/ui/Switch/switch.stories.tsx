import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from "..";
import { colors, sizes, Switch } from "./switch";

export default {
  title: "UI/Form/Switch",
  component: Switch,
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

export const Sizes = ({ ...args }) => {
  const formMethods = useForm();
  const _sizes = Object.keys(sizes);

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_sizes.map((size: any) => (
        <Switch
          key={size}
          formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_colors.map((color: any) => (
        <Switch
          key={color}
          formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Switch
        formMethods={formMethods}
        name="select_after"
        content="after"
        {...args}
      />
      <Switch
        formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Switch
        formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Switch
        formMethods={formMethods}
        name="select_disabled"
        content="disabled"
        disabled
        {...args}
      />
    </Form>
  );
};
