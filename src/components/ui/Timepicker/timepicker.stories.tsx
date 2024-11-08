import { useForm } from "react-hook-form";

import { sizes } from "../../../types";
import { Form } from "../Form";
import { Timepicker } from ".";
import { Button } from "../Button";
import { useState } from "react";

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
};

const formClassName = "flex flex-col gap-5";

export const Default = {
  render: ({ ...args }) => {
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
  },
};

export const Error = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Timepicker
          required
          control={formMethods.control}
          name="Timepicker-1"
          label="Timepicker"
          removeAll
          placeholder="Zeit auswählen"
          {...args}
        />
        <Button type="submit">Bestätigen</Button>
      </Form>
    );
  },
};
export const Sizes = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {sizes.map((size) => (
          <Timepicker
            key={size}
            control={formMethods.control}
            name={size}
            label={size}
            size={size}
            removeAll
            placeholder="Zeit auswählen"
            {...args}
          />
        ))}
      </Form>
    );
  },
};
export const MinMax = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    const { min, max } = formMethods.watch();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Timepicker
          control={formMethods.control}
          name="min"
          label="Min"
          max={max}
          removeAll
          placeholder="Zeit auswählen"
          {...args}
        />
        <Timepicker
          control={formMethods.control}
          name="max"
          label="Max"
          min={min}
          removeAll
          placeholder="Zeit auswählen"
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
    const { handleSubmit, control, watch } = useForm({
      defaultValues: { time1: "12:00", time2: "12:00" },
    });

    const values = watch();

    const [submitted, setSubmitted] = useState<object>();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={(data) => {
          setSubmitted(data);
        }}
        className={formClassName}
      >
        <Timepicker
          control={control}
          name="time1"
          label="Required Timepicker"
          removeAll
          placeholder="Zeit auswählen"
          required
          {...args}
        />
        Wert: {values.time1} {typeof values.time1}
        <Timepicker
          control={control}
          name="time2"
          label="Optional Timepicker"
          removeAll
          placeholder="Zeit auswählen"
          {...args}
        />
        Wert: {values.time2} {typeof values.time2}
        <Button type="submit">Submit</Button>
        {JSON.stringify(submitted)}
      </Form>
    );
  },
};

export const LocalTime = {
  render: ({ ...args }) => {
    const { handleSubmit, control, watch } = useForm({
      defaultValues: { time1: "12:00", time2: "12:00" },
    });

    const values = watch();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Timepicker
          control={control}
          name="time1"
          label="UTC Timepicker"
          removeAll
          placeholder="Zeit auswählen"
          required
          {...args}
        />
        UTC Wert: {values.time1}
        <Timepicker
          control={control}
          name="time2"
          label="Local Timepicker"
          removeAll
          placeholder="Zeit auswählen"
          localtime
          required
          {...args}
        />
        UTC Wert: {values.time2}
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const LocalTimeMinMax = {
  render: ({ ...args }) => {
    const { handleSubmit, control, watch } = useForm({
      defaultValues: { min: "6:00", max: "18:00" },
    });

    const values = watch();

    return (
      <Form
        handleSubmit={handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Timepicker
          control={control}
          name="min"
          label="Min Timepicker"
          removeAll
          placeholder="Min Zeit auswählen"
          localtime
          max={values.max}
          required
          {...args}
        />
        Min Wert: {values.min}
        <Timepicker
          control={control}
          name="max"
          label="Max Timepicker"
          removeAll
          placeholder="Max Zeit auswählen"
          localtime
          min={values.min}
          required
          {...args}
        />
        Max Wert: {values.max}
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};
