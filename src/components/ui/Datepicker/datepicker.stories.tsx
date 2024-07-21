import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { useForm } from "react-hook-form";

import { sizes } from "../../../types";
import { Button } from "../Button";
import { Form } from "../Form";
import { Datepicker } from ".";

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
};

const formClassName = "flex flex-col gap-5";

export const Default = {
  render: function RenderComponent({ ...args }) {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Datepicker
          control={formMethods.control}
          name="datepicker-1"
          label="Datepicker"
          placeholder="Datum auswählen"
          {...args}
        />
      </Form>
    );
  },
};

export const Sizes = {
  render: function RenderComponent({ ...args }) {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size) => (
          <Datepicker
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
  },
};

export const ButtonVariant = {
  render: function RenderComponent({ ...args }) {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Datepicker
          control={formMethods.control}
          name="outline"
          label="outline"
          inputVariant="outline"
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          control={formMethods.control}
          name="filled"
          label="filled"
          inputVariant="filled"
          placeholder="Datum auswählen"
          {...args}
        />
      </Form>
    );
  },
};

export const MinMaxDate = {
  render: function RenderComponent({ ...args }) {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Datepicker
          name="min"
          label="minLastMonth"
          minDate={subMonths(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="minToday"
          label="minToday"
          minDate={new Date()}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="minTomorrow"
          label="minTomorrow"
          minDate={addDays(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="max"
          label="maxNextMonth"
          maxDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="minmax"
          label="min/max"
          minDate={subMonths(new Date(), 1)}
          maxDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="minnotinview"
          label="min not in View"
          minDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="maxnotinview"
          label="max not in View"
          maxDate={subMonths(new Date(), 1)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="minmaxnotinview"
          label="min and max not in View"
          minDate={addMonths(new Date(), 1)}
          maxDate={addMonths(new Date(), 3)}
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Button type="submit">Bestätigen</Button>
      </Form>
    );
  },
};

export const DefaultValue = {
  render: function RenderComponent({ ...args }) {
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
        <Datepicker
          name="date"
          label="Date"
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
        <Datepicker
          name="isoDate"
          label="ISO Date"
          control={formMethods.control}
          placeholder="Datum auswählen"
          {...args}
        />
      </Form>
    );
  },
};
export const Error = {
  render: function RenderComponent({ ...args }) {
    const formMethods = useForm({});

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Datepicker
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
  },
};
