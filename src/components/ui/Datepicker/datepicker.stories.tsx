import { Meta, Story } from "@storybook/react/types-6-0";
import { addDays, addMonths, subMonths } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";

import { Sizes as SizesT } from "../../../types";
import { Form } from "../Form";
import { Datepicker } from "./datepicker";

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

Default.parameters = {
  a11y: {
    disable: true,
  },
};

export const Sizes = ({ ...args }) => {
  const formMethods = useForm();

  const sizes: Array<keyof SizesT> = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size) => (
        <Datepicker
          key={size}
          formMethods={formMethods}
          size={size}
          name={size}
          label={size}
          placeholder="Datum auswählen"
          {...args}
        />
      ))}
    </Form>
  );
};
Sizes.parameters = {
  a11y: {
    disable: true,
  },
};

export const ButtonVariant = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datepicker
        formMethods={formMethods}
        name="outline"
        label="outline"
        inputVariant="outline"
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        formMethods={formMethods}
        name="filled"
        label="filled"
        inputVariant="filled"
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};
ButtonVariant.parameters = {
  a11y: {
    disable: true,
  },
};

export const MinMaxDate = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      formMethods={formMethods}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datepicker
        name="min"
        label="min"
        minDate={subMonths(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="minToday"
        label="minToday"
        minDate={new Date()}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="minTomorrow"
        label="minTomorrow"
        minDate={addDays(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="max"
        label="min"
        maxDate={addMonths(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="minmax"
        label="min/max"
        minDate={subMonths(new Date(), 1)}
        maxDate={addMonths(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="minnotinview"
        label="min not in View"
        minDate={addMonths(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="maxnotinview"
        label="max not in View"
        maxDate={subMonths(new Date(), 1)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datepicker
        name="minmaxnotinview"
        label="min and max not in View"
        minDate={addMonths(new Date(), 1)}
        maxDate={addMonths(new Date(), 3)}
        formMethods={formMethods}
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};
MinMaxDate.parameters = {
  a11y: {
    disable: true,
  },
};
