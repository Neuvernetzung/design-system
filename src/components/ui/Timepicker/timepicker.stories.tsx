import { Meta, Story } from "@storybook/react/types-6-0";
import { addDays, addMonths, subDays, subMonths } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";

import { Sizes as SizesT } from "../../../types";
import { Form } from "../Form";
import { Timepicker } from ".";

export default {
  title: "UI/Form/Timepicker",
  component: Timepicker,
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
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Timepicker
        control={formMethods.control}
        name="Timepicker-1"
        label="Timepicker"
        removeAll
        placeholder="Zeit auswählen"
        {...args}
      />
    </Form>
  );
};
