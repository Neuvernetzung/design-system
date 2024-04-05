import { action } from "@storybook/addon-actions";

import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { Switch } from "../Switch";
import { Text } from "../Typography";
import { Form } from ".";

export default {
  title: "UI/Form/Form",
  component: Form,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} ;

const formClassName = "flex flex-col gap-5";

export const Default = {
  render: ({ ...args }) => {
    const { handleSubmit, control } = useForm();
    const [submitted, setSubmitted] = React.useState<boolean>(false);

    const onSubmit = () => {
      action("Submit");
      setSubmitted(true);
    };

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className={formClassName}
      >
        <Input
          label="Input"
          control={control}
          name="input"
          required
          {...args}
        />
        <Select
          label="Select"
          control={control}
          name="select"
          options={[{ children: "Option 1", value: "option-1" }]}
          required
          {...args}
        />
        <Switch label="Switch" control={control} required name="switch" />
        <Button type="submit">Bestätigen</Button>
        <Text>Bestätigt: {submitted ? "true" : "false"}</Text>
      </Form>
    );
  },
};
