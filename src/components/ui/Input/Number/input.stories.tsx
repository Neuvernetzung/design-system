import { Meta } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";

import { InputNumber } from ".";
import { inputVariants, sizes } from "../../../../types";
import { Form } from "../../Form";
import { Button } from "../../Button";

export default {
  title: "UI/Form/InputNumber",
  component: InputNumber,
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
        <InputNumber
          control={formMethods.control}
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
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size, i) => (
        <InputNumber
          control={formMethods.control}
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

export const Steps = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {[0.01, 0.0005, 1e-7].map((step, i) => (
        <InputNumber
          control={formMethods.control}
          name={`${step}_input_${i}`}
          step={step}
          key={step}
          required
          placeholder={step.toString()}
          {...args}
        />
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

Sizes.parameters = {
  controls: { exclude: "size" },
};
