import { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Button, Form } from "..";
import { Textarea } from ".";
import { inputVariants, sizes } from "../../../types";

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
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {inputVariants.map((variant, i) => (
        <Textarea
          control={formMethods.control}
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
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size, i) => (
        <Textarea
          control={formMethods.control}
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
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {inputVariants.map((variant, i) => (
        <Textarea
          control={formMethods.control}
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
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Textarea
        control={formMethods.control}
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
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Textarea
        control={formMethods.control}
        name="textarea_max_length"
        placeholder="max length"
        maxLength={60}
        showLength
        helper="Maximale länge von 60"
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const formMethods = useForm({
    defaultValues: { default_value: "Dies ist ein Standartext." },
  });

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Textarea
        label="Default Value"
        control={formMethods.control}
        name="default_value"
        {...args}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
