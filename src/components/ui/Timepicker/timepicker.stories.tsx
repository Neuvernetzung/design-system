import { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { sizes } from "../../../types";
import { Form } from "../Form";
import { Timepicker } from ".";
import { Button } from "../Button";

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
export const Error = ({ ...args }) => {
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
};
export const MinMax = ({ ...args }) => {
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
};
