import { useForm } from "react-hook-form";

import { colors, radioVariants, sizes } from "../../../types";
import { Button, Form } from "..";
import { Radio } from ".";

export default {
  title: "UI/Form/Radio",
  component: Radio,

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
        <Radio
          control={formMethods.control}
          name="radio-1"
          label="Einzelne Option"
          options={[{ label: "Option 1", value: "option-1" }]}
          {...args}
        />
        <Radio
          control={formMethods.control}
          name="radio-2"
          label="Mehrere Optionen"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      </Form>
    );
  },
};

export const Variants = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {radioVariants.map((variant) => (
          <Radio
            key={variant}
            control={formMethods.control}
            name={`radio_${variant}`}
            label={variant}
            variant={variant}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "variant" },
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
          <Radio
            key={size}
            control={formMethods.control}
            name={`radio_${size}`}
            label={size}
            size={size}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "size" },
  },
};

export const Colors = {
  render: ({ ...args }) => {
    const formMethods = useForm();

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        {colors.map((color) => (
          <Radio
            key={color}
            control={formMethods.control}
            name={`radio_${color}`}
            label={color}
            color={color}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
            {...args}
          />
        ))}
      </Form>
    );
  },

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Disabled = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: {
        radio_disabled: "option-2",
        radio_disabled_single: undefined,
      },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Radio
          control={formMethods.control}
          name="radio_disabled"
          label="Alle Disabled"
          disabled
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Radio
          control={formMethods.control}
          name="radio_disabled_single"
          label="Einzelnd Disabled"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2", disabled: true },
          ]}
          {...args}
        />
        <Radio
          control={formMethods.control}
          name="radio_disabled"
          label="Alle Disabled"
          variant="button"
          disabled
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Radio
          control={formMethods.control}
          name="radio_disabled_single"
          variant="button"
          label="Einzelnd Disabled"
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2", disabled: true },
          ]}
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
        <Radio
          control={formMethods.control}
          name="radio_error"
          label="Alle Error"
          required
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Radio
          control={formMethods.control}
          variant="button"
          name="radio_error_2"
          label="Alle Error"
          required
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const DefaultValue = {
  render: ({ ...args }) => {
    const formMethods = useForm({
      defaultValues: { default_value: "option-1" },
    });

    return (
      <Form
        handleSubmit={formMethods.handleSubmit}
        onSubmit={() => {}}
        className={formClassName}
      >
        <Radio
          control={formMethods.control}
          name="default_value"
          required
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
          ]}
          {...args}
        />
      </Form>
    );
  },
};
