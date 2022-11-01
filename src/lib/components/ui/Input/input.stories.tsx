import { PhoneIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form, Icon } from "..";
import { Input, sizes, variants } from "./input";

export default {
  title: "UI/Form/Input",
  component: Input,
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

export const Variants = ({ ...args }) => {
  const _variants = Object.keys(variants);
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_variants.map((variant: any, i) => (
        <Input
          formMethods={formMethods}
          name={`${variant}_input_${i}`}
          variant={variant}
          key={variant}
          placeholder={variant}
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
  const _sizes = Object.keys(sizes);
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_sizes.map((size: any, i) => (
        <Input
          formMethods={formMethods}
          name={`${size}_input_${i}`}
          size={size}
          key={size}
          placeholder={size}
          {...args}
        />
      ))}
    </Form>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};

export const Error = ({ ...args }) => {
  const _variants = Object.keys(variants);
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {_variants.map((variant: any, i) => (
        <Input
          formMethods={formMethods}
          name={`${variant}_input_${i}`}
          variant={variant}
          key={variant}
          placeholder={variant}
          required
          {...args}
        />
      ))}
      <Button type="submit">Bestätigen</Button>
    </Form>
  );
};

export const Addons = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Input
        formMethods={formMethods}
        name="input-left-addon"
        placeholder="left Addon"
        leftAddon={{ children: "+49" }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-right-addon"
        placeholder="right Addon"
        rightAddon={{ children: "€" }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-both-addons"
        placeholder="both Addons"
        leftAddon={{ children: "https://" }}
        rightAddon={{ children: ".com" }}
        required
        {...args}
      />
    </Form>
  );
};

export const Elements = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Input
        formMethods={formMethods}
        name="input-left-addon"
        placeholder="left Addon"
        leftElement={{ children: <Icon size="xs" icon={PhoneIcon} /> }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-right-addon"
        placeholder="right Addon"
        rightElement={{ children: <Icon icon={PhoneIcon} /> }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-both-addons"
        placeholder="both Addons"
        leftElement={{ children: <Icon icon={PhoneIcon} /> }}
        rightElement={{ children: <Icon icon={PhoneIcon} /> }}
        required
        {...args}
      />
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
      <Input
        formMethods={formMethods}
        name="input-disabled"
        placeholder="disabled"
        disabled
        {...args}
      />
    </Form>
  );
};
