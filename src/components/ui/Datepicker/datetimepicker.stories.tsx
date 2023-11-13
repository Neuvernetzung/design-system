import { Meta } from "@storybook/react";
import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { useForm } from "react-hook-form";

import { sizes } from "../../../types";
import { Form } from "../Form";
import { Datetimepicker } from ".";
import { Button } from "../Button";

export default {
  title: "UI/Form/Datetimepicker",
  component: Datetimepicker,
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
      <Datetimepicker
        control={formMethods.control}
        name="datepicker-1"
        label="Datetimepicker"
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};

export const Sizes = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      {sizes.map((size) => (
        <Datetimepicker
          key={size}
          control={formMethods.control}
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

export const ButtonVariant = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datetimepicker
        control={formMethods.control}
        name="outline"
        label="outline"
        inputVariant="outline"
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        control={formMethods.control}
        name="filled"
        label="filled"
        inputVariant="filled"
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};

export const MinMaxDate = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datetimepicker
        name="min"
        label="min"
        minDate={subMonths(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="minToday"
        label="minToday"
        minDate={new Date()}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="minTomorrow"
        label="minTomorrow"
        minDate={addDays(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="max"
        label="min"
        maxDate={addMonths(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="minmax"
        label="min/max"
        minDate={subMonths(new Date(), 1)}
        maxDate={addMonths(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="minnotinview"
        label="min not in View"
        minDate={addMonths(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="maxnotinview"
        label="max not in View"
        maxDate={subMonths(new Date(), 1)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="minmaxnotinview"
        label="min and max not in View"
        minDate={addMonths(new Date(), 1)}
        maxDate={addMonths(new Date(), 3)}
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};

export const DefaultValue = ({ ...args }) => {
  const formMethods = useForm({
    defaultValues: {
      date: subDays(new Date(), 3),
      isoDate: "2022-11-15T23:00:00.000Z",
    },
  });

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datetimepicker
        name="date"
        label="Date"
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Datetimepicker
        name="isoDate"
        label="ISO Date"
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
    </Form>
  );
};
export const Error = ({ ...args }) => {
  const formMethods = useForm({});

  return (
    <Form
      handleSubmit={formMethods.handleSubmit}
      onSubmit={() => {}}
      className={formClassName}
    >
      <Datetimepicker
        required
        name="date"
        label="Date"
        control={formMethods.control}
        placeholder="Datum auswählen"
        {...args}
      />
      <Button type="submit">Bestätigen</Button>
    </Form>
  );
};
