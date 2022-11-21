import { PhoneIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import cn from "classnames";
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
        name="input-left-element"
        placeholder="left Element"
        leftElement={{ children: <Icon icon={PhoneIcon} /> }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-right-element"
        placeholder="right Element"
        rightElement={{ children: <Icon icon={PhoneIcon} /> }}
        required
        {...args}
      />
      <Input
        formMethods={formMethods}
        name="input-both-elements"
        placeholder="both Elements"
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

export const Types = ({ ...args }) => {
  const formMethods = useForm();

  const types: any = ["text", "number", "password", "url"];

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {types.map((type) => (
        <Input
          key={type}
          type={type}
          formMethods={formMethods}
          name={`input_${type}`}
          placeholder={type}
          {...args}
        />
      ))}
    </Form>
  );
};

export const TestForm = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={cn(formClassName, "max-w-xl")}
    >
      <Input formMethods={formMethods} name="email" label="Email" {...args} />
      <div className="flex flex-row gap-2">
        <Input formMethods={formMethods} name="name" label="Name" {...args} />
        <Input
          formMethods={formMethods}
          name="nachname"
          label="Nachname"
          className="w-full"
          {...args}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          formMethods={formMethods}
          name="straße"
          label="Straße"
          className="w-full"
          {...args}
        />
        <Input
          formMethods={formMethods}
          name="hausnummer"
          label="Hausnummer"
          {...args}
        />
      </div>
    </Form>
  );
};
