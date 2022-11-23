import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Input } from "../Input";
import { Form, FormElement } from ".";

export default {
  title: "UI/Form/FormElement",
  component: FormElement,
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

interface ILabel {
  input_1: any;
}

export const Label = ({ ...args }) => {
  const formMethods = useForm<ILabel>();

  const onSubmit = (data: ILabel) => data;

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={onSubmit}
      className={formClassName}
    >
      <Input
        label="Label"
        control={formMethods.control}
        name="input_1"
        placeholder="mit Label"
        {...args}
      />
    </Form>
  );
};

export const Helper = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Input
        helper="Helper"
        control={formMethods.control}
        name="input_1"
        placeholder="mit Helper"
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
      onSubmit={() => action("submit")}
      className={formClassName}
    >
      <Input
        control={formMethods.control}
        name="input_1"
        placeholder="mit Error"
        required={{ value: true, message: "Dieses Feld wird benötigt." }}
        {...args}
      />
      <Button type="submit">Bestätigen</Button>
    </Form>
  );
};
