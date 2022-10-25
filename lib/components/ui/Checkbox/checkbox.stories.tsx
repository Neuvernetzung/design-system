import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { HomeIcon, PlusIcon } from "../../icons";
import { Button, Form } from "..";
import { Checkbox, colors, sizes } from "./checkbox";

export default {
  title: "UI/Form/Checkbox",
  component: Checkbox,
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
      <Checkbox
        formMethods={formMethods}
        name="checkbox-1"
        label="Einzelne Option"
        options={[{ label: "Option 1", value: "option-1" }]}
        {...args}
      />
      <Checkbox
        formMethods={formMethods}
        name="checkbox-2"
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
        <Checkbox
          formMethods={formMethods}
          name={`checkbox_${size}`}
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
        <Checkbox
          formMethods={formMethods}
          name={`checkbox_${color}`}
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

export const Icon = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Checkbox
        formMethods={formMethods}
        name="checkbox_icons_default"
        label="Default"
        options={[{ label: "Default", value: "option-1" }]}
        {...args}
      />
      <Checkbox
        formMethods={formMethods}
        name="checkbox_icons_plus"
        label="Plus"
        icon={PlusIcon}
        options={[{ label: "Plus", value: "option-1" }]}
        {...args}
      />
      <Checkbox
        formMethods={formMethods}
        name="checkbox_icons_home"
        label="Home"
        icon={HomeIcon}
        options={[{ label: "Home", value: "option-1" }]}
        {...args}
      />
      <Checkbox
        formMethods={formMethods}
        name="checkbox_icons_single"
        label="Einzelnd"
        options={[
          { label: "Default", value: "option-1" },
          { label: "Plus", value: "option-1", icon: PlusIcon },
        ]}
        {...args}
      />
    </Form>
  );
};

export const Disabled = ({ ...args }) => {
  const formMethods = useForm({
    defaultValues: { checkbox_disabled: ["option-2"] },
  });

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Checkbox
        formMethods={formMethods}
        name="checkbox_disabled"
        label="Alle Disabled"
        disabled
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
        ]}
        {...args}
      />
      <Checkbox
        formMethods={formMethods}
        name="checkbox_disabled_single"
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
    defaultValues: { checkbox_disabled: ["option-2"] },
  });

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Checkbox
        formMethods={formMethods}
        name="checkbox_error"
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
