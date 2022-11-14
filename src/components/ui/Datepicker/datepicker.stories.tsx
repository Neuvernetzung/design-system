import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { useForm } from "react-hook-form";

import { Datepicker } from "./datepicker";
import { Form } from "../Form";

export default {
  title: "UI/Form/Datepicker",
  component: Datepicker,
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
      <Datepicker
        formMethods={formMethods}
        name="datepicker-1"
        label="Datepicker"
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};
