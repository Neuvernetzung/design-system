import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from "..";
import { colors, Radio, sizes } from "./radio";

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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        formMethods={formMethods}
        name="radio-1"
        label="Einzelne Option"
        options={[{ label: "Option 1", value: "option-1" }]}
        {...args}
      />
      <Radio
        formMethods={formMethods}
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
        <Radio
          key={size}
          formMethods={formMethods}
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
  const _colors = Object.keys(colors);

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_colors.map((color: any) => (
        <Radio
          key={color}
          formMethods={formMethods}
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
  const formMethods = useForm({
    defaultValues: { radio_disabled: ["option-2"] },
  });

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        formMethods={formMethods}
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
        formMethods={formMethods}
        name="radio_disabled_single"
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
  const formMethods = useForm({
    defaultValues: { radio_disabled: ["option-2"] },
  });

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Radio
        formMethods={formMethods}
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
