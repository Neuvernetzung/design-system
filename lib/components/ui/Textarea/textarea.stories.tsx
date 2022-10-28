import { PhoneIcon } from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form, Icon } from "..";
import { sizes, Textarea, variants } from "./textarea";

export default {
  title: "UI/Form/Textarea",
  component: Textarea,
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
        <Textarea
          formMethods={formMethods}
          name={`${variant}_textarea_${i}`}
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
        <Textarea
          formMethods={formMethods}
          name={`${size}_textarea_${i}`}
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
        <Textarea
          formMethods={formMethods}
          name={`${variant}_textarea_${i}`}
          variant={variant}
          key={variant}
          placeholder={variant}
          required
          {...args}
        />
      ))}
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
      <Textarea
        formMethods={formMethods}
        name="textarea_disabled"
        placeholder="disabled"
        disabled
        {...args}
      />
    </Form>
  );
};

export const MaxLength = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Textarea
        formMethods={formMethods}
        name="textarea_max_length"
        placeholder="max length"
        maxLength="60"
        helper="Maximale länge von 60"
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
