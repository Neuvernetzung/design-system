import { action } from "@storybook/addon-actions";

import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Input } from "../Input";
import { Form, FormElement } from ".";

export default {
  title: "UI/Form/FormElement",
  component: FormElement,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const formClassName = "flex flex-col gap-5";

export const Label = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    const onSubmit = () => {};

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
  },
};

export const Helper = {
  render: ({ ...args }) => {
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
  },
};

export const Error = {
  render: ({ ...args }) => {
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
  },
};
