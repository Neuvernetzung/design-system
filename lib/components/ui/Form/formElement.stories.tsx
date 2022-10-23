import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./form";
import { FormElement } from "./formElement";
import { Button } from "../Button";

import { Input } from "../Input";

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

export const Label = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Input
        label="Label"
        formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Input
        helper="Helper"
        formMethods={formMethods}
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
      formMethods={formMethods}
      onSubmit={() => action("submit")}
      className={formClassName}
    >
      <Input
        formMethods={formMethods}
        name="input_1"
        placeholder="mit Error"
        required={{ value: true, message: "Dieses Feld wird benötigt." }}
        {...args}
      />
      <Button type="submit">Bestätigen</Button>
    </Form>
  );
};
