import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { useForm } from "react-hook-form";

import { sizes } from "../../../types";
import { Button } from "../Button";
import { Form } from "../Form";
import { DateRangepicker } from ".";

export default {
  title: "UI/Form/DateRangepicker",
  component: DateRangepicker,
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
    const { handleSubmit, control, watch } = useForm();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <DateRangepicker
          control={control}
          name={{ start: "date.start", end: "date.end" }}
          label="DateRangepicker"
          {...args}
        />
        {JSON.stringify(watch())}
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
          <DateRangepicker
            key={size}
            control={formMethods.control}
            size={size}
            name={{ start: `${size}.start`, end: `${size}.end` }}
            label={size}
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
        <DateRangepicker
          control={formMethods.control}
          name={{ start: "date.start", end: "date.end" }}
          label="outline"
          inputVariant="outline"
          {...args}
        />
        <DateRangepicker
          control={formMethods.control}
          name={{ start: "date.start", end: "date.end" }}
          label="filled"
          inputVariant="filled"
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
        <DateRangepicker
          name={{ start: "min.start", end: "min.end" }}
          label="minLastMonth"
          minDate={subMonths(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "minToday.start", end: "minToday.end" }}
          label="minToday"
          minDate={new Date()}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "minTomorrow.start", end: "minTomorrow.end" }}
          label="minTomorrow"
          minDate={addDays(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "maxNextMonth.start", end: "maxNextMonth.end" }}
          label="maxNextMonth"
          maxDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "minMax.start", end: "minMax.end" }}
          label="min/max"
          minDate={subMonths(new Date(), 1)}
          maxDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "minNotInView.start", end: "minNotInView.end" }}
          label="min not in View"
          minDate={addMonths(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "maxNotInView.start", end: "maxNotInView.end" }}
          label="max not in View"
          maxDate={subMonths(new Date(), 1)}
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "minMaxNotInView.start", end: "minMaxNotInView.end" }}
          label="min and max not in View"
          minDate={addMonths(new Date(), 1)}
          maxDate={addMonths(new Date(), 3)}
          control={formMethods.control}
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
        date: { start: subDays(new Date(), 6), end: subDays(new Date(), 3) },
        isoDate: {
          start: "2022-11-15T23:00:00.000Z",
          end: "2022-11-17T23:00:00.000Z",
        },
      },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <DateRangepicker
          name={{ start: "date.start", end: "date.end" }}
          label="Date"
          control={formMethods.control}
          {...args}
        />
        <DateRangepicker
          name={{ start: "isoDate.start", end: "isoDate.end" }}
          label="ISO Date"
          control={formMethods.control}
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
        <DateRangepicker
          required
          name={{ start: "date.start", end: "date.end" }}
          label="Date"
          control={formMethods.control}
          {...args}
        />
        <Button type="submit">Bestätigen</Button>
      </Form>
    );
  },
};
